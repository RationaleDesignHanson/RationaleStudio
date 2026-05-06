import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  UNLOCK_COOKIE,
  UNLOCK_MAX_AGE_SECONDS,
  checkPassword,
  signScopes,
  verifyScopes,
} from '@/lib/unlock';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: { password?: unknown; scope?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  const scope = typeof body.scope === 'string' && body.scope.length > 0 ? body.scope : undefined;

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 });
  }

  const addScope = checkPassword(scope, password);
  if (!addScope) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const store = await cookies();
  const existing = await verifyScopes(store.get(UNLOCK_COOKIE)?.value);
  const merged = Array.from(new Set([...existing, addScope]));
  const value = await signScopes(merged);

  store.set(UNLOCK_COOKIE, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: UNLOCK_MAX_AGE_SECONDS,
    path: '/',
  });

  return NextResponse.json({ ok: true, scopes: merged });
}
