# Quotes — Skillit BDS
**Last updated:** 2026-09-05
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (`padding: 0.5em 1em`). This is a non-negotiable brand rule.

## Headshot sizing
Headshot size is **locked to the quote tier, not a ratio to the text**. Never scale the headshot by multiplying the font size — that couples image and text through the flex container, so shrinking the picture shrinks the textbox. Pick the pairing that matches the layout context:

| Tier | Headshot | Quote text | Use |
|---|---|---|---|
| Quote | 128px desktop / 64px mobile | Text-2x (32px, weight 500) | Pull quotes, hero quotes |

The headshot is `flex: 0 0 auto` at its fixed pixel size (128px). The text container sizes independently. On mobile (< 768px), the headshot drops to 64px.

## Quote card
Quotes sit in a Plaster (`--color-surface`) card with 16px corners and standard card padding. The headshot is circular (`border-radius: 999px`), aligned to the top-left of the card. Attribution (name, role, location) sits below the quote in Text-1x, weight 400, Iron.

```css
.quote-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  padding: var(--space-16);
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}
.quote-card .headshot {
  flex: 0 0 auto;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .quote-card .headshot {
    width: 64px;
    height: 64px;
  }
}
.quote-card .body {
  flex: 1;
  min-width: 0;   /* prevents flex blowout */
}
.quote-card .text {
  font-size: var(--text-1x);
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-foreground);
}
.quote-card .attribution {
  font-size: var(--text-1x);
  font-weight: 400;
  color: var(--color-foreground);
  margin-top: var(--space-4);
}
```

## Email quotes
In email (table-based HTML), the headshot uses `border-radius: 999px` on the img directly. The img sits in its own `<td>` with fixed width; the text sits in the adjacent `<td>`. Never use percentage widths on the headshot cell — fixed px only.
