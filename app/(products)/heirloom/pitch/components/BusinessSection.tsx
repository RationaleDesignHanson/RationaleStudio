'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PricingCard from '@/components/heirloom/pitch/PricingCard';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function BusinessSection() {
  const content = heirloomPitchContent.business;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {content.pricing.map((tier, index) => (
            <PricingCard
              key={index}
              tier={tier.tier}
              price={tier.price}
              description={tier.description}
              badge={tier.badge}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Unit Economics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-[var(--heirloom-pitch-sand)] rounded-xl p-6 md:p-8 mb-6"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                {content.economics.ltv}
              </div>
              <div className="text-sm text-[var(--heirloom-pitch-warm-gray)]">LTV</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
                {content.economics.cac}
              </div>
              <div className="text-sm text-[var(--heirloom-pitch-warm-gray)]">CAC</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-terracotta)] mb-2">
                {content.economics.ratio}
              </div>
              <div className="text-sm text-[var(--heirloom-pitch-warm-gray)]">Ratio</div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center text-[var(--heirloom-pitch-warm-gray)]"
        >
          {content.trial}
        </motion.p>
      </div>
    </section>
  );
}
