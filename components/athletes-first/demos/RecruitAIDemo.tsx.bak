'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, UserPlus } from 'lucide-react';

// Mock prospect data
const MOCK_PROSPECTS = {
  'Jordan Matthews': {
    position: 'QB',
    school: 'Ohio State',
    traits: ['Leader', 'Competitive', 'Family-Oriented', 'Community-Focused'],
    sentiment: {
      score: 92,
      quote: 'Exceptional work ethic and natural leadership qualities'
    },
    familyValues: ['Faith', 'Education', 'Community Service', 'Financial Literacy'],
    personas: [
      { name: 'Mentor Figure', match: 95, description: 'Emphasize guidance and long-term partnership' },
      { name: 'Strategic Advisor', match: 88, description: 'Focus on business acumen and career planning' },
      { name: 'Family Friend', match: 85, description: 'Connect through shared values and family support' }
    ]
  },
  'Marcus Johnson': {
    position: 'WR',
    school: 'Alabama',
    traits: ['Speed Demon', 'Humble', 'Academic Focus', 'Legacy Builder'],
    sentiment: {
      score: 87,
      quote: 'Rare combination of athleticism and humility'
    },
    familyValues: ['Legacy', 'Education First', 'Humility', 'Hard Work'],
    personas: [
      { name: 'Legacy Architect', match: 93, description: 'Focus on building generational wealth' },
      { name: 'Academic Supporter', match: 90, description: 'Emphasize education and career preparation' },
      { name: 'Humble Coach', match: 82, description: 'Match his humility and work ethic' }
    ]
  },
  'Isabella Rodriguez': {
    position: 'RB',
    school: 'USC',
    traits: ['Dynamic', 'Bilingual', 'Community Leader', 'Brand Conscious'],
    sentiment: {
      score: 94,
      quote: 'Natural brand builder with authentic community connection'
    },
    familyValues: ['Cultural Pride', 'Community Impact', 'Entrepreneurship', 'Family First'],
    personas: [
      { name: 'Cultural Bridge', match: 96, description: 'Connect through shared cultural values' },
      { name: 'Brand Strategist', match: 91, description: 'Focus on NIL and personal brand building' },
      { name: 'Community Partner', match: 88, description: 'Emphasize community impact and legacy' }
    ]
  }
};

type Step = 1 | 2 | 3 | 4 | 5;

