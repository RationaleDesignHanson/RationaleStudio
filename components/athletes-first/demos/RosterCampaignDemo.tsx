'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Wand2, CheckCircle2, Send, Play } from 'lucide-react';

// Mock roster data
const ROSTER_ATHLETES = [
  { id: 1, name: 'Jordan Matthews', position: 'QB', team: 'Ohio State', imgColor: 'bg-red-500', videoUrl: '/videos/athletes-first/generated/roster/jordan-matthews-qb.mp4' },
  { id: 2, name: 'Marcus Johnson', position: 'WR', team: 'Alabama', imgColor: 'bg-crimson-600', videoUrl: '/videos/athletes-first/generated/roster/marcus-johnson-wr.mp4' },
  { id: 3, name: 'Isabella Rodriguez', position: 'RB', team: 'USC', imgColor: 'bg-yellow-500', videoUrl: '/videos/athletes-first/generated/roster/isabella-rodriguez-rb.mp4' },
  { id: 4, name: 'DeAndre Jackson', position: 'OL', team: 'Georgia', imgColor: 'bg-red-600', videoUrl: '/videos/athletes-first/generated/roster/deandre-jackson-ol.mp4' },
  { id: 5, name: 'Tyler Chen', position: 'DB', team: 'Michigan', imgColor: 'bg-blue-600' },
  { id: 6, name: 'Sarah Williams', position: 'WR', team: 'LSU', imgColor: 'bg-purple-600' },
  { id: 7, name: 'Andre Thompson', position: 'QB', team: 'Texas', imgColor: 'bg-orange-500' },
  { id: 8, name: 'Kai Rodriguez', position: 'RB', team: 'Oregon', imgColor: 'bg-green-600' },
];

type Step = 1 | 2 | 3 | 4;

