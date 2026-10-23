#!/usr/bin/env python3
"""Rendered component and icon regression checks.
Run: uv run --with tinycss2 --with playwright python scripts/test-components.py
Set BDS_BROWSER_BIN to an installed Chromium executable if needed.
"""
from pathlib import Path
import os
import shutil
import tempfile
import sys
import base64
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import tinycss2
from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
DEPLOYMENT_BASE = ROOT / 'tokens/generated'
svgs = sorted((ROOT / 'assets/icons').glob('*.svg'))
assert svgs, 'Icon inventory is empty'

# Geometry fingerprints of the approved reexports (not the older HEAD assets).
# Review/update these explicitly when accepting new artwork; never derive them
# from the assets under test. Paint spelling is normalized separately below.
ICON_GEOMETRY = {
    'arrow-down.svg': '42bb1ea24bcd7498ddaf616d12f24506b93e7215e6dfe4dd019e9b3a513d0754',
    'arrow-down-circle.svg': 'cc551cddf4222de5b4fa65203a888082de45f007f86c283e256f6ced22e787aa',
    'arrow-down-left.svg': '96af5024b321029e2f498ea32350224164da264bff9351513566626316635af5',
    'arrow-down-right.svg': '5489610e8f1555f81e4e688c77665d8670b651b6bfb8d90c92d1a18133f3d435',
    'arrow-left.svg': '2ac1889d7454d4bc22f62860cd2070c75dc0661c89d64437e103b5702ca6c773',
    'arrow-left-circle.svg': '1a563305b017c584f02b223dbd22001b638ea3636919b2d9a754c41a440446a1',
    'arrow-left-right.svg': 'ddfa6cf34353495bd731f6ba6214addb6339ef69d0bd113438a5a3f5fd251c7e',
    'arrow-path.svg': '364cfbf29482e2e37fe01d10f7bb2dcaa46087f03cf6b0ecba35f42ee0b7a677',
    'arrow-right.svg': 'eb0a0b77f8e823b078a8b67094e488000f0d74d6c8e501091a99c744a597f2a7',
    'arrow-right-circle.svg': '1570ec294b901da1bacf69df402dd1361718ad84416f6da25ccd340604fb378f',
    'arrow-top-right-on-square.svg': 'ed2373abe7785d9ea373c518a2f80bf5826621cca3070357fec99725be003c25',
    'arrow-up.svg': 'b70d019dd8b33052a6d53a4f86766710e0fee06fd421c47c48080c4d3ac5baa8',
    'arrow-up-circle.svg': '583a1f5c1982db6c768b9f8114f89488f69d9e9307d9554cc5596f3142544b5d',
    'arrow-up-left.svg': '6c94ed7afd0a5ad021509737a4c41b3bb9d6a8133becfbbe8740af19491a096e',
    'arrow-up-right.svg': '15ad463fa70636ed562fdb9dd49128176d9b2325672823942057ba09b1d443dc',
    'arrow-up-tray.svg': 'c0cfdd02de09d0b47d15c05eca20c9c51fb714076ee21fb430c18c0bc1d7863b',
    'bars-3.svg': 'a8a00920740eb6e22c6a43eef07721dd678627ba5842935930895312f62ae5e8',
    'bolt.svg': '02f0dd8bfc8ae8edaa6daeed358598104cb9d9cd47ba51533cc3531452be4c67',
    'bolt-circle.svg': '5c43bfff4baa055ca874c87f8d3869bac730ec8b209edbbcca492b3a7bb0de07',
    'bookmark.svg': '408b5769b6c5c550129cf8ad2868f8b2da926af73482ee2763b47d5291cfc257',
    'briefcase.svg': '2660d26b438e03b01a29885097a8f7bcdb15e4e978411e005cb5270883435ebd',
    'calendar.svg': 'd04e4f50ba5bd0dfecb2457b9dec52b8b564c3d4202d925f345d003c775e36aa',
    'check.svg': '91081b52107ff74f07d33abefe2349924a7760941adc2ea5ccf1a514d0d96535',
    'check-circle.svg': '470b17db0b3fbd156bbdd0b33ee7ced1a0de5fd530df2cf1a669195a32c15100',
    'checkbox-checked.svg': '12c5834bbe680cd9a8449beb3b8a86835575e041f0244adc5517bd9db4a7300a',
    'checkbox-unchecked.svg': '50a8d84849f4216621cd69012e6650e78d47ed3230afe88556fe7c3626b52093',
    'chevron-down.svg': '34ed7f9592b2f176c60c3edefb7e6b575ed399995741c39cfa2d47d5bdeb98a7',
    'clock.svg': 'cf611fe432519fba1519d8929f49960d4e6a76f8933f6fe063748f8a23c05f9f',
    'concrete.svg': 'd4f0848d5885386f9f02e717738948b355d284384a9a1d1f187d86dc2e194d47',
    'credit-card.svg': 'ad7b9ac3fec03d5285145e30ceb69ac83741d9e3bd3c3fa7fda95425622d4dbd',
    'currency-dollar.svg': '3376f8c355a4236dd16afa362b00dd2e8342bcb870071299607680d048538680',
    'device-phone-mobile.svg': '205f396db21b82a37088c118c9b7ae3bf759a50ac2b6ef69db6a82eb642b6029',
    'document-text.svg': '7439cd86ef4eb3e9b6b777675b2c8bc7de8b4e55f3c06691a7917c4bf2f8ec2b',
    'envelope.svg': '1eca87f8a8f38e34bd1b34880aab3860c949171ffb56658f70160059874ddbe1',
    'excavator.svg': '8bf9044142dd3f74686a56b70300eb43b87fe36e4fd8b6dbece9b6ed1549e2a0',
    'exclamation-triangle.svg': 'f88ba2726d56001ed64af3cfff536a60956191ebe4d33a83e97c1c0114c865c1',
    'eye.svg': 'a710dc79271cbe6d27071d30a9223e88a078ac9342b0a55bd98f880868ad5ff8',
    'eye-slash.svg': 'c8d237dd99a727e85471c09a39ac1c5928360a10cc62583e9434addb53a6190b',
    'facebook.svg': '31b8f69997ea684cdddfd29bd872172f98a6e7f420daa932feb8fa55e987e720',
    'film-reel.svg': '1c59509dadbd0bab59111f55a3511a7619a56b918f480466c6ea41fa7455d8c5',
    'flag.svg': '52f02367389b6b7008d14b9ff805989303bcaab648535e4537210c6b5b97b6c9',
    'globe-alt.svg': '4558f2680242326745a86363a4183b5a665f0c21e0540c491938a8355a9099de',
    'home.svg': '537fc3350824773c8d9cb0f5ef4675cc86df55676cc1894fef900114e42bcc3a',
    'inbox.svg': '745ef98d97af01819ef7421b6f33a76209d7af7c400580f2c421d9185ebdafae',
    'information-circle.svg': 'b5454bf09c0ca6d5922c526354070697d0f37c4be06dce8df31a997e87018daa',
    'information-square.svg': '98f6eb7e6772131856fe9cae9262ee8b04e43f75fae9740ffead8f4aee1c74e6',
    'instagram.svg': '6feaf4add89d9b05e87e4b4855365ca4f59cfa8241dfd7684e85659a9dcfa557',
    'language.svg': '766d85ed99668a61c28981a65d07d5d43902f71660af63a99b12cff4042c39d3',
    'light-bulb.svg': '8efef149a5e6ed54e6f2eb5469ff1f05f7283851391cc4c9b2f02495d76c14f2',
    'linkedin.svg': '8da9028ab96dbbe2e762ccb447de0d77ddf10514e7da5d0ccfa80965298e2945',
    'lock-closed.svg': '50dadcdc0b784cd27093a8cc9f3289be3da52913bff4fa30ded07087abc65514',
    'lock-closed-circle.svg': '61dba945a9fe1b371d98906a1b9d274b0489e2b1fec74586dc386a9209f0a2c5',
    'lock-open.svg': '88dc254ea99ce740939f900b412f42fe80082a44649a29029747c6b800b8d46f',
    'magnifying-glass.svg': '942fb64f022665160eedf2f30597b53da9b7a364fa10ff6e2118b5afdb823c71',
    'map.svg': '2fd60ea90f9566c5ef450ec08fc31b367492b1b8fcaa38b3bb21af48f6f52c79',
    'map-pin.svg': 'af9e584c1da3bfd2250b36171ec6ef1b5e747a7e5a984e04a7be7a59e1b8c666',
    'pause.svg': '296f39bae8b49bc2bfbf2835bb768a120ad27a1007c3a9576df9a377504d967f',
    'pause-circle.svg': 'b76d7867e9d0762b11062c6b472bbcfc9baba15014cb3f7669a9d6959b522a81',
    'pencil.svg': 'd344d3d751726a0bf248b50619a69711baedb5c847e0cc29e54cc9194171b0e3',
    'phone.svg': '14faf250e0ae7fb47fbb09ba396206b91e155b025349ed96ea6580f4ca9097be',
    'phone-arrow-down-left.svg': 'bd5b851291f86f3ac4b84c405a0c3f167fbc778ef86b05fa672dc4fd1366174d',
    'phone-arrow-up-right.svg': '993359c08d3cd1894823dbb4cd1eb9f3e2b897c24ecc4669d16965e0a417ce1b',
    'phone-x-mark.svg': 'da20805d9481b1ef5559ed7ef6a40b302029c7d509953c745376b0f4cb3bd933',
    'pipe.svg': 'e290a0e9f025b5a8b399ebd6ff84f603eeb9fe71501a8172bc0b448e07d22af9',
    'play.svg': 'bd50035d60f07e2d25d4104376fe19be92658bd68ed64b6188f49fe72d4b1f56',
    'play-circle.svg': '31f58d4470c009cea94d1ba561858b67530f8e10420154b9703a99a058723986',
    'plus.svg': '60265b7eaf616ffd314c84fa6a796b41430a162c8d16a00a776f6edcda838427',
    'plus-circle.svg': '81f933f6474d192122f492908f94011feb4121e50452a96b47f17fb3b8392c79',
    'puzzle-piece.svg': '3c57e785749bd6b58af374589fa0d46a8ddc661391169ee2998701c30fdd87fe',
    'question-mark-circle.svg': '5175c9eabc06a2480bbeae063916fb9d144c2f6fadfe11e6027e3caf81c248d9',
    'radio-checked.svg': 'b67dfc040e25d48a867bf1b023d93d45e9368b8e65dcb2b055f0c6dcd46f33c9',
    'radio-unchecked.svg': 'd44d142c34d6fb5de2c9ce12216c190e879f8a3c7158576818d550f238070687',
    'saw.svg': '661ff4d2026e3973aee2b8d5086fecbabdc788123c1610bd4bb00d689cf0b494',
    'share.svg': 'b050c470a29021bab97db3b83f1fa31dc779e0c864003e4aacc865430d8d5598',
    'arrow-up-on-square.svg': 'b505083c8728af49f68dc3e6bec3f91a00a417c8c47a47dbab20c3f0992d9c0a',
    'star.svg': 'b115cdb78ae2b14033461ce793caab08715c373cb56462de613ddff621f1b4cd',
    'switch-off.svg': 'ba85dfcb3e193ec0f704933337beaebdd088789159fbd3495c20efbba6def3c4',
    'switch-on.svg': 'a0555c4364879d4139b9f14e11ae487e6fafc5a0fa31a9cd660f254844a5adae',
    'user.svg': 'ebeb722ee9892a1ac15e57ebb5c1a2c94d87f43744566b59cd6d74ff3ea4804a',
    'user-circle.svg': 'ec0481ad9f0a9fe849cce898253f12d9b16f84af9b9def73089a4c39cf6255be',
    'user-hat.svg': '0a9d2f2f0e246980e735e060beaecde9aa7a30ad0555d8f48cec11cf282a1c3e',
    'user-headset.svg': 'e1fe99dad34df96a7e51b1ef361fb4f419e462dce03f81a8f06a655745dd59a8',
    'user-round.svg': '56bc2d257f7b9793d7386f9102b28d095e61ad7c02b8977ed259e5008b662039',
    'whatsapp.svg': 'b64880fdf55a1611deb8f6e10a541cd5814cb73924e756c02d69ea92738137df',
    'wrench.svg': 'dc884c7cea077a700fc78f787f8fa08c9bdbc95027e999663d74430431d3d938',
    'x.svg': '835c248b6cc0e9380f6bd68ab523e33ec2ea2d85b5997f22022d621127d4a843',
    'x-circle.svg': 'e55da90820f0cf673b4acf149d758170471533b703200c3996ac5f3b1c6112f5',
    'x-mark.svg': 'b436a04d99bfaf63e013a37c340e0737cb56492d19ec51b8daf20652b5f6f1eb',
    'x-octagon.svg': '2150417526da1c6544199359545c740092f7daa6344babe8bc2b95ea0deff2b8',
    'youtube.svg': 'f80ffa738a332ab8bad1b5c355168e857ccbbf1340eaa65befb77ca871ba9235',
}

