'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ComparisonTable from '@/components/heirloom/pitch/ComparisonTable';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function CompetitiveSection() {
  const content = heirloomPitchContent.competitive;
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

        <ComparisonTable rows={content.comparison} callout={content.callout} />
      </div>
    </section>
  );
}
