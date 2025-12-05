/**
 * Zero Investor Portal - Overview
 *
 * Executive summary and product status
 */

'use client';

import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { InvestorLayout } from '@/components/zero/InvestorLayout';

export default function ZeroInvestorOverviewPage() {
  const theme = getSectionTheme('hero');

  return (
    <InvestorLayout>
      {/* Executive Summary */}
      <Section spacing="large" background="default" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Executive Summary</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <GlassCard theme={theme} className="p-6">
                <div className="text-sm text-muted mb-2">Product Status</div>
                <div className="text-2xl font-bold text-accent mb-2">Production-Ready</div>
                <p className="text-sm text-muted">Pre-launch, all systems deployed</p>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <div className="text-sm text-muted mb-2">Target Market</div>
                <div className="text-2xl font-bold text-accent mb-2">$28B+ TAM</div>
                <p className="text-sm text-muted">Email productivity tools</p>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <div className="text-sm text-muted mb-2">Business Model</div>
                <div className="text-2xl font-bold text-accent mb-2">Freemium SaaS</div>
                <p className="text-sm text-muted">Free + $12/mo Pro tier</p>
              </GlassCard>
            </div>

            <GlassCard theme={theme} className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">What is Zero?</h3>
              <div className="space-y-4 text-muted">
                <p>
                  Zero is Rationale's AI email intelligence product that automatically extracts actionable tasks from email and presents them in swipeable cards. Unlike traditional email clients that focus on organization, Zero identifies the bills, packages, forms, and events buried in your inbox and makes them immediately actionable.
                </p>
                <p>
                  <span className="font-bold text-foreground">Current Status:</span> Production-ready with 268 Swift files (iOS), 10 microservices backend, Gmail OAuth integration, and AI classification system (43 intent categories). Pre-launch, seeking capital to scale user acquisition.
                </p>
                <p>
                  <span className="font-bold text-foreground">Market Opportunity:</span> Email overload costs knowledge workers $28B+ annually in lost productivity. 121 emails/day average. Existing solutions (Superhuman, Spark, Shortwave) focus on speed and organization—none extract and complete tasks automatically.
                </p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </InvestorLayout>
  );
}
