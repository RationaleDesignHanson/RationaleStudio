'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * CompetitiveLandscapeDiagram - 2x2 matrix showing competitive positioning
 *
 * Shows:
 * - X-axis: General → CRE-Specific
 * - Y-axis: Data Storage → Intelligence
 * - Four quadrants with competitors positioned
 * - CREaiT alone in top-right (Intelligence + CRE-Specific)
 * - Animated "gap" highlighting empty quadrant where CREaiT sits
 */
export default function CompetitiveLandscapeDiagram() {
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

    const competitors = [
      // Bottom-left: General + Data Storage (CRMs)
      {
        name: 'Salesforce',
        x: 0.25,
        y: 0.25,
        quadrant: 'CRMs',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.2,
      },
      {
        name: 'HubSpot',
        x: 0.3,
        y: 0.3,
        quadrant: 'CRMs',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.25,
      },
      // Bottom-right: CRE-Specific + Data Storage (Data Platforms)
      {
        name: 'CoStar',
        x: 0.75,
        y: 0.3,
        quadrant: 'Data',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.3,
      },
      {
        name: 'CompStak',
        x: 0.7,
        y: 0.25,
        quadrant: 'Data',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.35,
      },
      // Top-left: General + Intelligence (Generic AI)
      {
        name: 'ChatGPT',
        x: 0.25,
        y: 0.7,
        quadrant: 'AI',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.4,
      },
      {
        name: 'Claude',
        x: 0.3,
        y: 0.75,
        quadrant: 'AI',
        color: 'rgba(100, 116, 139, 0.8)',
        delay: 0.45,
      },
      // Top-right: CRE-Specific + Intelligence (CREaiT - ALONE!)
      {
        name: 'CREaiT',
        x: 0.75,
        y: 0.75,
        quadrant: 'Target',
        color: CRE_COLORS.primary,
        delay: 0.7,
        highlight: true,
      },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const padding = 100;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      const centerX = padding + chartWidth / 2;
      const centerY = padding + chartHeight / 2;

      // Draw axes (fade in)
      const axisOpacity = Math.min(progress * 3, 1);

      if (axisOpacity > 0) {
        // X-axis
        ctx.strokeStyle = `rgba(255, 255, 255, ${axisOpacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, centerY);
        ctx.lineTo(padding + chartWidth, centerY);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, padding);
        ctx.lineTo(centerX, padding + chartHeight);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = `rgba(255, 255, 255, ${axisOpacity * CANVAS_TYPOGRAPHY.opacity.secondary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';

        // X-axis labels
        ctx.fillText('General', padding + chartWidth * 0.25, padding + chartHeight + 40);
        ctx.fillText('CRE-Specific', padding + chartWidth * 0.75, padding + chartHeight + 40);

        // Y-axis labels (positioned at top and bottom of axis)
        ctx.save();
        ctx.translate(padding - 60, padding + 30);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Intelligence', 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(padding - 60, padding + chartHeight - 30);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Data Storage', 0, 0);
        ctx.restore();
      }

      // Draw quadrant backgrounds
      if (progress > 0.1) {
        const quadOpacity = Math.min((progress - 0.1) * 2, 1);

        // Highlight top-right quadrant (CREaiT's position)
        const highlightGradient = ctx.createRadialGradient(
          padding + chartWidth * 0.75,
          padding + chartHeight * 0.25,
          0,
          padding + chartWidth * 0.75,
          padding + chartHeight * 0.25,
          chartWidth * 0.3
        );
        highlightGradient.addColorStop(0, `rgba(14, 165, 233, ${quadOpacity * 0.15})`);
        highlightGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');

        ctx.fillStyle = highlightGradient;
        ctx.fillRect(centerX, padding, chartWidth / 2, chartHeight / 2);

        // Draw quadrant labels
        ctx.fillStyle = `rgba(255, 255, 255, ${quadOpacity * CANVAS_TYPOGRAPHY.opacity.muted})`;
        ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';

        ctx.fillText('Generic AI Tools', padding + chartWidth * 0.25, padding + chartHeight * 0.15);
        ctx.fillText('THE GAP', padding + chartWidth * 0.75, padding + chartHeight * 0.15);
        ctx.fillText('Traditional CRMs', padding + chartWidth * 0.25, padding + chartHeight * 0.85);
        ctx.fillText('CRE Data Platforms', padding + chartWidth * 0.75, padding + chartHeight * 0.85);
      }

      // Draw competitors
      competitors.forEach((competitor) => {
        const compOpacity = Math.min(Math.max((progress - competitor.delay) * 3, 0), 1);

        if (compOpacity > 0) {
          const x = padding + chartWidth * competitor.x;
          const y = padding + chartHeight * (1 - competitor.y); // Invert Y for canvas

          if (competitor.highlight) {
            // CREaiT - special styling
            const pulseScale = 1 + Math.sin(progress * 8) * 0.1;

            // Glow effect
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 40 * pulseScale);
            glowGradient.addColorStop(0, `rgba(14, 165, 233, ${compOpacity * 0.4})`);
            glowGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(x, y, 40 * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // Main bubble
            ctx.fillStyle = CRE_COLORS.primary;
            ctx.beginPath();
            ctx.arc(x, y, 28, 0, Math.PI * 2);
            ctx.fill();

            // Border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Label
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(competitor.name, x, y);

            // Professional badge label (replaces amateur pointer annotation)
            if (progress > 0.9) {
              const badgeOpacity = Math.min((progress - 0.9) * 5, 1);
              ctx.fillStyle = `rgba(14, 165, 233, ${badgeOpacity * 0.15})`;
              ctx.strokeStyle = CRE_COLORS.primary;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.roundRect(x - 60, y - 60, 120, CANVAS_SPACING.padding.md, CANVAS_SPACING.radius.md);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = CRE_COLORS.primary;
              ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('CRE + AI Advantage', x, y - 52);
            }
          } else {
            // Other competitors - muted styling
            ctx.fillStyle = competitor.color;
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = `rgba(255, 255, 255, ${compOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
            ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(competitor.name, x, y);
          }
        }
      });

      // Draw "Competitive Advantage" label
      if (progress > 1.1) {
        const labelOpacity = Math.min((progress - 1.1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${labelOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('Competitive Landscape', width / 2, 30);
      }

      // Animate
      if (progress < 1.5) {
        progress += 0.008;
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
