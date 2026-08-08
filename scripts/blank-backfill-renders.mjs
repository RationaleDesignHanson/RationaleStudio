/**
 * One-shot: move already-cached Blank renders into Supabase Storage.
 *
 * The cache stored Replicate's own output URLs, which expire. This copies every
 * row that is still alive into the bucket and rewrites its image_url, and
 * deletes the rows whose upstream image has already gone so those tuples can be
 * re-rendered instead of serving a 404 forever.
 *
 * Idempotent: rows already pointing at our bucket are skipped.
 *
 *   node scripts/blank-backfill-renders.mjs [--apply]
 *
 * Without --apply it reports what it would do and writes nothing.
 */

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const APPLY = process.argv.includes('--apply');
const BUCKET = 'blank-renders';

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const read = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');

const SUPABASE_URL = read('NEXT_PUBLIC_SUPABASE_URL');
const SERVICE_KEY = read('SUPABASE_SERVICE_ROLE_KEY');
if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('Supabase env vars missing from .env.local');

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const durablePrefix = `/storage/v1/object/public/${BUCKET}/`;

const { data: rows, error } = await supabase
  .from('blank_renders')
  .select('tuple_key, image_url, created_at')
  .order('created_at', { ascending: true });
if (error) throw new Error(`read failed: ${error.message}`);

console.log(`${rows.length} rows${APPLY ? '' : '  (dry run — pass --apply to write)'}\n`);

let already = 0, moved = 0, dropped = 0, failed = 0;

for (const row of rows) {
  const key = row.tuple_key;
  if (row.image_url?.includes(durablePrefix)) {
    already++;
    console.log(`skip    already durable   ${key.slice(0, 62)}`);
    continue;
  }

  const res = await fetch(row.image_url).catch((e) => ({ ok: false, status: `ERR ${e.message}` }));
  if (!res.ok) {
    dropped++;
    console.log(`DELETE  upstream ${res.status}       ${key.slice(0, 62)}`);
    if (APPLY) {
      const { error: delErr } = await supabase.from('blank_renders').delete().eq('tuple_key', key);
      if (delErr) console.error(`        delete failed: ${delErr.message}`);
    }
    continue;
  }

  const contentType = res.headers.get('content-type') ?? 'image/jpeg';
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
  const path = `${key.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)}.${ext}`;
  const bytes = new Uint8Array(await res.arrayBuffer());

  if (!APPLY) {
    moved++;
    console.log(`MOVE    ${String(Math.round(bytes.byteLength / 1024)).padStart(4)}KB -> ${path.slice(0, 48)}`);
    continue;
  }

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType, upsert: true });
  if (upErr) {
    failed++;
    console.error(`FAIL    upload ${upErr.message}  ${key.slice(0, 50)}`);
    continue;
  }

  const publicUrl = `${SUPABASE_URL.replace(/\/$/, '')}${durablePrefix}${path}`;
  const { error: updErr } = await supabase
    .from('blank_renders')
    .update({ image_url: publicUrl })
    .eq('tuple_key', key);
  if (updErr) {
    failed++;
    console.error(`FAIL    update ${updErr.message}  ${key.slice(0, 50)}`);
    continue;
  }
  moved++;
  console.log(`moved   ${String(Math.round(bytes.byteLength / 1024)).padStart(4)}KB  ${key.slice(0, 58)}`);
}

console.log(
  `\nalready durable ${already} · moved ${moved} · deleted (expired) ${dropped} · failed ${failed}`,
);
if (!APPLY) console.log('Dry run — nothing was written.');
