/**
 * POST /api/claim
 * Body: { businessName, email }
 * Returns: { ok }
 */
import { createStore } from '@onepage/generator/store';

export const prerender = false;

export async function POST({ request, platform }) {
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

  if (!email.includes('@') || !email.includes('.')) {
    return json({ ok: false, error: 'invalid email' }, 400);
  }

  // Pass both KV binding and env vars for KV REST API
  const env = {
    KV_REST_BASE: platform?.env?.KV_REST_BASE,
    KV_REST_TOKEN: platform?.env?.KV_REST_TOKEN,
  };
  const store = createStore(platform?.env?.PREVIEWS, env);
  await store.addClaim(businessName, email);
  return json({ ok: true, message: 'Page claimed successfully' });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
