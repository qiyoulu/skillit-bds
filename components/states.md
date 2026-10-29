# States — Skillit Kit BDS
**Last updated:** 2026-10-29
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x = 6px / 12px, the same half-size / full-size ratio. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## States
Design all states, not just the happy path. A layout that only works for the ideal case isn't finished.
- **Empty:** Plaster surface, Iron message, single illustration or icon. Never a blank void — give the user a reason the state is empty and a path forward.
- **Loading:** skeleton blocks in Plaster, no spinner-only states. There is no spinner icon in the set — if one is ever needed, it must be drawn and added to the inventory; skeletons are the default loading treatment.
- **Error:** icon (octagon, Toolbox red, `--color-error`) + specific message. See form inputs for field-level states.
- **Hover:** every control uses its per-color hover token (`tokens/docs/color.md`), as a `background-color` or stroke swap, never opacity. Buttons, chips, cards: [buttons](./buttons.md), [cards](./cards.md). Inputs and selects: Plaster hover fill ([forms](./forms.md#input-fields)). Checkboxes: Traffic Cone hover stroke and fill ([checkboxes](./checkboxes.md)). Links: `--color-link-hover` plus a 2px underline ([links](./links.md)). Icon-only buttons (menu, modal close, toast close): `--color-surface-hover` circle. Actionable table rows: the hover token of the row's own fill ([tables](./tables.md)). Chart marks: 2px Iron outline, fill unchanged ([data-viz](../rules/data-viz.md)). Disabled controls do not respond.
- **Disabled:** Avoid disabling submit and primary buttons. Keep them enabled and show specific errors when the reader acts. Disable only for an unmet prerequisite or an action in progress. A disabled control uses `aria-disabled="true"` (so it stays focusable) instead of the HTML `disabled` attribute, 50% opacity (`opacity: 0.5`), no color change, and nearby text saying why — it must never be confused with an error state.
- **Overflow:** one line of text at any width must never clip. Headings wrap; long worker names truncate with ellipsis at the container edge, never overlap.
- **Progressive disclosure:** the simple view first, advanced options behind a toggle. Never dump every option on screen at once.
