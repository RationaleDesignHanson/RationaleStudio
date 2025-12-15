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
    description: 'AI email assistant that achieves Inbox Zero autonomously. Learns your preferences, handles routine responses, and keeps you focused on what matters. Built and shipped in 30 days.'
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
    description: 'Save and organize the recipes worth passing down. Import from the web, scale ingredients, create shopping lists, and cook with confidence. Native iOS app with vintage aesthetic and iCloud sync.'
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
    description: 'Enterprise platform connecting CRM data to workforce optimization with AI-powered automation.'
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
    description: 'Sports and entertainment modernization platform with 4 integrated modules, wearables, and spatial computing.'
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
    description: 'AI-powered thumbnail generation system for live sports streaming. Built in 2-week sprint with Google Gemini 2.5 Flash, generating brand-consistent thumbnails across 200+ teams, 8 leagues, and 24 visual styles.'
  },
  {
    id: 'case-study-040',
    title: '040',
    subtitle: 'IP Development',
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
    description: 'Physical product in prototyping'
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
