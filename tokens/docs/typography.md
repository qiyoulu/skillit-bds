# Typography Tokens — Skillit Kit BDS
**Last updated:** 2026-08-17
**Canonical source:** `tokens/tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- Use only Work Sans for human text. Never substitute with system fonts, other Google Fonts, or unlicensed alternatives.
- JetBrains Mono is the only approved monospace — metadata, IDs, data, and code only, never running copy.
- Both typefaces match at the same point size — no scaling needed. JetBrains Mono's x-height equals Work Sans at 100%.
- All sizes are in `rem` (base 16px). Never use `px` for type — it breaks accessibility scaling.
- All text should be sentence-case. No title case in UI. No ALL CAPS anywhere.
- **Exceptions to sentence case:**
  - **Acronyms:** ALL CAPS (OSHA, HVAC, AI, BLS, PTO).
  - **Proper nouns:** Proper Case (New York, Skillit, JustWorks).
- **Minimum font size:** `1rem` (16px). No text renders below this size.
---
## Typefaces
### Work Sans
- **Source:** Google Fonts CDN (zero-config)
- **CDN link:** `https://fonts.googleapis.com/css2?family=Work Sans:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap`
- **CSS variable:** `--font-primary: 'Work Sans', sans-serif;`
- **Use:** Headings, subheadings, body copy, bylines, buttons, labels.
---
### JetBrains Mono
- **Source:** Google Fonts CDN (zero-config)
- **CSS variable:** `--font-mono: 'JetBrains Mono', monospace;`
- **Use:** Metadata, IDs, data, code blocks, timestamps, captions, footnotes, references.
- **Weights:** 100, 200, 300, 400, 500, 600, 700, 800 (variable font).
- **Scaling:** Use at 100% of the tier size. No adjustment needed to match Work Sans x-height.
---
## The Typographic Algorithm
The typography system is consistently derived and infinitely scalable. Levels are named objectively by their pixel size. Both Work Sans and JetBrains Mono use the same scale — they match at every tier.

The scale is built on a 16px baseline: `16 → 24 → 32 → 48 → 64 → 96 → 128`.

If you need a size larger than 128px (e.g., 256px), extrapolate using this algorithm starting from the 16px baseline:
- **Size:** Multiply by 2.
- **Base Weight:** Add +100 for each doubling of size (Max: 900).
- **Bolded Weight:** Base weight + 200 (Max: 900).
- **Line Height:** Add +0.2 for each halving of size (e.g., 128px → 0.80, down to 16px → 1.40).
- **Tracking:** Subtract -2% (-0.02em) for each doubling of size (floor: 0%).
---
## The Scale (both typefaces)

| Level | Token | px (screen) | rem (web) | pt (print) | Base Weight | Bolded | Line height | Tracking |
|---|---|---|---|---|---|---|---|---|
| **Text-8x** | `--text-8x` | 128px | 8rem | 96pt | Bold (700) | 900 | 0.80 | -6% |
| **Text-6x** | `--text-6x` | 96px | 6rem | 72pt | Semibold (600) | **850** | 0.90 | -5% |
| **Text-4x** | `--text-4x` | 64px | 4rem | 48pt | Semibold (600) | 800 | 1.00 | -4% |
| **Text-3x** | `--text-3x` | 48px | 3rem | 36pt | Medium (500) | **700** | 1.10 | -3% |
| **Text-2x** | `--text-2x` | 32px | 2rem | 24pt | Medium (500) | 700 | 1.20 | -2% |
| **Text-1.5x** | `--text-1.5x` | 24px | 1.5rem | 18pt | Regular (400) | **600** | 1.30 | -1% |
| **Text-1x** | `--text-1x` | 16px | 1rem | 12pt | Regular (400) | 600 | 1.40 | 0% |

