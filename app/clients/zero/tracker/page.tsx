'use client';

/**
 * Zero Execution Tracker
 * Real-time 24-week execution roadmap with Firebase
 */

import { useState } from 'react';
import { useProjects, useCheckpoints, useWeeks } from '@/hooks/useFirestore';
import { ZeroASCIIGrid, GlassCard } from '@/components/visual';

export default function ZeroTrackerPage() {
  const { projects, loading: projectsLoading } = useProjects();
  const zeroIosProject = projects.find((p) => p.id === 'zero-ios');
  const { checkpoints, loading: checkpointsLoading } = useCheckpoints('zero-ios', 5);
  const { weeks, loading: weeksLoading } = useWeeks('zero-ios');

  // Week navigation state
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Get current week data
  const currentWeekData = weeks.find((w) => w.weekNumber === selectedWeek);

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <ZeroASCIIGrid />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <GlassCard className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
            <p className="text-[#FFD700] font-mono">Loading execution tracker...</p>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ZeroASCIIGrid />

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-[#FFD700] font-mono tracking-tight">
              ZERO EXECUTION TRACKER
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Real-time 24-week roadmap with multi-agent evaluation
            </p>
          </header>

          {/* Project Overview */}
          {zeroIosProject && (
            <GlassCard className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-1 text-[#FFD700] font-mono">
                    {zeroIosProject.name}
                  </h2>
                  <p className="text-gray-400 font-mono text-sm">{zeroIosProject.description}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded font-mono text-xs font-medium border ${
                    zeroIosProject.health === 'on-track'
                      ? 'bg-green-900/20 text-green-400 border-green-600'
                      : zeroIosProject.health === 'at-risk'
                      ? 'bg-yellow-900/20 text-yellow-400 border-yellow-600'
                      : 'bg-red-900/20 text-red-400 border-red-600'
                  }`}
                >
                  {zeroIosProject.health.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 flex gap-6">
                <div>
                  <span className="text-gray-400 text-xs font-mono block mb-1">CURRENT WEEK</span>
                  <p className="text-2xl font-bold text-[#FFD700] font-mono">
                    {zeroIosProject.currentWeek || 0}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-xs font-mono block mb-1">PROGRESS</span>
                  <p className="text-2xl font-bold text-[#FFD700] font-mono">
                    {zeroIosProject.overallProgress || 0}%
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Week Navigation Bar */}
          {!weeksLoading && weeks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#FFD700] font-mono">
                WEEK NAVIGATION
              </h3>
              <GlassCard>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {weeks.map((week) => (
                    <button
                      key={week.weekNumber}
                      onClick={() => setSelectedWeek(week.weekNumber)}
                      className={`flex-shrink-0 px-4 py-2 rounded text-xs font-mono font-medium transition-all border ${
                        selectedWeek === week.weekNumber
                          ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]'
                          : (week as any).isCheckpoint
                          ? 'bg-purple-900/20 text-purple-400 border-purple-600 hover:bg-purple-900/30'
                          : 'bg-white/5 text-gray-400 border-gray-700 hover:bg-white/10'
                      }`}
                    >
                      WEEK {week.weekNumber}
                      {(week as any).isCheckpoint && ' 🎯'}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Current Week Details */}
          {currentWeekData ? (
            <div className="space-y-6">
              {/* Week Header Card */}
              <GlassCard>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-[#FFD700] font-mono">
                      WEEK {currentWeekData.weekNumber}: {(currentWeekData as any).title}
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">{(currentWeekData as any).focus}</p>
                  </div>
                  {(currentWeekData as any).isCheckpoint && (
                    <span className="px-3 py-1 rounded text-xs font-mono font-medium bg-purple-900/20 text-purple-400 border border-purple-600">
                      CHECKPOINT
                    </span>
                  )}
                </div>
              </GlassCard>

              {/* Tasks */}
              {currentWeekData.tasks && currentWeekData.tasks.length > 0 && (
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-4 text-[#FFD700] font-mono">TASKS</h3>
                  <div className="space-y-3">
                    {currentWeekData.tasks.map((task, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-white/5 rounded border border-gray-800"
                      >
                        <span className="text-2xl flex-shrink-0">
                          {task.status === 'complete'
                            ? '✅'
                            : task.status === 'in-progress'
                            ? '⏳'
                            : task.status === 'blocked'
                            ? '🔴'
                            : '⭕'}
                        </span>
                        <div className="flex-1">
                          <p
                            className={`font-mono text-sm ${
                              task.status === 'complete'
                                ? 'line-through text-gray-600'
                                : 'text-gray-300'
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.assignee && (
                            <p className="text-xs text-gray-500 mt-1 font-mono">
                              → {task.assignee}
                            </p>
                          )}
                        </div>
                        <span
                          className={`text-xs font-mono px-2 py-1 rounded ${
                            task.priority === 'critical'
                              ? 'bg-red-900/20 text-red-400'
                              : task.priority === 'high'
                              ? 'bg-orange-900/20 text-orange-400'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Deliverables */}
              {currentWeekData.deliverables && currentWeekData.deliverables.length > 0 && (
                <GlassCard>
                  <h3 className="text-xl font-semibold mb-4 text-[#FFD700] font-mono">
                    DELIVERABLES
                  </h3>
                  <div className="space-y-2">
                    {currentWeekData.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-[#FFD700] mt-1 font-mono">▸</span>
                        <p className="text-gray-300 font-mono text-sm">
                          {deliverable.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Quality Gate (for checkpoint weeks) */}
              {(currentWeekData as any).qualityGate &&
                (currentWeekData as any).qualityGate.length > 0 && (
                  <GlassCard className="border-purple-700">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400 font-mono">
                      QUALITY GATE CRITERIA
                    </h3>
                    <div className="space-y-2">
                      {(currentWeekData as any).qualityGate.map((criterion: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">🎯</span>
                          <p className="text-gray-300 font-mono text-sm">{criterion}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}
            </div>
          ) : weeksLoading ? (
            <div className="text-center py-12">
              <GlassCard className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
                <p className="text-gray-400 font-mono text-sm">Loading week data...</p>
              </GlassCard>
            </div>
          ) : (
            <GlassCard className="text-center py-8">
              <p className="text-gray-400 font-mono text-sm">
                No week data available. Update your execution strategy to initialize weeks.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
