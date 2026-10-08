#!/usr/bin/env node
/**
 * Skillit BDS lint: zero-dependency canonical and artifact consistency checks.
 * node scripts/lint.mjs                    internal token/CSS/doc parity
 * node scripts/lint.mjs <path> ...         external CSS/HTML/JS/SVG/MD checks
 * --repo <path>                           override script-relative repository
 * --severity rule=error|warning|info       repeatable rule override
 * --json                                  stderr JSON between stable sentinels
 * Exit: 0 clean, 1 errors, 2 warnings (info does not fail).
 * validate.mjs runs this same current consistency contract.
 * Regression tests: node --test scripts/*.test.mjs
 * Static contrast checks explicit same-rule pairs, opaque hex/named black/white
 * and resolved aliases. Browser checks are required for cascade, alpha, color-mix,
 * gradients and inherited text styles; unresolved pairs are reported as info.
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, relative, extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLegacyIcons } from './legacy-icons.mjs';
import { parseCss, cssFences, htmlStyles, customValues, decodeIdentifier, checkReferences, compareCanonical, checkGeometry, checkContrast, checkSvgPaint, jsStrings } from './css-checks.mjs';

// =================================================================
// CLI parsing
// =================================================================
const argv = process.argv.slice(2);
let wantsJson = false;
const severityOverrides = new Map();
const pathArgs = [];
let repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--json') wantsJson = true;
  else if (a === '--repo' || a.startsWith('--repo=')) {
    const value = a === '--repo' ? argv[++i] : a.slice(7);
    if (!value) throw new Error('--repo requires a path');
    repo = resolve(value);
  } else if (a === '--severity' || a.startsWith('--severity=')) {
    const value = a === '--severity' ? argv[++i] : a.slice(11);
    const [rule, sev] = (value || '').split('=');
    if (!rule || !['error', 'warning', 'info'].includes(sev)) throw new Error('expected --severity rule=error|warning|info');
    severityOverrides.set(rule, sev);
  } else if (a.startsWith('--')) throw new Error(`unknown option ${a}`);
  else pathArgs.push(a);
}
const internalMode = pathArgs.length === 0;

// Approved fresh exports retain their semantic or contrasting layer paints.
// Applies only to these exact repository paths, never to similarly named external SVGs.
const approvedIconPaints = new Map(Object.entries({
  'checkbox-checked.svg': ['#ef6f1a', '#233136'],
  'check-circle.svg': ['#33663d', '#ffffff'],
  'x-octagon.svg': ['#c8102e', '#ffffff'],
  'information-square.svg': ['#007ca6', '#ffffff'],
  'information-circle.svg': ['#007ca6', '#ffffff'],
  'puzzle-piece.svg': ['#33663d'],
  'pause-circle.svg': ['#233136', '#ffffff'],
  'play-circle.svg': ['#233136', '#ffffff'],
  'radio-checked.svg': ['#ef6f1a', '#ffffff'],
  'switch-off.svg': ['#ffffff', '#233136'],
  'switch-on.svg': ['#ffffff', '#33663d'],
  'exclamation-triangle.svg': ['#feb11c', '#ffffff'],
}).map(([name, paints]) => [resolve(repo, 'assets/icons', name), new Set(paints)]));
const approvedPaintsFor = path => approvedIconPaints.get(resolve(path)) || new Set();

// =================================================================
// json5 — zero-dep recursive-descent parser
// =================================================================
function parseJson5(text) {
  let i = 0; const N = text.length;
  function ws() {
    while (i < N) {
      const c = text[i];
      if (c === ' ' || c === '\n' || c === '\t' || c === '\r') { i++; continue; }
      if (c === '/' && text[i + 1] === '/') {
        while (i < N && text[i] !== '\n') i++;
        continue;
      }
      if (c === '/' && text[i + 1] === '*') {
        i += 2;
        while (i < N && !(text[i] === '*' && text[i + 1] === '/')) i++;
        i += 2;
        continue;
      }
      break;
    }
  }
  function expect(s) {
    ws();
    if (text.slice(i, i + s.length) !== s) throw new Error(`expected "${s}" at offset ${i}`);
    i += s.length;
  }
  function parseValue() {
    ws();
    const c = text[i];
    if (c === '{') return parseObject();
    if (c === '[') return parseArray();
    if (c === '"' || c === "'") return parseString(c);
    if (c === 't') { expect('true'); return true; }
    if (c === 'f') { expect('false'); return false; }
    if (c === 'n') { expect('null'); return null; }
    if (c === '-' || c === '+' || c === '.' || (c >= '0' && c <= '9')) return parseNumber();
    throw new Error(`unexpected "${c}" at offset ${i}`);
  }
  function parseString(q) {
    if (text[i] !== q) throw new Error(`expected quote at offset ${i}`);
    i++;
    let out = '';
    while (i < N) {
      const c = text[i];
      if (c === q) { i++; return out; }
      if (c === '\\') {
        const e = text[i + 1];
        const map = { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', '"': '"', "'": "'", '\\': '\\' };
        if (map[e]) { out += map[e]; i += 2; continue; }
        if (e === 'u') { out += String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16)); i += 6; continue; }
        throw new Error(`unknown escape \\${e}`);
      }
      out += c; i++;
    }
    throw new Error('unterminated string');
  }
  function parseNumber() {
    const s = i;
    if (text[i] === '-' || text[i] === '+') i++;
    while (i < N && /[0-9.eE+-]/.test(text[i])) i++;
    const v = Number(text.slice(s, i));
    if (Number.isNaN(v)) throw new Error(`not a number: "${text.slice(s, i)}"`);
    return v;
  }
  function parseArray() {
    expect('[');
    const a = [];
    ws();
    if (text[i] === ']') { i++; return a; }
    while (true) {
      a.push(parseValue());
      ws();
      if (text[i] === ',') { i++; ws(); if (text[i] === ']') { i++; return a; } continue; }
      if (text[i] === ']') { i++; return a; }
      throw new Error('expected , or ]');
    }
  }
  function parseObject() {
    expect('{');
    const o = {};
    ws();
    if (text[i] === '}') { i++; return o; }
    while (true) {
      ws();
      let key;
      const c = text[i];
      if (c === '"' || c === "'") key = parseString(c);
      else {
        const s = i;
        while (i < N && /[A-Za-z0-9_$]/.test(text[i])) i++;
        key = text.slice(s, i);
      }
      ws();
      expect(':');
      o[key] = parseValue();
      ws();
      if (text[i] === ',') { i++; ws(); if (text[i] === '}') { i++; return o; } continue; }
      if (text[i] === '}') { i++; return o; }
      throw new Error('expected , or }');
    }
  }
  return parseValue();
}

// =================================================================
// Load canonical tokens
// =================================================================
const tokensPath = resolve(repo, 'tokens/tokens.json5');
const tokensRaw = readFileSync(tokensPath, 'utf8');
const tokens = parseJson5(tokensRaw);

function normalizeHex(h) {
  const m = /^#([0-9a-fA-F]{3,8})$/.exec(h);
  return m ? '#' + m[1].toUpperCase() : h;
}
function isHex(s) { return /^#[0-9a-fA-F]{3,8}$/.test(s); }
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function cssEscapeKey(k) { return k.replace(/\./g, '\\.'); }

function cssVarFor(path) {
  const segs = path.split('.');
  if (segs[0] !== 'base') return null;
  if (segs[1] === 'color') {
    const ren = { bg: 'background', fg: 'foreground', primary: 'primary', success: 'success', error: 'error', warning: 'warning', link: 'link', surface: 'surface' };
    if (segs[2] === 'hover') {
      if (ren[segs[3]]) return `--color-${ren[segs[3]]}-hover`;
      return null;
    }
    if (ren[segs[2]]) return `--color-${ren[segs[2]]}`;
    return null;
  }
  if (segs[1] === 'spacing') return `--space-${cssEscapeKey(segs.slice(2).join('.').replace(/^space-/, ''))}`;
  if (segs[1] === 'typography') {
    if (segs[2] === 'text') return `--text-${cssEscapeKey(segs.slice(3).join('.'))}`;
    if (segs[2] === 'family') return `--font-${segs[3]}`;
    if (segs[2] === 'padding') return `--padding-${cssEscapeKey(segs.slice(3).join('.'))}`;
    if (segs[2] === 'weight') return `--weight-${segs[3]}`;
  }
  if (segs[1] === 'radius') return `--radius-${segs[2]}`;
  if (segs[1] === 'layout') return `--${segs.slice(2).join('-')}`;
  if (segs[1] === 'breakpoint') return `--breakpoint-${segs[2]}`;
  if (segs[1] === 'motion') {
    if (segs[2] === 'duration') return `--duration-${segs[3]}`;
    if (segs[2] === 'easing') return `--${segs[3] === 'out' ? 'ease-out' : segs[3] === 'in' ? 'ease-in' : segs[3]}`;
  }
  if (segs[1] === 'z') return `--z-${segs[2]}`;
  return null;
}

function flatten(node, prefix, acc) {
  if (acc === undefined) acc = {};
  if (node && typeof node === 'object' && '$value' in node) {
    const path = prefix.slice(0, -1);
    acc[path] = {
      value: node.$value,
      type: node.$type || '',
      description: node.$description || '',
      role: node.$extensions?.['org.skillit.role'] || '',
      extensions: node.$extensions || {},
      _path: path,
      _cssVar: cssVarFor(path),
    };
    return acc;
  }
  for (const [k, v] of Object.entries(node || {})) {
    if (k.startsWith('$')) continue;
    flatten(v, prefix + k + '.', acc);
  }
  return acc;
}

// tokens.json5 has its leaves under `base`; pass an empty prefix and the
// first-level `base` key contributes `base` naturally.
const TOKEN = flatten(tokens, '', {});

// Expand every canonical scalar plus the independently authored typography fields.
// Dotted source keys are preserved by cssVarFor(), then decoded for Map lookup.
const CANONICAL = new Map();
const addCanonical = (name, value, required = true) => CANONICAL.set(decodeIdentifier(name), { value: String(value), required });
for (const t of Object.values(TOKEN)) {
  if (!t._cssVar) continue;
  if (t.type === 'typography') {
    const fields = { fontSize: '', fontWeight: '-weight', lineHeight: '-leading', letterSpacing: '-tracking' };
    for (const [field, suffix] of Object.entries(fields)) {
      if (t.value[field] != null) addCanonical(t._cssVar + suffix, t.value[field]);
    }
    if (t.extensions['org.skillit.sm']) addCanonical(t._cssVar + '-sm', t.extensions['org.skillit.sm']);
    if (t.extensions['org.skillit.print']) addCanonical(t._cssVar + '-print', t.extensions['org.skillit.print'], false);
  } else addCanonical(t._cssVar, t.value);
}
const GENERATED_CSS_PATH = resolve(repo, 'tokens/generated/tokens.css');
const GENERATED_VALUES = existsSync(GENERATED_CSS_PATH) ? customValues(parseCss(readFileSync(GENERATED_CSS_PATH, 'utf8'))) : new Map();
const KNOWN_VALUES = new Map([...GENERATED_VALUES, ...[...CANONICAL].map(([name, t]) => [name, t.value])]);

// Sanity check: how many color leaves did we see?
const colorCount = Object.values(TOKEN).filter((t) => t.type === 'color').length;
if (!existsSync(tokensPath)) throw new Error('tokens/tokens.json5 missing');
if (colorCount === 0) throw new Error('tokens/tokens.json5 loaded but no color leaves found — schema changed?');

const BRAND_HEX = Object.values(TOKEN)
  .filter((t) => t.type === 'color' && typeof t.value === 'string' && isHex(t.value))
  .map((t) => normalizeHex(t.value));

// =================================================================
// WCAG 2.x relative luminance + contrast (sanity-checked against
// #767676/#FFFFFF=4.54 and #000/#FFF=21 at boot)
// =================================================================
function relLuminance(hex) {
  let s = hex.replace('#', '');
  if (s.length === 3) s = s.split('').map((c) => c + c).join('');
  if (s.length === 8) s = s.slice(0, 6);
  const toLin = (c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(s.slice(0, 2)) + 0.7152 * toLin(s.slice(2, 4)) + 0.0722 * toLin(s.slice(4, 6));
}
function contrastRatio(a, b) {
  const L1 = relLuminance(a), L2 = relLuminance(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}
if (Math.abs(contrastRatio('#000000', '#FFFFFF') - 21) > 0.1) {
  throw new Error('contrast sanity check failed (black/white)');
}
if (Math.abs(contrastRatio('#767676', '#FFFFFF') - 4.54) > 0.05) {
  throw new Error('contrast sanity check failed (#767676/#FFFFFF)');
}

// =================================================================
// Findings buffer + reporter
// =================================================================
const findings = [];
function report(f) {
  if (severityOverrides.has(f.rule)) {
    f = { ...f, severity: severityOverrides.get(f.rule) };
  }
  findings.push(f);
}

// =================================================================
// Line-indexed scan + :root finder
// =================================================================
function scan(text, re) {
  const out = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (m) out.push({ line: i + 1, col: (m.index ?? 0) + 1, lineText: lines[i], match: m[0] });
  }
  return out;
}
/** Like scan() but returns the captured group value separately so callers don't
 *  index m[1] on h.match (m[0]).  Used by rules that need just the RHS of a CSS
 *  property.  Automatically adds the g flag if missing; callers do not need to
 *  pass /g themselves. */
