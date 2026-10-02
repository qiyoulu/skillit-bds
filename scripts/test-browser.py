#!/usr/bin/env python3
"""Rendered token and copy-paste checks.
Run: uv run --with playwright --with json5 python scripts/test-browser.py
Set BDS_BROWSER_BIN to an installed Chromium executable if needed.
"""
from pathlib import Path
import json
import os
import re
import shutil
import sys
import json5
from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
base = json5.loads((ROOT / 'tokens/tokens.json5').read_text())['base']
expected = {}
renames = {'bg': 'background', 'fg': 'foreground'}
for key, token in base['color'].items():
    if key == 'hover':
        for name, hover in token.items():
            expected['--color-' + renames.get(name, name) + '-hover'] = hover['$value']
    else:
        expected['--color-' + renames.get(key, key)] = token['$value']
for name, token in base['spacing'].items():
    expected['--' + (name if name.startswith('space-') else 'space-' + name)] = token['$value']
for name, token in base['typography']['text'].items():
    prefix = '--text-' + name
    for prop, suffix in [('fontSize', ''), ('fontWeight', '-weight'), ('lineHeight', '-leading'), ('letterSpacing', '-tracking')]:
        expected[prefix + suffix] = str(token['$value'][prop])
    sm = token.get('$extensions', {}).get('org.skillit.sm')
    if sm:
        expected[prefix + '-sm'] = sm
for group, prefix in [('padding', '--padding-'), ('weight', '--weight-'), ('family', '--font-')]:
    for name, token in base['typography'][group].items():
        expected[prefix + name] = str(token['$value'])
for group, prefix in [('radius', '--radius-'), ('layout', '--'), ('breakpoint', '--breakpoint-'), ('z', '--z-')]:
    for name, token in base[group].items():
        expected[prefix + name] = str(token['$value'])
for name, token in base['motion']['duration'].items():
    expected['--duration-' + name] = token['$value']
for name, token in base['motion']['easing'].items():
    expected['--ease-' + name] = token['$value']

checks = 0
executable = os.environ.get('BDS_BROWSER_BIN')
if not executable:
    for candidate in ['/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']:
        if Path(candidate).exists():
            executable = candidate
            break
if not executable:
    executable = shutil.which('chromium') or shutil.which('google-chrome')

with sync_playwright() as p:
    kwargs = {'headless': True, 'args': ['--disable-background-networking', '--no-first-run']}
    if executable:
        kwargs['executable_path'] = executable
    browser = p.chromium.launch(**kwargs)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    css = (ROOT / 'tokens/generated/tokens.css').read_text()
    page.set_content('<style>' + css + '</style><div id="probe">Probe</div>', wait_until='domcontentloaded')
    actual = page.evaluate('names => Object.fromEntries(names.map(n => [n, getComputedStyle(document.documentElement).getPropertyValue(n).trim()]))', list(expected))
    for name, value in expected.items():
        got = actual[name]
        assert got, f'{name} is missing or invalid'
        if re.fullmatch(r'-?\d+(?:\.\d+)?', value):
            assert float(got) == float(value), (name, value, got)
        elif name.startswith('--color-') and not name.endswith('-hover'):
            assert got.upper() == value.upper(), (name, value, got)
        elif name.endswith('-hover'):
            # Custom properties serialize their var() references as computed colors.
            assert got != '' and 'var(' not in got, (name, got)
        else:
            assert re.sub(r'\s+', ' ', got) == re.sub(r'\s+', ' ', value), (name, value, got)
        checks += 1
    rendered = page.evaluate('''() => {
        const el=document.getElementById('probe');
        el.style.cssText='font-size:var(--text-0\\\\.75x);padding:var(--padding-1\\\\.5x);background:var(--color-primary-hover)';
        const s=getComputedStyle(el);
        return {fontSize:s.fontSize,padding:s.padding,background:s.backgroundColor};
    }''')
    assert rendered['fontSize'] == '12px', rendered
    assert rendered['padding'] == '12px 24px', rendered
    assert rendered['background'] != 'rgba(0, 0, 0, 0)', rendered
    checks += 3
    color_doc = (ROOT / 'tokens/docs/color.md').read_text()
    block = re.search(r'```css\s*(:root\s*\{[\s\S]*?\})\s*```', color_doc)
    assert block, 'Color copy-paste block missing'
    page.add_style_tag(content=block.group(1))
    hovers = page.evaluate('''() => {
        const root=getComputedStyle(document.documentElement);
        const names=['background','surface','foreground','primary','warning','error','success','link'];
        return Object.fromEntries(names.map(n=>[n,root.getPropertyValue('--color-'+n+'-hover').trim()]));
    }''')
    for name, value in hovers.items():
        assert value, f'{name} hover invalid after pasting color documentation'
        checks += 1
    cap_checks = {}
    for filename in ['HUMAN-INSTRUCTIONS.md', 'LLM-INSTRUCTIONS.md']:
        document = (ROOT / filename).read_text()
        recipes = re.findall(r'`([^`\n]*margin-top:\s*calc[^`\n]*)`', document)
        assert recipes, filename + ': missing usable optical-alignment recipe'
        page.set_content('<style>' + css + '</style><p id="cap" style="font-size:var(--text-1x);' + recipes[0] + '">H</p>', wait_until='domcontentloaded')
        margin = page.evaluate("getComputedStyle(document.getElementById('cap')).marginTop")
        assert abs(float(margin.removesuffix('px')) + 5.92) < .001, (filename, margin)
        cap_checks[filename] = margin
        checks += 1
    browser.close()
print(json.dumps({'status': 'PASS', 'checks': checks, 'rendered': rendered, 'cap_alignment': cap_checks, 'repo': str(ROOT)}, indent=2))
