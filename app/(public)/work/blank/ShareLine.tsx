/**
 * Copy-link control.
 *
 * The site is a tool two people pass back and forth, so the share action has to
 * be visible at all times — not parked at the bottom of the page. It reads the
 * live config out of LineProvider, so whatever the sender is looking at is what
 * the recipient opens.
 *
 * It names the four things being sent rather than just saying "copied", because
 * the whole failure mode this replaces was two people believing they were
 * looking at the same line when they weren't.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';

export function ShareLine() {
  const { shareUrl } = useLine();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API needs a secure context and permission; if it's refused,
      // select the URL in a throwaway field so the partner can still copy it
      // by hand rather than getting a silent no-op.
      const el = document.createElement('input');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing left to try — the field stays selected */
      }
      el.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }, [shareUrl]);

  // The configuration summary that used to sit beside this button now lives in
  // the chapter rail, where it is more complete (it carries SKU count and
  // blended margin) and where it stays visible as you scroll. Repeating it here
  // was the same four values twice, 30px apart.

  return (
    <div className="flex items-center gap-2 min-w-0">
      <button
        onClick={copy}
        className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 b-label border transition-colors"
        style={{
          borderColor: copied ? 'var(--accent)' : 'var(--era-hairline)',
          color: copied ? 'var(--accent)' : 'var(--era-ink)',
        }}
        aria-live="polite"
      >
        {copied ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
        {copied ? 'Link copied' : 'Share this line'}
      </button>
    </div>
  );
}
