'use client';

import { AccordionDiagram, type AccordionSection } from '@/components/diagrams/AccordionDiagram';

/**
 * Mobile-optimized NIL Complexity Diagram
 * Shows the web of stakeholders and concerns in NIL deals
 */
export default function NILComplexityDiagramMobile() {
  const sections: AccordionSection[] = [
    {
      id: 'overview',
      title: '🎯 At the Center: The Athlete',
      icon: '⚡',
      color: 'from-yellow-500 to-amber-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Every NIL deal puts the athlete at the center of a complex web involving{' '}
            <span className="text-terminal-gold font-bold">6+ stakeholders</span> and{' '}
            <span className="text-red-400 font-bold">dozens of considerations</span>.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-terminal-gold font-bold text-sm mb-2">The Challenge</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Each stakeholder has conflicting interests and concerns</li>
              <li>• Legal, financial, and compliance issues intersect chaotically</li>
              <li>• Athletes and families struggle to navigate the complexity</li>
              <li>• Traditional approaches fail to provide clarity</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'school',
      title: 'School / University',
      icon: '🏫',
      color: 'from-blue-500 to-cyan-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            The school has compliance obligations and wants to protect team culture.
          </p>
          <div className="space-y-2">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
              <h5 className="text-blue-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• NCAA compliance and eligibility preservation</li>
                <li>• Team dynamics and fairness across athletes</li>
                <li>• Academic performance requirements</li>
                <li>• Brand alignment with university values</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Conflicting sponsor relationships</li>
                <li>• Time commitment impact on academics/practice</li>
                <li>• Social media activity restrictions</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ncaa',
      title: 'NCAA Compliance Office',
      icon: '⚖️',
      color: 'from-purple-500 to-indigo-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            NCAA rules govern NIL activity and can result in eligibility loss if violated.
          </p>
          <div className="space-y-2">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
              <h5 className="text-purple-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• No pay-for-play or recruiting inducements</li>
                <li>• State law compliance (varies by state)</li>
                <li>• Reporting and disclosure requirements</li>
                <li>• Fair market value determinations</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Ambiguous "fair market value" standards</li>
                <li>• Rapidly changing rules and interpretations</li>
                <li>• Retroactive enforcement and penalties</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'brand',
      title: 'Brand / Sponsor',
      icon: '🏢',
      color: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Brands want maximum exposure and ROI with minimal risk and complexity.
          </p>
          <div className="space-y-2">
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <h5 className="text-green-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Content deliverables and quality standards</li>
                <li>• Exclusivity and competitor restrictions</li>
                <li>• Social media reach and engagement metrics</li>
                <li>• Termination clauses for poor performance</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Unrealistic content volume expectations</li>
                <li>• Vague performance metrics</li>
                <li>• Payment timing and milestone disputes</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'agent',
      title: 'Agent / Representative',
      icon: '🤝',
      color: 'from-orange-500 to-red-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Agents want to maximize deal value while maintaining good relationships with all parties.
          </p>
          <div className="space-y-2">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
              <h5 className="text-orange-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Commission structure and payment timing</li>
                <li>• Deal velocity and close rates</li>
                <li>• Athlete satisfaction and retention</li>
                <li>• Brand relationship management</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Balancing athlete interests vs. commission</li>
                <li>• Managing family expectations and involvement</li>
                <li>• Competing agents and poaching attempts</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'family',
      title: 'Family / Parents',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-pink-500 to-rose-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Families want to protect the athlete while ensuring fair compensation and opportunity.
          </p>
          <div className="space-y-2">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded p-3">
              <h5 className="text-pink-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Understanding contract terms in plain language</li>
                <li>• Protecting athlete from exploitation</li>
                <li>• Tax implications and financial planning</li>
                <li>• Long-term career and education impact</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Confusion about legal jargon and terms</li>
                <li>• Trust issues with agents and brands</li>
                <li>• Pressure to sign deals quickly</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'lawyer',
      title: 'Attorney / Legal Counsel',
      icon: '⚖️',
      color: 'from-indigo-500 to-purple-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">
            Attorneys review contracts for legal risks and ensure compliance with all applicable laws.
          </p>
          <div className="space-y-2">
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded p-3">
              <h5 className="text-indigo-400 font-bold text-xs mb-1">Key Concerns:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Contract enforceability and risk mitigation</li>
                <li>• Intellectual property rights protection</li>
                <li>• Liability and indemnification clauses</li>
                <li>• State and federal law compliance</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-400 font-bold text-xs mb-1">Common Issues:</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• High legal fees deter family engagement</li>
                <li>• Slow turnaround times kill deal momentum</li>
                <li>• Overly conservative advice blocks opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'concerns',
      title: '🚨 6 Major Concern Areas',
      icon: '⚠️',
      color: 'from-red-500 to-orange-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm mb-4">
            Every NIL deal must address these critical considerations:
          </p>
          <div className="space-y-3">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">💰 Tax Implications</h5>
              <p className="text-xs text-gray-400">
                Income tax, self-employment tax, state tax nexus, estimated quarterly payments
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">✅ Eligibility Preservation</h5>
              <p className="text-xs text-gray-400">
                NCAA compliance, state law alignment, fair market value standards
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">📄 Contract Terms</h5>
              <p className="text-xs text-gray-400">
                Payment structure, deliverables, exclusivity, termination clauses
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">🖼️ Rights & IP</h5>
              <p className="text-xs text-gray-400">
                Image rights, content ownership, usage duration, territorial restrictions
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">⏰ Timing & Deadlines</h5>
              <p className="text-xs text-gray-400">
                Payment milestones, content delivery schedules, performance windows
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h5 className="text-red-400 font-bold text-sm mb-1">💵 Deal Value & ROI</h5>
              <p className="text-xs text-gray-400">
                Fair market value assessment, performance bonuses, brand exposure metrics
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'solution',
      title: '✨ The NIL Platform Solution',
      icon: '🎯',
      color: 'from-terminal-gold to-yellow-500',
      content: (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm mb-4">
            Our AI-powered platform cuts through the complexity:
          </p>
          <div className="space-y-3">
            <div className="bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg p-4">
              <h5 className="text-terminal-gold font-bold text-sm mb-2">🤖 AI Analysis</h5>
              <p className="text-xs text-gray-400 mb-2">
                Trained on 5,000+ NIL deals to instantly identify red flags and compliance issues
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• 95%+ accuracy in risk detection</li>
                <li>• &lt;30 second analysis time</li>
                <li>• Plain-language explanations</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h5 className="text-green-400 font-bold text-sm mb-2">✓ Trust Building</h5>
              <p className="text-xs text-gray-400 mb-2">
                Multi-checkpoint process ensures athlete and family confidence
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• Pattern matching against successful deals</li>
                <li>• Family-friendly report generation</li>
                <li>• Optional legal review network</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h5 className="text-blue-400 font-bold text-sm mb-2">⚡ Speed & Scale</h5>
              <p className="text-xs text-gray-400 mb-2">
                Close more deals faster with automated compliance and clarity
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>• 3-5x faster deal velocity</li>
                <li>• 35%+ close rate improvement</li>
                <li>• Agent becomes trusted advisor</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          Web of NIL Complexity
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Every deal involves 6+ stakeholders and dozens of considerations
        </p>
      </div>

      <AccordionDiagram
        sections={sections}
        title="NIL Deal Stakeholders"
        defaultOpen="overview"
      />

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400 mb-1">7</div>
          <div className="text-xs text-gray-500">Parties</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400 mb-1">6</div>
          <div className="text-xs text-gray-500">Concerns</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-terminal-gold mb-1">1</div>
          <div className="text-xs text-gray-500">Solution</div>
        </div>
      </div>
    </div>
  );
}
