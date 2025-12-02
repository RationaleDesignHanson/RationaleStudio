/**
 * ASCII Field Component
 *
 * Rotating ASCII character overlay
 * Part of multi-layered computational background system
 */

'use client';

import { useEffect, useState } from 'react';

interface ASCIIFieldProps {
  opacity?: number;
  density?: 'sparse' | 'medium' | 'dense';
}

const ASCII_STATES = ['/', '\\', '—', '|', '+', '×', '°', '•'];

export function ASCIIField({
  opacity = 0.02,
  density = 'sparse'
}: ASCIIFieldProps) {
  const [characters, setCharacters] = useState<string[]>([]);

  const gridSize = {
    sparse: 20,
    medium: 15,
    dense: 10,
  }[density];

  useEffect(() => {
    // Initialize grid of random ASCII characters
    const cols = Math.floor(window.innerWidth / (gridSize * 8));
    const rows = Math.floor(window.innerHeight / (gridSize * 16));
    const total = cols * rows;

    const initialChars = Array.from({ length: total }, () =>
      ASCII_STATES[Math.floor(Math.random() * ASCII_STATES.length)]
    );

    setCharacters(initialChars);

    // Rotate random characters every 8-12 seconds
    const interval = setInterval(() => {
      setCharacters(prev => {
        const newChars = [...prev];
        // Change 5-10% of characters
        const changeCount = Math.floor(total * (0.05 + Math.random() * 0.05));

        for (let i = 0; i < changeCount; i++) {
          const index = Math.floor(Math.random() * total);
          newChars[index] = ASCII_STATES[Math.floor(Math.random() * ASCII_STATES.length)];
        }

        return newChars;
      });
    }, 8000 + Math.random() * 4000); // 8-12 seconds

    return () => clearInterval(interval);
  }, [gridSize]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="font-mono text-xs text-accent"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, ${gridSize * 8}px)`,
          gridTemplateRows: `repeat(auto-fill, ${gridSize * 16}px)`,
          width: '100%',
          height: '100%',
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            style={{
              transition: 'opacity 2s ease, transform 2s ease',
              opacity: Math.random() * 0.5 + 0.3,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
