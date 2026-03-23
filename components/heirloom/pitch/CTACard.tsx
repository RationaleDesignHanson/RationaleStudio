'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTACardProps {
  audience: string;
  description: string;
  buttonText: string;
  href: string;
  delay?: number;
}

export default function CTACard({ 
  audience, 
  description, 
  buttonText, 
  href,
  delay = 0 
}: CTACardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 md:p-8 border border-[var(--heirloom-pitch-sand)]"
    >
      <h3 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-3">
        {audience}
      </h3>
      <p className="text-[var(--heirloom-pitch-warm-gray)] mb-6 leading-relaxed">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--heirloom-pitch-terracotta)] hover:bg-[#B85F3F] text-white font-semibold rounded-lg transition-all hover:scale-105"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
