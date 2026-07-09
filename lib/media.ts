/**
 * Video assets are served from a CDN (Cloudflare R2) in production and from
 * /public locally. Set NEXT_PUBLIC_VIDEO_CDN_BASE (e.g. a `pub-*.r2.dev` or
 * `media.rationale.work` origin) to flip video `<src>` to the CDN. When it's
 * empty (local dev, or before the migration), paths resolve to /public as
 * before — so this is a no-op until the env var exists. Posters and images
 * stay local either way.
 */
const BASE = (process.env.NEXT_PUBLIC_VIDEO_CDN_BASE ?? '').replace(/\/$/, '');

export function videoUrl(path: string): string {
  if (!BASE) return path;
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}
