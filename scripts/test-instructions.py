#!/usr/bin/env python3
"""Instruction and approved-export consistency regressions.
Run: uv run --with json5 --with pillow python scripts/test-instructions.py
Use --repo PATH to exercise a separate snapshot without editing it.
"""
from pathlib import Path
import argparse
import json
import math
import re
import xml.etree.ElementTree as ET
from urllib.parse import unquote, urlsplit
import json5
from PIL import Image, ImageColor, UnidentifiedImageError

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--repo', type=Path, default=Path(__file__).resolve().parents[1])
args = parser.parse_args()
root = args.repo.resolve()
def read_text(path):
    try:
        return path.read_text(encoding='utf-8')
    except (OSError, UnicodeError) as error:
        raise SystemExit(f'FAIL: {path}: {error}') from error

human_guide = read_text(root / 'HUMAN-INSTRUCTIONS.md')
# Detailed numerical/implementation rules remain covered after the audience split.
human = read_text(root / 'docs/design-reference.md')
llm = read_text(root / 'LLM-INSTRUCTIONS.md')
try:
    source = json5.loads(read_text(root / 'tokens/tokens.json5'))['base']
except (ValueError, KeyError, TypeError) as error:
    raise SystemExit(f'FAIL: tokens/tokens.json5: {error}') from error
checks = 0

def check(condition, message):
    global checks
    if not condition:
        raise SystemExit('FAIL: ' + message)
    checks += 1

# The team reading path must not require implementation knowledge.
check(not re.search(r'```(?:css|html|javascript|js|bash|ruby|python)', human_guide, re.I), 'Human guide must not contain implementation code blocks')
check(not re.search(r'var\(--|--(?:color|text|space|radius)-', human_guide), 'Human guide must not contain CSS token syntax')
check('0.66' not in human_guide and '0.72' not in human_guide, 'Measured font ratios belong in the detailed reference, not the team guide')
for term in ['Work Sans', 'JetBrains Mono', 'Canvas', 'Iron', 'Traffic Cone']:
    check(term in human_guide, 'Human guide must retain the approved brand choice: ' + term)
check('16px' in human_guide and 'email' in human_guide.lower(), 'Human guide must retain the readable email size rule')

check('0.66' in human and '0.66' in llm, 'The detailed design reference and AI instructions must use measured Work Sans cap ratio 0.66')
for filename in ['docs/design-reference.md', 'LLM-INSTRUCTIONS.md', 'tokens/docs/typography.md', 'rules/layout.md']:
    text = read_text(root / filename)
    check('0.72' not in text, filename + ': stale exact cap-height ratio')
    check(not re.search(r'(?:matches Work Sans x-height|x-height equals Work Sans|Both typefaces match at the same point size)', text, re.I), filename + ': equal sizing is policy, not identical metrics')
check(not re.search(r'perfectly on-brand|token library \(via MCP\)', human, re.I), 'Do not promise undocumented MCP access or perfect compliance')
check(not re.search(r'Reference[^\n]*(?:14px|50%)', human), 'Chart reference must use an approved type tier and readable opacity')
check('Accent color: Traffic Cone for the attribution name' not in human, 'Quote attribution cannot use low-contrast orange body text')
check(not re.search(r'Force at least two words[^\n]*any text block', human), 'Wrapping rules must allow reflow-safe exceptions')
check('single color outline' not in human.lower(), 'Solid logo treatments and outline prohibition must agree')
check('Proposed' in human or 'proposed' in human, 'Website proposal must not masquerade as a live inventory')
check('MCP' not in human or re.search(r'(?:not documented|not established|unverified|not provided|not provisioned)', human, re.I), 'Any MCP mention requires a qualified access claim')
reference_rules = [line for line in llm.splitlines() if line.startswith('- **References:**')]
check(any('Text-0.75x' in line and 'opaque Iron' in line for line in reference_rules), 'Chart references must use the approved opaque functional tier')
check('circle' in llm.lower() and 'indicator' in llm.lower(), 'Checklist must distinguish indicator geometry from container radii')
check('progress' in llm.lower(), 'Functional progress fill exception must be represented')
check('selection' in llm.lower() and 'checkbox' in llm.lower(), 'Selection state and form-checkbox exceptions must be represented')
check('user-entered data' in llm.lower() and 'direct quotes' in llm.lower(), 'User-entered and direct-quote capitalization exceptions must be represented')

# Check actual paths and GitHub-style heading targets rather than a claimed TOC.
def heading_slugs(text):
    # Fenced code is not part of a Markdown document's heading inventory.
    text = re.sub(r'^(`{3,}|~{3,})[^\n]*\n.*?^\1\s*$', '', text, flags=re.M | re.S)
    slugs = set()
    for heading in re.findall(r'^#{1,6}\s+(.+?)(?:\s+#+)?\s*$', text, re.M):
        heading = re.sub(r'\*|`|\\', '', heading)
        base = re.sub(r'[^\w\s-]', '', heading.lower()).replace(' ', '-')
        slug = base
        number = 0
        while slug in slugs:
            number += 1
            slug = base + '-' + str(number)
        slugs.add(slug)
    return slugs

for filename in ['HUMAN-INSTRUCTIONS.md', 'LLM-INSTRUCTIONS.md', 'README.md', 'docs/design-reference.md']:
    text = read_text(root / filename)
    for target in re.findall(r'\[[^]]*\]\(([^)]*)\)', text):
        link = urlsplit(target)
        if link.scheme or link.netloc:
            continue
        path = unquote(link.path)
        resource = (root / filename).parent / path if path else root / filename
        check(resource.exists(), filename + ': missing resource ' + path)
        if link.fragment and resource.suffix.lower() == '.md':
            check(unquote(link.fragment) in heading_slugs(read_text(resource)), filename + ': missing heading ' + target)

