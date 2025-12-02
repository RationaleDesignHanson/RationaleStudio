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
  description: 'Ex-Meta Reality Labs (7 years). FUBO VP Engineering. Building products with conviction and systematic execution.',
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
                Rationale is a product development studio founded by Matt Hanson, former Meta Reality Labs engineer
                (7 years) and FUBO VP of Engineering. We build products that ship—not prototypes that sit in Figma.
              </p>
              <p className="text-base text-muted">
                After a decade building at scale for Meta and FUBO, we're now applying that same systematic execution
                to our own portfolio IP and select client partnerships.
              </p>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Work</h2>
              <p className="text-base text-muted mb-4">
                <span className="font-bold text-accent">Build-to-think philosophy:</span> We don't just plan products—we
                build working software to validate assumptions. Zero went from concept to App Store in 6 weeks with
                7 interactive prototypes.
              </p>
              <p className="text-base text-muted mb-4">
                <span className="font-bold text-accent">Systematic execution:</span> Productized engagement tiers (Rationale Kits)
                from 2-week strategy sprints to 18-month product builds. Clear scopes, predictable timelines.
              </p>
              <p className="text-base text-muted">
                <span className="font-bold text-accent">Equity partnerships:</span> For the right projects, we take equity
                instead of cash. When we're invested, we're all in—same commitment we bring to our own portfolio IP.
              </p>
            </GlassCard>

            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Founder Background</h2>
              <div className="space-y-4 text-base text-muted">
                <div>
                  <p className="font-bold text-foreground">Meta (7 years)</p>
                  <p>Reality Labs, FAIR, Messenger. Built AR experiences presented at F8 2018 alongside Nike, Target, Sephora.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">FUBO</p>
                  <p>VP of Engineering, AI systems. Scaled engineering teams and infrastructure for live streaming platform.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Patent Holder</p>
                  <p>Interactive Avatars in Augmented Reality (USPTO). Demonstrates deep technical expertise in emerging tech.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </>
  );
}
