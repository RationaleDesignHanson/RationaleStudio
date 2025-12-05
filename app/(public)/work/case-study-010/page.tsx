/**
 * Case Study 010: Commercial Real Estate AI Platform
 *
 * Password-protected case study for enterprise B2B platform
 * Password: 123456
 * Robots: noindex
 */

'use client';

import { PasswordProtected } from '@/components/auth/PasswordProtected';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function CaseStudy010Page() {
  return (
    <PasswordProtected
      password="123456"
      hint="Hint: Six ones, but actually sixes"
    >
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Header */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[#FFD700] hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-accent/20 text-accent border-accent/30 mb-4">
                  Delivered
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  Case Study 010
                </h1>
                <p className="text-xl text-gray-300">
                  Commercial Real Estate Intelligence Platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Project Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Two-sided marketplace connecting commercial real estate sellers with brokers through AI-powered market intelligence. The platform synthesizes timing signals, market data, and relationship context to help brokers prioritize high-probability opportunities.
                </p>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Client Type</div>
                    <div className="text-white font-medium">Enterprise B2B SaaS</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Industry</div>
                    <div className="text-white font-medium">Commercial Real Estate</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Timeline</div>
                    <div className="text-white font-medium">16-week MVP</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Team</div>
                    <div className="text-white font-medium">Full-stack (2 engineers)</div>
                  </div>
                </div>
              </div>

              {/* Right: Key Metrics */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Key Outcomes</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-[#FFD700] mb-1">16 weeks</div>
                    <div className="text-sm text-gray-400">Problem → MVP delivery</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-[#FFD700] mb-1">Full-stack</div>
                    <div className="text-sm text-gray-400">Python backend + React frontend</div>
                  </div>
                  <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-[#FFD700] mb-1">Enterprise</div>
                    <div className="text-sm text-gray-400">Multi-tenant B2B platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The Challenge</h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                CRE brokers were drowning in disconnected systems—CRM, email, spreadsheets, market research tools—with timing-dependent opportunities buried in data overload. They needed to manually gather context before each outreach activity, missing high-probability opportunities due to information fragmentation.
              </p>

              <div className="bg-gray-900/50 border-l-4 border-[#FFD700] p-6 my-8">
                <p className="text-white font-medium mb-2">Jobs to Be Done</p>
                <p className="text-gray-300 italic">
                  "When I start my workday as a CRE broker, I want to immediately understand which opportunities deserve my attention and why, so I can focus my limited time on the highest-probability outreach activities without manually gathering context from multiple systems."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">The Solution</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Core Platform Features
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>Daily Prioritization Dashboard: Ranked opportunities based on timing signals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>Contextual Insight Views: Relationship and asset details consolidated</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>AI-Assisted Outreach: Draft guidance with full human editability</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>Review & Approval Workflow: Lightweight oversight for quality control</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-3">
                  Technical Architecture
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>Python 3.11+ backend with FastAPI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>React/Next.js frontend with Tailwind CSS</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>PostgreSQL + TimescaleDB for time-series data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FFD700] mt-1">→</span>
                    <span>OpenAI GPT-4 + LangChain for AI features</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Core Principles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-white mb-1">Human-in-the-Loop</div>
                  <div className="text-sm text-gray-400">All outputs require explicit validation before execution</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Transparent Data Quality</div>
                  <div className="text-sm text-gray-400">Missing or conflicting data surfaced clearly</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Workflow-Led Design</div>
                  <div className="text-sm text-gray-400">Organized around how brokers actually work</div>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Synthesis Layer</div>
                  <div className="text-sm text-gray-400">Sits atop existing systems rather than replacing them</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { category: 'Backend', items: ['Python 3.11+', 'FastAPI', 'PostgreSQL', 'TimescaleDB'] },
                { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
                { category: 'AI/ML', items: ['OpenAI GPT-4', 'LangChain', 'Vector Search', 'RAG Pipeline'] },
                { category: 'Infrastructure', items: ['Docker', 'AWS', 'Redis', 'Celery'] },
                { category: 'Data', items: ['CSV Import', 'API Integration', 'Real-time Sync', 'Time Series'] },
                { category: 'Security', items: ['Multi-tenant', 'Row-level Security', 'OAuth 2.0', 'RBAC'] }
              ].map((stack, idx) => (
                <div key={idx} className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="font-bold text-[#FFD700] mb-2">{stack.category}</div>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {stack.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Impact */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Results & Impact</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">100%</div>
                <div className="text-sm text-gray-400">On-time delivery</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">Multi-tenant</div>
                <div className="text-sm text-gray-400">Enterprise-ready platform</div>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">AI-powered</div>
                <div className="text-sm text-gray-400">GPT-4 intelligence layer</div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4">What We Delivered</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-[#FFD700]">→</span>
                  <span>Production-ready MVP deployed to AWS with full CI/CD pipeline</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFD700]">→</span>
                  <span>Multi-tenant architecture with row-level security and RBAC</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFD700]">→</span>
                  <span>AI-powered opportunity scoring and draft generation using GPT-4</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFD700]">→</span>
                  <span>Real-time data synchronization with time-series analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFD700]">→</span>
                  <span>Comprehensive documentation and knowledge transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Want to build something similar?</h2>
            <p className="text-gray-300 mb-8">
              We specialize in enterprise B2B platforms with AI-powered intelligence layers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
              >
                Book intro call
              </Link>
              <Link
                href="/work"
                className="px-8 py-4 border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
              >
                View more work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PasswordProtected>
  );
}
