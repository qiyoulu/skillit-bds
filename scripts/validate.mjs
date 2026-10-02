#!/usr/bin/env node
/** Validate current canonical consistency; historical hex/version assertions
 * belong in neither the validator nor the source tokens. Shares the linter's
 * rules, diagnostics, JSON sentinels and exit codes (0 clean, 1 errors, 2 warnings).
 * Regression suite: node --test scripts/*.test.mjs
 * Browser parity: uv run --with playwright --with json5 python scripts/test-browser.py
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const result = spawnSync(process.execPath, [fileURLToPath(new URL('./lint.mjs', import.meta.url)), ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) {
  console.error(`BDS validation failed to run: ${result.error.message}`);
  process.exit(1);
}
if (result.status === 0) console.log('Skillit BDS validation passed');
process.exit(result.status ?? 1);
