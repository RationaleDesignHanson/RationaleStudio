'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataMD,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_SPACING } from '@/lib/creait/design-tokens/spacing';
import { AIScoreFlowDiagram } from '@/components/creait/diagrams';

/**
 * Slide 2.1: Solution - CREaiT Platform Overview
 *
 * Introduces the AI-powered opportunity intelligence platform
 */
export default function SolutionSlidePage() {
  const coreFeatures = [
    {
      icon: '',
      title: 'Smart Prioritization',
      description: 'AI-powered scoring ranks every opportunity by likelihood to transact',
      metric: '0-100',
      metricLabel: 'Opportunity Score',
    },
    {
      icon: '⏰',
      title: 'Timing Signals',
      description: 'Track lease expiries, debt maturities, ownership changes automatically',
      metric: '5',
      metricLabel: 'Signal Types',
    },
    {
      icon: '️',
      title: 'AI Email Drafts',
      description: 'Context-aware emails in 3 tone variants, ready to personalize and send',
      metric: '30s',
      metricLabel: 'Draft Time',
    },
    {
      icon: '',
      title: 'Deep Intelligence',
      description: 'Property records, ownership history, financing details, market comps in one place',
      metric: '100%',
      metricLabel: 'Data Coverage',
    },
  ];

  return ( <CRESection
      title="The Solution"
      subtitle="AI-powered opportunity intelligence for commercial real estate brokers"
      variant="solution"
    > {/* Platform Overview */} <CRECard variant="secondary" size="large" className="mb-8"> <div className="text-center mb-8"> <H2 className="mb-4">CREaiT Platform</H2> <BodyLG color={CRE_COLORS.text.secondary}> From 30 minutes of manual research to 30 seconds of actionable intelligence </BodyLG> </div> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {coreFeatures.map((feature, index) => ( <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
            > <div className="text-5xl mb-4">{feature.icon}</div> <H3 className="mb-3">{feature.title}</H3> <BodyMD color={CRE_COLORS.text.secondary} className="mb-4 flex-1"> {feature.description} </BodyMD> <div className="pt-4 border-t border-white/10 w-full"> <DataMD color={CRE_COLORS.secondary}>{feature.metric}</DataMD> <LabelSM color={CRE_COLORS.text.muted} className="mt-1"> {feature.metricLabel} </LabelSM> </div> </div> ))} </div> </CRECard> {/* AI Scoring Flow Diagram */} <div className="mt-12"> <H2 className="mb-4 text-center">How CREaiT Works</H2> <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}> From raw data to actionable intelligence in seconds </BodyLG> <CRECard variant="secondary" size="large"> <AIScoreFlowDiagram /> </CRECard> </div> {/* Value Proposition */} <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"> <CRECard variant="accent" interactive> <LabelSM color={CRE_COLORS.accent}>EFFICIENCY</LabelSM> <H3 className="my-3">60x Faster Research</H3> <BodyMD color={CRE_COLORS.text.secondary}> What took 30 minutes now takes 30 seconds </BodyMD> </CRECard> <CRECard variant="accent" interactive> <LabelSM color={CRE_COLORS.accent}>PRIORITY</LabelSM> <H3 className="my-3">Data-Driven Focus</H3> <BodyMD color={CRE_COLORS.text.secondary}> AI scoring helps brokers contact the right people at the right time </BodyMD> </CRECard> <CRECard variant="accent" interactive> <LabelSM color={CRE_COLORS.accent}>TIMING</LabelSM> <H3 className="my-3">Never Miss a Window</H3> <BodyMD color={CRE_COLORS.text.secondary}> Automated tracking of critical events ensures perfect timing </BodyMD> </CRECard> </div> </CRESection> );
}
