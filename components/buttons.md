# Buttons — Skillit BDS
**Last updated:** 2026-09-09
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (`padding: 0.5em 1em`; matches the 8px/16px spec at 16px button text). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Primary button
The main CTA. One per section maximum. Traffic Cone background, Iron text (Canvas on Cone is banned — 2.83:1, see `rules/accessibility.md`).
```css
.btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone #EF6F1A */
  color: var(--color-foreground);                   /* Iron text #232F36 — 4.54:1 AA */
  font-family: var(--font-primary);
  font-size: var(--text-1x);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: 0.5em 1em;             /* vertical = 0.5x font size, horizontal = 1x */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-primary:hover { background-color: var(--color-primary-hover); }
.btn-destructive:hover { background-color: var(--color-error-hover); }
.btn-primary:focus-visible {
   outline: 2px solid var(--color-primary);   /* Traffic Cone focus ring */
  outline-offset: 2px;
}
```

## Secondary button
Lower-priority actions. Iron text on Plaster fill, no border. Same pill radius and padding as primary.

**Default (on Canvas/Beige surfaces):**
```css
.btn-secondary {
  background-color: var(--color-surface);   /* Plaster #FFFFFF */
  color: var(--color-foreground);              /* Iron text #232F36 */
  font-family: var(--font-primary);
  font-size: var(--text-1x);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: 0.5em 1em;             /* vertical = 0.5x font size, horizontal = 1x */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-secondary:hover { background-color: var(--color-surface-hover); }
```

**Inverted (on Plaster/White surfaces):**
When the secondary button sits on a Plaster surface, it inverts to Canvas fill for contrast.
```css
.surface-plaster .btn-secondary,
.section-theme-light .btn-secondary,
[style*="background-color: rgb(255, 255, 255)"] .btn-secondary,
[style*="background-color: #fff"] .btn-secondary,
[style*="background-color: #ffffff"] .btn-secondary {
  background-color: var(--color-background);   /* Canvas #FAF7F3 */
  color: var(--color-foreground);              /* Iron text #232F36 */
}
.surface-plaster .btn-secondary:hover,
.section-theme-light .btn-secondary:hover {
  background-color: var(--color-background-hover);
}
```

## Button hover
Filled buttons use their matching per-color hover token. Hover states use **`background-color`** swaps, not opacity fades — the old `opacity: 0.9` approach is retired across all button classes.
- Primary → `var(--color-primary-hover)` (`#E06718`)
- Secondary → `var(--color-surface-hover)` (`#EFEDE9`)
- Destructive → `var(--color-error-hover)` (`#BB0F2A`)

## CTA Button (inverted)
For primary actions inside structured blocks. Iron text on Traffic Cone, same as the standard primary button — consistent across all surfaces.
```css
.surface-structured .btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone */
  color: var(--color-foreground);                   /* Iron text */
}
```
**Label rules:**
- Sentence-case imperative. "Join" / "Apply" / "See the network." Never "Click here" or "Submit form."
- **Strict Consistency:** All buttons that point to the exact same destination page should use the exact same label across the entire platform. If the primary account creation CTA is "Join", do not alternate it with "Get started", "Create your profile", or "Sign up" elsewhere on the page. Pick one label per destination and lock it.

## Destructive button
For irreversible actions only. Toolbox background.
```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-background);
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--weight-semibold);
  padding: 0.5em 1em;             /* vertical = 0.5x font size, horizontal = 1x */
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
}
```

## Icon placement
Buttons that carry an icon place the icon on the right side of the label, text on the left. The gap between them depends on whether the button hugs its content.

**Two cases:**

|| Case | When | Icon position | Gap |
||---|---|---|---|---|
|| Does not hug | Button is wider than its content — free-standing buttons in layouts, card actions, toolbar buttons, paginated navigation with a label | Icon at the far right edge of the button, label at the far left | Auto — let the layout spread them. Use `justify-content: space-between` or a flex auto margin on the icon. |
|| Hugs | Button collapses to exactly the width of its content — inline actions, table-row actions, chips, dense list-item actions | Icon immediately after the label, on the right | 4px fixed — a single `--space-1` (4px) between the label and the icon. |

- **Default direction is text-left, icon-right.** Never put the icon on the left of the label for a forward-moving action (next, continue, advance). The icon on the right mirrors the reading direction and the back/forward sticky bar convention.
- **Icon always at the end of the label, not before it.** The only exception is a leading decorative icon that is not part of the action (e.g., a status dot beside a label in a non-activatable row) — that is a metadata pattern, not a button, and is covered elsewhere.
- **Edge-to-edge icon placement (auto gap) does not mean the icon floats freely.** On a non-hugging button, the icon sits at the right edge of the button and the label sits at the left edge. The space between them is whatever the button's padding and content width produce — do not add an explicit gap there. This is the normal case for buttons that live inside a layout and have room to breathe.
- **Hugging buttons use a fixed 4px gap so the pairing reads as one unit.** When the button is only as wide as its content, the icon and label are immediately adjacent — 4px is the brand gap for tight icon-to-text pairings. Anything wider (8px, 16px) makes the button look padded and defeats the hug. Anything tighter makes the pair harder to parse.
- **The 4px gap applies between label and icon only.** It does not replace the button's tactile padding. A hugging button still has its padding token around the outside of the label+icon pair — the 4px sits inside that padding, between the two pieces.
- **Do not mix the two cases in the same button.** A button is either hugging or it is not. If you find yourself wanting the icon at the right edge *and* a 4px gap to the label on the same button, pick one — usually the non-hugging case. A button that is full-width in a layout but also has a forced 4px gap to a right-edge icon looks like a bug.
- **Icon-only buttons are neither case.** An icon-only button (no label) has no gap to manage — the icon fills the button and the touch target is the button size. The back and forward sticky bar arrows are icon-only buttons; their spec lives in `navigation.md`.

