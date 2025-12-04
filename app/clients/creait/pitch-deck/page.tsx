import Link from 'next/link';
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
 * CREaiT Pitch Deck - Landing Page
 *
 * Navigation hub for all pitch deck slides
 */
export default function CREaiTPitchDeckPage() {
  const slides = [
    {
      number: '01',
      section: 'Problem',
      title: 'The $100B Inefficiency',
      description: 'Brokers waste 40% of their day on manual research',
      href: '/clients/creait/pitch-deck/01-problem',
      variant: 'critical' as const,
    },
    {
      number: '02',
      section: 'Solution',
      title: 'CREaiT Platform',
      description: 'AI-powered opportunity intelligence',
      href: '/clients/creait/pitch-deck/02-solution',
      variant: 'secondary' as const,
    },
    {
      number: '03',
      section: 'Demo',
      title: 'Live Demo',
      description: 'Interactive dashboards (placeholder)',
      href: '/clients/creait/pitch-deck/03-demo',
      variant: 'accent' as const,
    },
    {
      number: '04',
      section: 'Market',
      title: 'The $2.5T Market',
      description: 'TAM/SAM/SOM breakdown',
      href: '/clients/creait/pitch-deck/04-market',
      variant: 'primary' as const,
    },
    {
      number: '05',
      section: 'Market',
      title: 'Customer Validation',
      description: '25 interviews, 5 pilots committed',
      href: '/clients/creait/pitch-deck/05-validation',
      variant: 'primary' as const,
    },
    {
      number: '06',
      section: 'Market',
      title: 'Competitive Landscape',
      description: 'We sit ABOVE existing tools',
      href: '/clients/creait/pitch-deck/06-competitive',
      variant: 'secondary' as const,
    },
    {
      number: '07',
      section: 'Business Model',
      title: 'Unit Economics',
      description: 'LTV:CAC = 7.2:1',
      href: '/clients/creait/pitch-deck/07-unit-economics',
      variant: 'accent' as const,
    },
    {
      number: '08',
      section: 'Business Model',
      title: 'Technical Traction',
      description: 'Backend 80% complete',
      href: '/clients/creait/pitch-deck/08-technical-traction',
      variant: 'accent' as const,
    },
    {
      number: '09',
      section: 'Business Model',
      title: 'Path to $300K ARR',
      description: '67 customers in 12 months',
      href: '/clients/creait/pitch-deck/09-revenue-path',
      variant: 'critical' as const,
    },
    {
      number: '10',
      section: 'Execution',
      title: '14-Week Roadmap',
      description: 'Sprint-by-sprint breakdown',
      href: '/clients/creait/pitch-deck/10-roadmap',
      variant: 'secondary' as const,
    },
    {
      number: '11',
      section: 'The Ask',
      title: 'Investment Terms',
      description: '$500K-1M seed round',
      href: '/clients/creait/pitch-deck/11-the-ask',
      variant: 'critical' as const,
    },
    {
      number: '12',
      section: 'The Ask',
      title: 'Why CREaiT Wins',
      description: 'Investment thesis',
      href: '/clients/creait/pitch-deck/12-why-we-win',
      variant: 'primary' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <DisplayLG className="mb-6" color={CRE_COLORS.primary}>
            CREaiT Pitch Deck
          </DisplayLG>
          <BodyLG color={CRE_COLORS.text.secondary} className="max-w-2xl mx-auto">
            AI-powered opportunity intelligence for commercial real estate brokers
          </BodyLG>
        </div>

        {/* Slide Navigation by Section */}
        <div className="space-y-12 mb-12">
          {/* Problem & Solution */}
          <div>
            <H2 className="mb-6">Section 1-2: Problem & Solution</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.slice(0, 3).map((slide) => (
                <Link key={slide.number} href={slide.href}>
                  <CRECard variant={slide.variant} interactive>
                    <LabelSM color={CRE_COLORS.text.muted}>SLIDE {slide.number}</LabelSM>
                    <H3 className="my-3">{slide.title}</H3>
                    <BodyMD color={CRE_COLORS.text.secondary}>{slide.description}</BodyMD>
                    <div className="mt-4 flex items-center gap-2 text-sky-400">
                      <span>View slide</span>
                      <span>→</span>
                    </div>
                  </CRECard>
                </Link>
              ))}
            </div>
          </div>

          {/* Market Opportunity */}
          <div>
            <H2 className="mb-6">Section 3: Market Opportunity</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.slice(3, 6).map((slide) => (
                <Link key={slide.number} href={slide.href}>
                  <CRECard variant={slide.variant} interactive>
                    <LabelSM color={CRE_COLORS.text.muted}>SLIDE {slide.number}</LabelSM>
                    <H3 className="my-3">{slide.title}</H3>
                    <BodyMD color={CRE_COLORS.text.secondary}>{slide.description}</BodyMD>
                    <div className="mt-4 flex items-center gap-2 text-sky-400">
                      <span>View slide</span>
                      <span>→</span>
                    </div>
                  </CRECard>
                </Link>
              ))}
            </div>
          </div>

          {/* Business Model */}
          <div>
            <H2 className="mb-6">Section 4: Business Model & Traction</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.slice(6, 9).map((slide) => (
                <Link key={slide.number} href={slide.href}>
                  <CRECard variant={slide.variant} interactive>
                    <LabelSM color={CRE_COLORS.text.muted}>SLIDE {slide.number}</LabelSM>
                    <H3 className="my-3">{slide.title}</H3>
                    <BodyMD color={CRE_COLORS.text.secondary}>{slide.description}</BodyMD>
                    <div className="mt-4 flex items-center gap-2 text-sky-400">
                      <span>View slide</span>
                      <span>→</span>
                    </div>
                  </CRECard>
                </Link>
              ))}
            </div>
          </div>

          {/* Execution & Ask */}
          <div>
            <H2 className="mb-6">Section 5-6: Execution Plan & The Ask</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.slice(9, 12).map((slide) => (
                <Link key={slide.number} href={slide.href}>
                  <CRECard variant={slide.variant} interactive>
                    <LabelSM color={CRE_COLORS.text.muted}>SLIDE {slide.number}</LabelSM>
                    <H3 className="my-3">{slide.title}</H3>
                    <BodyMD color={CRE_COLORS.text.secondary}>{slide.description}</BodyMD>
                    <div className="mt-4 flex items-center gap-2 text-sky-400">
                      <span>View slide</span>
                      <span>→</span>
                    </div>
                  </CRECard>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Status Note */}
        <CRECard variant="critical">
          <div className="flex items-start gap-4">
            <div className="text-3xl">✅</div>
            <div className="flex-1">
              <H3 className="mb-2">Status: All 12 Slides Complete!</H3>
              <BodyLG color={CRE_COLORS.text.secondary} className="mb-4">
                <strong>Complete:</strong> Design tokens, typography system, 3 base components, 20+
                typography components, and all 12 pitch deck slides covering Problem, Solution,
                Demo, Market, Business Model, Traction, Execution Plan, and The Ask.
              </BodyLG>
              <BodyLG color={CRE_COLORS.text.secondary}>
                <strong>Next steps:</strong> Build interactive demos with Recharts (Week 2-3), add
                keyboard navigation (Week 3), implement analytics tracking (Week 4).
              </BodyLG>
            </div>
          </div>
        </CRECard>

        {/* Design System Info */}
        <div className="mt-8 text-center">
          <LabelSM color={CRE_COLORS.text.muted}>
            Built with Libre Franklin (display), Inter (body), and IBM Plex Mono (data)
          </LabelSM>
        </div>
      </div>
    </div>
  );
}
