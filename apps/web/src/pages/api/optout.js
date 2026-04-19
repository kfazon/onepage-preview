/**
 * POST /api/optout
 * Body: { businessName }
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

  const { businessName } = body;
  if (!businessName) {
    return json({ ok: false, error: 'businessName is required' }, 400);
  }

  const env = {
    KV_REST_BASE: platform?.env?.KV_REST_BASE,
    KV_REST_TOKEN: platform?.env?.KV_REST_TOKEN,
  };
  const store = createStore(platform?.env?.PREVIEWS, env);
  await store.addOptout(businessName);
  return json({ ok: true, message: 'Page removed.' });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
