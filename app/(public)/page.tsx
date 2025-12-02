/**
 * Homepage - Execution Proof Studio
 *
 * Strategic positioning: Ex-Meta credentials → Portfolio (Zero featured) → Services
 * Zero + Compass as proof of systematic execution velocity
 */

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

export default function HomePage() {
  const heroTheme = getSectionTheme('hero');
  const credentialsTheme = getSectionTheme('services');
  const portfolioTheme = getSectionTheme('featuredWork');
  const servicesTheme = getSectionTheme('process');
  const ctaTheme = getSectionTheme('cta');

  return (
    <>
      {/* Hero: Execution Proof + Ex-Meta Credentials */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-sm font-bold text-accent uppercase tracking-wide">
                Ex-Meta Reality Labs (7 years) · FUBO VP Engineering
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We Build Products to Prove We Can Build Yours
            </h1>

            <p className="text-lg sm:text-xl text-muted mb-8 max-w-3xl mx-auto">
              Zero went from concept to App Store in 1 month with complete technical architecture.
              10 microservices. 182 Swift files. 7 working prototypes. That's the speed we bring to your product.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="#portfolio" size="lg">
                View Execution Proof →
              </ButtonPrimary>
              <ButtonSecondary href="#services" size="lg">
                See Our Services
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>

      {/* Founder Credibility (Moved Up) */}
      <Section spacing="large" background="default" colorTheme={credentialsTheme}>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Built by Someone Who's Shipped at Scale</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <GlassCard theme={credentialsTheme} className="p-6">
                <div className="text-3xl font-bold text-accent mb-2">7 years</div>
                <p className="text-sm text-muted">Meta (FAIR, Reality Labs, Messenger)</p>
              </GlassCard>

              <GlassCard theme={credentialsTheme} className="p-6">
                <div className="text-3xl font-bold text-accent mb-2">F8 2018</div>
                <p className="text-sm text-muted">Live presenter with Nike, Target, Sephora</p>
              </GlassCard>

              <GlassCard theme={credentialsTheme} className="p-6">
                <div className="text-3xl font-bold text-accent mb-2">1 Patent</div>
                <p className="text-sm text-muted">Interactive Avatars in AR (USPTO)</p>
              </GlassCard>
            </div>

            <ButtonSecondary href="/about">Full story →</ButtonSecondary>
          </div>
        </Container>
      </Section>

      {/* Portfolio: Hero + Supporting Layout */}
      <div id="portfolio">
      <Section spacing="large" background="transparent" colorTheme={portfolioTheme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Portfolio IP</h2>

            {/* ZERO: Featured Large */}
            <div className="mb-8">
              <Link
                href="/work/zero"
                className="group block rounded-xl border border-accent/20 overflow-hidden hover:border-accent transition-all"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Visual */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-blue-500/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-accent mb-4">Zero</div>
                      <div className="text-sm text-muted">Live on App Store</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-bold text-accent uppercase tracking-wide mb-2">
                      Flagship Product · 6 Weeks · Equity Partnership
                    </span>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      AI Email Triage That Eliminates Decision Paralysis
                    </h3>
                    <p className="text-base text-muted mb-6">
                      Swipeable cards meet intelligent categorization. Zero transforms email
                      from an overwhelming inbox into fast, confident decisions. 10 microservices
                      in production. 182 Swift files with A+ architecture. 7 working prototypes.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">iOS Native</span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">AI Categorization</span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs">Production Ready</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* COMPASS: Supporting Card */}
            <Link
              href="/work/compass"
              className="group block rounded-lg border border-border hover:border-accent transition-all p-6 mb-12"
            >
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded bg-gradient-to-br from-teal-500/20 to-green-500/10 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Project Compass</h3>
                  <p className="text-sm text-muted mb-3">
                    AI video indexing with cultural and emotional intelligence. Proof of range: AI across different domains.
                  </p>
                  <span className="text-xs text-accent">View details →</span>
                </div>
              </div>
            </Link>

            {/* PIPELINE: Building in Public */}
            <div className="p-8 rounded-lg border border-dashed border-accent/30 text-center bg-accent/5">
              <h4 className="text-lg font-bold text-foreground mb-2">Building in Public</h4>
              <p className="text-sm text-muted mb-4">
                We ship 1-2 products per quarter. Zero took 6 weeks from concept to complete execution plan.
                Follow our progress as we build the next one.
              </p>
              <Link href="/contact" className="text-sm text-accent hover:underline font-medium">
                Partner with us →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Execution Proof Callout */}
      <Section spacing="large" background="default" colorTheme={credentialsTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <GlassCard theme={credentialsTheme} className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                What Zero Proves About Rationale
              </h3>
              <div className="space-y-4 text-base text-muted">
                <p>
                  <span className="font-bold text-accent">Technical execution:</span> 10 microservices in production
                  (Gateway, Email, Classifier, Summarization, Shopping Agent, Steel Agent, Scheduled Purchase,
                  Smart Replies, Actions, Analytics). 182 Swift files with A+ architecture.
                </p>
                <p>
                  <span className="font-bold text-accent">Systematic execution:</span> Live on App Store with 4-cohort
                  beta rollout strategy. Progressive quality scaling from 85% to 95%+ AI accuracy through structured
                  user feedback. 8-week go/no-go checkpoint with clear metrics.
                </p>
                <p>
                  <span className="font-bold text-accent">Product thinking:</span> 7 working prototypes built to test
                  assumptions before production code. 24-week roadmap with bootstrap and funded scenarios. Complete
                  financial model with TAM/SAM/SOM analysis.
                </p>
                <p className="text-foreground font-semibold">
                  This is what conviction looks like: working software, validated architecture, and execution plans
                  ready to scale. The same speed and depth we bring to client engagements.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
      </div>

      {/* Services (Brief) */}
      <div id="services">
      <Section spacing="large" background="transparent" colorTheme={servicesTheme}>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Rationale Kits: Clarity to Build Ship Run</h2>
            <p className="text-lg text-muted mb-8">
              Productized engagements from 2-week sprints to 18-month builds.
              Structured as cash, cash + equity, or equity-only. Like Zero—when we take equity, we're all in.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <GlassCard theme={servicesTheme} className="p-6 text-left">
                <h3 className="text-xl font-bold text-foreground mb-3">Clarity Kit</h3>
                <p className="text-sm text-muted mb-3">2 weeks · Strategy validation</p>
                <p className="text-sm text-muted">
                  Turn your idea into a structured execution plan with technical architecture and go-to-market strategy.
                </p>
              </GlassCard>

              <GlassCard theme={servicesTheme} className="p-6 text-left">
                <h3 className="text-xl font-bold text-foreground mb-3">Prototype Kit</h3>
                <p className="text-sm text-muted mb-3">4-6 weeks · Working software</p>
                <p className="text-sm text-muted">
                  Interactive prototypes that prove your concept. Test assumptions before committing to full build.
                </p>
              </GlassCard>

              <GlassCard theme={servicesTheme} className="p-6 text-left">
                <h3 className="text-xl font-bold text-foreground mb-3">Build Ship Run</h3>
                <p className="text-sm text-muted mb-3">6-18 months · Production product</p>
                <p className="text-sm text-muted">
                  Full product development from concept to App Store. Technical co-founder for equity partnerships.
                </p>
              </GlassCard>
            </div>
            <ButtonPrimary href="/contact" size="lg">
              Book a Kit Scoping Call
            </ButtonPrimary>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent" colorTheme={ctaTheme}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Work with Proven Builders
            </h2>
            <p className="text-base sm:text-lg text-muted mb-8">
              Show us your roadblock. We'll show you the execution plan.
            </p>
            <ButtonPrimary href="/contact" size="lg">
              Start a Conversation
            </ButtonPrimary>
          </div>
        </Container>
      </Section>
      </div>
    </>
  );
}
