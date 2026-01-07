/**
 * Work Projects Content
 *
 * Portfolio projects and case studies data
 */

import { WorkProject } from '@/lib/types/work';

export const workProjects: WorkProject[] = [
  {
    id: 'zero',
    title: 'Zero Inbox',
    subtitle: 'AI Email Management',
    slug: 'zero',
    status: 'beta-invite',
    category: 'consumer',
    metrics: [
      { label: 'Platform', value: 'iOS' },
      { label: 'Timeline', value: '30 days' },
      { label: 'Status', value: 'Live' }
    ],
    tags: ['Consumer', 'AI Product', 'Live'],
    isProtected: false,
    featured: true,
    description: 'AI email triage that extracts actions, deadlines, and next steps—then lets you clear them fast with a swipe-first workflow. Built to turn inbox time into done time.'
  },
  {
    id: 'heirloom',
    title: 'Heirloom',
    subtitle: 'iOS Recipe App',
    slug: 'heirloom',
    status: 'beta',
    category: 'consumer',
    metrics: [
      { label: 'Platform', value: 'iOS' },
      { label: 'Timeline', value: '5 weeks' },
      { label: 'Status', value: 'Live Beta' }
    ],
    tags: ['Consumer', 'iOS', 'SwiftUI', 'Product Design'],
    isProtected: false,
    featured: true,
    description: 'A native iOS home for recipes: import fast (AI-assisted), store them beautifully, share with friends/family, then turn them into weekly plans and smart shopping lists.'
  },
  {
    id: 'case-study-010',
    title: 'CREaiT',
    subtitle: 'CRM to Worker Optimization',
    slug: 'case-study-010',
    status: 'pre-kickoff',
    category: 'b2b',
    metrics: [
      { label: 'Timeline', value: '16-week MVP' },
      { label: 'Scope', value: 'Full-stack' },
      { label: 'Scale', value: 'Enterprise' }
    ],
    tags: ['B2B', 'Data Platform', 'Pilot'],
    isProtected: true,
    featured: true,
    description: 'AI market-intelligence workflow that fuses CRM signals with ops data—so teams prioritize the right deals faster.'
  },
  {
    id: 'case-study-020',
    title: 'Athletes-First',
    subtitle: 'Sports & Entertainment Modernization',
    slug: 'case-study-020',
    status: 'pre-kickoff',
    category: 'complex-systems',
    metrics: [
      { label: 'Scope', value: '4 modules' },
      { label: 'Demos', value: '40+ built' },
      { label: 'Tech', value: 'Vision Pro' }
    ],
    tags: ['Sports Tech', 'Complex Systems', 'Pilot'],
    isProtected: true,
    featured: true,
    description: 'Four-module prototype suite to modernize agency operations—pitching, NIL guidance, content automation, and new surfaces.'
  },
  {
    id: 'case-study-030',
    title: 'Rumi',
    subtitle: 'Live Sports Streaming Platform',
    slug: 'case-study-030',
    status: 'shipped',
    category: 'consumer',
    metrics: [
      { label: 'Platform', value: 'Web & Mobile' },
      { label: 'Status', value: 'Live' },
      { label: 'Type', value: 'Partnership' }
    ],
    tags: ['Sports Tech', 'Streaming', 'Live'],
    isProtected: true,
    featured: true,
    description: 'AI thumbnail pipeline for live sports—brand-consistent creative at scale with near real-time processing.'
  },
  {
    id: 'case-study-040',
    title: 'Nimbus',
    subtitle: 'Sanitary Waste Systems',
    slug: 'sanitary-waste-system',
    status: 'building',
    category: 'complex-systems',
    metrics: [
      { label: 'Market', value: '$435M+' },
      { label: 'Stage', value: 'Pre-Seed' },
      { label: 'Type', value: 'IP Development' }
    ],
    tags: ['Physical Product', 'IP Development', 'Partnership'],
    isProtected: true,
    featured: false,
    description: 'Premium pet hygiene system: absorbent-lined bags + pop-up dispensing—validated for retail pull before tooling.'
  }
];

export function getFeaturedProjects(): WorkProject[] {
  return workProjects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return workProjects.find(project => project.slug === slug);
}

export function getPublicProjects(): WorkProject[] {
  return workProjects.filter(project => !project.isProtected);
}

export function getProtectedProjects(): WorkProject[] {
  return workProjects.filter(project => project.isProtected);
}

export function getAllProjects(): WorkProject[] {
  return workProjects;
}