# Exact ordered paint layers of USER-approved Downloads/icons exports.
# Exported #233136 is intentional; utilities alone normalize to currentColor.
EXPORTED_PAINTS = {
    'check-circle.svg': ((('fill', 'none'),), (('fill', '#33663d'),), (('fill', '#ffffff'),)),
    'checkbox-checked.svg': ((('fill', 'none'),), (('fill', '#ef6f1a'),), (('fill', '#233136'),)),
    'exclamation-triangle.svg': ((('fill', 'none'),), (('fill', '#feb11c'),), (('fill', '#ffffff'),), (('fill', '#ffffff'),)),
    'information-circle.svg': ((('fill', 'none'),), (('fill', '#007ca6'),), (('fill', '#ffffff'),), (('fill', '#ffffff'),)),
    'information-square.svg': ((('fill', 'none'),), (('fill', '#007ca6'),), (('fill', '#ffffff'),), (('fill', '#ffffff'),)),
    'pause-circle.svg': ((('fill', 'none'),), (('fill', '#233136'),), (('fill', '#ffffff'),), (('fill', '#ffffff'),)),
    'play-circle.svg': ((('fill', 'none'),), (('fill', '#233136'),), (('fill', '#ffffff'),)),
    'puzzle-piece.svg': ((('fill', 'none'),), (('fill', '#33663d'),)),
    'radio-checked.svg': ((('fill', 'none'),), (('fill', '#ef6f1a'),), (('fill', '#ffffff'),)),
    'switch-off.svg': ((('fill', 'none'),), (('fill', '#ffffff'),), (('fill', '#233136'),)),
    'switch-on.svg': ((('fill', 'none'),), (('fill', '#ffffff'),), (('fill', '#33663d'),)),
    'x-octagon.svg': ((('fill', 'none'),), (('fill', '#c8102e'),), (('fill', '#ffffff'),)),
}

