/**
 * Ready to Build Infographic
 * Shows three paths forward with clear CTAs
 */

'use client';

import { FileText, Briefcase, MessageSquare, ArrowRight } from 'lucide-react';

export default function ReadyToBuildInfographic() {
  const paths = [
    {
      icon: FileText,
      title: 'View Work',
      description: 'See case studies and proof points across domains',
      href: '/work',
      color: '#00FF94',
      cta: 'Explore Projects'
    },
    {
      icon: Briefcase,
      title: 'Our Services',
      description: 'Learn about engagement models and how we work',
      href: '/how-we-work',
      color: '#00D9FF',
      cta: 'See Services'
    },
    {
      icon: MessageSquare,
      title: 'Book Call',
      description: 'Start a conversation about your project',
      href: '/contact',
      color: '#FFD700',
      cta: 'Schedule Intro'
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to Build?</h3>
        <p className="text-sm text-gray-400">
          Three paths forward. Choose what makes sense for your timeline.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {paths.map((path, idx) => {
          const Icon = path.icon;
          return (
            <a
              key={path.title}
              href={path.href}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${path.color}20`, borderColor: path.color, borderWidth: '2px' }}
                >
                  <span style={{ color: path.color }}>
                    <Icon className="w-6 h-6" />
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                      style={{ backgroundColor: path.color }}
                    >
                      {idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">{path.title}</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{path.description}</p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: path.color }}
                  >
                    <span>{path.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Alternative CTA */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-sm text-gray-400">
          Or <a href="/contact" className="text-terminal-gold hover:text-[#FFE34D] transition-colors font-semibold">get in touch via our contact page</a>
        </p>
      </div>
    </div>
  );
}
