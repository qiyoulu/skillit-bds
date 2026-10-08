import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';

// Archived paint is allowed only for exact, hash-verified legacy entries.
export function checkLegacyIcons(repo, report) {
  const directory = resolve(repo, 'assets/icons/legacy');
  const allowed = new Set();
  if (!existsSync(directory)) return allowed;
  const fail = message => report({ rule: 'legacy_icon_archive', severity: 'error',
    scope: 'assets/icons/legacy', line: 1, message });
  let manifest;
  try { manifest = JSON.parse(readFileSync(join(directory, 'manifest.json'), 'utf8')); }
  catch (error) { fail(`Missing or invalid legacy manifest: ${error.message}`); return allowed; }
  if (manifest.schema_version !== 1 || manifest.status !== 'deprecated-frozen' || !Array.isArray(manifest.files) || !manifest.files.length) {
    fail('Invalid legacy archive schema/status or empty inventory'); return allowed;
  }
  const names = new Set();
  for (const entry of manifest.files) {
    if (!/^[a-z0-9-]+\.svg$/.test(entry.file || '') || !/^[a-z0-9-]+\.svg$/.test(entry.canonical || '') || !/^[a-f0-9]{64}$/.test(entry.sha256 || '') || names.has(entry.file)) {
      fail(`Invalid or duplicate legacy entry: ${entry.file}`); continue;
    }
    names.add(entry.file);
    const path = join(directory, entry.file);
    if (!existsSync(path) || !statSync(path).isFile()) { fail(`Missing archived SVG: ${entry.file}`); continue; }
    if (!existsSync(resolve(repo, 'assets/icons', entry.canonical))) { fail(`Missing canonical migration target: ${entry.canonical}`); continue; }
    const hash = createHash('sha256').update(readFileSync(path)).digest('hex');
    if (hash !== entry.sha256) { fail(`Frozen archived SVG changed: ${entry.file}`); continue; }
    allowed.add(path);
  }
  function scan(path, prefix = '') {
    for (const name of readdirSync(path)) {
      const child = join(path, name), relative = prefix + name;
      if (statSync(child).isDirectory()) scan(child, relative + '/');
      else if (name.toLowerCase().endsWith('.svg') && !names.has(relative)) fail(`Unlisted archived SVG: ${relative}`);
    }
  }
  scan(directory);
  return allowed;
}
