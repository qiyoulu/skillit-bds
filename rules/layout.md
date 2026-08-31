# Layout Rules — Skillit BDS
**Last updated:** 2026-08-17
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
| Structure | Iron | `--color-foreground` | Text, borders, dividers, nav elements |
| Signal | Traffic Cone | `--color-primary` | One dominant accent per layout section — CTAs, key data, active states |
State colors (Hard Hat, Toolbox, Bottle Glass, Painter's Tape) are functional only. They appear in UI interactions, not in layout composition.
---
## Whitespace rules
- **Section padding (desktop):** Minimum `--space-16` (64px) top and bottom. Hero sections: minimum `--space-24` (96px).
- **Section padding (mobile):** Minimum `--space-10` (40px) top and bottom.
- **Between unrelated content blocks:** Always `--space-16` minimum. Never let unrelated content run together visually.
- **Text column width:** Never exceed `70ch`. Set `max-width: var(--max-width-text)` on all body text blocks.
- **Image-to-text gap:** Minimum `--space-8` (32px) between an image and its adjacent text block.
---
## Grid
### Website / marketing
- Strict 12-column grid on desktop. No flexible fractional columns (e.g., `1fr`, `1.5fr`). Use fixed `col-span` classes so elements align flawlessly down the vertical axis.
- Gutter: `--space-8` (32px).
- Content max-width: `1200px`, centered.
- Side margins: `--space-16` (64px) desktop.
- **Tablet (`< 1024px`):** The 12-column grid collapses to a single-column layout early to prevent element jumbling. Large typography needs horizontal space; never force complex multi-column grids onto medium viewports.
- **Mobile (`< 768px`):** Scaling down typography via CSS `clamp()` and implementing `--space-8` (32px) minimum mobile side padding to maintain the premium, editorial whitespace aesthetic.
### App (worker-facing)
- Single-column, max-width `480px`.
- Side padding: `--space-4` (16px).
- All interactive elements respect a minimum touch target of `44px`.
---
## Visual minimalism rules
These are hard constraints derived from the core brand direction. They apply to every generated layout.
1. **Flush left alignment.** The system relies on a strict horizontal grid. Text blocks, headings, and data tables align flush left. Centered text is prohibited for body copy and strongly discouraged for headlines.
2. **Optical Top Alignment.** Multi-column elements align at the top edge. To achieve this, typography should be vertically trimmed (`margin-top: -0.15em`) so the cap height—not the invisible line-height box—aligns flush with adjacent images or containers.
3. **Button Alignment Exception.** Do not align buttons by their external padding bubble. Align them optically by the text inside them. A button should shift upward by its top padding value to ensure its internal text cap-height aligns with adjacent layout elements.
4. **Tension through scale.** Hierarchy is established by extreme leaps in typographic scale (e.g., `--text-8x` directly adjacent to `--text-1x`), not by stepping gently through intermediate sizes or adding color.
5. **Strict functionalism.** Every border and margin should serve a structural purpose. No decorative elements, abstract shapes, blobs, or illustrated backgrounds. The boot tread pattern is permitted in the nav bar header only.
6. **One accent per layout section.** Traffic Cone (`--color-primary`) appears once per page section. It does not repeat as decoration.
7. **Shape signals action (Static = 16px, Actionable = Pill).** All static layout containers (cards, panels, photographs) use `border-radius: 16px`. Actionable human touchpoints (buttons) use a fully rounded pill shape (`border-radius: var(--radius-pill)`, 9999px). No intermediate rounded corners (e.g., 4px or 8px) are permitted. No gradients, no drop shadows.
8. **Typography does the heavy lifting.** Space and scale create order. Color is exclusively used to signal interactive function (links, buttons, states).
---
## Section types
### Hero
- Full viewport height on desktop, minimum `560px`.
- Background: Canvas (`--color-background`).
- Worker portrait (isolated, hard-edge) placed right or center.
- Headline: `--text-8x` or `--text-4x`, Iron, ALL CAPS.
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
- Stats: `--text-8x`, Traffic Cone.
- Stat labels: `--text-1x`, Iron.
- Background: Canvas or Iron (inverted — white text on Iron, Traffic Cone stats).
### CTA / sign-up section
- Centered, maximum `600px` wide.
- One headline, one subline, one button.
- Background: Canvas or full Iron panel.
- Button: Traffic Cone background, Iron text.
---
## Nav bar
- Background: Canvas with boot tread pattern overlay (low opacity — texture only, not legible repeat).
- Logo: left-aligned.
- Nav links: Iron, `--text-1x`, ALL CAPS, no underline at rest.
- Active nav link: Traffic Cone, no underline.
- Primary CTA (“Join”): Traffic Cone button, right-aligned.
- Nav tabs (approved): How It Works · Our Network · Jobs · About Us · Resources
---
## What is banned in layouts
- Gradients of any kind
- Drop shadows on content
- Sharp edges (0px) on structural containers — use 16px
- Intermediate rounded corners (e.g., 4px or 8px)
- Beveled or angled image masks
- Pattern fills on content surfaces (boot tread is nav header only)
- More than one accent color per layout section
- Centered body text or centered layout structures (flush-left is the law)
- Full-bleed background color sections in accent colors (Traffic Cone, Hard Hat, Toolbox — these are UI states, not backgrounds)
