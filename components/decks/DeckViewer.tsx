'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Deck } from '@/lib/decks';

interface Props {
  deck: Deck;
}

/**
 * DeckViewer — click-through slide viewer. Shows one slide at a time;
 * advance with the on-slide arrows, a click on the slide, or the keyboard
 * (←/→, ↑/↓, Space, PageUp/Down, Home/End). No long scroll.
 */
export function DeckViewer({ deck }: Props) {
  const total = deck.publishedPages.length;
  const [i, setI] = useState(0);
  const omitted = deck.totalSourcePages - total;

  const prev = useCallback(() => setI((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setI((c) => Math.min(total - 1, c + 1)), [total]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        setI(0);
      } else if (e.key === 'End') {
        setI(total - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, total]);

  const atStart = i === 0;
  const atEnd = i === total - 1;

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
            <span className="font-mono text-caption tracking-[0.2em] uppercase text-[var(--era-ink-muted)] flex-shrink-0">
              {String(i + 1).padStart(2, '0')} / {total}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              disabled={atStart}
              className="p-1.5 rounded-md border border-[var(--era-hairline)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={atEnd}
              className="p-1.5 rounded-md border border-[var(--era-hairline)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Header / metadata */}
      <section className="px-4 sm:px-6 md:px-8 pt-8 md:pt-10 pb-5">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-caption tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
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

      {/* Single-slide stage */}
      <section className="px-4 sm:px-6 md:px-8 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* Slide — click anywhere to advance */}
            <button
              type="button"
              onClick={next}
              disabled={atEnd}
              aria-label={atEnd ? 'Last slide' : 'Next slide'}
              className="block w-full rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white cursor-pointer disabled:cursor-default"
            >
              <Image
                key={i}
                src={`/decks/${deck.slug}/${deck.publishedPages[i]}`}
                alt={`${deck.title} · slide ${i + 1}`}
                width={1280}
                height={720}
                className="w-full h-auto animate-[fadeIn_240ms_ease-out]"
                priority
              />
            </button>

            {/* Hidden preload of neighbors for snappy nav */}
            <div className="hidden" aria-hidden>
              {[i - 1, i + 1]
                .filter((n) => n >= 0 && n < total)
                .map((n) => (
                  <Image key={n} src={`/decks/${deck.slug}/${deck.publishedPages[n]}`} alt="" width={1280} height={720} />
                ))}
            </div>

            {/* Prev / Next overlay controls */}
            <button
              type="button"
              onClick={prev}
              disabled={atStart}
              aria-label="Previous slide"
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--era-hairline)] bg-[var(--era-bg)]/85 backdrop-blur-sm shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-0 disabled:cursor-default transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={atEnd}
              aria-label="Next slide"
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--era-hairline)] bg-[var(--era-bg)]/85 backdrop-blur-sm shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-0 disabled:cursor-default transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Counter + clickable seek bar (scales to any slide count) */}
          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono text-caption tracking-[0.2em] uppercase text-[var(--era-ink-muted)] shrink-0 tabular-nums">
              {String(i + 1).padStart(2, '0')} / {total}
            </span>
            <div
              className="relative h-1.5 flex-1 rounded-full cursor-pointer"
              style={{ backgroundColor: 'var(--era-hairline)' }}
              role="slider"
              aria-label="Slide position"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={i + 1}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const f = (e.clientX - r.left) / r.width;
                setI(Math.max(0, Math.min(total - 1, Math.round(f * (total - 1)))));
              }}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all"
                style={{ width: `${total > 1 ? (i / (total - 1)) * 100 : 100}%`, backgroundColor: 'var(--accent)' }}
              />
            </div>
          </div>

          <p className="mt-3 text-caption font-mono text-[var(--era-ink-muted)]">
            Click the slide or use ← / → to navigate.
          </p>
        </div>
      </section>
    </main>
  );
}