*(Note: Text-16x was retired — no longer a defined Figma text style; use the extrapolation algorithm above if a size beyond Text-8x is ever needed.)*
---
## Small-viewport variants (confirmed against Figma)
Style names carry a `-s` suffix for small viewports in Figma (e.g., `Text-1s` = Text-1x at small viewports). In CSS, the suffix is `-sm` (e.g., `--text-1x-sm`), matching the breakpoint naming in the spacing tokens.

**Display tiers use the ×0.75 rule** (mobile px = print pt). **Text-1x is the one exception — it is held at 16px.**

| Level | Desktop | Mobile | Leading |
|---|---|---|---|
| Text-8x | 128px | 96px (`Text-8s`) | 0.80 |
| Text-6x | 96px | 72px (`Text-6s`) | 0.90 |
| Text-4x | 64px | 48px (`Text-4s`) | 1.00 |
| Text-3x | 48px | 36px (`Text-3s`) | 1.10 |
| Text-2x | 32px | 24px (`Text-2s`) | 1.20 |
| Text-1.5x | 24px | 18px (`Text-1.5s`) | 1.30 |
| **Text-1x** | 16px | **16px — held** (`Text-1s`) | 1.40 |

**Why Text-1x does not scale.** Display type has no legibility floor — extreme scale is the brand's point, and ×0.75 serves it. Body copy does have a floor, and every reference system holds it: Material 3 keeps `bodyLarge` at 16sp while adapting display sizes across form factors; Apple keeps Body at 17pt while Large Title shifts. At the previous 12px, Skillit's mobile body sat below Material's `bodyMedium` (14sp), below Apple's Body (17pt), and below Tailwind's `text-base` (16px) — it was a caption size doing a body job. Two concrete consequences drove the change: iOS Safari auto-zooms any form input under 16px, which broke the signup flow; and the audience reads on job sites in direct sun, the same condition that already dictates solid-fill iconography.

The cost is accepted deliberately: mobile px = print pt no longer holds for Text-1x (16px screen, 12pt print). 12pt remains correct for print body regardless of screen size, so the two values are right for their own media. Print parity still holds for every display tier.

Sub-16px text on mobile is not available from the primary scale. Metadata, badges, and captions use the functional UI tokens.
---
## Functional type scale (UI)
These tokens cover UI surfaces (app, dashboard, labels, captions) where the primary hierarchy doesn't apply directly.

