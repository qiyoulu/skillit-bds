# Accessibility Rules — Skillit BDS
**Last updated:** 2026-08-17
---
## Non-negotiable
Every output — website, app, social asset, document, generated content — should meet these requirements. Accessibility is baked in, not bolted on. The brand was designed around these constraints.
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
| Iron `#232F36` | Canvas `#FAF7F3` | 12.4:1 | Pass AAA                  |
| Iron `#232F36` | Plaster `#FFFFFF`  | 13.0:1 | Pass AAA                  |
| Canvas `#FAF7F3` | Iron `#232F36` | 12.4:1 | Pass AAA                  |
| Canvas `#FAF7F3` | Traffic Cone `#EF6F1A`     | 2.83:1 | Fail — not permitted at any size          |
| Iron `#232F36` | Traffic Cone `#EF6F1A`     | 4.54:1 | Pass AA                                   |
| Iron `#232F36` | Hard Hat `#FEB11C` | 7.1:1  | Pass AAA                  |
| Canvas `#FAF7F3` | Toolbox `#C8102E`  | 4.8:1  | Pass AA                   |
| Canvas `#FAF7F3` | Bottle Glass `#367C2B`   | 4.7:1  | Pass AA                   |
| Painter's Tape `#007CA6`   | Canvas `#FAF7F3` | 4.6:1  | Pass AA                   |
### Pairs that are banned
| Text               | Background         | Ratio  | Reason                                                                |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------- |
| Traffic Cone `#EF6F1A`     | Canvas `#FAF7F3` | 2.83:1 | Fails AA — never use Traffic Cone as text on Canvas                         |
| Canvas `#FAF7F3` | Traffic Cone `#EF6F1A`     | 2.83:1 | Fails AA — never use Canvas text on Traffic Cone                            |
| Hard Hat `#FEB11C` | Canvas `#FAF7F3` | 1.5:1  | Fails — never use yellow text on light background                     |
| Bottle Glass `#367C2B`   | Toolbox `#C8102E`  | ~1.2:1 | Fails — red/green together banned entirely                            |
---
## Color blindness rules
Approximately 8% of men and 0.5% of women have red-green color blindness (deuteranopia/protanopia). These rules are non-negotiable:
1. **Never use color as the only signal.** Every status state (success, error, warning) should pair color with a shape and a text label. Color alone is never sufficient.
2. **Never pair red and green as opposing states.** Toolbox (error) and Bottle Glass (success) should never appear as direct visual opposites without shape differentiation.
3. **Orange + Blue is the safest contrast pair.** Traffic Cone (`--color-primary`) and Painter's Tape (`--color-link`) are perceptually distinct for all common forms of color blindness.
4. **Hard Hat (yellow) + Traffic Cone (orange) require shape or size differentiation** when both appear in the same context. Never use them as adjacent status indicators without a distinct shape difference.
---
## Status state rules (shape coding)
Every status state should communicate via three channels simultaneously: color + shape + label.
| State   | Color              | Shape                 | Label required                            |
| ------- | ------------------ | --------------------- | ----------------------------------------- |
| Success | Bottle Glass `#367C2B`   | Circle / pill         | “Verified,” “Complete,” “Confirmed”       |
| Warning | Hard Hat `#FEB11C` | Triangle / chamfer    | “Incomplete,” “Action needed,” “Expiring” |
| Error   | Toolbox `#C8102E`  | Octagon            | “Error,” “Failed,” “Expired”              |
| Info    | Painter's Tape `#007CA6` | Square             | “Info,” “Note,” “Tip”                     |
---
## Touch target rules (mobile / app)
- Minimum touch target size: `44px × 44px` (Apple HIG / WCAG 2.5.5).
- This applies to all interactive elements: buttons, links, checkboxes, radio inputs, nav items.
- The visible element may be smaller, but the clickable/tappable area should meet the minimum.
- On the worker app specifically: assume fat fingers, gloves, and direct sunlight. When in doubt, go larger.
---
## Text sizing rules
- Minimum body text: `16px` (1rem). Never go below this in UI.
- Minimum label text: `12px` (0.75rem). This is the floor — never smaller.
- Do not use `px` units for font-size. Use `rem` so user browser scaling works.
- Line height minimum: `1.4` for UI, `1.6` for body text. Tighter than this hurts legibility.
---
## Focus states
- All interactive elements should have a visible focus ring.
- Focus ring: `2px solid` Iron (`--color-fg`), `2px offset`. Focus rings are always Iron — never a status/accent color (see `tokens/color.md`).
- Never remove focus outlines with `outline: none` without providing an equivalent custom focus style.
- Focus should be keyboard-navigable in the correct DOM order.
- **Skip-to-content link** at the top of every page (visually hidden until focused) so keyboard users bypass repeated navigation.
- **Never trap focus in a modal.** On open, focus moves to the modal; on close, it returns to the element that opened it.
- **Hover is not a state on touch.** Every hover interaction needs a tap equivalent. Icons that function as buttons need a text alternative (`aria-label`).
---
## Motion rules
- Respect `prefers-reduced-motion`. If the user requests reduced motion, their setting wins — no exceptions for "but it's subtle."
- Nothing flashes more than 3 times per second (seizure safety, WCAG 2.3.1).
- Animations ≤ 5 seconds or user-controlled. No infinite loops without a stop mechanism.
- Auto-playing or auto-moving content (carousels, ticker tapes) gets visible pause/stop controls.
- If an animation carries meaning, that meaning must survive with motion disabled.
---
## Reflow / zoom
- Layout must be usable at 200% zoom with no horizontal scrolling (WCAG 1.4.10). Text reflows; the grid collapses rather than clips.
- Test every layout at 200% zoom before shipping.
---
## Image alt text rules
All images in generated content should have descriptive alt text. Rules:
- Worker portraits: describe the person’s trade and action, not their appearance. “Graphiteworker reviewing blueprints on a job site” not “man in hard hat.”
- Product screenshots: describe what’s shown in the UI. “Skillit worker profile showing NCCER certifications and availability.”
- Decorative images (boot tread pattern, texture): `alt=""` (empty string — tells screen readers to skip).
- Never use “image of” or “photo of” as a prefix — screen readers announce it’s an image already.
