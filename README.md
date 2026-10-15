# Skillit brand guide
**Version:** v1.2 · **Last updated:** 2026-10-08 · [Release notes](./releases/v1.2.md)

Use these files when you write, present, design, or build something for Skillit.

- [Everyone else: download the guide and assets](#for-everyone-else).
- [Engineering: setup, integration, and verification](#for-the-engineering-team).

## For everyone else

### Get the files

1. On the GitHub repository page, choose **Code → Download ZIP**. Repository access is required.
2. Unzip the download.
3. Open `HUMAN-INSTRUCTIONS.md` for the plain-language brand guide.
4. Use the supplied files in `assets/logo/` and `assets/icons/`. Choose current files, not the legacy folder; ask design if you are unsure which asset to use.

### Use an AI tool

Upload [the AI instructions](./LLM-INSTRUCTIONS.md), [the brand guide](./HUMAN-INSTRUCTIONS.md), and any references needed for your task. If your tool can read local files, point it at the downloaded folder instead. Ask:

> Follow the attached Skillit brand rules when creating this. Keep the language plain, use approved artwork, and flag any information you cannot verify.

Review the result before sharing it. AI cannot approve a claim or replace a brand review.

## For the engineering team

### Get a local copy

Git and repository access are required. Clone the engineering mirror:

```bash
git clone https://github.com/skillit-eng/skillit-bds.git
cd skillit-bds
```

This is a specification and asset repository, not an application. There is no application installation or build step.

### Pull updates

Run only inside your BDS clone. Commit or stash local edits first, and confirm the remote points to the BDS repository you intend to track.

```bash
git remote -v
git status
git switch main
git pull --ff-only origin main
```

### Integration points

- Canonical design values: `tokens/tokens.json5`.
- CSS and Tailwind exports: `tokens/generated/tokens.css` and `tokens/generated/tailwind-theme.js`.
- Component specifications: [`components/`](./components/README.md) (start with the index).
- Approved artwork: `assets/icons/` and `assets/logo/`.

Consumer applications own their stylesheets, components, and copied assets. Review and adopt changes in those repositories. Do not copy application-specific CSS into the BDS or merge BDS history into an application repository. Updating this repository does not deploy an application.

### Icons and migration

The [icon guide](./components/icons.md#naming-and-migration) covers **90 canonical icons** and the previous-to-current ID map. Matching Heroicons names does not automatically redirect a Heroicons helper to Skillit artwork.

The [legacy archive](./assets/icons/legacy/README.md) contains **75 frozen icons**. Consumers must explicitly select its folder or copied resolver; old root paths are not automatically restored. Do not normalize or redraw archived files.

After fresh icon exports, preview eligible paint replacements before applying them:

```bash
ruby scripts/normalize_icon_colors.rb --dry-run
ruby scripts/normalize_icon_colors.rb
```

Use `--backup-dir /path/to/backup` to retain changed originals. The normalizer preserves geometry and contrasting multicolor layers. Complex paints are skipped for review. `--check` exits 1 when conversion is needed and 2 for invalid input.

For AI-assisted implementation, read [LLM-INSTRUCTIONS.md](./LLM-INSTRUCTIONS.md) and the relevant references. Exact values come from `tokens/tokens.json5`. Project guidance does not override an agent’s system instructions.

### Verification

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

Tests cover design-value consistency, documentation, components, assets, and the legacy archive. Logo export parity depends on the installed browser build. Passing tests does not establish accessibility conformance for a deployed page; see the [requirements and known limitations](./rules/accessibility.md).
