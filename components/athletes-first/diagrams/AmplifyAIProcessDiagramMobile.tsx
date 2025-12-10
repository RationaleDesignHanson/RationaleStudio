'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized AmplifyAI Process Diagram
 * 4-step workflow: Detect → Generate → Review → Execute
 */
export default function AmplifyAIProcessDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'detect',
      title: 'Step 1: Detect Viral Moment',
      description:
        'AI monitors social media in real-time to identify trending content, viral moments, and high-engagement opportunities for athletes.',
      visual: (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            ⚡
          </div>
          <h4 className="text-xl font-bold text-green-400 mb-3">Real-Time Monitoring</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Social media trend detection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Performance highlights tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Brand mention alerts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Engagement spike notifications</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Timeline', value: '1-12hrs' },
        { label: 'Automation', value: '100%' },
      ],
    },
    {
      id: 'generate',
      title: 'Step 2: Generate Content Variations',
      description:
        'AI creates multiple content variations optimized for different platforms and audiences, using athlete brand guidelines and tone.',
      visual: (
        <div className="bg-cyan-500/20 border-2 border-cyan-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            ∞
          </div>
          <h4 className="text-xl font-bold text-cyan-400 mb-3">Infinite Variations</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Platform-specific formatting (Instagram, TikTok, Twitter)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>A/B test caption variations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Hashtag optimization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Brand voice consistency</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Timeline', value: '13-24hrs' },
        { label: 'Variations', value: '10-20' },
      ],
    },
    {
      id: 'review',
      title: 'Step 3: Agent Review & Approval',
      description:
        'Agent reviews AI-generated content, makes final edits, and approves posts. Agent maintains full control over what gets published.',
      visual: (
        <div className="bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            ✓
          </div>
          <h4 className="text-xl font-bold text-purple-400 mb-3">Agent Control</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Review all generated content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Edit captions and messaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Approve or reject posts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Schedule optimal posting times</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Timeline', value: '25-36hrs' },
        { label: 'Agent Time', value: '5-10 min' },
      ],
    },
    {
      id: 'execute',
      title: 'Step 4: Multi-Platform Execution',
      description:
        'Approved content is automatically published across all platforms, tracked for performance, and optimized in real-time.',
      visual: (
        <div className="bg-pink-500/20 border-2 border-pink-500/50 rounded-lg p-6 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">
            →
          </div>
          <h4 className="text-xl font-bold text-pink-400 mb-3">Automated Distribution</h4>
          <ul className="text-left space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span>Cross-platform publishing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span>Real-time performance tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span>Engagement analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-0.5">•</span>
              <span>ROI attribution reporting</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Timeline', value: '37-48hrs' },
        { label: 'Platforms', value: '5+' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          AmplifyAI Execution Workflow
        </p>
        <p className="text-xs text-gray-500 mt-1">
          48-72 hour viral content amplification
        </p>
      </div>

      <StepByStepDiagram steps={steps} title="4-Step Process" allowNonLinear={true} />
    </div>
  );
}
