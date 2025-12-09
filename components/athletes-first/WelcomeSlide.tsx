/**
 * Welcome Slide Component
 * Shows device-appropriate navigation instructions
 */

'use client';

import { useEffect, useState } from 'react';

export default function WelcomeSlide() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-terminal-gold font-mono mb-8">
        Athletes First × Rationale
      </h1>

      <div className="max-w-2xl space-y-6">
        <p className="text-xl md:text-2xl text-white/90 font-mono">
          Thanks for the opportunity. Excited to show you how AI can scale your agency systematically.
        </p>

        <div className="pt-8 space-y-4 text-white/70 font-mono text-sm md:text-base">
          {isMobile ? (
            <>
              <p>Tap &lt; &gt; buttons at top to navigate.</p>
              <p className="text-terminal-gold text-lg">Tap &gt; to start</p>
            </>
          ) : (
            <>
              <p>Use ← → arrow keys or &lt; &gt; buttons at top to navigate.</p>
              <p className="text-terminal-gold text-lg">Press → on keyboard to start</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
