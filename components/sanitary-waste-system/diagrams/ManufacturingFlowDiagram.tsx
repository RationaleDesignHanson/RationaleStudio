/**
 * Manufacturing Flow Diagram
 * Converter partnership process flow with canvas-based animation
 * Shows material transformation through production stages
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface ProcessStep {
  name: string;
  icon: string;
  step: string;
  x: number;
  active: boolean;
}

export default function ManufacturingFlowDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(true);
  const timeRef = useRef(0);
  const stepsRef = useRef<ProcessStep[]>([]);

  const steps = [
    { name: 'Airlaid + PBAT Webs', icon: '📄', step: '1' },
    { name: 'Cut & Place', icon: '✂️', step: '2' },
    { name: 'Hot Melt Bonding', icon: '🔥', step: '3' },
    { name: 'Interfolding', icon: '📦', step: '4' },
    { name: 'Pocket Pack', icon: '✅', step: '5' }
  ];

  // Initialize process steps
  useEffect(() => {
    stepsRef.current = steps.map((step, i) => ({
      ...step,
      x: 0,
      active: false
    }));
  }, []);

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

      timeRef.current += 0.015;

      // Draw background
      const bgGradient = ctx.createLinearGradient(0, 0, width, 0);
      bgGradient.addColorStop(0, 'rgba(17, 24, 39, 0.4)');
      bgGradient.addColorStop(0.5, 'rgba(31, 41, 55, 0.3)');
      bgGradient.addColorStop(1, 'rgba(17, 24, 39, 0.4)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw conveyor belt
      drawConveyorBelt(ctx, width, height, timeRef.current);

      // Draw material flow
      drawMaterialFlow(ctx, width, height, timeRef.current);

      // Draw process stages
      drawProcessStages(ctx, width, height, timeRef.current);

      // Draw quality indicators
      drawQualityIndicators(ctx, width, height, timeRef.current);

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

  // Draw conveyor belt
  const drawConveyorBelt = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const beltY = height * 0.5;
    const beltHeight = 8;

    // Belt gradient
    const beltGradient = ctx.createLinearGradient(0, beltY, 0, beltY + beltHeight);
    beltGradient.addColorStop(0, 'rgba(75, 85, 99, 0.6)');
    beltGradient.addColorStop(0.5, 'rgba(107, 114, 128, 0.4)');
    beltGradient.addColorStop(1, 'rgba(75, 85, 99, 0.6)');

    ctx.fillStyle = beltGradient;
    ctx.fillRect(width * 0.05, beltY, width * 0.9, beltHeight);

    // Moving lines on belt
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.lineDashOffset = -time * 30;

    ctx.beginPath();
    ctx.moveTo(width * 0.05, beltY + beltHeight / 2);
    ctx.lineTo(width * 0.95, beltY + beltHeight / 2);
    ctx.stroke();

    ctx.setLineDash([]);

    // Belt support rollers
    for (let i = 0; i <= 5; i++) {
      const x = width * 0.05 + (width * 0.9 * i / 5);
      const rollerRadius = 6;

      ctx.beginPath();
      ctx.arc(x, beltY + beltHeight + rollerRadius, rollerRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(55, 65, 81, 0.8)';
      ctx.fill();

      // Rotation indicator
      const rotation = time * 2 + i;
      ctx.save();
      ctx.translate(x, beltY + beltHeight + rollerRadius);
      ctx.rotate(rotation);
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(rollerRadius - 2, 0);
      ctx.stroke();
      ctx.restore();
    }
  };

  // Draw material flowing through stages
  const drawMaterialFlow = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const numMaterials = 8;
    const flowY = height * 0.5 - 30;

    for (let i = 0; i < numMaterials; i++) {
      const progress = ((time * 0.3 + i * 0.5) % 5) / 5;
      const x = width * 0.05 + (width * 0.9 * progress);

      // Determine material state based on progress
      let color, label;
      if (progress < 0.2) {
        // Raw material
        color = 'rgba(147, 197, 253, 0.7)';
        label = 'WEB';
      } else if (progress < 0.4) {
        // Cut
        color = 'rgba(167, 139, 250, 0.7)';
        label = 'CUT';
      } else if (progress < 0.6) {
        // Bonded
        color = 'rgba(251, 146, 60, 0.7)';
        label = 'BOND';
      } else if (progress < 0.8) {
        // Folded
        color = 'rgba(59, 130, 246, 0.7)';
        label = 'FOLD';
      } else {
        // Packed
        color = 'rgba(34, 197, 94, 0.7)';
        label = 'PACK';
      }

      // Material piece
      ctx.fillStyle = color;
      ctx.fillRect(x - 15, flowY, 30, 20);

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 15, flowY, 30, 20);

      // Label
      ctx.font = 'bold 8px system-ui';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, flowY + 13);

      // Material glow
      const glowGradient = ctx.createRadialGradient(x, flowY + 10, 0, x, flowY + 10, 25);
      glowGradient.addColorStop(0, color);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, flowY + 10, 25, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw process stage machines
  const drawProcessStages = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const stageY = height * 0.25;
    const stageWidth = (width * 0.9) / 5;
    const startX = width * 0.05;

    steps.forEach((step, index) => {
      const x = startX + (stageWidth * index) + stageWidth / 2;
      const isActive = Math.floor(time * 0.3 % 5) === index;

      // Machine body
      ctx.fillStyle = isActive ? 'rgba(139, 92, 246, 0.3)' : 'rgba(55, 65, 81, 0.5)';
      ctx.fillRect(x - 30, stageY, 60, 50);

      ctx.strokeStyle = isActive ? 'rgba(167, 139, 250, 0.8)' : 'rgba(75, 85, 99, 0.6)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 30, stageY, 60, 50);

      // Activity indicator
      if (isActive) {
        const pulse = Math.sin(time * 5) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(139, 92, 246, ${pulse})`;
        ctx.beginPath();
        ctx.arc(x + 20, stageY + 10, 5, 0, Math.PI * 2);
        ctx.fill();

        // Processing effect
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.5 - i * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, stageY + 25, 15 + i * 10 + Math.sin(time * 3) * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Step number
      ctx.font = 'bold 12px system-ui';
      ctx.fillStyle = isActive ? 'rgba(167, 139, 250, 1)' : 'rgba(156, 163, 175, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(step.step, x, stageY + 30);

      // Machine label
      ctx.font = 'bold 10px system-ui';
      ctx.fillStyle = isActive ? '#ffffff' : 'rgba(156, 163, 175, 0.8)';
      ctx.fillText(step.icon, x, stageY - 10);
    });
  };

  // Draw quality control indicators
  const drawQualityIndicators = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const indicatorY = height * 0.75;
    const spacing = width / 6;

    // Quality metrics
    const metrics = [
      { label: 'Thickness', value: 85 + Math.sin(time) * 5, color: 'rgba(34, 197, 94, 0.8)' },
      { label: 'Bond Strength', value: 90 + Math.sin(time * 1.2) * 5, color: 'rgba(59, 130, 246, 0.8)' },
      { label: 'Fold Accuracy', value: 88 + Math.sin(time * 0.8) * 5, color: 'rgba(139, 92, 246, 0.8)' }
    ];

    metrics.forEach((metric, index) => {
      const x = spacing + (spacing * index * 1.2);
      const barHeight = 40;
      const barWidth = 15;
      const fillHeight = (metric.value / 100) * barHeight;

      // Bar background
      ctx.fillStyle = 'rgba(55, 65, 81, 0.5)';
      ctx.fillRect(x - barWidth / 2, indicatorY - barHeight, barWidth, barHeight);

      // Bar fill
      const barGradient = ctx.createLinearGradient(x, indicatorY - fillHeight, x, indicatorY);
      barGradient.addColorStop(0, metric.color);
      barGradient.addColorStop(1, metric.color.replace('0.8', '0.4'));
      ctx.fillStyle = barGradient;
      ctx.fillRect(x - barWidth / 2, indicatorY - fillHeight, barWidth, fillHeight);

      // Border
      ctx.strokeStyle = metric.color;
      ctx.lineWidth = 1;
      ctx.strokeRect(x - barWidth / 2, indicatorY - barHeight, barWidth, barHeight);

      // Value
      ctx.font = 'bold 10px system-ui';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(metric.value)}%`, x, indicatorY - barHeight - 5);

      // Label
      ctx.font = '9px system-ui';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.fillText(metric.label, x, indicatorY + 15);
    });
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Manufacturing Process Flow</h3>

      {/* Canvas Animation */}
      <div className="relative bg-gray-950/50 border border-gray-800 rounded-lg overflow-hidden mb-6 sm:mb-8" style={{ height: '400px' }}>
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

      {/* Process Steps */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 mb-6 sm:mb-8">
        {steps.map((step, index) => (
          <div key={index} className="w-full md:flex-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">Step {step.step}</div>
              <div className="text-3xl sm:text-4xl mb-2">{step.icon}</div>
              <div className="text-xs sm:text-sm font-medium text-white">{step.name}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex md:hidden items-center justify-center my-2">
                <svg className="w-4 h-4 text-green-500 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Partner Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gray-800/50 border border-green-700/50 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-green-400 mb-2 text-sm sm:text-base">Type A: Wet Wipe Manufacturers</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Best fit. Experts in airlaid/non-wovens and interfolding. Run "dry line" with bioplastic film.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-gray-300 mb-2 text-sm sm:text-base">Type B: Flexible Packaging</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Lamination and bag-making expertise. May struggle with thick paper component.
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-gray-300 mb-2 text-sm sm:text-base">Type C: Label Converters</h4>
          <p className="text-xs sm:text-sm text-gray-400">
            Tipping capabilities. Slower batch process for "tip" liner inside bag.
          </p>
        </div>
      </div>

      {/* Geography */}
      <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 justify-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">China/Turkey:</span>
            <span className="text-white">Cost-optimized</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">USA:</span>
            <span className="text-white">Speed + Quality</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-gray-400">CAPEX:</span>
            <span className="text-green-400">$40K-80K (mid-range)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
