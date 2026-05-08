/**
 * ProjectScope — wraps a case-study page to apply project-specific
 * accent ink. Components inside read `var(--accent)` for index colors,
 * link colors, hairline accents, etc.
 *
 *   <ProjectScope project="spark-ar">
 *     ...page content...
 *   </ProjectScope>
 *
 * The site chrome (paper background, ink type) stays consistent.
 * Each case study earns its own punctuation color.
 */

import type { CSSProperties, ReactNode } from 'react';

export type ProjectKey =
  | 'heirloom'
  | 'spark-ar'
  | 'orion'
  | 'viacom'
  | 'maker'
  | 'silly'
  | 'rumi'
  | 'fair'
  | 'fubo'
  | 'zero'
  | 'vault'
  | 'nimbus';

interface ProjectScopeProps {
  project: ProjectKey;
  children: ReactNode;
  className?: string;
}

export function ProjectScope({ project, children, className = '' }: ProjectScopeProps) {
  const style = {
    // Override `--accent` for this scope; falls back to terracotta otherwise.
    '--accent': `var(--project-${project})`,
  } as CSSProperties;

  return (
    <div data-project={project} style={style} className={className}>
      {children}
    </div>
  );
}
