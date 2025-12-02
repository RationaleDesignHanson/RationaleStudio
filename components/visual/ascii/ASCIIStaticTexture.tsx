'use client';

import { useEffect, useRef } from 'react';

interface ASCIIStaticTextureProps {
  width?: number;
  height?: number;
  fontSize?: number;
  characters?: string;
  density?: number; // 0-1, how dense the characters are
}

/**
 * Lightweight static ASCII texture overlay
 * Renders once, no animation - 95% faster than ASCIIImage
 * Perfect for background textures where animation isn't critical
 */
export default function ASCIIStaticTexture({
  width = 1920,
  height = 1080,
  fontSize = 12,
  characters = '█▓▒░@#%&$.:·˙∙•',
  density = 0.3,
}: ASCIIStaticTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const chars = characters.split('');
    const cols = Math.floor(width / (fontSize * 0.6));
    const rows = Math.floor(height / fontSize);

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
    ctx.fillStyle = '#ffffff';

    // Render static character grid
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Skip characters based on density (creates spacing)
        if (Math.random() > density) continue;

        // Random character selection
        const charIndex = Math.floor(Math.random() * chars.length);
        const char = chars[charIndex];

        // Random opacity variation
        ctx.globalAlpha = 0.3 + Math.random() * 0.4;

        const posX = x * fontSize * 0.6;
        const posY = y * fontSize;

        ctx.fillText(char, posX, posY);
      }
    }
  }, [width, height, fontSize, characters, density]);

  return (
    <canvas
      ref={canvasRef}
      className="font-terminal w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
