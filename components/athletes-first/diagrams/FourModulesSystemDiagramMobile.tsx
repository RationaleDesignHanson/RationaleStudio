'use client';

import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/diagrams/ProgressiveDisclosureDiagram';

const modules: DiagramElement[] = [
  {
    id: 'nil',
    icon: '⚖️',
    title: 'NIL Platform',
    summary: 'NCAA compliance & agency trust',
    details: [
      '95%+ compliance rate (vs. 60% industry avg)',
      'Automated NIL deal tracking and reporting',
      'NCAA rule interpretation and guidance',
      'Real-time compliance monitoring',
      'Risk assessment and alerts',
      'Agency trust verification',
    ],
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'pitch',
    icon: '📊',
    title: 'Interactive Pitch',
    summary: 'Vision Pro spatial experiences',
    details: [
      '65% close rate (vs. 25% with PDFs)',
      '3D athlete presentations in spatial computing',
      'Interactive deal scenario modeling',
      'Virtual facility and venue tours',
      'Spatial storytelling with volumetric video',
      'Multi-user collaborative viewing',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'twins',
    icon: '∞',
    title: 'Video Twins',
    summary: 'One session → infinite assets',
    details: [
      '$150K-$500K per athlete annually',
      'Single capture session generates unlimited content',
      'AI-powered video synthesis',
      'Personalized brand content at scale',
      'Multi-platform format optimization',
      'Continuous asset generation from one shoot',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'amplify',
    icon: '⚡',
    title: 'Amplify AI',
    summary: 'Posted content → closed deals',
    details: [
      '3-5x velocity (48 hours vs. 2 weeks)',
      'AI-powered content distribution',
      'Automated brand matching and outreach',
      'Performance tracking and optimization',
      'Deal closing automation',
      'Revenue attribution and analytics',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
];

/**
 * Mobile-optimized Four Modules System Diagram
 *
 * Uses Progressive Disclosure pattern for Athletes First presentation
 * Shows athlete lifecycle journey: NIL → Pitch → Twins → Amplify
 */
export default function FourModulesSystemDiagramMobile() {
  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Athlete Lifecycle Journey
        </p>
        <p className="text-xs text-gray-500 mt-1">
          From amateur compliance to professional viral distribution
        </p>
      </div>

      <ProgressiveDisclosureDiagram
        elements={modules}
        title="4 Integrated Modules"
        layout="grid"
      />
    </div>
  );
}
