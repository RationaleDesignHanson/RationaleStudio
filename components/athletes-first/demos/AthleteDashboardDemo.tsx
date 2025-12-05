'use client';

import React, { useState } from 'react';
import {
  Bell, TrendingUp, ChevronRight, ChevronDown, X, Check,
  DollarSign, Calendar, Shield, Activity,
  Eye, Heart, MessageCircle, AlertCircle,
  Info, Home, Handshake, Video, Settings
} from 'lucide-react';
import { useOrientation } from '@/hooks/useOrientation';
import { AthleteDashboardOnboarding } from '../DemoOnboarding';

// ==================== TYPES ====================

interface Deal {
  id: string;
  brandName: string;
  brandLogo: string; // Color hex for placeholder
  status: 'active' | 'pending' | 'completed';
  monthlyValue: number;
  daysRemaining: number;
  terms: {
    duration: string;
    deliverables: string[];
    paymentSchedule: string;
  };
}

interface Permission {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  category: 'content' | 'likeness' | 'data';
}

interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'tiktok';
  content: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagementScore: number;
}

interface AthleteDashboard {
  athlete: {
    id: string;
    name: string;
    avatarUrl: string;
    notifications: number;
  };
  wallet: {
    balance: number;
    monthlyChange: number;
    trend: 'up' | 'down';
  };
  activeDeals: Deal[];
  permissions: Permission[];
  sentimentScore: {
    score: number;
    socialSentiment: 'positive' | 'neutral' | 'negative';
    complianceFlags: number;
    lastScan: string;
    recentPosts: SocialPost[];
  };
}

// ==================== MOCK DATA ====================

const MOCK_DASHBOARD: AthleteDashboard = {
  athlete: {
    id: 'ath-001',
    name: 'Marcus Johnson',
    avatarUrl: '',
    notifications: 3
  },
  wallet: {
    balance: 127450,
    monthlyChange: 12500,
    trend: 'up'
  },
  activeDeals: [
    {
      id: 'deal-001',
      brandName: 'Nike Training',
      brandLogo: '#FF6C00',
      status: 'active',
      monthlyValue: 3200,
      daysRemaining: 89,
      terms: {
        duration: '12 months',
        deliverables: ['4 social posts/month', '2 video testimonials', '1 regional campaign'],
        paymentSchedule: 'Monthly on 1st'
      }
    },
    {
      id: 'deal-002',
      brandName: 'Gatorade',
      brandLogo: '#FF6600',
      status: 'active',
      monthlyValue: 2800,
      daysRemaining: 124,
      terms: {
        duration: '6 months',
        deliverables: ['3 Instagram stories/month', '1 TikTok/week'],
        paymentSchedule: 'Bi-weekly'
      }
    },
    {
      id: 'deal-003',
      brandName: 'State Farm',
      brandLogo: '#CC0000',
      status: 'pending',
      monthlyValue: 1500,
      daysRemaining: 180,
      terms: {
        duration: '24 months',
        deliverables: ['2 commercials/year', '1 appearance'],
        paymentSchedule: 'Quarterly'
      }
    },
    {
      id: 'deal-004',
      brandName: 'Adidas',
      brandLogo: '#000000',
      status: 'active',
      monthlyValue: 4100,
      daysRemaining: 45,
      terms: {
        duration: '18 months',
        deliverables: ['5 social posts/month', '3 events/year'],
        paymentSchedule: 'Monthly on 15th'
      }
    }
  ],
  permissions: [
    {
      id: 'p1',
      label: 'Regional Campaigns',
      description: 'Allow brands to use your likeness in regional marketing campaigns',
      enabled: true,
      category: 'likeness'
    },
    {
      id: 'p2',
      label: 'Social Media Posts',
      description: 'Generate AI content for your social media channels',
      enabled: true,
      category: 'content'
    },
    {
      id: 'p3',
      label: 'Voice Generation',
      description: 'Use your voice in AI-generated audio content',
      enabled: false,
      category: 'likeness'
    },
    {
      id: 'p4',
      label: '3D Avatar Use',
      description: 'Create and use 3D avatars for video game integrations',
      enabled: true,
      category: 'likeness'
    }
  ],
  sentimentScore: {
    score: 94,
    socialSentiment: 'positive',
    complianceFlags: 0,
    lastScan: '2 hours ago',
    recentPosts: [
      {
        id: 'post-1',
        platform: 'twitter',
        content: 'Great practice today! Ready for Saturday 💪',
        timestamp: '2 hours ago',
        sentiment: 'positive',
        engagementScore: 8.5
      },
      {
        id: 'post-2',
        platform: 'instagram',
        content: 'Blessed to partner with @nike #sponsored',
        timestamp: '1 day ago',
        sentiment: 'positive',
        engagementScore: 9.2
      },
      {
        id: 'post-3',
        platform: 'tiktok',
        content: 'Pre-game routine 🏈',
        timestamp: '2 days ago',
        sentiment: 'neutral',
        engagementScore: 7.8
      }
    ]
  }
};

