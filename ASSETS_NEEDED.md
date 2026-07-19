# Assets Needed

Every image location on the site now has a real, appropriately-licensed
stock photograph in place (sourced from Pexels — see `ASSET_INVENTORY.md`
for the full list, sources, and photographer credits). The site is fully
presentable today. This document tracks where **real Jireh Cooler
photography** should eventually replace the current stock photos, since
authentic photos of the actual team, vehicles, and completed jobs will
always out-perform stock photography for trust and local credibility.

Replacing a photo is a content edit, not a code change — see
`CLIENT_EDITING_GUIDE.md` and `CMS_GUIDE.md`. Each image field in Pages CMS
lists its recommended dimensions.

## High-priority (visible on Homepage)

| Location | Current stock photo | Suggested real replacement |
|---|---|---|
| Hero image | Technician using pressure gauges on an outdoor unit | A real technician (with permission) actively working, ideally in branded uniform/van |
| Residential pathway | Modern Miami home exterior | A real South Florida home Jireh Cooler has serviced (with owner permission) |
| Commercial pathway | Rooftop AC units against a city skyline | A real commercial rooftop project |
| Emergency section | Technician using gauges (background photo) | A real after-hours or urgent service call |
| Membership section | Technician performing hands-on unit work | A real maintenance visit in progress |
| Financing section | South Florida suburban neighborhood at sunset | Keep generic, or use a real serviced neighborhood |
| Final CTA background | Rooftop HVAC units, industrial | A real branded team/van shot works well here too |

## Service pages (12 pages)

Each service in `src/content/services/*.md` has an `image` field with a
relevant stock photo already in place. Real replacements, in priority
order of visibility:

- AC Repair, AC Installation, Emergency Service — real technician photos
  are the highest-value replacements (most-visited pages)
- Residential HVAC, Commercial HVAC — reuse real property photos if
  available
- Indoor Air Quality, Duct Cleaning, UV Light Systems — real ductwork/install
  photos, if safely photographable
- Pool Heaters, Water Heaters, Dryer Vent Cleaning, Smart Thermostats —
  lower priority; current stock photos are solid placeholders

## About page

`src/data/about.json` → `image` — currently a stock rooftop work photo.
Ideally replace with a real photo of Moyses and/or Evelise Oliveira, or the
team, to reinforce the family-operated, owner-led positioning. This is the
single highest-value photo to replace with something authentic.

## Gallery page

`src/content/gallery/*.json` has 9 entries using a mix of stock photography
(some reused from other pages, some unique). Real before/after and
in-progress project photos should replace these over time — the gallery is
exactly the kind of page where authentic work photos matter most.

## Logo

No logo file was available during this build. The header/footer use a
text-based "JC" mark in a rounded square. If Jireh Cooler has an existing
logo file, add it and update `Header.astro` / `Footer.astro` to use an
`<img>`/`ResponsiveImage` instead of the text mark.

## Fonts

Self-hosted variable fonts (Sora for headings, Inter for body) are in place
under an open license. No action needed unless the brand wants a different
typeface.
