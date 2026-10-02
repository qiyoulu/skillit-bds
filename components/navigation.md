# Navigation — Skillit Kit BDS
**Last updated:** 2026-09-09
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Primary navigation
The primary navigation uses the boot tread pattern rendered in Plaster (`#FFFFFF`) as a low-contrast structural anchor in the empty top band of the header. The empty texture band is additional to the 64px minimum content row. Keep the texture outside logo, text, control, and focus-ring exclusion zones; the pattern is not a background behind navigation UI. The external pattern is an alpha mask painted by the host, not a background image that inherits `currentColor`. CSS URLs assume a stylesheet beside `tokens/generated/tokens.css`; see `icons.md`.
On desktop, the full "Skillit" lockup is visible. When the viewport scales down, the lockup hides and is replaced by the 24px `mark` icon, while the navigation items collapse into a full-width dropdown menu.
```css
.nav {
  position: relative;
  isolation: isolate;
  background-color: var(--color-background); /* Canvas */
  border-bottom: none;
  padding-top: var(--space-2); /* reserved empty pattern band, outside nav content */
}
.nav::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: var(--space-2); /* texture-only band; keep all text/control boxes clear */
  z-index: -1;
  pointer-events: none;
  background-color: var(--color-surface); /* host-painted Plaster tread */
  -webkit-mask: url('../../assets/logo/pattern.svg') left center / auto 100% repeat-x;
  mask: url('../../assets/logo/pattern.svg') left center / auto 100% repeat-x;
}
.nav-inner {
   max-width: var(--max-width-content);
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 var(--space-4); /* mobile; shared with body content */
  min-height: var(--nav-height); /* 64px content row; grow for text resizing */
  padding-block: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo img { height: var(--logo-height); }  /* 24px — lockup height */
.logo-mark { display: none; width: var(--logo-height); height: var(--logo-height); }  /* 24px */
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
  padding: var(--space-2); /* icon-only geometry, not text-tier padding */
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  border-radius: var(--radius-pill);
  position: relative;
}
.nav-links {
  display: flex;
  gap: var(--space-8);               /* 32px — nav links */
  align-items: center;
}
.nav-cta {
  margin-left: var(--space-8);       /* 32px — separates Join button from nav links */
}
.mobile-dropdown {
  display: none;
  flex-direction: column;
  gap: var(--space-8);               /* 32px — mobile dropdown links */
  box-sizing: border-box;
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--space-16) var(--space-4);
   border-top: 1px solid var(--color-foreground);
}
.mobile-dropdown .nav-link { font-size: var(--text-1\.5x); font-weight: var(--text-1\.5x-weight); }
.nav-link {
  font-family: var(--font-primary);
  font-size: var(--text-1x);             /* 1rem / 16px */
  font-weight: var(--weight-medium);       /* 500 */
  color: var(--color-foreground);                  /* Iron */
  text-decoration: none;
}
.nav-link:hover {
  color: var(--color-link);                /* Painter’s Tape on Canvas: 4.2312:1, existing brand exception, not an AA pass */
  text-decoration: underline;
}
.nav-link[aria-current="page"] {
  color: var(--color-foreground); /* Iron: active 16px text must not use Cone */
  font-weight: var(--text-1x-weight-bold);
  text-decoration: underline;
  text-underline-offset: 2px;
}
 .nav-link:focus-visible, .nav-menu-btn:focus-visible, .nav-logo:focus-visible, .logo-mark:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
/* Responsive Nav and the shared header/body content-width contract */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav-inner { padding-inline: var(--space-8); }
  .mobile-dropdown { padding-inline: var(--space-8); }
}
@media (min-width: 1024px) {
  .nav-inner, .mobile-dropdown { padding-inline: 0; }
}
@media (max-width: 1023px) {
  .nav-links, .nav-cta { display: none; }
  .nav-menu-btn { display: block; }
  .nav-logo { display: none; }
  .logo-mark { display: block; }
}
.mobile-dropdown.open { display: flex; }
```
**Example nav labels (not a live-site inventory):** How it works · Our network · Jobs · About us · Resources
**Right side:** Primary button ("Join") — Traffic Cone, tactile padding.

## Back and forward sticky bar

Replaces persistent footer navigation on app views currently using a footer with back and next controls. Sits as a fixed bar at the bottom of the mobile viewport, decouples navigation from the page chrome, and lets the footer be removed.

**When to use.** Any app view that needs a discrete back and next affordance — pagination, step flows, detail-to-listing transitions. One bar per screen, both ends optional; hide whichever side has no action.

**Placement.** `position: sticky; bottom: 0` on mobile. Not sticky on tablet and up — disappears at the tablet breakpoint and the surrounding layout takes over. Do not use `position: fixed` unless the bar must stay on screen across a scroll container that owns the viewport (rare).

**Button spec.** Two icon-only buttons in circular button surfaces, equal size, aligned to the bar edges. The button surface carries the color coding; the arrow is always Iron for contrast.

| Property | Back | Forward |
|---|---|---|
| Visual icon size | 24px × 24px | 24px × 24px |
| Touch target | 40px × 40px | 40px × 40px |
| Button shape | 40×40px circle (24px arrow + 8px padding all sides) | 40×40px circle (24px arrow + 8px padding all sides) |
| Button surface fill | Canvas (`--color-background`) | Traffic Cone (`--color-primary`) |
| Arrow fill | Iron (`--color-foreground`) | Iron (`--color-foreground`) |
| Hover | Button surface: `--color-background-hover` | Button surface: `--color-primary-hover` |
| Focus | 2px solid Traffic Cone, 2px offset | 2px solid Traffic Cone, 2px offset |

- The button surface is a filled circle. Back = Canvas circle with Iron arrow. Forward = Traffic Cone circle with Iron arrow. The Iron arrow provides contrast on both surfaces (12.2506:1 on Canvas, 4.5443:1 on Traffic Cone — both pass AA).
- The bar itself has no fill. The bar is transparent; the two circular buttons sit in it. If the page content scrolls under the bar and the buttons need separation from content, separate the bar from content with a Plaster bar background (`--color-surface`) and a 1px Iron border on top — not by filling the bar itself.

**Back behavior.** The back button navigates to the previous screen in the app's navigation flow. Which route that is — browser history back, a specific prior route, or a flow-aware previous step — is an engineering decision. The BDS specifies the visual and interaction contract only: the button looks and behaves like a back control, and the destination is whatever the implementation wires it to. Do not hardwire a specific routing strategy in this spec.

**Next behavior.** The next button advances to the next screen or step in the current flow. The same rule applies: the BDS defines the affordance, not the routing.

**One-sided bars.** If only one direction is available, render a single button on the appropriate side. Do not center a lone button in the bar — keep it to the back side (left) or forward side (right), matching the direction it affects.

**Disabled state.** The forward button is always rendered. On screens where the form is incomplete, the button is present but disabled (`disabled` attribute). The universal disabled rule applies: `opacity: 0.5`, no color change. The worker sees where the button is and what it does — they just can't activate it yet. Do not hide the button entirely.

A disabled navigation control reads as "complete the form to proceed," not "absent." Hiding the button creates a dead-end: the worker doesn't know where it went, why there's no forward path, or what they're supposed to do next.

**Focus and a11y.** Both buttons are real links or buttons, not div clicks. They carry an accessible label — "Back" and "Next" by default — and a visible focus ring (2px solid Traffic Cone, 2px offset) per the button and interactive element rules. Keyboard users must be able to reach and activate them.
