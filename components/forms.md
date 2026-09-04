# Form Inputs — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

## Input fields
Fields are **Plaster on Canvas** — the surface separates them from the ground, same as cards. A bottom Iron drafting line keeps the type affordance. State is signaled by a status indicator (drawn icon) plus message text, never by changing the border. Colored borders are not a color usage (see `tokens/docs/color.md`: colors = text fill, button bg fill, or icons).
```css
.input {
  background-color: var(--color-surface); /* Plaster — field separated from Canvas ground */
  border: none;
  border-bottom: 2px solid var(--color-foreground); /* Iron — drafting line (neutral, structural) */
  border-radius: 16px;
  color: var(--color-foreground);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  padding: var(--space-3) var(--space-2);  /* 12px 8px — tactile */
  width: 100%;
}
.input:focus {
   outline: 2px solid var(--color-primary);      /* Traffic Cone focus ring */
  outline-offset: 2px;
  border-bottom-color: var(--color-foreground);    /* line stays Iron */
}
.input::placeholder {
   color: var(--color-foreground-hover);
}
```
**Labels:** Above the field, not inside (placeholder is not a label). `--text-1x` size, `--weight-medium`, Iron.
**Error state:** Field unchanged. Error icon (Toolbox, octagon) beside the field + message below in Toolbox, `--text-1x`. Icon + text carry the signal — never a colored border.
**Success state:** Field unchanged. Checkmark icon (Bottle Glass) alongside. No border change.
