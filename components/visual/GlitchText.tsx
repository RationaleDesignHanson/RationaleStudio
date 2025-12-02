'use client';

import { ReactNode, useState } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <div className="relative z-10">{children}</div>

      {/* RGB shift layers */}
      {isHovered && (
        <>
          <div
            className="absolute inset-0 text-cyan-400 opacity-70 mix-blend-screen animate-glitch-1"
            style={{ transform: 'translate(-2px, -1px)' }}
            aria-hidden="true"
          >
            {children}
          </div>
          <div
            className="absolute inset-0 text-pink-500 opacity-70 mix-blend-screen animate-glitch-2"
            style={{ transform: 'translate(2px, 1px)' }}
            aria-hidden="true"
          >
            {children}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(-2px, -1px); }
          25% { transform: translate(-3px, -2px); }
          50% { transform: translate(-1px, -3px); }
          75% { transform: translate(-4px, 0px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(2px, 1px); }
          25% { transform: translate(3px, 2px); }
          50% { transform: translate(1px, 3px); }
          75% { transform: translate(4px, 0px); }
        }

        :global(.animate-glitch-1) {
          animation: glitch-1 0.3s infinite;
        }

        :global(.animate-glitch-2) {
          animation: glitch-2 0.3s infinite 0.1s;
        }
      `}</style>
    </div>
  );
}
