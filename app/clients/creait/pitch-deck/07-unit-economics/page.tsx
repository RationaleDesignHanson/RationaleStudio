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
import { UnitEconomicsFlowDiagram } from '@/components/creait/diagrams';

/**
 * Slide 5.1: Unit Economics
 *
 * LTV:CAC = 7.2:1, pricing tiers, margins
 */
export default function UnitEconomicsSlidePage() {
  const keyMetrics = [
    {
      metric: '7.2:1',
      label: 'LTV:CAC Ratio',
      sublabel: 'Excellent for SaaS',
      color: CRE_COLORS.score.critical,
    },
    {
      metric: '$18K',
      label: 'Lifetime Value',
      sublabel: '36-month customer lifetime',
      color: CRE_COLORS.primary,
    },
    {
      metric: '$2.5K',
      label: 'Customer Acquisition Cost',
      sublabel: '6-month payback period',
      color: CRE_COLORS.secondary,
    },
    {
      metric: '80%',
      label: 'Gross Margin',
      sublabel: 'Standard SaaS margins',
      color: CRE_COLORS.accent,
    },
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$299',
      target: '1-5 person teams',
      features: ['Daily dashboard', 'Basic scoring', '50 opportunities/month', 'Email support'],
      color: CRE_COLORS.score.medium,
    },
    {
      name: 'Professional',
      price: '$499',
      target: '5-20 person firms',
      features: [
        'Everything in Starter',
        'AI email drafts',
        '200 opportunities/month',
        'Priority support',
      ],
      highlight: true,
      color: CRE_COLORS.primary,
    },
    {
      name: 'Enterprise',
      price: '$799',
      target: '20+ person firms',
      features: [
        'Everything in Pro',
        'Unlimited opportunities',
        'Custom integrations',
        'Dedicated success manager',
      ],
      color: CRE_COLORS.secondary,
    },
  ];

  return (
    <CRESection
      title="Business Model"
      subtitle="SaaS with usage-based pricing and excellent unit economics"
      variant="traction"
    >
      {/* Hero Metric: LTV:CAC */}
      <CRECard variant="critical" size="large" className="mb-8 text-center">
        <LabelSM color={CRE_COLORS.text.muted}>LIFETIME VALUE : ACQUISITION COST</LabelSM>
        <DataXL className="my-6" color={CRE_COLORS.score.critical}>
          7.2:1
        </DataXL>
        <BodyLG color={CRE_COLORS.text.secondary}>
          Industry-leading ratio. Above 3:1 is considered healthy for SaaS companies.
        </BodyLG>
      </CRECard>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((item, index) => (
          <CRECard key={index} variant="neutral" className="text-center">
            <DataLG color={item.color} className="mb-2">
              {item.metric}
            </DataLG>
            <LabelSM color={CRE_COLORS.text.primary} className="mb-1">
              {item.label}
            </LabelSM>
            <LabelSM color={CRE_COLORS.text.muted}>{item.sublabel}</LabelSM>
          </CRECard>
        ))}
      </div>

      {/* Pricing Tiers */}
      <H2 className="mb-6">Pricing Strategy</H2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingTiers.map((tier, index) => (
          <CRECard
            key={index}
            variant={tier.highlight ? 'primary' : 'neutral'}
            className={tier.highlight ? 'ring-2 ring-sky-500' : ''}
          >
            {tier.highlight && (
              <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                SWEET SPOT
              </div>
            )}
            <LabelSM color={tier.color}>{tier.name.toUpperCase()}</LabelSM>
            <H2 className="my-3" color={tier.color}>
              {tier.price}
              <span className="text-base font-normal text-white/60">/month</span>
            </H2>
            <BodyMD color={CRE_COLORS.text.muted} className="mb-4">
              {tier.target}
            </BodyMD>
            <ul className="space-y-2 pt-4 border-t border-white/10">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{feature}</BodyMD>
                </li>
              ))}
            </ul>
          </CRECard>
        ))}
      </div>

      {/* Additional Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CRECard variant="accent">
          <H3 className="mb-3">Setup Fees</H3>
          <DataLG color={CRE_COLORS.accent} className="mb-3">
            $2,500
          </DataLG>
          <BodyMD color={CRE_COLORS.text.secondary}>
            One-time setup fee for CRM integration, data import, and team training. Waived for
            annual contracts to incentivize upfront commitment.
          </BodyMD>
        </CRECard>

        <CRECard variant="accent">
          <H3 className="mb-3">Upsell Opportunities</H3>
          <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
            <strong>Custom data sources:</strong> +$200/month
          </BodyMD>
          <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
            <strong>API access:</strong> +$300/month
          </BodyMD>
          <BodyMD color={CRE_COLORS.text.secondary}>
            <strong>White-label:</strong> +$500/month (enterprise)
          </BodyMD>
        </CRECard>
      </div>

      {/* Unit Economics Flow Diagram */}
      <div className="mt-12">
        <H2 className="mb-4 text-center">Revenue Breakdown</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          From $499/mo customer payment to 7.2:1 LTV:CAC ratio
        </BodyLG>
        <CRECard variant="primary" size="large">
          <UnitEconomicsFlowDiagram />
        </CRECard>
      </div>
    </CRESection>
  );
}
