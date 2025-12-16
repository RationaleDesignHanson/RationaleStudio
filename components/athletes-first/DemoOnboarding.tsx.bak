'use client';

import { useState, useEffect } from 'react';
import { X, MousePointer2, Hand, ZoomIn, ArrowRight, Eye } from 'lucide-react';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DemoOnboardingProps {
  // Unique ID for this demo (used for localStorage key)
  demoId: string;
  // Title shown in onboarding overlay
  demoTitle: string;
  // Steps to show in onboarding
  steps: OnboardingStep[];
  // Optional custom primary action text
  primaryActionText?: string;
}

export default function DemoOnboarding({
  demoId,
  demoTitle,
  steps,
  primaryActionText = "Got it, let's explore!"
}: DemoOnboardingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen this demo's onboarding
    const storageKey = `athletes-first-onboarding-${demoId}`;
    const hasSeenOnboarding = localStorage.getItem(storageKey) === 'true';

    if (!hasSeenOnboarding) {
      // Show after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [demoId]);

  const handleDismiss = () => {
    const storageKey = `athletes-first-onboarding-${demoId}`;
    localStorage.setItem(storageKey, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] animate-in fade-in duration-300" />

      {/* Onboarding Card */}
      <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-6 py-5 border-b border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-terminal text-cyan-400 tracking-widest">
                    INTERACTIVE DEMO
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white font-terminal">
                  {demoTitle}
                </h2>
              </div>
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close onboarding"
              >
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className="text-white/80 text-sm mb-6">
              Here's how to get the most out of this interactive experience:
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDismiss}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>{primaryActionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleDismiss}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-colors border border-white/10"
              >
                Skip
              </button>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-6 py-3 bg-black/30 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              This guide won't show again for this demo
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Export pre-configured onboarding for each demo
export const PlatformWalkthroughOnboarding = () => (
  <DemoOnboarding
    demoId="platform-walkthrough"
    demoTitle="Complete Platform Workflow"
    steps={[
      {
        icon: <MousePointer2 className="w-5 h-5 text-cyan-400" />,
        title: 'Navigate the Stages',
        description: 'Click through the 7-stage workflow or use the navigation buttons to explore each step'
      },
      {
        icon: <Hand className="w-5 h-5 text-cyan-400" />,
        title: 'Interact with Content',
        description: 'Select athletes, customize content, and see how the platform adapts in real-time'
      },
      {
        icon: <ArrowRight className="w-5 h-5 text-cyan-400" />,
        title: 'Experience the Flow',
        description: 'Follow the complete journey from athlete onboarding to content amplification'
      }
    ]}
  />
);

export const AthleteDashboardOnboarding = () => (
  <DemoOnboarding
    demoId="athlete-dashboard"
    demoTitle="Mobile Athlete Experience"
    steps={[
      {
        icon: <Hand className="w-5 h-5 text-cyan-400" />,
        title: 'Scroll to Explore',
        description: 'Navigate through the mobile dashboard to see wallet, deals, permissions, and sentiment tracking'
      },
      {
        icon: <MousePointer2 className="w-5 h-5 text-cyan-400" />,
        title: 'Tap Cards',
        description: 'Click on deal cards and permission toggles to see interactive features'
      },
      {
        icon: <Eye className="w-5 h-5 text-cyan-400" />,
        title: 'Check Real-time Data',
        description: 'View live performance metrics, earnings, and brand sentiment in action'
      }
    ]}
  />
);

export const SystemArchitectureOnboarding = () => (
  <DemoOnboarding
    demoId="system-architecture"
    demoTitle="System Architecture"
    steps={[
      {
        icon: <Hand className="w-5 h-5 text-cyan-400" />,
        title: 'Pinch to Zoom',
        description: 'On mobile: use pinch gestures to zoom in/out. On desktop: use mouse wheel or zoom buttons'
      },
      {
        icon: <MousePointer2 className="w-5 h-5 text-cyan-400" />,
        title: 'Click Nodes',
        description: 'Tap any node in the diagram to see detailed information about that component'
      },
      {
        icon: <ZoomIn className="w-5 h-5 text-cyan-400" />,
        title: 'Explore Details',
        description: 'Pan around after zooming to examine different parts of the system architecture'
      }
    ]}
  />
);
