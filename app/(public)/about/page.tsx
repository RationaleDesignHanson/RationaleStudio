/**
 * About Page
 * Studio story and founder background
 */

import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Rationale Studio',
  description: 'Ex-Meta Reality Labs (7 years). Head of Design experience. Building products with conviction and systematic execution.',
};

export default function AboutPage() {
  const heroTheme = getSectionTheme('hero');
  const contentTheme = getSectionTheme('content');

  return (
    <>
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Hero
              title="About Rationale"
              subtitle="Conviction before code"
              description="We're a product development studio built on one principle: prove it with working software, not slides."
            />
          </div>
        </Container>
      </Section>

      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Are</h2>
              <p className="text-base text-muted mb-4">
                Rationale is a product development studio founded by Matt Hanson, former Meta Reality Labs
                Senior Product Design Manager (7 years) and current FUBO VP of Design. We build products that ship—not prototypes that sit in Figma.
              </p>
              <p className="text-base text-muted">
                After a decade building at scale for Meta and FUBO, we're now applying that same systematic execution
                to our own portfolio IP and select client partnerships.
              </p>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Philosophy</h2>
              <p className="text-base text-muted mb-4 text-lg italic text-foreground">
                "I love to build bridges—between people, disciplines, technologies and ideas."
              </p>
              <p className="text-base text-muted">
                This philosophy drives everything at Rationale. We're multi-disciplinary by nature, translating
                between technical complexity and human needs. We don't just build software—we connect vision to execution,
                strategy to shipping, and ambitious ideas to working products.
              </p>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Work</h2>
              <p className="text-base text-muted mb-4">
                <span className="font-bold text-accent">Build-to-think philosophy:</span> We don't just plan products—we
                build working software to validate assumptions. Zero went from concept to App Store in 1 month with
                7 interactive prototypes validating core mechanics before launch.
              </p>
              <p className="text-base text-muted mb-4">
                <span className="font-bold text-accent">Systematic execution:</span> Productized engagement tiers (Rationale Kits)
                from 2-week strategy sprints to 18-month product builds. Clear scopes, predictable timelines, systematic delivery.
              </p>
              <p className="text-base text-muted">
                <span className="font-bold text-accent">Equity partnerships:</span> For the right projects, we take equity
                instead of cash. When we're invested, we're all in—same commitment we bring to our own portfolio IP.
              </p>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Founder Background</h2>
              <div className="space-y-6 text-base text-muted">
                <div>
                  <p className="font-bold text-foreground text-lg mb-2">Head of Design Experience (2025)</p>
                  <p className="mb-2">Led Growth, Design Systems, and New Features at a publicly traded live streaming platform.</p>
                  <p className="text-sm mb-2">Scaled design operations and product development, building AI-powered systems at production scale.</p>
                  <a href="/work/canvas" className="text-accent hover:underline text-sm font-medium">
                    View Project Canvas Case Study (Protected) →
                  </a>
                </div>

                <div>
                  <p className="font-bold text-foreground text-lg mb-2">Meta (2018–2025) — 7 Years</p>
                  <div className="space-y-3 ml-4">
                    <div>
                      <p className="font-semibold text-foreground">Senior Product Design Manager - FAIR (Embodied AI)</p>
                      <p className="text-sm mb-1">2023–2025 | Led design for fundamental AI research applications</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Designed AI agent interactions for embodied intelligence research</li>
                        <li>• 60% increase in prototype velocity through systematic design systems</li>
                        <li>• Multi-disciplinary collaboration across ML research and product teams</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Senior Product Design Manager - Reality Labs</p>
                      <p className="text-sm mb-1">2018–2023 | AR/MR Glasses + Mobile Platform</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Led 20+ teams from 0-1 across AR shopping, spatial computing, and mixed reality</li>
                        <li>• Launched AR Shopping in Instagram/Facebook Ads (100%+ inventory growth)</li>
                        <li>• F8 2018 presenter with Nike, Target, Sephora, ASUS</li>
                        <li>• Patent: "Interactive Avatars in Artificial Reality" (Spark AR, 2021)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Art Director - Facebook Messenger</p>
                      <p className="text-sm mb-1">2017–2018 | Consumer messaging platform</p>
                      <ul className="text-sm space-y-1 ml-4">
                        <li>• Redesigned messaging experience for billions of users</li>
                        <li>• Led visual design and brand evolution for core product</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-foreground text-lg mb-2">Education & Recognition</p>
                  <p className="mb-1">BFA in Computer Art, SUNY Buffalo (1996–2000)</p>
                  <p className="text-sm">Patent holder: "Interactive Avatars in Artificial Reality" (USPTO)</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Beyond Work</h2>
              <p className="text-base text-muted mb-4">
                Father of three daughters. When not building products, you'll find me throwing pottery,
                experimenting in the kitchen (beef wellington is a specialty), or logging miles on the Peloton.
              </p>
              <p className="text-base text-muted">
                These pursuits aren't separate from the work—they're all about the same thing: systematic practice,
                iterative improvement, and finding joy in the process of making things better.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}
