# Assets Needed

The old jirehcooler.com site's images could not be reused (the build avoids
hotlinking production images from the live site, and no locally downloadable,
clearly-company-owned image files were available during the audit). Every
image location below currently renders a styled placeholder
(`ImagePlaceholder.astro`) instead of a photo, so the site is fully
functional and presentable, but should be updated with real photography
before or shortly after launch.

Replacing an image is just dropping a file into `public/images/...` at the
path referenced below and updating the matching entry in `src/data/` or
`src/content/` (see `CLIENT_EDITING_GUIDE.md`).

## High-priority (visible on Homepage)

| Location | Suggested content | Data reference |
|---|---|---|
| Hero image | Technician actively working on a residential or commercial AC unit | `src/data/homepage.json` → `hero.image` |
| Residential pathway | Exterior shot of a South Florida home with visible AC unit | `src/data/homepage.json` → `pathways.residential.image` |
| Commercial pathway | Commercial rooftop unit or storefront | `src/data/homepage.json` → `pathways.commercial.image` |
| Emergency section | Technician arriving on an emergency call, ideally with branded van/uniform | inline in `src/pages/index.astro` |
| Membership section | Technician performing a maintenance inspection | inline in `src/pages/index.astro` |
| Indoor air quality | UV light install or duct work close-up | `src/data/homepage.json` → `airQuality.image` |

## Service pages (12 pages)

Each service in `src/content/services/*.md` has an `image` and `imageAlt`
field. Suggested real photos:

- AC Repair — technician diagnosing/repairing a unit
- AC Installation and Replacement — new outdoor unit being installed
- Emergency AC Service — after-hours or urgent service call
- Residential HVAC — residential system overview
- Commercial HVAC — commercial rooftop unit
- Indoor Air Quality — UV light or filtration install
- Duct Cleaning — ductwork inspection/cleaning in progress
- UV Light Systems — UV light installed in ductwork
- Pool Heaters — residential pool heater unit
- Water Heaters — tank or tankless water heater install
- Dryer Vent Cleaning — dryer vent cleaning in progress
- Smart & Wi-Fi Thermostats — thermostat installed on a wall, app on a phone

## Gallery page

`src/content/gallery/*.json` currently has 9 placeholder entries (residential
install, commercial rooftop, repair, maintenance, ductwork, outdoor unit,
commercial office, thermostat upgrade, service team/van). Replace with real
before/after and in-progress project photos as they become available. Add
more entries the same way for a fuller gallery.

## About page

`src/data/about.json` → `image` — ideally a photo of Moyses and/or Evelise
Oliveira, or the team, to reinforce the family-operated, owner-led
positioning.

## Site-wide

- **Favicon**: a simple SVG favicon (`public/favicon.svg`) was created using
  the "JC" mark and brand navy. Replace with a refined logo mark if the
  client has one, ideally as an SVG.
- **Open Graph / social share image**: a branded 1200×630 image was
  generated programmatically at `public/images/og/default-og.jpg`
  (regenerate via `node scripts/generate-og-image.mjs` if brand colors or
  copy change). Replace with a designed version if the client has one.
- **Logo**: no logo file was available during this build. The header/footer
  currently use a text-based "JC" mark in a rounded square. If Jireh Cooler
  has an existing logo file, add it and update `Header.astro` /
  `Footer.astro` to use an `<img>`/`<Image>` instead of the text mark.

## Fonts

Self-hosted variable fonts (Sora for headings, Inter for body) were
downloaded from Google Fonts (both SIL Open Font License) and are already in
`public/fonts/`. No action needed unless the brand wants a different
typeface.
