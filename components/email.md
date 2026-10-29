# Email — Skillit Kit BDS
**Last updated:** 2026-10-29
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Preserve 2px Traffic Cone (`--color-primary`) focus outlines with 2px offset for links and CTAs in supporting clients; do not strip native focus where custom CSS is ignored. Canvas contrast is 2.6958:1 (fails 3:1); Plaster is 3.0177:1 (narrow pass). Preserve forced-colors accessibility; see `rules/accessibility.md`.
- Email clients strip or fail SVG. Every image is PNG at 2x display size (e.g., 48x48 file for a 24px icon).

## Typography
**Email typography:** Use Text-1x (16px / 1rem), Work Sans weight 400, line-height 1.4 as the default and minimum for readable email text—including signatures, footer contacts, addresses, copyright, legal links, captions, and source references. Use 600 for emphasis. Do not apply the general 12px Text-0.75x metadata exception to email. Larger canonical heading/display tiers remain available for marketing emails. Where variable weight 450 is unsupported, use the nearest supported regular weight and verify rendering. Allow contact rows to wrap on narrow screens; never shrink type or force horizontal overflow to keep them on one line.

**Scan emphasis:** follow the voice rule (`voice/brand-voice.md`, Scannability): bold critical action verbs and data points, at weight 600 (the Text-1x bold), so the bold words alone still carry the argument. In an email card that means a few phrases at most, never adjectives or whole sentences, and none in a short card. List lead-ins ("Add a profile picture:") are separate and stay 600. Fallback fonts render bold heavily, so more than a few phrases per card reads as a wall of bold.

## Structure
- Single-column, 600px max width, centered.
- The email body sits on Canvas (`--color-background`). No single Plaster card wraps the whole body.
- **Section cards (newsletters and multi-section emails):** each section may sit in its own Plaster (`--color-surface`) feature card on the Canvas ground: 16px corners, no border or shadow, `--space-8` (32px) padding on every side (`components/cards.md`). The section heading stays on Canvas above its card, Text-1.5x, flush-left, 16px above the card. One card per section; do not nest cards or mix in list cards.
- The 64px side padding applies to the card's outer edge, so a card in the 600px column is 472px wide with 408px of content. Images inside a card are 408px wide at display size and keep 16px corners.
- Side padding: 64px (`--space-16`) on all content blocks.
- **Mobile (600px and narrower):** the 64px outer margin drops to the 16px page gutter (`--space-gutter`). Card padding does not change: feature cards keep `--space-8` (32px) at every size. A 375px phone then gets about 279px of text inside a card.
- **Mobile type (600px and narrower):** display tiers scale ×0.75 as in `tokens/docs/typography.md`: Text-2x 32px becomes 24px, Text-1.5x 24px becomes 18px (tracking scales with size). Email cannot use `clamp()`, so use a media query. Body holds at 16px.
- **Font loading:** most email clients ignore web fonts and render the fallback (Verdana or Tahoma), which has no 450 or 550 weight and renders 450 as 400. Where the client supports `@font-face`, load Work Sans with `font-weight: 100 900`; otherwise accept the fallback and verify headings still read as distinct from body.
- **Preview text:** always fill it, 90 characters or fewer, written as copy and not left to the first line of the body.
- **Alt text:** photos that carry story context get descriptive alt text; only purely decorative images use empty alt. Maps and charts state their key data in the body copy next to them.
- **Color scheme:** Skillit surfaces are Canvas and Plaster only, so declare `color-scheme: light` and test in dark-mode clients.
- Vertical rhythm: 32px (`--space-8`) between major sections (card to next heading), 16px (`--space-4`) between paragraphs and related items. This file governs email; the 64px between-block minimum in `rules/layout.md` is for web layouts.
- **Above the footer:** 64px (`--space-16`) of Canvas between the last section and the Iron footer band, 32px on mobile (`rules/layout.md` mobile section padding). Never let the last card touch the band.
- No extra outer padding around the 600px column: side margin is the 64px block padding, or 16px on mobile.
- Footer: a full-width Iron (`--color-foreground`) band with Plaster (`--color-surface`, white) text, mark and icons; content aligned to the email content column. No boot-tread band. The footer is an approved Iron layout surface, as on the website (`components/footer.md`). White on Iron is 13.7113:1.
- Footer legal links (Preferences / Unsubscribe / Terms of use / Privacy policy) are NOT underlined. Split into two rows if a single row overflows (subscription row, then legal row).
- Social icons: 24px display, 16px (`--space-4`) between glyphs. No globe/website icon — the logo already links to the site.
- **Footer hit areas:** footer links and social icons keep a hit area of at least 40px in both dimensions (44px preferred) by padding the link or its table cell, not by growing the glyph or the type. Footer links are 16px text with 11px vertical padding (44px tall).
- **Reason line:** the footer opens with one plain sentence saying why the reader got the email (for example, "You're receiving this email because you're a Skillit member."), above Preferences / Unsubscribe.

## Hero stat
Display statistics use the 8x typography tier: 128px, weight 700, line-height 0.8, tracking -7.68px, Traffic Cone (`--color-primary`). Unit glyphs (%, hrs) scale down proportionally (64px, tracking -3.84px). Full-width is not possible inside the 600px column; 128px is the maximum.
```html
<p style="font-size: 128px; font-weight: 700; line-height: 0.8; letter-spacing: -7.68px; color: #EF6F1A;">12.9<span style="font-size: 64px; letter-spacing: -3.84px;">%</span></p>
```

## Member card
A Plaster (`--color-surface`) card with 16px corners and 64px interior padding, containing a 256px circular member photo (`border-radius: 50%` on an equal-width/height img; approved portrait geometry exception) and name / trade / member-since lines in Text-1x, weight 400.
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-radius: 16px;">
  <tr><td style="padding: 64px;">
    <img src="..." width="256" height="256" style="border-radius: 50%;" />
    <p style="font-size: 16px; font-weight: 400; line-height: 1.4;"><strong>Name</strong><br />Trade<br />Member since YYYY</p>
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
Inline text links use Painter's Tape (`--color-link`), underlined. Footer legal links break this rule deliberately (Plaster on the Iron footer, no underline) because they are utility navigation, not content links.
