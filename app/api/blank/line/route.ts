/**
 * Blank — create a line, and list the ones on the go.
 *
 * The document used to be the URL and nothing else, which made it disposable:
 * close the tab and it was gone, with no undo (the provider uses replaceState on
 * purpose) and no record of what a partner had changed. This is the durable
 * half — the URL now identifies a row rather than containing the document.
 *
 * Gated on the same unlock cookie as the page and written with the service-role
 * key, exactly like blank_renders. RLS is on with no policies, so the anon key
 * reaches neither table.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isUnlocked } from '@/lib/unlock';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Roughly 1e10 ids. Short enough to read aloud, long enough not to collide. */
const ID_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';
const ID_LENGTH = 7;

/** Cap on a stored document, so a pathological state cannot fill the table. */
const MAX_STATE_BYTES = 256 * 1024;

export function newId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ID_ALPHABET[b % ID_ALPHABET.length]).join('');
}

export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** One initial, or nothing. There is no login here; this is a claim. */
export const cleanWho = (v: unknown) =>
  typeof v === 'string' ? v.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 1) : '';

export function stateTooBig(state: unknown): boolean {
  try {
    return JSON.stringify(state).length > MAX_STATE_BYTES;
  } catch {
    // Circular or otherwise unserialisable — reject rather than throw later.
    return true;
  }
}

/** Recent lines, newest first. The "what have we got on the go" list. */
export async function GET() {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }
  const supabase = db();
  if (!supabase) return NextResponse.json({ error: 'Not configured.' }, { status: 503 });

  const { data, error } = await supabase
    .from('blank_lines')
    .select('id, title, version, updated_by, updated_at')
    .order('updated_at', { ascending: false })
    .limit(30);

  if (error) {
    console.error('[blank/line] list', error.message);
    return NextResponse.json({ error: 'Could not load your lines.' }, { status: 503 });
  }
  return NextResponse.json({ lines: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }
  const supabase = db();
  if (!supabase) return NextResponse.json({ error: 'Not configured.' }, { status: 503 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const state = body.state;
  if (!state || typeof state !== 'object') {
    return NextResponse.json({ error: 'A line needs a state.' }, { status: 422 });
  }
  if (stateTooBig(state)) {
    return NextResponse.json({ error: 'That line is too large to save.' }, { status: 413 });
  }

  const id = newId();
  const by = cleanWho(body.by);
  const title = typeof body.title === 'string' ? body.title.trim().slice(0, 80) : null;

  const { error } = await supabase
    .from('blank_lines')
    .insert({ id, title, state, version: 1, updated_by: by || null });
  if (error) {
    console.error('[blank/line] create', error.message);
    return NextResponse.json({ error: 'Could not save.' }, { status: 503 });
  }

  // Revision 1 so history starts at the beginning rather than at the first edit.
  await supabase
    .from('blank_line_revisions')
    .insert({ line_id: id, version: 1, state, saved_by: by || null });

  return NextResponse.json({ id, version: 1 });
}
