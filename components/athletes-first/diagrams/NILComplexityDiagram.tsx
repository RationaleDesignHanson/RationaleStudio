/**
 * NIL Complexity Diagram
 *
 * SDF-based visualization showing the web of NIL deal complexity
 * Terminal Republic styling with network visualization
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

interface Node {
  x: number;
  y: number;
  label: string;
  type: 'athlete' | 'stakeholder' | 'concern';
}

export default function NILComplexityDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Wait for container to be sized
    const container = canvas.parentElement;
    if (!container) return;

    // Store responsive state in a ref so it updates
    let responsiveState = setupResponsiveCanvas(canvas, ctx, container);

    // Using design system color tokens
    const gold = COLORS.brand.terminalGold;
    const goldDim = COLORS.alpha.gold30;
    const red = COLORS.semantic.error;
    const gray = COLORS.mono.gray70;

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

      // Define network nodes
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

    const nodes: Node[] = [
      { x: centerX, y: centerY, label: 'ATHLETE', type: 'athlete' },
      { x: centerX + radius * Math.cos(0), y: centerY + radius * Math.sin(0), label: 'School', type: 'stakeholder' },
      { x: centerX + radius * Math.cos(Math.PI / 3), y: centerY + radius * Math.sin(Math.PI / 3), label: 'NCAA', type: 'stakeholder' },
      { x: centerX + radius * Math.cos(2 * Math.PI / 3), y: centerY + radius * Math.sin(2 * Math.PI / 3), label: 'Brand', type: 'stakeholder' },
      { x: centerX + radius * Math.cos(Math.PI), y: centerY + radius * Math.sin(Math.PI), label: 'Agent', type: 'stakeholder' },
      { x: centerX + radius * Math.cos(4 * Math.PI / 3), y: centerY + radius * Math.sin(4 * Math.PI / 3), label: 'Family', type: 'stakeholder' },
      { x: centerX + radius * Math.cos(5 * Math.PI / 3), y: centerY + radius * Math.sin(5 * Math.PI / 3), label: 'Lawyer', type: 'stakeholder' }
    ];

    // Outer ring concerns
    const outerRadius = radius * 1.4;
    const concerns = [
      { x: centerX + outerRadius * Math.cos(Math.PI / 6), y: centerY + outerRadius * Math.sin(Math.PI / 6), label: 'Tax' },
      { x: centerX + outerRadius * Math.cos(Math.PI / 2), y: centerY + outerRadius * Math.sin(Math.PI / 2), label: 'Eligibility' },
      { x: centerX + outerRadius * Math.cos(5 * Math.PI / 6), y: centerY + outerRadius * Math.sin(5 * Math.PI / 6), label: 'Terms' },
      { x: centerX + outerRadius * Math.cos(7 * Math.PI / 6), y: centerY + outerRadius * Math.sin(7 * Math.PI / 6), label: 'Rights' },
      { x: centerX + outerRadius * Math.cos(3 * Math.PI / 2), y: centerY + outerRadius * Math.sin(3 * Math.PI / 2), label: 'Timing' },
      { x: centerX + outerRadius * Math.cos(11 * Math.PI / 6), y: centerY + outerRadius * Math.sin(11 * Math.PI / 6), label: 'Value' }
    ];

      // Clear
      ctx.fillStyle = COLORS.mono.black;
      ctx.fillRect(0, 0, width, height);

      // Pulse effect for connections
      const pulse = Math.sin(frameRef.current * 0.04) * 0.3 + 0.5;
      const slowPulse = Math.sin(frameRef.current * 0.02) * 0.2 + 0.6;

      // Draw connections from athlete to stakeholders (animated)
      ctx.lineWidth = 1.5;
      for (let i = 1; i < nodes.length; i++) {
        const opacity = pulse * 0.4;
        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[i].x, nodes[i].y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw connections from stakeholders to concerns (more chaotic)
      ctx.lineWidth = 1;
      concerns.forEach((concern, i) => {
        // Connect to 2-3 random stakeholders
        const connectTo = [1 + (i % 6), 1 + ((i + 2) % 6)];
        connectTo.forEach(idx => {
          const opacity = slowPulse * 0.3;
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(nodes[idx].x, nodes[idx].y);
          ctx.lineTo(concern.x, concern.y);
          ctx.stroke();
        });
      });
      ctx.setLineDash([]);

      // Draw nodes
      // Center athlete node (largest, gold)
      ctx.fillStyle = gold;
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(nodes[0].x, nodes[0].y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Stakeholder nodes (medium, gold)
      for (let i = 1; i < nodes.length; i++) {
        ctx.fillStyle = goldDim;
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = gold;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Concern nodes (small, red)
      concerns.forEach(concern => {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.beginPath();
        ctx.arc(concern.x, concern.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = red;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Labels
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Center label - using body size for prominence, 100% gold
      ctx.fillStyle = gold;
      ctx.font = `bold ${bodySize}px monospace`;
      ctx.shadowColor = gold;
      ctx.shadowBlur = 15;
      ctx.fillText(nodes[0].label, nodes[0].x, nodes[0].y - 24);
      ctx.shadowBlur = 0;

      // Stakeholder labels - body size for legibility, 100% gold
      ctx.fillStyle = gold;
      ctx.font = `${bodySize}px monospace`;
      for (let i = 1; i < nodes.length; i++) {
        const offsetY = nodes[i].y < centerY ? -18 : 18;
        ctx.fillText(nodes[i].label, nodes[i].x, nodes[i].y + offsetY);
      }

      // Concern labels - caption size, brighter red
      ctx.fillStyle = red;
      ctx.font = `${captionSize}px monospace`;
      concerns.forEach(concern => {
        const offsetY = concern.y < centerY ? -14 : 14;
        ctx.fillText(concern.label, concern.x, concern.y + offsetY);
      });

      // Header - using h2 size for title
      ctx.fillStyle = gold;
      ctx.font = `bold ${h2Size}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('WEB OF NIL COMPLEXITY', width / 2, 35);

      // Subtitle - using body size
      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Every deal involves 6+ stakeholders and dozens of considerations', width / 2, 56);

      // Stats at bottom - using h1 for numbers (more prominent)
      ctx.fillStyle = red;
      ctx.font = `bold ${h1Size}px monospace`;
      ctx.fillText('7', width / 3, height - 50);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('STAKEHOLDERS', width / 3, height - 24);

      ctx.fillStyle = red;
      ctx.font = `bold ${h1Size}px monospace`;
      ctx.fillText('50+', 2 * width / 3, height - 50);

      ctx.font = `${bodySize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('VARIABLES', 2 * width / 3, height - 24);

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
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] bg-black rounded-lg border border-terminal-gold/20 overflow-hidden">
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
