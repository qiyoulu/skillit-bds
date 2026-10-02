# Cards — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Standard card
Cards use generous padding (tactile). Because borders and drop shadows are banned, cards separate from the Canvas ground purely through the optical contrast of their Plaster (`#FFFFFF`) background and strong typographic layout.

**Corner radii by function:**
- **Cards, containers, panels:** `16px` (`--radius-sharp`)
- **Button-like controls:** pill (`--radius-pill`); links and editable inputs remain actions without becoming pill containers. Interactive cards retain their 16px container geometry.
- **Input fields, checkboxes:** `0px` — structural, editable. Outside the radius token system; no intermediate or softened corners permitted.

**No drop shadows.** Cards separate from the Canvas ground through Plaster background contrast and typographic structure alone.

**No top stroke.** The top border/stroke on cards was a bug — it has been removed from the system.

```css
/* Standard structural card */
.card {
  background-color: var(--color-surface);  /* Plaster */
  border: none;                            /* No borders */
  border-radius: var(--radius-sharp);    /* 16px */
  padding: var(--space-16);                /* 64px — tactile */
  box-shadow: none;                        /* No drop shadows */
}
/* Cards separate from Canvas ground through Plaster background contrast — no borders. */
.card-interactive {
  cursor: pointer;
}
.card-interactive:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
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
  border-radius: var(--radius-sharp);           /* 16px */
  padding: var(--space-8);                        /* Generous padding for heavy blocks */
  box-shadow: none;                               /* No drop shadows */
}
```
