'use client';

import { CRESection } from '@/components/creait/ui';
import { CRECard } from '@/components/creait/ui';
import {
  H2,
  H3,
  BodyLG,
  BodyMD,
  LabelSM,
  DataXL,
} from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * Slide 5.2: Technical Traction
 *
 * Backend 80% complete = $94K invested value
 */
export default function TechnicalTractionSlidePage() {
  const completedWork = [
    {
      component: 'Email Generation System',
      status: ' Complete',
      description: 'Anthropic Claude integration with context-aware prompt engineering',
      value: '$18K',
    },
    {
      component: 'SendGrid Integration',
      status: ' Complete',
      description: 'Email delivery, tracking, bounce handling, reputation management',
      value: '$12K',
    },
    {
      component: 'PostgreSQL Schema',
      status: ' Complete',
      description: 'Optimized for CRE data: properties, owners, signals, scores',
      value: '$15K',
    },
    {
      component: 'Infrastructure',
      status: ' Complete',
      description: 'Kubernetes, CI/CD, monitoring, logging (production-ready)',
      value: '$22K',
    },
    {
      component: 'API Layer',
      status: ' Complete',
      description: 'RESTful API with authentication, rate limiting, versioning',
      value: '$14K',
    },
    {
      component: 'Data Pipeline',
      status: ' Complete',
      description: 'Property data ingestion, enrichment, storage workflows',
      value: '$13K',
    },
  ];

  const remainingWork = [
    {
      component: 'Opportunity Scoring Engine',
      description: 'ML model for 0-100 scoring based on timing signals',
      effort: '3 weeks',
    },
    {
      component: 'Dashboard UI',
      description: 'React frontend for daily prioritization and interactions',
      effort: '4 weeks',
    },
    {
      component: 'CRM Connectors',
      description: 'Salesforce, HubSpot integrations for contact sync',
      effort: '3 weeks',
    },
  ];

  const techStack = [
    { category: 'Backend', tech: 'Node.js, TypeScript, Express' },
    { category: 'Database', tech: 'PostgreSQL, Redis (caching)' },
    { category: 'AI/ML', tech: 'Anthropic Claude, Python (scoring)' },
    { category: 'Infrastructure', tech: 'Kubernetes, Docker, GitHub Actions' },
    { category: 'Frontend', tech: 'Next.js 14, React 18, Tailwind CSS' },
    { category: 'Integrations', tech: 'SendGrid, Salesforce API, CoStar API' },
  ];

  return ( <CRESection
      title="Technical Traction"
      subtitle="Backend 80% complete — $94K invested value already built"
      variant="execution"
    > {/* Hero Metric */} <CRECard variant="primary" size="large" className="mb-8 text-center"> <LabelSM color={CRE_COLORS.text.muted}>INVESTED VALUE TO DATE</LabelSM> <DataXL className="my-6" color={CRE_COLORS.primary}> $94K </DataXL> <BodyLG color={CRE_COLORS.text.secondary}> Backend infrastructure complete. Production-ready. 14 weeks to MVP frontend. </BodyLG> </CRECard> {/* Completed Work */} <H2 className="mb-6"> What's Built (80% Complete)</H2> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"> {completedWork.map((item, index) => ( <CRECard key={index} variant="accent"> <div className="flex items-start justify-between mb-2"> <H3 className="text-base">{item.component}</H3> <span className="text-2xl">{item.status}</span> </div> <BodyMD color={CRE_COLORS.text.secondary} className="mb-3"> {item.description} </BodyMD> <div className="pt-3 border-t border-white/10"> <LabelSM color={CRE_COLORS.accent}>Invested Value: {item.value}</LabelSM> </div> </CRECard> ))} </div> {/* Remaining Work */} <H2 className="mb-6">⏳ What's Left (20% Remaining)</H2> <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {remainingWork.map((item, index) => ( <CRECard key={index} variant="neutral"> <H3 className="text-lg mb-2">{item.component}</H3> <BodyMD color={CRE_COLORS.text.secondary} className="mb-3"> {item.description} </BodyMD> <div className="pt-3 border-t border-white/10"> <LabelSM color={CRE_COLORS.text.muted}>Effort: {item.effort}</LabelSM> </div> </CRECard> ))} </div> {/* Tech Stack */} <CRECard variant="secondary"> <H2 className="mb-6">Modern, Production-Ready Tech Stack</H2> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {techStack.map((item, index) => ( <div
              key={index}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            > <LabelSM color={CRE_COLORS.secondary} className="mb-2"> {item.category} </LabelSM> <BodyMD>{item.tech}</BodyMD> </div> ))} </div> </CRECard> {/* Why This Matters */} <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"> <CRECard variant="primary"> <div className="flex items-start gap-3"> <div className="text-3xl"></div> <div> <H3 className="mb-3">Speed to Market</H3> <BodyMD color={CRE_COLORS.text.secondary}> With 80% of backend complete, we can ship MVP in 14 weeks (not 6+ months). Reduces
                seed capital burn and accelerates pilot program timeline. </BodyMD> </div> </div> </CRECard> <CRECard variant="primary"> <div className="flex items-start gap-3"> <div className="text-3xl">️</div> <div> <H3 className="mb-3">De-Risked Investment</H3> <BodyMD color={CRE_COLORS.text.secondary}> $94K of founder sweat equity already invested. Production infrastructure deployed.
                You're investing in go-to-market, not unproven technical feasibility. </BodyMD> </div> </div> </CRECard> </div> </CRESection> );
}
