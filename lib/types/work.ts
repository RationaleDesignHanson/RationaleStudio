/**
 * Work Project Types
 *
 * Type definitions for portfolio projects, case studies, and featured work
 */

export type ProjectStatus = 'live' | 'delivered' | 'building' | 'beta';
export type ProjectCategory = 'consumer' | 'b2b' | 'complex-systems';

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  status: ProjectStatus;
  category: ProjectCategory;
  metrics: ProjectMetric[];
  tags: string[];
  isProtected: boolean;
  password?: string;
  featured: boolean;
  description?: string;
}

export interface FeaturedWorkCardProps {
  title: string;
  subtitle: string;
  metrics: string[];
  tags: string[];
  href: string;
  status: ProjectStatus;
  isProtected?: boolean;
}
