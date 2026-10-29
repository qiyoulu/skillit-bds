# Layout Rules — Skillit Kit BDS
**Last updated:** 2026-10-22
---
## The core principle
Whitespace is structural mass. It organizes data and anchors the grid. The human is the subject; the layout is the consistent framework that supports them.

The visual constraint (non-negotiable): **mostly white, black, and a splash of a single accent.** If a visual element does not perform a strict functional job, delete it.

**The visual direction is softer and bolder at the same time:**
- **Softer** — communicated through the earth tones of projects and people. Canvas ground, iron structure, material-named accent colors. Whitespace that breathes. Photography that reads as documentary, not stylized.
- **Bolder** — communicated through the innovative and creative spirit of the product. Large, confident type. Expansive layout moments where the image carries the story (full-viewport photography, full-width environment shots). A single Traffic Cone accent that signals action without shouting.

Boxes should not feel restrictive. The grid is structural; the experience should feel expansive. When a section carries a single strong image or a single strong idea, let it fill the space — full-bleed photography, wide environment shots, generous type scale that asserts the point without decoration. The brand sells a dream to the American people, not a feature list to a contracting firm. The layout should reflect that scale.

**Structural vs. flat feels:** Cards and panels (Plaster surfaces) are for grouped, scannable data — job cards, stat blocks, feature lists. Full-bleed and large-format moments (Canvas ground, photography carrying the full width) are for narrative, hero, and emotional impact. Use each for its purpose. Don't turn a story into a card grid. Don't turn a data section into a full-screen photograph.

When generating a layout, choose the surface type that matches the moment:
- **Expansive:** hero imagery, single strong portrait, wide environmental shot, full-bleed section that lets a single idea breathe.
- **Structured:** cards, grids, stat blocks, scannable data — where comparison and scanning are the job.
Use the tool that fits the job. Don't default everything to one mode.
---
## Surface hierarchy
Every layout is built on four layers, in order of elevation and visual weight:
| Layer | Color | Token | Role |
|---|---|---|---|
| Ground | Canvas | `--color-background` | Default background for all surfaces |
| Lifted Surface | Plaster | `--color-surface` | Cards and isolated containers |
| Structure | Iron | `--color-foreground` | Text, neutral icons, functional control boundaries; no layout dividers |
| Signal | Traffic Cone | `--color-primary` | Primary actions, selection, focus, and assigned chart roles; functional repetition allowed; not 16px active navigation text |
Color roles are scoped by function, not by whether an element is generally called a state. Interactive checkbox, radio, and chip selection indicators use Traffic Cone. Semantic status icons use success green, warning yellow, error red, and info blue; neutral utility icons and completed progress use Iron. Preserve ordinary message text and the existing validation text policy. Every toast is a static Plaster panel with Iron body text and close control, plus a semantic icon. Charts may use Traffic Cone, Painter’s Tape, and other approved palette colors with labels and legends; see `rules/data-viz.md`. Focus uses 2px Traffic Cone with 2px offset; Canvas contrast fails 3:1 and Plaster narrowly passes. See `rules/accessibility.md` and the component specs.
---
## Whitespace rules
- **Section padding (desktop):** Minimum `--space-16` (64px) top and bottom. Hero sections: minimum `--space-24` (96px).
- **Section padding (mobile):** Minimum `--space-8` (32px) top and bottom.
- **Between unrelated content blocks:** Always `--space-16` minimum. Never let unrelated content run together visually.
- **Text column width:** Never exceed `70ch`. Set `max-width: var(--max-width-text)` on all body text blocks.
- **Image-to-text gap:** Minimum `--space-8` (32px) between an image and its adjacent text block.
---
## Grid
### Website / marketing
- Strict equal-track 12-column grid on desktop: `grid-template-columns: repeat(12, minmax(0, 1fr))` is permitted. Assign content by integer column spans. Do not replace the shared grid with arbitrary fractional ratios (e.g., `1fr 1.5fr`) or local percentage splits.
- Gutter: `--space-gutter`, 16px to 512px, ramping to 32px at 768px. It is also the page side margin, so margins and column gaps are one value. Exception: list cards use `--space-4` (16px) between cards at every width (`components/cards.md`).
- Content max-width: `1200px`, centered. The side padding (32px from 768px) stays in place until the viewport can hold 1200px plus both margins, so the cap is reached at 1264px; a centered 1200px block never touches the screen edge.
- Minimum content-block width: `326px` (`--column-min-width`), not the width of each track in the 12-column grid. At narrower viewports, allow a single content block to shrink to the available width so reflow is preserved.
- Desktop content: max-width `1200px`, centered; headers use the same content column. Build the container as `max-width: calc(var(--max-width-content) + 2 * var(--space-gutter))` with `box-sizing: border-box` and `padding-inline: var(--space-gutter)`.
- **Vertical page padding:** `--space-128` above and below the content: 32px on mobile, 64px at 768px, 128px from 1280px. Up to 768px it is exactly twice `--space-gutter`; above 768px the gutter holds at 32px while this keeps growing.
- **Tablet (768–1023px):** Use `--space-gutter` (32px) side padding, shared by header and body. The 12-column grid collapses to two columns (336px each at 768px with the 32px gutter, never below `--column-min-width`). Large typography needs horizontal space; never force grids of three or more columns onto medium viewports.
- **Mobile (`< 768px`):** Scaling down typography via CSS `clamp()` and using `--space-gutter` (16px) mobile side padding to maintain the premium, editorial whitespace aesthetic.
### App (worker-facing)
- Max-width `1200px` (`--max-width-app`); collapse to a single column on small viewports.
- Header and body share the marketing content contract: side padding is `--space-gutter` (16px to 512px, 32px at 768px); the centered 1200px usable content width is reached at 1264px. Use `box-sizing: border-box`.
- All interactive elements respect a minimum touch target of `40px`.
---
## Visual minimalism rules
These are hard constraints derived from the core brand direction. They apply to every generated layout.

