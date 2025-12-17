/**
 * Zero Onboarding Progress Tracker
 *
 * Displays onboarding checklist with progress tracking
 * Can be embedded in dashboard or settings pages
 */

'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Download, Mail, Zap, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { logger } from '@/lib/utils/logger';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: typeof Download;
  completed: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface OnboardingProgressTrackerProps {
  compact?: boolean;
  showCompleted?: boolean;
}

export function OnboardingProgressTracker({
  compact = false,
  showCompleted = false
}: OnboardingProgressTrackerProps) {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'download',
      title: 'Download Zero from App Store',
      description: 'Install Zero on your iPhone to get started',
      icon: Download,
      completed: false,
      action: {
        label: 'Download App',
        href: 'https://apps.apple.com/us/app/zer0-inbox/id6754212668',
      },
    },
    {
      id: 'connect',
      title: 'Connect your Gmail account',
      description: 'Link your Gmail for read-only access',
      icon: Mail,
      completed: false,
      action: {
        label: 'Connect Gmail',
      },
    },
    {
      id: 'first-actions',
      title: 'Complete your first 5 actions',
      description: 'Swipe through emails and complete actions',
      icon: Zap,
      completed: false,
    },
    {
      id: 'notifications',
      title: 'Enable push notifications',
      description: 'Get notified about important actions',
      icon: Bell,
      completed: false,
      action: {
        label: 'Enable Notifications',
      },
    },
    {
      id: 'preferences',
      title: 'Customize your preferences',
      description: 'Set up filters and action priorities',
      icon: Settings,
      completed: false,
      action: {
        label: 'Open Settings',
      },
    },
  ]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('zero-onboarding-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setSteps(prevSteps =>
          prevSteps.map(step => ({
            ...step,
            completed: progress[step.id] || false,
          }))
        );
      } catch (error) {
        logger.error('Failed to load onboarding progress:', error);
      }
    }
  }, []);

  const handleStepComplete = (stepId: string) => {
    setSteps(prevSteps => {
      const newSteps = prevSteps.map(step =>
        step.id === stepId ? { ...step, completed: true } : step
      );

      // Save to localStorage
      const progress: Record<string, boolean> = {};
      newSteps.forEach(step => {
        progress[step.id] = step.completed;
      });
      localStorage.setItem('zero-onboarding-progress', JSON.stringify(progress));

      return newSteps;
    });
  };

  const completedCount = steps.filter(s => s.completed).length;
  const totalCount = steps.length;
  const progressPercentage = (completedCount / totalCount) * 100;
  const visibleSteps = showCompleted ? steps : steps.filter(s => !s.completed);

  // Don't show tracker if all steps are complete and showCompleted is false
  if (!showCompleted && completedCount === totalCount) {
    return null;
  }

  if (compact) {
    return (
      <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">Getting Started</h3>
          <span className="text-xs text-terminal-gold">
            {completedCount}/{totalCount} complete
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFE34D] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="space-y-2">
          {visibleSteps.slice(0, 3).map((step) => (
            <div key={step.id} className="flex items-center gap-2 text-xs text-gray-300">
              {step.completed ? (
                <CheckCircle2 className="w-4 h-4 text-terminal-gold flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-600 flex-shrink-0" />
              )}
              <span className={step.completed ? 'line-through text-gray-500' : ''}>
                {step.title}
              </span>
            </div>
          ))}
          {visibleSteps.length > 3 && (
            <div className="text-xs text-gray-500 pl-6">
              +{visibleSteps.length - 3} more steps
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-gray-700 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">Complete Your Setup</h2>
          <span className="text-sm text-terminal-gold">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFE34D] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {visibleSteps.map((step) => {
          const StepIcon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border transition-all ${
                step.completed
                  ? 'bg-gray-900/30 border-gray-800'
                  : 'bg-gray-800/50 border-gray-700 hover:border-terminal-gold'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <div className="w-10 h-10 bg-terminal-gold/20 border border-terminal-gold/50 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-terminal-gold" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center justify-center">
                      <StepIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold mb-1 ${
                    step.completed ? 'text-gray-500 line-through' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {step.description}
                  </p>

                  {!step.completed && step.action && (
                    step.action.href ? (
                      <a
                        href={step.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleStepComplete(step.id)}
                        className="inline-block px-4 py-2 bg-terminal-gold hover:bg-[#FFE34D] text-black text-sm font-medium rounded transition-all"
                      >
                        {step.action.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          step.action?.onClick?.();
                          handleStepComplete(step.id);
                        }}
                        className="px-4 py-2 bg-terminal-gold hover:bg-[#FFE34D] text-black text-sm font-medium rounded transition-all"
                      >
                        {step.action.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completedCount === totalCount && (
        <div className="mt-6 p-4 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg text-center">
          <CheckCircle2 className="w-12 h-12 text-terminal-gold mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white mb-1">Setup Complete</h3>
          <p className="text-sm text-gray-300 mb-4">
            You're all set! Start using Zero to manage your inbox.
          </p>
          <Link
            href="/work/zero"
            className="inline-block px-6 py-2 bg-terminal-gold hover:bg-[#FFE34D] text-black font-medium rounded transition-all"
          >
            Learn More About Zero
          </Link>
        </div>
      )}
    </div>
  );
}
