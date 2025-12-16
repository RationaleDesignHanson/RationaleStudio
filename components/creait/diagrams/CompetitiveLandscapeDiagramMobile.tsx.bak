'use client';

import { ProgressiveDisclosureDiagram, type DiagramElement } from '@/components/diagrams/ProgressiveDisclosureDiagram';

/**
 * Mobile-optimized CompetitiveLandscapeDiagram
 * 8 competitors grouped by quadrant using progressive disclosure
 */
export default function CompetitiveLandscapeDiagramMobile() {
  const competitors: DiagramElement[] = [
    {
      id: 'crms',
      icon: '📊',
      title: 'General CRMs',
      summary: 'Salesforce, HubSpot, Pipedrive',
      details: [
        'Positioning: General + Data Storage',
        'Strengths: Broad feature sets, established market',
        'Weaknesses: No CRE-specific intelligence',
        'Gap: Can\'t identify timing signals',
        'Why we win: Domain-specific AI beats generic CRM',
      ],
      color: 'from-gray-500 to-slate-500',
    },
    {
      id: 'data-platforms',
      icon: '🏢',
      title: 'CRE Data Platforms',
      summary: 'CoStar, CompStak, RCA',
      details: [
        'Positioning: CRE-Specific + Data Storage',
        'Strengths: Deep property databases, market data',
        'Weaknesses: No predictive intelligence',
        'Gap: Brokers drown in data without prioritization',
        'Why we win: AI turns data into actionable insights',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'general-ai',
      icon: '🤖',
      title: 'General AI Tools',
      summary: 'ChatGPT, Anthropic, Perplexity',
      details: [
        'Positioning: General + Intelligence',
        'Strengths: Powerful AI, broad capabilities',
        'Weaknesses: No CRE domain knowledge',
        'Gap: Can\'t access proprietary CRE data',
        'Why we win: CRE-trained models + exclusive datasets',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'creait',
      icon: '🎯',
      title: 'CREaiT (Us)',
      summary: 'CRE-Specific + Intelligence',
      details: [
        'Positioning: Top-right quadrant (ONLY player)',
        'Unique: AI-powered timing signal detection',
        'Moat: CRE-trained models + exclusive data partnerships',
        'Advantage: 3-5x more qualified opportunities',
        'Result: No direct competitors in this quadrant',
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Competitive Landscape
        </p>
        <p className="text-xs text-gray-500 mt-1">
          We own the Intelligence + CRE-Specific quadrant
        </p>
      </div>

      <ProgressiveDisclosureDiagram
        elements={competitors}
        title="4 Competitive Quadrants"
        layout="grid"
      />

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">
          Blue Ocean Strategy
        </h4>
        <p className="text-xs text-gray-400 text-center">
          CREaiT is the only solution combining CRE-specific intelligence with predictive AI.
          <span className="text-green-400 block mt-2">We don't compete - we own a category.</span>
        </p>
      </div>
    </div>
  );
}
