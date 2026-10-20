# Navigation — Skillit Kit BDS
**Last updated:** 2026-10-20
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Use sentence case for authored labels, buttons, and UI text; preserve acronyms, proper nouns, user-entered capitalization, and verbatim quoted content. The fixed wordmark is an asset exception.
- **Paired padding:** Button-like controls use the canonical `--padding-*x` token matching their text tier in `rem`: Text-1x = 8px / 16px, Text-1.5x = 12px / 24px, Text-2x = 16px / 32px at a 16px root. Text-0.75x is the approved compact exception (4px / 8px), not a proportional 6px / 12px pair. See `tokens/docs/spacing.md`; do not derive local `em` padding or use unapproved type sizes. Outlook email may use an explicit approved pixel fallback matching the chosen canonical pair.
- Every interactive element needs a visible focus state: 2px solid Traffic Cone (`--color-primary`), 2px offset. On Canvas this is a documented contrast failure (2.6958:1); on Plaster it narrowly meets 3:1 (3.0177:1). Keep Orange in authored contexts, preserve native and forced-colors focus, and verify the actual adjacent surface; see `rules/accessibility.md`.
- Touch targets minimum 40px in both dimensions (app).

## Primary navigation
The primary navigation is a 64px row on Canvas: the 32px logo with 16px above and below. There is no texture band; the row is the whole header.
On desktop, the full "Skillit" lockup is visible. When the viewport scales down, the lockup hides and is replaced by the 32px `mark` icon, while the navigation items collapse into a full-width dropdown menu. SKILLIT Hire pages are the exception: they keep the full SKILLIT Hire lockup at every width, mobile included (see `tokens/docs/logo.md`, Product lockup).
```css
.nav {
  position: relative;
  background-color: var(--color-background); /* Canvas */
  border-bottom: none;
}
.nav-inner {
  max-width: calc(var(--max-width-content) + 2 * var(--space-8)); /* 1200px content once both 32px margins fit (1264px) */
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 var(--space-4); /* mobile; shared with body content */
  min-height: var(--nav-height); /* 64px row: 32px logo centered, 16px above and below; grows for text resizing */
  padding-block: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo img { height: var(--logo-height); }  /* 32px — lockup height */
.logo-mark { display: none; width: var(--logo-height); height: var(--logo-height); }  /* 32px */
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
  max-width: calc(var(--max-width-content) + 2 * var(--space-8));
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
@media (min-width: 768px) {
  .nav-inner, .mobile-dropdown { padding-inline: var(--space-8); }
}
@media (max-width: 1279px) { /* below xl: menu button and mark (SKILLIT Hire pages keep their lockup); the full bar needs the 960px+ of room only xl guarantees */
  .nav-links, .nav-cta { display: none; }
  .nav-menu-btn { display: block; }
  .nav-logo { display: none; }
  .logo-mark { display: block; }
}
.mobile-dropdown.open { display: flex; }
```
**Mobile menu layout.** Links are top-aligned and flush-left, directly under the header, as Text-1.5x rows 48px tall. The primary button and, where present, the secondary trigger sit in a bar pinned to the foot of the menu, hugging their labels. The space between the two is empty; links never stretch or center to fill it. The position of a language picker is not yet specified.

**Example nav labels (not a live-site inventory):** How it works · Our network · Jobs · About us · Resources
**Right side:** Primary button ("Join") — Traffic Cone, tactile padding.

## Mega menu panel (marketing site)
For a nav item that leads to a family of offerings, each with its own page. A plain destination stays a plain link. The panel is a marketing-site pattern, not an app one.

**Trigger.** A secondary button at the right of the header, after the primary: Canvas fill on the white header, Iron text, pill, Text-1x. It carries a 16px `chevron-down` that turns 180° while the panel is open. While open the button holds its Canvas hover fill. Traffic Cone stays with the primary alone, so one dominant CTA remains.

**Panel.** Plaster, under the header, across the content container; header and panel read as one white surface. Inside, one Canvas card per offering (16px corners), equal width, one column below 899px. Each card keeps its own copy, buttons and "Ideal for" list. Behind the panel, an Iron backdrop at 50%, the same recipe as the modal backdrop, below the header.

**Audience line.** One line of Text-1x Iron below the cards, naming who the menu serves. Sentence case; acronyms keep their capitals (ENR). It carries no claim and no closing period.

**Motion.** The panel opens as a blind: `clip-path` plus a short translate, never height. `--duration-medium` (300ms), `--ease-out` to open, `--ease-in` to close. Reduced motion is instant.

**Behavior.**
- **Pointer:** opens on hover; a 200ms leave delay stops it closing on the way into the panel. Hovering any other header control closes it.
- **Touch:** the first tap opens; a second tap follows the link.
- **Keyboard:** ArrowDown opens and focuses the first link; Tab walks the panel; Escape closes and returns focus to the trigger.
- **State:** `aria-expanded` on the trigger is the single source of truth.

**Mobile.** The trigger leaves the header and sits beside the primary in the pinned bar at the foot of the menu, both hugging their labels. Tapping it drills in: the root list slides out to the left and the panel slides in from the right, as the language picker does. A Back row (Text-1x, 48px tall) leads the panel; Escape steps back one level before it closes the menu. The cards stack in one column with the same copy. Root rows are Text-1.5x on 48px rows; the panel text is Text-1x, so type steps 24px then 16px.

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
