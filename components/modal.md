# Modal / Dialog — Skillit Kit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Principle
A modal is a **focused task surface** — it interrupts the current flow to demand attention or input. The worker must act before returning to the main content. The backdrop signals that the main content is temporarily inaccessible.

## Anatomy
1. **Backdrop** — full viewport overlay, `--color-foreground` at 50% opacity
2. **Panel** — Plaster fill, 16px corners, `max-width: 560px` (full-width mobile)
3. **Header** — title (`--text-1.5x`, Semibold) + close button (icon-only, 40×40 hit area)
4. **Body** — scrollable content area
5. **Footer** — button row: secondary (Cancel/Back) left, primary (Confirm/Next) right

## Sizing

| Context | Width | Max height |
|---|---|---|
| Mobile (< 768px) | 100vw (full-width bottom sheet) | 80vh |
| Desktop (≥ 768px) | 560px | 70vh |

**Mobile behavior:** Modal slides up from the bottom as a bottom sheet. Swipe down to close (optional, not required). Full-width; body and header use the padding in the recipes below.

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
  font-size: var(--text-1\.5x); /* 24px */
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

```css
.modal__close:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
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
- **Enter:** backdrop fades in; desktop panel scales from 0.95 to 1; mobile sheet translates from 100% to 0 on the Y axis
- **Exit:** backdrop fades out; desktop panel scales from 1 to 0.95; mobile sheet translates from 0 to 100% on the Y axis
- **Duration:** `--duration-medium` (300ms)
- **Reduced motion:** no animation, instant appear

```css
.modal-enter, .modal-exit-active { opacity: 0; }
.modal-enter-active, .modal-exit { opacity: 1; }

@media (max-width: 767px) {
  .modal-enter, .modal-exit-active { transform: translateY(100%); }
  .modal-enter-active, .modal-exit { transform: translateY(0); }
}
@media (min-width: 768px) {
  .modal-enter, .modal-exit-active {
    transform: translate(-50%, -50%) scale(0.95);
  }
  .modal-enter-active, .modal-exit {
    transform: translate(-50%, -50%) scale(1);
  }
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
