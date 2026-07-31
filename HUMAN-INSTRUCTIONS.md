# Brand Design System (BDS) — Skillit

## **Version 1.0 · July 2026**

## Introduction

This is the Skillit Brand Design System. This is not a static set of brand guidelines—it is a living system designed to evolve alongside the company. Its purpose is to ensure every Skillit touchpoint feels unmistakably like Skillit, regardless of who created it.

The brand is a strategic advantage. Our goal is to make the world—enterprise customers, tier-one investors, top talent, and partners— come to us before we even reach out.

This document is the human-readable translation of the rules. The system itself also lives as a machine-readable token library (via MCP). This means anyone at Skillit can use AI tools to generate presentations, sales collateral, product marketing (worker portraits, feature illustrations, screenshots), and other visual outputs that are mathematically and aesthetically perfectly on-brand.

Designers, marketers, writers, engineers, and anyone who has ever asked “does this look right?” — this is for you.

---

## At a Glance

**The Vibe:** Documentary, not corporate. The smartest person on the job site.
**The Typography:** Work Sans only. Sentence-case everywhere. No all-caps. Flush-left alignment. Dramatic leaps in scale.
**The Layout:** Strict functionalism. Whitespace is structural mass. Hard, straight edges only. Canvas (off-white) background, Iron (dark navy) text. No decoration.
**The Accent:** Traffic Cone (orange). Use it exactly _once_ per layout section. Never for decoration.
**The Photos:** Real workers doing real work. Shot at eye level. No color grading.
**The Copy:** Direct, unhedged, data-backed. Don’t say revolutionize or disrupt.
**The Assets:** All logos, icons, and graphics are built with `currentColor`. They should be inlined in code (or used as components) to inherit dynamic CSS coloring.
**The Rule:** Technology should make humans more essential, not more expendable. Start from the worker’s perspective.

---

## The Story

**Skillit is not a job board. We are workforce infrastructure.**
When you create assets for Skillit, you are designing for a specific, misunderstood reality: the physical world tracks materials, schedules, and budgets with extraordinary precision, but it doesn’t track the people doing the work.
Our data proves that only 1 in 20 workers are missing from the labor force, yet 9 in 10 employers can’t find them. **This is an access problem, not a shortage problem.**
Your job is to communicate that truth. Our visuals and copy should project infrastructure-level reliability to contractors, while maintaining absolute respect and dignity for the craft worker. Everything we make should reflect our founding reality: **we are builders who built tech**, not a software company that discovered construction.

---

## Mission

> Technology should make humans more essential, not more expendable.
> This is our anchor. Every design decision, every piece of copy, and every product interaction should pass this test. If an asset diminishes the worker, makes them look like a corporate resource, or relies on tech-utopian AI hype, revise it.

## **Worker First.** The brand is built around the worker, not the contractor. The contractor is our customer, but the worker is our subject. When in doubt, frame the design and the message from the worker’s perspective.

## Colors

The Skillit palette is Materials on Site — eight colors named for the physical materials workers handle every day. **Each color has one job. Use it for that job only.**

### The palette

| Name           | Hex       | CMYK            | Spot (Pantone) | Role                                    |
| -------------- | --------- | --------------- | -------------- | --------------------------------------- |
| Canvas         | `#FAF7F3` | 2, 2, 4, 0      | Paper          | Primary background — all surfaces       |
| Plaster        | `#FFFFFF` | 0, 0, 0, 0      | None           | Elevated surfaces, cards, form inputs   |
| Iron           | `#232F36` | 80, 50, 45, 65  | 432 C          | All text, structural elements           |
| Traffic Cone   | `#EF6F1A` | 0, 65, 100, 0   | 158 C          | Primary CTA, active states, key accents |
| Hard Hat       | `#FEB11C` | 0, 30, 100, 0   | 1235 C         | Warnings, non-fatal alerts              |
| Toolbox        | `#C8102E` | 2, 100, 85, 6   | 186 C          | Errors, destructive actions             |
| Bottle Glass   | `#367C2B` | 75, 15, 100, 10 | 364 C          | Success, confirmations                  |
| Painter's Tape | `#007CA6` | 100, 30, 10, 10 | 3135 C         | Text links only                         |

