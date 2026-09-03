# Data Visualization Rules — Skillit BDS

**Mandate:** Human-centered utility. We present facts about the labor market to people whose time is valuable. Charts should be hyper-legible, consistently precise, and stripped of decorative noise. Every pixel should expose the truth of the data. If a chart prioritizes aesthetic trends over functional clarity, it fails the test. It is a precision tool built for human use.

## 1. Geometry & Structure
- **Containers:** All data viz graphics must sit on a Plaster (`--color-surface`, pure white) background card to isolate the data and maintain contrast against the surrounding UI.
- **Corners:** `0px` — sharp, flat edges on bars (data is precision, not decoration). Tooltips and Plaster cards keep `16px` (structural containers).
- **Stroke Weights:** A universal `4px` rule applies to all line work to maintain an industrial, structural feel.
  - Data lines are `4px`.
  - Gridlines (horizontal Y-axis only) are `4px` Canvas (`--color-background`).
- **Line Charts:** Both unsmoothed (stepped/linear) and smoothed (spline/curved) paths are permitted. Choose the geometry that best serves the specific data story.
- **Markers:** Sharp squares (`0px`) or diamonds. No circles.
- **Axes:** Remove outer bounding boxes. Y-axis gridlines only (4px Canvas `--color-background`). No X-axis gridlines.

## 2. Typography
- **Font:** Work Sans.
- **Numbers:** `font-variant-numeric: tabular-nums;` (strict requirement).
- **Labels:** Sentence-case, `Text-1x/2x`, right-aligned Y-axis values.
- **Headers and subheaders:** Use equally stepped opacity levels. For N levels, use 100% down to 100% / N (100% / 50% for two levels; 100% / 67% / 33% for three). Apply the same scale to Iron and Traffic Cone rather than using a gradient.

## 3. Data Color Palette (Monochromatic & Semantic)
- **The Baseline (Context):** All secondary or contextual data uses a single flat shade of Iron. Do not use varying shades of Iron for standard side-by-side bar charts.
- **The Insight (Hero):** Traffic Cone (`--color-primary`) is used *exclusively* to highlight the specific data point or trend the viewer is supposed to care about. Orange is the thesis; Iron is the context.
- **Overlapping Data (Varying Iron):** ONLY introduce an equally stepped Iron opacity scale if the data overlaps and requires structural separation (e.g., multi-line graphs crossing over each other).
- **Expanded Scale:** Use industrial patterns (diagonal cross-hatching, stippling) in Iron. Do not add colors.
- **Semantic Lock:** NEVER use Painter's Tape (Blue), Bottle Glass (Green), Hard Hat (Yellow), or Toolbox (Red) for standard categories. Only use them if measuring explicit links, info notes, successes, warnings, or failures.

## 4. Bar Graphs
- Use flat fills only. For N opacity steps, distribute values evenly from 100% down to 100% / N: 100% / 50% for two steps, 100% / 67% / 33% for three steps. Apply the same rule to Iron and Traffic Cone.
- **Annotations:** Value callout labels sit in Work Sans, `Text-1x`, Iron — same typeface as category labels. JetBrains Mono is for machine data only (timestamps, IDs, code); a chart value label is human-readable content, not metadata.
- **Legend:** Placed at the bottom, horizontal layout, Work Sans `Text-1x`.
- **Grouped bars:** Use equally stepped Iron opacity, such as 100% / 67% / 33% for three series, to disambiguate series.

## 5. Interaction & Specific Chart Rules
- **Tooltips:** Plaster (`--color-surface`) background, 1px solid Iron (`--color-foreground`) border, 16px corners.
- **Interaction:** Charts do not define inactive series. Tooltips may identify the hovered data point, while every series remains visible at its assigned opacity.
- **Pie Charts (Solid State):** Slices must sit flush against each other with zero gap and zero stroke. Delineation is handled entirely by opacity steps in Iron or the Traffic Cone hero slice.
- **Legends are banned for pie charts:** Never force a user to match shades of gray between a key and the chart. All labels must sit outside the chart on the Canvas background, connected directly to their corresponding slice by a 1px Iron leader line.

## 6. Banned Elements
- 3D effects.
- Drop shadows.
- Donut charts (decorative SaaS trope. If showing a part-to-whole ratio, use a solid Pie chart instead).
- Radar/Spider charts.
