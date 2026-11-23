# Chat — Skillit Kit BDS
**Last updated:** 2026-11-23
---
Message threads between a recruiter and a worker, and conversations with Skillit AI.

## Rules
- All components use tokens from `tokens/docs/color.md`, `tokens/docs/typography.md`, and `tokens/docs/spacing.md`. Never hardcode values.
- The thread sits on Canvas; the input follows the chat input in `components/forms.md`.

## Message bubbles
- **Bubble:** Plaster, 16px corners, 12px padding on all sides, Text-1x Iron.
- **Sides:** the person using the app on the right; the other person on the left. Side, not color, says who sent it, so both sides are Plaster.
- **Width:** at most about 70% of the thread, so even a long message sits clearly to one side.
- **Spacing:** 4px between messages from the same sender, 16px when the sender changes.
- **Avatar:** optional, beside the first message of each turn from the other person.

## Skillit AI messages
- Replies from Skillit AI are plain text on Canvas with no bubble, so they read as the product talking, not a person.
- Results, plans, and decisions appear as Plaster cards in the thread (16px corners and padding, per `components/cards.md`).
- Name the product "Skillit AI". Do not give it a human name or a persona.
