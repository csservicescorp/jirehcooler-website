# Client Editing Guide

A plain-language guide for whoever at Jireh Cooler will keep the website's
content up to date. No coding knowledge required for anything described
here.

## The easiest way: Pages CMS

Once set up (see `CMS_GUIDE.md`), log in at
[app.pagescms.org](https://app.pagescms.org), select this site, and you'll
see a menu of editable sections: Website Settings, Homepage, Services,
About, Maintenance, Financing, Gallery, Testimonials, FAQs, Service Areas,
and Contact. Click into any section, edit the fields, and save. Changes go
live automatically within a couple of minutes.

## Common tasks

### Update the phone number or hours

Website Settings → update **Phone**, **Hours**, or **Emergency Availability**
→ Save. This updates it everywhere on the site (header, footer, every page)
automatically, since every page pulls from this one place.

### Add a customer review

Testimonials → Add entry → fill in the **Quote**, **Author Name**, and
optionally **Location** and **Service Type** → make sure **Published** is
checked → Save. It will appear on the Reviews page automatically. Only add
real reviews from real customers — see the note in `CLIENT_VERIFICATION.md`
about why fabricated reviews were deliberately left out of the initial
build.

### Add a photo to the gallery

Gallery → Add entry → upload the photo, write a short **Title** and
**Alt Text** (a plain description of the photo, for accessibility and SEO),
choose a **Category** → Save.

### Update a service description

Services → click the service you want to edit → update the **Short
Description** (used on cards) and/or the **Full Description** (the main
page content) → Save.

### Add or edit an FAQ

FAQs → Add entry (or click an existing one) → fill in **Question**,
**Answer**, and **Category** → Save. FAQs are grouped by category
automatically on the FAQ page.

### Add a new service area (city)

Service Areas → Add entry → enter the **City** name and choose the
**County** → Save.

### Temporarily hide a service or gallery photo without deleting it

Most content types have a **Published** toggle. Uncheck it and save — the
item disappears from the live site but stays saved, so you can turn it back
on later instead of re-creating it.

## What you should NOT try to edit yourself

- Anything related to layout, colors, fonts, or spacing — these live in code
  files (`src/styles/`) and are not exposed in Pages CMS on purpose, so a
  small mistake can't break the whole site's design.
- The Astro configuration, page templates, or components — these require a
  developer.
- The `.pages.yml` file itself — this defines what you see in the CMS. If it
  needs to change (e.g. adding a whole new editable section), that's a
  developer task.

## If something looks wrong after an edit

1. Double-check the field you edited for typos or an accidentally-deleted
   character.
2. Wait a minute or two — there's a short delay between saving and the live
   site updating.
3. If it's still wrong, most Pages CMS changes can be reverted by looking at
   the file's history in the connected GitHub repository, or by asking a
   developer to help — nothing is ever permanently lost, since every save is
   a Git commit.
