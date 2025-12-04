'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CompetitiveLandscapeDiagram } from '@/components/creait/diagrams';

/**
 * Slide 4.3: Competitive Landscape
 *
 * 2x2 positioning matrix showing we sit ABOVE existing tools
 */
export default function CompetitiveSlidePage() {
  const competitors = [
    {
      category: 'CRMs',
      examples: 'Salesforce, HubSpot',
      position: 'Store Data',
      vsUs: 'We add intelligence on top',
      color: CRE_COLORS.text.muted,
    },
    {
      category: 'Data Platforms',
      examples: 'CoStar, LoopNet',
      position: 'Property Research',
      vsUs: 'We synthesize into actions',
      color: CRE_COLORS.text.muted,
    },
    {
      category: 'Email Tools',
      examples: 'Outreach, SalesLoft',
      position: 'Generic Automation',
      vsUs: 'We add CRE context',
      color: CRE_COLORS.text.muted,
    },
    {
      category: 'Generic AI',
      examples: 'ChatGPT, Claude',
      position: 'General Purpose',
      vsUs: 'We integrate CRE workflow',
      color: CRE_COLORS.text.muted,
    },
  ];

  const moats = [
    {
      icon: '🔄',
      title: 'Data Network Effects',
      description:
        'More brokers using CREaiT = better timing signals. As we track more lease expiries and deal closures, our predictions improve for everyone.',
    },
    {
      icon: '🏢',
      title: 'Domain Expertise',
      description:
        'Built by/for CRE brokers, not generic sales teams. We understand property types, market cycles, and broker workflows at a deep level.',
    },
    {
      icon: '⏱️',
      title: 'First-Mover (12-18 months)',
      description:
        'No direct competitors in timing intelligence for CRE. By the time copycats emerge, we have customer lock-in and data moat.',
    },
    {
      icon: '🔌',
      title: 'Integration Depth',
      description:
        'CRM connectors + data source APIs + workflow integration. Hard to replicate without 6+ months of engineering work.',
    },
  ];

  return (
    <CRESection
      title="Competitive Landscape"
      subtitle="We sit ABOVE existing tools — we don't replace them"
      variant="execution"
    >
      {/* Positioning Statement */}
      <CRECard variant="primary" size="large" className="mb-8 text-center">
        <H2 className="mb-4">We Don't Compete — We Integrate</H2>
        <BodyLG color={CRE_COLORS.text.secondary} className="max-w-3xl mx-auto">
          CREaiT sits on top of CRMs, data platforms, and email tools. We make existing investments
          more valuable by adding the one thing they all lack: <strong>intelligent prioritization
          based on timing signals</strong>.
        </BodyLG>
      </CRECard>

      {/* Competitive Grid */}
      <div className="mb-8">
        <H2 className="mb-6">How We Compare</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitors.map((comp, index) => (
            <CRECard key={index} variant="neutral">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <H3 className="text-lg mb-1">{comp.category}</H3>
                  <LabelSM color={CRE_COLORS.text.muted}>{comp.examples}</LabelSM>
                </div>
                <div className="text-2xl">🔧</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <LabelSM color={CRE_COLORS.text.muted}>WHAT THEY DO</LabelSM>
                  <BodyMD className="mt-1">{comp.position}</BodyMD>
                </div>
                <div>
                  <LabelSM color={CRE_COLORS.primary}>VS. CREAIT</LabelSM>
                  <BodyMD className="mt-1" color={CRE_COLORS.primary}>
                    {comp.vsUs}
                  </BodyMD>
                </div>
              </div>
            </CRECard>
          ))}
        </div>
      </div>

      {/* Moats */}
      <CRECard variant="secondary">
        <H2 className="mb-6">Our Competitive Moats</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moats.map((moat, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{moat.icon}</div>
              <div className="flex-1">
                <H3 className="text-lg mb-2">{moat.title}</H3>
                <BodyMD color={CRE_COLORS.text.secondary}>{moat.description}</BodyMD>
              </div>
            </div>
          ))}
        </div>
      </CRECard>

      {/* Competitive Landscape Diagram */}
      <div className="mt-12">
        <H2 className="mb-4 text-center">Competitive Positioning</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          We sit alone in the best quadrant: CRE-specific + intelligence layer
        </BodyLG>
        <CRECard variant="secondary" size="large">
          <CompetitiveLandscapeDiagram />
        </CRECard>
      </div>

      {/* Why This Matters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <CRECard variant="accent">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💰</div>
            <div>
              <H3 className="mb-3">Integration = Higher ACVs</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>
                We don't ask brokers to replace their CRM or data subscriptions. We add $500/month
                on top of existing $5K+ tool budgets. Easy upsell.
              </BodyMD>
            </div>
          </div>
        </CRECard>

        <CRECard variant="accent">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🛡️</div>
            <div>
              <H3 className="mb-3">Integration = Sticky</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>
                Once we're wired into a broker's CRM, data sources, and daily workflow, switching
                costs are high. Our 5% churn assumption is conservative.
              </BodyMD>
            </div>
          </div>
        </CRECard>
      </div>
    </CRESection>
  );
}
