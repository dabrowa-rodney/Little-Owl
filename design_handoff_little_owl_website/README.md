# Handoff: Little Owl Suffolk — Website Redesign

## Overview
A full redesign of littleowlsuffolk.com — a one-property holiday-let site (romantic cottage for two in Hawstead, near Bury St Edmunds, Suffolk, with an outdoor hot tub bath). Two pages: a long-scroll homepage and a contact page with a working enquiry form. Bookings are taken directly on-site via an embedded Smoobu booking engine (no Airbnb redirect).

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to ship directly. The `.dc.html` files use a proprietary design-component runtime (`support.js`, `<x-dc>`, `{{ }}` template holes, `sc-if` conditionals, `style-hover` attributes) that will NOT run outside this design tool. **The task is to recreate these designs as a production static site** (plain HTML/CSS/JS is the natural fit — there is no existing codebase; a static-site setup deployed on Cloudflare Pages / Netlify / GitHub Pages is recommended). All markup, inline styles, and copy in the files are accurate and can be translated 1:1.

## Fidelity
**High-fidelity.** Colours, typography, spacing, copy and interactions are final. Recreate pixel-perfectly.

## Design Tokens
Colours:
- Page background (cream): `#FAF8F3`
- Ink (text, buttons, dark surfaces): `#2B2723`
- Dark section background: `#2F2A24`
- Terracotta accent (links, eyebrows, hovers): `#A97147` (hover-darker: `#8C5A36`; on-dark accent: `#C99B72`)
- Body-secondary text: `#4C463E`; muted: `#877E71`; on-dark body: `#D8CFC0`
- Borders/dividers: `#E9E2D6`; input borders: `#E0D7C6`; tinted panel: `#F1EBDF`
- Error red: `#B0432E`

Typography (Google Fonts):
- Display serif: `Cormorant Garamond` 400/500/600 (+italic) — headings, big numbers, review quotes
- Body sans: `Karla` 400/500/600/700 — everything else
- Eyebrow pattern: 13px Karla 700, `letter-spacing: 0.22em`, uppercase, terracotta
- H1 hero: `clamp(44px, 6vw, 76px)`; section H2s: `clamp(30px, 3.5vw, 44px)`; body 15–17px, line-height ~1.7

Shape & depth:
- Cards/images radius: 16px; large cards: 20px; inputs: 10px; buttons/chips: 999px (pill)
- Card shadow: `0 8px 30px rgba(43,39,35,0.06)`; cards bordered `1px solid #E9E2D6` on white
- Content column: `max-width: 1200px`, 32px side padding; sections ~88–110px vertical padding

Buttons:
- Primary: ink bg, cream text, pill, 700 weight; hover → terracotta bg
- Secondary: 1.5px ink border, transparent; hover → ink bg, cream text

`a` defaults: terracotta, no underline; hover `#8C5A36`.

## Screens / Views

