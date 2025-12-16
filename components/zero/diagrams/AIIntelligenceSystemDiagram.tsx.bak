'use client';

import { useState } from 'react';
import { Mail, Brain, Zap, CheckCircle, Clock, Target } from 'lucide-react';

/**
 * AIIntelligenceSystemDiagram: Layered Flow Diagram
 *
 * Shows how Zero's AI processes emails through classification → action suggestion → output
 * 4 layers: Ingestion → Classification → Action Router → User Output
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
    color: '#4299E1', // Blue
    intents: ['Order Confirmation', 'Shipping Update', 'Delivery Notice', 'Receipt', 'Invoice'],
    examples: ['Amazon order #123 shipped', 'Your package has arrived']
  },
  {
    id: 'actionable',
    name: 'Actionable',
    color: '#48BB78', // Green
    intents: ['Calendar Invite', 'RSVP Request', 'Task Assignment', 'Bill Payment', 'Form to Sign'],
    examples: ['Meeting tomorrow at 2pm', 'Please RSVP by Friday']
  },
  {
    id: 'social',
    name: 'Social',
    color: '#9F7AEA', // Purple
    intents: ['Personal Email', 'Social Update', 'Group Message', 'Invitation', 'Greeting'],
    examples: ['Dinner this weekend?', 'Happy birthday!']
  },
  {
    id: 'promotional',
    name: 'Promotional',
    color: '#F6AD55', // Orange
    intents: ['Marketing', 'Newsletter', 'Sale Announcement', 'Product Launch', 'Offer'],
    examples: ['20% off sale', 'New arrivals this week']
  },
  {
    id: 'informational',
    name: 'Informational',
    color: '#CBD5E0', // Gray
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

export default function AIIntelligenceSystemDiagram() {
  const [hoveredIntent, setHoveredIntent] = useState<string | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState(false);

  const triggerAnimation = () => {
    setAnimationActive(true);
    setTimeout(() => setAnimationActive(false), 3000);
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-8 border-2 border-[#4299E1]/30">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          AI Intelligence System: From Email to Action
        </h3>
        <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          43 intents • 35+ action types • 100ms processing time
        </p>
        <button
          onClick={triggerAnimation}
          className="px-4 py-2 bg-[#4299E1] text-white rounded-lg text-xs font-bold hover:bg-[#3182CE] transition"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          ▶ Animate Email Flow
        </button>
      </div>

      {/* 4-Layer Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">

        {/* Layer 1: Email Ingestion */}
        <div className="relative">
          <div className="p-6 bg-[#2D3748] rounded-lg border-2 border-gray-600">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gray-700 rounded-full">
                <Mail className="w-8 h-8 text-gray-300" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white text-center mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              1. INGESTION
            </h4>
            <div className="space-y-2 text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <div>✓ Gmail API</div>
              <div>✓ IMAP sync</div>
              <div>✓ Parse headers</div>
              <div>✓ Extract body</div>
            </div>
          </div>
          {/* Animated flow arrow */}
          {animationActive && (
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#4299E1] rounded-full animate-ping" />
          )}
        </div>

        {/* Layer 2: Classification (43 intents) */}
        <div className="relative">
          <div className="p-6 bg-[#2D3748] rounded-lg border-2 border-[#4299E1]">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#4299E1]/20 rounded-full">
                <Brain className="w-8 h-8 text-[#4299E1]" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white text-center mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              2. CLASSIFICATION
            </h4>
            <div className="space-y-2">
              {intentGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-2 rounded cursor-pointer transition-all"
                  style={{
                    backgroundColor: hoveredIntent === group.id ? `${group.color}30` : '#1A202C',
                    borderLeft: `3px solid ${group.color}`
                  }}
                  onMouseEnter={() => setHoveredIntent(group.id)}
                  onMouseLeave={() => setHoveredIntent(null)}
                >
                  <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {group.name}
                  </div>
                  {hoveredIntent === group.id && (
                    <div className="mt-2 space-y-1">
                      {group.intents.slice(0, 3).map((intent, idx) => (
                        <div key={idx} className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          • {intent}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {animationActive && (
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#48BB78] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          )}
        </div>

        {/* Layer 3: Action Router (35+ actions) */}
        <div className="relative">
          <div className="p-6 bg-[#2D3748] rounded-lg border-2 border-[#48BB78]">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#48BB78]/20 rounded-full">
                <Zap className="w-8 h-8 text-[#48BB78]" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white text-center mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              3. ACTION ROUTER
            </h4>
            <div className="space-y-2">
              {actionTypes.slice(0, 6).map((action) => (
                <div
                  key={action.id}
                  className="p-2 rounded cursor-pointer transition-all text-center"
                  style={{
                    backgroundColor: hoveredAction === action.id ? '#48BB7830' : '#1A202C'
                  }}
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-base">{action.icon}</span>
                    <span className="text-[10px] text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {action.name}
                    </span>
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-center text-gray-500 pt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                +29 more actions
              </div>
            </div>
          </div>
          {animationActive && (
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#D4AF37] rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          )}
        </div>

        {/* Layer 4: User Output */}
        <div className="relative">
          <div className="p-6 bg-[#2D3748] rounded-lg border-2 border-[#D4AF37]">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-[#D4AF37]/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-white text-center mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              4. OUTPUT
            </h4>
            <div className="space-y-3 text-xs text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <div className="p-2 bg-[#1A202C] rounded">
                <div className="font-bold text-[#4299E1] mb-1">Swipe Card</div>
                <div className="text-[10px] text-gray-400">Triage UI with actions</div>
              </div>
              <div className="p-2 bg-[#1A202C] rounded">
                <div className="font-bold text-[#9F7AEA] mb-1">Summary</div>
                <div className="text-[10px] text-gray-400">2-sentence digest</div>
              </div>
              <div className="p-2 bg-[#1A202C] rounded">
                <div className="font-bold text-[#48BB78] mb-1">Smart Reply</div>
                <div className="text-[10px] text-gray-400">3 response options</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Preview Tooltip */}
      {hoveredAction && (
        <div className="mt-6 p-4 bg-[#48BB78]/10 border border-[#48BB78] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {actionTypes.find(a => a.id === hoveredAction)?.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {actionTypes.find(a => a.id === hoveredAction)?.name}
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {actionTypes.find(a => a.id === hoveredAction)?.preview}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#4299E1]" />
              <div className="text-2xl font-bold text-[#4299E1]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                95%
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Classification accuracy
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-[#48BB78]" />
              <div className="text-2xl font-bold text-[#48BB78]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                100ms
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Average processing time
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <div className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                60%
              </div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Emails auto-handled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
