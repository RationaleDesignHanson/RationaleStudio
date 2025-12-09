/**
 * AmplifyAI Process Diagram
 *
 * 4-step process flow showing: Detect viral moment → Generate content variations →
 * Agent review → Multi-platform execution
 * Shows timing annotations (1-12hrs, 13-24hrs, 25-48hrs) and emphasizes agent control
 * Terminal Republic styling with animated flow particles
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

interface ProcessStep {
  id: string;
  label: string;
  sublabel: string;
  timing: string;
  color: string;
  icon: string;
}

export default function AmplifyAIProcessDiagram() {
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
    const steps: ProcessStep[] = [
      {
        id: 'detect',
        label: 'DETECT',
        sublabel: 'Viral moment',
        timing: '1-12hrs',
        color: COLORS.brand.green,
        icon: '⚡'
      },
      {
        id: 'generate',
        label: 'GENERATE',
        sublabel: 'Content variations',
        timing: '13-24hrs',
        color: COLORS.brand.cyan,
        icon: '∞'
      },
      {
        id: 'review',
        label: 'REVIEW',
        sublabel: 'Agent approval',
        timing: '25-36hrs',
        color: COLORS.brand.purple,
        icon: '✓'
      },
      {
        id: 'execute',
        label: 'EXECUTE',
        sublabel: 'Multi-platform',
        timing: '37-48hrs',
        color: COLORS.brand.pink,
        icon: '→'
      }
    ];

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
      const stepSpacing = (width - 200) / (steps.length - 1);
      const startX = 100;

      // Title
      setTextStyle(ctx, 'h2', COLORS.brand.terminalGold, 'center');
      ctx.fillText('48-72 HOUR EXECUTION WORKFLOW', width / 2, 40);

      ctx.font = getFont('micro'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('AI detects moments, generates content, agent reviews, then deploys', width / 2, 60);

      // Draw connections between steps
      steps.forEach((step, i) => {
        if (i < steps.length - 1) {
          const x1 = startX + i * stepSpacing;
          const x2 = startX + (i + 1) * stepSpacing;

          // Connection line with gradient
          const gradient = ctx.createLinearGradient(x1, centerY, x2, centerY);
          gradient.addColorStop(0, `${step.color}80`);
          gradient.addColorStop(1, `${steps[i + 1].color}80`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1 + 50, centerY);
          ctx.lineTo(x2 - 50, centerY);
          ctx.stroke();

          // Arrow
          ctx.strokeStyle = `${steps[i + 1].color}60`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x2 - 55, centerY - 8);
          ctx.lineTo(x2 - 50, centerY);
          ctx.lineTo(x2 - 55, centerY + 8);
          ctx.stroke();
        }
      });

      // Draw steps
      steps.forEach((step, i) => {
        const x = startX + i * stepSpacing;
        const boxSize = 90;

        // Step box with static glow
        const glowGradient = ctx.createRadialGradient(x, centerY, 0, x, centerY, boxSize * 0.8);
        glowGradient.addColorStop(0, `${step.color}30`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, centerY, boxSize * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Step box
        ctx.fillStyle = '#0a0a0a';
        ctx.beginPath();
        ctx.arc(x, centerY, boxSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = step.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = step.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Icon
        ctx.fillStyle = step.color;
      ctx.font = `bold ${h1Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(step.icon, x, centerY - 5);

        // Step number
        ctx.fillStyle = `${step.color}80`;
        ctx.font = getFont('caption', 'bold');
        ctx.fillText(`${i + 1}`, x, centerY - boxSize / 2 - 20);

        // Step label
        ctx.fillStyle = step.color;
        ctx.font = getFont('body', 'bold');
        ctx.fillText(step.label, x, centerY + boxSize / 2 + 25);

        // Sublabel
        ctx.font = getFont('micro'); // Upgraded from 10px to TYPE.micro (11px minimum)
        ctx.fillStyle = COLORS.mono.gray70;
        ctx.fillText(step.sublabel, x, centerY + boxSize / 2 + 40);

        // Timing
        ctx.fillStyle = step.color;
        ctx.font = getFont('micro', 'bold'); // Upgraded from 11px to TYPE.micro (11px minimum)
        ctx.fillText(step.timing, x, centerY + boxSize / 2 + 55);
      });

      // Agent control callout
      const reviewStepX = startX + 2 * stepSpacing;
      const calloutY = centerY + 140;

      ctx.strokeStyle = COLORS.brand.purple;
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(reviewStepX, centerY + 45);
      ctx.lineTo(reviewStepX, calloutY - 25);
      ctx.stroke();
      ctx.setLineDash([]);

      // Callout box
      const calloutWidth = 250;
      const calloutHeight = 50;
      const calloutX = reviewStepX - calloutWidth / 2;

      ctx.fillStyle = `${COLORS.brand.purple}20`;
      ctx.strokeStyle = `${COLORS.brand.purple}60`;
      ctx.lineWidth = 2;
      ctx.fillRect(calloutX, calloutY, calloutWidth, calloutHeight);
      ctx.strokeRect(calloutX, calloutY, calloutWidth, calloutHeight);

      ctx.fillStyle = COLORS.brand.purple;
      ctx.font = getFont('micro', 'bold'); // Upgraded from 11px to TYPE.micro (11px minimum)
      ctx.textAlign = 'center';
      ctx.fillText('AGENT MAINTAINS CONTROL', reviewStepX, calloutY + 20);

      ctx.font = getFont('micro'); // Upgraded from 10px to TYPE.micro (11px minimum)
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('Review, edit, or reject before posting', reviewStepX, calloutY + 35);

      // Bottom insight
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('BRAND-SAFE • FAST • SCALABLE', width / 2, height - 25);

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
