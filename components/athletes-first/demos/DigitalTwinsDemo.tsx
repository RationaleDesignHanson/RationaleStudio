'use client';

import { useState } from 'react';
import { ChevronDown, Upload, Check, X } from 'lucide-react';

// Mock athlete data
const MOCK_ATHLETES = [
  { id: '1', name: 'Marcus Johnson', position: 'QB', school: 'Ohio State' },
  { id: '2', name: 'Sarah Chen', position: 'WR', school: 'USC' },
  { id: '3', name: 'David Martinez', position: 'RB', school: 'Texas' },
];

type DemoStep = 'select' | 'upload' | 'ids' | 'consent' | 'verify' | 'ledger';

interface ConsentScope {
  campaignType: string;
  territories: string[];
  startDate: string;
  endDate: string;
  transformations: string[];
}

export default function DigitalTwinsDemo() {
  const [step, setStep] = useState<DemoStep>('select');
  const [selectedAthlete, setSelectedAthlete] = useState<typeof MOCK_ATHLETES[0] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [expandedConsent, setExpandedConsent] = useState<string>('');
  const [consentScope, setConsentScope] = useState<ConsentScope>({
    campaignType: 'Regional Endorsement',
    territories: ['United States'],
    startDate: '2025-01',
    endDate: '2025-12',
    transformations: ['Voice Generation', 'Image Compositing']
  });
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<'approved' | 'denied' | null>(null);
  const [ledgerEntries, setLedgerEntries] = useState<Array<{ time: string; action: string }>>([]);

  const handleAthleteSelect = (athlete: typeof MOCK_ATHLETES[0]) => {
    setSelectedAthlete(athlete);
    setStep('upload');
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setStep('upload');

    setTimeout(() => {
      setIsUploading(false);
      setStep('ids');

      // Animate ID generation
      const ids = [
        `AF-${selectedAthlete?.name.split(' ')[0].substring(0, 2).toUpperCase()}-2025-L4K8`,
        `AF-${selectedAthlete?.name.split(' ')[0].substring(0, 2).toUpperCase()}-2025-V9X2`,
        `AF-${selectedAthlete?.name.split(' ')[0].substring(0, 2).toUpperCase()}-2025-DT3F`
      ];

      ids.forEach((id, index) => {
        setTimeout(() => {
          setGeneratedIds(prev => [...prev, id]);
          addLedgerEntry(index === 0 ? 'LikenessID Created' : index === 1 ? 'VoiceID Created' : 'DigitalTwinID Created');
        }, (index + 1) * 500);
      });

      setTimeout(() => {
        setStep('consent');
      }, 2000);
    }, 2000);
  };

  const addLedgerEntry = (action: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    setLedgerEntries(prev => [...prev, { time, action }]);
  };

  const handleVerify = () => {
    setStep('verify');
    setVerifying(true);
    addLedgerEntry('Nike Brand Request Received');

    setTimeout(() => {
      setVerifying(false);
      setVerifyResult('approved');
      addLedgerEntry('verify() Check: APPROVED');

      setTimeout(() => {
        setStep('ledger');
        addLedgerEntry('Asset Downloaded (🔐 Watermarked)');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          Protect Athletes With Rights Management
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          Blockchain-verified consent and usage tracking for AI-generated athlete likenesses
        </div>
      </div>

      {/* Step 1: Athlete Selection */}
      {step === 'select' && (
        <div className="space-y-2 animate-fade-in">
          <label className="block text-white/80 font-terminal text-sm mb-2">Select Athlete</label>
          <select
            onChange={(e) => {
              const athlete = MOCK_ATHLETES.find(a => a.id === e.target.value);
              if (athlete) handleAthleteSelect(athlete);
            }}
            defaultValue=""
            className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
          >
            <option value="" disabled>Choose an athlete...</option>
            {MOCK_ATHLETES.map(athlete => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name} - {athlete.position} • {athlete.school}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 2: Likeness Upload */}
      {step === 'upload' && (
        <div className="space-y-2 animate-fade-in">
          <div className="text-white/80 font-terminal text-sm mb-2">
            Selected: <span className="text-cyan-400">{selectedAthlete?.name}</span>
          </div>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-cyan-500/50 transition-all">
            {isUploading ? (
              <div className="space-y-4">
                <div className="text-cyan-400 font-terminal">Uploading likeness data...</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-white/40 mx-auto" />
                <div className="text-white/60">Drag files here or click to upload</div>
                <button
                  onClick={simulateUpload}
                  className="mt-4 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all"
                >
                  Simulate Studio Capture
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: ID Generation */}
      {step === 'ids' && (
        <div className="space-y-2 animate-fade-in">
          <div className="text-white/80 font-terminal text-sm mb-4">Generated IDs:</div>
          <div className="space-y-2">
            {['Likeness', 'Voice', 'DigitalTwin'].map((type, index) => (
              <div
                key={type}
                className={`p-4 bg-white/5 border border-white/10 rounded-lg transition-all duration-500 ${
                  generatedIds[index] ? 'border-cyan-500/50 bg-cyan-500/5' : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {generatedIds[index] ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                  )}
                  <div>
                    <div className="text-white/60 text-xs font-terminal">{type}ID</div>
                    <div className="text-cyan-400 font-terminal text-sm">
                      {generatedIds[index] || 'Generating...'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Consent Scope Builder */}
      {step === 'consent' && (
        <div className="space-y-2 animate-fade-in">
          <div className="text-white/80 font-terminal text-xs md:text-sm mb-3">Configure Consent Scope:</div>

          {/* Campaign Type - Mobile Compact */}
          <div>
            <button
              onClick={() => setExpandedConsent(expandedConsent === 'campaign' ? '' : 'campaign')}
              className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all flex items-center justify-between"
            >
              <div className="text-left">
                <div className="text-white/60 text-xs font-terminal mb-1">Campaign Type</div>
                <div className="text-white text-sm md:text-base">{consentScope.campaignType}</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/60 transition-transform ${expandedConsent === 'campaign' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedConsent === 'campaign' && (
              <div className="mt-2 p-3 bg-black/40 border border-white/10 rounded-lg space-y-2">
                {['Regional Endorsement', 'National Campaign', 'Social Media Only', 'Event Appearance'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setConsentScope({ ...consentScope, campaignType: type });
                      setExpandedConsent('');
                    }}
                    className={`w-full p-2.5 rounded-lg transition-all text-left text-sm ${
                      consentScope.campaignType === type
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-white/5 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Territory & Duration - Mobile Compact */}
          <div>
            <button
              onClick={() => setExpandedConsent(expandedConsent === 'territory' ? '' : 'territory')}
              className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all flex items-center justify-between"
            >
              <div className="text-left flex-1 min-w-0">
                <div className="text-white/60 text-xs font-terminal mb-1">Territory & Duration</div>
                <div className="text-white text-xs md:text-sm truncate">
                  {consentScope.territories[0]}{consentScope.territories.length > 1 && ` +${consentScope.territories.length - 1}`} • {consentScope.startDate} - {consentScope.endDate}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/60 transition-transform flex-shrink-0 ml-2 ${expandedConsent === 'territory' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedConsent === 'territory' && (
              <div className="mt-2 p-3 bg-black/40 border border-white/10 rounded-lg space-y-3">
                <div>
                  <label className="text-white/60 text-xs font-terminal mb-2 block">TERRITORIES</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['United States', 'Canada', 'Europe', 'Asia', 'Worldwide'].map(territory => (
                      <label key={territory} className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={consentScope.territories.includes(territory)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setConsentScope({
                                ...consentScope,
                                territories: [...consentScope.territories, territory]
                              });
                            } else {
                              setConsentScope({
                                ...consentScope,
                                territories: consentScope.territories.filter(t => t !== territory)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-white">{territory}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 text-xs font-terminal mb-1 block">START</label>
                    <input
                      type="month"
                      value={consentScope.startDate}
                      onChange={(e) => setConsentScope({ ...consentScope, startDate: e.target.value })}
                      className="w-full p-2 bg-black/60 border border-white/20 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-terminal mb-1 block">END</label>
                    <input
                      type="month"
                      value={consentScope.endDate}
                      onChange={(e) => setConsentScope({ ...consentScope, endDate: e.target.value })}
                      className="w-full p-2 bg-black/60 border border-white/20 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Allowed Transformations - Mobile Compact */}
          <div>
            <button
              onClick={() => setExpandedConsent(expandedConsent === 'transformations' ? '' : 'transformations')}
              className="w-full p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg hover:border-cyan-500/30 transition-all flex items-center justify-between"
            >
              <div className="text-left">
                <div className="text-white/60 text-xs font-terminal mb-1">Allowed Transformations</div>
                <div className="text-white text-sm md:text-base">{consentScope.transformations.length} selected</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/60 transition-transform ${expandedConsent === 'transformations' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedConsent === 'transformations' && (
              <div className="mt-2 p-3 bg-black/40 border border-white/10 rounded-lg space-y-2 max-h-64 overflow-y-auto">
                <label className="text-white/60 text-xs font-terminal mb-2 block">SELECT TRANSFORMATIONS</label>
                {[
                  { name: 'Voice Generation', desc: 'Generate speech' },
                  { name: 'Image Compositing', desc: 'New backgrounds' },
                  { name: 'Video Synthesis', desc: 'Video from stills' },
                  { name: 'Text-to-Speech', desc: 'Text to voice' },
                  { name: 'Deepfake Prevention', desc: 'Watermark & track' }
                ].map(({ name, desc }) => (
                  <label key={name} className="flex items-start gap-2 p-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      checked={consentScope.transformations.includes(name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConsentScope({
                            ...consentScope,
                            transformations: [...consentScope.transformations, name]
                          });
                        } else {
                          setConsentScope({
                            ...consentScope,
                            transformations: consentScope.transformations.filter(t => t !== name)
                          });
                        }
                      }}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 bg-black/40 text-cyan-500 focus:ring-cyan-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium">{name}</div>
                      <div className="text-white/60 text-xs">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            className="w-full mt-2.5 px-6 py-2 md:py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all text-center text-sm md:text-base"
          >
            Simulate Brand Request →
          </button>
        </div>
      )}

      {/* Step 5: Verify Check */}
      {step === 'verify' && (
        <div className="space-y-2 animate-fade-in">
          <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
            {verifying ? (
              <>
                <div className="text-white/60 mb-4">Nike requests asset...</div>
                <div className="text-cyan-400 font-terminal text-lg mb-2">⚡ verify() running...</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full animate-pulse" style={{ width: '80%' }} />
                </div>
              </>
            ) : verifyResult === 'approved' ? (
              <>
                <Check className="w-12 h-12 md:w-16 md:h-16 text-green-400 mx-auto mb-4" />
                <div className="text-green-400 font-terminal text-xl md:text-2xl font-bold">✅ APPROVED</div>
                <div className="text-white/60 mt-2 text-sm md:text-base">Rights verified • Asset authorized</div>
              </>
            ) : verifyResult === 'denied' ? (
              <>
                <X className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-4" />
                <div className="text-red-400 font-terminal text-xl md:text-2xl font-bold">❌ DENIED</div>
                <div className="text-white/60 mt-2 text-sm md:text-base">Unauthorized usage blocked</div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Step 6: Ledger Display */}
      {step === 'ledger' && (
        <div className="space-y-2 md:space-y-2 animate-fade-in">
          <div className="text-white/80 font-terminal text-xs md:text-sm mb-3">Blockchain Ledger:</div>
          <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4 md:p-6 max-h-60 md:max-h-80 overflow-y-auto">
            <div className="space-y-2 md:space-y-3">
              {ledgerEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4 pb-2 md:pb-3 border-b border-white/10 last:border-0"
                >
                  <div className="text-cyan-400 font-terminal text-xs whitespace-nowrap flex-shrink-0">
                    {entry.time}
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">{entry.action}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 md:p-4 bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 rounded">
            <div className="text-white font-bold mb-1 text-sm md:text-base">All Actions Logged</div>
            <div className="text-white/60 text-xs md:text-sm">
              Every use of {selectedAthlete?.name}'s likeness is tracked and protected.
            </div>
          </div>

          <button
            onClick={() => {
              // Reset all state
              setStep('select');
              setSelectedAthlete(null);
              setGeneratedIds([]);
              setExpandedConsent('');
              setConsentScope({
                campaignType: 'Regional Endorsement',
                territories: ['United States'],
                startDate: '2025-01',
                endDate: '2025-12',
                transformations: ['Voice Generation', 'Image Compositing']
              });
              setVerifying(false);
              setVerifyResult(null);
              setLedgerEntries([]);
            }}
            className="w-full px-6 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-terminal rounded-lg transition-all text-xs md:text-sm"
          >
            ← Start New Digital Twin
          </button>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {['select', 'upload', 'ids', 'consent', 'verify', 'ledger'].map((s, idx) => {
          const stepOrder = ['select', 'upload', 'ids', 'consent', 'verify', 'ledger'];
          const stepIndex = stepOrder.indexOf(step);
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
