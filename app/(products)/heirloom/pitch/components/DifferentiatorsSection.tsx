'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function DifferentiatorsSection() {
  const content = heirloomPitchContent.differentiators;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-sand)]">
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

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 md:p-8 border-2 border-[var(--heirloom-pitch-terracotta)] relative"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />
                </div>
                <div>
                  <div className="inline-block bg-[var(--heirloom-pitch-terracotta)] text-white text-xs font-bold px-2 py-1 rounded mb-3">
                    Only in Heirloom
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--heirloom-pitch-brown)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
