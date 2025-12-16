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

    const draw = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(245, 241, 232, 0.95)');
      bgGradient.addColorStop(1, 'rgba(255, 250, 245, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw revenue growth chart (static final state)
      drawRevenueGrowth(ctx, width, height);

      // Draw money flow (static)
      drawMoneyFlow(ctx, width, height);

      // Draw LTV accumulation (static)
      drawLTVAccumulation(ctx, width, height);
    };

    setupCanvas();
    draw();

    window.addEventListener('resize', () => {
      setupCanvas();
      draw();
    });

    return () => {
      window.removeEventListener('resize', draw);
    };
  }, []);

  // Draw revenue growth bars
  const drawRevenueGrowth = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const chartHeight = height * 0.5;
    const chartY = height * 0.15;
    const maxValue = 241; // 12-month LTV max
    const barWidth = (width * 0.9) / 13;
    const startX = width * 0.05;

    // Draw axis
    ctx.strokeStyle = 'rgba(45, 45, 45, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, chartY + chartHeight);
    ctx.lineTo(startX + barWidth * 13, chartY + chartHeight);
    ctx.stroke();

    // Draw bars at full height (no animation)
    barsRef.current.forEach((bar, index) => {
      const x = startX + (barWidth * index);
      const normalizedHeight = (bar.value / maxValue) * chartHeight;
      const animatedHeight = normalizedHeight; // Full height, no animation

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
        ctx.fillStyle = 'rgba(45, 45, 45, 0.7)';
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

      ctx.strokeStyle = 'rgba(45, 45, 45, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + barWidth * 13, y);
      ctx.stroke();

      ctx.font = '10px system-ui';
      ctx.fillStyle = 'rgba(45, 45, 45, 0.6)';
      ctx.textAlign = 'right';
      ctx.fillText(`$${value}`, startX - 5, y + 3);
    });
  };

  // Draw money flow (static)
  const drawMoneyFlow = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const flowY = height * 0.75;

    // Flow arrow (static dashed line)
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

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
    ctx.fillStyle = 'rgba(37, 99, 235, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('ACQUISITION', width * 0.1, flowY - 15);

    ctx.fillStyle = 'rgba(22, 163, 74, 1)';
    ctx.fillText('RECURRING REVENUE', width * 0.9, flowY - 15);
  };

  // Draw LTV accumulation counter (static at max)
  const drawLTVAccumulation = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const centerX = width * 0.5;
    const centerY = height * 0.88;

    // Static LTV value at maximum
    const maxLTV = 241;
    const currentLTV = maxLTV;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Complete progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2));
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
    ctx.fillStyle = 'rgba(45, 45, 45, 0.7)';
    ctx.fillText('12-Mo LTV', centerX, centerY + 20);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-[#2D2D2D]">Business Model: Recurring Revenue</h3>

      {/* Canvas Visualization */}
      <div className="relative bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl overflow-hidden mb-6 sm:mb-8 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Acquisition */}
        <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-2xl p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#E85D42]/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E85D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="font-bold text-[#2D2D2D] mb-2 text-base sm:text-lg">Acquisition</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-[#2D2D2D]/70">Starter Kit</span>
              <span className="font-bold text-[#E85D42] text-base sm:text-lg">$24.99</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-[#2D2D2D]/70">Margin</span>
              <span className="text-sm sm:text-base text-[#2D2D2D]/70">Break-even</span>
            </div>
            <div className="pt-3 border-t border-gray-200 text-xs sm:text-sm text-[#2D2D2D]/60">
              Includes dispenser + 2 refill packs
            </div>
          </div>
        </div>

        {/* Retention */}
        <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-2xl p-4 sm:p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#2A9D8F]/20 mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-[#2D2D2D] mb-2 text-base sm:text-lg">Retention</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-[#2D2D2D]/70">Monthly Refills</span>
              <span className="font-bold text-[#2A9D8F] text-base sm:text-lg">$15-18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-[#2D2D2D]/70">Gross Margin</span>
              <span className="font-bold text-[#2A9D8F] text-base sm:text-lg">~44%</span>
            </div>
            <div className="pt-3 border-t border-gray-200 text-xs sm:text-sm text-[#2D2D2D]/60">
              Subscription + retail channels
            </div>
          </div>
        </div>
      </div>

      {/* LTV Calculation */}
      <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-2xl p-4 sm:p-6">
        <h4 className="font-bold text-[#2D2D2D] mb-4 text-center text-base sm:text-lg">12-Month Customer Lifetime Value</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs sm:text-sm text-[#2D2D2D]/60 mb-1">Starter Kit</div>
            <div className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">$25</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-[#2D2D2D]/60 mb-1">+ 12 Refills</div>
            <div className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">$180-216</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-[#2D2D2D]/60 mb-1">= Total LTV</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2A9D8F]">$205-241</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t-2 border-gray-200 text-center text-xs sm:text-sm text-[#2D2D2D]/60">
          Assumes monthly subscription at $15-18/box (60 bags)
        </div>
      </div>
    </div>
  );
}
