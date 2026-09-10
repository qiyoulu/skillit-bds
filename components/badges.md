# Badges & Status Indicators — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Status badges
Status badges are **drawn icons** — the shape carries the state (shape coding in `rules/accessibility.md`), the label carries the text. No colored chips: colors appear only as text fill (info), button bg fill, or icon fill (`tokens/docs/color.md`).
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
/* State color lives in the icon fill; labels stay Iron. */
.badge-success .icon { color: var(--color-success); }  /* Bottle Glass — circle / pill shape */
.badge-warning .icon { color: var(--color-warning); }  /* Hard Hat — triangle / chamfer */
.badge-error   .icon { color: var(--color-error); }    /* Toolbox — octagon */
/* Info — Painter's Tape text, no underline. */
.badge-info {
  color: var(--color-link);                /* Painter's Tape #007CA6 — info, no underline */
  text-decoration: none;                   /* never inherits link underline */
}
```
