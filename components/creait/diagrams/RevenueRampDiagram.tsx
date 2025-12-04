'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * RevenueRampDiagram - Stepped growth chart showing 12-month revenue progression
 *
 * Shows:
 * - Month 3: 5 customers, $30K ARR (step 1)
 * - Month 6: 30 customers, $180K ARR (step 2)
 * - Month 9: 50 customers, $300K ARR (step 3)
 * - Month 12: 60 customers, $361K ARR (step 4)
 * - Animated climb from step to step
 * - Customer icons (👤) accumulating at each milestone
 */
export default function RevenueRampDiagram() {
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

    const milestones = [
      {
        month: 3,
        label: 'Month 3',
        customers: 5,
        arr: '$30K',
        description: 'MVP Launch + Pilots',
        color: CRE_COLORS.score.medium,
        stepHeight: 0.25,
        delay: 0.2,
      },
      {
        month: 6,
        label: 'Month 6',
        customers: 30,
        arr: '$180K',
        description: 'Product-Market Fit',
        color: CRE_COLORS.score.high,
        stepHeight: 0.5,
        delay: 0.4,
      },
      {
        month: 9,
        label: 'Month 9',
        customers: 50,
        arr: '$300K',
        description: 'Scale Marketing',
        color: CRE_COLORS.primary,
        stepHeight: 0.75,
        delay: 0.6,
      },
      {
        month: 12,
        label: 'Month 12',
        customers: 60,
        arr: '$361K',
        description: 'Target Achieved',
        color: CRE_COLORS.success,
        stepHeight: 0.9,
        delay: 0.8,
      },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const padding = 80;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      const stepWidth = chartWidth / milestones.length;

      // Draw baseline
      const baselineY = padding + chartHeight;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, baselineY);
      ctx.lineTo(padding + chartWidth, baselineY);
      ctx.stroke();

      // Draw steps
      milestones.forEach((milestone, index) => {
        const stepOpacity = Math.min(Math.max((progress - milestone.delay) * 3, 0), 1);

        if (stepOpacity > 0) {
          const x = padding + index * stepWidth;
          const stepY = padding + chartHeight * (1 - milestone.stepHeight);

          // Draw step (bar)
          const barWidth = stepWidth * 0.7;
          const barX = x + stepWidth * 0.15;

          // Gradient fill
          const gradient = ctx.createLinearGradient(barX, stepY, barX, baselineY);
          gradient.addColorStop(0, milestone.color);
          gradient.addColorStop(1, `${milestone.color}60`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(barX, stepY, barWidth, baselineY - stepY, [8, 8, 0, 0]);
          ctx.fill();

          // Bar border
          ctx.strokeStyle = milestone.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // ARR value on top of bar
          ctx.fillStyle = milestone.color;
          ctx.font = 'bold 24px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(milestone.arr, barX + barWidth / 2, stepY - 15);

          // Month label below baseline
          ctx.fillStyle = `rgba(255, 255, 255, ${stepOpacity * 0.7})`;
          ctx.font = 'bold 13px Inter, sans-serif';
          ctx.fillText(milestone.label, barX + barWidth / 2, baselineY + 25);

          // Description below month
          ctx.fillStyle = `rgba(255, 255, 255, ${stepOpacity * 0.5})`;
          ctx.font = '11px Inter, sans-serif';
          ctx.fillText(milestone.description, barX + barWidth / 2, baselineY + 42);

          // Customer count with icons
          const customerY = stepY + (baselineY - stepY) / 2;

          // Customer count badge
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = milestone.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(barX + barWidth / 2 - 30, customerY - 18, 60, 36, 6);
          ctx.fill();
          ctx.stroke();

          // Icon + number
          ctx.font = '16px sans-serif';
          ctx.fillText('👤', barX + barWidth / 2 - 12, customerY + 3);

          ctx.fillStyle = milestone.color;
          ctx.font = 'bold 16px Inter, sans-serif';
          ctx.fillText(milestone.customers.toString(), barX + barWidth / 2 + 10, customerY + 3);

          // Growth arrow (between steps)
          if (index > 0 && stepOpacity > 0.5) {
            const prevMilestone = milestones[index - 1];
            const prevStepOpacity = Math.min(Math.max((progress - prevMilestone.delay) * 3, 0), 1);

            if (prevStepOpacity > 0) {
              const prevX = padding + (index - 1) * stepWidth + stepWidth * 0.15 + stepWidth * 0.7;
              const prevY = padding + chartHeight * (1 - prevMilestone.stepHeight);

              const arrowOpacity = (stepOpacity - 0.5) * 2;

              // Arrow curve
              ctx.strokeStyle = `rgba(14, 165, 233, ${arrowOpacity * 0.6})`;
              ctx.lineWidth = 3;
              ctx.setLineDash([5, 5]);
              ctx.beginPath();
              ctx.moveTo(prevX, prevY + 20);
              ctx.lineTo(barX - 10, stepY + 20);
              ctx.stroke();
              ctx.setLineDash([]);

              // Arrow head
              ctx.fillStyle = `rgba(14, 165, 233, ${arrowOpacity})`;
              ctx.beginPath();
              ctx.moveTo(barX - 10, stepY + 20);
              ctx.lineTo(barX - 18, stepY + 15);
              ctx.lineTo(barX - 18, stepY + 25);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      });

      // Draw growth percentage badges
      if (progress > 1) {
        const badgeOpacity = Math.min((progress - 1) * 2, 1);

        // Calculate growth rates
        const growthRates = [
          { from: 0, to: 1, rate: '+500%' }, // 5 → 30
          { from: 1, to: 2, rate: '+67%' },  // 30 → 50
          { from: 2, to: 3, rate: '+20%' },  // 50 → 60
        ];

        growthRates.forEach(({ from, to, rate }, index) => {
          const x1 = padding + from * stepWidth + stepWidth * 0.85;
          const x2 = padding + to * stepWidth + stepWidth * 0.15;
          const midX = (x1 + x2) / 2;
          const y = padding + 40;

          ctx.fillStyle = `rgba(16, 185, 129, ${badgeOpacity * 0.2})`;
          ctx.strokeStyle = CRE_COLORS.success;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(midX - 35, y - 15, 70, 30, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = CRE_COLORS.success;
          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(rate, midX, y + 3);
        });
      }

      // Title
      if (progress > 1.1) {
        const titleOpacity = Math.min((progress - 1.1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * 0.8})`;
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('12-Month Revenue Ramp', width / 2, 25);
      }

      // Animate
      if (progress < 1.5) {
        progress += 0.008;
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
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxHeight: '600px' }}
      />
    </div>
  );
}
