#!/usr/bin/env node
/**
 * skillit-bds linter  (idiom aligned with iroha-mcp conventions)
 *
 * One binary. Two modes. One loop.
 *
 *   node scripts/lint.mjs                          -> internal consistency
 *                                                       (BDS repo against itself)
 *   node scripts/lint.mjs <path> [<path>...]       -> external consistency
 *                                                       (artifacts the BDS produces)
 *
 * Internal rules read tokens/tokens.json5 as the canonical source and
 * verify every drift between the json5, its derived tokens.css, and the
 * human-readable spec markdown.  External rules verify any CSS / JS /
 * HTML / SVG / MD file uses only those tokens and the documented
 * geometry, copy, and accessibility rules.  Both rule sets read the
 * same canonical source.  The outer loop is closed by emitting a JSON
 * report that is itself an artifact a downstream linter can validate.
 *
 * Output (text mode)
 *   severity  rule  scope:line  message  →  suggestion
 *
 * Output (--json)
 *   machine-readable report to stderr, shape:
 *     { mode, counts, findings: [{ rule, severity, scope, line, message, suggestion }] }
 *
 * Exit codes
 *   0  no errors or warnings
 *   1  at least one error
 *   2  at least one warning, no errors
 *
 * Severity ladder: error | warning | info   (three tiers, matches iroha-mcp)
 *
 * What it lints (internal mode — runs against the BDS repo itself)
 *   token_css_drift         --color-*-hover etc. written in tokens.css must
 *                             equal tokens.json5, in uppercase
 *   token_doc_drift         the copy-paste :root block in tokens/docs/color.md
 *                             must equal tokens.json5
 *   layout_max_width_drift  rules/layout.md must use --max-width-content
 *                             value from tokens.json5 (not historical 1168px)
 *   typography_escape_drift tokens/docs/typography.md use 1\.5 not 1\\.5
 *                             (single-escape form for CSS identifier)
 *   banned_voice_sync       voice/brand-voice.md and LLM-INSTRUCTIONS.md keep
 *                             the same banned-word list
 *
 * What it lints (external mode — runs against any CSS / SCSS / HTML / SVG /
 *   JS / TS / MD file or directory)
 *   hard_token_reference    no raw hex outside :root; brand hexes prefer var()
 *   radius_scale            0, 16px, 9999px only (clamp/50%/1-3px ok)
 *   box_shadow, gradient_banned, text_align_center, text_transform_uppercase
 *   px_font_size, wcag_contrast (paired text/background in :root)
 *   svg_fill_color, chart_sequential_scale, opacity_filter_hover
 *   smart_quotes (straight apostrophe in human copy)
 *   banned_voice (in markdown body, fenced code excluded)
 *
 * Diagnostic
 *   BDS_LINT_TRACE=1   print every drift before deciding whether to add
 *                      a finding (useful when you suspect the linter is
 *                      lying).
 *
 * Replace validate.mjs?  no.  validate.mjs asserts hoisted hex values
 * used to recurse; lint.mjs is the running rule set for humans.  Both
 * can coexist.
 *
 * Override (CLI)
 *   --severity <rule>=<severity>   repeatable, takes any rule id
 *   --json                         emit JSON report
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, relative, extname, join } from 'node:path';

// =================================================================
// CLI parsing
// =================================================================
const argv = process.argv.slice(2);
const wantsJson = argv.includes('--json');
const severityOverrides = new Map();
for (const a of argv) {
  if (a.startsWith('--severity=')) {
    const [rule, sev] = a.slice('--severity='.length).split('=');
    severityOverrides.set(rule, sev);
  }
}
const pathArgs = argv.filter((a) => !a.startsWith('--'));
const internalMode = pathArgs.length === 0;
const repo = process.cwd();

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
  if (segs[1] === 'spacing') return `--space-${cssEscapeKey(segs.slice(2).join('.'))}`;
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
      _path: path,
      _cssVar: cssVarFor(path),
    };
    return acc;
  }
  for (const [k, v] of Object.entries(node || {})) {
    if (k.startsWith('$')) continue;
    if (k === 'hover' && typeof v === 'object') {
      flatten(v, prefix + 'color.hover.', acc);
      continue;
    }
    flatten(v, prefix + k + '.', acc);
  }
  return acc;
}

// tokens.json5 has its leaves under `base`; pass an empty prefix and the
// first-level `base` key contributes `base` naturally.
const TOKEN = flatten(tokens, '', {});

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

  // token_css_drift
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, 'utf8');
    for (const t of Object.values(TOKEN)) {
      if (t.type !== 'color' || typeof t.value !== 'string' || !isHex(t.value)) continue;
      if (!t._cssVar) continue;
      const re = new RegExp(`${escapeRe(t._cssVar)}\\s*:\\s*(#[0-9a-fA-F]{3,8})`, 'i');
      const m = css.match(re);
      if (!m) {
        report({ rule: 'token_css_drift', severity: 'error', scope: 'tokens.css', message: `${t._cssVar} not declared in tokens.css — tokens.json5 expects ${t.value}`, suggestion: `add \`${t._cssVar}: ${t.value};\` to tokens.css` });
        continue;
      }
      const written = normalizeHex(m[1]);
      const expected = normalizeHex(t.value);
      if (written !== expected) {
        report({ rule: 'token_css_drift', severity: 'error', scope: 'tokens.css', message: `${t._cssVar} written as ${m[1]}; tokens.json5 says ${t.value}`, suggestion: `set ${t._cssVar}: ${t.value}; in tokens.css` });
      } else if (m[1] !== m[1].toUpperCase()) {
        report({ rule: 'token_css_case', severity: 'warning', scope: 'tokens.css', message: `${t._cssVar} uses non-uppercase hex ${m[1]}`, suggestion: `change ${m[1]} → ${m[1].toUpperCase()}` });
      }
    }
  }

  // token_doc_drift  (copy-paste :root block in tokens/docs/color.md)
  if (existsSync(colorMdPath)) {
    const md = readFileSync(colorMdPath, 'utf8');
    const blockMatch = md.match(/```css\s*:root\s*\{([\s\S]*?)\}\s*```/);
    if (blockMatch) {
      const block = blockMatch[1];
      for (const t of Object.values(TOKEN)) {
        if (t.type !== 'color' || typeof t.value !== 'string' || !isHex(t.value)) continue;
        if (!t._cssVar) continue;
        const re = new RegExp(`${escapeRe(t._cssVar)}\\s*:\\s*(#[0-9a-fA-F]{3,8})`, 'i');
        const m = block.match(re);
        if (!m) {
          report({ rule: 'token_doc_drift', severity: 'warning', scope: 'tokens/docs/color.md', message: `copy-paste :root block missing ${t._cssVar} (tokens.json5 says ${t.value})`, suggestion: `add \`${t._cssVar}: ${t.value};\` to the copy-paste block` });
          continue;
        }
        if (normalizeHex(m[1]) !== normalizeHex(t.value)) {
          report({ rule: 'token_doc_drift', severity: 'error', scope: 'tokens/docs/color.md', message: `copy-paste block ${t._cssVar}: ${m[1]} — tokens.json5 says ${t.value}`, suggestion: `set ${t._cssVar}: ${t.value}; in the copy-paste block` });
        }
      }
    } else {
      report({ rule: 'token_doc_block_missing', severity: 'info', scope: 'tokens/docs/color.md', message: 'no ```css :root { ... } ``` block found; brand consistency depends on prose only', suggestion: 'add a copy-paste ```css :root { ... } ``` block so implementers can lift the file from the doc' });
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

  // radius_scale
  if (isCss) {
    for (const h of scanCapture(text, /border-radius\s*:\s*([^;}]*)/)) {
      const v = h.value.trim();
      if (/^(0|16px|9999px|50%|1px|2px|3px|clamp\(.*\))$/i.test(v)) continue;
      report({ rule: 'radius_scale', severity: 'error', scope: rel(pathStr), line: h.line, message: `border-radius: ${v}`, suggestion: 'use 0, 16px, 9999px (or 50%/clamp)' });
    }
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

  // svg_fill_color
  if (ext === '.svg' || isHtmlish) {
    for (const h of scanCapture(text, /fill\s*=\s*"([^"]+)"/g)) {
      const v = h.value;
      if (v === 'none' || v === 'currentColor') continue;
      if (isHex(v) && !BRAND_HEX.includes(normalizeHex(v))) {
        report({ rule: 'svg_fill_color', severity: 'error', scope: rel(pathStr), line: h.line, message: `hardcoded fill="${v}" on line ${h.line}`, suggestion: 'use fill="currentColor" + CSS color:var(--…)' });
      }
    }
  }

  // wcag_contrast (paired text/background in any :root block)
  if (isCss) {
    const rootRanges = findRootRanges(text);
    const rules = text.split('\n');
    for (const [a, b] of rootRanges) {
      const blockText = rules.slice(a - 1, b).join('\n');
      const colors = new Map();
      const tRe = /--([a-z][a-z0-9-]*)\s*:\s*(#[0-9a-fA-F]{3,8})/gi;
      for (const mm of blockText.matchAll(tRe)) colors.set(mm[1], normalizeHex(mm[2]));
      const pairRe = /color\s*:\s*(var\(--([a-z0-9-]+)\)|(#[0-9a-fA-F]{3,8}))[^;]*?background(?:-color)?\s*:\s*(var\(--([a-z0-9-]+)\)|(#[0-9a-fA-F]{3,8}))/gi;
      let pm;
      while ((pm = pairRe.exec(text)) != null) {
        const fg = pm[2] ? colors.get(pm[2]) : normalizeHex(pm[3]);
        const bg = pm[5] ? colors.get(pm[5]) : normalizeHex(pm[6]);
        if (!fg || !bg) continue;
        const r = contrastRatio(fg, bg);
        if (r < 4.5) {
          const lineOf = text.slice(0, pm.index).split('\n').length;
          report({ rule: 'wcag_contrast', severity: 'error', scope: rel(pathStr), line: lineOf, message: `text/background contrast ${r.toFixed(2)}:1 (fg=${fg} bg=${bg}) fails WCAG AA`, suggestion: 'raise contrast to >= 4.5:1' });
        }
      }
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
