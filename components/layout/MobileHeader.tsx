'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Vault', href: '/work/vault' },
  { label: 'Contact', href: '/contact' },
];

const SHEET_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Mobile chrome is client-side only because of the hamburger menu state and
 * the scroll-driven sticky utility bar. The brand strip text (wordmark +
 * tagline) is passed as server-rendered children so it appears in the initial
 * HTML and can paint before hydration.
 */
export function MobileHeader({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      {/* MOBILE BRAND STRIP — non-sticky, page-top, < md only. */}
      <div
        className="md:hidden border-b border-hairline"
        style={{ backgroundColor: 'var(--paper)' }}
      >
        <div className="flex items-center px-5 h-11">
          <HamburgerButton onClick={() => setMenuOpen(true)} />
          {children}
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
