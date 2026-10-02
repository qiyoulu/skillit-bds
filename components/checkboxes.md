# Checkboxes — Skillit Kit BDS
**Last updated:** 2026-09-10
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40×40px (app). The checkbox itself is 16×16 but the label + checkbox pair forms the touch target.

## Geometry
- **Box size:** 16×16px (`--space-4` × `--space-4`)
- **Border radius:** 0px — checkboxes are 16×16px square boxes. The 16px size aligns with `--space-4`; the corners are flush (0px) because the box is a status indicator, not a container. The shape-coding rule (16px = static, pill = actionable) applies to containers and buttons, not to small status marks.
- **Touch target:** the full row (checkbox + label) is the touch target, not the 16×16 box alone

## States
- **Unchecked:** 16×16, 1.5px Traffic Cone (`--color-primary`) stroke, Plaster (`#FFFFFF`) fill. Orange border on white fill — the industry standard selection signal.
- **Checked:** 16×16, Traffic Cone fill, Iron (`--color-foreground`) checkmark icon centered inside. The fill invert + checkmark is the universal "selected" pattern.

The actual input remains keyboard-focusable and owns `checked`, `disabled`, submission, and the accessible name. Its native visual appearance is replaced by a sibling square; do not put pseudo-elements on the input. CSS URLs below assume a component stylesheet deployed beside `tokens/generated/tokens.css`; see `icons.md` for relocation rules.

```css
.checkbox-row {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min); /* full 40px row is clickable */
  cursor: pointer;
}
.checkbox {
  appearance: none;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
}
.checkbox-box {
  box-sizing: border-box;
  width: var(--space-4);
  height: var(--space-4);
  border-radius: 0;
  background-color: var(--color-surface);
  border: 1.5px solid var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.checkbox:checked + .checkbox-box {
  background-color: var(--color-primary);
}
.checkbox-box::after {
  content: '';
  width: 12px;
  height: 12px;
  background-color: var(--color-foreground); /* Iron glyph on Orange: 4.5443:1 */
  -webkit-mask: url('../../assets/icons/check.svg') center / contain no-repeat;
  mask: url('../../assets/icons/check.svg') center / contain no-repeat;
  visibility: hidden;
}
.checkbox:checked + .checkbox-box::after { visibility: visible; }
.checkbox-row:has(.checkbox:focus-visible) {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.checkbox-row:has(.checkbox:disabled) { opacity: 0.5; cursor: default; }
.checkbox-label {
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--text-1x-weight);
  color: var(--color-foreground);
}
@media (forced-colors: active) {
  .checkbox {
    appearance: auto;
    position: static;
    width: var(--space-4);
    height: var(--space-4);
    clip-path: none;
    overflow: visible;
  }
  .checkbox-box { display: none; }
}
```

## Why orange (Traffic Cone) instead of Iron
The checkbox selection is a functional state — it signals "this item is selected/confirmed." The industry standard is the accent color (Traffic Cone) for the selected state. The concern about competing with CTAs (raised for the 93-checkbox Additional Info screen) applies to **multi-select buttons**, not checkboxes. A 16×16 checkbox with Traffic Cone fill is a small, contained accent usage — not a competing CTA. The worker reads it as a status signal inside a form row, not as a primary action.

Multi-select chips keep Plaster pills and use Traffic Cone square indicators when selected (`buttons.md`). Form checkboxes keep Traffic Cone for the selected state. This is the functional selection-indicator exception, not a general permission to use Traffic Cone for status icons. The two patterns are geometrically distinct (square box with icon vs. pill with text) and semantically distinct (form input vs. filter selection).

## Label
- Checkbox labels are Work Sans, `--text-1x`, Iron, to the right of the checkbox.
- The label and checkbox are horizontally aligned (flex, center-aligned).
- Gap between checkbox and label: 8px (`--space-2`).

## Error state
The checkbox does not change border color on error. Error state is signaled by a status icon (Toolbox red octagon, `--color-error`) beside the checkbox row + message below, not by changing the checkbox itself.

## Disabled state
Reduce opacity to 0.5 (universal disabled rule, same as buttons).

## Examples
```html
<label class="checkbox-row">
  <input type="checkbox" class="checkbox" name="terms" value="accepted" />
  <span class="checkbox-box" aria-hidden="true"></span>
  <span class="checkbox-label">I agree to the Terms of Service</span>
</label>

<label class="checkbox-row">
  <input type="checkbox" class="checkbox" name="licensed" value="yes" checked />
  <span class="checkbox-box" aria-hidden="true"></span>
  <span class="checkbox-label">State Licensed Electrician</span>
</label>
```
