/**
 * Zero Onboarding Flow
 *
 * Welcome flow that appears after beta signup
 * Guides users through app download and initial setup
 */

'use client';

import { useState } from 'react';
import { CheckCircle2, Download, Mail, Smartphone, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: typeof Download;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export function OnboardingFlow({ isOpen, onClose, userEmail }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: Step[] = [
    {
      id: 0,
      title: 'Welcome to Zero Beta',
      description: 'Thanks for joining! Zero extracts actions from your emails automatically, so you can focus on what matters.',
      icon: CheckCircle2,
    },
    {
      id: 1,
      title: 'Download the App',
      description: 'Zero is available on the iOS App Store. Download it on your iPhone to get started.',
      icon: Download,
      action: {
        label: 'Open App Store',
        href: 'https://apps.apple.com/us/app/zer0-inbox/id6754212668',
        external: true,
      },
    },
    {
      id: 2,
      title: 'Connect Your Gmail',
      description: 'Open Zero and connect your Gmail account. We use read-only access and never store your email content.',
      icon: Mail,
    },
    {
      id: 3,
      title: 'Start Using Zero',
      description: 'Swipe right to complete actions, left to archive, down to snooze, or up to see all actions.',
      icon: Smartphone,
    },
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (stepId < steps.length - 1) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-terminal-gold">{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFE34D] transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-terminal-gold/10 border border-terminal-gold/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <StepIcon className="w-8 h-8 text-terminal-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {currentStepData.title}
              </h2>
              {userEmail && currentStep === 0 && (
                <p className="text-sm text-gray-400">{userEmail}</p>
              )}
            </div>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            {currentStepData.description}
          </p>

          {/* Step-specific content */}
          {currentStep === 1 && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
              <h3 className="text-sm font-bold text-white mb-2">What you'll need:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>iPhone running iOS 15 or later</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>Active Gmail account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>5 minutes for initial setup</span>
                </li>
              </ul>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
              <h3 className="text-sm font-bold text-white mb-2">Privacy & Security:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>Read-only access to your Gmail</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>No email content stored on our servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>OAuth 2.0 secure authentication</span>
                </li>
              </ul>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
              <h3 className="text-sm font-bold text-white mb-2">Getting help:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>Email us at <a href="mailto:hello@rationale.work" className="text-terminal-gold hover:underline">hello@rationale.work</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>Check out the <Link href="/work/zero" className="text-terminal-gold hover:underline">full documentation</Link></span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          {!isLastStep && (
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip
            </button>
          )}

          {isLastStep ? (
            <button
              onClick={onClose}
              className="ml-auto px-8 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : currentStepData.action ? (
            <a
              href={currentStepData.action.href}
              target={currentStepData.action.external ? '_blank' : undefined}
              rel={currentStepData.action.external ? 'noopener noreferrer' : undefined}
              onClick={() => handleStepComplete(currentStep)}
              className="ml-auto px-8 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              {currentStepData.action.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => handleStepComplete(currentStep)}
              className="ml-auto px-8 py-3 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* All steps overview */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`p-2 rounded-lg text-xs transition-all ${
                  index === currentStep
                    ? 'bg-terminal-gold/20 border border-terminal-gold/50 text-white'
                    : completedSteps.includes(index)
                    ? 'bg-gray-800 border border-gray-700 text-gray-300'
                    : 'bg-gray-900 border border-gray-800 text-gray-500'
                }`}
              >
                {index + 1}. {step.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
