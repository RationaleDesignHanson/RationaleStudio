'use client';

import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/diagrams/ProgressiveDisclosureDiagram';

/**
 * Mobile-optimized Success Metrics Diagram
 * KPIs for 16-week pilot program success measurement
 */
export default function SuccessMetricsDiagramMobile() {
  const metrics: DiagramElement[] = [
    {
      id: 'close-rate',
      icon: '📈',
      title: 'Close Rate',
      summary: '35%+ improvement target',
      details: [
        'Baseline: 25% with traditional PDFs',
        'Target: 35%+ with Vision Pro immersive pitch',
        'Measurement: Track all pilot program deals',
        'Success criteria: 10+ closes in 16 weeks',
        'Revenue impact: $2M+ in closed deals',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'deal-velocity',
      icon: '⚡',
      title: 'Deal Velocity',
      summary: '3-5x faster closures',
      details: [
        'Baseline: 2 weeks average deal cycle',
        'Target: 48-72 hours with AmplifyAI',
        'Measurement: Time from first contact to signed deal',
        'Success criteria: 70% of deals close in <5 days',
        'Impact: 3-5x more deals per agent annually',
      ],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'content-roi',
      icon: '💰',
      title: 'Content ROI',
      summary: '$150K-$500K per athlete',
      details: [
        'Digital Twin: One session → unlimited content',
        'Traditional cost: $5K-$10K per branded video',
        'Video Twin output: 50-100 branded videos annually',
        'Cost savings: $250K-$500K per athlete',
        'Revenue generation: Brand deals, sponsorships',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'platform-adoption',
      icon: '👥',
      title: 'Platform Adoption',
      summary: '100% agent participation',
      details: [
        'Target: All 10 pilot agents active weekly',
        'Measurement: Login frequency, feature usage',
        'Success criteria: 5+ sessions per agent per week',
        'Key features: Digital Twins, Immersive Pitch, AmplifyAI',
        'Training: 2-hour onboarding + weekly support',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'nil-compliance',
      icon: '✅',
      title: 'NIL Compliance',
      summary: '95%+ compliance rate',
      details: [
        'Baseline: 60% industry average compliance',
        'Target: 95%+ with automated guidance',
        'Measurement: Audit all NIL deals for compliance',
        'Success criteria: Zero NCAA violations',
        'Risk mitigation: Real-time rule interpretation',
      ],
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'agent-satisfaction',
      icon: '⭐',
      title: 'Agent Satisfaction',
      summary: 'NPS score 50+',
      details: [
        'Measurement: Monthly NPS surveys',
        'Target: Net Promoter Score 50+',
        'Qualitative: Weekly feedback sessions',
        'Success criteria: 80%+ would recommend',
        'Iteration: Address concerns within 48 hours',
      ],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          16-Week Pilot Success Metrics
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Key Performance Indicators
        </p>
      </div>

      <ProgressiveDisclosureDiagram
        elements={metrics}
        title="6 Success Metrics"
        layout="grid"
      />
    </div>
  );
}
