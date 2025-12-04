/**
 * AmplifyAI Timing Diagram
 *
 * Timeline comparison showing viral moment → traditional workflow (2-3 weeks, faded opportunity)
 * vs AmplifyAI workflow (48-72 hrs, captured opportunity)
 * Demonstrates why speed = competitive advantage in cultural moment capture
 * Terminal Republic styling with animated timeline decay
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function AmplifyAITimingDiagram() {
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
    const fadedRed = 'rgba(239, 68, 68, 0.3)';

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

      const centerY = height / 2;
      const timelineStartX = 100;
      const timelineEndX = width - 100;
      const timelineWidth = timelineEndX - timelineStartX;

      // Title
      setTextStyle(ctx, 'h2', COLORS.brand.terminalGold, 'center');
      ctx.fillText('THE 48-72 HOUR WINDOW', width / 2, 35);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Cultural moments have extremely short half-lives', width / 2, 55);

      // Viral moment marker (Day 0)
      const viralMomentX = timelineStartX + timelineWidth * 0.15;

      ctx.fillStyle = COLORS.brand.terminalGold;
      ctx.shadowColor = COLORS.brand.terminalGold;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(viralMomentX, centerY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = getFont('body', 'bold');
      ctx.textAlign = 'center';
      ctx.fillText('VIRAL', viralMomentX, centerY - 35);
      ctx.fillText('MOMENT', viralMomentX, centerY - 20);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Day 0', viralMomentX, centerY + 40);

      // Traditional workflow path (TOP)
      const traditionalY = centerY - 120;

      ctx.strokeStyle = COLORS.semantic.error;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(viralMomentX, centerY);
      ctx.lineTo(viralMomentX, traditionalY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traditional timeline
      const tradStartX = viralMomentX;
      const tradEndX = timelineEndX - 50;

      // Draw fading engagement line
      const gradient = ctx.createLinearGradient(tradStartX, 0, tradEndX, 0);
      gradient.addColorStop(0, COLORS.semantic.error);
      gradient.addColorStop(0.3, fadedRed);
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.05)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tradStartX, traditionalY);
      ctx.lineTo(tradEndX, traditionalY);
      ctx.stroke();

      // Traditional milestones
      const tradMilestones = [
        { day: 3, label: 'Day 3: Notice\nmoment', x: tradStartX + (tradEndX - tradStartX) * 0.1 },
        { day: 7, label: 'Day 7: Brief\ncreative', x: tradStartX + (tradEndX - tradStartX) * 0.25 },
        { day: 14, label: 'Day 14:\nCreate', x: tradStartX + (tradEndX - tradStartX) * 0.5 },
        { day: 21, label: 'Day 21:\nLaunch', x: tradStartX + (tradEndX - tradStartX) * 0.75 }
      ];

      tradMilestones.forEach((milestone, i) => {
        const opacity = Math.max(0.2, 1 - (i * 0.25));
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.beginPath();
        ctx.arc(milestone.x, traditionalY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = getFont('micro'); // Upgraded from 10px to TYPE.micro (11px minimum)
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.textAlign = 'center';
        const lines = milestone.label.split('\n');
        lines.forEach((line, lineIndex) => {
          ctx.fillText(line, milestone.x, traditionalY - 20 - (lines.length - 1 - lineIndex) * 12);
        });
      });

      // "MOMENT DEAD" label
      ctx.font = getFont('body', 'bold');
      ctx.fillStyle = fadedRed;
      ctx.textAlign = 'right';
      ctx.fillText('MOMENT DEAD', tradEndX, traditionalY - 40);
      ctx.fillText('70% MISSED', tradEndX, traditionalY - 25);

      // Traditional label (left side)
      ctx.font = getFont('caption', 'bold');
      ctx.fillStyle = COLORS.semantic.error;
      ctx.textAlign = 'right';
      ctx.fillText('TRADITIONAL:', tradStartX - 20, traditionalY + 5);
      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('2-3 weeks', tradStartX - 20, traditionalY + 20);

      // AmplifyAI workflow path (BOTTOM)
      const aiY = centerY + 120;

      ctx.strokeStyle = COLORS.brand.green;
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(viralMomentX, centerY);
      ctx.lineTo(viralMomentX, aiY);
      ctx.stroke();
      ctx.setLineDash([]);

      // AmplifyAI timeline (much shorter)
      const aiStartX = viralMomentX;
      const aiEndX = viralMomentX + (tradEndX - tradStartX) * 0.35;

      ctx.strokeStyle = COLORS.brand.green;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.shadowColor = COLORS.brand.green;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(aiStartX, aiY);
      ctx.lineTo(aiEndX, aiY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // AmplifyAI milestones
      const aiMilestones = [
        { hour: 12, label: '12hrs: AI\ndetects', x: aiStartX + (aiEndX - aiStartX) * 0.15 },
        { hour: 24, label: '24hrs:\nGenerate', x: aiStartX + (aiEndX - aiStartX) * 0.4 },
        { hour: 48, label: '48hrs:\nLIVE', x: aiStartX + (aiEndX - aiStartX) * 0.8 }
      ];

      aiMilestones.forEach(milestone => {
        ctx.fillStyle = COLORS.brand.green;
        ctx.shadowColor = COLORS.brand.green;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(milestone.x, aiY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = getFont('micro'); // Upgraded from 10px to TYPE.micro (11px minimum)
        ctx.fillStyle = COLORS.brand.green;
        ctx.textAlign = 'center';
        const lines = milestone.label.split('\n');
        lines.forEach((line, lineIndex) => {
          ctx.fillText(line, milestone.x, aiY + 20 + lineIndex * 12);
        });
      });

      // "MOMENT CAPTURED" label
      ctx.font = getFont('body', 'bold');
      ctx.fillStyle = COLORS.brand.green;
      ctx.textAlign = 'left';
      ctx.fillText('MOMENT CAPTURED', aiEndX + 10, aiY - 10);
      ctx.fillText('90% SUCCESS', aiEndX + 10, aiY + 5);

      // AmplifyAI label (left side)
      ctx.font = getFont('caption', 'bold');
      ctx.fillStyle = COLORS.brand.green;
      ctx.textAlign = 'right';
      ctx.fillText('AMPLIFY AI:', aiStartX - 20, aiY + 5);
      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('48-72 hours', aiStartX - 20, aiY + 20);

      // Bottom insight
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('SPEED IS THE COMPETITIVE ADVANTAGE', width / 2, height - 25);

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
