/**
 * Contact Page
 * Partnership inquiries and project scoping
 */

import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Rationale Studio',
  description: 'Start a conversation about your product. We build for cash, equity, or hybrid partnerships.',
};

export default function ContactPage() {
  const heroTheme = getSectionTheme('hero');
  const contentTheme = getSectionTheme('content');

  return (
    <>
      <Section spacing="large" background="transparent" colorTheme={heroTheme}>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Hero
              title="Let's Talk"
              subtitle="Start a conversation"
              description="Whether you need a 2-week strategy sprint or an 18-month technical co-founder, we're here to help you ship."
            />
          </div>
        </Container>
      </Section>

      <Section spacing="large" background="default" colorTheme={contentTheme}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <GlassCard theme={contentTheme} className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:hanson@rationale.work" className="text-accent hover:underline text-lg">
                    hanson@rationale.work
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">What to Include</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li>• What you're building and the problem you're solving</li>
                    <li>• Your timeline (weeks? months?)</li>
                    <li>• Your preference: cash, equity, or hybrid engagement</li>
                    <li>• Any existing work (prototypes, specs, etc.)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                  <p className="text-sm text-muted">
                    <span className="font-bold text-accent">Response time:</span> We typically respond within 24 hours
                    with initial feedback and next steps. If we're not the right fit, we'll tell you honestly and
                    recommend alternatives.
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <GlassCard theme={contentTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">For Founders</h3>
                <p className="text-sm text-muted mb-4">
                  Need technical execution? We offer productized Kits from 2-week sprints to 18-month builds.
                  Cash, equity, or hybrid structures available.
                </p>
                <a href="/#services" className="text-accent hover:underline text-sm font-medium">
                  View Rationale Kits →
                </a>
              </GlassCard>

              <GlassCard theme={contentTheme} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">For Partners</h3>
                <p className="text-sm text-muted mb-4">
                  Interested in our portfolio IP (Zero, Compass) or strategic partnerships?
                  Let's explore collaboration opportunities.
                </p>
                <a href="/#portfolio" className="text-accent hover:underline text-sm font-medium">
                  View Portfolio →
                </a>
              </GlassCard>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
