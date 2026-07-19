# Client Verification Checklist

This file tracks every piece of information on the new Jireh Cooler website that
was sourced from the existing jirehcooler.com site, inferred, or left as a
placeholder pending confirmation from Jireh Cooler / Moyses Oliveira. Nothing
in this list should be treated as final until confirmed.

## Confirmed from the current jirehcooler.com homepage

These were pulled directly from the live site's homepage content and are used
as-is:

- Business name: Jireh Cooler
- Phone: (954) 426-6010
- Email: coolerac1@gmail.com
- Address: 270 S. Military Trail, Deerfield Beach, FL 33442
- Founded: 1994
- Owner: Moyses Oliveira (graduate of South Technical Education Center), with
  Evelise Oliveira
- License: State-Certified Air Conditioning Contractor, CAC1815741
- Availability: 24 hours a day, 7 days a week, 365 days a year
- Brands serviced: Carrier, Bryant, Rheem, Goodman, Lennox (site listed
  "Lenox" — corrected to the standard spelling "Lennox"; please confirm which
  brand was actually intended)
- Social links: Facebook, Instagram, YouTube (URLs carried over as found)
- Core services list: AC installation/repair, duct cleaning, UV-light
  systems, pool heaters, water heaters (including tankless), dryer vent
  cleaning, Wi-Fi thermostats, V.I.P. Maintenance Membership (18-point
  inspection, 2 visits/year)

## Needs explicit confirmation before publishing further

1. **"Comfort Assurance Program (CAP)"** — mentioned once on the old site
   alongside the V.I.P. Membership. It's unclear if this is a separate,
   still-active program or an older/retired name for the same membership.
   Not published on the new site until clarified.

2. **Financing terms** — old site said "Finance Available 18 months." The new
   Financing page describes financing as available to qualified customers
   without stating specific terms, since promotional terms change and
   shouldn't be hard-coded without current confirmation from the financing
   partner.

3. **Commercial client names** (Burgerfi, Dunkin' Donuts, Miami Police
   Department, Dollar Store) — **not published** on the new site. These are
   specific brand/organization names implying an endorsement or client
   relationship; publishing them without current written permission from each
   business is a legal risk. If these relationships are real and current,
   get written sign-off before adding them back (e.g., in a case studies or
   commercial clients section).

4. **Individual "celebrity" clients** (Dwayne Johnson, Don King, Roberto
   Carlos) — **not published anywhere on the new site.** Publishing a
   celebrity's name as a customer without their explicit, current written
   consent is a serious legal and reputational risk (right of publicity /
   false endorsement). Do not add these without direct, documented
   authorization from each individual or their representative.

5. **Service area list** — the old site only vaguely implied "Palm Beach and
   Broward County." The new Service Areas page publishes a reasonable list of
   nearby cities (Deerfield Beach, Boca Raton, Pompano Beach, Coconut Creek,
   Coral Springs, Boynton Beach, Delray Beach, Lighthouse Point, Margate,
   Parkland, Tamarac, Fort Lauderdale) based on geographic proximity to the
   Deerfield Beach office. **Please confirm this list is accurate** — remove
   any city not actually serviced, and add any that are missing.

6. **Reviews / testimonials** — no reviews were copied from the old site
   (none were quoted in usable form, and fabricating reviews is not
   acceptable). The Reviews page currently shows an empty state linking to
   the Facebook page. Once Google Business Profile or other verified reviews
   are available, add them via the CMS (see `CMS_GUIDE.md`).

7. **Gallery photography** — no real project photos were available to reuse.
   The Gallery page currently uses styled placeholders. See
   `ASSETS_NEEDED.md`.

8. **WhatsApp number** — the old site mentioned WhatsApp availability but did
   not display a specific number in the crawled content. `whatsapp.enabled`
   is currently `false` in `src/data/site.json`. Provide a number to enable
   the WhatsApp option in the mobile conversion experience.

9. **Warranty terms** — the old site referenced "warranties and rebates" in
   general terms. The new site references manufacturer warranties and
   workmanship without stating specific durations or terms, since these
   weren't clearly specified. Provide exact warranty language if you want it
   published.

10. **Privacy Policy / Terms and Conditions** — the pages on the new site are
    a professional general-purpose template, not the old site's legal text
    (which was not fully accessible during the audit). **These should be
    reviewed by an attorney** before launch, particularly the data-handling
    section, since the new site collects form submissions differently than
    the old WordPress site did.

11. **"Since 1994" / "28 years"** — the old homepage stated both 1994 as a
    founding year and referenced "28 years" in some copy, which doesn't
    precisely reconcile depending on when that text was last written. The
    new site calculates messaging around the founding year (1994) rather
    than a static "X years" count, to avoid the number going stale.

## Pages that could not be fully audited

The old site's sitemap only indexed the homepage, a privacy policy page, and
a terms page. Its main navigation referenced About Us, Our Services,
Portfolio, Reviews, FAQ, and News pages, but these did not return usable
content when fetched directly during this audit (likely due to how the
WordPress theme handles those routes). As a result, service descriptions,
FAQs, and the About page on the new site were written fresh based on the
homepage content and general HVAC industry knowledge — not copied from
inaccessible old pages. Please review all new copy for accuracy against your
actual business practices.

## What to do next

Review each item above with Moyses/Evelise Oliveira, then:

1. Update `src/data/site.json`, `src/data/about.json`, `src/data/financing.json`,
   and `src/data/maintenance.json` directly, or through the Pages CMS.
2. Provide real project photography (see `ASSETS_NEEDED.md`).
3. Add real, verified reviews once available.
4. Have legal review the Privacy Policy and Terms and Conditions pages.
5. Confirm the service area list and financing/warranty language.
