# Navigation — Skillit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- ALL CAPS on all labels, buttons, and UI text. No sentence case, no Title Case.
- Tactile padding rule: buttons use generous horizontal padding — double the standard. This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 44px in both dimensions (app).

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
**Right side:** Primary button ("Join") — Traffic Cone, tactile padding.
