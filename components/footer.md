# Footer — Skillit Kit BDS
**Last updated:** 2026-10-24
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Footer
The footer anchors the bottom of the page using the Canvas ground and Iron text. It uses a flush-left vertical stack for the brand and a multi-column grid for navigation.
```css
.footer {
  background-color: var(--color-background); /* Canvas */
  color: var(--color-foreground); /* Iron */
  padding: var(--space-128) 0; /* macro vertical spacing, never macro side gutters */
}
.footer-inner {
  box-sizing: border-box;
  width: 100%;
  padding-inline: var(--space-gutter); /* 16px to 512px, 32px at 768px */
  max-width: calc(var(--max-width-content) + 2 * var(--space-gutter));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: var(--space-128);
}
.footer-brand {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}
.footer-copyright {
  color: var(--color-foreground);
}
.footer-columns {
  display: flex;
  gap: var(--space-128);
}
.footer-col {
  display: flex;
  flex-direction: column;
}
.footer .nav-link {
  color: var(--color-foreground); /* Iron links on Canvas */
  display: block;
  margin-bottom: var(--space-8);
}
.footer .nav-link:hover {
  color: var(--color-foreground);         /* stays Iron: hover is the underline alone */
  text-decoration: underline;
}
.footer .nav-link:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
@media (max-width: 1279px) {
  .footer-inner { flex-direction: column; gap: var(--space-8); }
  .footer-columns { flex-wrap: wrap; gap: var(--space-8); }
}
```
The logo in the footer should be `lockup.svg` with `color: var(--color-foreground)` on the container. Below 1280px, this hides and is replaced by `mark.svg` the same way as in the header. SKILLIT Hire pages keep the SKILLIT Hire lockup at every width instead.
