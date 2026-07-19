# Pages CMS Guide

This site is configured for [Pages CMS](https://pagescms.org), a free,
git-based CMS that edits files directly in this GitHub repository through a
clean web interface — no separate database, no vendor lock-in. The
configuration lives in `.pages.yml` at the project root.

## Setting it up (one-time, done by whoever manages the GitHub repo)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with
   GitHub.
2. Authorize Pages CMS to access the `jirehcooler-website` repository (only
   this repo, not your whole account, if you use GitHub's per-repo
   authorization).
3. Pages CMS will detect `.pages.yml` automatically and build the editor
   sections described below.
4. Add the client (Moyses/Evelise or whoever manages content) as a
   collaborator on the GitHub repo (or a Pages CMS-level user, depending on
   how Pages CMS handles access at the time of setup) so they can log in and
   edit without needing to know Git.

## What the client can edit

The editor is organized into these sections, matching `.pages.yml`:

- **Website Settings** — business name, phone, email, address, hours,
  license, social links, header buttons.
- **Homepage** — hero text/image, trust points, "why choose us" points,
  emergency section, membership section, financing section, air quality
  section, final call-to-action.
- **Services** — all 12 individually-templated service pages (title,
  slug, description, benefits, image, icon, SEO fields, published/featured
  toggles). Each service is one file in `src/content/services/`.
- **About** — heading, intro, story paragraphs, company values, photo.
- **Maintenance** — content for the Preventive Maintenance and V.I.P.
  Maintenance Membership pages.
- **Financing** — heading, intro, highlights, disclaimer text.
- **Gallery** — add/remove/reorder gallery photos with captions and
  categories.
- **Testimonials** — add real customer reviews here once available. This
  collection is intentionally empty at launch (see `CLIENT_VERIFICATION.md`)
  — the Reviews page automatically shows a "coming soon" message until at
  least one testimonial exists, and automatically switches to displaying
  real testimonials the moment one is added. No code changes needed.
- **FAQs** — add/edit/reorder frequently asked questions by category.
- **Service Areas** — add/remove cities and their county.
- **Contact** — the subset of Website Settings relevant to the Contact page.

## What the client cannot edit (by design)

Layout, components, CSS, typography rules, animations, structured data
(schema.org) logic, the build configuration, and the site's page/route
structure are not exposed in Pages CMS. These require a developer, since
changing them can affect every page at once or introduce bugs. This is
intentional — see the brief's requirement to protect "technical elements"
from normal content editing.

## How publishing works

Every save in Pages CMS is a Git commit to this repository. If the
Cloudflare Pages project is connected to this GitHub repo (see
`DEPLOYMENT.md`), each save automatically triggers a new deployment — no
separate "publish" step. Changes typically go live within a minute or two of
saving.

## Adding a 13th service later

1. In Pages CMS, go to **Services → Add entry**.
2. Fill in every field, particularly:
   - **URL Slug** — this becomes the page's URL (`/your-slug/`). Use lowercase
     words separated by hyphens, no spaces.
   - **SEO Title** / **Meta Description** — keep these unique from every
     other page.
3. Write the **Full Description** in the rich text field — this becomes the
   main content of the page.
4. Save. The new page builds automatically as `/your-slug/` and appears in
   the Services listing page. It will **not** automatically appear in the
   header navigation dropdown or footer — those are hardcoded in
   `src/data/navigation.json` for stability and intentional ordering, so add
   it there too (a developer task, or a very careful manual JSON edit).