# Check fixed logo paint only; approved semantic/multicolor UI icons are separate.
colors = {token['$value'].upper() for name, token in source['color'].items() if name != 'hover'}
logo_files = sorted((root / 'assets/logo').glob('*.svg'))
check(bool(logo_files), 'assets/logo: no approved SVG assets found')
export_files = [svg for svg in logo_files if svg.stem.startswith(('mark-', 'lockup-', 'favicon-'))]
check(bool(export_files), 'assets/logo: no approved raster variants found')
for svg in logo_files:
    try:
        doc = ET.fromstring(read_text(svg))
    except ET.ParseError as error:
        raise SystemExit(f'FAIL: {svg}: {error}') from error
    check(doc.tag == '{http://www.w3.org/2000/svg}svg', svg.name + ': not an SVG document')
    variant_color = None
    if svg in export_files:
        suffix = svg.stem.rsplit('-', 1)[1]
        variants = {'canvas': 'bg', 'iron': 'fg', 'plaster': 'surface'}
        check(suffix in variants, svg.name + ': unknown fixed logo variant')
        variant_color = source['color'][variants[suffix]]['$value'].upper()
    for element in doc.iter():
        paints = [paint for prop in ['fill', 'stroke', 'color', 'stop-color', 'flood-color'] if (paint := element.get(prop))]
        css = element.get('style', '')
        if element.tag.rsplit('}', 1)[-1] == 'style':
            css += ''.join(element.itertext())
        paints.extend(match[1] for match in re.findall(r'(?:^|[;{])\s*(fill|stroke|color|stop-color|flood-color)\s*:\s*([^;}]+)', css, re.I))
        for paint in paints:
            paint = re.sub(r'\s*!important\s*$', '', paint, flags=re.I).strip()
            if paint in ['none', 'currentColor', 'inherit']:
                check(variant_color is None or paint == 'none', svg.name + ': fixed variant cannot depend on inherited paint')
                continue
            try:
                rgb = ImageColor.getrgb(paint)
                canonical_paint = '#' + ''.join(f'{channel:02X}' for channel in rgb)
            except ValueError:
                canonical_paint = paint.upper()
            check(canonical_paint in colors, str(svg.relative_to(root)) + ': stale paint ' + paint)
            if variant_color is not None:
                check(canonical_paint == variant_color, svg.name + ': SVG paint does not match the canonical variant')
    if svg.stem.startswith(('mark-', 'lockup-', 'favicon-')):
        png = svg.with_suffix('.png')
        check(png.exists(), str(png.relative_to(root)) + ': missing paired raster export')
        try:
            with Image.open(png) as opened:
                check(opened.format == 'PNG', png.name + ': export is not PNG')
                image = opened.convert('RGBA')
            viewbox = list(map(float, re.split(r'[\s,]+', doc.get('viewBox', '').strip())))
            check(len(viewbox) == 4 and all(math.isfinite(value) for value in viewbox), svg.name + ': invalid viewBox')
            _, _, width, height = viewbox
            check(width > 0 and height > 0, svg.name + ': viewBox dimensions must be positive')
        except (OSError, UnidentifiedImageError, ValueError) as error:
            raise SystemExit(f'FAIL: {svg.name}/{png.name}: {error}') from error
        check(image.size == (math.ceil(width / height * 512), 512), png.name + ': export must be 512px high with preserved aspect')
        suffix = svg.stem.rsplit('-', 1)[1]
        variants = {'canvas': 'bg', 'iron': 'fg', 'plaster': 'surface'}
        check(suffix in variants, svg.name + ': unknown fixed logo variant')
        key = variants[suffix]
        color = source['color'][key]['$value'].lstrip('#')
        expected = tuple(int(color[n:n+2], 16) for n in [0, 2, 4])
        pixels = image.tobytes()
        opaque = {tuple(pixels[n:n+3]) for n in range(0, len(pixels), 4) if pixels[n+3] == 255}
        check(opaque == {expected}, png.name + ': opaque paint does not match the canonical variant')
        # Canvas unpremultiplication rounds edge RGB; bound its error by alpha.
        bad_edge = any(
            pixels[n+3] and pixels[n+3] < 255 and
            any(abs(pixels[n+c] - expected[c]) > math.ceil(127.5 / pixels[n+3]) for c in range(3))
            for n in range(0, len(pixels), 4)
        )
        check(not bad_edge, png.name + ': visible edge paint does not match the canonical variant')

# Canonical paired padding is not a new token scheme; all unchanged values resolve.
for tier in ['0.75x', '1x', '1.5x', '2x']:
    check(tier in source['typography']['padding'], 'Missing approved padding tier ' + tier)
    value = source['typography']['padding'][tier].get('$value')
    for filename, text in [('HUMAN-INSTRUCTIONS.md', human), ('LLM-INSTRUCTIONS.md', llm)]:
        documented = re.findall(re.escape('--padding-' + tier) + r'`?\s*=\s*`([^`]+)`', text)
        check(bool(documented) and all(pair == value for pair in documented), filename + ': padding pair differs from canonical $value for ' + tier)
print(json.dumps({'status': 'PASS', 'checks': checks, 'repo': str(root)}, indent=2))
