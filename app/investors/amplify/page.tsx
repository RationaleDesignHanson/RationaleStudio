/**
 * Project Amplify Investment Opportunity
 *
 * NIL + recruiting platform partnership + capital opportunity
 * Updated December 2024
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ASCIIUnifiedGrid, GlassCard } from '@/components/visual';
import { investmentContent } from '@/lib/content';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Amplify — Rationale Investment Opportunities',
  description: 'NIL + recruiting platform for sports agents. 129KB blueprint, $60-250K tiered investment.',
};

export default function AmplifyOpportunityPage() {
  const amplifyOpp = investmentContent.opportunities.find(o => o.id === 'amplify')!;

  const heroTheme = getSectionTheme('hero');
  const tiersTheme = getSectionTheme('featuredWork');
  const comparisonTheme = getSectionTheme('services');

  return (
    <>
      {/* Hero */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <div className="flex items-center justify-between mb-6">
                <Link href="/investors" className="text-sm hover:underline" style={{ color: heroTheme.accent }}>
                  ← Back to All Opportunities
                </Link>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium border border-yellow-500/30"
                  style={{
                    backgroundColor: 'rgba(234, 179, 8, 0.2)',
                    color: 'rgb(250, 204, 21)'
                  }}
                >
                  {amplifyOpp.badge}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{amplifyOpp.icon}</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: heroTheme.foreground }}>
                  {amplifyOpp.title}
                </h1>
              </div>
              <p className="text-2xl mb-4" style={{ color: heroTheme.accent }}>{amplifyOpp.subtitle}</p>
              <p className="text-base leading-relaxed" style={{ color: heroTheme.muted }}>{amplifyOpp.description}</p>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Key Highlights */}
      <Section spacing="large" background="transparent" colorTheme={tiersTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={tiersTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={tiersTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={tiersTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: tiersTheme.foreground }}>
                Opportunity Overview
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {amplifyOpp.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-lg"
                    style={{
                      border: `1px solid ${tiersTheme.border}`,
                      backgroundColor: `${tiersTheme.background}80`
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1" style={{ color: tiersTheme.accent }}>✓</span>
                      <span className="text-base" style={{ color: tiersTheme.foreground }}>{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* What Amplify Is */}
      <Section spacing="large" background="transparent" colorTheme={comparisonTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={comparisonTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={comparisonTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={comparisonTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: comparisonTheme.foreground }}>
                What Is Project Amplify?
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: comparisonTheme.accent }}>
                    The Problem
                  </h3>
                  <p className="text-base" style={{ color: comparisonTheme.muted }}>
                    Sports agents spend 70% of their time on manual coordination—scheduling, content creation, brand deal negotiations, and recruiting logistics. NIL created massive opportunity but also massive operational complexity. Agents need systematization to scale.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: comparisonTheme.accent }}>
                    The Solution
                  </h3>
                  <p className="text-base" style={{ color: comparisonTheme.muted }}>
                    Amplify is an all-in-one platform for sports agents to manage athlete relationships, automate NIL deal workflows, track recruiting pipelines, and generate personalized content at scale. Turn manual chaos into systematic revenue generation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: comparisonTheme.accent }}>
                    Four Integrated Modules
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>1.</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>NIL Marketplace:</strong> Connect athletes with brand deals, track negotiations, automate contracts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>2.</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>Recruiting CRM:</strong> Track prospects, automate outreach, manage touchpoints across recruiting cycles
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>3.</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>Content Studio:</strong> Generate personalized athlete content (social posts, videos, graphics) at scale using AI
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>4.</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>Analytics Dashboard:</strong> Track athlete performance, deal velocity, revenue attribution
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: comparisonTheme.accent }}>
                    Current Status
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>129KB complete blueprint</strong> covering full product architecture and 16-week build plan
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>Tiered approach:</strong> Pilot ($60-80K) for single module MVP, Full Platform ($200-250K) for all 4 modules
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: comparisonTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: comparisonTheme.muted }}>
                        <strong style={{ color: comparisonTheme.foreground }}>Ready to build</strong> as soon as agency partner commits with pilot customers
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* Investment Structure */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme} noPaddingTop={true}>
        <ASCIIUnifiedGrid opacity={0.3} className="absolute top-0 left-0 right-0 z-10" colorTheme={heroTheme} />
        <ASCIIUnifiedGrid animated={true} colorTheme={heroTheme} opacity={0.25} />

        <Container className="relative z-20 pt-16 sm:pt-20">
          <div className="max-w-5xl mx-auto">
            <GlassCard theme={heroTheme} className="p-6 sm:p-8 lg:p-12" borderRadius="1.5rem">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: heroTheme.foreground }}>
                Partnership Structure
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: heroTheme.accent }}>
                    Pilot Option ($60-80K)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        Build single module (NIL Marketplace or Content Studio)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        8-10 week timeline to working MVP
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        Test with 5-10 athletes at partner agency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        Option to expand to full platform
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: heroTheme.accent }}>
                    Full Platform ($200-250K)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        All 4 modules (NIL, Recruiting, Content, Analytics)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        16-week timeline to full production platform
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        Deploy across entire agency network
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: heroTheme.accent }}>•</span>
                      <span className="text-base" style={{ color: heroTheme.muted }}>
                        White-label option available
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{
                  border: `1px solid ${heroTheme.accent}4D`,
                  backgroundColor: `${heroTheme.accent}0D`
                }}
              >
                <h4 className="text-lg font-semibold mb-3" style={{ color: heroTheme.foreground }}>
                  What We're Seeking
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span style={{ color: heroTheme.accent }}>•</span>
                    <span className="text-base" style={{ color: heroTheme.muted }}>
                      <strong style={{ color: heroTheme.foreground }}>Sports Agency Partner:</strong> Firm with 20+ athletes willing to pilot platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: heroTheme.accent }}>•</span>
                    <span className="text-base" style={{ color: heroTheme.muted }}>
                      <strong style={{ color: heroTheme.foreground }}>NIL Expertise:</strong> Deep understanding of athlete representation and brand deals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: heroTheme.accent }}>•</span>
                    <span className="text-base" style={{ color: heroTheme.muted }}>
                      <strong style={{ color: heroTheme.foreground }}>Capital + Equity:</strong> Investment can be cash, equity equivalent, or revenue share structure
                    </span>
                  </li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={getSectionTheme('cta')}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: getSectionTheme('cta').foreground }}>
              Interested in Project Amplify?
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color: getSectionTheme('cta').muted }}>
              Schedule a call to review the complete 129KB blueprint, discuss pilot vs. full platform approach, and explore partnership structure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="/contact" size="lg">
                Schedule Amplify Discussion
              </ButtonPrimary>
              <ButtonSecondary href="/investors" size="lg">
                Compare All Opportunities
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
