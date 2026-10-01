# Color Tokens — Skillit Kit BDS
**Last updated:** 2026-08-23
**Canonical source:** `tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- Use ONLY the tokens listed here. Never approximate, mix, or invent colors.
- Every token has a designated UI role. Use each color only for its assigned role.
- Primary surfaces are Canvas + Iron. Traffic Cone is the single accent — use it once per layout section, not repeatedly.
- **Color usage is limited to three places only:** (1) text fill on Canvas, Plaster, or Iron; (2) button background fill; (3) icons — including status badges, which are drawn icons (shape-coded, see `rules/accessibility.md`). Never use a color as a layout background, a decorative fill, a border, or a shadow.
- **Borders are always Iron** (structural) — never a status color. State lives in icons and text, not borders.
- **Focus rings use Traffic Cone** (`--color-primary`) — the one exception to the "one accent per section" rule. Focus rings are functional, not decorative.
- **Painter's Tape (blue):** text without underline = **info**; text with underline = **link**. Never a fill.
- **Info text size floor:** Painter's Tape on Canvas is 4.43:1 — fails WCAG AA for normal text (needs 4.5:1). Keep info/link text at `--text-1x` (16px) or larger regardless, and prefer Iron for any text where AA compliance is required; treat Painter's Tape on Canvas as a soft exception pending a color review.
- Never use color as the only status signal. Always pair with shape and label.
- All contrast ratios listed are against their intended text color. Do not pair colors outside their documented combinations.
---
## Core palette
| Token             | Name     | Hex       | CMYK           | Spot (Coated / Uncoated) | UI Role                                            |
| ----------------- | -------- | --------- | -------------- | -------------- | -------------------------------------------------- |
|| `--color-background`      | 📜 Canvas | `#F7F1ED` | 2, 3, 4, 0     | Paper — not an ink | Primary background — all surfaces default to this  |
| `--color-surface` | ⬜️ Plaster  | `#FFFFFF` | 0, 0, 0, 0      | Paper — unprinted stock | Elevated surfaces, cards, and isolated form inputs |
| `--color-foreground`      | ⬛️ Iron | `#232F36` | 80, 50, 45, 65 | 432 C / 432 U  | Foreground                                                |
| `--color-primary` | 🟧 Traffic Cone     | `#EF6F1A` | 0, 65, 100, 0  | 158 C / 158 U  | Primary action                                            |
| `--color-warning` | 🟨 Hard Hat | `#FEB11C` | 0, 30, 100, 0  | 1235 C / 1235 U | Non-fatal alerts, warnings                         |
| `--color-error`   | 🟥 Toolbox  | `#C8102E` | 2, 100, 85, 6  | 186 C / 186 U  | Fatal errors, destructive actions                  |
| `--color-success` | 🟩 Bottle Glass   | `#33663D` | 50, 0, 40, 60  | 2427 C / 2427 U | Confirmations, success states                      |
| `--color-link`    | 🟦 Painter's Tape   | `#007CA6` | 100, 30, 10, 10| 3135 C / 3135 U | Link                                                |

## Hover states

Hover colors are generated with `color-mix(in oklab, base, black 10%)` — darker by ~10% in luminance while preserving hue. Neutrals stay warm; no grey cast. Hover values live in `tokens.json5` as `color-mix()` expressions; do not recompute hex.

| Token | Name | Hex | Base | Use |
| ----- | ---- | --- | ---- | --- |
| `--color-background-hover` | Canvas hover | — | Canvas | Page/subtle surface hover |
| `--color-surface-hover` | Plaster hover | — | Plaster | Card/surface hover |
| `--color-foreground-hover` | Iron hover | — | Iron | Text/structural hover |
| `--color-primary-hover` | Traffic Cone hover | — | Traffic Cone | Primary button hover |
| `--color-warning-hover` | Hard Hat hover | — | Hard Hat | Warning button hover |
| `--color-error-hover` | Toolbox hover | — | Toolbox | Destructive button hover |
| `--color-success-hover` | Bottle Glass hover | — | Bottle Glass | Success button hover |
| `--color-link-hover` | Painter's Tape hover | — | Painter's Tape | Link/info hover |

**On spot references.** Coated and uncoated are the same ink on different paper — the number is shared, the appearance is not. Uncoated stock absorbs ink, so every colour returns lighter, duller, and slightly greyed. These pairs are the correct references to hand a printer, but they are not a guarantee of matched appearance across stocks. **Proof on the actual stock before production.** Traffic Cone is the one to watch: saturated orange dulls hardest on uncoated, and if 158 U proofs too flat, the fix is a deliberately hotter ink for uncoated applications, not a change to the digital token. Spot inks matter only where you are printing spot — business cards, signage, vehicle wrap, embroidery. Everything running process uses the CMYK values above.
---
## Contrast ratios (WCAG AA minimum: 4.5:1 body, 3:1 UI)
| Foreground         | Background         | Ratio  | Use                                                                                                 |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| Iron `#232F36` | Canvas `#F7F1ED` | 12.4:1 | Body text — passes AAA                                                                              |
| Iron `#232F36`     | Plaster `#FFFFFF`  | 13.0:1 | Body text on cards/surfaces — passes AAA                                                            |
| Canvas `#F7F1ED` | Traffic Cone `#EF6F1A`     | 2.83:1 | Fails WCAG AA at all sizes — do not use.                                                            |
| Iron `#232F36`     | Traffic Cone `#EF6F1A`     | 4.54:1 | Passes AA. Use Iron for all text on Traffic Cone surfaces.                                              |
| Iron `#232F36`     | Hard Hat `#FEB11C` | 7.1:1  | Dark text on warning badge — passes AAA                                                             |
| Canvas `#F7F1ED` | Toolbox `#C8102E`  | 4.8:1  | White text on error state — passes AA                                                               |
| Canvas `#F7F1ED` | Bottle Glass `#33663D`   | 6.33:1 | White text on success state — passes AA                                                              |
| Canvas `#F7F1ED` | Iron `#232F36`     | 12.4:1 | White text on dark surfaces — passes AAA                                                            |
| Painter's Tape `#007CA6`   | Canvas `#F7F1ED` | 4.43:1  | Link text on background — fails WCAG AA (needs 4.5:1)                                                                 |
---
## Usage rules per token
### `--color-background` 📜 Canvas `#F7F1ED`
- Default background for all surfaces: website, app, documents, presentations.
- Never use pure white (`#FFFFFF`) as the global background — Canvas is the ground.
### `--color-surface` ⬜️ Plaster `#FFFFFF`
- Use for elevated cards, floating navigation, isolated panels, and popovers.
- Because drop shadows and borders are banned on these components, Plaster separates from Canvas purely through its stark brightness and typographic structure.
### `--color-foreground` ⬛️ Iron `#232F36`
- All body text, headings, labels, metadata.
- Used for structural UI elements: borders, dividers, nav strokes, focus rings.
- The single darkest tone in the system — do not introduce black (`#000000`).

