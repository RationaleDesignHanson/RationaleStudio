'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mic, Eye, Sparkles, Video, Image, Zap, Database } from 'lucide-react';
import { heirloomPitchContent } from '@/lib/content/heirloom-pitch';

export default function AISection() {
  const content = heirloomPitchContent.ai;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--heirloom-pitch-brown)]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--heirloom-pitch-cream)] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-[var(--heirloom-pitch-sand)] max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Video Processing Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-cream)] mb-6">
            {content.videoProcessing.title}
          </h3>
          <p className="text-[var(--heirloom-pitch-sand)] mb-8 leading-relaxed">
            {content.videoProcessing.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {content.videoProcessing.capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 border border-[var(--heirloom-pitch-sand)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  {index === 0 && <Mic className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />}
                  {index === 1 && <Eye className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />}
                  {index === 2 && <Sparkles className="w-6 h-6 text-[var(--heirloom-pitch-terracotta)]" />}
                  <h4 className="text-lg font-bold text-[var(--heirloom-pitch-brown)]">
                    {capability.name}
                  </h4>
                </div>
                <p className="text-[var(--heirloom-pitch-warm-gray)] mb-3 leading-relaxed">
                  {capability.description}
                </p>
                <p className="text-xs text-[var(--heirloom-pitch-soft-gray)] italic">
                  {capability.technical}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pipeline Visualization */}
          <div className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 border border-[var(--heirloom-pitch-sand)]">
            <h4 className="text-lg font-bold text-[var(--heirloom-pitch-brown)] mb-4">Processing Pipeline</h4>
            <div className="space-y-3">
              {content.videoProcessing.pipeline.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--heirloom-pitch-terracotta)] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--heirloom-pitch-brown)]">{step.name}</span>
                      <span className="text-sm text-[var(--heirloom-pitch-warm-gray)]">{step.duration}</span>
                    </div>
                    {step.ai && (
                      <span className="text-xs text-[var(--heirloom-pitch-terracotta)]">
                        {step.ai === "On-device" ? "✓ " : ""}{step.ai}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--heirloom-pitch-warm-gray)]">
              Cost: {content.videoProcessing.cost}
            </p>
          </div>
        </motion.div>

        {/* ASMR Processing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-[var(--heirloom-pitch-terracotta)] rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Video className="w-6 h-6 text-white" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {content.asmrProcessing.title}
              </h3>
            </div>
            <p className="text-white/90 leading-relaxed mb-4">
              {content.asmrProcessing.description}
            </p>
            <p className="text-sm text-white/80 italic">
              {content.asmrProcessing.differentiator}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.asmrProcessing.passes.map((pass, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-5 border border-[var(--heirloom-pitch-sand)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--heirloom-pitch-terracotta)] text-white text-xs flex items-center justify-center font-bold">
                    {pass.pass}
                  </span>
                  <h4 className="font-bold text-[var(--heirloom-pitch-brown)]">{pass.name}</h4>
                </div>
                <p className="text-sm text-[var(--heirloom-pitch-warm-gray)] mb-2 leading-relaxed">
                  {pass.description}
                </p>
                <p className="text-xs text-[var(--heirloom-pitch-soft-gray)] italic">
                  {pass.technical}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Differentiation Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-[var(--heirloom-pitch-cream)] rounded-xl p-6 md:p-8 border-2 border-[var(--heirloom-pitch-terracotta)]"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--heirloom-pitch-brown)] mb-6">
            {content.differentiation.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {content.differentiation.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[var(--heirloom-pitch-terracotta)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--heirloom-pitch-brown)] mb-1">
                    {point.point}
                  </h4>
                  <p className="text-sm text-[var(--heirloom-pitch-warm-gray)] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
