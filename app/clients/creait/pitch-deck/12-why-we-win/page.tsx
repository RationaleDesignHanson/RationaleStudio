'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  DisplayLG,
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * Slide 7.2: Why CREaiT Wins
 *
 * Investment thesis and competitive advantages
 */
export default function WhyWeWinSlidePage() {
  const investmentThesis = [
    {
      icon: '🎯',
      title: 'Massive, Underserved Market',
      points: [
        '$9B TAM with 150K+ brokers wasting 40% of their day',
        'No direct competitors in timing intelligence for CRE',
        'First-mover advantage: 12-18 month head start',
      ],
    },
    {
      icon: '✅',
      title: 'Validated Product-Market Fit',
      points: [
        '25 broker interviews: 88% cite prioritization as #1 pain',
        '5 pilot customers committed (45 brokers)',
        '76% willing to pay $300-500/month for solution',
      ],
    },
    {
      icon: '🚀',
      title: 'Technical Traction Reduces Risk',
      points: [
        'Backend 80% complete ($94K invested value)',
        'Production infrastructure deployed (Kubernetes + CI/CD)',
        'MVP in 14 weeks, not 6+ months',
      ],
    },
    {
      icon: '💰',
      title: 'Exceptional Unit Economics',
      points: [
        'LTV:CAC = 7.2:1 (3:1 is industry standard)',
        '80% gross margins (standard SaaS)',
        '6-month payback period',
      ],
    },
    {
      icon: '🛡️',
      title: 'Defensible Moats',
      points: [
        'Data network effects (more users = better signals)',
        'Deep CRM + data source integrations',
        'Domain expertise (built by/for CRE brokers)',
      ],
    },
    {
      icon: '📈',
      title: 'Clear Path to Scale',
      points: [
        '$361K ARR in 12 months (67 customers)',
        'Pilot → referral → sales playbook proven',
        'Series A ready by Month 12',
      ],
    },
  ];

  const founderStrengths = [
    {
      area: 'Technical Execution',
      evidence: 'Shipped $94K of backend infrastructure solo',
    },
    {
      area: 'Domain Knowledge',
      evidence: 'Deep understanding of CRE broker workflows and pain points',
    },
    {
      area: 'Customer Obsession',
      evidence: '25 broker interviews, 88% validation, 5 pilots committed',
    },
    {
      area: 'Resourcefulness',
      evidence: 'Built with modern stack (Claude AI, Kubernetes, Flask) on limited budget',
    },
  ];

  return (
    <CRESection
      title="Why CREaiT Wins"
      subtitle="A rare combination of market timing, technical de-risking, and validated demand"
      variant="ask"
    >
      {/* Investment Thesis Header */}
      <CRECard variant="critical" size="large" className="mb-8 text-center">
        <DisplayLG className="mb-6" color={CRE_COLORS.score.critical}>
          Investment Thesis
        </DisplayLG>
        <BodyLG color={CRE_COLORS.text.secondary} className="max-w-4xl mx-auto">
          CREaiT solves a $9B problem with no direct competition, validated customer demand, and
          80% of the technical work already complete. This is a rare opportunity to invest in a
          capital-efficient, defensible B2B SaaS company at the perfect inflection point.
        </BodyLG>
      </CRECard>

      {/* Six Reasons */}
      <H2 className="mb-6">Six Reasons to Invest</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {investmentThesis.map((reason, index) => (
          <CRECard key={index} variant={index < 2 ? 'primary' : 'secondary'}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{reason.icon}</div>
              <H3>{reason.title}</H3>
            </div>
            <ul className="space-y-2 pt-4 border-t border-white/10">
              {reason.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{point}</BodyMD>
                </li>
              ))}
            </ul>
          </CRECard>
        ))}
      </div>

      {/* Founder Strengths */}
      <CRECard variant="accent" className="mb-8">
        <H2 className="mb-6">Why This Founder Can Execute</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founderStrengths.map((strength, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <H3 className="text-lg mb-2">{strength.area}</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>{strength.evidence}</BodyMD>
            </div>
          ))}
        </div>
      </CRECard>

      {/* Closing Statement */}
      <CRECard variant="primary">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎯</div>
          <div className="flex-1">
            <H2 className="mb-4">The Opportunity</H2>
            <BodyLG color={CRE_COLORS.text.secondary} className="mb-4">
              Commercial real estate is a $2.5 trillion market where brokers still rely on gut feel
              and spreadsheets. CREaiT brings AI-powered intelligence to an industry desperate for
              it — at exactly the right moment.
            </BodyLG>
            <BodyLG color={CRE_COLORS.text.secondary}>
              With backend 80% complete, 5 pilots committed, and a clear path to $300K ARR in 12
              months, CREaiT is de-risked on both the technical and customer validation fronts. This
              seed round funds go-to-market execution, not unproven ideas.
            </BodyLG>
          </div>
        </div>
      </CRECard>

      {/* Contact CTA */}
      <div className="mt-8 text-center">
        <CRECard variant="critical" size="large">
          <H2 className="mb-4">Let's Build the Future of CRE Together</H2>
          <BodyLG color={CRE_COLORS.text.secondary} className="mb-6">
            Ready to dive deeper? Let's discuss pilot data, technical architecture, or
            go-to-market strategy.
          </BodyLG>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>FOUNDER</LabelSM>
              <H3 className="mt-1">Matt Hanson</H3>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>EMAIL</LabelSM>
              <H3 className="mt-1">matt@creait.io</H3>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>DECK</LabelSM>
              <H3 className="mt-1">pitch.creait.io</H3>
            </div>
          </div>

          {/* Subtle Portal Link */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <a
              href="/clients/creait/investor-portal"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#FFD700] transition-colors"
            >
              <span>•••</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Internal Portal</span>
            </a>
          </div>
        </CRECard>
      </div>
    </CRESection>
  );
}
