# Buttons — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

## Primary button
The main CTA. One per section maximum. Traffic Cone background, Iron text (Canvas on Cone is banned — 2.83:1, see `rules/accessibility.md`).
```css
.btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone #EF6F1A */
  color: var(--color-foreground);                   /* Iron text #232F36 — 4.54:1 AA */
  font-family: var(--font-primary);
  font-size: var(--text-ui);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: 1em 2em;                /* vertical = 1x font size, horizontal = 2x */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-primary:hover { background-color: var(--color-primary-hover); }
.btn-destructive:hover { background-color: var(--color-error-hover); }
.btn-warning:hover { background-color: var(--color-warning-hover); }
.btn-success:hover { background-color: var(--color-success-hover); }
.btn-primary:focus-visible {
   outline: 2px solid var(--color-foreground-hover);   /* Iron hover ring — neutral */
  outline-offset: 2px;
}
```

## Button hover
Filled buttons use their matching per-color hover token. No secondary button class exists in the current system.

## CTA Button (inverted)
For primary actions inside structured blocks. Iron text on Traffic Cone, same as the standard primary button — consistent across all surfaces.
```css
.surface-structured .btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone */
  color: var(--color-foreground);                   /* Iron text */
}
```
**Label rules:**
- Sentence-case imperative. "Join" / "Apply" / "See the network." Never "Click here" or "Submit form."
- **Strict Consistency:** All buttons that point to the exact same destination page should use the exact same label across the entire platform. If the primary account creation CTA is "Join", do not alternate it with "Get started", "Create your profile", or "Sign up" elsewhere on the page. Pick one label per destination and lock it.

## Destructive button
For irreversible actions only. Toolbox background.
```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-background);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  font-weight: var(--weight-semibold);
  padding: 1em 2em;                /* vertical = 1x font size, horizontal = 2x */
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
}
```
