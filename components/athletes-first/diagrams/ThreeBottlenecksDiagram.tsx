/**
 * Three Bottlenecks Diagram
 *
 * Value Extraction Gap visualization showing three operational constraints
 * Shows the gap between available opportunities and what you can execute
 * Terminal Republic styling with clear bar comparisons
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function ThreeBottlenecksDiagram() {
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

    const gold = COLORS.brand.terminalGold;
    const red = COLORS.semantic.error;
    const green = COLORS.brand.green;
    const gray = COLORS.mono.gray70;

    const bottlenecks = [
      {
        id: 'content',
        label: 'CONTENT VELOCITY',
        title: 'Available vs. Delivered',
        potential: 20,
        actual: 2,
        unit: 'deals/athlete/year',
        lostValue: '90%',
        subtitle: 'Brand revenue\nuncaptured',
        color: COLORS.brand.orange // Orange
      },
      {
        id: 'speed',
        label: 'SPEED TO MARKET',
        title: 'Window vs. Execution',
        potential: 72,
        actual: 336,
        unit: 'hours',
        lostValue: '70%',
        subtitle: 'Viral opportunities\nexpire',
        color: COLORS.brand.purple // Purple
      },
      {
        id: 'conversion',
        label: 'CONVERSION EFFICIENCY',
        title: 'Static vs. Interactive',
        potential: 80,
        actual: 45,
        unit: '% close rate',
        lostValue: '44%',
        subtitle: 'Winnable deals\nlost',
        color: COLORS.brand.cyan // Cyan
      }
    ];

    let animationId: number;

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Declare all font sizes at the top to avoid redeclaration errors
      const h2Size = getResponsiveFontSize('h2', isMobile);
      const bodySize = getResponsiveFontSize('body', isMobile);
      const captionSize = getResponsiveFontSize('caption', isMobile);
      const microSize = Math.max(11, getResponsiveFontSize('micro', isMobile));
      const heroSize = Math.min(48, getResponsiveFontSize('hero', isMobile));

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = gold;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('THE VALUE EXTRACTION GAP', width / 2, 40);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Three operational constraints limiting portfolio performance', width / 2, 58);

      if (isMobile) {
        // ============ MOBILE: VERTICAL STACK ============
        const sectionGap = 180;
        const startY = 80;

        bottlenecks.forEach((bottleneck, i) => {
          const sectionY = startY + i * sectionGap;
          const centerX = width / 2;

          // Section label
          ctx.fillStyle = bottleneck.color;
          ctx.font = `bold ${bodySize}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(bottleneck.label, centerX, sectionY);

          // Title (subtitle)
          ctx.font = `${microSize}px monospace`;
          ctx.fillStyle = gray;
          ctx.fillText(bottleneck.title, centerX, sectionY + 16);

          // Bar chart area
          const barY = sectionY + 40;
          const barHeight = 100;
          const barWidth = 50;
          const barGap = 20;

          // Calculate bar heights
          let potentialBarHeight, actualBarHeight, potentialValue, actualValue;

          if (bottleneck.id === 'speed') {
            potentialBarHeight = barHeight;
            actualBarHeight = (bottleneck.potential / bottleneck.actual) * barHeight;
            potentialValue = bottleneck.potential;
            actualValue = bottleneck.actual;
          } else {
            const maxValue = Math.max(bottleneck.potential, bottleneck.actual);
            potentialBarHeight = (bottleneck.potential / maxValue) * barHeight;
            actualBarHeight = (bottleneck.actual / maxValue) * barHeight;
            potentialValue = bottleneck.potential;
            actualValue = bottleneck.actual;
          }

          const potentialBarX = centerX - barWidth - barGap / 2;
          const actualBarX = centerX + barGap / 2;
          const barBaseY = barY + barHeight;

          // Potential bar (green)
          ctx.fillStyle = bottleneck.id === 'speed' ? green : 'rgba(0, 255, 148, 0.3)';
          ctx.fillRect(potentialBarX, barBaseY - potentialBarHeight, barWidth, potentialBarHeight);
          ctx.strokeStyle = green;
          ctx.lineWidth = 2;
          ctx.strokeRect(potentialBarX, barBaseY - potentialBarHeight, barWidth, potentialBarHeight);

          // Potential value
          ctx.fillStyle = green;
          ctx.font = `bold ${h2Size}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(String(potentialValue), potentialBarX + barWidth / 2, barBaseY - potentialBarHeight - 8);

          // Potential label
          ctx.font = `${microSize}px monospace`;
          ctx.fillStyle = gray;
          ctx.fillText(bottleneck.id === 'speed' ? 'WINDOW' : 'POTENTIAL', potentialBarX + barWidth / 2, barBaseY + 15);

          // Actual bar (red)
          ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
          ctx.fillRect(actualBarX, barBaseY - actualBarHeight, barWidth, actualBarHeight);
          ctx.strokeStyle = red;
          ctx.lineWidth = 2;
          ctx.strokeRect(actualBarX, barBaseY - actualBarHeight, barWidth, actualBarHeight);

          // Actual value
          ctx.fillStyle = red;
          ctx.font = `bold ${h2Size}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(String(actualValue), actualBarX + barWidth / 2, barBaseY - actualBarHeight - 8);

          // Actual label
          ctx.font = `${microSize}px monospace`;
          ctx.fillStyle = gray;
          ctx.fillText(bottleneck.id === 'speed' ? 'EXECUTION' : 'ACTUAL', actualBarX + barWidth / 2, barBaseY + 15);

          // Lost value percentage (large)
          ctx.fillStyle = red;
          ctx.font = `bold ${heroSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(bottleneck.lostValue, centerX, barY + barHeight + 50);

          // Subtitle
          ctx.font = `${microSize}px monospace`;
          ctx.fillStyle = gray;
          const subtitleLines = bottleneck.subtitle.split('\n');
          subtitleLines.forEach((line, lineIndex) => {
            ctx.fillText(line, centerX, barY + barHeight + 66 + lineIndex * 12);
          });
        });

        // Bottom insight
        ctx.fillStyle = gold;
        ctx.font = `bold ${microSize}px monospace`;
        ctx.textAlign = 'center';
        const insightLines = ['NOT A PORTFOLIO SIZE PROBLEM—', 'A PORTFOLIO EFFICIENCY PROBLEM'];
        insightLines.forEach((line, idx) => {
          ctx.fillText(line, width / 2, height - 30 + idx * 14);
        });

      } else {
        // ============ DESKTOP: THREE COLUMNS ============
        const columnWidth = (width - 120) / 3;
        const columnSpacing = getResponsiveSpacing(20, isMobile);
        const columnStartY = 100;
        const columnHeight = height - columnStartY - 80;

        bottlenecks.forEach((bottleneck, i) => {
          const x = 60 + i * (columnWidth + columnSpacing);
          const centerX = x + columnWidth / 2;

        // Section label
        ctx.fillStyle = bottleneck.color;
        ctx.font = `bold ${bodySize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(bottleneck.label, centerX, columnStartY + 25);

        // Title
        ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText(bottleneck.title, centerX, columnStartY + 45);

        // Bar chart area
        const barAreaY = columnStartY + 70;
        const barAreaHeight = 280;
        const maxBarHeight = barAreaHeight - 40;

        // For speed-to-market, we want to show SMALLER is better (72hrs vs 336hrs)
        // So we flip the visual: potential (72) should be the TALL green bar (good)
        // actual (336) should be the SHORT red bar (bad)
        let potentialBarHeight, actualBarHeight, potentialValue, actualValue;

        if (bottleneck.id === 'speed') {
          // Flip for speed: lower is better
          const maxValue = Math.max(bottleneck.potential, bottleneck.actual);
          potentialBarHeight = maxBarHeight; // 72hrs gets full height (this is the goal)
          actualBarHeight = (bottleneck.potential / bottleneck.actual) * maxBarHeight; // 336hrs gets small height (bad)
          potentialValue = bottleneck.potential;
          actualValue = bottleneck.actual;
        } else {
          // Normal: higher is better
          const maxValue = Math.max(bottleneck.potential, bottleneck.actual);
          potentialBarHeight = (bottleneck.potential / maxValue) * maxBarHeight;
          actualBarHeight = (bottleneck.actual / maxValue) * maxBarHeight;
          potentialValue = bottleneck.potential;
          actualValue = bottleneck.actual;
        }

        const barWidth = 60;
        const potentialBarX = centerX - barWidth - 15;
        const actualBarX = centerX + 15;

        // Draw bars from bottom up
        const barBaseY = barAreaY + maxBarHeight;

        // Potential bar (green - the goal)
        ctx.fillStyle = bottleneck.id === 'speed' ? green : 'rgba(0, 255, 148, 0.3)';
        ctx.fillRect(potentialBarX, barBaseY - potentialBarHeight, barWidth, potentialBarHeight);

        ctx.strokeStyle = green;
        ctx.lineWidth = 2;
        ctx.strokeRect(potentialBarX, barBaseY - potentialBarHeight, barWidth, potentialBarHeight);

        // Potential value label
        ctx.fillStyle = green;
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(potentialValue), potentialBarX + barWidth / 2, barBaseY - potentialBarHeight - 30);

        // Potential label
      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText(bottleneck.id === 'speed' ? 'WINDOW' : 'POTENTIAL', potentialBarX + barWidth / 2, barBaseY + 25);

        // Actual bar (red - current reality)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.fillRect(actualBarX, barBaseY - actualBarHeight, barWidth, actualBarHeight);

        ctx.strokeStyle = red;
        ctx.lineWidth = 2;
        ctx.strokeRect(actualBarX, barBaseY - actualBarHeight, barWidth, actualBarHeight);

        // Actual value label
        ctx.fillStyle = red;
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(actualValue), actualBarX + barWidth / 2, barBaseY - actualBarHeight - 30);

        // Actual label
      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText(bottleneck.id === 'speed' ? 'EXECUTION' : 'ACTUAL', actualBarX + barWidth / 2, barBaseY + 25);

        // Unit label
      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.textAlign = 'center';
        const unitLines = bottleneck.unit.split('/');
        unitLines.forEach((line, idx) => {
          ctx.fillText(line, centerX, barBaseY + 45 + idx * 12);
        });

        // Gap visualization
        const gapY = barAreaY + maxBarHeight + 80;

        // Lost value percentage (hero number)
        ctx.fillStyle = red;
      ctx.font = `bold ${heroSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(bottleneck.lostValue, centerX, gapY);

        // Subtitle (what's being lost)
      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        const subtitleLines = bottleneck.subtitle.split('\n');
        subtitleLines.forEach((line, lineIndex) => {
          ctx.fillText(line, centerX, gapY + 30 + lineIndex * 14);
        });

        // Column divider
        if (i < bottlenecks.length - 1) {
          ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x + columnWidth + columnSpacing / 2, columnStartY);
          ctx.lineTo(x + columnWidth + columnSpacing / 2, height - 60);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

        // Bottom insight (desktop)
        ctx.fillStyle = gold;
        ctx.font = `bold ${bodySize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('NOT A PORTFOLIO SIZE PROBLEM—A PORTFOLIO EFFICIENCY PROBLEM', width / 2, height - 30);
      }

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
    <div className="relative w-full h-full min-h-[500px] md:min-h-[650px] bg-black rounded-lg border border-yellow-400/20 overflow-hidden">
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
