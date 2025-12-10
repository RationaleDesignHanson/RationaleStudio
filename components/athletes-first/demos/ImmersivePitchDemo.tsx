/**
 * Immersive Interactive Pitch Demo
 *
 * Full-featured demo showcasing:
 * 1. Contract Modeling (already separate)
 * 2. NIL Calculator - Real-time projections
 * 3. Career Pathways - Scenario exploration
 * 4. Risk Analysis - Red flag detection
 * 5. Generated Recruiting Videos
 */

'use client';

import { useState } from 'react';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

type DemoView = 'nil-calculator' | 'career-pathways' | 'risk-analysis' | 'recruiting-videos';

const RECRUITING_VIDEOS = [
  {
    id: '1',
    title: 'Brand Empire Vision',
    description: 'Build your legacy beyond the field',
    thumbnail: '/api/placeholder/320/180',
    url: '/videos/replicate-prediction-08ehfdtfchrmc0csrhqb4c7sj0.mp4'
  },
  {
    id: '2',
    title: 'Hometown Hero',
    description: 'Giving back to your community',
    thumbnail: '/api/placeholder/320/180',
    url: '/videos/replicate-prediction-231c58d951rma0csrj6tx51jgc.mp4'
  },
  {
    id: '3',
    title: 'First Home Purchase',
    description: 'The dream becomes reality',
    thumbnail: '/api/placeholder/320/180',
    url: '/videos/replicate-prediction-2rqz3bvb0nrma0csrjerf27ps4.mp4'
  },
  {
    id: '4',
    title: 'Family First',
    description: 'Providing for those who believed',
    thumbnail: '/api/placeholder/320/180',
    url: '/videos/replicate-prediction-81acbp3175rma0csrhnrcg2ydm.mp4'
  },
  {
    id: '5',
    title: 'Off-Season Lifestyle',
    description: 'Live the life you\'ve earned',
    thumbnail: '/api/placeholder/320/180',
    url: '/videos/replicate-prediction-frdfd9gv29rmc0csrja9wxyqs0.mp4'
  }
];

