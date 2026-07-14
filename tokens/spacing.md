# Spacing Tokens — Skillit BDS

**Last updated:** 2026-07-13

---

## Rules before you use this file

- The system uses a strict **8px / 16px baseline grid**.
- Never hardcode margins or padding with arbitrary `px` values. Always use a multiple from the token scale below.
- Do not mix units (e.g., `em` or `%` for structural spacing).

---

## The 8px/16px Multiplier Scale

The layout spacing directly mirrors the typography scale's factor-of-2 logic.

| Token | Pixel Value | Rem Value | Common Use |
|---|---|---|---|
| `--space-8` | 8px | 0.5rem | Micro gap, button vertical padding |
| `--space-16` | 16px | 1rem | Tight gap, button horizontal padding |
| `--space-32` | 32px | 2rem | Standard gap, lockup height |
| `--space-48` | 48px | 3rem | Medium component gap |
| `--space-64` | 64px | 4rem | Inner section padding, grid gutters, nav bar height |
| `--space-96` | 96px | 6rem | Section padding |
| `--space-128` | 128px | 8rem | Minimum desktop section gap, page margins |
| `--space-256` | 256px | 16rem | Massive editorial breaks |

---

## Structural Constants

| Element | Height / Padding | Margin |
| ------- | ---------------- | ------ |
| Nav Bar | 64px (`--space-64`) | —      |
| Logo Lockup | 32px (`--space-32`) | —      |
| Primary Buttons | 8px vertical, 16px horizontal | — |
| Desktop Section Gap | — | 128px (`--space-128`) |
| Desktop Page Margin | — | 128px (`--space-128`) |

**Last updated:** 2026-07-10

---

## Rules before you use this file

- Use only named spacing tokens. Never hardcode arbitrary pixel values.
- Whitespace is a core brand element — it focuses attention on the human. When in doubt, use more space, not less.
- The system uses “tactile padding” — interactive elements (buttons, cards) use generous horizontal padding to feel warm and physical, not tight and SaaS-like.
- All values are in `rem` (base 16px). Never use `px` for spacing — it breaks accessibility scaling.

---

## Base spacing scale

Built on a 4px base unit (`0.25rem`). Every value is a multiple of 4.

| Token | Value | px equiv | Use |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4px | Micro gaps — icon-to-label, tight inline spacing |
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

## Tactile padding

Buttons and interactive cards must use **double the standard horizontal padding** to feel warm and physical. This is a non-negotiable brand rule.

| Component | Vertical padding | Horizontal padding |
|---|---|---|
| Button (default) | `--space-3` (12px) | `--space-8` (32px) |
| Button (small) | `--space-2` (8px) | `--space-6` (24px) |
| Button (large) | `--space-4` (16px) | `--space-10` (40px) |
| Card | `--space-6` (24px) | `--space-6` (24px) |
| Input field | `--space-3` (12px) | `--space-4` (16px) |

---

## Layout grid

### Website / marketing

| Property | Value |
|---|---|
| Max content width | `1200px` |
| Side margin (desktop) | `--space-16` (64px) each side |
| Side margin (tablet) | `--space-8` (32px) each side |
| Side margin (mobile) | `--space-4` (16px) each side |
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
| Touch target minimum | `44px` (Apple HIG / WCAG 2.5.5) |

---

## Text Spacing Rules

- **Paragraphs:**  (16px / ) below paragraphs. This is exactly equal to the body font size (1em), maintaining a perfect mathematical rhythm.
- **Text Lists:**  (8px / ) between bulleted or numbered text items. This tighter spacing ensures the list reads visually as a single, cohesive block of information.
- **UI Lists:**  (16px / ) between interactive list items in the app or dashboard. This wider spacing protects the 44px minimum touch target rule.

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

  --max-width-content: 1200px;
  --max-width-app:     480px;
  --max-width-text:    70ch;

  --touch-target-min:  44px;
}
```

---

## Whitespace rules

- **Minimum editorial padding:** All full-width sections must have at minimum `--space-16` (64px) top and bottom padding. Less than this reads as cramped and contradicts the brand’s editorial whitespace principle.
- **Maximum text width:** Body text columns must never exceed `70ch` (approximately 70 characters). Set `max-width: var(--max-width-text)` on all `<p>` blocks.
- **Hero sections:** Minimum `--space-24` (96px) top padding on desktop. The hero is the brand’s first impression — give it room.
- **Between unrelated sections:** Always `--space-16` minimum. Never let unrelated content run together.
