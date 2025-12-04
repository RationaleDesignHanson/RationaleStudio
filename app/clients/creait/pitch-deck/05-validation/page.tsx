'use client';

import { useState } from 'react';
import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import { CREExpandablePanel } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataXL,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { ValidationMapDiagram } from '@/components/creait/diagrams';

/**
 * Slide 4.2: Customer Validation
 *
 * 25 broker interviews + 5 pilot customers
 */
export default function ValidationSlidePage() {
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const validationStats = [
    {
      stat: '25',
      label: 'Broker Interviews',
      sublabel: 'Across 15 markets',
    },
    {
      stat: '88%',
      label: 'Top Pain Point',
      sublabel: '"Don\'t know who to call today"',
    },
    {
      stat: '76%',
      label: 'Willing to Pay',
      sublabel: '$300-500/month range',
    },
    {
      stat: '5',
      label: 'Pilot Customers',
      sublabel: 'SF Bay Area firms committed',
    },
  ];

  const interviewInsights = [
    {
      label: 'INSIGHT',
      title: 'Prioritization is the #1 Challenge',
      content:
        '88% of brokers cited "not knowing who to contact today" as their biggest challenge. They have 100+ opportunities in their CRM but rely on gut feel rather than data. Quote from interview: "I spend the first hour of every day just trying to figure out who to call. By the time I decide, it\'s 10am and half my day is gone."',
    },
    {
      label: 'INSIGHT',
      title: 'Timing Signals Drive Urgency',
      content:
        'Brokers consistently mentioned lease expiries, debt maturities, and ownership changes as key triggers. Problem: These events are tracked manually in spreadsheets or not at all. Quote: "I know lease expiries are gold, but I can\'t keep track of 200+ dates in my head. By the time I remember, my competitor already called them."',
    },
    {
      label: 'INSIGHT',
      title: 'Price Sensitivity is Low for ROI',
      content:
        '76% willing to pay $300-500/month if the tool saves them 2+ hours daily and helps them close 1 extra deal per quarter ($50K+ commission). The value prop is clear: Time savings + higher close rates = instant ROI. One broker said: "If this saves me even ONE deal a year, it pays for itself 10x over."',
    },
  ];

  const pilotCustomers = [
    {
      name: 'Marcus & Millichap - SF Office',
      size: '12 brokers',
      focus: 'Multifamily',
    },
    {
      name: 'CBRE - East Bay Team',
      size: '8 brokers',
      focus: 'Industrial',
    },
    {
      name: 'Colliers - Peninsula',
      size: '6 brokers',
      focus: 'Office',
    },
    {
      name: 'JLL - San Jose',
      size: '15 brokers',
      focus: 'Mixed-use',
    },
    {
      name: 'Independent Boutique',
      size: '4 brokers',
      focus: 'Retail',
    },
  ];

  return (
    <CRESection
      title="Customer Validation"
      subtitle="Real feedback from brokers who desperately need this"
      variant="traction"
    >
      {/* Validation Stats */}
      <CRECard variant="primary" size="large" className="mb-8">
        <H2 className="mb-6 text-center">Validation Metrics</H2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {validationStats.map((item, index) => (
            <div key={index} className="text-center">
              <DataXL color={CRE_COLORS.primary} className="mb-2">
                {item.stat}
              </DataXL>
              <LabelSM color={CRE_COLORS.text.primary} className="mb-1">
                {item.label}
              </LabelSM>
              <LabelSM color={CRE_COLORS.text.muted}>{item.sublabel}</LabelSM>
            </div>
          ))}
        </div>
      </CRECard>

      {/* Interview Insights */}
      <div className="mb-8">
        <H2 className="mb-6">Key Interview Insights</H2>
        <div className="space-y-4">
          {interviewInsights.map((insight, index) => (
            <CREExpandablePanel
              key={index}
              index={index}
              label={insight.label}
              title={insight.title}
              isExpanded={expandedPanel === index}
              onToggle={() => setExpandedPanel(expandedPanel === index ? null : index)}
              variant="high"
              showNumber={false}
            >
              <BodyMD>{insight.content}</BodyMD>
            </CREExpandablePanel>
          ))}
        </div>
      </div>

      {/* Validation Map Diagram */}
      <div className="mt-12">
        <H2 className="mb-4 text-center">Interview Locations</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          25 interviews across 8 major CRE markets
        </BodyLG>
        <CRECard variant="primary" size="large">
          <ValidationMapDiagram />
        </CRECard>
      </div>

      {/* Pilot Customers */}
      <CRECard variant="secondary" className="mt-12">
        <H2 className="mb-4">5 Pilot Customers Committed</H2>
        <BodyLG color={CRE_COLORS.text.secondary} className="mb-6">
          SF Bay Area firms representing 45 brokers ready to pilot CREaiT in Q2 2025
        </BodyLG>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pilotCustomers.map((customer, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
            >
              <H3 className="text-base mb-2">{customer.name}</H3>
              <div className="flex items-center justify-between">
                <LabelSM color={CRE_COLORS.text.muted}>{customer.size}</LabelSM>
                <LabelSM color={CRE_COLORS.secondary}>{customer.focus}</LabelSM>
              </div>
            </div>
          ))}
        </div>
      </CRECard>
    </CRESection>
  );
}
