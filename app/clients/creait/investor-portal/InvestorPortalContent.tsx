/**
 * CREaiT Internal Portal - Content Display
 *
 * Displays product documentation, technical specs, and development roadmap
 */

'use client';

import { useState } from 'react';
import { CRESection, CRECard } from '@/components/creait/ui';
import { DisplayLG, H2, H3, BodyLG, BodyMD, LabelSM } from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { creaitContent } from '@/lib/content/creait';
import { projectOverview } from '@/lib/content/creait-docs';

export default function InvestorPortalContent() {
  const [activeSection, setActiveSection] = useState<'overview' | 'product' | 'technical' | 'roadmap'>('overview');

  const handleLogout = () => {
    sessionStorage.removeItem('creait-internal-auth');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <DisplayLG color={CRE_COLORS.score.critical}>CREaiT Internal Portal</DisplayLG>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1">
                Comprehensive product documentation and development roadmap
              </BodyMD>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/clients/creait/pitch-deck/12-why-we-win"
                className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                ← Back to Deck
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 mt-6">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'product', label: 'Product Vision' },
              { key: 'technical', label: 'Technical Stack' },
              { key: 'roadmap', label: 'Roadmap' },
            ].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.key
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'product' && <ProductSection />}
        {activeSection === 'technical' && <TechnicalSection />}
        {activeSection === 'roadmap' && <RoadmapSection />}
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      <CRECard variant="primary" size="large">
        <H2 className="mb-4">{projectOverview.name}</H2>
        <BodyLG color={CRE_COLORS.text.secondary} className="mb-4">
          {projectOverview.tagline}
        </BodyLG>
        <BodyMD color={CRE_COLORS.text.secondary}>{projectOverview.vision}</BodyMD>
      </CRECard>

      {/* Timeline & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CRECard variant="secondary">
          <H3 className="mb-4">Timeline</H3>
          <div className="space-y-3">
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Duration</LabelSM>
              <BodyLG className="mt-1">{projectOverview.timeline.duration}</BodyLG>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Start Date</LabelSM>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1">
                {projectOverview.timeline.startDate}
              </BodyMD>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Target Launch</LabelSM>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1">
                {projectOverview.timeline.targetLaunch}
              </BodyMD>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Phases</LabelSM>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1">
                {projectOverview.timeline.phases} development phases
              </BodyMD>
            </div>
          </div>
        </CRECard>

        <CRECard variant="secondary">
          <H3 className="mb-4">Budget</H3>
          <div className="space-y-3">
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Development</LabelSM>
              <BodyLG className="mt-1">
                ${projectOverview.budget.development.min.toLocaleString()} - $
                {projectOverview.budget.development.max.toLocaleString()}
              </BodyLG>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1 text-sm">
                {projectOverview.budget.development.breakdown}
              </BodyMD>
            </div>
            <div>
              <LabelSM color={CRE_COLORS.text.muted}>Recommended Total</LabelSM>
              <BodyLG className="mt-1">
                ${projectOverview.budget.recommended.min.toLocaleString()} - $
                {projectOverview.budget.recommended.max.toLocaleString()}
              </BodyLG>
              <BodyMD color={CRE_COLORS.text.secondary} className="mt-1 text-sm">
                {projectOverview.budget.recommended.note}
              </BodyMD>
            </div>
          </div>
        </CRECard>
      </div>

      {/* Team Structure */}
      <CRECard variant="accent">
        <H2 className="mb-6">Team Structure</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <H3 className="mb-3">{projectOverview.team.ceo.role}</H3>
            <ul className="space-y-2">
              {projectOverview.team.ceo.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#FFD700] mt-1">•</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{resp}</BodyMD>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <H3 className="mb-3">{projectOverview.team.contractors.role}</H3>
            <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
              {projectOverview.team.contractors.commitment}
            </BodyMD>
            <div className="flex flex-wrap gap-2">
              {projectOverview.team.contractors.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CRECard>
    </div>
  );
}

