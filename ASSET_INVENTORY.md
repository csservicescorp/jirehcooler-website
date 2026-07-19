# Asset Inventory

Tracks the source and license of every non-placeholder binary asset checked
into this repository.

## Fonts

| Asset | Source | License / Notes |
|---|---|---|
| `public/fonts/Inter-Variable.woff2` | Downloaded from Google Fonts (`fonts.gstatic.com`), variable weight axis 300–700 | SIL Open Font License 1.1 — free for commercial self-hosted use |
| `public/fonts/Sora-Variable.woff2` | Downloaded from Google Fonts (`fonts.gstatic.com`), variable weight axis 400–800 | SIL Open Font License 1.1 — free for commercial self-hosted use |

## Original artwork

| Asset | Source | License / Notes |
|---|---|---|
| `public/images/og/default-og.jpg` | Generated locally from an inline SVG via `scripts/generate-og-image.mjs` (Sharp) | Original artwork created for this project; safe to reuse/edit freely |
| `public/favicon.svg` | Hand-authored inline SVG ("JC" mark on brand navy) | Original artwork created for this project |
| All UI icons (`src/components/Icon.astro`) | Hand-authored inline SVG line icons built from basic primitives | Original artwork created for this project; not sourced from any third-party icon library |

## Photography (stock, temporary — see note below)

Every photo below was sourced from **Pexels** (pexels.com), a free stock
photo platform. All Pexels content is released under the [Pexels
License](https://www.pexels.com/license/): free for commercial and
non-commercial use, no attribution legally required, modification allowed.
Photographer credit is recorded here anyway as good practice. Every file was
downloaded, cropped where needed, and re-encoded locally — **nothing is
hotlinked** from Pexels' servers at runtime.

Each source photo was resized and re-encoded into a JPG, WebP, and AVIF
variant at two widths (see `scripts/optimize-images.mjs`); the table below
lists the base filename (without `-sm`/format suffix) and its original
Pexels source.

| File (`public/images/...`) | Pexels photo ID | Photographer | Pexels URL |
|---|---|---|---|
| `homepage/hero-ac-technician-repair.jpg` | 6471913 | José Andrés Pacheco Cortes | pexels.com/photo/6471913 |
| `homepage/residential-modern-home-exterior.jpg` | 3665354 | Blue Rhino Media | pexels.com/photo/3665354 |
| `homepage/commercial-rooftop-hvac-skyline.jpg` | 8065903 | Katterinaaa | pexels.com/photo/8065903 |
| `homepage/emergency-technician-response.jpg` | 6471911 | José Andrés Pacheco Cortes | pexels.com/photo/6471911 |
| `homepage/membership-technician-inspection.jpg` | 5463581 | José Andrés Pacheco Cortes | pexels.com/photo/5463581 |
| `homepage/financing-suburban-homes.jpg` | 30433180 | Onbab | pexels.com/photo/30433180 |
| `backgrounds/cta-background-rooftop-units.jpg` | 2539462 | Sergei A | pexels.com/photo/2539462 |
| `services/ac-repair-manifold-gauge.jpg` | 6471912 | José Andrés Pacheco Cortes | pexels.com/photo/6471912 |
| `services/ac-installation-technician.jpg` | 5463582 | José Andrés Pacheco Cortes | pexels.com/photo/5463582 |
| `services/indoor-air-quality-bright-interior.jpg` | 8146213 | Artbovich | pexels.com/photo/8146213 |
| `services/duct-cleaning-industrial-ducts.jpg` | 8297856 | Mikhail Nilov | pexels.com/photo/8297856 |
| `services/uv-light-ventilation-system.jpg` | 36129008 | jan-van-der-wolf | pexels.com/photo/36129008 |
| `services/pool-heater-miami-villa-sunset.jpg` | 7313084 | Onbab | pexels.com/photo/7313084 |
| `services/water-heater-installation.jpg` | 34938439 | (Pexels contributor 2157750954) | pexels.com/photo/34938439 |
| `services/dryer-vent-laundry-closet.jpg` | 9515294 | introspectivedsgn | pexels.com/photo/9515294 |
| `services/smart-thermostat-wall-adjust.jpg` | 36730582 | silverkblack | pexels.com/photo/36730582 |
| `about/technician-rooftop-work.jpg` | 5463587 | José Andrés Pacheco Cortes | pexels.com/photo/5463587 |
| `gallery/commercial-technicians-rooftop.jpg` | 5463577 | José Andrés Pacheco Cortes | pexels.com/photo/5463577 |
| `gallery/technician-inspecting-outdoor-unit.jpg` | 32497161 | Kathleen Austin Kuhn | pexels.com/photo/32497161 |
| `gallery/technician-outdoor-maintenance.jpg` | 6471914 | José Andrés Pacheco Cortes | pexels.com/photo/6471914 |

Several of the files above are reused by path across multiple pages (e.g.
`homepage/commercial-rooftop-hvac-skyline.jpg` is also used on the
Commercial HVAC service page and in the Gallery) rather than duplicated —
see `CLIENT_VERIFICATION.md` and `ASSETS_NEEDED.md` for where each is used.

### Images considered and rejected during sourcing

For transparency: a few initially-downloaded candidates were reviewed and
discarded before being added to the site, and are **not** present in the
repository:

- A technician photo showing a readable third-party company name on the
  work shirt (avoided — could look like an unrelated competitor's uniform).
- A smart thermostat photo showing a competing thermostat brand's logo and
  a Celsius-only display (avoided — brand visibility and non-US units).
- A backyard pool photo with clearly Eastern European residential
  architecture in the background (avoided — didn't match "South Florida
  visual atmosphere").
- A residential exterior photo that otherwise fit well was **cropped**
  (not rejected) to remove construction caution tape and recycling bins
  visible at the bottom of the original frame.

## Important note on stock photography

**These are temporary, appropriately-licensed stock photographs, not actual
photos of Jireh Cooler technicians, vehicles, or completed projects.** Alt
text throughout the site was written to describe the photos honestly
(e.g., "HVAC technician using a manifold gauge...") rather than claiming
they depict Jireh Cooler's own staff or work. Replacing them with real
company photography remains recommended — see `ASSETS_NEEDED.md`, which
has been updated to reflect the current state (stock photo in place,
real photo still preferred long-term) rather than a blank placeholder.
