# Progress Indicator — Skillit BDS
**Last updated:** 2026-09-10
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, and UI text. No ALL CAPS, no Title Case.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40×40px (app).
- Stage names use Work Sans (`--font-primary`). Mono is for machine data only — stage names are human-readable content.

## When to use
Multi-step flows (onboarding, application, signup, checkout, profile setup). Use when the steps are discrete, named, and the worker benefits from knowing both *where they are* (dots) and *what they're doing* (stage name). For 2–3 step flows, omit the dots and use only the stage name.

## Geometry
- **Dot diameter:** 8px (`--space-2`)
- **Gap between dots:** 32px (`--space-8`) — fixed, not auto. Generous rhythm; gives 16px dead zone between adjacent hit areas. The 13-dot full row spans 488px (13 × 8 + 12 × 32), so the sliding window is always-on at this gap — the full row never fits even at desktop.
- **Hit area per dot:** 32×32px (`--space-8` × `--space-8`) — wraps the 8px dot, gives a comfortable touch target, and keeps the geometry aligned with the BDS spacing scale. Per-dot stride is 64px (32 hit + 32 gap), also a multiple of `--space-8`.

## Layout
- Dots sit centered horizontally in their container (`justify-content: center`).
- Position: directly below the header row, at the bottom edge of the header, bridging to the content below.
- Below the dots: one stage name in Work Sans, `--text-1x`, Iron, centered.

## Sliding window
13+ steps will overflow the viewport. Use a sliding window — only ~5–7 dots are visible at once. The active dot stays centered, neighbors fade at the edges, and the row shifts left as the worker advances. With 32px gaps, the sliding window is mandatory — the full row (488px) doesn't fit in any viewport.

Implementation:
- Container clips overflow: `overflow: hidden`
- Active dot translates to its position via `transform: translateX(calc(-1 * activeIndex * 40px))` (40px = 8px dot + 32px gap per step)
- Container width corresponds to the visible window: 296px = 5 dots + 4 gaps (5 × 8 + 4 × 32 = 168px) plus 64px buffer on either side (296px total). Scale up for fewer dots in the window.

## States
- **Completed:** Bottle Glass fill (`--color-success`, `#305F38`). Solid. Done.
- **Active:** Traffic Cone fill (`--color-primary`, `#EF6F1A`). Solid. You are here. Use Traffic Cone for active even on Canvas ground — the badge functional accent exception applies here too (it's a location signal, not decoration).
- **Pending:** 8px circle, 1px Iron (`--color-foreground`) stroke, transparent fill. Hollow. Not yet reached.

```css
.progress-dot { width: 8px; height: 8px; border-radius: 50%; }
.progress-dot--completed { background-color: var(--color-success); border: none; }
.progress-dot--active    { background-color: var(--color-primary); border: none; }
.progress-dot--pending   { background-color: transparent; border: 1px solid var(--color-foreground); }
```

## Stage names
The active stage name sits below (or beside on desktop) the dots.

```css
.progress-stage-name {
  font-family: var(--font-primary);    /* Work Sans */
  font-size: var(--text-1x);            /* 16px */
  font-weight: var(--weight-medium);    /* 500 */
  color: var(--color-foreground);        /* Iron */
  text-align: center;
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
The indicator must work with `prefers-reduced-motion`. The dot fill is instantaneous — no animated transition. Sliding window transforms are immediately applied on step change. No pulse animations, no faded fills across an animation timeline.

## Accessibility
- Each dot is a button with `aria-label` matching its semantic state ("Step 4: Location, completed").
- The active dot uses `aria-current="step"`.
- The container has a role of `navigation` with an `aria-label` (e.g., "Onboarding progress").
- Screen readers hear: "Onboarding progress navigation. Step 4: Location. Current. Completed dots: 1, 2, 3. Pending dots: 5 through 13."

## Empty/completed state
On the completion screen, the active dot is the last dot. The indicator remains visible briefly, then fades (`opacity: 0` over 200ms) when the worker transitions to the next state (waiting for recruiters, profile view, etc.). Reduced-motion users see the indicator disappear immediately when transition completes.

## Examples
```html
<nav aria-label="Onboarding progress" class="progress">
  <ol class="progress-dots" tabindex="-1">
    <li class="progress-dot progress-dot--completed" aria-label="Step 1: Join, completed"></li>
    <li class="progress-dot progress-dot--completed" aria-label="Step 2: Welcome, completed"></li>
    <li class="progress-dot progress-dot--completed" aria-label="Step 3: Resume, completed"></li>
    <li class="progress-dot progress-dot--active"    aria-label="Step 4: Experience, current"  aria-current="step"></li>
    <li class="progress-dot progress-dot--pending"   aria-label="Step 5: Trade, pending"></li>
    <!-- ... 8 more ... -->
  </ol>
  <p class="progress-stage-name">Experience</p>
</nav>
```
