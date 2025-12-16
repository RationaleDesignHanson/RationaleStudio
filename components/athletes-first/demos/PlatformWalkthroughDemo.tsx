'use client';

import React, { useState } from 'react';
import {
  CheckCircle2, ChevronLeft, ChevronRight,
  User, FileText, Sparkles, ShieldCheck,
  Smartphone, Share2, BarChart3, LogIn,
  Video, Image as ImageIcon, Grid3x3, Play,
  AlertCircle, Clock, TrendingUp, Heart,
  MessageCircle, Eye
} from 'lucide-react';
import { useOrientation } from '@/hooks/useOrientation';
import RotateDeviceOverlay from '../RotateDeviceOverlay';
import { PlatformWalkthroughOnboarding } from '../DemoOnboarding';

// ==================== TYPES ====================

interface WalkthroughStage {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Agent {
  id: string;
  name: string;
  email: string;
}

interface Athlete {
  id: string;
  name: string;
  position: string;
  school: string;
  avatarColor: string;
}

interface ContentBrief {
  prompt: string;
  contentType: 'video' | 'image' | 'carousel' | 'story';
  brand: string;
  duration?: number;
  targetAudience?: string;
}

interface GeneratedContent {
  id: string;
  thumbnailUrl: string;
  duration: string;
  fileSize: string;
  style: string;
  selected: boolean;
}

interface ComplianceCheck {
  label: string;
  status: 'approved' | 'flagged' | 'pending';
  details?: string;
}

interface ComplianceResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  redFlags: string[];
  checks: ComplianceCheck[];
}

interface PublishDestination {
  platform: string;
  enabled: boolean;
  status: 'pending' | 'publishing' | 'published' | 'failed';
  reachPotential?: number;
}

