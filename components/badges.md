# Badges & Status Indicators — Skillit Kit BDS
**Last updated:** 2026-10-08
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
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
