'use client';

import { useState } from 'react';
import { AlertTriangle, Lightbulb, DollarSign, ChevronDown, Check } from 'lucide-react';

type AnalysisTab = 'red-flags' | 'recommendations' | 'market' | 'marketplace';

// Mock deal data
const INITIAL_DEAL = {
  brand: 'Local Auto Dealership',
  value: 45000,
  duration: 12,
  postsPerMonth: 8,
  ipRights: 'perpetual',
  injuryProtection: false,
  performanceBonus: false
};

const MARKET_COMPARABLES = [
  { name: 'J. Smith', school: 'Stanford WR', followers: '118K', dealValue: 42000 },
  { name: 'M. Lee', school: 'UCLA WR', followers: '132K', dealValue: 48000 },
  { name: 'A. Thomas', school: 'Cal RB', followers: '121K', dealValue: 40000 },
];

// Marketplace opportunities from verified brands
const MARKETPLACE_OPPORTUNITIES = [
  {
    id: 1,
    brand: 'Nike Training',
    value: 52000,
    duration: 12,
    matchScore: 95,
    category: 'Apparel',
    requirements: 'Video content, Social posts',
    verified: true,
    compliance: 'Pre-approved',
    postsPerMonth: 4,
    ipRights: 'Contract + 6 months'
  },
  {
    id: 2,
    brand: 'Gatorade',
    value: 48000,
    duration: 8,
    matchScore: 92,
    category: 'Nutrition',
    requirements: 'Regional campaign, Appearances',
    verified: true,
    compliance: 'Pre-approved',
    postsPerMonth: 5,
    ipRights: 'Contract duration only'
  },
  {
    id: 3,
    brand: 'State Farm Local',
    value: 38000,
    duration: 12,
    matchScore: 88,
    category: 'Insurance',
    requirements: 'Local market only, Social content',
    verified: true,
    compliance: 'Pre-approved',
    postsPerMonth: 4,
    ipRights: 'Contract + 3 months'
  },
  {
    id: 4,
    brand: 'EA Sports',
    value: 65000,
    duration: 24,
    matchScore: 85,
    category: 'Gaming',
    requirements: 'Voice capture, Likeness rights',
    verified: true,
    compliance: 'Review required',
    postsPerMonth: 3,
    ipRights: 'Contract + 12 months'
  }
];

