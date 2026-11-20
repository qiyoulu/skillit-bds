# Checkboxes — Skillit Kit BDS
**Last updated:** 2026-11-19
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40×40px (app). The checkbox box is 20×20 in a 24×24 slot, but the label + checkbox pair forms the touch target.

## Checkbox SVGs (canonical)

The box is drawn with the exported SVGs, not rebuilt in CSS. Figma and code use the same files, so they cannot drift:

| State | File |
|---|---|
| Unchecked | `checkbox-unchecked.svg` |
| Checked | `checkbox-checked.svg` |
| Indeterminate (partly selected) | `checkbox-bar.svg` |

All three keep their source paint (Traffic Cone box, Iron glyph) and do not respond to the host's `color`. Engineers do not edit SVG paint or redraw the glyphs. Use them as background images or `<img>`, never as a single CSS mask (masks flatten both colors). Keep the real native checkbox for interaction and submission; an SVG alone is not a checkbox control.

## Geometry
- **Box size:** the SVGs are 24×24px (`--space-6`); the drawn box inside is 20×20 with a 2px inset. Render the SVG at 24px, never scaled, so the 2px stroke stays crisp and the slot lines up with 24px icons.
- **Border radius:** 0px — checkboxes are square boxes. The corners are flush (0px) because the box is a status indicator, not a container. The shape-coding rule (16px = static, pill = actionable) applies to containers and buttons, not to small status marks.
- **Touch target:** the full row (checkbox + label) is the touch target, not the 20×20 box alone

## States
- **Unchecked** (`checkbox-unchecked.svg`): 2px Traffic Cone (`--color-primary`) frame, transparent inside so the row surface shows. Orange border — the selection-control color, matching the focus ring.
- **Checked** (`checkbox-checked.svg`): Traffic Cone fill, Iron (`--color-foreground`) check inside. The fill invert + checkmark is the universal "selected" pattern.
- **Indeterminate (partly selected)** (`checkbox-bar.svg`): Traffic Cone fill, Iron horizontal bar inside. Used only by a parent checkbox, such as a table header, when some but not all of its rows are checked. Clicking it checks every row; clicking again clears them. Set it with the input's `indeterminate` property (script only, no HTML attribute); it exposes `aria-checked="mixed"` natively.

- **Hover:** the whole row is the target, so hovering the label hovers the box. Because the box is a fixed-paint SVG, it does not change color on hover; the row's pointer cursor is the hover cue. Disabled rows do not respond. The label does not change color.

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
  width: var(--space-6);
  height: var(--space-6);
  flex-shrink: 0;
  background: url('../../assets/icons/checkbox-unchecked.svg') center / 100% no-repeat;
}
.checkbox:checked + .checkbox-box {
  background-image: url('../../assets/icons/checkbox-checked.svg');
}
.checkbox:indeterminate + .checkbox-box {
  background-image: url('../../assets/icons/checkbox-bar.svg');
}
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
    width: var(--space-6);
    height: var(--space-6);
    clip-path: none;
    overflow: visible;
  }
  .checkbox-box { display: none; }
}
```

## Why 2px
The box is 20px. A 1.5px stroke falls on a half pixel at 1x, so browsers blur it; 2px renders crisp at every pixel density and matches the exported SVGs' 2px frame. Material uses a 2px frame on its 18px box.

## Why 20px
The box matches the exported 24px SVGs (2px inset), so designers can place the SVG at 24px and engineers build the same box. 20px sits between Material (18px) and a full icon (24px): visible on a phone without overpowering 16px row text. The whole row stays the touch target.

## Why orange (Traffic Cone) instead of Iron
Checkboxes and the focus ring share one color on purpose, as Apple's system accent does. The checkbox selection is a functional state — it signals "this item is selected/confirmed." The industry standard is the accent color (Traffic Cone) for the selected state. The concern about competing with CTAs (raised for the 93-checkbox Additional Info screen) applies to **multi-select buttons**, not checkboxes. A checkbox with Traffic Cone fill is a small, contained accent usage — not a competing CTA. The worker reads it as a status signal inside a form row, not as a primary action.

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
