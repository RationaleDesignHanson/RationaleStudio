'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useDigitalTwin } from '../context/DigitalTwinContext';

// Mock data
const OBJECTIVES = ['Product Launch', 'Brand Awareness', 'Event Promotion', 'Community Engagement', 'NIL Campaign'];
const AUDIENCES = ['Gen Z (18-24)', 'Millennials (25-40)', 'Parents', 'Sports Fans', 'General Market'];
const TONES = ['Professional', 'Casual', 'Inspirational', 'Energetic', 'Authentic'];
const DELIVERABLES = ['Instagram Reel', 'TikTok Video', 'YouTube Short', 'Static Post', 'Story Series'];

type ContentTab = 'script' | 'captions' | 'visuals' | 'languages';

// Rights validation function
function validateRights(campaignType: string, deliverables: string[]): string[] {
  const violations: string[] = [];

  switch (campaignType) {
    case 'Regional Endorsement':
    case 'National Campaign':
      // All deliverables allowed
      break;

    case 'Social Media Only':
      // YouTube Short not allowed
      if (deliverables.includes('YouTube Short')) {
        violations.push('YouTube Short not permitted under Social Media Only consent');
      }
      break;

    case 'Event Appearance':
      // Only Static Post allowed
      const restrictedDeliverables = deliverables.filter(d => d !== 'Static Post');
      restrictedDeliverables.forEach(d => {
        violations.push(`${d} not permitted under Event Appearance consent (only Static Post allowed)`);
      });
      break;
  }

  return violations;
}

const MOCK_GENERATED_CONTENT = {
  script: `Hey everyone! I'm excited to partner with [Brand] for this incredible opportunity.

As an athlete, I know what it takes to perform at the highest level - and that's exactly what [Brand] brings to the table. Their commitment to excellence matches my own, and I'm proud to represent a brand that shares my values.

Whether you're training hard or just starting your journey, [Brand] has the tools and support you need to reach your goals. Let's go!`,

  captions: [
    'Proud to partner with [Brand]. Excellence in everything we do. #ad',
    'When performance meets passion. Excited to work with [Brand] on this journey! #partner',
    'Representing [Brand] because they represent the values I believe in. #collaboration',
    '[Brand] × [Athlete] - Built different. #ad #partnership',
    'This is what dedication looks like. Grateful to work with [Brand]! #teamwork'
  ],

  thumbnails: [
    { id: 1, description: 'Action shot with brand overlay', style: 'Dynamic' },
    { id: 2, description: 'Close-up portrait with product', style: 'Intimate' },
    { id: 3, description: 'Training montage still', style: 'Motivational' },
    { id: 4, description: 'Candid moment', style: 'Authentic' }
  ],

  localizedVariants: [
    { language: 'Spanish', available: true },
    { language: 'Portuguese', available: true },
    { language: 'French', available: false }
  ]
};

type Step = 1 | 2 | 3 | 4 | 5;

