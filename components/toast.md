# Toast / Notification — Skillit Kit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Principle
Toast is a **transient feedback message** — it confirms an action, reports an error, or warns about a consequence. It is not interactive beyond an optional close button and an optional action link. The worker can continue working while a toast is visible.

## Anatomy
A toast is a horizontal row inside a colored pill:
1. **Icon (16px)** — Canvas white on the semantic color background
2. **Message** — single line, Work Sans `--text-1x`, `--weight-medium`
3. **Close button (16×16)** — Canvas `×` icon, icon-only, 40×40 hit area

## Position
- **Mobile (< 768px):** bottom-center, full-width with 16px side margins, stacked above the nav footer
- **Desktop (≥ 768px):** top-right, 360px max-width, 16px from viewport edge

## Stacking
Multiple toasts stack vertically — newest at the bottom (mobile) or top (desktop). Maximum 3 visible; older ones dismiss when the queue exceeds 3.

## Types

| Type | Fill | Text | Icon | Use |
|---|---|---|---|---|
| Success | `--color-success` (Bottle Glass) | Canvas | White checkmark | Action completed successfully |
| Error | `--color-error` (Toolbox) | Canvas | White octagon | Action failed, requires attention |
| Warning | `--color-warning` (Hard Hat) | Iron | White triangle | Consequence warning, not a failure |
| Info | `--color-link` (Painter's Tape) | Canvas | White info-circle | Neutral information, not a result |

**Icon color rationale:** All status icons use Canvas (white) because they sit *inside* a colored badge circle or appear directly against the input row. White provides contrast against any background. The semantic color is carried by the message text, not the icon.

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
```css
.toast {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2); /* 8px */
  padding: var(--space-2) var(--space-4); /* 8px 16px */
  border-radius: var(--radius-pill);
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--weight-medium);
  min-height: var(--touch-target-min); /* 40px */
  animation: toast-in var(--duration-fast) var(--ease-out);
}

.toast--success { background-color: var(--color-success); color: var(--color-background); }
.toast--error   { background-color: var(--color-error);   color: var(--color-background); }
.toast--warning { background-color: var(--color-warning); color: var(--color-foreground); }
.toast--info    { background-color: var(--color-link);    color: var(--color-background); }

.toast__icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: currentColor; /* inherits from .toast text color */
}

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
  color: currentColor;
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
  <svg class="toast__icon" aria-hidden="true"><!-- checkmark --></svg>
  <span class="toast__message">Your profile has been saved</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>

<!-- Error toast -->
<div class="toast toast--error" role="status">
  <svg class="toast__icon" aria-hidden="true"><!-- octagon --></svg>
  <span class="toast__message">Connection failed. Please try again.</span>
  <button class="toast__close" aria-label="Dismiss notification">×</button>
</div>
```

## Icon assets
- `assets/icons/toast/checkmark.svg` — Bottle Glass checkmark, white
- `assets/icons/toast/octagon.svg` — Toolbox octagon, white
- `assets/icons/toast/triangle.svg` — Hard Hat triangle, white
- `assets/icons/toast/info-circle.svg` — Painter's Tape info-circle, white

All icons: 16×16 viewBox, filled with `currentColor`.
