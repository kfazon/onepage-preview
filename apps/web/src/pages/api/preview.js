/**
 * POST /api/preview
 * Body: { business data object }
 * Returns: { ok, template, html, meta }
 *
 * GET /api/preview?name=...&template=...&...
 * Default: returns rendered HTML page
 * Add ?format=json to get JSON payload
 */
import { generatePreview } from '@onepage/generator';

export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const data = Object.fromEntries(url.searchParams);
  const format = (url.searchParams.get('format') || 'html').toLowerCase();

  // Support ?data=base64(json)
  if (url.searchParams.has('data')) {
    try {
      const parsed = JSON.parse(atob(url.searchParams.get('data')));
      Object.assign(data, parsed);
    } catch {}
  }

  if (!data.name) {
    return json({ ok: false, error: 'name is required' }, 400);
  }

  const result = generatePreview(data);

  if (format === 'json') {
    return json(result);
  }

  return new Response(result.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid JSON body' }, 400);
  }

  if (!body.name) {
    return json({ ok: false, error: 'name is required' }, 400);
  }

  const result = generatePreview(body);
  return json(result);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
