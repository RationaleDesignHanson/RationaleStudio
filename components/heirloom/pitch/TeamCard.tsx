'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface TeamCardProps {
  photo?: string;
  name: string;
  role: string;
  bio: string;
  delay?: number;
}

export default function TeamCard({ photo, name, role, bio, delay = 0 }: TeamCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay }}
      className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 md:p-8 text-center"
    >
      {photo ? (
        <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-[var(--heirloom-pitch-sand)]">
          <Image
            src={photo}
            alt={name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-[var(--heirloom-pitch-sand)] flex items-center justify-center text-4xl font-bold text-[var(--heirloom-pitch-brown)]">
          {name.charAt(0)}
        </div>
      )}
      <h3 className="text-xl font-bold text-[var(--heirloom-pitch-brown)] mb-1">
        {name}
      </h3>
      <p className="text-[var(--heirloom-pitch-terracotta)] font-medium mb-3">
        {role}
      </p>
      <p className="text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
        {bio}
      </p>
    </motion.div>
  );
}
