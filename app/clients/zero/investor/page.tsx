/**
 * Zero Investor Portal
 *
 * Password-protected investor materials combining:
 * - Business plan and market analysis
 * - Technical architecture details
 * - Financial projections and roadmap
 * - Product status and milestones
 *
 * Access: username "zero" / password "123456"
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

export default function ZeroInvestorPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = getSectionTheme('hero');

  useEffect(() => {
    // Check authentication (allow ZERO or GLOBAL)
    const auth = sessionStorage.getItem('client-auth');
    if (auth !== 'ZERO' && auth !== 'GLOBAL') {
      router.push('/clients/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Verifying access...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <Section spacing="large" background="transparent" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/work/zero" className="text-accent hover:underline text-sm">
                ← Public Zero Page
              </Link>
              <span className="text-sm text-muted">Investor Access</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Zero Investor Portal
            </h1>
            <p className="text-lg text-muted mb-8">
              Complete business plan, technical architecture, financials, and roadmap for Rationale's AI email intelligence product.
            </p>

            {/* Quick Nav */}
            <div className="grid sm:grid-cols-4 gap-4 mb-12">
              <a
                href="#overview"
                className="p-4 rounded-lg border border-border bg-background/80 hover:bg-accent/10 transition-colors text-center"
              >
                <div className="text-sm font-medium">Overview</div>
              </a>
              <a
                href="#business"
                className="p-4 rounded-lg border border-border bg-background/80 hover:bg-accent/10 transition-colors text-center"
              >
                <div className="text-sm font-medium">Business Model</div>
              </a>
              <a
                href="#technical"
                className="p-4 rounded-lg border border-border bg-background/80 hover:bg-accent/10 transition-colors text-center"
              >
                <div className="text-sm font-medium">Technical</div>
              </a>
              <a
                href="#roadmap"
                className="p-4 rounded-lg border border-border bg-background/80 hover:bg-accent/10 transition-colors text-center"
              >
                <div className="text-sm font-medium">Roadmap</div>
              </a>
            </div>
          </div>
        </Container>
      </Section>

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

      {/* Business Model & Market */}
      <Section spacing="large" background="transparent" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Business Model & Market Analysis</h2>

            {/* Market Opportunity */}
            <GlassCard theme={theme} className="p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Market Opportunity</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">$28B+</div>
                  <div className="text-sm text-muted">Total Addressable Market (TAM)</div>
                  <p className="text-xs text-muted mt-2">Email productivity software globally</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">$8.4B</div>
                  <div className="text-sm text-muted">Serviceable Addressable Market (SAM)</div>
                  <p className="text-xs text-muted mt-2">Mobile-first email clients</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">$420M</div>
                  <div className="text-sm text-muted">Serviceable Obtainable Market (SOM)</div>
                  <p className="text-xs text-muted mt-2">AI-powered action extraction (5% of SAM)</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p><span className="font-bold text-foreground">Problem Scale:</span> 121 emails/day average for knowledge workers. 28% of work time spent on email management. $650B annual cost to US businesses.</p>
                <p><span className="font-bold text-foreground">Market Gap:</span> Existing solutions organize inboxes or speed up triage. None automatically extract and complete actionable tasks (bills, packages, forms, RSVPs).</p>
              </div>
            </GlassCard>

            {/* Business Model */}
            <GlassCard theme={theme} className="p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Revenue Model</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-lg border border-border bg-background/50">
                  <h4 className="text-lg font-bold text-foreground mb-3">Free Tier</h4>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Basic email triage (swipe cards)</li>
                    <li>• Mail vs Ads classification</li>
                    <li>• 3 actions per day limit</li>
                    <li>• Basic summarization</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-accent">$0</div>
                    <div className="text-xs text-muted">Free forever</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-accent/50 bg-accent/5">
                  <h4 className="text-lg font-bold text-foreground mb-3">Pro Tier</h4>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Unlimited actions</li>
                    <li>• Advanced AI features</li>
                    <li>• Smart replies</li>
                    <li>• Shopping automation</li>
                    <li>• Subscription cancellation</li>
                    <li>• Priority support</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-2xl font-bold text-accent">$12/mo</div>
                    <div className="text-xs text-muted">or $120/year (save 17%)</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted">
                <p><span className="font-bold text-foreground">Target Conversion:</span> 5-10% freemium conversion rate based on comparable products (Superhuman: 8%, Spark: 6%).</p>
                <p><span className="font-bold text-foreground">LTV:CAC:</span> Target ratio of 5:1 at scale. Customer lifetime value: $360 (30-month retention at $12/mo). Customer acquisition cost target: $72.</p>
              </div>
            </GlassCard>

            {/* Competitive Landscape */}
            <GlassCard theme={theme} className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Competitive Positioning</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Feature</th>
                      <th className="text-left py-3 px-4 font-medium text-accent">Zero</th>
                      <th className="text-left py-3 px-4 font-medium text-muted">Superhuman</th>
                      <th className="text-left py-3 px-4 font-medium text-muted">Spark</th>
                      <th className="text-left py-3 px-4 font-medium text-muted">Gmail</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Action Extraction</td>
                      <td className="py-3 px-4 text-accent font-bold">Yes</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">No</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Mobile-First</td>
                      <td className="py-3 px-4 text-accent font-bold">Yes</td>
                      <td className="py-3 px-4">Desktop-first</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">AI Classification</td>
                      <td className="py-3 px-4 text-accent font-bold">43 categories</td>
                      <td className="py-3 px-4">No</td>
                      <td className="py-3 px-4">Basic</td>
                      <td className="py-3 px-4">Basic</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Task Completion</td>
                      <td className="py-3 px-4 text-accent font-bold">In-app</td>
                      <td className="py-3 px-4">External</td>
                      <td className="py-3 px-4">External</td>
                      <td className="py-3 px-4">External</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Pricing</td>
                      <td className="py-3 px-4 text-accent font-bold">$0-12/mo</td>
                      <td className="py-3 px-4">$30/mo</td>
                      <td className="py-3 px-4">$0-8/mo</td>
                      <td className="py-3 px-4">Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted mt-4">
                <span className="font-bold text-foreground">Key Differentiation:</span> Zero is the only email client that completes tasks, not just organizes them. Competitors focus on speed (Superhuman), organization (Spark), or storage (Gmail)—none extract actionable items and execute them in-app.
              </p>
            </GlassCard>
          </div>
        </Container>
      </Section>

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
                href="/client/zero/dashboard"
                className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium text-sm"
              >
                View Full Dashboard →
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
                className="px-8 py-4 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Schedule Conversation
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 border border-foreground text-foreground rounded-lg hover:bg-foreground/10 transition-colors font-medium"
              >
                General Inquiries
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
