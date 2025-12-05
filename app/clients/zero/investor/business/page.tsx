/**
 * Zero Investor Portal - Business Model & Market
 *
 * Market analysis, business model, and competitive positioning
 */

'use client';

import { Container, Section } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { InvestorLayout } from '@/components/zero/InvestorLayout';

export default function ZeroInvestorBusinessPage() {
  const theme = getSectionTheme('hero');

  return (
    <InvestorLayout>
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
    </InvestorLayout>
  );
}
