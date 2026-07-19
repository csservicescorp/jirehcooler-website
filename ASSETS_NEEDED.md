# Assets Needed

The client has provided six official photos/logo (see `ASSET_INVENTORY.md`
→ "Official Jireh Cooler assets"), which now cover the site's
highest-visibility slots: the logo (header/footer), the homepage hero, the
homepage credibility/trust section, the About page's two images, and the
Preventive Maintenance page. Every other image location has a real,
appropriately-licensed **stock** photograph in place (sourced from Pexels
— see `ASSET_INVENTORY.md`). The site is fully presentable today with no
placeholders. This document tracks where additional **real Jireh Cooler
photography** would still improve on the current stock photos.

Replacing a photo is a content edit, not a code change — see
`CLIENT_EDITING_GUIDE.md` and `CMS_GUIDE.md`. Each image field in Pages CMS
lists its recommended dimensions.

## ✅ Resolved with official client photos

| Location | Photo |
|---|---|
| Header, mobile header, footer | Official logo (transparency restored — see `ASSET_INVENTORY.md`) |
| Homepage hero | Jireh Cooler vans parked at a residential job |
| Homepage trust/credibility section | Jireh Cooler company fleet |
| Gallery — "Our Fleet" | Jireh Cooler company fleet (same photo) |
| About page — primary image | Portrait of owners Moyses and Evelise Oliveira |
| About page — secondary "Every Job Starts With a Plan" section | Owner reviewing a planning blueprint |
| Preventive Maintenance page | Owner/technician with a residential AC unit |

## Still using stock photography (lower priority)

| Location | Current stock photo | Suggested real replacement |
|---|---|---|
| Residential pathway (homepage) | Modern Miami home exterior | A real South Florida home Jireh Cooler has serviced (with owner permission) |
| Commercial pathway (homepage) | Rooftop AC units against a city skyline | A real commercial rooftop project |
| Emergency section (homepage) | Technician using gauges (background photo) | A real after-hours or urgent service call |
| Financing section (homepage) | South Florida suburban neighborhood at sunset | Keep generic, or use a real serviced neighborhood |
| Final CTA background (homepage) | Rooftop HVAC units, industrial | A real branded team/van shot works well here too |
| Maintenance Membership page | Technician performing hands-on unit work | A real maintenance visit in progress |

## Service pages (11 of 12 still on stock)

Each service in `src/content/services/*.md` has an `image` field with a
relevant stock photo in place. Real replacements, in priority order of
visibility:

- AC Repair, AC Installation, Emergency Service — real technician photos
  are the highest-value replacements (most-visited pages)
- Residential HVAC, Commercial HVAC — reuse real property photos if
  available
- Indoor Air Quality, Duct Cleaning, UV Light Systems — real ductwork/install
  photos, if safely photographable
- Pool Heaters, Water Heaters, Dryer Vent Cleaning, Smart Thermostats —
  lower priority; current stock photos are solid placeholders

(Preventive Maintenance is done — see above.)

## Gallery page

`src/content/gallery/*.json` has 10 entries — one real fleet photo plus a
mix of stock photography (some reused from other pages, some unique). Real
before/after and in-progress project photos should replace the remaining
stock entries over time — the gallery is exactly the kind of page where
authentic work photos matter most.

## Fonts

Self-hosted variable fonts (Sora for headings, Inter for body) are in place
under an open license. No action needed unless the brand wants a different
typeface.