interface AnalyticsData {
  views: number;
  viewsTrend: number;
  engagement: number;
  revenueAttributed: number;
  platformBreakdown: { platform: string; views: number }[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topComments: { author: string; text: string; sentiment: string }[];
}

// ==================== MOCK DATA ====================

const MOCK_AGENT: Agent = {
  id: 'agent-001',
  name: 'Sarah Chen',
  email: 'sarah@athletesfirst.net'
};

const MOCK_ATHLETES: Athlete[] = [
  { id: 'ath-001', name: 'Marcus Johnson', position: 'QB', school: 'Ohio State', avatarColor: 'var(--color-data-blue)' },
  { id: 'ath-002', name: 'Emily Rodriguez', position: 'WR', school: 'USC', avatarColor: '#8B5CF6' },
  { id: 'ath-003', name: 'James Wilson', position: 'RB', school: 'Alabama', avatarColor: 'var(--color-success)' },
  { id: 'ath-004', name: 'Sophia Lee', position: 'DB', school: 'Georgia', avatarColor: 'var(--color-warning)' },
  { id: 'ath-005', name: 'David Martinez', position: 'LB', school: 'Texas', avatarColor: 'var(--color-error)' }
];

const MOCK_CONTENT_BRIEF: ContentBrief = {
  prompt: 'Create a 30-second Nike regional campaign video for Marcus Johnson showcasing his training routine. Include brand logo overlay and upbeat music. Target audience: 18-24 males in California.',
  contentType: 'video',
  brand: 'Nike',
  duration: 30,
  targetAudience: '18-24 males, California'
};

const MOCK_GENERATED_CONTENT: GeneratedContent[] = [
  { id: 'v1', thumbnailUrl: '', duration: '0:30', fileSize: '12.4 MB', style: 'Cinematic', selected: false },
  { id: 'v2', thumbnailUrl: '', duration: '0:30', fileSize: '11.8 MB', style: 'Bold Posterized', selected: false },
  { id: 'v3', thumbnailUrl: '', duration: '0:32', fileSize: '13.1 MB', style: 'Comic Book', selected: false }
];

const MOCK_COMPLIANCE: ComplianceResult = {
  riskScore: 92,
  riskLevel: 'low',
  redFlags: [],
  checks: [
    { label: 'California NIL Rules', status: 'approved' },
    { label: 'NCAA Policy', status: 'approved' },
    { label: 'Ohio State Regulations', status: 'approved' },
    { label: 'Contract Terms (Nike)', status: 'approved' }
  ]
};

const MOCK_PUBLISH_DESTINATIONS: PublishDestination[] = [
  { platform: 'Instagram', enabled: true, status: 'pending', reachPotential: 1200000 },
  { platform: 'Twitter', enabled: true, status: 'pending', reachPotential: 340000 },
  { platform: 'TikTok', enabled: false, status: 'pending' },
  { platform: 'Nike Portal', enabled: true, status: 'pending' }
];

const MOCK_ANALYTICS: AnalyticsData = {
  views: 45230,
  viewsTrend: 12,
  engagement: 8.2,
  revenueAttributed: 2400,
  platformBreakdown: [
    { platform: 'Instagram', views: 32000 },
    { platform: 'Twitter', views: 10000 },
    { platform: 'Nike Portal', views: 3230 }
  ],
  sentiment: { positive: 82, neutral: 15, negative: 3 },
  topComments: [
    { author: '@sports_fan_42', text: 'Marcus is so inspiring! Love this content 💪', sentiment: 'positive' },
    { author: '@nike_collector', text: 'These Nike collabs are fire 🔥', sentiment: 'positive' },
    { author: '@cfb_news', text: 'Great to see athletes getting their bag', sentiment: 'positive' }
  ]
};

const STAGES: WalkthroughStage[] = [
  { id: 1, label: 'Login', title: 'Agent Login', description: 'Authenticate and select athlete', icon: LogIn },
  { id: 2, label: 'Prompt', title: 'Content Brief', description: 'Describe what you want to create', icon: FileText },
  { id: 3, label: 'Generate', title: 'AI Generation', description: 'Platform creates content variations', icon: Sparkles },
  { id: 4, label: 'Compliance', title: 'NIL Compliance Check', description: 'Automated risk analysis', icon: ShieldCheck },
  { id: 5, label: 'Consent', title: 'Athlete Approval', description: 'Push notification to athlete app', icon: Smartphone },
  { id: 6, label: 'Publish', title: 'Deploy Content', description: 'Publish to platforms', icon: Share2 },
  { id: 7, label: 'Analytics', title: 'Performance Tracking', description: 'Real-time engagement metrics', icon: BarChart3 }
];

// ==================== COMPONENTS ====================

export default function PlatformWalkthroughDemo() {
  const { shouldRotate, deviceType } = useOrientation();
  const [currentStage, setCurrentStage] = useState(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [contentBrief, setContentBrief] = useState<ContentBrief>(MOCK_CONTENT_BRIEF);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [athleteApproved, setAthleteApproved] = useState(false);
  const [publishDestinations, setPublishDestinations] = useState<PublishDestination[]>(MOCK_PUBLISH_DESTINATIONS);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleNext = () => {
    if (currentStage < 7) {
      setCompletedStages([...completedStages, currentStage]);
      setCurrentStage(currentStage + 1);
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageClick = (stageId: number) => {
    if (completedStages.includes(stageId) || stageId === currentStage) {
      setCurrentStage(stageId);
    }
  };

  const handleReset = () => {
    setCurrentStage(1);
    setCompletedStages([]);
    setSelectedAthlete(null);
    setSelectedVariation(null);
    setAthleteApproved(false);
    setPublishDestinations(MOCK_PUBLISH_DESTINATIONS);
  };

  return (
    <>
      <RotateDeviceOverlay show={shouldRotate} demoName="Platform Walkthrough" />
      <PlatformWalkthroughOnboarding />
      <div className={`w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6 ${shouldRotate ? 'hidden' : 'block'}`}>
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-white">Platform Walkthrough</h2>
          <p className="text-white/60 text-xs md:text-sm">
            See the complete Athletes First workflow from content creation to analytics
          </p>
        </div>

        {/* Progress Stepper - Responsive */}
        <div className="relative">
          {/* Mobile Portrait: Vertical scrollable stepper */}
          {deviceType === 'mobile' && (
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {STAGES.map((stage) => {
                const isCompleted = completedStages.includes(stage.id);
                const isCurrent = currentStage === stage.id;
                const isAccessible = isCompleted || isCurrent;
                const StageIcon = stage.icon;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(stage.id)}
                    disabled={!isAccessible}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-cyan-500/20 border-2 border-cyan-500'
                        : isCompleted
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/5 border border-white/10 opacity-50'
                    } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCurrent ? 'bg-cyan-500' : isCompleted ? 'bg-green-500' : 'bg-white/10'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <StageIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-cyan-400' : isCompleted ? 'text-green-400' : 'text-white/60'
                      }`}>
                        {stage.label}
                      </div>
                      <div className="text-xs text-white/50 truncate">{stage.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tablet: 2-row grid */}
          {deviceType === 'tablet' && (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {STAGES.slice(0, 4).map((stage, index) => {
                  const isCompleted = completedStages.includes(stage.id);
                  const isCurrent = currentStage === stage.id;
                  const isAccessible = isCompleted || isCurrent;
                  const StageIcon = stage.icon;

                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      <button
                        onClick={() => handleStageClick(stage.id)}
                        disabled={!isAccessible}
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-cyan-500 ring-4 ring-cyan-500/30 scale-110'
                            : isCompleted
                            ? 'bg-green-500 hover:scale-105'
                            : 'bg-white/10 border-2 border-white/20'
                        } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <StageIcon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-white/60'}`} />
                        )}
                      </button>
                      <span className={`mt-2 text-xs font-medium transition-colors text-center ${
                        isCurrent ? 'text-cyan-400' : isCompleted ? 'text-green-400' : 'text-white/40'
                      }`}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {STAGES.slice(4).map((stage, index) => {
                  const isCompleted = completedStages.includes(stage.id);
                  const isCurrent = currentStage === stage.id;
                  const isAccessible = isCompleted || isCurrent;
                  const StageIcon = stage.icon;

                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      <button
                        onClick={() => handleStageClick(stage.id)}
                        disabled={!isAccessible}
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-cyan-500 ring-4 ring-cyan-500/30 scale-110'
                            : isCompleted
                            ? 'bg-green-500 hover:scale-105'
                            : 'bg-white/10 border-2 border-white/20'
                        } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <StageIcon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-white/60'}`} />
                        )}
                      </button>
                      <span className={`mt-2 text-xs font-medium transition-colors text-center ${
                        isCurrent ? 'text-cyan-400' : isCompleted ? 'text-green-400' : 'text-white/40'
                      }`}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop: Horizontal (original layout) */}
          {deviceType === 'desktop' && (
            <div className="flex justify-between items-center">
              {STAGES.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isCurrent = currentStage === stage.id;
            const isAccessible = isCompleted || isCurrent;
            const StageIcon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center flex-1">
                {/* Connector Line */}
                {index > 0 && (
                  <div
                    className={`absolute h-0.5 transition-colors duration-300 ${
                      completedStages.includes(stage.id - 1) ? 'bg-green-500' : 'bg-white/20'
                    }`}
                    style={{
                      left: `${((index - 1) / (STAGES.length - 1)) * 100}%`,
                      width: `${100 / (STAGES.length - 1)}%`,
                      top: '20px'
                    }}
                  />
                )}

                {/* Stage Indicator */}
                <button
                  onClick={() => handleStageClick(stage.id)}
                  disabled={!isAccessible}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-cyan-500 ring-4 ring-cyan-500/30 scale-110'
                      : isCompleted
                      ? 'bg-green-500 hover:scale-105'
                      : 'bg-white/10 border-2 border-white/20'
                  } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <StageIcon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-white/60'}`} />
                  )}
                </button>

                {/* Stage Label */}
                <span className={`mt-2 text-xs font-medium transition-colors ${
                  isCurrent ? 'text-cyan-400' : isCompleted ? 'text-green-400' : 'text-white/40'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
            </div>
          )}
        </div>

        {/* Stage Content Area */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-8 min-h-[400px] md:min-h-[500px] relative">
        {/* Stage Title */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">{STAGES[currentStage - 1].title}</h3>
          <p className="text-white/60 text-sm mt-1">{STAGES[currentStage - 1].description}</p>
        </div>

        {/* Stage Content */}
        <div className="space-y-6">
          {currentStage === 1 && (
            <Stage1Login
              agent={MOCK_AGENT}
              athletes={MOCK_ATHLETES}
              selectedAthlete={selectedAthlete}
              onSelectAthlete={setSelectedAthlete}
              onNext={handleNext}
            />
          )}

          {currentStage === 2 && (
            <Stage2Prompt
              contentBrief={contentBrief}
              onUpdateBrief={setContentBrief}
              onNext={() => {
                setIsGenerating(true);
                setGenerationProgress(0);
                handleNext();
              }}
            />
          )}

          {currentStage === 3 && (
            <Stage3Generate
              isGenerating={isGenerating}
              progress={generationProgress}
              onProgressUpdate={setGenerationProgress}
              onComplete={() => setIsGenerating(false)}
              variations={MOCK_GENERATED_CONTENT}
              selectedVariation={selectedVariation}
              onSelectVariation={setSelectedVariation}
              onNext={handleNext}
            />
          )}

          {currentStage === 4 && (
            <Stage4Compliance
              complianceResult={MOCK_COMPLIANCE}
              onNext={handleNext}
            />
          )}

          {currentStage === 5 && (
            <Stage5Consent
              athlete={selectedAthlete || MOCK_ATHLETES[0]}
              contentPreview={MOCK_GENERATED_CONTENT.find(v => v.id === selectedVariation) || MOCK_GENERATED_CONTENT[0]}
              approved={athleteApproved}
              onApprove={() => {
                setAthleteApproved(true);
                setTimeout(handleNext, 2000);
              }}
            />
          )}

          {currentStage === 6 && (
            <Stage6Publish
              destinations={publishDestinations}
              onToggleDestination={(platform) => {
                setPublishDestinations(publishDestinations.map(d =>
                  d.platform === platform ? { ...d, enabled: !d.enabled } : d
                ));
              }}
              isPublishing={isPublishing}
              onPublish={() => {
                setIsPublishing(true);
                // Simulate publishing
                publishDestinations.forEach((dest, index) => {
                  if (dest.enabled) {
                    setTimeout(() => {
                      setPublishDestinations(prev => prev.map(d =>
                        d.platform === dest.platform ? { ...d, status: 'publishing' } : d
                      ));
                      setTimeout(() => {
                        setPublishDestinations(prev => prev.map(d =>
                          d.platform === dest.platform ? { ...d, status: 'published' } : d
                        ));
                      }, 1000);
                    }, index * 1500);
                  }
                });
                setTimeout(() => {
                  setIsPublishing(false);
                }, 6000);
              }}
              onNext={handleNext}
            />
          )}

          {currentStage === 7 && (
            <Stage7Analytics
              analytics={MOCK_ANALYTICS}
              onReset={handleReset}
            />
          )}
        </div>
        </div>

        {/* Navigation Buttons */}
        {currentStage < 7 && currentStage !== 5 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={currentStage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStage !== 6 && (
              <button
                onClick={handleNext}
                disabled={
                  (currentStage === 1 && !selectedAthlete) ||
                  (currentStage === 3 && !selectedVariation)
                }
                className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ==================== STAGE COMPONENTS ====================

function Stage1Login({
  agent,
  athletes,
  selectedAthlete,
  onSelectAthlete,
  onNext
}: {
  agent: Agent;
  athletes: Athlete[];
  selectedAthlete: Athlete | null;
  onSelectAthlete: (athlete: Athlete) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center py-4">
        <p className="text-white/80">Welcome back, <span className="font-semibold text-cyan-400">{agent.name}</span></p>
        <p className="text-white/60 text-sm">{agent.email}</p>
      </div>

      {/* Athlete Roster */}
      <div>
        <h4 className="text-sm font-semibold text-white/80 mb-3">Select an athlete to work with:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {athletes.map((athlete) => (
            <button
              key={athlete.id}
              onClick={() => {
                onSelectAthlete(athlete);
                setTimeout(onNext, 500);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAthlete?.id === athlete.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: athlete.avatarColor }}
                >
                  {athlete.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white text-sm">{athlete.name}</div>
                  <div className="text-xs text-white/60">{athlete.position} • {athlete.school}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stage2Prompt({
  contentBrief,
  onUpdateBrief,
  onNext
}: {
  contentBrief: ContentBrief;
  onUpdateBrief: (brief: ContentBrief) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-semibold text-white/80 mb-2">
          What content do you want to create?
        </label>
        <textarea
          value={contentBrief.prompt}
          onChange={(e) => onUpdateBrief({ ...contentBrief, prompt: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          placeholder="Describe the content you want to create..."
        />
      </div>

      {/* Content Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">Content Type</label>
          <select
            value={contentBrief.contentType}
            onChange={(e) => onUpdateBrief({ ...contentBrief, contentType: e.target.value as any })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          >
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="carousel">Carousel</option>
            <option value="story">Story</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">Brand Partner</label>
          <select
            value={contentBrief.brand}
            onChange={(e) => onUpdateBrief({ ...contentBrief, brand: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          >
            <option value="Nike">Nike</option>
            <option value="Gatorade">Gatorade</option>
            <option value="State Farm">State Farm</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Generate Content
      </button>
    </div>
  );
}

function Stage3Generate({
  isGenerating,
  progress,
  onProgressUpdate,
  onComplete,
  variations,
  selectedVariation,
  onSelectVariation,
  onNext
}: {
  isGenerating: boolean;
  progress: number;
  onProgressUpdate: (progress: number) => void;
  onComplete: () => void;
  variations: GeneratedContent[];
  selectedVariation: string | null;
  onSelectVariation: (id: string) => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    if (isGenerating && progress < 100) {
      const timer = setTimeout(() => {
        onProgressUpdate(Math.min(progress + 10, 100));
      }, 300);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(onComplete, 500);
    }
  }, [isGenerating, progress, onProgressUpdate, onComplete]);

  if (isGenerating || progress < 100) {
    return (
      <div className="space-y-6 text-center py-12">
        <div className="flex justify-center">
          <Sparkles className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Generating Content...</h4>
          <p className="text-sm text-white/60">
            {progress < 40 && 'Generating video frames (Gemini 2.0)...'}
            {progress >= 40 && progress < 70 && 'Creating audio track (ElevenLabs)...'}
            {progress >= 70 && 'Compositing brand assets (FFMPEG)...'}
          </p>
        </div>
        <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/60 text-sm">{progress}%</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white/80">{variations.length} variations generated</h4>
        <span className="text-xs text-green-400 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          Generation complete
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {variations.map((variation) => (
          <button
            key={variation.id}
            onClick={() => onSelectVariation(variation.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedVariation === variation.id
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            {/* Thumbnail Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-3 flex items-center justify-center">
              <Play className="w-8 h-8 text-white/60" />
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-white text-sm">{variation.style}</div>
              <div className="text-xs text-white/60">{variation.duration} • {variation.fileSize}</div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedVariation}
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
      >
        Review Compliance
      </button>
    </div>
  );
}

function Stage4Compliance({
  complianceResult,
  onNext
}: {
  complianceResult: ComplianceResult;
  onNext: () => void;
}) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score */}
      <div className="flex items-center justify-center py-8">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/10"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - complianceResult.riskScore / 100)}`}
              className="text-green-400 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-white">{complianceResult.riskScore}</div>
            <div className="text-xs text-white/60">Risk Score</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className={`text-lg font-semibold ${getRiskColor(complianceResult.riskLevel)}`}>
          {complianceResult.riskLevel.toUpperCase()} RISK
        </p>
      </div>

      {/* Red Flags */}
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium text-green-400">No red flags detected</span>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-white/80">Compliance Checks</h4>
        {complianceResult.checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-white/80">{check.label}</span>
            <div className="flex items-center gap-2">
              {check.status === 'approved' && (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              )}
              <span className="text-xs text-green-400 font-medium">APPROVED</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
      >
        Request Athlete Approval
      </button>
    </div>
  );
}

function Stage5Consent({
  athlete,
  contentPreview,
  approved,
  onApprove
}: {
  athlete: Athlete;
  contentPreview: GeneratedContent;
  approved: boolean;
  onApprove: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Agent View */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/80">Agent View</h4>
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center space-y-4">
          {!approved ? (
            <>
              <Clock className="w-12 h-12 text-yellow-400 mx-auto animate-pulse" />
              <div>
                <p className="text-white/80 font-medium">Waiting for athlete approval...</p>
                <p className="text-sm text-white/60 mt-2">
                  Push notification sent to {athlete.name}'s mobile app
                </p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
              <div>
                <p className="text-green-400 font-semibold">Content Approved!</p>
                <p className="text-sm text-white/60 mt-2">
                  {athlete.name} approved the content
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Phone Mockup */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/80">Athlete Mobile App</h4>
        <div className="mx-auto w-64 bg-gray-900 rounded-3xl p-2 shadow-2xl border-4 border-gray-800">
          {/* Phone Screen */}
          <div className="bg-gray-950 rounded-2xl overflow-hidden">
            {/* Status Bar */}
            <div className="bg-black px-4 py-2 flex justify-between items-center text-xs text-white/60">
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-3 border border-white/60 rounded-sm" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Notification */}
              <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-400">New Content for Approval</span>
                </div>
                <p className="text-xs text-white/80">Nike Training Campaign</p>
              </div>

              {/* Content Preview */}
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-8 h-8 text-white/60" />
              </div>

              <div className="space-y-2">
                <div className="text-xs text-white/60">
                  <p><span className="font-semibold text-white/80">Style:</span> {contentPreview.style}</p>
                  <p><span className="font-semibold text-white/80">Duration:</span> {contentPreview.duration}</p>
                  <p className="mt-2"><span className="font-semibold text-white/80">Usage Rights:</span> Nike Training Campaign - 30 days</p>
                </div>
              </div>

              {/* Action Buttons */}
              {!approved && (
                <div className="flex gap-2">
                  <button
                    onClick={onApprove}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Approve
                  </button>
                  <button className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold transition-colors">
                    Deny
                  </button>
                </div>
              )}

              {approved && (
                <div className="py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-semibold text-center">
                  ✓ Approved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stage6Publish({
  destinations,
  onToggleDestination,
  isPublishing,
  onPublish,
  onNext
}: {
  destinations: PublishDestination[];
  onToggleDestination: (platform: string) => void;
  isPublishing: boolean;
  onPublish: () => void;
  onNext: () => void;
}) {
  const allPublished = destinations.every(d => !d.enabled || d.status === 'published');

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-white/80">Select publishing destinations:</h4>

      <div className="space-y-3">
        {destinations.map((dest) => (
          <div key={dest.platform} className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={dest.enabled}
                  onChange={() => onToggleDestination(dest.platform)}
                  disabled={isPublishing}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
                />
                <span className="font-medium text-white">{dest.platform}</span>
              </div>

              {dest.status === 'publishing' && (
                <span className="text-xs text-yellow-400 animate-pulse">Publishing...</span>
              )}
              {dest.status === 'published' && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Published
                </div>
              )}
            </div>

            {dest.enabled && dest.reachPotential && (
              <div className="text-xs text-white/60 pl-7">
                Potential reach: {(dest.reachPotential / 1000000).toFixed(1)}M users
              </div>
            )}

            {dest.status === 'published' && dest.reachPotential && (
              <div className="text-xs text-green-400 pl-7 mt-1">
                {dest.status === 'published' && `✓ Delivered to ${(dest.reachPotential / 1000).toFixed(0)}K users`}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPublish}
          disabled={isPublishing || !destinations.some(d => d.enabled)}
          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
        >
          {isPublishing ? 'Publishing...' : 'Publish Now'}
        </button>

        {allPublished && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            View Analytics
          </button>
        )}
      </div>
    </div>
  );
}

function Stage7Analytics({
  analytics,
  onReset
}: {
  analytics: AnalyticsData;
  onReset: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-white/60">Views</span>
          </div>
          <div className="text-2xl font-bold text-white">{analytics.views.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
            <TrendingUp className="w-3 h-3" />
            +{analytics.viewsTrend}% vs last campaign
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-white/60">Engagement</span>
          </div>
          <div className="text-2xl font-bold text-white">{analytics.engagement}%</div>
          <div className="text-xs text-white/60 mt-1">Industry avg: 3.5%</div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span className="text-xs text-white/60">Revenue Attributed</span>
          </div>
          <div className="text-2xl font-bold text-white">${analytics.revenueAttributed.toLocaleString()}</div>
          <div className="text-xs text-white/60 mt-1">From Nike campaign tracking</div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-white/80 mb-3">Performance by Platform</h4>
        <div className="space-y-2">
          {analytics.platformBreakdown.map((platform) => (
            <div key={platform.platform} className="flex items-center gap-3">
              <span className="text-sm text-white/60 w-24">{platform.platform}</span>
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                  style={{ width: `${(platform.views / analytics.views) * 100}%` }}
                />
              </div>
              <span className="text-sm text-white font-medium w-16 text-right">
                {(platform.views / 1000).toFixed(1)}K
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div>
        <h4 className="text-sm font-semibold text-white/80 mb-3">Sentiment Analysis</h4>
        <div className="flex gap-4">
          <div className="flex-1 text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{analytics.sentiment.positive}%</div>
            <div className="text-xs text-white/60">Positive</div>
          </div>
          <div className="flex-1 text-center p-3 bg-gray-500/10 border border-gray-500/30 rounded-lg">
            <div className="text-2xl font-bold text-gray-400">{analytics.sentiment.neutral}%</div>
            <div className="text-xs text-white/60">Neutral</div>
          </div>
          <div className="flex-1 text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-2xl font-bold text-red-400">{analytics.sentiment.negative}%</div>
            <div className="text-xs text-white/60">Negative</div>
          </div>
        </div>
      </div>

      {/* Top Comments */}
      <div>
        <h4 className="text-sm font-semibold text-white/80 mb-3">Top Comments</h4>
        <div className="space-y-2">
          {analytics.topComments.map((comment, index) => (
            <div key={index} className="p-3 bg-white/5 rounded-lg flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-white/60 mb-1">{comment.author}</div>
                <div className="text-sm text-white/80">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full py-3 bg-white/10 hover:bg-white/15 text-white rounded-lg font-semibold transition-colors"
      >
        Create Another Campaign
      </button>
    </div>
  );
}
