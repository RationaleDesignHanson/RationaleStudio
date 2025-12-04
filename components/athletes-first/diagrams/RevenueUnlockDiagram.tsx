/**
 * Revenue Unlock Diagram
 *
 * Illustrates revenue potential unlocked by digital twins
 * Shows before/after comparison with visual bar chart
 * Large size - emphasizes ROI impact
 * Terminal Republic aesthetic with animated bars
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function RevenueUnlockDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Store responsive state in a ref so it updates
    let responsiveState = setupResponsiveCanvas(canvas, ctx, container);

    // Using design system color tokens
    const gold = COLORS.brand.terminalGold;
    const green = COLORS.brand.green;
    const greenDim = COLORS.alpha.green30;
    const red = COLORS.semantic.error;
    const gray = COLORS.mono.gray70;

    // Animation easing
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let animationId: number;
    const animationDuration = 120; // frames

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Declare all font sizes at the top to avoid redeclaration errors
      const h2Size = getResponsiveFontSize('h2', isMobile);
      const h1Size = getResponsiveFontSize('h1', isMobile);
      const bodySize = getResponsiveFontSize('body', isMobile);
      const captionSize = getResponsiveFontSize('caption', isMobile);
      const microSize = Math.max(11, getResponsiveFontSize('micro', isMobile));

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Update animation progress
      if (frameRef.current < animationDuration) {
        const progress = frameRef.current / animationDuration;
        setAnimationProgress(easeOutCubic(progress));
      }

      const progress = Math.min(frameRef.current / animationDuration, 1);
      const easedProgress = easeOutCubic(progress);

      // Title - using h2 size for main title
      setTextStyle(ctx, 'h2', gold, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('REVENUE UNLOCK PER ATHLETE', width / 2, 40);

      // Subtitle - using micro size
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('Annual revenue potential: Physical presence vs. Digital twins', width / 2, 60);

      // Bar chart setup
      const chartY = height * 0.25;
      const chartHeight = height * 0.5;
      const barWidth = width * 0.15;
      const spacing = width * 0.25;

      // Before: Physical only
      const beforeX = width * 0.3;
      const beforeValue = 50000; // $50K
      const beforeHeight = (beforeValue / 500000) * chartHeight * easedProgress;

      // Draw before bar
      ctx.fillStyle = red;
      ctx.fillRect(
        beforeX - barWidth / 2,
        chartY + chartHeight - beforeHeight,
        barWidth,
        beforeHeight
      );

      // Before bar border
      ctx.strokeStyle = red;
      ctx.lineWidth = 2;
      ctx.strokeRect(
        beforeX - barWidth / 2,
        chartY + chartHeight - beforeHeight,
        barWidth,
        beforeHeight
      );

      // Before label - using h2 for value
      setTextStyle(ctx, 'h2', red, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('$50K', beforeX, chartY + chartHeight + 35);

      // Labels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('PHYSICAL ONLY', beforeX, chartY + chartHeight + 55);
      ctx.fillText('Limited by time', beforeX, chartY + chartHeight + 70);

      // After: With digital twins (range: $150K-$500K)
      const afterX = width * 0.7;
      const afterMinValue = 150000; // $150K
      const afterMaxValue = 500000; // $500K
      const afterMinHeight = (afterMinValue / 500000) * chartHeight * easedProgress;
      const afterMaxHeight = (afterMaxValue / 500000) * chartHeight * easedProgress;

      // Draw gradient bar for range
      const gradient = ctx.createLinearGradient(
        afterX,
        chartY + chartHeight - afterMaxHeight,
        afterX,
        chartY + chartHeight
      );
      gradient.addColorStop(0, green);
      gradient.addColorStop(1, greenDim);

      ctx.fillStyle = gradient;
      ctx.fillRect(
        afterX - barWidth / 2,
        chartY + chartHeight - afterMaxHeight,
        barWidth,
        afterMaxHeight
      );

      // After bar border with glow
      ctx.strokeStyle = green;
      ctx.lineWidth = 2;
      ctx.shadowColor = green;
      ctx.shadowBlur = 10;
      ctx.strokeRect(
        afterX - barWidth / 2,
        chartY + chartHeight - afterMaxHeight,
        barWidth,
        afterMaxHeight
      );
      ctx.shadowBlur = 0;

      // Range indicator line at $150K mark
      ctx.strokeStyle = `${green}80`;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(afterX - barWidth / 2 - 10, chartY + chartHeight - afterMinHeight);
      ctx.lineTo(afterX + barWidth / 2 + 10, chartY + chartHeight - afterMinHeight);
      ctx.stroke();
      ctx.setLineDash([]);

      // After label - using h2 for values
      setTextStyle(ctx, 'h2', green, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('$150K', afterX, chartY + chartHeight + 35);

      setTextStyle(ctx, 'body', green, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('- $500K', afterX, chartY + chartHeight + 55);

      // Labels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('WITH DIGITAL TWINS', afterX, chartY + chartHeight + 75);
      ctx.fillText('Scale without limits', afterX, chartY + chartHeight + 90);

      // Draw center arrow with multiplier
      const arrowY = chartY + chartHeight / 2;
      // Arrow using hero size
      setTextStyle(ctx, 'hero', gold, 'center');
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15;
      ctx.fillText('→', width / 2, arrowY);
      ctx.shadowBlur = 0;

      // Multiplier using h2 size
      setTextStyle(ctx, 'h2', gold, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('3-10x', width / 2, arrowY + 35);

      // Label - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('REVENUE GROWTH', width / 2, arrowY + 50);

      // Y-axis labels (scale) - UPGRADED FROM 9px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'right');

      const scaleMarks = [0, 100000, 200000, 300000, 400000, 500000];
      scaleMarks.forEach(mark => {
        const y = chartY + chartHeight - (mark / 500000) * chartHeight;
        ctx.fillText(`$${mark / 1000}K`, width * 0.15, y + 3);

        // Grid line
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width * 0.17, y);
        ctx.lineTo(width * 0.85, y);
        ctx.stroke();
      });

      frameRef.current += 1;
      animationId = requestAnimationFrame(draw);
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        responsiveState = setupResponsiveCanvas(canvas, ctx, container);
        // Cancel and restart animation to use new dimensions
        if (animationId) cancelAnimationFrame(animationId);
        draw();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-black rounded-lg border border-[#00FF94]/20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 148, 0.1) 2px, rgba(0, 255, 148, 0.1) 4px)'
        }}
      />
    </div>
  );
}
