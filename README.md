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
- `resend-worker/send-contact-email.js` — Cloudflare Worker that emails contact-form
  submissions to stay@littleowlsuffolk.com via Resend
- `smoobu-custom.css` — paste into Smoobu → Configuration → Booking Engine →
  Booking System Settings → Custom style (styles the widget's internals; not part of the site)

## Deploying

The site is a plain folder — point any static host (Cloudflare Pages, Netlify,
GitHub Pages) at `site/` with no build command.

### Contact form

The form in `contact/index.html` posts JSON `{name, email, phone, message}` to the
URL in the `FORM_ENDPOINT` constant (in the inline script at the bottom of that file).
While `FORM_ENDPOINT` is empty the form runs in demo mode and simulates success.

To go live:
1. In Resend: verify the littleowlsuffolk.com domain, create an API key.
2. Deploy `resend-worker/send-contact-email.js` as a Cloudflare Worker;
   set the secret `RESEND_API_KEY` (`wrangler secret put RESEND_API_KEY`).
3. Set `ALLOWED_ORIGIN` in the worker to `https://littleowlsuffolk.com`.
4. Put the worker URL into `FORM_ENDPOINT`.

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
