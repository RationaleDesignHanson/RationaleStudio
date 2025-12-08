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
import { InvestmentMilestonesDiagram } from '@/components/creait/diagrams';

/**
 * Slide 7.1: The Ask - Investment Terms
 *
 * Seed round details and terms
 */
export default function TheAskSlidePage() {
  const terms = [
    {
      label: 'Round Size',
      value: '$500K-1M',
      description: 'Seed funding',
    },
    {
      label: 'Pre-Money Valuation',
      value: '$4M',
      description: '11-20% dilution',
    },
    {
      label: 'Structure',
      value: 'SAFE',
      description: 'Standard YC terms',
    },
    {
      label: 'Timeline',
      value: 'Q1 2025',
      description: 'Close by Jan 31',
    },
  ];

  const useOfFunds = [
    {
      category: 'Product Development',
      percentage: '40%',
      amount: '$200K-400K',
      breakdown: [
        'ML engineer (scoring engine)',
        'Frontend engineer (dashboard)',
        'Integration engineer (CRM)',
        'Product lead (roadmap)',
      ],
      color: CRE_COLORS.primary,
    },
    {
      category: 'Pilot Program',
      percentage: '30%',
      amount: '$150K-300K',
      breakdown: [
        'Customer success manager',
        'Data quality improvement',
        'Onboarding automation',
        'Pilot feedback cycles',
      ],
      color: CRE_COLORS.secondary,
    },
    {
      category: 'Go-to-Market',
      percentage: '20%',
      amount: '$100K-200K',
      breakdown: [
        'First sales hire (Month 6)',
        'Conference presence (ICSC)',
        'Content marketing',
        'Demo videos + case studies',
      ],
      color: CRE_COLORS.accent,
    },
    {
      category: 'Operations',
      percentage: '10%',
      amount: '$50K-100K',
      breakdown: [
        'Legal (contracts, compliance)',
        'Accounting + bookkeeping',
        'Insurance (E&O, D&O)',
        'Tools + infrastructure',
      ],
      color: CRE_COLORS.score.medium,
    },
  ];

  const milestones = [
    {
      month: 'Month 3',
      milestone: 'MVP Launch + 5 Pilot Customers',
      gate: 'Pilot conversion from LOIs',
    },
    {
      month: 'Month 6',
      milestone: '22 Paying Customers ($132K ARR)',
      gate: 'Product-market fit validated',
    },
    {
      month: 'Month 12',
      milestone: '67 Customers ($361K ARR)',
      gate: 'Series A ready',
    },
  ];

  return ( <CRESection
      title="The Ask"
      subtitle="$500K-1M seed round to build MVP and scale pilots"
      variant="ask"
    > {/* Investment Terms */} <CRECard variant="critical" size="large" className="mb-8 text-center"> <LabelSM color={CRE_COLORS.text.muted}>SEEKING SEED ROUND</LabelSM> <DisplayMD className="my-6" color={CRE_COLORS.score.critical}> $500K-1M </DisplayMD> <BodyLG color={CRE_COLORS.text.secondary}> SAFE @ $4M pre-money valuation (11-20% dilution) </BodyLG> </CRECard> {/* Terms Grid */} <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> {terms.map((term, index) => ( <CRECard key={index} variant="neutral" className="text-center"> <LabelSM color={CRE_COLORS.text.muted}>{term.label}</LabelSM> <DataLG color={CRE_COLORS.primary} className="my-3"> {term.value} </DataLG> <LabelSM color={CRE_COLORS.text.muted}>{term.description}</LabelSM> </CRECard> ))} </div> {/* Use of Funds */} <H2 className="mb-6">Use of Funds</H2> <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> {useOfFunds.map((category, index) => ( <CRECard
            key={index}
            variant={
              index === 0
                ? 'primary'
                : index === 1
                ? 'secondary'
                : index === 2
                ? 'accent'
                : 'medium'
            }
          > <div className="flex items-start justify-between mb-4"> <div> <H3>{category.category}</H3> <LabelSM color={CRE_COLORS.text.muted} className="mt-1"> {category.amount} </LabelSM> </div> <DataXL color={category.color}>{category.percentage}</DataXL> </div> <ul className="space-y-2 pt-4 border-t border-white/10"> {category.breakdown.map((item, idx) => ( <li key={idx} className="flex items-start gap-2"> <span className="text-green-400 mt-1">•</span> <BodyMD color={CRE_COLORS.text.secondary}>{item}</BodyMD> </li> ))} </ul> </CRECard> ))} </div> {/* Investment Milestones Diagram */} <div className="mt-12 mb-8"> <H2 className="mb-4 text-center">Funding Roadmap</H2> <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}> Clear path from Seed to Series B over 3 years </BodyLG> <CRECard variant="primary" size="large"> <InvestmentMilestonesDiagram /> </CRECard> </div> {/* Milestones */} <CRECard variant="secondary"> <H2 className="mb-6">12-Month Milestones with Seed Capital</H2> <div className="space-y-4"> {milestones.map((item, index) => ( <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between"
            > <div className="flex-1"> <div className="flex items-center gap-3 mb-2"> <LabelSM color={CRE_COLORS.accent}>{item.month}</LabelSM> <H3 className="text-lg">{item.milestone}</H3> </div> <BodyMD color={CRE_COLORS.text.muted}>Gate: {item.gate}</BodyMD> </div> <div className="text-2xl">{index === 2 ? '' : ''}</div> </div> ))} </div> </CRECard> {/* Why Now */} <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"> <CRECard variant="accent"> <div className="flex items-start gap-3"> <div className="text-3xl"></div> <div> <H3 className="mb-3">De-Risked Technical Execution</H3> <BodyMD color={CRE_COLORS.text.secondary}> Backend 80% complete ($94K invested value). You're funding go-to-market, not
                unproven technology. MVP in 14 weeks, not 6+ months. </BodyMD> </div> </div> </CRECard> <CRECard variant="accent"> <div className="flex items-start gap-3"> <div className="text-3xl"></div> <div> <H3 className="mb-3">Validated Customer Demand</H3> <BodyMD color={CRE_COLORS.text.secondary}> 25 broker interviews, 88% pain point validation, 5 pilot customers committed. Clear
                path from pilots → referrals → $300K ARR in 12 months. </BodyMD> </div> </div> </CRECard> </div> </CRESection> );
}
