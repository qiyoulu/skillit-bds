# Skillit Brand Design System (BDS)

**Version:** 0.9-beta (Phase I)  
**Upstream:** `qiyoulu/skillit-bds`

This repository is the **Machine-Readable Brand System**—the semantic dataset and rules engine designed to power a future **Model Context Protocol (MCP)** server. 

It is *not* an active MCP server or application itself. Instead, it contains the flat, tokenized, rule-based architecture (design tokens, markdown rules, and SVG assets) required for both human engineers and AI agents to enforce strict brand compliance across all touchpoints. When the MCP server is implemented (Phase II), it will read from this repository to inject brand context into LLMs dynamically.

### What's Missing for Phase II (Active MCP Server)
Currently, `skillit-bds` provides the data blueprints but lacks the software layer to actively serve it. To upgrade this repository into a functional MCP server, the following infrastructure must be built:
1. **Server Runtime:** A script (e.g., Node.js or Python) that actively runs and listens for incoming requests.
2. **The MCP SDK:** The official code library (e.g., `@modelcontextprotocol/sdk`) that implements the protocol.
3. **Resource Mapping:** Code that explicitly registers these markdown files (like `LLM-INSTRUCTIONS.md` and the `tokens/` folder) as formal MCP `resources` or `prompts` so an AI client can query them.
4. **Transport Configuration:** The communication layer (typically `stdio` for local agents) that enables the server and the AI client to talk to each other.

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

Note: Skillit does not use AI image generation. Photography is real, human-captured, and shot on genuine work sites — see `rules/photography.md`.

---

## 📁 Architecture & File Map

```text
skillit-bds/
├── README.md                  # Entry point (you are here)
├── LLM-INSTRUCTIONS.md        # Core system prompt for UI generation
├── HUMAN-INSTRUCTIONS.md      # Plain language brand manual
├── assets/                    # Approved SVG logos and icons (no photography — shot on real sites)
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
| Icon System (core 12, in `assets/icons/`) | Complete — arrow up/down pending |
| Dark Mode Tokens | Planned for Phase II |