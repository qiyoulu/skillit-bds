# Photography & Image Rules — Skillit BDS

**Last updated:** 2026-07-10

---

## The principle

Photography is the brand’s most human element. Every image should make a craft worker feel seen — not as a stock photo prop, not as a demographic data point, but as a skilled professional whose work builds the physical world.

The camera position is always respectful. Never looking down at the worker. Eye level or slightly below.

---

## Hard rules (apply to all images)

These are non-negotiable in all generated image briefs, art direction, and asset usage:

1. **No drop shadows.** Images do not cast shadows onto the background. They sit directly on the surface.

2. **No edge fading or blending.** Images do not fade into the background color. Hard cut only.

3. **No color grading filters.** No Instagram-style color treatment. No dramatic color shifts. Natural color only.

4. **No composite background replacements.** Do not place a worker cut-out onto a fake background. If the background is removed, the worker sits directly on a flat brand color (`--color-bg` Canvas or `--color-fg` Iron) with no environment invented behind them.

5. **Universal Blend Mode:** All photography must use the `multiply` CSS blend mode (`mix-blend-mode: multiply;`). Because the primary brand ground is Canvas (`#FAF7F3`), this universally drops out lighter backgrounds and melts every photograph perfectly into the layout. This creates a flawless, borderless editorial look across the entire system.

---

## Subject: worker portraits

### What to capture
- Skilled workers doing skilled work. Hands matter — show them being used.
- Real job sites: concrete, steel, dirt, equipment. Not sanitized studio environments.
- Candid and dignified. Not posed and stiff.
- Eye contact with camera is fine — it’s direct and human. Not required.
- Diverse trades: ironworkers, welders, carpenters, electricians, pipefitters, heavy equipment operators.

### Framing
- Eye level or slightly below. Never looking down at the worker.
- Subject fills the frame — workers are not small figures in a large environment.
- Tight crop on face or hands for portrait use. Wider for context shots.
- Leave room for text overlay only if the brief calls for it — confirm before shooting.

### Lighting
- Flat, natural, or diffused lighting only.
- Outdoor: overcast preferred. Harsh direct sun is acceptable if it reads as authentic job-site light — not as a dramatic effect.
- No studio rim lights. No gels. No dramatic fill ratios.
- Blacks must hit true black. No lifted shadows (no “faded” or “matte” look).

### What to avoid
- Stock photo aesthetics: unnatural poses, fake smiles, obvious casting.
- “Tech company” framing: workers in front of laptops, in conference rooms, in business casual.
- Safety theater: helmets and vests that are clearly costume, not work gear.
- Any framing that reduces the worker to a problem to be solved rather than a professional to be respected.

---

## Subject: job site environments

- Raw materials and built environments: concrete pours, steel frameworks, finished structures.
- Scale that conveys ambition: wide shots that show how big the work is.
- Process over result: workers mid-task is more authentic than a finished building.
- Color grading: none. The site’s natural palette is already part of the brand (concrete, rust, iron, earth).

---

## Subject: product screenshots / UI

- Capture at `2x` resolution (retina). Always.
- Background: Canvas (`--color-bg`) only. Not pure white, not grey.
- Browser chrome: minimal or none. Show the UI, not the browser.
- Data in screenshots must be realistic. Fake or clearly placeholder data (e.g., “John Doe,” “Test Company”) undermines the brand’s credibility.
- Crop tightly to the relevant UI area. Do not show a full screen if the relevant feature is in one panel.

---

## Subject: hardware and materials (macro)

- Physical materials — copper pipe, concrete, rebar, circuit board, tooling — shot close enough to read texture.
- Lighting: flat or diffused. Texture should be visible without dramatic shadows.
- These are used as supporting visual elements, not hero images.
- Background: transparent or flat surface (no environment).

---

## Generating image briefs for AI image tools

When prompting an image generation tool (Midjourney, Firefly, DALL-E, etc.) for Skillit assets, use this template:

```
Subject: [describe subject precisely]
Setting: [real job site / flat background / product UI]
Lighting: flat, natural, diffused — no dramatic rim lights or color gels
Framing: [eye level / tight crop / wide environmental]
Style: photorealistic, documentary photography, no filters
Color: natural — no color grading, no vignette
Background: [transparent / Canvas #FAF7F3 / Iron #232F36]
Avoid: stock photo aesthetics, posed expressions, fake environments, rounded edges, drop shadows, color filters
```

**Example brief:**
> Subject: Hispanic ironworker, early 30s, installing rebar on a concrete deck, looking at the camera
> Setting: active construction site, overcast daylight
> Lighting: flat, natural, overcast — no shadows from direct sun
> Framing: eye level, medium close-up, subject fills 60% of frame
> Style: photorealistic, documentary, no filters
> Color: natural — no color grading
> Background: real site environment (not removed)
> Avoid: stock photo aesthetics, safety theater, posed or stiff body language

---

## File format and technical specs

| Use | Format | Resolution | Notes |
|---|---|---|---|
| Web (hero, sections) | WebP or JPG | 72dpi, max 200KB | Optimize for load speed |
| Web (retina) | WebP or JPG | 144dpi (2x) | Use `srcset` for serving |
| App (worker portraits) | WebP | 72dpi, max 80KB | Mobile-first, small file |
| Print | TIFF or PSD | 300dpi minimum | CMYK color mode |
| Isolated portraits | PNG | 72dpi (web) / 300dpi (print) | Transparent alpha channel |
| Social (square) | JPG or PNG | 1080×1080px | No text in bottom 20% (Instagram crop safe zone) |
| Social (story) | JPG or PNG | 1080×1920px | Keep subject in center 80% of height |
