# Form Validation — Skillit BDS
**Last updated:** 2026-09-13
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Principle
State is signaled by **icon + message text**, never by changing the input's border or fill. The input itself stays Plaster on Canvas — the validation state lives beside and below it.

## Anatomy
A validated field is a vertical stack:
1. **Label** (above) — Work Sans, `--text-1x`, `--weight-medium`, Iron
2. **Input** (the field itself) — unchanged Plaster surface, no border
3. **Status row** (below) — icon (16px) + message, `--text-0.75x`, 4px gap from input edge

## States

| State | Icon | Icon color | Message color | Message font |
|---|---|---|---|---|
| Error | Octagon (Toolbox shape) | Canvas | `--color-error` | `--text-0.75x`, Regular |
| Success | Checkmark (Bottle Glass shape) | Canvas | `--color-success` | `--text-0.75x`, Regular |
| Warning | Triangle (Hard Hat shape) | Canvas | `--color-warning` | `--text-0.75x`, Regular |
| Info | Circle-i (Painter's Tape shape) | Canvas | `--color-link` | `--text-0.75x`, Regular |

**Icon color rationale:** All status icons use Canvas (white) because they sit *inside* a colored badge circle or appear directly against the input row. White provides contrast against any background. The semantic color is carried by the message text, not the icon.

## Spacing
- Gap between input bottom and status row: `--space-2` (8px)
- Gap between icon and message text: `--space-2` (8px)
- Icon size: 16×16px

## When to appear
- **On blur:** validate after the worker leaves the field (not while typing)
- **On submit:** validate all fields when the worker taps Next
- **Clear immediately:** once the worker corrects the error, the state clears — no "previously errored" memory

## CSS pattern
```css
.validation-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.validation-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: var(--color-background); /* Canvas */
}
.validation-message {
  font-family: var(--font-primary);
  font-size: var(--text-0.75x);
  font-weight: var(--weight-regular);
}
.validation-message--error   { color: var(--color-error); }
.validation-message--success { color: var(--color-success); }
.validation-message--warning { color: var(--color-warning); }
.validation-message--info    { color: var(--color-link); }
```

## Required fields
Required inputs display an asterisk (`*`) beside the label in Traffic Cone (`--color-primary`). The asterisk is the signal that the field is required — no border change, no fill swap. The input carries the HTML `required` attribute for native form validation.

```css
.label--required::after {
  content: '*';
  color: var(--color-primary);
  margin-left: 2px;
}
```

## Error icon variants
The icons are **monochrome white shapes on a colored circle badge**. The circle carries the semantic color; the icon itself is always Canvas.

| State | Badge fill | Icon |
|---|---|---|
| Error | `--color-error` (Toolbox) | White octagon |
| Success | `--color-success` (Bottle Glass) | White checkmark |
| Warning | `--color-warning` (Hard Hat) | White triangle |
| Info | `--color-link` (Painter's Tape) | White info-circle |

Badge size: 20×20px with 16px icon centered inside. This gives a 2px inner ring of the semantic color around the white icon.

```css
.validation-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.validation-badge--error   { background-color: var(--color-error); }
.validation-badge--success { background-color: var(--color-success); }
.validation-badge--warning { background-color: var(--color-warning); }
.validation-badge--info    { background-color: var(--color-link); }
```

## Accessibility
- The status message is associated with the input via `aria-describedby`
- The icon is `aria-hidden="true"` (decorative — the message carries the meaning)
- On error, `aria-invalid="true"` is set on the input
- Screen readers announce: "Label, [invalid if error], [message text]"

## Examples
```html
<!-- Error state -->
<div class="field">
  <label class="label label--required" for="email">Email</label>
  <input class="input" id="email" type="email" required aria-describedby="email-error" aria-invalid="true" />
  <div class="validation-row" id="email-error">
    <span class="validation-badge validation-badge--error" aria-hidden="true">
      <!-- white octagon SVG -->
    </span>
    <span class="validation-message validation-message--error">Enter a valid email address</span>
  </div>
</div>

<!-- Success state -->
<div class="field">
  <label class="label label--required" for="phone">Phone</label>
  <input class="input" id="phone" type="tel" required aria-describedby="phone-success" />
  <div class="validation-row" id="phone-success">
    <span class="validation-badge validation-badge--success" aria-hidden="true">
      <!-- white checkmark SVG -->
    </span>
    <span class="validation-message validation-message--success">Looks good</span>
  </div>
</div>
```

## Icon assets
- `assets/icons/validation/octagon.svg` — Toolbox octagon, white
- `assets/icons/validation/checkmark.svg` — Bottle Glass checkmark, white
- `assets/icons/validation/triangle.svg` — Hard Hat triangle, white
- `assets/icons/validation/info-circle.svg` — Painter's Tape info-circle, white

All icons: 16×16 viewBox, filled with `currentColor` (inherits Canvas via CSS).