function ProductSection() {
  return (
    <div className="space-y-8">
      {/* Vision */}
      <CRECard variant="primary" size="large">
        <H2 className="mb-4">{creaitContent.vision.title}</H2>
        <BodyLG color={CRE_COLORS.text.secondary}>{creaitContent.vision.description}</BodyLG>
      </CRECard>

      {/* Features */}
      <div>
        <H2 className="mb-6">Core Features</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creaitContent.features.map((feature, idx) => (
            <CRECard key={idx} variant={idx < 2 ? 'primary' : 'secondary'}>
              <div className="flex items-start justify-between mb-3">
                <H3>{feature.title}</H3>
                <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded text-xs">
                  {feature.status}
                </span>
              </div>
              <BodyMD color={CRE_COLORS.text.secondary}>{feature.description}</BodyMD>
            </CRECard>
          ))}
        </div>
      </div>

      {/* Jobs to Be Done */}
      <CRECard variant="accent">
        <H2 className="mb-4">Jobs to Be Done</H2>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
          <LabelSM color={CRE_COLORS.text.muted} className="mb-2">
            PRIMARY JOB
          </LabelSM>
          <BodyLG color={CRE_COLORS.text.primary}>{creaitContent.jtbd.primary}</BodyLG>
        </div>
        <div className="space-y-3">
          <LabelSM color={CRE_COLORS.text.muted}>SUPPORTING JOBS</LabelSM>
          {creaitContent.jtbd.supporting.map((job, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-[#FFD700] mt-1">{idx + 1}.</span>
              <BodyMD color={CRE_COLORS.text.secondary}>{job}</BodyMD>
            </div>
          ))}
        </div>
      </CRECard>

      {/* Principles */}
      <div>
        <H2 className="mb-6">Key Principles</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creaitContent.principles.map((principle, idx) => (
            <CRECard key={idx} variant="secondary">
              <H3 className="mb-3">{principle.title}</H3>
              <BodyMD color={CRE_COLORS.text.secondary}>{principle.description}</BodyMD>
            </CRECard>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnicalSection() {
  return (
    <div className="space-y-8">
      <CRECard variant="primary" size="large">
        <H2 className="mb-4">{creaitContent.architecture.title}</H2>
        <BodyLG color={CRE_COLORS.text.secondary}>{creaitContent.architecture.description}</BodyLG>
      </CRECard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creaitContent.architecture.components.map((component, idx) => (
          <CRECard key={idx} variant="secondary">
            <H3 className="mb-4">{component.category}</H3>
            <ul className="space-y-2">
              {component.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-[#FFD700] mt-1">•</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{item}</BodyMD>
                </li>
              ))}
            </ul>
          </CRECard>
        ))}
      </div>
    </div>
  );
}

function RoadmapSection() {
  return (
    <div className="space-y-8">
      <CRECard variant="primary" size="large">
        <H2 className="mb-4">{creaitContent.roadmap.title}</H2>
        <BodyLG color={CRE_COLORS.text.secondary}>{creaitContent.roadmap.description}</BodyLG>
      </CRECard>

      <div className="space-y-6">
        {creaitContent.roadmap.phases.map((phase, idx) => (
          <CRECard
            key={idx}
            variant={phase.status === 'In Progress' ? 'primary' : phase.status === 'Upcoming' ? 'secondary' : 'accent'}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <H3>{phase.name}</H3>
                <LabelSM color={CRE_COLORS.text.muted} className="mt-1">
                  Weeks {phase.weeks}
                </LabelSM>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'In Progress'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : phase.status === 'Upcoming'
                    ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                    : 'bg-gray-500/10 border border-gray-500/30 text-gray-400'
                }`}
              >
                {phase.status}
              </span>
            </div>
            <div className="space-y-2">
              <LabelSM color={CRE_COLORS.text.muted}>MILESTONES</LabelSM>
              {phase.milestones.map((milestone, mIdx) => (
                <div key={mIdx} className="flex items-start gap-2">
                  <span className="text-[#FFD700] mt-1">→</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{milestone}</BodyMD>
                </div>
              ))}
            </div>
          </CRECard>
        ))}
      </div>
    </div>
  );
}
