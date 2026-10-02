# Accessibility Rules — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Non-negotiable
Every output — website, app, social asset, document, generated content — should meet these requirements. Accessibility is baked in, not bolted on. The brand was designed around these constraints.
---
## Contrast requirements (WCAG AA)
| Text type                                          | Minimum ratio | Standard |
| -------------------------------------------------- | ------------- | -------- |
| Normal text (including 12px functional labels)                                 | 4.5:1         | WCAG AA  |
| Large text (≥ 14pt bold or ≥ 18pt regular)            | 3:1           | WCAG AA  |
| Non-text UI elements (icons, borders, focus rings) | 3:1           | WCAG AA  |
### Verified token pairs
| Text color         | Background         | Ratio  | Status                    |
| ------------------ | ------------------ | ------ | ------------------------- |
| Iron `#232F36` | Canvas `#F7F1ED` | 12.2506:1 | Pass AAA                  |
| Iron `#232F36` | Plaster `#FFFFFF`  | 13.7135:1 | Pass AAA                  |
| Canvas `#F7F1ED` | Iron `#232F36` | 12.2506:1 | Pass AAA on functional backdrops/overlays only                  |
| Canvas `#F7F1ED` | Traffic Cone `#EF6F1A`     | 2.6958:1 | Fail — not permitted at any size          |
| Iron `#232F36` | Traffic Cone `#EF6F1A`     | 4.5443:1 | Pass AA                                   |
| Iron `#232F36` | Hard Hat `#FEB11C` | 7.5227:1  | Pass AAA                  |
| Canvas `#F7F1ED` | Toolbox `#C8102E`  | 5.2557:1  | Pass AA                   |
| Canvas `#F7F1ED` | Bottle Glass `#33663D`   | 6.0346:1 | Pass AA                   |
| Painter's Tape `#007CA6`   | Canvas `#F7F1ED` | 4.2312:1  | Fails AA (needs 4.5:1)                  |
### Pairs that are banned
| Text               | Background         | Ratio  | Reason                                                                |
| ------------------ | ------------------ | ------ | --------------------------------------------------------------------- |
| Traffic Cone `#EF6F1A`     | Canvas `#F7F1ED` | 2.6958:1 | Fails AA — only the documented display/hero brand exception (24px+), never a WCAG pass                         |
| Canvas `#F7F1ED` | Traffic Cone `#EF6F1A`     | 2.6958:1 | Fails AA — never use Canvas text on Traffic Cone                            |
| Hard Hat `#FEB11C` | Canvas `#F7F1ED` | 1.6285:1  | Fails — never use yellow text on light background                     |
| Bottle Glass `#33663D`   | Toolbox `#C8102E`  | 1.1482:1 | Fails — red/green together banned entirely. Near-identical luminance: invisible to deuteranopes and in greyscale. |
| Iron `#232F36` | Bottle Glass `#33663D`   | 2.0300:1 | Fails AA — never use Iron text on Bottle Glass; use Canvas          |
---
**Brand exceptions:** Painter’s Tape on Canvas is 4.2312:1, below 4.5:1 for normal text. The palette remains unchanged pending a separate review; use Iron where AA normal-text compliance is required. Traffic Cone display text on Canvas is the existing documented brand exception, never a WCAG pass. Contrast ratios do not authorize Iron layout backgrounds; only functional backdrops/overlays are exempt.

Large-text thresholds are points: 18pt regular = 24 CSS px; 14pt bold ≈ 18.67 CSS px. Smaller text requires 4.5:1.

