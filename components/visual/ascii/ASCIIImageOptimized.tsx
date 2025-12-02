'use client';

import { useEffect, useRef, useState } from 'react';

interface ASCIIImageOptimizedProps {
  images: string[];
  width?: number;
  height?: number;
  fontSize?: number;
  cycleInterval?: number;
  characters?: string;
  colorScheme?: 'primary' | 'secondary' | 'tertiary';
}

export default function ASCIIImageOptimized({
  images,
  width = 400,
  height = 400,
  fontSize = 10,
  cycleInterval = 999999,
  characters = '█▓▒░ ',
  colorScheme = 'primary'
}: ASCIIImageOptimizedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brightnessCache, setBrightnessCache] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lastFrameTime = useRef(0);

  // Simpler character set for better performance
  const densityChars = characters.split('');

  // Color scheme mapping
  const colors = {
    primary: '#a855f7',    // purple
    secondary: '#7c3aed',  // deeper purple
    tertiary: '#5b21b6'    // darkest purple
  };

  // Cycle images
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, cycleInterval);
    return () => clearInterval(interval);
  }, [images.length, cycleInterval]);

  // Load and cache brightness data only
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
      if (!tempCtx) return;

      const cols = Math.floor(width / (fontSize * 0.6));
      const rows = Math.floor(height / fontSize);

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      const data = tempCtx.getImageData(0, 0, width, height);

      // Pre-calculate brightness for each ASCII cell
      const brightness: number[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const imgX = Math.floor((x / cols) * width);
          const imgY = Math.floor((y / rows) * height);
          const pixelIndex = (imgY * width + imgX) * 4;

          const r = data.data[pixelIndex];
          const g = data.data[pixelIndex + 1];
          const b = data.data[pixelIndex + 2];
          brightness.push((r + g + b) / 765);
        }
      }

      setBrightnessCache(brightness);
    };
    img.src = images[currentImageIndex];
  }, [images, currentImageIndex, width, height, fontSize]);

  // Optimized render loop - 30fps instead of 60fps
  useEffect(() => {
    if (brightnessCache.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.floor(width / (fontSize * 0.6));
    const rows = Math.floor(height / fontSize);

    canvas.width = width;
    canvas.height = height;

    const charSpacingX = fontSize * 0.6;
    const densityCharsLength = densityChars.length;
    const targetFPS = 30; // Reduced from 60fps
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      // Throttle to 30fps
      if (currentTime - lastFrameTime.current < frameInterval) {
        requestAnimationFrame(render);
        return;
      }
      lastFrameTime.current = currentTime;

      const time = currentTime * 0.001; // seconds

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
      ctx.fillStyle = colors[colorScheme];

      let charIdx = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++, charIdx++) {
          const brightness = brightnessCache[charIdx];

          // Simple character selection based on brightness
          const charIndex = Math.floor(brightness * (densityCharsLength - 1));

          // Minimal wave animation
          const wave = Math.sin(time * 0.5 + x * 0.2 + y * 0.1) * 0.5;
          const char = densityChars[Math.max(0, Math.min(densityCharsLength - 1, charIndex + Math.floor(wave)))];

          // Simple position with subtle drift
          const posX = x * charSpacingX + Math.sin(time * 0.3 + x * 0.1) * 0.5;
          const posY = y * fontSize + Math.cos(time * 0.3 + y * 0.1) * 0.5;

          // Subtle opacity variation
          ctx.globalAlpha = 0.6 + brightness * 0.4;

          ctx.fillText(char, posX, posY);
        }
      }

      requestAnimationFrame(render);
    };

    const animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [brightnessCache, width, height, fontSize, densityChars, colors, colorScheme]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="font-terminal"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* 3D Morphing Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="morph-shape morph-shape-1"
          style={{
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${colors[colorScheme]}40 0%, transparent 70%)`,
          }}
        />
        <div
          className="morph-shape morph-shape-2"
          style={{
            width: '250px',
            height: '250px',
            background: `radial-gradient(circle, ${colors.secondary}30 0%, transparent 70%)`,
          }}
        />
        <div
          className="morph-shape morph-shape-3"
          style={{
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${colors.tertiary}20 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
