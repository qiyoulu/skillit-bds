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
| **Text-256** |  | 256px |  | 192pt | Extra Bold (800) | Black (900) | 0.80 |  |
| **Text-128** |  | 128px |  | 96pt | Bold (700) | Extra Bold (800) | 0.80 | -4% |
| **Text-64** |  | 64px |  | 48pt | Semibold (600) | Bold (700) | 0.90 | -3% |
| **Text-32** |  | 32px |  | 24pt | Medium (500) | Semibold (600) | 1.00 | -2% |
| **Text-16** |  | 16px |  | 12pt | Regular (400) | Medium (500) | 1.10 | -1% |

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
  /* Text-256 */
  --text-256:               16rem;
  --text-256-weight:        800;
  --text-256-weight-bold:   900;
  --text-256-leading:       0.80;
  --text-256-tracking:      -0.04em;

  /* Text-128 */
  --text-128:               8rem;
  --text-128-weight:        700;
  --text-128-weight-bold:   800;
  --text-128-leading:       0.90;
  --text-128-tracking:      -0.03em;

  /* Text-64 */
  --text-64:                4rem;
  --text-64-weight:         600;
  --text-64-weight-bold:    700;
  --text-64-leading:        0.90;
  --text-64-tracking:       -0.03em;

  /* Text-32 */
  --text-32:                2rem;
  --text-32-weight:         500;
  --text-32-weight-bold:    600;
  --text-32-leading:        1.00;
  --text-32-tracking:       -0.02em;

  /* Text-16 */
  --text-16:                1rem;
  --text-16-weight:         400;
  --text-16-weight-bold:    500;
  --text-16-leading:        1.10;
  --text-16-tracking:       -0.01em;

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

- **Text-256:** Massive brand moments, event banners, numbers/stats at extreme scale.
- **Text-128:** Hero headlines at massive scale.
- **Text-64:** Standard headlines, campaign statements, large callouts.
- **Text-32:** Section headings, page titles, pull quotes.
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
- **The Non-Breaking Space Injection:** You must manually inject a non-breaking space (`&nbsp;`) between the final two words of any paragraph, description, or headline. (e.g., `at&nbsp;scale.`, `deployed&nbsp;faster.`). This mechanically prevents the final word from wrapping alone.
- **In Engineering:** Apply `text-wrap: balance;` to all Display, Heading, and H2 elements. Apply `text-wrap: pretty;` to Body copy (`p`). Because browser support for `pretty` is not absolute, the manual `&nbsp;` injection above is mandatory for all critical marketing copy. Use `orphans: 2; widows: 2;` in print stylesheets.

### What not to do
- Do not use `font-weight: 300` (Light) — too thin for job-site legibility.
- Do not use any typeface other than Work Sans.
- Do not set letter-spacing on UI text below `--text-ui` — it reduces legibility at small sizes.
- Do not use the primary hierarchy sizes in UI components — they are for editorial/marketing surfaces only.
