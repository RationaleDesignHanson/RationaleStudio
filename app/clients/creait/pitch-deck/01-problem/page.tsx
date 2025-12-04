'use client';

import { useState } from 'react';
import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import { CREExpandablePanel } from '@/components/creait/ui';
import {
  DisplayXL,
  H3,
  BodyLG,
  BodyMD,
  DataXL,
  LabelMD,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_SPACING } from '@/lib/creait/design-tokens/spacing';
import { BrokerDayDiagram, TimingWindowDiagram } from '@/components/creait/diagrams';

/**
 * Slide 1.1: Problem - Brokers Waste 40% of Their Day
 *
 * Hook slide showing the core inefficiency in commercial real estate brokerage
 */
export default function ProblemSlidePage() {
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const painPoints = [
    {
      label: 'PAIN POINT',
      title: 'Contact Prioritization',
      content:
        "Brokers don't know who to contact today. With 100+ opportunities in their CRM, they rely on gut feel rather than data-driven prioritization. Result: Missed hot opportunities while chasing cold leads.",
    },
    {
      label: 'PAIN POINT',
      title: 'Timing Windows',
      content:
        'Critical events (lease expiries, debt maturities, ownership changes) happen on predictable timelines, but brokers lack systems to track them. Result: Contacting owners 2 months too late, after competitors have already engaged.',
    },
    {
      label: 'PAIN POINT',
      title: 'Research Time',
      content:
        'Each opportunity requires 30+ minutes of research: property records, owner contact info, recent sales, financing details, market trends. Result: Can only research 8-10 opportunities per day, leaving 90+ unvetted.',
    },
  ];

  return (
    <CRESection
      title="The Problem"
      subtitle="Commercial real estate brokers are flying blind"
      variant="problem"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Big Stat */}
        <CRECard variant="critical" size="large" className="flex flex-col justify-center items-center text-center">
          <LabelMD color={CRE_COLORS.text.muted}>TIME WASTED DAILY</LabelMD>
          <DataXL className="my-6" color={CRE_COLORS.score.critical}>
            40%
          </DataXL>
          <H3 className="mb-4">The $100B Inefficiency</H3>
          <BodyLG color={CRE_COLORS.text.secondary}>
            Commercial real estate brokers waste 40% of their day manually researching which property
            owners to contact, often missing critical timing windows.
          </BodyLG>
        </CRECard>

        {/* Right: Pain Points */}
        <div className={CRE_SPACING.stack.comfortable}>
          <H3 className="mb-6">Why This Matters</H3>

          {painPoints.map((point, index) => (
            <CREExpandablePanel
              key={index}
              index={index}
              label={point.label}
              title={point.title}
              isExpanded={expandedPanel === index}
              onToggle={() => setExpandedPanel(expandedPanel === index ? null : index)}
              variant="high"
              showNumber={false}
            >
              <BodyMD>{point.content}</BodyMD>
            </CREExpandablePanel>
          ))}

          <CRECard variant="neutral" size="compact" className="mt-6">
            <LabelMD color={CRE_COLORS.text.muted}>VALIDATION</LabelMD>
            <BodyMD className="mt-2" color={CRE_COLORS.text.secondary}>
              Validated through 25 broker interviews across 15 markets
            </BodyMD>
          </CRECard>
        </div>
      </div>

      {/* Broker Day Breakdown Diagram */}
      <div className="mt-12">
        <H3 className="mb-6 text-center">A Typical Broker's Day</H3>
        <CRECard variant="neutral" size="large">
          <BrokerDayDiagram />
        </CRECard>
      </div>

      {/* Timing Window Diagram */}
      <div className="mt-12">
        <H3 className="mb-6 text-center">The Cost of Missing Timing Windows</H3>
        <CRECard variant="critical" size="large">
          <TimingWindowDiagram />
        </CRECard>
        <BodyMD className="mt-4 text-center" color={CRE_COLORS.text.secondary}>
          Without automated timing intelligence, brokers contact property owners too late—after competitors have already engaged.
        </BodyMD>
      </div>
    </CRESection>
  );
}
