import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { checkLegacyIcons } from './legacy-icons.mjs';
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function fixture() {
  const root = mkdtempSync(join(process.env.TMPDIR || join(process.env.HOME, '.hermes/cache/scratch'), 'legacy-icon-test-'));
  const directory = join(root, 'assets/icons/legacy');mkdirSync(directory, { recursive: true });
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><path fill="#123456" d="M0 0L2 2Z"/></svg>';
  writeFileSync(join(directory, 'search.svg'), svg);
  writeFileSync(join(root, 'assets/icons/magnifying-glass.svg'), '<svg/>');
  const manifest = { schema_version: 1, status: 'deprecated-frozen', files: [{ file: 'search.svg', canonical: 'magnifying-glass.svg', sha256: createHash('sha256').update(svg).digest('hex') }] };
  writeFileSync(join(directory, 'manifest.json'), JSON.stringify(manifest));
  return { root, directory, manifest };
}
function audit(root) { const findings = [];const allowed = checkLegacyIcons(root, f => findings.push(f));return { findings, allowed }; }
test('real frozen archive has 75 verified entries and keeps collision mappings', () => {
  const {findings, allowed} = audit(repo);assert.deepEqual(findings, []);assert.equal(allowed.size, 75);
  const data = JSON.parse(readFileSync(join(repo, 'assets/icons/legacy/manifest.json')));
  assert.equal(data.files.find(e => e.file === 'phone.svg').canonical, 'device-phone-mobile.svg');
  assert.equal(data.files.find(e => e.file === 'user-circle.svg').canonical, 'user-round.svg');
  assert.ok(data.files.every(e => e.file !== 'share-1.svg'), 'Unpublished export IDs are not archived');
});
test('approved historical paint is accepted only with matching bytes', () => {
  const f = fixture();assert.equal(audit(f.root).allowed.size, 1);
  writeFileSync(join(f.directory, 'search.svg'), '<svg fill="#ff00ff"/>');
  const result = audit(f.root);assert.equal(result.allowed.size, 0);assert.match(result.findings[0].message, /changed/);
});
test('unlisted nested exports and duplicate manifest entries are rejected', () => {
  const f=fixture();mkdirSync(join(f.directory, 'extra'));writeFileSync(join(f.directory, 'extra/new.svg'), '<svg/>');
  assert.ok(audit(f.root).findings.some(f => /Unlisted/.test(f.message)));
  f.manifest.files.push(f.manifest.files[0]);writeFileSync(join(f.directory, 'manifest.json'), JSON.stringify(f.manifest));
  assert.ok(audit(f.root).findings.some(f => /duplicate/.test(f.message)));
});
test('missing manifest, invalid schema, and path traversal fail closed', () => {
  const f=fixture();writeFileSync(join(f.directory, 'manifest.json'), 'not json');assert.equal(audit(f.root).allowed.size, 0);
  writeFileSync(join(f.directory, 'manifest.json'), JSON.stringify({schema_version: 9, status: 'deprecated-frozen', files: []}));
  assert.equal(audit(f.root).allowed.size, 0);
  f.manifest.files[0].file='../search.svg';writeFileSync(join(f.directory, 'manifest.json'), JSON.stringify(f.manifest));
  assert.equal(audit(f.root).allowed.size, 0);assert.ok(audit(f.root).findings.length);
});
