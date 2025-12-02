'use client';

import { useEffect, useRef, useState } from 'react';

interface ASCIIGlitchProps {
  children: React.ReactNode;
  intensity?: number; // 0-1, how intense the glitch is
  frequency?: number; // ms between glitches
  characters?: string;
}

export default function ASCIIGlitch({
  children,
  intensity = 0.5,
  frequency = 3000,
  characters = '█▓▒░▄▀■□▪▫'
}: ASCIIGlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200);
    }, frequency);

    return () => clearInterval(glitchInterval);
  }, [frequency]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {children}
      {isGlitching && (
        <div
          className="absolute inset-0 pointer-events-none font-terminal text-white"
          style={{
            mixBlendMode: 'difference',
            opacity: intensity,
            overflow: 'hidden'
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                fontSize: `${8 + Math.random() * 16}px`,
              }}
            >
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
