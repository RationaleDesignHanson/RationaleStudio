/**
 * DataChecklist Component
 *
 * Displays phase-organized data requirements for CREaiT project.
 * Shows what founders need to provide at each phase with optional
 * categorization and security guidance.
 */

'use client';

import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface DataItem {
  name: string;
  description: string;
  critical?: boolean;
  securityNote?: string;
}

interface DataPhase {
  phase: string;
  phaseNumber: number;
  weekRange: string;
  items: DataItem[];
}

interface DataChecklistProps {
  phases: DataPhase[];
  showSecurityGuidance?: boolean;
}

export function DataChecklist({ phases, showSecurityGuidance = true }: DataChecklistProps) {
  const theme = getSectionTheme('content');

  return (
    <div className="space-y-6">
      {/* Security Guidance */}
      {showSecurityGuidance && (
        <GlassCard theme={theme} className="p-6 bg-blue-50/50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">🔒</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-2">
                Secure Data Sharing
              </h4>
              <p className="text-xs text-blue-800 mb-2">
                We take data security seriously. Here's how we'll handle your sensitive information:
              </p>
              <ul className="space-y-1 text-xs text-blue-800">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Secure file transfer:</strong> Use encrypted links (Dropbox, Google Drive with restricted access) or secure SFTP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>API credentials:</strong> Shared via 1Password or similar password manager, never via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>Development environment:</strong> All data stored on encrypted drives with access control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span><strong>NDA in place:</strong> Standard mutual NDA covers all proprietary information</span>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Phase Checklists */}
      <div className="space-y-6">
        {phases.map((phase) => (
          <GlassCard key={phase.phaseNumber} theme={theme} className="overflow-hidden">
            {/* Phase Header */}
            <div className="px-6 py-4 bg-muted/20 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">
                  Phase {phase.phaseNumber}: {phase.phase}
                </h3>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  {phase.weekRange}
                </span>
              </div>
            </div>

            {/* Data Items */}
            <div className="p-6">
              <div className="space-y-4">
                {phase.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      item.critical
                        ? 'border-red-200 bg-red-50/50'
                        : 'border-border bg-background/50'
                    }`}
                  >
                    {/* Checkbox (visual only) */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-5 h-5 rounded border-2 ${
                        item.critical
                          ? 'border-red-400 bg-red-50'
                          : 'border-accent/30 bg-white'
                      }`} />
                    </div>

                    {/* Item Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className="text-sm font-bold text-foreground">
                          {item.name}
                        </h4>
                        {item.critical && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-600">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mb-2">
                        {item.description}
                      </p>
                      {item.securityNote && (
                        <div className="flex items-start gap-2 p-2 rounded bg-muted/30 border border-border">
                          <span className="text-xs">🔒</span>
                          <p className="text-xs text-muted italic">
                            {item.securityNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Summary */}
      <GlassCard theme={theme} className="p-6 bg-muted/20">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-2">
              Data Preparation Tips
            </h4>
            <ul className="space-y-1 text-xs text-muted">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Start gathering data marked "Critical" as soon as possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>We'll work with whatever format you have - no need for perfect cleanup</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>API access typically requires IT/DevOps team coordination (allow 1-2 weeks)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Missing data won't block progress - we can start with partial datasets</span>
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
