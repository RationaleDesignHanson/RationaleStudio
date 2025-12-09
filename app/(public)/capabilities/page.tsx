/**
 * Capabilities Showcase Page
 *
 * Demonstrates technical expertise, AI capabilities, and platform experience
 * Positioned as proof of execution depth
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import {
  Brain,
  Code,
  Smartphone,
  Database,
  Zap,
  Shield,
  Globe,
  Cpu,
  Layout,
  Terminal,
  Cloud,
  GitBranch,
} from 'lucide-react';

interface Capability {
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<{ className?: string }>;
  examples: string[];
}

const capabilities: Capability[] = [
  {
    id: 'ai-ml',
    category: 'AI & Machine Learning',
    title: 'LLM Integration & Fine-tuning',
    description: 'Production-grade AI systems with custom models, RAG pipelines, and intelligent automation',
    technologies: ['OpenAI GPT-4', 'Claude', 'Custom Fine-tuning', 'Vector DBs', 'LangChain'],
    icon: Brain,
    examples: [
      'Email classification with 95%+ accuracy',
      'Document analysis and extraction',
      'Conversational interfaces',
      'Intelligent workflow automation'
    ]
  },
  {
    id: 'fullstack',
    category: 'Full-Stack Development',
    title: 'Modern Web Applications',
    description: 'Fast, scalable web apps with modern frameworks and best practices',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Server Components'],
    icon: Code,
    examples: [
      'Real-time dashboards',
      'SaaS platforms',
      'Admin portals',
      'Multi-tenant systems'
    ]
  },
  {
    id: 'mobile',
    category: 'Mobile Development',
    title: 'Native & Cross-Platform',
    description: 'iOS, Android, and cross-platform apps with native performance',
    technologies: ['React Native', 'Swift', 'Kotlin', 'Expo', 'App Store deployment'],
    icon: Smartphone,
    examples: [
      'Consumer productivity apps',
      'Enterprise mobile solutions',
      'Offline-first architecture',
      'Push notifications & sync'
    ]
  },
  {
    id: 'data',
    category: 'Data & Analytics',
    title: 'Data Intelligence Platforms',
    description: 'Complex data pipelines, analytics dashboards, and business intelligence',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'BigQuery', 'Pandas', 'D3.js'],
    icon: Database,
    examples: [
      'Real-time analytics dashboards',
      'Data aggregation pipelines',
      'Predictive modeling',
      'Custom reporting systems'
    ]
  },
  {
    id: 'api',
    category: 'API & Backend',
    title: 'Scalable API Architecture',
    description: 'RESTful and GraphQL APIs designed for scale and reliability',
    technologies: ['Node.js', 'Express', 'tRPC', 'GraphQL', 'API Gateway', 'Rate limiting'],
    icon: Zap,
    examples: [
      'Multi-service architectures',
      'Webhook integrations',
      'Third-party API orchestration',
      'Real-time data sync'
    ]
  },
  {
    id: 'auth',
    category: 'Authentication & Security',
    title: 'Enterprise-Grade Security',
    description: 'Secure authentication, authorization, and compliance infrastructure',
    technologies: ['Firebase Auth', 'JWT', 'OAuth', 'RBAC', 'Encryption', 'SOC 2 compliance'],
    icon: Shield,
    examples: [
      'Multi-factor authentication',
      'Role-based access control',
      'Session management',
      'Audit logging'
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Infrastructure',
    title: 'Cloud-Native Deployment',
    description: 'Automated CI/CD, monitoring, and cloud infrastructure management',
    technologies: ['Vercel', 'Netlify', 'AWS', 'Docker', 'GitHub Actions', 'Monitoring'],
    icon: Cloud,
    examples: [
      'Zero-downtime deployments',
      'Auto-scaling infrastructure',
      'Performance monitoring',
      'Disaster recovery'
    ]
  },
  {
    id: 'integration',
    category: 'Systems Integration',
    title: 'Third-Party Integrations',
    description: 'Seamless connections to external platforms and services',
    technologies: ['Stripe', 'Twilio', 'SendGrid', 'Zapier', 'REST/GraphQL APIs'],
    icon: Globe,
    examples: [
      'Payment processing',
      'Email & SMS automation',
      'CRM synchronization',
      'Workflow automation'
    ]
  },
  {
    id: 'spatial',
    category: 'Spatial Computing',
    title: 'AR/VR Experiences',
    description: 'Augmented and virtual reality applications for immersive experiences',
    technologies: ['Vision Pro', 'Unity', 'ARKit', 'WebXR', 'Spatial audio'],
    icon: Cpu,
    examples: [
      'Vision Pro applications',
      'AR product visualization',
      'Spatial collaboration tools',
      'Immersive training'
    ]
  },
  {
    id: 'design',
    category: 'Product Design',
    title: 'User Experience Design',
    description: 'User-centered design from research to high-fidelity prototypes',
    technologies: ['Figma', 'User research', 'Prototyping', 'Design systems', 'A/B testing'],
    icon: Layout,
    examples: [
      'User flow optimization',
      'Interactive prototypes',
      'Design system creation',
      'Usability testing'
    ]
  },
  {
    id: 'automation',
    category: 'Process Automation',
    title: 'Workflow Automation',
    description: 'Custom automation solutions for repetitive tasks and complex workflows',
    technologies: ['Python', 'Node.js', 'Zapier', 'Make', 'Custom scripts'],
    icon: Terminal,
    examples: [
      'Data entry automation',
      'Report generation',
      'Email workflows',
      'Document processing'
    ]
  },
  {
    id: 'testing',
    category: 'Quality Assurance',
    title: 'Testing & QA',
    description: 'Comprehensive testing strategies for reliability and performance',
    technologies: ['Jest', 'Playwright', 'Cypress', 'Load testing', 'Error tracking'],
    icon: GitBranch,
    examples: [
      'Unit & integration tests',
      'End-to-end testing',
      'Performance benchmarking',
      'Error monitoring'
    ]
  },
];

export default function CapabilitiesPage() {
  const categories = Array.from(new Set(capabilities.map(c => c.category)));

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Technical Capabilities
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Full-stack expertise across AI, web, mobile, data, and infrastructure.
            Built through years of shipping products at Meta and as an independent studio.
          </p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <GlassCard
                  key={capability.id}
                  className="p-6"
                  borderRadius="0.75rem"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-terminal-gold/10 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-terminal-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-terminal-gold font-medium mb-1 uppercase tracking-wide">
                        {capability.category}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {capability.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    {capability.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {capability.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-2">
                      Examples
                    </h4>
                    <ul className="space-y-1">
                      {capability.examples.map((example, idx) => (
                        <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-terminal-gold mt-1">→</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Stats */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900/30">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Proven Experience
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-terminal-gold mb-2">7+</div>
              <div className="text-sm text-gray-400">Years AR/AI</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-terminal-gold mb-2">15+</div>
              <div className="text-sm text-gray-400">Patents Filed</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-terminal-gold mb-2">3</div>
              <div className="text-sm text-gray-400">Products Shipped (2024)</div>
            </div>
            <div className="text-center p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-terminal-gold mb-2">Meta</div>
              <div className="text-sm text-gray-400">Background</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How We Apply These Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-6 text-center" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-terminal-gold mb-3">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Understand</h3>
              <p className="text-sm text-gray-400">
                Deep dive into your problem space, users, and technical constraints
              </p>
            </GlassCard>
            <GlassCard className="p-6 text-center" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-terminal-gold mb-3">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Prototype</h3>
              <p className="text-sm text-gray-400">
                Rapid prototypes to validate assumptions before committing to production
              </p>
            </GlassCard>
            <GlassCard className="p-6 text-center" borderRadius="0.75rem">
              <div className="text-4xl font-bold text-terminal-gold mb-3">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Ship</h3>
              <p className="text-sm text-gray-400">
                Production-ready code with testing, monitoring, and documentation
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need these capabilities for your project?</h2>
          <p className="text-gray-300 mb-8">
            We take on select partnerships where our technical expertise can create outsized impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Discuss Your Project
            </Link>
            <Link
              href="/work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-terminal-gold text-white font-semibold transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
