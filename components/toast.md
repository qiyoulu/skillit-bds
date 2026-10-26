# Toast / Notification — Skillit Kit BDS
**Last updated:** 2026-10-24
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Principle
Toast is a **transient feedback message** — it confirms an action, reports an error, or warns about a consequence. It is not interactive beyond an optional close button and an optional action link. The worker can continue working while a toast is visible.

## Anatomy
A toast is a horizontal row inside a static feedback panel with 16px corners. Its body is not an action:
1. **Icon (16px)** — semantic success green, warning yellow, error red, or info blue, independent of message foreground
2. **Message** — single line, Work Sans `--text-1x`, `--weight-medium`
3. **Close button (16×16)** — Iron on every type, icon-only, 40×40 hit area

Every toast uses a Plaster panel with Iron message text and close control. Only the status icon carries the semantic color; no matching colored panel fill is needed. The static panel uses 16px corners; optional close/link controls are actions. A toast with no action remains feedback; only its close button/link is actionable.

## Position
- **Mobile (< 768px):** bottom-center, full-width with 16px side margins, stacked above the nav footer
- **Desktop (≥ 768px):** top-right, 360px max-width, 16px from viewport edge

## Stacking
Multiple toasts stack vertically — newest at the bottom (mobile) or top (desktop). Maximum 3 visible; older ones dismiss when the queue exceeds 3.

## Types

| Type | Fill | Text | Icon | Use |
|---|---|---|---|---|
| Success | `--color-surface` (Plaster) | Iron | Bottle Glass circular checkmark (`--color-success`) | Action completed successfully |
| Error | `--color-surface` (Plaster) | Iron | Toolbox octagon (`--color-error`) | Action failed, requires attention |
| Warning | `--color-surface` (Plaster) | Iron | Hard Hat triangle (`--color-warning`) | Consequence warning, not a failure |
| Info | `--color-surface` (Plaster) | Iron | Painter’s Tape circled i (`--color-link`) | Informational message, not a result |

**Icon color rationale:** The current status exports retain semantic-colored grounds and opaque white glyphs. Host token classes express the required semantic role; this external-image recipe preserves the approved source colors rather than inheriting host color. For runtime recoloring, inline the SVG and control the ground separately from its white glyph with canonical tokens. The Plaster panel prevents a semantic glyph disappearing into a matching fill; message text and close controls stay Iron. Info uses supplied `information-circle.svg` with explicit message text; `question-mark-circle.svg` denotes help, not information.

**Known contrast limitation:** Hard Hat on Plaster is 1.8229:1, below 3:1. An essential warning glyph therefore fails WCAG 1.4.11; if the visible message fully conveys the warning independently, the redundant glyph is not required for understanding, but its ratio still is not a contrast pass. `aria-hidden` alone does not establish redundancy. Retain the triangle and explicit warning message, do not invent a darker yellow, and assess the actual usage. Iron body text on Plaster is 13.7135:1. Orange focus on Plaster is 3.0177:1; check the actual adjacent surface, since Orange on Canvas remains below 3:1.

## Timing
- **Auto-dismiss:** 5 seconds after appearing
- **Close button:** pauses the timer, then dismisses on click
- **Hover:** pauses auto-dismiss timer (worker is reading it)
- **Reduced motion:** no slide-in animation, instant appear

## Animation
- Enter: slide up 8px + fade in over `--duration-fast` (150ms)
- Exit: fade out over `--duration-fast` (150ms)
- Reduced motion: no animation, instant appear/disappear

## CSS pattern
CSS URLs assume a component stylesheet beside `tokens/generated/tokens.css`; see `icons.md` before moving or inlining the CSS.
```css
.toast {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
  padding: var(--space-2) var(--space-4); /* 8px 16px */
  border-radius: var(--radius-sharp); /* static feedback panel, not an action */
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--weight-medium);
  min-height: var(--touch-target-min); /* 40px */
  background-color: var(--color-surface); /* Plaster for every type */
  color: var(--color-foreground); /* Iron body text */
  animation: toast-in var(--duration-fast) var(--ease-out);
}

.toast--success .toast__icon { color: var(--color-success); }
.toast--error .toast__icon { color: var(--color-error); }
.toast--warning .toast__icon { color: var(--color-warning); }
.toast--info .toast__icon { color: var(--color-link); }

.toast__icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  background: var(--toast-icon) center / contain no-repeat; /* preserve semantic ground + white glyph */
}
.toast--success { --toast-icon: url('../../assets/icons/check-circle.svg'); }
.toast--error { --toast-icon: url('../../assets/icons/x-octagon.svg'); }
.toast--warning { --toast-icon: url('../../assets/icons/exclamation-triangle.svg'); }
.toast--info { --toast-icon: url('../../assets/icons/information-circle.svg'); }

.toast__message {
  flex: 1;
}

.toast__close {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground); /* Iron close control on every type */
  border-radius: var(--radius-pill);
}
.toast__close:hover { background-color: var(--color-surface-hover); } /* Plaster body; same as .modal__close */
.toast__close:focus-visible, .toast a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}
```

## Position
```css
.toast-container {
  position: fixed;
  z-index: var(--z-toast); /* 50 */
  display: flex;
  flex-direction: column;
  gap: var(--space-2); /* 8px */
}

@media (max-width: 767px) {
  .toast-container {
    bottom: calc(var(--nav-height) + var(--space-16)); /* above sticky nav */
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 2 * var(--space-4)); /* 16px sides */
    max-width: none;
  }
}

@media (min-width: 768px) {
  .toast-container {
    top: var(--space-4);
    right: var(--space-4);
    width: auto;
    max-width: 360px;
  }
}
```

## When to use

| Scenario | Type |
|---|---|
| Worker submitted a step successfully | Success |
| Form submission failed | Error |
| Worker tried to skip a required field | Warning (inline, not toast) |
| New feature available | Info |
| Network request timed out | Error |
| Profile saved | Success |

**Note:** Field-level validation errors are *not* toasts — they live inline under the field. Toasts are for page-level events (save, submit, network, system).

## Accessibility
- The toast has `role="status"` (polite, does not interrupt screen reader)
- The close button has `aria-label="Dismiss notification"`
- The message text is read automatically when the toast appears
- Auto-dismiss does not require screen reader announcement

## Examples
```html
<!-- Success toast -->
<div class="toast toast--success" role="status">
  <span class="toast__icon" aria-hidden="true"></span>
  <span class="toast__message">Your profile has been saved</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>

<!-- Error toast -->
<div class="toast toast--error" role="status">
  <span class="toast__icon" aria-hidden="true"></span>
  <span class="toast__message">Connection failed. Please try again.</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>

<!-- Warning toast: the message explicitly conveys the warning -->
<div class="toast toast--warning" role="status">
  <span class="toast__icon" aria-hidden="true"></span>
  <span class="toast__message">Your session expires in 5 minutes</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>

<!-- Info toast -->
<div class="toast toast--info" role="status">
  <span class="toast__icon" aria-hidden="true"></span>
  <span class="toast__message">New profile tools are available</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>
```

## Icon assets
- `assets/icons/check-circle.svg` — circular success silhouette
- `assets/icons/x-octagon.svg` — error octagon
- `assets/icons/exclamation-triangle.svg` — warning triangle
- `assets/icons/information-circle.svg` — circled i for information

All assets: 24×24 viewBox, rendered at 16×16px. The external background image preserves both approved semantic ground and white inner glyph. Host `color` cannot recolor it; use inline per-layer token styling for runtime overrides, not a combined alpha mask.
