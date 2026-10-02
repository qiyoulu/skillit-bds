/** Dependency-free static CSS checks. Not a browser/cascade or a SCSS compiler.
 * Token blocks, declarations and var() arguments are lexed with balanced delimiters,
 * comments and strings; never split a CSS value on an embedded semicolon/brace.
 */
export const lineAt = (text, offset) => text.slice(0, offset).split('\n').length;
export const decodeIdentifier = s => s.replace(/\\([\da-fA-F]{1,6}\s?|[^\n\r\f])/g, (_, v) => /^[\da-fA-F]/.test(v) ? String.fromCodePoint(parseInt(v, 16) || 0xfffd) : v);
export const validIdentifier = s => /^--(?:[\w-]|[^\x00-\x7f]|\\(?:[\da-fA-F]{1,6}\s?|[^\n\r\f]))+$/.test(s);

export function maskComments(text, js = false) {
  let out = '', quote = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      out += c;
      if (c === '\\') { out += text[++i] || ''; continue; }
      if (c === quote) quote = '';
    } else if (c === '"' || c === "'" || (js && c === '`')) { quote = c; out += c; }
    else if (c === '/' && (text[i + 1] === '*' || (js && text[i + 1] === '/'))) {
      const block = text[i + 1] === '*';
      out += '  '; i += 2;
      while (i < text.length && (block ? !(text[i] === '*' && text[i + 1] === '/') : text[i] !== '\n')) {
        out += text[i] === '\n' ? '\n' : ' '; i++;
      }
      if (block) { out += '  '; i++; } else { out += '\n'; }
    } else out += c;
  }
  return out;
}

export function parseCss(text) {
  const clean = maskComments(text);
  const blocks = [], stack = [];
  let start = 0, quote = '', parens = 0, brackets = 0;
  const declaration = end => {
    if (!stack.length) return;
    const raw = clean.slice(start, end), colon = raw.indexOf(':');
    if (colon < 0) return;
    const property = raw.slice(0, colon).trim();
    if (!property || property.startsWith('@')) return;
    const offset = start + raw.indexOf(property);
    stack.at(-1).declarations.push({ property, name: decodeIdentifier(property), value: raw.slice(colon + 1).trim().replace(/\s*!important\s*$/i, ''), offset, line: lineAt(text, offset) });
  };
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (c === '\\') { i++; continue; }
    if (quote) { if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '(') parens++;
    else if (c === ')') parens--;
    else if (c === '[') brackets++;
    else if (c === ']') brackets--;
    else if (!parens && !brackets) {
      if (c === '{') {
        const block = { selector: clean.slice(start, i).trim(), declarations: [], offset: start, line: lineAt(text, start) };
        blocks.push(block); stack.push(block); start = i + 1;
      } else if (c === ';') { declaration(i); start = i + 1; }
      else if (c === '}') { declaration(i); stack.pop(); start = i + 1; }
    }
  }
  return blocks;
}

// Includes nested fallback var() dependencies. Offsets point to identifier text.
export function references(text) {
  const result = [];
  let quote = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (quote) { if (text[i] === quote) quote = ''; continue; }
    if (text[i] === '"' || text[i] === "'") { quote = text[i]; continue; }
    const m = /^var\s*\(\s*/i.exec(text.slice(i));
    if (!m || (i && /[\w-]/.test(text[i - 1]))) continue;
    let j = i + m[0].length, end = j;
    while (end < text.length && !/[,)]/.test(text[end])) {
      if (text[end] === '\\') {
        const escape = /^\\(?:[\da-fA-F]{1,6}\s?|[^\n\r\f])/.exec(text.slice(end));
        end += escape ? escape[0].length : 1;
      } else end++;
    }
    const raw = text.slice(j, end).trim();
    result.push({ raw, name: decodeIdentifier(raw), offset: j });
    i = end - 1;
  }
  return result;
}

