/**
 * Retail Beta Timeline Diagram
 * Milestone-based product development roadmap with canvas-based animation
 * Shows phase progression, deliverables, and timeline visualization
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface Phase {
  name: string;
  timeline: string;
  milestone: string;
  deliverables: string[];
  color: string;
  borderColor: string;
  startWeek: number;
  endWeek: number;
}

export default function RetailBetaTimelineDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const phases: Phase[] = [
    {
      name: 'Phase 1',
      timeline: 'Weeks 1-4',
      milestone: 'Frankenstein Prototypes + Mustard Test',
      deliverables: [
        'Hand-assembled prototypes',
        'Mustard test validation',
        'Liner dimension optimization',
        '3D-printed dispenser mockup'
      ],
      color: 'border-blue-500/50',
      borderColor: 'rgba(59, 130, 246, 0.8)',
      startWeek: 0,
      endWeek: 4
    },
    {
      name: 'Phase 2',
      timeline: 'Weeks 5-12',
      milestone: '5K-10K Pilot + Retail Beta + Provisional Patent',
      deliverables: [
        'Contract manufacturer pilot run',
        '25-50 boutique retail beta',
        'Provisional patent filing',
        'Customer feedback collection'
      ],
      color: 'border-purple-500/50',
      borderColor: 'rgba(139, 92, 246, 0.8)',
      startWeek: 4,
      endWeek: 12
    },
    {
      name: 'Phase 3',
      timeline: 'Months 4-9',
      milestone: 'Automated Production + Certification + Scale',
      deliverables: [
        'Automated interfold line',
        'Compostability certification',
        'Retail expansion',
        'DTC subscription launch'
      ],
      color: 'border-green-500/50',
      borderColor: 'rgba(34, 197, 94, 0.8)',
      startWeek: 12,
      endWeek: 36
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup responsive canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const draw = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      // Draw background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(245, 241, 232, 0.95)');
      bgGradient.addColorStop(1, 'rgba(255, 250, 245, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw timeline at completion (week 36)
      drawTimeline(ctx, width, height);

      // Draw phase progression at 100%
      drawPhaseProgression(ctx, width, height);

      // Draw milestone markers all reached
      drawMilestoneMarkers(ctx, width, height);
    };

    setupCanvas();
    draw();

    window.addEventListener('resize', () => {
      setupCanvas();
      draw();
    });

    return () => {
      window.removeEventListener('resize', draw);
    };
  }, []);

  // Draw timeline base
  const drawTimeline = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const timelineY = height * 0.5;
    const startX = width * 0.1;
    const endX = width * 0.9;
    const totalWeeks = 36;

    // Timeline base line
    ctx.strokeStyle = 'rgba(45, 45, 45, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, timelineY);
    ctx.lineTo(endX, timelineY);
    ctx.stroke();

    // Week markers
    for (let week = 0; week <= totalWeeks; week += 4) {
      const x = startX + ((endX - startX) * (week / totalWeeks));

      ctx.strokeStyle = 'rgba(45, 45, 45, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, timelineY - 8);
      ctx.lineTo(x, timelineY + 8);
      ctx.stroke();

      // Week label
      ctx.font = '10px system-ui';
      ctx.fillStyle = 'rgba(45, 45, 45, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText(week === 0 ? 'Start' : `W${week}`, x, timelineY + 25);
    }

    // Completion marker at week 36
    const currentX = endX;

    ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(currentX, timelineY - 50);
    ctx.lineTo(currentX, timelineY + 50);
    ctx.stroke();
    ctx.setLineDash([]);

    // Completion marker
    ctx.beginPath();
    ctx.arc(currentX, timelineY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 1)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(74, 222, 128, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Completion label
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = 'rgba(74, 222, 128, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('Complete', currentX, timelineY - 60);
  };

  // Draw phase progression bars
  const drawPhaseProgression = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const startX = width * 0.1;
    const endX = width * 0.9;
    const timelineWidth = endX - startX;
    const totalWeeks = 36;

    phases.forEach((phase, index) => {
      const phaseStartX = startX + (timelineWidth * (phase.startWeek / totalWeeks));
      const phaseEndX = startX + (timelineWidth * (phase.endWeek / totalWeeks));
      const phaseWidth = phaseEndX - phaseStartX;

      const y = height * 0.3 + (index * 25);

      // Phase bar background
      ctx.fillStyle = 'rgba(232, 223, 208, 0.4)';
      ctx.fillRect(phaseStartX, y, phaseWidth, 18);

      // Phase progress at 100%
      const progress = 1;

      const progressGradient = ctx.createLinearGradient(phaseStartX, y, phaseEndX, y);
      progressGradient.addColorStop(0, phase.borderColor);
      progressGradient.addColorStop(1, phase.borderColor.replace('0.8', '0.4'));

      ctx.fillStyle = progressGradient;
      ctx.fillRect(phaseStartX, y, phaseWidth, 18);

      // Phase border
      ctx.strokeStyle = phase.borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(phaseStartX, y, phaseWidth, 18);

      // Phase label
      ctx.font = 'bold 11px system-ui';
      ctx.fillStyle = 'var(--color-text-dark)';
      ctx.textAlign = 'left';
      ctx.fillText(phase.name, phaseStartX + 8, y + 12);

      // Progress percentage - always 100%
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(42, 157, 143, 1)';
      ctx.fillText('100%', phaseEndX - 8, y + 12);
    });
  };

  // Draw milestone markers
  const drawMilestoneMarkers = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const startX = width * 0.1;
    const endX = width * 0.9;
    const timelineWidth = endX - startX;
    const timelineY = height * 0.5;
    const totalWeeks = 36;

    const milestones = [
      { week: 4, label: 'Prototype', color: 'rgba(59, 130, 246, 0.8)' },
      { week: 12, label: 'Pilot', color: 'rgba(139, 92, 246, 0.8)' },
      { week: 36, label: 'Scale', color: 'rgba(34, 197, 94, 0.8)' }
    ];

    milestones.forEach((milestone) => {
      const x = startX + (timelineWidth * (milestone.week / totalWeeks));

      // Milestone marker
      ctx.beginPath();
      ctx.moveTo(x, timelineY - 20);
      ctx.lineTo(x + 8, timelineY - 35);
      ctx.lineTo(x - 8, timelineY - 35);
      ctx.closePath();
      ctx.fillStyle = milestone.color;
      ctx.fill();

      ctx.strokeStyle = milestone.color.replace('0.8', '1');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Milestone label
      ctx.font = 'bold 10px system-ui';
      ctx.fillStyle = milestone.color.replace('0.8', '1');
      ctx.textAlign = 'center';
      ctx.fillText(milestone.label, x, timelineY - 40);
    });
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-[#2D2D2D]">Product Development Roadmap</h3>

      {/* Canvas Visualization */}
      <div className="relative bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl overflow-hidden mb-6 sm:mb-8 h-[250px] sm:h-[300px] md:h-[350px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {phases.map((phase, index) => (
          <div key={index} className={`bg-white border-2 ${phase.color} rounded-2xl p-4 sm:p-6 shadow-sm hover:border-opacity-60 transition-all`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h4 className="font-bold text-[#2D2D2D] text-base sm:text-lg mb-1">{phase.name}</h4>
                <p className="text-xs sm:text-sm text-[#2D2D2D]/60">{phase.timeline}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-[#F5F1E8] border-2 border-gray-200">
                  <span className="text-xs sm:text-sm font-medium text-[#2D2D2D]">{phase.milestone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {phase.deliverables.map((deliverable, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2A9D8F] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs sm:text-sm text-[#2D2D2D]/80">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-200">
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm text-[#2D2D2D]/70">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#3B82F6]"></div>
            <span>Validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#8B5CF6]"></div>
            <span>Beta Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#2A9D8F]"></div>
            <span>Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