def paint_key(value):
    value = value.strip().lower()
    return {'white': '#ffffff', '#fff': '#ffffff'}.get(value, value)

def validate_icons(paths):
    names = {p.name for p in paths}
    assert names == set(ICON_GEOMETRY), ('Icon inventory changed; review reexports', sorted(names - set(ICON_GEOMETRY)), sorted(set(ICON_GEOMETRY) - names))
    for p in paths:
        root = ET.fromstring(p.read_text())
        assert root.attrib['viewBox'] == '0 0 24 24', p
        geometry = [(e.tag, sorted((k, v) for k, v in e.attrib.items() if k not in ('fill', 'stroke'))) for e in root.iter()]
        digest = hashlib.sha256(json.dumps(geometry, separators=(',', ':')).encode()).hexdigest()
        assert digest == ICON_GEOMETRY[p.name], (p, 'export geometry/attributes changed')
        paints = tuple(tuple((k, paint_key(e.attrib[k])) for k in ('fill', 'stroke') if k in e.attrib) for e in root.iter())
        if p.name in EXPORTED_PAINTS:
            assert paints == EXPORTED_PAINTS[p.name], (p, 'export paint layers changed', paints)
        else:
            for i, e in enumerate(root.iter()):
                assert paint_key(e.get('fill', '')) == ('none' if i == 0 else 'currentcolor'), (p, 'utility fill must inherit', e.attrib)
                assert paint_key(e.get('stroke', 'none')) == 'none', (p, 'solid utility must not gain stroke', e.attrib)

