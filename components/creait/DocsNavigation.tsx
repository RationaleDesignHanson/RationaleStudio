/**
 * DocsNavigation Component
 *
 * Navigation between documentation sections with breadcrumbs and quick links.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavSection {
  title: string;
  href: string;
  icon: string;
}

const sections: NavSection[] = [
  {
    title: 'Overview',
    href: '/client/creait',
    icon: '',
  },
  {
    title: 'Getting Started',
    href: '/client/creait/dashboard/getting-started',
    icon: '',
  },
  {
    title: 'Execution Plan',
    href: '/client/creait/dashboard/execution-plan',
    icon: '',
  },
  {
    title: 'User Stories',
    href: '/client/creait/dashboard/user-stories',
    icon: '',
  },
  {
    title: 'Architecture',
    href: '/client/creait/dashboard/architecture',
    icon: '',
  },
  {
    title: 'Data Strategy',
    href: '/client/creait/dashboard/data-strategy',
    icon: '',
  },
  {
    title: 'Budget',
    href: '/client/creait/dashboard/budget',
    icon: '',
  },
  {
    title: 'Checkpoints',
    href: '/client/creait/dashboard/checkpoints',
    icon: '',
  },
  {
    title: 'Flows',
    href: '/client/creait/dashboard/flows',
    icon: '',
  },
  {
    title: 'Prototypes',
    href: '/client/creait/dashboard/prototypes',
    icon: '',
  },
];

export function DocsNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home */}
          <div
            onClick={() => {
              console.log('Logo clicked, navigating to:', '/client/creait');
              window.location.href = '/client/creait';
            }}
            className="text-lg font-bold text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            CREaiT MVP Docs
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.slice(1).map((section) => {
              const isActive = pathname === section.href;
              return (
                <div
                  key={section.href}
                  onClick={() => {
                    console.log('Nav link clicked:', section.href);
                    window.location.href = section.href;
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  {section.title}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-md text-muted hover:text-foreground hover:bg-muted/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
}

/**
 * Page header with title and optional subtitle
 */
export function PageHeader({ title, subtitle, icon, badge }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex items-start gap-4">
        {icon && <div className="text-5xl">{icon}</div>}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h1>
            {badge && (
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-accent/10 text-accent">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

interface PrevNextProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

/**
 * Previous/Next navigation at bottom of page
 */
export function PrevNextNav({ prev, next }: PrevNextProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-12 mt-12 border-t border-border">
      {prev ? (
        <div
          onClick={() => window.location.href = prev.href}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background hover:border-accent transition-colors group cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-muted group-hover:text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="text-left">
            <div className="text-xs text-muted uppercase tracking-wide">Previous</div>
            <div className="text-sm font-medium text-foreground group-hover:text-accent">
              {prev.title}
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      {next ? (
        <div
          onClick={() => window.location.href = next.href}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background hover:border-accent transition-colors group cursor-pointer"
        >
          <div className="text-right">
            <div className="text-xs text-muted uppercase tracking-wide">Next</div>
            <div className="text-sm font-medium text-foreground group-hover:text-accent">
              {next.title}
            </div>
          </div>
          <svg
            className="w-5 h-5 text-muted group-hover:text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
