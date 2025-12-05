/**
 * Zero Investor Portal - Technical Architecture
 *
 * System overview, iOS app, backend services, and AI classification
 */

'use client';

import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { InvestorLayout } from '@/components/zero/InvestorLayout';

export default function ZeroInvestorTechnicalPage() {
  const theme = getSectionTheme('hero');

  return (
    <InvestorLayout>
      {/* Technical Architecture */}
      <Section spacing="large" background="default" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Technical Architecture</h2>

            {/* Architecture Overview */}
            <GlassCard theme={theme} className="p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">System Overview</h3>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
                  <div className="text-3xl font-bold text-accent mb-2">268</div>
                  <div className="text-sm text-muted">Swift Files</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
                  <div className="text-3xl font-bold text-accent mb-2">10</div>
                  <div className="text-sm text-muted">Microservices</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
                  <div className="text-3xl font-bold text-accent mb-2">A-</div>
                  <div className="text-sm text-muted">Architecture Grade</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background/50 border border-border">
                  <div className="text-3xl font-bold text-accent mb-2">43</div>
                  <div className="text-sm text-muted">Intent Categories</div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p><span className="font-bold text-foreground">Platform:</span> Native iOS (SwiftUI), Node.js backend, Google Cloud Run infrastructure</p>
                <p><span className="font-bold text-foreground">Architecture Assessment:</span> A- grade (Claude Sonnet 4.5 code analysis). Clean service boundaries, zero circular dependencies, protocol-driven design.</p>
                <p><span className="font-bold text-foreground">Security:</span> OAuth 2.0 authentication, zero-knowledge architecture (no permanent email storage), JWT tokens, end-to-end encryption for credentials.</p>
              </div>
            </GlassCard>

            {/* iOS & Backend */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <GlassCard theme={theme} className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">iOS Application</h4>
                <div className="space-y-3 text-sm text-muted">
                  <p><span className="font-bold text-foreground">268 Swift files:</span></p>
                  <ul className="space-y-1 pl-4">
                    <li>• Core Services (ActionRouter, EmailAPI)</li>
                    <li>• Integration Services (Calendar, Contacts, Wallet)</li>
                    <li>• Action Modals (43+ actions)</li>
                    <li>• Data Services (persistence, caching)</li>
                  </ul>
                  <p className="pt-2"><span className="font-bold text-foreground">Patterns:</span> Protocol-driven architecture, observable state management (@Published), SwiftUI native</p>
                </div>
              </GlassCard>

              <GlassCard theme={theme} className="p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">Backend Microservices</h4>
                <div className="space-y-3 text-sm text-muted">
                  <p><span className="font-bold text-foreground">10 production services:</span></p>
                  <ul className="space-y-1 pl-4">
                    <li>• Gateway (OAuth, routing)</li>
                    <li>• Email (Gmail API)</li>
                    <li>• Classifier (43 categories)</li>
                    <li>• Summarization (Gemini AI)</li>
                    <li>• Smart Replies, Shopping, Actions...</li>
                  </ul>
                  <p className="pt-2"><span className="font-bold text-foreground">Infrastructure:</span> Google Cloud Run, auto-scaling, containerized deployment</p>
                </div>
              </GlassCard>
            </div>

            {/* AI System */}
            <GlassCard theme={theme} className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">AI Classification System</h3>
              <div className="space-y-4 text-sm text-muted">
                <p><span className="font-bold text-foreground">43 Intent Categories</span> including:</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-foreground mb-2">Commerce</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Shipping & delivery</li>
                      <li>• Returns & refunds</li>
                      <li>• Order confirmations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Billing</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Invoices & receipts</li>
                      <li>• Subscriptions</li>
                      <li>• Payment confirmations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Calendar</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Meeting requests</li>
                      <li>• Event RSVPs</li>
                      <li>• Reminders</li>
                    </ul>
                  </div>
                </div>
                <p className="pt-4"><span className="font-bold text-foreground">Processing Pipeline:</span> Email ingestion → Intent classification → Entity extraction → Action suggestion → Priority scoring → UI rendering. Average processing time: 45-85ms.</p>
                <p><span className="font-bold text-foreground">Baseline Performance:</span> Initial testing shows 91.7% intent classification accuracy, 100% action extraction accuracy. These baselines established before building broader email corpus. Core business intents (billing, finance, healthcare) currently at 100%.</p>
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </InvestorLayout>
  );
}