### `--color-primary` 🟧 Traffic Cone `#EF6F1A`
- Primary CTA buttons, active nav states, key data callouts.
- One dominant use per layout section. Do not repeat as decoration.
- **Text on Traffic Cone:** Use Iron (`#232F36`) only (4.54:1, passes AA). Canvas on Traffic Cone fails at all sizes (2.83:1) and is not permitted.
- Do not use for links — that role belongs to Painter's Tape.
### `--color-warning` 🟨 Hard Hat `#FEB11C`
- Warning badges, alert banners, incomplete profile states.
- Text on Hard Hat should always be Iron (`#232F36`) — never white.
- Never pair with Toolbox or Bottle Glass on the same surface (colorblindness risk).
### `--color-error` 🟥 Toolbox `#C8102E`
- Destructive action confirmation, form validation errors, failed states.
- Text on Toolbox should always be Canvas (`#F7F1ED`).
- Should always be accompanied by an error label — never color alone.
### `--color-success` 🟩 Bottle Glass `#33663D`
- Confirmed actions, verified worker badges, completed profile states.
- Text on Bottle Glass should always be Canvas (`#F7F1ED`) — 6.33:1, passes AA. Iron on Bottle Glass fails (2.03:1) and is not permitted.
- Should always be accompanied by a success label — never color alone.
- The hex is Pantone's own screen value for 349 C, so the digital token and the spot ink are the same colour — no drift between a badge on screen and a badge in print.
### `--color-primary` as text (Traffic Cone highlight)
- Traffic Cone on Canvas: 2.83:1 — fails WCAG AA at all sizes. Not permitted for body text.
- **Exception:** Use as a display/hero text accent only (24px+), where the brand impact outweighs strict contrast. Never use for body copy, captions, or UI text.
- On Plaster: same ratio (2.83:1) — same restriction applies.
- On Iron: Canvas text (12.4:1) — passes AAA. Use Canvas for text on Traffic Cone backgrounds.
- **CSS class:** `.text-primary` — applies Traffic Cone color. Use on headings and display text only.

### `--color-link` 🟦 Painter's Tape `#007CA6`
- Text fill only. Underlined = link; not underlined = info (“Info,” “Note,” “Tip”).
- Never used as a button fill, background, or decorative element.
- **Exception — data visualization:** Approved as the supply-side data color on maps and charts (worker availability, labor supply). Paired with Traffic Cone as the demand-side color. This is the only context where Painter's Tape may be used as a data fill.
- If a non-Skillit dark surface is unavoidable: use Canvas underlined text instead.
---
## CSS custom properties (copy-paste ready)
```css
:root {
  --color-background: #F7F1ED;
  --color-surface: #FFFFFF;
  --color-foreground: #232F36;
  --color-primary: #EF6F1A;
  --color-warning: #FEB11C;
  --color-error: #C8102E;
  --color-success: #33663D;
  --color-link: #007CA6;

  --color-background-hover: var(--color-background-hover);
  --color-surface-hover: var(--color-surface-hover);
  --color-foreground-hover: var(--color-foreground-hover);
  --color-primary-hover: var(--color-primary-hover);
  --color-warning-hover: var(--color-warning-hover);
  --color-error-hover: var(--color-error-hover);
  --color-success-hover: var(--color-success-hover);
  --color-link-hover: var(--color-link-hover);
}
```
---
## What is not a color token
These colors exist in the project’s research history but are NOT active tokens. Do not use them:
| Color                    | Hex       | Why retired                                         |
| ------------------------ | --------- | --------------------------------------------------- |
| Signal Orange (old site) | `#FF5733` | Legacy — retired                    |
| Old brand orange         | `#FF6F31` | Legacy — retired                    |
| Previously proposed orange | `#F97316` | Considered but not selected                         |
| Copper (old primary)     | `#B34700` | Replaced by Traffic Cone — too muted for approved direction |
| Brick (old error)        | `#9C363D` | Replaced by Toolbox — approved `#C8102E`            |
| Ridgid                   | `#D64500` | Brand name retired                                  |
| Clay                     | `#B76E4A` | Fails contrast — dropped                            |
| Bottle Glass Green (old)       | `#4F6B4E` | Fails contrast — dropped; replaced by `#33663D`     |
| John Deere Green         | `#367C2B` | Former success value — retired 2026-08-23. Byte-identical to an actively enforced equipment mark; also the palette's thinnest contrast at 4.83:1. |
