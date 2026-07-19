# Asset Inventory

Tracks the source and license of every non-placeholder binary asset checked
into this repository.

| Asset | Source | License / Notes |
|---|---|---|
| `public/fonts/Inter-Variable.woff2` | Downloaded from Google Fonts (`fonts.gstatic.com`), variable weight axis 300–700 | SIL Open Font License 1.1 — free for commercial self-hosted use |
| `public/fonts/Sora-Variable.woff2` | Downloaded from Google Fonts (`fonts.gstatic.com`), variable weight axis 400–800 | SIL Open Font License 1.1 — free for commercial self-hosted use |
| `public/images/og/default-og.jpg` | Generated locally from an inline SVG via `scripts/generate-og-image.mjs` (Sharp) | Original artwork created for this project; safe to reuse/edit freely |
| `public/favicon.svg` | Hand-authored inline SVG ("JC" mark on brand navy) | Original artwork created for this project |

## Explicitly not used

No images, icons, or copy assets were downloaded or hotlinked from the
existing jirehcooler.com production site. The old site's sitemap only
exposed the homepage, privacy policy, and terms pages, and no clearly
reusable, company-owned image files were identified during the audit. All
imagery on the new site is either a generated placeholder (see
`ASSETS_NEEDED.md`) or original artwork listed above.

## Icons

All UI icons (`src/components/Icon.astro`) are hand-authored inline SVG line
icons built from basic primitives, created specifically for this project.
They are not sourced from any third-party icon library, so there are no
license obligations.
