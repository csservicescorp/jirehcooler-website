# Project Architecture

## Stack

- **Astro** (static output, `output: 'static'`) — every page is prerendered
  to plain HTML at build time. No server runtime is required to host the
  site itself.
- **TypeScript** in strict mode for all components and page frontmatter.
- **Astro Content Collections** (Content Layer API, `glob()` loader) for
  structured, CMS-editable content.
- **Plain CSS** using custom properties (`src/styles/tokens.css`) — no CSS
  framework, no CSS-in-JS runtime.
- **Minimal vanilla JS islands**: mobile menu toggle, dropdown nav, scroll
  reveal (`IntersectionObserver`), and the estimate/contact form submission
  script. No client-side framework (React/Vue/etc.) is used or needed.
- **Cloudflare Pages Functions** (`/functions/api/estimate.ts`) for the one
  piece of real server-side logic: handling form submissions. This runs
  independently of the Astro static build.

## Directory structure

```
src/
  components/       Reusable UI: Header, Footer, Icon, cards, form, etc.
  layouts/
    BaseLayout.astro   Shared <head>, header, footer, skip link, scroll-reveal script
  content.config.ts    Content collection schemas (services, faqs, testimonials,
                        serviceAreas, gallery)
  content/
    services/           12 individual service pages (markdown + frontmatter)
    faqs/                FAQ entries (JSON)
    testimonials/         Empty until real reviews are added (see CLIENT_VERIFICATION.md)
    serviceAreas/        City entries (JSON)
    gallery/             Gallery items (JSON)
  data/                Global/page-level JSON "settings" content (site info,
                        homepage sections, about, financing, maintenance, nav)
  lib/
    schema.ts            Structured data (schema.org) builders
  pages/               One file/folder per route (see Site Structure below)
  styles/
    tokens.css            Design tokens (colors, type scale, spacing, shadows)
    fonts.css              Self-hosted @font-face declarations
    global.css              Base element styles, layout helpers, buttons, cards

public/
  fonts/               Self-hosted Inter + Sora variable fonts
  images/              Static images (OG image, favicons, service/gallery images
                        once added)
  robots.txt

functions/
  api/estimate.ts      Cloudflare Pages Function handling form submissions

scripts/
  generate-og-image.mjs  Regenerates the default social-share image
```

## Site structure (routes)

| Route | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/about/` | `src/pages/about/index.astro` |
| `/services/` | `src/pages/services/index.astro` (lists the content collection) |
| `/ac-repair/`, `/ac-installation-and-replacement/`, `/emergency-ac-service/`, `/residential-hvac/`, `/commercial-hvac/`, `/indoor-air-quality/`, `/duct-cleaning/`, `/uv-light-systems/`, `/pool-heaters/`, `/water-heaters/`, `/dryer-vent-cleaning/`, `/smart-wifi-thermostats/` | `src/pages/[slug]/index.astro` — one dynamic template driven by `src/content/services/*.md` |
| `/preventive-maintenance/` | `src/pages/preventive-maintenance/index.astro` (data from `src/data/maintenance.json`) |
| `/maintenance-membership/` | `src/pages/maintenance-membership/index.astro` (same data file) |
| `/financing/` | `src/pages/financing/index.astro` |
| `/gallery/` | `src/pages/gallery/index.astro` |
| `/reviews/` | `src/pages/reviews/index.astro` |
| `/service-areas/` | `src/pages/service-areas/index.astro` |
| `/faq/` | `src/pages/faq/index.astro` |
| `/contact/` | `src/pages/contact/index.astro` |
| `/request-an-estimate/` | `src/pages/request-an-estimate/index.astro` |
| `/privacy-policy/`, `/terms-and-conditions/` | Static legal pages |
| `/404` | Custom not-found page |

### Why one dynamic template for 12 service pages instead of 12 separate files

All 12 non-maintenance service pages share the exact same layout: hero,
description, benefits sidebar, related services, final CTA. Rather than
duplicate that Astro template 12 times, `src/pages/[slug]/index.astro` uses
`getStaticPaths()` to generate one static HTML page per entry in the
`services` content collection at build time. This is still 100% static
output — there is no runtime routing — but it means adding a 13th service is
a content change (`src/content/services/new-service.md`), not a code change.

Preventive Maintenance and Maintenance Membership are deliberately **not**
part of that collection/template, because the brief calls for "Maintenance"
to be its own editable CMS section, separate from the general services list.

### Why there are no per-city landing pages yet

The brief explicitly asks to avoid thin/duplicated city pages. `/service-areas/`
lists every city served today, and the `serviceAreas` content collection is
structured so that if/when a legitimate, non-thin city page is warranted
(with genuinely unique local content), it can be added as
`src/pages/service-areas/[city].astro` reading from the same collection,
without restructuring anything.

## Design system

All design tokens live in `src/styles/tokens.css` as CSS custom properties:
color palette, type scale, spacing scale, radii, shadows, and motion
durations/easing. Components consume these variables rather than hardcoding
values, so a brand refresh (e.g. adjusting the blue) is a one-file change.

Typography: **Sora** for headings, **Inter** for body text, both self-hosted
as variable fonts (`public/fonts/`) and loaded with `font-display: swap` plus
`<link rel="preload">` in `BaseLayout.astro`.

## Performance & accessibility choices

- Static HTML output, no client-side framework hydration.
- Scroll-reveal animation uses `IntersectionObserver` and is skipped entirely
  when `prefers-reduced-motion: reduce` is set, or when JavaScript is
  unavailable (content is visible by default; JS only adds the reveal
  effect, it never hides content that JS then has to show).
- Skip-to-content link, visible focus states, semantic landmarks
  (`<header>`, `<nav>`, `<main>`, `<footer>`), and accessible form labeling
  throughout.
- Images are rendered through a placeholder system today (see
  `ASSETS_NEEDED.md`); once real photos are added, use Astro's built-in
  `<Image>`/`<Picture>` components (already a dependency via `sharp`) for
  responsive, lazy-loaded, correctly-sized output.
