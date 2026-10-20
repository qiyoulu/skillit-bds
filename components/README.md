# Components — Skillit Kit BDS
**Last updated:** 2026-10-14
---
One line per component. Open the file for the full rules. Every component uses the tokens in `tokens/docs/` and the shared rules in `rules/`.

## Components

- [badges](./badges.md): Status badges: drawn icon plus label for success, warning, error, and info.
- [buttons](./buttons.md): Primary, secondary, and tertiary actions; one dominant CTA per section; pill shape; hug and fill widths.
- [cards](./cards.md): The standard Plaster card on Canvas: 16px corners, no border or shadow, padding tokens.
- [checkboxes](./checkboxes.md): Checkbox, radio, and chip selection controls; Orange selected state.
- [email](./email.md): Email layout rules: table-based HTML, Outlook fallbacks, focus and CTA handling.
- [footer](./footer.md): Page footer on Canvas: flush-left brand stack and link columns.
- [forms](./forms.md): Form inputs: Plaster fields on Canvas, labels, editable-field geometry.
- [icons](./icons.md): The 24px icon grid, the 90-asset inventory, tinting, and the previous-to-current ID map.
- [links](./links.md): Text links: Painter's Tape, always underlined.
- [metadata](./metadata.md): Timestamps, IDs, distances, and data strings in JetBrains Mono.
- [modal](./modal.md): Modal dialogs: a focused task surface that interrupts the flow.
- [navigation](./navigation.md): Primary navigation and mobile bottom bar.
- [progress](./progress.md): Progress bar and step indicators; progress fill stays Iron.
- [quote-cards](./quote-cards.md): Quote cards: Plaster container, locked headshot size, attribution weights.
- [states](./states.md): Empty, loading, error, and overflow states; design every state, not only the happy path.
- [tables](./tables.md): Tables: alternating Canvas and Plaster rows, no divider rules, 16px clipped container.
- [toast](./toast.md): Transient feedback messages: confirm, report, or warn.
- [validation](./validation.md): Form validation: icon plus message, never a border or fill change.

## Shared rules

- [Layout](../rules/layout.md): grid, containers, section types, and the no-layout-lines rule.
- [Data visualization](../rules/data-viz.md): charts, bars, lines, maps, and chart color roles.
- [Iconography](../rules/iconography.md): icon geometry, status icons, and the approved core set.
- [Accessibility](../rules/accessibility.md): contrast, touch targets, focus, and motion.
- [Photography](../rules/photography.md): photographs, product screenshots, and hardware shots.

## Adding a component

Add the file to `components/`, then add one line to the list above. `scripts/test-instructions.py` fails if a component is missing from this index or if a listed file does not exist.
