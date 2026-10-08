# Icons — Skillit Kit BDS
**Last updated:** 2026-10-08
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Geometry
Icons are drawn on a strict **10×10 sub-grid** (1 block = 2px) inside a **24×24px canvas**. This grid solves consistent centering (the 2px block unit divides the 24px canvas evenly) and enforces the heavy, cast-iron aesthetic.
- **Canvas size:** 24×24px
- **Sub-grid:** 10×10 (1 block = 2px)
- **Style:** Solid fill only. No strokes, no outlines, no line icons.
- **Stroke weight:** N/A — solid fill, not stroked.
- **Corner radius:** Preserve each supplied glyph’s drawn silhouette. The 16px container radius does not round small icon geometry.
- **Color:** Single-color tintable icons use `fill="currentColor"`. Preserve approved multicolor/status source layers; use canonical tokens for consumer overrides, not new authored hex colors.

## Do not
- Do not use stroke-based (outline) icons — they conflict with the solid, material aesthetic.
- Do not apply container rounding to glyphs; use the supplied geometry.
- Do not introduce hardcoded UI fill colors; single-color tintable icons inherit CSS through `currentColor`. Preserve approved exported multicolor layers rather than flattening them.
- Do not draw outside the 10×10 sub-grid — off-grid geometry breaks centering math.

## Status communication
Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone.

Choose recognizable glyphs: a check for success, an exclamation for warning, and a cross for error. A circled “i” is the conventional information symbol; a “?” denotes help. Outer circles, triangles, and octagons may support these conventions, but are not a separate code users must learn. Use supplied `information-circle.svg` or `information-square.svg` for information and `question-mark-circle.svg` for help; preserve the exported geometry.

## Delivery
SVG exports are stored in the Rails app at `app/assets/images/bds/icons/`. Rails ViewComponent wrappers in `app/components/` render the SVGs inline; that wrapper directory is not the export location. Inline SVGs inherit `currentColor` dynamically via CSS. For an external SVG, `<img>` and CSS `background-image` do not inherit the host’s color: use an inline SVG or an alpha mask painted by the host’s CSS `background-color`.

### Stylesheet deployment base
Component CSS recipes with `url()` are intended to be assembled into a consumer-owned stylesheet beside `tokens/generated/tokens.css`, with the repository asset tree preserved. From that directory, `../../assets/icons/check.svg` resolves to the supplied asset. This stylesheet is a deployment convention, not a generated file shipped by this repo. If CSS is moved, bundled, or pasted into an inline `<style>` (including Squarespace Custom CSS), rewrite URLs to the deployed asset paths; inline CSS resolves against the HTML document, not this Markdown file. Prose asset paths are repository-relative, not literal CSS URLs.

### Tinting and status
The current imported export contains **90 SVGs**, including 15 additional assets beyond the earlier 75-asset comparison. The current set contains **78 tintable utility exports** using `currentColor` and **12 approved semantic/multicolor exports** retaining their contrasting source paint. Future raw exports may still need normalization. Never flatten all layers into one inherited color or substitute older geometry.

- `check.svg` is the revised standalone angular check; `check-circle.svg` has a green circular ground and opaque white check. `x-octagon.svg`, `exclamation-triangle.svg`, and both information variants also retain semantic-colored grounds and opaque white inner glyphs, not transparent cutouts. Render these as full images or inline components; a combined alpha mask erases their glyph contrast. Only the standalone glyph is suitable for checkbox/chip inner masks.
- `play.svg` is a standalone filled triangle, not a circular knockout; `pause.svg` is a standalone pause glyph. `play-circle.svg` and `pause-circle.svg` retain opaque dark circles and white inner glyphs. White areas are painted layers, not transparent knockouts.
- `switch-on.svg` has an opaque Plaster pill and Bottle Glass green circular thumb on the right; `switch-off.svg` has an opaque Plaster pill and dark thumb on the left. Neither uses a translucent track. This immediate-setting switch treatment is separate from Orange checkbox/radio/chip selection; do not recolor its enabled thumb Orange merely because it is interactive.
- `radio-checked.svg` retains an opaque Orange disc and white center. `radio-unchecked.svg` is a solid disc, not an outline ring. Preserve supplied state geometry; its filename does not authorize inventing an unselected outline or translucent ground.
- `checkbox-checked.svg` retains an Orange box and contrasting dark check. See the approved [checkbox rendering contract](./checkboxes.md); a combined mask cannot preserve both colors.

Inline multicolor SVGs or render inline components for independent layer control. External `<img>` rendering preserves source colors but cannot inherit host color; a single CSS mask destroys contrasting opaque layers. Use canonical tokens for approved host/layer overrides and preserve geometry and opacity. Literal source paint is not permission to define new UI palette values. These SVGs are state indicators, not working controls: retain native inputs or accessible buttons, labels, keyboard behavior, and submission semantics.

