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
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const timeRef = useRef(0);

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

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Animation loop
    const animate = () => {
      if (!isAnimating) return;

      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.02;

      // Draw background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, 'rgba(17, 24, 39, 0.3)');
      bgGradient.addColorStop(1, 'rgba(17, 24, 39, 0.5)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw timeline
      drawTimeline(ctx, width, height, timeRef.current);

      // Draw phase progression
      drawPhaseProgression(ctx, width, height, timeRef.current);

      // Draw milestone markers
      drawMilestoneMarkers(ctx, width, height, timeRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating]);

  // Draw timeline base
  const drawTimeline = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const timelineY = height * 0.5;
    const startX = width * 0.1;
    const endX = width * 0.9;
    const totalWeeks = 36;

    // Timeline base line
    ctx.strokeStyle = 'rgba(75, 85, 99, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, timelineY);
    ctx.lineTo(endX, timelineY);
    ctx.stroke();

    // Week markers
    for (let week = 0; week <= totalWeeks; week += 4) {
      const x = startX + ((endX - startX) * (week / totalWeeks));

      ctx.strokeStyle = 'rgba(107, 114, 128, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, timelineY - 8);
      ctx.lineTo(x, timelineY + 8);
      ctx.stroke();

      // Week label
      ctx.font = '10px system-ui';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(week === 0 ? 'Start' : `W${week}`, x, timelineY + 25);
    }

    // Current time indicator (animated)
    const currentWeek = (Math.sin(time * 0.5) * 0.5 + 0.5) * totalWeeks;
    const currentX = startX + ((endX - startX) * (currentWeek / totalWeeks));

    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(currentX, timelineY - 50);
    ctx.lineTo(currentX, timelineY + 50);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current time marker
    ctx.beginPath();
    ctx.arc(currentX, timelineY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 92, 246, 1)';
    ctx.fill();

    ctx.strokeStyle = 'rgba(167, 139, 250, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Current week label
    ctx.font = 'bold 11px system-ui';
    ctx.fillStyle = 'rgba(167, 139, 250, 1)';
    ctx.textAlign = 'center';
    ctx.fillText(`Week ${Math.round(currentWeek)}`, currentX, timelineY - 60);
  };

  // Draw phase progression bars
  const drawPhaseProgression = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
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
      ctx.fillStyle = 'rgba(55, 65, 81, 0.3)';
      ctx.fillRect(phaseStartX, y, phaseWidth, 18);

      // Phase progress (animated)
      const progress = Math.min(1, Math.max(0, (Math.sin(time * 0.5) * 0.5 + 0.5) * 1.2 - index * 0.3));

      const progressGradient = ctx.createLinearGradient(phaseStartX, y, phaseEndX, y);
      progressGradient.addColorStop(0, phase.borderColor);
      progressGradient.addColorStop(1, phase.borderColor.replace('0.8', '0.4'));

      ctx.fillStyle = progressGradient;
      ctx.fillRect(phaseStartX, y, phaseWidth * progress, 18);

      // Phase border
      ctx.strokeStyle = phase.borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(phaseStartX, y, phaseWidth, 18);

      // Phase label
      ctx.font = 'bold 11px system-ui';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText(phase.name, phaseStartX + 8, y + 12);

      // Progress percentage
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'right';
      ctx.fillStyle = progress > 0.8 ? 'rgba(34, 197, 94, 1)' : 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(`${Math.round(progress * 100)}%`, phaseEndX - 8, y + 12);
    });
  };

  // Draw milestone markers
  const drawMilestoneMarkers = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
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

    milestones.forEach((milestone, index) => {
      const x = startX + (timelineWidth * (milestone.week / totalWeeks));
      const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7;

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

      // Milestone glow
      ctx.shadowColor = milestone.color;
      ctx.shadowBlur = 15 * pulse;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Milestone label
      ctx.font = 'bold 10px system-ui';
      ctx.fillStyle = milestone.color.replace('0.8', '1');
      ctx.textAlign = 'center';
      ctx.fillText(milestone.label, x, timelineY - 40);
    });
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Product Development Roadmap</h3>

      {/* Canvas Animation */}
      <div className="relative bg-gray-950/50 border border-gray-800 rounded-lg overflow-hidden mb-6 sm:mb-8" style={{ height: '350px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="absolute top-4 right-4 px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded text-xs text-gray-300 transition-colors backdrop-blur-sm"
        >
          {isAnimating ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {phases.map((phase, index) => (
          <div key={index} className={`bg-gray-800/50 border-2 ${phase.color} rounded-lg p-4 sm:p-6`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-1">{phase.name}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{phase.timeline}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700">
                  <span className="text-xs sm:text-sm font-medium text-white">{phase.milestone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {phase.deliverables.map((deliverable, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs sm:text-sm text-gray-300">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800">
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-500"></div>
            <span>Validation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-purple-500"></div>
            <span>Beta Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500"></div>
            <span>Scale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
