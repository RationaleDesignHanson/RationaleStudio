/**
 * AI Adoption Window Diagram
 *
 * Shows the closing window of opportunity for early AI adoption
 * Timeline: Q1 2025 (NOW - move early) vs Q3 2026 (LATE - catch-up mode)
 * Visual concept: Window of opportunity closing with time pressure
 * Terminal Republic styling with countdown urgency
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function AdoptionWindowDiagram() {
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

    // Typography and color tokens for consistent styling
    let animationId: number;

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

      // Title
      setTextStyle(ctx, 'h2', COLORS.brand.terminalGold, 'center');
      ctx.fillText('THE ADOPTION WINDOW IS CLOSING', width / 2, 40);

      ctx.font = getFont('body');
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Early movers gain 12-24 months before AI becomes table stakes', width / 2, 62);

      // Timeline
      const timelineY = height / 2;
      const timelineStartX = 100;
      const timelineEndX = width - 100;
      const timelineWidth = timelineEndX - timelineStartX;

      // Timeline base line
      ctx.strokeStyle = COLORS.mono.gray60;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(timelineStartX, timelineY);
      ctx.lineTo(timelineEndX, timelineY);
      ctx.stroke();

      // "NOW" marker (Q1 2025)
      const nowX = timelineStartX + timelineWidth * 0.2;

      ctx.fillStyle = COLORS.brand.green;
      ctx.shadowColor = COLORS.brand.green;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(nowX, timelineY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = COLORS.mono.black;
      ctx.font = getFont('body', 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NOW', nowX, timelineY);

      // NOW label
      ctx.fillStyle = COLORS.brand.green;
      ctx.font = getFont('body', 'bold');
      ctx.textAlign = 'center';
      ctx.fillText('Q1 2025', nowX, timelineY - 40);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Early Adopter Phase', nowX, timelineY - 22);

      // "WINDOW CLOSING" marker (Q3 2026)
      const lateX = timelineStartX + timelineWidth * 0.8;

      ctx.fillStyle = COLORS.semantic.error;
      ctx.shadowColor = COLORS.semantic.error;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(lateX, timelineY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = COLORS.mono.black;
      ctx.font = getFont('caption', 'bold');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('LATE', lateX, timelineY);

      // LATE label
      ctx.fillStyle = COLORS.semantic.error;
      ctx.font = getFont('body', 'bold');
      ctx.textAlign = 'center';
      ctx.fillText('Q3 2026', lateX, timelineY - 40);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Table Stakes', lateX, timelineY - 22);

      // Opportunity gradient bar (above timeline)
      const barHeight = 60;
      const barY = timelineY - 120;

      const gradient = ctx.createLinearGradient(nowX, 0, lateX, 0);
      gradient.addColorStop(0, `${COLORS.brand.green}80`);
      gradient.addColorStop(0.5, `${COLORS.brand.orange}80`);
      gradient.addColorStop(1, `${COLORS.semantic.error}80`);

      ctx.fillStyle = gradient;
      ctx.fillRect(nowX, barY, lateX - nowX, barHeight);

      // Opportunity bar outline
      ctx.strokeStyle = COLORS.brand.terminalGold;
      ctx.lineWidth = 3;
      ctx.strokeRect(nowX, barY, lateX - nowX, barHeight);

      // Opportunity label
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('COMPETITIVE ADVANTAGE WINDOW', (nowX + lateX) / 2, barY - 12);

      // Closing "gates" visualization - LEFT side (open)
      const gateLeftX = nowX;
      const gateTopY = barY - 5;
      const gateBottomY = barY + barHeight + 5;

      ctx.strokeStyle = COLORS.brand.green;
      ctx.lineWidth = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(gateLeftX, gateTopY);
      ctx.lineTo(gateLeftX, gateBottomY);
      ctx.stroke();

      // Closing "gates" visualization - RIGHT side (closing)
      const gateRightX = lateX;

      ctx.strokeStyle = COLORS.semantic.error;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(gateRightX, gateTopY);
      ctx.lineTo(gateRightX, gateBottomY);
      ctx.stroke();

      // Animated arrows showing time flowing left to right
      const arrowY = barY + barHeight / 2;
      const pulse = Math.sin(frameRef.current * 0.05) * 0.3 + 0.7;

      for (let i = 0; i < 3; i++) {
        const arrowX = nowX + (lateX - nowX) * (0.25 + i * 0.25);
        const arrowSize = 12;

        ctx.fillStyle = `rgba(255, 215, 0, ${pulse * (1 - i * 0.2)})`;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - arrowSize, arrowY - arrowSize / 2);
        ctx.lineTo(arrowX - arrowSize, arrowY + arrowSize / 2);
        ctx.closePath();
        ctx.fill();
      }

      // LEFT SIDE: Early Mover Benefits (BELOW timeline)
      const benefitsY = timelineY + 80;
      const benefitsX = nowX;

      setTextStyle(ctx, 'body', COLORS.brand.green, 'center');
      ctx.fillText('MOVE EARLY', benefitsX, benefitsY);

      const benefits = [
        '✓ 12-24 mo advantage',
        '✓ Data advantages',
        '✓ Market positioning',
        '✓ Recruit with edge'
      ];

      ctx.font = getFont('caption');
      ctx.fillStyle = COLORS.brand.green;
      benefits.forEach((benefit, i) => {
        ctx.fillText(benefit, benefitsX, benefitsY + 25 + (i * 18));
      });

      // RIGHT SIDE: Late Mover Costs (BELOW timeline)
      const costsX = lateX;

      setTextStyle(ctx, 'body', COLORS.semantic.error, 'center');
      ctx.fillText('MOVE LATE', costsX, benefitsY);

      const costs = [
        '✗ Catch-up mode',
        '✗ Worse economics',
        '✗ Lost deals',
        '✗ No differentiation'
      ];

      ctx.font = getFont('caption');
      ctx.fillStyle = COLORS.semantic.error;
      costs.forEach((cost, i) => {
        ctx.fillText(cost, costsX, benefitsY + 25 + (i * 18));
      });

      // Duration indicator
      const durationY = barY + barHeight + 35;
      ctx.strokeStyle = COLORS.brand.terminalGold;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(nowX, durationY);
      ctx.lineTo(lateX, durationY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Duration brackets
      ctx.strokeStyle = COLORS.brand.terminalGold;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nowX, durationY - 5);
      ctx.lineTo(nowX, durationY + 5);
      ctx.moveTo(lateX, durationY - 5);
      ctx.lineTo(lateX, durationY + 5);
      ctx.stroke();

      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('12-24 MONTHS', (nowX + lateX) / 2, durationY + 20);

      // Bottom CTA
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('TIMING IS A STRATEGIC DECISION', width / 2, height - 25);

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
    <div className="relative w-full h-full min-h-[600px] bg-black rounded-lg border border-[#FFD700]/20 overflow-hidden">
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
