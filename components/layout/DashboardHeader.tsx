/**
 * Dashboard Header Component
 *
 * Persistent header for client dashboards with navigation back to main site.
 * Provides context and prevents users from feeling "trapped" in client portal.
 */

'use client';

import Link from 'next/link';

interface DashboardHeaderProps {
  clientName: string;
  dashboardTitle?: string;
}

export function DashboardHeader({ clientName, dashboardTitle }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Client Info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold text-sm sm:text-base">
                {clientName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                {clientName}
              </p>
              {dashboardTitle && (
                <p className="text-xs text-muted truncate">
                  {dashboardTitle}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Back */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-muted hover:text-foreground transition-colors rounded-md hover:bg-accent/5"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">Back to Main Site</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
