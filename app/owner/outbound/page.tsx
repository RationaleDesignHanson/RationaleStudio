/**
 * Owner Outbound Dashboard
 *
 * Manage pitch access links, track analytics, and control pitch security
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';
import {
  Plus,
  Link2,
  Clock,
  Eye,
  ShieldCheck,
  ShieldAlert,
  Copy,
  ExternalLink,
  MoreVertical,
  Trash2,
  RefreshCw,
  BarChart3,
} from 'lucide-react';

interface PitchAccess {
  pitchId: string;
  companySlug: string;
  token: string;
  username: string | null;
  expiresAt: Date;
  createdAt: Date;
  isRevoked: boolean;
  viewCount: number;
  lastViewedAt: Date | null;
  metadata: {
    recipientName?: string;
    recipientEmail?: string;
    recipientCompany?: string;
    notes?: string;
  };
}

export default function OutboundDashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState<string | null>(null);

  // Mock data - will be replaced with actual Firestore data
  const pitches: PitchAccess[] = [
    {
      pitchId: '1',
      companySlug: 'gannett',
      token: 'abc123...',
      username: 'jsmith',
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRevoked: false,
      viewCount: 12,
      lastViewedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      metadata: {
        recipientName: 'John Smith',
        recipientEmail: 'jsmith@gannett.com',
        recipientCompany: 'Gannett',
        notes: 'Initial outreach for AI integration partnership',
      },
    },
  ];

  const activePitches = pitches.filter((p) => !p.isRevoked && new Date(p.expiresAt) > new Date());
  const expiredPitches = pitches.filter((p) => new Date(p.expiresAt) <= new Date());
  const revokedPitches = pitches.filter((p) => p.isRevoked);

  function copyPitchLink(companySlug: string, token: string, username: string | null) {
    const baseUrl = window.location.origin;
    const usernameParam = username ? `&username=${encodeURIComponent(username)}` : '';
    const url = `${baseUrl}/pitch/${companySlug}?token=${token}${usernameParam}`;

    navigator.clipboard.writeText(url);
    // Show toast notification (implement later)
    alert('Pitch link copied to clipboard!');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/owner"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
            >
              ← Back to Owner Dashboard
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Outbound Pitches
                </h1>
                <p className="text-lg text-gray-400">
                  Manage secure pitch presentations and track engagement
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Pitch
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Active Pitches</p>
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white">{activePitches.length}</p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Total Views</p>
                <Eye className="w-5 h-5 text-terminal-gold" />
              </div>
              <p className="text-3xl font-bold text-white">
                {pitches.reduce((sum, p) => sum + p.viewCount, 0)}
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Expired</p>
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-3xl font-bold text-white">{expiredPitches.length}</p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Revoked</p>
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-3xl font-bold text-white">{revokedPitches.length}</p>
            </div>
          </div>

          {/* Pitches List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Active Pitches</h2>

            {activePitches.length === 0 ? (
              <div className="p-12 bg-gray-900/30 border border-gray-800 rounded-lg text-center">
                <Link2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Active Pitches</h3>
                <p className="text-gray-400 mb-6">
                  Create your first pitch to start sharing secure presentations
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Pitch
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activePitches.map((pitch) => (
                  <PitchCard
                    key={pitch.pitchId}
                    pitch={pitch}
                    onCopyLink={copyPitchLink}
                    onRevoke={(id) => console.log('Revoke', id)}
                    onExtend={(id) => console.log('Extend', id)}
                    onViewAnalytics={(id) => console.log('Analytics', id)}
                  />
                ))}
              </div>
            )}

            {/* Expired Pitches */}
            {expiredPitches.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-white mt-12">Expired Pitches</h2>
                <div className="space-y-4">
                  {expiredPitches.map((pitch) => (
                    <PitchCard
                      key={pitch.pitchId}
                      pitch={pitch}
                      onCopyLink={copyPitchLink}
                      onRevoke={(id) => console.log('Revoke', id)}
                      onExtend={(id) => console.log('Extend', id)}
                      onViewAnalytics={(id) => console.log('Analytics', id)}
                      expired
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Create Pitch Modal - Placeholder */}
      {showCreateModal && (
        <CreatePitchModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

interface PitchCardProps {
  pitch: PitchAccess;
  onCopyLink: (companySlug: string, token: string, username: string | null) => void;
  onRevoke: (pitchId: string) => void;
  onExtend: (pitchId: string) => void;
  onViewAnalytics: (pitchId: string) => void;
  expired?: boolean;
}

function PitchCard({ pitch, onCopyLink, onRevoke, onExtend, onViewAnalytics, expired }: PitchCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const daysUntilExpiry = Math.ceil(
    (new Date(pitch.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white capitalize">
              {pitch.companySlug}
            </h3>
            {expired ? (
              <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-medium rounded">
                Expired
              </span>
            ) : (
              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium rounded">
                Active
              </span>
            )}
          </div>

          {pitch.metadata.recipientName && (
            <p className="text-sm text-gray-400 mb-1">
              To: <span className="text-white">{pitch.metadata.recipientName}</span>
              {pitch.metadata.recipientCompany && (
                <span className="text-gray-500"> @ {pitch.metadata.recipientCompany}</span>
              )}
            </p>
          )}

          {pitch.metadata.recipientEmail && (
            <p className="text-sm text-gray-500 mb-3">{pitch.metadata.recipientEmail}</p>
          )}

          {pitch.metadata.notes && (
            <p className="text-sm text-gray-400 italic mb-3">{pitch.metadata.notes}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{pitch.viewCount} views</span>
            </div>
            {!expired && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{daysUntilExpiry} days left</span>
              </div>
            )}
            {pitch.username && (
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Username: {pitch.username}</span>
              </div>
            )}
            {pitch.lastViewedAt && (
              <span>
                Last viewed: {new Date(pitch.lastViewedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onViewAnalytics(pitch.pitchId);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </button>
              {expired ? (
                <button
                  onClick={() => {
                    onExtend(pitch.pitchId);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Extend Access
                </button>
              ) : (
                <button
                  onClick={() => {
                    onRevoke(pitch.pitchId);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Revoke Access
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onCopyLink(pitch.companySlug, pitch.token, pitch.username)}
          className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </button>
        <Link
          href={`/pitch/${pitch.companySlug}?token=${pitch.token}${pitch.username ? `&username=${pitch.username}` : ''}`}
          target="_blank"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Preview
        </Link>
      </div>
    </div>
  );
}

function CreatePitchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-gray-900 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Pitch</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company/Prospect Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="e.g., gannett, microsoft, apple"
            />
            <p className="text-xs text-gray-500 mt-1">
              Will be used in URL: /pitch/[company-name]
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Leave empty for no username gate"
            />
            <p className="text-xs text-gray-500 mt-1">
              If set, recipient will need to enter this username to access the pitch
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expiry (Days)
            </label>
            <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              rows={3}
              placeholder="Internal notes about this pitch..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
            >
              Create Pitch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
