# Data Visualization Rules — Skillit BDS

**Mandate:** Human-centered utility. We present facts about the labor market to people whose time is valuable. Charts should be hyper-legible, consistently precise, and stripped of decorative noise. Every pixel should expose the truth of the data. If a chart prioritizes aesthetic trends over functional clarity, it fails the test. It is a precision tool built for human use.

## 1. Geometry & Structure
- **Containers:** All data viz graphics must sit on a Plaster (`--color-surface`, pure white) background card to isolate the data and maintain contrast against the surrounding UI.
- **Corners (axis-based charts):** `0px` — sharp, flat edges on bars in any chart read against an axis (bar, grouped bar, histogram, stacked bar). Data is precision, not decoration. Tooltips and Plaster cards keep `16px` (structural containers).
- **Corners (comparison and progress bars):** a bar that has no axis and is read as a proportion of a track (progress, funnel, a single value against a total, a two-value comparison inside a card) uses a fully rounded end (`--radius-pill`). The track is a Canvas pill and the fill is clipped to it, so the left end rounds and the right end stays at the true length. Label every bar with its value so length is never the only signal. If the bars share an axis with tick marks or gridlines, it is an axis-based chart and stays square.
- **Stroke Weights:** A universal `4px` rule applies to all line work to maintain an industrial, structural feel.
  - Data lines are `4px`.
  - Gridlines (horizontal Y-axis only) are `4px` Canvas (`--color-background`).
- **Line Charts:** Both unsmoothed (stepped/linear) and smoothed (spline/curved) paths are permitted. Choose the geometry that best serves the specific data story.
- **Markers:** Sharp squares (`0px`) or diamonds. No circles.
- **Axes:** Remove outer bounding boxes. Y-axis gridlines only (4px Canvas `--color-background`). No X-axis gridlines.
- **Maps:** Use a light base map for light mode. Dark maps on light surfaces break the surface hierarchy — the map should sit quietly under the data, not compete with it.
- **Map layers:** draw demand (Traffic Cone) first and supply (Painter’s Tape) above it, so the worker-side marks are never hidden. Show a key that names both, or label them directly on the map.
- **Connection arcs:** a line that joins supply to demand runs in the direction the data flows. Paint it as a gradient from the supply color at its origin to the demand color at its destination, `4px` stroke at its lightest, round caps. A single color is acceptable only where direction does not matter. Do not draw an arc for a route with too few people to protect their identity (the map notes the threshold).

## 2. Typography
- **Font:** Work Sans.
- **Numbers:** `font-variant-numeric: tabular-nums;` (strict requirement).
- **Labels:** Sentence-case, `Text-1x/2x`, flush-left, including Y-axis values.
- **Headers and subheaders:** Use canonical size/weight hierarchy, not opacity fades. Text labels and references remain full-opacity Iron for readability. Data-mark opacity rules below apply to data geometry, not small text.
- **References and footnotes:** JetBrains Mono Text-0.75x (`--text-0.75x`, 12px minimum), canonical 550 weight / 1.4 leading / 0.04em tracking, opaque Iron on Plaster; no 14px or 50%-Iron reference treatment.

## 3. Data Color Palette (Role-scoped)
- **Context and structure:** Iron is the default for neutral/contextual marks; labels and references remain opaque Iron. A monochrome chart is an option, not a requirement.
- **Insight and demand:** Traffic Cone (`--color-primary`) can highlight an insight or encode demand-side data (job openings, hiring demand). Its chart role does not make a data mark an interactive action.
- **Supply:** Painter’s Tape (`--color-link`) can encode supply-side data (worker availability, labor supply). Its approved data fill is distinct from its underlined text-link role.
- **Categories and expanded series:** Traffic Cone, Painter’s Tape, and other approved colors from the canonical palette may distinguish categories. Use a consistent labeled legend or direct labels; do not invent hex values or import a new palette. When a color explicitly represents success, warning, or failure, keep that role clear in the legend and do not assign it a contradictory meaning in the same chart.
- **Redundant identification:** Never rely on color alone. Pair series with direct labels or a labeled legend and, where needed, distinct patterns, markers, or line styles. Verify actual mark/background and adjacent-mark contrast; do not assume every approved color passes on every surface.
- **Optional opacity scale:** Equally stepped opacities of a canonical base color are allowed for overlapping marks: 100% / 50% for two series, 100% / 67% / 33% for three. Use `opacity` or `color-mix`, not invented hex values; verify visible separation and keep text opaque.
- **Patterns:** Industrial cross-hatching or stippling can supplement approved color fills when more separation is needed.

## 4. Bar Graphs
The rules below apply to axis-based bars. For comparison and progress bars, see the corner rule in section 1.
- Use flat fills only. For N opacity steps, distribute values evenly from 100% down to 100% / N: 100% / 50% for two steps, 100% / 67% / 33% for three steps. Apply the same rule to the chosen canonical base color; approved categorical color fills are also allowed.
- **Annotations:** Value callout labels sit in Work Sans, `Text-1x`, Iron — same typeface as category labels. JetBrains Mono is for machine data only (timestamps, IDs, code); a chart value label is human-readable content, not metadata.
- **Legend:** Placed at the bottom, horizontal layout, Work Sans `Text-1x`.
- **Grouped bars:** Use approved category colors or an optional equally stepped opacity scale with a labeled legend and redundant series identification.

## 5. Interaction & Specific Chart Rules
- **Tooltips:** Plaster (`--color-surface`) background, 1px solid Iron (`--color-foreground`) border, 16px corners.
- **Hover and focus on marks:** a hovered bar, map region, or point keeps its fill and gains a 2px Iron outline; keyboard focus uses the 2px Traffic Cone ring with a 2px offset. Fill never changes, because fill encodes data. Raise the hovered mark above its neighbours so the outline is not clipped. Pie slices take no outline (zero stroke): the tooltip and direct label identify them. Marks that are not actionable show the tooltip only, with no pointer cursor.
- **Interaction:** Charts do not define inactive series. Tooltips may identify the hovered data point, while every series remains visible at its assigned opacity.
- **Pie Charts (Solid State):** Slices must sit flush against each other with zero gap and zero stroke. Use approved category colors or optional opacity steps, with direct labels identifying every slice.
- **Pie labels and legends:** Label each slice directly outside the chart on the Canvas background, connected by a 1px Iron leader line. A labeled legend may supplement direct labels; never require color or shade matching alone.

## 6. Banned Elements
- 3D effects.
- Drop shadows.
- Donut charts (decorative SaaS trope. If showing a part-to-whole ratio, use a solid Pie chart instead).
- Radar/Spider charts.
