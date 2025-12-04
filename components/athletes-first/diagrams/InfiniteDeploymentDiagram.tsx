/**
 * Infinite Deployment Diagram
 *
 * Illustrates the "One session → Infinite deployment" concept
 * Shows 1 athlete recording session branching into multiple deployment channels
 * Large size - full visual impact
 * Terminal Republic aesthetic with animation
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function InfiniteDeploymentDiagram() {
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
    const green = COLORS.brand.green;
    const greenDim = COLORS.alpha.green30;
    const gray = COLORS.mono.gray70;

    // Define deployment channels
    const channels = [
      { label: 'Social Media', icon: '📱' },
      { label: 'Brand Campaigns', icon: '🎯' },
      { label: 'Training Content', icon: '🏋️' },
      { label: 'Fan Engagement', icon: '💬' },
      { label: 'Product Demos', icon: '🎬' },
      { label: 'Event Promos', icon: '🎉' }
    ];

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

      // Animation values
      const pulse = Math.sin(frameRef.current * 0.03) * 0.3 + 0.7;
      const flow = (frameRef.current * 2) % 100;

      // Left side: Single recording session
      const sourceX = width * 0.2;
      const sourceY = height / 2;

      // Draw source node (recording session)
      ctx.fillStyle = gold;
      ctx.shadowColor = gold;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(sourceX, sourceY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Source label - using caption size
      setTextStyle(ctx, 'caption', gold, 'center');
      ctx.font = getFont('caption', 'bold');
      ctx.fillText('1 SESSION', sourceX, sourceY - 35);

      // Sublabel - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('60 minutes', sourceX, sourceY - 20);

      // Right side: Multiple deployment channels
      const targetX = width * 0.8;
      const startY = height * 0.15;
      const spacing = (height * 0.7) / (channels.length - 1);

      // Draw branching connections with flow animation
      channels.forEach((channel, i) => {
        const targetY = startY + (i * spacing);

        // Draw flow line with dashed pattern that moves
        const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
        gradient.addColorStop(0, `rgba(0, 255, 148, ${pulse * 0.8})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 148, ${pulse * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 255, 148, 0.2)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -flow;
        ctx.beginPath();
        ctx.moveTo(sourceX + 20, sourceY);

        // Curved path for visual interest
        const midX = (sourceX + targetX) / 2;
        ctx.quadraticCurveTo(midX, sourceY, targetX - 20, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw target node (deployment channel)
        ctx.fillStyle = greenDim;
        ctx.beginPath();
        ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = green;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Channel label - UPGRADED FROM 10px to 11px (micro) for accessibility
        setTextStyle(ctx, 'micro', green, 'left');
        ctx.font = getFont('micro', 'bold');
        ctx.fillText(channel.label.toUpperCase(), targetX + 18, targetY + 4);
      });

      // Center arrow with "∞" symbol - using hero size
      const centerY = height / 2;
      setTextStyle(ctx, 'hero', gold, 'center');
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15;
      ctx.fillText('→ ∞', width / 2, centerY + 15);
      ctx.shadowBlur = 0;

      // Top label - using body size
      setTextStyle(ctx, 'body', gold, 'center');
      ctx.font = getFont('body', 'bold');
      ctx.fillText('INFINITE DEPLOYMENT', width / 2, 35);

      // Subtitle - using micro size
      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('One recording session enables unlimited, simultaneous deployments', width / 2, 55);

      // Bottom stats - using h2 for values
      setTextStyle(ctx, 'h2', green, 'left');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('1', width * 0.15, height - 45);

      // Labels - UPGRADED FROM 10px to 11px (micro) for accessibility
      setTextStyle(ctx, 'micro', gray, 'left');
      ctx.fillText('RECORDING SESSION', width * 0.15, height - 25);

      setTextStyle(ctx, 'h2', green, 'center');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('∞', width * 0.5, height - 45);

      setTextStyle(ctx, 'micro', gray, 'center');
      ctx.fillText('SIMULTANEOUS USES', width * 0.5, height - 25);

      setTextStyle(ctx, 'h2', green, 'right');
      ctx.font = getFont('h2', 'bold');
      ctx.fillText('24/7', width * 0.85, height - 45);

      setTextStyle(ctx, 'micro', gray, 'right');
      ctx.fillText('AVAILABILITY', width * 0.85, height - 25);

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
    <div className="relative w-full h-full min-h-[600px] bg-black rounded-lg border border-[#00FF94]/20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 148, 0.1) 2px, rgba(0, 255, 148, 0.1) 4px)'
        }}
      />
    </div>
  );
}
