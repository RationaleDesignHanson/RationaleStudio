'use client';

import { BaseCard, BaseCardHeader, BaseCardTitle, BaseCardSubtitle, BaseCardContent, BaseCardFooter, BaseCardBadgeContainer } from '@/components/ui/BaseCard';
import { StatusBadge, CategoryBadge, PriorityBadge, CheckpointBadge, ProjectStatusBadge } from '@/components/ui/Badge';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@/components/ui/ButtonHierarchy';
import { ArrowRight, Rocket, Star } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Rationale Design System</h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Unified component library with BaseCard, Badge, and Button systems. All components use centralized design tokens for consistency.
          </p>
        </div>

        {/* BaseCard Variants */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">BaseCard Variants</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Default Variant */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Default Card</BaseCardTitle>
                <BaseCardSubtitle>variant="default"</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300">
                  Standard card with gray borders and subtle shadow. Use for general content display.
                </p>
              </BaseCardContent>
            </BaseCard>

            {/* Featured Variant */}
            <BaseCard
              variant="featured"
              paddingSize="md"
              borderAccent="border-terminal-gold/30"
              glowEffect="medium"
            >
              <BaseCardHeader>
                <BaseCardTitle>Featured Card</BaseCardTitle>
                <BaseCardSubtitle>variant="featured"</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300">
                  Hero/highlighted card with accent border and medium glow. Use for primary content.
                </p>
              </BaseCardContent>
            </BaseCard>

            {/* Interactive Variant */}
            <BaseCard
              variant="interactive"
              paddingSize="md"
              href="/design-system"
            >
              <BaseCardHeader>
                <BaseCardTitle>Interactive Card</BaseCardTitle>
                <BaseCardSubtitle>variant="interactive"</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300">
                  Clickable card with hover effects. Automatically renders as Link when href prop is provided.
                </p>
              </BaseCardContent>
              <BaseCardFooter>
                <div className="flex items-center gap-2 text-terminal-gold text-sm">
                  <span>Click to navigate</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </BaseCardFooter>
            </BaseCard>

            {/* CTA Variant */}
            <BaseCard
              variant="cta"
              paddingSize="lg"
              borderAccent="border-terminal-gold/50"
              glowEffect="strong"
            >
              <BaseCardHeader>
                <BaseCardTitle>CTA Card</BaseCardTitle>
                <BaseCardSubtitle>variant="cta"</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Call-to-action card with strong glow and scale hover effect. Use for conversion-focused content.
                </p>
                <ButtonPrimary size="md" className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Get Started
                </ButtonPrimary>
              </BaseCardContent>
            </BaseCard>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Compact Size */}
            <BaseCard
              variant="subtle"
              size="compact"
              paddingSize="sm"
            >
              <BaseCardHeader>
                <BaseCardTitle className="text-base">Compact Card</BaseCardTitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-xs text-gray-400">
                  size="compact" with paddingSize="sm"
                </p>
              </BaseCardContent>
            </BaseCard>

            {/* Default Size */}
            <BaseCard
              variant="default"
              size="default"
              paddingSize="md"
            >
              <BaseCardHeader>
                <BaseCardTitle>Default Size</BaseCardTitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300">
                  size="default" with paddingSize="md"
                </p>
              </BaseCardContent>
            </BaseCard>

            {/* Large Size */}
            <BaseCard
              variant="featured"
              size="large"
              paddingSize="lg"
              borderAccent="border-terminal-gold/30"
            >
              <BaseCardHeader>
                <BaseCardTitle>Large Card</BaseCardTitle>
              </BaseCardHeader>
              <BaseCardContent>
                <p className="text-sm text-gray-300">
                  size="large" with paddingSize="lg"
                </p>
              </BaseCardContent>
            </BaseCard>
          </div>
        </section>

        {/* Badge System */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Badge System</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Status Badges */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Status Badges</BaseCardTitle>
                <BaseCardSubtitle>Project lifecycle states</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge status="Active" size="md" />
                  <StatusBadge status="In Development" size="md" />
                  <StatusBadge status="Spinout" size="md" />
                  <StatusBadge status="Archived" size="md" />
                </div>
              </BaseCardContent>
            </BaseCard>

            {/* Project Status Badges */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Project Status Badges</BaseCardTitle>
                <BaseCardSubtitle>Product delivery stages</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="flex flex-wrap gap-3">
                  <ProjectStatusBadge status="live" size="md" />
                  <ProjectStatusBadge status="beta" size="md" />
                  <ProjectStatusBadge status="delivered" size="md" />
                  <ProjectStatusBadge status="building" size="md" />
                </div>
              </BaseCardContent>
            </BaseCard>

            {/* Category Badges */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Category Badges</BaseCardTitle>
                <BaseCardSubtitle>Content classification</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="flex flex-wrap gap-3">
                  <CategoryBadge category="Product" size="md" />
                  <CategoryBadge category="AI" size="md" />
                  <CategoryBadge category="Strategy" size="md" />
                  <CategoryBadge category="Engineering" size="md" />
                  <CategoryBadge category="Design" size="md" />
                </div>
              </BaseCardContent>
            </BaseCard>

            {/* Priority & Checkpoint Badges */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Priority & Checkpoint Badges</BaseCardTitle>
                <BaseCardSubtitle>Task urgency & milestones</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Priority Levels:</p>
                    <div className="flex flex-wrap gap-2">
                      <PriorityBadge priority="High" size="sm" />
                      <PriorityBadge priority="Medium" size="sm" />
                      <PriorityBadge priority="Low" size="sm" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Checkpoint Types:</p>
                    <div className="flex flex-wrap gap-2">
                      <CheckpointBadge type="design" size="sm" />
                      <CheckpointBadge type="technical" size="sm" />
                      <CheckpointBadge type="launch" size="sm" />
                    </div>
                  </div>
                </div>
              </BaseCardContent>
            </BaseCard>
          </div>

          {/* Badge Sizes */}
          <BaseCard variant="subtle" paddingSize="md" className="mt-6">
            <BaseCardHeader>
              <BaseCardTitle>Badge Size Variants</BaseCardTitle>
            </BaseCardHeader>
            <BaseCardContent>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Small:</span>
                  <StatusBadge status="Active" size="sm" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Medium:</span>
                  <StatusBadge status="Active" size="md" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Large:</span>
                  <StatusBadge status="Active" size="lg" />
                </div>
              </div>
            </BaseCardContent>
          </BaseCard>
        </section>

        {/* Button Hierarchy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Button Hierarchy</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primary Buttons */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Primary Buttons</BaseCardTitle>
                <BaseCardSubtitle>Main CTAs</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="space-y-3">
                  <ButtonPrimary size="lg" fullWidth>
                    Large Primary
                  </ButtonPrimary>
                  <ButtonPrimary size="md" fullWidth>
                    Medium Primary
                  </ButtonPrimary>
                  <ButtonPrimary size="sm" fullWidth>
                    Small Primary
                  </ButtonPrimary>
                </div>
              </BaseCardContent>
            </BaseCard>

            {/* Secondary Buttons */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Secondary Buttons</BaseCardTitle>
                <BaseCardSubtitle>Alternate actions</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="space-y-3">
                  <ButtonSecondary size="lg" fullWidth>
                    Large Secondary
                  </ButtonSecondary>
                  <ButtonSecondary size="md" fullWidth>
                    Medium Secondary
                  </ButtonSecondary>
                  <ButtonSecondary size="sm" fullWidth>
                    Small Secondary
                  </ButtonSecondary>
                </div>
              </BaseCardContent>
            </BaseCard>

            {/* Tertiary Buttons */}
            <BaseCard variant="default" paddingSize="md">
              <BaseCardHeader>
                <BaseCardTitle>Tertiary Buttons</BaseCardTitle>
                <BaseCardSubtitle>Text links</BaseCardSubtitle>
              </BaseCardHeader>
              <BaseCardContent>
                <div className="space-y-3">
                  <ButtonTertiary size="lg" fullWidth className="gap-2">
                    Large Tertiary <ArrowRight className="w-4 h-4" />
                  </ButtonTertiary>
                  <ButtonTertiary size="md" fullWidth className="gap-2">
                    Medium Tertiary <ArrowRight className="w-4 h-4" />
                  </ButtonTertiary>
                  <ButtonTertiary size="sm" fullWidth className="gap-2">
                    Small Tertiary <ArrowRight className="w-4 h-4" />
                  </ButtonTertiary>
                </div>
              </BaseCardContent>
            </BaseCard>
          </div>

          {/* Button States */}
          <BaseCard variant="subtle" paddingSize="md" className="mt-6">
            <BaseCardHeader>
              <BaseCardTitle>Button States & Modifiers</BaseCardTitle>
            </BaseCardHeader>
            <BaseCardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-3">With Icons:</p>
                  <div className="space-y-2">
                    <ButtonPrimary size="md" className="gap-2">
                      <Star className="w-4 h-4" /> With Icon
                    </ButtonPrimary>
                    <ButtonSecondary size="md" className="gap-2">
                      <Rocket className="w-4 h-4" /> With Icon
                    </ButtonSecondary>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-3">Full Width:</p>
                  <div className="space-y-2">
                    <ButtonPrimary size="md" fullWidth>
                      Full Width Primary
                    </ButtonPrimary>
                    <ButtonSecondary size="md" fullWidth>
                      Full Width Secondary
                    </ButtonSecondary>
                  </div>
                </div>
              </div>
            </BaseCardContent>
          </BaseCard>
        </section>

        {/* Real-World Example */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Real-World Example</h2>

          <BaseCard
            variant="interactive"
            paddingSize="md"
            borderAccent="border-terminal-gold/30"
            href="/work/zero"
          >
            <BaseCardHeader>
              <div className="flex items-center justify-between mb-2">
                <BaseCardTitle>Zero</BaseCardTitle>
                <BaseCardBadgeContainer>
                  <ProjectStatusBadge status="live" size="md" />
                  <CategoryBadge category="Product" size="sm" />
                </BaseCardBadgeContainer>
              </div>
              <BaseCardSubtitle>AI Email Assistant</BaseCardSubtitle>
            </BaseCardHeader>
            <BaseCardContent>
              <p className="text-sm text-gray-300 mb-4">
                AI email assistant that achieves Inbox Zero autonomously. Learns your preferences, handles routine responses, and keeps you focused on what matters.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <StatusBadge status="Active" size="sm" />
                <PriorityBadge priority="High" size="sm" />
              </div>
            </BaseCardContent>
            <BaseCardFooter>
              <ButtonTertiary size="md" className="gap-2">
                View Project <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </BaseCardFooter>
          </BaseCard>
        </section>

        {/* Documentation Links */}
        <section className="mb-16">
          <BaseCard variant="subtle" paddingSize="lg" className="border-terminal-gold/20">
            <BaseCardContent>
              <h3 className="text-xl font-bold mb-4">Component Documentation</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-terminal-gold mb-2">BaseCard API</p>
                  <p className="text-xs text-gray-400">
                    docs/components/BASECARD_USAGE.md
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-gold mb-2">Badge API</p>
                  <p className="text-xs text-gray-400">
                    docs/components/BADGE_API.md
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-gold mb-2">Design Tokens</p>
                  <p className="text-xs text-gray-400">
                    lib/design-tokens/semantic-colors.ts
                  </p>
                </div>
              </div>
            </BaseCardContent>
          </BaseCard>
        </section>
      </div>
    </main>
  );
}
