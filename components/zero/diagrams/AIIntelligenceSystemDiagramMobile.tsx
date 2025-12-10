'use client';

import { useState } from 'react';
import { Mail, Brain, Zap, CheckCircle, Clock, Target, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * AIIntelligenceSystemDiagram: Mobile Step-by-Step Flow
 *
 * Shows how Zero's AI processes emails through 4 layers
 * One layer at a time with wizard navigation
 */

interface IntentGroup {
  id: string;
  name: string;
  color: string;
  intents: string[];
  examples: string[];
}

interface ActionType {
  id: string;
  name: string;
  category: string;
  icon: string;
  preview: string;
}

const intentGroups: IntentGroup[] = [
  {
    id: 'transactional',
    name: 'Transactional',
    color: '#4299E1',
    intents: ['Order Confirmation', 'Shipping Update', 'Delivery Notice', 'Receipt', 'Invoice'],
    examples: ['Amazon order #123 shipped', 'Your package has arrived']
  },
  {
    id: 'actionable',
    name: 'Actionable',
    color: '#48BB78',
    intents: ['Calendar Invite', 'RSVP Request', 'Task Assignment', 'Bill Payment', 'Form to Sign'],
    examples: ['Meeting tomorrow at 2pm', 'Please RSVP by Friday']
  },
  {
    id: 'social',
    name: 'Social',
    color: '#9F7AEA',
    intents: ['Personal Email', 'Social Update', 'Group Message', 'Invitation', 'Greeting'],
    examples: ['Dinner this weekend?', 'Happy birthday!']
  },
  {
    id: 'promotional',
    name: 'Promotional',
    color: '#F6AD55',
    intents: ['Marketing', 'Newsletter', 'Sale Announcement', 'Product Launch', 'Offer'],
    examples: ['20% off sale', 'New arrivals this week']
  },
  {
    id: 'informational',
    name: 'Informational',
    color: '#CBD5E0',
    intents: ['Newsletter', 'Report', 'Digest', 'Notification', 'Update'],
    examples: ['Weekly digest', 'System update available']
  }
];

const actionTypes: ActionType[] = [
  { id: 'calendar', name: 'Add to Calendar', category: 'scheduling', icon: '📅', preview: 'Creates calendar event with time & location' },
  { id: 'track', name: 'Track Package', category: 'shopping', icon: '📦', preview: 'Monitors shipping status with notifications' },
  { id: 'pay', name: 'Pay Bill', category: 'tasks', icon: '💳', preview: 'Sets payment reminder with amount' },
  { id: 'unsubscribe', name: 'Unsubscribe', category: 'subscriptions', icon: '✉️', preview: 'One-tap unsubscribe from mailing list' },
  { id: 'reply', name: 'Smart Reply', category: 'replies', icon: '💬', preview: 'AI-generated response options' },
  { id: 'reminder', name: 'Set Reminder', category: 'tasks', icon: '⏰', preview: 'Creates task with smart timing' },
  { id: 'save', name: 'Save Offer', category: 'shopping', icon: '🏷️', preview: 'Archives promo code for later' },
  { id: 'rsvp', name: 'RSVP', category: 'scheduling', icon: '✓', preview: 'Quick yes/no/maybe response' }
];

const layers = [
  {
    id: 'ingestion',
    title: '1. INGESTION',
    description: 'Email arrives and is parsed',
    icon: Mail,
    color: '#718096',
    borderColor: '#4A5568',
    bgColor: '#2D3748',
    items: [
      { label: 'Gmail API', sublabel: 'Real-time sync' },
      { label: 'IMAP Sync', sublabel: 'Fallback protocol' },
      { label: 'Parse Headers', sublabel: 'Metadata extraction' },
      { label: 'Extract Body', sublabel: 'Content analysis' }
    ]
  },
  {
    id: 'classification',
    title: '2. CLASSIFICATION',
    description: '43 intents across 5 categories',
    icon: Brain,
    color: '#4299E1',
    borderColor: '#4299E1',
    bgColor: '#2D3748',
    items: intentGroups.map(group => ({
      label: group.name,
      sublabel: `${group.intents.length} intents`,
      color: group.color,
      examples: group.intents.slice(0, 2)
    }))
  },
  {
    id: 'actions',
    title: '3. ACTION ROUTER',
    description: '35+ action types suggested',
    icon: Zap,
    color: '#48BB78',
    borderColor: '#48BB78',
    bgColor: '#2D3748',
    items: actionTypes.slice(0, 8).map(action => ({
      label: action.name,
      sublabel: action.preview,
      icon: action.icon
    }))
  },
  {
    id: 'output',
    title: '4. OUTPUT',
    description: 'User-facing interface',
    icon: CheckCircle,
    color: '#D4AF37',
    borderColor: '#D4AF37',
    bgColor: '#2D3748',
    items: [
      { label: 'Swipe Card', sublabel: 'Triage UI with actions', color: '#4299E1' },
      { label: 'Summary', sublabel: '2-sentence digest', color: '#9F7AEA' },
      { label: 'Smart Reply', sublabel: '3 response options', color: '#48BB78' }
    ]
  }
];

export default function AIIntelligenceSystemDiagramMobile() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const currentLayer = layers[currentStep];
  const Icon = currentLayer.icon;

  const goToNext = () => {
    if (currentStep < layers.length - 1) {
      setCurrentStep(currentStep + 1);
      setExpandedItem(null);
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setExpandedItem(null);
    }
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-4 border-2 border-[#4299E1]/30">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          AI Intelligence System
        </h3>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Email → Action in 4 Steps
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-4">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              onClick={() => {
                setCurrentStep(index);
                setExpandedItem(null);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all"
              style={{
                backgroundColor: index === currentStep ? `${layer.color}30` : '#2D3748',
                borderWidth: '1px',
                borderColor: index === currentStep ? layer.color : '#4A5568'
              }}
              aria-label={`Go to ${layer.title}`}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              <span
                className="text-xs font-bold"
                style={{
                  color: index === currentStep ? layer.color : '#718096',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Layer */}
      <div
        className="p-6 rounded-lg border-2 mb-4"
        style={{
          backgroundColor: currentLayer.bgColor,
          borderColor: currentLayer.borderColor
        }}
      >
        {/* Layer Icon & Title */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="p-4 rounded-full mb-3"
            style={{ backgroundColor: `${currentLayer.color}30` }}
          >
            <Icon className="w-8 h-8" style={{ color: currentLayer.color }} />
          </div>
          <h4 className="text-base font-bold text-white text-center mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {currentLayer.title}
          </h4>
          <p className="text-xs text-gray-400 text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {currentLayer.description}
          </p>
        </div>

        {/* Layer Items */}
        <div className="space-y-2">
          {currentLayer.items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                className="w-full text-left p-3 rounded transition-all"
                style={{
                  backgroundColor: expandedItem === index ? '#1A202C' : 'transparent',
                  borderLeft: `3px solid ${item.color || currentLayer.color}`
                }}
              >
                <div className="flex items-start gap-2">
                  {item.icon && (
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {item.sublabel}
                    </div>

                    {/* Expandable Examples (Classification Layer) */}
                    {expandedItem === index && item.examples && (
                      <div className="mt-2 space-y-1 pl-2 border-l-2 border-gray-700">
                        {item.examples.map((example, exIdx) => (
                          <div key={exIdx} className="text-xs text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            • {example}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Step {currentStep + 1} of {layers.length}
        </div>

        <button
          onClick={goToNext}
          disabled={currentStep === layers.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Stats */}
      <div className="pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-[#4299E1]" />
              <div className="text-xl font-bold text-[#4299E1]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                95%
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Accuracy
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-[#48BB78]" />
              <div className="text-xl font-bold text-[#48BB78]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                100ms
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Processing
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
              <div className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                60%
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Auto-handled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
