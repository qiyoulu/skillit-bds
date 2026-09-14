# Procore Brand System — Distilled

## Architecture

Two-tier system, cleanly separated:

| Layer | URL | Purpose | Tech |
|---|---|---|---|
| **Brand** | `brand.procore.com` | Marketing site, campaigns, partner portal, press kit | Contentful + Vercel |
| **Product (CORE)** | `core.procore.com` | Design system, component docs, app UI patterns | In-house (React/SCSS) |

This split lets marketing move fast without touching the product codebase.

---

## Identity

**Tagline:** "Build Together" — collaborative, platform-level narrative. The structural logic for all campaigns.

**Typeface:** Procore Sans (custom) — bold, sturdy construction presence with modern tech edge. Lowercase wordmark for approachability.

**Color:** HSL-based stepped lightness system. Primary orange (#ff5200) at ~50 lightness, with `orange10` through `orange98` for washes, surfaces, and tints.

**Design language:** Rigid grids meet earthy textures. Fluid type expressions meet dynamic motion. Balances modernity and humanity.

---

## What Skillit can borrow

| Procore move | Skillit application |
|---|---|
| Custom typeface (Procore Sans) | Not urgent — Work Sans is strong. Long-term: consider Skillit Sans at Series B/C |
| Tagline as narrative spine | "Scale Your Craft" should organize all page sections and campaigns |
| Two-tier architecture | Keep marketing (Squarespace/Contentful) separate from product (Rails) |
| HSL stepped palette | Skillit's current hex system works; HSL is cleaner for generative tints |
| CORE as separate docs | Skillit-BDS is already separate from the Rails app — same pattern |
| Modular campaign playbook | BDS components (sections, cards, grids) are the campaign building blocks |
| Contentful + Vercel | Skillit: Contentful + Squarespace (now), Contentful + Rails (later) |

---

## Key principles (stated and implied)

1. **The product is the brand** — CORE is not a style guide; it's the working system that ships. Skillit-BDS should be the same.

2. **Separate content from presentation** — Contentful holds the content; the frontend (Squarespace, then Rails) renders it. Skillit is moving to this model.

3. **One tagline, many expressions** — "Build Together" becomes a campaign platform, not just a headline. "Scale Your Craft" should do the same.

4. **Accessibility is non-negotiable** — All color combinations meet AA. Skillit-BDS already documents contrast ratios; enforce them.

5. **Design system = engineering product** — CORE has version numbers, release notes, migration guides. Skillit-BDS should version the same way.

---

## What to avoid

- **Concatenated class names** (`sm-bold--primary`) — Procore's old pattern. Skillit's composable tokens are better.
- **Over-tiering** — Procore's product type scale tops out at 22px. Marketing needs display scale (128px). Don't conflate the two.
- **Decorative hexagons** — If the hexagon appears, it means something. Procore uses it structurally; Skillit should too.

---

## Files referenced

- `brand.procore.com` — Brand portal (logos, guidelines, campaigns, press)
- `core.procore.com` — Product design system (components, layouts, patterns, styles)
- `assets.ctfassets.net/.../Partner_Communication_Toolkit.pdf` — Partner brand guidelines PDF
