/**
 * Kit Quiz Component
 *
 * Interactive questionnaire to help users identify the right service kit.
 * Asks about stage, timeline, budget, and needs to recommend appropriate kits.
 */

'use client';

import { useState } from 'react';
import { serviceKits } from '@/lib/content/kits';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

interface QuizAnswers {
  stage?: string;
  timeline?: string;
  budget?: string;
  need?: string;
  team?: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'stage',
    question: 'What stage are you at?',
    options: [
      { value: 'idea', label: 'Idea stage', description: 'Have a concept but no product yet' },
      { value: 'mvp', label: 'Early MVP', description: 'Have a basic product, need refinement' },
      { value: 'growing', label: 'Growing product', description: 'Product-market fit, scaling challenges' },
      { value: 'established', label: 'Established product', description: 'Mature product, new features/direction' },
    ],
  },
  {
    id: 'timeline',
    question: 'What\'s your timeline?',
    options: [
      { value: 'urgent', label: 'ASAP (1-2 weeks)', description: 'Need quick answers or validation' },
      { value: 'normal', label: '2-4 weeks', description: 'Standard project timeline' },
      { value: 'flexible', label: '1-3 months+', description: 'Building something substantial' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget flexibility?',
    options: [
      { value: 'constrained', label: 'Limited', description: 'Looking for equity partnership' },
      { value: 'moderate', label: 'Moderate', description: 'Mix of cash and equity works' },
      { value: 'flexible', label: 'Flexible', description: 'Can pay fees' },
    ],
  },
  {
    id: 'need',
    question: 'What\'s your primary need?',
    options: [
      { value: 'validation', label: 'Quick validation', description: 'Test if this idea has legs' },
      { value: 'design', label: 'Product direction', description: 'Need strategic clarity and UX' },
      { value: 'prototype', label: 'Working demo', description: 'Build something to show and test' },
      { value: 'build', label: 'Full product', description: 'Ship a complete solution' },
      { value: 'partnership', label: 'Product co-founder', description: 'Need ongoing product leadership' },
    ],
  },
  {
    id: 'team',
    question: 'What\'s your team situation?',
    options: [
      { value: 'solo', label: 'Solo founder', description: 'Just me, need execution partner' },
      { value: 'small', label: 'Small team (2-5)', description: 'Have some help, need direction' },
      { value: 'missing-product', label: 'Missing product leader', description: 'Have team, need CPO/product expertise' },
      { value: 'established', label: 'Full team', description: 'Need specific project help' },
    ],
  },
];

interface KitQuizProps {
  onClose: () => void;
}

export function KitQuiz({ onClose }: KitQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show results
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Recommendation logic
  const getRecommendedKits = () => {
    const recommended: { slug: string; score: number; reason: string }[] = [];

    // Strategy Kit - best for validation, quick answers
    if (answers.need === 'validation' || answers.timeline === 'urgent') {
      recommended.push({
        slug: 'strategy-kit',
        score: 10,
        reason: 'Perfect for quick validation and strategic clarity',
      });
    }

    // Clarity Kit - best for design and direction
    if (answers.need === 'design' || answers.stage === 'idea') {
      recommended.push({
        slug: 'clarity-kit',
        score: 9,
        reason: 'Ideal for defining product direction and user experience',
      });
    }

    // Prototype Kit - best for working demos
    if (answers.need === 'prototype' || (answers.stage === 'idea' && answers.timeline !== 'urgent')) {
      recommended.push({
        slug: 'prototype-kit',
        score: 9,
        reason: 'Best for building working demos to test with users',
      });
    }

    // Launch Kit - best for full builds
    if (answers.need === 'build' || (answers.stage === 'mvp' && answers.timeline === 'flexible')) {
      recommended.push({
        slug: 'launch-kit',
        score: 9,
        reason: 'Complete solution for shipping production-ready products',
      });
    }

    // Build Partner - best for ongoing partnership
    if (answers.need === 'partnership' || answers.team === 'missing-product' || answers.budget === 'constrained') {
      recommended.push({
        slug: 'build-partner',
        score: 10,
        reason: 'Long-term equity partnership with dedicated product leadership',
      });
    }

    // Sort by score and return top 2-3
    return recommended
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((rec) => {
        const kit = serviceKits.find((k) => k.slug === rec.slug);
        return { ...kit!, reason: rec.reason };
      });
  };

  const recommendedKits = showResults ? getRecommendedKits() : [];

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Find Your Perfect Kit</h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Close quiz"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!showResults && (
            <>
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted mt-2">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResults ? (
            <>
              {/* Question */}
              <h3 className="text-xl font-semibold text-foreground mb-6">{question.question}</h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className="w-full text-left p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all"
                  >
                    <div className="font-medium text-foreground mb-1">{option.label}</div>
                    <div className="text-sm text-muted">{option.description}</div>
                  </button>
                ))}
              </div>

              {/* Back button */}
              {currentQuestion > 0 && (
                <div className="mt-6">
                  <button
                    onClick={handleBack}
                    className="text-accent hover:underline text-sm"
                  >
                    ← Back to previous question
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Results */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Based on your answers, we recommend:
                </h3>
                <p className="text-muted">
                  These kits match your needs, but feel free to explore all options.
                </p>
              </div>

              {/* Recommended kits */}
              <div className="space-y-4 mb-6">
                {recommendedKits.map((kit, index) => (
                  <div
                    key={kit.slug}
                    className="rounded-lg border border-border p-6 hover:border-accent transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">{kit.name}</h4>
                        <p className="text-sm text-accent font-medium">{kit.tagline}</p>
                      </div>
                      {index === 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                          Best Match
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted mb-4">{kit.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted">
                        <span className="font-medium text-foreground">{kit.duration}</span> • {kit.pricing}
                      </div>
                      <ButtonSecondary href={`/services/${kit.slug}`} size="sm">
                        Learn more →
                      </ButtonSecondary>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <ButtonPrimary href="/contact" size="md" fullWidth>
                  Let's talk about your needs
                </ButtonPrimary>
                <ButtonSecondary onClick={handleRestart} size="md">
                  Retake quiz
                </ButtonSecondary>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
