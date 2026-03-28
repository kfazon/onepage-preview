/**
 * Generator: Given a business data object, produce a complete one-page HTML preview.
 *
 * @param {Object} input
 * @param {string} input.name
 * @param {string} [input.tagline]
 * @param {string} [input.description]
 * @param {string} [input.address]
 * @param {string} [input.phone]
 * @param {string} [input.email]
 * @param {string} [input.website]
 * @param {string[]} [input.images]
 * @param {string} [input.hours]
 * @param {string} [input.mapUrl]
 * @param {string} [input.social]
 * @param {string} [input.template]  — 'launch-teaser' | 'product-spotlight' | 'event-waitlist'
 * @param {string} [input.claimUrl]   — URL to claim/upgrade this preview
 * @param {string} [input.manageUrl]  — URL to opt-out / manage this preview
 * @param {string} [input.brandColor] — hex accent color (default: #7c9cff)
 */
export function generatePreview(input = {}) {
  const template = input.template || 'launch-teaser';

  const renderers = {
    'launch-teaser': renderLaunchTeaser,
    'product-spotlight': renderProductSpotlight,
    'event-waitlist': renderEventWaitlist,
  };

  const render = renderers[template] || renderLaunchTeaser;

  return {
    ok: true,
    template,
    html: render({ ...input, _generatedAt: new Date().toISOString() }),
    meta: {
      generatedAt: new Date().toISOString(),
      version: '0.1.0',
    },
  };
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function brand(input) {
  const c = input.brandColor || '#7c9cff';
  return {
    primary: c,
    primaryDark: adjustBrightness(c, -20),
    text: input.textColor || '#eef2ff',
    muted: input.mutedColor || '#a6b0cf',
    bg: input.bgColor || '#0b1020',
  };
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function basePage({ title, bodyStyles, content, manageUrl, brandColor, name, claimUrl }) {
  const b = brand({ brandColor });
  const encodedName = encodeURIComponent(name);
  const claimAction = claimUrl || `https://peek.example.com/claim?name=${encodedName}`;
  const optoutAction = manageUrl || `https://peek.example.com/optout?name=${encodedName}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${esc(title)}" />
  <title>${esc(title)}</title>
  <style>
    :root {
      --bg: ${b.bg};
      --text: ${b.text};
      --muted: ${b.muted};
      --accent: ${b.primary};
      --accent-dark: ${b.primaryDark};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Inter, system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.65;
    }
    a { color: var(--accent); }
    .container { width: min(900px, calc(100% - 32px)); margin: 0 auto; }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(134,239,172,0.12);
      color: #86efac;
      border: 1px solid rgba(134,239,172,0.25);
    }
    .preview-footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 24px 0 32px;
      margin-top: 32px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .footer-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 18px;
    }
    .footer-card h3 { font-size: 0.95rem; margin-bottom: 6px; }
    .footer-card p { color: var(--muted); font-size: 0.85rem; margin-bottom: 12px; }
    .footer-card form { display: flex; flex-direction: column; gap: 8px; }
    .footer-card input[type=email] {
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.05);
      color: var(--text);
      font-size: 0.9rem;
      width: 100%;
    }
    .footer-card input[type=email]::placeholder { color: var(--muted); }
    .footer-card button {
      padding: 9px 16px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.88rem;
      transition: 180ms ease;
    }
    .btn-claim {
      background: var(--accent);
      color: #07111f;
    }
    .btn-claim:hover { opacity: 0.88; }
    .btn-optout {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.15);
      color: var(--muted);
    }
    .btn-optout:hover { border-color: rgba(255,255,255,0.3); }
    .footer-note {
      text-align: center;
      padding: 16px 0 8px;
      font-size: 0.78rem;
      color: rgba(166,176,207,0.5);
    }
    .footer-note a { color: rgba(166,176,207,0.6); }
    .success { color: #86efac; font-size: 0.85rem; padding: 8px 0; }
    @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
    ${bodyStyles || ''}
  </style>
</head>
<body>
${content}
<footer class="preview-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-card">
        <h3>👋 Claim this page</h3>
        <p>Want us to host this page and set up your own domain? Upgrade in minutes.</p>
        <form id="claim-form" onsubmit="submitClaim(event)">
          <input type="email" name="email" placeholder="your@email.com" required />
          <button type="submit" class="btn-claim">Claim &amp; upgrade →</button>
        </form>
        <div id="claim-success" class="success" style="display:none;">Got it! We'll be in touch within 24 hours.</div>
      </div>
      <div class="footer-card">
        <h3>❌ Remove this page</h3>
        <p>Don't want this preview? We'll take it down immediately and won't contact you again for this business.</p>
        <form id="optout-form" onsubmit="submitOptout(event)">
          <input type="hidden" name="business" value="${esc(name)}" />
          <button type="submit" class="btn-optout">Remove my business page</button>
        </form>
        <div id="optout-success" class="success" style="display:none;">Page removed. Sorry to see you go.</div>
      </div>
    </div>
    <p class="footer-note">
      Generated by <strong>Peek</strong> · Preview for <strong>${esc(name)}</strong>
      · Built from public business info · <a href="mailto:hello@peek.example">Contact</a>
    </p>
  </div>
</footer>
<script>
async function submitClaim(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const btn = form.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName: ${JSON.stringify(name)}, email })
    });
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('claim-success').style.display = 'block';
    } else {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — try again';
    btn.disabled = false;
  }
}
async function submitOptout(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');
  btn.textContent = 'Removing...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/optout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName: ${JSON.stringify(name)} })
    });
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('optout-success').style.display = 'block';
    } else {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — try again';
    btn.disabled = false;
  }
}
</script>
</body>
</html>`;
}

// ─── TEMPLATE: LAUNCH TEASER ──────────────────────────────────────────────────

function renderLaunchTeaser(input) {
  const b = brand(input);
  const content = `
<header style="padding:32px 0 24px; text-align:center; background: radial-gradient(circle at top, ${b.primary}22, transparent 60%);">
  <div class="container">
    ${input.images && input.images[0] ? `<img src="${esc(input.images[0])}" alt="${esc(input.name)}" style="width:100%;max-width:480px;border-radius:16px;margin-bottom:24px;" />` : ''}
    ${input.tagline ? `<span class="badge">${esc(input.tagline)}</span>` : ''}
    <h1 style="font-size:clamp(2rem,5vw,3.5rem);letter-spacing:-0.03em;margin:12px 0;line-height:1.1;">${esc(input.name)}</h1>
    ${input.description ? `<p style="max-width:60ch;margin:0 auto 20px;font-size:1.05rem;color:var(--muted);">${esc(input.description)}</p>` : ''}
    <a href="${esc(input.claimUrl || '#')}" style="display:inline-block;padding:14px 28px;background:var(--accent);color:#07111f;font-weight:700;border-radius:999px;text-decoration:none;margin-bottom:12px;">Claim this page</a>
    ${input.hours ? `<p style="color:var(--muted);font-size:0.9rem;">${esc(input.hours)}</p>` : ''}
  </div>
</header>
<main class="container" style="padding:40px 0;">
  ${input.address ? `<section style="margin-bottom:32px;"><h2 style="font-size:1.3rem;margin-bottom:8px;">📍 Location</h2><p style="color:var(--muted);">${esc(input.address)}</p>${input.mapUrl ? `<a href="${esc(input.mapUrl)}" target="_blank" rel="noopener">View on map →</a>` : ''}</section>` : ''}
  ${input.phone || input.email ? `<section style="margin-bottom:32px;"><h2 style="font-size:1.3rem;margin-bottom:8px;">📞 Contact</h2>${input.phone ? `<p>Phone: <a href="tel:${esc(input.phone)}">${esc(input.phone)}</a></p>` : ''}${input.email ? `<p>Email: <a href="mailto:${esc(input.email)}">${esc(input.email)}</a></p>` : ''}</section>` : ''}
  ${input.social ? `<section style="margin-bottom:32px;"><h2 style="font-size:1.3rem;margin-bottom:8px;">🌐 Online</h2><p><a href="${esc(input.social)}" target="_blank" rel="noopener">${esc(input.social)}</a></p></section>` : ''}
</main>`;
  return basePage({ ...input, title: input.name, content });
}

// ─── TEMPLATE: PRODUCT SPOTLIGHT ─────────────────────────────────────────────

function renderProductSpotlight(input) {
  const b = brand(input);
  const content = `
<header style="padding:40px 0 32px;text-align:center;background:radial-gradient(circle at top,${b.primary}22,transparent 60%);">
  <div class="container">
    ${input.images && input.images[0] ? `<img src="${esc(input.images[0])}" alt="${esc(input.name)}" style="width:100%;max-width:520px;border-radius:20px;margin-bottom:24px;" />` : ''}
    <h1 style="font-size:clamp(2rem,5vw,3.5rem);letter-spacing:-0.03em;margin-bottom:12px;">${esc(input.name)}</h1>
    ${input.tagline ? `<p style="color:var(--muted);font-size:1.1rem;max-width:55ch;margin:0 auto 20px;">${esc(input.tagline)}</p>` : ''}
    ${input.description ? `<p style="color:var(--muted);max-width:65ch;margin:0 auto 24px;">${esc(input.description)}</p>` : ''}
    <a href="${esc(input.claimUrl || '#')}" style="display:inline-block;padding:14px 28px;background:var(--accent);color:#07111f;font-weight:700;border-radius:999px;text-decoration:none;margin-bottom:8px;">Claim &amp; upgrade</a>
  </div>
</header>
<main class="container" style="padding:48px 0;">
  ${input.services || input.features ? `
  <section style="margin-bottom:40px;">
    <h2 style="font-size:1.5rem;margin-bottom:16px;text-align:center;">What we offer</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      ${(input.services || input.features || []).map(s => `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px;">
        <strong>${esc(typeof s === 'string' ? s : (s.name || ''))}</strong>
        ${typeof s === 'object' && s.description ? `<p style="color:var(--muted);font-size:0.9rem;margin-top:6px;">${esc(s.description)}</p>` : ''}
      </div>`).join('')}
    </div>
  </section>` : ''}
  ${input.address ? `<section style="margin-bottom:32px;padding:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;">
    <h2 style="font-size:1.2rem;margin-bottom:8px;">📍 Find us</h2>
    <p style="color:var(--muted);">${esc(input.address)}</p>
    ${input.hours ? `<p style="color:var(--muted);margin-top:6px;">${esc(input.hours)}</p>` : ''}
    ${input.mapUrl ? `<a href="${esc(input.mapUrl)}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;">Open in Maps →</a>` : ''}
  </section>` : ''}
  ${input.phone || input.email ? `<section style="margin-bottom:32px;">
    <h2 style="font-size:1.2rem;margin-bottom:8px;">Contact us</h2>
    ${input.phone ? `<p>📞 <a href="tel:${esc(input.phone)}">${esc(input.phone)}</a></p>` : ''}
    ${input.email ? `<p>✉️ <a href="mailto:${esc(input.email)}">${esc(input.email)}</a></p>` : ''}
  </section>` : ''}
</main>`;
  return basePage({ ...input, title: input.name, content });
}

// ─── TEMPLATE: EVENT WAITLIST ───────────────────────────────────────────────

function renderEventWaitlist(input) {
  const b = brand(input);
  const content = `
<header style="padding:48px 0 40px;text-align:center;background:linear-gradient(180deg,${b.primary}20,transparent);">
  <div class="container">
    ${input.images && input.images[0] ? `<img src="${esc(input.images[0])}" alt="${esc(input.name)}" style="width:100%;max-width:560px;border-radius:20px;margin-bottom:28px;" />` : ''}
    <span class="badge">${esc(input.tagline || 'Event')}</span>
    <h1 style="font-size:clamp(2rem,5vw,4rem);letter-spacing:-0.04em;margin:14px 0 10px;line-height:1.05;">${esc(input.name)}</h1>
    ${input.description ? `<p style="color:var(--muted);max-width:60ch;margin:0 auto 24px;font-size:1.05rem;">${esc(input.description)}</p>` : ''}
    <a href="${esc(input.claimUrl || '#')}" style="display:inline-block;padding:14px 32px;background:var(--accent);color:#07111f;font-weight:700;border-radius:999px;text-decoration:none;font-size:1.05rem;">Join waitlist →</a>
  </div>
</header>
<main class="container" style="padding:48px 0;">
  ${input.agenda ? `<section style="margin-bottom:40px;">
    <h2 style="font-size:1.4rem;margin-bottom:16px;">📋 Agenda</h2>
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${(input.agenda || []).map(item => `<div style="display:flex;gap:12px;padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;">
        ${item.time ? `<span style="color:var(--accent);font-weight:600;white-space:nowrap;">${esc(item.time)}</span>` : ''}
        <span>${esc(item.title || item)}</span>
      </div>`).join('')}
    </div>
  </section>` : ''}
  ${input.speakers ? `<section style="margin-bottom:40px;">
    <h2 style="font-size:1.4rem;margin-bottom:16px;">🎤 Speakers</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;">
      ${(input.speakers || []).map(s => `<div style="text-align:center;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;">
        ${s.photo ? `<img src="${esc(s.photo)}" alt="${esc(s.name)}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:10px;" />` : ''}
        <strong style="display:block;">${esc(s.name || '')}</strong>
        ${s.role ? `<small style="color:var(--muted);">${esc(s.role)}</small>` : ''}
      </div>`).join('')}
    </div>
  </section>` : ''}
  ${input.address ? `<section style="margin-bottom:32px;padding:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;">
    <p style="font-size:1.1rem;">📍 <strong>${esc(input.address)}</strong></p>
    ${input.mapUrl ? `<a href="${esc(input.mapUrl)}" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;">View on map →</a>` : ''}
  </section>` : ''}
  ${input.hours ? `<p style="color:var(--muted);margin-bottom:24px;">🕒 ${esc(input.hours)}</p>` : ''}
  ${input.phone || input.email ? `<section>
    <p>${input.phone ? `📞 <a href="tel:${esc(input.phone)}">${esc(input.phone)}</a>` : ''}</p>
    ${input.email ? `<p>✉️ <a href="mailto:${esc(input.email)}">${esc(input.email)}</a></p>` : ''}
  </section>` : ''}
</main>`;
  return basePage({ ...input, title: input.name, content });
}
