# Quote Cards — Skillit Kit BDS
**Last updated:** 2026-09-05
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.

## Headshot sizing
Headshot size is **locked to the quote tier, not a ratio to the text**. Never scale the headshot by multiplying the font size — that couples image and text through the flex container, so shrinking the picture shrinks the textbox. Pick the pairing that matches the layout context:

| Tier | Headshot | Quote text | Use |
|---|---|---|---|
| Quote | 128px desktop / 64px mobile | Text-2x (32px, weight 550) | Pull quotes, hero quotes |

The headshot is `flex: 0 0 auto` at its fixed pixel size (128px). The text container sizes independently. On mobile (< 768px), the headshot drops to 64px.

## Quote card
Quotes sit in a Plaster (`--color-surface`) card with 16px corners and standard card padding. The headshot is circular (`border-radius: 50%` on an equal-width/height image), aligned to the top-left of the card. This portrait geometry is an explicit exception, not a new container radius. Pull quotes use canonical Text-2x (550); longer quotes use Text-1x (450). Attribution sits below the quote in Text-1x, Iron: name 600, role/company/location 450. These values come from `tokens/tokens.json5` and its typography documentation.

```css
.quote-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-sharp);
  padding: var(--space-16);
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}
.quote-card .headshot {
  flex: 0 0 auto;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 767px) {
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
  font-family: var(--font-primary);
  font-size: var(--text-2x);
  font-weight: var(--text-2x-weight); /* 550 */
  line-height: var(--text-2x-leading);
  letter-spacing: var(--text-2x-tracking);
  color: var(--color-foreground);
}
.quote-card .attribution {
  font-size: var(--text-1x);
  font-family: var(--font-primary);
  font-weight: var(--text-1x-weight); /* 450 */
  line-height: var(--text-1x-leading);
  color: var(--color-foreground);
  margin-top: var(--space-4);
}
.quote-card .attribution .name { font-weight: var(--text-1x-weight-bold); /* 600 */ }
.quote-card--long .text {
  font-size: var(--text-1x);
  font-weight: var(--text-1x-weight); /* 450 */
  line-height: var(--text-1x-leading);
  letter-spacing: var(--text-1x-tracking);
}
```

Use `.quote-card--long` when the quote exceeds three lines; place the attribution name in `.name`.

## Email quotes
In email (table-based HTML), the headshot uses `border-radius: 50%` on the equal-width/height img directly. The img sits in its own `<td>` with fixed width; the text sits in the adjacent `<td>`. Never use percentage widths on the headshot cell — fixed px only.
