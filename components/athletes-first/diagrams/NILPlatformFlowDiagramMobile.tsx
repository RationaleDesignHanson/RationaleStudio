'use client';

import { StepByStepDiagram, type Step } from '@/components/diagrams/StepByStepDiagram';

/**
 * Mobile-optimized NIL Platform Flow Diagram
 * 5-step trust-building workflow for NIL compliance
 */
export default function NILPlatformFlowDiagramMobile() {
  const steps: Step[] = [
    {
      id: 'upload',
      title: 'Step 1: Upload Contract',
      description: 'Athletes or families upload NIL contract or term sheet for instant AI analysis.',
      visual: (
        <div className="bg-orange-500/20 border-2 border-orange-500/50 rounded-lg p-6">
          <div className="text-6xl mb-4 text-center">📄</div>
          <h4 className="text-orange-400 font-bold text-lg mb-3 text-center">CONTRACT UPLOAD</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>PDF, Word, or photo of contract</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Secure upload via encrypted connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>OCR for scanned documents</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Instant processing in under 30 seconds</span>
            </li>
          </ul>
        </div>
      ),
      metrics: [
        { label: 'Processing', value: '<30 sec' },
        { label: 'Security', value: 'Encrypted' },
      ],
    },
    {
      id: 'analyze',
      title: 'Step 2: AI Analysis',
      description: 'AI trained on 5,000+ NIL deals instantly analyzes contract terms for red flags.',
      visual: (
        <div className="bg-cyan-500/20 border-2 border-cyan-500/50 rounded-lg p-6">
          <div className="text-6xl mb-4 text-center">🔍</div>
          <h4 className="text-cyan-400 font-bold text-lg mb-3 text-center">AI PATTERN MATCHING</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Trained on 5,000+ successful NIL deals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Pattern matching against known red flags</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Cross-reference with NCAA compliance rules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>Identify unusual clauses or missing protections</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-cyan-500/30">
            <p className="text-xs text-cyan-300 text-center font-mono">
              ✓ Checkpoint: Pattern Match Complete
            </p>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Training Data', value: '5,000+ deals' },
        { label: 'Accuracy', value: '95%+' },
      ],
    },
    {
      id: 'detect',
      title: 'Step 3: Red Flag Detection',
      description: 'System identifies unusual clauses, payment terms, or compliance risks.',
      visual: (
        <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-6">
          <div className="text-6xl mb-4 text-center">⚠</div>
          <h4 className="text-red-400 font-bold text-lg mb-3 text-center">RISK ASSESSMENT</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Unusual payment structures (upfront fees, exclusivity)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Missing termination clauses or exit rights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>NCAA eligibility risks or compliance violations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>Image rights, content ownership concerns</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-red-500/30">
            <p className="text-xs text-red-300 text-center font-mono">
              ✓ Checkpoint: Risk Assessment Complete
            </p>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Red Flags', value: 'Instant' },
        { label: 'Compliance', value: 'NCAA Rules' },
      ],
    },
    {
      id: 'report',
      title: 'Step 4: Family-Friendly Report',
      description: 'AI generates plain-language summary for athletes and families to understand easily.',
      visual: (
        <div className="bg-green-500/20 border-2 border-green-500/50 rounded-lg p-6">
          <div className="text-6xl mb-4 text-center">✓</div>
          <h4 className="text-green-400 font-bold text-lg mb-3 text-center">PLAIN LANGUAGE REPORT</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>No legal jargon - written for families</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Visual indicators: 🟢 Good, 🟡 Caution, 🔴 Risk</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Key terms explained in simple language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>Recommendations: Sign, negotiate, or reject</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-green-500/30">
            <p className="text-xs text-green-300 text-center font-mono">
              ✓ Checkpoint: Comprehension Verified
            </p>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Reading Level', value: '8th Grade' },
        { label: 'Family Trust', value: '95%+' },
      ],
    },
    {
      id: 'legal',
      title: 'Step 5: Optional Legal Review',
      description: 'For complex deals, athletes can request human attorney review within 24-48 hours.',
      visual: (
        <div className="bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-6">
          <div className="text-6xl mb-4 text-center">⚖</div>
          <h4 className="text-purple-400 font-bold text-lg mb-3 text-center">ATTORNEY VALIDATION</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Optional for complex or high-value deals ($50K+)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Network of NIL-specialized attorneys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>24-48 hour turnaround for legal opinion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Agent covers cost as value-add service</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-purple-500/30">
            <p className="text-xs text-purple-300 text-center font-mono">
              ✓ Checkpoint: Legal Validation Complete
            </p>
          </div>
        </div>
      ),
      metrics: [
        { label: 'Turnaround', value: '24-48 hrs' },
        { label: 'Cost', value: 'Agent Paid' },
      ],
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-terminal-gold">
          5-Step NIL Compliance Process
        </h2>
      </div>

      <StepByStepDiagram
        steps={steps}
        title=""
        allowNonLinear={true}
      />

      {/* Trust Indicators Footer */}
      <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold text-sm mb-2 text-center">TRUST INDICATORS</h4>
        <p className="text-xs text-gray-400 text-center font-mono">
          95%+ accuracy • Plain language • Family-friendly
        </p>
        <p className="text-terminal-gold font-bold text-sm mt-3 text-center tracking-wide">
          YOU BECOME THE TRUSTED ADVISOR
        </p>
      </div>
    </div>
  );
}