export default function AmplifyAIDemo() {
  // Digital Twin context - optional, fallback to default if not in provider
  let consentScope = {
    campaignType: 'Regional Endorsement',
    territories: ['United States'],
    startDate: '2025-01',
    endDate: '2025-12',
    transformations: ['Voice Generation', 'Image Compositing']
  };

  try {
    const context = useDigitalTwin();
    consentScope = context.consentScope;
  } catch (error) {
    // Not wrapped in provider, use default values
  }

  // State
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [brandName, setBrandName] = useState('Nike');
  const [objective, setObjective] = useState(OBJECTIVES[0]);
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([DELIVERABLES[0]]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [generatedContent, setGeneratedContent] = useState<typeof MOCK_GENERATED_CONTENT | null>(null);
  const [progress, setProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [contentTab, setContentTab] = useState<ContentTab>('script');
  const [captionIndex, setCaptionIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [rightsViolations, setRightsViolations] = useState<string[]>([]);
  const [showViolations, setShowViolations] = useState(false);

  const loadingMessages = [
    'Analyzing brief...',
    'Selecting persona...',
    'Generating script...',
    'Creating visuals...',
    'Checking rights...'
  ];

  // Validate rights whenever deliverables change
  useEffect(() => {
    const violations = validateRights(consentScope.campaignType, selectedDeliverables);
    setRightsViolations(violations);
    setShowViolations(violations.length > 0);
  }, [selectedDeliverables, consentScope.campaignType]);

  const handleToggleDeliverable = (deliverable: string) => {
    if (selectedDeliverables.includes(deliverable)) {
      setSelectedDeliverables(selectedDeliverables.filter(d => d !== deliverable));
    } else {
      setSelectedDeliverables([...selectedDeliverables, deliverable]);
    }
  };

  const handleGenerateContent = () => {
    setCurrentStep(2);
    setIsGenerating(true);
    setProgress(0);

    let messageIndex = 0;
    let currentProgress = 0;

    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      }
    }, 3000);

    const progressInterval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 300);

    setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(100);

      // Replace [Brand] and [Athlete] with actual values
      const customizedContent = {
        ...MOCK_GENERATED_CONTENT,
        script: MOCK_GENERATED_CONTENT.script.replace(/\[Brand\]/g, brandName || 'Partner Brand').replace(/\[Athlete\]/g, 'Jordan Matthews'),
        captions: MOCK_GENERATED_CONTENT.captions.map(cap =>
          cap.replace(/\[Brand\]/g, brandName || 'Partner Brand').replace(/\[Athlete\]/g, 'Jordan Matthews')
        )
      };

      setGeneratedContent(customizedContent);
      setCurrentStep(3);
    }, 15000);
  };

  const handleVerifyRights = () => {
    setIsVerifying(true);
    setCurrentStep(4);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationComplete(true);
    }, 3000);
  };

  const handleExport = () => {
    setCurrentStep(5);
  };

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          Scale Content With AI-Generated Media
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          Create personalized content at scale: scripts, captions, thumbnails, and multi-language variants
        </div>
      </div>

      {/* STEP 1: Brand Brief Input */}
      {currentStep === 1 && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 1 OF 5</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">Brand Brief Input</h2>
            <p className="text-white/70 text-sm">Provide campaign details to generate personalized content</p>
          </div>

          {/* Rights Validation Indicator */}
          {rightsViolations.length === 0 ? (
            <div className="flex items-center justify-center gap-2 p-2 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#00FF94]" />
              <span className="text-[#00FF94] font-terminal text-xs font-bold">✓ RIGHTS VALIDATED</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 p-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-[#FF6B00]" />
              <span className="text-[#FF6B00] font-terminal text-xs font-bold">
                ⚠ RIGHTS ISSUE DETECTED ({rightsViolations.length} {rightsViolations.length === 1 ? 'VIOLATION' : 'VIOLATIONS'})
              </span>
            </div>
          )}

          <div className="space-y-2">
            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1">Brand Name *</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g., Nike"
                className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-white/70 font-terminal text-sm mb-1">Campaign Objective</label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  {OBJECTIVES.map(obj => (
                    <option key={obj} value={obj}>{obj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-terminal text-sm mb-1">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  {AUDIENCES.map(aud => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1">Content Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
              >
                {TONES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1.5">Deliverables</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DELIVERABLES.map((deliverable) => (
                  <button
                    key={deliverable}
                    onClick={() => handleToggleDeliverable(deliverable)}
                    className={`p-3 border-2 rounded-lg font-terminal text-sm transition-all ${
                      selectedDeliverables.includes(deliverable)
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    {selectedDeliverables.includes(deliverable) && <span className="text-cyan-400">✓ </span>}
                    {deliverable}
                  </button>
                ))}
              </div>
            </div>

            {/* Rights Violation Alert Panel */}
            {showViolations && rightsViolations.length > 0 && (
              <div className="p-4 bg-[#FF6B00]/10 border-2 border-[#FF6B00]/30 rounded-lg space-y-3 animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-[#FF6B00] font-terminal text-sm font-bold mb-2">
                      Digital Twin Rights Conflict
                    </div>
                    <div className="text-white/80 font-terminal text-xs mb-3">
                      The following deliverables conflict with your current consent settings:
                    </div>
                    <div className="space-y-2 mb-3">
                      {rightsViolations.map((violation, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs">
                          <span className="text-[#FF6B00] mt-0.5">•</span>
                          <span className="text-white/70 font-terminal">{violation}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-white/60 font-terminal text-xs mb-3">
                      <span className="text-white font-bold">Current Consent:</span> {consentScope.campaignType}
                    </div>
                    <button
                      onClick={() => {
                        // This will be implemented when we update UnifiedVideoDigitalTwinsDemo
                        alert('Navigate to Digital Twin consent configuration - implementation pending');
                      }}
                      className="w-full py-2 bg-[#06b6d4] hover:bg-[#06b6d4]/80 text-white font-terminal text-xs rounded-lg transition-all"
                    >
                      UPDATE DIGITAL TWIN CONSENT →
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateContent}
              disabled={!brandName || selectedDeliverables.length === 0}
              className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cyan-500"
            >
              GENERATE CONTENT →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Generation Loading */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4 animate-fade-in">
          <div className="text-center">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 2 OF 5</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">Generating Content</h2>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-white/70 font-terminal text-sm">{progress}% Complete</div>
          </div>

          {/* Loading message */}
          <div className="text-center space-y-2">
            <div className="text-white/90 font-terminal text-lg animate-pulse">
              {loadingMessage}
            </div>
            <div className="text-white/50 font-terminal text-xs">
              Typically takes 15-20 seconds
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Generated Content Display */}
      {currentStep === 3 && generatedContent && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 3 OF 5</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">Content Generated</h2>
            <p className="text-white/70 text-sm">AI-powered branded content ready for review</p>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'script' as ContentTab, label: 'Script' },
                { id: 'captions' as ContentTab, label: 'Captions' },
                { id: 'visuals' as ContentTab, label: 'Visuals' },
                { id: 'languages' as ContentTab, label: 'Languages' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setContentTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                    contentTab === tab.id ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Content Tabs */}
          <div className="lg:hidden space-y-3">
            {/* Script Tab */}
            {contentTab === 'script' && (
              <div>
                <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">SCRIPT</div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/90 font-terminal text-sm leading-relaxed whitespace-pre-line">
                    {generatedContent.script}
                  </p>
                </div>
              </div>
            )}

            {/* Captions Tab - Horizontal Carousel */}
            {contentTab === 'captions' && (
              <div>
                <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">
                  CAPTION OPTIONS ({captionIndex + 1}/{generatedContent.captions.length})
                </div>
                <div className="relative">
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-300"
                      style={{ transform: `translateX(-${captionIndex * 100}%)` }}
                    >
                      {generatedContent.captions.map((caption, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-2">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 min-h-[90px] flex flex-col justify-center">
                            <p className="text-white/90 font-terminal text-sm mb-3">{caption}</p>
                            {index === 0 && (
                              <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 font-terminal rounded self-start">
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  {captionIndex > 0 && (
                    <button
                      onClick={() => setCaptionIndex(captionIndex - 1)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/50 p-2 rounded-full z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {captionIndex < generatedContent.captions.length - 1 && (
                    <button
                      onClick={() => setCaptionIndex(captionIndex + 1)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/50 p-2 rounded-full z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-4">
                    {generatedContent.captions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === captionIndex ? 'bg-cyan-400 scale-125' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Visuals Tab - Thumbnail Carousel + Video */}
            {contentTab === 'visuals' && (
              <div className="space-y-6">
                <div>
                  <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">
                    THUMBNAIL OPTIONS ({thumbnailIndex + 1}/{generatedContent.thumbnails.length})
                  </div>
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300"
                        style={{ transform: `translateX(-${thumbnailIndex * 100}%)` }}
                      >
                        {generatedContent.thumbnails.map((thumb) => (
                          <div key={thumb.id} className="w-full flex-shrink-0 px-2">
                            <div className={`aspect-square bg-gradient-to-br from-white/5 to-white/10 border-2 rounded-lg flex flex-col items-center justify-center ${
                              thumb.id === 1 ? 'border-cyan-500/50' : 'border-white/10'
                            }`}>
                              <div className="text-6xl mb-3">📷</div>
                              <div className="text-white/70 font-terminal text-sm text-center px-2">{thumb.style}</div>
                              <div className="text-white/50 font-terminal text-xs text-center px-2 mt-1">{thumb.description}</div>
                              {thumb.id === 1 && (
                                <div className="mt-3 text-xs px-3 py-1 bg-cyan-500/20 text-cyan-400 font-terminal rounded">BEST</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel Controls */}
                    {thumbnailIndex > 0 && (
                      <button
                        onClick={() => setThumbnailIndex(thumbnailIndex - 1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/50 p-2 rounded-full z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}
                    {thumbnailIndex < generatedContent.thumbnails.length - 1 && (
                      <button
                        onClick={() => setThumbnailIndex(thumbnailIndex + 1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/50 p-2 rounded-full z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                      {generatedContent.thumbnails.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === thumbnailIndex ? 'bg-cyan-400 scale-125' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Video Preview */}
                <div>
                  <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">VIDEO PREVIEW</div>
                  <div className="bg-black border-2 border-cyan-500/30 rounded-lg aspect-video overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      src="/videos/athletes-first/generated/roster/jordan-matthews-qb.mp4"
                      poster="/videos/athletes-first/generated/roster/jordan-matthews-qb.mp4#t=0.1"
                      controls
                      preload="metadata"
                      playsInline
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Languages Tab */}
            {contentTab === 'languages' && (
              <div>
                <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">LOCALIZED VARIANTS</div>
                <div className="space-y-3">
                  {generatedContent.localizedVariants.map((variant, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg ${
                        variant.available
                          ? 'bg-white/5 border-cyan-500/30'
                          : 'bg-white/5 border-white/10 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-terminal text-base">{variant.language}</span>
                        {variant.available ? (
                          <span className="text-green-400 text-xl">✓</span>
                        ) : (
                          <span className="text-white/30 text-xs font-terminal">Coming soon</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout - Keep Original */}
          <div className="hidden lg:block space-y-3">
            {/* Script Preview */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">SCRIPT</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/90 font-terminal text-sm leading-relaxed whitespace-pre-line">
                  {generatedContent.script}
                </p>
              </div>
            </div>

            {/* Caption Options */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">CAPTION OPTIONS</div>
              <div className="space-y-2">
                {generatedContent.captions.map((caption, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-white/50 font-terminal text-xs mt-1">#{index + 1}</span>
                      <span className="text-white/90 font-terminal text-sm flex-1">{caption}</span>
                      {index === 0 && (
                        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 font-terminal rounded">RECOMMENDED</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">THUMBNAIL OPTIONS</div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {generatedContent.thumbnails.map((thumb) => (
                  <div
                    key={thumb.id}
                    className={`aspect-square bg-gradient-to-br from-white/5 to-white/10 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all ${
                      thumb.id === 1 ? 'border-cyan-500/50' : 'border-white/10'
                    }`}
                  >
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-white/70 font-terminal text-xs text-center px-2">{thumb.style}</div>
                    {thumb.id === 1 && (
                      <div className="mt-2 text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 font-terminal rounded">BEST</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Video Preview */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">VIDEO PREVIEW</div>
              <div className="bg-black border-2 border-cyan-500/30 rounded-lg aspect-video overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src="/videos/athletes-first/generated/roster/jordan-matthews-qb.mp4"
                  poster="/videos/athletes-first/generated/roster/jordan-matthews-qb.mp4#t=0.1"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
            </div>

            {/* Localized Variants */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">LOCALIZED VARIANTS</div>
              <div className="grid md:grid-cols-3 gap-3">
                {generatedContent.localizedVariants.map((variant, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg ${
                      variant.available
                        ? 'bg-white/5 border-cyan-500/30'
                        : 'bg-white/5 border-white/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-terminal text-sm">{variant.language}</span>
                      {variant.available ? (
                        <span className="text-green-400 text-sm">✓</span>
                      ) : (
                        <span className="text-white/30 text-xs font-terminal">Coming soon</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleVerifyRights}
            className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all"
          >
            VERIFY RIGHTS & CONTINUE →
          </button>
        </div>
      )}

      {/* STEP 4: Rights Verification */}
      {currentStep === 4 && (
        <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 4 OF 5</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">Rights Verification</h2>
            <p className="text-white/70 text-sm">Automated compliance check via Rights Layer</p>
          </div>

          {isVerifying ? (
            <div className="text-center space-y-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
              </div>
              <div className="text-white/90 font-terminal text-lg animate-pulse">
                Verifying rights and consent...
              </div>
            </div>
          ) : verificationComplete ? (
            <div className="w-full max-w-2xl space-y-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3 text-cyan-400">✓</div>
                <div className="text-2xl font-bold text-white font-terminal mb-2">VERIFIED</div>
                <div className="text-white/70 font-terminal text-sm">All rights cleared in &lt; 10 seconds</div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-white font-terminal font-bold mb-1">LikenessID Check</div>
                    <div className="text-white/60 font-terminal text-xs">Facial recognition verified</div>
                  </div>
                  <span className="text-green-400 text-2xl">✓</span>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-white font-terminal font-bold mb-1">VoiceID Check</div>
                    <div className="text-white/60 font-terminal text-xs">Voice signature verified</div>
                  </div>
                  <span className="text-green-400 text-2xl">✓</span>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-white font-terminal font-bold mb-1">Consent Scope</div>
                    <div className="text-white/60 font-terminal text-xs">All deliverables cleared for use</div>
                  </div>
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all"
              >
                EXPORT CREATIVE PACK →
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* STEP 5: Export Creative Pack */}
      {currentStep === 5 && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 5 OF 5</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">Export Creative Pack</h2>
            <p className="text-white/70 text-sm">Brand-ready package, delivered in 2 hours</p>
          </div>

          <div className="space-y-3">
            {/* Package Contents */}
            <div className="p-3 bg-white/5 border-2 border-cyan-500/50 rounded-lg">
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider text-center">PACKAGE CONTENTS</div>
              <div className="grid md:grid-cols-2 gap-2 mb-6">
                {[
                  'Video Files (MP4, MOV)',
                  'Script & Captions',
                  'Thumbnail Images (PNG)',
                  'Rights Documentation',
                  'Usage Guidelines',
                  'Localized Variants'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/90 font-terminal text-sm">
                    <span className="text-cyan-400">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Export Buttons */}
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all">
                  DOWNLOAD ALL FILES
                </button>
                <div className="grid md:grid-cols-2 gap-2">
                  <button className="py-2 border-2 border-cyan-500/30 text-white font-terminal rounded-lg hover:bg-white/5 transition-all">
                    GENERATE SHARE LINK
                  </button>
                  <button className="py-2 border-2 border-cyan-500/30 text-white font-terminal rounded-lg hover:bg-white/5 transition-all">
                    SEND TO BRAND
                  </button>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <div className="text-green-400 font-terminal font-bold mb-2">DELIVERY COMPLETE</div>
                  <div className="text-white/80 font-terminal text-sm">
                    Total time: 1 hour 47 minutes<br/>
                    Traditional process would take 21 days
                  </div>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setBrandName('');
                  setGeneratedContent(null);
                  setVerificationComplete(false);
                }}
                className="text-white/50 hover:text-white font-terminal text-sm transition-colors"
              >
                ← Start New Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator - Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step === currentStep
                ? 'bg-cyan-400 scale-150'
                : step < currentStep
                ? 'bg-cyan-400/50'
                : 'bg-white/20'
            }`}
            style={{
              boxShadow: step === currentStep ? '0 0 8px rgba(34, 211, 238, 0.6)' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
}