export default function NILAnalyzerDemo() {
  const [step, setStep] = useState<'overview' | 'analysis' | 'negotiate' | 'export'>('overview');
  const [expandedSection, setExpandedSection] = useState<string>('');
  const [analysisTab, setAnalysisTab] = useState<AnalysisTab>('red-flags');

  // Counter offer state
  const [counterOffer, setCounterOffer] = useState({
    postsPerMonth: 5,
    ipRights: '6 months after contract',
    injuryProtection: true,
    value: 42000
  });

  const handleAnalyze = () => {
    setStep('analysis');
  };

  const handleNegotiate = () => {
    setStep('negotiate');
  };

  const calculateRisk = (posts: number, ipRights: string, injury: boolean) => {
    let risk = 0;
    if (posts > 6) risk += 3;
    if (ipRights === 'perpetual') risk += 3;
    if (!injury) risk += 2;
    return risk;
  };

  const currentRisk = calculateRisk(INITIAL_DEAL.postsPerMonth, INITIAL_DEAL.ipRights, INITIAL_DEAL.injuryProtection);
  const counterRisk = calculateRisk(counterOffer.postsPerMonth, counterOffer.ipRights, counterOffer.injuryProtection);

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          Protect Athletes From Bad Deals
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          AI-powered deal analysis, red flag detection, and counteroffer generation
        </div>
      </div>

      {/* Step 1: Deal Overview */}
      {step === 'overview' && (
        <div className="space-y-3 animate-fade-in">
          <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-lg p-3">
            <div className="text-xs text-white/60 font-terminal mb-2">NIL DEAL PROPOSAL</div>

            <div className="mb-4">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">{INITIAL_DEAL.brand}</div>
              <div className="flex items-center gap-4 text-white/80">
                <span className="text-2xl md:text-3xl font-bold text-cyan-400">${INITIAL_DEAL.value.toLocaleString()}</span>
                <span className="text-white/60">•</span>
                <span className="text-sm md:text-base">{INITIAL_DEAL.duration} months</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-xs text-white/60 mb-1">Social Posts</div>
                <div className="text-white font-bold">{INITIAL_DEAL.postsPerMonth}/month</div>
              </div>
              <div>
                <div className="text-xs text-white/60 mb-1">IP Rights</div>
                <div className="text-white font-bold capitalize">{INITIAL_DEAL.ipRights}</div>
              </div>
              <div>
                <div className="text-xs text-white/60 mb-1">Injury Protection</div>
                <div className={`font-bold ${INITIAL_DEAL.injuryProtection ? 'text-green-400' : 'text-red-400'}`}>
                  {INITIAL_DEAL.injuryProtection ? 'Yes' : 'No'}
                </div>
              </div>
              <div>
                <div className="text-xs text-white/60 mb-1">Performance Bonus</div>
                <div className={`font-bold ${INITIAL_DEAL.performanceBonus ? 'text-green-400' : 'text-red-400'}`}>
                  {INITIAL_DEAL.performanceBonus ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all text-center font-bold"
          >
            ⚡ Analyze This Deal
          </button>
        </div>
      )}

      {/* Step 2: Analysis & Red Flags */}
      {step === 'analysis' && (
        <div className="space-y-3 animate-fade-in">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'red-flags' as AnalysisTab, label: 'Red Flags', icon: AlertTriangle },
                { id: 'recommendations' as AnalysisTab, label: 'Recommendations', icon: Lightbulb },
                { id: 'market' as AnalysisTab, label: 'Market Data', icon: DollarSign },
                { id: 'marketplace' as AnalysisTab, label: 'Browse Deals', icon: DollarSign },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAnalysisTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                    analysisTab === tab.id ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Content Tabs */}
          <div className="lg:hidden">
            {/* Red Flags Tab */}
            {analysisTab === 'red-flags' && (
              <div className="bg-gradient-to-br from-red-500/10 to-red-900/10 border-2 border-red-500/50 rounded-lg p-2.5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="text-base font-bold text-red-400 font-terminal">RED FLAGS (3)</div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-black/40 border-l-4 border-red-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-xl">🚨</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">Perpetual IP Rights Transfer</div>
                        <div className="text-white/80 text-xs">
                          Your image can be used <span className="font-bold text-red-400">forever</span>, even after the contract ends.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 border-l-4 border-red-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-xl">🚨</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">8 Posts/Month Too High</div>
                        <div className="text-white/80 text-xs">
                          Similar athletes do <span className="font-bold text-green-400">4-5 posts</span> per month.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 border-l-4 border-red-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-xl">🚨</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">No Injury Protection</div>
                        <div className="text-white/80 text-xs">
                          If injured, <span className="font-bold text-red-400">payment stops immediately</span>.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations Tab */}
            {analysisTab === 'recommendations' && (
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/10 border-2 border-cyan-500/50 rounded-lg p-2.5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  <div className="text-base font-bold text-cyan-400 font-terminal">WHAT TO ASK FOR</div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-black/40 border-l-4 border-cyan-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-base">✏️</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">Limit IP rights to:</div>
                        <div className="text-white/80 text-xs">
                          Contract + <span className="font-bold text-cyan-400">6 months max</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 border-l-4 border-cyan-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-base">✏️</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">Reduce posts to:</div>
                        <div className="text-white/80 text-xs">
                          <span className="font-bold text-cyan-400">4-5/month</span> (industry standard)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 border-l-4 border-cyan-500 rounded">
                    <div className="flex items-start gap-2">
                      <div className="text-base">✏️</div>
                      <div>
                        <div className="font-bold text-white mb-1 text-sm">Add injury protection:</div>
                        <div className="text-white/80 text-xs">
                          Guarantee <span className="font-bold text-cyan-400">60% minimum</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Market Data Tab */}
            {analysisTab === 'market' && (
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <div className="text-base font-bold text-white font-terminal">MARKET DATA</div>
                </div>

                <div className="space-y-3">
                  {MARKET_COMPARABLES.map((comp, i) => (
                    <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold text-sm">{comp.name}</div>
                          <div className="text-white/60 text-xs">{comp.school} • {comp.followers}</div>
                        </div>
                        <div className="text-cyan-400 font-bold text-base">${comp.dealValue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="text-white font-bold mb-1 text-sm">Market Range: $XX-XXK</div>
                  <div className="text-white/80 text-xs">
                    Your Offer: <span className="font-bold text-cyan-400">${INITIAL_DEAL.value.toLocaleString()}</span> ✓ Fair
                  </div>
                </div>
              </div>
            )}

            {/* Marketplace Tab - Browse Verified Opportunities */}
            {analysisTab === 'marketplace' && (
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <div className="text-base font-bold text-white font-terminal">VERIFIED OPPORTUNITIES</div>
                </div>

                <div className="space-y-3">
                  {MARKETPLACE_OPPORTUNITIES.map((opp) => (
                    <div key={opp.id} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-white font-bold text-sm">{opp.brand}</div>
                            {opp.verified && <span className="text-xs text-green-400">✓ Verified</span>}
                          </div>
                          <div className="text-white/60 text-xs">{opp.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold text-base">${opp.value.toLocaleString()}</div>
                          <div className="text-white/60 text-xs">{opp.duration} mo</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-white/10 rounded-full h-1.5">
                          <div
                            className="bg-cyan-400 h-1.5 rounded-full"
                            style={{ width: `${opp.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-cyan-400 font-bold">{opp.matchScore}% Match</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/60">Posts: </span>
                          <span className="text-white">{opp.postsPerMonth}/mo</span>
                        </div>
                        <div>
                          <span className="text-white/60">IP: </span>
                          <span className="text-white">{opp.ipRights}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            opp.compliance === 'Pre-approved'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {opp.compliance}
                          </span>
                          <button className="text-xs text-cyan-400 hover:text-cyan-300">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="text-white font-bold mb-1 text-sm">4 Verified Opportunities</div>
                  <div className="text-white/80 text-xs">
                    All deals pre-screened for compliance. Zero eligibility violations.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout - Keep Original */}
          <div className="hidden lg:block space-y-3">
            {/* Red Flags */}
            <div className="bg-gradient-to-br from-red-500/10 to-red-900/10 border-2 border-red-500/50 rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                <div className="text-lg md:text-xl font-bold text-red-400 font-terminal leading-tight">RED FLAGS DETECTED</div>
              </div>

              <div className="space-y-2">
                <div className="p-4 bg-black/40 border-l-4 border-red-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🚨</div>
                    <div>
                      <div className="font-bold text-white mb-1">Perpetual IP Rights Transfer</div>
                      <div className="text-white/80 text-sm">
                        Your image can be used <span className="font-bold text-red-400">forever</span>, even after the contract ends.
                        This could hurt future brand deals or allow misuse of your likeness.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-l-4 border-red-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🚨</div>
                    <div>
                      <div className="font-bold text-white mb-1">8 Posts/Month Too High</div>
                      <div className="text-white/80 text-sm">
                        Similar athletes do <span className="font-bold text-green-400">4-5 posts</span> per month.
                        This volume could dilute your personal brand and feel inauthentic to followers.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-l-4 border-red-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🚨</div>
                    <div>
                      <div className="font-bold text-white mb-1">No Injury Protection</div>
                      <div className="text-white/80 text-sm">
                        If you get injured, <span className="font-bold text-red-400">payment stops immediately</span>.
                        You should negotiate for at least 60% guaranteed minimum.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-900/10 border-2 border-cyan-500/50 rounded-lg p-3">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                <div className="text-lg md:text-xl font-bold text-cyan-400 font-terminal leading-tight">WHAT SHOULD I ASK FOR?</div>
              </div>

              <div className="space-y-2">
                <div className="p-4 bg-black/40 border-l-4 border-cyan-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">✏️</div>
                    <div>
                      <div className="font-bold text-white mb-1">Limit IP rights to:</div>
                      <div className="text-white/80 text-sm">
                        Contract period + <span className="font-bold text-cyan-400">6 months maximum</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-l-4 border-cyan-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">✏️</div>
                    <div>
                      <div className="font-bold text-white mb-1">Reduce posts to:</div>
                      <div className="text-white/80 text-sm">
                        <span className="font-bold text-cyan-400">4-5 per month</span> (industry standard)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-l-4 border-cyan-500 rounded">
                  <div className="flex items-start gap-3">
                    <div className="text-xl">✏️</div>
                    <div>
                      <div className="font-bold text-white mb-1">Add injury protection:</div>
                      <div className="text-white/80 text-sm">
                        Guarantee <span className="font-bold text-cyan-400">60% minimum payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Context */}
            <div>
              <button
                onClick={() => setExpandedSection(expandedSection === 'market' ? '' : 'market')}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-white font-bold">How Does This Compare?</div>
                    <div className="text-white/60 text-sm">Market comparables</div>
                  </div>
                </div>
                <ChevronDown
                  className={`text-white/60 transition-transform ${expandedSection === 'market' ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSection === 'market' && (
                <div className="mt-2 p-6 bg-black/40 border border-white/10 rounded-lg animate-fade-in">
                  <div className="space-y-3">
                    {MARKET_COMPARABLES.map((comp, i) => (
                      <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-bold text-sm md:text-base">{comp.name}</div>
                            <div className="text-white/60 text-xs md:text-sm">{comp.school} • {comp.followers}</div>
                          </div>
                          <div className="text-cyan-400 font-bold text-base md:text-lg">${comp.dealValue.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="text-white font-bold mb-1">Market Range: $XX-XXK</div>
                    <div className="text-white/80 text-sm">
                      Your Offer: <span className="font-bold text-cyan-400">${INITIAL_DEAL.value.toLocaleString()}</span> ✓ Fair Value
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Marketplace - Browse Other Opportunities */}
            <div>
              <button
                onClick={() => setExpandedSection(expandedSection === 'marketplace' ? '' : 'marketplace')}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <div className="text-left">
                    <div className="text-white font-bold">Browse Verified Opportunities</div>
                    <div className="text-white/60 text-sm">AI-matched deals from trusted brands</div>
                  </div>
                </div>
                <ChevronDown
                  className={`text-white/60 transition-transform ${expandedSection === 'marketplace' ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSection === 'marketplace' && (
                <div className="mt-2 p-6 bg-black/40 border border-white/10 rounded-lg animate-fade-in">
                  <div className="space-y-4">
                    {MARKETPLACE_OPPORTUNITIES.map((opp) => (
                      <div key={opp.id} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-white font-bold text-base">{opp.brand}</div>
                              {opp.verified && <span className="text-xs text-green-400">✓ Verified</span>}
                            </div>
                            <div className="text-white/60 text-sm">{opp.category} • {opp.requirements}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold text-lg">${opp.value.toLocaleString()}</div>
                            <div className="text-white/60 text-sm">{opp.duration} months</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-white/60 mb-1">
                              <span>Match Score</span>
                              <span className="text-cyan-400 font-bold">{opp.matchScore}%</span>
                            </div>
                            <div className="bg-white/10 rounded-full h-2">
                              <div
                                className="bg-cyan-400 h-2 rounded-full transition-all"
                                style={{ width: `${opp.matchScore}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-3">
                          <div>
                            <span className="text-white/60 text-xs">Posts/Month: </span>
                            <span className="text-white font-medium">{opp.postsPerMonth}</span>
                          </div>
                          <div>
                            <span className="text-white/60 text-xs">IP Rights: </span>
                            <span className="text-white font-medium text-xs">{opp.ipRights}</span>
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              opp.compliance === 'Pre-approved'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {opp.compliance}
                            </span>
                          </div>
                        </div>

                        <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium transition-all">
                          View Full Details →
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="text-white font-bold mb-1">4 Verified Opportunities Available</div>
                    <div className="text-white/80 text-sm">
                      All deals pre-screened for compliance. Zero eligibility violations. AI-matched to your profile.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleNegotiate}
            className="w-full px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all text-center font-bold"
          >
            Build Your Counteroffer →
          </button>
        </div>
      )}

      {/* Step 3: Negotiate - Interactive Counteroffer Builder */}
      {step === 'negotiate' && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-white/80 font-terminal text-sm mb-4">Build Your Counteroffer:</div>

          {/* Posts Per Month Slider */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-sm md:text-base">Posts Per Month</label>
              <span className="text-cyan-400 font-bold text-lg md:text-xl">{counterOffer.postsPerMonth}</span>
            </div>
            <input
              type="range"
              min="4"
              max="8"
              value={counterOffer.postsPerMonth}
              onChange={(e) => setCounterOffer({ ...counterOffer, postsPerMonth: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((counterOffer.postsPerMonth - 4) / 4) * 100}%, rgba(255,255,255,0.2) ${((counterOffer.postsPerMonth - 4) / 4) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>4 posts</span>
              <span>8 posts</span>
            </div>
          </div>

          {/* IP Rights Duration Dropdown */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <label className="text-white text-sm md:text-base mb-3 block">IP Rights Duration</label>
            <select
              value={counterOffer.ipRights}
              onChange={(e) => setCounterOffer({ ...counterOffer, ipRights: e.target.value })}
              className="w-full p-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="contract duration only">Contract Duration Only</option>
              <option value="3 months after contract">Contract + 3 Months</option>
              <option value="6 months after contract">Contract + 6 Months</option>
              <option value="1 year after contract">Contract + 1 Year</option>
              <option value="perpetual">Perpetual (Not Recommended)</option>
            </select>
          </div>

          {/* Injury Protection Toggle */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm md:text-base mb-1">Injury Protection</div>
                <div className="text-white/60 text-xs">Guarantee 60% minimum payment</div>
              </div>
              <button
                onClick={() => setCounterOffer({ ...counterOffer, injuryProtection: !counterOffer.injuryProtection })}
                className={`relative w-14 h-7 rounded-full transition-all ${
                  counterOffer.injuryProtection ? 'bg-green-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    counterOffer.injuryProtection ? 'translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Value Adjustment */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-sm md:text-base">Deal Value</label>
              <span className="text-cyan-400 font-bold text-lg md:text-xl">${counterOffer.value.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="35000"
              max="50000"
              step="1000"
              value={counterOffer.value}
              onChange={(e) => setCounterOffer({ ...counterOffer, value: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((counterOffer.value - 35000) / 15000) * 100}%, rgba(255,255,255,0.2) ${((counterOffer.value - 35000) / 15000) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>$XXK</span>
              <span>$XXK</span>
            </div>
          </div>

          {/* Risk Score Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg">
              <div className="text-red-400 font-terminal text-xs mb-2">ORIGINAL RISK</div>
              <div className="text-3xl md:text-4xl font-bold text-red-400">{currentRisk}/10</div>
            </div>
            <div className="p-4 bg-green-500/10 border-2 border-green-500/50 rounded-lg">
              <div className="text-green-400 font-terminal text-xs mb-2">COUNTER RISK</div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">{counterRisk}/10</div>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="p-4 bg-black/40 border border-white/10 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 pb-2 font-terminal text-xs">TERM</th>
                  <th className="text-left text-white/60 pb-2 font-terminal text-xs">ORIGINAL</th>
                  <th className="text-left text-white/60 pb-2 font-terminal text-xs">COUNTER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-1.5 text-white/80">Value</td>
                  <td className="py-1.5 text-white">${INITIAL_DEAL.value.toLocaleString()}</td>
                  <td className="py-1.5 text-cyan-400 font-bold">${counterOffer.value.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-white/80">Posts/Month</td>
                  <td className="py-1.5 text-white">{INITIAL_DEAL.postsPerMonth}</td>
                  <td className="py-1.5 text-cyan-400 font-bold">{counterOffer.postsPerMonth}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-white/80">IP Rights</td>
                  <td className="py-1.5 text-white">{INITIAL_DEAL.ipRights}</td>
                  <td className="py-1.5 text-cyan-400 font-bold">{counterOffer.ipRights}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-white/80">Injury Protection</td>
                  <td className="py-1.5 text-red-400">{INITIAL_DEAL.injuryProtection ? 'Yes' : 'No'}</td>
                  <td className="py-1.5 text-green-400 font-bold">{counterOffer.injuryProtection ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setStep('analysis')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-terminal rounded-lg transition-all"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep('export')}
              className="flex-1 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all text-center font-bold"
            >
              Generate Counter Document →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Export/Send */}
      {step === 'export' && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-2 border-cyan-500/50 rounded-lg text-center">
            <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">Counteroffer Ready!</div>
            <div className="text-white/80 mb-6">Your professional counteroffer has been generated</div>

            {/* Summary */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-lg text-left mb-6">
              <div className="text-cyan-400 font-terminal text-xs mb-3">COUNTEROFFER SUMMARY</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Deal Value:</span>
                  <span className="text-white font-bold">${counterOffer.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Posts/Month:</span>
                  <span className="text-white font-bold">{counterOffer.postsPerMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">IP Rights:</span>
                  <span className="text-white font-bold">{counterOffer.ipRights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Injury Protection:</span>
                  <span className="text-green-400 font-bold">{counterOffer.injuryProtection ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-white/60">Risk Score:</span>
                  <span className="text-green-400 font-bold">{counterRisk}/10</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-terminal rounded-lg transition-all">
                📄 Download PDF
              </button>
              <button className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all">
                ✉️ Send to Brand
              </button>
            </div>

            <button
              onClick={() => {
                setStep('overview');
                setCounterOffer({
                  postsPerMonth: 5,
                  ipRights: '6 months after contract',
                  injuryProtection: true,
                  value: 42000
                });
              }}
              className="mt-4 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-terminal rounded-lg transition-all text-sm"
            >
              ← Start New Analysis
            </button>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {['overview', 'analysis', 'negotiate', 'export'].map((s, idx) => {
          const stepIndex = ['overview', 'analysis', 'negotiate', 'export'].indexOf(step);
          const currentIndex = idx;
          const isCompleted = currentIndex < stepIndex;
          const isCurrent = s === step;

          return (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isCurrent ? 'bg-cyan-400 scale-150' : isCompleted ? 'bg-cyan-400/50' : 'bg-white/20'
              }`}
              style={{
                boxShadow: isCurrent ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
