/**
 * ModalFlowAnalysis Component (Step 4)
 * Displays modal flow steps - simple sequential visualization
 */

'use client';

import type { ModalFlowData } from '@/lib/zero-sequence/types';
import ModalStepContent from '../ModalStepContent';

interface ModalFlowAnalysisProps {
  data: ModalFlowData;
}

export default function ModalFlowAnalysis({ data }: ModalFlowAnalysisProps) {
  const { flow } = data;

  return (
    <div className="space-y-4">
      {/* Action Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {flow.actionTitle}
        </h3>
        <p className="text-sm text-gray-400">
          {flow.totalSteps} step{flow.totalSteps !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Display all modal steps sequentially */}
      {flow.steps.map((step, index) => (
        <div key={index} className="space-y-2">
          {/* Step Label */}
          <div className="text-sm font-semibold text-gray-400">
            Step {step.stepNumber}: {step.title}
          </div>

          {/* Modal Step Content */}
          <ModalStepContent
            actionId={flow.actionId}
            actionTitle={flow.actionTitle}
            stepIndex={index}
            totalSteps={flow.totalSteps}
            context={step.inputs || {}}
          />
        </div>
      ))}
    </div>
  );
}
