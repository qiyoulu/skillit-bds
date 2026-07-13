# Skillit Brand Design System (BDS)

**Version:** 1.0 — Phase I scaffold
**Last updated:** 2026-07-10

### LLM Routing & Model Selection

For automated systems and agents consuming this BDS, route tasks to the specific models below. Do not treat models as interchangeable for brand outputs:

- **Claude 3.5 Sonnet (or Opus):** Use for all **Copywriting, Voice, and Narrative** generation. Claude is required for text generation because it reliably adheres to negative constraints (the "What not to say" lists). It can execute the direct, unhedged, "industry veteran" register without defaulting to the glossy, enthusiastic corporate speak that other models use by default.
- **Gemini (1.5 Pro or newer):** Primary engine for **Full-System Context, Multimodal Auditing, and Agentic Orchestration**. Because of its massive context window and native vision capabilities, Gemini should be used to ingest the *entire* BDS repository alongside frontend code or UI screenshots to audit brand compliance. Use Gemini to orchestrate workflows (e.g., managing the handoff between Claude's copy and GPT's code).
- **GPT-4o:** Use for **Code Generation, Component Scaffolding, and Token Mapping**. Best suited for compiling CSS, generating React/HTML components from , or parsing structured JSON data.
- **Midjourney v6 (or Flux.1):** Use for **Image Generation**. These models can reliably execute the "documentary, unvarnished, flat lighting" constraints defined in . Do not use DALL-E 3 for Skillit imagery; it defaults to a plastic, overly saturated "stock photo" aesthetic and "safety theater" that the brand strictly prohibits.

---

## What this is

This is the machine-readable source of truth for the Skillit brand. It is structured for LLM consumption — every file is a flat, tokenized, rule-based document with no ambiguity. If a rule requires a human to interpret it, the rule is broken.

Use this system to generate any Skillit output: website copy, social posts, presentations, sales collateral, investor materials, product UI, press releases, or internal documents.

---

## How to use this system

### For any generation task, follow this sequence:

1. **Load context** — read `context/brand-narrative.md` and `context/audience.md` to understand who Skillit is and who you are writing for.
2. **Load voice** — read `voice/brand-voice.md` for tone rules. Read `voice/copy-examples.md` for calibration.
3. **Load tokens** — read the relevant token files (`tokens/color.md`, `tokens/typography.md`, `tokens/spacing.md`) for exact values. Do not guess or approximate.
4. **Load rules** — read the relevant rule files for the output type:
   - UI or web output → `rules/layout.md` + `components/ui.md`
   - Photography or image direction → `rules/photography.md`
   - All outputs → `rules/accessibility.md` (non-negotiable)
5. **Generate** — apply tokens and rules. Do not deviate from named values.

### Hard constraints (apply to every output, no exceptions)

- **Colors:** Use only named tokens from `tokens/color.md`. Never approximate or invent new colors.
- **Type:** Use only the typefaces listed in `tokens/typography.md`. Never substitute.
- **Voice:** Match the register defined in `voice/brand-voice.md` for the output channel. Never use corporate jargon, hype language, or hedging.
- **Minimalism:** Primary surfaces are Notebook + Graphite (dark text). The single accent (Cord) is used sparingly — one dominant use per layout, not sprinkled.
- **Case:** Sentence-case everywhere. No title case in UI. No ALL CAPS except hardware serial number context.
- **Accessibility:** Every color combination must meet WCAG AA (4.5:1 body, 3:1 UI). Never use color as the only status signal.

---

### LLM Routing & Model Selection

For automated systems and agents consuming this BDS, route tasks to the specific models below. Do not treat models as interchangeable for brand outputs:

- **Claude 3.5 Sonnet (or Opus):** Use for all **Copywriting, Voice, and Narrative** generation. Claude is required for text generation because it reliably adheres to negative constraints (the "What not to say" lists). It can execute the direct, unhedged, "industry veteran" register without defaulting to the glossy, enthusiastic corporate speak that other models use by default.
- **Gemini (1.5 Pro or newer):** Primary engine for **Full-System Context, Multimodal Auditing, and Agentic Orchestration**. Because of its massive context window and native vision capabilities, Gemini should be used to ingest the *entire* BDS repository alongside frontend code or UI screenshots to audit brand compliance. Use Gemini to orchestrate workflows (e.g., managing the handoff between Claude's copy and GPT's code).
- **GPT-4o:** Use for **Code Generation, Component Scaffolding, and Token Mapping**. Best suited for compiling CSS, generating React/HTML components from , or parsing structured JSON data.
- **Midjourney v6 (or Flux.1):** Use for **Image Generation**. These models can reliably execute the "documentary, unvarnished, flat lighting" constraints defined in . Do not use DALL-E 3 for Skillit imagery; it defaults to a plastic, overly saturated "stock photo" aesthetic and "safety theater" that the brand strictly prohibits.

---

## File map

```
skillit-brand-system/
├── README.md                  ← you are here. Load this first.
│
├── tokens/
│   ├── color.md               ← all hex values, UI roles, contrast ratios
│   ├── typography.md          ← typefaces, scale, weights, CDN links
│   └── spacing.md             ← padding, margin, grid, breakpoints
│
├── voice/
│   ├── brand-voice.md         ← tone rules, register by channel, what to avoid
│   └── copy-examples.md       ← real examples of on-brand and off-brand copy
│
├── rules/
│   ├── layout.md              ← composition rules, whitespace, minimalism constraints
│   ├── accessibility.md       ← contrast requirements, colorblindness rules, shape coding
│   └── photography.md         ← image treatment, lighting, framing, banned effects
│
├── components/
│   └── ui.md                  ← buttons, nav, forms, badges, cards, status indicators
│
└── context/
    ├── brand-narrative.md     ← who Skillit is, the mission, the three systems, the arc
    └── audience.md            ← contractor vs. worker profiles, emotional needs, channel tone
```

---

## Status

| File | Status |
|---|---|
| `tokens/color.md` | Complete |
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

## What is not in this system yet

These will be added in Phase I finalization or Phase II:

- Logo usage rules (clearspace, minimum size, misuse)
- Dark mode token overrides
- Icon system (style, stroke weight, corner radius)
- Social media template specs
- Print/physical material specs (CMYK translations, bleed, safe zone)
- Swag and in-situ material specs
