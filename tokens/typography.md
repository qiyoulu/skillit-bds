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

## Primary type hierarchy

Five levels. Display, Heading, and H2 follow a strict 2:1 ratio. Body breaks the ratio at 16px to maintain screen legibility — 16px is the accessibility floor for body copy.

| Level | Token | px (screen) | rem (web) | pt (print) | Weight | CSS weight | Line height | Leading (print) | Letter spacing |
|---|---|---|---|---|---|---|---|---|---|
| Poster |  | 160px |  | 120pt | Extra Bold | 800 | 0.85 | 102pt |  |
| Display | `--text-display` | 80px | `5rem` | 40pt | Bold | 700 | 0.9 | 36pt | `-0.03em` |
| Heading | `--text-heading` | 40px | `2.5rem` | 20pt | Semibold | 600 | 1.0 | 20pt | `-0.02em` |
| H2 | `--text-h2` | 20px | `1.25rem` | 15pt | Medium | 500 | 1.1 | 16.5pt | `-0.01em` |
| Body | `--text-body-primary` | 16px | `1rem` | 12pt | Regular | 400 | 1.25 | 15pt | `0` |

**Bolded variants within each level:**

| Level | Base weight | Base value | Bolded weight | Bolded value |
|---|---|---|---|---|
| Poster | Extra Bold | 800 | Black | 900 |
| Display | | 700 | Black | 900 |
| Heading | Semibold | 600 | Extra Bold | 800 |
| H2 | Medium | 500 | Bold | 700 |
| Body | Regular | 400 | Semibold | 600 |

---

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

  /* Primary hierarchy — px maps to screen, rem is web, pt is print */
  /* Poster:   160px / 10rem / 120pt */
  --text-poster:                10rem;
  --text-poster-weight:         800;   /* Extra Bold */
  --text-poster-weight-bold:    900;   /* Black */
  --text-poster-leading:        0.85;
  --text-poster-tracking:       -0.04em;

  /* Display:  80px / 5rem / 60pt */
  --text-display:           5rem;
  --text-display-weight:    700;   /* Bold */
  --text-display-weight-bold: 900; /* Black */
  --text-display-leading:   0.9;
  --text-display-tracking:  -0.03em;

  /* Heading:  40px / 2.5rem / 30pt */
  --text-heading:               2.5rem;
  --text-heading-weight:        600;   /* Semibold */
  --text-heading-weight-bold:   800;   /* Extra Bold */
  --text-heading-leading:       1.0;
  --text-heading-tracking:      -0.02em;

  /* H2:       20px / 1.25rem / 15pt */
  --text-h2:                1.25rem;
  --text-h2-weight:         500;   /* Medium */
  --text-h2-weight-bold:    700;   /* Bold */
  --text-h2-leading:        1.1;
  --text-h2-tracking:       -0.01em;

  /* Body:     16px / 1rem / 12pt */
  --text-body-primary:          1rem;
  --text-body-primary-weight:   400;   /* Regular */
  --text-body-primary-weight-bold: 600; /* Semibold */
  --text-body-primary-leading:  1.25;
  --text-body-primary-tracking: 0;

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

- **Poster (160px / 10rem / 120pt):** Massive brand moments, event banners, numbers/stats at extreme scale. Work Sans Extra Bold (800). Bolded: Black (900). Line height 0.85 / 102pt leading. Tracking −4%.
- **Display (80px / 5rem / 60pt):** Hero headlines, campaign statements, large callouts. Work Sans Bold (700). Bolded: Black (900). Line height 0.9 / 54pt leading. Tracking −3%.
- **Heading (40px / 2.5rem / 30pt):** Section headings, page titles. Work Sans Semibold (600). Bolded: Extra Bold (800). Line height 1.0 / 30pt leading. Tracking −2%.
- **H2 (20px / 1.25rem / 15pt):** Subsection headings, pull quotes, captions at emphasis scale. Work Sans Medium (500). Bolded: Bold (700). Line height 1.1 / 16.5pt leading. Tracking −1%.
- **Body (16px / 1rem / 12pt):** All running copy, paragraph text. Work Sans Regular (400). Bolded: Semibold (600). Line height 1.25 / 15pt leading. No tracking.

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
