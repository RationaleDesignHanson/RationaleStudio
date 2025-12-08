'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * TAMFunnelDiagram - Inverted pyramid showing market segmentation
 *
 * Shows:
 * - Top: $9B TAM (150K brokers) - widest
 * - Middle: $2.7B SAM (75K brokers at 5+ agent firms)
 * - Bottom: $90M SOM (3K customers, 5% market share)
 * - Animated zoom from top → bottom with percentage bars
 */
export default function TAMFunnelDiagram() {
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
        label: 'TAM',
        title: 'Total Addressable Market',
        value: '$9B',
        subtext: '150,000 commercial brokers nationwide',
        calculation: '$500/mo × 150K brokers × 12 months',
        color: CRE_COLORS.score.critical,
        widthPercent: 100,
        delay: 0,
      },
      {
        label: 'SAM',
        title: 'Serviceable Addressable Market',
        value: '$2.7B',
        subtext: '75,000 brokers at firms with 5+ agents',
        calculation: '50% of brokers at targetable firms',
        color: CRE_COLORS.score.high,
        widthPercent: 65,
        delay: 0.3,
      },
      {
        label: 'SOM',
        title: 'Serviceable Obtainable Market',
        value: '$90M',
        subtext: '3,000 customers (5% market share in 3 years)',
        calculation: '2% of SAM captured by Year 3',
        color: CRE_COLORS.score.medium,
        widthPercent: 30,
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
      const segmentHeight = (height - padding * 2) / segments.length;
      const maxWidth = width - padding * 2;

      segments.forEach((segment, index) => {
        const segmentOpacity = Math.min(Math.max((progress - segment.delay) * 3, 0), 1);

        if (segmentOpacity > 0) {
          const centerY = padding + index * segmentHeight + segmentHeight / 2;
          const segmentWidth = maxWidth * (segment.widthPercent / 100) * segmentOpacity;

          // Draw funnel segment (trapezoid)
          const topWidth = index === 0 ? segmentWidth : maxWidth * (segments[index - 1].widthPercent / 100);
          const bottomWidth = segmentWidth;

          const leftTop = (width - topWidth) / 2;
          const rightTop = (width + topWidth) / 2;
          const leftBottom = (width - bottomWidth) / 2;
          const rightBottom = (width + bottomWidth) / 2;

          const topY = centerY - segmentHeight / 2;
          const bottomY = centerY + segmentHeight / 2;

          // Draw gradient fill
          const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
          gradient.addColorStop(0, `${segment.color}40`); // 25% opacity
          gradient.addColorStop(1, `${segment.color}20`); // 12% opacity
          ctx.fillStyle = gradient;

          ctx.beginPath();
          ctx.moveTo(leftTop, topY);
          ctx.lineTo(rightTop, topY);
          ctx.lineTo(rightBottom, bottomY);
          ctx.lineTo(leftBottom, bottomY);
          ctx.closePath();
          ctx.fill();

          // Draw segment border
          ctx.strokeStyle = segment.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw label badge (left side)
          const badgeX = leftBottom - 50;
          const badgeY = centerY;

          ctx.fillStyle = segment.color;
          ctx.beginPath();
          ctx.roundRect(badgeX - 30, badgeY - 20, 60, 40, 6);
          ctx.fill();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(segment.label, badgeX, badgeY);

          // Draw segment content (center)
          const contentX = width / 2;

          // Title
          ctx.fillStyle = `rgba(255, 255, 255, ${segmentOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.fillText(segment.title.toUpperCase(), contentX, centerY - 35);

          // Value (big)
          ctx.fillStyle = segment.color;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.displayMd}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
          ctx.fillText(segment.value, contentX, centerY);

          // Subtext
          ctx.fillStyle = `rgba(255, 255, 255, ${segmentOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText(segment.subtext, contentX, centerY + 25);

          // Calculation (small)
          ctx.fillStyle = `rgba(255, 255, 255, ${segmentOpacity * CANVAS_TYPOGRAPHY.opacity.muted})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText(segment.calculation, contentX, centerY + 42);

          // Draw percentage indicator (right side)
          const percentX = rightBottom + 40;
          const percent = segment.widthPercent;

          ctx.fillStyle = `rgba(255, 255, 255, ${segmentOpacity * CANVAS_TYPOGRAPHY.opacity.muted})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'left';
          ctx.fillText(`${percent}%`, percentX, centerY - 5);

          ctx.fillStyle = `rgba(255, 255, 255, ${segmentOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText('of market', percentX, centerY + 10);
        }
      });

      // Draw connecting lines between segments
      if (progress > 0.9) {
        const lineOpacity = Math.min((progress - 0.9) * 5, 1);

        segments.forEach((segment, index) => {
          if (index < segments.length - 1) {
            const nextSegment = segments[index + 1];
            const y = padding + (index + 1) * segmentHeight;

            const currentWidth = maxWidth * (segment.widthPercent / 100);
            const nextWidth = maxWidth * (nextSegment.widthPercent / 100);

            const currentRight = (width + currentWidth) / 2;
            const nextRight = (width + nextWidth) / 2;

            // Vertical line showing funnel narrowing
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(currentRight, y - 5);
            ctx.lineTo(nextRight, y + 5);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // Draw title at top
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('Market Opportunity Funnel', width / 2, 30);
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
