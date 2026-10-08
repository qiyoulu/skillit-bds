# Form Validation — Skillit Kit BDS
**Last updated:** 2026-10-08
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Principle
State is signaled by **icon + message text**, never by changing the input's border or fill. The input itself stays Plaster on Canvas — the validation state lives beside and below it.

## Anatomy
A validated field is a vertical stack:
1. **Label** (above) — Work Sans, `--text-1x`, `--weight-medium`, Iron
2. **Input** (the field itself) — unchanged Plaster surface, no border
3. **Status row** (below) — icon (16px) + message, `--text-0.75x`, 8px gap from input edge

## States

| State | Icon | Icon color | Message color | Message font |
|---|---|---|---|---|
| Error | Octagon | `--color-error` | `--color-error` | `--text-0.75x`, canonical 550 |
| Success | Circular checkmark | `--color-success` | `--color-success` | `--text-0.75x`, canonical 550 |
| Warning | Triangle | `--color-warning` | `--color-foreground` | `--text-0.75x`, canonical 550 |
| Info | Circled i + message | `--color-link` | `--color-foreground` | `--text-0.75x`, canonical 550 |

**Icon color rationale:** Validation status hosts use success green, warning yellow, error red, and info blue, independent of message text. Familiar glyphs support the explicit message; outer shape does not encode an information type. Error and success message colors remain unchanged; warning and info messages stay Iron. Check message contrast separately. Hard Hat on Plaster is 1.8229:1, below 3:1 for an essential warning glyph; a fully explicit redundant label does not turn that ratio into a pass (`rules/accessibility.md`).

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
  color: var(--color-foreground); /* neutral base; semantic variants override below */
}
.validation-icon--success { color: var(--color-success); }
.validation-icon--warning { color: var(--color-warning); }
.validation-icon--error { color: var(--color-error); }
.validation-icon--info { color: var(--color-link); }
.validation-message {
  font-family: var(--font-primary);
  font-size: var(--text-0\.75x);
  font-weight: var(--text-0\.75x-weight);
  line-height: var(--text-0\.75x-leading);
  letter-spacing: var(--text-0\.75x-tracking);
}
.validation-message--error   { color: var(--color-error); }
.validation-message--success { color: var(--color-success); }
.validation-message--warning { color: var(--color-foreground); }
.validation-message--info    { color: var(--color-foreground); }
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

## Status icon variants
Use the supplied icons without adding a second colored circle behind them. Use familiar icons, semantic colors, and clear labels to communicate status. Never rely on shape or color alone. Checks, crosses, and exclamations support familiar conventions; the outer geometry is not an information-type code. The current supplied status exports retain semantic-colored grounds and opaque white glyphs. This background-image recipe preserves both layers; host `color` cannot recolor an external SVG. Inline the artwork with separate canonical-token ground and glyph styling when runtime overrides are required. CSS URLs assume a stylesheet beside `tokens/generated/tokens.css` (`icons.md`).

```css
.validation-badge {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}
.validation-badge::before {
  content: '';
  width: 100%;
  height: 100%;
  background: var(--validation-icon) center / contain no-repeat; /* preserve semantic ground + white glyph */
}
.validation-badge--error {
  color: var(--color-error);
  --validation-icon: url('../../assets/icons/x-octagon.svg');
}
.validation-badge--success {
  color: var(--color-success);
  --validation-icon: url('../../assets/icons/check-circle.svg');
}
.validation-badge--warning {
  color: var(--color-warning);
  --validation-icon: url('../../assets/icons/exclamation-triangle.svg');
}
.validation-badge--info {
  color: var(--color-link);
  --validation-icon: url('../../assets/icons/information-circle.svg');
}
```

Info uses supplied `information-circle.svg` with explicit message text; `question-mark-circle.svg` is reserved for help. Never refer to nonexistent `validation/` asset directories.

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
      <!-- CSS background image supplies x-octagon.svg -->
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
      <!-- CSS background image supplies check-circle.svg -->
    </span>
    <span class="validation-message validation-message--success">Looks good</span>
  </div>
</div>
```

## Icon assets
- `assets/icons/x-octagon.svg` — error octagon
- `assets/icons/check-circle.svg` — circular success silhouette
- `assets/icons/exclamation-triangle.svg` — warning triangle
- `assets/icons/information-circle.svg` — circled i for informational messages

All assets have a 24×24 viewBox, rendered at 16×16px. These status exports have opaque white glyph layers on semantic-colored grounds. External background images preserve them; combined alpha masks would flatten them. Runtime recoloring requires inline per-layer canonical-token styling.
