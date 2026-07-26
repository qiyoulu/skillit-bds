# Color Tokens — Skillit BDS
**Last updated:** 2026-07-10
---
## Rules before you use this file
- Use ONLY the tokens listed here. Never approximate, mix, or invent colors.
- Every token has a designated UI role. Use each color only for its assigned role.
- Primary surfaces are Canvas + Iron. Traffic Cone is the single accent — use it once per layout, not repeatedly.
- Never use color as the only status signal. Always pair with shape and label.
- All contrast ratios listed are against their intended text color. Do not pair colors outside their documented combinations.
---
## Core palette
| Token             | Name     | Hex       | CMYK           | Spot (Pantone) | UI Role                                            |
| ----------------- | -------- | --------- | -------------- | -------------- | -------------------------------------------------- |
| `--color-bg`      | Canvas | `#FAF7F3` | 2, 2, 4, 0     | Paper          | Primary background — all surfaces default to this  |
| `--color-surface` | Plaster  | `#FFFFFF` | 0, 0, 0, 0     | None           | Elevated surfaces, cards, and isolated form inputs |
| `--color-fg`      | Iron | `#232F36` | 80, 50, 45, 65 | 432 C          | All body text, headings, structural elements       |
| `--color-primary` | Traffic Cone     | `#EF6F1A` | 0, 65, 100, 0  | 158 C          | Primary CTA, active states, key accents            |
| `--color-warning` | Hard Hat | `#FEB11C` | 0, 30, 100, 0  | 1235 C         | Non-fatal alerts, warnings                         |
| `--color-error`   | Toolbox  | `#C8102E` | 2, 100, 85, 6  | 186 C          | Fatal errors, destructive actions                  |
| `--color-success` | Bottle Glass   | `#367C2B` | 75, 15, 100, 10| 364 C          | Confirmations, success states                      |
| `--color-link`    | Painter's Tape   | `#007CA6` | 100, 30, 10, 10| 3135 C         | Text links only — underlined, never used as a fill |
---
## Contrast ratios (WCAG AA minimum: 4.5:1 body, 3:1 UI)
| Foreground         | Background         | Ratio  | Use                                                                                                 |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| Iron `#232F36`     | Canvas `#FAF7F3` | 12.4:1 | Body text — passes AAA                                                                              |
| Iron `#232F36`     | Plaster `#FFFFFF`  | 13.0:1 | Body text on cards/surfaces — passes AAA                                                            |
| Canvas `#FAF7F3` | Traffic Cone `#EF6F1A`     | 2.83:1 | Fails WCAG AA at all sizes — do not use.                                                            |
| Iron `#232F36`     | Traffic Cone `#EF6F1A`     | 4.54:1 | Passes AA. Use Iron for all text on Traffic Cone surfaces.                                              |
| Iron `#232F36`     | Hard Hat `#FEB11C` | 7.1:1  | Dark text on warning badge — passes AAA                                                             |
| Canvas `#FAF7F3` | Toolbox `#C8102E`  | 4.8:1  | White text on error state — passes AA                                                               |
| Canvas `#FAF7F3` | Bottle Glass `#367C2B`   | 4.7:1  | White text on success state — passes AA                                                             |
| Canvas `#FAF7F3` | Iron `#232F36`     | 12.4:1 | White text on dark surfaces — passes AAA                                                            |
| Painter's Tape `#007CA6`   | Canvas `#FAF7F3` | 4.6:1  | Link text on background — passes AA                                                                 |
---
## Usage rules per token
### `--color-bg` Canvas `#FAF7F3`
- Default background for all surfaces: website, app, documents, presentations.
- Never use pure white (`#FFFFFF`) as the global background — Canvas is the ground.
### `--color-surface` Plaster `#FFFFFF`
- Use for elevated cards, floating navigation, isolated panels, and popovers.
- Because drop shadows and borders are banned on these components, Plaster separates from Canvas purely through its stark brightness and typographic structure.
### `--color-fg` Iron `#232F36`
- All body text, headings, labels, metadata.
- Used for structural UI elements: borders, dividers, nav strokes.
- The single darkest tone in the system — do not introduce black (`#000000`).
### `--color-primary` Traffic Cone `#EF6F1A`
- Primary CTA buttons, active nav states, key data callouts.
- One dominant use per layout. Do not repeat as decoration.
- **Text on Traffic Cone:** Use Iron (`#232F36`) only (4.54:1, passes AA). Canvas on Traffic Cone fails at all sizes (2.83:1) and is not permitted.
- Do not use for links — that role belongs to Painter's Tape.
### `--color-warning` Hard Hat `#FEB11C`
- Warning badges, alert banners, incomplete profile states.
- Text on Hard Hat must always be Iron (`#232F36`) — never white.
- Never pair with Toolbox or Bottle Glass on the same surface (colorblindness risk).
### `--color-error` Toolbox `#C8102E`
- Destructive action confirmation, form validation errors, failed states.
- Text on Toolbox must always be Canvas (`#FAF7F3`).
- Must always be accompanied by an error label — never color alone.
### `--color-success` Bottle Glass `#367C2B`
- Confirmed actions, verified worker badges, completed profile states.
- Text on Bottle Glass must always be Canvas (`#FAF7F3`).
- Must always be accompanied by a success label — never color alone.
### `--color-link` Painter's Tape `#007CA6`
- Text links only. Always underlined.
- Never used as a button fill, background, or decorative element.
- On dark (Iron) backgrounds: use Canvas underlined text instead.
---
## CSS custom properties (copy-paste ready)
```css
:root {
  --color-bg: #faf7f3;
  --color-surface: #ffffff;
  --color-fg: #232f36;
  --color-primary: #ef6f1a;
  --color-warning: #feb11c;
  --color-error: #c8102e;
  --color-success: #367c2b;
  --color-link: #007ca6;
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
| Brick (old error)        | `#9C363D` | Replaced by Toolbox — Laura approved `#C8102E`      |
| Ridgid                   | `#D64500` | Brand name retired                                  |
| Clay                     | `#B76E4A` | Fails contrast — dropped                            |
| Bottle Glass Green (old)       | `#4F6B4E` | Fails contrast — dropped; replaced by `#367C2B`     |
