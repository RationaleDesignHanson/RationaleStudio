/**
 * Digital Twin Flow Diagram
 *
 * SDF-based visualization showing video → digital twin → insights pipeline
 * Terminal Republic styling with data flow animation
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function DigitalTwinFlowDiagram() {
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

    // Using design system color tokens
    const gold = COLORS.brand.terminalGold;
    const goldDim = COLORS.mono.gray70;
    const goldBright = COLORS.alpha.gold30;

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

      const boxWidth = width / 4 - 20;
      const boxHeight = 120;
      const boxY = height / 2 - boxHeight / 2;
      const spacing = SPACING.base;

      // Flow stages
      const stages = [
        { x: 20, label: 'VIDEO\nFOOTAGE', icon: '🎥', subtext: 'Game film' },
        { x: 20 + boxWidth + spacing, label: 'AI\nANALYSIS', icon: '🧠', subtext: 'Processing' },
        { x: 20 + 2 * (boxWidth + spacing), label: 'DIGITAL\nTWIN', icon: '👤', subtext: '3D Model' },
        { x: 20 + 3 * (boxWidth + spacing), label: 'LIVE\nINSIGHTS', icon: '📊', subtext: 'Real-time' }
      ];

      // Pulse for animations
      const pulse = Math.sin(frameRef.current * 0.05) * 0.3 + 0.7;
      const flowOffset = frameRef.current % 80;

      // Draw flow arrows with animated particles
      for (let i = 0; i < stages.length - 1; i++) {
        const fromX = stages[i].x + boxWidth;
        const toX = stages[i + 1].x;
        const arrowY = boxY + boxHeight / 2;

        // Arrow line
        ctx.strokeStyle = goldDim;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromX, arrowY);
        ctx.lineTo(toX, arrowY);
        ctx.stroke();

        // Arrowhead
        ctx.fillStyle = goldDim;
        ctx.beginPath();
        ctx.moveTo(toX, arrowY);
        ctx.lineTo(toX - 8, arrowY - 5);
        ctx.lineTo(toX - 8, arrowY + 5);
        ctx.closePath();
        ctx.fill();

        // Animated flow particles
        const particleX = fromX + (flowOffset / 80) * (toX - fromX);
        ctx.fillStyle = `rgba(255, 215, 0, ${1 - flowOffset / 80})`;
        ctx.beginPath();
        ctx.arc(particleX, arrowY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = gold;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw stage boxes
      stages.forEach((stage, index) => {
        const isActive = Math.floor(frameRef.current / 60) % 4 === index;
        const boxPulse = isActive ? pulse : 0.6;

        // Box background
        const gradient = ctx.createLinearGradient(stage.x, boxY, stage.x, boxY + boxHeight);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0.15)');
        ctx.fillStyle = gradient;
        ctx.fillRect(stage.x, boxY, boxWidth, boxHeight);

        // Box border (pulsing if active)
        ctx.strokeStyle = `rgba(255, 215, 0, ${boxPulse})`;
        ctx.lineWidth = isActive ? 3 : 2;
        ctx.strokeRect(stage.x, boxY, boxWidth, boxHeight);

        // Icon at top
        ctx.font = getFont('h1');
        ctx.textAlign = 'center';
        ctx.fillStyle = isActive ? goldBright : gold;
        ctx.fillText(stage.icon, stage.x + boxWidth / 2, boxY + 40);

        // Label - using micro size for compact display
        setTextStyle(ctx, 'micro', isActive ? goldBright : gold, 'center');
        ctx.font = getFont('micro', 'bold');
        const lines = stage.label.split('\n');
        lines.forEach((line, i) => {
          ctx.fillText(line, stage.x + boxWidth / 2, boxY + 65 + i * 12);
        });

        // Subtext - UPGRADED FROM 8px to 11px (micro) for accessibility
        setTextStyle(ctx, 'micro', goldDim, 'center');
        ctx.fillText(stage.subtext, stage.x + boxWidth / 2, boxY + boxHeight - 15);

        // Active indicator dot
        if (isActive) {
          ctx.fillStyle = gold;
          ctx.shadowColor = gold;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(stage.x + boxWidth / 2, boxY - 10, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Header - using body size for title
      setTextStyle(ctx, 'body', gold, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('VIDEO → DIGITAL TWIN PIPELINE', width / 2, 35);

      // Subtitle - using micro size
      setTextStyle(ctx, 'micro', goldDim, 'center');
      ctx.fillText('Automated analysis turns footage into interactive 3D presentations', width / 2, 55);

      // Bottom metrics
      const metricsY = height - 40;
      const metrics = [
        { value: '<2min', label: 'Processing' },
        { value: '24/7', label: 'Available' },
        { value: '100%', label: 'Automated' }
      ];

      metrics.forEach((metric, i) => {
        const x = width / 4 + (i * width / 4);
        // Metric value - using body size
        setTextStyle(ctx, 'body', gold, 'center');
        ctx.font = getFont('body', 'bold');
        ctx.fillText(metric.value, x, metricsY);

        // Metric label - UPGRADED FROM 9px to 11px (micro) for accessibility
        setTextStyle(ctx, 'micro', goldDim, 'center');
        ctx.fillText(metric.label, x, metricsY + 16);
      });

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
    <div className="relative w-full h-full min-h-[450px] bg-black rounded-lg border border-terminal-gold/20 overflow-hidden">
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
