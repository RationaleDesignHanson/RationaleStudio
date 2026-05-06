'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TeamCard from '@/components/heirloom/pitch/TeamCard';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function TeamSection() {
  const content = heirloomPitchContent.team;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-cream)]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-brown)] mb-12 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.title}
        </motion.h2>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-12"
        >
          <TeamCard
            name={content.founder.name}
            role={content.founder.role}
            bio={content.founder.bio}
            delay={0}
          />
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xl md:text-2xl italic text-[var(--heirloom-pitch-brown)] text-center max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          "{content.quote}"
        </motion.blockquote>

        {/* Experience Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-[var(--heirloom-pitch-sand)]"
            >
              <div className="text-3xl mb-3">{highlight.icon}</div>
              <h3 className="text-lg font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                {highlight.title}
              </h3>
              <p className="text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
