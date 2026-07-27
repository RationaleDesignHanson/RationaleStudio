'use client';

import { useState } from 'react';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { TrackedIframe } from '@/components/analytics/TrackedIframe';
import { ExternalLink } from 'lucide-react';

interface PrototypeEntry {
  label: string;
  href: string;
  note?: string;
}

const PROTOTYPES: PrototypeEntry[] = [
  {
    label: 'shortform email · full build',
    href: '/prototypes/zero-swipe/index.html',
    note: 'the working triage app · internal beta',
  },
  {
    label: 'intent + action explorer',
    href: '/prototypes/zero-intent/index.html',
    note: 'pre-app validation — corpus of intents mapped to actions',
  },
];

export function PrototypeChapter() {
  const [active, setActive] = useState(0);
  const p = PROTOTYPES[active];
  return (
    <>
      <ChapterRow index="02" kicker="TRY IT · LIVE BUILDS" title="The work that came before the post-mortem">
        <p>
          Two surfaces from the build, in order: an intent + action explorer that validated the classification space before the app, and the swipe-first triage build it grew into. iOS internal beta, then I pulled it — never reached the App Store.
        </p>
      </ChapterRow>
      <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto">
          {PROTOTYPES.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {PROTOTYPES.map((entry, i) => (
                <button
                  key={entry.href}
                  onClick={() => setActive(i)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                    i === active
                      ? 'bg-[var(--era-ink)] text-[var(--era-bg)] border-[var(--era-ink)]'
                      : 'bg-[var(--era-bg)] text-[var(--era-ink-body)] border-[var(--era-hairline)] hover:border-[var(--era-ink)]'
                  }`}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          )}
          {/* Desktop: caption + iframe demo. Hidden on mobile because
              iOS Safari and mobile Chrome both choke on position-fixed
              elements inside iframes (the prototype's bottom nav was
              breaking specifically). */}
          <div className="hidden md:block">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono text-[var(--era-ink-muted)]">
              <span>iframe &rarr; {p.href}</span>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                open standalone <ExternalLink className="w-3 h-3" />
              </a>
              {p.note && <span className="italic">· {p.note}</span>}
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white" style={{ height: 'min(900px, 88vh)' }}>
              <TrackedIframe
                key={p.href}
                prototype={`zero-${p.href.split('/')[2] ?? 'unknown'}`}
                src={p.href}
                title={`Zero · ${p.label}`}
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
              />
            </div>
          </div>

          {/* Mobile launcher card · opens the prototype standalone.
              Same pill toggle above flips the title + href, so the
              card retitles when you switch between the two builds. */}
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden block rounded-md border-2 px-5 py-6 transition-colors active:opacity-80"
            style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--era-bg-deep)' }}
          >
            <p className="text-caption font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Live build · best on mobile
            </p>
            <p className="font-display text-xl leading-snug mb-1.5" style={{ color: 'var(--era-ink)' }}>
              {p.label}
            </p>
            {p.note && (
              <p className="text-sm italic mb-4" style={{ color: 'var(--era-ink-body)' }}>
                {p.note}
              </p>
            )}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--era-ink-body)' }}>
              Mobile browsers can&rsquo;t render swipe-based iframes reliably. Open the build standalone for the full experience.
            </p>
            <span
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md text-sm font-mono uppercase tracking-wider"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--era-bg)' }}
            >
              Open prototype <ExternalLink className="w-3.5 h-3.5" />
            </span>
            <p className="mt-3 text-caption font-mono text-center" style={{ color: 'var(--era-ink-muted)' }}>
              ↩ Use back button to return to the case study
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
