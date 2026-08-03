/**
 * Header — chrome architecture differs by viewport.
 *
 * Desktop (≥ md): sticky 1-line header with wordmark + inline nav.
 *
 * Mobile (< md):
 *   1. Brand strip — non-sticky band at page top: wordmark + hamburger.
 *      The manifesto tagline is server-rendered so it can paint before JS.
 *   2. Sticky utility bar — slim frosted bar that slides in once the user
 *      scrolls past ~80px. Managed by the client <MobileHeader> wrapper.
 *   3. Drop-down nav sheet — invoked by hamburger. Managed client-side.
 *
 * The interactive mobile pieces (menu state, scroll listener) are isolated in
 * <MobileHeader> so the visible text stays in the initial HTML and is not
 * blocked by hydration.
 */

import Link from 'next/link';
import { MobileHeader } from './MobileHeader';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Vault', href: '/work/vault' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ pathname }: { pathname: string }) {
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent-ink)] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* DESKTOP CHROME — sticky 1-line, ≥ md only. */}
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

      {/* MOBILE CHROME — client-boundary wrapper around server-rendered text. */}
      <MobileHeader pathname={pathname}>
        <Link
          href="/"
          className="group min-w-0 flex-1 -ml-1 font-display text-ink hover:text-[var(--accent-ink)] transition-colors"
        >
          <span className="flex items-baseline gap-1.5 w-full text-[clamp(13px,3.6vw,17px)] leading-none tracking-tight whitespace-nowrap">
            <span className="font-medium shrink-0">Rationale:</span>
            <RotatingTagline />
          </span>
        </Link>
      </MobileHeader>
    </>
  );
}

/**
 * Rotating tagline — server-rendered with a CSS cross-fade so the initial
 * phrase paints immediately and is eligible for LCP. No JS required.
 */
function RotatingTagline() {
  return (
    <span className="relative inline-block whitespace-nowrap font-normal text-ink-muted align-middle rotating-tagline">
      <span className="tagline-primary">
        The Design Practice of Matt Hanson
      </span>
      <span aria-hidden className="tagline-secondary absolute inset-0">
        Vision bears the burden of proof.
      </span>
    </span>
  );
}
