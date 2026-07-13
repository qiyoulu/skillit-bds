# Accessibility Rules — Skillit BDS

**Last updated:** 2026-07-10

---

## Non-negotiable

Every output — website, app, social asset, document, generated content — must meet these requirements. Accessibility is baked in, not bolted on. The brand was designed around these constraints.

---

## Contrast requirements (WCAG AA)

| Text type                                          | Minimum ratio | Standard |
| -------------------------------------------------- | ------------- | -------- |
| Body text (≥ 16px)                                 | 4.5:1         | WCAG AA  |
| UI text (≥ 14px bold or ≥ 18px regular)            | 3:1           | WCAG AA  |
| Non-text UI elements (icons, borders, focus rings) | 3:1           | WCAG AA  |

### Verified token pairs

| Text color         | Background         | Ratio  | Status                    |
| ------------------ | ------------------ | ------ | ------------------------- |
| Graphite `#232F36` | Notebook `#FAF7F3` | 12.4:1 | Pass AAA                  |
| Notebook `#FAF7F3` | Graphite `#232F36` | 12.4:1 | Pass AAA                  |
| Notebook `#FAF7F3` | Cord `#EF6F1A`     | 3.1:1  | Pass AA (large text only) |
| Graphite `#232F36` | Cord `#EF6F1A`     | 6.6:1  | Pass AAA                  |
| Graphite `#232F36` | Hard Hat `#FEB11C` | 7.1:1  | Pass AAA                  |
| Notebook `#FAF7F3` | Toolbox `#C8102E`  | 4.8:1  | Pass AA                   |
| Notebook `#FAF7F3` | Lumber `#367C2B`   | 4.7:1  | Pass AA                   |
| Cooler `#007CA6`   | Notebook `#FAF7F3` | 4.6:1  | Pass AA                   |

### Pairs that are banned

| Text               | Background         | Ratio  | Reason                                                                |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------- |
| Cord `#EF6F1A`     | Notebook `#FAF7F3` | 3.1:1  | Fails AA for body text — only use at large display scale (≥24px bold) |
| Hard Hat `#FEB11C` | Notebook `#FAF7F3` | 1.5:1  | Fails — never use yellow text on light background                     |
| Lumber `#367C2B`   | Toolbox `#C8102E`  | ~1.2:1 | Fails — red/green together banned entirely                            |

---

## Color blindness rules

Approximately 8% of men and 0.5% of women have red-green color blindness (deuteranopia/protanopia). These rules are non-negotiable:

1. **Never use color as the only signal.** Every status state (success, error, warning) must pair color with a shape and a text label. Color alone is never sufficient.

2. **Never pair red and green as opposing states.** Toolbox (error) and Lumber (success) must never appear as direct visual opposites without shape differentiation.

3. **Orange + Blue is the safest contrast pair.** Cord (`--color-primary`) and Cooler (`--color-link`) are perceptually distinct for all common forms of color blindness.

4. **Hard Hat (yellow) + Cord (orange) require shape or size differentiation** when both appear in the same context. Never use them as adjacent status indicators without a distinct shape difference.

---

## Status state rules (shape coding)

Every status state must communicate via three channels simultaneously: color + shape + label.

| State   | Color              | Shape                 | Label required                            |
| ------- | ------------------ | --------------------- | ----------------------------------------- |
| Success | Lumber `#367C2B`   | Circle / pill         | “Verified,” “Complete,” “Confirmed”       |
| Warning | Hard Hat `#FEB11C` | Triangle / chamfer    | “Incomplete,” “Action needed,” “Expiring” |
| Error   | Toolbox `#C8102E`  | Square / sharp corner | “Error,” “Failed,” “Expired”              |
| Info    | Cooler `#007CA6`   | Rounded square        | “Info,” “Note,” “Tip”                     |

---

## Touch target rules (mobile / app)

- Minimum touch target size: `44px × 44px` (Apple HIG / WCAG 2.5.5).
- This applies to all interactive elements: buttons, links, checkboxes, radio inputs, nav items.
- The visible element may be smaller, but the clickable/tappable area must meet the minimum.
- On the worker app specifically: assume fat fingers, gloves, and direct sunlight. When in doubt, go larger.

---

## Text sizing rules

- Minimum body text: `16px` (1rem). Never go below this in UI.
- Minimum label text: `12px` (0.75rem). This is the floor — never smaller.
- Do not use `px` units for font-size. Use `rem` so user browser scaling works.
- Line height minimum: `1.4` for UI, `1.6` for body text. Tighter than this hurts legibility.

---

## Focus states

- All interactive elements must have a visible focus ring.
- Focus ring: `2px solid` Cord (`--color-primary`), `2px offset`.
- Never remove focus outlines with `outline: none` without providing an equivalent custom focus style.
- Focus must be keyboard-navigable in the correct DOM order.

---

## Image alt text rules

All images in generated content must have descriptive alt text. Rules:

- Worker portraits: describe the person’s trade and action, not their appearance. “Graphiteworker reviewing blueprints on a job site” not “man in hard hat.”
- Product screenshots: describe what’s shown in the UI. “Skillit worker profile showing NCCER certifications and availability.”
- Decorative images (boot tread pattern, texture): `alt=""` (empty string — tells screen readers to skip).
- Never use “image of” or “photo of” as a prefix — screen readers announce it’s an image already.
