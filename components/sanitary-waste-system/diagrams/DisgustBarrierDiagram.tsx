/**
 * Disgust Barrier Diagram
 * Emotional problem visualization with canvas-based animation
 * Shows sensory transmission, anxiety, and user experience before/after
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface ParticleWave {
  x: number;
  y: number;
  angle: number;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
}

export default function DisgustBarrierDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const particlesRef = useRef<ParticleWave[]>([]);
  const timeRef = useRef(0);

  // Initialize particles for heat wave effect
  useEffect(() => {
    particlesRef.current = Array.from({ length: 30 }, (_, i) => ({
      x: 0,
      y: 50 + (i * 15),
      angle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
      amplitude: 20 + Math.random() * 30,
      frequency: 0.02 + Math.random() * 0.03,
      opacity: 0.3 + Math.random() * 0.4
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup responsive canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Animation loop
    const animate = () => {
      if (!isAnimating) return;

      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.02;

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, 0);
      bgGradient.addColorStop(0, 'rgba(17, 24, 39, 0.5)');
      bgGradient.addColorStop(0.5, 'rgba(31, 41, 55, 0.3)');
      bgGradient.addColorStop(1, 'rgba(17, 24, 39, 0.5)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw "before" state - anxiety waves
      drawAnxietyWaves(ctx, width, height, timeRef.current, 0, width * 0.45);

      // Draw barrier
      drawBarrier(ctx, width, height);

      // Draw "after" state - calm
      drawCalmState(ctx, width, height, width * 0.55, width);

      // Draw labels
      drawLabels(ctx, width, height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating]);

  // Draw anxiety waves (before state)
  const drawAnxietyWaves = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    startX: number,
    endX: number
  ) => {
    particlesRef.current.forEach((particle, i) => {
      const progress = (time + i * 0.1) % 4;
      const x = startX + (progress / 4) * (endX - startX);
      const y = particle.y + Math.sin(time * particle.frequency + particle.angle) * particle.amplitude;

      // Heat wave gradient
      const waveGradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      waveGradient.addColorStop(0, `rgba(239, 68, 68, ${particle.opacity})`);
      waveGradient.addColorStop(0.5, `rgba(220, 38, 38, ${particle.opacity * 0.5})`);
      waveGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = waveGradient;
      ctx.beginPath();
      ctx.arc(x, y, 15 + Math.sin(time * 2 + i) * 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw pressure indicators
    const numIndicators = 5;
    for (let i = 0; i < numIndicators; i++) {
      const x = startX + (endX - startX) * (i / numIndicators);
      const y = height * 0.3;
      const pulseSize = 8 + Math.sin(time * 3 + i) * 4;

      ctx.strokeStyle = `rgba(239, 68, 68, ${0.6 - (i * 0.1)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, pulseSize + 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Anxiety text effect
    ctx.save();
    ctx.font = 'bold 14px system-ui';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
    ctx.textAlign = 'center';

    const anxietyWords = ['Smell', 'Touch', 'Visibility', 'Texture', 'Residue'];
    anxietyWords.forEach((word, i) => {
      const x = startX + (endX - startX) * ((i + 1) / (anxietyWords.length + 1));
      const y = height * 0.7 + Math.sin(time * 2 + i) * 8;
      const alpha = 0.5 + Math.sin(time * 3 + i) * 0.3;

      ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.fillText(word, x, y);
    });
    ctx.restore();
  };

  // Draw barrier
  const drawBarrier = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const centerX = width * 0.5;
    const barWidth = 3;

    // Barrier gradient
    const barrierGradient = ctx.createLinearGradient(centerX - 20, 0, centerX + 20, height);
    barrierGradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
    barrierGradient.addColorStop(0.5, 'rgba(167, 139, 250, 1)');
    barrierGradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');

    ctx.fillStyle = barrierGradient;
    ctx.fillRect(centerX - barWidth / 2, height * 0.15, barWidth, height * 0.7);

    // Barrier glow
    ctx.shadowColor = 'rgba(139, 92, 246, 0.6)';
    ctx.shadowBlur = 20;
    ctx.fillRect(centerX - barWidth / 2, height * 0.15, barWidth, height * 0.7);
    ctx.shadowBlur = 0;

    // Barrier label
    ctx.save();
    ctx.translate(centerX, height * 0.5);
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'bold 16px system-ui';
    ctx.fillStyle = 'rgba(167, 139, 250, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('PROTECTIVE BARRIER', 0, -10);
    ctx.restore();

    // Shield icon at top
    ctx.beginPath();
    ctx.moveTo(centerX, height * 0.1);
    ctx.lineTo(centerX - 15, height * 0.12);
    ctx.lineTo(centerX - 15, height * 0.16);
    ctx.lineTo(centerX, height * 0.18);
    ctx.lineTo(centerX + 15, height * 0.16);
    ctx.lineTo(centerX + 15, height * 0.12);
    ctx.closePath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(167, 139, 250, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Draw calm state (after)
  const drawCalmState = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    startX: number,
    endX: number
  ) => {
    // Gentle ambient glow
    const numGlows = 8;
    for (let i = 0; i < numGlows; i++) {
      const x = startX + (endX - startX) * (i / numGlows);
      const y = height * 0.4 + Math.sin(timeRef.current * 0.5 + i) * 20;

      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
      glowGradient.addColorStop(0, 'rgba(74, 222, 128, 0.3)');
      glowGradient.addColorStop(1, 'rgba(74, 222, 128, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    // Calm indicators
    const calmWords = ['Discreet', 'Clean', 'Confident', 'Easy'];
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';

    calmWords.forEach((word, i) => {
      const x = startX + (endX - startX) * ((i + 1) / (calmWords.length + 1));
      const y = height * 0.7 + Math.sin(timeRef.current * 0.8 + i) * 5;
      const alpha = 0.7 + Math.sin(timeRef.current * 1.5 + i) * 0.2;

      ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
      ctx.fillText(word, x, y);
    });

    // Checkmarks
    calmWords.forEach((_, i) => {
      const x = startX + (endX - startX) * ((i + 1) / (calmWords.length + 1));
      const y = height * 0.35;

      ctx.strokeStyle = 'rgba(74, 222, 128, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(x - 8, y);
      ctx.lineTo(x - 3, y + 5);
      ctx.lineTo(x + 8, y - 6);
      ctx.stroke();
    });
  };

  // Draw labels
  const drawLabels = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';

    // Before label
    ctx.fillStyle = 'rgba(239, 68, 68, 1)';
    ctx.fillText('WITHOUT SOLUTION', width * 0.225, height * 0.95);
    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('Anxiety • Visibility • Contact', width * 0.225, height * 0.98);

    // After label
    ctx.font = 'bold 18px system-ui';
    ctx.fillStyle = 'rgba(74, 222, 128, 1)';
    ctx.fillText('WITH SOLUTION', width * 0.775, height * 0.95);
    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('Confidence • Discretion • Ease', width * 0.775, height * 0.98);
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">The Disgust Barrier</h3>
        <p className="text-sm sm:text-base text-gray-400">
          Eliminating anxiety through protective design
        </p>
      </div>

      <div className="relative bg-gray-950/50 border border-gray-800 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <h4 className="font-bold text-red-400 text-sm">Problem</h4>
            </div>
            <p className="text-xs text-gray-400">
              Direct contact with waste creates sensory anxiety and disrupts daily routines
            </p>
          </div>

          <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <h4 className="font-bold text-purple-400 text-sm">Barrier</h4>
            </div>
            <p className="text-xs text-gray-400">
              Bioplastic liner creates complete physical and psychological separation
            </p>
          </div>

          <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <h4 className="font-bold text-green-400 text-sm">Solution</h4>
            </div>
            <p className="text-xs text-gray-400">
              Zero contact disposal restores confidence and eliminates daily anxiety
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsAnimating(!isAnimating)}
        className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-sm text-gray-300 transition-colors w-full sm:w-auto"
      >
        {isAnimating ? 'Pause Animation' : 'Resume Animation'}
      </button>
    </div>
  );
}
