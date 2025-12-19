'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'center';
  highlightArea?: string; // CSS selector for element to highlight
  action?: 'swipe-left' | 'swipe-right' | 'swipe-up' | 'swipe-down' | 'tap' | 'none';
}

interface GuidedTutorialProps {
  enabled?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: '👋 Welcome to Zero!',
    description: 'Let me show you how Zero transforms your inbox in seconds. This quick tour takes just 30 seconds.',
    position: 'center',
    action: 'none'
  },
  {
    id: 'intent-tags',
    title: '🎯 AI Intent Detection',
    description: 'Zero automatically identifies what each email needs. See the intent tag at the top? That\'s our AI analyzing the email in real-time.',
    position: 'top',
    action: 'none'
  },
  {
    id: 'ai-analysis',
    title: '🤖 Smart Analysis',
    description: 'Our AI reads the email and suggests the best action. No more thinking "what should I do with this?"',
    position: 'center',
    action: 'none'
  },
  {
    id: 'swipe-right',
    title: '→ Swipe Right to Act',
    description: 'Try swiping this card to the right! It will execute the AI-suggested action automatically.',
    position: 'bottom',
    action: 'swipe-right'
  },
  {
    id: 'swipe-left',
    title: '← Swipe Left to Archive',
    description: 'Swipe left to quickly archive emails you don\'t need. Keep your inbox clean effortlessly.',
    position: 'bottom',
    action: 'swipe-left'
  },
  {
    id: 'swipe-up',
    title: '↑ Swipe Up for More',
    description: 'Need more options? Swipe up to see all available actions for this email.',
    position: 'bottom',
    action: 'swipe-up'
  },
  {
    id: 'complete',
    title: '🎉 You\'re Ready!',
    description: 'That\'s it! With Zero, you\'ll process your entire inbox in minutes instead of hours. Ready to try?',
    position: 'center',
    action: 'none'
  }
];

/**
 * Guided Tutorial Component
 * Interactive walkthrough for first-time users
 * Shows how to use the Zero demo effectively
 */
export default function GuidedTutorial({ enabled = true, onComplete, onSkip }: GuidedTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial before
    const hasSeenTutorial = localStorage.getItem('zero-tutorial-completed');
    if (enabled && !hasSeenTutorial) {
      // Delay showing tutorial slightly so demo loads first
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [enabled]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('zero-tutorial-skipped', 'true');
    setIsVisible(false);
    if (onSkip) onSkip();
  };

  const handleComplete = () => {
    localStorage.setItem('zero-tutorial-completed', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - subtle, allows interaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[800] pointer-events-none"
          />

          {/* Tutorial Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed z-[801] left-4 right-4 md:left-auto md:right-auto md:max-w-md md:mx-auto ${
              currentStepData.position === 'top'
                ? 'top-24'
                : currentStepData.position === 'bottom'
                ? 'bottom-24'
                : 'top-1/2 -translate-y-1/2'
            }`}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-1 shadow-2xl">
              <div className="bg-gray-900 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white mb-1">
                      {currentStepData.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>
                  <button
                    onClick={handleSkip}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                    aria-label="Skip tutorial"
                  >
                    Skip
                  </button>
                </div>

                {/* Action Hint */}
                {currentStepData.action !== 'none' && (
                  <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Try it now:</div>
                    <div className="text-sm text-white font-semibold">
                      {currentStepData.action === 'swipe-right' && '→ Swipe the card to the right'}
                      {currentStepData.action === 'swipe-left' && '← Swipe the card to the left'}
                      {currentStepData.action === 'swipe-up' && '↑ Swipe the card upward'}
                      {currentStepData.action === 'swipe-down' && '↓ Swipe the card downward'}
                      {currentStepData.action === 'tap' && 'Tap the highlighted area'}
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
                    <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    {currentStep === tutorialSteps.length - 1 ? (
                      <>
                        Get Started
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pulse Animation on Highlighted Element (if any) */}
          {currentStepData.highlightArea && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="fixed inset-0 z-[799] pointer-events-none"
            >
              {/* Spotlight effect would go here */}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
