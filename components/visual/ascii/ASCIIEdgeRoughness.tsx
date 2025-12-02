'use client';

import { useEffect, useRef } from 'react';

interface ASCIIEdgeRoughnessProps {
  className?: string;
  density?: number;
  characters?: string;
}

export default function ASCIIEdgeRoughness({
  className = '',
  density = 30,
  characters = '█▓▒░▄▀■□▪▫'
}: ASCIIEdgeRoughnessProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const charArray = characters.split('');
    const fontSize = 12;
    ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;

    // Generate random edge positions
    const generateEdgeChars = () => {
      const chars: Array<{ x: number; y: number; char: string; opacity: number; vx: number; vy: number }> = [];

      // Top edge
      for (let i = 0; i < canvas.width / density; i++) {
        chars.push({
          x: i * density + Math.random() * density,
          y: Math.random() * 60,
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: 0.1 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }

      // Bottom edge
      for (let i = 0; i < canvas.width / density; i++) {
        chars.push({
          x: i * density + Math.random() * density,
          y: canvas.height - Math.random() * 60,
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: 0.1 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }

      // Left edge
      for (let i = 0; i < canvas.height / density; i++) {
        chars.push({
          x: Math.random() * 60,
          y: i * density + Math.random() * density,
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: 0.1 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }

      // Right edge
      for (let i = 0; i < canvas.height / density; i++) {
        chars.push({
          x: canvas.width - Math.random() * 60,
          y: i * density + Math.random() * density,
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: 0.1 + Math.random() * 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }

      return chars;
    };

    let edgeChars = generateEdgeChars();
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      edgeChars.forEach((item, index) => {
        // Slowly drift
        item.x += item.vx;
        item.y += item.vy;

        // Occasionally change character
        if (Math.random() < 0.01) {
          item.char = charArray[Math.floor(Math.random() * charArray.length)];
        }

        // Fade in/out subtly
        item.opacity += (Math.random() - 0.5) * 0.02;
        item.opacity = Math.max(0.05, Math.min(0.3, item.opacity));

        ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity})`;
        ctx.fillText(item.char, item.x, item.y);

        // Respawn if drifted too far
        if (item.x < -50 || item.x > canvas.width + 50 ||
            item.y < -50 || item.y > canvas.height + 50) {
          // Determine which edge this came from and respawn there
          if (index < canvas.width / density) {
            // Top edge
            item.x = Math.random() * canvas.width;
            item.y = Math.random() * 60;
          } else if (index < (canvas.width / density) * 2) {
            // Bottom edge
            item.x = Math.random() * canvas.width;
            item.y = canvas.height - Math.random() * 60;
          } else if (index < (canvas.width / density) * 2 + (canvas.height / density)) {
            // Left edge
            item.x = Math.random() * 60;
            item.y = Math.random() * canvas.height;
          } else {
            // Right edge
            item.x = canvas.width - Math.random() * 60;
            item.y = Math.random() * canvas.height;
          }
        }
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [density, characters]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
