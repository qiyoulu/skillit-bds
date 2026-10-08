#!/usr/bin/env python3
"""Render approved logo SVG exports at 512px height without editing source geometry.
Run: uv run --with playwright --with pillow python scripts/export-logo-pngs.py
Use --check to verify exports without writing. BDS_BROWSER_BIN selects Chromium.
Parity means identical decoded RGBA pixels, not identical PNG compression/metadata.
"""
from pathlib import Path
import argparse
import base64
import hashlib
import json
import math
import os
import io
import re
import shutil
import stat
import tempfile
import xml.etree.ElementTree as ET
from PIL import Image, UnidentifiedImageError
from playwright.sync_api import sync_playwright, Error as BrowserError

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
files = sorted(p for p in (root / 'assets/logo').glob('*.svg') if p.stem.startswith(('mark-', 'lockup-', 'favicon-')))
if not files:
    parser.error('assets/logo: no approved logo variants found')
ET.register_namespace('', 'http://www.w3.org/2000/svg')
def load_svg(svg):
    try:
        document = ET.fromstring(svg.read_text(encoding='utf-8'))
        if document.tag != '{http://www.w3.org/2000/svg}svg':
            raise ValueError('not an SVG document')
        viewbox = list(map(float, re.split(r'[\s,]+', document.get('viewBox', '').strip())))
        if len(viewbox) != 4 or not all(math.isfinite(value) for value in viewbox):
            raise ValueError('viewBox must contain four finite numbers')
        _, _, w, h = viewbox
        if w <= 0 or h <= 0:
            raise ValueError('viewBox dimensions must be positive')
        width = math.ceil(w / h * 512)
        if width < 1 or width > 32767:
            raise ValueError('export width is outside the supported canvas range')
        return document, width
    except (OSError, UnicodeError, ET.ParseError, ValueError, OverflowError) as error:
        parser.error(f'{svg.name}: {error}')

def png_pixels(data, name):
    try:
        with Image.open(io.BytesIO(data)) as image:
            if image.format != 'PNG':
                raise ValueError('export is not a PNG')
            return image.size, image.convert('RGBA').tobytes()
    except (OSError, UnidentifiedImageError, ValueError) as error:
        parser.error(f'{name}: {error}')

# Validate every source before any export is written.
documents = [(svg, *load_svg(svg)) for svg in files]
executable = os.environ.get('BDS_BROWSER_BIN')
if not executable:
    executable = next((p for p in ['/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] if Path(p).exists()), None)
executable = executable or shutil.which('chromium') or shutil.which('google-chrome')
records = []
with sync_playwright() as p:
    options = {'headless': True, 'args': ['--disable-background-networking', '--no-first-run']}
    if executable:
        options['executable_path'] = executable
    try:
        browser = p.chromium.launch(**options)
    except BrowserError as error:
        parser.error(f'Chromium launch failed (BDS_BROWSER_BIN={executable!r}): {error}')
    page = browser.new_page()
    for svg, document, width in documents:
        height = 512
        document.set('width', str(width))
        document.set('height', str(height))
        document.set('preserveAspectRatio', 'xMidYMid meet')
        svg_text = ET.tostring(document, encoding='unicode')
        encoded = page.evaluate('''async ({svg,width,height}) => {
            const img=new Image();
            img.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
            await img.decode();
            const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
            canvas.getContext('2d').drawImage(img,0,0,width,height);
            return canvas.toDataURL('image/png').split(',')[1];
        }''', {'svg': svg_text, 'width': width, 'height': height})
        if not encoded:
            parser.error(f'{svg.name}: Chromium returned an empty PNG')
        data = base64.b64decode(encoded, validate=True)
        rendered = png_pixels(data, svg.name)
        if rendered[0] != (width, height):
            parser.error(f'{svg.name}: Chromium returned the wrong dimensions')
        target = svg.with_suffix('.png')
        try:
            existing = target.read_bytes() if target.exists() else None
            matches = existing is not None and png_pixels(existing, target.name) == rendered
            if args.check and not matches:
                parser.error(f'{target.name}: missing or changed RGBA pixels/dimensions; check the approved source and Chromium build before regenerating')
            if not args.check and not matches:
                temp = None
                try:
                    with tempfile.NamedTemporaryFile(dir=target.parent, prefix=target.name + '.', suffix='.tmp', delete=False) as handle:
                        temp = Path(handle.name)
                        handle.write(data)
                    temp.chmod(stat.S_IMODE(target.stat().st_mode) if existing is not None else 0o644)
                    temp.replace(target)
                finally:
                    if temp is not None:
                        temp.unlink(missing_ok=True)
        except OSError as error:
            parser.error(f'{target.name}: {error}')
        records.append({'asset': target.name, 'width': width, 'height': height, 'sha256': hashlib.sha256(existing if matches and existing is not None else data).hexdigest()})
    browser.close()
print(json.dumps({'status': 'PASS', 'mode': 'check' if args.check else 'export', 'browser': browser.version, 'comparison': 'decoded RGBA pixels', 'assets': records}, indent=2))
