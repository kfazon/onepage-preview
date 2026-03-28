/**
 * POST /api/preview
 * Body: { business data object }
 * Returns: { ok, template, html, meta }
 *
 * GET /api/preview?name=...&template=...&...
 * Returns: rendered HTML page
 */
import { generatePreview } from '@onepage/generator';

export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const data = Object.fromEntries(url.searchParams);

  // Support ?data=base64(json)
  if (url.searchParams.has('data')) {
    try {
      const parsed = JSON.parse(atob(url.searchParams.get('data')));
      Object.assign(data, parsed);
    } catch {}
  }

  if (!data.name) {
    return new Response(JSON.stringify({ ok: false, error: 'name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = generatePreview(data);
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
}

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.name) {
    return new Response(JSON.stringify({ ok: false, error: 'name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = generatePreview(body);
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
}