### Color Do / Don’t

- **Do** use Traffic Cone once per section, on the most important element.
- **Don’t** repeat Traffic Cone decoratively across borders, icons, and dividers.
- **Do** use Iron on Canvas for all body text.
- **Don’t** use Traffic Cone text on Canvas backgrounds at body size — it fails contrast.
- **Do** pair every status color with a specific shape (Circle for Success, Triangle for Warning, Octagon for Error) and a label.
- **Don’t** rely on color alone to communicate error, warning, or success.
- **Don’t** use gradients — all color transitions are hard edges.
- **Don’t** use Hard Hat, Toolbox, Bottle Glass, or Painter's Tape as layout backgrounds or decorative elements.
- **Don’t** use Painter's Tape as a button fill — it is for text links only.
- **Don’t** introduce any color outside the eight tokens.

---

## Logo

### The mark

The Skillit mark is the brand’s initial ‘S’ engineered for **physical grip**. Built from three interlocking blocks on a precise **1:3 shear**, the geometry acts as a **boot tread, machinery tracks, or diamond plate steel**. It encodes **traction**, **structural integrity**, and **forward momentum** into a single form. It **does not require the wordmark** to be understood.
**Grid:** 7×8 unit grid. One unit of clear space on all sides — protected area of 9×10 units.
**Minimum size:** 24px/18pt height. Below this threshold the internal negative space closes up and the mark loses definition.

### The wordmark

The wordmark is set in Work Sans Black, all-caps, with −3% tracking. It is a fixed graphic asset, not a line of text.
**Minimum size:** 18px/13.5pt height.
**Clear space:** Maintain a minimum clear space equal to the cap height of the wordmark on all sides. Never crowd it against an edge, another logo, or a photographic element.

### The lockup

The lockup is the mark and wordmark together. It is the primary logo — use it wherever possible.
**Horizontal lockup only.** The mark sits to the left of the wordmark, aligned to the cap height, with 2 units of space between them. (1 unit = 1 grid unit from the 7×8 mark grid.) No stacked or vertical variant.
**Minimum size:** 24px/18pt height (mark at 24px/18pt, wordmark at 18px/13.5pt).
**Clear space:** Maintain a minimum clear space of 2 units on all sides of the lockup as a unit. Never crowd it against an edge, another logo, or a photographic element.

### Color variants

| Variant              | Contrast | Use                                                     |
| -------------------- | -------- | ------------------------------------------------------- |
| Iron on Canvas       | 12.84:1  | Default — all light backgrounds                         |
| Canvas on Iron       | 12.84:1  | Dark backgrounds, inverted surfaces                     |
| Iron on Traffic Cone | 4.54:1   | Traffic Cone backgrounds only — marginal, use sparingly |
| Single color outline | —        | Print, embroidery, engraving only                       |

Canvas on Traffic Cone and Traffic Cone on Canvas both fail WCAG AA (2.83:1) and are not permitted.

### What not to do

- Do not stretch, compress, shear, or rotate the logo
- Do not apply drop shadows, outlines, or effects
- Do not enclose the mark in a circle, box, or shield — its silhouette is its own structure
- Do not place on busy photographic backgrounds without sufficient contrast
- Do not use legacy versions — the 2023 logo is retired
- Do not recreate the mark, wordmark, or lockup — always use the approved file
- Do not use raster formats (PNG, JPG, BMP) of the logo — always use the vector SVG

### The Pattern

The Skillit pattern is a step-and-repeat tessellation of the boot tread mark. Because the mark's negative space is designed as an interlocking joint, the repeated pattern locks together to form a structural, masonry-like wall. It is the only decorative graphic permitted in the system.
**Because the pattern is built directly from the mark, all technical rules that apply to the logo apply equally to the pattern** (no stretching, shearing, rotating, no drop shadows, no raster formats like PNG/JPG, and always use the approved SVG file).
**How to use it:**

