'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import StepCard from '@/components/heirloom/pitch/StepCard';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function SolutionSection() {
  const content = heirloomPitchContent.solution;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-brown)] mb-6 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--heirloom-pitch-warm-gray)] mb-12 max-w-3xl mx-auto text-center leading-relaxed"
        >
          {content.intro}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {content.steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              isHighlighted={step.number === 3}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
