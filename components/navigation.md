# Navigation — Skillit BDS
**Last updated:** 2026-09-09
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## Primary navigation
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
  padding: var(--space-8);
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
  padding: var(--space-16) var(--space-128);
   border-top: 1px solid var(--color-foreground);
}
.mobile-dropdown .nav-link { font-size: clamp(24px, 3vw, 32px); font-weight: 500; }
.nav-link {
  font-family: var(--font-primary);
  font-size: var(--text-1x);             /* 1rem / 16px */
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
  .nav-logo { display: none; }
  .logo-mark { display: block; }
}
.mobile-dropdown.open { display: flex; }
```
**Approved nav tabs:** How It Works · Our Network · Jobs · About Us · Resources
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
| Button shape | Circle (40px diameter) | Circle (40px diameter) |
| Button surface fill | Canvas (`--color-background`) | Traffic Cone (`--color-primary`) |
| Arrow fill | Iron (`--color-foreground`) | Iron (`--color-foreground`) |
| Hover | Button surface: `--color-background-hover` | Button surface: `--color-primary-hover` |
| Focus | 2px solid Traffic Cone, 2px offset | 2px solid Traffic Cone, 2px offset |

- The button surface is a filled circle. Back = Canvas circle with Iron arrow. Forward = Traffic Cone circle with Iron arrow. The Iron arrow provides contrast on both surfaces (4.54:1 on Canvas, 4.54:1 on Traffic Cone — both pass AA).
- The bar itself has no fill. The bar is transparent; the two circular buttons sit in it. If the page content scrolls under the bar and the buttons need separation from content, separate the bar from content with a Plaster bar background (`--color-surface`) and a 1px Iron border on top — not by filling the bar itself.

**Back behavior.** The back button navigates to the previous screen in the app's navigation flow. Which route that is — browser history back, a specific prior route, or a flow-aware previous step — is an engineering decision. The BDS specifies the visual and interaction contract only: the button looks and behaves like a back control, and the destination is whatever the implementation wires it to. Do not hardwire a specific routing strategy in this spec.

**Next behavior.** The next button advances to the next screen or step in the current flow. The same rule applies: the BDS defines the affordance, not the routing.

**One-sided bars.** If only one direction is available, render a single button on the appropriate side. Do not center a lone button in the bar — keep it to the back side (left) or forward side (right), matching the direction it affects.

**Disabled state.** Do not render a disabled-looking back or forward button. If there is no valid destination, hide the button. A disabled navigation control that cannot go anywhere reads as broken.

**Focus and a11y.** Both buttons are real links or buttons, not div clicks. They carry an accessible label — "Back" and "Next" by default — and a visible focus ring (2px solid Traffic Cone, 2px offset) per the button and interactive element rules. Keyboard users must be able to reach and activate them.