function scanCapture(text, re) {
  if (!re.flags.includes('g')) re = new RegExp(re.source, re.flags + 'g');
  const out = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const lm of lines[i].matchAll(re)) {
      out.push({ line: i + 1, col: lm.index + 1, lineText: lines[i], match: lm[0], value: (lm[1] || '').trim() });
    }
  }
  return out;
}
/** Scan every line for a regex that captures the hex marker; return every
 *  occurrence as a `match` with line/char position, even where the match
 *  spans just a hex fragment inside a larger string literal. */
function scanHexes(text) {
  const re = /#[0-9a-fA-F]{3,8}/g;
  const out = [];
  let m;
  while ((m = re.exec(text)) != null) {
    const line = text.slice(0, m.index).split('\n').length;
    out.push({ line, col: m.index - text.lastIndexOf('\n', m.index) + 1, text: text.slice(m.index, m.index + m[0].length) });
  }
  return out;
}
function findRootRanges(text) {
  const ranges = [];
  const re = /:root\s*\{/g;
  let m;
  while ((m = re.exec(text)) != null) {
    const startOffset = m.index;
    let depth = 0;
    let i = re.lastIndex - 1;
    while (i < text.length) {
      const c = text[i];
      if (c === '{') depth++;
      if (c === '}') { depth--; if (depth === 0) break; }
      i++;
    }
    ranges.push([text.slice(0, startOffset).split('\n').length, text.slice(0, i).split('\n').length]);
  }
  return ranges;
}
function rel(p) { return relative(repo, p); }
function stripCodeFences(text) { return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, ''); }

