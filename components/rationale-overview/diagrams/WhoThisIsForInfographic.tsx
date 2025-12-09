/**
 * Who This Is For Infographic
 * Shows ideal client criteria in a visual format
 */

'use client';

import { Zap, Users, Handshake, TrendingUp } from 'lucide-react';

export default function WhoThisIsForInfographic() {
  const criteria = [
    {
      icon: Zap,
      title: 'Hands-on Builders',
      description: 'Founders and product leaders who roll up sleeves and ship',
      color: '#00FF94'
    },
    {
      icon: TrendingUp,
      title: 'Need Execution Velocity',
      description: 'Limited runway or competitive pressure demands speed',
      color: '#00D9FF'
    },
    {
      icon: Users,
      title: 'Value Partnership',
      description: 'Want collaborators, not vendors. Long-term thinking.',
      color: '#9D4EDD'
    },
    {
      icon: Handshake,
      title: 'Open to Equity Discussions',
      description: 'Willing to explore equity alignment (cash welcome too)',
      color: '#FFD700'
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Who This Is For</h3>
        <p className="text-sm text-gray-400">
          We work best with founders and teams who match this profile
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {criteria.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20`, borderColor: item.color, borderWidth: '2px' }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                      style={{ backgroundColor: item.color }}
                    >
                      {idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Not a fit callout */}
      <div className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="text-center">
          <p className="text-sm font-semibold text-white mb-2">Not a fit if:</p>
          <p className="text-sm text-gray-400">
            You need staff augmentation • Looking for cheap offshore labor • Want us to follow your spec without questioning assumptions • Expect us to say yes to everything
          </p>
        </div>
      </div>
    </div>
  );
}
