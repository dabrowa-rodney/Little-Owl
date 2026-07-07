# Little Owl, Suffolk — littleowlsuffolk.com

Production static site for the Little Owl holiday cottage (Hawstead, Bury St Edmunds).
Rebuilt from the Claude Design handoff in `design_handoff_little_owl_website/`.

## Structure

- `site/` — the deployable static site (plain HTML/CSS/JS, no build step)
  - `index.html` — homepage (hero, cottage, hot tub & garden, reviews, location, Smoobu booking)
  - `contact/index.html` — contact page with enquiry form
  - `terms-conditions/index.html`, `privacy/index.html` — legal pages (URLs preserved from the old site)
  - `styles.css` — all styling; design tokens as CSS custom properties at the top
  - `404.html`, `robots.txt`, `sitemap.xml`
- `api/contact.js` — Vercel serverless function that emails contact-form submissions
  to stay@littleowlsuffolk.com via Resend (needs the `RESEND_API_KEY` env var)
- `vercel.json` — tells Vercel to serve `site/` as the static output (no build step)
- `resend-worker/send-contact-email.js` — the original Cloudflare Worker version of the
  email function, kept for reference; `api/contact.js` is the deployed one
- `smoobu-custom.css` — paste into Smoobu → Configuration → Booking Engine →
  Booking System Settings → Custom style (styles the widget's internals; not part of the site)

## Deploying (Vercel)

1. Push this repo to GitHub and import it into Vercel (framework preset: **Other**,
   no build command — `vercel.json` already points the output at `site/`).
2. In Resend: verify the littleowlsuffolk.com domain, create an API key.
3. In Vercel → Project → Settings → Environment Variables: add `RESEND_API_KEY`.
4. In Vercel → Project → Settings → Domains: add `littleowlsuffolk.com` and follow
   the DNS instructions at the registrar.

### Contact form

The form in `contact/index.html` posts JSON `{name, email, phone, message}` to the
same-origin function at `/api/contact` — no CORS involved. On localhost it runs in
demo mode (simulates success) since there is no function runtime.

### Smoobu

The homepage embeds booking widget for property 515344. Initialise it exactly once
(double init duplicates a hidden container and inflates the card height). The iframe
gets `min-height: 620px` so the date picker has room before Smoobu's auto-resizer runs.

## Before / shortly after launch (owner actions)

- Replace the photos and logo in `site/assets/` — they're crops from a screenshot of
  the old site and are soft. Get originals from the owner.
- The "Sarah" review on the homepage is placeholder copy written by the designer —
  replace it with a real guest review.
- Review the legal pages: terms were ported from the old site with two fixes
  ("the ships unique facilities" → "the property's unique facilities"; check-in time
  3pm → 4pm to match the rest of the site — old cancellation email was
  hello@littleowlsuffolk.com, now stay@). The privacy policy was rewritten from
  scratch (the old one was unedited WordPress boilerplate) and should be checked.
