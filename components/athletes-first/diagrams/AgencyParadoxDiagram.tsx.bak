/**
 * Agency Paradox Diagram
 *
 * Dramatic funnel visualization showing 800 agents → 250 draft spots bottleneck
 * Animated particles flowing through funnel to show competition intensity
 * Terminal Republic styling with data-driven visual storytelling
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  progress: number;
  stuck: boolean;
}

export default function AgencyParadoxDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

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

    // Initialize particles representing agents (density visualization)
    const initParticles = () => {
      const { width, height } = responsiveState;
      const particles: Particle[] = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: 50 + Math.random() * (width - 100),
          y: 100 + Math.random() * 80,
          vx: (Math.random() - 0.5) * 0.3,
          vy: 0.2 + Math.random() * 0.3,
          size: 3 + Math.random() * 1,
          progress: Math.random(),
          stuck: false
        });
      }
      return particles;
    };

    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles();
    }

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

      // Define funnel shape
      const funnelTop = 200;
      const funnelBottom = height - 150;
      const funnelHeight = funnelBottom - funnelTop;
      const topWidth = width * 0.8;
      const bottleneckWidth = width * 0.25;

      // Draw funnel outline
      ctx.strokeStyle = COLORS.brand.terminalGold;
      ctx.lineWidth = 3;
      ctx.shadowColor = COLORS.brand.terminalGold;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      // Left side
      ctx.moveTo((width - topWidth) / 2, funnelTop);
      ctx.lineTo((width - bottleneckWidth) / 2, funnelBottom);
      // Bottom
      ctx.lineTo((width + bottleneckWidth) / 2, funnelBottom);
      // Right side
      ctx.lineTo((width + topWidth) / 2, funnelTop);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw funnel fill gradient
      const gradient = ctx.createLinearGradient(width / 2, funnelTop, width / 2, funnelBottom);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0.05)');
      gradient.addColorStop(0.7, 'rgba(239, 68, 68, 0.15)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.25)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo((width - topWidth) / 2, funnelTop);
      ctx.lineTo((width - bottleneckWidth) / 2, funnelBottom);
      ctx.lineTo((width + bottleneckWidth) / 2, funnelBottom);
      ctx.lineTo((width + topWidth) / 2, funnelTop);
      ctx.closePath();
      ctx.fill();

      // Update and draw particles
      const particles = particlesRef.current;
      let successCount = 0;
      let blockedCount = 0;

      particles.forEach((p) => {
        // Get funnel width at this y position
        const relativeY = (p.y - funnelTop) / funnelHeight;
        const currentWidth = topWidth - (topWidth - bottleneckWidth) * Math.max(0, Math.min(1, relativeY));
        const leftBound = (width - currentWidth) / 2;
        const rightBound = (width + currentWidth) / 2;

        if (!p.stuck) {
          // Move particle
          p.x += p.vx;
          p.y += p.vy;

          // Gently constrain to funnel walls (no bounce)
          if (p.x < leftBound || p.x > rightBound) {
            p.vx *= -0.2;
            p.x = Math.max(leftBound, Math.min(rightBound, p.x));
          }

          // Check if reached bottleneck
          if (p.y > funnelBottom - 20) {
            const bottleneckCenter = width / 2;
            const distFromCenter = Math.abs(p.x - bottleneckCenter);

            // Only 31.25% make it through (250/800)
            if (distFromCenter < bottleneckWidth * 0.3 && Math.random() < 0.3125) {
              successCount++;
            } else {
              p.stuck = true;
              p.vy = 0;
              blockedCount++;
            }
          }

          // Reset if goes off bottom
          if (p.y > height) {
            p.y = 100 + Math.random() * 80;
            p.x = 50 + Math.random() * (width - 100);
            p.vx = (Math.random() - 0.5) * 0.5;
            p.vy = 0.3 + Math.random() * 0.5;
          }
        }

        // Draw particle
        const isInBottleneck = p.y > funnelBottom - 100;
        const particleColor = p.stuck ? COLORS.semantic.error : isInBottleneck ? COLORS.brand.terminalGold : `${COLORS.brand.terminalGold}66`;

        ctx.fillStyle = particleColor;
        ctx.shadowColor = p.stuck ? COLORS.semantic.error : COLORS.brand.terminalGold;
        ctx.shadowBlur = p.stuck ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Top label: 800 AGENTS
      ctx.fillStyle = COLORS.brand.terminalGold;
      ctx.font = getFont('h1', 'bold');
      ctx.textAlign = 'center';
      ctx.shadowColor = COLORS.brand.terminalGold;
      ctx.shadowBlur = 15;
      ctx.fillText('800 AGENTS', width / 2, 80);
      ctx.shadowBlur = 0;

      // Hero number: 69% in center of funnel
      const funnelMiddleY = (funnelTop + funnelBottom) / 2;
      ctx.fillStyle = COLORS.semantic.error;
      ctx.font = getFont('hero', 'bold');
      ctx.shadowColor = COLORS.semantic.error;
      ctx.shadowBlur = 20;
      ctx.fillText('69%', width / 2, funnelMiddleY);
      ctx.shadowBlur = 0;

      ctx.font = getFont('body');
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('FAIL AT THE BOTTLENECK', width / 2, funnelMiddleY + 45);

      // Bottleneck label: 250 SPOTS
      ctx.fillStyle = COLORS.semantic.error;
      ctx.font = getFont('h1', 'bold');
      ctx.textAlign = 'center';
      ctx.shadowColor = COLORS.semantic.error;
      ctx.shadowBlur = 15;
      ctx.fillText('250 SPOTS', width / 2, funnelBottom + 60);
      ctx.shadowBlur = 0;

      // Stats sidebar (simplified)
      const statsX = width - 180;
      const statsY = height / 2 - 40;

      // Competition ratio
      ctx.fillStyle = COLORS.brand.terminalGold;
      ctx.font = getFont('hero', 'bold');
      ctx.textAlign = 'left';
      ctx.fillText('3.2:1', statsX, statsY);

      ctx.font = getFont('caption');
      ctx.fillStyle = COLORS.mono.gray70;
      ctx.fillText('RATIO', statsX, statsY + 20);

      // Bottom insight
      setTextStyle(ctx, 'body', COLORS.brand.terminalGold, 'center');
      ctx.fillText('THE AGENCY BOTTLENECK', width / 2, height - 30);

      frameRef.current += 1;
      animationId = requestAnimationFrame(draw);
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        responsiveState = setupResponsiveCanvas(canvas, ctx, container);
        // Reinitialize particles with new dimensions
        particlesRef.current = initParticles();
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
    <div className="relative w-full h-full min-h-[500px] md:min-h-[650px] bg-black rounded-lg border border-[#EF4444]/20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239, 68, 68, 0.1) 2px, rgba(239, 68, 68, 0.1) 4px)'
        }}
      />
    </div>
  );
}