validate_icons(svgs)

# Mutate scratch copies, not approved artwork. Reject geometry, paint and inventory
# regressions independently, including colors allowed for another semantic asset.
negative_cases = [
    ('check.svg', lambda s: s.replace('M1 12', 'M2 12'), 'geometry'),
    ('magnifying-glass.svg', lambda s: s.replace('currentColor', '#233136'), 'utility paint'),
    ('play-circle.svg', lambda s: s.replace('white', 'none'), 'opaque media layer'),
    ('pause-circle.svg', lambda s: s.replace('white', '#33663D'), 'media palette'),
    ('radio-checked.svg', lambda s: s.replace('white', '#233136'), 'radio palette'),
    ('check-circle.svg', lambda s: s.replace('#33663D', '#C8102E'), 'semantic palette'),
    ('switch-on.svg', lambda s: s.replace('M13 12', 'M3 12'), 'switch geometry'),
    ('phone.svg', lambda s: (ROOT / 'assets/icons/device-phone-mobile.svg').read_text(), 'distinct new handset'),
    ('user-circle.svg', lambda s: (ROOT / 'assets/icons/user-round.svg').read_text(), 'distinct new enclosed circle'),
]
with tempfile.TemporaryDirectory(prefix='bds-icon-controls-', dir=os.environ.get('TMPDIR', str(Path.home() / '.hermes/cache/scratch'))) as scratch:
    copies = Path(scratch) / 'icons'
    shutil.copytree(ROOT / 'assets/icons', copies)
    for name, mutate, label in negative_cases:
        target = copies / name
        original = target.read_text()
        changed = mutate(original)
        assert changed != original, (name, 'negative mutation did not apply')
        target.write_text(changed)
        try:
            validate_icons(sorted(copies.glob('*.svg')))
        except AssertionError:
            pass
        else:
            raise AssertionError((name, 'negative control accepted', label))
        finally:
            target.write_text(original)
    (copies / 'arrow-up-on-square.svg').rename(copies / 'share-alt.svg')
    try:
        validate_icons(sorted(copies.glob('*.svg')))
    except AssertionError:
        pass
    else:
        raise AssertionError('Unapproved arrow-up-on-square rename accepted')
print(f'PASS XML negative controls: {len(negative_cases) + 1} geometry/paint/inventory mutations rejected')
print(f'PASS XML: {len(svgs)} approved icons; exact export geometry; {len(EXPORTED_PAINTS)} semantic/multicolor paint exceptions; other utilities inherit currentColor')

fences = {}
css_errors = []
url_count = 0

def check_tokens(tokens, location):
    for t in tokens:
        if t.type == 'error':
            css_errors.append((location, t.message))
        if t.type == 'function':
            if t.lower_name == 'var':
                first = [v for v in t.arguments if v.type not in ('whitespace', 'comment')]
                # Every recipe var() begins with one valid custom-property ident.
                assert first and first[0].type == 'ident' and first[0].value.startswith('--'), (location, first)
                assert len(first) == 1 or first[1].type == 'literal' and first[1].value == ',', (location, first)
            check_tokens(t.arguments, location)
        elif hasattr(t, 'content') and t.content is not None:
            check_tokens(t.content, location)

def check_rules(rules, location):
    for rule in rules:
        if rule.type == 'error':
            css_errors.append((location, rule.message))
        elif rule.type == 'qualified-rule':
            check_tokens(rule.prelude, location)
            declarations = tinycss2.parse_declaration_list(rule.content, skip_comments=True, skip_whitespace=True)
            for d in declarations:
                if d.type == 'error':
                    css_errors.append((location, d.message))
                elif d.type == 'declaration':
                    check_tokens(d.value, location)
        elif rule.type == 'at-rule' and rule.content is not None:
            check_rules(tinycss2.parse_rule_list(rule.content, skip_comments=True, skip_whitespace=True), location)

