/**
 * NIL Platform Flow Diagram
 *
 * Left-to-right horizontal flow: Deal upload → AI analysis → Red flag detection →
 * Family-friendly report → Optional legal review
 * Shows checkpoints and gates to emphasize trust-building process
 * Terminal Republic styling with improved legibility (14px+ text)
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

interface FlowStep {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  checkpoint?: string;
}

export default function NILPlatformFlowDiagram() {
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
    const orange = COLORS.brand.orange;
    const cyan = COLORS.brand.cyan;
    const red = COLORS.semantic.error;
    const green = COLORS.brand.green;
    const purple = COLORS.brand.purple;
    const gray = COLORS.mono.gray70;

    const steps: FlowStep[] = [
      {
        id: 'upload',
        label: 'UPLOAD',
        sublabel: 'Contract / Term Sheet',
        color: orange,
        icon: '📄'
      },
      {
        id: 'analyze',
        label: 'AI ANALYSIS',
        sublabel: '5,000+ deals trained',
        color: cyan,
        icon: '🔍',
        checkpoint: 'Pattern match'
      },
      {
        id: 'detect',
        label: 'RED FLAGS',
        sublabel: 'Unusual clauses',
        color: red,
        icon: '⚠',
        checkpoint: 'Risk assess'
      },
      {
        id: 'report',
        label: 'FAMILY REPORT',
        sublabel: 'Plain language',
        color: green,
        icon: '✓',
        checkpoint: 'Comprehension'
      },
      {
        id: 'legal',
        label: 'LEGAL REVIEW',
        sublabel: 'Optional',
        color: purple,
        icon: '⚖',
        checkpoint: 'Validation'
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

      // Title
      ctx.fillStyle = gold;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('TRUST-BUILDING WORKFLOW', width / 2, 40);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Multi-checkpoint process ensures athlete and family confidence', width / 2, 62);

      // Calculate horizontal flow layout
      const boxWidth = 200; // Increased from 180 to fit text better
      const boxHeight = 120; // Reduced from 140 for more compact layout
      const boxGap = getResponsiveSpacing(25, isMobile); // Reduced from 30
      const totalWidth = (boxWidth * 5) + (boxGap * 4);
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2 + 10; // Shifted up from +20

      // Draw steps and connections
      steps.forEach((step, i) => {
        const x = startX + (i * (boxWidth + boxGap));
        const y = centerY - boxHeight / 2;

        // Draw connecting arrow (if not last step)
        if (i < steps.length - 1) {
          const fromX = x + boxWidth;
          const toX = startX + ((i + 1) * (boxWidth + boxGap));
          const arrowY = centerY;

          const nextStep = steps[i + 1];

          // Arrow gradient
          const gradient = ctx.createLinearGradient(fromX, arrowY, toX, arrowY);
          gradient.addColorStop(0, `${step.color}70`);
          gradient.addColorStop(1, `${nextStep.color}70`);

          // Arrow line
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(fromX + 5, arrowY);
          ctx.lineTo(toX - 5, arrowY);
          ctx.stroke();

          // Arrow head
          ctx.fillStyle = nextStep.color;
          ctx.beginPath();
          ctx.moveTo(toX - 5, arrowY);
          ctx.lineTo(toX - 15, arrowY - 6);
          ctx.lineTo(toX - 15, arrowY + 6);
          ctx.closePath();
          ctx.fill();

          // Checkpoint indicator (if exists)
          if (step.checkpoint) {
            const checkX = fromX + (toX - fromX) / 2;
            const checkY = arrowY - 55; // Moved higher from -35

            // Checkpoint badge
            ctx.fillStyle = step.color;
            ctx.shadowColor = step.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(checkX, checkY, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#000';
      ctx.font = `bold ${captionSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✓', checkX, checkY);

            // Checkpoint label
      ctx.font = `${microSize}px monospace`;
            ctx.fillStyle = step.color;
            ctx.textAlign = 'center';
            ctx.fillText(step.checkpoint.toUpperCase(), checkX, checkY + 25);
          }
        }

        // Step box
        // Box background with subtle tint
        ctx.fillStyle = `${step.color}14`;
        ctx.fillRect(x, y, boxWidth, boxHeight);

        // Box border
        ctx.strokeStyle = `${step.color}80`;
        ctx.lineWidth = 3;
        ctx.shadowColor = step.color;
        ctx.shadowBlur = 12;
        ctx.strokeRect(x, y, boxWidth, boxHeight);
        ctx.shadowBlur = 0;

        // Step number badge (top-left corner)
        const badgeSize = 30;
        ctx.fillStyle = step.color;
        ctx.fillRect(x, y, badgeSize, badgeSize);

        ctx.fillStyle = '#000';
      ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i + 1), x + badgeSize / 2, y + badgeSize / 2);

        // Icon
        ctx.fillStyle = step.color;
      ctx.font = `bold ${h1Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(step.icon, x + boxWidth / 2, y + 45);

        // Step label
        ctx.fillStyle = step.color;
      ctx.font = `bold ${bodySize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Handle multi-line labels
        const labelWords = step.label.split(' ');
        let labelEndY = y + 75;
        if (labelWords.length > 1) {
          labelWords.forEach((word, wordIndex) => {
            ctx.fillText(word, x + boxWidth / 2, y + 75 + (wordIndex * 16));
          });
          labelEndY = y + 75 + ((labelWords.length - 1) * 16);
        } else {
          ctx.fillText(step.label, x + boxWidth / 2, y + 75);
        }

        // Sublabel - positioned below label with proper spacing
      ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.textAlign = 'center';

        const sublabelStartY = labelEndY + 18; // Tighter spacing

        // Handle multi-line sublabels
        const sublabelParts = step.sublabel.split(' / ');
        if (sublabelParts.length > 1) {
          sublabelParts.forEach((part, partIndex) => {
            ctx.fillText(part, x + boxWidth / 2, sublabelStartY + (partIndex * 12));
          });
        } else {
          ctx.fillText(step.sublabel, x + boxWidth / 2, sublabelStartY);
        }
      });

      // Trust indicator (bottom center)
      const trustBoxWidth = 300;
      const trustBoxHeight = 60;
      const trustX = width / 2 - trustBoxWidth / 2;
      const trustY = height - 100;

      ctx.fillStyle = `${green}14`;
      ctx.fillRect(trustX, trustY, trustBoxWidth, trustBoxHeight);

      ctx.strokeStyle = `${green}60`;
      ctx.lineWidth = 2;
      ctx.strokeRect(trustX, trustY, trustBoxWidth, trustBoxHeight);

      ctx.fillStyle = green;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('TRUST INDICATORS', width / 2, trustY + 20);

      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('95%+ accuracy  •  Plain language  •  Family-friendly', width / 2, trustY + 40);

      // Bottom insight
      ctx.fillStyle = gold;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('YOU BECOME THE TRUSTED ADVISOR', width / 2, height - 20);

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
    <div className="relative w-full h-full min-h-[600px] bg-black rounded-lg border border-yellow-400/20 overflow-hidden">
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
