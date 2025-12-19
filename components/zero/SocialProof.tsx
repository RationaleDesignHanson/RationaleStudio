'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatar: string;
  stat?: string;
}

interface SocialProofProps {
  variant?: 'stats' | 'testimonials' | 'combined';
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'Tech Startup',
    quote: 'Zero cut my email time from 2 hours to 15 minutes. Game changer for productivity.',
    avatar: '👩‍💼',
    stat: '87% time saved'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Engineering Lead',
    company: 'SaaS Company',
    quote: 'Finally, I can focus on building instead of drowning in inbox management.',
    avatar: '👨‍💻',
    stat: '150+ emails/day handled'
  },
  {
    name: 'Emily Watson',
    role: 'Founder',
    company: 'Startup',
    quote: 'The AI understands context better than I do. It\'s like having a personal assistant.',
    avatar: '👩‍🚀',
    stat: 'Inbox Zero daily'
  }
];

const stats = [
  { value: '10K+', label: 'Active Users', icon: '👥' },
  { value: '2M+', label: 'Emails Processed', icon: '📧' },
  { value: '40hrs', label: 'Saved per Month', icon: '⏰' },
  { value: '95%', label: 'Satisfaction Rate', icon: '⭐' }
];

/**
 * Social Proof Component
 * Displays testimonials, usage stats, and social validation
 * Builds trust and demonstrates value
 */
export default function SocialProof({ variant = 'combined' }: SocialProofProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (variant === 'testimonials' || variant === 'combined') {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  if (variant === 'stats') {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-extrabold text-white mb-1">Trusted by Thousands</h3>
          <p className="text-sm text-white/60">Real impact, real numbers</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'testimonials') {
    const currentTestimonial = testimonials[currentTestimonialIndex];

    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-extrabold text-white mb-1">What People Say</h3>
          <p className="text-sm text-white/60">Real feedback from real users</p>
        </div>

        <motion.div
          key={currentTestimonialIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
        >
          {/* Testimonial Content */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-3 shadow-lg">
              {currentTestimonial.avatar}
            </div>
            <div className="text-base text-white/90 italic leading-relaxed mb-4">
              "{currentTestimonial.quote}"
            </div>
            <div className="text-sm font-semibold text-white">{currentTestimonial.name}</div>
            <div className="text-xs text-white/60">
              {currentTestimonial.role}
              {currentTestimonial.company && ` @ ${currentTestimonial.company}`}
            </div>
            {currentTestimonial.stat && (
              <div className="mt-3 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-lg">
                <span className="text-xs font-bold text-green-300">{currentTestimonial.stat}</span>
              </div>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonialIndex
                    ? 'bg-white w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Combined variant (default)
  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 border border-white/10 space-y-6">
      {/* Stats Grid */}
      <div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-extrabold text-white mb-1">Trusted by Thousands</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-extrabold text-white mb-0.5">{stat.value}</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div>
        <motion.div
          key={currentTestimonialIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
              {currentTestimonial.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white/90 italic leading-relaxed mb-2">
                "{currentTestimonial.quote}"
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-xs font-semibold text-white">{currentTestimonial.name}</div>
                  <div className="text-[10px] text-white/60">
                    {currentTestimonial.role}
                    {currentTestimonial.company && ` @ ${currentTestimonial.company}`}
                  </div>
                </div>
                {currentTestimonial.stat && (
                  <div className="px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-md">
                    <span className="text-[10px] font-bold text-green-300">{currentTestimonial.stat}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentTestimonialIndex
                    ? 'bg-white w-4'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
