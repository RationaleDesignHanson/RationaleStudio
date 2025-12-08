'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * BrokerDayDiagram - Visual breakdown of a broker's 8-hour workday
 *
 * Shows:
 * - 40% wasted (red) - manual research, cold leads
 * - 35% meetings/calls (blue)
 * - 25% productive (green) - hot opportunities
 * - Animated clock ticking through segments
 */
export default function BrokerDayDiagram() {
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

    const segments = [
      {
        label: 'Wasted Time',
        sublabel: 'Manual research, cold leads',
        percentage: 40,
        hours: 3.2,
        color: CRE_COLORS.score.critical, // Red
        startAngle: 0,
      },
      {
        label: 'Meetings & Calls',
        sublabel: 'General activity',
        percentage: 35,
        hours: 2.8,
        color: CRE_COLORS.primary, // Sky blue
        startAngle: 0,
      },
      {
        label: 'Productive Time',
        sublabel: 'Hot opportunities',
        percentage: 25,
        hours: 2,
        color: CRE_COLORS.success, // Green
        startAngle: 0,
      },
    ];

    // Calculate start angles
    let cumulativeAngle = -Math.PI / 2; // Start at top
    segments.forEach((segment) => {
      segment.startAngle = cumulativeAngle;
      cumulativeAngle += (segment.percentage / 100) * Math.PI * 2;
    });

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.45; // Move up slightly to make room for legend
      const radius = Math.min(width, height) * 0.28;

      // Draw segments
      segments.forEach((segment, index) => {
        const endAngle = segment.startAngle + (segment.percentage / 100) * Math.PI * 2;
        const animatedEndAngle = segment.startAngle + (segment.percentage / 100) * Math.PI * 2 * Math.min(progress, 1);

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, segment.startAngle, animatedEndAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();

        // Draw segment border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw percentage label in segment (if progress is complete)
        if (progress >= 1) {
          const midAngle = segment.startAngle + (segment.percentage / 100) * Math.PI;
          const labelX = centerX + Math.cos(midAngle) * (radius * 0.65);
          const labelY = centerY + Math.sin(midAngle) * (radius * 0.65);

          ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.primary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${segment.percentage}%`, labelX, labelY);
        }
      });

      // Draw center circle (clock face)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw clock hands (animated)
      const clockProgress = progress * 0.4; // Clock shows 40% of day
      const handAngle = -Math.PI / 2 + clockProgress * Math.PI * 2;

      // Hour hand
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(handAngle) * (radius * 0.3),
        centerY + Math.sin(handAngle) * (radius * 0.3)
      );
      ctx.strokeStyle = CRE_COLORS.score.critical;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Clock center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();

      // Draw "8 Hours" text in center
      if (progress >= 1) {
        ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.secondary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.fillText('8 HOURS', centerX, centerY + CANVAS_SPACING.padding.md);
      }

      // Draw legend below chart
      const legendY = centerY + radius + 40;
      const legendSpacing = width / 3;

      segments.forEach((segment, index) => {
        const legendX = (width / 6) + (index * legendSpacing);

        // Color box
        ctx.fillStyle = segment.color;
        ctx.fillRect(legendX - CANVAS_SPACING.margin.xl, legendY - CANVAS_SPACING.micro.xs, CANVAS_SPACING.micro.md, CANVAS_SPACING.micro.md);

        // Label
        ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.secondary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'left';
        ctx.fillText(segment.label, legendX - CANVAS_SPACING.padding.md, legendY);

        // Sublabel
        ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.tertiary})`;
        ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.fillText(segment.sublabel, legendX - CANVAS_SPACING.padding.md, legendY + CANVAS_SPACING.micro.md);

        // Hours
        ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.secondary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.fillText(`${segment.hours}h`, legendX - CANVAS_SPACING.padding.md, legendY + CANVAS_SPACING.gap.normal);
      });

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText("A Broker's Day: 40% Wasted", width / 2, 32);
      }

      // Animate
      if (progress < 1.2) {
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
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '500px' }}
      />
    </div>
  );
}
