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
      {/* Hero: Risk Mitigation + Velocity to Conviction */}
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-sm font-bold text-accent uppercase tracking-wide">
                Ex-Meta Reality Labs (7 years) · Head of Design · 1 Patent
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Don't Spend 6 Months Building the Wrong Thing
            </h1>

            <p className="text-lg sm:text-xl text-muted mb-8 max-w-3xl mx-auto">
              Rationale gets you to working prototypes in weeks, not quarters. Feel what works early.
              Build with conviction. Ship with speed.
            </p>

            <p className="text-base text-muted mb-8 max-w-3xl mx-auto">
              <span className="font-semibold text-foreground">Proof:</span> Zero went concept to App Store in 1 month
              with 7 validation prototypes and 10 production microservices. Same systematic velocity for your product.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonPrimary href="#portfolio" size="lg">
                See How We De-Risk →
              </ButtonPrimary>
              <ButtonSecondary href="#services" size="lg">
                View Our Kits
              </ButtonSecondary>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why We Ship Fast: Operator Systems */}
      <Section spacing="large" background="default" colorTheme={credentialsTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Why We Ship Fast: Operator Systems from Meta + Head of Design Experience
            </h2>

            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-base text-muted mb-4">
                Rationale's founder spent 7 years at Meta (Reality Labs, FAIR, Messenger) and served as
                Head of Design at a publicly traded company. That background isn't just credibility—it's the source of our systematic execution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard theme={credentialsTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">What Meta Taught Us</h3>
                <ul className="text-sm text-muted space-y-2">
                  <li>• Build-to-think methodology: prototype to validate, don't plan to perfection</li>
                  <li>• Structured experimentation: test assumptions early and often</li>
                  <li>• Multi-disciplinary velocity: designers, engineers, and product thinkers moving as one</li>
                </ul>
              </GlassCard>

              <GlassCard theme={credentialsTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">What That Means for You</h3>
                <p className="text-sm text-muted mb-3">
                  Zero went concept to App Store in 1 month because we applied these systems. Same rigor, same velocity for client partnerships.
                </p>
                <p className="text-sm text-muted">
                  Feel what works in weeks, not quarters. Build with conviction.
                </p>
              </GlassCard>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <GlassCard theme={credentialsTheme} className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">7 years</div>
                <p className="text-xs text-muted">Meta (FAIR, Reality Labs, Messenger)</p>
              </GlassCard>

              <GlassCard theme={credentialsTheme} className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">F8 2018</div>
                <p className="text-xs text-muted">Presenter with Nike, Target, Sephora</p>
              </GlassCard>

              <GlassCard theme={credentialsTheme} className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">1 Patent</div>
                <p className="text-xs text-muted">Interactive Avatars in AR</p>
              </GlassCard>
            </div>

            <div className="text-center">
              <ButtonSecondary href="/about">Full operator background →</ButtonSecondary>
            </div>
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
                      in production. 182 Swift files with A+ architecture. 7 working prototypes to
                      feel what worked before we built production code.
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

      {/* Dual-Engine Model: Portfolio IP + Client Kits */}
      <Section spacing="large" background="transparent" colorTheme={portfolioTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              How Rationale Grows: Two Engines, One System
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard theme={portfolioTheme} className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Engine 1 — Portfolio IP (Products We Own)
                </h3>
                <p className="text-sm text-muted mb-3">
                  We design, build, and launch proprietary products like Zero and Compass. These prove our
                  systematic execution and generate IP we can scale or license.
                </p>
                <p className="text-xs text-muted">
                  Zero: 1 month to App Store. Compass: 6-week prototype sprint. Both demonstrate velocity across domains.
                </p>
              </GlassCard>

              <GlassCard theme={portfolioTheme} className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Engine 2 — Client Kits (Partnerships We Fund)
                </h3>
                <p className="text-sm text-muted mb-3">
                  We transform client product challenges into shipped software via structured engagements:
                  Clarity Kits (2 weeks), Prototype Kits (4-6 weeks), and Build Ship Run (6-18 months).
                </p>
                <p className="text-xs text-muted">
                  Cash, equity, or hybrid structures. Same systematic velocity.
                </p>
              </GlassCard>
            </div>

            <GlassCard theme={portfolioTheme} className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Why Both?</h3>
              <p className="text-base text-muted mb-4">
                Portfolio IP proves capability and funds runway. Client Kits fund Portfolio development and
                harden our frameworks. Both engines compound: every pilot hardens our systems, every product
                validates our approach.
              </p>
              <p className="text-base text-foreground font-semibold">
                This isn't a studio that does client work on the side. This is a studio that builds IP through
                both channels—yours and ours.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>

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
                <p className="text-sm font-semibold text-accent mb-3">2 Weeks to Validated Direction</p>
                <p className="text-sm text-muted mb-3">
                  Walk in with an idea. Walk out with a production-ready technical plan, go-to-market positioning,
                  and go/no-go recommendation.
                </p>
                <p className="text-xs text-muted mb-3">
                  Same rigor we used on Zero: complete technical plan in 1 month.
                </p>
                <p className="text-xs text-foreground font-semibold">
                  Cash or equity structures
                </p>
              </GlassCard>

              <GlassCard theme={servicesTheme} className="p-6 text-left">
                <h3 className="text-xl font-bold text-foreground mb-3">Prototype Kit</h3>
                <p className="text-sm font-semibold text-accent mb-3">4-6 Weeks to Working Software</p>
                <p className="text-sm text-muted mb-3">
                  Interactive prototypes you can test with real users. Feel what works before committing to
                  full development. Test assumptions, not guesses.
                </p>
                <p className="text-xs text-muted mb-3">
                  Zero proof: 7 working prototypes built to validate core mechanics before production.
                </p>
                <p className="text-xs text-foreground font-semibold">
                  Cash or equity structures
                </p>
              </GlassCard>

              <GlassCard theme={servicesTheme} className="p-6 text-left">
                <h3 className="text-xl font-bold text-foreground mb-3">Build Ship Run</h3>
                <p className="text-sm font-semibold text-accent mb-3">6-18 Months to Production Product</p>
                <p className="text-sm text-muted mb-3">
                  Full product development from concept to App Store/launch. We become your technical co-founder—especially
                  for equity partnerships. All in, just like Zero.
                </p>
                <p className="text-xs text-muted mb-3">
                  Zero proof: 10 microservices, 182 Swift files, complete beta strategy in 6 weeks.
                </p>
                <p className="text-xs text-foreground font-semibold">
                  Cash, equity, or hybrid partnerships
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
              Start Feeling What Works in 2 Weeks
            </h2>
            <p className="text-base sm:text-lg text-muted mb-8">
              Don't wait 6 months to discover what doesn't work. Get to working prototypes in weeks,
              not quarters. Same velocity we brought to Zero.
            </p>
            <ButtonPrimary href="/contact" size="lg">
              Book a Kit Scoping Call
            </ButtonPrimary>
          </div>
        </Container>
      </Section>
      </div>
    </>
  );
}
