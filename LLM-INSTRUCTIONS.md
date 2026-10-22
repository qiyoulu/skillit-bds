# Skillit Kit Brand Design System (BDS) — PROJECT INSTRUCTIONS (READ FIRST)
**Last updated:** 2026-10-22

**Last synced with HUMAN-INSTRUCTIONS.md:** 2026-10-08

**Release:** v1.4, tagged `v1.4` and published as a GitHub Release on 2026-10-22. See [release notes](./releases/v1.4.md).

**Role:** Expert frontend engineer & brand designer.

**Audience split:** `HUMAN-INSTRUCTIONS.md` is the plain-language team guide. Read [the detailed design reference](./docs/design-reference.md) for full settings and examples, and [the README](./README.md#for-the-engineering-team) for setup and verification. Simplified wording does not change the approved rules or canonical values.
**Aesthetic:** Rugged, worker-first, consistent precision. “Materials on a jobsite.” NOT SaaS generic.

**This document is the authoritative constraint set for AI agents generating any Skillit output — code, design, copy, or data visualization. It governs behavioral rules when reference documents conflict. `tokens/tokens.json5` governs canonical token values; never override those values from a prose example.**

**Scoped migration directive:** Apply the current rules only to the UI and implementation scope requested. Identify legacy conflicts outside that scope without rewriting unrelated surfaces. Broader migration requires engineering review and approval; preserve existing integration paths and behavior. A BDS edit does not automatically deploy or authorize a global reskin. Follow the [README ingestion and integration workflow](./README.md).

---

## 1. HARD BANS — check these before anything else

These are the rules most often violated. Verify every output against them.

1. **No authored UI hex colors.** Use canonical CSS variables for UI styling. Canonical source tables, explicit token/export workflows, and unchanged approved SVG/graphic exports may contain literal hex paint. This exemption does not permit new UI colors or silent recoloring of fixed logo artwork. If a token is missing, flag it; do not invent or approximate it.
2. **No layout lines or drop shadows.** Applies to slides, documents, and UI layouts: no divider rules, underlines added beneath headings, table gridlines, or separator strokes between content blocks. Separate content through whitespace, alignment, typography, and Canvas/Plaster surface contrast. Do not inherit borders or shadow effects from presentation themes. Functional chart lines, chart leader lines, control boundaries, link underlines, and keyboard-focus rings follow their existing component/data rules; they are not layout separators.
3. **No centered text.** Flush-left alignment only, headlines included.
4. **No intermediate container radii.** Use `0px` for editable fields/checkbox boxes/chart bars/static tags, `16px` for static containers, and pill (`9999px`) for button-like actions. Radio/status circles and circular selection indicators may use `50%` geometry; this is not another container-radius tier. `4px` and `8px` container radii are banned.
5. **No title case, no all-caps in UI text.** Sentence case only. Exceptions: industry acronyms (OSHA, HVAC, AI), proper nouns (Skillit, New York), the logo wordmark (a fixed graphic asset, never retyped), user-entered data, and direct quotes (preserve source capitalization).
6. **No semantic colors for decoration.** Bottle Glass, Hard Hat, Toolbox, and Painter’s Tape require functional message, status-icon, control, or data meaning, not decorative fills or layout backgrounds. Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. Checkbox, radio, and selection-chip control paint uses Traffic Cone, not Bottle Glass: unselected radio/chip outlines and selected fills are orange. Keep chip pills Plaster with Iron text; the contrasting inner check glyph is Iron (4.5443:1 on Cone), not Canvas (2.6958:1). Focus rings also use Cone. Charts may use Cone alongside Painter’s Tape and other canonical palette colors for purposeful categories with legends or direct labels and non-color cues; monochromatic is a default, not exclusive. All toast types use Plaster bodies with Iron text and their semantic icon color; close controls use Iron with Traffic Cone focus. Toast bodies remain static 16px-corner feedback panels, not actions; only close/link controls are actionable. No colored success/error/warning toast-background exception remains. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast. Status/progress/data displays are not actions themselves.
7. **No gradients.** All color transitions are hard edges.
8. **No donut charts, radar/spider charts, or 3D effects.** Solid pie for part-to-whole.
9. **No retyping, redrawing, or approximating the logo.** The mark, wordmark, and lockup are fixed SVG assets. Use the approved files.
10. **No SaaS-generic patterns.** No blobs, abstract shapes, illustrated backgrounds, or decorative dividers. Every element performs a structural job or it is deleted. Approved neutral boot-tread texture is allowed only in non-content document/header/footer regions; never behind UI text, controls, or running copy.
11. **No parallel token systems.** Implementations must reference Skillit Kit BDS token names directly. Do not define local CSS custom properties that duplicate BDS tokens under different names (e.g., `--plaster` for `--color-surface`, `--iron` for `--color-foreground`). If a design token is missing, flag it for addition rather than inventing a replacement. Component-local runtime state such as `--active-step`, `--total-steps`, or an icon URL may be declared locally; those are implementation state, not alternate palette/type/spacing tokens.

---

## 2. Tokens — single source of truth

**`tokens/tokens.json5` is canonical.** The values below are a convenience index for orientation. Authored UI styling must reference the variable, never the hex; source tables, explicit token/export workflows, and unchanged approved assets follow the §1.1 exemptions. Implementations must use Skillit Kit BDS token names directly — no local aliases, no parallel systems. If a token is missing, flag it for addition rather than inventing a replacement.

### Colors
| Variable | Name | Role |
|---|---|---|
| `--color-background` | Canvas `#F7F1ED` | Default background — all surfaces |
| `--color-surface` | Plaster `#FFFFFF` | Elevated cards, panels, isolated inputs |
| `--color-foreground` | Iron `#232F36` | Default text, functional control boundaries, neutral utility icons, completed progress. No layout dividers. Never `#000000` |
| `--color-primary` | Traffic Cone `#EF6F1A` | Primary actions, selection controls, and focus; functional repetition allowed. One dominant CTA per section, not one orange element. Charts follow assigned data roles |
| `--color-link` | Painter’s Tape `#007CA6` | Links (underlined), info text (not underlined), blue info status icons; purposeful data encoding including supply-side maps/charts |
| `--color-success` | Bottle Glass `#33663D` | Success messages, green success status icons (circle + label), appropriate controls/data; not selection indicators or completed progress |
| `--color-warning` | Hard Hat `#FEB11C` | Warning messages, yellow warning status icons (triangle + label), appropriate controls/data; documented icon contrast limitation |
| `--color-error` | Toolbox `#C8102E` | Error messages, red error status icons (octagon + label), destructive actions and appropriate data |

Hover states: each color has a `-hover` variant (e.g., `--color-surface-hover`). Use them — do not use opacity or brightness filters for hovers.

### Typography
- `--font-primary`: Work Sans — all human text.
- `--font-mono`: JetBrains Mono — machine data only (timestamps, IDs, distances, file sizes, code). Never for running human copy or ordinary UI labels/headings; approved machine metadata, captions, chart references, and data displays may use it.
- Size tokens: `--text-0.75x` (12px, labels/captions minimum) through `--text-8x` (128px hero). Name size tokens by tier (`Text-2x`), not semantic aliases (`text-sm`). Use semantic HTML (`h1`–`h6`, labels, buttons, links) for meaning and accessibility; do not confuse HTML elements with token names. **No text renders below 1rem except approved `--text-0.75x` functional labels, captions, and machine references.**
- **Email typography:** Use Text-1x (16px / 1rem), Work Sans weight 450, line-height 1.4 as the default and minimum for readable email text—including signatures, footer contacts, addresses, copyright, legal links, captions, and source references. Use 600 for emphasis. Do not apply the general 12px Text-0.75x metadata exception to email. Larger canonical heading/display tiers remain available for marketing emails. Where variable weight 450 is unsupported, use the nearest supported regular weight and verify rendering. Allow contact rows to wrap on narrow screens; never shrink type or force horizontal overflow to keep them on one line.
- Mobile variants use the `-sm` suffix (`--text-2x-sm`). Display scales ×0.75 on mobile; `Text-1x` holds at 16px.

### Spacing
- Base scale: `--space-1` (4px) through `--space-24` (96px), multiples of 4 at a 16px root, except `--space-1.5` (0.375rem / 6px) for small-viewport text lists.
- Macro: `--space-128` (fluid `clamp()`), aliased as `--space-page`. Prefer the alias in new work. `--space-256` is removed.
- Page side margin and column gap are one token: `--space-gutter` (`clamp()`: 16px to 512px, 32px at 768px and above). Do not write the 16/32 values by hand.
- Deprecated: the `--space-*x` aliases. Use the numeric token (`--space-8`, not `--space-2x`).
- **Units rule:** font-size, base spacing, and paired padding use `rem`; borders and container radii use `px`, circular indicators may use `50%`. Canonical macro `clamp()` spacing retains approved `px`/`vw` expressions. Local `em` is permitted only for optical alignment and documented indicator geometry, not ordinary gaps or paired padding.
- **Card padding:** feature cards (quote, author, standalone) use `--space-8` (32px); list cards (repeated in a grid or list, such as job listings) use `--space-4` (16px). One tier per grid. See `components/cards.md`.
- **Paired padding:** `--padding-0.75x` = `0.375rem 0.75rem` at 12px; `--padding-1x` = `0.5rem 1rem` at 16px; `--padding-1.5x` = `0.75rem 1.5rem` at 24px; `--padding-2x` = `1rem 2rem` at 32px. These canonical fixed pairs override universal `0.5em 1em` prose.

---

## 3. Binary rules — memorize these

- **Action vs. state:** Buttons, links, inputs, checkboxes, radios, and chips support actions. Pill (`9999px`) belongs to button-like actions/chips, not every interaction. Editable fields, checkbox boxes and static tags use `0px`; static cards/panels/photos and toast bodies use `16px`. Inner radio/checkbox indicators show selection state; radio circles use `50%` geometry. Status icons, progress fills, and data fills are not actions. No intermediate container radii.
- **Accent/status roles:** Semantic message text, status icons, appropriate control fills, and purposeful canonical data colors retain their meaning-scoped roles. Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. All checkbox, radio, and selection-chip indicators use Cone, not Bottle Glass; repeated selection indicators and orange focus rings are functional exceptions. Never semantic layout/container backgrounds, decorative fills, structural borders, or shadows. All toast types use Plaster bodies with Iron text and their semantic icon color; close controls use Iron with Traffic Cone focus. Toast bodies remain static 16px-corner feedback panels, not actions; only close/link controls are actionable. No colored success/error/warning toast-background exception remains. Layout backgrounds remain Canvas or Plaster; Iron is allowed only as a functional modal backdrop or photographic text-legibility overlay.
- **No layout dividers or table gridlines.** Use whitespace and surface contrast. Where an existing component explicitly requires a functional boundary, it is Iron. Approved Cone checkbox, radio, and selection-chip indicator strokes/fills are selection-state exceptions, not semantic container borders. State also uses labels and shape; never color alone.
- **Action priority, not a color quota.** Use orange for primary actions, selection controls, and focus. Repetition is allowed when it serves the interaction. Keep one dominant CTA per section; supporting controls should not compete with it. Orange in charts follows its assigned data role. Never use it as decoration. See [checkboxes](./components/checkboxes.md). Supply/demand data encoding follows §7.
- **Focus outline:** Default 2px solid Traffic Cone with 2px offset. Cone on Canvas is 2.6958:1, below the 3:1 focus/UI floor; Cone on Plaster is 3.0177:1 and meets that floor. Keep orange as requested; do not promise AA on Canvas or quietly substitute Iron. Verify actual adjacent surfaces, clipping, keyboard visibility, and rendered native controls; preserve native focus in forced-colors mode. Flag unresolved surface contrast for review; the display-text exception does not waive focus contrast.
- **Contrast exceptions:** Painter’s Tape on Canvas is 4.2312:1 and remains an AA normal-text exception pending palette review; use Iron where AA is required. The documented Traffic Cone display/hero accent on Canvas (24px+) is 2.6958:1, an existing brand exception, never a WCAG pass. Canvas text on Traffic Cone is prohibited; Iron text is 4.5443:1.
- **Humans vs. machine:** Work Sans = human content; JetBrains Mono = machine data. Keep the intentional 1:1 tier-size pairing, not an equal-x-height claim. Measured current Google Fonts ratios: Work Sans cap/x = 0.66/0.50, JetBrains Mono = 0.73/0.55 (x-heights 8px/8.8px at 16px). Mono reads slightly taller; no type-scale change. [Font sources and remeasurement policy](./docs/design-reference.md#monospace--metadata).

**Buttons (CTAs):**
- Left-aligned, never centered. `align="left"` on wrapping `<td>` and inner `<table>`. Industry default is center; Skillit voice is left.
- **No arrow on the button label.** Button labels carry affordance through shape (pill), color (Cone), and weight. Arrows (`&rarr;` / `→`) are reserved for inline body links where the underlined text is a complete standalone sentence (“Read his article on LinkedIn →”). Not for buttons.
- Iron text on Cone background for primary CTAs. Sentence-case imperative copy.

---

## 4. Typography rules

- **Case:** Sentence case everywhere. No title case, no all-caps (exceptions in §1.5).
- **Alignment:** Flush-left only. Centered text banned.
- **Optical top alignment:** Align cap-height flush with adjacent elements using the measured Work Sans cap-height ratio (`0.66`) and the matching tier’s unitless leading token; remeasure if the deployed font differs. For Text-1x: `line-height: var(--text-1x-leading); margin-top: calc((0.66 - var(--text-1x-leading)) * 0.5em);` (`-0.37em` at 1.4 leading).
- **Optical balance on dark:** On non-Skillit dark surfaces only, subtract ~25 font-weight units to compensate halation (400 → 375). Skillit layout surfaces remain Canvas or Plaster; functional modal backdrops and photographic text-legibility overlays are the exception.
- **Numbers in data contexts:** `font-variant-numeric: tabular-nums` — mandatory.
- **Smart quotes:** Angled quotes and apostrophes in human copy; straight quotes only in code.
- **Widows/orphans:** Use `text-wrap: balance` on headings and `text-wrap: pretty` on body. Where unsupported, test critical copy at every supported width and zoom setting; adjust the wording or apply a non-breaking space between the last two words only after checking that it does not cause overflow. `<wbr>` adds a wrap opportunity inside a long word; it does not prevent a final single-word line. Allow natural wrapping if a manual fix harms reflow.

---

## 5. Logo & mark

- **Clear space:** 12.5% (1/8 of lockup height) on all sides.
- **Horizontal lockup only.** No stacked or vertical variants. Never the wordmark alone.
- **Header and footer below 1280px:** Use the mark alone — never scale the lockup below 21px height.
- **SKILLIT Hire pages:** Use the full SKILLIT Hire lockup (`assets/logo/lockup-hire-iron.svg`) at every width, mobile included. Set it 32px high (`--logo-height`). No mark-only swap on these pages.
- **Header height:** `--logo-height: 32px` for both lockup and mark, always set explicitly. Never `height: auto`.
- **Treatments:** Iron on Canvas (default). Single-color solid Iron or Canvas for print/embroidery, never an outline treatment. Preserve the approved fixed artwork and its paint; UI-style hex restrictions do not authorize consumer recoloring.
- **Banned:** stretching, rotating, drop shadows, enclosing in shapes, raster formats (except approved 512px-height PNG exports for SVG-rejecting platforms), recreating in any tool.

---

## 6. Icons & imagery

### SVG icons
- Tintable UI icons use `fill="currentColor"` to inherit host CSS color. Approved fixed SVG/graphic artwork and explicit source/export workflows may retain literal paint; never silently recolor logo consumers.
- 24×24px canvas, solid fill only. No strokes, outlines, gradients, shadows.
- Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone. Outer shapes support familiar conventions, not a learned information-type code. Use a clear info label; a help glyph denotes help, not information by itself. Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. Status-glyph runtime props identify semantic meaning; canonical host/layer tokens supply runtime styling. Approved status exports retain semantic grounds and opaque white glyphs as source artwork. External images cannot inherit host color; runtime overrides require inline per-layer token styling, not a combined alpha mask. Never introduce new hardcoded semantic UI paint or recolor approved assets. Selection indicators belong to interactive controls and use Traffic Cone, not success green. Fixed logo artwork is exempt. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast.

- **Imported names and geometry:** Use exact supplied paths and IDs from the [90-asset inventory](./components/icons.md#complete-imported-inventory), including user-selected `saw`, `concrete`, `pipe`, `user-hat`, and `user-round`. Success uses `check-circle.svg`, error `x-octagon.svg`, warning `exclamation-triangle.svg`, info `information-circle.svg` or `information-square.svg`, help `question-mark-circle.svg`; semantic props/classes stay independent of filenames. New `phone.svg` is a handset, distinct from `device-phone-mobile.svg`; new `user-circle.svg` is distinct from `user-round.svg`; Use `share.svg` for the three-node symbol and `arrow-up-on-square.svg` for the upward-arrow/square glyph. Follow the [naming and migration guide](./components/icons.md#naming-and-migration); do not use removed filenames as current paths or replace Skillit artwork with Heroicons. Fresh exports include 15 additions, not only renames. `play.svg` is a standalone triangle; circle play/pause variants retain opaque dark circles and white glyphs. Preserve opaque radio/checkbox/switch layers; never flatten multicolor exports into one mask. Switch-on retains a green right thumb on Plaster; switch-off a dark left thumb on Plaster, separate from Orange checkbox/radio/chip selection. Use canonical tokens for approved layer overrides; normalize eligible single-color raw paint only. Coordinate consumer assets and resolver paths; BDS edits do not deploy Rails/workspace migrations.

- **Legacy compatibility:** [75 archived prior-ID SVGs](./assets/icons/legacy/README.md) are frozen and excluded from the 90-icon canonical set. Do not normalize, recolor, regenerate, or substitute them for new work. Their manifest supplies migration targets and byte hashes. Consumers must explicitly select `legacy/`; adding this folder does not restore old root paths or automatically migrate Rails.

### Photography
- Real workers on real job sites, eye-level or below, candid, hands visible. Adobe Stock only.
- No AI-generated imagery, fabricated scene/background composites, color grading, or staged “safety theater.” No high-angle framing of worker subjects; aerial environmental/project images are permitted. Grid collages of separate authentic photos are permitted, not fabricated merged scenes.
- **Iron overlay for text legibility only:** 50% opacity Iron behind text overlays. Standalone images get no overlay.
- Crop faces above the temples, never at forehead level.

---

## 7. Data visualization

- **Containers:** Plaster card, `16px` corners, no shadows.
- **Bars:** `0px` corners — data is precision, not decoration.
- **Lines:** 4px stroke weight, data lines and gridlines alike. Y-axis gridlines only (Canvas); no X-axis gridlines, no bounding boxes.
- **Markers:** Squares or diamonds, `0px` corners. No circles.
- **Color:** Monochromatic is a default, not exclusive. Flat Iron context with a Cone insight is permitted; Cone alongside Painter’s Tape and other canonical palette colors is also permitted for purposeful categories. Require legends or direct labels, non-color cues, and actual-surface graphical/text contrast checks; never color alone. Scope meanings to the chart rather than banning data colors by their UI roles. For a monochromatic N-series treatment, optionally use equally stepped opacities of one base color: 100% / (100/N)% — 100/50 for two, 100/67/33 for three. Apply via `opacity` or `color-mix`; never define separate stepped hex values.
- **Maps:** Light base map for light mode. Supply-side data (worker availability) in Painter’s Tape; demand-side (job openings) in Traffic Cone.
- **Pie:** Solid, zero gap, zero stroke. No legends — labels outside the chart with 1px Iron leader lines.
- **References:** JetBrains Mono `Text-0.75x` (12px), opaque Iron; require approved source, date, cohort, and definition. No 14px or half-opacity reference text.
- **Tooltips:** Plaster background, 1px Iron border, `16px` corners.
- **Flowcharts:** Neutral Plaster decision nodes with Iron text. Do not use semantic fills unless a specific approved exception is documented. A single actionable CTA node may use Traffic Cone with Iron text.
- **Banned:** 3D, drop shadows, donut charts, radar charts, X-axis gridlines.

---

## 8. Layout

- **Surface hierarchy:** Canvas ground → Plaster cards → Iron structure → Traffic Cone signal. Four layers, no more. Iron is not a layout surface; functional modal backdrops and photographic text-legibility overlays are the explicit exception.
- **Whitespace is structural mass.** Minimum `--space-16` (64px) vertical padding on desktop sections. When in doubt, add space.
- **Header/body alignment:** Header bars use the same horizontal margins and padding as the body content below them.
- **Grid:** 12-column desktop grid, fixed column spans; `repeat(12, minmax(0, 1fr))` is valid equal-track construction, not an ad hoc content ratio. No arbitrary percentage splits. Max content width `1200px`; use the canonical token and responsive header/body side-padding contract in [spacing](./tokens/docs/spacing.md).
- **Text width:** Body columns never exceed `70ch`.

---

## 9. Voice rules (for any generated copy)

**Plain language is the default.** Customers and craft professionals are not in our business every day. Write so a five-year-old could follow the argument — short words, short sentences, no jargon. If a word only makes sense inside Skillit, replace it with the everyday word. Concrete over abstract (“getting the right worker to the right job site” not “optimizing the talent acquisition pipeline”). One idea per sentence. Cut every word that doesn’t carry weight.

- **Lead with the insight, not the product.** Data and outcomes first, but only verified claims. Reusable metrics require an approved source, observation/publication date, cohort, definition, and claim owner. [Legacy narrative metrics](./brand/narrative.md#metric-source-policy) are unverified and blocked until approved. Published 72-hour copy measures profile setup to interview; the older narrative measures search to interview. Do not choose one silently: block reuse until the owner resolves the definition with supporting data. “Free” applies only to craft professionals, not employers or the entire platform. Proposed “two agents” framing is not confirmed architecture.
- **“Connect,” “match,” “capture”** — never “serve,” “support,” “represent.”
- **“Platform” or “network”** — never “product,” “marketplace,” or “labor marketplace.”
- **“Craft professionals,” “members”** — not “customers” when referring to workers.
- **Demand-facing vocabulary:** Introduce “craft professionals” first; “workers” may follow in the same employer-facing context. For worker-facing copy, use “you,” the trade, “craft professionals,” or “members” for people who have joined; never generic “workers.” Market-at-large discussion may use “workers.”
- **Sam:** An AI tool, not a person; coordinates and surfaces information while the human decides. Never anthropomorphize.
- **Banned sentence structures:** Negation-then-assertion (“X isn’t Y; it’s Z”) and “we don’t just” upgrades. State the point directly; retain the fixed mission wording.
- **Banned words (brand voice):** Serve, Represent, Proud.
- **Exception:** “Workforce” and “labor marketplace” are permitted only when addressing the market at large — never to describe Skillit’s own network. Our network is a network. Our people are craft professionals, craft pros, members, contractors, or employers.
- **Banned words (AI-isms):** delve, tapestry, leverage, utilize, harness, foster, cultivate, realm, landscape, overarching, seamless, robust, dynamic, myriad, testament, beacon.
- **Note:** `LLM-INSTRUCTIONS.md` carries both — brand-voice banned words (above) and AI-ism banned words (below). `voice/brand-voice.md` carries brand-voice banned words only.
- **Banned transitions:** “Moreover,” “Furthermore,” “In conclusion,” “It is important to note.”
- **Banned hype:** “Revolutionize,” “disrupt,” “excited to announce,” “world-class.”
- Vary sentence length. Short punches mixed with longer thoughts. Concrete, physical detail over abstraction.

**Don’t oversell.** State what is true. State it once. Then stop.
- Avoid stacking adjectives or claims (“powerful” + “intuitive” + “trusted” + “built for”) to manufacture value. One true claim is enough.
- Avoid comparisons that imply a competitor exists (“Unlike other platforms…”) when the comparison isn’t doing work.
- Lead with the data or the action, not the framing.

---

## 10. Implementation targets

**Confirm the target before generating code.**

**Target A — Marketing (`www.skillit.com`), Squarespace:**
- Output: Figma prototypes, SVG exports, plain-text token values, custom CSS.
- Custom CSS is compiled by an old LESS (2.7). It adds the bare numbers inside a fluid `clamp()`, even inside `calc()` (`5.17rem + 3.54vw` becomes `8.71rem`), so `clamp()` always returns its maximum and mobile never scales down. Wrap the whole value in the LESS escape: `font-size: ~"clamp(6rem, 5.17rem + 3.54vw, 8rem)" !important;`. Do not use `calc()` for this; it fails on the live site. The `-sm` tokens stay as written; only Squarespace needs the escape. Verify on the live page at about 390px: the computed h1 size should be near 96px, not 128px.
- Squarespace has one button size per variant, so the variant selects the BDS tier and the block's small/medium/large setting is ignored: **primary** = BDS primary at Text-1.5x (12px / 24px, leading 1.3); **secondary** = BDS primary at Text-1x (8px / 16px, leading 1.4); **tertiary** = BDS secondary at Text-1x. Header and menu buttons are Text-1x. Weight is 600 on all three. Extend the 1x hit area to 44px with a pseudo-element (`components/buttons.md`). Squarespace's own selectors carry id weight, so override at `#siteWrapper` or with `!important`.
- DO NOT output: `tailwind.config.js`, ERB, Rails code.

**Target B — Product (`app.skillit.com`), Rails 7.2 (tailwindcss-rails, importmap):**
- Preserve the verified existing `main` integration: `config/tailwind.config.js`, CSS in `app/assets/stylesheets/onboarding.css`, and copied SVGs in `app/assets/images/bds/icons/` and `app/assets/images/bds/logo/`. Use ViewComponents or ERB partials for rendering, not as the SVG export directory. Review the existing foundation and current adoption status in the [README](./README.md#integration-points); do not relocate tokens to `application.css` or replace the architecture without engineering review.
- DO NOT output: npm instructions, Vite config, standalone HTML.

---

## 11. VALIDATION CHECKLIST — run before every output

1. Authored UI styles use canonical variables, no hex or duplicate aliases; allow source tables, explicit token/export workflows, and unchanged approved asset paint (§1.1).
2. No `box-shadow` on any element.
3. No `text-align: center` anywhere.
4. Container radii are `0px`, `16px`, or pill; circular radio/status/selection geometry may use `50%`, not a new radius tier.
5. Authored UI copy is sentence case; acronyms, proper nouns, fixed wordmark, user data, and direct quotes retain capitalization.
6. Buttons/chips are pill; editable inputs/checkbox boxes are `0px`; cards and toast bodies are `16px`. Links, inputs, checkboxes, and radios remain actions; inner indicators, status icons, progress, and data marks display state/data, not actions.
7. Use orange for primary actions, selection controls, and focus. Repetition is allowed when it serves the interaction. Keep one dominant CTA per section; supporting controls should not compete with it. Orange in charts follows its assigned data role. Never use it as decoration. Structural borders remain Iron except selection paint. Focus defaults to 2px Cone with 2px offset; Canvas 2.6958:1 is below 3:1, Plaster 3.0177:1 meets it. Preserve forced-colors native focus, verify rendered surfaces/controls, and flag contrast gaps without an Iron fallback or AA claim.
8. Tintable UI icons use `fill="currentColor"`; status uses familiar icons, semantic colors, and clear labels, never shape or color alone. Outer geometry is not an information-type code; status icons are not automatically interactive. Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. Status-glyph runtime props select meaning and host CSS token color, not fixed asset paint. Checkbox/radio/selection-chip outlines and fills are Cone with contrasting Iron inner check glyphs; chip pills stay Plaster with Iron text. Preserve approved fixed graphic/logo paint. All toast types use Plaster bodies with Iron text and their semantic icon color; close controls use Iron with Traffic Cone focus. Toast bodies remain static 16px-corner feedback panels, not actions; only close/link controls are actionable. No colored success/error/warning toast-background exception remains. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast.
9. Charts: no X gridlines, donut, radar, or 3D; monochromatic Iron/Cone is optional/default, not exclusive; purposeful categories may use Cone, Tape, and other canonical colors with legends or direct labels, non-color cues, and actual-surface contrast; `tabular-nums`; references 12px mono opaque Iron with approved source/date/cohort/definition.
10. Type uses canonical tier tokens; semantic HTML headings/controls are required for meaning. Work Sans for human copy, JetBrains Mono for approved machine data/references; keep 1:1 sizes, not equal-x-height claims. Optical alignment uses measured 0.66 Work Sans cap height.
11. Logo is the approved SVG, unmodified, with 12.5% clear space; mark-only in the header and footer below 1280px, except SKILLIT Hire pages, which keep the full SKILLIT Hire lockup at every width. Only SVG-rejecting platforms may use approved 512px-height PNGs; preserve SVG geometry/aspect and fixed paint, never consumer-recolor.
12. Base spacing uses `--space-*` in `rem`; paired padding uses matching `--padding-*` fixed rem pairs. Keep canonical macro `clamp()` expressions; `em` only for optical/indicator geometry, `50%` only circular indicators, container radii/borders in `px`. Test reflow; no forced widow fixes that overflow.
13. No banned words or transitions in copy.
14. Header margins match body margins.
15. **Copy is plain language.** No jargon. No stacked adjectives. One claim per sentence. If a sentence can be cut without losing meaning, cut it.
16. **No overselling.** No claim-stacking or invented current statistics; legacy metrics and conflicting 72-hour definitions remain blocked until approved; “free” is craft-professional-only. Proposed website structure and two-agent framing are not shipped inventory/architecture. Apply migrations only to requested scope, with engineering review for broader changes. Preserve genuine imagery, environmental aerial/grid-collage exceptions, and neutral pattern exclusion zones.
