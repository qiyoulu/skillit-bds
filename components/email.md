# Email — Skillit Kit BDS
**Last updated:** 2026-09-04
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Preserve 2px Traffic Cone (`--color-primary`) focus outlines with 2px offset for links and CTAs in supporting clients; do not strip native focus where custom CSS is ignored. Canvas contrast is 2.6958:1 (fails 3:1); Plaster is 3.0177:1 (narrow pass). Preserve forced-colors accessibility; see `rules/accessibility.md`.
- Email clients strip or fail SVG. Every image is PNG at 2x display size (e.g., 48x48 file for a 24px icon).

## Structure
- Single-column, 600px max width, centered.
- Content sits directly on Canvas (`--color-background`) — no Plaster card around the email body.
- Side padding: 64px (`--space-16`) on all content blocks.
- Vertical rhythm: 32px (`--space-8`) between major sections, 16px (`--space-4`) between paragraphs and related items.
- Footer: Canvas ground, Iron text, aligned to the email content column; no Iron layout band and no boot-tread band.
- Footer legal links (Preferences / Unsubscribe / Terms of use / Privacy policy) are NOT underlined. Split into two rows if a single row overflows (subscription row, then legal row).
- Social icons: 24px display, separated by wide gaps. No globe/website icon — the logo already links to the site.

## Hero stat
Display statistics use the 8x typography tier: 128px, weight 700, line-height 0.8, tracking -7.68px, Traffic Cone (`--color-primary`). Unit glyphs (%, hrs) scale down proportionally (64px, tracking -3.84px). Full-width is not possible inside the 600px column; 128px is the maximum.
```html
<p style="font-size: 128px; font-weight: 700; line-height: 0.8; letter-spacing: -7.68px; color: #EF6F1A;">12.9<span style="font-size: 64px; letter-spacing: -3.84px;">%</span></p>
```

## Member card
A Plaster (`--color-surface`) card with 16px corners and 64px interior padding, containing a 256px circular member photo (`border-radius: 50%` on an equal-width/height img; approved portrait geometry exception) and name / trade / member-since lines in Text-1x, weight 450.
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-radius: 16px;">
  <tr><td style="padding: 64px;">
    <img src="..." width="256" height="256" style="border-radius: 50%;" />
    <p style="font-size: 16px; font-weight: 450; line-height: 1.4;"><strong>Name</strong><br />Trade<br />Member since YYYY</p>
  </td></tr>
</table>
```

## Buttons
Standard primary button rules apply (pill radius, Traffic Cone fill, Iron text, canonical paired Text-1x padding (8px / 16px; explicit `padding: 8px 16px` is the approved Outlook fallback), 40px minimum height). Use a table cell with `bgcolor` and approved padding as the fallback structure. Do not promise identical pill corners where a client ignores CSS `border-radius`; a tested VML fallback may preserve the pill in Outlook. The canonical shape remains `--radius-pill` (9999px); do not invent an intermediate radius.

```css
.email a:focus-visible, .email .btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Links
Inline text links use Painter's Tape (`--color-link`), underlined. Footer legal links break this rule deliberately (Iron, no underline) because they are utility navigation, not content links.
