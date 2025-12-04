import { ClientAuthGuard } from '@/components/auth/ClientAuthGuard';
import { SlideNavigationProvider, SlideTransition } from '@/components/creait/navigation';
import ProgressIndicator from '@/components/creait/navigation/ProgressIndicator';

export const metadata = {
  title: 'CREaiT Pitch Deck',
  description: 'Interactive investor pitch deck for CREaiT - AI-powered CRE broker productivity platform',
};

/**
 * Pitch Deck Layout
 *
 * Wraps all slide pages with:
 * - SlideNavigationProvider for keyboard controls
 * - SlideTransition for smooth page animations
 * - ProgressIndicator for visual progress tracking
 * - Full-screen presentation mode
 */
export default function PitchDeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAuthGuard requiredClient="CREAIT">
      <SlideNavigationProvider>
        {/* Slide Content with Transitions */}
        <main className="relative">
          <SlideTransition>
            {children}
          </SlideTransition>
        </main>

        {/* Progress Indicator (fixed at bottom) */}
        <ProgressIndicator />
      </SlideNavigationProvider>
    </ClientAuthGuard>
  );
}
