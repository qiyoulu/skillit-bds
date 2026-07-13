# Color Tokens — Skillit BDS

**Last updated:** 2026-07-10

---

## Rules before you use this file

- Use ONLY the tokens listed here. Never approximate, mix, or invent colors.
- Every token has a designated UI role. Use each color only for its assigned role.
- Primary surfaces are Notebook + Graphite. Cord is the single accent — use it once per layout, not repeatedly.
- Never use color as the only status signal. Always pair with shape and label.
- All contrast ratios listed are against their intended text color. Do not pair colors outside their documented combinations.

---

## Core palette

| Token             | Name     | Hex       | CMYK           | Spot (Pantone) | UI Role                                            |
| ----------------- | -------- | --------- | -------------- | -------------- | -------------------------------------------------- |
| `--color-bg`      | Notebook | `#FAF7F3` | 2, 2, 4, 0     | Paper | Primary background — all surfaces default to this  |
| `--color-fg`      | Graphite     | `#232F36` | 80, 50, 45, 65 | 432 C          | All body text, headings, structural elements       |
| `--color-primary` | Cord     | `#EF6F1A` | 0, 65, 100, 0  | 158 C          | Primary CTA, active states, key accents            |
| `--color-warning` | Hard Hat | `#FEB11C` | 0, 30, 100, 0  | 1235 C         | Non-fatal alerts, warnings                         |
| `--color-error`   | Toolbox  | `#C8102E` | 2, 100, 85, 6  | 186 C          | Fatal errors, destructive actions                  |
| `--color-success` | Lumber   | `#367C2B` | 75, 15, 100, 10| 364 C          | Confirmations, success states                      |
| `--color-link`    | Cooler   | `#007CA6` | 100, 30, 10, 10| 3135 C         | Text links only — underlined, never used as a fill |

---

## Contrast ratios (WCAG AA minimum: 4.5:1 body, 3:1 UI)

| Foreground         | Background         | Ratio  | Use                                                                                                 |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| Graphite `#232F36`     | Notebook `#FAF7F3` | 12.4:1 | Body text — passes AAA                                                                              |
| Notebook `#FAF7F3` | Cord `#EF6F1A`     | 3.1:1  | White text on Cord button — passes AA for large text (≥18px) only. Use Graphite for small text on Cord. |
| Graphite `#232F36`     | Cord `#EF6F1A`     | 6.6:1  | Dark text on Cord — passes AAA. Preferred for body-size text.                                       |
| Graphite `#232F36`     | Hard Hat `#FEB11C` | 7.1:1  | Dark text on warning badge — passes AAA                                                             |
| Notebook `#FAF7F3` | Toolbox `#C8102E`  | 4.8:1  | White text on error state — passes AA                                                               |
| Notebook `#FAF7F3` | Lumber `#367C2B`   | 4.7:1  | White text on success state — passes AA                                                             |
| Notebook `#FAF7F3` | Graphite `#232F36`     | 12.4:1 | White text on dark surfaces — passes AAA                                                            |
| Cooler `#007CA6`   | Notebook `#FAF7F3` | 4.6:1  | Link text on background — passes AA                                                                 |

---

## Usage rules per token

### `--color-bg` Notebook `#FAF7F3`

- Default background for all surfaces: website, app, documents, presentations.
- Never use pure white (`#FFFFFF`) as the primary background — Notebook is the ground.
- Exception: internal padding or inset cards may use `#FFFFFF` as a lifted surface.

### `--color-fg` Graphite `#232F36`

- All body text, headings, labels, metadata.
- Used for structural UI elements: borders, dividers, nav strokes.
- The single darkest tone in the system — do not introduce black (`#000000`).

### `--color-primary` Cord `#EF6F1A`

- Primary CTA buttons, active nav states, key data callouts.
- One dominant use per layout. Do not repeat as decoration.
- **Text on Cord:** Use Graphite (`#232F36`) for body-size text (passes AAA at 6.6:1). Notebook is only acceptable at large text sizes (≥18px / ≥14px bold) where the 3.1:1 ratio meets AA for large text.
- Do not use for links — that role belongs to Cooler.

### `--color-warning` Hard Hat `#FEB11C`

- Warning badges, alert banners, incomplete profile states.
- Text on Hard Hat must always be Graphite (`#232F36`) — never white.
- Never pair with Toolbox or Lumber on the same surface (colorblindness risk).

### `--color-error` Toolbox `#C8102E`

- Destructive action confirmation, form validation errors, failed states.
- Text on Toolbox must always be Notebook (`#FAF7F3`).
- Must always be accompanied by an error label — never color alone.

### `--color-success` Lumber `#367C2B`

- Confirmed actions, verified worker badges, completed profile states.
- Text on Lumber must always be Notebook (`#FAF7F3`).
- Must always be accompanied by a success label — never color alone.

### `--color-link` Cooler `#007CA6`

- Text links only. Always underlined.
- Never used as a button fill, background, or decorative element.
- On dark (Graphite) backgrounds: use Notebook underlined text instead.

---

## CSS custom properties (copy-paste ready)

```css
:root {
  --color-bg: #faf7f3;
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
| Copper (old primary)     | `#B34700` | Replaced by Cord — too muted for approved direction |
| Brick (old error)        | `#9C363D` | Replaced by Toolbox — Laura approved `#C8102E`      |
| Ridgid                   | `#D64500` | Brand name retired                                  |
| Clay                     | `#B76E4A` | Fails contrast — dropped                            |
| Lumber Green (old)       | `#4F6B4E` | Fails contrast — dropped; replaced by `#367C2B`     |
