'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * TimingWindowDiagram - Calendar visualization showing missed opportunities
 *
 * Shows:
 * - 5 properties with lease expiries on timeline
 * - 3 contacted on time (green checkmarks)
 * - 2 missed (red X's with "Competitor got there first")
 * - Animated timeline showing progression
 */
export default function TimingWindowDiagram() {
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

    const properties = [
      {
        name: 'Gateway Tower',
        month: 'Jan',
        contacted: true,
        delay: 0,
      },
      {
        name: 'Harbor Plaza',
        month: 'Feb',
        contacted: false,
        delay: 0.2,
      },
      {
        name: 'Metro Center',
        month: 'Mar',
        contacted: true,
        delay: 0.4,
      },
      {
        name: 'Park Office',
        month: 'Apr',
        contacted: false,
        delay: 0.6,
      },
      {
        name: 'Tech Campus',
        month: 'May',
        contacted: true,
        delay: 0.8,
      },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const padding = 60;
      const timelineY = height / 2;
      const timelineStart = padding;
      const timelineEnd = width - padding;
      const timelineLength = timelineEnd - timelineStart;

      // Draw timeline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(timelineStart, timelineY);
      ctx.lineTo(timelineStart + timelineLength * Math.min(progress, 1), timelineY);
      ctx.stroke();

      // Draw current time indicator (animated)
      if (progress < 1) {
        const currentX = timelineStart + timelineLength * progress;
        ctx.fillStyle = CRE_COLORS.primary;
        ctx.beginPath();
        ctx.arc(currentX, timelineY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing glow
        ctx.fillStyle = `rgba(14, 165, 233, ${0.3 * (1 - (progress % 0.2) / 0.2)})`;
        ctx.beginPath();
        ctx.arc(currentX, timelineY, 12, 0, Math.PI * 2);
        ctx.fill();

        // "TODAY" label
        ctx.fillStyle = CRE_COLORS.primary;
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TODAY', currentX, timelineY - 20);
      }

      // Draw properties
      properties.forEach((property, index) => {
        const x = timelineStart + (index / (properties.length - 1)) * timelineLength;
        const shouldShow = progress >= property.delay;

        if (shouldShow) {
          // Draw vertical line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(x, timelineY - 80);
          ctx.lineTo(x, timelineY + 80);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw property card (above timeline)
          const cardY = timelineY - 60;
          const cardWidth = 110;
          const cardHeight = 50;

          // Card background
          ctx.fillStyle = property.contacted
            ? 'rgba(16, 185, 129, 0.1)' // Green tint for contacted
            : 'rgba(239, 68, 68, 0.1)'; // Red tint for missed
          ctx.strokeStyle = property.contacted
            ? CRE_COLORS.success
            : CRE_COLORS.score.critical;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x - cardWidth / 2, cardY - cardHeight / 2, cardWidth, cardHeight, 8);
          ctx.fill();
          ctx.stroke();

          // Property name
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(property.name, x, cardY - 10);

          // Month
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '10px Inter, sans-serif';
          ctx.fillText(`Expiry: ${property.month}`, x, cardY + 5);

          // Status icon (checkmark or X)
          if (property.contacted) {
            // Green checkmark
            ctx.strokeStyle = CRE_COLORS.success;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(x - 8, cardY + 15);
            ctx.lineTo(x - 3, cardY + 20);
            ctx.lineTo(x + 8, cardY + 8);
            ctx.stroke();
          } else {
            // Red X
            ctx.strokeStyle = CRE_COLORS.score.critical;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x - 6, cardY + 10);
            ctx.lineTo(x + 6, cardY + 22);
            ctx.moveTo(x + 6, cardY + 10);
            ctx.lineTo(x - 6, cardY + 22);
            ctx.stroke();
          }

          // Draw status label below timeline
          const labelY = timelineY + 50;
          ctx.fillStyle = property.contacted
            ? CRE_COLORS.success
            : CRE_COLORS.score.critical;
          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(
            property.contacted ? 'Contacted' : 'MISSED',
            x,
            labelY
          );

          if (!property.contacted) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText('Competitor got', x, labelY + 15);
            ctx.fillText('there first', x, labelY + 28);
          }
        }
      });

      // Draw summary stats at bottom
      if (progress >= 1) {
        const summaryY = height - 20;
        const contactedCount = properties.filter(p => p.contacted).length;
        const missedCount = properties.filter(p => !p.contacted).length;

        // Contacted stat
        ctx.fillStyle = CRE_COLORS.success;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${contactedCount} Contacted On Time`, padding, summaryY);

        // Missed stat
        ctx.fillStyle = CRE_COLORS.score.critical;
        ctx.textAlign = 'right';
        ctx.fillText(`${missedCount} Opportunities Lost`, width - padding, summaryY);
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * 0.8})`;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('The Cost of Missing Timing', width / 2, 30);
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
    <div className="relative w-full h-full min-h-[350px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
}
