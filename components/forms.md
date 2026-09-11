# Form Inputs — Skillit BDS
**Last updated:** 2026-09-10
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Input fields
Fields are **Plaster on Canvas** — the surface separates them from the ground. State is signaled by a status indicator (drawn icon) plus message text, never by changing the border. Colored borders are not a color usage (see `tokens/docs/color.md`: colors = text fill, button bg fill, or icons). Corner radius is `0` on input fields — inputs align flush with cards and content grids; rounded corners are reserved for cards (16px) and actionable elements (pill) per the shape-coding rule. No drafting line — inputs separate purely through their Plaster surface against the Canvas ground.
```css
.input {
  background-color: var(--color-surface); /* Plaster — field separated from Canvas ground */
  border: none;
  border-radius: 0;
  color: var(--color-foreground);
  font-family: var(--font-primary);
  font-size: var(--text-1x);              /* 16px */
  font-weight: var(--weight-regular);       /* 400 — same as body */
  padding: var(--space-3) var(--space-2);  /* 12px 8px — tactile */
  width: 100%;
}
.input-wide { width: 100%; } /* opt-in for textareas / long-form — same as default, kept for explicitness */
.input:focus {
   outline: 2px solid var(--color-primary);      /* Traffic Cone focus ring */
  outline-offset: 2px;
}
.input::placeholder {
   color: var(--color-foreground-hover);
}
```
**Labels:** Above the field, not inside (placeholder is not a label). `--text-1x` size, `--weight-medium`, Iron.

**Required fields.** Required inputs display an asterisk (`*`) beside the label in Traffic Cone (`--color-primary`). The input carries the HTML `required` attribute for native form validation. No visual border change — the asterisk is the signal.

**Placeholder vs. default value.** Numeric inputs (pay, distance, years) display a placeholder (e.g., `-` or `$0`) until the worker types a value. Never pre-fill with `0` as a real value — it confuses "unfilled" with "zero."

**Stacked forms on desktop.** Inputs fill their container — a card or a column in the 12-col grid. The container carries the max-width constraint (e.g., `--max-width-content` or the column span), so the input doesn't stretch to the viewport edge. On mobile, the container is narrow and the input reads as full-width. On desktop, the container caps the input at a readable width.

**Bounded numeric inputs.** Inputs that represent bounded ranges should use the HTML `min`/`max` attributes to enforce bounds. Example: commute distance input uses `min="0" max="100"` (miles). The worker cannot enter a value outside the range — native validation handles it without custom error states.

## Icon placement beside fields
When an input field carries an icon — a status indicator, a trailing action, a descriptor — the icon sits on the right side of the field. Text and label stay on the left. The gap between the field and the icon depends on whether the pair hugs.

**Two cases, same rule as buttons:**

| Case | When | Icon position | Gap |
|---|---|---|---|
| Does not hug | The field is part of a laid-out form with room around it — standard form rows, dedicated field blocks | Icon at the far right of the field's row, label and input on the left | Auto — let the layout spread them. The icon sits at the end of the row. |
| Hugs | The field is inline with its action or status — search fields with a trailing search icon, inline validation status, entries inside a denser row | Icon immediately after the field, on the right | 4px fixed — a single 4px gap between the field's visible edge and the icon. |

- **Icon on the right, label on the left.** Same direction as buttons. A leading icon on the left of a field is a different pattern (a prefix or a decorative status mark) and is not covered here — when it appears, it is not paired with the field as an action, and the gap rule does not apply.
- **Trailing action icons (search, clear, open calendar) are hugging by default.** A search field with a search icon on the right is the most common case — the icon is part of the field's interaction surface and the pair is exactly as wide as the field content. Use the 4px gap. The clear/x icon on a filled field is the same case.
- **Status icons beside a field (error octagon, success checkmark) sit in the field's row, on the right, and do not touch the field.** They are a separate element from the input — they live in the row, after the field, with the same gap the row's layout produces. Do not glue a status icon to the field's edge with a 4px gap unless the whole field+status pair is hugging (rare for validation states — usually the field has room).
- **The 4px gap is between field and icon, not between icon and whatever is after it.** When a hugging field+icon pair sits in a row with other content after it, the gap on the far side of the icon is whatever the row's layout produces — do not extend the 4px inward to the next element.
- **Do not put a second icon on the left of the field just because the right has one.** A field with an icon on both sides is a different construct (prefix + suffix) and is not in the current brand vocabulary. If a design calls for it, treat each side separately and do not apply the 4px rule symmetrically.

## Dropdown
A select input with a custom chevron icon. The chevron sits on the right side of the field, 1em in size (matching the input's text size). It uses `currentColor` so it inherits the field's text color (Iron).

```css
.select {
  appearance: none;
  background-color: var(--color-surface);
  border: none;
  border-radius: 0;
  color: var(--color-foreground);
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--weight-regular);
  padding: var(--space-3) var(--space-8);  /* 12px 8px — same as input */
  padding-right: calc(var(--space-8) + 1em);  /* reserve space for chevron */
  max-width: 18ch;
  background-image: url('../assets/icons/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: right var(--space-2) center;  /* 8px from right */
  background-size: 1em;  /* matches text size */
}
.select:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  background-image: url('../assets/icons/chevron-up.svg');
}
```

**Chevron icon:** `assets/icons/chevron-down.svg` and `assets/icons/chevron-up.svg` — simple chevrons, 16×16 viewBox, filled with `currentColor`. The chevron is a **functional state indicator**, not decorative: it shows whether the dropdown is closed (chevron-down, default) or open (chevron-up, when the select is focused). The flip happens automatically via the `:focus` pseudo-class.

**Why 1em:** The chevron scales proportionally with the input's font size. At 16px body text, the chevron is 16px. If the input uses a larger tier (e.g., 1.5× at 24px), the chevron scales to 24px. This keeps visual rhythm across the type scale.

**Accessibility:** The select itself carries the accessible label via its `<label>` association. The chevron is a CSS background image — it is not in the DOM and carries no semantic meaning. Screen readers announce the select's label and value; the chevron is purely visual.

## Focus and a11y
- An input with a trailing action icon (search, clear) — the icon is a separate tappable control, not part of the input's touch target. Its own touch target is 40px minimum. Do not let the input's padding absorb the icon's hit area.
- An input with a status icon (error, success) — the icon is decorative unless it is also a tappable control that opens help or details. If it is not tappable, `aria-hidden="true"` and the status is conveyed by the accompanying text. If it is tappable, it gets its own label and its own 40px touch target.
- The input itself is focusable. The icon beside it is not part of the input's focus ring unless the icon is inside the input's form control (which it should not be — keep it as a sibling, not a background layer on the input).
