# Buttons — Skillit Kit BDS
**Last updated:** 2026-10-19
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).
- **Marketing hit area:** the visible pill keeps its tier height (Text-1x is 38.4px: 8px padding plus a 22.4px line). Where that is under 44px, extend the hit area invisibly to 44px (a pseudo-element, 3px above and below at Text-1x). Never grow the pill to meet it. The Text-1.5x primary is 55px and needs no extension.

## Primary button
The dominant CTA. Keep one dominant CTA per section; supporting controls should not compete with it. Orange may repeat across functional primary actions, selection controls, and focus: there is no one-orange-element limit. Traffic Cone background, Iron text (Canvas on Cone is banned — 2.70:1, see `rules/accessibility.md`).
```css
.btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone #EF6F1A */
  color: var(--color-foreground);                   /* Iron text #232F36 — 4.54:1 AA */
  font-family: var(--font-primary);
  font-size: var(--text-1x);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--padding-1x);             /* canonical pair for Text-1x */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-primary:hover { background-color: var(--color-primary-hover); }
.btn-destructive:hover { background-color: var(--color-error-hover); }
.btn-primary:focus-visible, .btn-secondary:focus-visible, .btn-destructive:focus-visible {
   outline: 2px solid var(--color-primary);   /* Traffic Cone focus; Canvas contrast exception — see accessibility.md */
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
  padding: var(--padding-1x);             /* canonical pair for Text-1x */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-secondary:hover { background-color: var(--color-surface-hover); }
```

**Inverted (on Plaster/White surfaces):**
When the secondary button sits on a Plaster surface, it inverts to Canvas fill for contrast. Add `.surface-plaster` to every white surface, including surfaces with an inline background style. Never infer a theme from substring matching of inline CSS; the normalized class applies to both default and hover states.
```css
.surface-plaster .btn-secondary,
.section-theme-light .btn-secondary {
  background-color: var(--color-background);   /* Canvas */
  color: var(--color-foreground);              /* Iron text #232F36 */
}
.surface-plaster .btn-secondary:hover,
.section-theme-light .btn-secondary:hover {
  background-color: var(--color-background-hover);
}
```

## Button hover
Filled buttons use their matching per-color hover token. Hover states use **`background-color`** swaps, not opacity fades — the old `opacity: 0.9` approach is retired across all button classes.
- Primary → `var(--color-primary-hover)`
- Secondary → `var(--color-surface-hover)`; on Plaster → `var(--color-background-hover)`
- Destructive → `var(--color-error-hover)`

All hover tokens use `color-mix(in oklab, var(--color-base), black 10%)` with the corresponding base token. They are expressions, not fixed hover hex values.

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

**Alignment:**
- **All CTA buttons are left-aligned.** Industry email guides show a center-default for CTAs, but Skillit voice is left-aligned: it keeps the button inline with the column of copy it sits next to and reads as the natural next step in the scan path, not a separate block. Use `align="left"` on the wrapping `<td>` and the inner `<table>`. The exception is hero sections or full-width templates where the column is full width — there, left-align to the column's start (which is the same rule, never `align="center"`).

**Arrow suffix:**
- **No arrow on buttons.** Button labels carry their own affordance through shape (pill), color (Cone), and weight (size + bold). The arrow is reserved for inline body links where the underlined text is a complete standalone sentence ("Read his article on LinkedIn →", "Reply to this newsletter →") — and only there. Industry convention drops arrows on buttons; Skillit voice keeps arrows only on standalone-sentence body links.

