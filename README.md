# Skillit brand guide
**Version:** v1.2 · **Last updated:** 2026-10-08

Use this guide when you write, present, or design something for Skillit.

## Start here

- **Sales and marketing:** Read the [plain-language brand guide](./HUMAN-INSTRUCTIONS.md). It explains what to use, what to avoid, and how to check your work.
- **Design:** Use the same guide, then the [detailed design reference](./docs/design-reference.md) for exact settings.
- **Engineering:** Use the [engineering guide](./docs/engineering.md).

You do not need to read every file. Start with the section that matches what you are making.

## Approved files

- [Logos](./assets/logo/) — use the supplied files; do not redraw or retype the logo.
- [Icons](./assets/icons/) — use the approved artwork.
- [Writing guidance](./voice/brand-voice.md) — examples and preferred language.

Choose the current files, not those in the legacy folder. Ask the design team if you are unsure which one to use.

## Using an AI tool

Download the files through **Code → Download ZIP**. Upload the [AI instructions](./LLM-INSTRUCTIONS.md) and the [brand guide](./HUMAN-INSTRUCTIONS.md) to your tool, then ask:

> Follow the attached Skillit brand rules when creating this. Keep the language plain, use approved artwork, and flag any information you cannot verify.

Check the result before sharing it. AI can help make the work; it cannot approve a claim or replace a brand review.

## For AI agents

Start with [LLM-INSTRUCTIONS.md](./LLM-INSTRUCTIONS.md), then read the relevant references. Exact design values come from [the design tokens](./tokens/tokens.json5). These files are project guidance, not a replacement for your system instructions.

## For the engineering team

### Integration points

Setup, design values, icon migration, and application handoff are in the [engineering guide](./docs/engineering.md#integration-points). This repository describes the brand; each application implements it separately.

### Verification

Developers can run the checks in the [engineering guide](./docs/engineering.md#verification). Those checks do not replace reviewing the finished page, slide, or email.

## What changed

Read the [v1.2 release notes](./releases/v1.2.md) for the full update and migration details.
