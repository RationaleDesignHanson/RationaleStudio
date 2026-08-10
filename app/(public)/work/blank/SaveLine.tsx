/**
 * Autosave, and the end of losing your work by closing a tab.
 *
 * The whole document lived in the query string and nowhere else. That made
 * sharing trivial and made the work disposable: close the tab and it was gone,
 * no undo (the provider uses replaceState on purpose, so the back button holds
 * nothing), and two people on one link overwrote each other in silence.
 *
 * `?l=k3n8xp` now names a row. The encoded URL does not go away — it becomes a
 * SNAPSHOT link, frozen and self-contained and still fine to paste into a
 * message. It just stops being the only copy, which is all that was ever wrong
 * with it.
 *
 * A QUERY PARAM RATHER THAN A ROUTE. `/work/blank/[id]` would be tidier and
 * would mean a second page, a second layout and two ways in to keep in step.
 * The id is a pointer, not a place.
 *
 * THE SAVE CANNOT CLOBBER. Every write carries the version it was based on; the
 * server matches on it and a stale write updates nothing and comes back with
 * THEIR state. Two people making chunky edits do not need CRDTs — they need it
 * to be impossible to lose work without being told.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { readWho, writeWho } from '@/lib/blank/who';

type State = 'idle' | 'saving' | 'saved' | 'conflict' | 'error';

/** Long enough that typing a name is one save, short enough to feel safe. */
const DEBOUNCE_MS = 1200;

export function SaveLine() {
  const { config, skus, replaceAll } = useLine();
  const [id, setId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<State>('idle');
  const [conflictBy, setConflictBy] = useState<string | null>(null);

  const version_ = useRef(version);
  version_.current = version;
  const loading = useRef(false);
  const lastSaved = useRef<string>('');

  // Read the id from the URL once, and load it.
  useEffect(() => {
    const l = new URLSearchParams(window.location.search).get('l');
    if (!l) return;
    loading.current = true;
    setId(l);
    (async () => {
      try {
        const res = await fetch(`/api/blank/line/${l}`);
        if (!res.ok) return;
        const data = await res.json();
        replaceAll(data.state);
        setVersion(data.version);
        lastSaved.current = JSON.stringify(data.state);
        setState('saved');
      } finally {
        // One tick, so the hydration write does not immediately look like an edit.
        setTimeout(() => (loading.current = false), 50);
      }
    })();
  }, [replaceAll]);

  const snapshot = useCallback(() => ({ ...config, skus }), [config, skus]);

  useEffect(() => {
    if (loading.current) return;
    const body = JSON.stringify(snapshot());
    if (body === lastSaved.current) return;

    const t = setTimeout(async () => {
      setState('saving');
      const who = readWho();
      try {
        if (!id) {
          const res = await fetch('/api/blank/line', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: snapshot(), by: who }),
          });
          if (!res.ok) return setState('error');
          const data = await res.json();
          setId(data.id);
          setVersion(data.version);
          lastSaved.current = body;
          // The id joins the URL so a reload finds the same line.
          const url = new URL(window.location.href);
          url.searchParams.set('l', data.id);
          window.history.replaceState(null, '', url.toString());
          setState('saved');
          return;
        }

        const res = await fetch(`/api/blank/line/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: snapshot(), version: version_.current, by: who }),
        });
        if (res.status === 409) {
          const data = await res.json();
          setConflictBy(data.conflict?.updated_by ?? null);
          setState('conflict');
          return;
        }
        if (!res.ok) return setState('error');
        const data = await res.json();
        setVersion(data.version);
        lastSaved.current = body;
        setState('saved');
      } catch {
        setState('error');
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [config, skus, id, snapshot]);

  /** Take theirs and carry on from it, rather than fighting over the row. */
  const reload = async () => {
    if (!id) return;
    loading.current = true;
    const res = await fetch(`/api/blank/line/${id}`);
    if (res.ok) {
      const data = await res.json();
      replaceAll(data.state);
      setVersion(data.version);
      lastSaved.current = JSON.stringify(data.state);
      setState('saved');
      setConflictBy(null);
    }
    setTimeout(() => (loading.current = false), 50);
  };

  return (
    <span className="inline-flex items-center gap-2">
      {state === 'saving' && (
        <span className="b-note inline-flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" /> Saving
        </span>
      )}
      {state === 'saved' && (
        <span className="b-note inline-flex items-center gap-1.5">
          <Check className="w-3 h-3" /> Saved
        </span>
      )}
      {state === 'error' && <span className="b-note" style={{ color: '#A8456E' }}>Not saved</span>}
      {state === 'conflict' && (
        <span className="b-note inline-flex items-center gap-2" style={{ color: '#A8456E' }}>
          {conflictBy ? `${conflictBy} saved first` : 'Someone saved first'}
          <button onClick={reload} className="tap underline" style={{ minHeight: 0, color: 'inherit' }}>
            load theirs
          </button>
        </span>
      )}
    </span>
  );
}

/** Asked once, on the first save, and remembered on the device. */
export function WhoAmI() {
  const [who, setWho] = useState('');
  useEffect(() => setWho(readWho()), []);
  if (who) return null;
  return (
    <label className="inline-flex items-center gap-2">
      <span className="b-note">Who are you?</span>
      <input
        onBlur={(e) => setWho(writeWho(e.target.value))}
        placeholder="M"
        maxLength={1}
        size={1}
        aria-label="Your initial"
        className="tap w-8 px-1 py-0.5 b-data text-center bg-transparent border-b outline-none focus:border-[var(--accent)]"
        style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
      />
    </label>
  );
}
