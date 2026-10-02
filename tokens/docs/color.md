# Color Tokens — Skillit Kit BDS
**Last updated:** 2026-10-01
**Canonical source:** `tokens/tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- Use ONLY the tokens listed here. Never approximate or invent colors. Use canonical `color-mix()` hover expressions and documented functional opacity treatments (data marks, pending-progress track, backdrops, disabled controls); do not invent derived palette tokens.
- Every token has designated message, control, and data roles. Scope meanings to the use: UI semantics do not ban purposeful chart categories.
- Primary surfaces are Canvas and Plaster; Iron is the foreground. Traffic Cone is the dominant CTA/focal-data accent — one dominant use per section, not repeated decoration. Repeated checkbox, radio, and selection-chip indicator paint and focus rings are explicitly permitted functional exceptions.
- **Accent/status roles:** meaningful message text, appropriate functional control fills, existing success/error/warning feedback fills, and purposeful canonical data colors. Noninteractive status icon fills and completed progress use Iron; all checkbox, radio, and selection-chip control paint uses Traffic Cone, not Bottle Glass. Unselected radio/chip outlines and selected fills are orange; chip pills remain Plaster with Iron text. The contrasting inner check glyph uses Iron (4.5443:1 on Cone), not Canvas (2.6958:1). Orange focus rings are functional exceptions. Charts may use Cone alongside Painter’s Tape and other canonical colors with legends or direct labels and non-color cues; monochromatic is a default, not exclusive. These are not decorative or full-section backgrounds. Canvas and Plaster remain layout surfaces; Iron is permitted only as a functional modal backdrop or photographic text-legibility overlay, not a layout surface.
- **Structural borders are Iron.** Input validation state stays in icons/text, not colored field borders. The documented Traffic Cone checkbox, radio, and selection-chip indicator strokes/fills are selection exceptions, not structural border tokens.
- **Focus rings:** default 2px solid Traffic Cone (`--color-primary`) with 2px offset. Cone on Canvas is 2.6958:1, below the 3:1 UI/focus floor; Cone on Plaster is 3.0177:1 and meets that floor. Keep orange as requested; do not claim AA on Canvas or quietly substitute Iron. Check actual adjacent surfaces, clipping, keyboard visibility, and rendered native controls; preserve native focus in forced-colors mode. Flag unresolved contrast for review. See [accessibility](../../rules/accessibility.md).
- **Painter's Tape (blue):** text without underline = **info**; text with underline = **link**. Never a decorative or ordinary control fill; purposeful chart categories, including supply-side data, are data-fill exceptions. Informational toasts use Plaster with Iron text and an Iron help icon.
- **Info text size floor:** Painter's Tape on Canvas is 4.2312:1 — fails WCAG AA for normal text (needs 4.5:1). Keep info/link text at `--text-1x` (16px) or larger regardless, and prefer Iron for any text where AA compliance is required; treat Painter's Tape on Canvas as a soft exception pending a color review.
- Never use color as the only status signal. Always pair with shape and label.
- Contrast depends on the actual foreground, background, and use. Verify text and graphical contrast on rendered surfaces; a passing text pairing does not establish icon or focus contrast. Existing semantic message text and success/error/warning backgrounds remain unchanged; review Iron status icons on those fills without automatically changing the backgrounds.
---
## Core palette
| Token             | Name     | Hex       | CMYK (provisional, unprofiled) | Spot (Coated / Uncoated) | UI Role                                            |
| ----------------- | -------- | --------- | -------------- | -------------- | -------------------------------------------------- |
|| `--color-background`      | 📜 Canvas | `#F7F1ED` | 2, 3, 4, 0     | Paper — not an ink | Primary background — all surfaces default to this  |
| `--color-surface` | ⬜️ Plaster  | `#FFFFFF` | 0, 0, 0, 0      | Paper — unprinted stock | Elevated surfaces, cards, and isolated form inputs |
| `--color-foreground`      | ⬛️ Iron | `#232F36` | 80, 50, 45, 65 | 432 C / 432 U  | Foreground, noninteractive status icons, completed progress |
| `--color-primary` | 🟧 Traffic Cone     | `#EF6F1A` | 0, 65, 100, 0  | 158 C / 158 U  | Primary action, selection indicators, focus, purposeful data |
| `--color-warning` | 🟨 Hard Hat | `#FEB11C` | 0, 30, 100, 0  | 1235 C / 1235 U | Non-fatal alerts, warnings                         |
| `--color-error`   | 🟥 Toolbox  | `#C8102E` | 2, 100, 85, 6  | 186 C / 186 U  | Fatal errors, destructive actions                  |
| `--color-success` | 🟩 Bottle Glass   | `#33663D` | 50, 0, 40, 60  | 2427 C / 2427 U | Success messages, appropriate controls and data; not icon/progress fills |
| `--color-link`    | 🟦 Painter's Tape   | `#007CA6` | 100, 30, 10, 10| 3135 C / 3135 U | Links, info text, purposeful data |

