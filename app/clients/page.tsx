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
    id: 'zero',
    name: 'Zero Inbox',
    description: 'AI Email Intelligence',
    status: 'Active',
    pages: [
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
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                    {project.status}
                  </span>
                </div>

                {/* Pages List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.pages.map((page, idx) => (
                    <Link
                      key={idx}
                      href={page.path}
                      className="group bg-gray-800/50 border border-gray-700 rounded p-4 hover:border-[#FFD700] transition-all"
                    >
                      <h3 className="text-base font-semibold text-white group-hover:text-[#FFD700] transition-colors mb-2">
                        {page.title}
                      </h3>
                      {page.description && (
                        <p className="text-xs text-gray-400 mb-3">
                          {page.description}
                        </p>
                      )}
                      <div className="flex items-center text-[#FFD700] text-xs font-medium">
                        View
                        <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
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
