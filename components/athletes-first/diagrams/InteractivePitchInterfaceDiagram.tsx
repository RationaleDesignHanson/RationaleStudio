/**
 * Interactive Pitch Interface Diagram
 *
 * Split-screen mockup showing: Contract comparison table (3 offers side-by-side) +
 * Live NIL calculator + Career pathway visualization
 * Makes abstract "interactive" concept concrete and tangible
 * Terminal Republic styling with animated interface elements
 */

'use client';

import { useEffect, useRef } from 'react';
import { TYPE, SPACING, COLORS, getFont, setTextStyle, setupResponsiveCanvas, getResponsiveFontSize, getResponsiveSpacing } from '@/lib/athletes-first/diagram-tokens';

export default function InteractivePitchInterfaceDiagram() {
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
    const green = COLORS.brand.green;
    const cyan = COLORS.brand.cyan;
    const purple = COLORS.brand.purple;
    const red = COLORS.semantic.error;
    const gray = COLORS.mono.gray70;

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
      ctx.fillText('INTERACTIVE PITCH INTERFACE', width / 2, 35);

      const microSize = getResponsiveFontSize('micro', isMobile);
      ctx.font = `${microSize}px monospace`;
      ctx.fillStyle = gray;
      ctx.fillText('Real-time contract modeling, NIL projections, and career pathways', width / 2, 55);

      // Three panels layout
      const panelMargin = getResponsiveSpacing(20, isMobile);
      const panelSpacing = getResponsiveSpacing(15, isMobile);
      const topPanelY = 85;
      const topPanelHeight = 280;
      const bottomPanelY = topPanelY + topPanelHeight + panelSpacing;
      const bottomPanelHeight = height - bottomPanelY - 60;

      // Panel 1: Contract Comparison (top, full width)
      const panel1X = panelMargin;
      const panel1Width = width - 2 * panelMargin;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(panel1X, topPanelY, panel1Width, topPanelHeight);
      ctx.strokeStyle = `${cyan}60`;
      ctx.lineWidth = 2;
      ctx.strokeRect(panel1X, topPanelY, panel1Width, topPanelHeight);

      // Panel 1 header
      ctx.fillStyle = `${cyan}20`;
      ctx.fillRect(panel1X, topPanelY, panel1Width, 35);

      ctx.fillStyle = cyan;
      const headerSize = getResponsiveFontSize('body', isMobile);
      ctx.font = `bold ${headerSize}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('CONTRACT COMPARISON', panel1X + 15, topPanelY + 22);

      // Comparison table
      const offers = ['Offer A', 'Offer B', 'Offer C'];
      const metrics = ['Total Value', 'Guaranteed $', 'Signing Bonus', 'Year 1 Salary', 'Year 2 Salary'];
      const values = [
        ['$8.2M', '$6.5M', '$7.8M'],
        ['$4.1M', '$5.2M', '$3.9M'],
        ['$2.0M', '$1.5M', '$2.5M'],
        ['$1.2M', '$1.5M', '$1.1M'],
        ['$1.4M', '$1.8M', '$1.3M']
      ];

      const tableStartY = topPanelY + 50;

      if (isMobile) {
        // MOBILE: Show single offer (best one)
        const activeOffer = 1; // Middle offer (best one)
        const colWidth = panel1Width - 40;

        // Draw single offer card
        const headerColor = green;
        ctx.fillStyle = `${headerColor}30`;
        ctx.fillRect(panel1X + 20, tableStartY, colWidth - 40, 30);

        ctx.fillStyle = headerColor;
        ctx.textAlign = 'center';
        const captionSize = getResponsiveFontSize('caption', isMobile);
        ctx.font = `bold ${captionSize}px monospace`;
        ctx.fillText(offers[activeOffer].toUpperCase(), panel1X + colWidth / 2, tableStartY + 20);

        // Draw metrics for active offer
        metrics.forEach((metric, rowIndex) => {
          const y = tableStartY + 40 + rowIndex * 35;
          const microSizeRow = Math.max(11, getResponsiveFontSize('micro', isMobile));

          ctx.fillStyle = gray;
          ctx.font = `${microSizeRow}px monospace`;
          ctx.textAlign = 'left';
          ctx.fillText(metric, panel1X + 30, y + 20);

          ctx.fillStyle = green;
          ctx.font = `bold ${microSizeRow + 1}px monospace`;
          ctx.textAlign = 'right';
          ctx.fillText(values[rowIndex][activeOffer], panel1X + colWidth - 30, y + 20);
        });

        // Add "1 of 3" indicator
        ctx.fillStyle = gray;
        const microSizeIndicator = Math.max(11, getResponsiveFontSize('micro', isMobile));
        ctx.font = `${microSizeIndicator}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('Offer 2 of 3 (Best)', panel1X + colWidth / 2, tableStartY + 230);

      } else {
        // DESKTOP: Original 3-column layout
        const colWidth = (panel1Width - 180) / 3;
        const rowHeight = 38;

        // Table headers
        const microSizeHeader = Math.max(11, getResponsiveFontSize('micro', isMobile));
        ctx.font = `bold ${microSizeHeader}px monospace`;
        offers.forEach((offer, i) => {
          const x = panel1X + 120 + i * colWidth;
          const headerColor = i === 1 ? green : cyan;

          ctx.fillStyle = `${headerColor}30`;
          ctx.fillRect(x, tableStartY, colWidth - 5, 30);

          ctx.fillStyle = headerColor;
          ctx.textAlign = 'center';
          ctx.fillText(offer.toUpperCase(), x + colWidth / 2 - 2.5, tableStartY + 20);

          // Best offer indicator
          if (i === 1) {
            ctx.fillStyle = green;
            ctx.shadowColor = green;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(x + colWidth - 20, tableStartY + 15, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // Table rows
        metrics.forEach((metric, rowIndex) => {
          const y = tableStartY + 30 + rowIndex * rowHeight;
          const microSizeRow = Math.max(11, getResponsiveFontSize('micro', isMobile));

          // Metric label
          ctx.fillStyle = gray;
          ctx.font = `${microSizeRow}px monospace`;
          ctx.textAlign = 'left';
          ctx.fillText(metric, panel1X + 15, y + 22);

          // Values
          values[rowIndex].forEach((value, colIndex) => {
            const x = panel1X + 120 + colIndex * colWidth;
            const isHighlight = colIndex === 1 && (rowIndex === 0 || rowIndex === 1);

            ctx.fillStyle = isHighlight ? green : gray;
            ctx.font = isHighlight ? `bold ${microSizeRow + 1}px monospace` : `${microSizeRow}px monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(value, x + colWidth / 2 - 2.5, y + 22);
          });

          // Row separator
          if (rowIndex < metrics.length - 1) {
            ctx.strokeStyle = `${cyan}20`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(panel1X + 10, y + 35);
            ctx.lineTo(panel1X + panel1Width - 10, y + 35);
            ctx.stroke();
          }
        });
      }

      // Panel 2: NIL Calculator (bottom left)
      const panel2X = panelMargin;
      const panel2Width = (width - 2 * panelMargin - panelSpacing) / 2;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(panel2X, bottomPanelY, panel2Width, bottomPanelHeight);
      ctx.strokeStyle = `${purple}60`;
      ctx.lineWidth = 2;
      ctx.strokeRect(panel2X, bottomPanelY, panel2Width, bottomPanelHeight);

      // Panel 2 header
      ctx.fillStyle = `${purple}20`;
      ctx.fillRect(panel2X, bottomPanelY, panel2Width, 35);

      ctx.fillStyle = purple;
      const header2Size = getResponsiveFontSize('body', isMobile);
      ctx.font = `bold ${header2Size}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('LIVE NIL CALCULATOR', panel2X + 15, bottomPanelY + 22);

      // NIL projections
      const nilY = bottomPanelY + 55;
      const nilMetrics = [
        { label: 'Social Following', value: '2.4M', sublabel: 'Instagram + TikTok' },
        { label: 'Engagement Rate', value: '8.2%', sublabel: 'Above average' },
        { label: 'Est. Post Value', value: '$12K-$18K', sublabel: 'Per branded post' },
        { label: 'Annual Potential', value: '$180K-$280K', sublabel: '15-20 deals/year' }
      ];

      nilMetrics.forEach((metric, i) => {
        const y = nilY + i * 65;
        const microSizeNil = Math.max(11, getResponsiveFontSize('micro', isMobile));

        ctx.fillStyle = gray;
        ctx.font = `${microSizeNil}px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(metric.label.toUpperCase(), panel2X + 15, y);

        ctx.fillStyle = purple;
        const nilValueSize = getResponsiveFontSize('h2', isMobile);
        ctx.font = `bold ${nilValueSize}px monospace`;
        ctx.fillText(metric.value, panel2X + 15, y + 25);

        ctx.fillStyle = `${purple}80`;
        const microSizeSub = Math.max(11, getResponsiveFontSize('micro', isMobile));
        ctx.font = `${microSizeSub}px monospace`;
        ctx.fillText(metric.sublabel, panel2X + 15, y + 42);
      });

      // Panel 3: Career Pathway (bottom right)
      const panel3X = panel2X + panel2Width + panelSpacing;
      const panel3Width = panel2Width;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(panel3X, bottomPanelY, panel3Width, bottomPanelHeight);
      ctx.strokeStyle = `${gold}60`;
      ctx.lineWidth = 2;
      ctx.strokeRect(panel3X, bottomPanelY, panel3Width, bottomPanelHeight);

      // Panel 3 header
      ctx.fillStyle = `${gold}20`;
      ctx.fillRect(panel3X, bottomPanelY, panel3Width, 35);

      ctx.fillStyle = gold;
      const header3Size = getResponsiveFontSize('body', isMobile);
      ctx.font = `bold ${header3Size}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('3-YEAR CAREER PROJECTION', panel3X + 15, bottomPanelY + 22);

      // Career timeline visualization
      const timelineY = bottomPanelY + 65;
      const years = ['Year 1', 'Year 2', 'Year 3'];
      const earnings = [
        { contract: 1.2, nil: 0.2, total: 1.4 },
        { contract: 1.4, nil: 0.28, total: 1.68 },
        { contract: 1.8, nil: 0.35, total: 2.15 }
      ];

      const barWidth = 60;
      const barSpacing = (panel3Width - 40 - 3 * barWidth) / 2;

      years.forEach((year, i) => {
        const x = panel3X + 20 + i * (barWidth + barSpacing);
        const earning = earnings[i];
        const maxHeight = bottomPanelHeight - 130;
        const totalHeight = (earning.total / 2.15) * maxHeight;
        const contractHeight = (earning.contract / earning.total) * totalHeight;
        const nilHeight = (earning.nil / earning.total) * totalHeight;

        // Contract bar
        const barY = timelineY + maxHeight - totalHeight;
        ctx.fillStyle = green;
        ctx.fillRect(x, barY, barWidth, contractHeight);

        // NIL bar
        ctx.fillStyle = purple;
        ctx.fillRect(x, barY + contractHeight, barWidth, nilHeight);

        // Total label
        ctx.fillStyle = gold;
        const captionSizeBar = getResponsiveFontSize('caption', isMobile);
        ctx.font = `bold ${captionSizeBar}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`$${earning.total}M`, x + barWidth / 2, barY - 10);

        // Year label
        ctx.fillStyle = gray;
        const microSizeBar = Math.max(11, getResponsiveFontSize('micro', isMobile));
        ctx.font = `${microSizeBar}px monospace`;
        ctx.fillText(year, x + barWidth / 2, timelineY + maxHeight + 20);
      });

      // Legend
      const legendY = bottomPanelY + bottomPanelHeight - 35;
      const microSizeLegend = Math.max(11, getResponsiveFontSize('micro', isMobile));
      ctx.fillStyle = green;
      ctx.fillRect(panel3X + 20, legendY, 12, 12);
      ctx.fillStyle = gray;
      ctx.font = `${microSizeLegend}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('Contract', panel3X + 38, legendY + 10);

      ctx.fillStyle = purple;
      ctx.fillRect(panel3X + 120, legendY, 12, 12);
      ctx.fillText('NIL', panel3X + 138, legendY + 10);

      // Bottom insight
      ctx.fillStyle = gold;
      const bodySizeCta = getResponsiveFontSize('body', isMobile);
      ctx.font = `bold ${bodySizeCta}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('FAMILIES MAKE DECISIONS 30% FASTER', width / 2, height - 25);

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
    <div className="relative w-full h-full min-h-[550px] md:min-h-[700px] bg-black rounded-lg border border-[COLORS.brand.terminalGold]/20 overflow-hidden">
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
