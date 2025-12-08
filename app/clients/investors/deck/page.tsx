/**
 * Investor Deck Page (Protected, Shared Auth)
 *
 * Comprehensive investor deck with financials, competitive analysis, and team info.
 * Uses shared auth session with /investors page - no re-authentication needed.
 */

'use client';

import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Hero } from '@/components/sections/Hero';
import { PasswordGate } from '@/components/sections/PasswordGate';
import { ResponsiveText, ResponsiveBox } from '@/lib/ui/responsive';
import {
  investorOverview,
  businessModel,
  marketOpportunity,
  competitivePosition,
  financialHighlights,
  whyNow,
  team,
  useOfFunds,
  capitalStrategy,
  investorOperatingModel,
  roadmap
} from '@/lib/content/investors';

const INVESTOR_DECK_PASSWORD = 'rationale2024';

export default function InvestorDeckPage() {
  return (
    <PasswordGate
      password={INVESTOR_DECK_PASSWORD}
      storageKey="investors-access"
      title="Protected Investor Deck"
      description="This deck is password-protected. Contact us if you need access."
    >
      {/* Hero */}
      <Section spacing="large" background="default">
        <Hero
          title="Investor Deck"
          subtitle={investorOverview.tagline}
          description="Comprehensive overview of Rationale's business, market opportunity, and growth strategy."
          centered={false}
        />
      </Section>

      {/* Executive Summary */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Executive Summary
            </ResponsiveText>

            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
                  The Problem
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {investorOverview.problem}
                </p>
              </ResponsiveBox>

              <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
                  Our Solution
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {investorOverview.solution}
                </p>
              </ResponsiveBox>

              <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
                  Market Opportunity
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {investorOverview.opportunity}
                </p>
              </ResponsiveBox>

              <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
                  The Ask
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {investorOverview.ask}
                </p>
              </ResponsiveBox>
            </div>
          </div>
        </Container>
      </Section>

      {/* Capital Strategy & Runway */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              {capitalStrategy.title}
            </ResponsiveText>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mb-6">
              <p className="text-base text-foreground leading-relaxed">
                {capitalStrategy.overview}
              </p>
            </ResponsiveBox>

            {/* Objectives */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Objectives of the Raise</h3>
              <div className="space-y-4">
                {capitalStrategy.objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-muted"
                  >
                    <h4 className="font-semibold text-foreground mb-2">{objective.title}</h4>
                    <p className="text-sm text-muted">{objective.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Raise Structure */}
            <ResponsiveBox className="rounded-lg border border-border bg-background mb-8">
              <h3 className="text-lg font-bold mb-4">Raise Structure</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted mb-1">Instrument</p>
                  <p className="text-xl font-bold text-accent">{capitalStrategy.raiseStructure.instrument}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Target Amount</p>
                  <p className="text-xl font-bold text-accent">{capitalStrategy.raiseStructure.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Runway</p>
                  <p className="text-xl font-bold text-accent">{capitalStrategy.raiseStructure.runway}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Monthly Burn</p>
                  <p className="text-xl font-bold text-accent">{capitalStrategy.raiseStructure.monthlyBurn}</p>
                </div>
              </div>
            </ResponsiveBox>

            {/* What This Unlocks */}
            <div>
              <h3 className="text-lg font-bold mb-4">What This Capital Unlocks</h3>
              <div className="space-y-3">
                {capitalStrategy.whatThisUnlocks.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg border border-border bg-muted"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent text-sm font-bold">→</span>
                    </div>
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Use of Funds */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Use of Funds
            </ResponsiveText>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mb-6">
              <p className="text-base text-foreground leading-relaxed mb-4">
                {useOfFunds.overview}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-accent/20">
                <div>
                  <p className="text-sm text-muted mb-1">Total Raise</p>
                  <p className="text-2xl font-bold text-accent">{useOfFunds.totalRaise}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Runway</p>
                  <p className="text-2xl font-bold text-accent">{useOfFunds.runway}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Monthly Burn</p>
                  <p className="text-2xl font-bold text-accent">{useOfFunds.monthlyBurn}</p>
                </div>
              </div>
            </ResponsiveBox>

            <div className="space-y-4">
              {useOfFunds.allocations.map((allocation, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <p className="text-2xl font-bold text-accent">{allocation.percentage}</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{allocation.category}</h4>
                    <p className="text-sm text-muted">{allocation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Operating Model */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              {investorOperatingModel.title}
            </ResponsiveText>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mb-6">
              <p className="text-base text-foreground leading-relaxed">
                {investorOperatingModel.overview}
              </p>
            </ResponsiveBox>

            {/* Principles */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Operating Principles</h3>
              <div className="space-y-4">
                {investorOperatingModel.principles.map((principle, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-muted"
                  >
                    <h4 className="font-semibold text-foreground mb-2">{principle.title}</h4>
                    <p className="text-sm text-muted">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <ResponsiveBox className="rounded-lg border border-border bg-background">
              <h3 className="text-lg font-bold mb-4">Key Operating Metrics</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {investorOperatingModel.keyMetrics.map((metric, index) => (
                  <div key={index}>
                    <p className="text-2xl font-bold text-accent mb-1">{metric.value}</p>
                    <p className="text-sm text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </ResponsiveBox>
          </div>
        </Container>
      </Section>

      {/* Roadmap */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              {roadmap.title}
            </ResponsiveText>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mb-6">
              <p className="text-base text-foreground leading-relaxed">
                {roadmap.overview}
              </p>
            </ResponsiveBox>

            <div className="space-y-6">
              {roadmap.phases.map((phase, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-border bg-background"
                >
                  <h3 className="text-lg font-bold text-accent mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-foreground">
                        <span className="text-accent flex-shrink-0">→</span>
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mt-6">
              <p className="text-base font-semibold text-foreground">
                {roadmap.endGoal}
              </p>
            </ResponsiveBox>
          </div>
        </Container>
      </Section>

      {/* Business Model Deep Dive */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Business Model
            </ResponsiveText>

            {/* Revenue Streams */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">{businessModel.revenueStreams.title}</h3>
              <div className="space-y-4">
                {businessModel.revenueStreams.streams.map((stream, index) => (
                  <ResponsiveBox
                    key={index}
                    className="rounded-lg border border-border bg-muted"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{stream.name}</h4>
                      <span className="text-accent font-bold">{stream.revenue}</span>
                    </div>
                    <p className="text-sm text-muted">{stream.description}</p>
                  </ResponsiveBox>
                ))}
              </div>
            </div>

            {/* Unit Economics */}
            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
              <h3 className="text-lg font-bold mb-4">{businessModel.unitEconomics.title}</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {businessModel.unitEconomics.metrics.map((metric, index) => (
                  <div key={index}>
                    <p className="text-3xl font-bold text-accent mb-2">{metric.value}</p>
                    <p className="text-sm text-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </ResponsiveBox>
          </div>
        </Container>
      </Section>

      {/* Market Opportunity */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Market Opportunity
            </ResponsiveText>

            <div className="space-y-6">
              {/* Market Size */}
              <ResponsiveBox className="rounded-lg border border-border bg-background">
                <h3 className="text-lg font-bold mb-3">{marketOpportunity.marketSize.title}</h3>
                <p className="text-sm text-muted mb-6">{marketOpportunity.marketSize.description}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {marketOpportunity.marketSize.segments.map((segment, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted">
                      <p className="text-2xl font-bold text-accent mb-1">{segment.size}</p>
                      <p className="text-sm text-foreground">{segment.name}</p>
                    </div>
                  ))}
                </div>
              </ResponsiveBox>

              {/* Target Segments */}
              <div>
                <h3 className="text-lg font-bold mb-4">{marketOpportunity.targetSegments.title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {marketOpportunity.targetSegments.segments.map((segment, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-background">
                      <h4 className="font-semibold text-foreground mb-2">{segment.name}</h4>
                      <p className="text-sm text-muted">{segment.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Competitive Position */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Competitive Position
            </ResponsiveText>

            <div className="space-y-6">
              {/* Advantages */}
              <div>
                <h3 className="text-lg font-bold mb-4">{competitivePosition.advantages.title}</h3>
                <div className="space-y-3">
                  {competitivePosition.advantages.points.map((point, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 rounded-lg border border-border bg-muted"
                    >
                      <span className="text-accent">→</span>
                      <p className="text-sm text-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Differentiation */}
              <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5">
                <h3 className="text-lg font-bold mb-3">{competitivePosition.differentiation.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {competitivePosition.differentiation.description}
                </p>
              </ResponsiveBox>
            </div>
          </div>
        </Container>
      </Section>

      {/* Financial Highlights */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Financial Highlights
            </ResponsiveText>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {financialHighlights.map((highlight, index) => (
                <ResponsiveBox
                  key={index}
                  className="rounded-lg border border-border bg-background text-center"
                >
                  <p className="text-3xl font-bold text-accent mb-2">{highlight.value}</p>
                  <p className="text-sm text-foreground font-medium mb-1">{highlight.metric}</p>
                  <p className="text-xs text-muted">{highlight.period}</p>
                </ResponsiveBox>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Now */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Why Now?
            </ResponsiveText>

            <ResponsiveBox className="rounded-lg border border-accent/20 bg-accent/5 mb-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                {whyNow.thesis}
              </p>
            </ResponsiveBox>

            <div className="space-y-3">
              {whyNow.catalysts.map((catalyst, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-lg border border-border bg-muted"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm sm:text-base text-foreground">{catalyst}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section spacing="large" background="muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Team
            </ResponsiveText>

            <div className="space-y-6">
              {team.map((member, index) => (
                <ResponsiveBox
                  key={index}
                  className="rounded-lg border border-border bg-background"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-accent font-medium">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-4">{member.bio}</p>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">
                      Key Experience
                    </h4>
                    <ul className="space-y-1">
                      {member.experience.map((exp, idx) => (
                        <li key={idx} className="text-sm text-muted flex gap-2">
                          <span className="text-accent">→</span>
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ResponsiveBox>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Traction */}
      <Section spacing="large" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ResponsiveText variant="h2" className="mb-6 sm:mb-8">
              Current Traction
            </ResponsiveText>

            <div className="space-y-3">
              {investorOverview.traction.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-lg border border-border bg-muted"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent text-sm font-bold">→</span>
                  </div>
                  <p className="text-sm sm:text-base text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" background="accent">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ResponsiveText variant="h2" className="mb-4 sm:mb-6 text-white">
              Ready to discuss?
            </ResponsiveText>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
              Let's talk about this opportunity and how we can work together to build conviction capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-foreground bg-white rounded-md hover:bg-white/90 transition-colors text-center"
              >
                Schedule a call
              </Link>
              <Link
                href="/investors"
                className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-white bg-transparent border border-white/40 rounded-md hover:bg-white/10 transition-colors text-center"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PasswordGate>
  );
}
