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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('client-auth');
    if (!auth) {
      router.push('/clients/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFD700] text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Container>
        <div className="py-20">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#FFD700]">
              Client Portal
            </h1>
            <p className="text-lg text-gray-400">
              Select a project to view presentation materials
            </p>
          </div>

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
                        className="group bg-gray-800/50 border border-gray-700 rounded p-4 hover:border-[#FFD700] transition-all"
                      >
                        <h3 className="text-base font-semibold text-white group-hover:text-[#FFD700] transition-colors mb-2">
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
                        <div className="flex items-center text-[#FFD700] text-xs font-medium">
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
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
            >
              ← Back to Rationale.studio
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem('client-auth');
                router.push('/clients/login');
              }}
              className="px-4 py-2 text-sm border border-gray-700 hover:border-[#FFD700] text-gray-400 hover:text-[#FFD700] transition-colors rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
