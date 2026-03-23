'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isHighlighted?: boolean;
  delay?: number;
}

export default function StepCard({ 
  number, 
  title, 
  description, 
  isHighlighted = false,
  delay = 0 
}: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className="bg-[var(--heirloom-pitch-sand)] rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
            isHighlighted 
              ? 'bg-[var(--heirloom-pitch-terracotta)] text-white' 
              : 'bg-white text-[var(--heirloom-pitch-brown)]'
          }`}
        >
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-2">
            {title}
          </h3>
          <p className="text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