## Radio chip (single-select)

For mutually exclusive choices (trade picker, region picker, language picker when treated as "set language to one"). The chip pill stays Plaster in both states — only the leading 1em circle indicator changes from empty (Canvas outline) to filled (Bottle Glass solid dot). Selection is communicated by the indicator fill, not by changing the pill background. This keeps selected chips visually light and prevents them from competing with primary CTAs.

**Unselected:**
```css
.chip--radio {
  background-color: var(--color-surface);          /* Plaster — stays white */
  color: var(--color-foreground);                  /* Iron text */
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.5em 1em;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);                             /* 8px indicator-to-label */
}
.chip--radio .chip__indicator {
  width: 1em;
  height: 1em;
  border-radius: 50%;                              /* Circle */
  border: 1.5px solid var(--color-background);     /* Canvas outline */
  flex-shrink: 0;
}
```

**Selected:**
```css
.chip--radio[aria-checked="true"] {
  /* pill stays Plaster — only indicator changes */
}
.chip--radio[aria-checked="true"] .chip__indicator {
  background-color: var(--color-success);          /* Bottle Glass filled dot */
  border: none;
}
```

**Hover:** `background-color: var(--color-surface-hover)`. Indicator unchanged on hover.

**Why filled circle and not checkmark:** A checkmark inside a circle reads as neither checkbox nor radio — it's a hybrid that confuses the semantic. Single-select uses filled circle to match the radio button mental model (pick one of N); multi-select uses checkmark to match the checkbox mental model (toggle on/off).

**Why Bottle Glass and not Traffic Cone:** Traffic Cone is reserved for primary CTAs. A filled circle in the chip indicator is a status toggle, not a call to action. Bottle Glass signals "selected/active" without competing with the page CTA.

**ARIA:** `role="radio"` + `aria-checked="true|false"`. Use this for single-select groups where only one chip can be selected at a time.

---

## Checkbox chip (multi-select)

For additive filters (search facets, certification toggles, per-diem flags). The chip pill stays Plaster in both states — only the leading 1em square indicator changes from empty (Canvas outline) to filled (Bottle Glass with checkmark icon). The square geometry signals "checkbox" to sighted users, distinguishing multi-select chips from radio chips on the same screen.

**Unselected:**
```css
.chip--check {
  background-color: var(--color-surface);          /* Plaster — stays white */
  color: var(--color-foreground);                  /* Iron text */
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.5em 1em;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.chip--check .chip__indicator {
  width: 1em;
  height: 1em;
  border-radius: 0;                                /* Square — 0px corners */
  border: 1.5px solid var(--color-background);     /* Canvas outline */
  flex-shrink: 0;
}
```

**Selected:**
```css
.chip--check[aria-checked="true"] .chip__indicator {
  background-color: var(--color-success);          /* Bottle Glass */
  border: none;
  -webkit-mask: url('../assets/icons/checkmark.svg') no-repeat center;
  mask: url('../assets/icons/checkmark.svg') no-repeat center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
```

**Hover:** `background-color: var(--color-surface-hover)`. Indicator unchanged on hover.

**Why square and not circle:** Square is the established checkbox geometry. Using a circle here would create the same hybrid-confusion problem as putting a check in a circle for radio chips. Square says "checkbox" instantly.

**Why Bottle Glass and not Traffic Cone:** Same reasoning as radio chip — Bottle Glass is the success/status color, Traffic Cone is reserved for primary CTAs.

**ARIA:** `role="checkbox"` + `aria-checked="true|false"`. Use this for multi-select groups where zero, one, or many chips can be selected.

---

## Why pill stays Plaster in both states

The previous spec (Plaster → Iron fill invert) made selected chips feel like primary buttons — dark, heavy, visually loud. Radio and checkbox chips are **status toggles**, not calls to action. Keeping the pill white in both states preserves the chip-as-toggle semantic. The indicator (circle fill or checkmark) carries the state signal without making the chip look like a CTA.

## Distinction from checkboxes (form pattern)

The form checkbox is a 16×16 standalone square box with no surrounding pill. The checkbox chip is a pill with a 1em square indicator embedded as the leading icon. The form checkbox uses Traffic Cone fill when selected; the checkbox chip uses Bottle Glass. Different geometry (standalone vs pill-embedded), different selection color (Traffic Cone vs Bottle Glass), different role (standalone form input vs inline filter toggle). Don't unify them visually — the form checkbox sits in a form row, the checkbox chip sits in a filter row.

**CSS shape.** Non-hugging buttons with icon:
```css
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;   /* icon to far right, label to far left */
  gap: 0;                            /* no explicit gap — let space-between spread them */
}
.btn-with-icon .label { flex: 0 0 auto; }
.btn-with-icon .icon  { flex: 0 0 auto; }
```

Hugging buttons with icon:
```css
.btn-hug-with-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);   /* 4px between label and icon */
}
.btn-hug-with-icon .label { flex: 0 0 auto; }
.btn-hug-with-icon .icon  { flex: 0 0 auto; }
```

**Accessible label.** When a button's visible text is only a label and the icon is decorative (directional cue, not a second action), the icon gets `aria-hidden="true"` and the button's accessible name comes from the label. When the icon carries meaning the label does not (an arrow meaning "advance", a check meaning "confirm"), keep both but make sure the accessible name still reads as a single coherent action — do not let the icon inject a second name.
