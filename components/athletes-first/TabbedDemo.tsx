'use client';

import { useState } from 'react';
import { DemoTab } from '@/lib/athletes-first/content-v2';
import dynamic from 'next/dynamic';

// Demo component mapping - dynamically imported for code splitting
const DEMO_COMPONENTS: Record<string, React.ComponentType<any>> = {
  RecruitAIDemo: dynamic(() => import('./demos/RecruitAIDemo')),
  AgentToolkitDemo: dynamic(() => import('./demos/AgentToolkitDemo')),
  ImmersivePitchDemo: dynamic(() => import('./demos/ImmersivePitchDemo')),
  NILAnalyzerDemo: dynamic(() => import('./demos/NILAnalyzerDemo')),
  AmplifyAIDemo: dynamic(() => import('./demos/AmplifyAIDemo')),
  AISTSimulatorDemo: dynamic(() => import('./demos/AISTSimulatorDemo')),
  DigitalTwinsDemo: dynamic(() => import('./demos/DigitalTwinsDemo')),
  BrandCampaignDemo: dynamic(() => import('./demos/BrandCampaignDemo')),
  RosterCampaignDemo: dynamic(() => import('./demos/RosterCampaignDemo')),
  // Platform Demos
  PlatformWalkthroughDemo: dynamic(() => import('./demos/PlatformWalkthroughDemo')),
  AthleteDashboardDemo: dynamic(() => import('./demos/AthleteDashboardDemo')),
  SystemArchitectureDemo: dynamic(() => import('./demos/SystemArchitectureDemo')),
};

// NEW demos that should show badge (mark demos added in recent releases)
const NEW_DEMOS = ['PlatformWalkthroughDemo', 'AthleteDashboardDemo', 'SystemArchitectureDemo'];

interface TabbedDemoProps {
  demos: DemoTab[];
  headline: string;
}

export default function TabbedDemo({ demos, headline }: TabbedDemoProps) {
  const [activeTab, setActiveTab] = useState(0);

  // If only one demo, don't show tabs
  const showTabs = demos.length > 1;
  const activeDemo = demos[activeTab];
  const DemoComponent = DEMO_COMPONENTS[activeDemo.component];

  return (
    <div className="flex items-start justify-center px-6 md:px-12 pt-0 lg:pt-0 pb-12 md:pb-16">
      <div className="max-w-6xl w-full">
        {/* Single Demo Header - shown when only one demo */}
        {!showTabs && (
          <div className="mb-6 md:mb-8">
            <div className="flex justify-center">
              <div className="bg-cyan-500/10 border-2 border-cyan-500/50 px-6 py-4 rounded-lg">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-base md:text-lg font-bold font-terminal text-cyan-400">
                    {activeDemo.label}
                  </span>
                  <div className="text-sm font-terminal text-white/80">
                    {activeDemo.description}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent mt-4" />
          </div>
        )}

        {/* Tab Navigation - Only shown if multiple demos */}
        {showTabs && (
          <div className="mb-4 md:mb-6">
            {/* Desktop tabs */}
            <div className="hidden md:flex gap-3 justify-center">
              {demos.map((demo, index) => {
                const isNew = NEW_DEMOS.includes(demo.component);
                return (
                  <button
                    key={demo.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-4 py-4 rounded-lg transition-all duration-200 min-w-[140px] ${
                      activeTab === index
                        ? 'bg-cyan-500/10 border-2 border-cyan-500/50'
                        : 'bg-white/5 border-2 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* NEW Badge */}
                    {isNew && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                        NEW
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className={`text-sm font-bold font-terminal ${
                        activeTab === index ? 'text-cyan-400' : 'text-white/70'
                      }`}>
                        {demo.label}
                      </span>
                      <div className={`text-xs font-terminal ${
                        activeTab === index ? 'text-white/80' : 'text-white/50'
                      }`}>
                        {demo.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile tabs - horizontal scroll */}
            <div className="md:hidden overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 min-w-max pb-2">
                {demos.map((demo, index) => {
                  const isNew = NEW_DEMOS.includes(demo.component);
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setActiveTab(index)}
                      className={`relative flex-shrink-0 px-3 py-3 rounded-lg transition-all duration-200 min-w-[120px] ${
                        activeTab === index
                          ? 'bg-cyan-500/10 border-2 border-cyan-500/50'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                    >
                      {/* NEW Badge */}
                      {isNew && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                          NEW
                        </div>
                      )}
                      <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className={`text-sm font-bold font-terminal ${
                          activeTab === index ? 'text-cyan-400' : 'text-white/70'
                        }`}>
                          {demo.label}
                        </span>
                        <div className={`text-xs font-terminal ${
                          activeTab === index ? 'text-white/80' : 'text-white/50'
                        }`}>
                          {demo.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Demo Content Area */}
        <div className="bg-gradient-to-br from-blue-500/10 via-black/20 to-purple-500/5 border border-white/10 rounded-lg p-6 md:p-8">
          {DemoComponent ? (
            <DemoComponent />
          ) : (
            <div className="text-center py-12">
              <div className="text-cyan-400 font-terminal text-sm mb-2">
                INTERACTIVE DEMO: {activeDemo.component}
              </div>
              <div className="text-white/40 text-xs">
                (Demo component to be integrated)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
