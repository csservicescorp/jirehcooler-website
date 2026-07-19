# Form Setup

The Request an Estimate and Contact forms submit via `fetch()` to
`/api/estimate`, a **Cloudflare Pages Function** (`functions/api/estimate.ts`).
This runs independently of the static Astro build — Cloudflare Pages
automatically deploys anything in `/functions` as serverless functions
alongside the static site, no extra configuration needed on Cloudflare's
side.

## How it works

1. User submits the form in the browser.
2. Client-side JS (`src/components/EstimateForm.astro`) validates the
   required fields, then POSTs a JSON payload to `/api/estimate`.
3. The function checks a honeypot field and a submission-timing check to
   filter out basic bots, validates required fields server-side, then sends
   the submission as an email via [Resend](https://resend.com).
4. The form shows a loading state, then a success or error message.

No form data is stored in a database — submissions are delivered by email
only. If you later want a stored record of submissions (e.g. in a
spreadsheet or CRM), that would be an additional integration.

## Why Resend

Resend has a free tier that comfortably covers a local business's estimate
request volume, a simple HTTP API (no SDK required — the function uses plain
`fetch`), and doesn't require exposing any secret to the browser. This isn't
the only option — any transactional email API (Postmark, SendGrid, etc.)
would work with a small edit to `functions/api/estimate.ts`.

## Required setup before the form works in production

1. Create a [Resend](https://resend.com) account (or sign in to an existing
   one).
2. Verify a sending domain (or use Resend's onboarding sandbox domain for
   testing).
3. Create an API key in the Resend dashboard.
4. In the Cloudflare Pages project settings (**Settings → Environment
   Variables**), add the following **encrypted** variables for both
   Production and Preview environments:

   | Variable | Example value |
   |---|---|
   | `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxx` |
   | `ESTIMATE_TO_EMAIL` | `coolerac1@gmail.com` |
   | `ESTIMATE_FROM_EMAIL` | `estimates@jirehcooler.com` (must be on a domain verified in Resend) |

5. Redeploy. The form will return a clear `500` error with a message
   pointing back to this file if any of the three variables are missing, so
   it's easy to tell if setup is incomplete.

## Local development / testing

Copy `.env.example` to `.env` and fill in real values, then use
[Wrangler](https://developers.cloudflare.com/pages/functions/local-development/)
(`npx wrangler pages dev -- npm run dev`) to test the function locally
against the Astro dev server. `.env` is already listed in `.gitignore` and
must never be committed.

## Spam protection

Two lightweight, no-dependency measures are implemented:

- **Honeypot field** (`companyWebsite`) — hidden from real users via CSS and
  `tabindex="-1"`; bots that fill every field trip this and get silently
  accepted (HTTP 200) without an email being sent, so they don't learn the
  filter exists.
- **Timing check** — the form records when it was rendered and rejects
  submissions completed in under ~3 seconds, which is implausible for a
  human filling out this many fields.

If spam becomes a real problem after launch, the next step would be adding
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (free,
privacy-respecting CAPTCHA alternative) — the function is structured so a
Turnstile token check could be added to `onRequestPost` without changing the
form's fields.

## Security notes

- No API keys are ever sent to the browser — `RESEND_API_KEY` only exists in
  the Cloudflare Pages Function's server-side environment.
- The function validates `email` format and all required fields
  server-side, not just client-side, so it can't be bypassed by calling the
  endpoint directly.
- `.env` and `.env.production` are gitignored.
