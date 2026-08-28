import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');
const files = {
  json: read('tokens/tokens.json5'),
  css: read('tokens/tokens.css'),
  color: read('tokens/color.md'),
  layout: read('rules/layout.md'),
  components: read('components/ui.md'),
  manual: read('HUMAN-INSTRUCTIONS.md'),
  readme: read('README.md'),
};

const hover = {
  background: '#EAE5DF',
  primary: '#E06818',
  warning: '#EEA41A',
  error: '#BC0E2A',
};

for (const value of Object.values(hover)) {
  assert(files.json.includes(value), `missing ${value} in tokens.json5`);
  assert(files.css.includes(value), `missing ${value} in tokens.css`);
  assert(files.color.includes(value), `missing ${value} in color.md`);
}

assert(files.css.includes('--space-1\\.5'));
assert(files.css.includes('--text-1\\.5x'));
assert(!files.css.includes('--space-1.5:'));
assert(!files.css.includes('--text-1.5x:'));
assert(files.layout.includes('Content max-width: `1200px`'));
assert(files.components.includes('max-width: var(--max-width-content)'));
assert(files.manual.includes('Version 0.9-beta'));
assert(files.manual.includes('0.75x at mobile breakpoints'));
assert(files.readme.includes('0.9-beta'));

console.log('Skillit BDS validation passed');