## Destructive button
For irreversible actions only. Toolbox background.
```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-background);
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--weight-semibold);
  padding: var(--padding-1x);             /* canonical pair for Text-1x */
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
- **Action icons belong at the end of the label.** Leading radio and checkbox selection indicators are the explicit chip exception. A leading decorative status icon in a non-activatable row is metadata, not an action icon.
- **Edge-to-edge icon placement (auto gap) does not mean the icon floats freely.** On a non-hugging button, the icon sits at the right edge of the button and the label sits at the left edge. The space between them is whatever the button's padding and content width produce — do not add an explicit gap there. This is the normal case for buttons that live inside a layout and have room to breathe.
- **Hugging buttons use a fixed 4px gap so the pairing reads as one unit.** When the button is only as wide as its content, the icon and label are immediately adjacent — 4px is the brand gap for tight icon-to-text pairings. Anything wider (8px, 16px) makes the button look padded and defeats the hug. Anything tighter makes the pair harder to parse.
- **The 4px gap applies between label and icon only.** It does not replace the button's tactile padding. A hugging button still has its padding token around the outside of the label+icon pair — the 4px sits inside that padding, between the two pieces.
- **Do not mix the two cases in the same button.** A button is either hugging or it is not. If you find yourself wanting the icon at the right edge *and* a 4px gap to the label on the same button, pick one — usually the non-hugging case. A button that is full-width in a layout but also has a forced 4px gap to a right-edge icon looks like a bug.
- **Icon-only buttons are neither case.** An icon-only button (no label) has no gap to manage — the icon fills the button and the touch target is the button size. The back and forward sticky bar arrows are icon-only buttons; their spec lives in `navigation.md`.

## Radio chip (single-select)

For mutually exclusive choices (trade picker, region picker, language picker when treated as "set language to one"). The chip pill stays Plaster in both states — only the leading 1em circle indicator changes from empty (Traffic Cone outline) to filled (Traffic Cone solid dot). Selection is communicated by the indicator fill, not by changing the pill background. This keeps selected chips visually light and prevents them from competing with primary CTAs.

**Unselected:**
```css
.chip--radio {
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--text-1x-weight);
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  cursor: pointer;
  background-color: var(--color-surface);          /* Plaster — stays white */
  color: var(--color-foreground);                  /* Iron text */
  border: none;
  border-radius: var(--radius-pill);
  padding: var(--padding-1x);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);                             /* 8px indicator-to-label */
}
.chip--radio .chip__indicator {
  width: 1em;
  height: 1em;
  border-radius: 50%;                              /* Circle */
  border: 1.5px solid var(--color-primary);        /* Traffic Cone outline */
  flex-shrink: 0;
}
```

**Selected:**
```css
.chip--radio[aria-checked="true"] {
  /* pill stays Plaster — only indicator changes */
}
.chip--radio[aria-checked="true"] .chip__indicator {
  background-color: var(--color-primary);          /* Traffic Cone filled dot */
  border: none;
}
```

**Hover:** `background-color: var(--color-surface-hover)`. Indicator unchanged on hover.

**Why filled circle and not checkmark:** A checkmark inside a circle reads as neither checkbox nor radio — it's a hybrid that confuses the semantic. Single-select uses filled circle to match the radio button mental model (pick one of N); multi-select uses checkmark to match the checkbox mental model (toggle on/off).

**Why Traffic Cone:** Radio chips are interactive selection controls. Orange marks selection within the small circle while the pill stays Plaster; this functional indicator does not create another dominant CTA. Semantic outcome icons use success green, warning yellow, error red, or info blue; neutral utility icons and progress stay Iron.

**ARIA:** `role="radio"` + `aria-checked="true|false"` within a named `radiogroup`. Use a native radio or implement roving tabindex and arrow-key movement/selection; Space selects the focused option. Only one chip can be selected at a time.

---

## Checkbox chip (multi-select)

For additive filters (search facets, certification toggles, per-diem flags). The chip pill stays Plaster in both states — only the leading 1em square indicator changes from empty (Traffic Cone outline) to filled (Traffic Cone with checkmark icon). The square geometry signals "checkbox" to sighted users, distinguishing multi-select chips from radio chips on the same screen.

**Unselected:**
```css
.chip--check {
  font-family: var(--font-primary);
  font-size: var(--text-1x);
  font-weight: var(--text-1x-weight);
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  cursor: pointer;
  background-color: var(--color-surface);          /* Plaster — stays white */
  color: var(--color-foreground);                  /* Iron text */
  border: none;
  border-radius: var(--radius-pill);
  padding: var(--padding-1x);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.chip--check .chip__indicator {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  border-radius: 0;                                /* Square — 0px corners */
  border: 1.5px solid var(--color-primary);        /* Traffic Cone outline */
  flex-shrink: 0;
}
```

**Selected:**
The standalone `check.svg` is a glyph, unlike the circular status `check-circle.svg`. Mask only the inner glyph, never the square. Paint the selected glyph Iron (`--color-foreground`) on Orange (4.5443:1); keep the pill Plaster and its text Iron. Orange indicator outlines on Plaster narrowly meet 3:1 (3.0177:1); Orange against Canvas is 2.6958:1 and fails 3:1. URLs assume a component stylesheet beside `tokens/generated/tokens.css` (see `icons.md`).
```css
.chip--check[aria-checked="true"] .chip__indicator {
  background-color: var(--color-primary);          /* persistent Traffic Cone square */
  border-color: var(--color-primary);
}
.chip--check .chip__indicator::after {
  content: '';
  width: 0.75em;
  height: 0.75em;
  background-color: var(--color-foreground); /* Iron glyph on Orange: 4.5443:1 */
  -webkit-mask: url('../../assets/icons/check.svg') center / contain no-repeat;
  mask: url('../../assets/icons/check.svg') center / contain no-repeat;
  visibility: hidden;
}
.chip--check[aria-checked="true"] .chip__indicator::after { visibility: visible; }
.chip--check:hover, .chip--radio:hover { background-color: var(--color-surface-hover); }
.chip--check:focus-visible, .chip--radio:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

**Hover:** `background-color: var(--color-surface-hover)`. Indicator unchanged on hover.

**Why square and not circle:** Square is the established checkbox geometry. Using a circle here would create the same hybrid-confusion problem as putting a check in a circle for radio chips. Square says "checkbox" instantly.

**Why Traffic Cone:** Checkbox chips are interactive selection controls, like radio chips and form checkboxes. Orange marks the persistent square; the inner check glyph and `aria-checked` also communicate selection. Semantic outcome icons use success green, warning yellow, error red, or info blue; neutral utility icons and progress stay Iron.

**ARIA:** `role="checkbox"` + `aria-checked="true|false"`. Use a real button for multi-select groups where zero, one, or many chips can be selected. Native button activation supports Space and Enter; update `aria-checked` on every activation.

```html
<button type="button" class="chip--check" role="checkbox" aria-checked="false">
  <span class="chip__indicator" aria-hidden="true"></span>
  <span>Per diem</span>
</button>
```
```js
document.querySelectorAll('.chip--check[role="checkbox"]').forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.setAttribute('aria-checked', String(chip.getAttribute('aria-checked') !== 'true'));
  });
});
```

---

## Why pill stays Plaster in both states

The previous spec (Plaster → Iron fill invert) made selected chips feel like primary buttons — dark, heavy, visually loud. Radio and checkbox chips are **interactive selection controls**, not primary CTAs. The pill is actionable; its small indicator communicates selection state. Keeping the pill white in both states preserves the chip-as-toggle semantic. The indicator (circle fill or checkmark) carries the state signal without making the chip look like a CTA.

## Distinction from checkboxes (form pattern)

The form checkbox is a 16×16 standalone square box with no surrounding pill. The checkbox chip is a pill with a 1em square indicator embedded as the leading icon. Both use Traffic Cone fill when selected. Different geometry (standalone vs pill-embedded), different role (standalone form input vs inline filter toggle). Don't unify them visually — the form checkbox sits in a form row, the checkbox chip sits in a filter row.

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
