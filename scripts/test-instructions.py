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
import json5
from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--repo', type=Path, default=Path(__file__).resolve().parents[1])
args = parser.parse_args()
root = args.repo.resolve()
human = (root / 'HUMAN-INSTRUCTIONS.md').read_text()
llm = (root / 'LLM-INSTRUCTIONS.md').read_text()
source = json5.loads((root / 'tokens/tokens.json5').read_text())['base']
checks = 0

def check(condition, message):
    global checks
    assert condition, message
    checks += 1

check('0.66' in human and '0.66' in llm, 'Both instruction documents must use measured Work Sans cap ratio 0.66')
for filename in ['HUMAN-INSTRUCTIONS.md', 'LLM-INSTRUCTIONS.md', 'tokens/docs/typography.md', 'rules/layout.md']:
    text = (root / filename).read_text()
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
for filename in ['HUMAN-INSTRUCTIONS.md', 'LLM-INSTRUCTIONS.md']:
    text = (root / filename).read_text()
    counts = {}
    slugs = set()
    for heading in re.findall(r'^#{1,6}\s+(.+)', text, re.M):
        heading = re.sub(r'\*|`|\\', '', heading)
        slug = re.sub(r'[^\w\s-]', '', heading.lower()).replace(' ', '-')
        number = counts.get(slug, 0)
        counts[slug] = number + 1
        slugs.add(slug + ('-' + str(number) if number else ''))
    for target in re.findall(r'\[[^]]*\]\(([^)]*)\)', text):
        if target.startswith('#'):
            check(target[1:] in slugs, filename + ': missing heading ' + target)
        elif not re.match(r'\w+://|mailto:', target):
            path = target.split('#')[0]
            check((root / path).exists(), filename + ': missing resource ' + path)

# Approved fixed SVG assets may contain canonical paint; UI icons inherit instead.
colors = {token['$value'].upper() for name, token in source['color'].items() if name != 'hover'}
for svg in sorted((root / 'assets/logo').glob('*.svg')):
    doc = ET.fromstring(svg.read_text())
    for element in doc.iter():
        for prop in ['fill', 'stroke']:
            paint = element.get(prop)
            if paint:
                canonical_paint = {'white': '#FFFFFF'}.get(paint.lower(), paint.upper())
                check(canonical_paint in colors or paint in ['none', 'currentColor'], str(svg.relative_to(root)) + ': stale paint ' + paint)
    if svg.stem.startswith(('mark-', 'lockup-', 'favicon-')):
        png = svg.with_suffix('.png')
        check(png.exists(), str(png.relative_to(root)) + ': missing paired raster export')
        image = Image.open(png).convert('RGBA')
        _, _, width, height = map(float, doc.get('viewBox').split())
        check(image.size == (math.ceil(width / height * 512), 512), png.name + ': export must be 512px high with preserved aspect')
        suffix = svg.stem.rsplit('-', 1)[1]
        key = {'canvas': 'bg', 'iron': 'fg', 'plaster': 'surface'}[suffix]
        color = source['color'][key]['$value'].lstrip('#')
        expected = tuple(int(color[n:n+2], 16) for n in [0, 2, 4])
        pixels = image.tobytes()
        opaque = {tuple(pixels[n:n+3]) for n in range(0, len(pixels), 4) if pixels[n+3] == 255}
        check(opaque == {expected}, png.name + ': opaque paint does not match the canonical variant')

# Canonical paired padding is not a new token scheme; all unchanged values resolve.
for tier in ['0.75x', '1x', '1.5x', '2x']:
    check(tier in source['typography']['padding'], 'Missing approved padding tier ' + tier)
print(json.dumps({'status': 'PASS', 'checks': checks, 'repo': str(root)}, indent=2))
