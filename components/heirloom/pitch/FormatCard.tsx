'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FormatCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FormatCard({ icon, title, description, delay = 0 }: FormatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all border border-[var(--heirloom-pitch-sand)]"
    >
      {icon && (
        <div className="mb-4 text-[var(--heirloom-pitch-terracotta)] text-2xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-[var(--heirloom-pitch-brown)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
