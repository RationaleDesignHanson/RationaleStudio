/**
 * Featured Work Grid Component
 *
 * Displays 3 featured projects in a responsive grid
 * Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
 */

import { FeaturedWorkCard } from './FeaturedWorkCard';
import { getFeaturedProjects } from '@/lib/content/work-projects';

export function FeaturedWorkGrid() {
  const projects = getFeaturedProjects();

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Featured Work
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Three proof points: consumer product, enterprise platform, and complex multi-module system.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <FeaturedWorkCard
            key={project.id}
            title={project.title}
            subtitle={project.subtitle}
            metrics={project.metrics.map(m => m.value)}
            tags={project.tags}
            href={`/work/${project.slug}`}
            status={project.status}
            isProtected={project.isProtected}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-4">
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
        >
          View all work
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
