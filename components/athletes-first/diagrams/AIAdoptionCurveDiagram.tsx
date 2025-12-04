/**
 * AI Adoption Curve Diagram
 *
 * Shows adoption curve with "You are here" marker
 * Emphasizes early mover advantage and window closing
 * Medium size - urgency visualization
 * Terminal Republic aesthetic with animated curve
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function AIAdoptionCurveDiagram() {
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
    const green = COLORS.brand.green;
    const red = COLORS.semantic.error;
    const gray = COLORS.mono.gray70;

    // Animation easing
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let animationId: number;
    const animationDuration = 100;

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
      const easedProgress = easeInOutCubic(progress);

      // Title - using body size
      setTextStyle(ctx, 'body', gold, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('AI ADOPTION IN SPORTS MARKETING', width / 2, 35);

      // Subtitle - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('Early adopters capture disproportionate advantage', width / 2, 52);

      // Chart setup
      const chartLeft = width * 0.12;
      const chartRight = width * 0.88;
      const chartTop = height * 0.2;
      const chartBottom = height * 0.72;
      const chartWidth = chartRight - chartLeft;
      const chartHeight = chartBottom - chartTop;

      // Draw axes
      ctx.strokeStyle = gray;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(chartLeft, chartTop);
      ctx.lineTo(chartLeft, chartBottom);
      ctx.lineTo(chartRight, chartBottom);
      ctx.stroke();

      // Y-axis label - using micro size
      ctx.save();
      ctx.translate(chartLeft - 50, chartTop + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('COMPETITIVE ADVANTAGE', 0, 0);
      ctx.restore();

      // X-axis label - using micro size
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('TIME', chartLeft + chartWidth / 2, chartBottom + 35);

      // Define S-curve (adoption curve)
      const points: { x: number; y: number }[] = [];
      const numPoints = 100;

      for (let i = 0; i <= numPoints * easedProgress; i++) {
        const t = i / numPoints;
        const x = chartLeft + t * chartWidth;

        // S-curve formula (sigmoid)
        const sigmoid = 1 / (1 + Math.exp(-12 * (t - 0.5)));
        const y = chartBottom - sigmoid * chartHeight * 0.85;

        points.push({ x, y });
      }

      // Draw the curve
      if (points.length > 1) {
        const gradient = ctx.createLinearGradient(chartLeft, chartTop, chartRight, chartTop);
        gradient.addColorStop(0, green);
        gradient.addColorStop(0.3, gold);
        gradient.addColorStop(0.7, red);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.shadowColor = gold;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Fill under curve
      if (points.length > 1 && easedProgress === 1) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.05)';
        ctx.beginPath();
        ctx.moveTo(chartLeft, chartBottom);
        for (const point of points) {
          ctx.lineTo(point.x, point.y);
        }
        ctx.lineTo(points[points.length - 1].x, chartBottom);
        ctx.closePath();
        ctx.fill();
      }

      // Mark phases
      const earlyX = chartLeft + chartWidth * 0.2;
      const currentX = chartLeft + chartWidth * 0.35;
      const lateX = chartLeft + chartWidth * 0.65;

      // Early phase (green zone)
      ctx.fillStyle = COLORS.alpha.green10;
      ctx.fillRect(chartLeft, chartTop, earlyX - chartLeft, chartHeight);

      // Phase labels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', green, 'center');
      ctx.font = getFont('micro', 'bold');
      ctx.fillText('EARLY', chartLeft + (earlyX - chartLeft) / 2, chartBottom + 20);
      ctx.fillText('ADOPTERS', chartLeft + (earlyX - chartLeft) / 2, chartBottom + 32);

      // Current phase (gold zone)
      ctx.fillStyle = COLORS.alpha.gold10;
      ctx.fillRect(earlyX, chartTop, lateX - earlyX, chartHeight);

      // Late phase (red zone)
      ctx.fillStyle = COLORS.alpha.red10;
      ctx.fillRect(lateX, chartTop, chartRight - lateX, chartHeight);

      setTextStyle(ctx, 'micro', red, 'center');
      ctx.font = getFont('micro', 'bold');
      ctx.fillText('SATURATED', lateX + (chartRight - lateX) / 2, chartBottom + 20);
      ctx.fillText('MARKET', lateX + (chartRight - lateX) / 2, chartBottom + 32);

      // "You are here" marker
      const pulse = Math.sin(frameRef.current * 0.08) * 0.3 + 0.7;
      const markerT = 0.35;
      const markerSigmoid = 1 / (1 + Math.exp(-12 * (markerT - 0.5)));
      const markerY = chartBottom - markerSigmoid * chartHeight * 0.85;

      // Vertical line
      ctx.strokeStyle = `${gold}${Math.round(pulse * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(currentX, markerY);
      ctx.lineTo(currentX, chartBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // Marker dot
      ctx.fillStyle = gold;
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15 * pulse;
      ctx.beginPath();
      ctx.arc(currentX, markerY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // "You are here" label with arrow - using caption size
      setTextStyle(ctx, 'caption', gold, 'center');
      ctx.font = getFont('caption', 'bold');
      ctx.fillText('YOU ARE HERE', currentX, markerY - 25);

      ctx.strokeStyle = gold;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentX, markerY - 15);
      ctx.lineTo(currentX, markerY - 10);
      ctx.stroke();

      // Bottom insight - using body size
      setTextStyle(ctx, 'body', gold, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('WINDOW IS CLOSING FAST', width / 2, height - 45);

      // Description - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', COLORS.mono.gray70, 'center');
      ctx.fillText('First movers in AI-powered sports marketing capture 60%+ of market value', width / 2, height - 28);

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
    <div className="relative w-full h-full min-h-[500px] bg-black rounded-lg border border-[#FFD700]/20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
        }}
      />
    </div>
  );
}