**Print status:** This is the single process-color reference table. Existing CMYK numbers are provisional and unprofiled, not approved RGB-to-CMYK conversions or press-ready recipes. Canvas process values conflict with an older instruction table; neither recipe is resolved by `tokens/tokens.json5`. Do not select a paper/process recipe from those percentages. Confirm stock, output ICC profile, and printer conversion, then approve physical proofs on the actual stock before production. Canvas/Plaster may be represented by the paper itself; do not infer that their screen hex values mandate an ink coverage.

## Hover states

Hover colors are generated with `color-mix(in oklab, base, black 10%)` — mixing 10% black in OKLab, not reducing relative luminance by exactly 10%. Hover values live in `tokens/tokens.json5` as `color-mix()` expressions; do not recompute hex.

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

**On spot references.** Coated and uncoated are the same ink on different paper — the number is shared, the appearance is not. Uncoated stock absorbs ink, so every colour returns lighter, duller, and slightly greyed. These pairs are the correct references to hand a printer, but they are not a guarantee of matched appearance across stocks. **Proof on the actual stock before production.** Traffic Cone is the one to watch: saturated orange dulls hardest on uncoated, and if 158 U proofs too flat, the fix is a deliberately hotter ink for uncoated applications, not a change to the digital token. Spot inks matter only where you are printing spot — business cards, signage, vehicle wrap, embroidery. For process printing, treat the table above as provisional reference only; obtain a profile-specific conversion and proof before production.
---
## Contrast ratios (WCAG AA minimum: 4.5:1 normal text, 3:1 large text and non-text UI)
| Foreground         | Background         | Ratio  | Use                                                                                                 |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| Iron `#232F36` | Canvas `#F7F1ED` | 12.2506:1 | Body text — passes AAA                                                                              |
| Iron `#232F36`     | Plaster `#FFFFFF`  | 13.7135:1 | Body text on cards/surfaces — passes AAA                                                            |
| Canvas `#F7F1ED` | Traffic Cone `#EF6F1A`     | 2.6958:1 | Fails WCAG AA at all sizes — do not use.                                                            |
| Iron `#232F36`     | Traffic Cone `#EF6F1A`     | 4.5443:1 | Passes AA. Use Iron for all text on Traffic Cone surfaces.                                              |
| Iron `#232F36`     | Hard Hat `#FEB11C` | 7.5227:1  | Dark text on warning badge — passes AAA                                                             |
| Canvas `#F7F1ED` | Toolbox `#C8102E`  | 5.2557:1  | White text on error state — passes AA                                                               |
| Canvas `#F7F1ED` | Bottle Glass `#33663D`   | 6.0346:1 | White text on success state — passes AA                                                              |
| Canvas `#F7F1ED` | Iron `#232F36`     | 12.2506:1 | Canvas text on permitted functional Iron backdrops/overlays — passes AAA                                                            |
| Painter's Tape `#007CA6`   | Canvas `#F7F1ED` | 4.2312:1  | Link text on background — fails WCAG AA (needs 4.5:1)                                                                 |
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
- Used for structural UI elements: borders, dividers, nav strokes; all noninteractive status icon fills and completed-progress fills. Focus rings use Traffic Cone; see the contrast limitation above.
- The single darkest tone in the system — do not introduce black (`#000000`).

