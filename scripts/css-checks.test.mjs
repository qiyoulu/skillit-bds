import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCss, references, cssFences, checkReferences, compareCanonical, checkContrast, contrast, customValues, resolveValue } from './css-checks.mjs';

const collect = (fn, ...args) => {
  const findings = [];
  fn(...args, f => findings.push(f));
  return findings;
};
test('balanced declaration parser ignores comments and quoted delimiters', () => {
  const blocks = parseCss('/* --bad.name: 3px; */\n@media (min-width: 480px) {\n.a { --space-1\\.5: 0.375rem; content: "};: var(--not-a-reference)"; --local: calc(2 * var(--space-1\\.5)); border-radius: var(--radius-sharp) }\n}');
  assert.equal(blocks.length, 2);
  assert.deepEqual(blocks[1].declarations.map(d => d.name), ['--space-1.5', 'content', '--local', 'border-radius']);
  assert.equal(blocks[1].declarations.at(-1).value, 'var(--radius-sharp)');
  assert.equal(blocks[1].declarations[0].line, 3);
  assert.equal(references(blocks[1].declarations[1].value).length, 0);
});
test('CSS hex escapes and nested fallback dependencies are understood', () => {
  const text = ':root { --space-1\\2e 5: 0.375rem; --a: var(--b, var(--a)); --b: 1rem; }';
  const findings = collect(checkReferences, text, parseCss(text), new Map(), 'fixture');
  assert.equal(findings.some(f => f.rule === 'css_identifier_invalid'), false);
  assert.ok(findings.some(f => f.rule === 'token_reference_cycle'));
  assert.equal(references('var(--a, var(--b))').length, 2);
});
test('CSS fences preserve line numbers and allow tildes', () => {
  const fences = cssFences('# Heading\n\n~~~css\n:root { --a: 1rem; }\n~~~\n');
  assert.equal(fences.length, 1);
  assert.equal(fences[0].line, 4);
});
test('canonical comparisons tolerate formatting but catch every declared duplicate', () => {
  const canonical = new Map([['--leading', { value: '0.8' }], ['--font', { value: "'Work Sans', sans-serif" }]]);
  const blocks = parseCss(':root { --leading: 0.80; --font: "Work Sans",sans-serif; }');
  assert.equal(collect(compareCanonical, blocks, canonical, 'fixture', 'drift').length, 0);
  blocks[0].declarations.push({ name: '--leading', value: '0.9', line: 2 });
  assert.equal(collect(compareCanonical, blocks, canonical, 'fixture', 'drift').length, 1);
});
test('aliases resolve, cycles do not inherit canonical values', () => {
  const values = customValues(parseCss(':root { --base: 1rem; --alias: var(--base); --cycle: var(--cycle); }'));
  assert.equal(resolveValue('var(--alias)', values), '1rem');
  assert.equal(resolveValue('var(--cycle)', values), null);
});
test('contrast sanity and normal/large thresholds do not round before comparison', () => {
  assert.equal(contrast('#000000', '#FFFFFF'), 21);
  assert.ok(Math.abs(contrast('#767676', '#FFFFFF') - 4.54) < 0.01);
  const pairs = (fg, size = '1rem') => collect(checkContrast, parseCss(`.a { color: ${fg}; background: #FFFFFF; font-size: ${size}; }`), new Map(), 'fixture');
  assert.equal(pairs('#767676').length, 0);
  assert.ok(pairs('#777777').some(f => f.rule === 'wcag_contrast'));
  assert.equal(pairs('#888888', '1.5rem').length, 0);
  assert.ok(pairs('#BBBBBB', '1.5rem').some(f => f.rule === 'wcag_contrast'));
  assert.ok(pairs('#FFFFFF').some(f => f.message.includes('1.00:1')));
});
test('unresolved color expressions explicitly request browser verification', () => {
  const findings = collect(checkContrast, parseCss('.a { color: #FFFFFF80; background: #FFFFFF; }'), new Map(), 'fixture');
  assert.equal(findings[0].rule, 'wcag_contrast_unresolved');
  assert.equal(findings[0].severity, 'info');
});
