/**
 * Recipe Scrape Failures Admin Page
 *
 * View and analyze failed recipe scrapes logged to Firebase.
 * Access restricted to owner role only.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { useAuth } from '@/lib/auth/AuthContext';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase-tracker';

interface RecipeFailure {
  id: string;
  url: string;
  error: string;
  timestamp: string;
  userAgent?: string;
}

export default function RecipeFailuresPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();
  const [failures, setFailures] = useState<RecipeFailure[]>([]);
  const [loadingFailures, setLoadingFailures] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication and role
  useEffect(() => {
    if (!loading) {
      if (!profile) {
        router.push('/clients/login?redirect=/admin/recipe-failures');
      } else if (profile.role !== 'owner') {
        router.push('/');
      }
    }
  }, [profile, loading, router]);

  // Fetch failures from Firebase
  useEffect(() => {
    if (profile?.role === 'owner') {
      fetchFailures();
    }
  }, [profile]);

  const fetchFailures = async () => {
    try {
      setLoadingFailures(true);
      setError(null);

      const failuresRef = collection(db, 'recipe_scrape_failures');
      const q = query(failuresRef, orderBy('timestamp', 'desc'), limit(100));
      const querySnapshot = await getDocs(q);

      const failureData: RecipeFailure[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        failureData.push({
          id: doc.id,
          url: data.url || 'Unknown',
          error: data.error || 'No error message',
          timestamp: data.timestamp || new Date().toISOString(),
          userAgent: data.userAgent,
        });
      });

      setFailures(failureData);
    } catch (err) {
      console.error('Error fetching failures:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch failures');
    } finally {
      setLoadingFailures(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-terminal-gold text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render until authenticated and authorized
  if (!profile || profile.role !== 'owner') {
    return null;
  }

  // Group failures by URL
  const failuresByUrl = failures.reduce((acc, failure) => {
    if (!acc[failure.url]) {
      acc[failure.url] = [];
    }
    acc[failure.url].push(failure);
    return acc;
  }, {} as Record<string, RecipeFailure[]>);

  const uniqueUrls = Object.keys(failuresByUrl).length;
  const totalFailures = failures.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
            >
              ← Back to Admin
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-terminal-gold">
              Recipe Scrape Failures
            </h1>
            <p className="text-gray-400">
              Failed recipe URL scrapes logged from Heirloom Shopping Lab
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-white">{totalFailures}</div>
              <div className="text-sm text-gray-400">Total Failures</div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-white">{uniqueUrls}</div>
              <div className="text-sm text-gray-400">Unique URLs</div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-white">
                {uniqueUrls > 0 ? (totalFailures / uniqueUrls).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-gray-400">Avg per URL</div>
            </GlassCard>
          </div>

          {/* Error State */}
          {error && (
            <GlassCard className="p-6 mb-8 border-red-500/30">
              <div className="text-red-400">
                <strong>Error loading failures:</strong> {error}
              </div>
            </GlassCard>
          )}

          {/* Loading State */}
          {loadingFailures && (
            <div className="text-center py-12">
              <div className="text-terminal-gold text-lg">Loading failures...</div>
            </div>
          )}

          {/* Empty State */}
          {!loadingFailures && !error && failures.length === 0 && (
            <GlassCard className="p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">No Failures Yet</h3>
              <p className="text-gray-400">
                All recipe scrapes are working perfectly, or none have been attempted yet.
              </p>
            </GlassCard>
          )}

          {/* Failures List */}
          {!loadingFailures && !error && failures.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Recent Failures (Last 100)</h2>
                <button
                  onClick={fetchFailures}
                  className="px-4 py-2 bg-terminal-gold/10 hover:bg-terminal-gold/20 text-terminal-gold rounded-lg transition-colors text-sm"
                >
                  Refresh
                </button>
              </div>

              {failures.map((failure) => (
                <GlassCard key={failure.id} className="p-6">
                  <div className="flex flex-col gap-3">
                    {/* URL */}
                    <div>
                      <div className="text-xs text-gray-500 mb-1">URL</div>
                      <a
                        href={failure.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm break-all"
                      >
                        {failure.url}
                      </a>
                    </div>

                    {/* Error */}
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Error</div>
                      <div className="text-red-400 text-sm font-mono bg-red-950/30 p-3 rounded">
                        {failure.error}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <div>
                        <span className="font-semibold">Timestamp:</span>{' '}
                        {new Date(failure.timestamp).toLocaleString()}
                      </div>
                      {failure.userAgent && (
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold">User Agent:</span>{' '}
                          <span className="truncate">{failure.userAgent}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}

              {failures.length === 100 && (
                <div className="text-center text-gray-500 text-sm py-4">
                  Showing last 100 failures. Older failures are not displayed.
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