### 1. Homepage (`Little Owl Home.dc.html`)
Sections top to bottom:
1. **Sticky header** — opaque `#FAF8F3`, 1px bottom border. Horizontal logo lockup: owl mark (46px) + script wordmark image (26px) with "SUFFOLK" (10px, 0.34em tracking, terracotta) stacked beside it. Nav right: The Cottage / Hot Tub & Garden / Reviews / Location (anchor links) + pill CTA "Check availability" → `#book`. Logo images use `mix-blend-mode: multiply` (they're JPEG-ish crops on cream).
2. **Hero** — full-bleed photo (`exterior-front.jpg`), 86vh (min 560px), `object-position: center 30%`; gradient overlay darkening top and bottom. Bottom-left: eyebrow "HAWSTEAD · SUFFOLK" + H1 "A little hideaway with big views" in cream. Bottom-right: rating card (cream bg 94% opacity, radius 16): "4.98" in 40px serif + "★★★★★ / 215 reviews · Airbnb Guest Favourite" (13px). The badge is toggleable (`showRatingBadge` prop).
3. **Intro** — 2-col grid (1.3fr/1fr, 64px gap). Left: eyebrow "COUNTRYSIDE BOUTIQUE GETAWAY", H2 "Get away from it all at The Little Owl", paragraph. Right: 2×2 stat card grid (1px `#E9E2D6` gap-borders, radius 16): Sleeps 2 / Hot tub bath / Log burner / Self check-in, each 26px serif + 13px muted subline.
4. **Inside the cottage** (`#cottage`) — heading row (H2 left, muted 14px note right: "Oak frame · handmade shutters · Norfolk Natural Living toiletries"). Photo grid: 3 cols × 2 rows of 300px, 16px gap; lounge-aframe spans cols 1–2 row 1; bedroom col 3 row 1; kitchen, bathroom, dining across row 2. Each photo has a pill figcaption bottom-left (cream 92% bg, 13px 600). Below: paragraph about welcome bread/jam, Netflix, Bose speaker.
5. **Hot tub & garden** (`#outside`) — dark section `#2F2A24`, cream text. 2-col (1fr/1.2fr). Left: eyebrow "THE GARDEN" (in `#C99B72`), H2 "Soak under the Suffolk sky", paragraph, then 4 bullet rows (accent "·" + text): hot tub bath for two / sunken fire pit / The Hut / festival lights till 11.30pm. Right: image grid — garden-field spans 2 cols (240px row), hut-chairs + hut-interior below (240px each), 14px gap, radius 16.
6. **Reviews** (`#reviews`) — centred header: eyebrow "GUEST REVIEWS", H2 "Rated 4.98 from 215 stays", muted line "98% five-star · Airbnb Guest Favourite · hosted by Hayley, Superhost for 5 years". 3-col card row: two white quote cards (22px italic serif quote + terracotta uppercase attribution: "Jon", "Sarah") and one tinted `#F1EBDF` card listing category ratings (Cleanliness 5.0, Accuracy 5.0, Check-in 5.0, Communication 5.0, Location 4.9) as space-between rows. NOTE: the "Sarah" quote is placeholder copy written by the designer — the owner should replace it with a real review (flag this).
7. **Location** (`#location`) — tinted band `#F1EBDF`. 2-col: photo `exterior-rear.jpg` (fills column height, `object-fit: cover`, `object-position: center 65%`) | eyebrow "WHERE YOU'LL BE", H2 "Hawstead, near Bury St Edmunds", paragraph (mentions Pea Porridge, Maison Bleue, The Angel), then pill chips: "Bury St Edmunds · 5 min", "The Friendly Loaf bakery · 3 min", "Lavenham · 20 min", "Cambridge · 45 min" (cream bg, `#E0D7C6` border).
8. **Booking** (`#book`) — centred: full stacked logo (90px), H2 "Check availability & book direct", line "Book direct with us for the best rates · check-in from 4pm · check-out 10am". Below: white card (radius 20, 24px padding, max-width 1048px, centred, card shadow) containing the **Smoobu booking engine** (see Integrations). Under the card: "Questions before you book? Get in touch" → `mailto:stay@littleowlsuffolk.com`.
9. **Footer** — top border; left "© 2026 Little Owl, Suffolk · Hawstead, Bury St Edmunds, IP29 5NJ"; right links: Contact (→ contact page), Instagram (`http://instagram.com/littleowlsuffolk`), Booking terms & conditions (`https://littleowlsuffolk.com/terms-conditions/`), Privacy policy (`https://littleowlsuffolk.com/privacy/`). 13px muted.

### 2. Contact (`Contact.dc.html`)
Same header (logo links home; nav anchors point at homepage sections) and footer. Main: 2-col grid (64px gap). Left: eyebrow "CONTACT", H1 "We'd love to hear from you", paragraph, then: "Prefer email? Write to us at stay@littleowlsuffolk.com", address line ("Little Owl · The Pound, Hawstead, Bury St Edmunds, Suffolk, IP29 5NJ"), Instagram link. Right: white form card (radius 20, 36px padding, shadow) with fields:
- Full name (text, required)
- Email address (email, required, format-validated)
- Phone number (tel, optional — labelled "(optional)")
- Message (textarea 5 rows, required)
Labels: 13px Karla 700 uppercase 0.06em. Inputs: cream `#FAF8F3` bg, `#E0D7C6` border, radius 10, 13px/16px padding; focus border terracotta. Submit: primary pill "Send message" → "Sending…" while in flight. Success replaces the form with a centred thank-you state (serif "Thank you", line, secondary-pill "Send another message"). Validation errors show above the button in `#B0432E`. Send failure shows: "Sorry, something went wrong sending your message. Please email us directly at stay@littleowlsuffolk.com."

## Interactions & Behavior
- Anchor navigation with `scroll-behavior: smooth`.
- All buttons/links have hover colour transitions (ink ↔ terracotta patterns as above).
- Contact form: client-side validation (required fields, email regex), POST JSON `{name, email, phone, message}` to the form endpoint, sending/sent/error states as described.
- No animations/parallax anywhere — the design is intentionally calm.

## Responsive (breakpoint: 820px)
- Header nav collapses to logo + "Check availability" pill only (other links hidden). A hamburger menu was discussed but not designed — optional improvement.
- Hero: 70vh, min 480px.
- All 2-col grids stack to 1 col; cottage photo grid becomes 2-col with 200px rows, first photo full-width; figcaptions shrink to 11px.
- Section vertical padding reduces to ~56–64px.
- Smoobu widget is natively responsive.

## Integrations
### Smoobu booking engine (homepage `#book`)
Official embed (property ID **515344**):
```html
<div id="apartmentIframeAll"></div>
<script src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"></script>
<script>
  BookingToolIframe.initialize({
    "url": "https://login.smoobu.com/en/booking-tool/iframe/515344",
    "baseUrl": "https://login.smoobu.com",
    "target": "#apartmentIframeAll"
  })
</script>
```
Hard-won implementation notes:
1. Initialise **exactly once** — double init leaves a duplicate hidden container that inflates the card height.
2. Smoobu's auto-resizer sets the iframe's inline height; give the iframe `min-height: 620px` via CSS so the date-picker dropdown has room before the resizer kicks in.
3. The widget maxes out at 1000px wide — centre it: `#apartmentIframeAll .smoobu-booking-tool-container { max-width: 1000px; margin: 0 auto; }`.
4. `smoobu-custom.css` (in this bundle) should be pasted into Smoobu → Configuration → Booking Engine → Booking System Settings → Custom style, so the widget's internals match the site. Selectors may need minor tweaks against the live widget.

### Contact form email (Resend)
`resend-worker/send-contact-email.js` (in this bundle) is a ready Cloudflare Worker:
- POST `{name, email, phone, message}` → sends via Resend API to **stay@littleowlsuffolk.com**
- Subject: `Little Owl (contact form)`; `reply_to` = visitor's email; from-name = visitor's name `(via website)` from `contact-form@littleowlsuffolk.com`
- Needs: Resend account with littleowlsuffolk.com verified, `RESEND_API_KEY` secret, and `ALLOWED_ORIGIN` set to the production domain. Point the contact form's fetch at the deployed worker URL.

## State Management
Contact page only: `{name, email, phone, message, error, status: 'idle'|'sending'|'sent'}`. Homepage has no state beyond the Smoobu embed lifecycle.

## Assets (`assets/`)
All photos were **cropped from a screenshot of the old site** — usable for layout, but soft. **Get the owner's original photos and logo before launch.**
- `exterior-front.jpg` — hero
- `lounge-aframe.jpg`, `bedroom.jpg`, `kitchen.jpg`, `bathroom.jpg`, `dining.jpg` — cottage grid
- `garden-field.jpg`, `hut-chairs.jpg`, `hut-interior.jpg` — garden section (hut-chairs also on Contact… actually Contact uses the form card, no photo)
- `exterior-rear.jpg` — location section
- `logo.png` (full stacked lockup — booking section), `logo-mark.png` (owl only — header), `logo-wordmark.png` (script "Little Owl" — header)
- `lounge-sofa.jpg` — unused spare

## Files
- `Little Owl Home.dc.html` — homepage design reference
- `Contact.dc.html` — contact page design reference
- `assets/` — images & logo
- `smoobu-custom.css` — CSS for inside the Smoobu widget (paste into Smoobu settings, not the site)
- `resend-worker/send-contact-email.js` — contact-form email function

## Outstanding tasks for implementation
1. Recreate both pages as production static HTML/CSS/JS (strip the design-tool runtime).
2. Replace screenshot-crop images/logo with originals; add proper `alt` text, favicons, OG/social meta, and basic SEO (title/description per page).
3. Deploy Resend worker; wire the form; set CORS to the production domain.
4. Replace the placeholder "Sarah" review with a real one.
5. GitHub repo + hosting + point littleowlsuffolk.com at it (keep `/terms-conditions/` and `/privacy/` URLs working — the footer links depend on them, or rebuild those pages in the new style).
