'use client';

import { useState } from 'react';
import { Sparkles, Wand2, Play } from 'lucide-react';

const CAMPAIGN_TYPES = [
  {
    id: 'regional',
    name: 'Regional Campaigns',
    description: 'Generate location-specific content for multiple markets',
    examples: ['Texas BBQ Chain', 'Pacific Northwest Coffee', 'Florida Tourism']
  },
  {
    id: 'personalized',
    name: 'Personalized Messages',
    description: 'Create custom messages for individual fans or groups',
    examples: ['Birthday Messages', 'Fan Milestones', 'VIP Experiences']
  },
  {
    id: 'seasonal',
    name: 'Seasonal Content',
    description: 'Automated content for holidays and events',
    examples: ['Holiday Campaigns', 'Draft Day Content', 'Championship Runs']
  }
];

const MOCK_OUTPUTS = {
  regional: [
    {
      market: 'Dallas, TX',
      script: "Hey Dallas! Nothing beats Texas BBQ after a big win. That's why I'm partnering with Smokey's BBQ to bring you championship flavor. Use code TOUCHDOWN for 20% off your next order.",
      visual: '🎬 30-sec spot with Dallas skyline backdrop',
      videoUrl: '/videos/athletes-first/generated/regional/dallas-market.mp4'
    },
    {
      market: 'Houston, TX',
      script: "Houston, you know I love this city. That's why I'm teaming up with Smokey's BBQ to celebrate our wins together. Use code TOUCHDOWN for 20% off.",
      visual: '🎬 30-sec spot with Houston landmarks',
      videoUrl: '/videos/athletes-first/generated/regional/houston-market.mp4'
    },
    {
      market: 'Austin, TX',
      script: "Austin! Keep it weird, keep it winning. Smokey's BBQ and I are bringing you the best BBQ in town. Use code TOUCHDOWN for 20% off your order.",
      visual: '🎬 30-sec spot with Austin cultural elements',
      videoUrl: '/videos/athletes-first/generated/regional/austin-market.mp4'
    }
  ],
  personalized: [
    {
      recipient: 'Premium Fan - Sarah M.',
      message: "Hey Sarah! Thanks for being part of the journey since day one. Here's a personal message just for you on your birthday. Let's keep winning together!",
      type: 'Birthday Message',
      deliveryMethod: 'Video DM'
    },
    {
      recipient: '10-Year Season Ticket Holder',
      message: "Ten years of loyalty deserves recognition. Thank you for believing in me from the start. This special moment is dedicated to fans like you.",
      type: 'Milestone Recognition',
      deliveryMethod: 'Personalized Video'
    }
  ],
  seasonal: [
    {
      occasion: 'Thanksgiving',
      content: "Grateful for this team, this city, and fans like you. Happy Thanksgiving from my family to yours. Let's finish this season strong!",
      platforms: ['Instagram', 'Twitter', 'TikTok'],
      timing: 'Thanksgiving Morning'
    },
    {
      occasion: 'Championship Celebration',
      content: "WE DID IT! This championship is for every single person who believed. Thank you for the incredible support all season long!",
      platforms: ['All Social Channels'],
      timing: 'Post-Game Immediate'
    }
  ]
};

