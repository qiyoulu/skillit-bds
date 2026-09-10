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
Outline style for lower-priority actions. Iron text on Plaster fill, 1px Iron border. Same pill radius and padding as primary.

```css
.btn-secondary {
  background-color: var(--color-surface);   /* Plaster #FFFFFF */
  color: var(--color-foreground);              /* Iron text #232F36 */
  font-family: var(--font-primary);
  font-size: var(--text-1x);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: 0.5em 1em;             /* vertical = 0.5x font size, horizontal = 1x */
  border: 1px solid var(--color-foreground);
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-secondary:hover { background-color: var(--color-surface-hover); }
```

## Button hover
Filled buttons use their matching per-color hover token. Secondary uses the surface hover token (Plaster × EFEDE9 = `#EFEDE9`). No opacity fade — the old `opacity: 0.9` approach is retired across all button classes.

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

## Selected (toggled) state
Secondary buttons can carry a selected state — multi-select filters, language pickers, trade selectors, per-diem toggles. A selected secondary button keeps the same Plaster fill, Iron border, and Iron text as an unselected secondary button. The selection is signaled by a green checkmark icon to the right of the label.

**Unselected secondary button:**
```css
.btn-secondary {
  background-color: var(--color-surface);                  /* Plaster */
  border: 1px solid var(--color-foreground);               /* Iron */
  color: var(--color-foreground);                          /* Iron text */
  padding: var(--padding-1x);                              /* or --padding-0.75x for dense */
}
```

**Selected secondary button:**
```css
.btn-secondary[aria-pressed="true"],
.btn-secondary[aria-checked="true"],
.btn-secondary.is-selected {
  /* Same as unselected — no border color change, no fill change */
}
```

**Selected state with checkmark icon:**
```html
<button class="btn-secondary" aria-checked="true">
  <span class="label">English</span>
  <%= inline_svg 'icons/checkmark.svg', class: 'w-6 h-6', aria: { hidden: true } %>
</button>
```
```css
.btn-secondary[aria-checked="true"] .icon {
  margin-left: var(--space-1);  /* 4px gap between label and checkmark */
}
```

The checkmark icon is `assets/icons/checkmark.svg`. It has Bottle Glass (`#33663D`) baked into the path fill — do not change it to `currentColor`. This is a status signal, not a decorative UI icon: the green color pairs with the checkmark shape to say "this is on" without competing with the page's primary CTA. Keeping the fill hardcoded means the icon reads correctly regardless of where it's placed.

Rules for the selected state:
- **The button itself doesn't change.** Same Plaster fill, same Iron border, same Iron text, same padding. The checkmark is the only visual difference.
- **Checkmark goes to the right of the label.** 4px gap (`--space-1`) between label and icon, matching the hugging-button icon rule above.
- **The checkmark is decorative.** It gets `aria-hidden="true"` — the accessible state comes from `aria-pressed` / `aria-checked` on the button, not from the icon.
- **aria-pressed vs aria-checked.** Use `aria-pressed="true"` for toggle buttons that turn a single thing on/off. Use `aria-checked="true"` for multi-select items where several can be selected simultaneously (like language pills). Both get the same visual; the attribute is what changes for screen readers.
- **Disabled selected button:** Same rule as disabled secondary — reduce opacity to 0.5. The checkmark fades with the button.
- **Hover on selected:** `hover:bg-surface-hover` (same as unselected secondary).

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
