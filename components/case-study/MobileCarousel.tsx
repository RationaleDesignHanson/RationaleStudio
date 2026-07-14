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
  /** Accessible label for the scroll region. */
  label?: string;
  className?: string;
}

/**
 * MobileCarousel — horizontal snap-scroll on mobile, the original vertical
 * stack on desktop (md+). One DOM tree switched by responsive classes, so
 * there's no duplicated content and no hydration mismatch; the dots are
 * mobile-only and track scroll position. Desktop rendering is unchanged:
 * `md:` reverts to `flex-col` with the same gap the section used before.
 */
export function MobileCarousel({
  children,
  slideWidth = 'min(85%, 26rem)',
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-col md:gap-8 md:overflow-visible md:snap-none md:pb-0"
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
        <div className="mt-5 flex justify-center gap-2 md:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to item ${i + 1} of ${items.length}`}
              aria-current={active === i}
              onClick={() => goto(i)}
              className="h-2 rounded-full transition-all duration-200"
              style={{
                width: active === i ? '1.375rem' : '0.5rem',
                backgroundColor: active === i ? 'var(--accent)' : 'var(--era-hairline)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
