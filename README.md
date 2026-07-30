# Skillit Brand Design System (BDS)

**Version:** 0.9-beta (Phase I)  
**Upstream:** `qiyoulu/skillit-bds`

The machine-readable source of truth for the Skillit brand (`app.skillit.com`). This repository contains a flat, tokenized, rule-based architecture designed for both human engineers and AI agents to enforce strict brand compliance across all touchpoints.

---

## 🛠 For the Engineering Team

This repository controls the visual parameters for the main Rails application. 

### Integration Points
- **Tailwind Config:** The core theme extension lives in `skillit-rails` -> `config/tailwind.config.js` (on the `brand/design-system` branch) under the `skillit` namespace.
- **SVG Assets:** Exported to `skillit-rails` -> `app/components/`.
- **Two Targets:** 
  - Target A: Marketing Site (Squarespace - no code generated, purely visual specs).
  - Target B: Product App (Rails 7.2 with tailwindcss-rails).

### Pulling Updates
When upstream brand tokens are updated, sync them to your local environment:
```bash
git remote add upstream https://github.com/qiyoulu/skillit-bds.git
git fetch upstream
git merge upstream/main
```

---

## 🤖 For AI Agents & LLMs

When tasked with generating code, copywriting, or UI components, you should adhere strictly to the rules in this repository. 

### Generation Sequence
1. **Context:** Read `context/brand-narrative.md` and `context/audience.md`.
2. **Voice:** Read `voice/brand-voice.md`.
3. **Tokens:** Read `tokens/color.md`, `typography.md`, and `spacing.md`. Never guess or approximate token values.
4. **Rules:** Read the specific rules for your output type (e.g., `rules/data-viz.md`). `rules/accessibility.md` is non-negotiable.

### Hard Constraints
- **Colors:** Use defined tokens only. No raw hex codes in output.
- **Typography:** Work Sans for all human text. IBM Plex Mono for metadata and code blocks. Sentence-case UI.
- **Voice:** "Industry veteran." No tech jargon, hype, or hedging. 
- **Geometry:** 0px radius for structural elements; 9999px (pill) for buttons.

### Model Routing
- **Claude (3.5/5):** Use for code generation, Tailwind scaffolding, copywriting, and CSS compilation.
- **Gemini (1.5/3.5 Pro):** Use for repo-wide context audits and cross-referencing brand rules against screenshots.
- **Midjourney v6 / Flux.1:** Image generation. Standard DALL-E is banned (stock aesthetic).

---

## 📁 Architecture & File Map

```text
skillit-bds/
├── README.md                  # Entry point (you are here)
├── LLM-INSTRUCTIONS.md        # Core system prompt for UI generation
├── HUMAN-INSTRUCTIONS.md      # Plain language brand manual
├── assets/                    # Approved SVG logos, icons, and photography
├── tokens/                    # Colors, typography, spacing, and logo rules
├── voice/                     # Brand voice guidelines and copy examples
├── rules/                     # Layout, accessibility, photography, and data-viz
├── components/                # Structural UI definitions (buttons, cards)
└── context/                   # Brand narrative and audience profiles
```

---

## 📊 Status Tracker

| Component | Status |
| :--- | :--- |
| `tokens/` (Color, Type, Spacing) | Complete |
| `voice/` (Brand Voice, Copy) | Complete |
| `rules/accessibility.md` | Complete |
| `rules/layout.md` | Complete |
| `rules/data-viz.md` | Complete |
| `rules/photography.md` | Complete |
| `context/` (Narrative, Audience) | Complete |
| Icon System | Planned for Phase II |
| Dark Mode Tokens | Planned for Phase II |