'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataXL,
  DataLG,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { RevenueRampDiagram } from '@/components/creait/diagrams';

/**
 * Slide 5.3: Path to $300K ARR
 *
 * 12-month projection: 67 customers, $361K ARR
 */
export default function RevenuePathSlidePage() {
  const milestones = [
    {
      month: 'Month 3',
      event: 'MVP Launch',
      customers: 5,
      arr: '$30K',
      description: 'Pilot customers convert',
    },
    {
      month: 'Month 6',
      event: 'Product-Market Fit',
      customers: 22,
      arr: '$132K',
      description: 'Pilot success → referrals',
    },
    {
      month: 'Month 9',
      event: 'Sales Scaling',
      customers: 42,
      arr: '$252K',
      description: 'First sales hire ramping',
    },
    {
      month: 'Month 12',
      event: 'Target Hit',
      customers: 67,
      arr: '$361K',
      description: 'Exceed $300K ARR goal',
    },
  ];

  const assumptions = [
    {
      metric: '$499/mo',
      label: 'Average Contract Value',
      description: 'Professional tier is sweet spot',
    },
    {
      metric: '5%',
      label: 'Monthly Churn',
      description: 'Conservative for sticky B2B SaaS',
    },
    {
      metric: '3:1',
      label: 'Close Rate',
      description: '3 demos → 1 customer',
    },
    {
      metric: '6 months',
      label: 'CAC Payback',
      description: 'Healthy SaaS economics',
    },
  ];

  const quarters = [
    {
      quarter: 'Q1 2025',
      focus: 'Build & Pilot',
      activities: ['Complete MVP', 'Onboard 5 pilot customers', 'Iterate based on feedback'],
      revenue: '$30K ARR',
    },
    {
      quarter: 'Q2 2025',
      focus: 'Validation & Referrals',
      activities: [
        'Case studies from pilots',
        'Referral program launch',
        'Hire first sales rep',
      ],
      revenue: '$132K ARR',
    },
    {
      quarter: 'Q3 2025',
      focus: 'Scale Sales',
      activities: [
        'Outbound SDR motion',
        'Conference presence (ICSC)',
        'Content marketing ramp',
      ],
      revenue: '$252K ARR',
    },
    {
      quarter: 'Q4 2025',
      focus: 'Expand & Retain',
      activities: ['Customer success focus', 'Upsell motion', 'Series A prep'],
      revenue: '$361K ARR',
    },
  ];

  return (
    <CRESection
      title="Path to $300K ARR"
      subtitle="67 customers in 12 months — achievable with disciplined execution"
      variant="traction"
    >
      {/* Hero Metric */}
      <CRECard variant="critical" size="large" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 text-center">
          <div>
            <LabelSM color={CRE_COLORS.text.muted}>MONTH 12 TARGET</LabelSM>
            <DataXL className="my-4" color={CRE_COLORS.score.critical}>
              $361K
            </DataXL>
            <LabelSM color={CRE_COLORS.text.secondary}>Annual Recurring Revenue</LabelSM>
          </div>
          <div>
            <LabelSM color={CRE_COLORS.text.muted}>CUSTOMERS</LabelSM>
            <DataXL className="my-4" color={CRE_COLORS.primary}>
              67
            </DataXL>
            <LabelSM color={CRE_COLORS.text.secondary}>Paying Customers</LabelSM>
          </div>
          <div>
            <LabelSM color={CRE_COLORS.text.muted}>MRR</LabelSM>
            <DataXL className="my-4" color={CRE_COLORS.secondary}>
              $30K
            </DataXL>
            <LabelSM color={CRE_COLORS.text.secondary}>Monthly Recurring Revenue</LabelSM>
          </div>
        </div>
      </CRECard>

      {/* Milestone Timeline */}
      <H2 className="mb-6">12-Month Milestones</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {milestones.map((milestone, index) => (
          <CRECard key={index} variant={index === 3 ? 'critical' : 'primary'}>
            <LabelSM color={CRE_COLORS.text.muted}>{milestone.month}</LabelSM>
            <H3 className="my-3 text-lg">{milestone.event}</H3>
            <div className="flex items-baseline gap-2 mb-2">
              <DataLG color={index === 3 ? CRE_COLORS.score.critical : CRE_COLORS.primary}>
                {milestone.customers}
              </DataLG>
              <LabelSM color={CRE_COLORS.text.muted}>customers</LabelSM>
            </div>
            <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
              {milestone.description}
            </BodyMD>
            <div className="pt-3 border-t border-white/10">
              <LabelSM color={CRE_COLORS.accent}>ARR: {milestone.arr}</LabelSM>
            </div>
          </CRECard>
        ))}
      </div>

      {/* Revenue Ramp Diagram */}
      <div className="mt-12">
        <H2 className="mb-4 text-center">Growth Trajectory</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          Clear milestones from 5 to 60 customers over 12 months
        </BodyLG>
        <CRECard variant="primary" size="large">
          <RevenueRampDiagram />
        </CRECard>
      </div>

      {/* Key Assumptions */}
      <H2 className="mb-6 mt-12">Model Assumptions</H2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {assumptions.map((item, index) => (
          <CRECard key={index} variant="neutral" className="text-center">
            <DataLG color={CRE_COLORS.secondary} className="mb-2">
              {item.metric}
            </DataLG>
            <LabelSM color={CRE_COLORS.text.primary} className="mb-2">
              {item.label}
            </LabelSM>
            <BodyMD color={CRE_COLORS.text.muted} className="text-xs">
              {item.description}
            </BodyMD>
          </CRECard>
        ))}
      </div>

      {/* Quarterly Breakdown */}
      <CRECard variant="secondary">
        <H2 className="mb-6">Quarterly Execution Plan</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quarters.map((q, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <LabelSM color={CRE_COLORS.secondary}>{q.quarter}</LabelSM>
                  <H3 className="mt-2">{q.focus}</H3>
                </div>
                <LabelSM color={CRE_COLORS.accent}>{q.revenue}</LabelSM>
              </div>
              <ul className="space-y-2">
                {q.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">→</span>
                    <BodyMD color={CRE_COLORS.text.secondary}>{activity}</BodyMD>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CRECard>

      {/* Why Achievable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <CRECard variant="accent">
          <H3 className="mb-3">Conservative Assumptions</H3>
          <BodyMD color={CRE_COLORS.text.secondary}>
            5% churn is conservative for B2B SaaS with workflow integration. 3:1 close rate assumes
            high-intent inbound leads from pilots. 6-month payback is standard.
          </BodyMD>
        </CRECard>

        <CRECard variant="accent">
          <H3 className="mb-3">Proven Playbook</H3>
          <BodyMD color={CRE_COLORS.text.secondary}>
            This path mirrors successful B2B SaaS companies: Start with pilots → referrals → scale
            sales. No unproven growth hacks required.
          </BodyMD>
        </CRECard>
      </div>
    </CRESection>
  );
}
