'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import type { Deck } from '@/lib/decks';

interface Props {
  deck: Deck;
}

export function DeckViewer({ deck }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active slide tracker (for header counter).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute('data-idx'));
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { threshold: [0.5] },
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [deck.slug]);

  // Enter animation — marks each slide "seen" once it crosses ~30% threshold.
  // First three slides are pre-marked so the top of the deck doesn't blink in.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (Number.isNaN(idx)) continue;
          setSeen((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [deck.slug]);

  const jumpTo = (idx: number) => {
    const target = slideRefs.current[idx];
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const total = deck.publishedPages.length;
  const omitted = deck.totalSourcePages - total;

  return (
    <main
      className={`era-${deck.era} min-h-screen`}
      style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
    >
      {/* Sticky header strip */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: 'var(--era-hairline)', backgroundColor: 'rgba(246,245,242,0.88)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--era-ink-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to work
          </Link>
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-display text-base md:text-lg text-[var(--era-ink)] truncate">{deck.title}</span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--era-ink-muted)] flex-shrink-0">
              {String(activeIndex + 1).padStart(2, '0')} / {total}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => jumpTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-1.5 rounded-md border border-[var(--era-hairline)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous slide"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => jumpTo(Math.min(total - 1, activeIndex + 1))}
              disabled={activeIndex === total - 1}
              className="p-1.5 rounded-md border border-[var(--era-hairline)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next slide"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Header / metadata */}
      <section className="px-4 sm:px-6 md:px-8 pt-8 md:pt-10 pb-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
            Confidential Deck · {deck.meta}
          </p>
          <h1 className="font-display text-2xl md:text-4xl text-[var(--era-ink)] mb-3 leading-tight">
            {deck.title}
          </h1>
          <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-3xl">
            {deck.subtitle}
          </p>
          {omitted > 0 && (
            <p className="text-xs font-mono text-[var(--era-ink-muted)] mt-3">
              {omitted} of {deck.totalSourcePages} source slides withheld.
            </p>
          )}
        </div>
      </section>

      {/* Slide list */}
      <section className="px-4 sm:px-6 md:px-8 pb-16" ref={containerRef}>
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          {deck.publishedPages.map((page, i) => {
            const isSeen = seen.has(i);
            return (
            <div
              key={page}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-idx={i}
              className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white transition-all duration-[420ms] ease-out will-change-transform"
              style={{
                opacity: isSeen ? 1 : 0,
                transform: isSeen ? 'translateY(0)' : 'translateY(14px)',
              }}
            >
              <Image
                src={`/decks/${deck.slug}/${page}`}
                alt={`${deck.title} · slide ${i + 1}`}
                width={1280}
                height={720}
                className="w-full h-auto"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <p className="text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--era-ink-muted)] px-3 py-1.5 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                {String(i + 1).padStart(2, '0')} / {total}
              </p>
            </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
