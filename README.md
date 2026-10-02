# Skillit Kit Brand Design System (BDS)

**Version:** v1.1

**Upstream:** `qiyoulu/skillit-bds`

This repository is the canonical specification for Skillit’s brand: design tokens, visual rules, and copy guidelines for people and AI agents.

It is not an application or an automatic deployment system. Marketing, product, presentations, and generated output should use this specification; each implementation must adopt and verify the relevant rules.

---

## For the Engineering Team

This repository defines the intended visual rules for the Rails application. Rails keeps its implementation separately; a BDS update does not change the app automatically.

### Integration Points

- **Tailwind config:** `skillit-eng/skillit-rails` contains the `skillit` color namespace in [`config/tailwind.config.js` on `main`](https://github.com/skillit-eng/skillit-rails/blob/main/config/tailwind.config.js). The reusable theme export in this BDS is `tokens/generated/tailwind-theme.js`.
- **Rails tokens and assets:** Rails’ onboarding styles live in `app/assets/stylesheets/onboarding.css`. Copied BDS SVGs live in `app/assets/images/bds/icons/` and `app/assets/images/bds/logo/`; `app/components/` contains ViewComponents, not the SVG export directory.
- **Adoption status:** The Rails foundation references an older BDS snapshot and is not fully synchronized with the current tokens. Engineering must review and apply updates in the Rails repository.
- **Implementation targets:**
  - Marketing site: Squarespace, with custom CSS and header/footer code injection maintained outside this repository in `workspace/squarespace/`.
  - Product app: Rails 7.2 with `tailwindcss-rails`.

### Pulling Updates

Run these commands **only inside a local clone of `skillit-bds`**, not `skillit-rails`. Replace the example path with your actual clone location. Check that `origin` points to the BDS repository you intend to track, and commit or stash local edits before switching branches or pulling.

```bash
cd /path/to/skillit-bds
git remote -v
git status
git switch main
git pull --ff-only origin main
```

These commands update the BDS clone. They do not install tokens in Rails or deploy Squarespace overrides. Never merge BDS repository history into the Rails repository; adopt tokens and assets through that project’s review workflow.

---

## For Everyone Else

You can use these guidelines with an AI agent that can read local files or accept uploaded documents.

### Step 1: Get the Rules

**Without git:**

1. Click the green **Code** button on this page.
2. Click **Download ZIP**.
3. Unzip the file; use the actual extracted folder name rather than assuming it is `skillit-bds`.
4. Point your AI agent to `LLM-INSTRUCTIONS.md` inside that folder. Replace the placeholder with the actual path, or upload the file if your agent cannot read local files:

```text
Read <path-to-extracted-folder>/LLM-INSTRUCTIONS.md and use it as the project instructions for this task. Read the relevant reference files and canonical tokens before generating output.
```

**With git:**

```bash
git clone https://github.com/qiyoulu/skillit-bds.git
```

Ask your agent to start with `skillit-bds/LLM-INSTRUCTIONS.md`, then read the reference files relevant to the task. These are project instructions, not a replacement for the agent’s system instructions.

### Step 2: Ask for What You Need

Examples:

- “Write homepage copy for Skillit following the brand voice”
- “Create a LinkedIn post about craft worker hiring”
- “Design a button component using the Skillit color tokens”
- “Review this copy and check it follows the brand guidelines”

### Step 3: Check the Output

Review the output against the relevant rules; supplying instructions does not guarantee compliance. If something looks off, identify the mismatch:

- “That doesn’t match the brand colors”
- “The tone is too casual — make it more like an industry veteran”
- “Use sentence case, not title case”

### What This Repo Defines

- **Colors:** Eight base colors with meaning-scoped roles, plus matching hover variants. Checkbox, radio, and selection-chip control paint uses Traffic Cone, not Bottle Glass: unselected radio/chip outlines and selected fills are orange. Keep chip pills Plaster with Iron text; the contrasting inner check glyph is Iron (4.5443:1 on Cone), not Canvas (2.6958:1). Focus rings also use Cone. Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. All toast types use Plaster bodies with Iron text and their semantic icon color; close controls use Iron with Traffic Cone focus. Toast bodies remain static 16px-corner feedback panels, not actions; only close/link controls are actionable. No colored success/error/warning toast-background exception remains. Charts may use Cone alongside Painter’s Tape and other canonical palette colors for purposeful categories with legends or direct labels and non-color cues; monochromatic is a default, not exclusive.
- **Typography:** Work Sans for people, JetBrains Mono for data.
- **Voice:** Direct, unhedged, no tech jargon.
- **Layout:** 16px corners on cards, pill buttons, no shadows.
- **Accessibility:** Minimum contrast ratios, 40px touch targets. Default focus is 2px Traffic Cone with 2px offset; Cone/Canvas is 2.6958:1 (below 3:1), Cone/Plaster is 3.0177:1 (meets the UI floor). Keep orange, document the Canvas exception without an AA claim or quiet Iron substitution, preserve forced-colors native focus, and check actual rendered surfaces and controls.
- **Icons:** SVG icons in `assets/icons/` use `currentColor` fills (tintable via host CSS color). Semantic status icons use error = Toolbox red (`--color-error`), warning = Hard Hat yellow (`--color-warning`), success = Bottle Glass green (`--color-success`), info = Painter’s Tape blue (`--color-link`). Noninteractive does not mean neutral: only nonsemantic utility icons and completed progress use Iron. Status-glyph runtime props select meaning and host CSS token color, never hardcoded asset paint; retain supplied silhouettes (success circle, warning triangle, error octagon, info help glyph) with labels. Hard Hat icons on Plaster are 1.8229:1 and on Canvas 1.6285:1, below the 3:1 graphical floor; retain yellow with triangle + label, document the limitation, and do not darken the palette or claim AA. Toolbox, Bottle Glass, and Painter’s Tape icons on Plaster meet 3:1; check each actual surface. Shape and label do not fix contrast.

### Common Mistakes to Watch For

| Wrong | Right |
| --- | --- |
| “We think construction workers deserve better tools” | “Construction workers deserve better tools” |
| “AI-powered talent acquisition platform” | “Getting the right worker to the right job site” |
| Using 15 colors | Using only the 8 defined colors |
| All-caps headers | Sentence case everywhere |
| Drop shadows | No drop shadows |

---

## For AI Agents

**Read [`LLM-INSTRUCTIONS.md`](./LLM-INSTRUCTIONS.md) first as the project instructions.** Within this repository, it governs behavioral rules for generated code, design, copy, and data visualization; `tokens/tokens.json5` remains authoritative for token values. It does not override the agent’s system instructions.

Read `HUMAN-INSTRUCTIONS.md` and the relevant files under `tokens/`, `rules/`, `components/`, `brand/`, and `voice/` for detailed specifications, examples, and rationale. Do not substitute a prose example for a canonical token value.

Token values live in `tokens/tokens.json5` — the single source of truth. Reference variables, never hex.

Note: Skillit does not use AI image generation. Photography is real, human-captured, and shot on genuine work sites — see `rules/photography.md`.

---

## File Map

```text
skillit-bds/
├── README.md                  # Entry point (you are here)
├── LLM-INSTRUCTIONS.md        # AUTHORITATIVE constraint set for AI agents — read first
├── HUMAN-INSTRUCTIONS.md      # Plain-language brand manual (rationale and reference)
├── assets/
│   ├── icons/                  # SVG icons (currentColor fills)
│   └── logo/                   # Skillit logo variants (PNG, SVG)
├── tokens/
│   ├── tokens.json5           # Single source of truth (machine-readable)
│   ├── docs/                  # Human-readable specs
│   │   ├── color.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   ├── logo.md
│   │   └── motion.md
│   └── generated/             # Derived outputs (keep in sync with json5)
│       ├── tokens.css
│       └── tailwind-theme.js
├── voice/                     # Brand voice guidelines and copy examples
├── rules/                     # Layout, accessibility, photography, data-viz, iconography
├── components/                # Structural UI definitions
│   ├── badges.md
│   ├── buttons.md
│   ├── cards.md
│   ├── checkboxes.md
│   ├── email.md
│   ├── footer.md
│   ├── forms.md
│   ├── icons.md
│   ├── links.md
│   ├── metadata.md
│   ├── modal.md
│   ├── navigation.md
│   ├── progress.md
│   ├── quote-cards.md
│   ├── states.md
│   ├── toast.md
│   └── validation.md
├── brand/                     # Brand strategy, narrative, and audience profiles
│   ├── strategy.md
│   ├── narrative.md
│   └── audience.md
└── scripts/
    ├── lint.mjs               # Canonical and artifact checks
    ├── validate.mjs           # Current canonical consistency
    ├── css-checks.mjs         # Shared static CSS checks
    ├── css-checks.test.mjs
    ├── lint.test.mjs
    ├── test-browser.py        # Rendered token and documentation checks
    ├── test-components.py     # Rendered component and icon checks
    ├── test-instructions.py   # Instruction and approved-export checks
    ├── export-logo-pngs.py    # Reproducible 512px-height logo exports
    └── smart_quotes.rb
```

---

## Verification

Run from the repository root:

```bash
node scripts/validate.mjs
node --test scripts/*.test.mjs
uv run --with playwright --with json5 python scripts/test-browser.py
uv run --with tinycss2 --with playwright python scripts/test-components.py
uv run --with json5 --with pillow python scripts/test-instructions.py
uv run --with playwright python scripts/export-logo-pngs.py --check
```

The Node checks have no package dependencies. Browser checks use an installed Chromium browser; set `BDS_BROWSER_BIN` to its executable path if it is not detected, or install Playwright’s Chromium browser. `uv run` supplies the Python test dependencies without changing the repository environment.

The validator checks current token and documentation consistency, not historical fixed values. Regression fixtures exercise both accepted and rejected input. Browser checks verify computed token values, hover expressions, optical alignment, native control states, modal positioning, header alignment, progress, quotes, and icon masks. Instruction checks cover links and approved export colors/sizes. Regenerate logo PNGs from the approved SVGs with `uv run --with playwright python scripts/export-logo-pngs.py`; `--check` verifies without writing and compares against the installed Chromium build’s rendering. A clean static check does not establish accessibility conformance for a deployed page.

---

## Coverage

These labels describe repository content, not deployment status or certification. Accessibility rules include documented brand exceptions; passing the repository checks does not prove a deployed page meets WCAG.

| Area | Repository coverage |
| --- | --- |
| `tokens/` (Color, Type, Spacing, Motion, Logo) | Documented; derived CSS and Tailwind exports provided |
| `voice/` (Brand Voice, Copy) | Rules and examples provided |
| `rules/accessibility.md` | Requirements and contrast exceptions documented |
| `rules/layout.md` | Documented |
| `rules/data-viz.md` | Documented |
| `rules/photography.md` | Documented |
| `brand/` (Strategy, Narrative, Audience) | Documented |
| Icon System (`assets/icons/`) | SVG assets and usage rules provided |
| Dark Mode Token Overrides | Not implemented |
