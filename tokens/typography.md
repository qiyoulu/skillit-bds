# Typography Tokens — Skillit BDS
**Last updated:** 2026-08-17
**Canonical source:** `tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- Use only Work Sans for human text. Never substitute with system fonts, other Google Fonts, or unlicensed alternatives.
- IBM Plex Mono is the only approved monospace — metadata, IDs, and data only, never running copy.
- All sizes are in `rem` (base 16px). Never use `px` for type — it breaks accessibility scaling.
- All text should be sentence-case. No title case in UI. No ALL CAPS anywhere (except industry acronyms like OSHA, HVAC, AI).
---
## Typefaces
### Work Sans
- **Source:** Google Fonts CDN (zero-config)
- **CDN link:** `https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&family=IBM+Plex+Mono:wght@400&display=swap`
- **CSS variable:** `--font-primary: 'Work Sans', sans-serif;`
- **Use:** Everything — UI, headings, body text, buttons, labels, marketing, print.
---
## The Typographic Algorithm (Primary Scale)
The typography system is consistently derived and infinitely scalable. Levels are named objectively by their pixel size.
If you need a size larger than 128px (e.g., 256px), extrapolate using this algorithm starting from the 16px baseline:
- **Size:** Multiply by 2.
- **Base Weight:** Add +100 for each doubling of size (Max: 900).
- **Bolded Weight:** Base weight + 200 (Max: 900).
- **Line Height:** Add +0.2 for each halving of size (e.g., 128px → 0.80, down to 16px → 1.40).
- **Tracking:** Subtract -2% (-0.02em) for each doubling of size (floor: 0%).
| Level | Token | px (screen) | rem (web) | pt (print) | Base Weight | Bolded | Line height | Tracking |
|---|---|---|---|---|---|---|---|---|
| **Text-8x** | `--text-8x` | 128px | 8rem | 96pt | Bold (700) | Black (900) | 0.80 | -6% |
| **Text-4x** | `--text-4x` | 64px | 4rem | 48pt | Semibold (600) | Extra Bold (800) | 1.00 | -4% |
| **Text-3x** | `--text-3x` | 48px | 3rem | 36pt | Semibold (600) | Bold (700) | 1.10 | -3% |
| **Text-2x** | `--text-2x` | 32px | 2rem | 24pt | Medium (500) | Bold (700) | 1.20 | -2% |
| **Text-1.5x** | `--text-1.5x` | 24px | 1.5rem | 18pt | Medium (500) | Semibold (600) | 1.30 | -1% |
| **Text-1x** | `--text-1x` | 16px | 1rem | 12pt | Regular (400) | Semibold (600) | 1.40 | 0% |
*(Note: Text-16x was retired — no longer a defined Figma text style; use the extrapolation algorithm above if a size beyond Text-8x is ever needed.)*
### Small-viewport variants (confirmed against Figma)
Style names carry a `-s` suffix for small viewports in Figma (e.g., `Text-1s` = Text-1x at small viewports). In CSS, the suffix is `-sm` (e.g., `--text-1x-sm`), matching the breakpoint naming in the spacing tokens. **Mobile variants use the ×0.75 rule** (mobile px = print pt):
| Level | Desktop | Mobile (×0.75) | Leading |
|---|---|---|---|
| Text-8x | 128px | 96px (`Text-8s`) | 0.80 |
| Text-4x | 64px | 48px (`Text-4s`) | 1.00 |
| Text-3x | 48px | 36px (`Text-3s`) | 1.10 |
| Text-2x | 32px | 24px (`Text-2s`) | 1.20 |
| Text-1.5x | 24px | 18px (`Text-1.5s`) | 1.30 |
| Text-1x | 16px | 12px (`Text-1s`) | 1.40 |
### Monospace variants (confirmed against Figma)
Concrete values for the 90% scaling rule below, confirmed against current Figma text styles. Only Text-1x and Text-2x have confirmed mono variants so far — don't extrapolate 4x/8x mono sizes without confirming in Figma first.
| Level | Base | Mono (round(base × 0.9)) |
|---|---|---|
| Text-1x | 16px | 14px (`--text-mono`) |
| Text-2x | 32px | 29px |
## Functional type scale (UI)
These tokens cover UI surfaces (app, dashboard, labels, captions) where the primary hierarchy doesn’t apply directly.
| Token | Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `--text-ui-lg` | Large UI text | `1.125rem` (18px) | 400 | 1.6 | `0` |
| `--text-ui` | Default UI body | `1rem` (16px) | 400 | 1.6 | `0` |
| `--text-label` | Labels, tags, badges | `0.75rem` (12px) | 500 | 1.4 | `0.04em` |
| `--text-mono` | Metadata, IDs, data | `0.875rem` (14px) | 400 | 1.5 | `0.02em` |
---
## Monospace stack (metadata & code)
All metadata (timestamps, worker IDs, distances, statistics) and code blocks (inline or multiline) should use a monospace stack to visually separate machine data from human text.
```css
--font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;
```
**Scaling Rule:** Monospace fonts sit on a different em-square. To optically align with Work Sans without breaking the line-box, always scale inline monospace text to 90% of the parent font size (e.g., `font-size: 0.9em;`). See the confirmed Text-1x/Text-2x mono values above for concrete pixel equivalents.
---
## CSS custom properties (copy-paste ready)
```css
/* Google Fonts import — add to <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet"> */
:root {
  /* Families */
  --font-primary:   'Work Sans', sans-serif;
  --font-mono:      'IBM Plex Mono', 'JetBrains Mono', monospace;
  /* Primary hierarchy — absolute size naming */
  /* Text-8x */
  --text-8x:               8rem;
  --text-8x-weight:        700;
  --text-8x-weight-bold:   900;
  --text-8x-leading:       0.80;
  --text-8x-tracking:      -0.06em;
  --text-8x-print:         96pt;
  --text-8x-sm:            6rem;   /* 96px — mobile variant (was 4rem/64px) */
  /* Text-4x */
  --text-4x:                4rem;
  --text-4x-weight:         600;
  --text-4x-weight-bold:    800;
  --text-4x-leading:        1.00;
  --text-4x-tracking:       -0.04em;
  --text-4x-print:          48pt;
  --text-4x-sm:             3rem;  /* 48px — mobile variant (was 2rem/32px) */
  /* Text-3x */
  --text-3x:                3rem;
  --text-3x-weight:         600;
  --text-3x-weight-bold:    700;
  --text-3x-leading:        1.10;
  --text-3x-tracking:       -0.03em;
  --text-3x-print:          36pt;
  --text-3x-sm:             2.25rem; /* 36px — mobile variant */
  /* Text-2x */
  --text-2x:                2rem;
  --text-2x-weight:         500;
  --text-2x-weight-bold:    700;
  --text-2x-leading:        1.20;
  --text-2x-tracking:       -0.02em;
  --text-2x-print:          24pt;
  --text-2x-sm:             1.5rem; /* 24px — mobile variant (was 1rem/16px) */
  --text-2x-mono:            1.8125rem; /* 29px — confirmed Figma value, round(32 * 0.9) */
  /* Text-1.5x */
  --text-1.5x:              1.5rem;
  --text-1.5x-weight:       500;
  --text-1.5x-weight-bold:  600;
  --text-1.5x-leading:      1.30;
  --text-1.5x-tracking:     -0.01em;
  --text-1.5x-print:        18pt;
  --text-1.5x-sm:           1.125rem; /* 18px — mobile variant */
  /* Text-1x */
  --text-1x:                1rem;
  --text-1x-weight:         400;
  --text-1x-weight-bold:    600;
  --text-1x-leading:        1.40;
  --text-1x-tracking:       0em;
  --text-1x-print:          12pt;
  --text-1x-sm:             0.75rem; /* 12px — mobile body */
  /* No -sm token: Text-1x is the hard floor (12px) */
  /* Functional UI scale */
  --text-ui-lg:     1.125rem;
  --text-ui:        1rem;
  --text-label:     0.75rem;
  --text-mono:      0.875rem; /* = Text-1x monospace variant, confirmed round(16 * 0.9) = 14px */
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
- **Optical Balancing:** Light text on a dark background creates an optical illusion (halation) making letterforms appear heavier. Canvas is already off-white (`#FAF7F3`) rather than pure white, which reduces irradiation naturally. For text on dark backgrounds (Iron, Traffic Cone, Toolbox, Bottle Glass), subtract approximately 25 units of font weight to generate an interpolated weight — e.g., `font-weight: var(--weight-regular-dark);` (375) instead of 400. Adjust by eye; this is a heuristic, not a fixed rule.
- **Micro-interactions:** Use CSS transitions on the `font-weight` axis (e.g., `400` to `600`) for fluid hover states on navigation links and buttons, rather than abrupt jumps.
### Monospace / metadata
- Use `--font-mono` for: timestamps, worker IDs, distances, file sizes, any numeric data string.
- Never use monospace for labels, body copy, or headings.
- Signals “machine data” vs. “human content” — a core visual distinction in the system.
### Italics & Emphasis
- **Emphasis:** Use italics strictly to highlight specific words within a sentence.
- **Titles of Works:** Use italics for book names, publications, and articles.
- **No Decorative Use:** Do not use italics for entire blocks of text (like blockquotes).

### Spacing & Indentation
To lock text into the rigid 8px/16px baseline grid, vertical spacing between text elements uses absolute tokens regardless of the font size. **Never use relative `em` margins.**

- **Paragraphs:** 16px (`--space-4`). The standard gap between paragraphs.
- **Text Lists:** 8px (`--space-2`). Items in a bulleted or numbered text list sit tighter together so the list reads visually as a single, cohesive block of information.
- **UI Lists:** 16px (`--space-4`). Interactive lists (like a feed of jobs in the app) use a wider gap to protect the 44px minimum touch target rule.

**Blockquotes**
- **Container:** Place quotes inside a Plaster (`#FFFFFF`) card container with 16px border radius. It uses standard card padding.
- **Typography:** Roman only. Do not italicize the entire quote (reserve italics for emphasis or titles of works).

### Typographic Punctuation
- **Smart Quotes:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for code; angled quotes are for reading.
- **Hanging Punctuation (Optical Margin Alignment):** Because layouts are flush-left, opening quotation marks on the first line of a paragraph or pull quote must hang *outside* the bounding box. This ensures the first letters of every line form a perfectly flush vertical grid line. Do not hang bullets or list numbers.
### Widows and Orphans
- **The Rule:** Never leave a single word alone on the last line of a paragraph or headline. They create visual holes that break the structural mass of the text block and severely damage readability and scannability.
- **Manual Tracking Adjustment (Primary Fix):** To fix widows and orphans on static or editorial surfaces, adjust the tracking (letter-spacing) of the text block by up to `±2%` (`±0.02em`). This is the preferred method because it imperceptibly compresses or expands the text to force a re-wrap without creating a ragged visual hole at the end of the previous line.
- **The Soft Break Injection (Secondary Fix):** If tracking adjustment isn't feasible, insert a soft break opportunity (`&wbr;` in HTML, or a manual soft line break — Shift+Enter in Figma/most editors) before the word that would otherwise orphan. Unlike a non-breaking space, this doesn't force a permanent gap: the browser only breaks there if the line actually needs it, so the fix disappears cleanly at wider viewports instead of leaving stray glue between two words that no longer need to wrap.
- **In Engineering:** Apply `text-wrap: balance;` to all Display, Heading, and H2 elements. Apply `text-wrap: pretty;` to Body copy (`p`). Because browser support for `pretty` is not absolute, the manual `&wbr;` injection above is required as a fallback for all critical marketing copy. Use `orphans: 2; widows: 2;` in print stylesheets.
### What not to do
- Do not use `font-weight: 300` (Light) — too thin for job-site legibility.
- Do not use any typeface other than Work Sans.
- Do not set letter-spacing on UI text below `--text-ui` — it reduces legibility at small sizes.
- Do not use the primary hierarchy sizes in UI components — they are for editorial/marketing surfaces only.
### Responsive Scaling (Desktop to Mobile)
- **The Rule:** Scale display text sizes down smoothly to a minimum of half the size at mobile breakpoints (e.g., a desktop 128px becomes 64px on mobile). However, **keep the original weights** (do not scale down the font-weight) to maintain the visual hierarchy and density.
- **Body Text Exception:** Body and UI text scale down to the 12px hard floor on mobile (`Text-1s` = 12px, locked aug 13). Never below 12px. UI text (`--text-ui`, `--text-label`) holds its size — the 44px touch target rule governs app surfaces, not display.
