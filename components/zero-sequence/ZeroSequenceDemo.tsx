/**
 * ZeroSequenceDemo - Main Container Component
 * Orchestrates the entire Zero Sequence demo flow
 */

'use client';

import { useZeroSequenceStore } from '@/lib/zero-sequence/store';
import EmailInput from './EmailInput';
import StatusBanner from './StatusBanner';
import StepCard from './StepCard';
import IntentClassification from './Steps/IntentClassification';
import EntityExtraction from './Steps/EntityExtraction';
import ActionRouting from './Steps/ActionRouting';
import ModalFlowAnalysis from './Steps/ModalFlowAnalysis';
import type { EmailData } from '@/lib/zero-sequence/types';
import type { StepStatus } from './StepCard';

export default function ZeroSequenceDemo() {
  const {
    emailInput,
    classification,
    entities,
    actions,
    modalFlow,
    currentStep,
    loading,
    error,
    runSequence,
    reset,
  } = useZeroSequenceStore();

  // Handle email submission
  const handleEmailSubmit = async (email: EmailData) => {
    await runSequence(email);
  };

  // Determine step statuses
  const getStepStatus = (stepName: string): StepStatus => {
    if (error) return 'error';

    if (currentStep === stepName) {
      return loading ? 'processing' : 'complete';
    }

    // Check if step has been completed
    switch (stepName) {
      case 'classification':
        return classification ? 'complete' : 'pending';
      case 'entities':
        return entities ? 'complete' : 'pending';
      case 'actions':
        return actions ? 'complete' : 'pending';
      case 'modal':
        return modalFlow ? 'complete' : 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Error Banner */}
        {error && (
          <StatusBanner
            type="error"
            message={error}
            onClose={reset}
          />
        )}

        {/* Email Input */}
        <EmailInput
          onSubmit={handleEmailSubmit}
          loading={loading}
          disabled={loading}
        />

        {/* Reset Button (show when sequence has started) */}
        {emailInput && (
          <div className="flex justify-center">
            <button
              onClick={reset}
              disabled={loading}
              className="px-6 py-2 bg-gray-800 border border-gray-600 text-white text-sm font-semibold rounded-lg hover:border-[#FFD700] hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Reset
            </button>
          </div>
        )}

        {/* Step 1: Intent Classification */}
        {emailInput && (
          <StepCard
            title="Step 1: Intent Classification"
            status={getStepStatus('classification')}
            stepNumber={1}
          >
            {classification && <IntentClassification data={classification} />}
          </StepCard>
        )}

        {/* Step 2: Entity Extraction */}
        {classification && (
          <StepCard
            title="Step 2: Entity Extraction"
            status={getStepStatus('entities')}
            stepNumber={2}
          >
            {entities && <EntityExtraction data={entities} />}
          </StepCard>
        )}

        {/* Step 3: Action Routing */}
        {entities && (
          <StepCard
            title="Step 3: Action Routing"
            status={getStepStatus('actions')}
            stepNumber={3}
          >
            {actions && <ActionRouting data={actions} />}
          </StepCard>
        )}

        {/* Step 4: Modal Flow Analysis */}
        {actions && (
          <StepCard
            title="Step 4: Modal Flow Analysis"
            status={getStepStatus('modal')}
            stepNumber={4}
          >
            {modalFlow && <ModalFlowAnalysis data={modalFlow} />}
          </StepCard>
        )}

        {/* Success Message */}
        {modalFlow && !loading && !error && (
          <StatusBanner
            type="success"
            message="Zero Sequence analysis complete!"
            autoHide
            autoHideDelay={5000}
          />
        )}
      </div>
    </div>
  );
}
