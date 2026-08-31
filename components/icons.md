# Icons — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- ALL CAPS on all labels, buttons, and UI text. No sentence case, no Title Case.
- Tactile padding rule: buttons use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

## Geometry
Icons are drawn on a strict **10×10 sub-grid** (1 block = 2px) inside a **24×24px canvas**. This grid solves consistent centering (the 2px block unit divides the 24px canvas evenly) and enforces the heavy, cast-iron aesthetic.
- **Canvas size:** 24×24px
- **Sub-grid:** 10×10 (1 block = 2px)
- **Style:** Solid fill only. No strokes, no outlines, no line icons.
- **Stroke weight:** N/A — solid fill, not stroked.
- **Corner radius:** 0px — sharp edges on all icon geometry, consistent with the structural container rule.
- **Color:** Always `fill="currentColor"`. Never hardcode a fill color in the SVG.

## Do not
- Do not use stroke-based (outline) icons — they conflict with the solid, material aesthetic.
- Do not round icon corners — 0px is mandatory.
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
Icons are delivered as inline SVGs in Rails ViewComponents (`app/components/`) so they inherit `currentColor` dynamically via CSS. For Squarespace, export as standalone SVG files.

## Core icon set (Phase I)
| Icon | Status |
|---|---|
| Checkmark | Complete (`checkmark.svg`) |
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
