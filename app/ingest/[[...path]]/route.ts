/**
 * PostHog reverse-proxy route handler.
 *
 * Replaces a previous next.config.mjs rewrite that didn't survive Netlify's
 * edge layer — gzip-encoded capture bodies came back as 400 from upstream.
 * A handler runs in a Node serverless function with full control over the
 * request, so we can:
 *
 *   - forward the raw body byte-for-byte (preserves PostHog's gzip)
 *   - forward query params (preserves session_id, ip flag, etc.)
 *   - route /ingest/static/* to the assets host, everything else to ingest
 *   - return upstream's body + status + content-type to the browser
 *
 * Path mapping (matches the prior rewrite):
 *   /ingest/static/foo.js  →  https://us-assets.i.posthog.com/static/foo.js
 *   /ingest/e              →  https://us.i.posthog.com/e
 *   /ingest/decide         →  https://us.i.posthog.com/decide
 *   /ingest/<anything>     →  https://us.i.posthog.com/<anything>
 */

import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const INGEST_HOST = 'https://us.i.posthog.com';
const ASSETS_HOST = 'https://us-assets.i.posthog.com';

function upstreamFor(pathSegments: string[]): string {
  const path = pathSegments.join('/');
  if (path.startsWith('static/')) {
    return `${ASSETS_HOST}/${path}`;
  }
  return `${INGEST_HOST}/${path}`;
}

async function proxy(req: NextRequest, pathSegments: string[]): Promise<Response> {
  const targetBase = upstreamFor(pathSegments);
  const url = new URL(req.url);
  const target = `${targetBase}${url.search}`;

  // Forward every header except hop-by-hop ones. Specifically preserve
  // content-encoding so gzipped bodies carry through to PostHog.
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (['host', 'connection', 'content-length'].includes(key.toLowerCase())) return;
    headers.set(key, value);
  });
  // PostHog uses the host header to route to the right project — overwrite it
  // so we hit the upstream domain rather than passing rationale.work through.
  headers.set('host', new URL(targetBase).host);

  const init: RequestInit = {
    method: req.method,
    headers,
    redirect: 'manual',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // Stream raw bytes through — no parse, no re-serialize, no compression mangling.
    init.body = await req.arrayBuffer();
    // @ts-expect-error - duplex required when piping a body in undici
    init.duplex = 'half';
  }

  const upstream = await fetch(target, init);

  const respHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (['transfer-encoding', 'connection'].includes(key.toLowerCase())) return;
    respHeaders.set(key, value);
  });

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: respHeaders,
  });
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const { path = [] } = await params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const { path = [] } = await params;
  return proxy(req, path);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
