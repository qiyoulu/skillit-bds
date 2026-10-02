# Metadata & Data Strings — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Metadata
All timestamps, IDs, distances, file sizes, and numeric data strings use the monospace stack.
```css
.meta {
  font-family: var(--font-mono);
  font-size: var(--text-0\.75x);           /* 12px metadata tier; family remains mono */
  font-weight: var(--text-0\.75x-weight);
  line-height: var(--text-0\.75x-leading);
  color: var(--color-foreground); /* opaque Iron; never fade small references */
  letter-spacing: var(--text-0\.75x-tracking);
}
```
This visually separates machine data from human content — a core distinction in the system. Chart footnotes and references use this approved Text-0.75x treatment: JetBrains Mono, 12px minimum at a 16px root, full-opacity Iron. No 14px tier or Iron-at-50% reference text.
