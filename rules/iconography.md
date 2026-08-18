# Iconography Rules — Skillit BDS
**Last updated:** 2026-07-15
---
## 1. Core Principles
- **Utilitarian & Honest:** Icons should be instantly recognizable and strictly utilitarian. No decorative embellishments, unnecessary gradients, or clever visual puns. They are tools, not art.
- **Solid Fill Only:** To remain visually consistent with the heavy, block-like geometry of the Skillit mark and pattern, all icons should be solid, filled shapes. Line icons and strokes are strictly banned.
- **Worker-First Legibility:** Icons should be legible on high-glare screens in bright sunlight on a job site. Solid fills perform significantly better for optical recognition at small sizes than thin lines.
## 2. Geometry & Grid
- **Base Canvas:** 24x24px.
- **The 10x10 Sub-grid:** To maintain blocky structural DNA while perfectly centering on an even canvas, icons should be drawn on a 10x10 sub-grid where **1 block = 2x2px**. Vertices should snap to multiples of 2 **where possible**; full-bleed to the 24px edge and half-block (1px) offsets are permitted where the shape needs them (see the arrow set — all current icons follow this relaxed rule).
- **Live Area:** Leave a 1-block (2px) padding around the edges where the shape allows. The maximum live drawing area is 10x10 blocks (20x20px); arrows full-bleed to the edge for optical weight.
- **Shapes:** Solid, filled vector shapes (`fill="currentColor"`). No strokes.
- **Angles & Curves:** Restricted to 90-degree and 45-degree angles. **No bezier curves.** The only curves permitted in the entire set are consistently perfect full circles or half-circles.
- **Clearance:** Minimum internal padding of 2px (1 block) to maintain the heavy aesthetic.
## 3. Status Icons & Accessibility
To comply with the brand's strict accessibility rules (never relying on color alone) and to mimic physical job-site signage, status icons are permanently locked to specific geometric silhouettes. The icon graphic is punched out of the solid shape:
- **Success (Bottle Glass / Green):** Solid **Circle** (Proceed / Safe)
- **Warning (Hard Hat / Yellow):** Solid **Triangle** (Hazard / Yield)
- **Error (Toolbox / Red):** Solid **Octagon** (Critical / Stop)
## 4. Approved Core Inventory
The following 12 icons constitute the core structural set. Do not invent new metaphors for these actions.
1. `menu.svg` (Sandwich/hamburger for mobile nav)
2. `close.svg` (X for dismissing)
3. `search.svg` (Magnifying glass)
4. `user.svg` (Worker profile)
5. `location.svg` (Job site/map pin)
6. `clock.svg` (Time/schedule)
7. `checkmark.svg` (Circle with punched checkmark)
8. `error.svg` (Octagon with punched X)
9. `warning.svg` (Triangle with punched exclamation)
10. `arrow-right.svg` (Directional flow)
11. `arrow-left.svg` (Back/return)
12. `chevron-down.svg` (Dropdown/expand)

`arrow-up.svg` and `arrow-down.svg` are rotations of `arrow-right.svg` — derived variants, not separate core icons (listed as Complete in `components/ui.md`; Figma exports can replace them later).
## 4. Implementation Rules
- **Coloring:** Icons inherit their color from the parent text element (`fill="currentColor"`), allowing them to automatically adapt to their UI context (Iron on Canvas, Canvas on Traffic Cone, etc.).
- **Inline SVGs:** To unlock the power of `currentColor`, icons should be inlined directly into the HTML (or handled via modern component frameworks) rather than loaded as static `<img>` tags.
