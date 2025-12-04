/**
 * Status Quo Ceiling Diagram
 *
 * Side-by-side comparison: Traditional Scaling vs AI Scaling
 * Shows why hiring more agents doesn't solve value extraction gaps
 * and how AI maintains personal touch at portfolio scale
 * Terminal Republic styling with clear visual comparison
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function StatusQuoCeilingDiagram() {
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
      ctx.fillStyle = gold;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('TWO PATHS TO 100 ATHLETES', width / 2, 40);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Traditional scaling loses quality. AI scaling preserves personal touch.', width / 2, 62);

      // Two columns
      const columnWidth = (width - 120) / 2;
      const dividerX = width / 2;

      // Left column: Traditional Scaling
      const leftX = 60;
      const leftCenterX = leftX + columnWidth / 2;

      // Right column: AI Scaling
      const rightX = dividerX + 60;
      const rightCenterX = rightX + columnWidth / 2;

      const contentStartY = 100;

      // ===== LEFT SIDE: TRADITIONAL SCALING =====
      ctx.fillStyle = red;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('TRADITIONAL SCALING', leftCenterX, contentStartY);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Hire More Agents', leftCenterX, contentStartY + 20);

      // Visual: Many agents (stick figures) with small athlete clusters
      const agentY = contentStartY + 60;
      const agentSize = 8;
      const agentRows = 4;
      const agentCols = 5;

      for (let row = 0; row < agentRows; row++) {
        for (let col = 0; col < agentCols; col++) {
          const x = leftCenterX - (agentCols * 25) / 2 + col * 25;
          const y = agentY + row * 30;

          // Agent (stick figure)
          ctx.strokeStyle = red;
          ctx.lineWidth = 2;

          // Head
          ctx.beginPath();
          ctx.arc(x, y, agentSize / 2, 0, Math.PI * 2);
          ctx.stroke();

          // Body
          ctx.beginPath();
          ctx.moveTo(x, y + agentSize / 2);
          ctx.lineTo(x, y + agentSize / 2 + 8);
          ctx.stroke();

          // Small athlete count next to each agent
          ctx.fillStyle = gray;
      ctx.font = `${microSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText('5', x, y + agentSize / 2 + 20);
        }
      }

      // Agent count label
      ctx.fillStyle = red;
      ctx.font = `bold ${h1Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('20', leftCenterX, agentY + 150);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('AGENTS', leftCenterX, agentY + 168);

      // Cost
      ctx.fillStyle = red;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.fillText('$6M/yr', leftCenterX, agentY + 200);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('20 agents × $300K', leftCenterX, agentY + 218);

      // Quality meter (declining)
      const meterY = agentY + 250;
      const meterWidth = 120;
      const meterHeight = 20;
      const meterX = leftCenterX - meterWidth / 2;

      ctx.strokeStyle = red;
      ctx.lineWidth = 2;
      ctx.strokeRect(meterX, meterY, meterWidth, meterHeight);

      // Fill only 30% (quality degrades)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.fillRect(meterX, meterY, meterWidth * 0.3, meterHeight);

      ctx.fillStyle = red;
      ctx.font = `${microSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('PERSONAL TOUCH', leftCenterX, meterY - 8);
      ctx.fillText('LOST', leftCenterX, meterY + meterHeight + 16);

      // Value extraction gaps (still present)
      const gapY = meterY + 60;
      const gaps = [
        { label: 'Content', value: '90%' },
        { label: 'Speed', value: '70%' },
        { label: 'Conversion', value: '44%' }
      ];

      ctx.fillStyle = gray;
      ctx.font = `${microSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('VALUE EXTRACTION GAPS', leftCenterX, gapY);
      ctx.fillText('(REMAIN UNCHANGED)', leftCenterX, gapY + 14);

      gaps.forEach((gap, i) => {
        const y = gapY + 40 + i * 30;

        ctx.fillStyle = red;
      ctx.font = `bold ${h2Size}px monospace`;
        ctx.fillText(gap.value, leftCenterX, y);

      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText(gap.label + ' Lost', leftCenterX, y + 14);
      });

      // ===== RIGHT SIDE: AI SCALING =====
      ctx.fillStyle = green;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('AI SCALING', rightCenterX, contentStartY);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Quality at Portfolio Scale', rightCenterX, contentStartY + 20);

      // Visual: Fewer agents with larger, quality clusters
      const aiAgentY = contentStartY + 60;
      const aiAgentCount = 5;

      for (let i = 0; i < aiAgentCount; i++) {
        const x = rightCenterX - (aiAgentCount * 35) / 2 + i * 35;
        const y = aiAgentY + 30;

        // Agent (larger, quality representation)
        ctx.strokeStyle = green;
        ctx.lineWidth = 2;

        // Head
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Body
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x, y + 20);
        ctx.stroke();

        // AI enhancement indicator
        ctx.strokeStyle = green;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Larger athlete count
        ctx.fillStyle = green;
      ctx.font = `bold ${captionSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('20', x, y + 38);
      }

      // Agent count label
      ctx.fillStyle = green;
      ctx.font = `bold ${h1Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('5', rightCenterX, aiAgentY + 150);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('AGENTS + AI', rightCenterX, aiAgentY + 168);

      // Cost
      ctx.fillStyle = green;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.fillText('$1.75M/yr', rightCenterX, aiAgentY + 200);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('5 agents + AI platform', rightCenterX, aiAgentY + 218);

      // Quality meter (maintained)
      const aiMeterX = rightCenterX - meterWidth / 2;

      ctx.strokeStyle = green;
      ctx.lineWidth = 2;
      ctx.strokeRect(aiMeterX, meterY, meterWidth, meterHeight);

      // Fill 90% (quality maintained)
      ctx.fillStyle = 'rgba(0, 255, 148, 0.4)';
      ctx.fillRect(aiMeterX, meterY, meterWidth * 0.9, meterHeight);

      ctx.fillStyle = green;
      ctx.font = `${microSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('PERSONAL TOUCH', rightCenterX, meterY - 8);
      ctx.fillText('MAINTAINED', rightCenterX, meterY + meterHeight + 16);

      // Value extraction gaps (closed)
      ctx.fillStyle = gray;
      ctx.font = `${microSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('VALUE EXTRACTION GAPS', rightCenterX, gapY);
      ctx.fillText('(CLOSED)', rightCenterX, gapY + 14);

      const aiGaps = [
        { label: 'Content', value: '10%' },
        { label: 'Speed', value: '15%' },
        { label: 'Conversion', value: '12%' }
      ];

      aiGaps.forEach((gap, i) => {
        const y = gapY + 40 + i * 30;

        ctx.fillStyle = green;
      ctx.font = `bold ${h2Size}px monospace`;
        ctx.fillText(gap.value, rightCenterX, y);

      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText(gap.label + ' Lost', rightCenterX, y + 14);
      });

      // Divider line
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(dividerX, contentStartY - 10);
      ctx.lineTo(dividerX, height - 60);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bottom insight
      ctx.fillStyle = gold;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('AI SOLVES THE BOTTLENECKS—NOT BY HIRING MORE, BUT BY SCALING SMARTER', width / 2, height - 30);

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
    <div className="relative w-full h-full min-h-[700px] bg-black rounded-lg border border-[COLORS.brand.terminalGold]/20 overflow-hidden">
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
