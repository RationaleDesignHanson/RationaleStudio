/**
 * Risk Reduction Tool Component
 *
 * Interactive assessment that helps users identify their biggest product risks
 * and shows the cost of building without validation.
 */

'use client';

import { useState, useMemo } from 'react';
import { GlassCard } from '@/components/visual';
import type { WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface RiskReductionToolProps {
  theme: WatercolorTheme;
  className?: string;
}

type RiskProfile = 'market' | 'technical' | 'behavior' | 'positioning';

interface RiskAssessment {
  profile: RiskProfile;
  title: string;
  description: string;
  costOfFailure: string;
  timeWasted: string;
  recommendation: string;
  kitSuggestion: string;
  kitHref: string;
}

export function RiskReductionTool({ theme, className = '' }: RiskReductionToolProps) {
  const [stage, setStage] = useState<'idea' | 'prototype' | 'mvp' | 'live'>('idea');
  const [uncertainty, setUncertainty] = useState<'market' | 'technical' | 'behavior' | 'positioning'>('market');
  const [timeline, setTimeline] = useState<'weeks' | 'months' | 'quarter'>('months');

  const assessment = useMemo((): RiskAssessment => {
    const profiles: Record<RiskProfile, RiskAssessment> = {
      market: {
        profile: 'market',
        title: 'Market Risk',
        description: 'You are uncertain whether the market wants what you are building. Building without validation means you could ship a product nobody needs.',
        costOfFailure: '6-12 months of runway + team morale',
        timeWasted: '3-6 months building the wrong thing',
        recommendation: 'Validate market demand before committing to a full build. Test core value prop with real users.',
        kitSuggestion: 'Validation Kit',
        kitHref: '/services#validation-kit',
      },
      technical: {
        profile: 'technical',
        title: 'Technical Feasibility Risk',
        description: 'You are uncertain whether the technology can deliver what you are promising. Building without proof-of-concept means discovering blockers after expensive commitments.',
        costOfFailure: '4-8 months + engineering credibility',
        timeWasted: '2-4 months discovering it cannot work',
        recommendation: 'Build functional proof-of-concept before full product build. Test hardest technical assumptions first.',
        kitSuggestion: 'Prototype Kit',
        kitHref: '/services#prototype-kit',
      },
      behavior: {
        profile: 'behavior',
        title: 'User Behavior Risk',
        description: 'You are uncertain how users will actually interact with your product. Building without behavioral validation means guessing at UX and discovering failures post-launch.',
        costOfFailure: '3-6 months + re-design costs',
        timeWasted: '2-3 months building flows users ignore',
        recommendation: 'Test real user behavior with functional prototypes before engineering handoff.',
        kitSuggestion: 'Prototype Kit + Validation',
        kitHref: '/services#prototype-kit',
      },
      positioning: {
        profile: 'positioning',
        title: 'Strategic Positioning Risk',
        description: 'You are uncertain about positioning, differentiation, or go-to-market strategy. Building without clarity means shipping a product that does not resonate or competes poorly.',
        costOfFailure: '6-12 months + missed fundraising window',
        timeWasted: '4-6 months with unclear narrative',
        recommendation: 'Define positioning, competitive strategy, and narrative before execution.',
        kitSuggestion: 'Clarity Kit',
        kitHref: '/services#clarity-kit',
      },
    };

    return profiles[uncertainty];
  }, [uncertainty]);

  const urgencyMultiplier = useMemo(() => {
    if (timeline === 'weeks') return 'Critical';
    if (timeline === 'months') return 'High';
    return 'Medium';
  }, [timeline]);

  return (
    <GlassCard theme={theme} className={`p-6 sm:p-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            What is Your Biggest Risk?
          </h3>
          <p className="text-sm sm:text-base text-muted">
            Identify your riskiest assumptions before committing expensive resources
          </p>
        </div>

        {/* Assessment Questions */}
        <div className="space-y-6 mb-8">
          {/* Question 1: Stage */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              Where are you in the product journey?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: 'idea', label: 'Idea Stage' },
                { key: 'prototype', label: 'Have Prototype' },
                { key: 'mvp', label: 'Building MVP' },
                { key: 'live', label: 'Live Product' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStage(key as typeof stage)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    stage === key
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-background/50 text-muted hover:border-accent/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Biggest Uncertainty */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              What is your biggest uncertainty right now?
            </label>
            <div className="space-y-2">
              {[
                { key: 'market', label: 'Does the market want this?', desc: 'Uncertain about demand or product-market fit' },
                { key: 'technical', label: 'Can we actually build this?', desc: 'Uncertain about technical feasibility' },
                { key: 'behavior', label: 'How will users interact with it?', desc: 'Uncertain about UX or user behavior' },
                { key: 'positioning', label: 'How do we position and differentiate?', desc: 'Uncertain about strategy or go-to-market' },
              ].map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setUncertainty(key as typeof uncertainty)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    uncertainty === key
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-background/50 text-muted hover:border-accent/50'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{label}</div>
                  <div className="text-xs text-muted">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Timeline Pressure */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-3">
              How much time do you have before you need to commit resources?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'weeks', label: 'Weeks' },
                { key: 'months', label: 'Months' },
                { key: 'quarter', label: 'Quarter+' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTimeline(key as typeof timeline)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    timeline === key
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-background/50 text-muted hover:border-accent/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment Results */}
        <div className="space-y-4">
          {/* Risk Profile */}
          <div className="p-6 rounded-lg bg-accent/5 border-2 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-foreground">{assessment.title}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    urgencyMultiplier === 'Critical' ? 'bg-red-500/20 text-red-500' :
                    urgencyMultiplier === 'High' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {urgencyMultiplier} Urgency
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {assessment.description}
                </p>
              </div>
            </div>
          </div>

          {/* Cost of Getting It Wrong */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-xs font-bold text-muted uppercase tracking-wide mb-2">
                Cost of Getting It Wrong
              </div>
              <div className="text-lg font-bold text-foreground mb-1">
                {assessment.costOfFailure}
              </div>
              <div className="text-xs text-muted">
                Wasted runway + opportunity cost
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-xs font-bold text-muted uppercase tracking-wide mb-2">
                Time Wasted Building Wrong
              </div>
              <div className="text-lg font-bold text-foreground mb-1">
                {assessment.timeWasted}
              </div>
              <div className="text-xs text-muted">
                Before discovering the problem
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-6 rounded-lg bg-accent/10 border border-accent/30">
            <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-3">
              De-Risking Path
            </h4>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {assessment.recommendation}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium">Recommended:</span>
              <a
                href={assessment.kitHref}
                className="text-sm font-bold text-accent hover:underline"
              >
                {assessment.kitSuggestion} &rarr;
              </a>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-4 border-t border-border text-center">
            <p className="text-xs text-muted mb-3">
              De-risk before you commit. Validate assumptions in 2-6 weeks instead of discovering failures in 6 months.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Book a Risk Assessment Call
            </a>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
