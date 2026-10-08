# Iconography Rules — Skillit Kit BDS
**Last updated:** 2026-10-08
---
## 1. Core Principles
- **Utilitarian & Honest:** Icons should be instantly recognizable and strictly utilitarian. No decorative embellishments, unnecessary gradients, or clever visual puns. They are tools, not art.
- **Solid Fill Only:** To remain visually consistent with the heavy, block-like geometry of the Skillit mark and pattern, all icons should be solid, filled shapes. Line icons and strokes are strictly banned.
- **Worker-First Legibility:** Icons should be legible on high-glare screens in bright sunlight on a job site. Solid fills perform significantly better for optical recognition at small sizes than thin lines.
## 2. Geometry & Grid
- **Base Canvas:** 24x24px.
- **The 10x10 Sub-grid:** To maintain blocky structural DNA while perfectly centering on an even canvas, icons should be drawn on a 10x10 sub-grid where **1 block = 2x2px**. Vertices should snap to multiples of 2 **where possible**; full-bleed to the 24px edge and half-block (1px) offsets are permitted where the shape needs them (see the arrow set — all current icons follow this relaxed rule).
- **Shapes:** Solid, filled vector shapes (`fill="currentColor"`). No strokes.
- **Geometric Construction:** All icons must be built exclusively from circles, rectangles, and triangles and their derivatives — full circles, arcs, semicircles, ring segments, rectangles, right triangles, and straight lines. No bezier curves, no freehand paths, no organic shapes. Every shape must be derivable from these three primitives. This ensures icons remain crisp at any size and consistent with the blocky, industrial brand aesthetic.
- **Clearance:** Minimum internal padding of 2px (1 block) to maintain the heavy aesthetic.
## 3. Status Icons & Accessibility
Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone. Outer shape supports familiar conventions; it does not denote an information type.
- **Success:** Bottle Glass green with a recognizable check and success label.
- **Warning:** Hard Hat yellow with an exclamation and warning label.
- **Error:** Toolbox red with a cross and error label.
- **Info:** Painter’s Tape blue with a clear information label; a circled “i” is conventional. A “?” denotes help, not information. Use approved assets; do not invent a replacement asset from this description.
## 4. Approved Core Inventory
The following icons constitute the core structural subset; the complete current inventory is the SVG files in `assets/icons/`. Do not invent new metaphors for these actions.
1. `bars-3.svg` (Sandwich/hamburger for mobile nav)
2. `x-mark.svg` (X for dismissing)
3. `magnifying-glass.svg` (Magnifying glass)
4. `user.svg` (Worker profile)
5. `map-pin.svg` (Job site/map pin)
6. `clock.svg` (Time/schedule)
7. `check-circle.svg` (Green circle with opaque white check)
8. `x-octagon.svg` (Red octagon with opaque white X)
9. `exclamation-triangle.svg` (Yellow triangle with opaque white exclamation)
10. `arrow-right.svg` (Directional flow)
11. `arrow-left.svg` (Back/return)
12. `chevron-down.svg` (Dropdown/expand)

`arrow-up.svg` and `arrow-down.svg` are delivered directional exports. Dedicated `plus.svg` / `plus-circle.svg`, `information-circle.svg` / `information-square.svg`, and `question-mark-circle.svg` are also supplied. See the [complete 90-asset inventory](../components/icons.md#complete-imported-inventory) and [media/control rendering contract](../components/icons.md#tinting-and-status). Preserve fresh exported geometry, not older knockout or translucent-layer assumptions. Asset IDs do not replace semantic component status labels.

### Secondary brand marks
Platform marks in `assets/icons/` (`facebook.svg`, `instagram.svg`, `linkedin.svg`, `x.svg`, `whatsapp.svg`, and `youtube.svg`) are approved social marks, not core interface icons. Their external brand geometry is authoritative and is exempt from the Skillit 10×10 grid and no-bezier construction rules. They must still use `fill="currentColor"` and must not be altered.
## 5. Naming and consumer migration
- Name visible forms, not semantic outcomes; use Heroicons vocabulary only where the glyph corresponds. Keep custom descriptive names for Skillit-only artwork and control-state variants.
- `share.svg` is the three-node share symbol; `arrow-up-on-square.svg` is the separate upward-arrow/square glyph.
- Asset names and semantic status props are independent. Matching Heroicons names do not switch Rails helpers to Skillit artwork.
- Follow the [previous-to-current ID mapping](../components/icons.md#previous-ids--current-ids), including the reused `phone` and `user-circle` names. Migrate consumer paths, assets, resolver IDs, and tests together; do not silently reskin or deploy another repository.

## Legacy archive
The [legacy icon archive](../assets/icons/legacy/README.md) is deprecated, frozen artwork for explicit old-version consumers, not part of the 90-icon canonical set. Preserve its original bytes and names; do not normalize, recolor, or redraw it. Its manifest records current migration targets, including reused `phone` and `user-circle` IDs. Callers must change their base path or resolver to select it; there are no root-path redirects.

## 4. Implementation Rules
- **Coloring:** Single-color icons inherit their color from the parent text element (`fill="currentColor"`), allowing them to automatically adapt to their UI context (Iron on Canvas, Iron on Traffic Cone, etc.).
- **Status paint:** Explicit host classes set success to `--color-success`, warning to `--color-warning`, error to `--color-error`, and info to `--color-link`. Keep supplied geometry and a text label; normalize eligible single-color utilities only. Approved status exports retain semantic ground paint and white glyph layers. External images preserve those source colors but do not inherit host color; runtime recoloring requires inline per-layer canonical-token styling, not a combined alpha mask. Do not change exported artwork. Neutral utility icons and general match indicators use Iron unless an explicit semantic outcome applies. Interactive checkbox, radio, and chip selection indicators use Traffic Cone (`--color-primary`); progress stays Iron. All toast panels are Plaster with Iron messages and close controls. Hard Hat on Plaster is below 3:1 for an essential warning glyph; retain the label, assess essentialness, and never claim a contrast pass (`rules/accessibility.md`).
- **Multicolor exports:** Preserve contrasting opaque layers in media, radio, checkbox, and switch artwork. Inline them for independent layer control; a combined CSS mask flattens them. Switch-on retains a Bottle Glass thumb on Plaster, distinct from Orange checkbox/radio/chip selection. Raw exports may still need the approved single-color normalization workflow; never apply it indiscriminately to multicolor layers. See `components/icons.md`.
- **Inline SVGs:** To unlock the power of `currentColor`, icons should be inlined directly into the HTML (or handled via modern component frameworks) rather than loaded as static `<img>` tags.
