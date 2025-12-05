/**
 * Market Saturation Diagram
 *
 * Simple, clear visualization of 800 agents competing for 250 spots
 * Emphasizes the 3.2:1 ratio as the key insight
 * Uses visual proportions and clear numerical hierarchy
 * Terminal Republic styling with static, readable design
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function MarketSaturationDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    // Store responsive state in a ref so it updates
    let responsiveState = setupResponsiveCanvas(canvas, ctx, container);

    const gold = COLORS.brand.terminalGold;
    const red = COLORS.semantic.error;
    const green = COLORS.brand.green;
    const gray = COLORS.mono.gray70;

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Declare all font sizes at the top to avoid redeclaration errors
      const h2Size = getResponsiveFontSize('h2', isMobile);
      const h1Size = getResponsiveFontSize('h1', isMobile);
      const heroSize = getResponsiveFontSize('hero', isMobile);
      const bodySize = getResponsiveFontSize('body', isMobile);
      const captionSize = getResponsiveFontSize('caption', isMobile);
      const microSize = Math.max(11, getResponsiveFontSize('micro', isMobile));

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = gold;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('MARKET SATURATION', width / 2, 40);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Winner-takes-all competitive dynamics', width / 2, 62);

      // Hero ratio in center
      const centerY = height / 2;

      ctx.fillStyle = red;
      ctx.font = 'bold 120px monospace';
      ctx.shadowColor = red;
      ctx.shadowBlur = 25;
      ctx.fillText('3.2:1', width / 2, centerY - 20);
      ctx.shadowBlur = 0;

      ctx.font = '16px monospace';
      ctx.fillStyle = gray;
      ctx.fillText('AGENTS PER ROSTER SPOT', width / 2, centerY + 30);

      // Left side: 800 AGENTS
      const leftX = width * 0.15;
      const leftY = centerY + 120;

      // Agent container
      const agentBoxWidth = 200;
      const agentBoxHeight = 120;
      const agentBoxX = leftX - agentBoxWidth / 2;
      const agentBoxY = leftY - agentBoxHeight / 2;

      ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
      ctx.fillRect(agentBoxX, agentBoxY, agentBoxWidth, agentBoxHeight);

      ctx.strokeStyle = gold;
      ctx.lineWidth = 3;
      ctx.strokeRect(agentBoxX, agentBoxY, agentBoxWidth, agentBoxHeight);

      ctx.fillStyle = gold;
      ctx.font = `bold ${heroSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('800', leftX, leftY - 10);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('CERTIFIED', leftX, leftY + 20);
      ctx.fillText('AGENTS', leftX, leftY + 38);

      // Right side: 250 SPOTS
      const rightX = width * 0.85;
      const rightY = centerY + 120;

      // Spots container (smaller)
      const spotBoxWidth = 160;
      const spotBoxHeight = 100;
      const spotBoxX = rightX - spotBoxWidth / 2;
      const spotBoxY = rightY - spotBoxHeight / 2;

      ctx.fillStyle = 'rgba(0, 255, 148, 0.1)';
      ctx.fillRect(spotBoxX, spotBoxY, spotBoxWidth, spotBoxHeight);

      ctx.strokeStyle = green;
      ctx.lineWidth = 3;
      ctx.strokeRect(spotBoxX, spotBoxY, spotBoxWidth, spotBoxHeight);

      ctx.fillStyle = green;
      ctx.font = `bold ${heroSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('250', rightX, rightY - 5);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('ROSTER', rightX, rightY + 25);
      ctx.fillText('SPOTS', rightX, rightY + 43);

      // Competition arrows from left to right
      const arrowY = leftY - agentBoxHeight / 2 - 40;
      const arrowStartX = leftX + agentBoxWidth / 2 + 20;
      const arrowEndX = rightX - spotBoxWidth / 2 - 20;
      const arrowMidX = (arrowStartX + arrowEndX) / 2;

      // Draw curved arrows
      ctx.strokeStyle = red;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);

      for (let i = 0; i < 5; i++) {
        const offsetY = (i - 2) * 15;

        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowY + offsetY);
        ctx.quadraticCurveTo(
          arrowMidX,
          arrowY + offsetY - 30,
          arrowEndX,
          arrowY + offsetY
        );
        ctx.stroke();

        // Arrow head
        const headSize = 10;
        ctx.beginPath();
        ctx.moveTo(arrowEndX, arrowY + offsetY);
        ctx.lineTo(arrowEndX - headSize, arrowY + offsetY - headSize / 2);
        ctx.lineTo(arrowEndX - headSize, arrowY + offsetY + headSize / 2);
        ctx.closePath();
        ctx.fillStyle = red;
        ctx.fill();
      }

      // "COMPETING FOR" label above arrows
      ctx.fillStyle = red;
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('COMPETING FOR', arrowMidX, arrowY - 45);

      // Bottom insight
      ctx.fillStyle = gold;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('AGENCIES THAT SCALE SYSTEMATICALLY WIN', width / 2, height - 30);
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        responsiveState = setupResponsiveCanvas(canvas, ctx, container);
        draw();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-black rounded-lg border border-yellow-400/20 overflow-hidden">
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
