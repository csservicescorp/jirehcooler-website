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
| Homepage hero (full-width photo background) | Jireh Cooler office reception, logo visible on accent wall |
| Homepage trust/credibility section | Jireh Cooler company fleet |
| Gallery — "Our Fleet" | Jireh Cooler company fleet (same photo) |
| About page — primary image | Portrait of owners Moyses and Evelise Oliveira |
| About page — secondary "Every Job Starts With a Plan" section | Owner reviewing a planning blueprint |
| Preventive Maintenance page | Owner/technician with a residential AC unit |
| Homepage residential pathway card, Residential HVAC page | Technician servicing a residential outdoor AC unit |
| Homepage commercial pathway card, Commercial HVAC page, Smart & Wi-Fi Thermostats page | Technician adjusting a commercial thermostat |
| AC Repair page | Technician using a diagnostic meter on an outdoor unit |
| Emergency AC Service page, Gallery | Technician performing HVAC service in an attic |
| Financing page | Technician explaining financing options to a homeowner |

## Still using stock photography (lower priority)

| Location | Current stock photo | Suggested real replacement |
|---|---|---|
| Emergency section (homepage, background photo) | Technician using gauges | A real after-hours or urgent service call |
| Financing section (homepage) | South Florida suburban neighborhood at sunset | Keep generic, or use a real serviced neighborhood |
| Final CTA background (homepage) | Rooftop HVAC units, industrial | A real branded team/van shot works well here too |
| Maintenance Membership page | Technician performing hands-on unit work | A real maintenance visit in progress |

## Service pages (5 of 12 still on stock)

Each service in `src/content/services/*.md` has an `image` field with a
relevant stock photo in place. AC Repair, Residential HVAC, Commercial
HVAC, Smart & Wi-Fi Thermostats, Emergency Service, and Preventive
Maintenance are now real branded photos. Remaining real-replacement
priority order:

- AC Installation — real technician photo is the highest-value remaining
  replacement (high-visibility page)
- Indoor Air Quality, Duct Cleaning, UV Light Systems — real ductwork/install
  photos, if safely photographable
- Pool Heaters, Water Heaters, Dryer Vent Cleaning — lower priority; current
  stock photos are solid placeholders

## Gallery page

`src/content/gallery/*.json` has 2 entries — both real Jireh Cooler photos
(company fleet, attic HVAC service). Nine stock-photo entries were
deliberately removed during an authenticity review: several showed generic
stock technicians presented as completed Jireh Cooler projects, and one
showed two technicians wearing a **different HVAC company's branded
uniforms and phone number**, visible in the photo. None of that is
appropriate for a page framed as real project photography. The page is now
titled "Services in Action" with copy that doesn't claim every future image
is a completed project photo. Add real before/after and in-progress photos
here as they become available — this is exactly the kind of page where
authentic work photos matter most. Generic stock photography can still be
used as illustrations on individual service pages, just not in this
gallery.

## Fonts

Self-hosted variable fonts (Sora for headings, Inter for body) are in place
under an open license. No action needed unless the brand wants a different
typeface.
