/**
 * Render durability. The bug this covers cost every image in the cache: rows
 * held Replicate URLs, those expired at ~17.5 hours, and the cache-hit path
 * returned them unchecked and before the render call — so a dead tuple served a
 * 404 permanently. `isDurable` is the guard that decides whether a cached URL
 * can be trusted, so it is tested as carefully as the spend filter.
 */

import { describe, it, expect } from 'vitest';
import { isDurable, publicUrl, storagePathFor, RENDER_BUCKET } from '@/lib/blank/renderStore';

const SUPABASE = 'https://dgbhtedawigjimbvmllr.supabase.co';

describe('isDurable', () => {
  it('accepts a URL in our own bucket', () => {
    expect(isDurable(publicUrl(SUPABASE, 'v8.tee.3.stone.abstract-mark.jpg'))).toBe(true);
  });

  it('rejects a Replicate delivery URL — the whole point of the guard', () => {
    expect(isDurable('https://replicate.delivery/xezq/DyVIUlPExq/tmp52cogw9m.jpg')).toBe(false);
  });

  it('rejects a different bucket on the same Supabase project', () => {
    expect(isDurable(`${SUPABASE}/storage/v1/object/public/other-bucket/x.jpg`)).toBe(false);
  });

  it('rejects a signed (expiring) object URL even in the right bucket', () => {
    expect(isDurable(`${SUPABASE}/storage/v1/object/sign/${RENDER_BUCKET}/x.jpg?token=abc`)).toBe(
      false,
    );
  });

  it('rejects null, undefined and empty', () => {
    expect(isDurable(null)).toBe(false);
    expect(isDurable(undefined)).toBe(false);
    expect(isDurable('')).toBe(false);
  });
});

describe('publicUrl', () => {
  it('builds a public object URL', () => {
    expect(publicUrl(SUPABASE, 'a.jpg')).toBe(
      `${SUPABASE}/storage/v1/object/public/${RENDER_BUCKET}/a.jpg`,
    );
  });

  it('does not double the slash when the base URL has a trailing one', () => {
    expect(publicUrl(`${SUPABASE}/`, 'a.jpg')).toBe(publicUrl(SUPABASE, 'a.jpg'));
  });

  it('round-trips through isDurable', () => {
    expect(isDurable(publicUrl(SUPABASE, storagePathFor('tee.3.stone')))).toBe(true);
  });
});

describe('storagePathFor', () => {
  it('keeps a normal tuple key intact and appends the extension', () => {
    expect(storagePathFor('v8.tee.3.stone.abstract-mark.chest-centre.large.flat-screen')).toBe(
      'v8.tee.3.stone.abstract-mark.chest-centre.large.flat-screen.jpg',
    );
  });

  it('honours a non-default extension', () => {
    expect(storagePathFor('tee.1.bone', 'webp')).toBe('tee.1.bone.webp');
  });

  it('neutralises path traversal by removing every separator', () => {
    // Dots survive on purpose — tuple keys use them as field separators. What
    // makes traversal impossible is that no '/' can reach the object key, so
    // '..' is left as a literal name fragment with nothing to traverse.
    const p = storagePathFor('../../etc/passwd');
    expect(p).not.toContain('/');
    expect(p).toBe('.._.._etc_passwd.jpg');
  });

  it('replaces characters that are not safe in an object key', () => {
    expect(storagePathFor('a b?c#d%e')).toBe('a_b_c_d_e.jpg');
  });

  it('caps length — reference tuples embed a 16-char artwork hash', () => {
    const p = storagePathFor('x'.repeat(400));
    expect(p.length).toBeLessThanOrEqual(185);
    expect(p.endsWith('.jpg')).toBe(true);
  });

  it('is deterministic, so the same tuple overwrites rather than duplicating', () => {
    expect(storagePathFor('tee.3.stone')).toBe(storagePathFor('tee.3.stone'));
  });

  it('distinguishes reference renders by their artwork hash', () => {
    expect(storagePathFor('ref-v1.aaaa1111.tee.5.bone')).not.toBe(
      storagePathFor('ref-v1.bbbb2222.tee.5.bone'),
    );
  });
});
