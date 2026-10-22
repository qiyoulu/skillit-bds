# Spacing Tokens — Skillit Kit BDS
**Last updated:** 2026-10-22
**Canonical source:** `tokens/tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- The system uses a strict **8px / 16px baseline grid**.
- Never hardcode margins or padding with arbitrary `px` values. Always use a multiple from the token scale below.
- Do not mix units (e.g., `em` or `%` for structural spacing); documented optical cap-height trimming may use `em` independently of layout spacing.
- Base spacing and paired padding tokens use `rem` (pixel equivalents assume a 16px root). Do not hardcode micro gaps in `px`. The canonical macro `clamp()` tokens intentionally retain their approved `px`/`vw` expressions.
- Whitespace is a core brand element — it focuses attention on the human. When in doubt, use more space, not less.
- The system uses tactile padding paired with each text tier in canonical `--padding-*x` tokens; every tier follows the same ratio.
---
## Base spacing scale
Built on a 4px base unit (`0.25rem`). Values are multiples of 4px at a 16px root, except the approved `--space-1.5` (6px) small-viewport text-list gap. `--space-N` is N × 4px. The `--space-*x` aliases (N × 16px, for example `--space-2x` = 32px) are **deprecated**: use the numeric token. They stay until a later release removes them.
| Token | Value | px equiv | Use |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4px | Micro gaps — icon-to-label, tight inline spacing |
| `--space-1.5` | `0.375rem` | 6px | Small-viewport text list gaps (mobile bullet/numbered rhythm) |
| `--space-2` | `0.5rem` | 8px | Compact spacing — badge padding, text list item gaps |
| `--space-3` | `0.75rem` | 12px | Small gaps |
| `--space-4` | `1rem` | 16px | Default spacing unit — paragraph gap, UI list item gap |
| `--space-5` | `1.25rem` | 20px | Medium — between form groups |
| `--space-6` | `1.5rem` | 24px | Standard section padding, between related elements |
| `--space-8` | `2rem` | 32px | Between unrelated elements, nav to content |
| `--space-10` | `2.5rem` | 40px | Large section gaps |
| `--space-12` | `3rem` | 48px | Section breaks |
| `--space-16` | `4rem` | 64px | Major section separators |
| `--space-20` | `5rem` | 80px | Hero padding, full-bleed section margins |
| `--space-24` | `6rem` | 96px | Maximum section vertical padding |
---
## Macro spacing (fluid)
Large structural spacing uses CSS `clamp()` to fluidly scale down, preventing abrupt layout shifts on resize. This token does **not** collide with the base scale.
| Token | CSS Value | Common Use |
|---|---|---|
| `--space-128` | `clamp(2rem, calc(12.5vw - 2rem), 8rem)` | Page top/bottom padding, section gaps |
| `--space-page` | alias of `--space-128` | Same value, named for its role |

> **`--space-128` anchors.** The clamp is derived from two anchors, 64px at 768px and 128px at 1280px, with a 2rem (32px) floor. Up to 768px the top/bottom padding is exactly twice `--space-gutter`: the 32px floor against 16px, then both ramp from 512px to 64px against 32px at 768px. Above 768px the gutter holds at 32px while the page padding keeps growing. Above 1280px the value stops at 128px. `rem` keeps it responsive to the user's font-size setting.

> **Retired:** `--space-64` and `--space-96` from the old fluid multiplier scale are gone. Also retired: `--space-256`, which had no consumers. Do not use any of them. The macro scale is `--space-128` only, also available as `--space-page`.

## Gutter
`--space-gutter` is one value for the page side margin and the column gap: 16px up to 512px, a ramp to 32px at 768px, and 32px above. Header, body, footer and grids share it. It is a single `clamp()` declaration, with no media query to copy. It is half of `--space-128` at every width up to 768px.
---
## Structural Constants
| Element | Height / Padding | Margin |
| ------- | ---------------- | ------ |
| Nav Bar | 64px (`--space-16`) | —      |
| Logo Lockup | 32px (`--logo-height`) | —      |
| Primary Buttons | Paired `--padding-*x` token in `rem` | — |
| Page top/bottom padding | — | `--space-128`: 32px mobile, 64px at 768px, 128px from 1280px |
| Content column | — | `--space-gutter` side padding: 32px from 768px, 16px to 512px, a ramp between; the 1200px usable width is reached at 1264px and centered above it |
---
## Tactile padding
Use the canonical padding token paired with the text tier. Text-0.75x, Text-1x, Text-1.5x, and Text-2x follow the 0.5× vertical / 1× horizontal font-size ratio, encoded in `rem`, not local `em` or hardcoded `px`. Text-0.75x is 0.375rem / 0.75rem (6px / 12px at a 16px root). Use only approved tier/padding pairs; do not invent 14px controls. Outlook email may use explicit pixel equivalents matching these approved pairs. Editable inputs use the same `--padding-1x` (`0.5rem 1rem` / 8px 16px) pair as Text-1x buttons; icon-only buttons use fixed target geometry.
| Component | Vertical padding | Horizontal padding |
|---|---|---|
| Button (Text-1x) | `0.5rem` | `1rem` |
| Button (Text-1.5x) | `0.75rem` | `1.5rem` |
| Button (Text-2x) | `1rem` | `2rem` |
| Button (Text-0.75x) | `0.375rem` | `0.75rem` |
| Feature card (all sizes) | `--space-8` (32px) | `--space-8` (32px) |
| List card (repeated, all sizes) | `--space-4` (16px) | `--space-4` (16px) |
| Input field (Text-1x) | `0.5rem` (`--space-2`, 8px) | `1rem` (`--space-4`, 16px) |
---
## Layout grid
### Website / marketing
| Property | Value |
|---|---|
| Max content width | `1200px` — centered with `margin: 0 auto`; reached at 1264px (1200px plus 32px each side) |
| Side margin | `--space-gutter` each side, shared by header and body: 16px to 512px, ramping to 32px at 768px |
| Content-block min width | `326px`; not each grid track, and may shrink to viewport width for reflow |
| Column gutter | `--space-gutter`, the same value as the side margin |
| Page top/bottom padding | `--space-128` (see anchors above) |
| Grid columns (desktop) | 12 |
| Grid columns (tablet, 768–1023px) | Two columns; 336px each at 768px, never below `326px` |
| Grid columns (mobile) | Single-column content layout |
### App (worker-facing)
| Property | Value |
|---|---|
| Max content width | `1200px` — centered with `margin: 0 auto`; reached at 1264px (1200px plus 32px each side) |
| Side margin | `--space-gutter` each side, shared by header and body: 16px to 512px, ramping to 32px at 768px |
| Vertical section gap | `--space-8` (32px) |
| List item gap | `--space-4` (16px) |
| Bottom nav height | `64px` |
| Touch target minimum | `40px` |
---
## Text Spacing Rules
- **Paragraphs:** `--space-4` (16px / 1rem) below paragraphs. This is exactly equal to the body font size (1em), maintaining a perfect consistent rhythm.
- **Text Lists:** `--space-2` (8px / 0.5rem) between bulleted or numbered text items. This tighter spacing ensures the list reads visually as a single, cohesive block of information.
- **UI Lists:** `--space-4` (16px / 1rem) between interactive list items in the app or dashboard. This wider spacing protects the 40px minimum touch target rule.

### Small viewports (`< 768px`)
- **Paragraphs:** unchanged (`--space-4`, 16px) — paragraph spacing is viewport-independent.
- **Text Lists:** `--space-1.5` (0.375rem / 6px at a 16px root) is the approved small-viewport exception to the default `--space-2` gap.
- **UI Lists:** unchanged (`--space-4`, 16px) — the 40px touch target rule is viewport-independent.
---
## Breakpoints
| Name | Min width | Context |
|---|---|---|
| `sm` | `480px` | Large mobile |
| `md` | `768px` | Tablet — 32px side padding, two-column grid |
| `lg` | `1024px` | 12-column grid; navigation still a menu button with the mark |
| `xl` | `1280px` | Full navigation bar and lockup; page top/bottom padding reaches 128px |
```css
/* Use min-width (mobile-first) */
@media (min-width: 480px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```
---
## CSS custom properties (copy-paste ready)
```css
:root {
  --space-1:  0.25rem;
   --space-1\.5: 0.375rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-128: clamp(2rem, calc(12.5vw - 2rem), 8rem);
  --space-page: clamp(2rem, calc(12.5vw - 2rem), 8rem); /* alias of --space-128 */
  --space-gutter: clamp(1rem, calc(6.25vw - 1rem), 2rem); /* 16px to 512px, 32px at 768px */
  --max-width-content: 1200px;
  --column-min-width: 326px;
  --max-width-app:     1200px;
  --max-width-text:    70ch;
  --touch-target-min:  40px;
  --nav-height: 64px;
  --logo-mark-min: 21px;
  --logo-height: 32px;
  --wordmark-min: 16px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```
---
## Header/body alignment
Header bars (page headers, section headers, nav bars) align to the same content column as the body below them. A header that indents differently from its content breaks the vertical rhythm.

- From 768px: header content uses `--space-gutter` (32px) side margins, same as body. It is capped at `1200px` and centered with `margin: 0 auto` once the viewport reaches 1264px.
- Mobile (<768px): header content uses `--space-gutter` (16px) side margins.
- Full-bleed header backgrounds may span the viewport; only the content aligns.
- `1200px` is usable desktop content width, not a box reduced by giant macro side padding. Use a border-box wrapper with `padding-inline: var(--space-gutter)` (16px to 512px, 32px at 768px) and `max-width: calc(var(--max-width-content) + 2 * var(--space-gutter))`; share it between header and body. Side padding is never dropped to zero, so the content never touches the screen edge.
- Vertical padding inside headers matches the section's vertical rhythm.

## Whitespace rules
- **Minimum editorial padding:** All full-width sections should have at minimum `--space-8` (32px) top and bottom padding on mobile and `--space-16` (64px) from 768px, matching `--space-128`. Less than this reads as cramped and contradicts the brand’s editorial whitespace principle.
- **Maximum text width:** Body text columns should never exceed `70ch` (approximately 70 characters). Set `max-width: var(--max-width-text)` on all `<p>` blocks.
- **Hero sections:** Minimum `--space-24` (96px) top padding on desktop. The hero is the brand’s first impression — give it room.
- **Between unrelated sections:** Always `--space-16` minimum. Never let unrelated content run together.
