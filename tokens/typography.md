# Typography Tokens — Skillit BDS
**Last updated:** 2026-07-12
---
## Rules before you use this file
- Use only Work Sans. Never substitute with system fonts, other Google Fonts, or unlicensed alternatives.
- Work Sans is the only typeface. It loads from Google Fonts — zero configuration needed.
- All sizes are in `rem` (base 16px). Never use `px` for type — it breaks accessibility scaling.
- All text should be sentence-case. No title case in UI. No ALL CAPS anywhere.
---
## Typefaces
### Work Sans
- **Source:** Google Fonts CDN (zero-config)
- **CDN link:** `https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap`
- **CSS variable:** `--font-primary: 'Work Sans', sans-serif;`
- **Use:** Everything — UI, headings, body text, buttons, labels, marketing, print.
---
## The Typographic Algorithm (Primary Scale)
The typography system is mathematically derived and infinitely scalable. Levels are named objectively by their pixel size (, ).
If you need a size larger than 160px (e.g., 320px), extrapolate using this algorithm starting from the 20px baseline:
- **Size:** Multiply by 2.
- **Base Weight:** Add +100 for each doubling of size (Max: 900).
- **Bolded Weight:** Base weight + 200 (Max: 900).
- **Line Height:** Add +0.2 for each halving of size (e.g., 256px → 0.60, 128px → 0.80, down to 16px → 1.40).
- **Tracking:** Subtract -2% (-0.02em) for each doubling of size (floor: 0%).
| Level | Token | px (screen) | rem (web) | pt (print) | Base Weight | Bolded | Line height | Tracking |
|---|---|---|---|---|---|---|---|---|
| **Text-16x** |  | 256px |  | 192pt | Extra Bold (800) | Black (900) | 0.60 | -8% |
| **Text-8x** |  | 128px |  | 96pt | Bold (700) | Extra Bold (800) | 0.80 | -6% |
| **Text-4x** |  | 64px |  | 48pt | Semibold (600) | Bold (700) | 1.00 | -4% |
| **Text-2x** |  | 32px |  | 24pt | Medium (500) | Semibold (600) | 1.20 | -2% |
| **Text-1x** |  | 16px |  | 12pt | Regular (400) | Medium (500) | 1.40 | 0% |
| **Text-0.75x** |  | 12px |  | 9pt | Regular (400) | Medium (500) | 1.55 | 0% |
*(Note: Text-1x and Text-0.75x operate outside the strict 2x multiplier rule to protect legibility on job-site screens. 12px is the absolute hard floor. Text-16x leading of 0.60 is aggressive — manually adjust if descenders clip at your specific rendering size.)*
## Functional type scale (UI)
These tokens cover UI surfaces (app, dashboard, labels, captions) where the primary hierarchy doesn’t apply directly.
| Token | Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `--text-ui-lg` | Large UI text | `1.125rem` (18px) | 400 | 1.6 | `0` |
| `--text-ui` | Default UI body | `1rem` (16px) | 400 | 1.6 | `0` |
| `--text-ui-sm` | Small UI / captions | `0.875rem` (14px) | 400 | 1.5 | `0.01em` |
| `--text-label` | Labels, tags, badges | `0.75rem` (12px) | 500 | 1.4 | `0.04em` |
| `--text-mono` | Metadata, IDs, data | `0.875rem` (14px) | 400 | 1.5 | `0.02em` |
---
## Monospace stack (metadata & code)
All metadata (timestamps, worker IDs, distances, statistics) and code blocks (inline or multiline) should use a monospace stack to visually separate machine data from human text.
```css
--font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;
```
**Scaling Rule:** Monospace fonts sit on a different em-square. To optically align with Work Sans without breaking the line-box, always scale inline monospace text to 90% of the parent font size (e.g., `font-size: 0.9em;`).
---
## CSS custom properties (copy-paste ready)
```css
/* Google Fonts import — add to <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap" rel="stylesheet"> */
:root {
  /* Families */
  --font-primary:   'Work Sans', sans-serif;
  --font-mono:      'IBM Plex Mono', 'JetBrains Mono', monospace;
  /* Primary hierarchy — absolute size naming */
  /* Text-16x */
  --text-16x:               16rem;
  --text-16x-weight:        800;
  --text-16x-weight-bold:   900;
  --text-16x-leading:       0.60;
  --text-16x-tracking:      -0.08em;
  /* Text-8x */
  --text-8x:               8rem;
  --text-8x-weight:        700;
  --text-8x-weight-bold:   800;
  --text-8x-leading:       0.80;
  --text-8x-tracking:      -0.06em;
  /* Text-4x */
  --text-4x:                4rem;
  --text-4x-weight:         600;
  --text-4x-weight-bold:    700;
  --text-4x-leading:        1.00;
  --text-4x-tracking:       -0.04em;
  /* Text-2x */
  --text-2x:                2rem;
  --text-2x-weight:         500;
  --text-2x-weight-bold:    600;
  --text-2x-leading:        1.20;
  --text-2x-tracking:       -0.02em;
  /* Text-1x */
  --text-1x:                1rem;
  --text-1x-weight:         400;
  --text-1x-weight-bold:    500;
  --text-1x-leading:        1.40;
  --text-1x-tracking:       0em;
  /* Text-0.75x (Hard Legibility Floor) */
  --text-0.75x:             0.75rem;
  --text-0.75x-weight:      400;
  --text-0.75x-weight-bold: 500;
  --text-0.75x-leading:     1.55;
  --text-0.75x-tracking:    0em;
  /* Functional UI scale */
  --text-ui-lg:     1.125rem;
  --text-ui:        1rem;
  --text-ui-sm:     0.875rem;
  --text-label:     0.75rem;
  --text-mono:      0.875rem;
  /* Variable Font Weights */
  --weight-regular:    400;
  --weight-medium:     500;
  --weight-semibold:   600;
  --weight-bold:       700;
  --weight-extrabold:  800;
  --weight-black:      900;
  /* Optical Balancing for Dark Backgrounds (halation compensation — approx. −25 units, adjust by eye) */
  --weight-regular-dark:    375;
  --weight-medium-dark:     475;
  --weight-semibold-dark:   575;
  --weight-bold-dark:       675;
  --weight-extrabold-dark:  775;
  --weight-black-dark:      875;
}
```
---
## Usage rules
### Primary hierarchy (marketing, digital, editorial, print)
- **Text-16x:** Massive brand moments, event banners, numbers/stats at extreme scale.
- **Text-8x:** Hero headlines at massive scale.
- **Text-4x:** Standard headlines, campaign statements, large callouts.
- **Text-2x:** Section headings, page titles, pull quotes.
- **Text-1x:** All running copy, paragraph text.
### Functional UI scale (app, dashboard)
- **`--text-ui` and above:** Work Sans Regular (400) minimum. Line height 1.6. Never below 1.4.
- **`--text-label`:** Work Sans Medium (500). Always sentence-case. Minimum size — do not go smaller.
- Maximum line length for body: 70 characters (`max-width: var(--max-width-text)`).
### Variable Font & Optical Balancing
Work Sans is implemented as a variable font (`wght@100..900`).
- **Optical Balancing:** Light text on a dark background creates an optical illusion (halation) making letterforms appear heavier. Canvas is already off-white (`#FAF9F6`) rather than pure white, which reduces irradiation naturally. For text on dark backgrounds (Iron, Traffic Cone, Toolbox, Bottle Glass), subtract approximately 25 units of font weight as a starting point — e.g., `font-weight: var(--weight-regular-dark);` (375) instead of 400. Adjust by eye; this is a heuristic, not a fixed rule.
- **Micro-interactions:** Use CSS transitions on the `font-weight` axis (e.g., `400` to `600`) for fluid hover states on navigation links and buttons, rather than abrupt jumps.
### Monospace / metadata
- Use `--font-mono` for: timestamps, worker IDs, distances, file sizes, any numeric data string.
- Never use monospace for labels, body copy, or headings.
- Signals “machine data” vs. “human content” — a core visual distinction in the system.
### Paragraph and List Spacing (Vertical Rhythm)
- **Paragraphs:** 16px (`--space-4`). The gap between paragraphs is exactly equal to the default body font size (1em), maintaining a perfect mathematical rhythm down the page.
- **Text Lists:** 8px (`--space-2`). Items in a bulleted or numbered text list sit tighter together so the list reads visually as a single, cohesive block of information.
- **UI Lists:** 16px (`--space-4`). Interactive lists (like a feed of jobs in the app) use a wider gap to protect the 44px minimum touch target rule.

