/**
 * Interactive Demo Wrapper
 *
 * Client component wrapper for lazy-loaded InteractiveDemo.
 * Allows parent page to remain server component while demo loads on client.
 *
 * Performance: Lazy loaded (527 lines) - reduces initial bundle by ~6KB
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load interactive demo (527 lines, client-side only)
const InteractiveDemo = dynamic(
  () => import('@/components/zero/InteractiveDemo'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-12 h-12 border-4 border-terminal-gold/30 border-t-terminal-gold rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-terminal-gold font-mono text-sm">Loading demo...</p>
        </div>
      </div>
    ),
    ssr: false  // Client-side only (interactive swipe demo)
  }
);

export default function InteractiveDemoWrapper() {
  return <InteractiveDemo />;
}
