# Layout Rules — Skillit BDS

**Last updated:** 2026-07-10

---

## The core principle

Whitespace is structural mass. It organizes data and anchors the grid. The human is the subject; the layout is the mathematical framework that supports them. 

The visual constraint (non-negotiable): **mostly white, black, and a splash of a single accent.** If a visual element does not perform a strict functional job, delete it.

---

## Surface hierarchy

Every layout is built on three layers. Use them in order.

| Layer | Color | Token | Role |
|---|---|---|---|
| Ground | Notebook | `--color-bg` | Default background for all surfaces |
| Structure | Graphite | `--color-fg` | Text, borders, dividers, nav elements |
| Signal | Cord | `--color-primary` | One dominant accent per layout — CTAs, key data, active states |

State colors (Hard Hat, Toolbox, Lumber, Cooler) are functional only. They appear in UI interactions, not in layout composition.

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
- 12-column grid on desktop, 8 on tablet, 4 on mobile.
- Gutter: `--space-6` (24px).
- Content max-width: `1200px`, centered.
- Side margins: `--space-16` (64px) desktop, `--space-8` (32px) tablet, `--space-4` (16px) mobile.
- Full-bleed sections (hero, large image panels) may extend to viewport width — content within them still follows the max-width container.

### App (worker-facing)
- Single-column, max-width `480px`.
- Side padding: `--space-4` (16px).
- All interactive elements respect a minimum touch target of `44px`.

---

## Visual minimalism rules

These are hard constraints derived from the core brand direction. They apply to every generated layout.

1. **Flush left alignment.** The system relies on a strict horizontal grid. Text blocks, headings, and data tables align flush left. Centered text is prohibited for body copy and strongly discouraged for headlines.

2. **Tension through scale.** Hierarchy is established by extreme leaps in typographic scale (e.g., `--text-80` directly adjacent to `--text-16`), not by stepping gently through intermediate sizes or adding color.

3. **Strict functionalism.** Every border and margin must serve a structural purpose. No decorative elements, abstract shapes, blobs, or illustrated backgrounds. The boot tread pattern is permitted in the nav bar header only.

4. **One accent per layout.** Cord (`--color-primary`) appears once per page section. It does not repeat as decoration. 

5. **Shape signals action (Static = Sharp, Actionable = Pill).** All static layout containers (cards, panels, photographs) must use hard, straight edges (`border-radius: 0`). Only actionable human touchpoints (buttons) use a fully rounded pill shape (`border-radius: 100px`). No intermediate rounded corners (e.g., 4px or 8px) are permitted. No gradients, no drop shadows.

6. **Typography does the heavy lifting.** Space and scale create order. Color is exclusively used to signal interactive function (links, buttons, states).

---

## Section types

### Hero
- Full viewport height on desktop, minimum `560px`.
- Background: Notebook (`--color-bg`).
- Worker portrait (isolated, hard-edge) placed right or center.
- Headline: `--text-80` or `--text-40`, Graphite, sentence-case.
- Single Cord CTA button beneath headline.
- No secondary CTA below the fold.

### Content section
- Two-column (text left, image right) or full-width text.
- Background: Notebook.
- Subheading: `--text-20`, Graphite.
- Body: `--text-16`, Graphite, max `70ch`.
- Accent use: Cord for inline data callouts or a single stat highlight, not decorative.

### Data / proof section
- Stat blocks in a 3- or 4-column grid.
- Stats: `--text-80`, Cord.
- Stat labels: `--text-ui-sm`, Graphite.
- Background: Notebook or Graphite (inverted — white text on Graphite, Cord stats).

### CTA / sign-up section
- Centered, maximum `600px` wide.
- One headline, one subline, one button.
- Background: Notebook or full Graphite panel.
- Button: Cord background, Notebook text.

---

## Nav bar

- Background: Notebook with boot tread pattern overlay (low opacity — texture only, not legible repeat).
- Logo: left-aligned.
- Nav links: Graphite, `--text-ui-sm`, sentence-case, no underline at rest.
- Active nav link: Cord, no underline.
- Primary CTA (“Sign up”): Cord button, right-aligned.
- Nav tabs (approved): How It Works · Our Network · Jobs · About Us · Resources

---

## What is banned in layouts

- Gradients of any kind
- Drop shadows on content
- Rounded corners on any element ()
- Intermediate rounded corners (e.g., 4px or 8px)
- Beveled or angled image masks
- Pattern fills on content surfaces (boot tread is nav header only)
- More than one accent color per layout section
- Centered body text or centered layout structures (flush-left is the law)
- Full-bleed background color sections in accent colors (Cord, Hard Hat, Toolbox — these are UI states, not backgrounds)
