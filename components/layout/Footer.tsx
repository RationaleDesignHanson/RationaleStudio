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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-8 text-center">
          <p className="text-sm text-muted">
            {siteContent.name} © {currentYear}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
