/**
 * Unified Video & Digital Twins Experience
 *
 * Entry point for all digital twin and video campaign workflows
 * - Campaign type selector (3 options)
 * - Routes to specific demos based on selection
 * - Back button returns to selector
 * - Responsive: carousel on mobile, grid on desktop
 */

'use client';

import { useState, useEffect } from 'react';
import DigitalTwinsDemo from './DigitalTwinsDemo';
import BrandCampaignDemo from './BrandCampaignDemo';
import RosterCampaignDemo from './RosterCampaignDemo';
import { Sparkles, Users, Settings } from 'lucide-react';
import { DigitalTwinProvider } from '../context/DigitalTwinContext';

type CampaignType = 'setup' | 'fan-content' | 'roster-wide' | null;

interface CampaignOption {
  id: CampaignType;
  icon: typeof Sparkles;
  title: string;
  description: string;
  color: string;
  benefits: string[];
}

const CAMPAIGN_OPTIONS: CampaignOption[] = [
  {
    id: 'setup',
    icon: Settings,
    title: 'Setup Digital Twin',
    description: 'First-Time Setup Flow',
    color: '#00D9FF',
    benefits: [
      'Upload media assets (4-hour session)',
      'Generate Digital Twin IDs',
      'Set consent & usage rights',
      'Verify ownership on blockchain'
    ]
  },
  {
    id: 'fan-content',
    icon: Sparkles,
    title: '1:1 Fan Content',
    description: 'Regional, Personalized & Seasonal',
    color: '#00FF94',
    benefits: [
      '20 regional spots from one session',
      '1,000 personalized fan messages',
      'Automated seasonal content',
      'Birthday shoutouts at scale'
    ]
  },
  {
    id: 'roster-wide',
    icon: Users,
    title: 'Roster-Wide Activations',
    description: 'One Brief → Entire Roster',
    color: '#9D4EDD',
    benefits: [
      'Entire roster in 48 hours',
      'Capitalize on trending moments',
      'Consistent brand messaging',
      'Individual athlete authenticity'
    ]
  }
];

export default function UnifiedVideoDigitalTwinsDemo() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If a campaign is selected, show the specific demo
  if (selectedCampaign === 'setup') {
    return (
      <DigitalTwinProvider>
      <div className="space-y-4">
        <button
          onClick={() => setSelectedCampaign(null)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Campaign Selector
        </button>
        <DigitalTwinsDemo
          onComplete={(nextAction) => setSelectedCampaign(nextAction)}
        />
      </div>
      </DigitalTwinProvider>
    );
  }

  if (selectedCampaign === 'fan-content') {
    return (
      <DigitalTwinProvider>
      <div className="space-y-4">
        <button
          onClick={() => setSelectedCampaign(null)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Campaign Selector
        </button>
        <BrandCampaignDemo />
      </div>
      </DigitalTwinProvider>
    );
  }

  if (selectedCampaign === 'roster-wide') {
    return (
      <DigitalTwinProvider>
      <div className="space-y-4">
        <button
          onClick={() => setSelectedCampaign(null)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-all flex items-center gap-2 text-sm"
        >
          ← Back to Campaign Selector
        </button>
        <RosterCampaignDemo />
      </div>
      </DigitalTwinProvider>
    );
  }

  // Campaign selector view
  return (
    <DigitalTwinProvider>
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-lg md:text-xl font-bold font-mono text-terminal-gold">
          VIDEO & DIGITAL TWINS
        </h3>
        <p className="text-xs md:text-sm font-mono text-white/60">
          {isMobile ? 'Swipe to explore workflows' : 'Select a workflow to explore'}
        </p>
      </div>

      {/* Mobile: Carousel */}
      {isMobile ? (
        <>
          {/* Tab indicators */}
          <div className="flex items-center justify-center gap-2">
            {CAMPAIGN_OPTIONS.map((option, i) => (
              <button
                key={option.id}
                onClick={() => setActiveIndex(i)}
                className="flex-1 max-w-[120px] px-3 py-3 rounded-lg font-mono transition-all flex flex-col items-center"
                style={{
                  backgroundColor: i === activeIndex ? `${option.color}20` : `${option.color}08`,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: i === activeIndex ? option.color : `${option.color}40`,
                  color: i === activeIndex ? option.color : `${option.color}80`
                }}
              >
                <div className="text-xs font-bold leading-tight">{option.title}</div>
              </button>
            ))}
          </div>

          {/* Active card */}
          <div className="space-y-4">
            {CAMPAIGN_OPTIONS.map((option, i) => {
              if (i !== activeIndex) return null;

              const Icon = option.icon;

              return (
                <div
                  key={option.id}
                  className="border-2 rounded-lg p-6 space-y-4 bg-black/40"
                  style={{
                    borderColor: option.color,
                    backgroundColor: `${option.color}08`
                  }}
                >
                  {/* Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${option.color}20`,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: option.color
                      }}
                    >
                      <Icon size={24} style={{ color: option.color }} />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-lg font-bold font-mono leading-tight"
                        style={{ color: option.color }}
                      >
                        {option.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-1 font-mono">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {option.benefits.map((benefit, bi) => (
                      <div key={bi} className="flex items-start gap-2">
                        <div
                          className="text-xs font-bold mt-0.5"
                          style={{ color: option.color }}
                        >
                          ✓
                        </div>
                        <div className="text-sm text-white/80 leading-snug">
                          {benefit}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setSelectedCampaign(option.id)}
                    className="w-full py-3 rounded-lg font-mono text-sm font-bold transition-all"
                    style={{
                      backgroundColor: option.color,
                      color: '#000000'
                    }}
                  >
                    START WORKFLOW →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Navigation hints */}
          <div className="flex items-center justify-between px-4 text-xs font-mono text-white/40">
            <div className="flex items-center gap-2">
              {activeIndex > 0 && (
                <>
                  <button onClick={() => setActiveIndex(activeIndex - 1)}>←</button>
                  <span>{CAMPAIGN_OPTIONS[activeIndex - 1].title}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeIndex < CAMPAIGN_OPTIONS.length - 1 && (
                <>
                  <span>{CAMPAIGN_OPTIONS[activeIndex + 1].title}</span>
                  <button onClick={() => setActiveIndex(activeIndex + 1)}>→</button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        // Desktop: Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {CAMPAIGN_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                onClick={() => setSelectedCampaign(option.id)}
                className="group relative bg-black border-2 rounded-none p-6 text-left transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] flex flex-col"
                style={{
                  borderColor: `${option.color}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = option.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${option.color}40`;
                }}
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10 w-full">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${option.color}20`
                    }}
                  >
                    <Icon size={20} style={{ color: option.color }} />
                  </div>
                  <h4
                    className="text-lg font-bold font-mono flex-1"
                    style={{ color: option.color }}
                  >
                    {option.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-4 font-mono w-full">
                  {option.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2 mb-4 flex-1 w-full">
                  {option.benefits.map((benefit, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-terminal-gold mt-0.5 flex-shrink-0">→</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity w-full">
                  <span
                    className="text-sm font-bold font-mono"
                    style={{ color: option.color }}
                  >
                    Explore →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
    </DigitalTwinProvider>
  );
}
