// Little Owl — contact form email sender (Resend)
// Deploy as a Cloudflare Worker (or adapt for Vercel/Netlify — the logic is identical).
//
// Setup:
// 1. In Resend: verify the littleowlsuffolk.com domain, create an API key.
// 2. Deploy this worker; set the secret:  wrangler secret put RESEND_API_KEY
// 3. Put the worker's URL into the Contact page's "formEndpoint" tweak.
//
// The email arrives at stay@littleowlsuffolk.com with:
//   subject:  Little Owl (contact form)
//   from:     "<visitor's name> (via website)" — sent from your verified domain
//   reply_to: the visitor's email address, so replying goes straight to them

const ALLOWED_ORIGIN = 'https://littleowlsuffolk.com'; // change to '*' while testing

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    let data;
    try { data = await request.json(); } catch { return new Response('Bad request', { status: 400, headers: cors }); }

    const name = String(data.name || '').trim().slice(0, 200);
    const email = String(data.email || '').trim().slice(0, 200);
    const phone = String(data.phone || '').trim().slice(0, 50);
    const message = String(data.message || '').trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
    }

    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const html = `
      <h2 style="font-family:Georgia,serif;">New enquiry from the website</h2>
      <p><strong>Name:</strong> ${esc(name)}<br>
      <strong>Email:</strong> ${esc(email)}<br>
      ${phone ? `<strong>Phone:</strong> ${esc(phone)}<br>` : ''}</p>
      <p style="white-space:pre-wrap;">${esc(message)}</p>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${name} (via website) <contact-form@littleowlsuffolk.com>`,
        to: ['stay@littleowlsuffolk.com'],
        reply_to: email,
        subject: 'Little Owl (contact form)',
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend error:', detail);
      return new Response(JSON.stringify({ error: 'Send failed' }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  },
};
