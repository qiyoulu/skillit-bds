# Checkboxes — Skillit Kit BDS
**Last updated:** 2026-09-10
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40×40px (app). The checkbox itself is 16×16 but the label + checkbox pair forms the touch target.

## Geometry
- **Box size:** 16×16px (`--space-8` × `--space-8`)
- **Border radius:** 0px — checkboxes are 16×16px square boxes. The 16px size aligns with `--space-8`; the corners are flush (0px) because the box is a status indicator, not a container. The shape-coding rule (16px = static, pill = actionable) applies to containers and buttons, not to small status marks.
- **Touch target:** the full row (checkbox + label) is the touch target, not the 16×16 box alone

## States
- **Unchecked:** 16×16, 1.5px Traffic Cone (`--color-primary`) stroke, Plaster (`#FFFFFF`) fill. Orange border on white fill — the industry standard selection signal.
- **Checked:** 16×16, Traffic Cone fill, Canvas (`#FFFFFF`) checkmark icon centered inside. The fill invert + checkmark is the universal "selected" pattern.

```css
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 0;
  background-color: var(--color-surface);              /* Plaster fill */
  border: 1.5px solid var(--color-primary);            /* Traffic Cone border */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.checkbox--checked {
  background-color: var(--color-primary);              /* Traffic Cone fill */
  border: none;
}
.checkbox--checked::after {
  /* Canvas checkmark icon — reference the checkmark SVG asset */
  content: '';
  width: 12px;
  height: 12px;
  background-color: var(--color-background);           /* Canvas checkmark */
  -webkit-mask: url('../assets/icons/checkmark.svg') no-repeat center;
  mask: url('../assets/icons/checkmark.svg') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
```

## Why orange (Traffic Cone) instead of Iron
The checkbox selection is a functional state — it signals "this item is selected/confirmed." The industry standard is the accent color (Traffic Cone) for the selected state. The concern about competing with CTAs (raised for the 93-checkbox Additional Info screen) applies to **multi-select buttons**, not checkboxes. A 16×16 checkbox with Traffic Cone fill is a small, contained accent usage — not a competing CTA. The worker reads it as a status signal inside a form row, not as a primary action.

Multi-select buttons use Iron fill (not Traffic Cone) for the selected state. Checkboxes keep Traffic Cone for the selected state. The two patterns are geometrically distinct (square box with icon vs. pill with text) and semantically distinct (status toggle vs. filter selection).

## Label
- Checkbox labels are Work Sans, `--text-1x`, Iron, to the right of the checkbox.
- The label and checkbox are horizontally aligned (flex, center-aligned).
- Gap between checkbox and label: 8px (`--space-2`).

## Error state
The checkbox does not change border color on error. Error state is signaled by a status icon (Toolbox octagon) beside the checkbox row + message below, not by changing the checkbox itself.

## Disabled state
Reduce opacity to 0.5 (universal disabled rule, same as buttons).

## Examples
```html
<label class="checkbox-row">
  <input type="checkbox" class="checkbox" />
  <span class="checkbox-label">I agree to the Terms of Service</span>
</label>

<label class="checkbox-row">
  <input type="checkbox" class="checkbox checkbox--checked" checked />
  <span class="checkbox-label">State Licensed Electrician</span>
</label>
```
