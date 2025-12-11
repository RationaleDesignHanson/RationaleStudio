/**
 * Zero Investor Portal - Roadmap & Milestones
 *
 * Product roadmap, quarterly goals, and growth milestones
 */

'use client';

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { InvestorLayout } from '@/components/zero/InvestorLayout';

export default function ZeroInvestorRoadmapPage() {
  const theme = getSectionTheme('hero');

  return (
    <InvestorLayout>
      {/* Roadmap & Milestones */}
      <Section spacing="large" background="transparent" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Roadmap & Milestones</h2>

            <GlassCard theme={theme} className="p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Current Status</h3>
              <div className="space-y-4 text-sm text-muted">
                <p><span className="font-bold text-foreground">Production-Ready</span> (December 2024)</p>
                <ul className="space-y-2 pl-6">
                  <li>• iOS app complete (268 Swift files, A- architecture)</li>
                  <li>• 10 microservices deployed on Google Cloud Run</li>
                  <li>• Gmail OAuth integration functional</li>
                  <li>• Classification system built (43 categories)</li>
                  <li>• All infrastructure tested and operational</li>
                </ul>
                <p><span className="font-bold text-foreground">Pre-Launch</span></p>
                <ul className="space-y-2 pl-6">
                  <li>• No users yet (preparing for onboarding)</li>
                  <li>• No revenue (free beta planned)</li>
                  <li>• Baseline accuracy established (91.7% intent, 100% action); will improve with broader corpus</li>
                </ul>
              </div>
            </GlassCard>

            {/* Quarterly Goals */}
            <div className="space-y-6">
              <GlassCard theme={theme} className="p-6">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">Q1 2025: Beta Launch</h4>
                    <ul className="text-sm text-muted space-y-2">
                      <li>• TestFlight beta with 10-25 users (friends & family)</li>
                      <li>• Validate core UX and begin building email corpus</li>
                      <li>• Collect feedback and iterate on action types</li>
                      <li>• Target: {'>'}80% daily active, {'>'}7 actions/user/day</li>
                    </ul>
                </div>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">Q2 2025: Expand to 100 Users</h4>
                    <ul className="text-sm text-muted space-y-2">
                      <li>• Invite-only expansion (product hunt, twitter)</li>
                      <li>• Add Outlook/iCloud email support</li>
                      <li>• Improve classification with real user email corpus and corrections</li>
                      <li>• Target: 100 users, 5-10% week-over-week growth</li>
                    </ul>
                </div>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">Q3 2025: Revenue Launch</h4>
                    <ul className="text-sm text-muted space-y-2">
                      <li>• Launch Pro tier ($12/mo)</li>
                      <li>• Public App Store availability</li>
                      <li>• Target: 1,000 users, 50-100 paying (5-10% conversion)</li>
                      <li>• Milestone: $500-1,200 MRR</li>
                    </ul>
                </div>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2">Q4 2025: Scale to 10K Users</h4>
                    <ul className="text-sm text-muted space-y-2">
                      <li>• Marketing push (content, paid acquisition)</li>
                      <li>• Android beta launch</li>
                      <li>• Target: 10,000 users, 500-1,000 paying</li>
                      <li>• Milestone: $6-12K MRR</li>
                    </ul>
                </div>
              </GlassCard>
            </div>

            {/* Interactive Dashboard Link */}
            <div className="mt-8 p-6 rounded-lg border border-accent/30 bg-accent/5">
              <p className="text-sm text-muted mb-4">
                <span className="font-bold text-foreground">Full Interactive Roadmap:</span> For detailed week-by-week milestones, technical plans, and budget breakdown, visit the complete roadmap dashboard.
              </p>
              <Link
                href="/clients/zero/investor"
                className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium text-sm"
              >
                View Full Investor Portal →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact & Next Steps */}
      <Section spacing="large" background="accent" colorTheme={theme}>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Investment Opportunity</h2>
            <p className="text-lg text-muted mb-8">
              Zero demonstrates Rationale's ability to build and ship real products. Seeking launch capital to scale user acquisition and validate product-market fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:invest@rationale.work?subject=Zero Investment Inquiry"
                className="px-4 sm:px-6 md:px-8 py-4 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Schedule Conversation
              </a>
              <Link
                href="/contact"
                className="px-4 sm:px-6 md:px-8 py-4 border border-foreground text-foreground rounded-lg hover:bg-foreground/10 transition-colors font-medium"
              >
                General Inquiries
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </InvestorLayout>
  );
}
