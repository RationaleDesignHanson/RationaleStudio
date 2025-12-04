/**
 * Four Modules System Diagram
 *
 * Linear left-to-right athlete lifecycle timeline
 * Shows progression from amateur (NIL) → recruitment (Pitch) → content (Twins) → distribution (Amplify)
 * Terminal Republic styling with stage cards and flow arrows
 * WCAG AA compliant typography and contrast ratios
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function FourModulesSystemDiagram() {
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
    const gray = COLORS.mono.gray70;

    // Module definitions in lifecycle order
    const modules = [
      {
        id: 'nil',
        stage: 1,
        name: 'NIL PLATFORM',
        lifecycle: 'NCAA Compliance →\nAgency Trust',
        metric: '95%+ compliance',
        metricContext: 'vs. 60% avg',
        icon: '⚖',
        color: COLORS.brand.orange // Orange
      },
      {
        id: 'pitch',
        stage: 2,
        name: 'INTERACTIVE PITCH',
        lifecycle: 'First Meeting →\nSigned Contract',
        metric: '65% close rate',
        metricContext: 'vs. 25% w/ PDFs',
        icon: '📊',
        color: COLORS.brand.purple // Purple
      },
      {
        id: 'twins',
        stage: 3,
        name: 'VIDEO TWINS',
        lifecycle: 'One Session →\nInfinite Assets',
        metric: '$150K-$500K',
        metricContext: 'per athlete annually',
        icon: '∞',
        color: COLORS.brand.green // Green
      },
      {
        id: 'amplify',
        stage: 4,
        name: 'AMPLIFY AI',
        lifecycle: 'Posted Content →\nClosed Deals',
        metric: '3-5x velocity',
        metricContext: '48hrs vs. 2 weeks',
        icon: '⚡',
        color: COLORS.brand.pink // Pink
      }
    ];

    let animationId: number;

    const draw = () => {
      // Use responsiveState for current dimensions
      const { width, height, isMobile, scale } = responsiveState;

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Title
      ctx.fillStyle = gold;
      const titleSize = getResponsiveFontSize('h2', isMobile);
      ctx.font = `bold ${titleSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('ATHLETE LIFECYCLE JOURNEY', width / 2, 30);

      // Subtitle
      const captionSize = getResponsiveFontSize('caption', isMobile);
      ctx.font = `${captionSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('From amateur compliance to professional viral distribution', width / 2, 48);

      // Calculate card layout with responsive values
      const cardGap = getResponsiveSpacing(28, isMobile);
      const cardsPerRow = isMobile ? 2 : 4;
      const cardWidth = isMobile
        ? Math.min((width - cardGap * 3) / 2, 160)
        : 200;
      const cardHeight = isMobile ? cardWidth * 1.3 : 240;
      const totalCardsWidth = (cardWidth * cardsPerRow) + (cardGap * (cardsPerRow - 1));
      const startX = (width - totalCardsWidth) / 2;
      const cardY = isMobile ? 85 : 85;

      // Draw connecting arrows between cards
      modules.forEach((module, i) => {
        if (i < modules.length - 1) {
          const row = Math.floor(i / cardsPerRow);
          const col = i % cardsPerRow;
          const nextRow = Math.floor((i + 1) / cardsPerRow);
          const nextCol = (i + 1) % cardsPerRow;

          const fromX = startX + (col * (cardWidth + cardGap)) + cardWidth;
          const fromY = cardY + (row * (cardHeight + cardGap)) + cardHeight / 2;
          const toX = startX + (nextCol * (cardWidth + cardGap));
          const toY = cardY + (nextRow * (cardHeight + cardGap)) + cardHeight / 2;

          // Only draw arrows if not wrapping to next row on mobile
          if (isMobile && nextRow !== row) {
            return; // Skip vertical arrows on mobile
          }

          const arrowY = fromY;

          const nextModule = modules[i + 1];

          // Arrow gradient
          const gradient = ctx.createLinearGradient(fromX, arrowY, toX, arrowY);
          gradient.addColorStop(0, `${module.color}70`);
          gradient.addColorStop(1, `${nextModule.color}70`);

          // Dashed arrow line
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.lineDashOffset = -(frameRef.current * 0.5);
          ctx.beginPath();
          ctx.moveTo(fromX, arrowY);
          ctx.lineTo(toX, arrowY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Arrow head
          ctx.fillStyle = nextModule.color;
          ctx.beginPath();
          ctx.moveTo(toX, arrowY);
          ctx.lineTo(toX - 10, arrowY - 6);
          ctx.lineTo(toX - 10, arrowY + 6);
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw module cards
      modules.forEach((module, i) => {
        const row = Math.floor(i / cardsPerRow);
        const col = i % cardsPerRow;
        const x = startX + (col * (cardWidth + cardGap));
        const y = cardY + (row * (cardHeight + cardGap));

        // Card background with subtle tint
        ctx.fillStyle = `${module.color}14`; // 8% opacity = ~14 in hex
        ctx.fillRect(x, y, cardWidth, cardHeight);

        // Card border
        ctx.strokeStyle = `${module.color}4D`; // 30% opacity = ~4D in hex
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cardWidth, cardHeight);

        // Stage number badge (top-center, extending above card)
        const badgeX = x + cardWidth / 2;
        const badgeY = y - 20;
        const badgeRadius = 20;

        // Badge glow (using module color instead of gold)
        ctx.fillStyle = `${module.color}4D`;
        ctx.shadowColor = module.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Badge circle
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = module.color;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Badge number
        ctx.fillStyle = module.color;
        const badgeSize = getResponsiveFontSize('h2', isMobile);
        ctx.font = `bold ${badgeSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(module.stage), badgeX, badgeY);

        // Draw custom icon
        const iconCenterX = x + cardWidth / 2;
        const iconCenterY = y + 50;
        const iconSize = 40;

        ctx.strokeStyle = module.color;
        ctx.fillStyle = module.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw icon based on module ID
        if (module.id === 'nil') {
          // Balance scales icon for NIL Platform
          // Base
          ctx.beginPath();
          ctx.moveTo(iconCenterX - iconSize * 0.4, iconCenterY + iconSize * 0.4);
          ctx.lineTo(iconCenterX + iconSize * 0.4, iconCenterY + iconSize * 0.4);
          ctx.stroke();

          // Vertical pole
          ctx.beginPath();
          ctx.moveTo(iconCenterX, iconCenterY + iconSize * 0.4);
          ctx.lineTo(iconCenterX, iconCenterY - iconSize * 0.5);
          ctx.stroke();

          // Horizontal beam
          ctx.beginPath();
          ctx.moveTo(iconCenterX - iconSize * 0.5, iconCenterY - iconSize * 0.3);
          ctx.lineTo(iconCenterX + iconSize * 0.5, iconCenterY - iconSize * 0.3);
          ctx.stroke();

          // Left scale pan
          ctx.beginPath();
          ctx.moveTo(iconCenterX - iconSize * 0.5, iconCenterY - iconSize * 0.3);
          ctx.lineTo(iconCenterX - iconSize * 0.6, iconCenterY - iconSize * 0.1);
          ctx.lineTo(iconCenterX - iconSize * 0.4, iconCenterY - iconSize * 0.1);
          ctx.closePath();
          ctx.stroke();

          // Right scale pan
          ctx.beginPath();
          ctx.moveTo(iconCenterX + iconSize * 0.5, iconCenterY - iconSize * 0.3);
          ctx.lineTo(iconCenterX + iconSize * 0.6, iconCenterY - iconSize * 0.1);
          ctx.lineTo(iconCenterX + iconSize * 0.4, iconCenterY - iconSize * 0.1);
          ctx.closePath();
          ctx.stroke();
        } else if (module.id === 'pitch') {
          // Bar chart icon for Interactive Pitch
          const barWidth = iconSize * 0.15;
          const barGap = iconSize * 0.1;
          const bars = [0.3, 0.6, 0.9, 0.5];

          bars.forEach((height, i) => {
            const barX = iconCenterX - (bars.length * (barWidth + barGap)) / 2 + i * (barWidth + barGap);
            const barHeight = iconSize * height;
            const barY = iconCenterY + iconSize * 0.3 - barHeight;

            ctx.fillStyle = module.color;
            ctx.fillRect(barX, barY, barWidth, barHeight);
          });

          // Base line
          ctx.beginPath();
          ctx.moveTo(iconCenterX - iconSize * 0.4, iconCenterY + iconSize * 0.3);
          ctx.lineTo(iconCenterX + iconSize * 0.4, iconCenterY + iconSize * 0.3);
          ctx.stroke();
        } else if (module.id === 'twins') {
          // Infinity symbol for Video Twins
          ctx.strokeStyle = module.color;
          ctx.lineWidth = 4;
          ctx.beginPath();

          // Left loop
          ctx.arc(iconCenterX - iconSize * 0.25, iconCenterY, iconSize * 0.25, 0, Math.PI * 2);

          // Right loop
          ctx.moveTo(iconCenterX + iconSize * 0.5, iconCenterY);
          ctx.arc(iconCenterX + iconSize * 0.25, iconCenterY, iconSize * 0.25, 0, Math.PI * 2);

          ctx.stroke();
        } else if (module.id === 'amplify') {
          // Lightning bolt for AmplifyAI
          ctx.fillStyle = module.color;
          ctx.beginPath();
          ctx.moveTo(iconCenterX + iconSize * 0.1, iconCenterY - iconSize * 0.5);
          ctx.lineTo(iconCenterX - iconSize * 0.2, iconCenterY);
          ctx.lineTo(iconCenterX + iconSize * 0.1, iconCenterY);
          ctx.lineTo(iconCenterX - iconSize * 0.1, iconCenterY + iconSize * 0.5);
          ctx.lineTo(iconCenterX + iconSize * 0.3, iconCenterY + iconSize * 0.1);
          ctx.lineTo(iconCenterX + iconSize * 0.1, iconCenterY + iconSize * 0.1);
          ctx.closePath();
          ctx.fill();
        }

        // Module name
        ctx.fillStyle = module.color;
        const moduleNameSize = getResponsiveFontSize('h2', isMobile);
        ctx.font = `bold ${moduleNameSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Handle multi-line module names
        const nameWords = module.name.split(' ');
        const nameLineHeight = moduleNameSize * 1.2;
        if (nameWords.length > 1) {
          nameWords.forEach((word, wordIndex) => {
            ctx.fillText(word, x + cardWidth / 2, y + 90 + (wordIndex * nameLineHeight));
          });
        } else {
          ctx.fillText(module.name, x + cardWidth / 2, y + 90);
        }

        // Lifecycle stage (secondary label)
        ctx.fillStyle = gray;
        const lifecycleSize = getResponsiveFontSize('caption', isMobile);
        ctx.font = `${lifecycleSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Handle multi-line lifecycle labels
        const lifecycleLines = module.lifecycle.split('\n');
        const lifecycleLineHeight = lifecycleSize * 1.3;
        if (lifecycleLines.length > 1 || module.lifecycle.includes('→')) {
          const parts = module.lifecycle.split('→');
          if (parts.length === 2) {
            ctx.fillText(parts[0].trim(), x + cardWidth / 2, y + 130);
            ctx.fillText('→ ' + parts[1].trim(), x + cardWidth / 2, y + 130 + lifecycleLineHeight);
          } else {
            ctx.fillText(module.lifecycle, x + cardWidth / 2, y + 130);
          }
        } else {
          ctx.fillText(module.lifecycle, x + cardWidth / 2, y + 130);
        }

        // Key metric (bottom area)
        ctx.fillStyle = module.color;
        const metricSize = getResponsiveFontSize('body', isMobile);
        ctx.font = `bold ${metricSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(module.metric, x + cardWidth / 2, y + 180);

        // Metric context (below main metric)
        if ('metricContext' in module) {
          ctx.fillStyle = `${gray}99`; // 60% opacity
          const contextSize = getResponsiveFontSize('micro', isMobile);
          ctx.font = `${contextSize}px monospace`;
          ctx.fillText(module.metricContext, x + cardWidth / 2, y + 198);
        }
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
    <div
      className="relative w-full h-full min-h-[380px] md:min-h-[450px] bg-black rounded-lg border border-[COLORS.brand.terminalGold]/20 overflow-hidden"
      role="img"
      aria-label="Athlete lifecycle timeline showing four integrated modules: NIL Platform for amateur compliance, Interactive Pitch for recruitment, Video Twins for content creation, and Amplify AI for viral distribution"
    >
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