- **Restricted Palette:** The pattern may ONLY be rendered using the neutral structural colors: Canvas, Plaster, and Iron (the whites and black). Accent colors are strictly banned.
- **As a structural anchor:** Use it to ground the top edge of a digital surface (e.g., the primary navigation bar). It creates a physical, structural boundary that grounds the layout. The preferred execution is rendering the pattern in **Plaster** (`#FFFFFF`) over a **Canvas** ground.
- **Physical applications:** Excellent for tactile physical touchpoints (e.g., debossed into leather, printed on packaging interiors, or as a subtle watermark on formal documents).
  **What not to do:**
- Do not use any accent colors (Traffic Cone, Bottle Glass, Toolbox, Hard Hat, Painter's Tape) for the pattern.
- Do not use the pattern as a background for running text.
- Do not scale it up massively to act as a hero graphic — it is masonry, not an illustration.
- Do not place it on photography.

---

## Iconography

Icons are tools, not decorations — heavy, solid, mathematically centered for job-site legibility.

All icons are drawn on a 24×24px canvas using a strict 10×10 sub-grid where one block equals 2px. The sub-grid solves centering math — 2px divides the 24px canvas evenly — and enforces the same heavy, cast-iron geometry as the mark. Every shape should snap to the grid; off-grid paths break the system.

Style is solid fill only. No strokes, no outlines, no gradients, no drop shadows, 0px corner radius on all geometry. Icons inherit their color via `fill="currentColor"` — never hardcode a hex value in an SVG.

Status never relies on color alone. Locked silhouettes: Success = Circle, Warning = Triangle, Error = Octagon.

**Core set (Phase I):** Checkmark · Error · Warning · Search · Arrow (×4) · Location · Clock · User · External link · Plus · Menu

---

## Typography

Skillit uses a primary typeface for human content, and a monospace typeface for machine data. Both are free, open-source, and available on Google Fonts, Adobe Fonts, and GitHub.

- **Work Sans** (Primary): Designed by Australian designer Wei Huang and inspired by early twentieth-century Grotesque typefaces, it is warm, direct, and legible.
- **IBM Plex Mono** (Metadata & Code): Designed by Mike Abbink and the Bold Monday foundry for IBM, it was engineered to emphasize the relationship between mankind and machine.

### The Typographic Algorithm

The typography system is mathematically derived. Levels are named objectively by their pixel size.
The scale is a perfect factor-of-2 progression built on a 16px baseline: `128 → 64 → 32 → 16`, with the addition of a smaller 12px caption level as the hard legibility floor.
| Level | Size | Base Weight | Bolded | Line Height | Tracking | Use |
| ------------ | ----- | ---------------- | ---------------- | ----------- | -------- | ------------------------------- |
| **Text-8x** | 128px | Bold (700) | Black (900) | 0.80 | −6% | Hero headlines at massive scale |
| **Text-4x** | 64px | Semibold (600) | Extra Bold (800) | 1.00 | −4% | Standard headlines |
| **Text-2x** | 32px | Medium (500) | Bold (700) | 1.20 | −2% | Subheadings, pull quotes |
| **Text-1x** | 16px | Regular (400) | Semibold (600) | 1.40 | 0% | All running copy |
| **Text-0.75x** | 12px | Regular (400) | Medium (500) | 1.55 | 0% | Captions, labels, legal |

_(Text-16x at 0.60 leading is aggressive at extreme scale — manually adjust if descenders clip.)_

### Variable weight & optical balancing

Work Sans is a **variable font**. Rather than fixed buckets, it has a continuous weight axis from 100 to 900.
**Optical correction:** Light text on a dark background creates an optical illusion (halation) that makes letterforms appear heavier than they are. Two techniques reduce this:

- **On light backgrounds (Canvas):** Use standard weights (400, 500, 600, 700). Canvas is already an off-white (`#FAF9F6`) rather than pure white, which naturally reduces irradiation against dark type.
- **On dark backgrounds (Iron, Traffic Cone, Toolbox, Bottle Glass):** Subtract ~25 units of font weight (375, 475, 575, 675). The goal is to make the text read as the same apparent weight as it would on a light background.

### Monospace & Metadata

All metadata (timestamps, worker IDs, distances, file sizes) and code blocks (inline `` or multiline) should use a monospace font to visually separate machine data from human text.

- **The Stack:** IBM Plex Mono (Primary), JetBrains Mono (Fallback).
- **The Scale:** Monospace fonts sit on a different em-square. To optically align with Work Sans without breaking the line-box, always scale inline monospace text to 90% of the parent font size.

### Typographic Punctuation

**Smart Quotes:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for writing code; angled quotes are for reading text.
**Hanging Punctuation:** All text blocks should use hanging punctuation (optical margin alignment). Quotation marks, bullets, and hyphens should hang _outside_ the left bounding box of the text column. This ensures the actual letters form a perfectly flush, unbroken architectural line down the left side of the layout grid.

### Widows and Orphans

A widow is a single word left alone on the last line of a paragraph or headline. They create visual holes in the grid and break the solid, block-like texture of our typography. They are strictly prohibited.

- **The Non-Breaking Space Rule:** You should manually inject a non-breaking space (`&nbsp;` in HTML, or `Option+Space` on Mac) between the final two words of any paragraph or heading. This physically ties the last two words together, forcing them to wrap as a unit and permanently eliminating widows.
- **In Engineering (CSS):** Apply `text-wrap: balance;` to all headlines (`h1`, `h2`, `h3`). Apply `text-wrap: pretty;` to all paragraph text (`p`). Because `text-wrap: pretty` is not yet supported in all legacy browsers, the manual non-breaking space rule above is still required as a fallback for all critical marketing copy.

### Paragraph and List Spacing

To maintain the grid’s mathematical rhythm, vertical spacing between text elements is strictly defined:

- **Paragraphs:** 16px. The gap between paragraphs is exactly equal to the body font size (1em).
- **Text Lists:** 8px. Items in a bulleted or numbered list sit tighter together so the list reads as a solid, cohesive block.
- **UI Lists:** 16px. Interactive lists (like a feed of jobs in the app) use a wider gap to protect touch targets.

### Case

**Sentence-case everywhere.** “Join for free” — not “Join For Free.” “How it works” — not “HOW IT WORKS.” All-caps and title case are banned in all typesetting. (The logo wordmark is the sole exception—it is a fixed graphic, not typed text.)

### Typography Do / Don’t

- **Do** use sentence-case everywhere, on every surface.
- **Don’t** use title case or all-caps in UI or layouts (the logo wordmark is the only exception).
- **Do** let size, weight, and spacing create hierarchy.
- **Don’t** use Traffic Cone or Hard Hat on headings to make them stand out — color signals function, not rank.
- **Do** use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`).
- **Don’t** use straight (dumb) typewriter quotes in human-readable copy.
- **Do** use 16px spacing between paragraphs and 8px between text list items.
- **Don’t** leave widows or orphans. Force at least two words onto the final line of any text block to maintain a solid shape.
- **Don’t** use Work Sans Light (300) — too thin for job-site legibility.
- **Don’t** use any typeface other than Work Sans.
- **Don’t** use Display or Heading sizes in UI components.
- **Don’t** track body copy — tracking is for display and heading sizes only, never on running copy.

---

## Layout

### The principle

**Whitespace is not empty space—it is structural mass.** It is the primary tool used to organize information and direct the eye. The human is the subject; the grid is the quiet, mathematical framework that supports them. Everything else gets out of the way.
**The core visual constraint, stated plainly:** mostly white, black, and a splash of a single accent. **If an element does not perform a specific, functional job, delete it.**

### Surface boundaries (Cards & Containers)

The interface relies on stark, physical separation rather than artificial lighting effects.

- **No drop shadows.** Banned universally.
- **No colored backgrounds for cards.** Do not use Hard Hat, Bottle Glass, or Traffic Cone as container backgrounds.

### Surface hierarchy

Every layout uses four layers, in order of elevation and visual weight:

1. **Ground** — Canvas. The default background for all pages and apps.
2. **Lifted Surface** — Plaster. Used for cards and isolated containers. Because drop shadows and borders are banned, Plaster separates purely through stark optical brightness and generous padding.
3. **Structure & Inversion** — Iron. Used for all text and structural lines. When massive visual weight or strict sectioning is needed, Iron inverts to become a dark background surface (with Canvas text).
4. **Signal** — Traffic Cone. One dominant accent per layout section.

### Rules

- **Flush left.** All typography and content blocks align flush left. Centered text is banned for running copy and strongly discouraged for headlines. The grid provides the structure; strict alignment makes it visible.
- **Optical Top Alignment.** Elements positioned across columns should align perfectly at their top edge. Because digital typography includes internal leading, text should be vertically trimmed using the exact cap-height ratio of Work Sans (`0.72`). The algorithm for the negative top margin is: `(line-height - 0.72) / 2`. Example: a `1.4` line-height requires a `-0.34em` margin-top.
- **Button Alignment.** When aligning a button alongside text, align the button by its typography (its internal cap height), not its external padding bubble. The button should shift upwards by the exact value of its top padding to achieve optical alignment.
- **Tension through scale.** Create hierarchy through dramatic leaps in scale (e.g., placing a 64px headline directly next to a 16px body copy block). Do not rely on intermediate sizes or color shifts to organize information.
- **Strict functionalism.** No decorative elements. No abstract shapes, blobs, or illustrated backgrounds. Every border, margin, and pixel should perform a structural job.
- **One accent.** Traffic Cone appears exactly once per layout section (e.g., on the CTA or a key stat). Never repeated decoratively.
- **Shape signals action.** Static structural elements (cards, layout panels, photographs) use hard, straight edges (0px). Actionable human touchpoints (buttons) use a fully rounded pill shape. Intermediate rounded corners (e.g., 4px or 8px) are banned. No drop shadows.
- **Mathematical text blocks.** Body text columns never exceed 70 characters wide to maintain perfect tracking and readability.

### Border radius (Shape signals action)

In this system, shape indicates whether an element is interactive or static. We rely on two extremes and nothing in between:

- **Static elements:** `0px` (sharp). Applied to all cards, layout panels, images, photos, and containers.
- **Actionable elements:** `100vmax` or `9999px` (fully rounded pill). Applied to primary CTA buttons and touch targets.
- **Intermediate radii:** Banned. Do not use `4px`, `8px`, or slightly rounded corners anywhere.

### Grid & Baseline

The layout is built on an **8px/16px baseline grid**, paired with **Fluid Architectural Scaling**.
While micro-spacing (`8px`, `16px`, `32px`) remains locked to absolute pixels to protect touch targets and UI integrity, macro-spacing (margins, section gaps, padding) uses CSS `clamp()` functions (`--space-64` through `--space-256`). This ensures the massive, confident margins seen on desktop smoothly and gradually compress as the viewport scales down, exactly mimicking the fluid, tensioned behavior of Anthropic's grid, without sudden, jarring jumps at breakpoints.
**12-Column Newspaper Grid:** All desktop layouts sit on a strict 12-column grid. Do not use flexible percentage splits. Blocks should span fixed column counts (e.g., 7 columns for hero text, 5 columns for the hero CTA) so that vertical alignment is maintained down the entire page.
| Element | Height / Padding | Margin |
| ------------------- | ----------------------------- | ------------ |
| Nav Bar | 64px | — |
| Logo Lockup | 32px height | — |
| Primary Buttons | 8px vertical, 16px horizontal | — |
| Desktop Section Gap | — | 128px |
| Desktop Page Margin | — | 320px (Anthropic scale) |

### Layout Do / Don’t

- **Do** leave generous space. Minimum 128px vertical padding on desktop sections.
- **Don’t** fill space with shapes, patterns, or decorative elements to avoid “emptiness.”
- **Do** use hard, straight edges (0px) for static containers and photos.
- **Do** use fully rounded pill shapes for primary buttons.
- **Don’t** use intermediate rounded corners (e.g., 4px or 8px) anywhere.
- **Don’t** bevel edges or use drop shadows.
- **Do** use the boot tread pattern in the nav bar header.
- **Don’t** use it as a section background or content surface fill.

---

## Data Visualization

Skillit’s data visualization is utilitarian. The charts should be legible, precise, and stripped of decorative noise. Our goal is human-centered clarity: every pixel should convey the truth of the data.

### Geometry & Structure

- **Containers:** All data viz graphics must sit on a Plaster (pure white) background card to isolate the data and maintain contrast against the surrounding UI.
- **Sharp edges:** Bar charts, tooltips, legends, and Plaster cards should have `0px` border-radius. No rounded edges.
- **Line weight:** All structural lines must be `4px` thick. This applies to data lines and gridlines.
- **Gridlines:** Rendered in Canvas with 4px stroke weight. Remove all outer bounding boxes. Use horizontal (Y-axis) gridlines only. No vertical gridlines.
- **Pie charts:** Slices must sit flush against each other with zero gap and zero stroke.
- **Line charts:** Both unsmoothed (stepped/linear) and smoothed (spline/curved) paths are permitted based on the data story.

### Color

- **Monochromatic scale:** Standard categorical charts use a monochromatic scale, rather than different colors, to preserve UI semantics.
- **Highlight:** Traffic Cone (orange) is used exclusively to highlight the focal data point or trend the viewer is supposed to care about. Orange is the thesis; Iron is the context.

### Banned Elements

- 3D effects and drop shadows.
- Donut charts (decorative SaaS trope. If showing a part-to-whole ratio, use a solid pie chart instead).
- Radar or spider charts.

---

## Voice & Tone

### The north star

> Write like the smartest person on the job site — the one who’s been doing this since before it was a startup, who knows the data cold, and who doesn’t need to prove they belong in the room because the work speaks for itself.
> **If it sounds like a press release, a pitch deck, or a LinkedIn growth-hacker, it’s wrong.**

### Four attributes

**Direct.** Say what you mean. No qualifiers, no throat-clearing.

- Wrong: “We think construction workers deserve better tools.”
- Right: “Construction workers deserve better tools.”
  **Counterintuitive.** Name the assumption. Surface the contradiction. Reveal the real insight.
- “Construction has the smallest labor gap of any industry. Yet 9 in 10 employers can’t find the workers they need. The problem isn’t shortage. It’s access.”
  **Data at human scale.** Cite the number. Then translate it into what it actually means.
- Wrong: “400,000 workers are missing from the construction workforce.”
- Right: “400,000 workers are missing. That’s 5% of the workforce. It feels like 33%.”
  **Grounded in physical reality.** Avoid digital abstraction. Anchor every idea in something you can touch or build.
- Wrong: “Optimizing the talent acquisition pipeline.”
- Right: “Getting the right worker to the right job site.”

### By channel

**Website / marketing:** Confident, proof-heavy, counterintuitive. Lead with the insight, not the product. One CTA per section. "Join." Never “Learn more.”
**Blog / editorial:** Authoritative, punchy, data-informed. Unified brand voice only — no individual bylines.
**Worker app:** Simple, respectful, warm. One idea per screen. Write for gloves and sunlight. “Complete your profile to get found faster.” Not “Optimizing your profile increases your discoverability.”
**Contractor dashboard:** Precise, no-nonsense. Outcome-focused. “Find qualified workers.” “Post a role.”
**LinkedIn / Executive voice:** Direct, opinionated, first-person. Counterintuitive claim → data → principle. Start with the surprising sentence.
**Press:** Founder-story-led. Lead with our founding story or a striking statistic. Never with a product feature.

### What Skillit never says

“Revolutionize.” “Disrupt.” “Ecosystem.” “Leverage synergies.” “Best-in-class.” “World-class.” “Empower.” “Holistic.” “Excited to announce.” “Thrilled to share.” “We believe.” “Perhaps.” “AI-powered” as the lead descriptor.

### Sam

Sam is Skillit’s AI assistant. Sam has a name because names matter — they signal that this is a tool built for humans, not a machine optimizing around them.

- Right: “Hey Sam, pull up civil welders with GMAW experience in Dallas.”
- Wrong: “Our proprietary ML algorithm surfaces qualified candidates based on your requirements.”
  **Sam coordinates and surfaces. The human still decides.**

### Copy Do / Don’t

- **Do** lead with the insight. “Only 1 in 20 workers are missing. 9 in 10 employers still can’t find them.”
- **Do** use inline bolding for key phrases in paragraph text to improve scannability. Assume the user will only read the bold words. If the bold words tell the complete story ("**1 in 20 workers**... **already out there**... **access better opportunities**"), the execution is correct.
- **Don’t** lead with the product. “Skillit is an AI-powered construction hiring platform...”
- **Do** use strict consistency for button labels. If a button points to account creation, it should say "Join" everywhere. Never alternate between "Get started", "Create a profile", and "Join" on the same page if they lead to the same destination.
- **Do** use one CTA per section. Ensure the primary mobile CTA is visible without scrolling.
- **Don’t** offer “Start hiring” alongside “Get hired” — consolidate to a single “Join.”

---

## Photography & Imagery

Photography is the brand’s most human element. Every image should make a craft worker feel seen — **not as a stock photo prop, but as a skilled professional** whose work builds the physical world.

### Hard rules

These apply to every image across every surface, without exception:

- **No drop shadows.** Images sit directly on the surface.
- **Blend modes:** All photography should apply the `multiply` blend mode (CSS: `mix-blend-mode: multiply;`). This melts lighter backgrounds directly into the Canvas layout ground, removing harsh rectangular borders and creating a premium, unified editorial finish.
- **No color grading.** Natural color only — no filters, no warm toning, no dramatic shifts.
- **No text or symbols.** Images should be completely free of text, symbols, UI elements, graphs, and numbers.
- **No AI generation.** Only authentic photography is permitted.
- **No composite backgrounds.** If the background is removed, the worker sits on Canvas or Iron — no invented environment behind them.
- **No stock photo aesthetics.** No fake smiles, obvious casting, or safety theater.

### Worker portraits

**Frame:** Eye level or slightly below. Never looking down at the worker. The subject fills the frame — workers are not small figures in a large environment.
**Lighting:** Flat, natural, or diffused. Outdoor overcast is preferred. Harsh direct sun is acceptable if it reads as authentic job-site light, not dramatic effect.
**What to show:** Skilled workers doing skilled work. Hands matter — show them being used. Real job sites: concrete, steel, dirt, equipment. Candid and dignified.
**What to avoid:** Workers at laptops or in conference rooms. Pristine, clearly costume safety gear. Looking down at the subject. Any framing that reduces the worker to a problem to be solved.

### The mood in one line

Documentary photography. Real sites, real light, real people. Eye level. Hard edges on Canvas or Iron.

### Photography Do / Don’t

- **Do** frame workers at eye level or below.
- **Don’t** shoot from above — it’s a power dynamic the brand explicitly rejects.

---

## A note on this document

These guidelines exist to help anyone at Skillit create work that feels unmistakably like Skillit — whether that’s a designer building in Figma, a writer drafting a press release, or an agency partner producing a social asset.
They are not a substitute for judgment. Rules describe the system. Judgment applies the system to situations the rules didn’t anticipate. When in doubt: go back to the mission. Does this make the worker feel more essential? Does this sound like the smartest person on the job site? If yes, you’re on brand.

---

_Skillit Brand Design System · Version 0.9-beta · July 2026_
_Brand Design: Chiyo · System: Skillit Narrative & Brand_

### Responsive Scaling

- Scale display headers down smoothly (using fluid typography or breakpoints) to half their size at mobile viewports.
- **Maintain the original desktop font-weight** when scaling down headers to preserve hierarchy and punch.
- Never scale down body or UI text (`Text-1x`, `--text-ui`); keep them at their desktop sizes for legibility.

---

## Engineering Handoff

The production codebase is **Ruby on Rails 7.2** using **`tailwindcss-rails`** and **importmap** (no npm build pipeline, no Vite or webpack).
**Token delivery format:**

- Brand tokens are delivered as a `tailwind.config.js` theme extension — not a standalone CSS file.
- The Google Fonts `<link>` tag for Work Sans belongs in `app/views/layouts/application.html.erb` inside `<head>`.
- SVGs are inlined as Rails ERB partials (e.g., `_icon_check.html.erb`) so they inherit `currentColor` dynamically.
- Any values Tailwind cannot express natively (e.g., optical weight offsets for halation compensation) go into `app/assets/stylesheets/application.css` as CSS custom properties.
  **What not to do:**
- Do not deliver a standalone HTML file or npm install instructions.
- Do not reference Vite, webpack, or a JS entrypoint for font loading.
- Do not use raw hex codes in templates — reference Tailwind config keys only.