for p in sorted((ROOT / 'components').glob('*.md')):
    text = p.read_text()
    blocks = re.findall(r'```css\s*\n(.*?)\n```', text, re.S)
    fences[p.name] = blocks
    for i, css in enumerate(blocks, 1):
        check_rules(tinycss2.parse_stylesheet(css, skip_comments=True, skip_whitespace=True), f'{p.name}:{i}')
        for url in re.findall(r'url\([\'\"]?([^\'\")]+)', css):
            assert (DEPLOYMENT_BASE / url).resolve().is_file(), (p, url)
            url_count += 1
    assert '--text-mono' not in text, p
assert not css_errors, css_errors
print(f'PASS CSS: {sum(map(len, fences.values()))} component fences parsed; valid var() identifiers; {url_count} CSS asset URLs resolve from documented tokens/generated deployment base')

names = ['buttons.md', 'checkboxes.md', 'forms.md', 'modal.md', 'toast.md', 'validation.md', 'navigation.md', 'icons.md', 'badges.md']
css = (ROOT / 'tokens/generated/tokens.css').read_text() + '\n' + '\n'.join(block for name in names for block in fences[name])
def data_asset(match):
    path = (DEPLOYMENT_BASE / match[1]).resolve()
    data = base64.b64encode(path.read_bytes()).decode()
    return f'url("data:image/svg+xml;base64,{data}")'
# Use real local asset bytes in isolated fixture; URL path validity was checked above.
css = re.sub(r'url\([\'\"]([^\'\"]+)[\'\"]\)', data_asset, css)
fixture = '''
<label class="checkbox-row" id="row"><input type="checkbox" class="checkbox" name="terms" value="accepted"><span class="checkbox-box" aria-hidden="true"></span><span class="checkbox-label">Accept terms</span></label>
<label class="checkbox-row" id="disabled-row"><input type="checkbox" class="checkbox" disabled><span class="checkbox-box" aria-hidden="true"></span><span class="checkbox-label">Disabled</span></label>
<button type="button" class="chip--check" role="checkbox" aria-checked="false" id="chip"><span class="chip__indicator" aria-hidden="true"></span><span>Per diem</span></button>
<button type="button" class="chip--radio" role="radio" aria-checked="true" id="radio-chip"><span class="chip__indicator" aria-hidden="true"></span><span>One choice</span></button>
<label for="trade">Trade</label><span class="select-wrap" id="select-wrap"><select class="select" id="trade"><option value="carpenter">Carpenter</option><option value="electrician">Electrician</option></select></span>
<div class="surface-plaster" style="background-color: rgb(255, 255, 255)"><button class="btn-secondary" id="secondary">Cancel</button></div>
<div class="modal modal-enter-active" id="modal" role="dialog" aria-modal="true" aria-label="Test" style="height:200px">Dialog</div>
<div class="toast toast--warning" id="warning-toast"><span class="toast__icon" id="warning-toast-icon"></span><span>Warning</span></div>
<div class="toast toast--info" id="info-toast"><span class="toast__icon" id="info-toast-icon"></span><span>Information</span><button class="toast__close" id="info-close">Dismiss info</button></div>
<span class="validation-badge validation-badge--error" id="error-icon"></span>
<span id="hover-probe" style="background-color:var(--color-background-hover)"></span>
'''
js = '''document.querySelector('#chip').addEventListener('click', () => { const c=document.querySelector('#chip'); c.setAttribute('aria-checked', String(c.getAttribute('aria-checked') !== 'true')); });'''

def style(page, selector, prop, pseudo=None):
    return page.evaluate('([s,p,pseudo])=>getComputedStyle(document.querySelector(s),pseudo).getPropertyValue(p)', [selector, prop, pseudo])

