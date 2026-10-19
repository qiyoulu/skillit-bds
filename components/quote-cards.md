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
| Quote | 128px desktop / 64px mobile | Text-1.5x (24px, weight 450) | Pull quotes, hero quotes, article quotes |

The headshot is `flex: 0 0 auto` at its fixed pixel size (128px). The text container sizes independently. On mobile (< 768px), the headshot drops to 64px.

## Quote card
Quotes sit in a Plaster (`--color-surface`) card with 16px corners and standard card padding. The headshot is circular (`border-radius: 50%` on an equal-width/height image), aligned to the top-left of the card. This portrait geometry is an explicit exception, not a new container radius. Quote text uses canonical Text-1.5x (24px, weight 450) at every length. A card without a headshot adds one decorative opening quotation mark (see below). Attribution sits below the quote in Text-1x, Iron: name 600, role/company/location 450. These values come from `tokens/tokens.json5` and its typography documentation.

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
  font-size: var(--text-1\.5x);
  font-weight: var(--text-1\.5x-weight); /* 450 */
  line-height: var(--text-1\.5x-leading);
  letter-spacing: var(--text-1\.5x-tracking);
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
```

Place the attribution name in `.name`. A quote does not change size with its length: Text-1.5x holds for short and long quotes alike.

## Decorative quotation mark
A quote card with **no headshot** carries one decorative opening quotation mark. A card with a headshot does not: the portrait is the visual anchor, and the mark is omitted.

**Build it as in Figma: the mark is the first character of the quote's own text box, set in a larger size, and hung.** It is not a separate element placed beside the text.

- **Glyph:** the single curly opening mark `“` (U+201C), never a straight `"`. One mark only; no closing mark.
- **Size and weight:** Text-3x (48px, weight 550). Roman, never italic. The quote text stays Text-1.5x (24px, 450).
- **Colour:** Iron, full opacity, the same as the quote text.
- **Baseline:** it sits on the **same baseline as the first line** of the quote. The larger glyph must not make the first line taller or push the text down.
- **Hang:** it hangs in the left margin by **its own width** (23.4px at 48px / 550), with no added gap, so the text's left edge, and with it the first letter of every line, stays flush with the card's content edge (see Hanging Punctuation in `tokens/docs/typography.md`). The glyph's built-in side bearing (2.3px) supplies the visual gap.
- **Padding:** the hang needs padding at least as wide as the mark. At 24px quote padding it fits (23.4px); at 32px (`--space-8`, the quote card's article padding) the mark's ink sits about 11px inside the card edge.
- **Decorative only:** it adds no information; the card and the text already say it is a quote. Hide it from assistive technology, or generate it as `content` on a pseudo-element.
- **Small screens:** at 16px card padding there is no room to hang the mark. Below 768px it sits **above** the text, left-aligned to the text edge, with `--space-2` below it. It does not hang.

```css
.quote-card--mark .text { position: relative; }
.quote-card--mark .text::before {
  content: "\201C";
  position: absolute;
  right: 100%;                       /* hang by its own width, no gap */
  top: 0;
  font-family: var(--font-primary);
  font-size: var(--text-3x);         /* 48px */
  font-weight: var(--text-3x-weight); /* 550 */
  letter-spacing: var(--text-3x-tracking);
  line-height: 13.6px;               /* puts the 48px glyph's baseline on the 24px text's first baseline */
  color: var(--color-foreground);
}
@media (max-width: 767px) {
  .quote-card--mark .text::before {
    position: static;
    display: block;
    line-height: var(--text-3x-leading); /* 1.1 */
    margin: 0 0 var(--space-2);
  }
}
```

The `13.6px` line box is measured, not derived from the type scale: it is the value at which the 48px glyph's baseline lands on the baseline of 24px text set at leading 1.3. Re-measure it if the quote text tier changes. Do not add the `--mark` variant to a card that has a headshot.

## Email quotes
In email (table-based HTML), the headshot uses `border-radius: 50%` on the equal-width/height img directly. The img sits in its own `<td>` with fixed width; the text sits in the adjacent `<td>`. Never use percentage widths on the headshot cell — fixed px only.
