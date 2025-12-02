'use client';

import { useEffect, useRef } from 'react';

interface ASCIITextureOverlayProps {
  className?: string;
  characters?: string;
  fontSize?: number;
  opacity?: number;
}

export default function ASCIITextureOverlay({
  className = '',
  characters = '01',
  fontSize = 16,
  opacity = 0.4
}: ASCIITextureOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawTexture();
    };

    const charArray = characters.split('');

    const drawTexture = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;

      const cols = Math.ceil(canvas.width / (fontSize * 0.6));
      const rows = Math.ceil(canvas.height / fontSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Create depth effect - center is denser/brighter
          const centerX = cols / 2;
          const centerY = rows / 2;
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
          const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
          const normalizedDist = distFromCenter / maxDist;

          // Vary opacity based on position for depth
          const baseOpacity = opacity * (1 - normalizedDist * 0.3);
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          const charOpacity = baseOpacity * (0.7 + Math.random() * 0.3);

          ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity})`;
          ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Animate character changes with more dynamism
    const interval = setInterval(() => {
      const cols = Math.ceil(canvas.width / (fontSize * 0.6));
      const rows = Math.ceil(canvas.height / fontSize);

      // Change more random characters for livelier animation
      const numChanges = 40 + Math.floor(Math.random() * 20);

      for (let i = 0; i < numChanges; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);

        // Create depth effect
        const centerX = cols / 2;
        const centerY = rows / 2;
        const distFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const normalizedDist = distFromCenter / maxDist;

        const baseOpacity = opacity * (1 - normalizedDist * 0.3);
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const charOpacity = baseOpacity * (0.7 + Math.random() * 0.3);

        ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity})`;
        ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
      }
    }, 80);

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
    };
  }, [characters, fontSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
