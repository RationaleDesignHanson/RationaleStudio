'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  DisplayMD,
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataXL,
  DataLG,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_SPACING } from '@/lib/creait/design-tokens/spacing';
import { TAMFunnelDiagram } from '@/components/creait/diagrams';

/**
 * Slide 4.1: Market Opportunity - The $2.5T Market
 *
 * TAM/SAM/SOM breakdown and market size validation
 */
export default function MarketSlidePage() {
  const marketData = [
    {
      label: 'TAM',
      title: 'Total Addressable Market',
      value: '$9B',
      description: '$500/month × 150K brokers × 12 months',
      color: CRE_COLORS.score.critical,
    },
    {
      label: 'SAM',
      title: 'Serviceable Addressable Market',
      value: '$2.7B',
      description: 'Brokers at firms with 5+ agents (75K brokers)',
      color: CRE_COLORS.score.high,
    },
    {
      label: 'SOM',
      title: 'Serviceable Obtainable Market',
      value: '$90M',
      description: '5% market share in 3 years (3K customers)',
      color: CRE_COLORS.score.medium,
    },
  ];

  const marketStats = [
    {
      stat: '$2.5T',
      label: 'Annual US CRE Transactions',
    },
    {
      stat: '150K+',
      label: 'Commercial Brokers Nationwide',
    },
    {
      stat: '40%',
      label: 'Time Wasted on Manual Research',
    },
    {
      stat: '0',
      label: 'Direct Competitors',
    },
  ];

  return (
    <CRESection
      title="Market Opportunity"
      subtitle="A massive, underserved market with no direct competition"
      variant="market"
    >
      {/* Market Size Hero */}
      <CRECard variant="primary" size="large" className="mb-8 text-center">
        <LabelSM color={CRE_COLORS.text.muted}>TOTAL ADDRESSABLE MARKET</LabelSM>
        <DisplayMD className="my-4" color={CRE_COLORS.primary}>
          $9 Billion
        </DisplayMD>
        <BodyLG color={CRE_COLORS.text.secondary}>
          150,000+ commercial real estate brokers wasting 40% of their day on manual research
        </BodyLG>
      </CRECard>

      {/* TAM/SAM/SOM Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {marketData.map((market, index) => (
          <CRECard
            key={index}
            variant={
              index === 0 ? 'critical' : index === 1 ? 'high' : 'medium'
            }
            interactive
          >
            <LabelSM color={market.color}>{market.label}</LabelSM>
            <H3 className="my-3">{market.title}</H3>
            <DataLG color={market.color} className="mb-4">
              {market.value}
            </DataLG>
            <BodyMD color={CRE_COLORS.text.secondary}>{market.description}</BodyMD>
          </CRECard>
        ))}
      </div>

      {/* Market Stats Grid */}
      <CRECard variant="secondary">
        <H2 className="mb-6 text-center">Market At A Glance</H2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {marketStats.map((item, index) => (
            <div key={index} className="text-center">
              <DataXL color={CRE_COLORS.secondary} className="mb-2">
                {item.stat}
              </DataXL>
              <LabelSM color={CRE_COLORS.text.muted}>{item.label}</LabelSM>
            </div>
          ))}
        </div>
      </CRECard>

      {/* TAM Funnel Diagram */}
      <div className="mt-12">
        <H2 className="mb-4 text-center">Market Segmentation</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          From $9B total market to $90M achievable target
        </BodyLG>
        <CRECard variant="primary" size="large">
          <TAMFunnelDiagram />
        </CRECard>
      </div>

      {/* Why Now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <CRECard variant="accent">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🚀</div>
            <div>
              <H3 className="mb-3">First-Mover Advantage</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>
                No direct competitors in timing intelligence for CRE. Generic AI tools lack domain
                expertise and workflow integration. 12-18 month head start.
              </BodyMD>
            </div>
          </div>
        </CRECard>

        <CRECard variant="accent">
          <div className="flex items-start gap-3">
            <div className="text-3xl">📈</div>
            <div>
              <H3 className="mb-3">Timing is Perfect</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>
                CRE brokers are adopting AI tools (76% interested), but existing solutions don't
                solve prioritization. We fill the gap at the perfect moment.
              </BodyMD>
            </div>
          </div>
        </CRECard>
      </div>
    </CRESection>
  );
}