Semantic styling uses canonical host/layer tokens; approved source status exports retain semantic paint and white glyph layers. Host color does not recolor an external image; inline layer styling is needed for runtime overrides. These existing exported paints are a source-artwork exception, not permission for new authored UI hex colors. Success uses Bottle Glass green, warning Hard Hat yellow, error Toolbox red, and info Painter’s Tape blue. Utility icons (clock, search, document) and a general match indicator stay Iron unless the context explicitly communicates a semantic outcome; apply the corresponding semantic class for that outcome. Selected radio, checkbox, and chip indicators are interactive-control state and use Orange:
```css
.icon--match, .icon--neutral { color: var(--color-foreground); } /* neutral utility only */
.icon--success { color: var(--color-success); }
.icon--warning { color: var(--color-warning); }
.icon--error { color: var(--color-error); }
.icon--info { color: var(--color-link); }
.icon--selected { color: var(--color-primary); } /* interactive selection only */
```
Retain each supplied silhouette and accompanying label. Toast panels are Plaster with Iron message text and semantic icon paint (`toast.md`), not matching semantic fills. Hard Hat on Plaster is 1.8229:1, below 3:1: a warning glyph essential to understanding the state fails graphical contrast. When the visible label fully conveys the same meaning, the redundant glyph is not required for understanding under WCAG 1.4.11; its low contrast still is not a contrast pass. Never infer essentialness from `aria-hidden` alone or invent a darker yellow.

## Legacy compatibility

The [deprecated archive](../assets/icons/legacy/README.md) contains **75 frozen legacy SVGs**, separate from the **90 canonical icons**. It preserves the 75 pre-v1.2-migration files; unpublished temporary export IDs are not compatibility assets. The manifest maps each legacy filename to its canonical target and verifies archived bytes; do not normalize or redraw the archive.

Consumers must explicitly select `assets/icons/legacy/` or their copied legacy resolver directory. Old root paths are not automatically restored, and matching Heroicons IDs does not reroute a helper. This is a staged-migration source, not a claim of unchanged-path SemVer compatibility. Keep legacy mobile `phone` and round-cropped `user-circle` separate from the current handset and enclosed-circle assets. See the archive README for migration steps.

## Naming and migration

Name glyphs by their visible form, using Heroicons vocabulary where the appearance corresponds. Keep Skillit artwork; matching a Heroicons name does not authorize replacing the SVG with Heroicons artwork or make the Rails `heroicon` helper resolve to BDS assets. Keep semantic props (`success`, `error`, `warning`, `info`) independent of asset IDs. Control-state names such as `checkbox-checked`, `radio-unchecked`, and `switch-on` remain appropriate.

**Distinct sharing glyphs:** `share.svg` is the three-node sharing symbol. `arrow-up-on-square.svg` is the upward arrow emerging from a square. Both are delivered; neither is an alias for the other.

### Previous IDs → current IDs

The previous IDs below are migration history, not additional shipped aliases. Update Figma component names, resolver IDs, image paths, CSS URLs, copied SVGs, and tests together. Do not use global word replacements: semantic status keys and trade labels retain their meaning.

- `carpenter` → `saw`
- `checkmark` → `check-circle`
- `close` → `x-mark`
- `close-circle` → `x-circle`
- `concrete-worker` → `concrete`
- `customer-support` → `user-headset`
- `document` → `document-text`
- `electrician` → `bolt`
- `electrician-circle` → `bolt-circle`
- `error` → `x-octagon`
- `external-link` → `arrow-top-right-on-square`
- `eye-off` → `eye-slash`
- `film` → `film-reel`
- `heavy-eq` → `excavator`
- `help` → `question-mark-circle`
- `information` → `information-square`
- `location` → `map-pin`
- `mail` → `envelope`
- `match` → `puzzle-piece`
- `menu` → `bars-3`
- `phone` → `device-phone-mobile`
- `pipefitter` → `pipe`
- `search` → `magnifying-glass`
- `trade` → `wrench`
- `upload` → `arrow-up-tray`
- `user-circle` → `user-round`
- `warning` → `exclamation-triangle`
- `web` → `globe-alt`
- `worker` → `user-hat`

**Reused names require care:** The old `phone` drawing became `device-phone-mobile`; the current `phone` is a newly supplied handset. The old `user-circle` drawing became `user-round`; the current `user-circle` is a newly supplied enclosed-circle avatar. Inspect artwork and consuming context before changing these references. Existing consumers may explicitly use the frozen `assets/icons/legacy/` archive during migration; there are no automatic aliases at the canonical root. BDS edits alone do not migrate Rails or workspace consumers.

