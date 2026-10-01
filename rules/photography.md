# Photography & Image Rules — Skillit Kit BDS
**Last updated:** 2026-08-17
---
## The principle
Photography is the brand’s most human element. Every image should make a craft pro feel seen — not as a stock photo prop, not as a demographic data point, but as a skilled professional whose work builds the physical world.

The camera position is always respectful. Never looking down at the worker. Eye level or slightly below.

**Human essence is the organizing visual principle for this brand.** The company was founded by someone who understands craft professionals — someone who keeps the tradition of technical excellence alive. That understanding lives in the work, the hands, the face, the environment. The brand's responsibility is to inject that human essence into every visual surface, not to abstract the person into a data point, a silhouette, or a logo placeholder. Every image should answer the question: does this make the person feel real?

The visual direction is softer and bolder at the same time:
- **Softer** — communicated through the earth tones of projects and people. Canvas ground, iron structure, material-named accent colors. Photography that reads as documentary, not stylized.
- **Bolder** — communicated through the innovative and creative spirit of the product. Large, confident type. Expansive layout moments. Full-screen photography when the image carries the story. A single Traffic Cone accent that signals action without shouting.

The dream — skilled hands finding steady work that recognizes their craft — is ultimately told through people, not product screenshots. Photography and visual assets carry that story.
---
## Hard rules (apply to all images)
These are non-negotiable in all generated image briefs, art direction, and asset usage:
1. **No drop shadows.** Images do not cast shadows onto the background. They sit directly on the surface.
2. **No edge fading or blending.** Images do not fade into the background color. Hard cut only.
3. **No color grading filters.** No Instagram-style color treatment. No dramatic color shifts. Natural color only.
4. **No composite background replacements.** Do not place a worker cut-out onto a fake background. If the background is removed, the worker sits directly on the Canvas ground (`--color-background`) with no environment invented behind them.
5. **Conditional Blend Mode:** Use `multiply` (`mix-blend-mode: multiply;`) only when a photograph sits on a light background and is intended to melt into the Canvas ground. Do not use it on standalone or full-width photography.
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
- Blacks should hit true black. No lifted shadows (no “faded” or “matte” look).
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
- Background: Canvas (`--color-background`) only. Not pure white, not grey.
- Browser chrome: minimal or none. Show the UI, not the browser.
- Data in screenshots should be realistic. Fake or clearly placeholder data (e.g., “John Doe,” “Test Company”) undermines the brand’s credibility.
- Crop tightly to the relevant UI area. Do not show a full screen if the relevant feature is in one panel.
---
## Subject: hardware and materials (macro)
- Physical materials — copper pipe, concrete, rebar, circuit board, tooling — shot close enough to read texture.
- Lighting: flat or diffused. Texture should be visible without dramatic shadows.
- These are used as supporting visual elements, not hero images.
- Background: transparent or flat surface (no environment).
---
## Photography sourcing
Skillit does not use AI generation for photography. All photography is real, human-captured, and sourced from genuine work sites. This is a hard brand lock.
- **No AI-generated images.** Banned universally — no Midjourney, Firefly, DALL-E, Flux, or any generative model output, in any context.
- **When commissioning or briefing a photographer**, use this template to art-direct the shoot:
```
Subject: [describe subject precisely]
Setting: [real job site / flat background / product UI]
Lighting: flat, natural, diffused — no dramatic rim lights or color gels
Framing: [eye level / tight crop / wide environmental]
Style: photorealistic, documentary photography, no filters
Color: natural — no color grading, no vignette
Background: [transparent / Canvas #F7F1ED / Iron #232F36]
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
### File format and technical specs

**Digital:** JPEG (quality ≥85%) or WebP for web performance. Avoid PNG unless transparency is required.

**Print:** TIFF at 300 DPI minimum, CMYK color mode. Convert RGB to CMYK before press.

**Raw:** Keep original RAW files for future edits. Archive with naming convention: `skillit_MMYY_description.jpg`

**Resolution:**
- Hero images: 1200px on the long side minimum
- Crop: 4:3 or 16:9 ratios only
- Web: Serve srcsets for responsive sizes

**Safe zones:**
- Text overlays: 20% padding minimum from edges
- Logos: 1/8 of logo height (12.5%) from all edges
- Never crop faces tighter than above the temples

**Aspect ratios:**

|| Context | Ratio | Notes |
||---|---|---|---|
|| Hero | 16:9 or 4:3 | Desktop and mobile hero |
|| Thumbnails | 1:1 square | Grid cards |
|| Social (feed) | 16:9, 4:5, 1:1 | Channel-specific |
|| Social (Stories) | 9:16 | Vertical crop allowed |
|| Print | Per template | No vertical |

**DPI for print:**

|| Context | DPI | Definition |
||---|---|---|
|| Regular format | 300 DPI | Up to A3 / 11×17 in (Letter, A4, brochures, magazines) |
|| Large format | 150 DPI | A2+ / poster, banner (viewed from 3+ ft away) |

|| Use | Format | Resolution | Notes |
||---|---|---|---|
|| Web (hero, sections) | WebP or JPG | 72dpi, max 200KB | Optimize for load speed |
|| Web (retina) | WebP or JPG | 144dpi (2x) | Use `srcset` for serving |
|| App (worker portraits) | WebP | 72dpi, max 80KB | Mobile-first, small file |
|| Print | TIFF or PSD | 300dpi minimum | CMYK color mode |
||| Isolated portraits | PNG | 72dpi (web) / 300dpi (print) | Transparent alpha channel |
||| Social (square) | JPG or PNG | 1080×1080px | No text in bottom 20% (Instagram crop safe zone) |
||| Social (story) | JPG or PNG | 1080×1920px | Keep subject in center 80% of height |

### Video formats

**Source:** Real job sites only. No AI-generated footage, no stock video, no composites. Same photography rules apply — eye level or below, natural light, no color grading filters.

**Editing:** MOV or ProRes 422 for master files. No heavy post-processing. Natural color only.

**Publishing:**

| Use | Format | Codec | Resolution | Notes |
| --- | --- | --- | --- | --- |
| Web (hero, sections) | MP4 | H.264 | 1920×1080 (1080p) minimum | Max 25MB. Compress for load speed. |
| Social (feed) | MP4 | H.264 | 1920×1080 or 1080×1080 | Add captions — most viewers watch muted. |
| Social (Stories/Reels) | MP4 | H.264 | 1080×1920 (9:16) | Vertical crop. Keep subject in center 80% of height. |
| Archive | MOV | ProRes 422 | Original resolution | Keep master files for future edits. |

**Aspect ratios:**
- Hero and marketing: 16:9 or 4:3
- Social feed: 16:9 or 1:1
- Stories/Reels: 9:16

**Audio:** Capture clean ambient audio from the job site. No added music unless it was present at the scene. Voiceover, if needed, recorded in a quiet environment — direct, conversational, no broadcast polish.

**Text overlays:** Follow the same safe zones as photography — 20% padding from edges, Iron filter at 50% opacity for legibility.

**Naming convention:** `skillit_MMYY_description.mp4`
