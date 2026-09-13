# Modal / Dialog — Skillit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Principle
A modal is a **focused task surface** — it interrupts the current flow to demand attention or input. The worker must act before returning to the main content. The backdrop signals that the main content is temporarily inaccessible.

## Anatomy
1. **Backdrop** — full viewport overlay, `--color-foreground` at 50% opacity
2. **Panel** — Plaster fill, 16px corners, `max-width: 560px` (90vw mobile)
3. **Header** — title (`--text-1.5x`, Semibold) + close button (icon-only, 40×40 hit area)
4. **Body** — scrollable content area
5. **Footer** — button row: secondary (Cancel/Back) left, primary (Confirm/Next) right

## Sizing

| Context | Width | Max height |
|---|---|---|
| Mobile (< 768px) | 90vw (full-width bottom sheet) | 80vh |
| Desktop (≥ 768px) | 560px | 70vh |

**Mobile behavior:** Modal slides up from the bottom as a bottom sheet. Swipe down to close (optional, not required). Full-width with 16px side padding.

## Backdrop
```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay); /* 30 */
  background-color: var(--color-foreground);
  opacity: 0.5;
  transition: opacity var(--duration-fast) var(--ease-out);
}
```

## Panel
```css
.modal {
  position: fixed;
  z-index: var(--z-modal); /* 40 */
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface); /* Plaster */
  border-radius: var(--radius-sharp); /* 16px */
  box-shadow: none; /* flat system — no shadow */
  max-height: 70vh;
  overflow: hidden;
  transition: transform var(--duration-medium) var(--ease-out),
              opacity var(--duration-medium) var(--ease-out);
}

@media (max-width: 767px) {
  .modal {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 80vh;
    border-radius: var(--radius-sharp) var(--radius-sharp) 0 0; /* 16px top only */
  }
}

@media (min-width: 768px) {
  .modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
  }
}
```

## Header
```css
.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-8); /* 32px */
  padding-bottom: 0;
  flex: 0 0 auto;
}

.modal__title {
  font-family: var(--font-primary);
  font-size: var(--text-1.5x); /* 24px */
  font-weight: var(--weight-semibold); /* 600 */
  color: var(--color-foreground);
}

.modal__close {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground);
  border-radius: var(--radius-pill);
}

.modal__close:hover {
  background-color: var(--color-surface-hover);
}
```

## Body
```css
.modal__body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--space-8); /* 32px */
  color: var(--color-foreground);
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  line-height: 1.6;
}
```

## Footer
```css
.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4); /* 16px */
  padding: var(--space-8); /* 32px */
  padding-top: 0;
  flex: 0 0 auto;
}
```

## Animation
- **Enter:** backdrop fades in, panel scales from 0.95 to 1 and fades in
- **Exit:** backdrop fades out, panel scales from 1 to 0.95 and fades out
- **Duration:** `--duration-medium` (300ms)
- **Reduced motion:** no animation, instant appear

```css
.modal-enter {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}
.modal-enter-active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal-backdrop {
    transition: none;
  }
}
```

## Focus trap
- Focus moves to the modal when it opens
- Tab cycles within the modal (does not escape to the page behind)
- ESC closes the modal
- Clicking the backdrop closes the modal
- Focus returns to the trigger element when the modal closes

## When to use

| Use | Example |
|---|---|
| Confirm a destructive action | "Delete this work history entry?" |
| Collect required input | Add work history, select trade |
| Display detailed information | Job details, employer profile |
| Break a complex flow | Multi-step form within onboarding |

**Do not use for:** simple confirmations (use toast instead), navigation (use a page), or non-blocking information (use a tooltip or inline expansion).

## Accessibility
- The modal has `role="dialog"` and `aria-modal="true"`
- The title is associated via `aria-labelledby`
- The close button has `aria-label="Close dialog"`
- Focus is trapped inside the modal
- ESC closes the modal
- Screen readers announce the modal title when it opens

## Examples
```html
<!-- Modal structure -->
<div class="modal-backdrop" aria-hidden="true"></div>
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal__header">
    <h2 class="modal__title" id="modal-title">Add work history</h2>
    <button class="modal__close" aria-label="Close dialog">×</button>
  </div>
  <div class="modal__body">
    <!-- form content -->
  </div>
  <div class="modal__footer">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

## Z-index
- Backdrop: `--z-overlay` (30)
- Panel: `--z-modal` (40)
