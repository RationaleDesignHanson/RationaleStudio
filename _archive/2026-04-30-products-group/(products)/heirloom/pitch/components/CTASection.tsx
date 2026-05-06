'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CTACard from '@/components/heirloom/pitch/CTACard';
import { Mail, Globe, Twitter } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function CTASection() {
  const content = heirloomPitchContent.cta;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-brown)]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-cream)] mb-12 text-center"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {content.title}
        </motion.h2>

        {/* Three Tracks */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {content.tracks.map((track, index) => (
            <CTACard
              key={index}
              audience={track.audience}
              description={track.description}
              buttonText={track.buttonText}
              href={track.href}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 text-[var(--heirloom-pitch-cream)]"
        >
          <a
            href={`mailto:${content.contact.email}`}
            className="flex items-center gap-2 hover:text-[var(--heirloom-pitch-terracotta)] transition-colors"
          >
            <Mail className="w-5 h-5" />
            {content.contact.email}
          </a>
          <a
            href={`https://${content.contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--heirloom-pitch-terracotta)] transition-colors"
          >
            <Globe className="w-5 h-5" />
            {content.contact.website}
          </a>
          <a
            href={`https://twitter.com/${content.contact.social.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--heirloom-pitch-terracotta)] transition-colors"
          >
            <Twitter className="w-5 h-5" />
            {content.contact.social}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