### `--color-primary` 🟧 Traffic Cone `#EF6F1A`
- Primary CTA buttons, all checkbox/radio/selection-chip indicator paint, focus rings, and display/key-data highlights or purposeful chart categories. Normal-size active nav text stays Iron with weight/underline/`aria-current`, not Traffic Cone.
- One dominant CTA or focal highlight per layout section. Repeated selection indicators and focus rings are functional exceptions; chart categories follow their communication purpose rather than a mark count. Do not repeat as decoration.
- **Text on Traffic Cone:** Use Iron (`#232F36`) only (4.5443:1, passes AA). Canvas on Traffic Cone fails at all sizes (2.6958:1) and is not permitted.
- Do not use for links — that role belongs to Painter's Tape.
### `--color-warning` 🟨 Hard Hat `#FEB11C`
- Warning message text, labels, appropriate functional warning controls, existing warning feedback backgrounds, and purposeful data; warning icon fills remain Iron with triangle + label.
- Text on Hard Hat should always be Iron (`#232F36`) — never white.
- Never rely on Hard Hat versus Toolbox or Bottle Glass alone to distinguish meanings; categorical data needs legends or direct labels and non-color cues.
### `--color-error` 🟥 Toolbox `#C8102E`
- Error message text, destructive actions, form validation errors, failed-state messages, existing error feedback backgrounds, and purposeful data. Noninteractive error icons remain Iron with octagon + label; Iron on Toolbox is 2.3309:1, below the 3:1 non-text UI floor. Flag the contrast concern without automatically changing message text or backgrounds.
- Text on Toolbox should always be Canvas (`#F7F1ED`).
- Should always be accompanied by an error label — never color alone.
### `--color-success` 🟩 Bottle Glass `#33663D`
- Success message text, confirmations, appropriate success controls, existing success feedback backgrounds, and purposeful data. Canonical success green remains reserved for these meanings; noninteractive status icon fills and completed-progress fills use Iron, while checkbox/radio/selection-chip indicators use Traffic Cone. Classify the underlying control as an action even when its indicator displays selection state.
- Text on Bottle Glass remains Canvas (`#F7F1ED`) — 6.0346:1, passes AA. Iron on Bottle Glass is 2.0300:1, below the 3:1 non-text UI floor; the requested Iron status icon treatment therefore needs contrast review on existing green fills. Do not automatically change semantic message text, backgrounds, or icon color to hide the conflict.
- Should always be accompanied by a success label — never color alone.
- The approved spot references are 2427 C / 2427 U. Screen and printed color are not interchangeable; proof the actual stock.
### `--color-primary` as text (Traffic Cone highlight)
- Traffic Cone on Canvas: 2.6958:1 — fails WCAG AA at all sizes. Not permitted for body text.
- **Exception:** Use as a display/hero text accent only (24px+), as an existing brand exception, not a WCAG pass (Canvas pairing remains 2.6958:1 even at display size). Never use for body copy, captions, or UI text.
- On Plaster: 3.0177:1 — passes AA only for large text (18pt regular / 14pt bold); keep the documented display-only restriction.
- On permitted functional Iron backdrops: Traffic Cone text is 4.5443:1 (AA). This does not permit Iron layout surfaces. All text on Traffic Cone buttons remains Iron.
- **CSS class:** `.text-primary` — applies Traffic Cone color. Use on headings and display text only.

### `--color-link` 🟦 Painter's Tape `#007CA6`
- Ordinary link/info usage is text fill: underlined = link; not underlined = info (“Info,” “Note,” “Tip”). Explicit feedback/data exceptions below do not change that default.
- Never used as an ordinary button fill, layout background, or decorative element. Informational feedback toasts use Plaster with Iron text; their help icon uses Iron ([toasts](../../components/toast.md)), never a blue normal-text toast fill.
- **Exception — data visualization:** Painter’s Tape may appear alongside Traffic Cone and other canonical palette colors for purposeful categories with legends or direct labels and non-color cues, not color alone. Supply/demand maps and charts retain Tape for worker availability or labor supply and Cone for job openings. Verify text and graphical contrast on the actual surface; UI message roles do not create a data-palette ban.
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

  --color-background-hover: color-mix(in oklab, var(--color-background), black 10%);
  --color-surface-hover: color-mix(in oklab, var(--color-surface), black 10%);
  --color-foreground-hover: color-mix(in oklab, var(--color-foreground), black 10%);
  --color-primary-hover: color-mix(in oklab, var(--color-primary), black 10%);
  --color-warning-hover: color-mix(in oklab, var(--color-warning), black 10%);
  --color-error-hover: color-mix(in oklab, var(--color-error), black 10%);
  --color-success-hover: color-mix(in oklab, var(--color-success), black 10%);
  --color-link-hover: color-mix(in oklab, var(--color-link), black 10%);
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
| John Deere Green         | `#367C2B` | Former success value — retired 2026-08-23. Byte-identical to an actively enforced equipment mark; also the palette's thinnest contrast at 4.6039:1. |
