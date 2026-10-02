# Toast / Notification — Skillit Kit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Principle
Toast is a **transient feedback message** — it confirms an action, reports an error, or warns about a consequence. It is not interactive beyond an optional close button and an optional action link. The worker can continue working while a toast is visible.

## Anatomy
A toast is a horizontal row inside a static feedback panel with 16px corners. Its body is not an action:
1. **Icon (16px)** — Iron (`--color-foreground`) on every toast type, independent of message foreground
2. **Message** — single line, Work Sans `--text-1x`, `--weight-medium`
3. **Close button (16×16)** — inherits Canvas on success/error or Iron on warning/info, icon-only, 40×40 hit area

Success/error/warning fills are semantic feedback exceptions, not layout surfaces or actionable containers. Info stays Plaster with Iron text. The static panel uses 16px corners; optional close/link controls are actions. A toast with no action remains feedback; only its close button/link is actionable.

## Position
- **Mobile (< 768px):** bottom-center, full-width with 16px side margins, stacked above the nav footer
- **Desktop (≥ 768px):** top-right, 360px max-width, 16px from viewport edge

## Stacking
Multiple toasts stack vertically — newest at the bottom (mobile) or top (desktop). Maximum 3 visible; older ones dismiss when the queue exceeds 3.

## Types

| Type | Fill | Text | Icon | Use |
|---|---|---|---|---|
| Success | `--color-success` (Bottle Glass) | Canvas | Iron circular checkmark | Action completed successfully |
| Error | `--color-error` (Toolbox) | Canvas | Iron octagon | Action failed, requires attention |
| Warning | `--color-warning` (Hard Hat) | Iron | Iron triangle | Consequence warning, not a failure |
| Info | `--color-surface` (Plaster) | Iron | Iron help-circle | Neutral information, not a result |

**Icon color rationale:** Every noninteractive toast status icon is Iron, supplied by host CSS; the silhouette and message identify the state. Info uses the supplied help-circle glyph with explicit message text; no circle-i asset is supplied. Existing message colors, close-control colors, and semantic backgrounds are unchanged.

**Unresolved contrast:** Iron on Bottle Glass is 2.0300:1 and Iron on Toolbox is 2.3309:1, both below the 3:1 non-text target. Iron on Hard Hat is 7.5227:1 and on Plaster is 13.7135:1. Success/error toast status icons therefore have a remaining contrast failure; shape and label do not make that a contrast pass. Background or palette changes require a separate decision. Orange focus against Bottle Glass is 2.2385:1, against Toolbox 1.9496:1, and against Hard Hat 1.6554:1; all fail 3:1 where the ring adjoins the colored fill. Verify the actual adjacent surface and do not silently restore Canvas or Iron focus as a fallback.

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
  animation: toast-in var(--duration-fast) var(--ease-out);
}

.toast--success { background-color: var(--color-success); color: var(--color-background); }
.toast--error   { background-color: var(--color-error);   color: var(--color-background); }
.toast--warning { background-color: var(--color-warning); color: var(--color-foreground); }
.toast--info    { background-color: var(--color-surface); color: var(--color-foreground); }

.toast__icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: var(--color-foreground); /* Iron status paint, independent of message */
  background-color: currentColor;
  -webkit-mask: var(--toast-icon) center / contain no-repeat;
  mask: var(--toast-icon) center / contain no-repeat;
}
.toast--success { --toast-icon: url('../../assets/icons/checkmark.svg'); }
.toast--error { --toast-icon: url('../../assets/icons/error.svg'); }
.toast--warning { --toast-icon: url('../../assets/icons/warning.svg'); }
.toast--info { --toast-icon: url('../../assets/icons/help.svg'); }

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
  border-radius: var(--radius-pill);
}
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
```

## Icon assets
- `assets/icons/checkmark.svg` — circular success silhouette
- `assets/icons/error.svg` — error octagon
- `assets/icons/warning.svg` — warning triangle
- `assets/icons/help.svg` — informational help circle

All assets: 24×24 viewBox, rendered at 16×16px. The mask is painted by the icon host’s explicit Iron color, not an external SVG’s inherited `currentColor`.
