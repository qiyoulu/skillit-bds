# Tables — Skillit Kit BDS
**Last updated:** 2026-11-05
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- **Rows alternate Canvas and Plaster.** The first row takes the fill opposite the card, then rows alternate. The alternating fill is the only row separator: no divider rules, gridlines, or borders. See the no-layout-lines rule in `rules/layout.md`.
- **A table sits on a card.** The card is a standard static container: `16px` radius (`--radius-sharp`) and `32px` padding (`--space-8`) on all sides. Tables do not sit directly on a page ground.
- **On a Plaster card,** the first row is Canvas. **On a Canvas card,** the first row is Plaster.
- **Rows are square.** Rows have a `0px` radius, including the first and last. The table is not clipped to a rounded edge; only the card rounds.
- **Row height.** At least `--space-12` (48px) for rows that hold Text-1x. Rows holding Text-2x or larger scale with the text: padding of `--space-4` (16px) top and bottom, minimum.
- **Cell padding.** `--space-6` (24px) left and right, so text never touches the row edge.
- **Alignment.** Labels flush left, values flush right. Numbers use `font-variant-numeric: tabular-nums`. See `rules/data-viz.md`.
- **Weights.** Labels at the tier's base weight, values at its bolded weight (Text-1x: 400 and 600). Do not use opacity fades to rank cells.
- **Status in a row.** Pair an icon with a label, never color alone. See `rules/iconography.md`.

## Do not
- Do not draw a rule between rows, under a header row, or around the table.
- Do not use a third fill (a tinted or grey row) to mark a selected row. Use the checkbox or selection pattern in `components/checkboxes.md`.
- Do not hover-tint a row unless the row is actionable. Hover is not a state on touch. An actionable row steps to the hover token of its own fill (below), never to a third color.

**Actionable rows.** A row that opens a record or acts on click takes the hover token of its own fill: Canvas rows `--color-background-hover`, Plaster rows `--color-surface-hover`. The alternation stays readable, no third fill appears, and Iron text holds 9.1419:1 on the Canvas hover and 10.1932:1 on the Plaster hover. The rule applies only where a pointer can hover, and the row needs a real link or button inside it for keyboard and touch. Selection is still the checkbox. Sortable header cells are buttons and take the secondary button hover.

```css
/* Square zebra rows on a Plaster card */
.table-card {
  padding: var(--space-8);              /* 32px */
  border-radius: var(--radius-sharp);   /* 16px */
  background-color: var(--color-surface);
}
.table {
  border-radius: 0;
  border: none;
}
.table__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--space-12);          /* 48px */
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-background);   /* Canvas */
}
.table__row:nth-child(even) {
  background-color: var(--color-surface);      /* Plaster */
}
@media (hover: hover) {
  .table__row--action:hover { background-color: var(--color-background-hover); }
  .table__row--action:nth-child(even):hover { background-color: var(--color-surface-hover); }
}
.table__value {
  font-weight: var(--text-1x-weight-bold);
  font-variant-numeric: tabular-nums;
}
```
