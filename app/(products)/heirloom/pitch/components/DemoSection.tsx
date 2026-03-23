'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FeatureCard from '@/components/heirloom/pitch/FeatureCard';
import { Mic, Eye, Sparkles } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function DemoSection() {
  const content = heirloomPitchContent.demo;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const icons = [
    <Mic key="mic" className="w-8 h-8" />,
    <Eye key="eye" className="w-8 h-8" />,
    <Sparkles key="sparkles" className="w-8 h-8" />
  ];

  return (
    <section id="demo" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-brown)]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-cream)] mb-6 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--heirloom-pitch-sand)] mb-12 max-w-3xl mx-auto text-center leading-relaxed"
        >
          {content.body}
        </motion.p>

        {/* Video to Recipe Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-12 grid md:grid-cols-3 gap-6 items-center"
        >
          {/* Mock TikTok Video */}
          <div className="bg-black rounded-xl p-4 aspect-[9/16] max-w-xs mx-auto flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-700"></div>
              <span className="text-white text-sm">@cookingtok</span>
            </div>
            <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-4xl">🍝</span>
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[var(--heirloom-pitch-terracotta)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[var(--heirloom-pitch-terracotta)]"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </div>

          {/* Recipe Card Mock */}
          <div className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 max-w-xs mx-auto shadow-lg">
            <h3 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-3">Creamy Tuscan Chicken</h3>
            <div className="space-y-2 text-sm text-[var(--heirloom-pitch-warm-gray)]">
              <div>• 4 chicken breasts</div>
              <div>• 1 cup heavy cream</div>
              <div>• 2 cups spinach</div>
              <div>• ...</div>
            </div>
          </div>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.capabilities.map((capability, index) => (
            <FeatureCard
              key={index}
              icon={icons[index]}
              title={capability.title}
              description={capability.description}
              delay={index * 0.1 + 0.3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
