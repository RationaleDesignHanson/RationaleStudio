/**
 * Competitive Comparison Matrix
 *
 * 4×5 matrix comparing: Build in-house / Enterprise vendor / Dev shop / Rationale
 * across: Time to value, Cost, AI expertise, Sports domain knowledge, Risk
 * Makes decision-making easy, positions Rationale as obvious choice
 * Terminal Republic styling with animated checkmarks and highlights
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

interface Option {
  name: string;
  color: string;
  shortName: string;
}

interface Criterion {
  label: string;
  weight: string;
}

interface Score {
  display: string;
  value: number; // 0-3 (poor, okay, good, excellent)
}

export default function CompetitiveComparisonMatrix() {
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

    // Color shortcuts for cleaner code
    const green = COLORS.brand.green;
    const gray = COLORS.mono.gray60;

    // Typography and color tokens for consistent styling
    const options: Option[] = [
      { name: 'Build In-House', shortName: 'In-House', color: COLORS.semantic.error },
      { name: 'Enterprise Vendor', shortName: 'Enterprise', color: COLORS.brand.orange },
      { name: 'Dev Shop', shortName: 'Dev Shop', color: COLORS.mono.gray70 },
      { name: 'Rationale', shortName: 'Rationale', color: COLORS.brand.green }
    ];

    const criteria: Criterion[] = [
      { label: 'Time to Value', weight: 'Critical' },
      { label: 'Cost', weight: 'High' },
      { label: 'AI Expertise', weight: 'Critical' },
      { label: 'Sports Knowledge', weight: 'High' },
      { label: 'Risk/Flexibility', weight: 'Medium' }
    ];

    // Scores: [in-house, enterprise, dev shop, rationale]
    const scores: Score[][] = [
      [{ display: '12-18 mo', value: 0 }, { display: '9-12 mo', value: 1 }, { display: '6-9 mo', value: 2 }, { display: '90 days', value: 3 }], // Time
      [{ display: '$500K+', value: 0 }, { display: '$300K+', value: 1 }, { display: '$200K+', value: 2 }, { display: '$95K', value: 3 }], // Cost
      [{ display: 'Hire req\'d', value: 0 }, { display: 'Generic', value: 1 }, { display: 'Limited', value: 2 }, { display: 'Meta AI', value: 3 }], // AI
      [{ display: 'Learn curve', value: 0 }, { display: 'None', value: 0 }, { display: 'None', value: 0 }, { display: 'FUBO', value: 3 }], // Sports
      [{ display: 'High risk', value: 0 }, { display: 'Locked in', value: 1 }, { display: 'Medium', value: 2 }, { display: 'Exit ramps', value: 3 }] // Risk
    ];

    let animationId: number;

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Declare responsive font sizes
      const h2Size = getResponsiveFontSize('h2', isMobile);
      const bodySize = getResponsiveFontSize('body', isMobile);
      const captionSize = getResponsiveFontSize('caption', isMobile);
      const microSize = Math.max(11, getResponsiveFontSize('micro', isMobile));

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Title
      setTextStyle(ctx, 'h2', COLORS.brand.terminalGold, 'center');
      ctx.fillText('DECISION MATRIX: WHY RATIONALE?', width / 2, 35);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Compare your options across critical dimensions', width / 2, 55);

      // Matrix layout
      const matrixStartY = 90;
      const matrixStartX = 160;
      const colWidth = (width - matrixStartX - 40) / options.length;
      const rowHeight = 90;
      const headerHeight = 60;

      // Draw column headers (options)
      options.forEach((option, i) => {
        const x = matrixStartX + i * colWidth;

        // Header box
        const isRationale = option.name === 'Rationale';
        ctx.fillStyle = isRationale ? `${option.color}20` : '#0a0a0a';
        ctx.fillRect(x, matrixStartY, colWidth - 5, headerHeight);

        ctx.strokeStyle = isRationale ? `${option.color}80` : `${option.color}40`;
        ctx.lineWidth = isRationale ? 3 : 2;
        if (isRationale) {
          ctx.shadowColor = option.color;
          ctx.shadowBlur = 12;
        }
        ctx.strokeRect(x, matrixStartY, colWidth - 5, headerHeight);
        ctx.shadowBlur = 0;

        // Option name
        ctx.fillStyle = option.color;
        ctx.font = `bold ${captionSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(option.name.toUpperCase(), x + (colWidth - 5) / 2, matrixStartY + 28);

        // Winner indicator for Rationale
        if (isRationale) {
          ctx.fillStyle = option.color;
          ctx.shadowColor = option.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x + (colWidth - 5) / 2, matrixStartY + 45, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#000';
          ctx.font = `bold ${microSize}px monospace`;
          ctx.fillText('✓', x + (colWidth - 5) / 2, matrixStartY + 49);
        }
      });

      // Draw rows
      criteria.forEach((criterion, rowIndex) => {
        const y = matrixStartY + headerHeight + rowIndex * rowHeight;

        // Row label (left side)
        ctx.fillStyle = COLORS.mono.gray60;
        ctx.font = getFont('micro', 'bold'); // Upgraded from 11px to TYPE.micro (11px minimum)
        ctx.textAlign = 'right';
        ctx.fillText(criterion.label.toUpperCase(), matrixStartX - 20, y + 30);

        ctx.font = getFont('micro'); // ACCESSIBILITY UPGRADE: 9px → 11px minimum
        ctx.fillStyle = `${COLORS.mono.gray60}80`;
        ctx.fillText(`(${criterion.weight})`, matrixStartX - 20, y + 45);

        // Draw cells
        options.forEach((option, colIndex) => {
          const x = matrixStartX + colIndex * colWidth;
          const score = scores[rowIndex][colIndex];
          const isRationale = option.name === 'Rationale';
          const isBest = score.value === 3;

          // Cell background
          if (isRationale && isBest) {
            ctx.fillStyle = `${green}15`;
          } else {
            ctx.fillStyle = '#0a0a0a';
          }
          ctx.fillRect(x, y, colWidth - 5, rowHeight - 5);

          // Cell border
          ctx.strokeStyle = isRationale ? `${green}40` : `${gray}20`;
          ctx.lineWidth = isRationale ? 2 : 1;
          ctx.strokeRect(x, y, colWidth - 5, rowHeight - 5);

          // Score indicator (dots)
          const dotY = y + 25;
          const dotSpacing = 12;
          const dotsStartX = x + (colWidth - 5) / 2 - (3 * dotSpacing) / 2;

          for (let d = 0; d < 4; d++) {
            const dotX = dotsStartX + d * dotSpacing;
            const filled = d < score.value;

            if (filled) {
              ctx.fillStyle = isRationale && isBest ? green : option.color;
              ctx.beginPath();
              ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.strokeStyle = `${gray}40`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
              ctx.stroke();
            }
          }

          // Score label
          ctx.fillStyle = isRationale && isBest ? green : (isBest ? option.color : gray);
          ctx.font = isBest ? `bold ${microSize}px monospace` : `${microSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(score.display, x + (colWidth - 5) / 2, y + 55);
        });

        // Row separator
        if (rowIndex < criteria.length - 1) {
          ctx.strokeStyle = `${gray}10`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(matrixStartX, y + rowHeight);
          ctx.lineTo(width - 40, y + rowHeight);
          ctx.stroke();
        }
      });

      // Legend (bottom left)
      const legendY = height - 45;
      ctx.fillStyle = COLORS.mono.gray60;
      ctx.font = getFont('micro'); // ACCESSIBILITY UPGRADE: 9px → 11px minimum
      ctx.textAlign = 'left';
      ctx.fillText('Score: ○ = Poor  ● = Okay  ●● = Good  ●●● = Excellent', 30, legendY);

      // Bottom insight
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('RATIONALE WINS ACROSS ALL CRITICAL DIMENSIONS', width / 2, height - 20);

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
    <div className="relative w-full h-full min-h-[650px] bg-black rounded-lg border border-[#FFD700]/20 overflow-hidden">
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
