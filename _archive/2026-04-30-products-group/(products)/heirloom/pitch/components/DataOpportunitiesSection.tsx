'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function DataOpportunitiesSection() {
  const content = heirloomPitchContent.ai.dataOpportunities;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-brown)] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-[var(--heirloom-pitch-warm-gray)] max-w-3xl mx-auto">
            {content.description}
          </p>
        </motion.div>

        {/* Current Data Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-brown)]">
              {content.currentData.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {content.currentData.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-5 border border-[var(--heirloom-pitch-sand)]"
              >
                <h4 className="font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                  {item.data}
                </h4>
                <p className="text-sm text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
                  {item.use}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-brown)]">
              {content.futureOpportunities.title}
            </h3>
          </div>

          <div className="space-y-6">
            {content.futureOpportunities.opportunities.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 border border-[var(--heirloom-pitch-sand)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--heirloom-pitch-terracotta)] flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                      {opp.opportunity}
                    </h4>
                    <p className="text-[var(--heirloom-pitch-warm-gray)] mb-4 leading-relaxed">
                      {opp.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-[var(--heirloom-pitch-terracotta)] mb-1">Data Required</p>
                        <p className="text-sm text-[var(--heirloom-pitch-warm-gray)]">{opp.data}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--heirloom-pitch-terracotta)] mb-1">Impact</p>
                        <p className="text-sm text-[var(--heirloom-pitch-warm-gray)]">{opp.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Moat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="bg-[var(--heirloom-pitch-terracotta)] rounded-xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {content.competitiveAdvantage.title}
            </h3>
          </div>
          <p className="text-white/90 mb-6 leading-relaxed">
            {content.competitiveAdvantage.description}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {content.competitiveAdvantage.metrics.map((metric, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white font-semibold">{metric}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
