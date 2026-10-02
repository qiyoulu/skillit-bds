#!/usr/bin/env python3
"""Render approved logo SVG exports at 512px height without editing source geometry.
Run: uv run --with playwright python scripts/export-logo-pngs.py
Use --check to verify exports without writing. BDS_BROWSER_BIN selects Chromium.
"""
from pathlib import Path
import argparse
import base64
import hashlib
import json
import math
import os
import shutil
import xml.etree.ElementTree as ET
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
files = sorted(p for p in (root / 'assets/logo').glob('*.svg') if p.stem.startswith(('mark-', 'lockup-', 'favicon-')))
assert files, 'No approved logo variants found'
ET.register_namespace('', 'http://www.w3.org/2000/svg')
executable = os.environ.get('BDS_BROWSER_BIN')
if not executable:
    executable = next((p for p in ['/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] if Path(p).exists()), None)
executable = executable or shutil.which('chromium') or shutil.which('google-chrome')
records = []
with sync_playwright() as p:
    options = {'headless': True, 'args': ['--disable-background-networking', '--no-first-run']}
    if executable:
        options['executable_path'] = executable
    browser = p.chromium.launch(**options)
    page = browser.new_page()
    for svg in files:
        document = ET.fromstring(svg.read_text())
        _, _, w, h = map(float, document.attrib['viewBox'].split())
        height = 512
        width = math.ceil(w / h * height)
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
        data = base64.b64decode(encoded)
        target = svg.with_suffix('.png')
        if args.check:
            assert target.exists() and target.read_bytes() == data, f'{target.name} needs regeneration with this Chromium build'
        elif not target.exists() or target.read_bytes() != data:
            temp = target.with_suffix('.png.tmp')
            temp.write_bytes(data)
            temp.replace(target)
        records.append({'asset': target.name, 'width': width, 'height': height, 'sha256': hashlib.sha256(data).hexdigest()})
    browser.close()
print(json.dumps({'status': 'PASS', 'mode': 'check' if args.check else 'export', 'assets': records}, indent=2))
