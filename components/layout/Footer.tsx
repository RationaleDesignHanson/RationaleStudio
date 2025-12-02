/**
 * Footer Component
 *
 * Site-wide footer with links and copyright.
 * Clean, minimal design aligned with brand philosophy.
 */

import Link from 'next/link';
import { Container } from './Container';
import { siteContent } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 sm:py-16">
          {/* Top section: Logo and navigation */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
              >
                {siteContent.name}
              </Link>
              <p className="mt-2 text-sm text-muted">
                {siteContent.tagline}
              </p>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
              {siteContent.footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground inline-flex items-center gap-1"
                >
                  {link.label}
                  {link.href === '/investors' && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-border" />

          {/* Bottom section: Copyright and social */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {siteContent.footer.copyright}
            </p>

            {/* Social links */}
            {siteContent.footer.social && siteContent.footer.social.length > 0 && (
              <div className="flex gap-6" role="navigation" aria-label="Social media links">
                {siteContent.footer.social.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                    aria-label={`Visit our ${social.platform} page`}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
