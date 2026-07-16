# Asset Rules — Skillit BDS

**Last updated:** 2026-07-16

---

## Rules before you use this file

- All assets in the `assets/` directory are built using `fill="currentColor"`.
- Do not hardcode hex values into any SVG paths.

---

## SVG Management

To ensure logos, patterns, and icons automatically adapt to their UI context (Iron on Canvas, Canvas on Traffic Cone, etc.), they must inherit CSS colors.

### The Rule
**Inline SVGs are the standard.** Every graphic, icon, logo variant, and repeating pattern uses `currentColor`. To unlock this functionality, SVGs should be inlined directly into the HTML (or handled via modern component frameworks like React/Vue that inline them at build time).

```html
<!-- CORRECT: The SVG automatically inherits the Traffic Cone color -->
<div style="color: var(--color-primary)">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
</div>
```

### Why this matters
1. **Dynamic Theming:** Using `currentColor` allows a single SVG file to work across light modes, dark inverted surfaces, and active states without needing duplicate files (e.g., we don't need a separate `mark-canvas.svg`).
2. **Component Architecture:** Modern web development thrives on componentized, inline SVGs that are easily manipulated by standard CSS.
