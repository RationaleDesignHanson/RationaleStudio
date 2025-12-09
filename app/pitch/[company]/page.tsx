/**
 * Dynamic Pitch Presentation Page
 *
 * Secure, time-limited pitch presentations with username gate and IP tracking
 * URL format: /pitch/[company]?token=xxx&username=yyy
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout';
import { Lock, AlertCircle, CheckCircle, Clock, Eye, Mail } from 'lucide-react';
import Link from 'next/link';
import { GannettPitch } from '@/components/pitches/GannettPitch';
import { CreaitRoadmap } from '@/components/pitches/CreaitRoadmap';

interface PitchValidation {
  valid: boolean;
  error?: string;
  requiresUsername?: boolean;
  access?: {
    companySlug: string;
    expiresAt: Date | string;
    viewCount: number;
    metadata?: {
      recipientName?: string;
      recipientCompany?: string;
    };
  };
}

export default function PitchPage({ params }: { params: { company: string } }) {
  const searchParams = useSearchParams();
  const [validation, setValidation] = useState<PitchValidation | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [showUsernameForm, setShowUsernameForm] = useState(false);

  const token = searchParams.get('token');
  const urlUsername = searchParams.get('username');

  useEffect(() => {
    if (token) {
      validateAccess(urlUsername || '');
    } else {
      setValidation({
        valid: false,
        error: 'Missing access token. Please use the link provided to you.',
      });
      setLoading(false);
    }
  }, [token, urlUsername]);

  async function validateAccess(usernameValue: string) {
    setLoading(true);

    try {
      const response = await fetch('/api/pitch/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companySlug: params.company,
          token,
          username: usernameValue || null,
        }),
      });

      const result = await response.json();
      setValidation(result);

      if (result.requiresUsername && !usernameValue) {
        setShowUsernameForm(true);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setValidation({
        valid: false,
        error: 'Failed to validate access. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleUsernameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim()) {
      validateAccess(username.trim());
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terminal-gold mx-auto mb-6"></div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Validating Access
            </h1>
            <p className="text-gray-400 text-sm">
              Please wait while we verify your credentials...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Username gate
  if (showUsernameForm && !validation?.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-terminal-gold/10 rounded-lg">
                  <Lock className="w-6 h-6 text-terminal-gold" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Username Required</h1>
                  <p className="text-sm text-gray-400">Enter the username provided to you</p>
                </div>
              </div>

              {validation?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-200">{validation.error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleUsernameSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                    placeholder="Enter username"
                    required
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
                >
                  Access Pitch
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Access denied
  if (!validation?.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                  <p className="text-gray-400 mb-4">
                    {validation?.error || 'You do not have permission to view this pitch.'}
                  </p>

                  <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3">Need Access?</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Check that you're using the correct link</li>
                      <li>• Verify the link hasn't expired</li>
                      <li>• Contact the sender for a new access link</li>
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Request New Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Access granted - show pitch content
  const expiresAt = validation.access?.expiresAt
    ? new Date(validation.access.expiresAt)
    : null;

  const daysUntilExpiry = expiresAt
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-8">
          {/* Access Status Banner */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-green-200">
                      Access Granted
                      {validation.access?.metadata?.recipientName && (
                        <span className="ml-2 text-green-300">
                          • Welcome, {validation.access.metadata.recipientName}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-green-300">
                  {daysUntilExpiry !== null && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{daysUntilExpiry} days left</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{validation.access?.viewCount || 0} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pitch Content */}
          <div className="max-w-5xl mx-auto">
            <PitchContent companySlug={params.company} />
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Pitch Content Component
 * Renders company-specific pitch content
 */
function PitchContent({ companySlug }: { companySlug: string }) {
  // Render company-specific pitch if available
  if (companySlug === 'gannett') {
    return <GannettPitch />;
  }

  if (companySlug === 'creait-roadmap') {
    return <CreaitRoadmap />;
  }

  // Default pitch template for other companies
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Rationale Studio Partnership Opportunity
        </h1>
        <p className="text-xl text-gray-400">
          Product Studio Building AI-Powered Ventures
        </p>
      </div>

      {/* Placeholder for pitch content */}
      <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
        <p className="text-gray-400 text-center">
          Pitch content for <span className="text-terminal-gold font-semibold">{companySlug}</span> will be loaded here.
        </p>
        <p className="text-gray-500 text-sm text-center mt-4">
          This is a placeholder. Actual pitch content will be fetched from Firestore or rendered from custom components.
        </p>
      </div>

      {/* Contact CTA */}
      <div className="text-center p-8 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-3">
          Ready to Discuss?
        </h3>
        <p className="text-gray-400 mb-6">
          Schedule a call to explore how we can work together
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Schedule a Call
        </Link>
      </div>
    </div>
  );
}
