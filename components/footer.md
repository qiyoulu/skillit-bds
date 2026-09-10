# Footer — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Footer
The footer anchors the bottom of the page using the Canvas ground and Iron text. It uses a flush-left vertical stack for the brand and a multi-column grid for navigation.
```css
.footer {
  background-color: var(--color-foreground);      /* Iron */
  color: var(--color-background);                 /* Canvas */
  padding: var(--space-128);
}
.footer-inner {
   max-width: var(--max-width-content);
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
   color: var(--color-background-hover);           /* Canvas hover — muted Canvas on Iron bg, 11:1 */
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
  color: var(--color-surface);                  /* Plaster links on Iron */
  display: block;
  margin-bottom: var(--space-8);
}
.footer .nav-link:hover {
  color: var(--color-primary);             /* Traffic Cone hover */
}
```
The logo in the footer should be `lockup.svg` with `color: var(--color-foreground)` on the container. On smaller viewports, this hides and is replaced by `mark.svg` the same way.
