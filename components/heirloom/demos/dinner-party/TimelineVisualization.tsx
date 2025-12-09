'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  type RecipeTimeline,
  type TimelineSlot,
  formatTime,
  formatDuration,
} from '@/components/heirloom/shared/timeCalculator';

interface TimelineVisualizationProps {
  timelines: RecipeTimeline[];
  slots: TimelineSlot[];
  totalMinutes: number;
  currentTime: Date;
}

export function TimelineVisualization({
  timelines,
  slots,
  totalMinutes,
  currentTime,
}: TimelineVisualizationProps) {
  if (timelines.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
        <div className="text-5xl mb-3">📅</div>
        <p className="text-gray-600 font-medium">No recipes selected</p>
        <p className="text-sm text-gray-500 mt-1">
          Add recipes to see the timeline
        </p>
      </div>
    );
  }

  // Calculate current position on timeline
  const firstStart = Math.min(...timelines.map((t) => t.startTime.getTime()));
  const currentMinutes = (currentTime.getTime() - firstStart) / 60000;
  const currentPosition = totalMinutes > 0 ? (currentMinutes / totalMinutes) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Cooking Timeline
        </h3>
        <p className="text-sm text-gray-600">
          Total time: {formatDuration(totalMinutes)} • {timelines.length} recipes
        </p>
      </div>

      {/* Timeline Chart */}
      <div className="space-y-4">
        {timelines.map((timeline, index) => {
          const prepSlot = slots.find(
            (s) => s.recipeId === timeline.recipeId && s.phase === 'prep'
          );
          const cookSlot = slots.find(
            (s) => s.recipeId === timeline.recipeId && s.phase === 'cook'
          );

          if (!prepSlot || !cookSlot) return null;

          return (
            <TimelineRow
              key={timeline.recipeId}
              timeline={timeline}
              prepSlot={prepSlot}
              cookSlot={cookSlot}
              totalMinutes={totalMinutes}
              color={prepSlot.color}
            />
          );
        })}
      </div>

      {/* Current Time Indicator */}
      {currentPosition >= 0 && currentPosition <= 100 && (
        <div className="relative mt-6 h-12">
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${currentPosition}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Now: {formatTime(currentTime)}
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Time Markers */}
      <TimeMarkers timelines={timelines} totalMinutes={totalMinutes} />
    </div>
  );
}

// ========== TIMELINE ROW ==========

interface TimelineRowProps {
  timeline: RecipeTimeline;
  prepSlot: TimelineSlot;
  cookSlot: TimelineSlot;
  totalMinutes: number;
  color: string;
}

function TimelineRow({ timeline, prepSlot, cookSlot, totalMinutes, color }: TimelineRowProps) {
  const prepStart = (prepSlot.startMinutes / totalMinutes) * 100;
  const prepWidth = (prepSlot.durationMinutes / totalMinutes) * 100;

  const cookStart = (cookSlot.startMinutes / totalMinutes) * 100;
  const cookWidth = (cookSlot.durationMinutes / totalMinutes) * 100;

  return (
    <div>
      {/* Recipe Name */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{timeline.recipeName}</h4>
        <span className="text-xs text-gray-500">
          {formatDuration(timeline.totalDuration)}
        </span>
      </div>

      {/* Timeline Bar */}
      <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
        {/* Prep Bar */}
        <motion.div
          className="absolute top-0 bottom-0 rounded-l-lg flex items-center justify-center text-white text-xs font-medium"
          style={{
            left: `${prepStart}%`,
            width: `${prepWidth}%`,
            backgroundColor: color,
            opacity: timeline.status === 'upcoming' ? 0.5 : 1,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${prepWidth}%` }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {prepSlot.durationMinutes >= 15 && (
            <span>🔪 Prep ({formatDuration(prepSlot.durationMinutes)})</span>
          )}
        </motion.div>

        {/* Cook Bar */}
        <motion.div
          className="absolute top-0 bottom-0 rounded-r-lg flex items-center justify-center text-white text-xs font-medium"
          style={{
            left: `${cookStart}%`,
            width: `${cookWidth}%`,
            backgroundColor: color,
            opacity: timeline.status === 'completed' ? 0.7 : 1,
            background: `repeating-linear-gradient(45deg, ${color}, ${color} 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${cookWidth}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {cookSlot.durationMinutes >= 15 && (
            <span>🔥 Cook ({formatDuration(cookSlot.durationMinutes)})</span>
          )}
        </motion.div>

        {/* Progress Overlay */}
        {timeline.progress > 0 && timeline.progress < 100 && (
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-white opacity-30"
            style={{
              left: 0,
              width: `${((prepStart + (prepWidth + cookWidth) * (timeline.progress / 100)))}%`,
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${((prepStart + (prepWidth + cookWidth) * (timeline.progress / 100)))}%`,
            }}
          />
        )}

        {/* Completion Checkmark */}
        {timeline.status === 'completed' && (
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Time Range */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{formatTime(timeline.startTime)}</span>
        <span>{formatTime(timeline.finishTime)}</span>
      </div>
    </div>
  );
}

// ========== TIME MARKERS ==========

interface TimeMarkersProps {
  timelines: RecipeTimeline[];
  totalMinutes: number;
}

function TimeMarkers({ timelines, totalMinutes }: TimeMarkersProps) {
  if (timelines.length === 0) return null;

  const firstStart = timelines[0].startTime;
  const markers: { time: Date; position: number; label: string }[] = [];

  // Add marker every 15 minutes
  const markerInterval = totalMinutes > 120 ? 30 : 15; // 30 min intervals if > 2 hours
  const numMarkers = Math.floor(totalMinutes / markerInterval) + 1;

  for (let i = 0; i <= numMarkers; i++) {
    const minutes = i * markerInterval;
    if (minutes > totalMinutes) break;

    const time = new Date(firstStart.getTime() + minutes * 60000);
    const position = (minutes / totalMinutes) * 100;

    markers.push({
      time,
      position,
      label: formatTime(time),
    });
  }

  return (
    <div className="relative h-8 mt-2">
      {markers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-0"
          style={{ left: `${marker.position}%` }}
        >
          <div className="w-px h-2 bg-gray-300" />
          <p className="text-xs text-gray-500 -translate-x-1/2 mt-1">
            {marker.label}
          </p>
        </div>
      ))}
    </div>
  );
}