## Core icon set
| Icon | Status |
|---|---|
| Checkmark (circular status) | Complete (`check-circle.svg`) |
| Check (standalone glyph) | Complete (`check.svg`) |
| Error | Complete (`x-octagon.svg`) |
| Warning | Complete (`exclamation-triangle.svg`) |
| Search | Complete (`magnifying-glass.svg`) |
| Arrow (left, right) | Complete (`arrow-left.svg`, `arrow-right.svg`) |
| Arrow (up, down) | Complete (`arrow-up.svg`, `arrow-down.svg`) |
| Location | Complete (`map-pin.svg`) |
| Clock | Complete (`clock.svg`) |
| User | Complete (`user.svg`) |
| External link | Complete (`arrow-top-right-on-square.svg`) |
| Plus | Complete (`plus.svg`, `plus-circle.svg`) |
| Menu (hamburger) | Complete (`bars-3.svg`) |
| Info | Complete (`information-circle.svg`, `information-square.svg`) |

## Complete imported inventory

All 90 filenames below are delivered assets, not planned metaphors. Resolver IDs are the exact filenames without `.svg`. Semantic props/classes such as `error`, `warning`, `success`, and `info` remain independent of filenames. User-selected `saw`, `concrete`, `pipe`, `user-hat`, and `user-round` are authoritative; do not substitute recommended library names.

- `arrow-down-circle.svg`, `arrow-down-left.svg`, `arrow-down-right.svg`, `arrow-down.svg`, `arrow-left-circle.svg`
- `arrow-left-right.svg`, `arrow-left.svg`, `arrow-path.svg`, `arrow-right-circle.svg`, `arrow-right.svg`
- `arrow-top-right-on-square.svg`, `arrow-up-circle.svg`, `arrow-up-left.svg`, `arrow-up-right.svg`, `arrow-up-tray.svg`
- `arrow-up.svg`, `bars-3.svg`, `bolt-circle.svg`, `bolt.svg`, `bookmark.svg`
- `briefcase.svg`, `calendar.svg`, `check-circle.svg`, `check.svg`, `checkbox-checked.svg`
- `checkbox-unchecked.svg`, `chevron-down.svg`, `clock.svg`, `concrete.svg`, `credit-card.svg`
- `currency-dollar.svg`, `device-phone-mobile.svg`, `document-text.svg`, `envelope.svg`, `excavator.svg`
- `exclamation-triangle.svg`, `eye-slash.svg`, `eye.svg`, `facebook.svg`, `film-reel.svg`
- `flag.svg`, `globe-alt.svg`, `home.svg`, `inbox.svg`, `information-circle.svg`
- `information-square.svg`, `instagram.svg`, `language.svg`, `light-bulb.svg`, `linkedin.svg`
- `lock-closed-circle.svg`, `lock-closed.svg`, `lock-open.svg`, `magnifying-glass.svg`, `map-pin.svg`
- `map.svg`, `pause-circle.svg`, `pause.svg`, `pencil.svg`, `phone-arrow-down-left.svg`
- `phone-arrow-up-right.svg`, `phone-x-mark.svg`, `phone.svg`, `pipe.svg`, `play-circle.svg`
- `play.svg`, `plus-circle.svg`, `plus.svg`, `puzzle-piece.svg`, `question-mark-circle.svg`
- `radio-checked.svg`, `radio-unchecked.svg`, `saw.svg`, `arrow-up-on-square.svg`, `share.svg`
- `star.svg`, `switch-off.svg`, `switch-on.svg`, `user-circle.svg`, `user-hat.svg`
- `user-headset.svg`, `user-round.svg`, `user.svg`, `whatsapp.svg`, `wrench.svg`
- `x-circle.svg`, `x-mark.svg`, `x-octagon.svg`, `x.svg`, `youtube.svg`

### Additional exports beyond the earlier comparison

The 15 additions are: `arrow-down-left.svg`, `arrow-down-right.svg`, `arrow-up-left.svg`, `arrow-up-right.svg`, `briefcase.svg`, `credit-card.svg`, `currency-dollar.svg`, `inbox.svg`, `map.svg`, `phone-arrow-down-left.svg`, `phone-arrow-up-right.svg`, `phone-x-mark.svg`, `phone.svg`, `arrow-up-on-square.svg`, `user-circle.svg`. These are additions, not just renames.

`phone.svg` is a handset, separate from the mobile-device artwork in `device-phone-mobile.svg`. New `user-circle.svg` has an enclosing circle and profile silhouette; it is distinct from `user-round.svg`. `arrow-up-on-square.svg` shows an upward arrow emerging from a rectangular base. Keep the three-node `share.svg` separate. The four diagonal arrows point toward their named corners; the phone variants combine the handset with incoming/outgoing arrows or an X. The remaining additions supply briefcase, credit-card, dollar, inbox, and map glyphs.

The fresh export also revises `arrow-up-tray.svg`, `globe-alt.svg`, `pipe.svg`, `question-mark-circle.svg`, `bars-3.svg`, `film-reel.svg`, `bolt-circle.svg`, and several same-name assets. Names alone do not establish artwork parity with Heroicons or older exports. Migrate copied SVGs, resolver IDs, image paths, and CSS URLs together in each consumer; this BDS update does not deploy Rails or workspace integrations.