export default function BrandCampaignDemo() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('regional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResults(false);

    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  const currentCampaign = CAMPAIGN_TYPES.find(c => c.id === selectedCampaign);
  const currentOutputs = MOCK_OUTPUTS[selectedCampaign as keyof typeof MOCK_OUTPUTS];

  return (
    <div className="space-y-3">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
        <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
          One Athlete, Infinite Variations
        </div>
        <div className="text-xs md:text-sm text-white/60 leading-snug">
          Generate regional spots, personalized fan messages, and seasonal content—all from a single athlete
        </div>
      </div>

      {/* Campaign Type Selection */}
      <div className="space-y-2">
        <div className="text-white/70 font-terminal text-sm mb-2">SELECT CAMPAIGN TYPE</div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          {CAMPAIGN_TYPES.map((campaign) => (
            <button
              key={campaign.id}
              onClick={() => {
                setSelectedCampaign(campaign.id);
                setShowResults(false);
              }}
              className={`flex-1 p-3 rounded-lg border-2 transition-all text-left ${
                selectedCampaign === campaign.id
                  ? 'bg-orange-500/10 border-orange-500/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col gap-1.5">
                {/* Row 1: Title */}
                <div className={`font-bold text-sm ${
                  selectedCampaign === campaign.id ? 'text-orange-400' : 'text-white/80'
                }`}>
                  {campaign.name}
                </div>

                {/* Row 2: Description */}
                <div className="text-white/60 text-xs leading-snug">
                  {campaign.description}
                </div>

                {/* Row 3: Examples */}
                <div className="text-white/40 text-xs leading-relaxed italic">
                  {campaign.examples.join(' • ')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Configuration */}
      {currentCampaign && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-terminal text-sm mb-4">
            <Wand2 className="w-4 h-4" />
            <span>CONFIGURE {currentCampaign.name.toUpperCase()}</span>
          </div>

          {selectedCampaign === 'regional' && (
            <div className="space-y-2">
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Target Markets</label>
                <input
                  type="text"
                  defaultValue="Dallas, Houston, Austin"
                  className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm"
                />
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Brand Partner</label>
                <input
                  type="text"
                  defaultValue="Smokey's BBQ"
                  className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm"
                />
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Campaign Message</label>
                <input
                  type="text"
                  defaultValue="Championship BBQ flavor, local pride"
                  className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm"
                />
              </div>
            </div>
          )}

          {selectedCampaign === 'personalized' && (
            <div className="space-y-2">
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Recipient Segment</label>
                <select className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm">
                  <option>Premium Fans (Birthdays)</option>
                  <option>Season Ticket Holders</option>
                  <option>Top Engagement Fans</option>
                  <option>VIP Members</option>
                </select>
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Message Tone</label>
                <select className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm">
                  <option>Personal & Grateful</option>
                  <option>Celebratory</option>
                  <option>Inspirational</option>
                  <option>Humble & Authentic</option>
                </select>
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Quantity to Generate</label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm"
                />
              </div>
            </div>
          )}

          {selectedCampaign === 'seasonal' && (
            <div className="space-y-2">
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Occasion</label>
                <select className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm">
                  <option>Thanksgiving</option>
                  <option>Christmas</option>
                  <option>New Year</option>
                  <option>Draft Day</option>
                  <option>Championship</option>
                  <option>Season Opener</option>
                </select>
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Target Platforms</label>
                <div className="flex gap-2 flex-wrap">
                  {['Instagram', 'Twitter', 'TikTok', 'Facebook'].map(platform => (
                    <label key={platform} className="flex items-center gap-2 text-white/70 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      {platform}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white/70 font-terminal text-xs mb-2">Content Style</label>
                <select className="w-full bg-black/40 border border-white/20 text-white px-3 py-1 rounded font-terminal text-sm">
                  <option>Heartfelt & Personal</option>
                  <option>High Energy Celebration</option>
                  <option>Reflective & Grateful</option>
                  <option>Hype & Motivation</option>
                </select>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-2.5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-terminal rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>GENERATING CONTENT...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>GENERATE CAMPAIGN CONTENT</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Generated Results */}
      {showResults && currentOutputs && (
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-lg p-3 animate-fade-in">
          <div className="flex items-center gap-2 text-orange-400 font-terminal text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>GENERATED CONTENT ({currentOutputs.length} VARIATIONS)</span>
          </div>

          <div className="space-y-2">
            {selectedCampaign === 'regional' && currentOutputs.map((output: any, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-orange-400 font-bold text-sm">{output.market}</div>
                </div>

                {/* Video Player */}
                {output.videoUrl && (
                  <div className="mb-3">
                    <video
                      className="w-full aspect-video rounded-lg bg-black"
                      src={output.videoUrl}
                      poster={`${output.videoUrl}#t=0.1`}
                      controls
                      preload="metadata"
                      playsInline
                    />
                  </div>
                )}

                <div className="text-white/80 text-sm leading-snug mb-3 font-terminal">
                  "{output.script}"
                </div>
                <div className="text-white/50 text-xs font-terminal">
                  {output.visual}
                </div>
              </div>
            ))}

            {selectedCampaign === 'personalized' && currentOutputs.map((output: any, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-orange-400 font-bold text-sm">{output.recipient}</div>
                    <div className="text-white/50 text-xs font-terminal">{output.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/50 font-terminal mb-1">{output.deliveryMethod}</div>
                    <button className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-terminal hover:bg-orange-500/30 transition-colors">
                      <Play className="w-3 h-3" />
                      PREVIEW
                    </button>
                  </div>
                </div>
                <div className="text-white/80 text-sm leading-snug font-terminal">
                  "{output.message}"
                </div>
              </div>
            ))}

            {selectedCampaign === 'seasonal' && currentOutputs.map((output: any, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-orange-400 font-bold text-sm">{output.occasion}</div>
                    <div className="text-white/50 text-xs font-terminal">{output.timing}</div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-terminal hover:bg-orange-500/30 transition-colors">
                    <Play className="w-3 h-3" />
                    PREVIEW
                  </button>
                </div>
                <div className="text-white/80 text-sm leading-snug mb-3 font-terminal">
                  "{output.content}"
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Array.isArray(output.platforms) ? output.platforms.map((platform: string) => (
                    <span key={platform} className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-orange-400 text-xs font-terminal">
                      {platform}
                    </span>
                  )) : (
                    <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-orange-400 text-xs font-terminal">
                      {output.platforms}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2.5">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{currentOutputs.length}</div>
              <div className="text-xs text-white/50 font-terminal">Variations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">45s</div>
              <div className="text-xs text-white/50 font-terminal">Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">$XXXK+</div>
              <div className="text-xs text-white/50 font-terminal">Revenue Potential</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