// =================================================================
// INTERNAL RULES
// =================================================================
function lintInternal() {
  const cssPath = resolve(repo, 'tokens/generated/tokens.css');
  const colorMdPath = resolve(repo, 'tokens/docs/color.md');
  const layoutMdPath = resolve(repo, 'rules/layout.md');
  const typoPath = resolve(repo, 'tokens/docs/typography.md');
  const voicePath = resolve(repo, 'voice/brand-voice.md');
  const llmMdPath = resolve(repo, 'LLM-INSTRUCTIONS.md');

  const canonicalValues = new Map([...CANONICAL].map(([name, t]) => [name, t.value]));
  if (!existsSync(cssPath)) {
    report({ rule: 'token_css_drift', severity: 'error', scope: rel(cssPath), message: 'generated tokens.css is missing' });
  } else {
    const css = readFileSync(cssPath, 'utf8'), blocks = parseCss(css);
    checkReferences(css, blocks, canonicalValues, rel(cssPath), report);
    compareCanonical(blocks, CANONICAL, rel(cssPath), 'token_css_drift', report, { required: true });
  }
  const generatedPath = resolve(repo, 'tokens/generated');
  if (existsSync(generatedPath)) for (const name of readdirSync(generatedPath)) {
    if (!/\.(?:js|mjs|cjs)$/.test(name)) continue;
    const path = join(generatedPath, name), text = readFileSync(path, 'utf8');
    for (const literal of jsStrings(text)) {
      checkReferences(literal.text, [], GENERATED_VALUES, rel(path), report, literal.line - 1);
    }
  }
  const iconDirectory = resolve(repo, 'assets/icons');
  if (existsSync(iconDirectory)) {
    for (const path of expandPath(iconDirectory).filter(path => path.endsWith('.svg'))) {
      if (!frozenLegacyPaths.has(resolve(path))) checkSvgPaint(readFileSync(path, 'utf8'), rel(path), report, approvedPaintsFor(path));
    }
  }

  // Every fenced CSS example gets syntax/reference/cycle checks, not just color.md.
  // Declared canonical values must agree, but a doc need not repeat the entire scale.
  for (const directory of ['tokens/docs', 'rules', 'components', 'docs']) {
    const full = resolve(repo, directory);
    if (!existsSync(full)) continue;
    for (const path of expandPath(full).filter(path => path.endsWith('.md'))) {
      const md = readFileSync(path, 'utf8');
      const segments = [...cssFences(md), ...htmlStyles(md)];
      const docValues = new Map([...KNOWN_VALUES, ...customValues(segments.flatMap(f => parseCss(f.text)))]);
      for (const fence of segments) {
        const blocks = parseCss(fence.text);
        checkReferences(fence.text, blocks, docValues, rel(path), report, fence.line - 1);
        compareCanonical(blocks, CANONICAL, rel(path), 'token_doc_drift', report, { lineOffset: fence.line - 1 });
      }
    }
  }
  // Color and typography copy-paste blocks are contract surfaces: missing values
  // are drift too. Other docs intentionally publish subsets of the token scale.
  for (const [path, prefixes] of [[colorMdPath, ['--color-']], [typoPath, ['--font-', '--text-', '--padding-', '--weight-']]]) {
    if (!existsSync(path)) {
      report({ rule: 'token_doc_block_missing', severity: 'error', scope: rel(path), message: 'canonical token documentation is missing' });
      continue;
    }
    const fences = cssFences(readFileSync(path, 'utf8'));
    const roots = fences.flatMap(f => parseCss(f.text)).filter(b => /:root\b/.test(b.selector));
    const declared = customValues(roots);
    for (const [name, t] of CANONICAL) {
      if (t.required !== false && prefixes.some(prefix => name.startsWith(prefix)) && !declared.has(name)) {
        report({ rule: 'token_doc_drift', severity: 'error', scope: rel(path), message: `copy-paste block missing ${name}`, suggestion: 'add the canonical declaration to the token block' });
      }
    }
  }

  // layout_max_width_drift
  const maxWidth = TOKEN['base.layout.max-width-content']?.value;
  if (maxWidth && existsSync(layoutMdPath)) {
    const layout = readFileSync(layoutMdPath, 'utf8');
    if (layout.includes('1168px') && maxWidth !== '1168px') {
      report({ rule: 'layout_max_width_drift', severity: 'error', scope: 'rules/layout.md', message: `rules/layout.md still references historical "1168px" but tokens.json5 says --max-width-content = ${maxWidth}`, suggestion: `replace "1168px" with "${maxWidth}"` });
    }
  }

  // typography_escape_drift
  if (existsSync(typoPath)) {
    const text = readFileSync(typoPath, 'utf8');
    if (/--text-1\\\\\.5x|--space-1\\\\\.5|--text-0\\\\\.75x/.test(text)) {
      report({ rule: 'typography_escape_drift', severity: 'error', scope: 'tokens/docs/typography.md', message: 'double-escaped dotted token (e.g. --text-1\\\\.5x) — single-escape required', suggestion: 'use \\. (single backslash before escaped period) to match tokens.css' });
    }
  }

  // banned_voice_sync
  if (existsSync(voicePath) && existsSync(llmMdPath)) {
    const v = readFileSync(voicePath, 'utf8').toLowerCase();
    const l = readFileSync(llmMdPath, 'utf8').toLowerCase();
    const sample = ['serve', 'represent', 'proud'];
    const vHas = sample.every((w) => v.includes(w));
    const lHas = sample.every((w) => l.includes(w));
    if (vHas !== lHas) {
      report({ rule: 'banned_voice_sync', severity: 'info', scope: 'voice ↔ LLM-INSTRUCTIONS', message: `voice/brand-voice.md carries brand-voice banned words; LLM-INSTRUCTIONS.md carries both brand-voice banned words (mirrors voice/brand-voice.md) and AI-ism banned words (voice/brand-voice.md has none). This split is intentional — do not merge the two lists.`, suggestion: 'no action — the two files serve different audiences by design' });
    }
  }
}

