# Typography Tokens — Skillit BDS

**Last updated:** 2026-07-12

---

## Rules before you use this file

- Use only Work Sans. Never substitute with system fonts, other Google Fonts, or unlicensed alternatives.
- Work Sans is the only typeface. It loads from Google Fonts — zero configuration needed.
- All sizes are in `rem` (base 16px). Never use `px` for type — it breaks accessibility scaling.
- All text must be sentence-case. No title case in UI. No ALL CAPS anywhere.

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
- **Line Height:** Subtract -0.1 for each doubling of size (Hard floor: 0.8).
- **Tracking:** Subtract -1% (-0.01em) for each doubling of size.

| Level | Token | px (screen) | rem (web) | pt (print) | Base Weight | Bolded | Line height | Tracking |
|---|---|---|---|---|---|---|---|---|
| **Text-160** |  | 160px |  | 120pt | Extra Bold (800) | Black (900) | 0.80 |  |
| **Text-80** |  | 80px |  | 60pt | Bold (700) | Black (900) | 0.90 |  |
| **Text-40** |  | 40px |  | 30pt | Semibold (600) | Extra Bold (800) | 1.00 |  |
| **Text-20** |  | 20px |  | 15pt | Medium (500) | Bold (700) | 1.10 |  |
| **Text-16** |  | 16px |  | 12pt | Regular (400) | Semibold (600) | 1.25 |  |

*(Note: Text-16 is the accessibility floor for body copy and operates slightly outside the strict 2x multiplier rule to protect legibility).*

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

## Monospace stack (metadata)

All metadata — timestamps, worker IDs, distances, file sizes, statistics — must use a monospace stack to visually separate machine data from human text.

```css
--font-mono: 'SF Mono', 'Fira Code', 'Courier New', monospace;
```

This is a system font stack — no CDN required. Use it only for data strings, never for UI labels or body copy.

---

## CSS custom properties (copy-paste ready)

```css
/* Google Fonts import — add to <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap" rel="stylesheet"> */

:root {
  /* Families */
  --font-primary:   'Work Sans', sans-serif;
  --font-mono:      'SF Mono', 'Fira Code', 'Courier New', monospace;

  /* Primary hierarchy — absolute size naming */
  /* Text-160 */
  --text-160:               10rem;
  --text-160-weight:        800;
  --text-160-weight-bold:   900;
  --text-160-leading:       0.80;
  --text-160-tracking:      -0.04em;

  /* Text-80 */
  --text-80:                5rem;
  --text-80-weight:         700;
  --text-80-weight-bold:    900;
  --text-80-leading:        0.90;
  --text-80-tracking:       -0.03em;

  /* Text-40 */
  --text-40:                2.5rem;
  --text-40-weight:         600;
  --text-40-weight-bold:    800;
  --text-40-leading:        1.00;
  --text-40-tracking:       -0.02em;

  /* Text-20 */
  --text-20:                1.25rem;
  --text-20-weight:         500;
  --text-20-weight-bold:    700;
  --text-20-leading:        1.10;
  --text-20-tracking:       -0.01em;

  /* Text-16 */
  --text-16:                1rem;
  --text-16-weight:         400;
  --text-16-weight-bold:    600;
  --text-16-leading:        1.25;
  --text-16-tracking:       0;

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

  /* Optical Balancing for Dark Backgrounds (Halation compensation) */
  --weight-regular-dark:    370;
  --weight-medium-dark:     470;
  --weight-semibold-dark:   570;
  --weight-bold-dark:       670;
  --weight-extrabold-dark:  770;
  --weight-black-dark:      870;
}
```

---

## Usage rules

### Primary hierarchy (marketing, digital, editorial, print)

- **Text-160:** Massive brand moments, event banners, numbers/stats at extreme scale.
- **Text-80:** Hero headlines, campaign statements, large callouts.
- **Text-40:** Section headings, page titles.
- **Text-20:** Subsection headings, pull quotes, captions at emphasis scale.
- **Text-16:** All running copy, paragraph text.

### Functional UI scale (app, dashboard)

- **`--text-ui` and above:** Work Sans Regular (400) minimum. Line height 1.6. Never below 1.4.
- **`--text-label`:** Work Sans Medium (500). Always sentence-case. Minimum size — do not go smaller.
- Maximum line length for body: 70 characters (`max-width: var(--max-width-text)`).


### Variable Font & Optical Balancing
Work Sans is implemented as a variable font (`wght@100..900`). 
- **Optical Balancing:** White text on dark backgrounds creates an optical illusion (halation) making it appear thicker. To maintain perfect visual consistency, subtract 30 weight units from any text placed on a dark background (Iron, Cord, Toolbox, Lumber). E.g., `font-weight: var(--weight-regular-dark);` (370) instead of 400.
- **Micro-interactions:** Use CSS transitions on the `font-weight` axis (e.g., `400` to `600`) for fluid hover states on navigation links and buttons, rather than abrupt jumps.

### Monospace / metadata
- Use `--font-mono` for: timestamps, worker IDs, distances, file sizes, any numeric data string.
- Never use monospace for labels, body copy, or headings.
- Signals “machine data” vs. “human content” — a core visual distinction in the system.

### Typographic Punctuation
- **The Rule:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy.
- **Why:** Straight quotes are for code. Angled quotes are for reading. In a highly crafted typography system, straight quotes signal a lack of attention to detail.

### Widows and Orphans
- **The Rule:** Never leave a single word alone on the last line of a paragraph or headline. They create visual holes that break the structural mass of the text block.
- **In Engineering:** Apply `text-wrap: balance;` to all Display, Heading, and H2 elements. Apply `text-wrap: pretty;` to Body copy. Use `orphans: 2; widows: 2;` in print stylesheets.
- **In Content:** Use a non-breaking space (`&nbsp;`) between the last two words of critical text strings or short descriptions.

### What not to do
- Do not use `font-weight: 300` (Light) — too thin for job-site legibility.
- Do not use any typeface other than Work Sans.
- Do not set letter-spacing on UI text below `--text-ui` — it reduces legibility at small sizes.
- Do not use the primary hierarchy sizes in UI components — they are for editorial/marketing surfaces only.
