'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

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
        { icon: '🏢', label: 'Property Records', color: CRE_COLORS.primary },
        { icon: '💰', label: 'Financing Data', color: CRE_COLORS.secondary },
        { icon: '📊', label: 'Market Trends', color: CRE_COLORS.accent },
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
        ctx.roundRect(x - 60, y - 25, 120, 50, 8);
        ctx.fill();
        ctx.stroke();

        // Icon
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(source.icon, x, y - 5);

        // Label
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(source.label, x, y + 15);

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

        // AI icon
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${brainOpacity})`;
        ctx.fillText('🤖', brainX, brainY);

        // "AI Scoring Engine" label
        ctx.fillStyle = `rgba(139, 92, 246, ${brainOpacity})`;
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('AI Scoring Engine', brainX, brainY + brainRadius + 25);

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
          ctx.roundRect(x - 70, y - 20, 140, 40, 6);
          ctx.fill();
          ctx.stroke();

          // Score badge
          const scoreSize = 32;
          ctx.fillStyle = opp.color;
          ctx.beginPath();
          ctx.roundRect(x - 60, y - 12, scoreSize, scoreSize, 4);
          ctx.fill();

          // Score number
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(opp.score.toString(), x - 44, y + 4);

          // Property name
          ctx.fillStyle = `rgba(255, 255, 255, ${oppOpacity * 0.9})`;
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(opp.name, x - 20, y + 4);

          // Rank indicator
          ctx.fillStyle = `rgba(255, 255, 255, ${oppOpacity * 0.4})`;
          ctx.font = '10px Inter, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(`#${index + 1}`, x + 65, y + 4);
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
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * 0.8})`;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('AI Scoring Process', width / 2, 30);
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
