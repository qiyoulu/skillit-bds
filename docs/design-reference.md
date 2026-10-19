# Skillit Kit Brand Design System (BDS)
**Last updated:** 2026-10-08

**Last synced with LLM-INSTRUCTIONS.md:** 2026-10-08

## **Version 1.3 · October 2026**

**Release status:** v1.3 source release; no Git tag or GitHub Release created. See the [v1.3 release notes](../releases/v1.3.md) for the change set since v1.2.

> **AI agents: read [`LLM-INSTRUCTIONS.md`](../LLM-INSTRUCTIONS.md) first.** That file is the authoritative constraint set for machine-generated output — code, design, copy, data viz. Where behavioral rules conflict, `LLM-INSTRUCTIONS.md` wins; `tokens/tokens.json5` governs token values. This document is the human-readable rationale and full guideline set; the LLM file is the enforcement layer.

This is the detailed design and implementation reference. For the plain-language team guide, read [HUMAN-INSTRUCTIONS.md](../HUMAN-INSTRUCTIONS.md).

## Table of Contents

- [Skillit Kit Brand Design System (BDS)](#skillit-kit-brand-design-system-bds)
  - [**Version 1.3 · October 2026**](#version-13--october-2026)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [At a Glance](#at-a-glance)
  - [Who These Guidelines Are For](#who-these-guidelines-are-for)
  - [How to Use These Guidelines](#how-to-use-these-guidelines)
  - [Colors](#colors)
    - [The palette](#the-palette)
    - [Color Do / Don’t](#color-do--dont)
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
    - [Monospace & Metadata](#monospace--metadata)
    - [Italics & Emphasis](#italics--emphasis)
    - [Spacing](#spacing)
    - [Block quotes](#block-quotes)
    - [Variable weight & halation correction](#variable-weight--halation-correction)
    - [Typographic Punctuation](#typographic-punctuation)
    - [Widows and Orphans](#widows-and-orphans)
    - [Typography Do / Don’t](#typography-do--dont)
  - [Layout](#layout)
    - [The principle](#the-principle)
    - [Surface boundaries (Cards & Containers)](#surface-boundaries-cards--containers)
    - [Surface hierarchy](#surface-hierarchy)
    - [Rules](#rules)
    - [Border radius (Shape signals action)](#border-radius-shape-signals-action)
    - [Grid & Baseline](#grid--baseline)
    - [Layout Do / Don’t](#layout-do--dont)
  - [Data Visualization](#data-visualization)
    - [Chart requirements](#chart-requirements)
    - [Geometry & Structure](#geometry--structure)
    - [Color](#color)
    - [Bar graphs](#bar-graphs)
    - [Flowcharts](#flowcharts)
    - [Banned Elements](#banned-elements)
  - [Voice & Tone](#voice--tone)
    - [The north star](#the-north-star)
    - [The Five Core Traits](#the-five-core-traits)
    - [Plain language](#plain-language)
    - [Tone by Channel](#tone-by-channel)
    - [Demand Gen vs. Supply Gen](#demand-gen-vs-supply-gen)
    - [Sam (The AI)](#sam-the-ai)
    - [Banned Language (Trait Violations)](#banned-language-trait-violations)
    - [Copy Do / Don’t](#copy-do--dont)
  - [Photography & Imagery](#photography--imagery)
    - [Iron filter](#iron-filter)
    - [Collages](#collages)
  - [Proposed website structure (not live inventory)](#proposed-website-structure-not-live-inventory)
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

This document is the human-readable translation of the rules. The machine-readable source is [`tokens/tokens.json5`](../tokens/tokens.json5). Follow the [README file-ingestion workflow](../README.md#for-everyone-else) to supply these files to an AI tool. AI-assisted copy and layouts require review against the relevant rules; use approved photographs and genuine product screenshots, never generated portraits, fabricated screenshots, or feature illustrations presented as real imagery. This repository does not establish an MCP service or universal access.

Designers, marketers, writers, engineers, and anyone who has ever asked “does this look right?” — this is for you.

---

## At a Glance

**The Vibe:** Documentary, not corporate. The smartest person on the job site.
**The Typography:** Work Sans for human text; JetBrains Mono for machine data. Sentence case for authored brand copy; preserve acronyms, proper names, user input, and direct quotes. No decorative all-caps. Flush-left alignment. Dramatic leaps in scale.
**The Layout:** Strict functionalism. Whitespace is structural mass. Static containers use 16px corners; button-like actions use pills; editable fields and checkbox boxes use 0px. Circular indicators are geometry exceptions. Canvas (off-white) background, Iron (dark navy) text. Only approved neutral boot-tread texture in non-content header/footer zones; never beneath UI text.
**The Accent:** Traffic Cone (orange). Use orange for primary actions, selection controls, and focus. Repetition is allowed when it serves the interaction. Keep one dominant CTA per section; supporting controls should not compete with it. Orange in charts follows its assigned data role. Never use it as decoration.
**The Photos:** Real workers doing real work. Shot at eye level. No color grading or filters.
**The Copy:** Direct, unhedged, data-backed. Don’t say revolutionize or disrupt.
**The Assets:** Single-color utility icons use `currentColor`; the 12 approved semantic/multicolor exports preserve their source paint and opaque contrasting layers. Use approved logo and graphic assets without altering their paint. Inline utility icons for dynamic host tinting; inline multicolor components need independent layer styling. The 75 frozen legacy exports are archival content, not part of the current 90-icon set.
**The Rule:** Technology should make humans more essential, not more expendable. Start from the worker’s perspective.

---

## Who These Guidelines Are For

**Designers** — visual designers, brand designers, UI designers, and anyone creating graphical assets for Skillit.

**Communicators** — marketing, PR, internal comms, and anyone writing on behalf of the brand.

**Writers** — copywriters, content strategists, and anyone crafting product copy or editorial content.

---

## How to Use These Guidelines

**Designers** — Start here for visual rules: color, typography, layout, iconography, photography. Use the data visualization section for charts and graphics. Reference the voice & tone section for copy that appears in your designs.

**Communicators** — Start with voice & tone for writing rules by channel. Use photography & imagery for visual standards. Reference the data visualization section for charts in reports and presentations.

**Writers** — Start with voice & tone for vocabulary, mechanics, and channel-specific rules. Use the typography section for hierarchy and scale. Reference the [brand narrative](../brand/narrative.md) for the core narrative and its claim-verification policy.

**AI ingest** — If you are an AI agent assisting with Skillit work, read `LLM-INSTRUCTIONS.md` first for behavioral rules and `tokens/tokens.json5` for token values; these guidelines provide rationale and reference. For mission, story, and company context, read the [brand narrative](../brand/narrative.md). Follow the [README](../README.md#use-an-ai-tool) for file ingestion and review.

---

## Colors

The Skillit palette is Materials on Site — eight colors named for the physical materials workers handle every day. **Each color has defined roles. Use it only where it communicates an action, message, or data meaning.** Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron.

### The palette

| Name           | Hex       | CMYK            | Spot (Coated / Uncoated) | Role                                  |
| -------------- | --------- | --------------- | ------------------------ | ------------------------------------- |
| Canvas         | `#F7F1ED` | Consult print reference | Paper — not an ink       | Primary background — all surfaces     |
| Plaster        | `#FFFFFF` | Consult print reference | Paper — unprinted stock  | Elevated surfaces, cards, form inputs |
| Iron           | `#232F36` | Consult print reference | 432 C / 432 U            | Foreground, neutral utility icons, completed progress |
| Traffic Cone   | `#EF6F1A` | Consult print reference | 158 C / 158 U            | Primary action, selection indicators, focus |
| Hard Hat       | `#FEB11C` | Consult print reference | 1235 C / 1235 U          | Warnings/icons, non-fatal alerts      |
| Toolbox        | `#C8102E` | Consult print reference | 186 C / 186 U            | Error icons/messages, destructive actions |
| Bottle Glass   | `#33663D` | Consult print reference | 2427 C / 2427 U          | Success messages/icons, appropriate controls and data |
| Painter’s Tape | `#007CA6` | Consult print reference | 3135 C / 3135 U          | Links, info text/icons, purposeful data |

Coated and uncoated are the same ink on different paper — the number is shared, the appearance is not. Uncoated absorbs ink and returns lighter and duller. Always proof on the actual stock; Traffic Cone shifts most. Spot references apply only where you print spot (business cards, signage, vehicle wrap, embroidery) — process work must consult the [color print reference](../tokens/docs/color.md). RGB tokens do not define canonical CMYK conversions. Unprofiled CMYK values are provisional: confirm the output profile, stock, and printer proof before production; this guide does not choose between conflicting Canvas conversions.

### Color Do / Don’t

- **Do** use Traffic Cone for primary actions, selection controls, and focus. Functional repetition is allowed; preserve one dominant CTA per section, not one orange element.
- **Don’t** repeat Traffic Cone decoratively across borders, icons, and dividers.
- **Do** use Iron on Canvas for all body text.
- **Don’t** use Traffic Cone text on Canvas backgrounds at body size — it fails contrast.
- **Do** use meaning-scoped status icon colors: error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Use familiar icons, semantic colors, and clear labels; never rely on shape or color alone. Shapes support familiar conventions, not a code for information types; neutral utility icons and completed progress use Iron.
- **Don’t** rely on color alone to communicate error, warning, or success.
- **Don’t** use gradients — all color transitions are hard edges.
- **Don’t** use Hard Hat, Toolbox, Bottle Glass, or Painter’s Tape as layout backgrounds or decorative elements.
- **Don’t** use Painter’s Tape as a button fill. Semantic colors belong to meaningful message text, status icons, appropriate functional control fills, and data encoding; never decorative or layout fills. Checkbox, radio, and selection-chip control paint uses Traffic Cone, not Bottle Glass: unselected radio/chip outlines and selected fills are orange. Keep chip pills Plaster with Iron text; the contrasting inner check glyph is Iron (4.5443:1 on Cone), not Canvas (2.6958:1). Focus rings also use Cone. Charts may use Cone alongside Painter’s Tape and other canonical palette colors for purposeful categories with legends or direct labels and non-color cues; monochromatic is a default, not exclusive. These state/data displays are not actions by themselves. All toast types use Plaster bodies with Iron text and their semantic icon color; close controls use Iron with Traffic Cone focus. Toast bodies remain static 16px-corner feedback panels, not actions; only close/link controls are actionable. No colored success/error/warning toast-background exception remains. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast.
- **Do** use Painter’s Tape text underlined for links, not underlined for info.
- **Don’t** introduce authored UI colors outside the eight tokens. Canonical color source tables, explicit token/export workflows, and unchanged approved SVG/logo artwork may contain literal hex values; consumers must not recolor fixed assets to satisfy a UI-style ban.

---

## Logo

The Skillit logo system has four components: mark, wordmark, lockup, and pattern. Use the lockup wherever possible — it’s the primary logo. Use the mark alone only in constrained spaces where the lockup doesn’t fit well. Never use the wordmark alone. Each logo component is a fixed graphic asset. Do not recreate it, retype it, or export it in raster formats. Use approved SVG files; approved 512px-height PNG exports are reserved for platforms that reject SVG uploads.

### The mark

The Skillit mark is the brand’s initial ‘S’ engineered for **physical grip**. Built from three interlocking blocks on a precise **1:3 shear**, the geometry acts as a **boot tread, machinery tracks, or diamond plate steel**. It encodes **traction**, **structural integrity**, and **forward momentum** into a single form. It **does not require the wordmark** to be understood.
**Grid:** 7×8 unit grid. One unit of clear space on all sides — protected area of 9×10 units.
**Minimum size:** 21px/16pt height. Below this threshold the internal negative space closes up and the mark loses definition.

### The wordmark

The wordmark is set in Work Sans Black, all-caps, with −3% tracking. It is a fixed graphic asset, not a line of text.
**Minimum size:** 16px/12pt height.
**Clear space:** Maintain a minimum clear space of 12.5% (1/8 of lockup height) on all sides.

### Wordmark-only usage

**Never use the wordmark alone.** The wordmark is a component of the lockup, not a standalone logo. Use the lockup, or use the mark alone on mobile.

### The lockup

The lockup is the mark and wordmark together. It is the primary logo — use it wherever possible.
**Horizontal lockup only.** The mark sits to the left of the wordmark, aligned to the cap height, with 2 units of space between them. (1 unit = 1 grid unit from the 7×8 mark grid.) No stacked or vertical variant.
**Minimum size:** 21px/16pt height (mark at 21px/16pt, wordmark at 16px/12pt).
**Clear space:** Maintain a minimum clear space of 1/8 of the lockup height (12.5%) on each side. Never crowd it against an edge, another logo, or an image.

### Color variants

| Variant              | Contrast | Use                                               |
| -------------------- | -------- | ------------------------------------------------- |
| Iron on Canvas       | 12.2506:1  | Default — all light backgrounds                   |
| Canvas on Iron       | 12.2506:1  | Not used — Iron is not a background surface       |
| Iron on Traffic Cone | 4.5443:1   | Button backgrounds only — marginal, use sparingly |
| Single-color solid | —        | Print, embroidery, engraving only                 |

Canvas on Traffic Cone and Traffic Cone on Canvas both fail WCAG AA (2.6958:1) and are not permitted logo treatments. The separate display-text brand exception does not apply to logos.

### What not to do

- Do not stretch, compress, shear, or rotate the logo
- Do not apply drop shadows, outlines, or effects
- Do not enclose the mark in a circle, box, or shield — its silhouette is its own structure
- Do not place on busy photographic backgrounds without sufficient contrast
- Do not use legacy versions — the 2023 logo is retired
- Do not recreate the mark, wordmark, or lockup — always use the approved file
- Do not use raster formats for the web logo; approved 512px-height PNG exports are the exception for platforms that reject SVG

### The Pattern

The Skillit pattern is a step-and-repeat tessellation of the boot tread mark. Because the mark’s negative space is designed as an interlocking joint, the repeated pattern locks together to form a structural, masonry-like wall. It is the only decorative graphic permitted in the system.
**Preserve the approved pattern geometry**: no stretching, shearing, rotating, or drop shadows; use the approved SVG. Neutral host tint for tintable pattern artwork is permitted as specified in [logo documentation](../tokens/docs/logo.md); it is not permission to repaint fixed logo variants. Keep texture out of text/control zones.
**How to use it:**

- **Restricted Palette:** The pattern may ONLY be rendered using the neutral structural colors: Canvas, Plaster, and Iron (the whites and black). Accent colors are strictly banned.
- **Structural anchor:** Neutral texture in non-content regions of document headers/footers or navigation headers only; keep it out of UI controls, labels, and text zones.
- **Physical applications:** Excellent for tactile physical touchpoints (e.g., debossed into leather, printed on packaging interiors, or as a subtle watermark on formal documents).
  **What not to do:**
- Do not use any accent colors (Traffic Cone, Bottle Glass, Toolbox, Hard Hat, Painter’s Tape) for the pattern.
- Do not use the pattern as a background for running text.
- Do not scale it up massively to act as a hero graphic — it is masonry, not an illustration.
- Do not place it on photography.

---

## Iconography

Icons are tools, not decorations — heavy, solid, consistently centered for job-site legibility.

All icons are drawn on a 24×24px canvas using a strict 10×10 sub-grid where one block equals 2px. The sub-grid solves centering math — 2px divides the 24px canvas evenly — and enforces the same heavy, cast-iron geometry as the mark. Snap vertices to multiples of 2 where possible; full-bleed edges and 1px offsets are permitted where the shape needs them. Approved external platform marks retain their own geometry.

Style is solid fill only. No strokes, no outlines, no gradients, no drop shadows. Icon geometry follows [the iconography rules](../rules/iconography.md); 16px corners apply to static containers, not every internal glyph shape. Tintable UI icons inherit their color via `fill="currentColor"`. Approved fixed logo/graphic SVGs and explicit source/export workflows may retain literal paint; do not silently recolor fixed artwork.

Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. Interactive checkbox, radio, and selection-chip indicators use Traffic Cone, not success green: classify the underlying control by its action, not the indicator’s state. Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone. Success checks, warning exclamations, and error crosses support familiar conventions; outer shape is not a separate information-type code. Info needs a clear label; a help glyph denotes help, not information by itself. Status-glyph runtime props select meaning and canonical host/layer token colors. Current approved status exports retain semantic ground paint and opaque white glyphs; preserve them as full images or inline components. External images cannot inherit host color, and a single alpha mask flattens both layers. Runtime overrides require inline per-layer token styling, not asset recoloring. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast.

**Icon naming:** Name the visible form, not the feedback state. Use Heroicons vocabulary for equivalent glyphs without replacing Skillit artwork. `share.svg` is the three-node symbol; `arrow-up-on-square.svg` is the upward-arrow/square glyph. Follow the [naming and migration guide](../components/icons.md#naming-and-migration); previous names are history, not shipped aliases. Update consumer paths and resolvers together, taking care with the reused `phone` and `user-circle` IDs.

**Legacy compatibility:** The [frozen legacy archive](../assets/icons/legacy/README.md) preserves 75 prior-ID SVGs outside the 90-icon canonical set. Existing consumers must explicitly select its folder or copied legacy resolver; old root paths are not automatically restored. Do not apply new geometry or paint rules to archived bytes. Migrate to the canonical IDs using the documented map.

**Delivered core assets** in [`assets/icons/`](../assets/icons/):

- Status success: `check-circle.svg`; selection glyph: `check.svg`; error: `x-octagon.svg`; warning: `exclamation-triangle.svg`
- Search: `magnifying-glass.svg`; arrows: `arrow-up.svg`, `arrow-right.svg`, `arrow-down.svg`, `arrow-left.svg`
- Location: `map-pin.svg`; clock: `clock.svg`; user: `user.svg`; external link: `arrow-top-right-on-square.svg`; menu: `bars-3.svg`
- Close: `x-mark.svg`, `x-circle.svg`; plus: `plus.svg`, `plus-circle.svg`
- Info: `information-circle.svg`, `information-square.svg`; help: `question-mark-circle.svg`

**Delivered trade assets:**

- Carpenter: `saw.svg`
- Electrician: `bolt.svg`
- Heavy equipment operator: `excavator.svg`
- Pipefitter: `pipe.svg`
- Concrete worker: `concrete.svg`
- Generic trade and worker: `wrench.svg`, `user-hat.svg`

**Planned metaphors; no dedicated SVG delivered:** welder, certifications, safety credentials, per diem, and travel readiness. Do not imply these files exist or synthesize replacements without approval. The current imported export contains 90 SVGs, including 15 additions beyond the earlier 75-asset comparison. See the [complete inventory and rendering contracts](../components/icons.md#complete-imported-inventory). Use exact user-exported names, including `saw`, `concrete`, `pipe`, `user-hat`, and `user-round`; filenames are independent of semantic component status labels. New `phone.svg` is a handset, distinct from `device-phone-mobile.svg`; new `user-circle.svg` is distinct from `user-round.svg`; `arrow-up-on-square.svg` is supplied separately from `share.svg`. Coordinate consumer path and asset updates; this BDS migration does not deploy Rails/workspace changes.

---

## Typography

Skillit uses two typefaces: **Work Sans** for human content, **JetBrains Mono** for machine data. Both are free, open-source, and available on Google Fonts and GitHub. Both use the same canonical tier sizes by an intentional 1:1 brand pairing; their measured glyph heights are not equal.

- **Work Sans** (Primary): Inspired by early twentieth-century Grotesque typefaces, it is warm, direct, and legible.
- **JetBrains Mono** (Metadata & Code): Warm, open-aperture mono designed for IDE legibility. Weights 100-800. Use for metadata, IDs, data, code blocks, and large data displays.

### The Typographic Algorithm

The typography system is consistently derived. Levels are named objectively by their pixel size.
The scale is built on a 16px baseline: `16 → 24 → 32 → 48 → 64 → 96 → 128`.
| Level | Size | Base Weight | Bolded | Line Height | Tracking | Use |
| ------------ | ----- | ---------------- | ---------------- | ----------- | -------- | ------------------------------- |
| **Text-8x** | 128px | Bold (700) | 900 | 0.80 | −6% | Hero headlines at massive scale |
| **Text-6x** | 96px | 650 | **850** | 0.90 | −5% | Large hero/section titles |
| **Text-4x** | 64px | 650 | 800 | 1.00 | −4% | Standard headlines |
| **Text-3x** | 48px | 550 | **700** | 1.10 | −3% | Section titles, pull quotes |
| **Text-2x** | 32px | 550 | 700 | 1.20 | −2% | Subheadings |
| **Text-1.5x** | 24px | 450 | **600** | 1.30 | −1% | Large body, subheads |
| **Text-1x** | 16px | 450 | 600 | 1.40 | 0% | All running copy |
| **Text-0.75x** | 12px | 550 | — | 1.40 | +4% | Functional labels, tags, badges, captions; not running copy |

_(Full print/mobile/monospace variants for each level are documented in `tokens/docs/typography.md` — check there before inventing a new size, so this table and the token file don’t drift apart again.)_

**Mobile variants:** Each level has a `-s` variant in Figma and `-sm` in CSS (e.g., `Text-1s` / `--text-1x-sm`). The `-sm` suffix always means “mobile variant”, never “small text size”. Display levels scale ×0.75 for mobile; Text-1x holds at 16px and functional Text-0.75x holds at 12px (mobile px = print pt for display tiers only):

- Text-8x: 128px → 96px (`Text-8s`)
- Text-6x: 96px → 72px (`Text-6s`)
- Text-4x: 64px → 48px (`Text-4s`)
- Text-3x: 48px → 36px (`Text-3s`)
- Text-2x: 32px → 24px (`Text-2s`)
- Text-1.5x: 24px → 18px (`Text-1.5s`)
- Text-1x: 16px → 16px (`Text-1s`)

### When to use Text-8x (128px)

Use the 8x tier sparingly. It is reserved for:

- **Homepage hero headlines** — “Do great work where it matters”
- **Landing page hero headlines** — single-line value propositions
- **Section titles on long-scrolling pages** — when the section spans the full viewport height
- **Campaign landing pages** — the primary headline above the fold

**Do not use Text-8x for:**

- Body copy or subheadings
- UI elements (buttons, labels, form fields)
- Text that wraps to more than two lines at desktop width
- Anything below the fold where it competes with the hero

**Rule of thumb:** If you’re using 128px more than twice on a single page, you likely have a hierarchy problem. Step down to 6x (96px) or 4x (64px) for secondary emphasis.

### Case

**Sentence-case everywhere.** “Join for free” — not “Join For Free.” “How it works” — not “HOW IT WORKS.” All-caps and title case are banned in all brand typesetting.

**Exceptions to the rule:**

1. **The Wordmark:** The logo is the sole exception for all-caps (it is a fixed graphic, not typed text).
2. **Acronyms & Certifications:** Standard industry acronyms (OSHA, HVAC, AI, CDL) remain fully capitalized. Do not force them into lowercase.
3. **Proper Nouns:** Names of people, companies (Skillit, Suffolk Tech), and cities retain standard proper noun capitalization.
4. **User-Generated Content:** The sentence-case rule applies to our UI, product copy, and marketing. We do not automatically mutate user-inputted data (like a worker’s resume title or name) into sentence-case if they typed it differently.
5. **Quoted Content:** Direct quotes, press excerpts, and testimonials retain their original capitalization to preserve the source’s integrity.

### Monospace & Metadata

All metadata (timestamps, worker IDs, distances, file sizes) and code blocks (inline `` or multiline) should use JetBrains Mono to visually separate machine data from human text.

- **The Stack:** JetBrains Mono (Primary).
- **The Scale:** Keep the intentional 1:1 pairing at the same canonical size for metadata, data, and code. Measured current Google Fonts files have Work Sans cap-height/x-height ratios of 0.66/0.50 and JetBrains Mono ratios of 0.73/0.55. At 16px, their x-heights are 8px and 8.8px: mono reads slightly taller. This is not a reason to change the type scale. [Work Sans font source](https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/WorkSans%5Bwght%5D.ttf) and [JetBrains Mono font source](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf); remeasure if deployed font files differ.

### Italics & Emphasis

Use italics strictly for their semantic purpose:

- **Emphasis:** Highlighting specific words within a sentence.
- **Titles of Works:** Formatting the names of books, publications, or articles (e.g., _Engineering News-Record_, _Why Buildings Stand Up_).
  Do not use italics as a decorative style for entire blocks of text (like blockquotes).

### Spacing

To maintain the grid’s consistent rhythm, vertical spacing between text elements uses canonical `rem` spacing tokens independently of the local font size. Pixel equivalents assume a 16px root; do not hardcode micro gaps in `px` or use local `em` margins.

- **Paragraphs:** 16px (`--space-4`). The standard gap between text blocks.
- **Text Lists:** `--space-2` (0.5rem / 8px at a 16px root); small viewports may use the approved `--space-1.5` (0.375rem / 6px) exception.
- **UI Lists:** 16px (`--space-4`). Interactive lists (like a feed of jobs in the app) use a wider gap to protect the 40px minimum touch target rule.

### Block quotes

**Block quotes** are treated as elevated structural cards, not editorial text callouts.

- **Container:** Wrap the quote in a Plaster (`var(--color-surface)` / `#FFFFFF`) card container (16px corners). It inherits the standard tactile padding for cards.
- **Typography:** Roman only. Do not italicize the entire quote (reserve italics strictly for emphasis or titles within the text).
- **Attribution:** Name in Semibold (600), title/company at canonical Text-1x weight (450). Color: opaque Iron for the attribution name and title/company.
- **Quote text:** canonical Text-1.5x (24px, weight 450, leading 1.3) at every length. There is no long-quote variant; verify wrapping and reflow.
- **Quotation marks:** no closing mark and no opening mark inside the text. A card **without a headshot** carries one decorative opening mark at Text-3x (48px, weight 550), Iron, hanging in the card's left margin so the letters stay flush; on small screens it sits above the text. A card with a headshot has no mark. Spec in `components/quote-cards.md`.

**For editorial text callouts** (pull quotes within articles):

- Use Painter’s Tape text, no card container
- Italicize only if the original source used italics
- Attribute inline or below in Iron at Body size

### Variable weight & halation correction

Work Sans is a **variable font** with a continuous weight axis (100–900). Use interpolated weights for optical correction.
**Halation correction:** Light text on a dark background creates an optical illusion that makes letterforms appear heavier than they are. There are two techniques to reduce this:

- **On light backgrounds (Canvas):** Use the canonical tier weights (450, 550, 650, 700); named weight tokens remain available for specific roles. Canvas is already an off-white (`#F7F1ED`) rather than pure white, which naturally reduces irradiation against dark type.
- **On non-Skillit dark backgrounds:** Subtract ~25 units to use interpolated weights (375, 475, 575, 675). Skillit layout surfaces remain Canvas or Plaster.

### Typographic Punctuation

**Smart Quotes:** Always use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`). Never use straight (dumb) typewriter quotes (`"` `'`) in human-readable copy. Straight quotes are for writing code; angled quotes are for reading text.
**Hanging Punctuation:** All text blocks must use optical margin alignment. Because our layouts are strictly flush-left, this rule applies exclusively to the left margin: **opening quotation marks** on the first line of a paragraph (or pull quote). These marks must hang _outside_ the left bounding box of the text column so the actual letters form a perfectly flush, unbroken vertical line down the grid. Do not hang punctuation that naturally wraps mid-paragraph, and **do not hang bullets or numbers** in a list.

### Widows and Orphans

A **widow** is a single word left dangling on its own line at the end of a paragraph. An **orphan** is a single line of text separated from its paragraph across a column or page break. Both damage readability and scannability. Avoid them by manually adjusting the spacing:

- **Tracking Adjustment (Primary Fix):** To fix a widow or orphan, manually adjust the tracking (letter-spacing) of the entire text block by up to `±2%` (`±0.02em`). This is the preferred method because it imperceptibly compresses or expands the text to force a re-wrap without creating a ragged visual hole at the end of the previous line.
- **Engineering and fallback:** Use `text-wrap: balance` on headings and `text-wrap: pretty` on body. Where unsupported, test critical copy at every supported width and zoom setting; adjust the wording or apply a non-breaking space between the last two words only after checking that it does not cause overflow. `<wbr>` adds a wrap opportunity inside a long word; it does not prevent a final single-word line. Allow natural wrapping if a manual fix harms reflow. Use `orphans: 2; widows: 2;` for print page or column breaks.

### Typography Do / Don’t

**Email typography:** Use Text-1x (16px / 1rem), Work Sans weight 450, line-height 1.4 as the default and minimum for readable email text—including signatures, footer contacts, addresses, copyright, legal links, captions, and source references. Use 600 for emphasis. Do not apply the general 12px Text-0.75x metadata exception to email. Larger canonical heading/display tiers remain available for marketing emails. Where variable weight 450 is unsupported, use the nearest supported regular weight and verify rendering. Allow contact rows to wrap on narrow screens; never shrink type or force horizontal overflow to keep them on one line.


- **Do** use sentence case for authored brand copy; retain documented source-capitalization exceptions.
- **Don’t** use decorative title case or all-caps in authored UI or layouts; preserve the fixed wordmark, acronyms, proper nouns, user-entered data, and direct-quote capitalization.
- **Do** let size, weight, and spacing create hierarchy.
- **Don’t** use Traffic Cone or Hard Hat on headings to signal rank; the single focal display/hero accent is the documented Traffic Cone brand exception in `tokens/docs/color.md`, never a WCAG pass.
- **Do** use angled (smart) quotation marks (`“` `”`) and apostrophes (`’`).
- **Don’t** use straight (dumb) typewriter quotes in human-readable copy.
- **Do** use 16px spacing between paragraphs and 8px between text list items.
- **Don’t** force a widow correction that causes overflow or harms responsive reflow; test wrapping at supported widths and zoom, and allow natural wrapping when necessary.
- **Don’t** use Work Sans Light (300) — too thin for job-site legibility.
- **Don’t** use any typeface other than Work Sans for human text or JetBrains Mono for machine data.
- **Don’t** use display tiers in compact UI controls; use the functional tiers or the explicitly documented component tier.
- **Don’t** track running copy; ±0.02em is allowed only for a tested static-copy widow correction. Functional Text-0.75x uses its canonical +0.04em tracking.

---

## Layout

### The principle

**Whitespace is not empty space—it is structural mass.** It is the primary tool used to organize information and direct the eye. The human is the subject; the grid is the quiet, consistent framework that supports them. Everything else gets out of the way.
**The core visual constraint, stated plainly:** mostly white, black, and a splash of a single accent. **If an element does not perform a specific, functional job, delete it.**

### Surface boundaries (Cards & Containers)

The interface relies on stark, physical separation rather than artificial lighting effects.

- **No layout lines or drop shadows.** Applies to slides, documents, and UI layouts: no divider rules, underlines added beneath headings, table gridlines, or separator strokes between content blocks. Separate content through whitespace, alignment, typography, and Canvas/Plaster surface contrast. Do not inherit borders or shadow effects from presentation themes. Functional chart lines, chart leader lines, control boundaries, link underlines, and keyboard-focus rings follow their existing component/data rules; they are not layout separators.
- **No colored backgrounds for cards.** Do not use Hard Hat, Bottle Glass, or Traffic Cone as container backgrounds.

### Surface hierarchy

Every layout uses four layers, in order of elevation and visual weight:

1. **Ground** — Canvas. The default background for all pages and apps.
2. **Lifted Surface** — Plaster. Used for cards and isolated containers. Drop shadows are banned; Plaster separates through optical brightness and generous padding. No divider rules or table gridlines. Explicitly specified functional control boundaries use Iron; selection-indicator paint is a separate exception.
3. **Structure** — Iron. Used for text and explicitly specified functional control boundaries, not layout dividers or table gridlines. It does not become a layout background surface; a functional modal backdrop or photographic text-legibility overlay is the explicit exception.
4. **Signal** — Traffic Cone. Functional action and data cues, not a color-count limit.

### Rules

- **Flush left.** All typography and content blocks align flush left. Centered text is banned, including headlines. The grid provides the structure; strict alignment makes it visible.
- **Optical Top Alignment.** Elements positioned across columns should align perfectly at their top edge. Because digital typography includes internal leading, text should be vertically trimmed using the measured cap-height ratio of the inspected Work Sans file (`0.66`); remeasure a different deployed file. For Text-1x, set `line-height: var(--text-1x-leading); margin-top: calc((0.66 - var(--text-1x-leading)) * 0.5em);`. A `1.4` leading value produces `-0.37em`; substitute the matching tier’s leading token for other sizes.
- **Button Alignment.** When aligning a button alongside text, align the button by its typography (its internal cap height), not its external padding bubble. Use the matching canonical padding token; when needed, compensate for its top padding and the measured glyph alignment. Test the result at supported widths and zoom; optical `em` adjustments are not ordinary layout spacing.
- **Tension through scale.** Create hierarchy through dramatic leaps in scale (e.g., placing a 64px headline directly next to a 16px body copy block). Do not rely on intermediate sizes or color shifts to organize information.
- **Strict functionalism.** No abstract shapes, blobs, or illustrated backgrounds. Every border, margin, and pixel should perform a structural job. The approved neutral boot-tread texture is the narrow exception in non-content header/footer zones, never beneath UI text.
- **Action priority, not a color quota.** Use orange for primary actions, selection controls, and focus. Repetition is allowed when it serves the interaction. Keep one dominant CTA per section; supporting controls should not compete with it. Orange in charts follows its assigned data role. Never use it as decoration.
- **Shape signals action.** Buttons, links, editable inputs, checkboxes, radios, and chips all support actions. Pill shape belongs only to button-like actions/chips; it is not required on every interactive element. Static cards/panels/photos use 16px corners; editable fields and checkbox boxes use 0px. Inner indicators display state: radio circles use 50% geometry, not an extra container-radius tier. Status icons, progress fills, and data fills do not imply an action. Intermediate container radii (4px or 8px) and drop shadows are banned.
- **Type and spacing: rem. Radii and borders: px.** Font-sizes, base spacing, and paired padding use `rem`; macro spacing retains canonical `clamp()` expressions (scales with browser zoom, respects accessibility settings). Borders and container radii use `px`; circular indicator geometry may use `50%`. Local `em` is reserved for optical alignment and documented indicator geometry, not ordinary gaps or paired padding.
- **Consistent text blocks.** Body text columns never exceed 70 characters wide to maintain perfect tracking and readability.

### Border radius (Shape signals action)

In this system, shape indicates whether an element is interactive or static. We rely on two extremes and nothing in between:

- **Static elements:** `16px` radius. Applied to all cards, layout panels, images, photos, and containers.
- **Button-like actions:** `9999px` (fully rounded pill, `--radius-pill`). Applied to buttons and interactive chips, not every link or editable control.
- **Editable controls and checkbox boxes:** `0px`; inputs remain actions despite square geometry. Radio indicators use `50%` circular geometry. Inner indicators show state; status icons, progress fills, and data marks are not actions.
- **Structural borders:** Iron; documented Cone checkbox, radio, and selection-chip indicator strokes/fills are selection exceptions, not permission for semantic container borders.
- **Focus:** Default to a visible 2px solid Traffic Cone outline with 2px offset. Cone on Canvas is 2.6958:1, below the 3:1 UI/focus contrast floor; on Plaster it is 3.0177:1 and meets that floor. Keep the requested orange treatment; do not claim an AA pass on Canvas or silently substitute Iron. Check the actual adjacent surface, clipping, keyboard visibility, and rendered native controls. Preserve native focus in forced-colors mode; unresolved surface contrast needs review.
- **Intermediate radii:** Banned. Do not use `4px`, `8px`, or slightly rounded corners anywhere.

### Grid & Baseline

The layout is built on an **8px/16px baseline grid**, paired with **Fluid Architectural Scaling**.
While micro-spacing uses canonical `rem` tokens (`0.5rem`, `1rem`, `2rem`, equivalent to 8px, 16px, 32px at a 16px root), macro-spacing (margins, section gaps, padding) uses CSS `clamp()` functions (`--space-128` and `--space-256`). This ensures the massive, confident margins seen on desktop smoothly and gradually compress as the viewport scales down, exactly mimicking the fluid, tensioned behavior of Anthropic’s grid, without sudden, jarring jumps at breakpoints.
**12-Column Newspaper Grid:** All desktop layouts sit on a strict 12-column grid; equal-track construction such as `repeat(12, minmax(0, 1fr))` is valid. Do not use ad hoc percentage splits. Blocks should span fixed column counts (e.g., 7 columns for hero text, 5 columns for the hero CTA) so that vertical alignment is maintained down the entire page.
| Element | Height / Padding | Margin |
| ------------------- | ----------------------------- | ------------ |
| Nav Bar | 64px | — |
| Logo Lockup | 24px height (`--logo-height`) | — |
| Primary Buttons | `--padding-1x`: 0.5rem vertical, 1rem horizontal at Text-1x | — |
| Desktop Section Gap | — | 128px |
| Desktop Page Margin | — | 128px |

**Paired padding is authoritative in `rem`:** use `--padding-0.75x` = `0.25rem 0.5rem` at 12px (compact exception), `--padding-1x` = `0.5rem 1rem` at 16px, `--padding-1.5x` = `0.75rem 1.5rem` at 24px, and `--padding-2x` = `1rem 2rem` at 32px. Do not replace these fixed pairs with universal `0.5em 1em` padding. Pixel equivalents assume a 16px root. Header and body share the same responsive side-padding contract in [spacing](../tokens/docs/spacing.md).

### Layout Do / Don’t

- **Do** leave generous space. Minimum `--space-16` (64px at a 16px root) vertical padding on desktop sections.
- **Don’t** fill space with shapes, patterns, or decorative elements to avoid “emptiness.”
- **Do** use 16px corners for static containers and photos.
- **Do** use fully rounded pill shapes for primary buttons.
- **Don’t** use intermediate container corners (e.g., 4px or 8px); approved circular indicator geometry is not a container tier.
- **Don’t** bevel edges or use drop shadows.
- **Do** restrict neutral boot-tread texture to non-content header zones; leave navigation text and controls on an unpatterned surface.
- **Don’t** use it as a section background or content surface fill.

---

## Data Visualization

Skillit’s data visualization is utilitarian. The charts should be legible, precise, and stripped of decorative noise. Our goal is human-centered clarity: every pixel should convey the truth of the data.

### Chart requirements

Every chart must include:

- **Header** — what the data shows (e.g., “Craft hires by trade, Q3 2026”)
- **Subheader** — context or timeframe if not in the header
- **Reference** — attribution at the bottom in JetBrains Mono, `Text-0.75x` (12px), opaque Iron; include approved source, date, cohort, and metric definition

### Geometry & Structure

- **Containers:** All data viz graphics must sit on a Plaster (pure white) background card to isolate the data and maintain contrast against the surrounding UI.
- **Sharp edges:** Bar charts use `0px` border-radius — flat, sharp edges (data precision, not decoration). Tooltips, legends, and Plaster cards keep `16px`.
- **Line weight:** All structural lines must be `4px` thick. This applies to data lines and gridlines.
- **Gridlines:** Rendered in Canvas with 4px stroke weight. Remove all outer bounding boxes. Use horizontal (Y-axis) gridlines only. No vertical gridlines.
- **Pie charts:** Slices must sit flush against each other with zero gap and zero stroke.
- **Line charts:** Both unsmoothed (stepped/linear) and smoothed (spline/curved) paths are permitted based on the data story.

### Color

- **Monochromatic scale:** A monochromatic scale is a default, not an exclusive requirement. Categorical charts may use Traffic Cone, Painter’s Tape, and other canonical palette colors for a specific communication purpose, with legends or direct labels and non-color cues; verify label and graphical contrast on the actual surface.
- **Highlight:** Traffic Cone may highlight a focal data point or trend with Iron context, or appear alongside other canonical categorical colors. The supply/demand scheme uses Painter’s Tape for worker availability and Traffic Cone for job openings. Keep meaning scoped to the chart; UI message roles do not ban categorical data colors. Data marks and progress fills are state/data displays, not actions.

### Bar graphs

- Use flat fills only. For N opacity steps, distribute values evenly from 100% down to 100% / N: 100% / 50% for two steps, 100% / 67% / 33% for three steps. Apply the same rule to Iron and Traffic Cone.
- **Annotations** — value callout labels in Work Sans, `Text-1x`, Iron, with a thin Iron line pointing to the data point
- **Legend** — placed at the bottom, horizontal layout, Work Sans `Text-1x`
- Grouped bars: optionally use equally stepped Iron opacity, such as 100% / 67% / 33% for three series, or purposeful canonical categorical colors; include legends or direct labels and non-color cues

### Flowcharts

- Flowchart nodes may include **graphics** (icons, small illustrations) alongside text
- Node backgrounds: Plaster with 16px corners
- Connector lines: Iron, 2px weight, 16px corners on turns
- Decision diamonds: neutral Plaster fill with Iron text; no semantic fill without an explicitly documented approved exception
- CTA nodes: a single actionable node with Traffic Cone fill and Iron text

### Banned Elements

- 3D effects and drop shadows.
- Donut charts (decorative SaaS trope. If showing a part-to-whole ratio, use a solid pie chart instead).
- Radar or spider charts.

---

## Voice & Tone

### The north star

> Write like the smartest person on the job site — the one who’s been doing this since before it was a startup, who knows the data cold, and who doesn’t need to prove they belong in the room because the work speaks for itself.
> **If it sounds like a press release, a pitch deck, or a LinkedIn growth-hacker, it’s wrong.**

**The Worker-First Mandate:** Every piece of copy—from blog titles to button labels—must ultimately serve and elevate the worker. Amplify the overlooked details of craftwork by focusing on these traits: _Agency, Judgment, Craftsmanship, Stamina, Responsibility_. Technology should uplift, meaning craft pros are irreplaceable and tech merely provides a direct route for their skills to be discovered.

### The Five Core Traits

The brand voice is built entirely around five traits inherent to craft pros. Every piece of copy should reflect at least one of these:

**1. Agency (Empowering Choice).** Craft workers are independent decision-makers, not cogs in a machine. Write to support their control over their career.

- Wrong: “We place you in open jobs.”
- Right: “Choose the right job for you.”

**2. Judgment (Respecting Expertise).** They know the work better than we do. Never talk down, over-explain, or act like the software is the hero.

- Wrong: “Our algorithm knows the best fit for your skills.”
- Right: “You know your trade. We make sure contractors see it.”

**3. Craftsmanship (Tangible Reality).** Emphasize the tangible skill and precision of the work. Avoid abstract digital jargon.

- Wrong: “Optimizing the talent acquisition pipeline.”
- Right: “Getting the right worker to the right job site.”

**4. Stamina (Direct & Unfussy).** Acknowledge the physical and mental reality of the job site. Write concisely—for gloves and sunlight.

- Wrong: “We think construction workers deserve better tools.”
- Right: “Construction workers deserve better tools.”

**5. Responsibility (Reliable Objectivity).** Speak objectively and reliably. No empty promises, no hype, no fluff.

- Wrong: “We will revolutionize your career in construction!”
- Right: “Set your pay expectations upfront. Earn what you’re worth.”

### Plain language
Customers and craft professionals are not in our business every day. Write so a five-year-old could follow the argument — short words, short sentences, no jargon. Concrete over abstract. One idea per sentence. Cut every word that doesn’t carry weight.

State what is true. State it once. Then stop. Avoid stacking adjectives to manufacture value. Avoid implied competitor comparisons. If a sentence can be cut without losing meaning, cut it.

### Tone by Channel

| Channel                      | Audience    | Purpose                   | Key traits                                   |
| ---------------------------- | ----------- | ------------------------- | -------------------------------------------- |
| **Website**                  | Both        | Explain the platform      | Confident, objective, proof-heavy            |
| **Insights** (formerly Blog) | Both        | Authority & analysis      | Authoritative, punchy, grounded              |
| **Comms** (formerly Press)   | Public      | Product milestones & news | Tangible impact, never just product features |
| **Worker app**               | Workers     | Guide through tasks       | Unfussy, respectful, simple                  |
| **Contractor dashboard**     | Contractors | Show outcomes             | Precise, no-nonsense                         |
| **LinkedIn**                 | Both        | Industry authority        | Opinionated, first-person, data-backed       |
| **Worker newsletter**        | Workers     | Monthly updates           | Direct, practical, grounded                  |
| **Customer newsletter**      | Contractors | Nurture & retention       | Data-backed, proof-heavy                     |

### Demand Gen vs. Supply Gen

**Demand Gen** (employer-facing): cold leads, nurture/warm leads, monthly customer newsletter

| Don’t use                                                                  | Do use                                      |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| Anthropomorphize robotics or Skillit as a singular entity                  | “Skillit matches craft professionals to projects” |
| “Proud” / facts + quotes from relevant sources to support emotional impact | Data and outcomes first                     |
| “Serve” / “support”                                                        | “Match,” “connect,” “capture,” “feature”    |
| “Workers” for first intro, then “workers”                                  | “Craft professionals” first, then “workers” |

**Supply Gen** (worker-facing): monthly newsletter, paid ads, help center, call center SOP

| Don’t use                               | Do use                               |
| --------------------------------------- | ------------------------------------ |
| “Represent” / “reflect”                 | “Match,” “connect,” “get discovered” |
| Generic “workers” or impersonal labels | “You,” the trade, “craft professionals,” or “members” for people who have joined |
| “Serve” / “support”                     | “Match,” “connect,” “find”           |

### Sam (The AI)

Sam is Skillit’s AI assistant. Sam has a name because names matter — they signal that this is a tool built for humans, not a machine replacing them.

- Right: “Hey Sam, pull up civil welders with GMAW experience in Dallas.”
- Wrong: “Our proprietary ML algorithm surfaces qualified candidates based on your requirements.”

**Sam coordinates and surfaces. The human still decides.** This is the ultimate expression of worker _Agency_ and _Judgment_.

**Sam’s voice rules:**

- **No exclamation marks.** Period.
- **No emojis.** Ever.
- Use plain, direct language.
- Whenever possible, use a period instead of a question mark.
- Do not anthropomorphize. Sam is not a person.

### Banned Language (Trait Violations)

- **Violates Responsibility (Hype):** “Revolutionize,” “Disrupt,” “Excited to announce,” “Thrilled to share,” “World-class.”
- **Violates Craftsmanship (Tech Abstraction):** “Ecosystem,” “Leverage synergies,” “Holistic,” “Pipeline.”
- **Violates Judgment (Hedging):** “We believe,” “Perhaps,” “Might be able to.”
- **Violates Agency (Software as Hero):** “AI-powered” as the lead descriptor, “We place you,” “Let our algorithm decide.”

### Copy Do / Don’t

**Do** lead with a verified insight. Reusable metrics require an approved source, observation/publication date, cohort, definition, and claim owner; legacy examples in [the brand narrative](../brand/narrative.md#metric-source-policy) are unverified and blocked from reuse until approved.
**Do** use inline bolding for key phrases in paragraph text to improve scannability (Stamina).
**Don’t** lead with the product. “Skillit is an AI-powered construction hiring platform...”
**Do** use strict consistency for button labels. If a button points to account creation, it should say “Join” everywhere.
**Do** use one CTA per section. Ensure the primary mobile CTA is visible without scrolling.
**Don’t** offer “Start hiring” alongside “Get hired” — consolidate to a single “Join.”

---

## Photography & Imagery

Photography is the brand’s most human element. Every image should make a craft worker feel seen — not as a stock photo prop, but as a skilled professional whose work builds the physical world.

Lean into the archetype of the independent, strong, hands-on do-er. The aesthetic should blend the accessibility of a government vocational program, the rigor of resource-rich institutions, and the flair of aspirational publications.

**Do**

- Use Adobe Stock only; exclude generative AI
- Apply multiply blend mode only when a photograph sits on a light background and needs to melt into the Canvas ground
- Frame workers at eye level or below; capture candid, dignified work on real job sites; show hands
- Use earth tones, big scopes, aerial for projects; silhouettes, profiles, hands for stock workers
- Overlay text in Canvas with 50% Iron filter on the image

**Don’t**

- Don’t use photographic edge masks (feathered edges, vignettes, beveled cutouts)
- Don’t apply color grading, warm toning, or dramatic filters; natural color only
- Don’t overlay symbols, UI elements, or graphs on images
- Don’t use AI-generated images or composite backgrounds; if background is removed, the worker sits directly on Canvas
- Don’t frame worker subjects from above; aerial or high-angle environmental/project photography is permitted when it does not look down on a worker subject
- Don’t use stock photo aesthetics (fake smiles, obvious casting, “safety theater” costumes)
- Don’t use generative AI imagery

### Iron filter

The Iron filter is for **text legibility only**, not for aesthetic grading of the image itself.

- Apply Iron filter **only when overlaying text** on an image
- Use at 50% opacity over the image area where text sits
- Do **not** apply Iron filter to full-width hero images or standalone photography
- For standalone images, use multiply blend mode only on lighter backgrounds to melt into Canvas

### Collages

Grid collages of separate authentic photographs are permitted for select marketing materials; they are not fabricated scenes or replacement backgrounds. Do not merge workers and environments into a fictional photographic composite.

**Rules:**

- Maintain eye-level or below framing for worker subjects; aerial environmental/project images retain their separate permission
- Keep consistent lighting — do not mix golden-hour warmth with midday cool
- No image should be smaller than 120px in its longest dimension at desktop
- Use 16px gaps between images on desktop, 8px on mobile
- Grid layouts only — no overlapping, diagonal cuts, or feathered edges
- Maintain the Iron filter rule: apply only where text overlays the collage

---

## Proposed website structure (not live inventory)

**Status:** Draft design reference, not a live-site feature or page inventory. Original proposal date and approval date/status are unknown; instruction repair recorded 2026-10-01 does not establish design approval. Confirm current navigation, features, partnerships, and content with their owners before implementation. All subsection bullets below are proposals, not shipped claims. Do not invent current statistics or live-data behavior.

**Claim gate:** Require an approved source, date, cohort, definition, and claim owner for every reusable metric. Published homepage copy describes 72 hours from profile setup to interview; the older [narrative](../brand/narrative.md#metric-source-policy) describes search to interview. These are conflicting measurement definitions, not interchangeable facts: block 72-hour reuse until the owner approves one with supporting data. “Free” applies only to craft professionals, not universal employer/platform pricing.

### Header

- Logo lockup
- Navigation: Find Work · Our Network · What We Do · Resources · Who We Are · Support
- Join

### Home Page

- Hero with revolving trade word + CTA
- Proposed employer-logo row; verify each relationship and obtain usage approval before publication
- Proposed metric callouts; no current counts are established here, and the 72-hour claim is blocked pending definition approval; free membership copy is limited to craft professionals
- What to Expect (3-step onboarding)
- Define Your Role (job listings by title, not company; estimated prices)
- Proposed data display (split-flap); live source, refresh behavior, and shipping status require confirmation
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
- Proposed “two agents, one platform” framing; a two-agent architecture is not confirmed; verify product source and shipping status before reuse
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

- **The Rule:** Scale display text sizes down smoothly to 0.75x at mobile breakpoints (e.g., a desktop 128px becomes 96px on mobile). However, **keep the original weights** (do not scale down the font-weight) to maintain the visual hierarchy and density.
- **Body Text Exception:** Body text does **not** scale on mobile. `Text-1x` holds at 16px (`Text-1s` = 16px) — see “Why Text-1x does not scale” in `tokens/docs/typography.md`. UI text (`--text-1x`) also holds its size; the 40px touch target rule governs app surfaces, not display.

---

## Engineering Handoff

- Start with the [README integration points](../README.md#integration-points) and [verification commands](../README.md#verification); this specification is not an automatic deployment.
- Read [LLM instructions](../LLM-INSTRUCTIONS.md) for behavioral precedence and [canonical tokens](../tokens/tokens.json5) for values. Use the derived [CSS](../tokens/generated/tokens.css) and [Tailwind theme](../tokens/generated/tailwind-theme.js); keep them synchronized with the canonical source.
- For the verified Rails `main` integration, retain `app/assets/stylesheets/onboarding.css`, `config/tailwind.config.js`, and copied SVGs under `app/assets/images/bds/`; engineering must review scoped updates rather than move tokens blindly to `application.css` or reskin unrelated UI.
- Marketing integration is maintained outside this repository; confirm its actual deployment workflow. Review only the requested UI/scope, report legacy conflicts outside scope, and require engineering review before broader migration.

---

## Resources

- [README: file ingestion, repository map, integration, and verification](../README.md)
- [Canonical token source](../tokens/tokens.json5) and [token documentation](../tokens/docs/)
- [Generated CSS](../tokens/generated/tokens.css) and [Tailwind theme](../tokens/generated/tailwind-theme.js)
- [Component specifications](../components/) and [visual/accessibility rules](../rules/)
- [Brand narrative and metric-source policy](../brand/narrative.md) and [brand voice](../voice/brand-voice.md)

### Asset Directory

- [UI icon SVGs](../assets/icons/); see [iconography](#iconography) for delivered-versus-planned metaphors
- [Approved logo, mark, lockup, favicon, and pattern files](../assets/logo/); follow [logo documentation](../tokens/docs/logo.md)
- Preserve approved fixed artwork and export paint. UI-style hex restrictions do not authorize consumers to recolor logos; asset owners handle any approved source/export refresh together.
- Approved PNG variants are 512px **high**, not necessarily 512px wide. The deterministic [logo PNG exporter](../scripts/export-logo-pngs.py) preserves SVG geometry/aspect; its `--check` mode verifies export parity. Use PNG only where the platform rejects SVG.
