# Launch Checklist

Use this before connecting the production domain and going live.

## Content

- [ ] Every item in `CLIENT_VERIFICATION.md` reviewed and resolved with the
      client
- [ ] Real project photography added (see `ASSETS_NEEDED.md`); placeholders
      replaced on Homepage, all 12 service pages, About, and Gallery
- [ ] At least a few real, verified customer reviews added via the CMS (or a
      conscious decision made to launch with the "coming soon" state)
- [ ] Service area list confirmed accurate
- [ ] Financing and warranty language confirmed with the client
- [ ] Privacy Policy and Terms and Conditions reviewed by an attorney
- [ ] Logo file added if the client has one (currently a text-based "JC"
      mark)

## Forms

- [ ] Resend account created and domain verified
- [ ] `RESEND_API_KEY`, `ESTIMATE_TO_EMAIL`, `ESTIMATE_FROM_EMAIL` set in
      Cloudflare Pages environment variables (see `FORM_SETUP.md`)
- [ ] Test submission sent from both Request an Estimate and Contact forms
      on the live preview URL, confirmed received by email
- [ ] Confirm honeypot/timing spam protection doesn't block real users
      (test a normal, slower submission)

## Technical

- [ ] `npm run build` completes with zero errors
- [ ] All internal links checked (no 404s)
- [ ] Site tested on real mobile devices, not just browser dev tools,
      including the sticky mobile call/estimate bar and the mobile menu
- [ ] Lighthouse run in Chrome DevTools against the production build
      (`npm run preview`) confirming Performance/Accessibility/Best
      Practices/SEO all score in the target range
- [ ] `sitemap-index.xml` and `robots.txt` verified on the deployed preview
      URL
- [ ] Structured data spot-checked with Google's Rich Results Test on the
      homepage, one service page, and the FAQ page
- [ ] No secrets committed to the repository (`.env` confirmed gitignored)

## CMS

- [ ] Pages CMS connected to the GitHub repo (see `CMS_GUIDE.md`)
- [ ] Client account created and tested — client (or their designated staff)
      can log in and successfully edit and publish a change
- [ ] `CLIENT_EDITING_GUIDE.md` shared with whoever will maintain content

## Go-live

- [ ] Cloudflare Pages custom domain added for `jirehcooler.com`
- [ ] DNS updated at GoDaddy (nameservers or CNAME/A records, per
      `DEPLOYMENT.md`) — **only after explicit client approval**
- [ ] SSL certificate confirmed active
- [ ] Old WordPress site kept live in parallel until the new site is
      verified working end-to-end on the real domain
- [ ] Google Search Console / Bing Webmaster Tools updated with the new
      sitemap
- [ ] 301 redirects planned for any old URLs worth preserving (e.g. if the
      old site's privacy-policy or terms URLs were indexed and linked
      elsewhere)
