import test from 'node:test';
import assert from 'node:assert/strict';
import { checkSvgPaint } from './css-checks.mjs';
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, cpSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lint = join(repo, 'scripts/lint.mjs');

test('approved paint is exact and does not disable other paint checks', () => {
  const findings = [];
  checkSvgPaint('<svg><path fill="white"/><path fill="#33663D"/><path fill="#ff00ff"/></svg>',
    'check-circle.svg', f => findings.push(f), new Set(['#ffffff', '#33663d']));
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /ff00ff/);
  const strict = [];
  checkSvgPaint('<svg fill="#33663D"/>', 'external/check-circle.svg', f => strict.push(f));
  assert.equal(strict.length, 1);
});

test('exceptions apply only to approved repository paths and colors', () => {
  assert.equal(spawnSync(process.execPath, [lint, join(repo, 'assets/icons/check-circle.svg')]).status, 0);
  const scratch = process.env.TMPDIR || join(process.env.HOME, '.hermes/cache/scratch');
  const dir = mkdtempSync(join(scratch, 'icon-paint-test-'));
  const external = join(dir, 'check-circle.svg');
  writeFileSync(external, '<svg fill="#33663D"/>');
  assert.equal(spawnSync(process.execPath, [lint, external]).status, 1);
  const fixture = join(dir, 'repo');
  mkdirSync(fixture);
  cpSync(join(repo, 'tokens'), join(fixture, 'tokens'), { recursive: true });
  mkdirSync(join(fixture, 'assets/icons'), { recursive: true });
  const approved = join(fixture, 'assets/icons/check-circle.svg');
  writeFileSync(approved, '<svg fill="#ff00ff"/>');
  assert.equal(spawnSync(process.execPath, [lint, '--repo', fixture, approved]).status, 1);
  const utility = join(fixture, 'assets/icons/magnifying-glass.svg');
  writeFileSync(utility, '<svg fill="#233136"/>');
  assert.equal(spawnSync(process.execPath, [lint, '--repo', fixture, utility]).status, 1);
});

// Test every retained export: wrong colors and external lookalikes stay strict.
const approved = {
  'check-circle.svg': '#33663d', 'checkbox-checked.svg': '#ef6f1a',
  'x-octagon.svg': '#c8102e', 'information-square.svg': '#007ca6',
  'information-circle.svg': '#007ca6', 'puzzle-piece.svg': '#33663d',
  'pause-circle.svg': '#233136', 'play-circle.svg': '#233136',
  'radio-checked.svg': '#ef6f1a', 'switch-off.svg': '#233136',
  'switch-on.svg': '#33663d', 'exclamation-triangle.svg': '#feb11c',
};
for (const [name, paint] of Object.entries(approved)) {
  test(`${name}: approved palette, wrong fill/stroke, and external scope`, () => {
    assert.equal(spawnSync(process.execPath, [lint, join(repo, 'assets/icons', name)]).status, 0);
    const dir = mkdtempSync(join(process.env.TMPDIR || join(process.env.HOME, '.hermes/cache/scratch'), 'icon-negative-'));
    const external = join(dir, name);
    writeFileSync(external, `<svg fill="${paint}"/>`);
    assert.equal(spawnSync(process.execPath, [lint, external]).status, 1);
    const fixture = join(dir, 'repo');
    cpSync(join(repo, 'tokens'), join(fixture, 'tokens'), { recursive: true });
    mkdirSync(join(fixture, 'assets/icons'), { recursive: true });
    const internal = join(fixture, 'assets/icons', name);
    for (const attribute of ['fill', 'stroke']) {
      for (const unexpected of ['#ff00ff', name === 'x-octagon.svg' ? '#007ca6' : '#c8102e']) {
        writeFileSync(internal, `<svg fill="${paint}"><path ${attribute}="${unexpected}"/></svg>`);
        assert.equal(spawnSync(process.execPath, [lint, '--repo', fixture, internal]).status, 1, attribute + unexpected);
      }
    }
  });
}
test('renamed utilities and retired semantic asset aliases have no paint exemption', () => {
  const dir = mkdtempSync(join(process.env.TMPDIR || join(process.env.HOME, '.hermes/cache/scratch'), 'utility-negative-'));
  cpSync(join(repo, 'tokens'), join(dir, 'tokens'), { recursive: true });
  mkdirSync(join(dir, 'assets/icons'), { recursive: true });
  for (const name of ['magnifying-glass', 'saw', 'concrete', 'pipe', 'user-hat', 'user-round', 'arrow-down-left', 'arrow-down-right', 'arrow-up-left', 'arrow-up-right', 'briefcase', 'credit-card', 'currency-dollar', 'inbox', 'map', 'phone', 'phone-arrow-down-left', 'phone-arrow-up-right', 'phone-x-mark', 'arrow-up-on-square', 'user-circle', 'checkmark', 'warning', 'error', 'information', 'match']) {
    const path = join(dir, 'assets/icons', name + '.svg');
    writeFileSync(path, '<svg fill="#233136"/>');
    assert.equal(spawnSync(process.execPath, [lint, '--repo', dir, path]).status, 1, name);
  }
});
