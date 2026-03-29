/**
 * POST /api/optout
 * Body: { businessName }
 * Returns: { ok }
 *
 * Cloudflare: reads PREVIEWS KV from platform.env
 * Local dev: uses in-memory fallback
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

  const store = createStore(platform?.env?.PREVIEWS);
  await store.addOptout(businessName);
  return json({ ok: true, message: 'Page removed. You will no longer receive outreach for this business.' });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
