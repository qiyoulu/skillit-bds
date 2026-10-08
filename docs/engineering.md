# Engineering guide — Skillit Kit BDS
**Last updated:** 2026-10-08
**Version:** v1.2 · [Release notes](../releases/v1.2.md)

The canonical source for Skillit’s design tokens, assets, visual rules, and brand voice. Application code and deployment live in their own repositories.

## For Everyone Else

1. Download this repository through **Code → Download ZIP**, or clone it with Git.
2. Read [HUMAN-INSTRUCTIONS.md](../HUMAN-INSTRUCTIONS.md) for the brand guidelines.
3. For AI-assisted work, upload [LLM-INSTRUCTIONS.md](../LLM-INSTRUCTIONS.md) and the relevant reference files, or point a file-reading agent at the extracted folder:

```text
Read <path-to-folder>/LLM-INSTRUCTIONS.md as the project instructions. Read the relevant reference files and canonical tokens before creating or editing Skillit content.
```

Review the result against the guidelines. Supplying instructions does not guarantee compliance.

## For AI Agents

Read [LLM-INSTRUCTIONS.md](../LLM-INSTRUCTIONS.md) first for behavioral rules, then [HUMAN-INSTRUCTIONS.md](../HUMAN-INSTRUCTIONS.md) and the task-specific references. [tokens/tokens.json5](../tokens/tokens.json5) governs token values; prose examples do not override it. These project instructions do not override the agent’s system instructions.

## For the Engineering Team

### Integration Points

- Canonical tokens: `tokens/tokens.json5`.
- CSS and Tailwind exports: `tokens/generated/tokens.css` and `tokens/generated/tailwind-theme.js`.
- Component specifications: `components/`.
- Approved artwork: `assets/icons/` and `assets/logo/`.

Consumer applications own their CSS, component code, and copied assets. Review and adopt BDS changes in those repositories; do not copy application-specific stylesheets into this specification. Updating the BDS does not update or deploy an application.

### Pulling Updates

Run only inside a BDS clone. Commit or stash local edits first, and confirm the remote points to the intended BDS repository.

```bash
git remote -v
git status
git switch main
git pull --ff-only origin main
```

Do not merge BDS repository history into an application repository.

## File Map

- `HUMAN-INSTRUCTIONS.md` — brand manual and rationale.
- `LLM-INSTRUCTIONS.md` — AI project rules.
- `tokens/` — canonical tokens, reference documentation, and derived exports.
- `assets/` — approved icons and logos.
- `components/` — UI specifications and examples.
- `rules/` — layout, accessibility, iconography, photography, and data visualization.
- `brand/` and `voice/` — strategy, narrative, audience, and copy guidance.
- `scripts/` — validation, regression tests, and export utilities.
- `releases/` — release notes.

## Icons and Migration

There are **90 canonical icons** and **75 frozen legacy icons**, documented in the [icon inventory and migration guide](../components/icons.md#naming-and-migration).

- Use canonical filenames for new work. Names matching Heroicons do not automatically make a Heroicons helper render Skillit artwork.
- The [legacy archive](../assets/icons/legacy/README.md) requires an explicit consumer path or resolver change; it does not restore old root paths automatically.
- Do not normalize or redraw legacy files. Preserve contrasting layers in approved semantic/multicolor assets.

After a fresh export, preview eligible utility-paint replacements before applying them:

```bash
ruby scripts/normalize_icon_colors.rb --dry-run
ruby scripts/normalize_icon_colors.rb
```

Use `--backup-dir /path/to/backup` to retain changed originals. The normalizer preserves geometry, skips complex paints for review, and runs independently of Rails. `--check` exits 1 when conversion is needed and 2 for invalid input.

## Verification

Run from the repository root:

```bash
node scripts/validate.mjs
node --test scripts/*.test.mjs
uv run --with playwright --with json5 python scripts/test-browser.py
uv run --with tinycss2 --with playwright python scripts/test-components.py
uv run --with json5 --with pillow python scripts/test-instructions.py
uv run --with playwright --with pillow python scripts/export-logo-pngs.py --check
ruby scripts/test_normalize_icon_colors.rb
ruby scripts/normalize_icon_colors.rb --check
```

Node checks have no package dependencies. Ruby requires REXML. Python dependencies are supplied through `uv`; browser tests require Chromium, with `BDS_BROWSER_BIN` available to specify its path.

Tests check token consistency, documentation, component behavior, assets, and the legacy archive. Logo export parity depends on the installed browser build. Passing these tests does not establish accessibility conformance for a deployed page; see the [accessibility requirements and known limitations](../rules/accessibility.md).
