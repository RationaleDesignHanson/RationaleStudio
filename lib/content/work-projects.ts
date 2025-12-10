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
    status: 'live',
    category: 'consumer',
    metrics: [
      { label: 'Platform', value: 'iOS' },
      { label: 'Timeline', value: '30 days' },
      { label: 'Status', value: 'Live' }
    ],
    tags: ['Consumer', 'AI Product', 'Live'],
    isProtected: false,
    featured: true,
    description: 'AI-powered email management that extracts actions from your inbox. Built and shipped in 30 days.'
  },
  {
    id: 'heirloom',
    title: 'Heirloom',
    subtitle: 'iOS Recipe App',
    slug: 'heirloom',
    status: 'live',
    category: 'consumer',
    metrics: [
      { label: 'Platform', value: 'iOS' },
      { label: 'Timeline', value: '5 weeks' },
      { label: 'Status', value: 'Live Beta' }
    ],
    tags: ['Consumer', 'iOS', 'SwiftUI', 'Product Design'],
    isProtected: false,
    featured: true,
    description: 'Native app for preserving family recipes with smart shopping list integration, vintage aesthetic, and iOS Reminders sync. Built with SwiftUI and SwiftData.'
  },
  {
    id: 'case-study-010',
    title: 'Case Study 010',
    subtitle: 'CRM to Worker Optimization',
    slug: 'case-study-010',
    status: 'delivered',
    category: 'b2b',
    metrics: [
      { label: 'Timeline', value: '16-week MVP' },
      { label: 'Scope', value: 'Full-stack' },
      { label: 'Scale', value: 'Enterprise' }
    ],
    tags: ['B2B', 'Data Platform', 'Pilot'],
    isProtected: true,
    password: '123456',
    featured: true,
    description: 'Enterprise platform connecting CRM data to workforce optimization with AI-powered automation.'
  },
  {
    id: 'case-study-020',
    title: 'Case Study 020',
    subtitle: 'Sports & Entertainment Modernization',
    slug: 'case-study-020',
    status: 'delivered',
    category: 'complex-systems',
    metrics: [
      { label: 'Scope', value: '4 modules' },
      { label: 'Demos', value: '40+ built' },
      { label: 'Tech', value: 'Vision Pro' }
    ],
    tags: ['Sports Tech', 'Complex Systems', 'Pilot'],
    isProtected: true,
    password: '123456',
    featured: true,
    description: 'Sports and entertainment modernization platform with 4 integrated modules, wearables, and spatial computing.'
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
