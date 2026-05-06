'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FormatCard from '@/components/heirloom/pitch/FormatCard';
import { Video, Volume2, FileText, Globe, Camera, PenTool } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function FormatsSection() {
  const content = heirloomPitchContent.formats;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const icons = [
    <Video key="video" className="w-6 h-6" />,
    <Volume2 key="volume" className="w-6 h-6" />,
    <FileText key="file" className="w-6 h-6" />,
    <Globe key="globe" className="w-6 h-6" />,
    <Camera key="camera" className="w-6 h-6" />,
    <PenTool key="pen" className="w-6 h-6" />
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-cream)]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {content.items.map((item, index) => (
            <FormatCard
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
