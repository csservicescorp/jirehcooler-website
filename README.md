# Jireh Cooler Website

A premium, static Astro + TypeScript website for Jireh Cooler, a
family-operated, state-certified air conditioning company serving Broward
and Palm Beach County, Florida since 1994.

This is a completely new, independent build — it does not reuse the design,
code, or images of the previous jirehcooler.com WordPress site. See
`CLIENT_VERIFICATION.md` for what business information was carried over from
the old site (facts only, not design) and what still needs client
confirmation.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Opens at `http://localhost:4321`.

## Build for production

```bash
npm run build
```

Runs `astro check` (TypeScript/Astro diagnostics) and then builds the static
site to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## How content is organized

- `src/data/*.json` — global settings (business info, navigation) and
  page-level content for Homepage, About, Financing, and Maintenance.
- `src/content/services/*.md` — the 12 individually-templated service pages
  (AC Repair, Installation, Emergency Service, Residential/Commercial HVAC,
  Indoor Air Quality, Duct Cleaning, UV Light Systems, Pool Heaters, Water
  Heaters, Dryer Vent Cleaning, Smart Thermostats).
- `src/content/faqs/`, `src/content/testimonials/`, `src/content/serviceAreas/`,
  `src/content/gallery/` — smaller, repeatable content collections.

Full details in `PROJECT_ARCHITECTURE.md`.

## How the CMS works

The site is configured for [Pages CMS](https://pagescms.org) via `.pages.yml`
— a free, git-based CMS that lets the client edit content through a normal
web UI without touching code. See `CMS_GUIDE.md` for setup and
`CLIENT_EDITING_GUIDE.md` for day-to-day editing instructions written for a
non-technical user.

## Forms

The Request an Estimate and Contact forms submit to a Cloudflare Pages
Function (`functions/api/estimate.ts`) that emails submissions via Resend.
See `FORM_SETUP.md` for the required environment variables and setup steps
— **the form will not send email until those are configured.**

## Deploying later

Deployment target is Cloudflare Pages. The production domain has
**intentionally not been connected** and GoDaddy DNS has **not** been
touched as part of this build, per project instructions. See
`DEPLOYMENT.md` for the full deployment process when that's authorized, and
`LAUNCH_CHECKLIST.md` before flipping the domain over.

## What still needs confirmation before launch

See `CLIENT_VERIFICATION.md` for the full list — in short: real project
photography, real customer reviews, confirmation of the service area list,
financing/warranty language, and legal review of the Privacy Policy and
Terms and Conditions. The site is fully functional and presentable today
with clearly-marked placeholders in place of anything unconfirmed.

## Other documentation in this repo

| File | Covers |
|---|---|
| `PROJECT_ARCHITECTURE.md` | Stack, folder structure, routing decisions |
| `CLIENT_VERIFICATION.md` | Facts needing client confirmation before publishing |
| `ASSETS_NEEDED.md` | Every placeholder image and what should replace it |
| `ASSET_INVENTORY.md` | Source/license of every real asset in the repo |
| `CMS_GUIDE.md` | Pages CMS setup and structure |
| `CLIENT_EDITING_GUIDE.md` | Non-technical day-to-day editing instructions |
| `FORM_SETUP.md` | Email form configuration |
| `DEPLOYMENT.md` | Cloudflare Pages deployment process |
| `SEO_IMPLEMENTATION.md` | Technical SEO and structured data details |
| `LAUNCH_CHECKLIST.md` | Pre-launch checklist |