// Read literals only; do not execute a supplied Tailwind/JS file.
export function jsStrings(text) {
  const clean = maskComments(text, true), result = [];
  const re = /(['"`])((?:\\[\s\S]|(?!\1)[^\\])*?)\1/g;
  for (const m of clean.matchAll(re)) {
    const value = m[2].replace(/\\(u[\da-fA-F]{4}|x[\da-fA-F]{2}|[\s\S])/g, (_, v) => {
      if (/^[ux]/.test(v) && v.length > 1) return String.fromCharCode(parseInt(v.slice(1), 16));
      return ({ n: '\n', r: '\r', t: '\t' })[v] ?? v;
    });
    result.push({ text: value, offset: m.index + 1, line: lineAt(text, m.index) });
  }
  return result;
}

export function cssFences(text) {
  const result = [];
  for (const m of text.matchAll(/(^|\n)[ \t]*(`{3,}|~{3,})(css|scss)[^\n]*\n([\s\S]*?)\n[ \t]*\2[ \t]*(?=\n|$)/gi)) {
    const offset = m.index + m[0].indexOf('\n', m[1].length) + 1;
    result.push({ text: m[4], offset, line: lineAt(text, offset) });
  }
  return result;
}

// Styles in HTML examples can supply component-local variables to a CSS fence.
export function htmlStyles(text) {
  const result = [];
  for (const m of text.matchAll(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/gi)) {
    const offset = m.index + m[0].indexOf(m[2]);
    result.push({ text: `.inline { ${m[2]} }`, line: lineAt(text, offset) });
  }
  for (const m of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const offset = m.index + m[0].indexOf('>') + 1;
    result.push({ text: m[1], line: lineAt(text, offset) });
  }
  return result;
}

export function customValues(blocks) {
  return new Map(blocks.flatMap(b => b.declarations).filter(d => d.name.startsWith('--')).map(d => [d.name, d.value]));
}

export function resolveValue(value, values, visiting = new Set()) {
  if (value == null) return null;
  let failed = false;
  // Replace innermost var() first so fallbacks work without a greedy regexp.
  let out = String(value);
  for (let depth = 0; /var\s*\(/i.test(out) && depth < 64; depth++) {
    const next = out.replace(/var\s*\(\s*((?:\\.|[^(),])+?)(?:\s*,\s*([^()]*))?\s*\)/gi, (_, raw, fallback) => {
      const name = decodeIdentifier(raw.trim());
      if (visiting.has(name)) { failed = true; return ''; }
      const nextVisiting = new Set(visiting); nextVisiting.add(name);
      const resolved = resolveValue(values.get(name), values, nextVisiting);
      if (resolved != null) return resolved;
      if (fallback != null) return fallback.trim();
      failed = true; return '';
    });
    if (next === out) { failed = true; break; }
    out = next;
  }
  return failed ? null : out;
}

export function normalizeValue(value) {
  if (value == null) return null;
  // Preserve spaces and case inside font-family/string literals.
  return String(value).split(/((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))/g).map((part, i) => {
    if (i % 2) return part.replace(/^"(.*)"$/, "'$1'");
    return part.replace(/#[\da-f]{3,8}\b/gi, s => s.toUpperCase())
      .replace(/(^|[^\w#.-])(-?(?:\d+\.\d+|\.\d+))(?![\w.-])/g, (_, before, n) => before + Number(n))
      .replace(/\s+/g, ' ').replace(/\s*([(),])\s*/g, '$1');
  }).join('').trim();
}

export function checkReferences(text, blocks, known, scope, report, lineOffset = 0) {
  const locals = customValues(blocks), available = new Set([...known.keys(), ...locals.keys()]);
  const issue = (rule, line, message, suggestion) => report({ rule, severity: 'error', scope, line: line + lineOffset, message, suggestion });
  for (const d of blocks.flatMap(b => b.declarations)) {
    if (d.property.startsWith('--') && !validIdentifier(d.property)) issue('css_identifier_invalid', d.line, `invalid custom-property identifier ${d.property}`, 'escape every literal period with one CSS backslash');
  }
  for (const r of references(maskComments(text))) {
    if (!validIdentifier(r.raw)) issue('css_identifier_invalid', lineAt(text, r.offset), `invalid var() identifier ${r.raw}`, 'escape every literal period with one CSS backslash');
    else if (!available.has(r.name)) issue('token_reference_unknown', lineAt(text, r.offset), `undefined custom-property reference ${r.raw}`, 'use a canonical token or declare the local custom property');
  }
  // Each selector has its own dependency graph. A local self-reference cannot be
  // rescued by the canonical/global definition it shadows. Include fallback edges.
  const groups = new Map();
  for (const b of blocks) {
    if (!groups.has(b.selector)) groups.set(b.selector, new Map());
    for (const d of b.declarations.filter(d => d.name.startsWith('--'))) groups.get(b.selector).set(d.name, d);
  }
  for (const graph of groups.values()) {
    const done = new Set(), active = [], emitted = new Set();
    const visit = name => {
      if (active.includes(name)) {
        const cycle = active.slice(active.indexOf(name));
        const key = [...cycle].sort().join(',');
        if (!emitted.has(key)) {
          emitted.add(key);
          issue('token_reference_cycle', graph.get(name).line, `custom-property cycle ${[...cycle, name].join(' → ')}`, 'replace the recursive alias with a canonical value');
        }
        return;
      }
      if (done.has(name) || !graph.has(name)) return;
      active.push(name);
      for (const r of references(graph.get(name).value)) visit(r.name);
      active.pop(); done.add(name);
    };
    for (const name of graph.keys()) visit(name);
  }
}

export function compareCanonical(blocks, canonical, scope, rule, report, { required = false, lineOffset = 0 } = {}) {
  const actual = customValues(blocks), expectedValues = new Map([...canonical].map(([name, t]) => [name, t.value]));
  const environment = new Map([...expectedValues, ...actual]);
  for (const [name, expected] of canonical) {
    const declarations = blocks.flatMap(b => b.declarations).filter(d => d.name === name);
    if (!declarations.length && required && expected.required !== false) {
      report({ rule, severity: 'error', scope, message: `${name} missing; tokens.json5 expects ${expected.value}`, suggestion: `declare ${name} with its canonical value` });
    }
    for (const d of declarations) {
      const written = resolveValue(d.value, environment), value = resolveValue(expected.value, expectedValues);
      if (written == null || normalizeValue(written) !== normalizeValue(value)) {
        report({ rule, severity: 'error', scope, line: d.line + lineOffset, message: `${name} written as ${d.value}; tokens.json5 says ${expected.value}`, suggestion: `set ${name} to its canonical value` });
      }
    }
  }
}

export function checkGeometry(blocks, known, scope, report, lineOffset = 0) {
  const globals = new Map([...known, ...customValues(blocks.filter(b => /:root\b/.test(b.selector)))]);
  for (const block of blocks) {
    const values = new Map([...globals, ...customValues([block])]);
    for (const d of block.declarations.filter(d => /^(border-radius|border-(?:top|bottom)-(?:left|right)-radius)$/i.test(d.name))) {
      const resolved = resolveValue(d.value, values);
      const parts = resolved?.trim().split(/[\s/]+/) || [];
      if (parts.length && parts.every(v => /^(?:0(?:px|rem|em)?|16px|9999px|50%)$/.test(v))) continue;
      report({ rule: 'radius_scale', severity: 'error', scope, line: d.line + lineOffset, message: `${d.name}: ${d.value}`, suggestion: 'use 0, canonical 16px or pill radius; 50% is reserved for circle indicators' });
    }
  }
}

function rgbColor(value) {
  if (!value) return null;
  const names = { white: '#FFFFFF', black: '#000000' };
  let s = names[value.toLowerCase()] || value;
  if (/^#[\da-f]{3}$/i.test(s)) s = '#' + s.slice(1).split('').map(c => c + c).join('');
  // Alpha and color-mix need a rendered backdrop: never silently discard alpha.
  if (!/^#[\da-f]{6}$/i.test(s)) return null;
  return [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255);
}
export function contrast(a, b) {
  const luminance = rgb => rgb.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  const A = rgbColor(a), B = rgbColor(b);
  if (!A || !B) return null;
  const [hi, lo] = [luminance(A), luminance(B)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function checkContrast(blocks, known, scope, report, lineOffset = 0) {
  const globals = new Map([...known, ...customValues(blocks.filter(b => /:root\b/.test(b.selector)))]);
  const px = value => {
    const m = /^([\d.]+)(rem|px|pt)$/.exec(value || '');
    return m ? Number(m[1]) * ({ rem: 16, px: 1, pt: 4 / 3 })[m[2]] : 0;
  };
  for (const block of blocks) {
    const declarations = new Map(block.declarations.map(d => [d.name.toLowerCase(), d]));
    const fg = declarations.get('color'), bg = [...block.declarations].reverse().find(d => /^(background|background-color)$/i.test(d.name));
    if (!fg || !bg) continue;
    const values = new Map([...globals, ...customValues([block])]);
    const f = resolveValue(fg.value, values), b = resolveValue(bg.value, values), ratio = contrast(f, b);
    if (ratio == null) {
      report({ rule: 'wcag_contrast_unresolved', severity: 'info', scope, line: fg.line + lineOffset, message: 'static contrast cannot resolve this text/background pair', suggestion: 'verify rendered contrast in a browser (alpha, expressions and cascade need a backdrop)' });
      continue;
    }
    const size = px(resolveValue(declarations.get('font-size')?.value, values));
    const weight = resolveValue(declarations.get('font-weight')?.value, values);
    const bold = weight === 'bold' || Number(weight) >= 700;
    const threshold = size >= 24 || (bold && size >= 56 / 3) ? 3 : 4.5;
    if (ratio < threshold) report({ rule: 'wcag_contrast', severity: 'error', scope, line: fg.line + lineOffset, message: `text/background contrast ${ratio.toFixed(2)}:1 (fg=${f} bg=${b}) fails WCAG AA (${threshold}:1 required)`, suggestion: `raise contrast to >= ${threshold}:1` });
  }
}

export function checkSvgPaint(text, scope, report) {
  const clean = maskComments(text.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' ')));
  const check = (property, value, offset) => {
    if (/^(none|currentColor)$/i.test(value.trim())) return;
    report({ rule: 'svg_fill_color', severity: 'error', scope, line: lineAt(text, offset), message: `hardcoded SVG ${property}=${JSON.stringify(value)}`, suggestion: 'use currentColor or none; set CSS color with a canonical token' });
  };
  for (const m of clean.matchAll(/\b(fill|stroke)\s*=\s*(["'])(.*?)\2/gi)) check(m[1], m[3], m.index);
  for (const m of clean.matchAll(/\b(fill|stroke)\s*:\s*([^;}"']+)/gi)) check(m[1], m[2], m.index);
}
