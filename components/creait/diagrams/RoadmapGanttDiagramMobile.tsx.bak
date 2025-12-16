'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized CREaiT Roadmap Gantt Diagram
 *
 * Shows 14-week MVP roadmap as step-by-step wizard
 * Each sprint becomes a step with details and metrics
 */
export default function RoadmapGanttDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'sprint-1-2',
      title: 'Sprint 1-2: Scoring Engine',
      description:
        'Build the core property scoring system with timing signals and data pipeline integration.',
      visual: (
        <div className="space-y-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-red-400 mb-3">Key Deliverables</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Property data pipeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Timing signal algorithms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Score calculation engine</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Duration', value: 'Week 1-2' },
        { label: 'Team', value: '2 engineers' },
        { label: 'Status', value: 'Foundation' },
      ],
    },
    {
      id: 'sprint-3-4',
      title: 'Sprint 3-4: CRM & Email',
      description:
        'Integrate with Salesforce CRM, build email draft generation, and launch dashboard UI.',
      visual: (
        <div className="space-y-4">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Key Deliverables</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>CRM integration (Salesforce)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Email draft generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Dashboard UI v1</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Duration', value: 'Week 3-6' },
        { label: 'Team', value: '3 engineers' },
        { label: 'Status', value: 'Core Features' },
      ],
    },
    {
      id: 'sprint-5',
      title: 'Sprint 5: Pilot Launch',
      description:
        'Onboard 5 pilot customers, collect user feedback, and iterate based on real-world usage.',
      visual: (
        <div className="space-y-4">
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-purple-400 mb-3">Key Deliverables</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>5 pilot customers onboarding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>User feedback collection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <span>Bug fixes & iteration</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Duration', value: 'Week 7-9' },
        { label: 'Customers', value: '5 pilots' },
        { label: 'Status', value: 'Validation' },
      ],
    },
    {
      id: 'sprint-6',
      title: 'Sprint 6: Scale Prep',
      description:
        'Production infrastructure, billing system, authentication, and marketing site launch.',
      visual: (
        <div className="space-y-4">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-green-400 mb-3">Key Deliverables</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Production infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Billing & authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Marketing site launch</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Duration', value: 'Week 10-14' },
        { label: 'Team', value: '4 engineers' },
        { label: 'Status', value: 'Launch Ready' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          14-Week MVP Roadmap
        </p>
        <p className="text-xs text-gray-500 mt-1">
          From scoring engine to production launch
        </p>
      </div>

      <StepByStepDiagram
        steps={steps}
        title="Product Roadmap"
        allowNonLinear={true}
      />
    </div>
  );
}
