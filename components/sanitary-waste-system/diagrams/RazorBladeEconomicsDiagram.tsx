/**
 * Razor-Blade Economics Diagram
 * LTV calculation and recurring revenue model with canvas-based animations
 * Shows revenue growth, customer lifetime value, and recurring revenue flow
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface RevenueBar {
  month: number;
  value: number;
  x: number;
  height: number;
}

export default function RazorBladeEconomicsDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const timeRef = useRef(0);
  const barsRef = useRef<RevenueBar[]>([]);

  // Initialize revenue bars
  useEffect(() => {
    const starterKit = 25;
    const monthlyRefill = 16.5; // Average of $15-18

    barsRef.current = Array.from({ length: 13 }, (_, i) => ({
      month: i,
      value: i === 0 ? starterKit : starterKit + (monthlyRefill * i),
      x: 0,
      height: 0
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

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.02;

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(17, 24, 39, 0.3)');
      bgGradient.addColorStop(1, 'rgba(17, 24, 39, 0.6)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw revenue growth chart
      drawRevenueGrowth(ctx, width, height, timeRef.current);

      // Draw money flow particles
      drawMoneyFlow(ctx, width, height, timeRef.current);

      // Draw LTV accumulation
      drawLTVAccumulation(ctx, width, height, timeRef.current);

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

  // Draw revenue growth bars
  const drawRevenueGrowth = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const chartHeight = height * 0.5;
    const chartY = height * 0.15;
    const maxValue = 241; // 12-month LTV max
    const barWidth = (width * 0.9) / 13;
    const startX = width * 0.05;

    // Draw axis
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, chartY + chartHeight);
    ctx.lineTo(startX + barWidth * 13, chartY + chartHeight);
    ctx.stroke();

    // Draw bars with animation
    barsRef.current.forEach((bar, index) => {
      const x = startX + (barWidth * index);
      const normalizedHeight = (bar.value / maxValue) * chartHeight;
      const animatedHeight = normalizedHeight * Math.min(1, (time - index * 0.1));

      // Bar gradient
      const barGradient = ctx.createLinearGradient(x, chartY + chartHeight - animatedHeight, x, chartY + chartHeight);

      if (index === 0) {
        // Starter kit - blue
        barGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        barGradient.addColorStop(1, 'rgba(37, 99, 235, 0.6)');
      } else {
        // Recurring revenue - green
        barGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
        barGradient.addColorStop(1, 'rgba(22, 163, 74, 0.6)');
      }

      ctx.fillStyle = barGradient;
      ctx.fillRect(x + 2, chartY + chartHeight - animatedHeight, barWidth - 4, animatedHeight);

      // Bar highlight
      if (animatedHeight > 10) {
        ctx.fillStyle = index === 0 ? 'rgba(147, 197, 253, 0.3)' : 'rgba(134, 239, 172, 0.3)';
        ctx.fillRect(x + 2, chartY + chartHeight - animatedHeight, barWidth - 4, 2);
      }

      // Month label
      if (index % 3 === 0 || index === 12) {
        ctx.font = '10px system-ui';
        ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(index === 0 ? 'Start' : `M${index}`, x + barWidth / 2, chartY + chartHeight + 15);
      }

      // Value label on last bar
      if (index === 12 && animatedHeight > 20) {
        ctx.font = 'bold 12px system-ui';
        ctx.fillStyle = 'rgba(34, 197, 94, 1)';
        ctx.textAlign = 'center';
        ctx.fillText('$241', x + barWidth / 2, chartY + chartHeight - animatedHeight - 5);
      }
    });

    // Y-axis labels
    const yLabels = [0, 50, 100, 150, 200, 241];
    yLabels.forEach(value => {
      const y = chartY + chartHeight - (value / maxValue) * chartHeight;

      ctx.strokeStyle = 'rgba(75, 85, 99, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + barWidth * 13, y);
      ctx.stroke();

      ctx.font = '10px system-ui';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.6)';
      ctx.textAlign = 'right';
      ctx.fillText(`$${value}`, startX - 5, y + 3);
    });
  };

  // Draw money flow particles
  const drawMoneyFlow = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const numParticles = 20;
    const flowY = height * 0.75;

    for (let i = 0; i < numParticles; i++) {
      const progress = ((time * 0.5 + i * 0.3) % 2) / 2;
      const x = width * 0.1 + (width * 0.8 * progress);
      const y = flowY + Math.sin(time * 2 + i) * 10;
      const size = 3 + Math.sin(time * 3 + i) * 2;
      const opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;

      // Dollar sign particle
      ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
      ctx.font = `${size * 3}px system-ui`;
      ctx.textAlign = 'center';
      ctx.fillText('$', x, y);

      // Particle glow
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
      glowGradient.addColorStop(0, `rgba(34, 197, 94, ${opacity * 0.5})`);
      glowGradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flow arrow
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = -time * 10;

    ctx.beginPath();
    ctx.moveTo(width * 0.1, flowY);
    ctx.lineTo(width * 0.9, flowY);
    ctx.stroke();

    ctx.setLineDash([]);

    // Arrow head
    ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
    ctx.beginPath();
    ctx.moveTo(width * 0.9, flowY);
    ctx.lineTo(width * 0.88, flowY - 5);
    ctx.lineTo(width * 0.88, flowY + 5);
    ctx.fill();

    // Labels
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = 'rgba(59, 130, 246, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('ACQUISITION', width * 0.1, flowY - 15);

    ctx.fillStyle = 'rgba(34, 197, 94, 1)';
    ctx.fillText('RECURRING REVENUE', width * 0.9, flowY - 15);
  };

  // Draw LTV accumulation counter
  const drawLTVAccumulation = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const centerX = width * 0.5;
    const centerY = height * 0.88;

    // Animated LTV value
    const maxLTV = 241;
    const currentLTV = Math.floor((Math.sin(time * 0.5) * 0.5 + 0.5) * maxLTV);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Progress arc
    const progress = currentLTV / maxLTV;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, -Math.PI / 2, -Math.PI / 2 + (progress * Math.PI * 2));
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Value text
    ctx.font = 'bold 24px system-ui';
    ctx.fillStyle = 'rgba(34, 197, 94, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(`$${currentLTV}`, centerX, centerY + 5);

    // Label
    ctx.font = '10px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('12-Mo LTV', centerX, centerY + 20);
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Business Model: Recurring Revenue</h3>

      {/* Canvas Animation */}
      <div className="relative bg-gray-950/50 border border-gray-800 rounded-lg overflow-hidden mb-6 sm:mb-8" style={{ height: '500px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="absolute top-4 right-4 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded text-xs text-gray-300 transition-colors backdrop-blur-sm"
        >
          {isAnimating ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Acquisition */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="font-bold text-white mb-2 text-base sm:text-lg">Acquisition</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Starter Kit</span>
              <span className="font-bold text-blue-400 text-base sm:text-lg">$24.99</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Margin</span>
              <span className="text-sm sm:text-base text-gray-400">Break-even</span>
            </div>
            <div className="pt-3 border-t border-gray-700 text-xs sm:text-sm text-gray-500">
              Includes dispenser + 2 refill packs
            </div>
          </div>
        </div>

        {/* Retention */}
        <div className="bg-gray-800/50 border border-green-700 rounded-lg p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-white mb-2 text-base sm:text-lg">Retention</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Monthly Refills</span>
              <span className="font-bold text-green-400 text-base sm:text-lg">$15-18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-400">Gross Margin</span>
              <span className="font-bold text-green-400 text-base sm:text-lg">~44%</span>
            </div>
            <div className="pt-3 border-t border-gray-700 text-xs sm:text-sm text-gray-500">
              Subscription + retail channels
            </div>
          </div>
        </div>
      </div>

      {/* LTV Calculation */}
      <div className="bg-gray-950/50 border border-green-500/30 rounded-lg p-4 sm:p-6">
        <h4 className="font-bold text-white mb-4 text-center text-base sm:text-lg">12-Month Customer Lifetime Value</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Starter Kit</div>
            <div className="text-xl sm:text-2xl font-bold text-white">$25</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">+ 12 Refills</div>
            <div className="text-xl sm:text-2xl font-bold text-white">$180-216</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-1">= Total LTV</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-400">$205-241</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
          Assumes monthly subscription at $15-18/box (60 bags)
        </div>
      </div>
    </div>
  );
}
