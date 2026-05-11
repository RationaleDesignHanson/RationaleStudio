/**
 * Public Pages Layout
 *
 * Shared layout for all public-facing pages with enhanced SEO + scroll-depth
 * tracking on every public route (case studies, homepage, thinking essays,
 * contact). Inert when PostHog isn't configured.
 */

import { Metadata } from 'next';
import { ScrollDepthTracker } from '@/components/analytics/ScrollDepthTracker';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollDepthTracker />
      {children}
    </>
  );
}