## Color blindness rules
Approximately 8% of men and 0.5% of women have red-green color blindness (deuteranopia/protanopia). These rules are non-negotiable:
1. **Never use color as the only signal.** Every status state (success, error, warning) should pair color with a shape and a text label. Color alone is never sufficient.
2. **Never pair red and green as opposing states.** Toolbox (error) and Bottle Glass (success) should never appear as direct visual opposites without shape differentiation.
3. **Orange + Blue is the safest contrast pair.** Traffic Cone (`--color-primary`) and Painter's Tape (`--color-link`) are perceptually distinct for all common forms of color blindness.
4. **Hard Hat (yellow) + Traffic Cone (orange) require shape or size differentiation** when both appear in the same context. Never use them as adjacent status indicators without a distinct shape difference.
---
## Status state rules (shape coding)
Every status icon uses Iron; its supplied shape and text label identify the state. Color is not required to distinguish states. Preserve existing semantic message text and feedback fills separately.
| State   | Color              | Shape                 | Label required                            |
| ------- | ------------------ | --------------------- | ----------------------------------------- |
| Success | Iron (`--color-foreground`)   | Circle         | “Verified,” “Complete,” “Confirmed”       |
| Warning | Iron (`--color-foreground`) | Triangle    | “Incomplete,” “Action needed,” “Expiring” |
| Error   | Iron (`--color-foreground`)  | Octagon            | “Error,” “Failed,” “Expired”              |
| Info    | Iron (`--color-foreground`) | Supplied help circle + message; square silhouette only when an approved asset is available | “Info,” “Note,” “Tip”                     |
---
## Touch target rules (mobile / app)
- Minimum touch target size: `40px × 40px`.
- This applies to all interactive elements: buttons, links, checkboxes, radio inputs, nav items.
- The visible element may be smaller, but the clickable/tappable area should meet the minimum.
- On the worker app specifically: assume fat fingers, gloves, and direct sunlight. When in doubt, go larger.
---
## Text sizing rules
- Minimum running copy: `16px` (1rem), held on mobile. Functional labels and metadata may use the separate 12px tier.
- Minimum label text: `12px` (0.75rem). This is the floor — never smaller.
- Do not use `px` units for font-size. Use `rem` so user browser scaling works.
- Text-1x running copy and functional labels use canonical unitless leading `1.4`; display tiers use their own canonical leading. Test readability and support user text-spacing overrides without clipping.
---
## Focus states
- All interactive elements (buttons, links, inputs, checkboxes, radios, chips, modal controls, and supported email links) need a visible focus indicator.
- Use `2px solid` Traffic Cone (`--color-primary`) with `2px` offset consistently in authored contexts, including colored feedback and unavoidable non-Skillit dark surfaces. Never silently substitute Iron or Canvas as a context fallback.
- **Known contrast limitation:** Traffic Cone on Canvas is 2.6958:1, below the 3:1 non-text target; this requested brand focus treatment is not a WCAG contrast pass. On Plaster it is 3.0177:1, a narrow pass. Check the actual adjacent surface, clipping, and visibility; neither the offset nor a shape/label resolves insufficient contrast. Other surfaces, including success/error toast fills, need separate review. Do not add a double edge, shadow, or new palette value without approval.
- Focus is a functional treatment, not another dominant CTA accent. Preserve native focus where custom CSS cannot render. In forced-colors mode let system colors and native controls override brand paint; never use `forced-color-adjust: none` to lock Orange or Iron.

```css
:where(button, a, input, select, textarea, [tabindex]):focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
/* Explicit contexts retain Orange; load after component recipes. */
.non-skillit-dark :where(button, a, input, select, textarea, [tabindex]):focus-visible,
.non-skillit-dark .checkbox-row:has(.checkbox:focus-visible) {
  outline-color: var(--color-primary);
}
@media (forced-colors: active) {
  :where(button, a, input, select, textarea, [tabindex]):focus-visible,
  .checkbox-row:has(.checkbox:focus-visible),
  .non-skillit-dark :where(button, a, input, select, textarea, [tabindex]):focus-visible,
  .non-skillit-dark .checkbox-row:has(.checkbox:focus-visible) {
    outline-color: Highlight;
  }
  .chip--radio .chip__indicator,
  .chip--check .chip__indicator { border-color: ButtonText; }
  .chip--radio[aria-checked="true"] .chip__indicator,
  .chip--check[aria-checked="true"] .chip__indicator {
    background-color: Highlight;
    border: 1.5px solid Highlight;
  }
  .chip--check[aria-checked="true"] .chip__indicator::after {
    background-color: HighlightText;
  }
}
```
- Never remove focus outlines with `outline: none` without providing an equivalent custom focus style.
- Focus should be keyboard-navigable in the correct DOM order.
- **Skip-to-content link** at the top of every page (visually hidden until focused) so keyboard users bypass repeated navigation.
- **Never create an inescapable keyboard trap.** Modal dialogs contain Tab and Shift+Tab navigation while open. Move focus inside on open; provide Escape dismissal and a visible keyboard-operable close control; restore focus to the trigger on close.
- **Hover is not a state on touch.** Every hover interaction needs a tap equivalent. Icons that function as buttons need a text alternative (`aria-label`).
---
## Motion rules
- Respect `prefers-reduced-motion`. If the user requests reduced motion, their setting wins — no exceptions for "but it's subtle."
- Nothing flashes more than 3 times per second (seizure safety, WCAG 2.3.1).
- Animations ≤ 5 seconds or user-controlled. No infinite loops without a stop mechanism.
- Auto-playing or auto-moving content (carousels, ticker tapes) gets visible pause/stop controls.
- If an animation carries meaning, that meaning must survive with motion disabled.
---
## Reflow / zoom
- **Resize text (WCAG 1.4.4):** Test text resizing to 200% without loss of content or functionality.
- **Reflow (WCAG 1.4.10):** Vertical-scrolling content must work at a 320 CSS-pixel viewport without two-dimensional scrolling or loss of content/functionality; this is equivalent to 400% zoom from a 1280 CSS-pixel-wide viewport. Collapse the grid rather than clip.
- Content whose meaning or operation requires two-dimensional layout (for example, maps or data tables) may use the specified reflow exception; surrounding content still reflows. Test both resize text and reflow before shipping.
---
## Image alt text rules
All images in generated content should have descriptive alt text. Rules:
- Worker portraits: describe the person’s trade and action, not their appearance. “Ironworker reviewing blueprints on a job site” not “man in hard hat.”
- Product screenshots: describe what’s shown in the UI. “Skillit worker profile showing NCCER certifications and availability.”
- Decorative images (boot tread pattern, texture): `alt=""` (empty string — tells screen readers to skip).
- Never use “image of” or “photo of” as a prefix — screen readers announce it’s an image already.
