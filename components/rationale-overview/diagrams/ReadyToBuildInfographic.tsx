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
    <div className="p-8 sm:p-10 lg:p-12 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-12 lg:mb-16 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Build?</h3>
        <p className="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Three paths forward. Choose what makes sense for your timeline.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
        {paths.map((path, idx) => {
          const Icon = path.icon;
          return (
            <a
              key={path.title}
              href={path.href}
              className="group p-6 sm:p-8 lg:p-10 bg-gray-800/50 border-2 border-gray-700 rounded-lg hover:bg-gray-800/70 hover:border-opacity-100 transition-all"
              style={{ borderColor: `${path.color}40` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = path.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${path.color}40`;
              }}
            >
              {/* Icon + Number */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${path.color}20`, borderColor: path.color, borderWidth: '2px' }}
                >
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: path.color }} />
                </div>
                <div
                  className="w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-black text-base lg:text-lg"
                  style={{ backgroundColor: path.color }}
                >
                  {idx + 1}
                </div>
              </div>

              {/* Content */}
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">{path.title}</h4>
              <p className="text-base text-gray-400 leading-relaxed mb-10">{path.description}</p>

              {/* CTA */}
              <div
                className="flex items-center gap-2 text-base font-semibold group-hover:gap-3 transition-all"
                style={{ color: path.color }}
              >
                <span>{path.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Alternative CTA */}
      <div className="mt-12 lg:mt-16 pt-8 border-t border-gray-700 text-center">
        <p className="text-base text-gray-400">
          Or <a href="/contact" className="text-[#FFD700] hover:text-[#FFE34D] transition-colors font-semibold">get in touch via our contact page</a>
        </p>
      </div>
    </div>
  );
}
