/**
 * BLANK — durable storage for paid renders.
 *
 * The cache used to store Replicate's own output URL. Those URLs expire: 4 of
 * the first 12 cached renders were already 404 eighteen hours after they were
 * generated. That is worse than it sounds, because the cache-hit path returns
 * the stored URL without checking it and returns BEFORE the render call — so a
 * tuple whose URL had died could never regenerate. It served a 404 forever.
 *
 * It also defeated the reason the cache exists. The schema's own comment says
 * "the cache, not a seed, is what guarantees a shared link shows the sender's
 * image" — and a shared link is the entire point of the tool.
 *
 * So: every paid render is copied into Supabase Storage and the cache stores
 * OUR url, which does not expire. `ensureDurable` additionally heals rows
 * written before this change.
 */

import type { SupabaseClient } from '@supabase/supabase-js';

export const RENDER_BUCKET = 'blank-renders';

/** Public object URL for a bucket path. */
export function publicUrl(supabaseUrl: string, path: string): string {
  return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${RENDER_BUCKET}/${path}`;
}

/** True if a URL is one we host, i.e. one that will still resolve tomorrow. */
export function isDurable(url: string | null | undefined): boolean {
  return typeof url === 'string' && url.includes(`/storage/v1/object/public/${RENDER_BUCKET}/`);
}

/**
 * A tuple key is already filesystem-safe by construction (lowercase ids joined
 * by dots) but it is user-adjacent input, so it is sanitised rather than
 * trusted. Length is capped because object keys have limits and the reference
 * tuples embed a 16-char hash.
 */
export function storagePathFor(tupleKey: string, ext = 'jpg'): string {
  const safe = tupleKey.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180);
  return `${safe}.${ext}`;
}

function extFor(contentType: string | null): string {
  if (!contentType) return 'jpg';
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  return 'jpg';
}

/**
 * Copy a freshly rendered image into our own bucket.
 *
 * Returns null on any failure. Callers must treat null as "not durable" and
 * decide for themselves whether to still serve the ephemeral URL — the image is
 * already paid for, so throwing it away would be worse than serving something
 * short-lived. What they must NOT do is cache the ephemeral URL.
 */
export async function persistRender(
  supabase: SupabaseClient,
  sourceUrl: string,
  tupleKey: string,
): Promise<{ url: string; path: string } | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;

  try {
    const res = await fetch(sourceUrl);
    if (!res.ok) {
      console.error('[renderStore] source fetch failed', res.status, tupleKey);
      return null;
    }
    const contentType = res.headers.get('content-type');
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength === 0) {
      console.error('[renderStore] source returned 0 bytes', tupleKey);
      return null;
    }

    const path = storagePathFor(tupleKey, extFor(contentType));
    const { error } = await supabase.storage.from(RENDER_BUCKET).upload(path, bytes, {
      contentType: contentType ?? 'image/jpeg',
      // Same tuple, same image — overwriting is correct and makes the retry
      // path idempotent.
      upsert: true,
    });
    if (error) {
      console.error('[renderStore] upload failed', error.message, tupleKey);
      return null;
    }
    return { url: publicUrl(supabaseUrl, path), path };
  } catch (e) {
    console.error('[renderStore] persist threw', e instanceof Error ? e.message : String(e), tupleKey);
    return null;
  }
}

/**
 * Make a cache hit trustworthy.
 *
 * - Already ours: return it, no network.
 * - Ephemeral but still alive: copy it into the bucket now, update the row, and
 *   return the durable URL. The render is never paid for twice.
 * - Ephemeral and dead: delete the row and return null. The caller falls
 *   through to a fresh render, which is the only way to recover — and because
 *   the row is gone, the next request will not hit the same corpse.
 */
export async function ensureDurable(
  supabase: SupabaseClient,
  tupleKey: string,
  cachedUrl: string,
): Promise<string | null> {
  if (isDurable(cachedUrl)) return cachedUrl;

  const persisted = await persistRender(supabase, cachedUrl, tupleKey);
  if (persisted) {
    // No new column for this: `isDurable` reads durability off the URL and the
    // object path is derivable from the tuple key, so the existing schema is
    // sufficient and this needed no migration.
    const { error } = await supabase
      .from('blank_renders')
      .update({ image_url: persisted.url })
      .eq('tuple_key', tupleKey);
    if (error) console.error('[renderStore] heal write failed', error.message, tupleKey);
    return persisted.url;
  }

  // Unrecoverable: the upstream URL has expired and we never kept a copy.
  const { error } = await supabase.from('blank_renders').delete().eq('tuple_key', tupleKey);
  if (error) console.error('[renderStore] corpse delete failed', error.message, tupleKey);
  return null;
}
