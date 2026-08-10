/**
 * Blank — load and save one line.
 *
 * THE SAVE IS OPTIMISTIC, and that is the whole point of the endpoint.
 *
 * Before this, two people on the same link overwrote each other in silence: the
 * later write won, the earlier work vanished, and nothing anywhere recorded that
 * it had happened. A save now carries the version it was based on, the UPDATE
 * matches on that version, and zero rows affected means somebody else got there
 * first. That is a 409 carrying THEIR state, so the client can show what changed
 * instead of guessing.
 *
 * Two async people making chunky edits do not need CRDTs. The goal is to make a
 * silent overwrite impossible, not to build real-time multiplayer.
 */

import { NextResponse } from 'next/server';
import { isUnlocked } from '@/lib/unlock';
import { cleanWho, db, stateTooBig } from '../route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const idOk = (id: string) => /^[a-z0-9]{4,16}$/.test(id);

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!idOk(id)) return NextResponse.json({ error: 'Not a line id.' }, { status: 400 });

  const supabase = db();
  if (!supabase) return NextResponse.json({ error: 'Not configured.' }, { status: 503 });

  const { data, error } = await supabase
    .from('blank_lines')
    .select('id, title, state, version, updated_by, updated_at')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('[blank/line] load', error.message);
    return NextResponse.json({ error: 'Could not load that line.' }, { status: 503 });
  }
  if (!data) return NextResponse.json({ error: 'No line with that id.' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!idOk(id)) return NextResponse.json({ error: 'Not a line id.' }, { status: 400 });

  const supabase = db();
  if (!supabase) return NextResponse.json({ error: 'Not configured.' }, { status: 503 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const state = body.state;
  const base = Number(body.version);
  if (!state || typeof state !== 'object') {
    return NextResponse.json({ error: 'A save needs a state.' }, { status: 422 });
  }
  if (!Number.isInteger(base) || base < 1) {
    return NextResponse.json({ error: 'A save needs the version it is based on.' }, { status: 422 });
  }
  if (stateTooBig(state)) {
    return NextResponse.json({ error: 'That line is too large to save.' }, { status: 413 });
  }

  const by = cleanWho(body.by);
  const next = base + 1;

  // The concurrency check IS this WHERE clause. Matching on the base version
  // means a stale save updates nothing rather than clobbering a newer one, and
  // it is atomic without a transaction because it is a single statement.
  const { data, error } = await supabase
    .from('blank_lines')
    .update({
      state,
      version: next,
      updated_by: by || null,
      updated_at: new Date().toISOString(),
      ...(typeof body.title === 'string' ? { title: body.title.trim().slice(0, 80) } : {}),
    })
    .eq('id', id)
    .eq('version', base)
    .select('version')
    .maybeSingle();

  if (error) {
    console.error('[blank/line] save', error.message);
    return NextResponse.json({ error: 'Could not save.' }, { status: 503 });
  }

  if (!data) {
    // Either the id is gone or somebody saved first. Return THEIR state so the
    // client can show what changed rather than a bare "conflict".
    const current = await supabase
      .from('blank_lines')
      .select('id, title, state, version, updated_by, updated_at')
      .eq('id', id)
      .maybeSingle();
    if (!current.data) return NextResponse.json({ error: 'No line with that id.' }, { status: 404 });
    return NextResponse.json(
      { error: 'Someone else saved first.', conflict: current.data },
      { status: 409 },
    );
  }

  await supabase
    .from('blank_line_revisions')
    .insert({ line_id: id, version: next, state, saved_by: by || null });

  return NextResponse.json({ version: next });
}
