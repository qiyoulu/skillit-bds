# Legacy icons — deprecated compatibility archive

**Last updated:** 2026-10-08

This folder preserves earlier icon filenames and artwork for consumers that need a staged migration to Skillit BDS v1.2. New work uses the 90 canonical SVGs directly under `assets/icons/`.

## What is preserved

- 75 files copied byte-for-byte from the pre-v1.2 naming/artwork migration snapshot, including later v1.1-era additions. This is not a snapshot of only the earliest v1.1 version-bump commit.
- `manifest.json` records all 75 legacy filenames, canonical migration targets, provenance, and SHA-256 hashes. Validation rejects missing, modified, unlisted, or invalid archive entries.

## How to use it

An existing consumer must explicitly select this directory. For example, replace the old `assets/icons/search.svg` path with `assets/icons/legacy/search.svg`, or point an old-version icon resolver at the copied legacy directory. In Rails, copy these files into the consumer-owned `app/assets/images/bds/icons/legacy/` folder and adjust its resolver or image paths there. This repository does not deploy that change.

**Moving files into `legacy/` does not make old root paths work automatically.** There are no automatic redirects or root-level aliases. The archive provides an explicit compatibility source while engineering migrates callers.

## Reused IDs

- `legacy/phone.svg` preserves the old mobile-device drawing. Canonical `phone.svg` is the new handset; the current equivalent of the old mobile drawing is `device-phone-mobile.svg`.
- `legacy/user-circle.svg` preserves the old round-cropped avatar. Canonical `user-circle.svg` is the new enclosed-circle avatar; the current equivalent of the old drawing is `user-round.svg`.

## Archive rules

Do not normalize, recolor, regenerate, or redesign these files. Their original paint and geometry are intentional archival content, not current styling recommendations. Use the current assets for new UI. Exclude this folder from the canonical inventory and fresh-export normalization; no recursive normalization or wildcard asset replacement.

Review the [canonical naming/migration guide](../../../components/icons.md#naming-and-migration). Migrate canonical paths, Figma names, renderer IDs, copied assets, and tests together. Removing this archive requires a separately announced major-version migration; v1.2 adds it without a removal date.