export default function ImmersivePitchDemo() {
  const [activeView, setActiveView] = useState<DemoView>('nil-calculator');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // NIL Calculator State
  const [followers, setFollowers] = useState(250000);
  const [engagementRate, setEngagementRate] = useState(4.5);
  const [marketTier, setMarketTier] = useState<'small' | 'medium' | 'large'>('medium');

  // Career Pathways State
  const [selectedScenario, setSelectedScenario] = useState<'signing-bonus' | 'wait-year' | 'injury-protect'>('signing-bonus');

  const calculateNIL = () => {
    const tierMultiplier = { small: 0.8, medium: 1, large: 1.3 }[marketTier];
    const followerValue = (followers / 1000) * 0.8;
    const engagementBonus = engagementRate * 2000;

    return {
      endorsements: Math.round((followerValue * 0.6 + engagementBonus * 2) * tierMultiplier),
      socialMedia: Math.round((followerValue * 0.3 + engagementBonus) * tierMultiplier),
      appearances: Math.round((50000 + followers / 50) * tierMultiplier),
      content: Math.round((60000 + followers / 30) * tierMultiplier)
    };
  };

  const nilProjections = calculateNIL();
  const totalNIL = Object.values(nilProjections).reduce((a, b) => a + b, 0);

  const scenarios = {
    'signing-bonus': {
      title: 'Take the Bigger Signing Bonus',
      year1: '$15M guaranteed',
      year2: '$8M',
      year3: '$6M + $4M roster bonus',
      year4: '$5M + $8M performance',
      total: '$46M total',
      pros: ['Immediate financial security', 'Lower injury risk', 'Family protected now'],
      cons: ['Less total value', 'Performance escalators back-loaded']
    },
    'wait-year': {
      title: 'Wait One More Year',
      year1: 'College NIL: $500K',
      year2: '$20M guaranteed (rookie)',
      year3: '$10M',
      year4: '$8M + $5M roster bonus',
      total: '$43.5M total',
      pros: ['Develop skills', 'Higher draft position potential', 'More NIL experience'],
      cons: ['Injury risk in college', 'Delayed earnings', 'Market could change']
    },
    'injury-protect': {
      title: 'Prioritize Injury Protection',
      year1: '$12M fully guaranteed',
      year2: '$10M injury guaranteed',
      year3: '$8M injury guaranteed',
      year4: '$6M + conditional bonuses',
      total: '$36M total (high security)',
      pros: ['Maximum protection', 'Family security if injured', 'Peace of mind'],
      cons: ['Lower total value', 'Opportunity cost if healthy']
    }
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {[
          { key: 'nil-calculator' as DemoView, label: 'NIL Calculator', icon: '$' },
          { key: 'career-pathways' as DemoView, label: 'Career Pathways', icon: '🗺️' },
          { key: 'risk-analysis' as DemoView, label: 'Risk Analysis', icon: '⚠️' },
          { key: 'recruiting-videos' as DemoView, label: 'Recruiting Videos', icon: '🎬' }
        ].map((view) => (
          <button
            key={view.key}
            onClick={() => setActiveView(view.key)}
            className={`px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all ${
              activeView === view.key
                ? 'bg-terminal-gold text-black'
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
            }`}
          >
            <span className="mr-2">{view.icon}</span>
            {view.label}
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className="min-h-[600px] bg-black rounded-lg border-2 border-terminal-gold/30 p-8">
        {/* NIL Calculator View */}
        {activeView === 'nil-calculator' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-terminal-gold font-mono mb-2">NIL EARNING POTENTIAL</h2>
              <p className="text-white/60 font-mono">Adjust variables to see real-time projections</p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Followers */}
              <div className="space-y-3">
                <label className="block text-sm font-mono font-bold text-white/80">
                  SOCIAL FOLLOWERS
                </label>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={followers}
                  onChange={(e) => setFollowers(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                />
                <div className="text-2xl font-bold text-[#00FF94] font-mono">
                  {(followers / 1000).toFixed(0)}K
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="space-y-3">
                <label className="block text-sm font-mono font-bold text-white/80">
                  ENGAGEMENT RATE
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.1"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
                />
                <div className="text-2xl font-bold text-[#00FF94] font-mono">
                  {engagementRate.toFixed(1)}%
                </div>
              </div>

              {/* Market Tier */}
              <div className="space-y-3">
                <label className="block text-sm font-mono font-bold text-white/80">
                  MARKET TIER
                </label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setMarketTier(tier)}
                      className={`flex-1 px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                        marketTier === tier
                          ? 'bg-terminal-gold text-black'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {tier.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="text-sm font-mono text-white/60 text-center">
                  {marketTier === 'small' && 'e.g., Memphis, Buffalo'}
                  {marketTier === 'medium' && 'e.g., Seattle, Phoenix'}
                  {marketTier === 'large' && 'e.g., LA, NYC, Chicago'}
                </div>
              </div>
            </div>

            {/* Projections */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Endorsements', value: nilProjections.endorsements, color: '#FF6B00' },
                { label: 'Social Media', value: nilProjections.socialMedia, color: '#9D4EDD' },
                { label: 'Appearances', value: nilProjections.appearances, color: '#00FF94' },
                { label: 'Content Deals', value: nilProjections.content, color: '#FF3366' }
              ].map((category) => (
                <div
                  key={category.label}
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: `${category.color}60`,
                    backgroundColor: `${category.color}10`
                  }}
                >
                  <div className="text-sm font-mono font-bold mb-2" style={{ color: category.color }}>
                    {category.label.toUpperCase()}
                  </div>
                  <div className="text-3xl font-bold font-mono" style={{ color: category.color }}>
                    ${(category.value / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs font-mono text-white/40 mt-1">per year</div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="text-center p-8 bg-terminal-gold/10 border-2 border-terminal-gold rounded-lg">
              <div className="text-sm font-mono font-bold text-terminal-gold mb-2">
                TOTAL PROJECTED NIL VALUE (ANNUAL)
              </div>
              <div className="text-6xl font-bold font-mono text-terminal-gold">
                ${(totalNIL / 1000).toFixed(0)}K
              </div>
              <div className="text-sm font-mono text-white/60 mt-4">
                Adjusts in real-time as you modify variables
              </div>
            </div>
          </div>
        )}

        {/* Career Pathways View */}
        {activeView === 'career-pathways' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-terminal-gold font-mono mb-2">CAREER PATHWAY EXPLORER</h2>
              <p className="text-white/60 font-mono">Compare different career decisions side-by-side</p>
            </div>

            {/* Scenario Selector */}
            <div className="flex justify-center gap-4 flex-wrap">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key as typeof selectedScenario)}
                  className={`px-6 py-4 rounded-lg font-mono font-bold transition-all ${
                    selectedScenario === key
                      ? 'bg-[#00FF94] text-black scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/30'
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            {/* Scenario Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono text-terminal-gold">YEAR-BY-YEAR BREAKDOWN</h3>
                {[
                  { label: 'Year 1', value: currentScenario.year1 },
                  { label: 'Year 2', value: currentScenario.year2 },
                  { label: 'Year 3', value: currentScenario.year3 },
                  { label: 'Year 4', value: currentScenario.year4 }
                ].map((year, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20"
                  >
                    <span className="font-mono font-bold text-white/80">{year.label}</span>
                    <span className="font-mono font-bold text-[#00FF94]">{year.value}</span>
                  </div>
                ))}
                <div className="p-6 bg-terminal-gold/10 border-2 border-terminal-gold rounded-lg">
                  <div className="text-sm font-mono text-white/60 mb-2">TOTAL VALUE</div>
                  <div className="text-4xl font-bold font-mono text-terminal-gold">
                    {currentScenario.total}
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-mono text-[#00FF94] mb-4">ADVANTAGES</h3>
                  <ul className="space-y-3">
                    {currentScenario.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-[#00FF94]/10 rounded-lg border border-[#00FF94]/30">
                        <span className="text-[#00FF94] font-bold">✓</span>
                        <span className="font-mono text-sm text-white/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-mono text-[#EF4444] mb-4">CONSIDERATIONS</h3>
                  <ul className="space-y-3">
                    {currentScenario.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-[#EF4444]/10 rounded-lg border border-[#EF4444]/30">
                        <span className="text-[#EF4444] font-bold">⚠</span>
                        <span className="font-mono text-sm text-white/80">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Analysis View */}
        {activeView === 'risk-analysis' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-terminal-gold font-mono mb-2">RISK ANALYSIS ENGINE</h2>
              <p className="text-white/60 font-mono">AI-powered contract red flag detection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* High Risk Items */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono text-[#EF4444] mb-4">⚠️ HIGH RISK FLAGS</h3>

                {[
                  {
                    flag: 'Offset Language Detected',
                    explanation: 'If cut, new contract salary offsets guaranteed money. Could lose millions.',
                    impact: 'High',
                    location: 'Section 4.2, Page 8'
                  },
                  {
                    flag: 'Performance Escalators (85%)',
                    explanation: '85% of total value tied to unrealistic performance metrics.',
                    impact: 'Critical',
                    location: 'Section 7.1, Page 12'
                  },
                  {
                    flag: 'Roster Status Clause',
                    explanation: 'Guarantees void if not on 53-man roster by Week 1. Unusual.',
                    impact: 'High',
                    location: 'Section 3.4, Page 6'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[#EF4444]/10 border-2 border-[#EF4444] rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-mono font-bold text-[#EF4444]">{item.flag}</h4>
                      <span className="px-2 py-1 bg-[#EF4444] text-white text-xs font-mono font-bold rounded">
                        {item.impact.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-white/80">{item.explanation}</p>
                    <p className="text-xs font-mono text-white/40">{item.location}</p>
                  </div>
                ))}
              </div>

              {/* Protected Items */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-mono text-[#00FF94] mb-4">✓ PROTECTED TERMS</h3>

                {[
                  {
                    protection: 'Fully Guaranteed Base',
                    explanation: '$45M guaranteed regardless of injury or performance.',
                    strength: 'Excellent'
                  },
                  {
                    protection: 'No Trade Clause (Year 1-2)',
                    explanation: 'Cannot be traded without consent for 2 years.',
                    strength: 'Strong'
                  },
                  {
                    protection: 'Injury Guarantee (Years 1-3)',
                    explanation: 'Full protection if injured in first 3 seasons.',
                    strength: 'Excellent'
                  },
                  {
                    protection: 'Skill/Injury Split',
                    explanation: 'Standard NFL skill/injury termination language.',
                    strength: 'Standard'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[#00FF94]/10 border-2 border-[#00FF94]/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-mono font-bold text-[#00FF94]">{item.protection}</h4>
                      <span className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                        item.strength === 'Excellent' ? 'bg-[#00FF94] text-black' :
                        item.strength === 'Strong' ? 'bg-terminal-gold text-black' :
                        'bg-white/20 text-white'
                      }`}>
                        {item.strength.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-white/80">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Risk Score */}
            <div className="p-8 bg-terminal-gold/10 border-2 border-terminal-gold rounded-lg text-center">
              <div className="text-sm font-mono text-white/60 mb-2">OVERALL RISK SCORE</div>
              <div className="text-6xl font-bold font-mono text-terminal-gold mb-4">7.2/10</div>
              <div className="text-sm font-mono text-white/80">
                MEDIUM RISK - 3 critical clauses require negotiation before signing
              </div>
            </div>
          </div>
        )}

        {/* Recruiting Videos View */}
        {activeView === 'recruiting-videos' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-terminal-gold font-mono mb-2">PERSONALIZED RECRUITING VIDEOS</h2>
              <p className="text-white/60 font-mono">AI-generated cinematic pitches at scale</p>
              <p className="text-white/40 font-mono text-sm mt-2">
                Note: Videos shown are test generations and not accurate to the described concepts
              </p>
            </div>

            {selectedVideo ? (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-all"
                >
                  ← Back to Gallery
                </button>
                <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-terminal-gold">
                  <video
                    src={selectedVideo}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RECRUITING_VIDEOS.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video.url)}
                    className="group relative overflow-hidden rounded-lg border-2 border-white/20 hover:border-terminal-gold transition-all hover:scale-105"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#FFD700]/20 to-[#FF6B00]/20 flex items-center justify-center">
                    </div>
                    <div className="p-4 bg-black/80 backdrop-blur">
                      <h3 className="font-mono font-bold text-white mb-1">{video.title}</h3>
                      <p className="font-mono text-sm text-white/60">{video.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-[#FFD700]/0 group-hover:bg-terminal-gold/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-4 py-2 bg-terminal-gold text-black font-mono font-bold rounded-lg">
                        PLAY VIDEO
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!selectedVideo && (
              <div className="p-6 bg-[#00FF94]/10 border-2 border-[#00FF94] rounded-lg">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h4 className="font-mono font-bold text-[#00FF94] mb-2">
                      AI-GENERATED IN 5 MINUTES
                    </h4>
                    <p className="font-mono text-sm text-white/80">
                      Each video personalized with athlete name, hometown, career goals, and lifestyle aspirations.
                      Generated from scenario templates - no video editing required.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
