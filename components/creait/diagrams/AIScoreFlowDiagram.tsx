'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * AIScoreFlowDiagram - Data flow visualization showing AI scoring process
 *
 * Shows:
 * - Left: Multiple data sources (property records, financing, market data)
 * - Middle: AI brain processing (animated neural network)
 * - Right: Scored list (92, 85, 78... descending)
 * - Animated particles flowing left → right
 */
export default function AIScoreFlowDiagram() {
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

    // Particle system for data flow
    const particles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      color: string;
      size: number;
    }> = [];

    function createParticle(sourceIndex: number) {
      const sourceY = height * 0.2 + sourceIndex * (height * 0.2);
      const targetY = height * 0.3 + Math.random() * (height * 0.4);

      particles.push({
        x: width * 0.15,
        y: sourceY,
        targetX: width * 0.45,
        targetY: targetY,
        speed: 0.015 + Math.random() * 0.01,
        color: CRE_COLORS.primary,
        size: 3 + Math.random() * 2,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear with fade effect for particle trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // === LEFT: DATA SOURCES ===
      const sources = [
        { type: 'database', label: 'Property Records', color: CRE_COLORS.primary },
        { type: 'finance', label: 'Financing Data', color: CRE_COLORS.secondary },
        { type: 'chart', label: 'Market Trends', color: CRE_COLORS.accent },
      ];

      sources.forEach((source, index) => {
        const x = width * 0.1;
        const y = height * 0.2 + index * (height * 0.3);
        const opacity = Math.min(progress * 2, 1);

        // Source card
        ctx.fillStyle = `rgba(30, 41, 59, ${opacity})`;
        ctx.strokeStyle = source.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x - CANVAS_SPACING.margin.xxl, y - CANVAS_SPACING.padding.md, 120, CANVAS_SPACING.margin.xl, 8);
        ctx.fill();
        ctx.stroke();

        // Geometric icon (professional, no emojis)
        ctx.fillStyle = source.color;
        ctx.strokeStyle = source.color;
        if (source.type === 'database') {
          // Database cylinder icon
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(x, y - 10, 10, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.rect(x - 10, y - 10, 20, 16);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(x, y + 6, 10, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (source.type === 'finance') {
          // Dollar sign in circle
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.font = `bold 16px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillStyle = source.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', x, y);
        } else if (source.type === 'chart') {
          // Trend line chart icon
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - 10, y + 6);
          ctx.lineTo(x - 4, y - 2);
          ctx.lineTo(x + 2, y + 2);
          ctx.lineTo(x + 10, y - 8);
          ctx.stroke();
          // Add dots
          ctx.fillStyle = source.color;
          [{ x: x - 10, y: y + 6 }, { x: x - 4, y: y - 2 }, { x: x + 2, y: y + 2 }, { x: x + 10, y: y - 8 }].forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Label
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * CANVAS_TYPOGRAPHY.opacity.secondary})`;
        ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.fillText(source.label, x, y + CANVAS_SPACING.padding.md);

        // Create particles occasionally
        if (progress > 0.2 && Math.random() < 0.03) {
          createParticle(index);
        }
      });

      // === MIDDLE: AI BRAIN ===
      const brainX = width * 0.5;
      const brainY = height * 0.5;
      const brainRadius = Math.min(width, height) * 0.12;
      const brainOpacity = Math.min((progress - 0.2) * 2, 1);

      if (brainOpacity > 0) {
        // Brain outline with pulse
        const pulseScale = 1 + Math.sin(progress * 10) * 0.05;
        ctx.strokeStyle = CRE_COLORS.secondary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(brainX, brainY, brainRadius * pulseScale, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(brainX, brainY, 0, brainX, brainY, brainRadius);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${brainOpacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(brainX, brainY, brainRadius, 0, Math.PI * 2);
        ctx.fill();

        // AI icon (geometric neural network representation)
        ctx.fillStyle = CRE_COLORS.secondary;
        // Central node
        ctx.beginPath();
        ctx.arc(brainX, brainY, 8, 0, Math.PI * 2);
        ctx.fill();
        // Four connected nodes in + pattern
        const aiNodeSize = 5;
        const aiNodeDist = 20;
        [
          { x: brainX, y: brainY - aiNodeDist },
          { x: brainX + aiNodeDist, y: brainY },
          { x: brainX, y: brainY + aiNodeDist },
          { x: brainX - aiNodeDist, y: brainY },
        ].forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, aiNodeSize, 0, Math.PI * 2);
          ctx.fill();
          // Connection line
          ctx.strokeStyle = CRE_COLORS.secondary;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(brainX, brainY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        });

        // "AI Scoring Engine" label
        ctx.fillStyle = `rgba(139, 92, 246, ${brainOpacity})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.fillText('AI Scoring Engine', brainX, brainY + brainRadius + CANVAS_SPACING.padding.md);

        // Neural network lines (animated)
        const neuronCount = 8;
        for (let i = 0; i < neuronCount; i++) {
          const angle = (i / neuronCount) * Math.PI * 2 + progress;
          const nx = brainX + Math.cos(angle) * brainRadius * 0.6;
          const ny = brainY + Math.sin(angle) * brainRadius * 0.6;

          ctx.fillStyle = `rgba(139, 92, 246, ${brainOpacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(nx, ny, 3, 0, Math.PI * 2);
          ctx.fill();

          // Connect to center
          ctx.strokeStyle = `rgba(139, 92, 246, ${brainOpacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(brainX, brainY);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
      }

      // === RIGHT: SCORED OPPORTUNITIES ===
      const opportunities = [
        { name: 'Gateway Tower', score: 92, color: CRE_COLORS.score.critical },
        { name: 'Harbor Plaza', score: 85, color: CRE_COLORS.score.high },
        { name: 'Metro Center', score: 78, color: CRE_COLORS.score.high },
        { name: 'Park Office', score: 65, color: CRE_COLORS.score.high },
        { name: 'Tech Campus', score: 52, color: CRE_COLORS.score.medium },
      ];

      opportunities.forEach((opp, index) => {
        const x = width * 0.85;
        const y = height * 0.15 + index * (height * 0.16);
        const delay = 0.5 + index * 0.1;
        const oppOpacity = Math.min(Math.max((progress - delay) * 3, 0), 1);

        if (oppOpacity > 0) {
          // Opportunity card
          ctx.fillStyle = `rgba(30, 41, 59, ${oppOpacity})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${oppOpacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x - 72, y - CANVAS_SPACING.micro.md, 144, CANVAS_SPACING.margin.lg, 6);
          ctx.fill();
          ctx.stroke();

          // Score badge
          const scoreSize = 32;
          ctx.fillStyle = opp.color;
          ctx.beginPath();
          ctx.roundRect(x - CANVAS_SPACING.margin.xxl, y - CANVAS_SPACING.micro.sm, scoreSize, scoreSize, 4);
          ctx.fill();

          // Score number
          ctx.fillStyle = `rgba(255, 255, 255, ${CANVAS_TYPOGRAPHY.opacity.primary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.dataSm}px ${CANVAS_TYPOGRAPHY.fonts.data}`;
          ctx.textAlign = 'center';
          ctx.fillText(opp.score.toString(), x - 44, y + 4);

          // Property name
          ctx.fillStyle = `rgba(255, 255, 255, ${oppOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'left';
          ctx.fillText(opp.name, x - CANVAS_SPACING.micro.md, y + 4);

          // Rank indicator
          ctx.fillStyle = `rgba(255, 255, 255, ${oppOpacity * CANVAS_TYPOGRAPHY.opacity.muted})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'right';
          ctx.fillText(`#${index + 1}`, x + CANVAS_SPACING.margin.xxxl, y + 4);
        }
      });

      // === PARTICLES ===
      particles.forEach((particle, index) => {
        // Move particle toward target
        particle.x += (particle.targetX - particle.x) * particle.speed;
        particle.y += (particle.targetY - particle.y) * particle.speed;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.fillStyle = `rgba(14, 165, 233, ${0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Remove if reached target
        if (Math.abs(particle.x - particle.targetX) < 5) {
          particles.splice(index, 1);
        }
      });

      // Draw flow arrows
      if (progress > 0.3) {
        const arrowOpacity = Math.min((progress - 0.3) * 2, 1);

        // Left to center arrow
        drawArrow(ctx, width * 0.2, height * 0.5, width * 0.38, height * 0.5, CRE_COLORS.primary, arrowOpacity);

        // Center to right arrow
        drawArrow(ctx, width * 0.62, height * 0.5, width * 0.75, height * 0.5, CRE_COLORS.secondary, arrowOpacity);
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('AI Scoring Process', width / 2, 32);
      }

      // Animate
      if (progress < 2) {
        progress += 0.01;
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function drawArrow(
      ctx: CanvasRenderingContext2D,
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      color: string,
      opacity: number
    ) {
      const headLength = 10;
      const angle = Math.atan2(toY - fromY, toX - fromX);

      // Line
      ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow head
      ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
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
