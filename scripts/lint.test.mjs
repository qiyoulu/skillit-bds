import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, cpSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scratch = join(process.env.HOME, '.hermes/cache/scratch');
mkdirSync(scratch, { recursive: true });
const fixture = mkdtempSync(join(scratch, 'bds-lint-test-'));
cpSync(join(repo, 'tokens'), join(fixture, 'tokens'), { recursive: true });
// Use the repaired generated block as the fixture's doc baseline; tests never
// depend on concurrent edits to the live documentation.
const baselineCss = readFileSync(join(fixture, 'tokens/generated/tokens.css'), 'utf8');
for (const name of ['color', 'typography']) writeFileSync(join(fixture, `tokens/docs/${name}.md`), `\`\`\`css\n${baselineCss}\n\`\`\`\n`);
const run = (args = []) => {
  const result = spawnSync(process.execPath, [join(repo, 'scripts/lint.mjs'), '--repo', fixture, '--json', ...args], { encoding: 'utf8', cwd: scratch });
  const payload = result.stderr.split('@bds-lint-json-begin\n')[1]?.split('\n@bds-lint-json-end')[0];
  assert.ok(payload, result.stderr);
  return { ...JSON.parse(payload), status: result.status };
};
let serial = 0;
function external(text, ext = '.css') {
  const file = join(fixture, `fixture-${serial++}${ext}`);
  writeFileSync(file, text);
  return run([file]);
}
const has = (report, rule) => report.findings.some(f => f.rule === rule);

// CLI controls first: a clean rule and a white-on-white failure.
test('CLI is cwd independent, retains sentinels and clean status', () => {
  assert.equal(external('.a { color: var(--color-foreground); background: var(--color-surface); border-radius: var(--radius-sharp); }').status, 0);
});
test('ordinary declarations with inline white aliases fail at 1:1', () => {
  const r = external(':root { --fg: #FFFFFF; --bg: #FFFFFF; }\n.a { color: var(--fg); background-color: var(--bg); }');
  assert.ok(has(r, 'wcag_contrast'));
  assert.match(r.findings.find(f => f.rule === 'wcag_contrast').message, /1\.00:1/);
  assert.equal(r.status, 1);
});
test('canonical vars work without an inline root; background can come first', () => {
  assert.ok(has(external('.a { background: var(--color-surface); color: var(--color-surface); }'), 'wcag_contrast'));
});
test('normal text fails below 4.5 while large text passes at 3', () => {
  const root = ':root { --fg: #888888; --bg: #FFFFFF; }';
  assert.ok(has(external(root + '.a { color: var(--fg); background: var(--bg); font-size: 1rem; }'), 'wcag_contrast'));
  assert.equal(has(external(root + '.a { color: var(--fg); background: var(--bg); font-size: 1.5rem; }'), 'wcag_contrast'), false);
  assert.equal(has(external(root + '.a { color: var(--fg); background: var(--bg); font-size: 1.166667rem; font-weight: 700; }'), 'wcag_contrast'), false);
  assert.ok(has(external(root + '.a { color: var(--fg); background: var(--bg); font-size: 1.166667rem; font-weight: 650; }'), 'wcag_contrast'));
  assert.ok(has(external(':root { --fg: #BBBBBB; --bg: #FFFFFF; } .a { color: var(--fg); background: var(--bg); font-size: 2rem; }'), 'wcag_contrast'));
});
test('decimal declaration and reference names must be escaped', () => {
  assert.ok(has(external(':root { --space-1.5: 1rem; } .a { gap: var(--space-1.5); }'), 'css_identifier_invalid'));
  assert.equal(external('.a { gap: var(--space-1\\.5); }').status, 0);
});
test('unknown references are errors, known local aliases are allowed', () => {
  assert.ok(has(external('.a { gap: var(--space-does-not-exist); }'), 'token_reference_unknown'));
  assert.equal(external(':root { --local: var(--space-4); } .a { gap: var(--local); }').status, 0);
});
test('self and indirect cycles are errors even against a canonical token', () => {
  assert.ok(has(external(':root { --color-primary-hover: var(--color-primary-hover); }'), 'token_reference_cycle'));
  assert.ok(has(external(':root { --a: var(--b); --b: var(--a); }'), 'token_reference_cycle'));
});
test('safe binary radii and circle indicators pass; arbitrary radii fail', () => {
  for (const radius of ['0', '16px', '9999px', '50%', 'var(--radius-sharp)', 'var(--radius-soft)', 'var(--radius-pill)']) {
    assert.equal(external(`.status-dot { border-radius: ${radius}; }`).status, 0, radius);
  }
  for (const radius of ['12px', '2px', 'clamp(0px, 1vw, 16px)']) assert.ok(has(external(`.a { border-radius: ${radius} }`), 'radius_scale'), radius);
});
test('SVG rejects every hardcoded paint including palette and white', () => {
  for (const paint of ['#EF6F1A', '#FFFFFF', 'white', 'rgb(255,255,255)']) {
    assert.ok(has(external(`<svg><path fill='${paint}'/><path stroke="${paint}"/></svg>`, '.svg'), 'svg_fill_color'), paint);
  }
  assert.equal(external('<svg fill="currentColor"><path fill="none" stroke="currentColor"/></svg>', '.svg').status, 0);
});
test('warning status and severity overrides remain supported', () => {
  const path = join(fixture, 'warning.css');
  writeFileSync(path, '.a { text-transform: uppercase; }');
  assert.equal(run([path]).status, 2);
  assert.equal(run(['--severity', 'text_transform_uppercase=info', path]).status, 0);
});

