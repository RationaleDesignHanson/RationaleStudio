'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * UnitEconomicsFlowDiagram - Sankey-style flow showing revenue breakdown
 *
 * Shows:
 * - Left: Customer pays $499/mo (input)
 * - Middle: Split into CAC ($416 one-time), COGS ($100/mo), Margin ($399/mo)
 * - Right: LTV ($2,993) vs CAC ($416) = 7.2:1 ratio
 * - Animated flow from left → right with thickness = $ amount
 */
export default function UnitEconomicsFlowDiagram() {
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

    // Flow data
    const flows = [
      {
        from: { x: 0.15, y: 0.5 },
        to: { x: 0.45, y: 0.3 },
        label: 'CAC (one-time)',
        value: '$416',
        color: CRE_COLORS.score.high,
        thickness: 25,
        delay: 0.2,
      },
      {
        from: { x: 0.15, y: 0.5 },
        to: { x: 0.45, y: 0.5 },
        label: 'COGS (monthly)',
        value: '$100',
        color: CRE_COLORS.score.medium,
        thickness: 15,
        delay: 0.3,
      },
      {
        from: { x: 0.15, y: 0.5 },
        to: { x: 0.45, y: 0.7 },
        label: 'Gross Margin',
        value: '$399/mo',
        color: CRE_COLORS.success,
        thickness: 40,
        delay: 0.4,
      },
      {
        from: { x: 0.55, y: 0.7 },
        to: { x: 0.85, y: 0.5 },
        label: 'LTV (6 months)',
        value: '$2,993',
        color: CRE_COLORS.primary,
        thickness: 50,
        delay: 0.6,
      },
    ];

    function drawCurvedFlow(
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      thickness: number,
      color: string,
      opacity: number
    ) {
      const controlX = (fromX + toX) / 2;
      const controlY = (fromY + toY) / 2 - 50;

      // Draw thick curved line
      ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.quadraticCurveTo(controlX, controlY, toX, toY);
      ctx.stroke();

      // Add glow
      ctx.strokeStyle = `${color}${Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = thickness + 10;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.quadraticCurveTo(controlX, controlY, toX, toY);
      ctx.stroke();
    }

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      // === LEFT: INPUT (Customer Payment) ===
      const inputX = width * 0.15;
      const inputY = height * 0.5;
      const inputOpacity = Math.min(progress * 3, 1);

      if (inputOpacity > 0) {
        // Input node
        ctx.fillStyle = CRE_COLORS.primary;
        ctx.beginPath();
        ctx.arc(inputX, inputY, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Input label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$499', inputX, inputY - 5);

        ctx.font = '11px Inter, sans-serif';
        ctx.fillText('/month', inputX, inputY + 10);

        // "Customer Pays" label above
        ctx.fillStyle = `rgba(255, 255, 255, ${inputOpacity * 0.6})`;
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('Customer Pays', inputX, inputY - 60);
      }

      // === MIDDLE: BREAKDOWN (CAC, COGS, Margin) ===
      flows.slice(0, 3).forEach((flow) => {
        const flowOpacity = Math.min(Math.max((progress - flow.delay) * 3, 0), 1);

        if (flowOpacity > 0) {
          const fromX = width * flow.from.x;
          const fromY = height * flow.from.y;
          const toX = width * flow.to.x;
          const toY = height * flow.to.y;

          // Draw flow
          drawCurvedFlow(fromX, fromY, toX, toY, flow.thickness, flow.color, flowOpacity);

          // Destination node
          ctx.fillStyle = flow.color;
          ctx.beginPath();
          ctx.arc(toX, toY, 25, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          ctx.fillStyle = `rgba(255, 255, 255, ${flowOpacity * 0.8})`;
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(flow.label, toX - 35, toY - 5);

          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.fillText(flow.value, toX - 35, toY + 10);
        }
      });

      // === RIGHT: OUTPUT (LTV vs CAC) ===
      const ltvFlow = flows[3];
      const ltvOpacity = Math.min(Math.max((progress - ltvFlow.delay) * 3, 0), 1);

      if (ltvOpacity > 0) {
        const fromX = width * ltvFlow.from.x;
        const fromY = height * ltvFlow.from.y;
        const toX = width * ltvFlow.to.x;
        const toY = height * ltvFlow.to.y;

        // Draw LTV flow
        drawCurvedFlow(fromX, fromY, toX, toY, ltvFlow.thickness, ltvFlow.color, ltvOpacity);

        // LTV node (large)
        ctx.fillStyle = CRE_COLORS.primary;
        ctx.beginPath();
        ctx.arc(toX, toY, 45, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // LTV value
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$2,993', toX, toY - 5);

        ctx.font = '12px Inter, sans-serif';
        ctx.fillText('LTV', toX, toY + 15);

        // "Lifetime Value" label above
        ctx.fillStyle = `rgba(255, 255, 255, ${ltvOpacity * 0.6})`;
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText('Lifetime Value', toX, toY - 70);
      }

      // === BOTTOM: RATIO HIGHLIGHT ===
      if (progress > 0.9) {
        const ratioOpacity = Math.min((progress - 0.9) * 5, 1);

        const ratioY = height * 0.85;

        // Ratio box
        ctx.fillStyle = `rgba(14, 165, 233, ${ratioOpacity * 0.15})`;
        ctx.strokeStyle = CRE_COLORS.primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(width * 0.3, ratioY - 35, width * 0.4, 70, 12);
        ctx.fill();
        ctx.stroke();

        // Ratio text
        ctx.fillStyle = CRE_COLORS.primary;
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('7.2:1', width * 0.5, ratioY);

        ctx.fillStyle = `rgba(255, 255, 255, ${ratioOpacity * 0.7})`;
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillText('LTV:CAC Ratio', width * 0.5, ratioY + 25);

        // Checkmark
        ctx.strokeStyle = CRE_COLORS.success;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(width * 0.22, ratioY);
        ctx.lineTo(width * 0.25, ratioY + 8);
        ctx.lineTo(width * 0.28, ratioY - 8);
        ctx.stroke();

        // "Exceptional" label
        ctx.fillStyle = CRE_COLORS.success;
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('Exceptional', width * 0.2, ratioY + 5);
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * 0.8})`;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Unit Economics Flow', width / 2, 30);
      }

      // Animate
      if (progress < 1.5) {
        progress += 0.01;
        animationFrame = requestAnimationFrame(draw);
      }
    }

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '550px' }}
      />
    </div>
  );
}
