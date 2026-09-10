# Logo Tokens — Skillit BDS
**Last updated:** 2026-08-27
**Canonical source:** `tokens.json5` (machine-readable) for dimension tokens; the SVGs in `assets/logo/` are the fixed graphic assets.
---
The Skillit logo system has four components: mark, wordmark, lockup, and pattern. Use the lockup wherever possible — it's the primary logo. Use the mark alone only in constrained spaces where the lockup doesn't fit well. Never use the wordmark alone. Each logo component is a fixed graphic asset. Do not recreate it, retype it, or export it in raster formats. Use the approved SVG and PNG files only.
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
## The lockup
The lockup is the mark and wordmark together. It is the primary logo — use it wherever possible. The wordmark is never used standalone.
**File:** `assets/logo/lockup.svg`
**Construction:** Mark to the left of the wordmark, aligned to cap height, 2 units of space between them. (1 unit = 1 grid unit from the 7×8 mark grid.)
**Format:** Horizontal only. No stacked or vertical variant.
**Wordmark specs:** Work Sans Black (900), ALL CAPS, −3% tracking. Lowercase 'l' uses a straight leg. The 'k' connects to 'i' and 'i' connects to 't' via custom point adjustment — not typed text.
**Minimum size:** 21px/16pt height (mark at 21px/16pt, wordmark at 16px/12pt).
- **Clear space:** Maintain a minimum clear space of 1/8 of the lockup height (12.5%) on each side.
## Header Logo Heights
The header logo is always **24px tall**, regardless of whether it's the lockup or the mark, regardless of surface. One token: `--logo-height`.

| Context | Logo | Token | Value |
|---|---|---|---|
| App header (dark bg) | mark only | `--logo-height` | 24px |
| Public topnav (light bg) | full lockup | `--logo-height` | 24px |
| Marketing site header | full lockup | `--logo-height` | 24px |
| Docs header | full lockup | `--logo-height` | 24px |

**Rules:**
- Lockup and mark use the same 24px height. The lockup has more horizontal reach because it includes the wordmark; the mark does not. Height is the one dimension that stays consistent.
- Do not scale the logo to fill a container. Do not use `height: auto` and let the SVG's intrinsic size decide. Always set the height explicitly from `--logo-height`.
- If the logo appears in a context not listed here (email signatures, partner badges, print, cards), refer to the minimum-size rules (21px for mark, 16px for wordmark) rather than the header height.
---
## Color variants
| Variant                             | Contrast | Permitted | Use                                             |
| ----------------------------------- | -------- | --------- | ----------------------------------------------- |
| Iron on Canvas                | 12.84:1  | Yes       | Default — all light backgrounds                 |
| Canvas on Iron                | 12.84:1  | No        | Iron is not a background surface                |
| Iron on Traffic Cone                    | 4.54:1   | Yes       | Button backgrounds only — marginal, use sparingly |
| Single color (Iron or Canvas) | —        | Yes       | Print, embroidery, engraving                    |
| Canvas on Traffic Cone                    | 2.83:1   | No        | Fails WCAG AA                                   |
| Traffic Cone on Canvas                    | 2.83:1   | No        | Fails WCAG AA                                   |
The mark is always rendered in a single, flat color. No gradients, multi-color treatments, or effects.
## The Pattern
The pattern is a step-and-repeat tessellation of the mark. Because the mark features interlocking negative space, repeating it forms a structural, masonry-like wall.
**Usage rules:**
- **Placement:** Use as a structural anchor in document headers and footers, or on physical touchpoints (debossing, endpapers).
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
- **Never use the wordmark alone.** The wordmark is a component of the lockup, not a standalone logo. Use the lockup, or use the mark alone on mobile.
- Do not use raster formats (PNG, JPG, BMP) of the logo — always use the vector SVG
- **Exception — raster-only platforms:** PNG exports (`lockup-*.png`, `mark-*.png` in `assets/logo/`) are approved for platforms that reject SVG uploads (e.g., Google Slides, some CMS editors, deck tools). SVG remains the source of truth and the standard for web.
- **PNG export size:** All raster exports are rendered at **512px height** for digital use. For print, render at 300 DPI at the final printed size.
