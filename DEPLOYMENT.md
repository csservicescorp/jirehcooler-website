# Deployment (Cloudflare Pages)

The site is built for Cloudflare Pages. **Per this project's instructions,
the production domain has not been connected and the site has not been
deployed live** — this document is preparation for when that step is
authorized.

## One-time setup

1. Push this repository to GitHub (already the `origin` remote for this
   project).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages →
   Connect to Git**, and select this repository.
3. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (repo root)
4. Cloudflare Pages automatically detects and deploys `/functions` as Pages
   Functions alongside the static build — no separate configuration needed
   for the `/api/estimate` endpoint.
5. Under **Settings → Environment Variables**, add the three variables
   described in `FORM_SETUP.md` (`RESEND_API_KEY`, `ESTIMATE_TO_EMAIL`,
   `ESTIMATE_FROM_EMAIL`) for both Production and Preview.
6. Trigger the first deployment. Cloudflare will give you a
   `*.pages.dev` preview URL — use this to review the live build before
   connecting the real domain.

## Connecting the production domain (jirehcooler.com) — not yet done

When authorized to go live:

1. In the Cloudflare Pages project, go to **Custom Domains → Set up a custom
   domain** and add `jirehcooler.com` (and `www.jirehcooler.com` if desired).
2. Cloudflare will provide the DNS records to add. **This project has not
   touched GoDaddy DNS and will not until explicitly instructed** — the
   client or whoever manages the GoDaddy account will need to either:
   - Point the domain's nameservers to Cloudflare, or
   - Add the specific CNAME/A records Cloudflare provides, if keeping DNS at
     GoDaddy.
3. Cloudflare issues a free SSL certificate automatically once DNS is
   pointed correctly.
4. Only after DNS is confirmed working should the old WordPress hosting be
   decommissioned — keep it live in parallel until the new site is verified.

## Every deployment after the first

If Pages CMS (or a developer) pushes a commit to the connected GitHub
branch, Cloudflare Pages automatically rebuilds and redeploys — no manual
steps required.

## Rollback

Cloudflare Pages keeps every previous deployment. If a deployment introduces
a problem, go to **Deployments** in the Cloudflare dashboard and click
**Rollback to this deployment** on the last known-good build.

## Local production build (for testing before pushing)

```bash
npm run build
npm run preview
```

`npm run preview` serves the built `dist/` output locally so you can sanity
check the exact production build before it goes live.
