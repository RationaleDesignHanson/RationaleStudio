/**
 * Dispenser Flow Demo
 * Interactive product demonstration with tabbed interface
 * Shows step-by-step usage flow with canvas-based visualization
 */

'use client';

import { useState, useEffect, useRef } from 'react';

type DemoView = 'pull' | 'wrap' | 'dispose' | 'overview';

interface Step {
  id: DemoView;
  title: string;
  description: string;
  detail: string;
  duration: string;
}

export default function DispenserFlowDemo() {
  const [activeView, setActiveView] = useState<DemoView>('overview');
  const [stepProgress, setStepProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const steps: Step[] = [
    {
      id: 'overview',
      title: 'Complete Flow',
      description: 'Full usage cycle',
      detail: 'See the entire 3-second disposal process from pull to finish',
      duration: '~3 sec'
    },
    {
      id: 'pull',
      title: 'Step 1: Pull',
      description: 'One-hand retrieval',
      detail: 'Interfold design enables single-bag extraction with one hand',
      duration: '0.5 sec'
    },
    {
      id: 'wrap',
      title: 'Step 2: Wrap',
      description: 'Secure enclosure',
      detail: 'Flexible liner wraps and seals waste completely inside',
      duration: '1.5 sec'
    },
    {
      id: 'dispose',
      title: 'Step 3: Dispose',
      description: 'Zero-contact drop',
      detail: 'Tied bag goes directly into trash - no touching, no residue',
      duration: '1 sec'
    }
  ];

  // Animation progress
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.01;
      if (progress >= 1) progress = 0;
      setStepProgress(progress);
    }, 50);

    return () => clearInterval(interval);
  }, [activeView]);

  // Canvas animation
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
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, width, height);

      // Draw based on active view
      switch (activeView) {
        case 'overview':
          drawOverview(ctx, width, height, stepProgress);
          break;
        case 'pull':
          drawPullStep(ctx, width, height, stepProgress);
          break;
        case 'wrap':
          drawWrapStep(ctx, width, height, stepProgress);
          break;
        case 'dispose':
          drawDisposeStep(ctx, width, height, stepProgress);
          break;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeView, stepProgress]);

  // Draw overview - all three steps in sequence
  const drawOverview = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    const centerY = height * 0.5;
    const spacing = width / 4;

    // Step indicators
    const steps = [
      { x: spacing, label: 'PULL', color: 'rgba(59, 130, 246, 0.8)' },
      { x: spacing * 2, label: 'WRAP', color: 'rgba(139, 92, 246, 0.8)' },
      { x: spacing * 3, label: 'DISPOSE', color: 'rgba(34, 197, 94, 0.8)' }
    ];

    steps.forEach((step, index) => {
      const isActive = progress > index / 3 && progress < (index + 1) / 3;
      const stepProgress = isActive ? (progress - index / 3) * 3 : (progress > (index + 1) / 3 ? 1 : 0);

      // Step circle
      ctx.beginPath();
      ctx.arc(step.x, centerY, isActive ? 60 : 50, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? step.color : 'rgba(55, 65, 81, 0.5)';
      ctx.fill();

      if (isActive) {
        ctx.strokeStyle = step.color;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Glow effect
        ctx.shadowColor = step.color;
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Label
      ctx.font = 'bold 14px system-ui';
      ctx.fillStyle = isActive ? '#ffffff' : 'rgba(156, 163, 175, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(step.label, step.x, centerY + 5);

      // Progress indicator within active step
      if (isActive) {
        ctx.beginPath();
        ctx.arc(step.x, centerY, 70, -Math.PI / 2, -Math.PI / 2 + (stepProgress * Math.PI * 2));
        ctx.strokeStyle = step.color;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Connection line to next step
      if (index < steps.length - 1) {
        const nextStep = steps[index + 1];
        const lineProgress = progress > (index + 1) / 3 ? 1 : Math.max(0, (progress - index / 3) * 3);

        ctx.beginPath();
        ctx.moveTo(step.x + 60, centerY);
        ctx.lineTo(step.x + 60 + (nextStep.x - step.x - 120) * lineProgress, centerY);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Timeline at bottom
    ctx.fillStyle = 'rgba(75, 85, 99, 0.5)';
    ctx.fillRect(spacing * 0.5, height - 40, spacing * 3, 4);

    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.fillRect(spacing * 0.5, height - 40, spacing * 3 * progress, 4);

    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.textAlign = 'left';
    ctx.fillText('0s', spacing * 0.5, height - 20);
    ctx.textAlign = 'right';
    ctx.fillText('3s', spacing * 3.5, height - 20);
  };

  // Draw pull step
  const drawPullStep = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    const centerX = width * 0.5;
    const centerY = height * 0.4;

    // Dispenser box
    ctx.fillStyle = 'rgba(75, 85, 99, 0.6)';
    ctx.fillRect(centerX - 80, centerY - 100, 160, 80);
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 80, centerY - 100, 160, 80);

    // Dispenser opening
    ctx.fillStyle = 'rgba(17, 24, 39, 0.8)';
    ctx.fillRect(centerX - 60, centerY - 30, 120, 10);

    // Bag being pulled
    const pullDistance = progress * 120;
    const bagY = centerY - 25 + pullDistance;

    // Bag gradient
    const bagGradient = ctx.createLinearGradient(centerX, bagY, centerX, bagY + 60);
    bagGradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
    bagGradient.addColorStop(1, 'rgba(37, 99, 235, 0.8)');

    ctx.fillStyle = bagGradient;
    ctx.fillRect(centerX - 40, bagY, 80, 60);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 40, bagY, 80, 60);

    // Hand indicator
    if (progress > 0.3) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(centerX - 50, bagY + 30);
      ctx.lineTo(centerX - 40, bagY + 30);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 40, bagY + 30);
      ctx.lineTo(centerX + 50, bagY + 30);
      ctx.stroke();
    }

    // Interfold indicator showing next bag
    if (progress > 0.5) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillRect(centerX - 35, centerY - 25, 70, 10);
    }

    // Instruction text
    ctx.font = 'bold 16px system-ui';
    ctx.fillStyle = 'rgba(59, 130, 246, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('One-hand pull', centerX, height - 40);

    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('Interfold design = next bag ready', centerX, height - 20);
  };

  // Draw wrap step
  const drawWrapStep = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    // Waste item (abstract)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 30, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bag wrapping around
    const wrapAngle = progress * Math.PI * 2;

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      if (angle > wrapAngle) continue;

      const x1 = centerX + Math.cos(angle) * 50;
      const y1 = centerY + Math.sin(angle) * 50;
      const x2 = centerX + Math.cos(angle) * 70;
      const y2 = centerY + Math.sin(angle) * 70;

      const opacity = 0.4 + (i / 8) * 0.4;
      ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Complete wrap indicator
    if (progress > 0.8) {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 80, 80, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Checkmark
      ctx.strokeStyle = 'rgba(34, 197, 94, 1)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(centerX - 15, centerY - 60);
      ctx.lineTo(centerX - 5, centerY - 50);
      ctx.lineTo(centerX + 15, centerY - 70);
      ctx.stroke();
    }

    // Instruction text
    ctx.font = 'bold 16px system-ui';
    ctx.fillStyle = 'rgba(139, 92, 246, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('Wrap & seal', centerX, height - 40);

    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('Complete containment = zero contact', centerX, height - 20);
  };

  // Draw dispose step
  const drawDisposeStep = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => {
    const centerX = width * 0.5;
    const startY = height * 0.2;
    const endY = height * 0.7;

    // Sealed bag dropping
    const bagY = startY + (endY - startY) * progress;

    // Motion blur effect
    if (progress > 0.2) {
      for (let i = 0; i < 3; i++) {
        const blurY = bagY - (i * 15);
        const blurOpacity = 0.1 * (3 - i);

        ctx.fillStyle = `rgba(34, 197, 94, ${blurOpacity})`;
        ctx.beginPath();
        ctx.ellipse(centerX, blurY, 35, 45, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Main sealed bag
    const bagGradient = ctx.createRadialGradient(centerX, bagY, 10, centerX, bagY, 45);
    bagGradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
    bagGradient.addColorStop(1, 'rgba(22, 163, 74, 0.9)');

    ctx.fillStyle = bagGradient;
    ctx.beginPath();
    ctx.ellipse(centerX, bagY, 35, 45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tie at top
    ctx.strokeStyle = 'rgba(34, 197, 94, 1)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(centerX, bagY - 45, 8, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Trash bin
    const binY = endY + 50;
    ctx.fillStyle = 'rgba(75, 85, 99, 0.5)';
    ctx.fillRect(centerX - 60, binY, 120, 80);
    ctx.strokeStyle = 'rgba(107, 114, 128, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 60, binY, 120, 80);

    // Bin lid
    ctx.fillStyle = 'rgba(55, 65, 81, 0.8)';
    ctx.fillRect(centerX - 70, binY - 10, 140, 10);

    // Success indicator when bag reaches bin
    if (progress > 0.9) {
      const successY = height * 0.5;

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX + 80, successY, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Checkmark
      ctx.strokeStyle = 'rgba(34, 197, 94, 1)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(centerX + 70, successY);
      ctx.lineTo(centerX + 78, successY + 8);
      ctx.lineTo(centerX + 95, successY - 10);
      ctx.stroke();
    }

    // Instruction text
    ctx.font = 'bold 16px system-ui';
    ctx.fillStyle = 'rgba(34, 197, 94, 1)';
    ctx.textAlign = 'center';
    ctx.fillText('Zero-contact disposal', centerX, height - 40);

    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
    ctx.fillText('Directly to trash = no touching', centerX, height - 20);
  };

  const currentStep = steps.find(s => s.id === activeView) || steps[0];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="mb-6 sm:mb-8 text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Product Demonstration</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">
          Interactive walkthrough of the 3-second disposal process
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveView(step.id)}
            className={`
              flex-1 min-w-[140px] px-4 py-3 rounded-2xl text-sm font-medium transition-all
              ${activeView === step.id
                ? 'bg-[#F4A261]/10 border-2 border-[#F4A261] text-[#2D2D2D]'
                : 'bg-white border-2 border-gray-200 text-[#2D2D2D]/70 hover:border-[#F4A261]/50 hover:text-[#2D2D2D]'
              }
            `}
          >
            <div className="font-bold">{step.title}</div>
            <div className="text-xs mt-1 opacity-80">{step.duration}</div>
          </button>
        ))}
      </div>

      {/* Canvas Demo */}
      <div className="relative bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl overflow-hidden mb-6" style={{ height: '400px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>

      {/* Step Details */}
      <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-bold text-[#2D2D2D] text-base sm:text-lg mb-1">{currentStep.title}</h4>
            <p className="text-sm text-[#2D2D2D]/70">{currentStep.description}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#2D2D2D]/60 mb-1">Duration</div>
            <div className="text-sm font-bold text-[#F4A261]">{currentStep.duration}</div>
          </div>
        </div>
        <p className="text-sm text-[#2D2D2D]/80">{currentStep.detail}</p>
      </div>
    </div>
  );
}
