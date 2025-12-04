/**
 * Close Rate Improvement Diagram
 *
 * Shows dramatic improvement in pitch-to-close rates
 * 15% → 65% conversion through interactive pitching
 * Medium size - clear before/after comparison
 * Terminal Republic aesthetic with animated progress circles
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function CloseRateImprovementDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

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
    const purple = COLORS.brand.purple;
    const purpleDim = COLORS.alpha.purple30;
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

      const progress = Math.min(frameRef.current / animationDuration, 1);
      const easedProgress = easeOutCubic(progress);

      // Title - using body size
      setTextStyle(ctx, 'body', gold, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('PITCH-TO-CLOSE RATE TRANSFORMATION', width / 2, 35);

      // Subtitle - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('From static PDFs to interactive, data-driven pitches', width / 2, 52);

      // Circle parameters
      const circleRadius = Math.min(width, height) * 0.18;
      const circleY = height * 0.5;
      const beforeX = width * 0.3;
      const afterX = width * 0.7;

      // Helper function to draw progress circle
      const drawProgressCircle = (
        x: number,
        y: number,
        radius: number,
        percentage: number,
        color: string,
        animProgress: number
      ) => {
        const actualPercentage = percentage * animProgress;

        // Background circle
        ctx.strokeStyle = `${color}20`;
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Progress arc
        ctx.strokeStyle = color;
        ctx.lineWidth = 16;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(
          x,
          y,
          radius,
          -Math.PI / 2,
          -Math.PI / 2 + (Math.PI * 2 * actualPercentage),
          false
        );
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.lineCap = 'butt';

        // Center percentage text - using hero size
        setTextStyle(ctx, 'hero', color, 'center', 'middle');
        ctx.font = getFont('hero', 'bold');
        ctx.fillText(`${Math.round(actualPercentage * 100)}%`, x, y);
      };

      // Before circle (15%)
      drawProgressCircle(beforeX, circleY, circleRadius, 0.15, red, easedProgress);

      // Before label - using caption size
      setTextStyle(ctx, 'caption', red, 'center', 'top');
      ctx.font = getFont('caption', 'bold');
      ctx.fillText('STATIC PITCH', beforeX, circleY + circleRadius + 25);

      // Sublabels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center', 'top');
      ctx.fillText('PDF decks', beforeX, circleY + circleRadius + 45);
      ctx.fillText('One-way presentation', beforeX, circleY + circleRadius + 60);

      // After circle (65%)
      drawProgressCircle(afterX, circleY, circleRadius, 0.65, purple, easedProgress);

      // After label - using caption size
      setTextStyle(ctx, 'caption', purple, 'center', 'top');
      ctx.font = getFont('caption', 'bold');
      ctx.fillText('INTERACTIVE PITCH', afterX, circleY + circleRadius + 25);

      // Sublabels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center', 'top');
      ctx.fillText('Live customization', afterX, circleY + circleRadius + 45);
      ctx.fillText('Real-time data', afterX, circleY + circleRadius + 60);

      // Center arrow and improvement - using h1 size
      setTextStyle(ctx, 'h1', gold, 'center', 'middle');
      ctx.font = getFont('h1', 'bold');
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15;
      ctx.fillText('→', width / 2, circleY);
      ctx.shadowBlur = 0;

      // Improvement percentage - using h2 size
      setTextStyle(ctx, 'h2', purple, 'center', 'middle');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('+333%', width / 2, circleY - 50);

      // Label - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center', 'middle');
      ctx.fillText('IMPROVEMENT', width / 2, circleY - 35);

      // Bottom insight - using body size
      setTextStyle(ctx, 'body', purple, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('4.3x MORE DEALS CLOSED', width / 2, height - 35);

      // Description - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('When brands can customize and see their data in real-time', width / 2, height - 18);

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
    <div className="relative w-full h-full min-h-[450px] bg-black rounded-lg border border-[#9D4EDD]/20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(157, 78, 221, 0.1) 2px, rgba(157, 78, 221, 0.1) 4px)'
        }}
      />
    </div>
  );
}
