'use client';

import { useEffect, useRef, useState } from 'react';

interface ASCIIImageProps {
  images: string[]; // Array of image URLs to cycle through
  width?: number;
  height?: number;
  fontSize?: number;
  cycleInterval?: number; // ms between image changes
  characters?: string;
}

export default function ASCIIImage({
  images,
  width = 400,
  height = 400,
  fontSize = 8,
  cycleInterval = 8000, // 8 seconds per image
  characters = '█▓▒░▄▀■□▪▫.:·˙∙•●◦○◯⚪'
}: ASCIIImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [edgeMap, setEdgeMap] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);

  // ASCII characters ordered by brightness (dark to light)
  const densityChars = characters.split('');

  // Cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, cycleInterval);

    return () => clearInterval(interval);
  }, [images.length, cycleInterval]);

  // Load and process current image with edge detection
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);
      const data = tempCtx.getImageData(0, 0, width, height);
      setImageData(data);

      // Calculate edge strength for each pixel (Sobel-like)
      const edges: number[] = [];
      const cols = Math.floor(width / (fontSize * 0.6));
      const rows = Math.floor(height / fontSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const imgX = Math.floor((x / cols) * width);
          const imgY = Math.floor((y / rows) * height);

          // Sample surrounding pixels
          let edgeStrength = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = Math.min(Math.max(imgX + dx, 0), width - 1);
              const ny = Math.min(Math.max(imgY + dy, 0), height - 1);

              const centerIdx = (imgY * width + imgX) * 4;
              const neighborIdx = (ny * width + nx) * 4;

              const centerBright = (data.data[centerIdx] + data.data[centerIdx + 1] + data.data[centerIdx + 2]) / 3;
              const neighborBright = (data.data[neighborIdx] + data.data[neighborIdx + 1] + data.data[neighborIdx + 2]) / 3;

              edgeStrength += Math.abs(centerBright - neighborBright);
            }
          }

          edges.push(edgeStrength / 8); // Average edge strength
        }
      }

      // Normalize edge values
      const maxEdge = Math.max(...edges);
      const normalizedEdges = edges.map(e => e / maxEdge);
      setEdgeMap(normalizedEdges);
    };
    img.src = images[currentImageIndex];
  }, [images, currentImageIndex, width, height, fontSize]);

  // Render ASCII with continuous fluid animation
  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.floor(width / (fontSize * 0.6));
    const rows = Math.floor(height / fontSize);

    canvas.width = width;
    canvas.height = height;

    let frameCount = 0;
    const startTime = Date.now();

    // Pre-calculate constant values
    const charSpacingX = fontSize * 0.6;
    const densityCharsLength = densityChars.length;
    const twoPI = Math.PI * 2;

    // Pre-calculate brightness and position data
    const brightnessCache: number[] = [];
    const positionSeeds: number[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const imgX = Math.floor((x / cols) * imageData.width);
        const imgY = Math.floor((y / rows) * imageData.height);
        const pixelIndex = (imgY * imageData.width + imgX) * 4;

        const r = imageData.data[pixelIndex];
        const g = imageData.data[pixelIndex + 1];
        const b = imageData.data[pixelIndex + 2];
        brightnessCache.push((r + g + b) / 765); // Divide by 255*3
        positionSeeds.push(x * 0.5 + y * 0.3);
      }
    }

    const render = () => {
      frameCount++;
      const elapsed = (Date.now() - startTime) * 0.001; // Convert to seconds inline

      ctx.clearRect(0, 0, width, height); // Clear instead of black fill for transparency
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
      ctx.fillStyle = '#ffffff'; // White characters for better visibility

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const charIdx = y * cols + x;
          const brightness = brightnessCache[charIdx];
          const positionSeed = positionSeeds[charIdx];

          // Choose character based on brightness
          const charIndex = Math.floor(brightness * (densityCharsLength - 1));

          // Lighter areas (higher brightness) get faster spin speed
          const brightnessBoost = brightness * 1.5; // 0-1.5x speed boost for bright areas
          const spinSpeed = 0.5 + Math.sin(positionSeed) * 0.2 + brightnessBoost; // 0.5-2.2 Hz
          const spinPhase = (elapsed * spinSpeed + positionSeed) % 1;

          // Simplified turbulence check
          const turbulence = Math.sin(elapsed * 0.2 + x * 0.1) * Math.cos(elapsed * 0.15 + y * 0.1);
          const isActiveZone = turbulence > 0.3;

          // Simplified density calculation - lighter areas also get more variation
          const variationAmount = 0.2 + brightness * 0.3; // 0.2-0.5 range
          let densityOffset: number;
          if (isActiveZone) {
            densityOffset = Math.sin(spinPhase * twoPI) * variationAmount * densityCharsLength;
          } else {
            densityOffset = Math.sin(elapsed * 2 + positionSeed * 5) * (variationAmount * 0.5) * densityCharsLength;
          }

          const finalDensity = Math.floor(charIndex + densityOffset);
          const clampedDensity = Math.max(0, Math.min(densityCharsLength - 1, finalDensity));
          const char = densityChars[clampedDensity];

          // Simplified position calculation
          const driftAmount = isActiveZone ? 2 : 0.5;
          const posX = x * charSpacingX + Math.sin(elapsed * 0.5 + x * 0.2) * driftAmount;
          const posY = y * fontSize + Math.cos(elapsed * 0.5 + y * 0.2) * driftAmount;

          // Simplified opacity
          ctx.globalAlpha = 0.7 + Math.sin(spinPhase * Math.PI) * 0.15;

          ctx.fillText(char, posX, posY);
        }
      }

      requestAnimationFrame(render);
    };

    const animFrame = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animFrame);
  }, [imageData, edgeMap, width, height, fontSize, densityChars]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="font-terminal"
        style={{ imageRendering: 'pixelated' }}
        role="img"
        aria-label="ASCII art representation of images"
      />
      <div
        className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-white/60 font-terminal text-xs"
        aria-live="polite"
        aria-atomic="true"
      >
        [{currentImageIndex + 1}/{images.length}]
      </div>
    </div>
  );
}
