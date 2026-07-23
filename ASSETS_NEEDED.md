# Assets Needed

The client has provided three batches of official photos/logo (see
`ASSET_INVENTORY.md` → "Official Jireh Cooler assets"), which now cover
nearly every high-visibility slot on the site: the logo, the homepage hero,
emergency section, membership section, final CTA background, the trust/fleet
section, both About page images, Financing, Preventive Maintenance, and 7 of
12 service pages. The Gallery ("Services in Action") page now has 16 real
project photos. This document tracks the few remaining spots still on stock
photography.

Replacing a photo is a content edit, not a code change — see
`CLIENT_EDITING_GUIDE.md` and `CMS_GUIDE.md`. Each image field in Pages CMS
lists its recommended dimensions.

## ✅ Resolved with official client photos

| Location | Photo |
|---|---|
| Header, mobile header, footer | Official logo (transparency restored — see `ASSET_INVENTORY.md`) |
| Homepage hero (full-width photo background) | Jireh Cooler office reception, logo visible on accent wall |
| Homepage trust/credibility section | Jireh Cooler company fleet |
| Gallery — "Our Fleet" | Jireh Cooler company fleet (same photo) |
| About page — primary image | Portrait of owners Moyses and Evelise Oliveira |
| About page — secondary "Every Job Starts With a Plan" section | Owner reviewing a planning blueprint |
| Preventive Maintenance page | Owner/technician with a residential AC unit |
| Homepage residential pathway card, Residential HVAC page | Technician servicing a residential outdoor AC unit |
| Homepage commercial pathway card, Smart & Wi-Fi Thermostats page | Technician adjusting a commercial thermostat |
| AC Repair page | Technician using a diagnostic meter on an outdoor unit |
| Emergency AC Service page, Gallery | Technician performing HVAC service in an attic |
| Financing page, homepage financing section | Technician explaining financing options to a homeowner |
| AC Installation & Replacement page, Gallery | Technician servicing a newly installed multi-system residential AC setup |
| Homepage emergency section background, Gallery | Frozen evaporator coil diagnosis during an urgent repair call |
| Homepage membership section, V.I.P. Maintenance Membership page | Technician performing hands-on maintenance on a residential outdoor unit |
| Commercial HVAC page | Technicians servicing a commercial rooftop unit |
| Duct Cleaning page | Real ductwork installed by Jireh Cooler in a commercial ceiling |
| Homepage final CTA background | Crane lifting a commercial HVAC unit onto a rooftop |

## Still using stock photography (lower priority)

| Location | Current stock photo | Notes |
|---|---|---|
| Indoor Air Quality page | Bright, clean modern interior | Deliberately atmospheric rather than equipment-specific; fine as-is |
| UV Light Systems page | In-duct UV light ventilation system | No matching real photo yet |
| Pool Heaters page | South Florida backyard pool at dusk | Lower priority |
| Water Heaters page | Technician installing a water heater | Lower priority |
| Dryer Vent Cleaning page | Laundry closet with dryer | Lower priority |

## Service pages (7 of 12 now real branded photos)

AC Repair, AC Installation & Replacement, Residential HVAC, Commercial HVAC,
Smart & Wi-Fi Thermostats, Emergency Service, Duct Cleaning, and Preventive
Maintenance are now real branded photos. Indoor Air Quality, UV Light
Systems, Pool Heaters, Water Heaters, and Dryer Vent Cleaning remain on
stock — none of the client's provided photo batches include shots specific
to those five services (no pools, water heaters, dryer vents, or UV light
housings). Current stock photos are solid placeholders for all five.

## Gallery page

`src/content/gallery/*.json` has 16 entries, all real Jireh Cooler photos:
the company fleet and attic HVAC service (batch 2), plus 14 more from batch
3 covering luxury and estate residential work, multi-system and package-unit
installations, an indoor air handler inspection, a frozen-coil repair
diagnosis, commercial ductwork, new-construction jobsites, an auto
dealership install, a restaurant-plaza delivery, and equipment/crane
deliveries. Nine stock-photo entries were deliberately removed early on
during an authenticity review (see `ASSET_INVENTORY.md`); the Pages CMS
gallery field description now explicitly warns against adding stock, AI, or
other-company-branded photos. Ten of the batch-3 photos were left unused
(mostly near-duplicate framings of the same two construction jobsites, or
photos with no HVAC work visible, e.g. the team-training session) — they're
preserved in `public/images/jireh-originals/batch3-new-photos/`, ready to
add to the Gallery later if useful.

## Fonts

Self-hosted variable fonts (Sora for headings, Inter for body) are in place
under an open license. No action needed unless the brand wants a different
typeface.