export default function RosterCampaignDemo() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [brandName, setBrandName] = useState('Nike');
  const [viralMoment, setViralMoment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAthletes, setSelectedAthletes] = useState<number[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentStep(2);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(3);
      // Select all athletes by default after generation
      setSelectedAthletes(ROSTER_ATHLETES.map(a => a.id));
    }, 2500);
  };

  const toggleAthlete = (id: number) => {
    setSelectedAthletes(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const handleDeploy = () => {
    setCurrentStep(4);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          Roster-Wide Brand Activations
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          Capitalize on trending moments by activating your entire roster within 48 hours
        </div>
      </div>

      {/* Step 1: Upload Brief */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="bg-black/30 border border-white/20 rounded-lg p-4">
            <div className="text-sm font-semibold text-white mb-3">Brand Campaign Brief</div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/60 block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g., Nike, Gatorade, State Farm"
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Viral Moment / Hook</label>
                <select
                  value={viralMoment}
                  onChange={(e) => setViralMoment(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="">Select moment type...</option>
                  <option value="game-winner">Game-Winning Performance</option>
                  <option value="milestone">Career Milestone Achievement</option>
                  <option value="trending">Trending Cultural Moment</option>
                  <option value="seasonal">Seasonal Campaign Launch</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-1">Brand Guidelines (Optional)</label>
                <div className="bg-black/50 border border-white/20 border-dashed rounded p-4 text-center">
                  <Upload className="w-6 h-6 text-white/40 mx-auto mb-1" />
                  <div className="text-xs text-white/40">Upload brand guidelines PDF</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!brandName || !viralMoment}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-blue-400 transition-all"
            >
              <Wand2 className="w-4 h-4" />
              Generate for All {ROSTER_ATHLETES.length} Athletes
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Generating */}
      {currentStep === 2 && (
        <div className="bg-black/30 border border-white/20 rounded-lg p-8">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="text-white font-semibold mb-2">Generating Content...</div>
            <div className="text-sm text-white/60">
              Creating personalized video content for {ROSTER_ATHLETES.length} athletes
            </div>
            <div className="mt-4 space-y-2 text-xs text-white/40">
              <div>✓ Analyzing brand guidelines</div>
              <div>✓ Generating athlete-specific hooks</div>
              <div className="text-cyan-400">⟳ Rendering video content...</div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review & Approve */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-white">Generated Content</div>
                <div className="text-xs text-white/60">{selectedAthletes.length} of {ROSTER_ATHLETES.length} selected</div>
              </div>
              <button
                onClick={() => setSelectedAthletes(
                  selectedAthletes.length === ROSTER_ATHLETES.length
                    ? []
                    : ROSTER_ATHLETES.map(a => a.id)
                )}
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                {selectedAthletes.length === ROSTER_ATHLETES.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ROSTER_ATHLETES.map((athlete) => {
                const isSelected = selectedAthletes.includes(athlete.id);
                return (
                  <div
                    key={athlete.id}
                    onClick={() => toggleAthlete(athlete.id)}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {athlete.videoUrl ? (
                      <div className="aspect-video rounded-t-lg relative bg-black overflow-hidden">
                        <video
                          className="w-full h-full object-cover"
                          src={athlete.videoUrl}
                          poster={`${athlete.videoUrl}#t=0.1`}
                          preload="metadata"
                          playsInline
                          muted
                          loop
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-8 h-8 text-white/80" />
                        </div>
                      </div>
                    ) : (
                      <div className={`${athlete.imgColor} aspect-video rounded-t-lg relative`}>
                        <Play className="absolute inset-0 m-auto w-8 h-8 text-white/80" />
                      </div>
                    )}
                    <div className="p-2">
                      <div className="text-xs font-semibold text-white truncate">{athlete.name}</div>
                      <div className="text-xs text-white/50">{athlete.position} · {athlete.team}</div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-cyan-500 rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Brand Activation Video */}
          <div className="bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="text-xs text-white/60 mb-2">BRAND ACTIVATION PREVIEW</div>
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                className="w-full aspect-video object-cover"
                src="/videos/athletes-first/generated/featured/hero-deliverable.mp4"
                poster="/videos/athletes-first/generated/featured/hero-deliverable.mp4#t=0.1"
                controls
                preload="metadata"
                playsInline
              />
            </div>
            <div className="text-xs text-white/50 mt-2">Example of roster-wide campaign output</div>
          </div>

          <button
            onClick={handleDeploy}
            disabled={selectedAthletes.length === 0}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-green-400 hover:to-emerald-400 transition-all"
          >
            <Send className="w-4 h-4" />
            Deploy to {selectedAthletes.length} Athlete{selectedAthletes.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}

      {/* Step 4: Deployed */}
      {currentStep === 4 && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-white font-semibold text-lg mb-2">Campaign Deployed!</div>
            <div className="text-sm text-white/80 mb-4">
              Content posted to {selectedAthletes.length} athlete accounts
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-white">{selectedAthletes.length}</div>
                <div className="text-xs text-white/60">Posts Live</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">2.4M</div>
                <div className="text-xs text-white/60">Total Reach</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">12K</div>
                <div className="text-xs text-white/60">Engagements</div>
              </div>
            </div>
            <button
              onClick={() => {
                setCurrentStep(1);
                setBrandName('');
                setViralMoment('');
                setSelectedAthletes([]);
              }}
              className="mt-6 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Create New Campaign
            </button>
          </div>
        </div>
      )}

      {/* Step Navigation */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <button
          onClick={() => currentStep > 1 && !isGenerating && setCurrentStep((currentStep - 1) as Step)}
          disabled={currentStep === 1 || isGenerating}
          className="flex items-center gap-1 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <div>Step {currentStep} of 4</div>
        <button
          onClick={() => currentStep < 4 && !isGenerating && setCurrentStep((currentStep + 1) as Step)}
          disabled={currentStep === 4 || isGenerating}
          className="flex items-center gap-1 disabled:opacity-30"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
