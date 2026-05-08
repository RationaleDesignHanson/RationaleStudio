'use client';

import { useState, type FormEvent } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  scope: string;
}

export function UnlockForm({ scope }: Props) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    trackEvent('vault_unlock_attempted', { scope });
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, scope }),
      });
      if (res.ok) {
        trackEvent('vault_unlock_succeeded', { scope });
        // Reload so the server component re-renders with the unlocked cookie.
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      const errMsg = typeof data.error === 'string' ? data.error : 'Could not unlock';
      trackEvent('vault_unlock_failed', { scope, reason: errMsg });
      setError(errMsg);
    } catch {
      trackEvent('vault_unlock_failed', { scope, reason: 'network_error' });
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-sm">
      <label className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40 focus-within:border-[var(--accent)] transition-colors">
        <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--era-ink-muted)' }} />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
          autoComplete="current-password"
          className="flex-1 bg-transparent outline-none text-[var(--era-ink)] placeholder:text-[var(--era-ink-muted)] text-sm font-mono"
        />
      </label>

      <button
        type="submit"
        disabled={submitting || pw.length === 0}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--era-bg)' }}
      >
        {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
        {submitting ? 'Unlocking…' : 'Unlock'}
      </button>

      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
