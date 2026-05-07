/**
 * Header — chrome architecture differs by viewport.
 *
 * Desktop (≥ md): sticky 1-line header with wordmark + inline nav.
 *
 * Mobile (< md):
 *   1. Brand strip — non-sticky band at page top: wordmark + hamburger.
 *      No tagline / manifesto here. Scrolls away with the page.
 *   2. Sticky utility bar — slim frosted bar that slides in once the user
 *      scrolls past ~80px. Wordmark + hamburger only, for wayfinding.
 *   3. Drop-down nav sheet — invoked by hamburger. Slides from the top
 *      edge over 220ms easing. Each link gets its own row with hairline
 *      dividers; active route shown by a left-edge accent rule.
 *
 * The "Vision bears the burden of proof" manifesto lives as a hero on
 * the home page itself (mobile + desktop), not in chrome.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const SHEET_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Sticky utility bar appears once the user has scrolled past the brand
  // strip — earns its weight only when wayfinding is actually needed.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the nav sheet is open so the page underneath
  // doesn't drift on touchscreens.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent-ink)] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* DESKTOP CHROME — sticky 1-line, ≥ md only. Wordmark + rotating
          tagline (matches mobile behavior) on the left, nav on the right. */}
      <header
        className="hidden md:block sticky top-0 z-50 border-b border-hairline"
        style={{ backgroundColor: 'var(--paper)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 min-w-0 font-display leading-none tracking-tight text-ink hover:text-[var(--accent-ink)] transition-colors"
            >
              <span className="relative inline-block text-2xl font-semibold shrink-0">
                Rationale:
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
              <span className="min-w-0 text-lg lg:text-xl leading-none">
                <RotatingTagline />
              </span>
            </Link>
            <nav className="flex shrink-0 gap-7 text-base font-display tracking-tight">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive(link.href) ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE BRAND STRIP — non-sticky, page-top, < md only.
          Wordmark + tagline rotate every 15s with a cross-fade. */}
      <div
        className="md:hidden border-b border-hairline"
        style={{ backgroundColor: 'var(--paper)' }}
      >
        <div className="flex items-center px-5 h-11">
          <HamburgerButton onClick={() => setMenuOpen(true)} />
          <Link
            href="/"
            className="group min-w-0 flex-1 -ml-1 font-display text-ink hover:text-[var(--accent-ink)] transition-colors"
          >
            <span className="flex items-baseline gap-1.5 w-full text-[clamp(13px,3.6vw,17px)] leading-none tracking-tight whitespace-nowrap">
              <span className="font-medium shrink-0">Rationale:</span>
              <RotatingTagline />
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE STICKY UTILITY BAR — appears on scroll, < md only. */}
      <div
        aria-hidden={!scrolled}
        className={`md:hidden fixed top-0 inset-x-0 z-30 border-b border-hairline transition-transform duration-300 ${
          scrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          backgroundColor: 'rgba(246, 245, 242, 0.92)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex items-center gap-3 px-5 h-11">
          <HamburgerButton onClick={() => setMenuOpen(true)} />
          <Link
            href="/"
            className="font-display font-medium text-sm leading-none tracking-tight text-ink"
          >
            Rationale
          </Link>
        </div>
      </div>

      {/* MOBILE NAV SHEET — drop-down from top edge, < md only. */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="md:hidden fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(26, 26, 28, 0.18)' }}
        />
      )}
      <div
        className="md:hidden fixed top-0 inset-x-0 z-50 transition-transform"
        style={{
          backgroundColor: 'var(--paper)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transitionDuration: '220ms',
          transitionTimingFunction: SHEET_EASE,
          boxShadow: menuOpen ? '0 12px 32px -16px rgba(0,0,0,0.18)' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display font-medium text-[17px] leading-none tracking-tight text-ink"
          >
            Rationale
          </Link>
          <CloseButton onClick={() => setMenuOpen(false)} />
        </div>
        <nav className="flex flex-col">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className="relative flex items-center px-5 py-4 text-2xl font-display font-normal text-ink border-b border-hairline"
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ backgroundColor: 'var(--accent-ink)' }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

/**
 * Just the rotating phrase part (no "Rationale:" prefix). Caller is
 * responsible for rendering the wordmark separately so each viewport
 * can size it independently.
 */
function RotatingTagline() {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShowQuote((s) => !s);
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block whitespace-nowrap font-normal text-ink-muted align-middle">
      {/* The first phrase sets the wrapper's natural size (width +
          baseline). The second phrase is absolutely positioned over it
          so the wrapper baseline-aligns predictably with sibling text. */}
      <span
        className={`transition-opacity duration-700 ${
          showQuote ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden={showQuote}
      >
        The Design Practice of Matt Hanson
      </span>
      <span
        className={`absolute inset-0 italic transition-opacity duration-700 ${
          showQuote ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!showQuote}
      >
        Vision bears the burden of proof.
      </span>
    </span>
  );
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className="relative w-11 h-11 -ml-2 flex items-center justify-center text-ink-muted/70 hover:text-ink transition-colors"
    >
      <span className="absolute block w-3 h-px bg-current -translate-y-[2px]" />
      <span className="absolute block w-3 h-px bg-current translate-y-[2px]" />
    </button>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close menu"
      className="relative w-11 h-11 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
    >
      <span className="absolute block w-[18px] h-px bg-current rotate-45" />
      <span className="absolute block w-[18px] h-px bg-current -rotate-45" />
    </button>
  );
}
