'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import StatCard from '@/components/heirloom/pitch/StatCard';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function MarketSection() {
  const content = heirloomPitchContent.market;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-brown)] mb-8 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.title}
        </motion.h2>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {content.stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-lg md:text-xl text-[var(--heirloom-pitch-warm-gray)] mb-12 max-w-3xl mx-auto text-center leading-relaxed"
        >
          {content.narrative}
        </motion.p>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 border border-[var(--heirloom-pitch-sand)]"
            >
              <h3 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                {audience.title}
              </h3>
              <p className="text-sm text-[var(--heirloom-pitch-terracotta)] font-medium mb-2">
                {audience.ageRange}
              </p>
              <p className="text-[var(--heirloom-pitch-warm-gray)] mb-3">
                {audience.description}
              </p>
              <p className="text-sm text-[var(--heirloom-pitch-soft-gray)]">
                {audience.marketShare}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
