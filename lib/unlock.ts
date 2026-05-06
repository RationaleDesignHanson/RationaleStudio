/**
 * UnlockGate · cookie-based password unlock for confidential pages.
 *
 * Two pw modes, both can coexist:
 *   - UNLOCK_PASSWORD              one master pw, unlocks every gated page
 *   - UNLOCK_PASSWORD_<SCOPE>      per-slug pw (e.g. UNLOCK_PASSWORD_RUMI)
 *
 * Cookie format: `<comma,sep,scopes>.<hmac>` signed with UNLOCK_SECRET
 * (falls back to UNLOCK_PASSWORD if no secret set). Scope `all` means the
 * master pw was used.
 *
 * Edge runtime safe — uses Web Crypto via `crypto.subtle`.
 */

import { cookies } from 'next/headers';

export const UNLOCK_COOKIE = 'unlock';
export const UNLOCK_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  return (
    process.env.UNLOCK_SECRET ||
    process.env.UNLOCK_PASSWORD ||
    // Dev fallback so the gate does something locally without env vars set.
    'rationale-unlock-dev-fallback'
  );
}

function envKeyForScope(scope: string): string {
  return `UNLOCK_PASSWORD_${scope.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
}

async function hmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return base64url(new Uint8Array(sig));
}

function base64url(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function signScopes(scopes: string[]): Promise<string> {
  const payload = Array.from(new Set(scopes)).sort().join(',');
  const sig = await hmac(payload, getSecret());
  return `${payload}.${sig}`;
}

export async function verifyScopes(value: string | undefined): Promise<string[]> {
  if (!value) return [];
  const idx = value.lastIndexOf('.');
  if (idx <= 0) return [];
  const payload = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  const expected = await hmac(payload, getSecret());
  if (!timingSafeEqual(sig, expected)) return [];
  return payload.split(',').filter(Boolean);
}

export async function getUnlockedScopes(): Promise<string[]> {
  const store = await cookies();
  return verifyScopes(store.get(UNLOCK_COOKIE)?.value);
}

export async function isUnlocked(scope: string): Promise<boolean> {
  const scopes = await getUnlockedScopes();
  return scopes.includes('all') || scopes.includes(scope);
}

/**
 * Attempt to unlock with a given password. Per-slug pw is checked first
 * (so a per-slug pw isn't accidentally treated as the master). Returns
 * the scope to add to the cookie (`all` for master, `<scope>` for per-slug),
 * or null if the password is wrong / no env vars configured.
 */
export function checkPassword(scope: string | undefined, password: string): string | null {
  if (typeof password !== 'string' || password.length === 0) return null;

  if (scope) {
    const slugPw = process.env[envKeyForScope(scope)];
    if (slugPw && password === slugPw) return scope;
  }

  const masterPw = process.env.UNLOCK_PASSWORD;
  if (masterPw && password === masterPw) return 'all';

  return null;
}
