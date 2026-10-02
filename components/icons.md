# Icons — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Geometry
Icons are drawn on a strict **10×10 sub-grid** (1 block = 2px) inside a **24×24px canvas**. This grid solves consistent centering (the 2px block unit divides the 24px canvas evenly) and enforces the heavy, cast-iron aesthetic.
- **Canvas size:** 24×24px
- **Sub-grid:** 10×10 (1 block = 2px)
- **Style:** Solid fill only. No strokes, no outlines, no line icons.
- **Stroke weight:** N/A — solid fill, not stroked.
- **Corner radius:** Preserve each supplied glyph’s drawn silhouette. The 16px container radius does not round small icon geometry.
- **Color:** Always `fill="currentColor"`. Never hardcode a fill color in the SVG.

## Do not
- Do not use stroke-based (outline) icons — they conflict with the solid, material aesthetic.
- Do not apply container rounding to glyphs; use the supplied geometry.
- Do not hardcode fill colors — use `currentColor` so icons inherit their color from CSS.
- Do not draw outside the 10×10 sub-grid — off-grid geometry breaks centering math.

## Status shape signals
Status icons use fixed geometric silhouettes to communicate state without relying on color alone:
| State | Shape |
|---|---|
| Success | Circle |
| Warning | Triangle |
| Error | Octagon |

## Delivery
SVG exports are stored in the Rails app at `app/assets/images/bds/icons/`. Rails ViewComponent wrappers in `app/components/` render the SVGs inline; that wrapper directory is not the export location. Inline SVGs inherit `currentColor` dynamically via CSS. For an external SVG, `<img>` and CSS `background-image` do not inherit the host’s color: use an inline SVG or an alpha mask painted by the host’s CSS `background-color`.

### Stylesheet deployment base
Component CSS recipes with `url()` are intended to be assembled into a consumer-owned stylesheet beside `tokens/generated/tokens.css`, with the repository asset tree preserved. From that directory, `../../assets/icons/check.svg` resolves to the supplied asset. This stylesheet is a deployment convention, not a generated file shipped by this repo. If CSS is moved, bundled, or pasted into an inline `<style>` (including Squarespace Custom CSS), rewrite URLs to the deployed asset paths; inline CSS resolves against the HTML document, not this Markdown file. Prose asset paths are repository-relative, not literal CSS URLs.

### Tinting and status
All 53 supplied icons use only `currentColor` or `none` paints. The 52 existing exports are retained; `check.svg` adds a standalone check glyph. `checkmark.svg` remains the circular success status silhouette. `play.svg` preserves its original circle and triangle as an even-odd transparent knockout. Radio and switch artwork preserves its geometry using a translucent `currentColor` ground and a solid selected mark, rather than flattening contrasting layers into an opaque blob.

Status paint comes from the host, never a hardcoded SVG fill. Success uses Bottle Glass green, warning Hard Hat yellow, error Toolbox red, and info Painter’s Tape blue. Utility icons (clock, search, document) and a general match indicator stay Iron unless the context explicitly communicates a semantic outcome; apply the corresponding semantic class for that outcome. Selected radio, checkbox, and chip indicators are interactive-control state and use Orange:
```css
.icon--match, .icon--neutral { color: var(--color-foreground); } /* neutral utility only */
.icon--success { color: var(--color-success); }
.icon--warning { color: var(--color-warning); }
.icon--error { color: var(--color-error); }
.icon--info { color: var(--color-link); }
.icon--selected { color: var(--color-primary); } /* interactive selection only */
```
Retain each supplied silhouette and accompanying label. Toast panels are Plaster with Iron message text and semantic icon paint (`toast.md`), not matching semantic fills. Hard Hat on Plaster is 1.8229:1, below 3:1: a warning glyph essential to understanding the state fails graphical contrast. When the visible label fully conveys the same meaning, the redundant glyph is not required for understanding under WCAG 1.4.11; its low contrast still is not a contrast pass. Never infer essentialness from `aria-hidden` alone or invent a darker yellow.

## Core icon set (Phase I)
| Icon | Status |
|---|---|
| Checkmark (circular status) | Complete (`checkmark.svg`) |
| Check (standalone glyph) | Complete (`check.svg`) |
| Error | Complete (`error.svg`) |
| Warning | Complete (`warning.svg`) |
| Search | Complete (`search.svg`) |
| Arrow (left, right) | Complete (`arrow-left.svg`, `arrow-right.svg`) |
| Arrow (up, down) | Complete — rotated from `arrow-right.svg` (`arrow-up.svg`, `arrow-down.svg`); Figma exports can replace later |
| Location | Complete (`location.svg`) |
| Clock | Complete (`clock.svg`) |
| User | Complete (`user.svg`) |
| External link | Complete (`external-link.svg`) |
| Plus | Complete via rotated `close.svg` (no dedicated `plus.svg`) |
| Menu (hamburger) | Complete (`menu.svg`) |
| Info | Pending — "i" in a square, to be drawn when needed |
