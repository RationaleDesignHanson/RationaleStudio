'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function HeroSection() {
  const content = heirloomPitchContent.hero;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-brown)] relative overflow-hidden">
      {/* Optional animated gradient background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-[var(--heirloom-pitch-terracotta)] via-[var(--heirloom-pitch-brown)] to-[var(--heirloom-pitch-terracotta)] bg-[length:200%_200%]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--heirloom-pitch-cream)] mb-6 leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-[var(--heirloom-pitch-sand)] mb-4 font-medium"
        >
          {content.subhead}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-[var(--heirloom-pitch-soft-gray)] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {content.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={content.ctaPrimary.href}
            className="px-8 py-4 bg-[var(--heirloom-pitch-terracotta)] hover:bg-[#B85F3F] text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg"
          >
            {content.ctaPrimary.text}
          </Link>
          <Link
            href={content.ctaSecondary.href}
            className="px-8 py-4 bg-transparent border-2 border-[var(--heirloom-pitch-cream)] text-[var(--heirloom-pitch-cream)] hover:bg-[var(--heirloom-pitch-cream)] hover:text-[var(--heirloom-pitch-brown)] font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            {content.ctaSecondary.text}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