### Typographic Punctuation
- **Smart Quotes:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for code; angled quotes are for reading.
- **Hanging Punctuation (Optical Margin Alignment):** Because layouts are flush-left, opening quotation marks on the first line of a paragraph or pull quote must hang *outside* the bounding box. This ensures the first letters of every line form a perfectly flush vertical grid line. Do not hang bullets or list numbers.
### Widows and Orphans
- **The Rule:** Never leave a single word alone on the last line of a paragraph or headline. They create visual holes that break the structural mass of the text block and severely damage readability and scannability.
- **Manual Tracking Adjustment (Primary Fix):** To fix widows and orphans on static or editorial surfaces, adjust the tracking (letter-spacing) of the text block by up to `±2%` (`±0.02em`). This is the preferred method because it imperceptibly compresses or expands the text to force a re-wrap without creating a ragged visual hole at the end of the previous line.
- **The Non-Breaking Space Injection (Secondary Fix):** If tracking adjustment isn't feasible, manually inject a non-breaking space (`&nbsp;`) between the final two words of the paragraph (e.g., `at&nbsp;scale.`). Note that this physically forces the penultimate word to the next line, which can leave a gap on the right edge.
- **In Engineering:** Apply `text-wrap: balance;` to all Display, Heading, and H2 elements. Apply `text-wrap: pretty;` to Body copy (`p`). Because browser support for `pretty` is not absolute, the manual `&nbsp;` injection above is mandatory for all critical marketing copy. Use `orphans: 2; widows: 2;` in print stylesheets.
### What not to do
- Do not use `font-weight: 300` (Light) — too thin for job-site legibility.
- Do not use any typeface other than Work Sans.
- Do not set letter-spacing on UI text below `--text-ui` — it reduces legibility at small sizes.
- Do not use the primary hierarchy sizes in UI components — they are for editorial/marketing surfaces only.
### Responsive Scaling (Desktop to Mobile)
- **The Rule:** Scale display text sizes down smoothly to a minimum of half the size at mobile breakpoints (e.g., a desktop 128px becomes 64px on mobile). However, **keep the original weights** (do not scale down the font-weight) to maintain the visual hierarchy and density.
- **Body Text Exception:** Body and UI text (`--text-ui`, `--text-1x`, etc.) should not scale down. Maintain their exact desktop size on mobile to ensure strict job-site legibility.
