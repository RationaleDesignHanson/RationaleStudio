'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized Digital Twin Flow Diagram
 * 4-stage pipeline: Video Footage → AI Analysis → Digital Twin → Live Insights
 */
export default function DigitalTwinFlowDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'video-footage',
      title: 'Stage 1: Video Footage Capture',
      description:
        'Athletes record a single comprehensive video session capturing various movements, expressions, and poses for AI processing.',
      visual: (
        <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            🎥
          </div>
          <h4 className="text-xl font-bold text-blue-400 mb-3">Game Film Input</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>30-60 minute recording session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Multiple angles and poses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Facial expressions library</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              <span>Voice samples for audio synthesis</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Session Time', value: '30-60 min' },
        { label: 'One-Time', value: 'Yes' },
      ],
    },
    {
      id: 'ai-analysis',
      title: 'Stage 2: AI Analysis & Processing',
      description:
        'Advanced AI models analyze video to extract facial features, body movements, voice patterns, and create a detailed digital profile.',
      visual: (
        <div className="bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            🧠
          </div>
          <h4 className="text-xl font-bold text-purple-400 mb-3">Deep Learning Pipeline</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Facial mapping & recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Body pose estimation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Voice pattern analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Movement style extraction</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Processing', value: '2-4 hours' },
        { label: 'Accuracy', value: '95%+' },
      ],
    },
    {
      id: 'digital-twin',
      title: 'Stage 3: Digital Twin Creation',
      description:
        'AI generates a 3D digital replica of the athlete that can be animated, placed in any environment, and used to create unlimited content.',
      visual: (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            👤
          </div>
          <h4 className="text-xl font-bold text-green-400 mb-3">3D Model Generation</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Photo-realistic 3D avatar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Infinite pose variations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Custom environment placement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Brand-consistent styling</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Quality', value: 'Photo-real' },
        { label: 'Variations', value: 'Unlimited' },
      ],
    },
    {
      id: 'live-insights',
      title: 'Stage 4: Live Insights & Content Generation',
      description:
        'Digital twin enables real-time content creation for social media, brand deals, and marketing campaigns without additional filming.',
      visual: (
        <div className="bg-terminal-gold/20 border-2 border-terminal-gold/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            📊
          </div>
          <h4 className="text-xl font-bold text-terminal-gold mb-3">Content at Scale</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-terminal-gold mt-0.5">•</span>
              <span>Instant brand campaign assets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-gold mt-0.5">•</span>
              <span>Multi-platform content variations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-gold mt-0.5">•</span>
              <span>Performance analytics tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-terminal-gold mt-0.5">•</span>
              <span>$150K-$500K annual value per athlete</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Content', value: 'Unlimited' },
        { label: 'Value', value: '$150K-$500K' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Digital Twin Creation Pipeline
        </p>
        <p className="text-xs text-gray-500 mt-1">
          One session → infinite content
        </p>
      </div>

      <StepByStepDiagram steps={steps} title="4-Stage Process" allowNonLinear={true} />
    </div>
  );
}
