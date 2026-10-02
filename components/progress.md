# Progress Indicator — Skillit Kit BDS
**Last updated:** 2026-09-10
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, and UI text. No ALL CAPS, no Title Case.
- Stage names use Work Sans (`--font-primary`). Mono is for machine data only — stage names are human-readable content.

## When to use
Multi-step flows (onboarding, application, signup, checkout, profile setup). Use when the steps are discrete, named, and the worker benefits from knowing both *where they are* (bar) and *what they're doing* (stage name). For 2–3 step flows, omit the bar and use only the stage name.

**Contextual rendering.** The progress indicator renders only during multi-step flows. It does not appear on the homepage, dashboard, or single-action screens. It is a flow-level element, not a site-wide chrome.

## Geometry
- **Bar height:** 2px (explicit hairline geometry; no `--space-0.5` token exists)
- **Bar width:** Fills the content container (card or column span)
- **Stage name:** Work Sans, `--text-1x`, Iron, to the right of the bar (desktop) or below (mobile)

## Layout
- Position: directly below the header row, at the bottom edge of the header, bridging to the content below.
- The bar fills the width of the content column — not the viewport. On desktop, the column is narrower than the viewport and the bar stays aligned with the form below. On mobile, the column is narrow and the bar reads as full-width.

The completed Iron fill is an approved functional progress treatment, not an action or layout-background accent. Keep it fully opaque; never fade the parent track and its completed child together.

## States
- **Completed portion:** Iron fill (`--color-foreground`). The filled segment of the bar.
- **Pending portion:** Iron (`--color-foreground`) at 20% opacity, or transparent with 1px Iron border. The unfilled segment of the bar.
- **Transition:** Instant fill on step change. No animation. Reduced-motion users see the bar jump directly to the new state.

```css
.progress-bar {
  height: 2px;
  width: 100%;
  background-color: color-mix(in srgb, var(--color-foreground) 20%, transparent); /* pending track only */
  opacity: 1; /* completed child remains opaque */
  border: none;
}
.progress-bar__fill {
  height: 100%;
  background-color: var(--color-foreground);  /* opaque Iron completed fill */
  width: calc((var(--active-step) - 1) / (var(--total-steps) - 1) * 100%);
  transition: none;  /* instant, no animation */
}
```

## Stage names
The active stage name sits to the right of the bar (desktop) or below (mobile).

```css
.progress-stage-name {
  font-family: var(--font-primary);    /* Work Sans */
  font-size: var(--text-1x);            /* 16px */
  font-weight: var(--weight-medium);    /* 500 */
  color: var(--color-foreground);        /* Iron */
}
```

| Screen | Stage name |
|---|---|
| Sign-up | Join |
| Welcome / account created | Welcome |
| Resume upload | Resume |
| Work history | Experience |
| Primary trade | Trade |
| Skills (interim) | Skills |
| Location | Location |
| Hourly pay | Pay |
| Languages | Languages |
| Credentials / additional info | Credentials |
| Relocation + per diem | Relocation |
| References | References |
| Completion | Done |

- Single-word names where possible.
- Sentence case. No ALL CAPS, no title case.
- The stage name is the *task* the worker is doing — not the screen number or platform label.

## Reduced motion
The indicator must work with `prefers-reduced-motion`. The bar fill is instantaneous — no animated transition. Width changes are immediately applied on step change.

## Accessibility
- The bar has a role of `progressbar` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- The stage name is announced alongside: "Step 4 of 13: Location."
- Screen readers hear: "Onboarding progress. Step 4 of 13: Location."

## Empty/completed state
On the completion screen, the bar is 100% filled. Keep the completed fill fully opaque while displayed. Remove the indicator when the worker transitions to the next state (waiting for recruiters, profile view, etc.); do not fade completion or apply pending-track opacity to its parent.

## Examples
```html
<div class="progress" role="progressbar" aria-valuenow="4" aria-valuemin="1" aria-valuemax="13" aria-label="Onboarding progress">
  <div class="progress-bar">
    <div class="progress-bar__fill" style="--active-step: 4; --total-steps: 13;"></div>
  </div>
  <span class="progress-stage-name">Location</span>
</div>
```