// ==================== COMPONENT ====================

export default function AthleteDashboardDemo() {
  const { deviceType, width } = useOrientation();
  const isMobile = deviceType === 'mobile' || width < 480;
  const [dashboard] = useState<AthleteDashboard>(MOCK_DASHBOARD);
  const [expandedDeal, setExpandedDeal] = useState<string | null>(null);
  const [showSentimentDetails, setShowSentimentDetails] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [permissions, setPermissions] = useState(MOCK_DASHBOARD.permissions);
  const [showToast, setShowToast] = useState(false);
  // Collapsible sections state (only used on mobile)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    wallet: false,
    deals: false,
    permissions: false,
    safety: false
  });

  const toggleSection = (section: string) => {
    if (isMobile) {
      setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
    }
  };

  const handleTogglePermission = (id: string) => {
    setPermissions(permissions.map(p =>
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getStatusColor = (status: Deal['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Check className="w-3 h-3 text-green-400" />;
      case 'negative': return <AlertCircle className="w-3 h-3 text-red-400" />;
      default: return <Info className="w-3 h-3 text-gray-400" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    const iconClass = "w-3 h-3";
    switch (platform) {
      case 'twitter': return <MessageCircle className={iconClass} />;
      case 'instagram': return <Eye className={iconClass} />;
      case 'tiktok': return <Video className={iconClass} />;
      default: return <MessageCircle className={iconClass} />;
    }
  };

  return (
    <>
      <AthleteDashboardOnboarding />
      <div className="w-full max-w-md mx-auto relative">
        {/* Toast Notification */}
        {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top">
          ✓ Permissions updated
        </div>
      )}

      {!isMobile ? (
        /* Desktop/Tablet: Show phone mockup frame */
        <div className="bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl border-8 border-gray-800">
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 rounded-[2rem] overflow-hidden">
            <DashboardContent
              dashboard={dashboard}
              expandedDeal={expandedDeal}
              setExpandedDeal={setExpandedDeal}
              showSentimentDetails={showSentimentDetails}
              setShowSentimentDetails={setShowSentimentDetails}
              showTransactions={showTransactions}
              setShowTransactions={setShowTransactions}
              permissions={permissions}
              handleTogglePermission={handleTogglePermission}
              getStatusColor={getStatusColor}
              getSentimentIcon={getSentimentIcon}
              getPlatformIcon={getPlatformIcon}
              isMobile={isMobile}
              collapsedSections={collapsedSections}
              toggleSection={toggleSection}
            />
          </div>
        </div>
      ) : (
        /* Mobile: Full-width, no mockup */
        <div className="w-full bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
          <DashboardContent
            dashboard={dashboard}
            expandedDeal={expandedDeal}
            setExpandedDeal={setExpandedDeal}
            showSentimentDetails={showSentimentDetails}
            setShowSentimentDetails={setShowSentimentDetails}
            showTransactions={showTransactions}
            setShowTransactions={setShowTransactions}
            permissions={permissions}
            handleTogglePermission={handleTogglePermission}
            getStatusColor={getStatusColor}
            getSentimentIcon={getSentimentIcon}
            getPlatformIcon={getPlatformIcon}
            isMobile={isMobile}
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
          />
        </div>
      )}
      </div>
    </>
  );
}

// Dashboard Content Component (extracted for reuse)
function DashboardContent({
  dashboard,
  expandedDeal,
  setExpandedDeal,
  showSentimentDetails,
  setShowSentimentDetails,
  showTransactions,
  setShowTransactions,
  permissions,
  handleTogglePermission,
  getStatusColor,
  getSentimentIcon,
  getPlatformIcon,
  isMobile,
  collapsedSections,
  toggleSection
}: {
  dashboard: AthleteDashboard;
  expandedDeal: string | null;
  setExpandedDeal: (id: string | null) => void;
  showSentimentDetails: boolean;
  setShowSentimentDetails: (show: boolean) => void;
  showTransactions: boolean;
  setShowTransactions: (show: boolean) => void;
  permissions: Permission[];
  handleTogglePermission: (id: string) => void;
  getStatusColor: (status: Deal['status']) => string;
  getSentimentIcon: (sentiment: string) => React.JSX.Element;
  getPlatformIcon: (platform: string) => React.JSX.Element;
  isMobile: boolean;
  collapsedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}) {
  return (
    <>
      {/* Status Bar */}
      <div className="bg-black/50 backdrop-blur-sm px-6 py-3 flex justify-between items-center text-xs text-white/80">
            <span className="font-medium">9:41 AM</span>
            <div className="flex gap-1.5 items-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-2.5 bg-white/80 rounded-full"></div>
                <div className="w-0.5 h-3 bg-white/80 rounded-full"></div>
                <div className="w-0.5 h-3.5 bg-white/80 rounded-full"></div>
                <div className="w-0.5 h-4 bg-white/60 rounded-full"></div>
              </div>
              <div className="w-5 h-3 border-2 border-white/80 rounded-sm relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-0.5 w-0.5 h-1.5 bg-white/80 rounded-r-sm"></div>
              </div>
            </div>
          </div>

        {/* Main Content */}
        <div className="px-5 py-4 space-y-5 max-h-[600px] md:max-h-none overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {dashboard.athlete.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{dashboard.athlete.name}</div>
                  <div className="text-xs text-white/60">Athlete Portal</div>
                </div>
              </div>
              <div className="relative">
                <Bell className="w-5 h-5 text-white/80" />
                {dashboard.athlete.notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {dashboard.athlete.notifications}
                  </div>
                )}
              </div>
            </div>

            {/* Wallet Card */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">Available Balance</span>
                <DollarSign className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white">
                ${dashboard.wallet.balance.toLocaleString()}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>+${dashboard.wallet.monthlyChange.toLocaleString()} this month</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowTransactions(!showTransactions)}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => setShowTransactions(!showTransactions)}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Transactions
                </button>
              </div>
            </div>

            {/* Transactions Modal */}
            {showTransactions && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 rounded-2xl p-5 max-w-sm w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    <button
                      onClick={() => setShowTransactions(false)}
                      className="p-3 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                      aria-label="Close transactions"
                    >
                      <X className="w-5 h-5 text-white/60 hover:text-white" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { date: 'Dec 1, 2025', desc: 'Nike Training - Monthly', amount: 3200 },
                      { date: 'Nov 28, 2025', desc: 'Gatorade - Campaign Bonus', amount: 1500 },
                      { date: 'Nov 15, 2025', desc: 'Adidas - Monthly', amount: 4100 },
                      { date: 'Nov 1, 2025', desc: 'Nike Training - Monthly', amount: 3200 },
                      { date: 'Oct 28, 2025', desc: 'Gatorade - Monthly', amount: 2800 }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-sm text-white font-medium">{tx.desc}</div>
                          <div className="text-xs text-white/60">{tx.date}</div>
                        </div>
                        <div className="text-sm text-green-400 font-semibold">
                          +${tx.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Deals */}
            <div>
              <button
                onClick={() => toggleSection('deals')}
                className={`flex items-center justify-between mb-3 w-full ${isMobile ? 'cursor-pointer active:opacity-70' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Active Deals</h3>
                  <span className="text-xs text-white/60">({dashboard.activeDeals.filter(d => d.status === 'active').length})</span>
                </div>
                {isMobile && (
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${collapsedSections.deals ? '' : 'rotate-180'}`}
                  />
                )}
              </button>
              {!collapsedSections.deals && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                {dashboard.activeDeals.map((deal) => (
                  <div key={deal.id}>
                    <button
                      onClick={() => setExpandedDeal(expandedDeal === deal.id ? null : deal.id)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: deal.brandLogo }}
                        >
                          {deal.brandName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-semibold text-white text-sm truncate">{deal.brandName}</div>
                            <ChevronRight
                              className={`w-4 h-4 text-white/60 flex-shrink-0 transition-transform ${
                                expandedDeal === deal.id ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusColor(deal.status)}`}>
                              {deal.status.toUpperCase()}
                            </span>
                            <span className="text-xs text-white/60">${deal.monthlyValue.toLocaleString()}/mo</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-xs text-white/60">
                            <Calendar className="w-3 h-3" />
                            <span>{deal.daysRemaining} days remaining</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Deal Details */}
                    {expandedDeal === deal.id && (
                      <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 animate-in slide-in-from-top">
                        <div>
                          <div className="text-xs font-semibold text-white/80 mb-1">Contract Terms</div>
                          <div className="text-xs text-white/60">Duration: {deal.terms.duration}</div>
                          <div className="text-xs text-white/60">Payment: {deal.terms.paymentSchedule}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white/80 mb-1">Deliverables</div>
                          <ul className="space-y-1">
                            {deal.terms.deliverables.map((item, i) => (
                              <li key={i} className="text-xs text-white/60 flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-colors">
                          View Full Contract
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              )}
            </div>

            {/* Consent Manager */}
            <div>
              <button
                onClick={() => toggleSection('permissions')}
                className={`flex items-center justify-between mb-3 w-full ${isMobile ? 'cursor-pointer active:opacity-70' : 'cursor-default'}`}
              >
                <h3 className="text-sm font-bold text-white">Content Permissions</h3>
                {isMobile && (
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${collapsedSections.permissions ? '' : 'rotate-180'}`}
                  />
                )}
              </button>
              {!collapsedSections.permissions && (
                <div className="space-y-2">
                  {permissions.map((permission) => (
                  <div key={permission.id} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-white font-medium">{permission.label}</span>
                        <div className="group relative">
                          <Info className="w-3 h-3 text-white/40 hover:text-white/60 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs rounded-lg p-2 w-48 z-10">
                            {permission.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTogglePermission(permission.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          permission.enabled ? 'bg-green-500' : 'bg-white/20'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            permission.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="text-xs text-white/60">{permission.category}</div>
                  </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Safety Score */}
            <div>
              <button
                onClick={() => toggleSection('safety')}
                className={`flex items-center justify-between mb-3 w-full ${isMobile ? 'cursor-pointer active:opacity-70' : 'cursor-default'}`}
              >
                <h3 className="text-sm font-bold text-white">Brand Safety Score</h3>
                {isMobile && (
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${collapsedSections.safety ? '' : 'rotate-180'}`}
                  />
                )}
              </button>
              {!collapsedSections.safety && (
                <>
                  <button
                    onClick={() => setShowSentimentDetails(!showSentimentDetails)}
                className="w-full p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-white/10"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - dashboard.sentimentScore.score / 100)}`}
                          className="text-green-400 transition-all duration-1000"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white">{dashboard.sentimentScore.score}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-green-400">Excellent</div>
                      <div className="text-xs text-white/60">Brand Safety Score</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-white/60 transition-transform ${showSentimentDetails ? 'rotate-90' : ''}`} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-white/80">Social: Positive</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-white/80">No Flags</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs col-span-2">
                    <Activity className="w-3 h-3 text-white/60" />
                    <span className="text-white/60">Last scan: {dashboard.sentimentScore.lastScan}</span>
                  </div>
                </div>
              </button>

              {/* Sentiment Details Modal */}
              {showSentimentDetails && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-slate-900 rounded-2xl p-5 max-w-sm w-full space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Sentiment Report</h3>
                      <button
                        onClick={() => setShowSentimentDetails(false)}
                        className="p-3 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                        aria-label="Close sentiment report"
                      >
                        <X className="w-5 h-5 text-white/60 hover:text-white" />
                      </button>
                    </div>

                    <div className="text-center py-4">
                      <div className="text-4xl font-bold text-green-400 mb-1">{dashboard.sentimentScore.score}/100</div>
                      <div className="text-sm text-white/60">Brand Safety Score</div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Recent Posts Analyzed</h4>
                      <div className="space-y-2">
                        {dashboard.sentimentScore.recentPosts.map((post) => (
                          <div key={post.id} className="p-3 bg-white/5 rounded-lg space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getPlatformIcon(post.platform)}
                                <span className="text-xs text-white/60 capitalize">{post.platform}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {getSentimentIcon(post.sentiment)}
                                <span className="text-xs text-white/60 capitalize">{post.sentiment}</span>
                              </div>
                            </div>
                            <p className="text-sm text-white/80">{post.content}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white/60">{post.timestamp}</span>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Heart className="w-3 h-3 text-pink-400" />
                                  <span className="text-white/60">{post.engagementScore.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowSentimentDetails(false)}
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
                </>
              )}
            </div>

          {/* Bottom Navigation */}
          <div className="sticky bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-lg border-t border-white/10 -mx-5 px-5 py-3">
            <div className="flex items-center justify-around">
              {[
                { icon: Home, label: 'Home', active: true },
                { icon: Handshake, label: 'Deals', active: false },
                { icon: Video, label: 'Content', active: false },
                { icon: Settings, label: 'Settings', active: false }
              ].map((tab, i) => (
                <button
                  key={i}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    tab.active ? 'text-cyan-400' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
