# Logo Tokens — Skillit BDS
**Last updated:** 2026-08-17
**Canonical source:** `tokens.json5` (machine-readable) for dimension tokens; the SVGs in `assets/logo/` are the fixed graphic assets.
---
## Rules before you use this file
- Always use the approved SVG files. Never recreate the mark or wordmark from scratch.
- The mark and wordmark are fixed graphic assets — do not retype, redraw, or approximate them.
- Every rule below is non-negotiable. No exceptions for "just this once" placements.
---
## The mark
The mark is the brand's initial 'S' engineered for **physical grip**. Built from three interlocking blocks on a precise **1:3 shear**, the geometry acts as a **boot tread, machinery tracks, or diamond plate steel**. It encodes **traction**, **structural integrity**, and **forward momentum** into a single form.
**File:** `assets/logo/mark.svg`
**Grid:** 7×8 unit grid.
**Protected area:** 1 unit clear space on all sides — 9×10 unit protected zone.
**Minimum size:** 21px/16pt height. Below this the internal negative space closes up and the mark loses definition.
---
## The wordmark
The wordmark is set in Work Sans **Bold (900)**, all-caps, −3% tracking. It is a fixed graphic asset — not a typed line of text.
**File:** `assets/logo/lockup.svg` (extract wordmark from this file as needed)
**Minimum size:** 16px/12pt height.
**Clear space:** Minimum clear space equal to the wordmark cap height on all sides.
---
## The lockup
The lockup is the mark and wordmark together. It is the primary logo — use it wherever possible.
**File:** `assets/logo/lockup.svg`
**Construction:** Mark to the left of the wordmark, aligned to cap height, 2 units of space between them. (1 unit = 1 grid unit from the 7×8 mark grid.)
**Format:** Horizontal only. No stacked or vertical variant.
**Minimum size:** 21px/16pt height (mark at 21px/16pt, wordmark at 16px/12pt).
**Clear space:** Maintain a minimum clear space of 2 units on all sides of the lockup as a unit.
## Responsive Rules (Mobile)
Because horizontal space is at an absolute premium on mobile viewports (e.g., iPhone screens), the full lockup collapses into the standalone **mark**.
- **Breakpoint:** `< 768px` (Mobile)
- **Execution:** Hide `lockup.svg` and swap to `mark.svg` while retaining the 32px standard height. Do not rely on the wordmark for recognition on mobile.
---
## Color variants
| Variant                             | Contrast | Permitted | Use                                             |
| ----------------------------------- | -------- | --------- | ----------------------------------------------- |
| Iron on Canvas                | 12.84:1  | Yes       | Default — all light backgrounds                 |
| Canvas on Iron                | 12.84:1  | Yes       | Dark backgrounds, inverted surfaces             |
| Iron on Traffic Cone                    | 4.54:1   | Yes       | Traffic Cone backgrounds only — marginal, use sparingly |
| Single color (Iron or Canvas) | —        | Yes       | Print, embroidery, engraving                    |
| Canvas on Traffic Cone                    | 2.83:1   | No        | Fails WCAG AA                                   |
| Traffic Cone on Canvas                    | 2.83:1   | No        | Fails WCAG AA                                   |
The mark is always rendered in a single, flat color. No gradients, multi-color treatments, or effects.
## The Pattern
The pattern is a step-and-repeat tessellation of the mark. Because the mark features interlocking negative space, repeating it forms a structural, masonry-like wall.
**Usage rules:**
- **Placement:** Use as a structural anchor (e.g., the primary nav bar) or on physical touchpoints (debossing, endpapers).
- **Contrast:** Should be low-contrast, tone-on-tone. Rendering the pattern in **Plaster** (`#FFFFFF`) against a **Canvas** ground is the approved and preferred execution for digital surfaces like the navigation bar.
- **Scale:** Keep it scaled as a texture. Do not blow it up into a massive hero graphic.
- **Restrictions:** Never use as a background behind running text or UI components. Never overlay on photography.
---
## What not to do
- Do not stretch, compress, or rotate the logo
- Do not apply drop shadows, outlines, or effects
- Do not enclose the mark in a circle, box, or shield — its silhouette is its own structure
- Do not place on busy photographic backgrounds without sufficient contrast
- Do not use legacy versions — the 2023 orange logo is retired
- Do not recreate the mark or wordmark in another application — always use the approved file
- Do not use raster formats (PNG, JPG, BMP) of the logo — always use the vector SVG
- **Exception — raster-only platforms:** PNG exports (`lockup-*.png`, `mark-*.png` in `assets/logo/`) are approved for platforms that reject SVG uploads (e.g., Google Slides, some CMS editors, deck tools). SVG remains the source of truth and the standard for web.
