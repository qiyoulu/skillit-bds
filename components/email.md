# Email — Skillit BDS
**Last updated:** 2026-09-04
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (`padding: 0.5em 1em`). This is a non-negotiable brand rule.
- Email clients strip or fail SVG. Every image is PNG at 2x display size (e.g., 48x48 file for a 24px icon).

## Structure
- Single-column, 600px max width, centered.
- Content sits directly on Canvas (`--color-background`) — no Plaster card around the email body.
- Side padding: 64px (`--space-16`) on all content blocks.
- Vertical rhythm: 32px (`--space-8`) between major sections, 16px (`--space-4`) between paragraphs and related items.
- Footer: Iron (`--color-foreground`) band, Canvas text, 0px corners, full width (bleeds past the 600px content column). No Union/zigzag pattern band.
- Footer legal links (Preferences / Unsubscribe / Terms of use / Privacy policy) are NOT underlined. Split into two rows if a single row overflows (subscription row, then legal row).
- Social icons: 24px display, separated by wide gaps. No globe/website icon — the logo already links to the site.

## Hero stat
Display statistics use the 8x typography tier: 128px, weight 700, line-height 0.8, tracking -7.68px, Traffic Cone (`--color-primary`). Unit glyphs (%, hrs) scale down proportionally (64px, tracking -3.84px). Full-width is not possible inside the 600px column; 128px is the maximum.
```html
<p style="font-size: 128px; font-weight: 700; line-height: 0.8; letter-spacing: -7.68px; color: #EF6F1A;">12.9<span style="font-size: 64px; letter-spacing: -3.84px;">%</span></p>
```

## Member card
A Plaster (`--color-surface`) card with 16px corners and 64px interior padding, containing a 256px circular member photo (via `border-radius: 999px` on the img) and name / trade / member-since lines in 16px Regular.
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-radius: 16px;">
  <tr><td style="padding: 32px;">
    <img src="..." width="256" height="256" style="border-radius: 999px;" />
    <p style="font-size: 16px;"><strong>Name</strong><br />Trade<br />Member since YYYY</p>
  </td></tr>
</table>
```

## Buttons
Standard primary button rules apply (pill radius, Traffic Cone fill, Iron text, `0.5em 1em` padding, 44px minimum height). Email buttons must render identically in clients that ignore CSS `border-radius` — use a table cell with `bgcolor` and padding on the anchor as the fallback structure.

## Links
Inline text links use Painter's Tape (`--color-link`), underlined. Footer legal links break this rule deliberately (Canvas, no underline) because they are utility navigation, not content links.
