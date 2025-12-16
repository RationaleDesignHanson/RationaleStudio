'use client';

import { useEffect, useRef } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CANVAS_TYPOGRAPHY } from '@/lib/creait/design-tokens/canvas-typography';
import { CANVAS_SPACING } from '@/lib/creait/design-tokens/canvas-spacing';

/**
 * RoadmapGanttDiagram - Gantt chart showing 14-week MVP roadmap
 *
 * Shows:
 * - 6 sprints across 14 weeks
 * - Week 1-2: Sprint 1-2 (Scoring Engine + CRM Integration)
 * - Week 3-6: Sprint 3-4 (Email Gen + Dashboard)
 * - Week 7-10: Sprint 5 (Pilot Feedback + Iteration)
 * - Week 11-14: Sprint 6 (Scale Prep + Production)
 * - Animated progress bar showing current week
 */
export default function RoadmapGanttDiagram() {
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

    const sprints = [
      {
        name: 'Sprint 1-2',
        label: 'Scoring Engine',
        startWeek: 1,
        weeks: 2,
        color: CRE_COLORS.score.critical,
        tasks: ['Property data pipeline', 'Timing signal algorithms', 'Score calculation engine'],
      },
      {
        name: 'Sprint 3-4',
        label: 'CRM & Email',
        startWeek: 3,
        weeks: 4,
        color: CRE_COLORS.primary,
        tasks: ['CRM integration (Salesforce)', 'Email draft generation', 'Dashboard UI v1'],
      },
      {
        name: 'Sprint 5',
        label: 'Pilot Launch',
        startWeek: 7,
        weeks: 3,
        color: CRE_COLORS.secondary,
        tasks: ['5 pilot customers onboarding', 'User feedback collection', 'Bug fixes & iteration'],
      },
      {
        name: 'Sprint 6',
        label: 'Scale Prep',
        startWeek: 10,
        weeks: 5,
        color: CRE_COLORS.accent,
        tasks: ['Production infrastructure', 'Billing & auth', 'Marketing site launch'],
      },
    ];

    function draw() {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const padding = 60;
      const timelineY = 80;
      const rowHeight = 80;
      const weekWidth = (width - padding * 2) / 14; // 14 weeks total

      // Draw week headers
      const headerOpacity = Math.min(progress * 2, 1);
      if (headerOpacity > 0) {
        for (let week = 1; week <= 14; week++) {
          const x = padding + (week - 1) * weekWidth;

          ctx.fillStyle = `rgba(255, 255, 255, ${headerOpacity * CANVAS_TYPOGRAPHY.opacity.muted})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.fillText(`W${week}`, x + weekWidth / 2, timelineY - 15);

          // Week divider
          ctx.strokeStyle = `rgba(255, 255, 255, ${headerOpacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(x, timelineY);
          ctx.lineTo(x, height - padding);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Draw sprints as Gantt bars
      sprints.forEach((sprint, index) => {
        const sprintDelay = 0.2 + index * 0.2;
        const sprintOpacity = Math.min(Math.max((progress - sprintDelay) * 3, 0), 1);

        if (sprintOpacity > 0) {
          const y = timelineY + index * rowHeight;
          const x = padding + (sprint.startWeek - 1) * weekWidth;
          const barWidth = sprint.weeks * weekWidth;
          const barHeight = 50;

          // Sprint bar background
          const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
          gradient.addColorStop(0, `${sprint.color}80`);
          gradient.addColorStop(1, `${sprint.color}40`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth * sprintOpacity, barHeight, 8);
          ctx.fill();

          // Sprint bar border
          ctx.strokeStyle = sprint.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Sprint name
          ctx.fillStyle = `rgba(255, 255, 255, ${sprintOpacity * CANVAS_TYPOGRAPHY.opacity.secondary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodyLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'left';
          ctx.fillText(sprint.name, x + 12, y + 20);

          // Sprint label
          ctx.fillStyle = `rgba(255, 255, 255, ${sprintOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.fillText(sprint.label, x + 12, y + 36);

          // Tasks on right side
          if (sprintOpacity > 0.8) {
            const taskX = x + barWidth + 15;
            ctx.fillStyle = `rgba(255, 255, 255, ${(sprintOpacity - 0.8) * 5 * CANVAS_TYPOGRAPHY.opacity.muted})`;
            ctx.font = `${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
            ctx.textAlign = 'left';

            sprint.tasks.forEach((task, taskIndex) => {
              const taskY = y + 12 + taskIndex * 13;
              // Bullet point
              ctx.fillStyle = sprint.color;
              ctx.beginPath();
              ctx.arc(taskX, taskY - 3, 2, 0, Math.PI * 2);
              ctx.fill();

              // Task text
              ctx.fillStyle = `rgba(255, 255, 255, ${(sprintOpacity - 0.8) * 5 * CANVAS_TYPOGRAPHY.opacity.muted})`;
              ctx.fillText(task, taskX + 8, taskY);
            });
          }
        }
      });

      // Draw "current week" indicator (Week 4)
      if (progress > 1) {
        const currentWeek = 4;
        const indicatorOpacity = Math.min((progress - 1) * 2, 1);
        const x = padding + (currentWeek - 1) * weekWidth + weekWidth / 2;

        // Vertical line
        ctx.strokeStyle = `rgba(34, 197, 94, ${indicatorOpacity * 0.8})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(x, timelineY);
        ctx.lineTo(x, height - padding);
        ctx.stroke();

        // "TODAY" label
        ctx.fillStyle = `rgba(34, 197, 94, ${indicatorOpacity})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
        ctx.textAlign = 'center';
        ctx.fillText('TODAY', x, timelineY - 30);

        // Arrow pointing down
        ctx.fillStyle = `rgba(34, 197, 94, ${indicatorOpacity})`;
        ctx.beginPath();
        ctx.moveTo(x, timelineY - 10);
        ctx.lineTo(x - 5, timelineY - 18);
        ctx.lineTo(x + 5, timelineY - 18);
        ctx.closePath();
        ctx.fill();
      }

      // Draw milestone markers
      if (progress > 1.1) {
        const milestoneOpacity = Math.min((progress - 1.1) * 2, 1);
        const milestones = [
          { week: 2, label: 'MVP Core' },
          { week: 6, label: 'Beta Ready' },
          { week: 10, label: 'Pilots Live' },
          { week: 14, label: 'Production' },
        ];

        milestones.forEach((milestone) => {
          const x = padding + (milestone.week - 1) * weekWidth + weekWidth / 2;
          const y = height - padding + 15;

          // Diamond marker
          ctx.fillStyle = CRE_COLORS.accent;
          ctx.beginPath();
          ctx.moveTo(x, y - 8);
          ctx.lineTo(x + 6, y);
          ctx.lineTo(x, y + 8);
          ctx.lineTo(x - 6, y);
          ctx.closePath();
          ctx.fill();

          // Milestone label
          ctx.fillStyle = `rgba(6, 182, 212, ${milestoneOpacity * CANVAS_TYPOGRAPHY.opacity.tertiary})`;
          ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`;
          ctx.textAlign = 'center';
          ctx.fillText(milestone.label, x, y + 22);
        });
      }

      // Title
      if (progress > 1) {
        const titleOpacity = Math.min((progress - 1) * 2, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${titleOpacity * CANVAS_TYPOGRAPHY.opacity.primary})`;
        ctx.font = `bold ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`;
        ctx.textAlign = 'center';
        ctx.fillText('14-Week MVP Roadmap', width / 2, 30);
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
