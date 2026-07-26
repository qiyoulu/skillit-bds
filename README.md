# Skillit Brand Design System (BDS)
**Version:** 1.0 — Phase I\
**Last updated:** 2026-07-17\
**Maintained by:** Chiyo (Brand Design) — upstream at `qiyoulu/skillit-bds`
---
## For the engineering team
This repo is the brand token source of truth for `app.skillit.com`. Start here.
### What lives here vs. in `skillit-rails`
| What | Where |
|---|---|
| Color, typography, spacing tokens (source) | This repo — `tokens/` |
| Voice and copy rules | This repo — `voice/` |
| Tailwind config theme extension | `skillit-rails` — `config/tailwind.config.js` |
| SVG components | `skillit-rails` — `app/components/` |
| Google Fonts link tag | `skillit-rails` — `app/views/layouts/application.html.erb` |
The `tailwind.config.js` extension is on the `brand/design-system` branch in `skillit-rails`. All BDS tokens are namespaced under `skillit` (e.g., `bg-skillit-canvas`, `text-skillit-iron`) and will not collide with existing keys.
### Pulling upstream updates
When Chiyo pushes BDS updates, pull them into this repo:
```bash
git remote add upstream https://github.com/qiyoulu/skillit-bds.git
git fetch upstream
git merge upstream/main
```
### Two implementation targets
The BDS serves two surfaces — make sure you are building for the right one:
- **`app.skillit.com` (Rails)** — use the `tailwind.config.js` extension and SVG ViewComponents. See `LLM-INSTRUCTIONS.md` → Target B.
- **`www.skillit.com` (Squarespace)** — managed by Fraser directly. Engineering is not involved.
### Key files for engineers
- `LLM-INSTRUCTIONS.md` — system prompt for any AI agent generating UI code
- `tokens/color.md` — all hex values, UI roles, contrast ratios
- `tokens/typography.md` — type scale, weights, fluid sizing rules
- `tokens/spacing.md` — grid, margins, breakpoints
- `rules/accessibility.md` — WCAG AA requirements, shape coding for status
- `components/ui.md` — buttons, nav, forms, badges, cards
---
## What this is
The machine-readable source of truth for the Skillit brand. Every file is a flat, tokenized, rule-based document structured for LLM consumption. If a rule requires a human to interpret it, the rule is broken.
Use this system to generate any Skillit output: UI, website copy, social posts, presentations, sales collateral, investor materials, press releases, or internal documents.
---
## For LLMs and automation
### For any generation task, follow this sequence:
1. **Load context** — read `context/brand-narrative.md` and `context/audience.md`.
2. **Load voice** — read `voice/brand-voice.md` for tone rules and `voice/copy-examples.md` for calibration.
3. **Load tokens** — read `tokens/color.md`, `tokens/typography.md`, `tokens/spacing.md`. Do not guess or approximate values.
4. **Load rules** — read the relevant rule files for the output type:
   - UI or web output → `rules/layout.md` + `components/ui.md`
   - Photography or image direction → `rules/photography.md`
   - All outputs → `rules/accessibility.md` (non-negotiable)
5. **Generate** — apply tokens and rules exactly. Do not deviate from named values.
### Hard constraints (no exceptions)
- **Colors:** Named tokens from `tokens/color.md` only. Never approximate or invent.
- **Type:** Typefaces listed in `tokens/typography.md` only. Never substitute.
- **Voice:** Match the register in `voice/brand-voice.md`. No jargon, hype, or hedging.
- **Minimalism:** Canvas + Iron are the primary surfaces. Traffic Cone is one splash per layout — not sprinkled.
- **Case:** Sentence-case everywhere. No title case in UI. No ALL CAPS.
- **Accessibility:** Every color combination must meet WCAG AA (4.5:1 body, 3:1 UI). Never use color as the only status signal.
### LLM model routing
Route tasks to the correct model — do not treat them as interchangeable:
- **Claude:** Copywriting, voice, and narrative. Reliably executes negative constraints and the "industry veteran" register.
- **Gemini:** Full-system context, multimodal auditing, agentic orchestration. Use for brand compliance audits across the full repo + UI screenshots.
- **GPT-4o:** Code generation, component scaffolding, token mapping, CSS compilation.
- **Midjourney v6 / Flux.1:** Image generation. Do not use DALL-E 3 — it defaults to stock-photo aesthetics the brand prohibits.
---
## File map
```
skillit-bds/
├── README.md                  ← Start here (engineering + LLM instructions)
├── HUMAN-INSTRUCTIONS.md      ← Human-readable brand instructions
├── LLM-INSTRUCTIONS.md        ← System prompt for AI agents generating UI code
│
├── assets/
│   ├── logo/                  ← Approved SVG vectors (mark, wordmark, lockup, pattern)
│   └── images/                ← Approved photography assets
│
├── tokens/
│   ├── color.md               ← Hex values, UI roles, contrast ratios
│   ├── logo.md                ← Mark, wordmark, lockup rules, color variants
│   ├── typography.md          ← Typefaces, scale, weights, fluid sizing, CDN links
│   └── spacing.md             ← Padding, margin, grid, breakpoints
│
├── voice/
│   ├── brand-voice.md         ← Tone rules, register by channel, what to avoid
│   └── copy-examples.md       ← On-brand and off-brand copy examples
│
├── rules/
│   ├── layout.md              ← Composition rules, whitespace, minimalism constraints
│   ├── accessibility.md       ← Contrast requirements, colorblindness rules, shape coding
│   └── photography.md         ← Image treatment, lighting, framing, banned effects
│
├── components/
│   └── ui.md                  ← Buttons, nav, forms, badges, cards, status indicators
│
└── context/
    ├── brand-narrative.md     ← Who Skillit is, the mission, the worker-first arc
    └── audience.md            ← Contractor vs. worker profiles, emotional needs, channel tone
```
---
## Status
| File | Status |
|---|---|
| `HUMAN-INSTRUCTIONS.md` | Complete |
| `LLM-INSTRUCTIONS.md` | Complete |
| `tokens/color.md` | Complete |
| `tokens/logo.md` | Complete |
| `tokens/typography.md` | Complete |
| `tokens/spacing.md` | Complete |
| `voice/brand-voice.md` | Complete |
| `voice/copy-examples.md` | Complete |
| `rules/layout.md` | Complete |
| `rules/accessibility.md` | Complete |
| `rules/photography.md` | Complete |
| `components/ui.md` | Complete |
| `context/brand-narrative.md` | Complete |
| `context/audience.md` | Complete |
---
## Planned for Phase II
- Dark mode token overrides
- Icon system complete (exported to `assets/icons/`)
- Social media template specs
- Print/physical material specs (CMYK, bleed, safe zone)
- Swag and in-situ material specs