**No layout lines or drop shadows.** Applies to slides, documents, and UI layouts: no divider rules, underlines added beneath headings, table gridlines, or separator strokes between content blocks. Separate content through whitespace, alignment, typography, and Canvas/Plaster surface contrast. When two groups of content need a visible boundary, give each its own Plaster card on Canvas, or alternate row fills in a table ([tables](../components/tables.md)); do not reach for a rule. Lines are reserved for data (4px, per `rules/data-viz.md`). Do not inherit borders or shadow effects from presentation themes. Functional chart lines, chart leader lines, control boundaries, link underlines, and keyboard-focus rings follow their existing component/data rules; they are not layout separators.

1. **Flush left alignment.** The system relies on a strict horizontal grid. Text blocks, headings, and data tables align flush left. Centered text is prohibited, including headlines.
2. **Optical Top Alignment.** Multi-column elements align at the top edge. To achieve this, typography should be vertically trimmed using the Work Sans cap-height ratio (0.66). Use the matching tier’s unitless leading token: for Text-1x, `line-height: var(--text-1x-leading); margin-top: calc((0.66 - var(--text-1x-leading)) * 0.5em);`. Example: a `1.4` line-height requires a `-0.37em` margin-top.
3. **Button Alignment Exception.** Do not align buttons by their external padding bubble. Align them optically by the text inside them. A button should shift upward by its top padding value to ensure its internal text cap-height aligns with adjacent layout elements.
4. **Tension through scale.** Hierarchy is established by extreme leaps in typographic scale (e.g., `--text-8x` directly adjacent to `--text-1x`), not by stepping gently through intermediate sizes or adding color.
5. **Strict functionalism.** Every border and margin should serve a structural purpose. No decorative elements, abstract shapes, blobs, or illustrated backgrounds. The boot tread pattern is permitted as low-contrast Plaster-on-Canvas texture in empty document/header/footer regions or physical touchpoints; exclude logo, text, controls, focus rings, and photography. See `tokens/docs/logo.md`.
6. **Action priority, not a color quota.** Use orange for primary actions, selection controls, and focus. Repetition is allowed when it serves the interaction. Keep one dominant CTA per section; supporting controls should not compete with it. Orange in charts follows its assigned data role. Never use it as decoration.
7. **Shape signals action (Static = 16px, Actionable = Pill).** All static layout containers (cards, panels, photographs) use `border-radius: 16px`. Button-like actionable controls (buttons and chips) use a fully rounded pill shape (`border-radius: var(--radius-pill)`, 9999px). Editable fields, square checkbox indicators, static tags, and chart bars may use 0px; circular radio/status indicators, equal-sided icon buttons, and headshots may use 50% geometry. These are explicit geometry exceptions, not extra container radius tokens. Links are actions, not pill containers; status icons, progress fills, and data marks are not actions. No intermediate rounded corners (e.g., 4px or 8px), gradients, or drop shadows.
8. **Type and spacing: rem. Radii and borders: px.** Font-sizes and base spacing use `rem`; canonical macro `clamp()` spacing retains its approved `px`/`vw` expressions (respects user browser zoom settings, scales proportionally with root). Container radius tokens and border widths use `px`; approved circles use `50%` (visual weight, not typographic — a 1px hairline shouldn't scale with text).
9. **Typography does the heavy lifting.** Space and scale create order. Color signals functional roles (links, buttons, states, progress, approved data highlights), not decoration.
---
## Section types
### Hero
- Full viewport height on desktop, minimum `560px`.
- Background: Canvas (`--color-background`).
- Worker portrait (isolated, hard-edge) placed right or center.
- Headline: `--text-8x` or `--text-4x`, Iron, sentence-case.
- Single Traffic Cone CTA button beneath headline.
- No secondary CTA below the fold.
### Content section
- Two-column (text left, image right) or full-width text.
- Background: Canvas.
- Subheading: `--text-2x`, Iron.
- Body: `--text-1x`, Iron, max `70ch`.
- Accent use: Traffic Cone for inline data callouts or a single stat highlight, not decorative.
### Data / proof section
- Stat blocks in a 3- or 4-column grid.
- Stats: `--text-8x`, Iron; Traffic Cone marks only the single focal stat per section (the documented display contrast exception applies).
- Stat labels: `--text-1x`, Iron.
- Background: Canvas ground or Plaster cards. Iron remains foreground; functional modal backdrops, photographic text-legibility overlays and the footer band (web and email) are the only dark-background exceptions.
### CTA / sign-up section
- Flush-left text and CTA, maximum `600px` wide; the outer container may sit in the centered content grid.
- One headline, one subline, one button.
- Background: Canvas or Plaster, never a full Iron panel.
- Button: Traffic Cone background, Iron text.
---
## Nav bar
- Background: Canvas; no texture band.
- Logo: left-aligned.
- Nav links: Iron, `--text-1x`, sentence-case, no underline at rest.
- Active nav link: Iron, canonical 600 weight + underline and `aria-current="page"`; never Traffic Cone at 16px.
- Primary CTA (“Join”): Traffic Cone button, right-aligned.
- Nav labels use sentence case: How it works · Our network · Jobs · About us · Resources
---
## What is banned in layouts
- Gradients of any kind
- Drop shadows anywhere
- Layout divider rules, heading rules, table gridlines, and separator strokes
- Sharp edges (0px) on structural containers — use 16px
- Intermediate rounded corners (e.g., 4px or 8px)
- Beveled or angled image masks
- Pattern fills behind content, controls, logos, focus rings, or photography; only empty structural texture zones are allowed
- Competing dominant CTA accents or decorative accent repetition; documented functional selection/status/progress/data exceptions remain permitted
- Centered body text; the outer 1200px content container is centered while its text remains flush-left
- Full-bleed background color sections in accent colors (Traffic Cone, Hard Hat, Toolbox — these are UI states, not backgrounds)
