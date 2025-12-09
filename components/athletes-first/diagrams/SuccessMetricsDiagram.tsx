/**
 * Success Metrics Diagram
 *
 * Shows key pilot success metrics in a dashboard-style layout
 * Displays multiple KPIs with real-time terminal aesthetic
 * Medium-large size - comprehensive metrics overview
 * Terminal Republic styling with animated counters
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function SuccessMetricsDiagram() {
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
    const cyan = COLORS.brand.cyan;
    const purple = COLORS.brand.purple;
    const orange = COLORS.brand.orange;
    const gray = COLORS.mono.gray70;

    // Animation easing
    const easeOutQuad = (t: number) => t * (2 - t);

    let animationId: number;
    const animationDuration = 100;

    const metrics = [
      {
        label: 'ACTIVATION TIME',
        value: '48hrs',
        sublabel: 'From pilot start to first deployment',
        color: green,
        target: 1.0
      },
      {
        label: 'REVENUE IMPACT',
        value: '+$250K',
        sublabel: 'Average per athlete in 90 days',
        color: gold,
        target: 0.85
      },
      {
        label: 'ENGAGEMENT RATE',
        value: '89%',
        sublabel: 'Brand satisfaction score',
        color: cyan,
        target: 0.89
      },
      {
        label: 'TIME SAVINGS',
        value: '75%',
        sublabel: 'Reduction in manual work',
        color: purple,
        target: 0.75
      },
      {
        label: 'DEAL VELOCITY',
        value: '3.2x',
        sublabel: 'Faster pitch-to-close cycle',
        color: orange,
        target: 0.8
      },
      {
        label: 'PILOT SUCCESS',
        value: '96%',
        sublabel: 'Convert to full contract',
        color: green,
        target: 0.96
      }
    ];

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
      const easedProgress = easeOutQuad(progress);

      // Title - using h2 size
      setTextStyle(ctx, 'h2', gold, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('90-DAY PILOT SUCCESS METRICS', width / 2, 38);

      // Subtitle - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('Real results from Athletes First pilot programs', width / 2, 56);

      // Grid layout - using SPACING tokens
      const cols = 3;
      const rows = 2;
      const cardMargin = SPACING.base;
      const cardWidth = (width - (cols + 1) * cardMargin) / cols;
      const cardHeight = (height - 100 - (rows + 1) * cardMargin) / rows;
      const startY = 80;

      metrics.forEach((metric, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = cardMargin + col * (cardWidth + cardMargin);
        const y = startY + row * (cardHeight + cardMargin);

        // Card background with glow
        ctx.fillStyle = 'rgba(30, 30, 30, 0.8)';
        ctx.fillRect(x, y, cardWidth, cardHeight);

        ctx.strokeStyle = `${metric.color}60`;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardWidth, cardHeight);

        // Animated border glow (subtle pulse)
        const pulse = Math.sin((frameRef.current + i * 20) * 0.05) * 0.2 + 0.8;
        ctx.shadowColor = metric.color;
        ctx.shadowBlur = 8 * pulse;
        ctx.strokeStyle = `${metric.color}${Math.round(pulse * 80).toString(16).padStart(2, '0')}`;
        ctx.strokeRect(x, y, cardWidth, cardHeight);
        ctx.shadowBlur = 0;

        // Label - UPGRADED FROM 10px to 11px (micro) for accessibility
        setTextStyle(ctx, 'micro', metric.color, 'left');
        ctx.font = getFont('micro', 'bold');
        ctx.fillText(metric.label, x + 12, y + 22);

        // Progress bar (horizontal)
        const barWidth = cardWidth - 24;
        const barHeight = 4;
        const barX = x + 12;
        const barY = y + 32;
        const barProgress = metric.target * easedProgress;

        // Bar background
        ctx.fillStyle = `${metric.color}20`;
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Bar fill
        ctx.fillStyle = metric.color;
        ctx.fillRect(barX, barY, barWidth * barProgress, barHeight);

        // Metric value (large) - using h1 size
        setTextStyle(ctx, 'h1', metric.color, 'center');
        ctx.font = getFont('h1', 'bold');
        const centerX = x + cardWidth / 2;
        ctx.fillText(metric.value, centerX, y + 80);

        // Sublabel - UPGRADED FROM 9px to 11px (micro) for accessibility
        setTextStyle(ctx, 'micro', gray, 'center');

        // Word wrap sublabel if needed
        const words = metric.sublabel.split(' ');
        let line = '';
        let lineY = y + 100;
        const maxWidth = cardWidth - 20;

        for (const word of words) {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line.trim(), centerX, lineY);
            line = word + ' ';
            lineY += 12;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), centerX, lineY);
      });

      // Bottom note - using caption size
      setTextStyle(ctx, 'caption', green, 'center');
      ctx.font = getFont('caption', 'bold');
      ctx.fillText('PROVEN RESULTS • SCALABLE IMPACT • RAPID DEPLOYMENT', width / 2, height - 22);

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
    <div className="relative w-full h-full min-h-[550px] bg-black rounded-lg border border-terminal-gold/20 overflow-hidden">
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
