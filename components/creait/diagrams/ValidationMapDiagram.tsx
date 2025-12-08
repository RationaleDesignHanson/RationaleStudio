'use client';

import { useEffect, useRef, useState } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * ValidationMapDiagram - US map showing 25 customer interview locations
 *
 * Shows:
 * - Simplified US map outline
 * - 25 pins across major CRE markets (SF Bay, LA, NYC, Chicago, Miami, etc.)
 * - Animated glow/pulse on each pin
 * - Geographic breadth of validation
 */
export default function ValidationMapDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

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

    // Interview locations (normalized coordinates 0-1)
    const interviews = [
      // SF Bay Area (5 interviews)
      { x: 0.12, y: 0.45, city: 'San Francisco', firm: 'CBRE' },
      { x: 0.13, y: 0.48, city: 'Oakland', firm: 'Cushman & Wakefield' },
      { x: 0.11, y: 0.52, city: 'San Jose', firm: 'JLL' },
      { x: 0.14, y: 0.46, city: 'Berkeley', firm: 'Marcus & Millichap' },
      { x: 0.10, y: 0.50, city: 'Palo Alto', firm: 'Colliers' },

      // LA Area (4 interviews)
      { x: 0.15, y: 0.62, city: 'Los Angeles', firm: 'Newmark' },
      { x: 0.16, y: 0.64, city: 'Santa Monica', firm: 'Kidder Mathews' },
      { x: 0.17, y: 0.63, city: 'Irvine', firm: 'Lee & Associates' },
      { x: 0.14, y: 0.65, city: 'Pasadena', firm: 'Avison Young' },

      // NYC Area (5 interviews)
      { x: 0.82, y: 0.38, city: 'New York', firm: 'CBRE' },
      { x: 0.81, y: 0.40, city: 'Brooklyn', firm: 'JLL' },
      { x: 0.83, y: 0.37, city: 'Manhattan', firm: 'Cushman & Wakefield' },
      { x: 0.80, y: 0.41, city: 'Jersey City', firm: 'Newmark' },
      { x: 0.84, y: 0.39, city: 'Queens', firm: 'Marcus & Millichap' },

      // Chicago (3 interviews)
      { x: 0.60, y: 0.42, city: 'Chicago', firm: 'JLL' },
      { x: 0.59, y: 0.43, city: 'Oak Brook', firm: 'Colliers' },
      { x: 0.61, y: 0.41, city: 'Naperville', firm: 'CBRE' },

      // Miami (2 interviews)
      { x: 0.78, y: 0.80, city: 'Miami', firm: 'Cushman & Wakefield' },
      { x: 0.77, y: 0.82, city: 'Fort Lauderdale', firm: 'Avison Young' },

      // Dallas (2 interviews)
      { x: 0.50, y: 0.68, city: 'Dallas', firm: 'CBRE' },
      { x: 0.49, y: 0.70, city: 'Plano', firm: 'JLL' },

      // Seattle (2 interviews)
      { x: 0.16, y: 0.28, city: 'Seattle', firm: 'Kidder Mathews' },
      { x: 0.17, y: 0.30, city: 'Bellevue', firm: 'Colliers' },

      // Denver (1 interview)
      { x: 0.38, y: 0.48, city: 'Denver', firm: 'Newmark' },

      // Phoenix (1 interview)
      { x: 0.28, y: 0.64, city: 'Phoenix', firm: 'Lee & Associates' },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const mapPadding = 80;
      const mapWidth = width - mapPadding * 2;
      const mapHeight = height - mapPadding * 2;

      // Draw simplified US map outline
      const mapOpacity = Math.min(progress * 2, 1);
      if (mapOpacity > 0) {
        ctx.strokeStyle = `rgba(100, 116, 139, ${mapOpacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        // Simplified rectangular US outline
        ctx.rect(mapPadding, mapPadding, mapWidth, mapHeight);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw state dividers (simplified grid)
        ctx.strokeStyle = `rgba(100, 116, 139, ${mapOpacity * 0.1})`;
        ctx.lineWidth = 1;
        // Vertical lines
        for (let i = 1; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(mapPadding + (mapWidth / 4) * i, mapPadding);
          ctx.lineTo(mapPadding + (mapWidth / 4) * i, mapPadding + mapHeight);
          ctx.stroke();
        }
        // Horizontal lines
        for (let i = 1; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(mapPadding, mapPadding + (mapHeight / 3) * i);
          ctx.lineTo(mapPadding + mapWidth, mapPadding + (mapHeight / 3) * i);
          ctx.stroke();
        }
      }

      // Draw interview pins
      interviews.forEach((interview, index) => {
        const pinDelay = 0.2 + index * 0.03;
        const pinOpacity = Math.min(Math.max((progress - pinDelay) * 3, 0), 1);

        if (pinOpacity > 0) {
          const x = mapPadding + interview.x * mapWidth;
          const y = mapPadding + interview.y * mapHeight;

          // Pulsing glow
          const pulseSize = 15 + Math.sin(progress * 8 + index) * 3;
          ctx.fillStyle = `rgba(14, 165, 233, ${pinOpacity * 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fill();

          // Pin outer circle
          ctx.fillStyle = CRE_COLORS.primary;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();

          // Pin inner dot
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Draw tooltip on hover
          if (hoveredPin === index) {
            const tooltipWidth = 160;
            const tooltipHeight = 60;
            const tooltipX = x + 15;
            const tooltipY = y - tooltipHeight / 2;

            // Tooltip background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
            ctx.strokeStyle = CRE_COLORS.primary;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
            ctx.fill();
            ctx.stroke();

            // Tooltip text
            ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.secondary})`;
            ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.textAlign = 'left';
            ctx.fillText(interview.city, tooltipX + 10, tooltipY + 20);

            ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.tertiary})`;
            ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.fillText(interview.firm, tooltipX + 10, tooltipY + 38);
          }
        }
      });

      // Draw market labels
      if (progress > 1) {
        const labelOpacity = Math.min((progress - 1) * 2, 1);
        const markets = [
          { label: 'SF Bay\n5 interviews', x: 0.12, y: 0.40 },
          { label: 'LA\n4 interviews', x: 0.15, y: 0.70 },
          { label: 'NYC\n5 interviews', x: 0.82, y: 0.32 },
          { label: 'Chicago\n3 interviews', x: 0.60, y: 0.36 },
          { label: 'Miami\n2 interviews', x: 0.78, y: 0.75 },
        ];

        markets.forEach((market) => {
          const x = mapPadding + market.x * mapWidth;
          const y = mapPadding + market.y * mapHeight;

          ctx.fillStyle = `rgba(255, 255, 255, ${labelOpacity * CANVAS_TYPOGRAPHY.opacity.secondary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';

          const lines = market.label.split('\n');
          lines.forEach((line, i) => {
            ctx.fillText(line, x, y + i * 16);
          });
        });
      }

      // Draw stats at bottom
      if (progress > 1.2) {
        const statsOpacity = Math.min((progress - 1.2) * 2, 1);
        const statsY = height - 30;

        // Total interviews
        ctx.fillStyle = `rgba(14, 165, 233, ${statsOpacity})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'left';
        ctx.fillText('25 Interviews', mapPadding, statsY);

        // Markets
        ctx.fillStyle = `rgba(139, 92, 246, ${statsOpacity})`;
        ctx.textAlign = 'center';
        ctx.fillText('8 Major Markets', width / 2, statsY);

        // Firms
        ctx.fillStyle = `rgba(6, 182, 212, ${statsOpacity})`;
        ctx.textAlign = 'right';
        ctx.fillText('12 Brokerage Firms', width - mapPadding, statsY);
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('Geographic Validation', width / 2, 32);
      }

      // Animate
      if (progress < 1.5) {
        progress += 0.01;
        animationFrame = requestAnimationFrame(draw);
      }
    }

    draw();

    // Handle mouse movement for tooltips
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const mapPadding = 80;
      const mapWidth = canvas.offsetWidth - mapPadding * 2;
      const mapHeight = canvas.offsetHeight - mapPadding * 2;

      let found = false;
      interviews.forEach((interview, index) => {
        const x = mapPadding + interview.x * mapWidth;
        const y = mapPadding + interview.y * mapHeight;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

        if (distance < 10) {
          setHoveredPin(index);
          found = true;
        }
      });

      if (!found) {
        setHoveredPin(null);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredPin]);

  return (
    <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ maxHeight: '550px' }}
      />
    </div>
  );
}
