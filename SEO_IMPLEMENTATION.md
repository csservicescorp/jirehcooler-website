# SEO Implementation

## On-page

- Every page has a unique `<title>` and meta description, set per-page
  through the `Seo.astro` component (`src/components/Seo.astro`), driven by
  each page's frontmatter/data rather than a shared default.
- Canonical URLs are generated automatically from the current path
  (`BaseLayout.astro` → `Seo.astro`), pointing at `https://jirehcooler.com`.
- Semantic heading structure: exactly one `<h1>` per page, meaningful `<h2>`
  section headings, no skipped levels.
- Breadcrumbs (`Breadcrumbs.astro`) appear on every interior page, both
  visually and as `BreadcrumbList` structured data.
- Internal linking: every service page links to related services, the
  homepage links to every major service and page category, and the footer
  links to the full service and company navigation from every page.
- No duplicated meta titles/descriptions — each is written specifically for
  that page's content (service pages, in particular, each have distinct
  copy rather than a templated fill-in-the-blank description).
- Alt text is required in the content schema for every service and gallery
  image (`imageAlt` / `alt` fields) — pages will fail to build if this is
  left blank on a new entry, since it's a required field in
  `src/content.config.ts`.

## Structured data (schema.org, JSON-LD)

Implemented via `src/lib/schema.ts` and inline in components:

- **WebSite** — on every page (`BaseLayout.astro`).
- **HVACBusiness** (a subtype of `LocalBusiness`) — on the homepage, with
  name, address, phone, service area (Broward + Palm Beach County), and
  social profile links (`sameAs`). Only real, confirmed data is included —
  no fabricated ratings, review counts, or awards.
- **Service** — on every individual service page, describing that specific
  service and linking back to the business.
- **BreadcrumbList** — on every interior page via `Breadcrumbs.astro`.
- **FAQPage** — on the homepage (using a subset of FAQs) and on the full FAQ
  page (using every FAQ), matching the visible accordion content exactly so
  it stays consistent with what users actually see.

No `AggregateRating`, `Review`, or similar schema is emitted anywhere, since
there are no verified reviews yet (see `CLIENT_VERIFICATION.md`). Adding
real testimonials through the CMS does not currently auto-generate review
schema — that would be a deliberate follow-up once there's a real, verifiable
rating to publish, to avoid Google flagging fabricated or unverifiable review
markup.

## Sitemap & robots

- `@astrojs/sitemap` generates `sitemap-index.xml` / `sitemap-0.xml`
  automatically at build time from every static route, respecting the
  `noindex` pages (like the 404 page).
- `public/robots.txt` allows all crawling and points to the sitemap index.

## Social sharing

- Open Graph and Twitter Card meta tags on every page (`Seo.astro`), with a
  generated default share image (`public/images/og/default-og.jpg`) that can
  be swapped for a custom design later (see `ASSETS_NEEDED.md`).

## Local SEO signals

- NAP (Name, Address, Phone) is consistent everywhere it appears (header
  utility bar, footer, Contact page, structured data) because it all reads
  from the single `src/data/site.json` source of truth — there's no way for
  the phone number to drift out of sync between pages.
- Service area coverage is both human-readable (`/service-areas/` page) and
  present in structured data (`areaServed` on the HVACBusiness and Service
  schema).
- The site deliberately avoids thin, duplicated per-city landing pages (a
  common local-SEO anti-pattern that can hurt rather than help), per the
  brief. See `PROJECT_ARCHITECTURE.md` for how legitimate city pages could
  be added later without restructuring the site.

## Things intentionally left out

Per the brief, nothing here fabricates review counts, awards, certifications
beyond the confirmed state license, or response-time guarantees. Anything
not confirmed by the client is flagged in `CLIENT_VERIFICATION.md` rather
than published.

## Recommended next steps once live

1. Verify the domain in Google Search Console and Bing Webmaster Tools, and
   submit the sitemap.
2. Set up a Google Business Profile (if not already active) — this matters
   more for local map-pack ranking than on-site schema.
3. Once real reviews exist, revisit whether to add `Review`/`AggregateRating`
   schema (only with real, verifiable data).
