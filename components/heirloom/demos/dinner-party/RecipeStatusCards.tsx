'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type RecipeTimeline,
  formatTime,
  formatDuration,
  getStatusInfo,
  getTimeDescription,
} from '@/components/heirloom/shared/timeCalculator';

interface RecipeStatusCardsProps {
  timelines: RecipeTimeline[];
  currentTime: Date;
  mealTime: Date;
}

export function RecipeStatusCards({ timelines, currentTime, mealTime }: RecipeStatusCardsProps) {
  if (timelines.length === 0) {
    return null;
  }

  // Group by status
  const upcoming = timelines.filter((t) => t.status === 'upcoming');
  const active = timelines.filter((t) => t.status === 'prep' || t.status === 'cooking');
  const completed = timelines.filter((t) => t.status === 'completed');

  return (
    <div className="space-y-4">
      {/* Meal Time Card */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Dinner is served at</p>
            <p className="text-3xl font-bold">{formatTime(mealTime)}</p>
          </div>
          <div className="text-5xl"></div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-sm">
            {completed.length === timelines.length ? (
              <span className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span>All recipes complete! Ready to serve!</span>
              </span>
            ) : (
              getTimeDescription(mealTime, currentTime)
            )}
          </p>
        </div>
      </div>

      {/* Active Recipes */}
      {active.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-lg">👨‍🍳</span>
            Active Now ({active.length})
          </h3>
          <div className="space-y-2">
            {active.map((timeline) => (
              <RecipeStatusCard
                key={timeline.recipeId}
                timeline={timeline}
                currentTime={currentTime}
                highlight
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Recipes */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-lg">⏳</span>
            Coming Up ({upcoming.length})
          </h3>
          <div className="space-y-2">
            {upcoming.map((timeline) => (
              <RecipeStatusCard
                key={timeline.recipeId}
                timeline={timeline}
                currentTime={currentTime}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Recipes */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-lg"></span>
            Completed ({completed.length})
          </h3>
          <div className="space-y-2">
            {completed.map((timeline) => (
              <RecipeStatusCard
                key={timeline.recipeId}
                timeline={timeline}
                currentTime={currentTime}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== RECIPE STATUS CARD ==========

interface RecipeStatusCardProps {
  timeline: RecipeTimeline;
  currentTime: Date;
  highlight?: boolean;
}

function RecipeStatusCard({ timeline, currentTime, highlight = false }: RecipeStatusCardProps) {
  const statusInfo = getStatusInfo(timeline.status);
  const isActive = timeline.status === 'prep' || timeline.status === 'cooking';

  return (
    <motion.div
      className="bg-white rounded-lg border-2 p-4 transition-all"
      style={{
        borderColor: highlight ? statusInfo.color : '#E5E7EB',
        boxShadow: highlight ? `0 4px 12px ${statusInfo.color}40` : '0 2px 4px rgba(0,0,0,0.05)',
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{timeline.recipeName}</h4>
          <p className="text-xs text-gray-600">
            {formatTime(timeline.startTime)} - {formatTime(timeline.finishTime)} •{' '}
            {formatDuration(timeline.totalDuration)}
          </p>
        </div>

        {/* Status Badge */}
        <div
          className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
          style={{
            backgroundColor: `${statusInfo.color}20`,
            color: statusInfo.color,
          }}
        >
          <span>{statusInfo.icon}</span>
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>
              {timeline.status === 'prep' ? '🔪 Prepping' : ' Cooking'}
            </span>
            <span>{Math.round(timeline.progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: statusInfo.color }}
              initial={{ width: 0 }}
              animate={{ width: `${timeline.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Timeline Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-gray-600">
          <span>🔪</span>
          <span>Prep: {formatDuration(timeline.prepTime)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <span></span>
          <span>Cook: {formatDuration(timeline.cookTime)}</span>
        </div>
      </div>

      {/* Time Until/Since */}
      {timeline.status === 'upcoming' && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">
            {getTimeDescription(timeline.startTime, currentTime)}
          </p>
        </div>
      )}

      {/* Completion Confetti */}
      <AnimatePresence>
        {timeline.status === 'completed' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.05,
                }}
              >
                {['🎉', '', '⭐', '🌟'][i % 4]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
