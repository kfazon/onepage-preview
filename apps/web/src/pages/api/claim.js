/**
 * POST /api/claim
 * Body: { businessName, email }
 * Returns: { ok }
 */
import { addClaim } from '@onepage/generator/store';

export const prerender = false;

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid JSON' }, 400);
  }

  const { businessName, email } = body;
  if (!businessName || !email) {
    return json({ ok: false, error: 'businessName and email are required' }, 400);
  }

  // Basic email validation
  if (!email.includes('@') || !email.includes('.')) {
    return json({ ok: false, error: 'invalid email' }, 400);
  }

  const result = addClaim(businessName, email);
  return json({ ok: true, message: 'Page claimed successfully' });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
