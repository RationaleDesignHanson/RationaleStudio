'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

interface MobileCarouselProps {
  children: ReactNode;
  /**
   * Slide width on mobile — a peek of the next card is intentional. Passed
   * through a CSS var so it only applies at the base breakpoint; `md:w-full`
   * takes over on desktop. Default leaves ~14% peek, capped so it doesn't get
   * silly on large phones.
   */
  slideWidth?: string;
  /**
   * Desktop (md+) layout the carousel reverts to. `stack` = vertical column
   * (feature cards); `grid-2` / `grid-3` = an N-column row (image plates that
   * read as a triptych/split on desktop but swipe one-up on mobile).
   */
  desktop?: 'stack' | 'grid-2' | 'grid-3';
  /** Accessible label for the scroll region. */
  label?: string;
  className?: string;
}

const DESKTOP_LAYOUT: Record<NonNullable<MobileCarouselProps['desktop']>, string> = {
  stack: 'md:flex-col md:gap-8',
  'grid-2': 'md:grid md:grid-cols-2 md:gap-6',
  'grid-3': 'md:grid md:grid-cols-3 md:gap-6',
};

/**
 * MobileCarousel — horizontal snap-scroll on mobile, reverting to a vertical
 * stack or an N-column grid on desktop (md+). One DOM tree switched by
 * responsive classes, so there's no duplicated content and no hydration
 * mismatch; the dots are mobile-only and track scroll position. Each slide
 * carries its own caption, so scrolling changes the visible caption.
 */
export function MobileCarousel({
  children,
  slideWidth = 'min(85%, 26rem)',
  desktop = 'stack',
  label = 'Carousel',
  className = '',
}: MobileCarouselProps) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Only meaningful while laid out horizontally (mobile). On desktop the
        // slides stack, scrollWidth ≈ clientWidth, so bail and leave dots hidden.
        if (el.scrollWidth <= el.clientWidth + 4) return;
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((k, i) => {
          const node = k as HTMLElement;
          const center = node.offsetLeft + node.offsetWidth / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goto = (i: number) => {
    const el = scroller.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (!el || !kid) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: kid.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className={className} style={{ ['--slide-w' as string]: slideWidth }}>
      <div
        ref={scroller}
        role="group"
        aria-label={label}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:snap-none md:pb-0 ${DESKTOP_LAYOUT[desktop]}`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[var(--slide-w)] md:w-full md:shrink"
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center md:hidden">
          {items.map((_, i) => (
            // The visible dot is a small <span>; the <button> is a transparent
            // hit target. The box reset MUST be inline: globals.css styles
            // `button` (min-height/min-width 44px + 12/16px padding under
            // `@media (pointer:coarse)`) UNLAYERED, which beats any Tailwind
            // utility class (utilities live in @layer). Only inline styles win
            // over unlayered author CSS — so the dots can't be re-inflated.
            <button
              key={i}
              type="button"
              aria-label={`Go to item ${i + 1} of ${items.length}`}
              aria-current={active === i}
              onClick={() => goto(i)}
              style={{
                minWidth: 0,
                minHeight: 0,
                width: '1.5rem',
                height: '1.5rem',
                padding: 0,
                border: 0,
                background: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  display: 'block',
                  height: '0.375rem',
                  width: active === i ? '0.9375rem' : '0.375rem',
                  borderRadius: '9999px',
                  backgroundColor: active === i ? 'var(--accent)' : 'var(--era-hairline)',
                  transition: 'width 200ms, background-color 200ms',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
