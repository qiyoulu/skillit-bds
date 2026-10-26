# Cards — Skillit Kit BDS
**Last updated:** 2026-10-24
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Standard card
Feature cards (quote cards, author blocks, standalone panels) use generous padding (tactile). Because borders and drop shadows are banned, cards separate from the Canvas ground purely through the optical contrast of their Plaster (`#FFFFFF`) background and strong typographic layout.

**Corner radii by function:**
- **Cards, containers, panels:** `16px` (`--radius-sharp`)
- **Button-like controls:** pill (`--radius-pill`); links and editable inputs remain actions without becoming pill containers. Interactive cards retain their 16px container geometry.
- **Input fields, checkboxes:** `0px` — structural, editable. Outside the radius token system; no intermediate or softened corners permitted.
- **Static tags inside a card:** `0px`; see `components/badges.md`.

**No drop shadows.** Cards separate from the Canvas ground through Plaster background contrast and typographic structure alone.

**No top stroke.** The top border/stroke on cards was a bug — it has been removed from the system.

```css
/* Standard structural card */
.card {
  background-color: var(--color-surface);  /* Plaster */
  border: none;                            /* No borders */
  border-radius: var(--radius-sharp);    /* 16px */
  padding: var(--space-8);                 /* 32px — tactile, all sizes */
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
/* Selected state — a persistent fill, carried by the checked indicator, never color alone.
   The fill matches hover, so a selected card shows the Traffic Cone checkbox (checkboxes.md)
   and does not change again on hover. */
.card-interactive[aria-selected="true"] {
   background-color: var(--color-surface-hover);
   color: var(--color-foreground);
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

## List card
Cards that repeat in a grid or list (job listings, search results, resource lists) use `--space-4` (1rem, 16px) padding on every side, at every size. Repeated, scannable cards read better dense. The generous 32px stays with feature cards.

- Same surface as the standard card: Plaster, `--radius-sharp` (16px), no border, no shadow.
- Padding in `rem`: `--space-4`. Do not write `16px`.
- Gap between list cards: `--space-4` (16px), horizontal and vertical alike (`gap: var(--space-4)`), in a grid and in a single-column list, at every width. It equals the card padding. The page side margin stays at `--space-gutter`.
- Content width inside a list card at 16px padding: 357px in a 389px three-column card (1280), 277px in a 309px card (1024), 312px in a 344px two-column card (768), 326px in a 358px card (390). Design the card content for 277px, the tightest case.
- One tier per page region. Do not mix list and feature cards in the same grid.
- Quote cards are not list cards. Their opening mark needs 24px or 32px (`components/quote-cards.md`).

```css
/* List card — repeated, scannable */
.card-list {
  background-color: var(--color-surface);  /* Plaster */
  border: none;
  border-radius: var(--radius-sharp);      /* 16px */
  padding: var(--space-4);                 /* 16px — dense, repeated */
  box-shadow: none;
}
```
A list card that links takes the `.card-interactive` focus and hover rules above; combine the classes.
