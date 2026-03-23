'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  badge?: string;
  delay?: number;
}

export default function PricingCard({ 
  tier, 
  price, 
  description, 
  badge,
  delay = 0 
}: PricingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 md:p-8 border-2 ${
        badge ? 'border-[var(--heirloom-pitch-terracotta)]' : 'border-[var(--heirloom-pitch-sand)]'
      } relative`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[var(--heirloom-pitch-terracotta)] text-white text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}
      <h3 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
        {tier}
      </h3>
      <div className="text-3xl font-bold text-[var(--heirloom-pitch-terracotta)] mb-4">
        {price}
      </div>
      <p className="text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
