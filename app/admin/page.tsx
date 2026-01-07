/**
 * Admin Landing Page
 *
 * Admin portal overview with links to admin tools and dashboards.
 * Access restricted to owner role only.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { GlassCard } from '@/components/visual';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AdminPage() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  // Check authentication and role
  useEffect(() => {
    if (!loading) {
      if (!profile) {
        // Not authenticated, redirect to login
        router.push('/clients/login?redirect=/admin');
      } else if (profile.role !== 'owner') {
        // Not authorized, redirect to home
        router.push('/');
      }
    }
  }, [profile, loading, router]);

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-12">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-terminal-gold">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-lg">
              Internal tools and dashboards for managing Rationale operations
            </p>
          </div>

          {/* Admin Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Beta Signups */}
            <Link href="/admin/beta-signups" className="group">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-all">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-terminal-gold transition-colors">
                  Beta Signups
                </h3>
                <p className="text-sm text-gray-400">
                  View and manage Zero Inbox beta signups and waitlist
                </p>
              </GlassCard>
            </Link>

            {/* Recipe Scrape Failures */}
            <Link href="/admin/recipe-failures" className="group">
              <GlassCard className="p-6 h-full hover:scale-[1.02] transition-all">
                <div className="text-3xl mb-4">🍳</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-terminal-gold transition-colors">
                  Recipe Failures
                </h3>
                <p className="text-sm text-gray-400">
                  View failed recipe scrapes from Heirloom Shopping Lab
                </p>
              </GlassCard>
            </Link>

            {/* User Management */}
            <div className="opacity-50 cursor-not-allowed">
              <GlassCard className="p-6 h-full">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  User Management
                </h3>
                <p className="text-sm text-gray-400">
                  Manage users, roles, and permissions
                </p>
                <span className="mt-2 inline-block text-xs text-amber-400">Coming Soon</span>
              </GlassCard>
            </div>

            {/* Analytics */}
            <div className="opacity-50 cursor-not-allowed">
              <GlassCard className="p-6 h-full">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-sm text-gray-400">
                  Site metrics, visitor analytics, and conversion tracking
                </p>
                <span className="mt-2 inline-block text-xs text-amber-400">Coming Soon</span>
              </GlassCard>
            </div>

            {/* Client Portal Management */}
            <div className="opacity-50 cursor-not-allowed">
              <GlassCard className="p-6 h-full">
                <div className="text-3xl mb-4">🔐</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Client Portals
                </h3>
                <p className="text-sm text-gray-400">
                  Manage client accounts and portal access
                </p>
                <span className="mt-2 inline-block text-xs text-amber-400">Coming Soon</span>
              </GlassCard>
            </div>

            {/* Content Management */}
            <div className="opacity-50 cursor-not-allowed">
              <GlassCard className="p-6 h-full">
                <div className="text-3xl mb-4">📄</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Content Management
                </h3>
                <p className="text-sm text-gray-400">
                  Edit case studies, blog posts, and site content
                </p>
                <span className="mt-2 inline-block text-xs text-amber-400">Coming Soon</span>
              </GlassCard>
            </div>

            {/* System Settings */}
            <div className="opacity-50 cursor-not-allowed">
              <GlassCard className="p-6 h-full">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  System Settings
                </h3>
                <p className="text-sm text-gray-400">
                  Configure site settings, integrations, and environment variables
                </p>
                <span className="mt-2 inline-block text-xs text-amber-400">Coming Soon</span>
              </GlassCard>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Link href="/investors" className="text-gray-400 hover:text-terminal-gold transition-colors">
                → Investor Portal
              </Link>
              <Link href="/clients" className="text-gray-400 hover:text-terminal-gold transition-colors">
                → Client Dashboard
              </Link>
              <Link href="/" className="text-gray-400 hover:text-terminal-gold transition-colors">
                → Portfolio Work
              </Link>
              <Link href="/" className="text-gray-400 hover:text-terminal-gold transition-colors">
                → Public Site
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
