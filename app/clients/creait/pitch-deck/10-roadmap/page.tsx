'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataLG,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { RoadmapGanttDiagram } from '@/components/creait/diagrams';

/**
 * Slide 6.1: 14-Week Roadmap
 *
 * Sprint-by-sprint breakdown to MVP
 */
export default function RoadmapSlidePage() {
  const sprints = [
    {
      sprint: 'Sprints 1-2',
      weeks: 'Weeks 1-4',
      focus: 'Opportunity Scoring Engine',
      deliverables: [
        'ML model for 0-100 scoring',
        'Timing signal integration',
        'Score explanation logic',
        'API endpoints for scoring',
      ],
      status: 'Foundation',
      color: CRE_COLORS.primary,
    },
    {
      sprint: 'Sprints 3-4',
      weeks: 'Weeks 5-8',
      focus: 'Dashboard UI',
      deliverables: [
        'Daily prioritization view',
        'Opportunity detail pages',
        'Score visualization',
        'Interactive filters/sorting',
      ],
      status: 'Core Experience',
      color: CRE_COLORS.secondary,
    },
    {
      sprint: 'Sprint 5',
      weeks: 'Weeks 9-10',
      focus: 'CRM Integration',
      deliverables: [
        'Salesforce connector',
        'HubSpot connector',
        'Contact sync workflows',
        'Two-way data sync',
      ],
      status: 'Integration',
      color: CRE_COLORS.accent,
    },
    {
      sprint: 'Sprint 6',
      weeks: 'Weeks 11-14',
      focus: 'Polish & Launch',
      deliverables: [
        'Onboarding flow',
        'Admin dashboard',
        'Performance optimization',
        'Beta launch to pilots',
      ],
      status: 'Launch Ready',
      color: CRE_COLORS.score.critical,
    },
  ];

  const teamNeeds = [
    {
      role: 'Product Lead',
      timing: 'Week 1',
      focus: 'Roadmap, user stories, pilot feedback loop',
    },
    {
      role: 'ML Engineer',
      timing: 'Week 1',
      focus: 'Scoring engine, signal processing',
    },
    {
      role: 'Frontend Engineer',
      timing: 'Week 5',
      focus: 'React dashboard, data viz',
    },
    {
      role: 'Integration Engineer',
      timing: 'Week 9',
      focus: 'CRM connectors, API integration',
    },
  ];

  const risks = [
    {
      risk: 'CRM Integration Complexity',
      mitigation: 'Start with Salesforce API (most pilots use it), parallel HubSpot',
      likelihood: 'Medium',
    },
    {
      risk: 'Scoring Model Accuracy',
      mitigation: 'Use pilot feedback loop to tune weights, explainable AI for trust',
      likelihood: 'Low',
    },
    {
      risk: 'Pilot Customer Delays',
      mitigation: 'Staggered onboarding, backup customers identified',
      likelihood: 'Low',
    },
  ];

  return (
    <CRESection
      title="Execution Plan"
      subtitle="14 weeks to MVP — detailed sprint breakdown"
      variant="execution"
    >
      {/* Timeline Hero */}
      <CRECard variant="primary" size="large" className="mb-8 text-center">
        <LabelSM color={CRE_COLORS.text.muted}>MVP TIMELINE</LabelSM>
        <DataLG className="my-6" color={CRE_COLORS.primary}>
          14 Weeks
        </DataLG>
        <BodyLG color={CRE_COLORS.text.secondary}>
          6 sprints (2 weeks each) + 2 weeks buffer = MVP launch with 5 pilot customers
        </BodyLG>
      </CRECard>

      {/* Roadmap Gantt Diagram */}
      <div className="mt-12 mb-12">
        <H2 className="mb-4 text-center">Sprint Timeline</H2>
        <BodyLG className="mb-8 text-center" color={CRE_COLORS.text.secondary}>
          14 weeks from kickoff to pilot launch
        </BodyLG>
        <CRECard variant="primary" size="large">
          <RoadmapGanttDiagram />
        </CRECard>
      </div>

      {/* Sprint Breakdown */}
      <H2 className="mb-6">Sprint-by-Sprint Breakdown</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {sprints.map((sprint, index) => (
          <CRECard
            key={index}
            variant={
              index === 0
                ? 'primary'
                : index === 1
                ? 'secondary'
                : index === 2
                ? 'accent'
                : 'critical'
            }
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <LabelSM color={sprint.color}>{sprint.sprint}</LabelSM>
                <H3 className="mt-2">{sprint.focus}</H3>
                <LabelSM color={CRE_COLORS.text.muted} className="mt-1">
                  {sprint.weeks}
                </LabelSM>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium">
                {sprint.status}
              </div>
            </div>
            <ul className="space-y-2 pt-4 border-t border-white/10">
              {sprint.deliverables.map((deliverable, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <BodyMD color={CRE_COLORS.text.secondary}>{deliverable}</BodyMD>
                </li>
              ))}
            </ul>
          </CRECard>
        ))}
      </div>

      {/* Team Needs */}
      <H2 className="mb-6">Team & Hiring Timeline</H2>
      <CRECard variant="secondary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamNeeds.map((member, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-start justify-between mb-3">
                <H3 className="text-lg">{member.role}</H3>
                <LabelSM color={CRE_COLORS.accent}>{member.timing}</LabelSM>
              </div>
              <BodyMD color={CRE_COLORS.text.secondary}>{member.focus}</BodyMD>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-white/10">
          <BodyMD color={CRE_COLORS.text.secondary}>
            <strong>Total team size by Week 14:</strong> 5 people (Product Lead + 3 engineers +
            Founder)
          </BodyMD>
        </div>
      </CRECard>

      {/* Risk Mitigation */}
      <H2 className="mb-6">Risk Mitigation</H2>
      <div className="space-y-4">
        {risks.map((item, index) => (
          <CRECard key={index} variant="neutral">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.likelihood === 'Low'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {item.likelihood} Risk
                </div>
              </div>
              <div className="flex-1">
                <H3 className="text-lg mb-2">{item.risk}</H3>
                <BodyMD color={CRE_COLORS.text.secondary}>
                  <strong>Mitigation:</strong> {item.mitigation}
                </BodyMD>
              </div>
            </div>
          </CRECard>
        ))}
      </div>
    </CRESection>
  );
}
