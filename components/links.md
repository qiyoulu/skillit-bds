# Text Links — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Links
Links are Painter's Tape, always underlined. Never a fill, never a button-style treatment.
```css
a {
  color: var(--color-link);               /* Painter's Tape #007CA6 */
  text-decoration: underline;
  text-underline-offset: 2px;
}
a:hover {
  text-decoration-thickness: 2px;
}
a:focus-visible {
   outline: 2px solid var(--color-primary);     /* Traffic Cone focus; Canvas contrast exception — see accessibility.md */
  outline-offset: 2px;
  border-radius: 0;
}
```
**On non-Skillit dark backgrounds:** Use Canvas underlined text instead of Painter's Tape — Painter's Tape does not pass contrast on dark surfaces.

## Photography & Media
Photography uses multiply only when placed on a light background and intended to integrate with the Canvas ground.
```css
.photo-on-light-background {
  mix-blend-mode: multiply;
  display: block;
  width: 100%;
  height: auto;
}
```
