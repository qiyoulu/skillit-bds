# Spacing Tokens — Skillit BDS
**Last updated:** 2026-08-17
**Canonical source:** `tokens.json5` (machine-readable). This file is the human-readable spec; never add a token here without adding it there.
---
## Rules before you use this file
- The system uses a strict **8px / 16px baseline grid**.
- Never hardcode margins or padding with arbitrary `px` values. Always use a multiple from the token scale below.
- Do not mix units (e.g., `em` or `%` for structural spacing).
- All values are in `rem` (base 16px). Never use `px` for spacing — it breaks accessibility scaling.
- Whitespace is a core brand element — it focuses attention on the human. When in doubt, use more space, not less.
- The system uses "tactile padding" — interactive elements scale padding with font size (0.5em vertical / 1em horizontal on buttons) to feel warm and physical, not tight and SaaS-like.
---
## Base spacing scale
Built on a 4px base unit (`0.25rem`). Every value is a multiple of 4. This is the canonical scale — one value per token name, no duplicates.
| Token | Value | px equiv | Use |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4px | Micro gaps — icon-to-label, tight inline spacing |
| `--space-1.5` | `0.375rem` | 6px | Small-viewport text list gaps (mobile bullet/numbered rhythm) |
| `--space-2` | `0.5rem` | 8px | Compact spacing — badge padding, text list item gaps |
| `--space-3` | `0.75rem` | 12px | Small gaps — input field internal padding (top/bottom) |
| `--space-4` | `1rem` | 16px | Default spacing unit — paragraph gap, UI list item gap |
| `--space-5` | `1.25rem` | 20px | Medium — between form groups |
| `--space-6` | `1.5rem` | 24px | Standard section padding, between related elements |
| `--space-8` | `2rem` | 32px | Between unrelated elements, nav to content |
| `--space-10` | `2.5rem` | 40px | Large section gaps |
| `--space-12` | `3rem` | 48px | Section breaks |
| `--space-16` | `4rem` | 64px | Major section separators |
| `--space-20` | `5rem` | 80px | Hero padding, full-bleed section margins |
| `--space-24` | `6rem` | 96px | Maximum section vertical padding |
---
## Macro spacing (fluid)
Large structural spacing uses CSS `clamp()` to fluidly scale down, preventing abrupt layout shifts on resize. These tokens do **not** collide with the base scale.
| Token | CSS Value | Common Use |
|---|---|---|
| `--space-128` | `clamp(48px, 10vw, 128px)` | Desktop section gaps, page margins |
| `--space-256` | `clamp(96px, 18vw, 256px)` | Massive editorial breaks |

> **Retired:** `--space-64` and `--space-96` from the old fluid multiplier scale are gone. Do not use them — the macro scale is `--space-128` and `--space-256` only.
---
## Structural Constants
| Element | Height / Padding | Margin |
| ------- | ---------------- | ------ |
| Nav Bar | 64px (`--space-16`) | —      |
| Logo Lockup | 32px (`--space-8`) | —      |
|| Primary Buttons | `0.5em` vertical, `1em` horizontal (scales with font size) | — |
| Desktop Section Gap | — | 128px (`--space-128`) |
| Desktop Page Margin | — | 128px (`--space-128`) |
---
## Tactile padding
Button padding scales with font size: vertical = 0.5× font size, horizontal = 1× font size (`padding: 0.5em 1em`). This is a non-negotiable brand rule — the em ratio keeps the proportions identical at every button size, unlike fixed px values that drift when font size changes. At the standard 16px button text, this yields 8px/16px.
| Component | Vertical padding | Horizontal padding |
|---|---|---|
| Button (all sizes) | `0.5em` | `1em` |
| Card (desktop) | `--space-16` (64px) | `--space-16` (64px) |
| Card (mobile) | `--space-8` (32px) | `--space-8` (32px) |
| Input field | `--space-3` (12px) | `--space-4` (16px) |
---
## Layout grid
### Website / marketing
| Property | Value |
|---|---|
| Max content width | `1168px` |
| Grid column min width | `326px` |
| Side margin (desktop) | `--space-16` (64px) each side |
| Side margin (tablet) | `--space-8` (32px) each side |
| Side margin (mobile) | `--space-8` (32px) each side |
| Column gutter | `--space-6` (24px) |
| Grid columns (desktop) | 12 |
| Grid columns (tablet) | 8 |
| Grid columns (mobile) | 4 |
### App (worker-facing)
| Property | Value |
|---|---|
| Max content width | `480px` (mobile-first) |
| Side padding | `--space-4` (16px) |
| Vertical section gap | `--space-8` (32px) |
| List item gap | `--space-4` (16px) |
| Bottom nav height | `64px` |
|| Touch target minimum | `40px` |
---
## Text Spacing Rules
- **Paragraphs:** `--space-4` (16px / 1rem) below paragraphs. This is exactly equal to the body font size (1em), maintaining a perfect consistent rhythm.
- **Text Lists:** `--space-2` (8px / 0.5rem) between bulleted or numbered text items. This tighter spacing ensures the list reads visually as a single, cohesive block of information.
- **UI Lists:** `--space-4` (16px / 1rem) between interactive list items in the app or dashboard. This wider spacing protects the 40px minimum touch target rule.

### Small viewports (`< 768px`)
- **Paragraphs:** unchanged (`--space-4`, 16px) — paragraph spacing is viewport-independent.
- **Text Lists:** unchanged (`--space-2`, 8px) — list spacing is viewport-independent.
- **UI Lists:** unchanged (`--space-4`, 16px) — the 40px touch target rule is viewport-independent.
---
## Breakpoints
| Name | Min width | Context |
|---|---|---|
| `sm` | `480px` | Large mobile |
| `md` | `768px` | Tablet |
| `lg` | `1024px` | Desktop |
| `xl` | `1280px` | Wide desktop |
```css
/* Use min-width (mobile-first) */
@media (min-width: 480px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```
---
## CSS custom properties (copy-paste ready)
```css
:root {
  --space-1:  0.25rem;
   --space-1\.5: 0.375rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-128: clamp(48px, 10vw, 128px);
  --space-256: clamp(96px, 18vw, 256px);
  --max-width-content: 1168px;
  --column-min-width: 326px;
  --max-width-app:     480px;
  --max-width-text:    70ch;
  --touch-target-min:  40px;
  --nav-height: 64px;
  --logo-mark-min: 21px;
  --wordmark-min: 16px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```
---
## Whitespace rules
- **Minimum editorial padding:** All full-width sections should have at minimum `--space-16` (64px) top and bottom padding. Less than this reads as cramped and contradicts the brand’s editorial whitespace principle.
- **Maximum text width:** Body text columns should never exceed `70ch` (approximately 70 characters). Set `max-width: var(--max-width-text)` on all `<p>` blocks.
- **Hero sections:** Minimum `--space-24` (96px) top padding on desktop. The hero is the brand’s first impression — give it room.
- **Between unrelated sections:** Always `--space-16` minimum. Never let unrelated content run together.
