# Skillit Brand Design System (BDS)

**Version:** v1.0  
**Upstream:** `qiyoulu/skillit-bds`

This repository is the machine-readable source for Skillit's brand — design tokens, visual rules, and copy guidelines in a form that both people and AI agents can read and enforce.

It is not an application. It is the single source of truth that drives every Skillit touchpoint: marketing site, product app, presentations, and AI-generated output.

---

## For the Engineering Team

This repository controls the visual parameters for the main Rails application.

### Integration Points

- **Tailwind Config:** The core theme extension lives in `skillit-rails` → `config/tailwind.config.js` (on the `brand/design-system` branch) under the `skillit` namespace.
- **SVG Assets:** Exported to `skillit-rails` → `app/components/`.
- **Two Targets:**
  - Target A: Marketing Site (Squarespace — visual specs only, no code).
  - Target B: Product App (Rails 7.2 with tailwindcss-rails).

### Pulling Updates

```bash
git remote add upstream https://github.com/qiyoulu/skillit-bds.git
git fetch upstream
git merge upstream/main
```

---

## For Everyone Else

You don't need to be technical to use this system with any AI agent.

### Step 1: Get the Rules

**Without git:**

1. Click the green **Code** button on this page.
2. Click **Download ZIP**.
3. Unzip the file.
4. Point your AI agent to the unzipped folder:

```
Read the Skillit brand rules in Downloads/ (or wherever you unzipped the folder) and follow them exactly.
```

**With git:**

```bash
git clone https://github.com/qiyoulu/skillit-bds.git
```

### Step 2: Ask for What You Need

Examples:

- "Write homepage copy for Skillit following the brand voice"
- "Create a LinkedIn post about craft worker hiring"
- "Design a button component using the Skillit color tokens"
- "Review this copy and check it follows the brand guidelines"

### Step 3: Check the Output

Your AI agent will follow the rules in this repository. If something looks off, just say:

- "That doesn't match the brand colors"
- "The tone is too casual — make it more like an industry veteran"
- "Use sentence case, not title case"

### What Your AI Agent Knows from This Repo

- **Colors:** Only 8 colors, each with one job.
- **Typography:** Work Sans for people, JetBrains Mono for data.
- **Voice:** Direct, unhedged, no tech jargon.
- **Layout:** 16px corners on cards, pill buttons, no shadows.
- **Accessibility:** Minimum contrast ratios, 40px touch targets.

### Common Mistakes to Watch For

| Wrong | Right |
| --- | --- |
| "We think construction workers deserve better tools" | "Construction workers deserve better tools" |
| "AI-powered talent acquisition platform" | "Getting the right worker to the right job site" |
| Using 15 colors | Using only the 8 defined colors |
| All-caps headers | Sentence case everywhere |
| Drop shadows | No drop shadows |

---

## For AI Agents

When tasked with generating code, copywriting, or UI components, follow the rules in this repository exactly.

### Hard Constraints

- **Colors:** Use defined tokens only. No raw hex codes in output.
- **Typography:** Work Sans for all human text. JetBrains Mono for metadata and code blocks. Sentence-case UI.
- **Voice:** "Industry veteran." No tech jargon, hype, or hedging.
- **Geometry:** 16px radius for structural elements; 9999px (pill) for buttons.

Note: Skillit does not use AI image generation. Photography is real, human-captured, and shot on genuine work sites — see `rules/photography.md`.

---

## File Map

```text
skillit-bds/
├── README.md                  # Entry point (you are here)
├── LLM-INSTRUCTIONS.md        # System prompt for AI agents
├── HUMAN-INSTRUCTIONS.md      # Plain-language brand manual
├── assets/                    # Approved SVG logos and icons
├── tokens/
│   ├── tokens.json5           # Single source of truth (machine-readable)
│   ├── docs/                  # Human-readable specs
│   │   ├── color.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   └── logo.md
│   └── generated/             # Derived outputs (keep in sync with json5)
│       ├── tokens.css
│       └── tailwind-theme.js
├── voice/                     # Brand voice guidelines and copy examples
├── rules/                     # Layout, accessibility, photography, data-viz
├── components/                # Structural UI definitions
│   ├── buttons.md
│   ├── navigation.md
│   ├── forms.md
│   ├── badges.md
│   ├── cards.md
│   ├── links.md
│   ├── footer.md
│   ├── metadata.md
│   ├── icons.md
│   └── states.md
├── brand/                     # Brand narrative and audience profiles
│   ├── narrative.md
│   └── audience.md
└── scripts/
    ├── validate.mjs
    └── smart_quotes.rb
```

---

## Status

| Component | Status |
| --- | --- |
| `tokens/` (Color, Type, Spacing) | Complete |
| `voice/` (Brand Voice, Copy) | Complete |
| `rules/accessibility.md` | Complete |
| `rules/layout.md` | Complete |
| `rules/data-viz.md` | Complete |
| `rules/photography.md` | Complete |
| `brand/` (Narrative, Audience) | Complete |
| Icon System (core 12, in `assets/icons/`) | Complete |
| Dark Mode Tokens | Planned |