// =================================================================
// EXTERNAL RULES
// =================================================================
function lintExternalFile(pathStr) {
  const text = readFileSync(pathStr, 'utf8');
  const ext = extname(pathStr).toLowerCase();

  if (/\.(png|jpe?g|gif|webp|zip|pdf|woff2?|eot|ttf)$/i.test(pathStr)) return;
  const isCss = ext === '.css' || ext === '.scss';
  const isHtmlish = ext === '.html' || ext === '.htm' || ext === '.svg' || ext === '.md';
  const isJsOrCss = isCss || ['.js', '.mjs', '.ts', '.jsx', '.tsx'].includes(ext);

  // hard_token_reference
  if (isCss) {
    const rootRanges = findRootRanges(text);
    for (const h of scan(text, /#[0-9a-fA-F]{3,8}\b/g)) {
      if (rootRanges.some(([a, b]) => h.line >= a && h.line <= b)) continue;
      const onBrand = BRAND_HEX.includes(normalizeHex(h.match));
      if (!onBrand) {
        report({ rule: 'hard_token_reference', severity: 'error', scope: rel(pathStr), line: h.line, message: `non-token hex ${h.match} on line ${h.line}`, suggestion: 'move the value into :root and reference via var(--…)' });
      } else {
        report({ rule: 'hard_token_reference', severity: 'warning', scope: rel(pathStr), line: h.line, message: `brand hex ${h.match} hardcoded on line ${h.line}`, suggestion: 'use var(--…) — keeps theme switching working' });
      }
    }
  }

  if (isCss) {
    const blocks = parseCss(text);
    checkReferences(text, blocks, KNOWN_VALUES, rel(pathStr), report);
    checkGeometry(blocks, KNOWN_VALUES, rel(pathStr), report);
    checkContrast(blocks, KNOWN_VALUES, rel(pathStr), report);
  } else if (isHtmlish) {
    const segments = [...(ext === '.md' ? cssFences(text) : []), ...htmlStyles(text)];
    const locals = new Map([...KNOWN_VALUES, ...customValues(segments.flatMap(f => parseCss(f.text)))]);
    for (const fence of segments) {
      const blocks = parseCss(fence.text);
      checkReferences(fence.text, blocks, locals, rel(pathStr), report, fence.line - 1);
      checkGeometry(blocks, locals, rel(pathStr), report, fence.line - 1);
      checkContrast(blocks, locals, rel(pathStr), report, fence.line - 1);
    }
  } else if (isJsOrCss) {
    for (const literal of jsStrings(text)) checkReferences(literal.text, [], KNOWN_VALUES, rel(pathStr), report, literal.line - 1);
  }

  // box_shadow
  if (isCss) {
    for (const h of scan(text, /box-shadow\s*:/g)) {
      report({ rule: 'box_shadow', severity: 'error', scope: rel(pathStr), line: h.line, message: `box-shadow present on line ${h.line}`, suggestion: 'separate surfaces with background contrast instead' });
    }
  }

  // text_transform_uppercase
  if (isCss) {
    for (const h of scan(text, /text-transform\s*:\s*uppercase\b/g)) {
      report({ rule: 'text_transform_uppercase', severity: 'warning', scope: rel(pathStr), line: h.line, message: `text-transform: uppercase on line ${h.line}`, suggestion: 'type acronyms/proper-nouns directly' });
    }
  }

  // px_font_size
  if (isCss) {
    for (const h of scan(text, /font-size\s*:\s*[^;]*?\b\d+(\.\d+)?px\b/g)) {
      report({ rule: 'px_font_size', severity: 'error', scope: rel(pathStr), line: h.line, message: `font-size in px on line ${h.line}`, suggestion: 'use rem or var(--text-*)' });
    }
  }

  // text_align_center
  if (isCss) {
    for (const h of scan(text, /text-align\s*:\s*center\b/g)) {
      report({ rule: 'text_align_center', severity: 'error', scope: rel(pathStr), line: h.line, message: `text-align: center on line ${h.line}`, suggestion: 'use text-align: left' });
    }
  }

  // gradient_banned
  if (isCss) {
    for (const h of scan(text, /(linear-gradient|radial-gradient|conic-gradient)\s*\(/g)) {
      report({ rule: 'gradient_banned', severity: 'error', scope: rel(pathStr), line: h.line, message: `gradient() on line ${h.line}`, suggestion: 'use two adjacent surfaces with a hard edge' });
    }
  }

  // opacity_filter_hover
  if (isCss) {
    for (const h of scan(text, /filter\s*:[^;]*brightness\(/g)) {
      report({ rule: 'opacity_filter_hover', severity: 'warning', scope: rel(pathStr), line: h.line, message: `filter: …brightness() on line ${h.line}`, suggestion: 'use the matching --color-*-hover token' });
    }
  }

  // chart_sequential_scale
  if (isJsOrCss) {
    // walk the file for any `[` and pull the inner list until the matching `]`.
    // This survives quoted arrays like ['#111','#222','#333'] that the
    // lookbehind/lookahead form silently skipped.
    const re = /\[/g;
    let m;
    while ((m = re.exec(text)) != null) {
      const openAt = m.index;
      let closeAt = -1, depth = 0, i = openAt;
      const lines = text.split('\n');
      while (i < text.length) {
        const c = text[i];
        if (c === '[') depth++;
        else if (c === ']') { depth--; if (depth === 0) { closeAt = i; break; } }
        i++;
      }
      if (closeAt < 0) continue;
      const inner = text.slice(openAt + 1, closeAt);
      const hexes = (inner.match(/#[0-9a-fA-F]{3,8}/g) || []).map(normalizeHex);
      if (hexes.length < 3) continue;
      if (hexes.every((h) => sameHueFamily(h, hexes[0]))) {
        const lineOf = text.slice(0, openAt).split('\n').length;
        report({ rule: 'chart_sequential_scale', severity: 'warning', scope: rel(pathStr), line: lineOf, message: `sequential hex array with ${hexes.length} ${hueName(hexes[0])} steps`, suggestion: 'use one base hex + stepped opacity (100% / N%)' });
      }
    }
  }

  // SVG paint must inherit: on-palette literals still break theming.
  if (ext === '.svg' && !frozenLegacyPaths.has(resolve(pathStr))) checkSvgPaint(text, rel(pathStr), report, approvedPaintsFor(pathStr));
  else if (isHtmlish) {
    for (const m of text.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)) {
      const offset = text.slice(0, m.index).split('\n').length - 1;
      checkSvgPaint(m[0], rel(pathStr), f => report({ ...f, line: f.line + offset }));
    }
  }

  // smart_quotes (in copy; code blocks excluded)
  if (isHtmlish) {
    const body = stripCodeFences(text);
    for (const h of scan(body, /\b(Dont|cant|wont|isnt|youre|theyre)\b/g)) {
      report({ rule: 'smart_quotes', severity: 'info', scope: rel(pathStr), line: h.line, message: `straight apostrophe in "${h.match}"`, suggestion: "use curly apostrophe (\u2019) per brand voice" });
    }
  }

  // banned_voice (in markdown body)
  if (ext === '.md') {
    const body = stripCodeFences(text);
    const banned = ['delve', 'tapestry', 'leverage', 'utilize', 'harness', 'foster', 'cultivate', 'seamless', 'robust', 'testament'];
    for (const w of banned) {
      for (const h of scan(body, new RegExp(`\\b${escapeRe(w)}\\b`, 'i'))) {
        report({ rule: 'banned_voice', severity: 'warning', scope: rel(pathStr), line: h.line, message: `banned word "${h.match}"`, suggestion: 'substitute per LLM-INSTRUCTIONS.md §9' });
      }
    }
  }
}

// =================================================================
// hue-family heuristic
// =================================================================
function rgb(h) {
  let s = h.replace('#', '');
  if (s.length === 3) s = s.split('').map((c) => c + c).join('');
  return { r: parseInt(s.slice(0, 2), 16), g: parseInt(s.slice(2, 4), 16), b: parseInt(s.slice(4, 6), 16) };
}
function sameHueFamily(a, b) {
  const A = rgb(a), B = rgb(b);
  const cdom = (x) => (x.r === Math.max(x.r, x.g, x.b)) ? 'r' : (x.g === Math.max(x.r, x.g, x.b)) ? 'g' : 'b';
  return cdom(A) === cdom(B);
}
function hueName(h) {
  const { r, g, b } = rgb(h);
  if (r >= g && r >= b) return g > b ? 'orange/yellow' : 'magenta';
  if (g >= r && g >= b) return 'green';
  return 'blue';
}

// =================================================================
// Path expansion for external mode
// =================================================================
function expandPath(p) {
  const full = resolve(repo, p);
  if (!existsSync(full)) {
    report({ rule: 'path_missing', severity: 'error', scope: p, message: 'path does not exist' });
    return [];
  }
  const st = statSync(full);
  if (st.isFile()) return [full];
  if (!st.isDirectory()) return [];
  const out = [];
  for (const entry of readdirSync(full, { withFileTypes: true })) {
    const ep = join(full, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.next', '.worktrees', 'tmp', 'vendor', '.venv'].includes(entry.name)) continue;
      out.push(...expandPath(ep));
    } else out.push(ep);
  }
  return out;
}

// =================================================================
// MAIN
// =================================================================
const frozenLegacyPaths = checkLegacyIcons(repo, report);

if (internalMode) {
  lintInternal();
} else {
  const files = [];
  for (const a of pathArgs) files.push(...expandPath(a));
  const seen = new Set();
  for (const f of files.filter((f) => { if (seen.has(f)) return false; seen.add(f); return true; })) {
    if (/\.(css|scss|html|htm|js|mjs|ts|jsx|tsx|svg|md)$/i.test(f)) {
      lintExternalFile(f);
    }
  }
}

// =================================================================
// Output
// =================================================================
for (const f of findings) {
  const loc = f.line ? `${f.scope}:${f.line}` : f.scope || 'self';
  const sug = f.suggestion ? `  →  ${f.suggestion}` : '';
  console.log(`${f.severity.padEnd(7)} ${f.rule.padEnd(28)} ${loc.padEnd(40)} ${f.message}${sug}`);
}
const errors = findings.filter((f) => f.severity === 'error').length;
const warnings = findings.filter((f) => f.severity === 'warning').length;
const infos = findings.filter((f) => f.severity === 'info').length;
console.log(`\nbds lint: ${errors} error · ${warnings} warning · ${infos} info (${findings.length} total)`);

if (wantsJson) {
  // emit parseable JSON to stderr delimited by sentinel lines so consumers can
  // split on them without depending on exact byte positions
  console.error('@bds-lint-json-begin');
  console.error(JSON.stringify({ mode: internalMode ? 'internal' : 'external', counts: { error: errors, warning: warnings, info: infos }, findings }, null, 2));
  console.error('@bds-lint-json-end');
}

if (errors > 0) process.exit(1);
if (warnings > 0) process.exit(2);
process.exit(0);