|| Token | Role | Size | Weight | Line height | Letter spacing |
||---|---|---|---|---|---|
|| `--text-0.75x` | Labels, tags, badges, captions — minimum size | `0.75rem` (12px) | 550 | 1.4 | `0.04em` |
|| `--text-1x` | Default UI body, all running copy | `1rem` (16px) | 400 | 1.4 | `0` |
---
## CSS custom properties (copy-paste ready)
```css
/* Google Fonts import — add to <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet"> */
:root {
  /* Families */
  --font-primary:   'Work Sans', sans-serif;
  --font-mono:      'JetBrains Mono', monospace;
  /* Primary hierarchy — absolute size naming */
  /* Text-8x */
  --text-8x:               8rem;
  --text-8x-weight:        700;
  --text-8x-weight-bold:   900;
  --text-8x-leading:       0.80;
  --text-8x-tracking:      -0.06em;
  --text-8x-print:         96pt;
  --text-8x-sm:            clamp(6rem, 5.1713rem + 3.5359vw, 8rem);
  /* Text-6x */
  --text-6x:               6rem;
  --text-6x-weight:        650;
  --text-6x-weight-bold:   850;
  --text-6x-leading:       0.90;
  --text-6x-tracking:      -0.05em;
  --text-6x-print:         72pt;
  --text-6x-sm:            clamp(4.5rem, 3.8785rem + 2.6519vw, 6rem);
  /* Text-4x */
  --text-4x:                4rem;
  --text-4x-weight:         600;
  --text-4x-weight-bold:    800;
  --text-4x-leading:        1.00;
  --text-4x-tracking:       -0.04em;
  --text-4x-print:          48pt;
  --text-4x-sm:             clamp(3rem, 2.5856rem + 1.768vw, 4rem);
  /* Text-3x */
  --text-3x:                3rem;
  --text-3x-weight:         550;
  --text-3x-weight-bold:    700;
  --text-3x-leading:        1.10;
  --text-3x-tracking:       -0.03em;
  --text-3x-print:          36pt;
  --text-3x-sm:             clamp(2.25rem, 1.9392rem + 1.326vw, 3rem);
  /* Text-2x */
  --text-2x:                2rem;
  --text-2x-weight:         500;
  --text-2x-weight-bold:    700;
  --text-2x-leading:        1.20;
  --text-2x-tracking:       -0.02em;
  --text-2x-print:          24pt;
  --text-2x-sm:             clamp(1.5rem, 1.2928rem + 0.884vw, 2rem);
  --text-2x-mono:            1.8125rem; /* 29px — confirmed Figma value, round(32 * 0.9) */
  /* Text-1.5x */
  --text-1\.5x:              1.5rem;
  --text-1.5x-weight:       450;
  --text-1\.5x-weight-bold:  600;
  --text-1\.5x-leading:      1.30;
  --text-1\.5x-tracking:     -0.01em;
  --text-1\.5x-print:        18pt;
  --text-1\.5x-sm:           clamp(1.125rem, 0.9696rem + 0.663vw, 1.5rem);
  /* Text-1x */
  --text-1x:                1rem;
  --text-1x-weight:         400;
  --text-1x-weight-bold:    600;
  --text-1x-leading:        1.40;
  --text-1x-tracking:       0em;
  --text-1x-print:          12pt;
  --text-1x-weight: 400;
  --text-1x-weight-bold: 600;
  --text-1x-leading: 1.40;
  --text-1x-tracking: 0em;
  --text-1x-sm: 1rem;
  --text-0.75x: 0.75rem;  /* Text-0.75x — labels, tags, badges, captions. 12px. bolded: 600. */
  --text-0.75x-weight: 550;
  --text-0.75x-leading: 1.40;
  --text-0.75x-tracking: 0.04em;

  /* Button padding — paired with text tiers, 0.5em / 1em tactile ratio */
  --padding-0.75x: 0.25rem 0.5rem;   /* 4px / 8px — Text-0.75x (12px) */
  --padding-1x:    0.5rem 1rem;       /* 8px / 16px — Text-1x (16px) */
  --padding-1.5x:  0.75rem 1.5rem;    /* 12px / 24px — Text-1.5x (24px) */
  --padding-2x:    1rem 2rem;         /* 16px / 32px — Text-2x (32px) */

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
- **`--text-1x` and above:** Work Sans Regular (400) minimum. Line height 1.6. Never below 1.4.
- **`--text-1x`:** Work Sans Regular (400) minimum. Line height 1.6. Never below 1.4.
- Maximum line length for body: 70 characters (`max-width: var(--max-width-text)`).
### Variable Font & Optical Balancing
Work Sans is implemented as a variable font (`wght@100..900`).
- **Optical Balancing:** If text must appear on a non-Skillit dark surface, subtract approximately 25 units of font weight to account for halation. Skillit layout surfaces remain Canvas or Plaster. Adjust by eye; this is a heuristic, not a fixed rule.
- **Micro-interactions:** Use CSS transitions on the `font-weight` axis (e.g., `400` to `600`) for fluid hover states on navigation links and buttons, rather than abrupt jumps.
### Monospace / metadata
- Use `--font-mono` for: timestamps, worker IDs, distances, file sizes, any numeric data string.
- Never use monospace for labels, body copy, or headings.
- Signals "machine data" vs. "human content" — a core visual distinction in the system.
### Italics & Emphasis
- **Emphasis:** Use italics strictly to highlight specific words within a sentence.
- **Titles of Works:** Use italics for book names, publications, and articles.
- **No Decorative Use:** Do not use italics for entire blocks of text (like blockquotes).
### Spacing & Indentation
To lock text into the rigid 8px/16px baseline grid, vertical spacing between text elements uses absolute tokens regardless of the font size. **Never use relative `em` margins.**

- **Paragraphs:** 16px (`--space-4`). The standard gap between paragraphs.
- **Text Lists:** 8px (`--space-2`). Items in a bulleted or numbered text list sit tighter together so the list reads visually as a single, cohesive block of information.
- **UI Lists:** 16px (`--space-4`). Interactive lists (like a feed of jobs in the app) use a wider gap to protect the 40px minimum touch target rule.

**Blockquotes**
- **Container:** Place quotes inside a Plaster (`#FFFFFF`) card container with 16px border radius. It uses standard card padding.
- **Headshot sizing:** Lock headshots to 128px desktop / 64px mobile — never scale by font-size ratio. See `components/quotes.md`.
- **Typography:** Roman only. Do not italicize the entire quote (reserve italics for emphasis or titles of works).
- **Attribution:** Name in Semibold (600), title/company in Regular (400). Accent color: Traffic Cone for the attribution name.
- **No opening/closing quotation marks** in the card — the card itself signals the quote.
- **If a quote runs longer than three lines,** reduce to Body (16px) and increase leading to 1.5.