export default function RecruitAIDemo() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [prospectName, setProspectName] = useState('');
  const [prospectPosition, setProspectPosition] = useState('');
  const [prospectSchool, setProspectSchool] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [toneValue, setToneValue] = useState(50);
  const [generatedScript, setGeneratedScript] = useState('');
  const [showParentVariant, setShowParentVariant] = useState(false);
  const [personaIndex, setPersonaIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string>('sentiment');

  const loadingMessages = [
    'Analyzing highlights...',
    'Processing social sentiment...',
    'Mapping family values...',
    'Generating personas...'
  ];

  // Step 1 -> Step 2: Start analysis
  const handleAnalyzeProspect = () => {
    setCurrentStep(2);
    setIsAnalyzing(true);

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 700);

    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false);

      // Use mock data or default
      const mockData = MOCK_PROSPECTS[prospectName as keyof typeof MOCK_PROSPECTS] || MOCK_PROSPECTS['Jordan Matthews'];
      setAnalysisData(mockData);
      setCurrentStep(3);
    }, 3000);
  };

  // Step 3 -> Step 4: Select persona and continue
  const handleContinueToGenerate = () => {
    if (analysisData?.personas?.[0]) {
      setSelectedPersona(analysisData.personas[0].name);
    }
    setCurrentStep(4);
  };

  // Step 4 -> Step 5: Generate video intro
  const handleGenerateVideo = () => {
    const tone = toneValue > 50 ? 'casual' : 'professional';
    const script = `Hey ${prospectName}! I've been following your ${analysisData?.position || 'game'} at ${prospectSchool || 'your school'}, and I'm impressed by your ${analysisData?.traits?.[0]?.toLowerCase() || 'talent'}.

As someone who specializes in the ${selectedPersona} approach, I see exactly how we can position you for the ${prospectPosition || 'draft'}. Your focus on ${analysisData?.familyValues?.[0]?.toLowerCase() || 'family'} really resonates with how I work with my athletes.

Let's talk about your path to the league—I've got some ideas that could make a real difference.`;

    setGeneratedScript(script);
    setCurrentStep(5);
  };

  // Quick fill with sample data
  const handleQuickFill = (name: string) => {
    setProspectName(name);
    const mockData = MOCK_PROSPECTS[name as keyof typeof MOCK_PROSPECTS];
    setProspectPosition(mockData.position);
    setProspectSchool(mockData.school);
    setSocialLinks('@' + name.toLowerCase().replace(' ', ''));
  };

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          AI-Powered Prospect Intelligence
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          Analyze prospects, understand their world, generate personalized outreach
        </div>
      </div>

      {/* STEP 1: Prospect Input */}
      {currentStep === 1 && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 1 OF 5</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Enter Prospect Information</h2>
            <p className="text-white/70 text-xs">Add a prospect to analyze their digital footprint and generate personalized outreach</p>
          </div>

          {/* Quick fill dropdown */}
          <div className="mb-2 pb-2 border-b border-white/10">
            <label className="block text-white/70 font-terminal text-sm mb-1">Quick Fill Example Prospect</label>
            <select
              onChange={(e) => e.target.value && handleQuickFill(e.target.value)}
              className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
              defaultValue=""
            >
              <option value="" disabled>Select a prospect to auto-fill...</option>
              {Object.keys(MOCK_PROSPECTS).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1">Prospect Name *</label>
              <input
                type="text"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                placeholder="e.g., Jordan Matthews"
                className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-white/70 font-terminal text-sm mb-1">Position *</label>
                <select
                  value={prospectPosition}
                  onChange={(e) => setProspectPosition(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">Select position</option>
                  <option value="QB">QB</option>
                  <option value="RB">RB</option>
                  <option value="WR">WR</option>
                  <option value="TE">TE</option>
                  <option value="OL">OL</option>
                  <option value="DL">DL</option>
                  <option value="LB">LB</option>
                  <option value="DB">DB</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 font-terminal text-sm mb-1">School (optional)</label>
                <input
                  type="text"
                  value={prospectSchool}
                  onChange={(e) => setProspectSchool(e.target.value)}
                  placeholder="e.g., Ohio State"
                  className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1">Social Media Links (optional)</label>
              <input
                type="text"
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
                placeholder="Twitter, Instagram, TikTok handles"
                className="w-full bg-black/40 border border-white/20 text-white px-4 py-1.5 rounded-lg font-terminal focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleAnalyzeProspect}
              disabled={!prospectName || !prospectPosition}
              className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cyan-500"
            >
              ANALYZE PROSPECT →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Analysis Loading */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4 animate-fade-in">
          <div className="text-center">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 2 OF 5</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Analyzing Prospect</h2>
          </div>

          {/* Animated spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          </div>

          {/* Loading message */}
          <div className="text-center space-y-2">
            <div className="text-white/90 font-terminal text-lg animate-pulse">
              {loadingMessage}
            </div>
            <div className="text-white/50 font-terminal text-xs">
              Analyzing digital footprint...
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Analysis Results */}
      {currentStep === 3 && analysisData && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 3 OF 5</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Analysis Complete</h2>
            <p className="text-white/70 text-xs">AI-generated insights from digital footprint</p>
          </div>

          {/* Mobile Accordion Layout */}
          <div className="lg:hidden space-y-2">
            {/* Sentiment Score - Always visible */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">SOCIAL SENTIMENT</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-bold text-cyan-400">{analysisData.sentiment.score}%</div>
                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-1000"
                      style={{ width: `${analysisData.sentiment.score}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-white/80 font-terminal text-xs italic">
                "{analysisData.sentiment.quote}"
              </div>
            </div>

            {/* Key Traits - Accordion */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'traits' ? '' : 'traits')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="text-white/50 font-terminal text-xs tracking-wider">KEY TRAITS ({analysisData.traits.length})</span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${expandedSection === 'traits' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'traits' && (
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {analysisData.traits.map((trait: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-terminal text-xs"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Family Values - Accordion */}
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'values' ? '' : 'values')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="text-white/50 font-terminal text-xs tracking-wider">FAMILY VALUES ({analysisData.familyValues.length})</span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${expandedSection === 'values' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'values' && (
                <div className="px-4 pb-4 space-y-2">
                  {analysisData.familyValues.map((value: string, index: number) => (
                    <div
                      key={index}
                      className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2"
                    >
                      <span className="text-cyan-400 text-base">✓</span>
                      <span className="text-white font-terminal text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Personas - Horizontal Carousel */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="text-white/50 font-terminal text-xs mb-3 tracking-wider">
                RECOMMENDED PERSONAS ({personaIndex + 1}/{analysisData.personas.length})
              </div>
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${personaIndex * 100}%)` }}
                  >
                    {analysisData.personas.map((persona: any, index: number) => (
                      <div key={index} className="w-full flex-shrink-0 px-2">
                        <div className={`p-2.5 border-2 rounded-lg min-h-[100px] ${
                          index === 0
                            ? 'bg-cyan-500/10 border-cyan-500/50'
                            : 'bg-white/5 border-white/10'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-bold text-white text-base mb-1 flex items-center gap-2 flex-wrap">
                                {persona.name}
                                {index === 0 && (
                                  <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 font-terminal rounded">BEST</span>
                                )}
                              </div>
                              <div className="text-white/70 text-xs mb-2">{persona.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-cyan-400">{persona.match}%</span>
                            <span className="text-white/50 text-xs ml-1">match</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Controls */}
                {personaIndex > 0 && (
                  <button
                    onClick={() => setPersonaIndex(personaIndex - 1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-black/50 p-2 rounded-full z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                {personaIndex < analysisData.personas.length - 1 && (
                  <button
                    onClick={() => setPersonaIndex(personaIndex + 1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-black/50 p-2 rounded-full z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-3">
                  {analysisData.personas.map((_: any, index: number) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === personaIndex ? 'bg-cyan-400 scale-125' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Keep Original */}
          <div className="hidden lg:block space-y-3">
            {/* Sentiment Score */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-white/50 font-terminal text-xs mb-3 tracking-wider">SOCIAL SENTIMENT</div>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-2xl md:text-4xl font-bold text-cyan-400">{analysisData.sentiment.score}%</div>
                <div className="flex-1">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-1000"
                      style={{ width: `${analysisData.sentiment.score}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-white/80 font-terminal text-sm italic">
                "{analysisData.sentiment.quote}"
              </div>
            </div>

            {/* Key Traits */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">KEY TRAITS</div>
              <div className="flex flex-wrap gap-2">
                {analysisData.traits.map((trait: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-terminal text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Family Values */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">FAMILY VALUES</div>
              <div className="grid grid-cols-2 gap-2">
                {analysisData.familyValues.map((value: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3"
                  >
                    <span className="text-cyan-400 text-lg">✓</span>
                    <span className="text-white font-terminal text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personas */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">RECOMMENDED PERSONAS</div>
              <div className="space-y-2">
                {analysisData.personas.map((persona: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      index === 0
                        ? 'bg-cyan-500/10 border-cyan-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-bold text-white mb-1 flex items-center gap-2">
                          {persona.name}
                          {index === 0 && (
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 font-terminal rounded">BEST MATCH</span>
                          )}
                        </div>
                        <div className="text-white/70 text-sm">{persona.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl md:text-2xl font-bold text-cyan-400">{persona.match}%</div>
                        <div className="text-white/50 text-xs">match</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleContinueToGenerate}
            className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all"
          >
            CONTINUE TO GENERATE →
          </button>
        </div>
      )}

      {/* STEP 4: Customize Outreach */}
      {currentStep === 4 && analysisData && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 4 OF 5</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Customize Outreach</h2>
            <p className="text-white/70 text-xs">Fine-tune your personalized video intro</p>
          </div>

          <div className="space-y-3">
            {/* Persona Selection */}
            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1.5">Select Persona</label>
              <div className="space-y-2">
                {analysisData.personas.map((persona: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPersona(persona.name)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedPersona === persona.name
                        ? 'bg-cyan-500/10 border-cyan-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-white">{persona.name}</div>
                    <div className="text-white/60 text-sm">{persona.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1.5">Language</label>
              <div className="grid grid-cols-3 gap-2">
                {['English', 'Spanish', 'French'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-3 border-2 rounded-lg font-terminal text-sm transition-all ${
                      selectedLanguage === lang
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Slider */}
            <div>
              <label className="block text-white/70 font-terminal text-sm mb-1.5">
                Tone: {toneValue > 50 ? 'Casual' : 'Professional'}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={toneValue}
                onChange={(e) => setToneValue(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-white/50 text-xs mt-2">
                <span>Professional</span>
                <span>Casual</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateVideo}
            className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all"
          >
            GENERATE VIDEO INTRO →
          </button>
        </div>
      )}

      {/* STEP 5: Generated Video */}
      {currentStep === 5 && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-center mb-2">
            <div className="text-white/60 font-terminal text-xs mb-2">STEP 5 OF 5</div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Video Generated</h2>
            <p className="text-white/70 text-xs">Personalized outreach ready to send</p>
          </div>

          <div className="space-y-3">
            {/* Video Preview */}
            <div className="bg-white/5 border-2 border-cyan-500/30 rounded-lg aspect-video flex items-center justify-center relative">
              <div className="text-center space-y-3">
                <div className="text-5xl">▶</div>
                <div className="text-white/70 font-terminal text-sm">AI-Generated Video</div>
                <div className="text-white/50 font-terminal text-xs">0:45 duration</div>
              </div>
            </div>

            {/* Script */}
            <div>
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider">VIDEO SCRIPT</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/90 font-terminal text-sm leading-relaxed whitespace-pre-line">
                  {generatedScript}
                </p>
              </div>
            </div>

            {/* Variant Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <div className="text-white font-terminal font-bold mb-1">Parent Variant</div>
                <div className="text-white/60 font-terminal text-xs">Also generate version for prospect's parents</div>
              </div>
              <button
                onClick={() => setShowParentVariant(!showParentVariant)}
                className={`w-12 h-6 rounded-full transition-all ${
                  showParentVariant ? 'bg-cyan-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-all ${
                    showParentVariant ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Export Options */}
            <div className="p-3 bg-white/5 border-2 border-cyan-500/50 rounded-lg">
              <div className="text-white/50 font-terminal text-xs mb-2 tracking-wider text-center">EXPORT OPTIONS</div>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-terminal rounded-lg transition-all">
                  DOWNLOAD VIDEO
                </button>
                <div className="grid md:grid-cols-2 gap-2">
                  <button className="py-2 border-2 border-cyan-500/30 text-white font-terminal rounded-lg hover:bg-white/5 transition-all">
                    SEND TO PROSPECT
                  </button>
                  <button className="py-2 border-2 border-cyan-500/30 text-white font-terminal rounded-lg hover:bg-white/5 transition-all">
                    ADD TO QUEUE
                  </button>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <div className="text-green-400 font-terminal font-bold mb-2">READY TO SEND</div>
                  <div className="text-white/80 font-terminal text-sm">
                    Video generated in 2 minutes<br/>
                    Traditional outreach takes 1 hour
                  </div>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setProspectName('');
                  setProspectPosition('');
                  setProspectSchool('');
                  setSocialLinks('');
                  setAnalysisData(null);
                  setGeneratedScript('');
                }}
                className="text-white/50 hover:text-white font-terminal text-sm transition-colors"
              >
                ← Analyze New Prospect
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
