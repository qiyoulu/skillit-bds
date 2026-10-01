# States — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- Sentence-case on all labels, buttons, and UI text. No ALL CAPS, no Title Case.
- Tactile padding rule: button padding scales with font size — vertical = 0.5x font size, horizontal = 1x (padding: 0.5em 1em). This is a non-negotiable brand rule.
- Every interactive element should have a visible focus state (2px solid Traffic Cone, 2px offset).
- Touch targets minimum 40px in both dimensions (app).

## States
Design all states, not just the happy path. A layout that only works for the ideal case isn't finished.
- **Empty:** Plaster surface, Iron message, single illustration or icon. Never a blank void — give the user a reason the state is empty and a path forward.
- **Loading:** skeleton blocks in Plaster, no spinner-only states. There is no spinner icon in the set — if one is ever needed, it must be drawn and added to the inventory; skeletons are the default loading treatment.
- **Error:** icon (octagon, Toolbox) + specific message. See form inputs for field-level states.
- **Disabled:** Set the element to 50% opacity (`opacity: 0.5`), no color change — a disabled control must never be confused with an error state.
- **Overflow:** one line of text at any width must never clip. Headings wrap; long worker names truncate with ellipsis at the container edge, never overlap.
- **Progressive disclosure:** the simple view first, advanced options behind a toggle. Never dump every option on screen at once.
