/**
 * Deal Multiplier Diagram
 *
 * Visual comparison showing 3-5x multiplier effect
 * Before: Traditional workflow with few deals
 * After: AmplifyAI enabling 3-5x more brand partnerships
 * Terminal Republic styling with dramatic scale difference
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function DealMultiplierDiagram() {
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

    const gold = COLORS.brand.terminalGold;
    const red = COLORS.semantic.error;
    const green = COLORS.brand.green;
    const pink = COLORS.brand.pink;
    const gray = COLORS.mono.gray70;

    let animationId: number;

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Declare all font sizes at the top to avoid redeclaration errors
      const titleSize = getResponsiveFontSize('h2', isMobile);
      const bodySize = getResponsiveFontSize('body', isMobile);
      const captionSize = getResponsiveFontSize('caption', isMobile);
      const microSize = Math.max(11, getResponsiveFontSize('micro', isMobile));
      const heroSize = Math.min(32, getResponsiveFontSize('hero', isMobile));
      const h2Size = getResponsiveFontSize('h2', isMobile);
      const dealIconSize = getResponsiveFontSize('h2', isMobile);

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = gold;
      ctx.font = `bold ${titleSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('THE DEAL MULTIPLIER EFFECT', width / 2, 40);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Speed = More opportunities captured = More brand partnerships', width / 2, 62);

      if (isMobile) {
        // ============ MOBILE: VERTICAL STACKING ============
        const centerX = width / 2;
        const beforeY = 100;
        const afterY = height / 2 + 60;

        // ===== BEFORE SECTION (TOP) =====
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.fillStyle = red;
        ctx.textAlign = 'center';
        ctx.fillText('BEFORE: TRADITIONAL', centerX, beforeY);

        ctx.font = `${captionSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('2-3 weeks per deal', centerX, beforeY + 20);

        // Draw limited deals (2x4 grid on mobile)
        const dealSize = 40;
        const dealGap = getResponsiveSpacing(12, isMobile);
        const dealsPerRow = 2;
        const beforeDeals = 8;

        for (let i = 0; i < beforeDeals; i++) {
          const row = Math.floor(i / dealsPerRow);
          const col = i % dealsPerRow;
          const x = centerX - (dealsPerRow * dealSize + dealGap) / 2 + col * (dealSize + dealGap);
          const y = beforeY + 50 + row * (dealSize + dealGap);

          // Deal box
          ctx.fillStyle = `${red}20`;
          ctx.fillRect(x, y, dealSize, dealSize);
          ctx.strokeStyle = `${red}80`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, dealSize, dealSize);

          // Deal icon
          ctx.fillStyle = red;
          ctx.font = `bold ${dealIconSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', x + dealSize / 2, y + dealSize / 2);
        }

        // "8 deals" count
        ctx.font = `bold ${heroSize}px monospace`;
        ctx.fillStyle = red;
        ctx.textAlign = 'center';
        ctx.fillText('8', centerX, beforeY + 220);

        ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('deals/athlete/year', centerX, beforeY + 245);

        // ===== DOWNWARD ARROW =====
        const arrowX = centerX;
        const arrowStartY = beforeY + 265;
        const arrowEndY = afterY - 40;

        ctx.strokeStyle = `${gold}80`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowStartY);
        ctx.lineTo(arrowX, arrowEndY);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowEndY);
        ctx.lineTo(arrowX - 10, arrowEndY - 15);
        ctx.lineTo(arrowX + 10, arrowEndY - 15);
        ctx.closePath();
        ctx.fill();

        // Arrow labels
        ctx.fillStyle = gold;
        ctx.font = `bold ${bodySize}px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText('SPEED', arrowX + 20, (arrowStartY + arrowEndY) / 2 - 10);
        ctx.fillText('ENABLES', arrowX + 20, (arrowStartY + arrowEndY) / 2 + 10);

        // ===== AFTER SECTION (BOTTOM) =====
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.fillStyle = green;
        ctx.textAlign = 'center';
        ctx.fillText('AFTER: AMPLIFYAI', centerX, afterY);

        ctx.font = `${captionSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('48-72 hours per deal', centerX, afterY + 20);

        // Draw expanded deals (4x8 grid on mobile)
        const afterDealsPerRow = 4;
        const afterDeals = 32;

        for (let i = 0; i < afterDeals; i++) {
          const row = Math.floor(i / afterDealsPerRow);
          const col = i % afterDealsPerRow;
          const x = centerX - (afterDealsPerRow * dealSize + (afterDealsPerRow - 1) * dealGap) / 2 + col * (dealSize + dealGap);
          const y = afterY + 50 + row * (dealSize + dealGap);

          // Deal box
          ctx.fillStyle = `${green}20`;
          ctx.fillRect(x, y, dealSize, dealSize);
          ctx.strokeStyle = `${green}80`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, dealSize, dealSize);

          // Deal icon
          ctx.fillStyle = green;
          ctx.font = `bold ${dealIconSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', x + dealSize / 2, y + dealSize / 2);
        }

        // "32 deals" count
        ctx.font = `bold ${heroSize}px monospace`;
        ctx.fillStyle = green;
        ctx.textAlign = 'center';
        ctx.fillText('32', centerX, afterY + 380);

        ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('deals/athlete/year', centerX, afterY + 405);

        // Multiplier badge
        const badgeWidth = 80;
        const badgeHeight = 40;
        const badgeX = centerX - badgeWidth / 2;
        const badgeY = afterY + 430;

        ctx.fillStyle = `${pink}30`;
        ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);

        ctx.strokeStyle = pink;
        ctx.lineWidth = 3;
        ctx.shadowColor = pink;
        ctx.shadowBlur = 15;
        ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);
        ctx.shadowBlur = 0;

        ctx.fillStyle = pink;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('4x', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);

      } else {
        // ============ DESKTOP: SIDE-BY-SIDE ============
        const columnWidth = (width - 180) / 2;
        const leftX = 60;
        const rightX = width / 2 + 30;
        const contentY = 120;

        // ===== LEFT SIDE: BEFORE (Traditional) =====
        ctx.fillStyle = red;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('BEFORE: TRADITIONAL', leftX + columnWidth / 2, contentY);

        ctx.font = `${captionSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('2-3 weeks per deal', leftX + columnWidth / 2, contentY + 22);
        ctx.fillText('70% moments missed', leftX + columnWidth / 2, contentY + 38);

        // Draw limited number of deals (8 small boxes)
        const beforeDeals = 8;
        const dealSize = 50;
        const dealGap = getResponsiveSpacing(12, isMobile);
        const dealsPerRow = 4;
        const dealStartY = contentY + 70;

        for (let i = 0; i < beforeDeals; i++) {
          const row = Math.floor(i / dealsPerRow);
          const col = i % dealsPerRow;
          const x = leftX + (columnWidth - (dealsPerRow * dealSize + (dealsPerRow - 1) * dealGap)) / 2 + col * (dealSize + dealGap);
          const y = dealStartY + row * (dealSize + dealGap);

          // Deal box
          ctx.fillStyle = `${red}20`;
          ctx.fillRect(x, y, dealSize, dealSize);

          ctx.strokeStyle = `${red}80`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, dealSize, dealSize);

          // Deal icon
          ctx.fillStyle = red;
          ctx.font = `bold ${dealIconSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', x + dealSize / 2, y + dealSize / 2);
        }

        // Before count
        ctx.fillStyle = red;
        ctx.font = `bold ${heroSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('8', leftX + columnWidth / 2, dealStartY + 150);

        ctx.font = `${bodySize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('deals/athlete/year', leftX + columnWidth / 2, dealStartY + 175);

        // Time indicator
        ctx.fillStyle = red;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.fillText('2-3 weeks', leftX + columnWidth / 2, dealStartY + 210);

        ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('per activation', leftX + columnWidth / 2, dealStartY + 228);

        // ===== RIGHT SIDE: AFTER (AmplifyAI) =====
        ctx.fillStyle = green;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('AFTER: AMPLIFYAI', rightX + columnWidth / 2, contentY);

        ctx.font = `${captionSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('48-72 hours per deal', rightX + columnWidth / 2, contentY + 22);
        ctx.fillText('90% capture rate', rightX + columnWidth / 2, contentY + 38);

        // Draw expanded number of deals (32 small boxes arranged in grid)
        const afterDeals = 32;
        const afterDealsPerRow = 8;

        for (let i = 0; i < afterDeals; i++) {
          const row = Math.floor(i / afterDealsPerRow);
          const col = i % afterDealsPerRow;
          const x = rightX + (columnWidth - (afterDealsPerRow * dealSize + (afterDealsPerRow - 1) * dealGap)) / 2 + col * (dealSize + dealGap);
          const y = dealStartY + row * (dealSize + dealGap);

          // Deal box
          ctx.fillStyle = `${green}20`;
          ctx.fillRect(x, y, dealSize, dealSize);

          ctx.strokeStyle = `${green}80`;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, dealSize, dealSize);

          // Deal icon
          ctx.fillStyle = green;
          ctx.font = `bold ${dealIconSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('$', x + dealSize / 2, y + dealSize / 2);
        }

        // After count with multiplier badge
        ctx.fillStyle = green;
        ctx.font = `bold ${heroSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('32', rightX + columnWidth / 2, dealStartY + 290);

        ctx.font = `${bodySize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('deals/athlete/year', rightX + columnWidth / 2, dealStartY + 315);

        // Multiplier badge
        const badgeWidth = 100;
        const badgeHeight = 50;
        const badgeX = rightX + columnWidth / 2 - badgeWidth / 2;
        const badgeY = dealStartY + 330;

        ctx.fillStyle = `${pink}30`;
        ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);

        ctx.strokeStyle = pink;
        ctx.lineWidth = 3;
        ctx.shadowColor = pink;
        ctx.shadowBlur = 15;
        ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);
        ctx.shadowBlur = 0;

        ctx.fillStyle = pink;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('4x', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);

        // Time indicator
        ctx.fillStyle = green;
        ctx.font = `bold ${h2Size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('48-72hrs', rightX + columnWidth / 2, dealStartY + 400);

        ctx.font = `${microSize}px monospace`;
        ctx.fillStyle = gray;
        ctx.fillText('per activation', rightX + columnWidth / 2, dealStartY + 418);

        // Divider arrow showing transformation
        const arrowY = height / 2;
        const arrowStartX = leftX + columnWidth + 20;
        const arrowEndX = rightX - 20;

        // Arrow shaft
        ctx.strokeStyle = `${gold}80`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowY);
        ctx.lineTo(arrowEndX, arrowY);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.moveTo(arrowEndX, arrowY);
        ctx.lineTo(arrowEndX - 15, arrowY - 10);
        ctx.lineTo(arrowEndX - 15, arrowY + 10);
        ctx.closePath();
        ctx.fill();

        // Arrow label
        ctx.fillStyle = gold;
        ctx.font = `bold ${bodySize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('SPEED', (arrowStartX + arrowEndX) / 2, arrowY - 15);
        ctx.fillText('ENABLES', (arrowStartX + arrowEndX) / 2, arrowY + 30);
      }

      // Bottom insight
      ctx.fillStyle = gold;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('SAME AGENT WORKLOAD • 4X MORE REVENUE OPPORTUNITIES', width / 2, height - 25);

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
    <div className="relative w-full h-full min-h-[850px] md:min-h-[600px] bg-black rounded-lg border border-[COLORS.brand.terminalGold]/20 overflow-hidden">
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
