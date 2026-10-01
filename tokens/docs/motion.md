# Motion Tokens — Skillit Kit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Motion must respect `prefers-reduced-motion` — no animation for users who disable it.
- All transitions use these tokens. Never write raw `transition: all 0.2s ease` — use the tokens.

## Duration scale

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Color swap, opacity toggle, focus ring |
| `--duration-medium` | 300ms | Expand/collapse, slide, progress bar fill |
| `--duration-slow` | 600ms | Modal open/close, page transition |

## Easing

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Entering elements (fast start, gentle land) |
| `--ease-in` | `cubic-bezier(0.55, 0.085, 0.68, 0.53)` | Exiting elements (slow start, quick leave) |

**Why ease-out for enter:** The element starts moving immediately (no hesitation) and decelerates into place. Reads as responsive and confident.

**Why ease-in for exit:** The element starts moving with urgency and decelerates out. Reads as decisive dismissal — it's leaving, not arriving.

## CSS pattern
```css
/* Entering */
.element-enter {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}
.element-enter-active {
  opacity: 1;
  transform: translateY(0);
}

/* Exiting */
.element-exit {
  opacity: 1;
  transition: opacity var(--duration-fast) var(--ease-in);
}
.element-exit-active {
  opacity: 0;
}

/* Simple color swap (buttons, links) */
.btn {
  transition: background-color var(--duration-fast) var(--ease-out);
}

/* Progress bar */
.progress-bar__fill {
  transition: width var(--duration-medium) var(--ease-out);
}
```

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This globally disables all motion for users who prefer reduced motion. Components do not need individual reduced-motion overrides — the global reset handles it.

## What animates, what doesn't

| Animates | Does not animate |
|---|---|
| Color swaps (hover, focus) | Layout shifts (content appearing) |
| Opacity (toast enter/exit) | Form submission |
| Transform (slide up/down) | Data loading (use skeleton) |
| Width (progress bar fill) | Typography (no typewriter effect) |

**Rule:** Animation is for *state change feedback*, not for *content delivery*. Content appears instantly; the transition into view may animate, but the content itself does not.

## Stagger
When multiple elements enter together (e.g., a list of cards), stagger by `--duration-fast` (150ms) per item:

```css
.card:nth-child(1) { transition-delay: 0ms; }
.card:nth-child(2) { transition-delay: var(--duration-fast); }
.card:nth-child(3) { transition-delay: calc(2 * var(--duration-fast)); }
/* etc. */
```

Maximum stagger: 3 items. Beyond that, all remaining items animate together (no perceptible benefit to longer delays).
