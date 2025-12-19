'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface BeforeAfterComparisonProps {
  variant?: 'inline' | 'modal';
}

/**
 * Before/After Comparison Component
 * Shows the dramatic difference in email management with vs without Zero
 * Demonstrates time savings and cognitive load reduction
 */
export default function BeforeAfterComparison({ variant = 'inline' }: BeforeAfterComparisonProps) {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  const stats = {
    before: {
      timePerEmail: '45s',
      cognitiveLoad: 'High',
      decisionsPerEmail: 8,
      stressLevel: '😰 High',
      dailyTime: '~2 hours'
    },
    after: {
      timePerEmail: '5s',
      cognitiveLoad: 'Low',
      decisionsPerEmail: 1,
      stressLevel: '😌 Low',
      dailyTime: '~15 min'
    }
  };

  const containerClass = variant === 'modal'
    ? 'max-w-2xl mx-auto'
    : 'w-full';

  return (
    <div className={containerClass}>
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-extrabold text-white mb-2">
            Email Management: Before vs After
          </h3>
          <p className="text-sm text-white/70">
            See how Zero transforms your inbox workflow
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('before')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'before'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ❌ Before Zero
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'after'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ✅ With Zero
          </button>
        </div>

        {/* Comparison Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'before' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Time Per Email */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center text-xl">
                ⏱️
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Time per Email</div>
                <div className="text-2xl font-bold text-white">
                  {activeTab === 'before' ? stats.before.timePerEmail : stats.after.timePerEmail}
                </div>
              </div>
            </div>
            {activeTab === 'after' && (
              <div className="px-3 py-1 bg-green-500/30 rounded-lg">
                <span className="text-xs font-bold text-green-300">89% faster</span>
              </div>
            )}
          </div>

          {/* Cognitive Load */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center text-xl">
                🧠
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Cognitive Load</div>
                <div className="text-xl font-bold text-white">
                  {activeTab === 'before' ? stats.before.cognitiveLoad : stats.after.cognitiveLoad}
                </div>
              </div>
            </div>
          </div>

          {/* Decisions Per Email */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/30 flex items-center justify-center text-xl">
                🤔
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Decisions per Email</div>
                <div className="text-2xl font-bold text-white">
                  {activeTab === 'before' ? stats.before.decisionsPerEmail : stats.after.decisionsPerEmail}
                </div>
              </div>
            </div>
            {activeTab === 'after' && (
              <div className="px-3 py-1 bg-green-500/30 rounded-lg">
                <span className="text-xs font-bold text-green-300">AI decides for you</span>
              </div>
            )}
          </div>

          {/* Stress Level */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/30 flex items-center justify-center text-xl">
                {activeTab === 'before' ? '😰' : '😌'}
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Stress Level</div>
                <div className="text-xl font-bold text-white">
                  {activeTab === 'before' ? stats.before.stressLevel : stats.after.stressLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Time Spent */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Daily Time Spent</div>
                <div className="text-2xl font-bold text-white">
                  {activeTab === 'before' ? stats.before.dailyTime : stats.after.dailyTime}
                </div>
              </div>
            </div>
            {activeTab === 'after' && (
              <div className="px-3 py-1 bg-green-500/30 rounded-lg">
                <span className="text-xs font-bold text-green-300">87% reduction</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Summary */}
        {activeTab === 'after' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-xl"
          >
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-1">
                🎉 Save 1 hour 45 minutes every day
              </div>
              <div className="text-sm text-white/80">
                That's over 40 hours per month spent on what actually matters
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
