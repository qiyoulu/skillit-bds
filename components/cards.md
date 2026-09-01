# Cards — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

## Standard card
Cards use generous padding (tactile). Because borders and drop shadows are banned, cards separate from the Canvas ground purely through the optical contrast of their Plaster (`#FFFFFF`) background and strong typographic layout.
```css
/* Standard structural card */
.card {
  background-color: var(--color-surface);  /* Plaster */
  border: none;                            /* No borders */
  border-radius: 16px;
  padding: var(--space-16);                /* 64px — tactile */
}
/* Cards separate from Canvas ground through Plaster background contrast — no borders. */
.card-interactive {
  cursor: pointer;
}
/* Interactive cards: hover state uses the Plaster hover token. */
.card-interactive:hover {
   background-color: var(--color-surface-hover);
}
/* Active / selected state — Plaster hover surface with Iron text */
.card-interactive[aria-selected="true"] {
   background-color: var(--color-surface-hover);
   color: var(--color-foreground);
}
@media (max-width: 768px) {
  .card { padding: var(--space-8); }        /* 32px — tactile mobile */
}
/* Structured surface */
.surface-structured {
  background-color: var(--color-surface);         /* Plaster */
  color: var(--color-foreground);                 /* Iron */
  border: none;
  border-radius: 16px;
  padding: var(--space-8);                 /* Generous padding for heavy blocks */
}
```
