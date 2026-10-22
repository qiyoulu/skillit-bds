# Badges & Status Indicators — Skillit Kit BDS
**Last updated:** 2026-10-22
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Status badges
Status badges are **drawn icons with clear labels**. Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone. The glyph supports the message; outer shape is not an information-type code (see `rules/accessibility.md`). Status badges have no colored chip background; their icons use semantic success green, warning yellow, error red, or info blue. The existing approved info text remains Painter’s Tape. Do not confuse badges with actionable selection chips or neutral progress/data roles in `tokens/docs/color.md`. Hard Hat on Plaster is below 3:1; assess whether the warning glyph is essential, retain a fully explicit label, and do not claim a contrast pass (`rules/accessibility.md`).
```css
/* Base badge — icon + label, no colored background */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-primary);
  font-size: var(--text-1x);            /* 1rem */
  font-weight: var(--weight-medium);       /* 500 */
  padding: var(--space-1) var(--space-2); /* 4px 8px */
}
/* Semantic host paint + supplied silhouette + label; label colors remain unchanged. */
.badge-success .icon { color: var(--color-success); } /* Bottle Glass — circle */
.badge-warning .icon { color: var(--color-warning); } /* Hard Hat — triangle */
.badge-error .icon { color: var(--color-error); } /* Toolbox — octagon */
.badge-info .icon { color: var(--color-link); } /* Painter’s Tape — supplied information circle */
/* Info — Painter's Tape text, no underline. */
.badge-info {
  color: var(--color-link);                /* Painter's Tape #007CA6 — info, no underline */
  text-decoration: none;                   /* never inherits link underline */
}
```

## Static tag
A static tag is a short, non-interactive label on a card or list row, such as "New" or "Close to you". It states a fact about the item. It never acts, so it takes the square shape; pills are for actions.

- **Shape:** `border-radius: 0`. No outline, no border, no shadow.
- **Fill:** Canvas on a Plaster card; Plaster on a Canvas surface. The fill is the only container cue.
- **Text:** Iron (`--color-foreground`), Text-0.75x (`--text-0.75x`), weight 600, sentence case. No semantic or accent color in the label.
- **Padding:** `--space-1.5` (6px) vertical, `--space-3` (12px) horizontal, the 0.5× / 1× ratio of Text-0.75x. Compact controls use `--padding-0.75x`, the same pair.
- **Icon:** none. At 12px text the tag is too small for a legible 16px icon.
- **Gap:** `--space-2` (8px) between tags. Two tags per card at most.
- **Not interactive:** no hover, no pointer cursor, no focus ring, no `role="button"`. If it acts (filters, toggles), it is a chip, not a tag; use the pill chips in `components/buttons.md`.
- **Contrast:** Iron on Canvas is above 11:1; Iron on Plaster is higher. Do not set tag text in Traffic Cone: 12px orange text on Canvas is about 2.8:1.
- **Status colors:** a tag that reports status (success, warning, error, info) is a status badge (see above), not a static tag.

```css
.tag {
  display: inline-block;
  background-color: var(--color-background);   /* Canvas on a Plaster card */
  color: var(--color-foreground);              /* Iron */
  border: none;
  border-radius: 0;
  padding: var(--space-1\.5) var(--space-3);   /* 6px 12px */
  font-family: var(--font-primary);
  font-size: var(--text-0\.75x);
  font-weight: var(--weight-semibold);          /* 600 */
  line-height: var(--text-0\.75x-leading);
  letter-spacing: var(--text-0\.75x-tracking);
}
.tag + .tag { margin-left: var(--space-2); }
```