### Typographic Punctuation
- **Smart Quotes:** Always use angled (smart) quotation marks (`"` `"` ) and apostrophes (`'`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for code; angled quotes are for reading.
- **Hanging Punctuation (Optical Margin Alignment):** Because layouts are flush-left, opening quotation marks on the first line of a paragraph or pull quote must hang *outside* the bounding box. This ensures the first letters of every line form a perfectly flush vertical grid line. Do not hang bullets or list numbers.

### Widows and Orphans
- **The Rule:** Never leave a single word alone on the last line of a paragraph or headline. They create visual holes that break the structural mass of the text block and severely damage readability and scannability.
- **Manual Tracking Adjustment (Primary Fix):** To fix widows and orphans on static or editorial surfaces, adjust the tracking (letter-spacing) of the text block by up to `±2%` (`±0.02em`). This is the preferred method because it imperceptibly compresses or expands the text to force a re-wrap without creating a ragged visual hole at the end of the previous line.
- **The Soft Break Injection (Secondary Fix):** If tracking adjustment isn't feasible, insert a soft break opportunity (`&wbr;` in HTML, or a manual soft line break — Shift+Enter in Figma/most editors) before the word that would otherwise orphan. Unlike a non-breaking space, this doesn't force a permanent gap: the browser only breaks there if the line actually needs it, so the fix disappears cleanly at wider viewports instead of leaving stray glue between two words that no longer need to wrap.
- **In Engineering:** Apply `text-wrap: balance;` to all Display, Heading, and H2 elements. Apply `text-wrap: pretty;` to Body copy (`p`). Because browser support for `pretty` is not absolute, the manual `&wbr;` injection above is required as a fallback for all critical marketing copy. Use `orphans: 2; widows: 2;` in print stylesheets.

### What not to do
- Do not use `font-weight: 300` (Light) — too thin for job-site legibility.
- Do not use any typeface other than Work Sans.
- Do not set letter-spacing on UI text below `--text-1x` — it reduces legibility at small sizes.
- Do not use the primary hierarchy sizes in UI components — they are for editorial/marketing surfaces only.

### Responsive Scaling (Desktop to Mobile)
- **The Rule:** Scale display text sizes down smoothly to a minimum of half the size at mobile breakpoints (e.g., a desktop 128px becomes 64px on mobile). However, **keep the original weights** (do not scale down the font-weight) to maintain the visual hierarchy and density.
- **Body Text Exception:** Body text does **not** scale on mobile. `Text-1x` holds at 16px (`Text-1s` = 16px) — see "Why Text-1x does not scale" above. UI text (`--text-1x`) also holds its size; the 40px touch target rule governs app surfaces, not display.
