# Text Links — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

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
   outline: 2px solid var(--color-foreground-hover);     /* Iron hover ring — neutral */
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