test('repaired canonical fixture and validator pass from another cwd', () => {
  assert.equal(run().status, 0);
  const result = spawnSync(process.execPath, [join(repo, 'scripts/validate.mjs'), '--repo', fixture], { cwd: scratch, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Skillit BDS validation passed/);
});
test('CSS fences check decimal references as well as declarations', () => {
  const r = external('```css\n:root { --space-1\\.5: 0.375rem; }\n.a { gap: var(--space-1.5); }\n```', '.md');
  assert.ok(r.findings.some(f => f.rule === 'css_identifier_invalid' && f.message.includes('var()')));
});
test('CSS and HTML examples share explicit component-local declarations', () => {
  const r = external('```css\n.a { width: calc(var(--active-step) * 1%); }\n```\n```html\n<div style="--active-step: 4;"></div>\n```', '.md');
  assert.equal(has(r, 'token_reference_unknown'), false);
  assert.ok(has(external('<div style="color: var(--color-surface); background: var(--color-surface);"></div>', '.html'), 'wcag_contrast'));
});

test('internal audit checks the icon inventory, not only external SVG fixtures', () => {
  const directory = join(fixture, 'assets/icons');
  mkdirSync(directory, { recursive: true });
  const icon = join(directory, 'control.svg');
  writeFileSync(icon, '<svg viewBox="0 0 24 24"><path fill="currentColor"/></svg>');
  assert.equal(run().status, 0);
  try {
    writeFileSync(icon, '<svg viewBox="0 0 24 24"><path fill="#232F36"/></svg>');
    assert.ok(run().findings.some(f => f.rule === 'svg_fill_color' && f.scope === 'assets/icons/control.svg'));
  } finally {
    writeFileSync(icon, '<svg viewBox="0 0 24 24"><path fill="currentColor"/></svg>');
  }
});

test('internal canonical checks catch hover, weight, scalar, doc cycle and Tailwind regressions', async t => {
  const css = join(fixture, 'tokens/generated/tokens.css');
  const original = readFileSync(css, 'utf8');
  // Isolate each mutation: canonical mismatch is required regardless of unrelated baseline findings.
  for (const [name, before, after, needle] of [
    ['hover black percentage', /(--color-background-hover:[^;]*black )10%/, '${1}20%', '--color-background-hover'],
    ['typography weight', /(--text-8x-weight:\s*)700/, '$1999', '--text-8x-weight'],
    ['spacing alias value', /(--space-1x:\s*)1rem/, '$12rem', '--space-1x'],
  ]) await t.test(name, () => {
    writeFileSync(css, original.replace(before, after));
    const r = run();
    assert.ok(r.findings.some(f => f.rule === 'token_css_drift' && f.message.includes(needle)));
    writeFileSync(css, original);
  });
  await t.test('document hover and typography drift', () => {
    for (const [doc, before, after, needle] of [
      ['color', /(--color-background-hover:[^;]*black )10%/, '${1}20%', '--color-background-hover'],
      ['typography', /(--text-8x-weight:\s*)700/, '${1}999', '--text-8x-weight'],
    ]) {
      const path = join(fixture, `tokens/docs/${doc}.md`), original = readFileSync(path, 'utf8');
      writeFileSync(path, original.replace(before, after));
      assert.ok(run().findings.some(f => f.rule === 'token_doc_drift' && f.message.includes(needle)));
      writeFileSync(path, original);
    }
  });
  await t.test('doc hover self-cycle', () => {
    writeFileSync(join(fixture, 'tokens/docs/color.md'), '```css\n:root { --color-primary-hover: var(--color-primary-hover); }\n```');
    const r = run();
    assert.ok(r.findings.some(f => f.rule === 'token_reference_cycle' && f.scope === 'tokens/docs/color.md'));
  });
  await t.test('undefined Tailwind references and JS escape decoding', () => {
    writeFileSync(join(fixture, 'tokens/generated/tailwind-theme.js'), "module.exports = { good: 'var(--space-1\\\\.5)', bad: 'var(--text-ui)' };\n");
    const r = run();
    assert.ok(r.findings.some(f => f.rule === 'token_reference_unknown' && f.message.includes('--text-ui')));
    assert.equal(r.findings.some(f => f.rule === 'css_identifier_invalid' && f.scope.endsWith('tailwind-theme.js')), false);
  });
});
