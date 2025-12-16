'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * InvestmentMilestonesDiagram - Funding stages timeline
 *
 * Shows:
 * - Seed: $500K-1M (today) → MVP + 30 customers
 * - Series A: $3-5M (Month 18) → $1M ARR + product-market fit
 * - Series B: $10-15M (Year 3) → $5M ARR + market leader
 * - Animated "unlocking" of each gate with key metrics
 */
export default function InvestmentMilestonesDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    let animationFrame: number;
    let progress = 0;

    const stages = [
      {
        name: 'Seed',
        amount: '$500K-1M',
        timing: 'Today',
        status: 'Current Round',
        outcomes: ['MVP Launch', '30 Paying Customers', '$180K ARR', 'Product-Market Fit Signals'],
        color: CRE_COLORS.score.critical,
        delay: 0,
      },
      {
        name: 'Series A',
        amount: '$3-5M',
        timing: 'Month 18',
        status: 'Growth Capital',
        outcomes: ['150 Customers', '$1M ARR', 'Sales Team (5 reps)', 'Marketing Engine'],
        color: CRE_COLORS.primary,
        delay: 0.3,
      },
      {
        name: 'Series B',
        amount: '$10-15M',
        timing: 'Year 3',
        status: 'Scale Capital',
        outcomes: ['500 Customers', '$5M ARR', 'Market Leader Position', 'Enterprise Product'],
        color: CRE_COLORS.secondary,
        delay: 0.6,
      },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const padding = 80;
      const centerY = height / 2;
      const stageSpacing = (width - padding * 2) / (stages.length - 1);

      // Draw timeline
      const timelineOpacity = Math.min(progress * 2, 1);
      if (timelineOpacity > 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${timelineOpacity * 0.2})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(padding, centerY);
        ctx.lineTo(width - padding, centerY);
        ctx.stroke();

        // Draw arrow head
        ctx.fillStyle = `rgba(255, 255, 255, ${timelineOpacity * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(width - padding, centerY);
        ctx.lineTo(width - padding - 10, centerY - 6);
        ctx.lineTo(width - padding - 10, centerY + 6);
        ctx.closePath();
        ctx.fill();
      }

      // Draw stages
      stages.forEach((stage, index) => {
        const stageOpacity = Math.min(Math.max((progress - stage.delay) * 3, 0), 1);

        if (stageOpacity > 0) {
          const x = padding + index * stageSpacing;
          const nodeRadius = 25;

          // Stage node
          // Outer glow (pulsing)
          const pulseSize = nodeRadius + 5 + Math.sin(progress * 5 + index * 2) * 3;
          ctx.fillStyle = `${stage.color}40`;
          ctx.beginPath();
          ctx.arc(x, centerY, pulseSize, 0, Math.PI * 2);
          ctx.fill();

          // Main circle
          ctx.fillStyle = stage.color;
          ctx.beginPath();
          ctx.arc(x, centerY, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Inner circle (white)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(x, centerY, nodeRadius - 5, 0, Math.PI * 2);
          ctx.fill();

          // Stage number
          ctx.fillStyle = stage.color;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText((index + 1).toString(), x, centerY);

          // Stage name above
          ctx.fillStyle = `rgba(255, 255, 255, ${stageOpacity * CANVAS_TYPOGRAPHY.opacity.secondary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.fillText(stage.name, x, centerY - 60);

          // Amount
          ctx.fillStyle = stage.color;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingMd}px ${CANVAS_TYPOGRAPHY.fonts.data}`;
          ctx.fillText(stage.amount, x, centerY - 80);

          // Timing below
          ctx.fillStyle = `rgba(255, 255, 255, ${stageOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText(stage.timing, x, centerY + 50);

          // Status label
          ctx.fillStyle = stage.color;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText(stage.status, x, centerY + 68);

          // Outcomes (if fully visible)
          if (stageOpacity > 0.8) {
            const outcomeOpacity = (stageOpacity - 0.8) * 5;
            const outcomeX = x;
            const outcomeY = centerY + 95;

            // Outcome box background
            const boxWidth = 180;
            const boxHeight = stage.outcomes.length * 18 + 20;
            ctx.fillStyle = `rgba(30, 41, 59, ${outcomeOpacity * 0.8})`;
            ctx.strokeStyle = `${stage.color}${Math.floor(outcomeOpacity * 255)
              .toString(16)
              .padStart(2, '0')}`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(
              outcomeX - boxWidth / 2,
              outcomeY,
              boxWidth,
              boxHeight,
              8
            );
            ctx.fill();
            ctx.stroke();

            // Outcomes list
            ctx.fillStyle = `rgba(255, 255, 255, ${outcomeOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
            ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.textAlign = 'left';

            stage.outcomes.forEach((outcome, outcomeIndex) => {
              const textY = outcomeY + 18 + outcomeIndex * 18;

              // Checkmark
              ctx.fillStyle = `rgba(34, 197, 94, ${outcomeOpacity})`;
              ctx.beginPath();
              ctx.arc(outcomeX - boxWidth / 2 + 15, textY - 4, 3, 0, Math.PI * 2);
              ctx.fill();

              // Outcome text
              ctx.fillStyle = `rgba(255, 255, 255, ${outcomeOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
              ctx.fillText(outcome, outcomeX - boxWidth / 2 + 25, textY);
            });
          }

          // Connection lines between stages
          if (index < stages.length - 1 && stageOpacity > 0.5) {
            const nextX = padding + (index + 1) * stageSpacing;
            ctx.strokeStyle = `${stage.color}60`;
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 4]);
            ctx.beginPath();
            ctx.moveTo(x + nodeRadius, centerY);
            ctx.lineTo(nextX - nodeRadius, centerY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      });

      // Draw "Current Stage" marker on Seed (professional, no emoji)
      if (progress > 1) {
        const markerOpacity = Math.min((progress - 1) * 2, 1);
        const x = padding;
        const y = centerY - 110;

        // Professional badge
        ctx.fillStyle = `rgba(34, 197, 94, ${markerOpacity * 0.15})`;
        ctx.strokeStyle = `rgba(34, 197, 94, ${markerOpacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x - 50, y - CANVAS_SPACING.micro.md, 100, CANVAS_SPACING.padding.md, CANVAS_SPACING.radius.md);
        ctx.fill();
        ctx.stroke();

        // "Current Stage" text
        ctx.fillStyle = `rgba(34, 197, 94, ${markerOpacity})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Current Stage', x, y);
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('Funding Roadmap: Seed to Series B', width / 2, 35);
      }

      // Draw total capital raised projection
      if (progress > 1.2) {
        const totalOpacity = Math.min((progress - 1.2) * 2, 1);
        ctx.fillStyle = `rgba(139, 92, 246, ${totalOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.fillText(
          'Total Capital: $14-21M over 3 years',
          width / 2,
          height - 25
        );
      }

      // Animate
      if (progress < 1.5) {
        progress += 0.01;
        animationFrame = requestAnimationFrame(draw);
      }
    }

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '600px' }}
      />
    </div>
  );
}
