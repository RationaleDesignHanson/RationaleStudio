'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FeatureCard from '@/components/heirloom/pitch/FeatureCard';
import { Share2, Scale, ChefHat, ShoppingCart, Calendar, GitBranch } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function FeaturesSection() {
  const content = heirloomPitchContent.features;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const icons = [
    <Share2 key="share" className="w-6 h-6" />,
    <Scale key="scale" className="w-6 h-6" />,
    <ChefHat key="chef" className="w-6 h-6" />,
    <ShoppingCart key="cart" className="w-6 h-6" />,
    <Calendar key="calendar" className="w-6 h-6" />,
    <GitBranch key="lineage" className="w-6 h-6" />
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
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

        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <FeatureCard
              key={index}
              icon={icons[index]}
              title={item.title}
              description={item.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
