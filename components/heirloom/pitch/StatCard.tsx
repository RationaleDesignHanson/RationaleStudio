'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatCardProps {
  number: string;
  label: string;
  delay?: number;
}

export default function StatCard({ number, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayNumber, setDisplayNumber] = useState('0');

  // Extract numeric value for count-up animation
  const numericValue = number.replace(/[^0-9.]/g, '');
  const isNumeric = numericValue !== '' && !isNaN(parseFloat(numericValue));
  const targetValue = isNumeric ? parseFloat(numericValue) : 0;
  const suffix = number.replace(/[0-9.]/g, '').split('').slice(-1).join('') || '';

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) {
        setDisplayNumber(number);
      }
      return;
    }

    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (targetValue - startValue) * easeOutQuart;
      
      // Format based on original number format
      if (number.includes('$')) {
        setDisplayNumber(`$${(currentValue / (number.includes('B') ? 1000000000 : number.includes('M') ? 1000000 : 1)).toFixed(1)}${number.includes('B') ? 'B' : number.includes('M') ? 'M' : ''}`);
      } else if (number.includes('%')) {
        setDisplayNumber(`${currentValue.toFixed(1)}%`);
      } else {
        setDisplayNumber(`${Math.floor(currentValue)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayNumber(number);
      }
    };

    const timeout = setTimeout(() => {
      animate();
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, number, targetValue, isNumeric, suffix, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className="bg-[var(--heirloom-pitch-brown)] rounded-xl p-6 text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-[var(--heirloom-pitch-terracotta)] mb-2">
        {displayNumber}
      </div>
      <div className="text-sm md:text-base text-[var(--heirloom-pitch-cream)]">
        {label}
      </div>
    </motion.div>
  );
}
