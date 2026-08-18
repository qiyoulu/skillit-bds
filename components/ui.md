# UI Components — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules before you use this file
- All components use tokens from `tokens/color.md`, `tokens/typography.md`, and `tokens/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: buttons and interactive cards use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).
---
## Buttons
### Primary button
The main CTA. One per section maximum. Traffic Cone background, Iron text (Canvas on Cone is banned — 2.83:1, see `rules/accessibility.md`).
```css
.btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone #EF6F1A */
  color: var(--color-fg);                   /* Iron text #232F36 — 4.54:1 AA */
  font-family: var(--font-primary);
  font-size: var(--text-ui);              /* 1rem */
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--space-3) var(--space-8);  /* 12px 32px — tactile */
  border: none;
  border-radius: var(--radius-pill);       /* 9999px pill */
  letter-spacing: 0;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: var(--color-primary-hover);  /* Traffic Cone darkened */
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```
### CTA Button (inverted)
For primary actions inside the Iron `surface-inverted` blocks. Iron text on Traffic Cone, same as the standard primary button — consistent across all surfaces.
```css
.surface-inverted .btn-primary {
  background-color: var(--color-primary);   /* Traffic Cone */
  color: var(--color-fg);                   /* Iron text */
}
```
**Label rules:**
- Sentence-case imperative. “Join” / “Apply” / “See the network.” Never “Click here” or “Submit form.”
- **Strict Consistency:** All buttons that point to the exact same destination page should use the exact same label across the entire platform. If the primary account creation CTA is "Join", do not alternate it with "Get started", "Create your profile", or "Sign up" elsewhere on the page. Pick one label per destination and lock it.
### Secondary button
Outlined, Iron stroke, no fill. For secondary actions.
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-fg);                   /* Iron #232F36 */
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  font-weight: var(--weight-semibold);      /* 600 */
  padding: var(--space-3) var(--space-8);  /* 12px 32px — tactile */
  border: 1.5px solid var(--color-fg);
  border-radius: var(--radius-pill);
  cursor: pointer;
}
.btn-secondary:hover {
  background-color: var(--color-fg);
  color: var(--color-bg);
}
```
### Destructive button
For irreversible actions only. Toolbox background.
```css
.btn-destructive {
  background-color: var(--color-error);     /* Toolbox #C8102E */
  color: var(--color-bg);
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
  background-color: var(--color-bg);        /* Canvas */
  color: var(--color-surface);              /* currentColor for pattern.svg — Plaster tread */
  background-image: url('../assets/logo/pattern.svg'); /* Plaster pattern */
  background-repeat: repeat-x;              /* Horizontal only */
  background-size: auto 100%;               /* Scale to fit nav height */
  border-bottom: none;                      /* No borders */
}
.nav-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-128);             /* 128px side margins aligning with main content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo img { height: 21px; }             /* --logo-mark-min — never below 21px */
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
  border-top: 1px solid rgba(35, 47, 54, 0.12);
}
.mobile-dropdown .nav-link { font-size: clamp(24px, 3vw, 32px); font-weight: 500; }
.nav-link {
  font-family: var(--font-primary);
  font-size: var(--text-ui);             /* 1rem / 16px */
  font-weight: var(--weight-medium);       /* 500 */
  color: var(--color-fg);                  /* Iron */
  text-decoration: none;
}
.nav-link:hover,
.nav-link[aria-current="page"] {
  color: var(--color-primary);             /* Traffic Cone */
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
Input fields use a bottom-border-only style — no box, no background fill. Mimics a drafting line.
```css
.input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-fg); /* Iron */
  border-radius: 0;
  color: var(--color-fg);
  font-family: var(--font-primary);
  font-size: var(--text-ui);
  padding: var(--space-3) 0;               /* 12px top/bottom, no side padding */
  width: 100%;
}
.input:focus {
  outline: none;
  border-bottom-color: var(--color-primary); /* Traffic Cone on focus */
}
.input::placeholder {
  color: rgba(35, 47, 54, 0.4);            /* Iron at 40% */
}
```
**Labels:** Above the field, not inside (placeholder is not a label). `--text-label` size, `--weight-medium`, Iron.
**Error state:** Border becomes Toolbox (`--color-error`). Error message below field in Toolbox, `--text-0.75x`. Should include an error icon (non-color signal).
**Success state:** Border becomes Bottle Glass (`--color-success`). Checkmark icon alongside.
---
## Badges and status indicators
Every badge should communicate via color + shape + label. Never color alone.
```css
/* Base badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-primary);
  font-size: var(--text-label);            /* 0.75rem */
  font-weight: var(--weight-medium);       /* 500 */
  padding: var(--space-1) var(--space-2); /* 4px 8px */
}
/* Success — pill shape */
.badge-success {
  background-color: var(--color-success);  /* Bottle Glass */
  color: var(--color-bg);                  /* Canvas */
  border-radius: var(--radius-pill);
}
/* Warning — chamfered (use clip-path or angled border) */
.badge-warning {
  background-color: var(--color-warning);  /* Hard Hat */
  color: var(--color-fg);                  /* Iron */
  border-radius: 0;
}
/* Error — square */
.badge-error {
  background-color: var(--color-error);    /* Toolbox */
  color: var(--color-bg);                  /* Canvas */
  border-radius: 0;
}
/* Info */
.badge-info {
  background-color: var(--color-link);     /* Painter's Tape */
  color: var(--color-bg);                  /* Canvas */
  border-radius: var(--radius-pill);
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
  border-radius: 0;
  padding: var(--space-16);                /* 64px — tactile */
}
/* Interactive cards reserve a transparent border so hover can reveal the Cone outline without layout shift */
.card-interactive {
  border: 1.5px solid transparent;
}
/* Hover state for interactive cards */
.card-interactive:hover {
  border-color: var(--color-primary);      /* Traffic Cone border on hover */
  cursor: pointer;
}
/* Active / selected state — Iron text on Traffic Cone (Canvas on Cone is banned, 2.83:1) */
.card-interactive[aria-selected="true"] {
  background-color: var(--color-primary);
  color: var(--color-fg);
}
@media (max-width: 768px) {
  .card { padding: var(--space-8); }        /* 32px — tactile mobile */
}
/* Inverted surface (Dark mode block) */
.surface-inverted {
  background-color: var(--color-fg);       /* Iron */
  color: var(--color-bg);                  /* Canvas */
  border: none;
  border-radius: 0;
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
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0;
}
```
**On Iron (dark) backgrounds:** Use Canvas underlined text instead of Painter's Tape — Painter's Tape does not pass contrast on Iron.
## Photography & Media
All photography utilizes a universal multiply blend mode to integrate seamlessly with the Canvas ground.
```css
img.photo,
.photo-container img {
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
  background-color: var(--color-fg);       /* Iron */
  color: var(--color-bg);                  /* Canvas */
  padding: var(--space-128);
}
.footer-inner {
  max-width: 1440px;
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
  color: rgba(250, 247, 243, 0.6);        /* Canvas at 60% */
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
  color: var(--color-bg);                  /* Canvas links */
  display: block;
  margin-bottom: var(--space-8);
}
.footer .nav-link:hover {
  color: var(--color-primary);             /* Traffic Cone hover */
}
```
The logo in the footer should be `lockup.svg` with `color: var(--color-bg)` on the container so the `currentColor` fill renders Canvas on the Iron background. On smaller viewports, this hides and is replaced by `mark.svg` the same way.
---
## Metadata and data strings
All timestamps, IDs, distances, file sizes, and numeric data strings use the monospace stack.
```css
.meta {
  font-family: var(--font-mono);
  font-size: var(--text-mono);            /* 0.875rem */
  color: rgba(35, 47, 54, 0.6);          /* Iron at 60% */
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
| Arrow (up, down) | Missing — add to Phase II |
| Location | Complete (`location.svg`) |
| Clock | Complete (`clock.svg`) |
| User | Complete (`user.svg`) |
| External link | Complete (`external-link.svg`) |
| Plus | Complete via rotated `close.svg` (no dedicated `plus.svg`) |
| Menu (hamburger) | Complete (`menu.svg`) |