with sync_playwright() as pw:
    executable = os.environ.get('BDS_BROWSER_BIN')
    if not executable:
        executable = next((x for x in ['/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] if Path(x).exists()), None)
    executable = executable or shutil.which('chromium') or shutil.which('google-chrome')
    options = {'headless': True, 'timeout': 20000, 'args': ['--disable-background-networking', '--no-first-run']}
    if executable:
        options['executable_path'] = executable
    browser = pw.chromium.launch(**options)
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.set_content('<style>' + css + '\n.modal{transition:none}body{margin:0}</style>' + fixture + '<script>' + js + '</script>', wait_until='domcontentloaded')
    checkbox = page.get_by_role('checkbox', name='Accept terms')
    assert style(page, '.checkbox', 'appearance') == 'none'
    assert not checkbox.is_checked()
    assert style(page, '.checkbox-box', 'visibility', '::after') == 'hidden'
    assert page.locator('#row').bounding_box()['height'] >= 40
    assert page.locator('#row').bounding_box()['width'] >= 40
    checkbox.focus()
    assert style(page, '#row', 'outline-style') == 'solid'
    assert style(page, '#row', 'outline-width') == '2px'
    assert style(page, '#row', 'outline-offset') == '2px'
    assert style(page, '#row', 'outline-color') == 'rgb(239, 111, 26)', 'User policy retains Orange focus; Canvas contrast remains documented, not waived'
    page.keyboard.press('Space')
    assert checkbox.is_checked()
    assert style(page, '.checkbox-box', 'visibility', '::after') == 'visible'
    assert style(page, '.checkbox-box', 'background-color') == 'rgb(239, 111, 26)'
    assert style(page, '.checkbox-box', 'background-color', '::after') == 'rgb(35, 47, 54)'
    checked_box = page.locator('.checkbox-box').first.bounding_box()
    assert checked_box['width'] == checked_box['height'] == 16
    page.locator('#row .checkbox-label').click()
    assert not checkbox.is_checked()
    assert style(page, '.checkbox-box', 'visibility', '::after') == 'hidden'
    assert style(page, '#disabled-row', 'opacity') == '0.5'
    print('PASS browser checkbox: label association, native Space/click toggles, appearance none, 16px square, 40px row, visible row focus, disabled opacity')

    chip = page.locator('#chip')
    chip.focus()
    page.keyboard.press('Space')
    assert chip.get_attribute('aria-checked') == 'true'
    assert style(page, '.chip__indicator', 'mask-image') == 'none'
    assert style(page, '.chip__indicator', 'border-radius') == '0px'
    assert style(page, '.chip__indicator', 'background-color') == 'rgb(239, 111, 26)'
    assert style(page, '.chip__indicator', 'background-color', '::after') == 'rgb(35, 47, 54)'
    assert style(page, '.chip__indicator', 'visibility', '::after') == 'visible'
    assert 'data:image/svg+xml' in style(page, '.chip__indicator', 'mask-image', '::after')
    assert page.locator('#chip .chip__indicator').bounding_box()['width'] == 16
    page.keyboard.press('Enter')
    assert chip.get_attribute('aria-checked') == 'false'
    assert style(page, '.chip__indicator', 'visibility', '::after') == 'hidden'
    print('PASS browser chip: Space/Enter toggles aria-checked; Orange square and Iron check track state')
    assert style(page, '#radio-chip .chip__indicator', 'background-color') == 'rgb(239, 111, 26)'
    page.locator('#radio-chip').evaluate("e => e.setAttribute('aria-checked', 'false')")
    assert style(page, '#radio-chip .chip__indicator', 'border-top-color') == 'rgb(239, 111, 26)'
    print('PASS browser radio styling: Orange selected fill and unselected outline; state supplied by the control')

    select_before = style(page, '#select-wrap', 'transform', '::after')
    page.locator('#trade').focus()
    assert style(page, '#select-wrap', 'transform', '::after') == select_before
    assert style(page, '#trade', 'background-image') == 'none'
    assert style(page, '#select-wrap', 'background-color', '::after') == style(page, '#select-wrap', 'color')
    page.select_option('#trade', 'electrician')
    assert page.locator('#trade').input_value() == 'electrician'
    assert style(page, '#select-wrap', 'transform', '::after') == select_before
    assert page.locator('#trade').bounding_box()['height'] >= 40
    print('PASS browser select: native value changes; focus/closed state leaves chevron down; host-painted mask matches Iron; 40px target')

    page.mouse.move(389, 0)
    base_fill = style(page, '#secondary', 'background-color')
    page.locator('#secondary').hover()
    hover_fill = style(page, '#secondary', 'background-color')
    assert hover_fill == style(page, '#hover-probe', 'background-color') and hover_fill != base_fill
    print(f'PASS browser inline-white secondary with normalized class: {base_fill} -> {hover_fill}')

    mobile = page.locator('#modal').bounding_box()
    assert mobile['x'] == 0 and mobile['width'] == 390 and mobile['y'] + mobile['height'] == 844, mobile
    page.locator('#modal').evaluate('(e)=>e.className="modal modal-enter"')
    assert style(page, '#modal', 'transform') == 'matrix(1, 0, 0, 1, 0, 200)'
    page.set_viewport_size({'width': 1280, 'height': 900})
    page.locator('#modal').evaluate('(e)=>e.className="modal modal-enter-active"')
    desktop = page.locator('#modal').bounding_box()
    assert desktop['width'] == 560 and desktop['x'] + desktop['width']/2 == 640 and desktop['y'] + desktop['height']/2 == 450, desktop
    print(f'PASS browser modal: mobile {mobile}; desktop {desktop}; mobile hidden Y=200px without desktop X centering')

    assert style(page, '#warning-toast-icon', 'color') == 'rgb(254, 177, 28)'
    assert style(page, '#error-icon', 'color') == 'rgb(200, 16, 46)'
    assert style(page, '#warning-toast', 'border-radius') == '16px'
    assert style(page, '#info-toast', 'border-radius') == '16px'
    assert style(page, '#info-toast', 'background-color') == 'rgb(255, 255, 255)'
    assert style(page, '#info-toast', 'color') == 'rgb(35, 47, 54)'
    assert style(page, '#info-toast-icon', 'color') == 'rgb(0, 124, 166)'
    page.locator('#info-close').focus()
    assert style(page, '#info-close', 'outline-color') == 'rgb(239, 111, 26)'
    print('PASS browser color policy: semantic status colors; Orange focus and Iron progress retained; no blanket accessibility claim')
    expected_status = {'error': 'rgb(200, 16, 46)', 'warning': 'rgb(254, 177, 28)', 'success': 'rgb(51, 102, 61)', 'info': 'rgb(0, 124, 166)'}
    for state, expected_color in expected_status.items():
        page.evaluate('''([state, svg]) => {
            const host=document.createElement('div');host.id='status-'+state;
            host.innerHTML='<span class="validation-badge validation-badge--'+state+'"></span>' +
                '<span class="badge badge-'+state+'"><span class="icon"></span></span>' +
                '<span class="icon--'+state+'"></span>' +
                '<span class="validation-icon validation-icon--'+state+'">'+svg+'</span>' +
                '<div class="toast toast--'+state+'"><span class="toast__icon"></span><span class="toast__message">'+state+'</span></div>';
            document.body.append(host);
        }''', [state, (ROOT / 'assets/icons/check.svg').read_text()])
        for selector in ['.validation-badge', '.badge .icon', '.icon--'+state, '.toast__icon', '.validation-icon']:
            assert style(page, '#status-'+state+' '+selector, 'color') == expected_color, (state, selector)
        assert style(page, '#status-'+state+' .validation-icon path', 'fill') == expected_color, state
        for selector, pseudo in [('.validation-badge', '::before'), ('.toast__icon', None)]:
            host = '#status-'+state+' '+selector
            assert style(page, host, 'background-color', pseudo) == 'rgba(0, 0, 0, 0)', (state, selector)
            assert style(page, host, 'mask-image', pseudo) == 'none', (state, selector)
            background = style(page, host, 'background-image', pseudo)
            expected_asset = {'error': 'x-octagon.svg', 'warning': 'exclamation-triangle.svg',
                              'success': 'check-circle.svg', 'info': 'information-circle.svg'}[state]
            expected_url = 'data:image/svg+xml;base64,' + base64.b64encode(
                (ROOT / 'assets/icons' / expected_asset).read_bytes()).decode()
            assert background == 'url("' + expected_url + '")', (state, selector, background)
            assert style(page, host, 'background-size', pseudo) == 'contain', (state, selector)
            assert style(page, host, 'background-repeat', pseudo) == 'no-repeat', (state, selector)
            colors = page.evaluate('''async url => {
                const image = new Image(); image.src = url; await image.decode();
                const canvas = document.createElement('canvas'); canvas.width = canvas.height = 24;
                const context = canvas.getContext('2d'); context.drawImage(image, 0, 0, 24, 24);
                const pixels = context.getImageData(0, 0, 24, 24).data;
                const colors = new Set();
                for (let i = 0; i < pixels.length; i += 4) {
                    if (pixels[i+3] === 255) colors.add('rgb(' + pixels[i] + ', ' + pixels[i+1] + ', ' + pixels[i+2] + ')');
                }
                return [...colors];
            }''', expected_url)
            assert expected_color in colors and 'rgb(255, 255, 255)' in colors, (state, selector, colors)
        assert style(page, '#status-'+state+' .toast', 'background-color') == 'rgb(255, 255, 255)'
        assert style(page, '#status-'+state+' .toast', 'color') == 'rgb(35, 47, 54)'
    page.evaluate("() => { const e=document.createElement('span');e.id='neutral-utility';e.className='icon--neutral';document.body.append(e); }")
    assert style(page, '#neutral-utility', 'color') == 'rgb(35, 47, 54)'
    print('PASS browser semantic matrix: all four meanings across validation/badge/standalone/toast hosts, inline utility fills, exact status background images with opaque white glyphs; light toast surfaces; neutral utility Iron')

    # Inline semantic/control/media exports retain their exact layers even under
    # a contrasting host color. Utility SVGs, unlike these exceptions, inherit.
    for name, expected_paints in EXPORTED_PAINTS.items():
        fills = page.evaluate('''svg => {
            const host=document.createElement('span');
            host.style.color='magenta'; host.innerHTML=svg;
            document.body.append(host);
            const values=Array.from(host.querySelectorAll('svg, svg *')).map(e=>getComputedStyle(e).fill);
            host.remove(); return values;
        }''', (ROOT / 'assets/icons' / name).read_text())
        expected_fills = []
        for paints in expected_paints:
            fill = dict(paints)['fill']
            expected_fills.append('none' if fill == 'none' else 'rgb(' + ', '.join(str(int(fill[i:i+2], 16)) for i in (1, 3, 5)) + ')')
        assert fills == expected_fills, (name, fills, expected_fills)
    print('PASS browser inline export layers: semantic and multicolor fills ignore host tint; exported dark paint unchanged')
    for asset in svgs:
        if asset.name in EXPORTED_PAINTS:
            continue
        fills = page.evaluate('''svg => {
            const host=document.createElement('span');host.style.color='magenta';host.innerHTML=svg;
            document.body.append(host);
            const values=Array.from(host.querySelectorAll('svg *')).map(e=>getComputedStyle(e).fill);
            host.remove();return values;
        }''', asset.read_text())
        assert fills and all(fill == 'rgb(255, 0, 255)' for fill in fills), (asset.name, fills)
    print(f'PASS browser utility inheritance: {len(svgs) - len(EXPORTED_PAINTS)} actual exports follow contrasting host tint')


    # The reexport separates the solid play triangle from two-color circle art.
    # Sample actual asset bytes: light artwork is opaque, never a knockout.
    raster_cases = {
        'play.svg': ([[11, 12], [5, 12], [0, 0]], [[0, 0, 0, 255], [0, 0, 0, 0], [0, 0, 0, 0]]),
        'play-circle.svg': ([[11, 12], [5, 12], [0, 0]], [[255, 255, 255, 255], [35, 49, 54, 255], [0, 0, 0, 0]]),
        'pause-circle.svg': ([[8, 12], [16, 12], [12, 12], [0, 0]], [[255, 255, 255, 255], [255, 255, 255, 255], [35, 49, 54, 255], [0, 0, 0, 0]]),
        'switch-on.svg': ([[17, 12], [7, 12], [0, 0]], [[51, 102, 61, 255], [255, 255, 255, 255], [0, 0, 0, 0]]),
        'switch-off.svg': ([[7, 12], [17, 12], [0, 0]], [[35, 49, 54, 255], [255, 255, 255, 255], [0, 0, 0, 0]]),
        'radio-checked.svg': ([[12, 12], [4, 12], [0, 0]], [[255, 255, 255, 255], [239, 111, 26, 255], [0, 0, 0, 0]]),
        'check.svg': ([[9, 18], [12, 10], [0, 0]], [[0, 0, 0, 255], [0, 0, 0, 0], [0, 0, 0, 0]]),
    }
    for name, (points, expected_pixels) in raster_cases.items():
        data = base64.b64encode((ROOT / 'assets/icons' / name).read_bytes()).decode()
        pixels = page.evaluate('''async ([data, points]) => {
          const img=new Image(); img.src='data:image/svg+xml;base64,'+data;
          await img.decode(); const c=document.createElement('canvas'); c.width=c.height=24;
          const ctx=c.getContext('2d');ctx.drawImage(img,0,0);
          return points.map(([x,y])=>Array.from(ctx.getImageData(x,y,1,1).data));
        }''', [data, points])
        assert pixels == expected_pixels, (name, pixels)
        print(f'PASS browser {name} raster RGBA: {pixels}')

    # Isolate progress and quotes from dialog/control fixtures.
    extra_css = (ROOT / 'tokens/generated/tokens.css').read_text() + '\n' + '\n'.join(fences['progress.md'] + fences['quote-cards.md'])
    extra_css = re.sub(r'url\([\'\"]([^\'\"]+)[\'\"]\)', data_asset, extra_css)
    page.set_content('<style>' + extra_css + '</style>'
        '<div class="progress-bar" style="width:200px;--active-step:2;--total-steps:3"><div class="progress-bar__fill" id="fill"></div></div>'
        '<div class="quote-card"><div class="body"><p class="text">A short quote.</p><p class="attribution">A craft professional</p></div></div>', wait_until='domcontentloaded')
    assert style(page, '.progress-bar', 'opacity') == '1', 'Parent opacity must not fade the completed fill'
    assert style(page, '#fill', 'background-color') == 'rgb(35, 47, 54)'
    assert page.locator('#fill').bounding_box()['width'] == 100
    assert style(page, '.quote-card .attribution', 'color') == 'rgb(35, 47, 54)'
    assert style(page, '.quote-card .text', 'font-weight') == '450'
    assert style(page, '.quote-card .text', 'font-size') == '24px'
    print('PASS browser informational elements: opaque Iron progress at half width; Iron attribution; Text-1.5x quote (24px, 450)')

    nav_css = (ROOT / 'tokens/generated/tokens.css').read_text() + '\n' + '\n'.join(fences['navigation.md'])
    nav_css = re.sub(r'url\([\'\"]([^\'\"]+)[\'\"]\)', data_asset, nav_css)
    page.set_content('<style>' + nav_css + '\nbody{margin:0}</style><nav class="nav"><div class="nav-inner">Navigation</div></nav>', wait_until='domcontentloaded')
    for width, expected in [(390, '16px'), (800, '32px')]:
        page.set_viewport_size({'width': width, 'height': 900})
        assert style(page, '.nav-inner', 'padding-left') == expected, (width, style(page, '.nav-inner', 'padding-left'))
        assert style(page, '.nav-inner', 'padding-right') == expected
    page.set_viewport_size({'width': 1280, 'height': 900})
    bounds = page.locator('.nav-inner').bounding_box()
    assert bounds['width'] == 1264 and bounds['x'] == 8, bounds
    assert style(page, '.nav-inner', 'padding-left') == '32px'
    print('PASS browser header alignment: mobile16px/tablet32px sides; desktop centered1264px frame, 1200px content')
    browser.close()
print('ALL COMPONENT/ICON REGRESSIONS PASS')
