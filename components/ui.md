# UI Components — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules before you use this file
- All components use tokens from `tokens/color.md`, `tokens/typography.md`, and `tokens/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons and interactive cards use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid foreground hover, 2px offset).
- Touch targets minimum 44px in both dimensions (app).
---
## Buttons
### Primary button
The main CTA. One per section maximum. Traffic Cone background, Iron text (Canvas on Cone is banned — 2.83:1, see `rules/accessibility.md`).
```css
.btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone #EF6F1A */
  color: var(--color-foreground);                   /* Iron text #232F36 — 4.54:1 AA */
  font-family: var(--font-primary);
  font-size: var(--text-ui);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--space-3) var(--space-8);  /* 12px 32px — tactile */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
/* Hover for ALL filled buttons (any color: Cone, Toolbox, Hard Hat, Bottle Glass, Painter's Tape):
   filter: brightness(0.92) — darkens the button without fading, one treatment, no per-color hover hexes. */
.btn-primary:hover,
.btn-destructive:hover {
  filter: brightness(0.92);
}
.btn-primary:focus-visible {
   outline: 2px solid var(--color-foreground-hover);   /* Iron hover ring — neutral */
  outline-offset: 2px;
}
```
### Button hover

Filled buttons use `filter: brightness(0.92)` on hover — darkens the button without fading it toward the background, and stays within the single-color-per-button rule. No secondary button class exists in the current system.

### CTA Button (inverted)
For primary actions inside the Iron `surface-inverted` blocks. Iron text on Traffic Cone, same as the standard primary button — consistent across all surfaces.
```css
.surface-inverted .btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone */
  color: var(--color-foreground);                   /* Iron text */
}
```
**Label rules:**
- Sentence-case imperative. “Join” / “Apply” / “See the network.” Never “Click here” or “Submit form.”
- **Strict Consistency:** All buttons that point to the exact same destination page should use the exact same label across the entire platform. If the primary account creation CTA is "Join", do not alternate it with "Get started", "Create your profile", or "Sign up" elsewhere on the page. Pick one label per destination and lock it.

### Destructive button
For irreversible actions only. Toolbox background.
```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-background);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  font-weight: var(--weight-semibold);
  padding: var(--space-3) var(--space-8);  /* 12px 32px — tactile */
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
}
```
---
## Navigation
The primary navigation uses the boot tread pattern rendered in Plaster (`#FFFFFF`) to act as a structural, tactile anchor at the top of the interface.
On desktop, the full "Skillit" lockup is visible. When the viewport scales down, the lockup hides and is replaced by the 24px `mark` icon, while the navigation items collapse into a full-width dropdown menu.
```css
.nav {
  background-color: var(--color-background);        /* Canvas */
  color: var(--color-surface);              /* currentColor for pattern.svg — Plaster tread */
  background-image: url('../assets/logo/pattern.svg'); /* Plaster pattern */
  background-repeat: repeat-x;              /* Horizontal only */
  background-size: auto 100%;               /* Scale to fit nav height */
  border-bottom: none;                      /* No borders */
}
.nav-inner {
   max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--space-128);             /* 128px side margins aligning with main content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo img { height: var(--logo-mark-min); }  /* 21px — never below this */
.logo-mark { display: none; width: 24px; height: 24px; }
.nav-right {
  display: flex;
  align-items: center;
  gap: var(--space-12);               /* 48px — nav right cluster */
}
.nav-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-8);
  position: relative;
}
.nav-links {
  display: flex;
  gap: var(--space-8);               /* 32px — nav links */
  align-items: center;
}
.mobile-dropdown {
  display: none;
  flex-direction: column;
  gap: var(--space-8);               /* 32px — mobile dropdown links */
  padding: var(--space-16) var(--space-128);
   border-top: 1px solid var(--color-foreground);
}
.mobile-dropdown .nav-link { font-size: clamp(24px, 3vw, 32px); font-weight: 500; }
.nav-link {
  font-family: var(--font-primary);
  font-size: var(--text-ui);             /* 1rem / 16px */
  font-weight: var(--weight-medium);       /* 500 */
  color: var(--color-foreground);                  /* Iron */
  text-decoration: none;
}
.nav-link:hover {
  color: var(--color-link);                /* Painter's Tape — link color, 4.6:1 passes AA at 16px */
  text-decoration: underline;
}
.nav-link[aria-current="page"] {
  color: var(--color-primary);             /* Traffic Cone — active state, the accent's role */
}
/* Responsive Nav */
@media (max-width: 1024px) {
  .nav-links, .nav-cta { display: none; }
  .nav-menu-btn { display: block; }
  .logo-desktop { display: none; }
  .logo-mark { display: block; }
}
.mobile-dropdown.open { display: flex; }
```
**Approved nav tabs:** How It Works · Our Network · Jobs · About Us · Resources
**Right side:** Primary button (“Join”) — Traffic Cone, tactile padding.
---
## Form inputs
Fields are **Plaster on Canvas** — the surface separates them from the ground, same as cards. A bottom Iron drafting line keeps the type affordance. State is signaled by a status indicator (drawn icon) plus message text, never by changing the border. Colored borders are not a color usage (see `tokens/color.md`: colors = text fill, button bg fill, or icons).
```css
.input {
  background-color: var(--color-surface); /* Plaster — field separated from Canvas ground */
  border: none;
  border-bottom: 2px solid var(--color-foreground); /* Iron — drafting line (neutral, structural) */
  border-radius: 16px;
  color: var(--color-foreground);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  padding: var(--space-3) var(--space-2);  /* 12px 8px — tactile */
  width: 100%;
}
.input:focus {
   outline: 2px solid var(--color-foreground-hover);      /* Iron hover focus ring — visible, neutral */
  outline-offset: 2px;
  border-bottom-color: var(--color-foreground);    /* line stays Iron */
}
.input::placeholder {
   color: var(--color-foreground-hover);
}
```
**Labels:** Above the field, not inside (placeholder is not a label). `--text-1x` size, `--weight-medium`, Iron.
**Error state:** Field unchanged. Error icon (Toolbox, octagon) beside the field + message below in Toolbox, `--text-1x`. Icon + text carry the signal — never a colored border.
**Success state:** Field unchanged. Checkmark icon (Bottle Glass) alongside. No border change.
---
## Badges and status indicators
Status badges are **drawn icons** — the shape carries the state (shape coding in `rules/accessibility.md`), the label carries the text. No colored chips: colors appear only as text fill (info), button bg fill, or icon fill (`tokens/color.md`).
```css
/* Base badge — icon + label, no colored background */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-primary);
  font-size: var(--text-1x);            /* 1rem */
  font-weight: var(--weight-medium);       /* 500 */
  padding: var(--space-1) var(--space-2); /* 4px 8px */
}
/* State color lives in the icon fill; labels stay Iron. */
.badge-success .icon { color: var(--color-success); }  /* Bottle Glass — circle / pill shape */
.badge-warning .icon { color: var(--color-warning); }  /* Hard Hat — triangle / chamfer */
.badge-error   .icon { color: var(--color-error); }    /* Toolbox — octagon */
/* Info — Painter's Tape text, no underline. */
.badge-info {
  color: var(--color-link);                /* Painter's Tape #007CA6 — info, no underline */
  text-decoration: none;                   /* never inherits link underline */
}
```
---
## Cards
Cards use generous padding (tactile). Because borders and drop shadows are banned, cards separate from the Canvas ground purely through the optical contrast of their Plaster (`#FFFFFF`) background and strong typographic layout.
```css
/* Standard structural card */
.card {
  background-color: var(--color-surface);  /* Plaster */
  border: none;                            /* No borders */
  border-radius: 16px;
  padding: var(--space-16);                /* 64px — tactile */
}
/* Cards separate from Canvas ground through Plaster background contrast — no borders. */
.card-interactive {
  cursor: pointer;
}
/* Interactive cards: hover state is a subtle background shift (10% Iron over Plaster). */
.card-interactive:hover {
   background-color: var(--color-surface-hover);
}
/* Active / selected state — inverted Iron surface with Canvas text */
.card-interactive[aria-selected="true"] {
   background-color: var(--color-foreground);
   color: var(--color-background);
}
@media (max-width: 768px) {
  .card { padding: var(--space-8); }        /* 32px — tactile mobile */
}
/* Inverted surface (Dark mode block) */
.surface-inverted {
  background-color: var(--color-foreground);       /* Iron */
  color: var(--color-background);                  /* Canvas */
  border: none;
  border-radius: 16px;
  padding: var(--space-8);                 /* Generous padding for heavy blocks */
}
```
---
## Text links
Links are Painter's Tape, always underlined. Never a fill, never a button-style treatment.
```css
a {
  color: var(--color-link);               /* Painter's Tape #007CA6 */
  text-decoration: underline;
  text-underline-offset: 2px;
}
a:hover {
  text-decoration-thickness: 2px;
}
a:focus-visible {
   outline: 2px solid var(--color-foreground-hover);     /* Iron hover ring — neutral */
  outline-offset: 2px;
  border-radius: 0;
}
```
**On Iron (dark) backgrounds:** Use Canvas underlined text instead of Painter's Tape — Painter's Tape does not pass contrast on Iron.
## Photography & Media
Photography uses multiply only when placed on a light background and intended to integrate with the Canvas ground.
```css
.photo-on-light-background {
  mix-blend-mode: multiply;
  display: block;
  width: 100%;
  height: auto;
}
```
---
## Footer
The footer anchors the bottom of the page using an inverted Iron surface, completing the structural framing of the layout. It uses a flush-left vertical stack for the brand and a multi-column grid for navigation, following the structural simplicity of Anthropic.com.
```css
.footer {
  background-color: var(--color-foreground);       /* Iron */
  color: var(--color-background);                  /* Canvas */
  padding: var(--space-128);
}
.footer-inner {
   max-width: var(--max-width-content);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: var(--space-128);
}
.footer-brand {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}
.footer-copyright {
   color: var(--color-background-hover);
}
.footer-columns {
  display: flex;
  gap: var(--space-128);
}
.footer-col {
  display: flex;
  flex-direction: column;
}
.footer .nav-link {
  color: var(--color-background);                  /* Canvas links */
  display: block;
  margin-bottom: var(--space-8);
}
.footer .nav-link:hover {
  color: var(--color-primary);             /* Traffic Cone hover */
}
```
The logo in the footer should be `lockup.svg` with `color: var(--color-background)` on the container so the `currentColor` fill renders Canvas on the Iron background. On smaller viewports, this hides and is replaced by `mark.svg` the same way.
---
## Metadata and data strings
All timestamps, IDs, distances, file sizes, and numeric data strings use the monospace stack.
```css
.meta {
  font-family: var(--font-mono);
  font-size: var(--text-mono);            /* 0.875rem */
   color: var(--color-foreground-hover);
  letter-spacing: 0.02em;
}
```
This visually separates machine data from human content — a core distinction in the system.
---
## Icons
### Geometry
Icons are drawn on a strict **10×10 sub-grid** (1 block = 2px) inside a **24×24px canvas**. This grid solves consistent centering (the 2px block unit divides the 24px canvas evenly) and enforces the heavy, cast-iron aesthetic.
- **Canvas size:** 24×24px
- **Sub-grid:** 10×10 (1 block = 2px)
- **Style:** Solid fill only. No strokes, no outlines, no line icons.
- **Stroke weight:** N/A — solid fill, not stroked.
- **Corner radius:** 0px — sharp edges on all icon geometry, consistent with the structural container rule.
- **Color:** Always `fill="currentColor"`. Never hardcode a fill color in the SVG.
### Do not
- Do not use stroke-based (outline) icons — they conflict with the solid, material aesthetic.
- Do not round icon corners — 0px is mandatory.
- Do not hardcode fill colors — use `currentColor` so icons inherit their color from CSS.
- Do not draw outside the 10×10 sub-grid — off-grid geometry breaks centering math.
### Status shape signals
Status icons use fixed geometric silhouettes to communicate state without relying on color alone:
| State | Shape |
|---|---|
| Success | Circle |
| Warning | Triangle |
| Error | Octagon |
### Delivery
Icons are delivered as inline SVGs in Rails ViewComponents (`app/components/`) so they inherit `currentColor` dynamically via CSS. For Squarespace, export as standalone SVG files.
### Core icon set (Phase I)
| Icon | Status |
|---|---|
| Checkmark | Complete (`checkmark.svg`) |
| Error | Complete (`error.svg`) |
| Warning | Complete (`warning.svg`) |
| Search | Complete (`search.svg`) |
| Arrow (left, right) | Complete (`arrow-left.svg`, `arrow-right.svg`) |
| Arrow (up, down) | Complete — rotated from `arrow-right.svg` (`arrow-up.svg`, `arrow-down.svg`); Figma exports can replace later |
| Location | Complete (`location.svg`) |
| Clock | Complete (`clock.svg`) |
| User | Complete (`user.svg`) |
| External link | Complete (`external-link.svg`) |
| Plus | Complete via rotated `close.svg` (no dedicated `plus.svg`) |
| Menu (hamburger) | Complete (`menu.svg`) |
| Info | Pending — “i” in a square, to be drawn when needed |
---
## States
Design all states, not just the happy path. A layout that only works for the ideal case isn't finished.
- **Empty:** Plaster surface, Iron message, single illustration or icon. Never a blank void — give the user a reason the state is empty and a path forward.
- **Loading:** skeleton blocks in Plaster, no spinner-only states. There is no spinner icon in the set — if one is ever needed, it must be drawn and added to the inventory; skeletons are the default loading treatment.
- **Error:** icon (octagon, Toolbox) + specific message. See form inputs for field-level states.
- **Disabled:** Iron at 50% (`rgba(35, 47, 54, 0.5)`), no color change — a disabled control must never be confused with an error state.
- **Overflow:** one line of text at any width must never clip. Headings wrap; long worker names truncate with ellipsis at the container edge, never overlap.
- **Progressive disclosure:** the simple view first, advanced options behind a toggle. Never dump every option on screen at once.
