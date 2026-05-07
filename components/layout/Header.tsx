/**
 * Header — single sticky chrome.
 *
 * Wordmark + site nav. Stays paper always (stable anchor); per-era
 * theming lives inside the WorkViewer's contextual era-tab strip
 * so the top of the page doesn't feel like a "text gang bang."
 *
 * Mobile: 2 lines (wordmark top, nav bottom).
 * Desktop: 1 line (wordmark left, nav right).
 *
 * Manifesto ("Vision bears the burden of proof") and practice
 * line ("The Design Practice of Matt Hanson") moved off chrome
 * entirely — they belong on /about (and footer) where they read
 * as statement rather than noise.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent-ink)] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <header
        className="sticky top-0 z-50 border-b border-hairline"
        style={{ backgroundColor: 'rgba(246, 245, 242, 0.92)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            {/* Wordmark — underline sweeps in on hover. Tightened to
                leading-none so a heavier, bigger size doesn't push
                the chrome taller. */}
            <Link
              href="/"
              className="group inline-block font-display font-semibold text-xl md:text-2xl leading-none tracking-tight text-ink hover:text-[var(--accent-ink)] transition-colors"
            >
              <span className="relative inline-block">
                Rationale
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
            </Link>

            {/* Site nav */}
            <nav className="flex gap-4 sm:gap-5 md:gap-7 text-[10px] sm:text-[11px] md:text-xs font-mono tracking-[0.2em] uppercase">
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
    </>
  );
}
