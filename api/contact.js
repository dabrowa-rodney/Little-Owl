// Little Owl — contact form email sender (Resend), as a Vercel serverless function.
// Adapted from resend-worker/send-contact-email.js; same behaviour, but served
// from the site's own domain at /api/contact so no CORS is involved.
//
// Setup:
// 1. In Resend: verify the littleowlsuffolk.com domain, create an API key.
// 2. In Vercel: add the RESEND_API_KEY environment variable to this project.
//
// The email arrives at stay@littleowlsuffolk.com with:
//   subject:  Little Owl (contact form)
//   from:     "<visitor's name> (via website)" — sent from the verified domain
//   reply_to: the visitor's email address, so replying goes straight to them

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const data = req.body || {};
  const name = String(data.name || '').trim().slice(0, 200);
  const email = String(data.email || '').trim().slice(0, 200);
  const phone = String(data.phone || '').trim().slice(0, 50);
  const message = String(data.message || '').trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `
    <h2 style="font-family:Georgia,serif;">New enquiry from the website</h2>
    <p><strong>Name:</strong> ${esc(name)}<br>
    <strong>Email:</strong> ${esc(email)}<br>
    ${phone ? `<strong>Phone:</strong> ${esc(phone)}<br>` : ''}</p>
    <p style="white-space:pre-wrap;">${esc(message)}</p>`;

  const upstream = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
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

  if (!upstream.ok) {
    const detail = await upstream.text();
    console.error('Resend error:', detail);
    res.status(502).json({ error: 'Send failed', upstreamStatus: upstream.status });
    return;
  }

  res.status(200).json({ ok: true });
}
