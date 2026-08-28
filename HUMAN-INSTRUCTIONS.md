# Brand Design System (BDS) — Skillit

## **Version 1.1 · August 2026**

## Table of Contents

- [Brand Design System (BDS) — Skillit](#brand-design-system-bds--skillit)
  - [**Version 1.1 · August 2026**](#version-11--august-2026)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [At a Glance](#at-a-glance)
  - [Who These Guidelines Are For](#who-these-guidelines-are-for)
  - [How to Use These Guidelines](#how-to-use-these-guidelines)
  - [Colors](#colors)
    - [The palette](#the-palette)
    - [Color Do / Don't](#color-do--dont)
  - [Logo](#logo)
    - [The mark](#the-mark)
    - [The wordmark](#the-wordmark)
    - [Wordmark-only usage](#wordmark-only-usage)
    - [The lockup](#the-lockup)
    - [Color variants](#color-variants)
    - [What not to do](#what-not-to-do)
    - [The Pattern](#the-pattern)
  - [Iconography](#iconography)
  - [Typography](#typography)
    - [The Typographic Algorithm](#the-typographic-algorithm)
    - [When to use Text-8x (128px)](#when-to-use-text-8x-128px)
    - [Case](#case)
    - [Monospace \& Metadata](#monospace--metadata)
    - [Italics \& Emphasis](#italics--emphasis)
    - [Spacing](#spacing)
    - [Block quotes](#block-quotes)
    - [Variable weight \& halation correction](#variable-weight--halation-correction)
    - [Typographic Punctuation](#typographic-punctuation)
    - [Widows and Orphans](#widows-and-orphans)
    - [Typography Do / Don't](#typography-do--dont)
  - [Layout](#layout)
    - [The principle](#the-principle)
    - [Surface boundaries (Cards \& Containers)](#surface-boundaries-cards--containers)
    - [Surface hierarchy](#surface-hierarchy)
    - [Rules](#rules)
    - [Border radius (Shape signals action)](#border-radius-shape-signals-action)
    - [Grid \& Baseline](#grid--baseline)
    - [Layout Do / Don't](#layout-do--dont)
  - [Data Visualization](#data-visualization)
    - [Chart requirements](#chart-requirements)
    - [Geometry \& Structure](#geometry--structure)
    - [Color](#color)
    - [Bar graphs](#bar-graphs)
    - [Flowcharts](#flowcharts)
    - [Banned Elements](#banned-elements)
  - [Voice \& Tone](#voice--tone)
    - [The north star](#the-north-star)
    - [The Five Core Traits](#the-five-core-traits)
    - [Tone by Channel](#tone-by-channel)
    - [Demand Gen vs. Supply Gen](#demand-gen-vs-supply-gen)
    - [Sam (The AI)](#sam-the-ai)
    - [Banned Language (Trait Violations)](#banned-language-trait-violations)
    - [Copy Do / Don't](#copy-do--dont)
  - [Photography \& Imagery](#photography--imagery)
    - [The mood in one line](#the-mood-in-one-line)
    - [Iron filter](#iron-filter)
    - [Collages](#collages)
    - [Photography Do / Don't](#photography-do--dont)
  - [Website pages](#website-pages)
    - [Header](#header)
    - [Home Page](#home-page)
    - [Find Work](#find-work)
    - [Our Network](#our-network)
    - [What We Do](#what-we-do)
    - [Resources](#resources)
    - [Who We Are](#who-we-are)
    - [Support](#support)
  - [A note on this document](#a-note-on-this-document)
    - [Responsive Scaling](#responsive-scaling)
  - [Engineering Handoff](#engineering-handoff)
  - [Resources](#resources-1)
    - [Asset Directory](#asset-directory)

---

## Introduction

This is the Skillit Brand Design System. This is not a static set of brand guidelines—it is a living system designed to evolve alongside the company. Its purpose is to ensure every Skillit touchpoint feels unmistakably like Skillit, regardless of who created it.

The brand is a strategic advantage. Our goal is to make the world—enterprise customers, tier-one investors, top talent, and partners— come to us before we even reach out.

This document is the human-readable translation of the rules. The system itself also lives as a machine-readable token library (via MCP). This means anyone at Skillit can use AI tools to generate presentations, sales collateral, product marketing (worker portraits, feature illustrations, screenshots), and other visual outputs that are consistently and aesthetically perfectly on-brand.

Designers, marketers, writers, engineers, and anyone who has ever asked "does this look right?" — this is for you.

---

## At a Glance

**The Vibe:** Documentary, not corporate. The smartest person on the job site.
**The Typography:** Work Sans only. Sentence-case everywhere. No all-caps. Flush-left alignment. Dramatic leaps in scale.
**The Layout:** Strict functionalism. Whitespace is structural mass. Hard, straight edges only. Canvas (off-white) background, Iron (dark navy) text. No decoration.
**The Accent:** Traffic Cone (orange). Use it exactly _once_ per layout section. Never for decoration.
**The Photos:** Real workers doing real work. Shot at eye level. No color grading or filters.
**The Copy:** Direct, unhedged, data-backed. Don't say revolutionize or disrupt.
**The Assets:** All logos, icons, and graphics are built with `currentColor`. They should be inlined in code (or used as components) to inherit dynamic CSS coloring.
**The Rule:** Technology should make humans more essential, not more expendable. Start from the worker's perspective.

---

## Who These Guidelines Are For

**Designers** — visual designers, brand designers, UI designers, and anyone creating graphical assets for Skillit.

**Communicators** — marketing, PR, internal comms, and anyone writing on behalf of the brand.

**Writers** — copywriters, content strategists, and anyone crafting product copy or editorial content.

---

## How to Use These Guidelines

**Designers** — Start here for visual rules: color, typography, layout, iconography, photography. Use the data visualization section for charts and graphics. Reference the voice & tone section for copy that appears in your designs.

**Communicators** — Start with voice & tone for writing rules by channel. Use photography & imagery for visual standards. Reference the data visualization section for charts in reports and presentations.

**Writers** — Start with voice & tone for vocabulary, mechanics, and channel-specific rules. Use the typography section for hierarchy and scale. Reference the brand story section for the core narrative.

**AI ingest** — If you are an AI agent assisting with Skillit work, these guidelines are your primary source for visual and verbal brand rules. For mission, story, and company context, extract key points from the Skillit culture doc.

---

## Colors

The Skillit palette is Materials on Site — eight colors named for the physical materials workers handle every day. **Each color has one job. Use it for that job only.**

### The palette

| Name           | Hex       | CMYK            | Spot (Coated / Uncoated) | Role                                    |
| -------------- | --------- | --------------- | -------------- | --------------------------------------- |
| Canvas         | `#FAF7F3` | 2, 2, 4, 0      | Paper — not an ink | Primary background — all surfaces       |
| Plaster        | `#FFFFFF` | 0, 0, 0, 0      | None — unprinted stock | Elevated surfaces, cards, form inputs   |
| Iron           | `#232F36` | 80, 50, 45, 65  | 432 C / 432 U  | Foreground                                                |
| Traffic Cone   | `#EF6F1A` | 0, 65, 100, 0   | 158 C / 158 U  | Primary action                                            |
| Hard Hat       | `#FEB11C` | 0, 30, 100, 0   | 1235 C / 1235 U | Warnings, non-fatal alerts              |
| Toolbox        | `#C8102E` | 2, 100, 85, 6   | 186 C / 186 U  | Errors, destructive actions             |
| Bottle Glass   | `#33663D` | 50, 0, 40, 60   | 2427 C / 2427 U  | Success, confirmations                  |
| Painter's Tape | `#007CA6` | 100, 30, 10, 10 | 3135 C / 3135 U | Link |

Coated and uncoated are the same ink on different paper — the number is shared, the appearance is not. Uncoated absorbs ink and returns lighter and duller. Always proof on the actual stock; Traffic Cone shifts most. Spot references apply only where you print spot (business cards, signage, vehicle wrap, embroidery) — process work uses the CMYK values.

### Color Do / Don't

- **Do** use Traffic Cone once per section, on the most important element.
- **Don't** repeat Traffic Cone decoratively across borders, icons, and dividers.
- **Do** use Iron on Canvas for all body text.
- **Don't** use Traffic Cone text on Canvas backgrounds at body size — it fails contrast.
- **Do** pair every status color with a specific shape (Circle for Success, Triangle for Warning, Octagon for Error) and a label.
- **Don't** rely on color alone to communicate error, warning, or success.
- **Don't** use gradients — all color transitions are hard edges.
- **Don't** use Hard Hat, Toolbox, Bottle Glass, or Painter's Tape as layout backgrounds or decorative elements.
- **Don't** use Painter's Tape as a button fill. Colors are limited to: text fill on Canvas/Plaster/Iron, button bg fill, and drawn icons (incl. status badges).
- **Do** use Painter's Tape text underlined for links, not underlined for info.
- **Don't** introduce any color outside the eight tokens.

---

## Logo

### The mark

The Skillit mark is the brand's initial 'S' engineered for **physical grip**. Built from three interlocking blocks on a precise **1:3 shear**, the geometry acts as a **boot tread, machinery tracks, or diamond plate steel**. It encodes **traction**, **structural integrity**, and **forward momentum** into a single form. It **does not require the wordmark** to be understood.
**Grid:** 7×8 unit grid. One unit of clear space on all sides — protected area of 9×10 units.
**Minimum size:** 21px/16pt height. Below this threshold the internal negative space closes up and the mark loses definition.

### The wordmark

The wordmark is set in Work Sans Black, all-caps, with −3% tracking. It is a fixed graphic asset, not a line of text.
**Minimum size:** 16px/12pt height.
**Clear space:** Maintain a minimum clear space equal to the cap height of the wordmark on all sides. Never crowd it against an edge, another logo, or a photographic element.

### Wordmark-only usage

Use the wordmark alone when:
- Space is constrained and the mark cannot meet minimum size (21px height)
- The mark already appears elsewhere on the same layout (e.g., footer lockup + header wordmark)
- The brand is clearly established in context (e.g., app icon, favicon, email signature)

**Do not** use the wordmark alone when:
- Introducing the brand to a new audience
- The lockup can fit at minimum size
- The wordmark reads as "SKILLIT" without the mark — the mark is what distinguishes us

### The lockup

The lockup is the mark and wordmark together. It is the primary logo — use it wherever possible.
**Horizontal lockup only.** The mark sits to the left of the wordmark, aligned to the cap height, with 2 units of space between them. (1 unit = 1 grid unit from the 7×8 mark grid.) No stacked or vertical variant.
**Minimum size:** 21px/16pt height (mark at 21px/16pt, wordmark at 16px/12pt).
**Clear space:** Maintain a minimum clear space of 2 units on all sides of the lockup as a unit. Never crowd it against an edge, another logo, or an image.

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

Icons are tools, not decorations — heavy, solid, consistently centered for job-site legibility.

All icons are drawn on a 24×24px canvas using a strict 10×10 sub-grid where one block equals 2px. The sub-grid solves centering math — 2px divides the 24px canvas evenly — and enforces the same heavy, cast-iron geometry as the mark. Every shape should snap to the grid; off-grid paths break the system.

Style is solid fill only. No strokes, no outlines, no gradients, no drop shadows, 0px corner radius on all geometry. Icons inherit their color via `fill="currentColor"` — never hardcode a hex value in an SVG.

Status never relies on color alone. Locked silhouettes: Success = Circle, Warning = Triangle, Error = Octagon.

**Core set (Phase I):** Checkmark · Error · Warning · Search · Arrow (×4) · Location · Clock · User · External link · Plus · Menu

**Trade icons:**
- Carpenter
- Electrician
- Heavy equipment operator
- Pipefitter
- Welder

**Other icons:**
- Certifications
- Safety credentials
- Per diem indicator
- Travel readiness

---

## Typography

Skillit uses a primary typeface for human content, and a monospace typeface for machine data. Both are free, open-source, and available on Google Fonts, Adobe Fonts, and GitHub.

- **Work Sans** (Primary): Inspired by early twentieth-century Grotesque typefaces, it is warm, direct, and legible.
- **IBM Plex Mono** (Metadata & Code): Engineered to emphasize the relationship between mankind and machine.

### The Typographic Algorithm

The typography system is consistently derived. Levels are named objectively by their pixel size.
The scale is built on a 16px baseline: `128 → 96 → 64 → 48 → 32 → 24 → 16`.
| Level | Size | Base Weight | Bolded | Line Height | Tracking | Use |
| ------------ | ----- | ---------------- | ---------------- | ----------- | -------- | ------------------------------- |
| **Text-8x** | 128px | Bold (700) | 900 | 0.80 | −6% | Hero headlines at massive scale |
| **Text-6x** | 96px | **650** | **850** | 0.90 | −5% | Large hero/section titles |
| **Text-4x** | 64px | Semibold (600) | 800 | 1.00 | −4% | Standard headlines |
| **Text-3x** | 48px | **550** | **700** | 1.10 | −3% | Section titles, pull quotes |
| **Text-2x** | 32px | Medium (500) | 700 | 1.20 | −2% | Subheadings |
| **Text-1.5x** | 24px | **450** | **600** | 1.30 | −1% | Large body, subheads |
| **Text-1x** | 16px | Regular (400) | 600 | 1.40 | 0% | All running copy |

_(Full print/mobile/monospace variants for each level are documented in `tokens/typography.md` — check there before inventing a new size, so this table and the token file don't drift apart again.)_

**Mobile variants:** Each level has a `-s` variant in Figma and `-sm` in CSS (e.g., `Text-1s` / `--text-1x-sm`). The `-sm` suffix always means "mobile variant", never "small text size". All levels scale ×0.75 for mobile (mobile px = print pt):
- Text-8x: 128px → 96px (`Text-8s`)
- Text-6x: 96px → 72px (`Text-6s`)
- Text-4x: 64px → 48px (`Text-4s`)
- Text-3x: 48px → 36px (`Text-3s`)
- Text-2x: 32px → 24px (`Text-2s`)
- Text-1.5x: 24px → 18px (`Text-1.5s`)
- Text-1x: 16px → 16px (`Text-1s`)

### When to use Text-8x (128px)

Use the 8x tier sparingly. It is reserved for:

- **Homepage hero headlines** — "Do great work where it matters"
- **Landing page hero headlines** — single-line value propositions
- **Section titles on long-scrolling pages** — when the section spans the full viewport height
- **Campaign landing pages** — the primary headline above the fold

**Do not use Text-8x for:**
- Body copy or subheadings
- UI elements (buttons, labels, form fields)
- Text that wraps to more than two lines at desktop width
- Anything below the fold where it competes with the hero

**Rule of thumb:** If you're using 128px more than twice on a single page, you likely have a hierarchy problem. Step down to 6x (96px) or 4x (64px) for secondary emphasis.

### Case

**Sentence-case everywhere.** "Join for free" — not "Join For Free." "How it works" — not "HOW IT WORKS." All-caps and title case are banned in all brand typesetting.

**Exceptions to the rule:**

1. **The Wordmark:** The logo is the sole exception for all-caps (it is a fixed graphic, not typed text).
2. **Acronyms & Certifications:** Standard industry acronyms (OSHA, HVAC, AI, CDL) remain fully capitalized. Do not force them into lowercase.
3. **Proper Nouns:** Names of people, companies (Skillit, Suffolk Tech), and cities retain standard proper noun capitalization.
4. **User-Generated Content:** The sentence-case rule applies to our UI, product copy, and marketing. We do not automatically mutate user-inputted data (like a worker's resume title or name) into sentence-case if they typed it differently.
5. **Quoted Content:** Direct quotes, press excerpts, and testimonials retain their original capitalization to preserve the source's integrity.

### Monospace & Metadata

All metadata (timestamps, worker IDs, distances, file sizes) and code blocks (inline `` or multiline) should use a monospace font to visually separate machine data from human text.

- **The Stack:** IBM Plex Mono (Primary), JetBrains Mono (Fallback).
- **The Scale:** Monospace fonts sit on a different em-square. To optically align with Work Sans without breaking the line-box, always scale inline monospace text to 90% of the parent font size.

| Level | Base | Mono (round(base × 0.9)) | Mono Weight | Purpose |
|---|---|---|---|---|
| Text-8x | 128px | 115px | Bold (700) | Hero metadata, large data displays |
| Text-6x | 96px | 86px | 650 | Large stats, section data |
| Text-4x | 64px | 58px | Semibold (600) | Section stats, large code blocks |
| Text-3x | 48px | 43px | 550 | Subsection stats, code callouts |
| Text-2x | 32px | 29px | Medium (500) | Subhead stats, inline code |
| Text-1.5x | 24px | 22px | 450 | Small data, captions |
| Text-1x | 16px | 14px | Regular (400) | Timestamps, worker IDs, metadata |

### Italics & Emphasis

Use italics strictly for their semantic purpose:

- **Emphasis:** Highlighting specific words within a sentence.
- **Titles of Works:** Formatting the names of books, publications, or articles (e.g., _Engineering News-Record_, _Why Buildings Stand Up_).
  Do not use italics as a decorative style for entire blocks of text (like blockquotes).

### Spacing

To maintain the grid's consistent rhythm, vertical spacing between text elements is locked to absolute spacing tokens regardless of the text size. Never use relative `em` spacing (which breaks the 8px baseline grid).

- **Paragraphs:** 16px (`--space-4`). The standard gap between text blocks.
- **Text Lists:** 8px (`--space-2`). Items in a bulleted or numbered list sit tighter together so the list reads visually as a single, cohesive block.
- **UI Lists:** 16px (`--space-4`). Interactive lists (like a feed of jobs in the app) use a wider gap to protect the 44px minimum touch target rule.

### Block quotes

**Block quotes** are treated as elevated structural cards, not editorial text callouts.

- **Container:** Wrap the quote in a Plaster (`var(--color-surface)` / `#FFFFFF`) card container (16px corners). It inherits the standard tactile padding for cards.
- **Typography:** Roman only. Do not italicize the entire quote (reserve italics strictly for emphasis or titles within the text).
- **Attribution:** Name in Semibold (600), title/company in Regular (400). Accent color: Traffic Cone for the attribution name.
- **No opening/closing quotation marks** in the card — the card itself signals the quote.
- **If a quote runs longer than three lines,** reduce to Body (16px) and increase leading to 1.5.

**For editorial text callouts** (pull quotes within articles):
- Use Painter's Tape text, no card container
- Italicize only if the original source used italics
- Attribute inline or below in Iron at Body size

### Variable weight & halation correction

Work Sans is a **variable font** with a continuous weight axis (100–900). Use interpolated weights for optical correction.
**Halation correction:** Light text on a dark background creates an optical illusion that makes letterforms appear heavier than they are. There are two techniques to reduce this:

- **On light backgrounds (Canvas):** Use standard weights (400, 500, 600, 700). Canvas is already an off-white (`#FAF7F3`) rather than pure white, which naturally reduces irradiation against dark type.
- **On dark backgrounds (Iron, Traffic Cone, Toolbox, Bottle Glass):** Subtract ~25 units to use interpolated weights (375, 475, 575, 675). The goal is to make the text read as the same apparent weight as it would on a light background.

### Typographic Punctuation

**Smart Quotes:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for writing code; angled quotes are for reading text.
**Hanging Punctuation:** All text blocks must use optical margin alignment. Because our layouts are strictly flush-left, this rule applies exclusively to the left margin: **opening quotation marks** on the first line of a paragraph (or pull quote). These marks must hang _outside_ the left bounding box of the text column so the actual letters form a perfectly flush, unbroken vertical line down the grid. Do not hang punctuation that naturally wraps mid-paragraph, and **do not hang bullets or numbers** in a list.

### Widows and Orphans

A **widow** is a single word left dangling on its own line at the end of a paragraph. An **orphan** is a single line of text separated from its paragraph across a column or page break. Both damage readability and scannability. Avoid them by manually adjusting the spacing:

- **Tracking Adjustment (Primary Fix):** To fix a widow or orphan, manually adjust the tracking (letter-spacing) of the entire text block by up to `±2%` (`±0.02em`). This is the preferred method because it imperceptibly compresses or expands the text to force a re-wrap without creating a ragged visual hole at the end of the previous line.
- **The Soft Break (Secondary Fix):** If tracking adjustment isn't feasible, insert a soft break opportunity (`&wbr;` in HTML, or a manual soft line break — Shift+Enter in Figma) before the word that would otherwise orphan. Unlike a non-breaking space, this only kicks in if the line actually needs to wrap there — it doesn't glue two words together permanently, so it won't leave a stray gap once the text block gets more room (e.g. a wider viewport).
- **In Engineering (CSS):** Apply `text-wrap: balance;` to all headlines (`h1`, `h2`, `h3`). Apply `text-wrap: pretty;` to all paragraph text (`p`). Because `text-wrap: pretty` is not yet supported in all legacy browsers, the manual soft-break rule above is still required as a fallback for all critical marketing copy.

### Typography Do / Don't

- **Do** use sentence-case everywhere, on every surface.
- **Don't** use title case or all-caps in UI or layouts (the logo wordmark is the only exception).
- **Do** let size, weight, and spacing create hierarchy.
- **Don't** use Traffic Cone or Hard Hat on headings to make them stand out — color signals function, not rank.
- **Do** use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`).
- **Don't** use straight (dumb) typewriter quotes in human-readable copy.
- **Do** use 16px spacing between paragraphs and 8px between text list items.
- **Don't** leave widows or orphans. Force at least two words onto the final line of any text block to maintain a solid shape.
- **Don't** use Work Sans Light (300) — too thin for job-site legibility.
- **Don't** use any typeface other than Work Sans.
- **Don't** use Display or Heading sizes in UI components.
- **Don't** track body copy — tracking is for display and heading sizes only, never on running copy.

---

## Layout

### The principle

**Whitespace is not empty space—it is structural mass.** It is the primary tool used to organize information and direct the eye. The human is the subject; the grid is the quiet, consistent framework that supports them. Everything else gets out of the way.
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
- **Shape signals action.** Static structural elements (cards, layout panels, photographs) use 16px corners. Actionable human touchpoints (buttons) use a fully rounded pill shape. Intermediate rounded corners (e.g., 4px or 8px) are banned. No drop shadows.
- **Consistent text blocks.** Body text columns never exceed 70 characters wide to maintain perfect tracking and readability.

### Border radius (Shape signals action)

In this system, shape indicates whether an element is interactive or static. We rely on two extremes and nothing in between:

- **Static elements:** `16px` radius. Applied to all cards, layout panels, images, photos, and containers.
- **Actionable elements:** `9999px` (fully rounded pill, `--radius-pill`). Applied to primary CTA buttons and touch targets.
- **Intermediate radii:** Banned. Do not use `4px`, `8px`, or slightly rounded corners anywhere.

### Grid & Baseline

The layout is built on an **8px/16px baseline grid**, paired with **Fluid Architectural Scaling**.
While micro-spacing (`8px`, `16px`, `32px`) remains locked to absolute pixels to protect touch targets and UI integrity, macro-spacing (margins, section gaps, padding) uses CSS `clamp()` functions (`--space-128` and `--space-256`). This ensures the massive, confident margins seen on desktop smoothly and gradually compress as the viewport scales down, exactly mimicking the fluid, tensioned behavior of Anthropic's grid, without sudden, jarring jumps at breakpoints.
**12-Column Newspaper Grid:** All desktop layouts sit on a strict 12-column grid. Do not use flexible percentage splits. Blocks should span fixed column counts (e.g., 7 columns for hero text, 5 columns for the hero CTA) so that vertical alignment is maintained down the entire page.
| Element | Height / Padding | Margin |
| ------------------- | ----------------------------- | ------------ |
| Nav Bar | 64px | — |
| Logo Lockup | 32px height | — |
| Primary Buttons | 12px vertical, 32px horizontal (tactile) | — |
| Desktop Section Gap | — | 128px |
| Desktop Page Margin | — | 128px |

### Layout Do / Don't

- **Do** leave generous space. Minimum 128px vertical padding on desktop sections.
- **Don't** fill space with shapes, patterns, or decorative elements to avoid "emptiness."
- **Do** use 16px corners for static containers and photos.
- **Do** use fully rounded pill shapes for primary buttons.
- **Don't** use intermediate rounded corners (e.g., 4px or 8px) anywhere.
- **Don't** bevel edges or use drop shadows.
- **Do** use the boot tread pattern in the nav bar header.
- **Don't** use it as a section background or content surface fill.

---

## Data Visualization

Skillit's data visualization is utilitarian. The charts should be legible, precise, and stripped of decorative noise. Our goal is human-centered clarity: every pixel should convey the truth of the data.

### Chart requirements

Every chart must include:
- **Header** — what the data shows (e.g., "Craft hires by trade, Q3 2026")
- **Subheader** — context or timeframe if not in the header
- **Data source** — attribution at the bottom in Plex Mono, 14px, Iron at 50%

### Geometry & Structure

- **Containers:** All data viz graphics must sit on a Plaster (pure white) background card to isolate the data and maintain contrast against the surrounding UI.
- **Sharp edges:** Bar charts, tooltips, legends, and Plaster cards should have `16px` border-radius.
- **Line weight:** All structural lines must be `4px` thick. This applies to data lines and gridlines.
- **Gridlines:** Rendered in Canvas with 4px stroke weight. Remove all outer bounding boxes. Use horizontal (Y-axis) gridlines only. No vertical gridlines.
- **Pie charts:** Slices must sit flush against each other with zero gap and zero stroke.
- **Line charts:** Both unsmoothed (stepped/linear) and smoothed (spline/curved) paths are permitted based on the data story.

### Color

- **Monochromatic scale:** Standard categorical charts use a monochromatic scale, rather than different colors, to preserve UI semantics.
- **Highlight:** Traffic Cone (orange) is used exclusively to highlight the focal data point or trend the viewer is supposed to care about. Orange is the thesis; Iron is the context.

### Bar graphs

- Accommodate **gradient fills** — use Traffic Cone at 100% to 40% opacity top-to-bottom for emphasis bars
- **Annotations** — callout labels in Plex Mono, 14px, Iron, with a thin Iron line pointing to the data point
- **Legend** — placed at the bottom, horizontal layout, Plex Mono 14px
- Grouped bars: use Iron at 100%, 70%, 50% opacity to disambiguate series

### Flowcharts

- Flowchart nodes may include **graphics** (icons, small illustrations) alongside text
- Node backgrounds: Plaster with 16px corners
- Connector lines: Iron, 2px weight, 16px corners on turns
- Decision diamonds: Hard Hat fill with Iron text
- CTA nodes: Traffic Cone fill with Canvas text

### Banned Elements

- 3D effects and drop shadows.
- Donut charts (decorative SaaS trope. If showing a part-to-whole ratio, use a solid pie chart instead).
- Radar or spider charts.

---

## Voice & Tone

### The north star

> Write like the smartest person on the job site — the one who's been doing this since before it was a startup, who knows the data cold, and who doesn't need to prove they belong in the room because the work speaks for itself.
> **If it sounds like a press release, a pitch deck, or a LinkedIn growth-hacker, it's wrong.**

**The Worker-First Mandate:** Every piece of copy—from blog titles to button labels—must ultimately serve and elevate the worker. Amplify the overlooked details of craftwork by focusing on these traits: _Agency, Judgment, Craftsmanship, Stamina, Responsibility_. Technology should uplift, meaning craft pros are irreplaceable and tech merely provides a direct route for their skills to be discovered.

### The Five Core Traits

The brand voice is built entirely around five traits inherent to craft pros. Every piece of copy should reflect at least one of these:

**1. Agency (Empowering Choice).** Craft workers are independent decision-makers, not cogs in a machine. Write to support their control over their career.

- Wrong: "We place you in open jobs."
- Right: "Choose the right job for you."

**2. Judgment (Respecting Expertise).** They know the work better than we do. Never talk down, over-explain, or act like the software is the hero.

- Wrong: "Our algorithm knows the best fit for your skills."
- Right: "You know your trade. We make sure contractors see it."

**3. Craftsmanship (Tangible Reality).** Emphasize the tangible skill and precision of the work. Avoid abstract digital jargon.

- Wrong: "Optimizing the talent acquisition pipeline."
- Right: "Getting the right worker to the right job site."

**4. Stamina (Direct & Unfussy).** Acknowledge the physical and mental reality of the job site. Write concisely—for gloves and sunlight.

- Wrong: "We think construction workers deserve better tools."
- Right: "Construction workers deserve better tools."

**5. Responsibility (Reliable Objectivity).** Speak objectively and reliably. No empty promises, no hype, no fluff.

- Wrong: "We will revolutionize your career in construction!"
- Right: "Set your pay expectations upfront. Earn what you're worth."

### Tone by Channel

| Channel | Audience | Purpose | Key traits |
|---|---|---|---|
| **Website** | Both | Explain the platform | Confident, objective, proof-heavy |
| **Insights** (formerly Blog) | Both | Authority & analysis | Authoritative, punchy, grounded |
| **Comms** (formerly Press) | Public | Product milestones & news | Tangible impact, never just product features |
| **Worker app** | Workers | Guide through tasks | Unfussy, respectful, simple |
| **Contractor dashboard** | Contractors | Show outcomes | Precise, no-nonsense |
| **LinkedIn** | Both | Industry authority | Opinionated, first-person, data-backed |
| **Worker newsletter** | Workers | Monthly updates | Direct, practical, grounded |
| **Customer newsletter** | Contractors | Nurture & retention | Data-backed, proof-heavy |

### Demand Gen vs. Supply Gen

**Demand Gen** (employer-facing): cold leads, nurture/warm leads, monthly customer newsletter

| Don't use | Do use |
|---|---|
| Anthropomorphize robotics or Skillit as a singular entity | "Skillit matches workers to projects" |
| "Proud" / facts + quotes from relevant sources to support emotional impact | Data and outcomes first |
| "Serve" / "support" | "Match," "connect," "capture," "feature" |
| "Workers" for first intro, then "workers" | "Craft professionals" first, then "workers" |

**Supply Gen** (worker-facing): monthly newsletter, paid ads, help center, call center SOP

| Don't use | Do use |
|---|---|
| "Represent" / "reflect" | "Match," "connect," "get discovered" |
| "Workers" / "craft professionals" alone | "Craft professionals," "members" |
| "Serve" / "support" | "Match," "connect," "find" |

### Sam (The AI)

Sam is Skillit's AI assistant. Sam has a name because names matter — they signal that this is a tool built for humans, not a machine replacing them.

- Right: "Hey Sam, pull up civil welders with GMAW experience in Dallas."
- Wrong: "Our proprietary ML algorithm surfaces qualified candidates based on your requirements."

**Sam coordinates and surfaces. The human still decides.** This is the ultimate expression of worker _Agency_ and _Judgment_.

**Sam's voice rules:**
- **No exclamation marks.** Period.
- **No emojis.** Ever.
- Use plain, direct language.
- Whenever possible, use a period instead of a question mark.
- Do not anthropomorphize. Sam is not a person.

### Banned Language (Trait Violations)

- **Violates Responsibility (Hype):** "Revolutionize," "Disrupt," "Excited to announce," "Thrilled to share," "World-class."
- **Violates Craftsmanship (Tech Abstraction):** "Ecosystem," "Leverage synergies," "Holistic," "Pipeline."
- **Violates Judgment (Hedging):** "We believe," "Perhaps," "Might be able to."
- **Violates Agency (Software as Hero):** "AI-powered" as the lead descriptor, "We place you," "Let our algorithm decide."

### Copy Do / Don't

**Do** lead with the insight. "Only 1 in 20 workers are missing. 9 in 10 employers still can't find them."
**Do** use inline bolding for key phrases in paragraph text to improve scannability (Stamina).
**Don't** lead with the product. "Skillit is an AI-powered construction hiring platform..."
**Do** use strict consistency for button labels. If a button points to account creation, it should say "Join" everywhere.
**Do** use one CTA per section. Ensure the primary mobile CTA is visible without scrolling.
**Don't** offer "Start hiring" alongside "Get hired" — consolidate to a single "Join."

---

## Photography & Imagery

Photography is the brand's most human element. Every image should make a craft worker feel seen — not as a stock photo prop, but as a skilled professional whose work builds the physical world.

Lean into the archetype of the independent, strong, hands-on do-er. The aesthetic should blend the accessibility of a government vocational program, the rigor of resource-rich institutions, and the flair of aspirational publications.

**Do**
- Use Adobe Stock only; exclude generative AI
- Apply multiply blend mode to melt lighter backgrounds into the ground
- Frame workers at eye level or below; capture candid, dignified work on real job sites; show hands
- Use earth tones, big scopes, aerial for projects; silhouettes, profiles, hands for stock workers
- Overlay text in Canvas with 50% Iron filter on the image

**Don't**
- Don't use photographic edge masks (feathered edges, vignettes, beveled cutouts)
- Don't apply color grading, warm toning, or dramatic filters; natural color only
- Don't overlay symbols, UI elements, or graphs on images
- Don't use AI-generated images or composite backgrounds; if background is removed, the worker sits directly on Canvas or Iron
- Don't shoot from above; it creates a power dynamic the brand explicitly rejects
- Don't use stock photo aesthetics (fake smiles, obvious casting, "safety theater" costumes)
- Don't use generative AI imagery

### Iron filter

The Iron filter is for **text legibility only**, not for aesthetic grading of the image itself.

- Apply Iron filter **only when overlaying text** on an image
- Use at 50% opacity over the image area where text sits
- Do **not** apply Iron filter to full-width hero images or standalone photography
- For standalone images, use multiply blend mode only on lighter backgrounds to melt into Canvas

### Collages

Collages are needed for the culture doc and select marketing materials.

**Rules:**
- Maintain eye-level or below framing across all images in the collage
- Keep consistent lighting — do not mix golden-hour warmth with midday cool
- No image should be smaller than 120px in its longest dimension at desktop
- Use 16px gaps between images on desktop, 8px on mobile
- Grid layouts only — no overlapping, diagonal cuts, or feathered edges
- Maintain the Iron filter rule: apply only where text overlays the collage

---

## Website pages

### Header
- Logo lockup
- Navigation: Find Work · Our Network · What We Do · Resources · Who We Are · Support
- Join

### Home Page
- Hero with revolving trade word + CTA
- Employer logos (Mortenson, DPR, Brasfield & Gorrie, Suffolk Technologies)
- Stat callouts (200+ contractors, 72 hours, Free)
- What to Expect (3-step onboarding)
- Define Your Role (job listings by title, not company; estimated prices)
- Live data (split-flap display)
- Flowchart (how to find your next role)
- Expand your horizons (top in-demand markets)
- Testimonial
- Ask Skillit (FAQ)
- Newsletter opt-in

### Find Work
- Search by trade
- By title, not company
- Estimated pay
- Trade categories:
  - Site & Earthwork
  - Structural & Metals
  - Concrete & Masonry
  - Carpentry & Wood
  - Mechanical & Piping
  - Electrical & Systems
  - Roofing & Envelope
  - Finishes & Interiors
  - General Labor & Support
  - Leadership & Engineering

### Our Network
- Stat callouts
- By the numbers
- How Skillit compares
- Trusted by top contractors
- Stakeholders (backers, founders)
- Press

### What We Do
- Flowchart (workers → Skillit → companies)
- One membership
- Two agents, one platform
- How Skillit compares
- 3-Point Chart
- Key Features

### Resources
- Blog
- The Data
- Success Stories
- Press

### Who We Are
- Team → Join us! (careers)
- Backers
- Founder

### Support
- FAQs
- Contact
- Worker Standards

---

## A note on this document

### Responsive Scaling

- **The Rule:** Scale display text sizes down smoothly to a minimum of half the size at mobile breakpoints (e.g., a desktop 128px becomes 64px on mobile). However, **keep the original weights** (do not scale down the font-weight) to maintain the visual hierarchy and density.
- **Body Text Exception:** Body text does **not** scale on mobile. `Text-1x` holds at 16px (`Text-1s` = 16px) — see "Why Text-1x does not scale" above. UI text (`--text-ui`) also holds its size; the 44px touch target rule governs app surfaces, not display.

---

## Engineering Handoff

---

## Resources

### Asset Directory
