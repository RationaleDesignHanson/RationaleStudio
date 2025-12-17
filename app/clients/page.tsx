/**
 * Client Dashboard
 *
 * Landing page after successful login showing all available client projects
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { useAuth } from '@/lib/auth/AuthContext';
import { LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { logger } from '@/lib/utils/logger';

interface ClientPage {
  title: string;
  path: string;
  description?: string;
}

interface ClientProject {
  id: string;
  name: string;
  description: string;
  status: string;
  pages: ClientPage[];
}

const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'archived-site',
    name: 'Archived Site (Redesigned)',
    description: 'Content from rationalewebsitev1.netlify.app redesigned with Terminal Republic aesthetic. Original purple/glassmorphism styling preserved at live Netlify site.',
    status: 'Archive',
    pages: [
      // Main Pages
      {
        title: 'Home',
        path: '/clients/home',
        description: 'Main homepage - Conviction-First Venture Studio'
      },
      {
        title: 'About',
        path: '/clients/about',
        description: 'Philosophy, mental models, frameworks'
      },
      {
        title: 'Services',
        path: '/clients/services',
        description: 'Rationale Kits: Clarity, Prototype, Build Ship Run'
      },
      {
        title: 'How We Work',
        path: '/clients/how-we-work',
        description: 'Engagement models and equity structure'
      },
      {
        title: 'Work',
        path: '/clients/work',
        description: 'Portfolio case studies and client projects'
      },
      {
        title: 'Founder',
        path: '/clients/founder',
        description: 'Matt Hanson - 7 years Meta Reality Labs'
      },
      {
        title: 'Contact',
        path: '/clients/contact',
        description: 'Contact form'
      },
      // Investment Pages (/invest structure)
      {
        title: 'Investment Hub',
        path: '/clients/invest',
        description: 'Investment opportunities overview'
      },
      {
        title: 'Studio Investment',
        path: '/clients/invest/studio',
        description: '$500K SAFE - Dual-engine studio model'
      },
      {
        title: 'Zero Seed Round',
        path: '/clients/invest/zero',
        description: '$600K for 10% - AI email platform'
      },
      {
        title: 'Project Atlas',
        path: '/clients/invest/atlas',
        description: '$165K partnership - CRE intelligence'
      },
      {
        title: 'Project Amplify',
        path: '/clients/invest/amplify',
        description: '$60-250K partnership - NIL platform'
      },
      // Investment Pages (/investment structure - alternate)
      {
        title: 'Investment Portal',
        path: '/clients/investment',
        description: 'Alternative investment overview'
      },
      {
        title: 'Studio Investment (Alt)',
        path: '/clients/investment/studio',
        description: 'Studio investment - alternate view'
      },
      {
        title: 'Zero Investment (Alt)',
        path: '/clients/investment/zero',
        description: 'Zero investment - alternate view'
      },
      // Portfolio & Ventures
      {
        title: 'Ventures',
        path: '/clients/ventures',
        description: 'Portfolio IP: Zero, Atlas, Amplify'
      },
      {
        title: 'Ventures - Project Atlas',
        path: '/clients/ventures/project-atlas',
        description: 'Atlas venture details'
      },
      {
        title: 'Ventures - Project Amplify',
        path: '/clients/ventures/project-amplify',
        description: 'Amplify venture details'
      },
      {
        title: 'Ventures - Zero',
        path: '/clients/ventures/zero',
        description: 'Zero venture details'
      },
      {
        title: 'Zero Product Page',
        path: '/clients/zero',
        description: 'Zero Inbox AI product marketing page'
      },
      {
        title: 'Zero Shader Test',
        path: '/clients/zero/shader-test',
        description: 'Technical demo - ASCII shader'
      },
      // Content
      {
        title: 'Insights',
        path: '/clients/insights',
        description: 'Mental models for the AI era'
      },
      // Investor Materials
      {
        title: 'Investors Overview',
        path: '/clients/investors',
        description: 'Investor information'
      },
      {
        title: 'Investor Deck',
        path: '/clients/investors/deck',
        description: 'Pitch deck materials'
      },
      // Support
      {
        title: 'Dashboard Access',
        path: '/clients/dashboard-access',
        description: 'Portal access management'
      }
    ]
  },
  {
    id: 'rationale-investments',
    name: 'Rationale Investments',
    description: 'Investment Opportunities & Portfolio',
    status: 'Active',
    pages: [
      {
        title: 'Investment Overview',
        path: '/investors',
        description: 'Complete investment opportunities overview'
      },
      {
        title: 'Zero Seed Round',
        path: '/investors/zero',
        description: '$600K for 10% equity - Pre-launch AI platform'
      },
      {
        title: 'Studio Investment',
        path: '/investors/studio',
        description: 'Portfolio exposure with governance rights'
      },
      {
        title: 'Project Atlas',
        path: '/investors/atlas',
        description: 'CRE intelligence platform - $165K partnership'
      },
      {
        title: 'Project Amplify',
        path: '/investors/amplify',
        description: 'NIL platform for sports agents - $60-250K'
      }
    ]
  },
  {
    id: 'zero',
    name: 'Zero Inbox',
    description: 'AI Email Intelligence',
    status: 'Active',
    pages: [
      {
        title: 'Product Dashboard',
        path: '/clients/zero/dashboard',
        description: 'Interactive demos, execution proof, and beta program details'
      },
      {
        title: 'Execution Tracker',
        path: '/clients/zero/tracker',
        description: 'Real-time 24-week roadmap with Firebase sync'
      },
      {
        title: 'Overview',
        path: '/clients/zero/investor',
        description: 'Executive summary and product status'
      },
      {
        title: 'Business Model',
        path: '/clients/zero/investor/business',
        description: 'Market analysis and competitive positioning'
      },
      {
        title: 'Technical Architecture',
        path: '/clients/zero/investor/technical',
        description: 'System overview and AI classification'
      },
      {
        title: 'Roadmap & Milestones',
        path: '/clients/zero/investor/roadmap',
        description: 'Quarterly goals and growth targets'
      }
    ]
  },
  {
    id: 'athletes-first',
    name: 'Athletes First',
    description: 'NIL Platform Strategy',
    status: 'Active',
    pages: [
      {
        title: 'Pitch Deck',
        path: '/clients/athletes-first/pitch-deck',
        description: 'Product vision and platform strategy'
      }
    ]
  },
  {
    id: 'creait',
    name: 'Creait',
    description: 'Commercial Real Estate AI',
    status: 'Active',
    pages: [
      {
        title: 'Pitch Deck Overview',
        path: '/clients/creait/pitch-deck',
        description: 'Main pitch deck landing page'
      },
      {
        title: 'Investor Portal',
        path: '/clients/creait/investor-portal',
        description: 'Detailed investor information'
      },
      {
        title: 'Pitch Presentation',
        path: '/clients/creait/pitch',
        description: 'Full pitch presentation'
      }
    ]
  }
];

export default function ClientDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Check Firebase authentication
    if (!user) {
      router.push('/clients/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/clients/login');
    } catch (error) {
      logger.error('Logout error:', error);
    }
  };

  // Show loading while auth is initializing or checking
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-terminal-gold text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated, return null (redirect is handled in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-bold mb-4 text-terminal-gold">
                Client Portal
              </h1>
              <p className="text-lg text-gray-400">
                Select a project to view presentation materials
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-700 hover:border-terminal-gold text-gray-400 hover:text-terminal-gold transition-colors rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Site Admin Dashboard - Prominent Link */}
          <Link
            href="/owner/site-admin"
            className="block mb-8 p-6 bg-gradient-to-r from-terminal-gold/10 to-terminal-gold/5 border-2 border-terminal-gold/30 hover:border-terminal-gold/60 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-terminal-gold/20 rounded-lg">
                  <LayoutDashboard className="w-6 h-6 text-terminal-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1 group-hover:text-terminal-gold transition-colors">
                    Site Admin Dashboard
                  </h2>
                  <p className="text-sm text-gray-400">
                    View, sort, and manage all site pages • Site map explorer • Delete unused routes
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-terminal-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Project List */}
          <div className="space-y-8">
            {CLIENT_PROJECTS.map((project) => (
              <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {project.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded ${
                      project.status === 'Archive'
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Pages List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.pages.map((page, idx) => {
                    const isExternal = page.path.startsWith('http');
                    const LinkComponent = isExternal ? 'a' : Link;
                    const linkProps = isExternal
                      ? { href: page.path, target: '_blank', rel: 'noopener noreferrer' }
                      : { href: page.path };

                    return (
                      <LinkComponent
                        key={idx}
                        {...linkProps}
                        className="group bg-gray-800/50 border border-gray-700 rounded p-4 hover:border-terminal-gold transition-all"
                      >
                        <h3 className="text-base font-semibold text-white group-hover:text-terminal-gold transition-colors mb-2">
                          {page.title}
                          {isExternal && (
                            <svg className="inline-block w-3 h-3 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </h3>
                        {page.description && (
                          <p className="text-xs text-gray-400 mb-3">
                            {page.description}
                          </p>
                        )}
                        <div className="flex items-center text-terminal-gold text-xs font-medium">
                          {isExternal ? 'Open External' : 'View'}
                          <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </LinkComponent>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors"
            >
              ← Back to Rationale.studio
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-700 hover:border-terminal-gold text-gray-400 hover:text-terminal-gold transition-colors rounded"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
