/**
 * Proof Bar Component
 *
 * Split-flap style proof ticker (train schedule vibe) shown below the homepage hero.
 * Displays immediately below hero section.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export function ProofBar() {
  const messages = useMemo(
    () => [
      'Reality Labs — hardened at billion-user scale (no room for guesswork)',
      'New categories — AR Commerce · Ray-Ban AI · World AR · Avatars',
      'Shipped to 2B+ users — clarity, quality, repeatable execution',
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsFlipping(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % messages.length);
        window.setTimeout(() => setIsFlipping(false), 220);
      }, 220);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [messages.length]);

  return (
    <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.035}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10 rounded-lg border border-gray-700/50 bg-black/40 backdrop-blur-sm px-4 py-4 md:px-6 md:py-5">
          <div className="overflow-hidden">
            <div
              className={`font-mono tracking-wide text-center text-sm sm:text-base md:text-lg text-gray-200 ${
                isFlipping ? 'proofFlipOut' : 'proofFlipIn'
              }`}
            >
              {messages[idx]}
            </div>
            <div className="sr-only">{messages[idx]}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .proofFlipIn {
          transform: translateY(0px);
          opacity: 1;
          filter: blur(0px);
          transition: transform 220ms ease, opacity 220ms ease, filter 220ms ease;
        }
        .proofFlipOut {
          transform: translateY(-6px);
          opacity: 0;
          filter: blur(1px);
          transition: transform 220ms ease, opacity 220ms ease, filter 220ms ease;
        }
      `}</style>
    </section>
  );
}
