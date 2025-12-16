// Time Calculator for Dinner Party Timeline
// Calculates when to start each recipe to have everything ready at meal time

export interface RecipeTime {
  recipeId: string;
  recipeName: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  canCookSimultaneously: boolean; // Can this be done while other recipes cook?
}

export interface RecipeTimeline {
  recipeId: string;
  recipeName: string;
  startTime: Date;
  prepStartTime: Date;
  cookStartTime: Date;
  finishTime: Date;
  totalDuration: number; // minutes
  prepTime: number;
  cookTime: number;
  status: 'upcoming' | 'prep' | 'cooking' | 'completed';
  progress: number; // 0-100
}

export interface TimelineSlot {
  recipeId: string;
  recipeName: string;
  phase: 'prep' | 'cook';
  startMinutes: number; // minutes from first recipe start
  durationMinutes: number;
  color: string;
}

// ========== TIME CALCULATION ==========

/**
 * Calculate when to start each recipe to have everything ready by mealTime
 * Uses a reverse timeline approach (working backwards from meal time)
 */
export function calculateRecipeTimeline(
  recipes: RecipeTime[],
  mealTime: Date
): RecipeTimeline[] {
  // Sort recipes by total time (longest first)
  const sortedRecipes = [...recipes].sort((a, b) => {
    const totalA = a.prepTime + a.cookTime;
    const totalB = b.prepTime + b.cookTime;
    return totalB - totalA;
  });

  const timelines: RecipeTimeline[] = [];
  let currentCookingEnd = mealTime;

  for (let i = 0; i < sortedRecipes.length; i++) {
    const recipe = sortedRecipes[i];
    const totalTime = recipe.prepTime + recipe.cookTime;

    // Calculate finish time (when this recipe should be done)
    const finishTime = new Date(currentCookingEnd);

    // Calculate when cooking starts (finish - cook time)
    const cookStartTime = new Date(finishTime.getTime() - recipe.cookTime * 60000);

    // Calculate when prep starts (cook start - prep time)
    const prepStartTime = new Date(cookStartTime.getTime() - recipe.prepTime * 60000);

    timelines.push({
      recipeId: recipe.recipeId,
      recipeName: recipe.recipeName,
      startTime: prepStartTime,
      prepStartTime,
      cookStartTime,
      finishTime,
      totalDuration: totalTime,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      status: 'upcoming',
      progress: 0,
    });

    // If this recipe can't cook simultaneously, next recipe finishes before this one starts cooking
    if (!recipe.canCookSimultaneously) {
      currentCookingEnd = cookStartTime;
    }
  }

  // Sort by start time (earliest first)
  return timelines.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

/**
 * Update timeline status based on current time
 */
export function updateTimelineStatus(
  timelines: RecipeTimeline[],
  currentTime: Date
): RecipeTimeline[] {
  return timelines.map((timeline) => {
    const now = currentTime.getTime();
    const start = timeline.startTime.getTime();
    const prepEnd = timeline.cookStartTime.getTime();
    const finish = timeline.finishTime.getTime();

    let status: RecipeTimeline['status'] = 'upcoming';
    let progress = 0;

    if (now >= finish) {
      status = 'completed';
      progress = 100;
    } else if (now >= prepEnd) {
      status = 'cooking';
      const cookElapsed = now - prepEnd;
      const cookTotal = finish - prepEnd;
      progress = Math.min(100, (cookElapsed / cookTotal) * 100);
    } else if (now >= start) {
      status = 'prep';
      const prepElapsed = now - start;
      const prepTotal = prepEnd - start;
      progress = Math.min(100, (prepElapsed / prepTotal) * 100);
    } else {
      status = 'upcoming';
      progress = 0;
    }

    return {
      ...timeline,
      status,
      progress,
    };
  });
}

// ========== TIMELINE VISUALIZATION ==========

const RECIPE_COLORS = [
  '#F59E0B', // Amber
  '#10B981', // Green
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#14B8A6', // Teal
];

/**
 * Convert recipe timelines to visualization slots
 * Returns slots for Gantt-chart style visualization
 */
export function createTimelineSlots(timelines: RecipeTimeline[]): TimelineSlot[] {
  if (timelines.length === 0) return [];

  const firstStart = Math.min(...timelines.map((t) => t.startTime.getTime()));
  const slots: TimelineSlot[] = [];

  timelines.forEach((timeline, index) => {
    const color = RECIPE_COLORS[index % RECIPE_COLORS.length];

    // Calculate minutes from first recipe start
    const prepStartMinutes = (timeline.prepStartTime.getTime() - firstStart) / 60000;
    const cookStartMinutes = (timeline.cookStartTime.getTime() - firstStart) / 60000;

    // Add prep slot
    slots.push({
      recipeId: timeline.recipeId,
      recipeName: timeline.recipeName,
      phase: 'prep',
      startMinutes: prepStartMinutes,
      durationMinutes: timeline.prepTime,
      color,
    });

    // Add cook slot
    slots.push({
      recipeId: timeline.recipeId,
      recipeName: timeline.recipeName,
      phase: 'cook',
      startMinutes: cookStartMinutes,
      durationMinutes: timeline.cookTime,
      color,
    });
  });

  return slots;
}

/**
 * Calculate total time span (minutes)
 */
export function calculateTotalTimeSpan(timelines: RecipeTimeline[]): number {
  if (timelines.length === 0) return 0;

  const firstStart = Math.min(...timelines.map((t) => t.startTime.getTime()));
  const lastFinish = Math.max(...timelines.map((t) => t.finishTime.getTime()));

  return (lastFinish - firstStart) / 60000;
}

// ========== FORMATTING ==========

/**
 * Format minutes as "Xh Ym" or "Xm"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

/**
 * Format time as "3:30 PM"
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format time range as "3:30 PM - 4:15 PM"
 */
export function formatTimeRange(start: Date, end: Date): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

/**
 * Get status label and color
 */
export function getStatusInfo(status: RecipeTimeline['status']): { label: string; color: string; icon: string } {
  switch (status) {
    case 'upcoming':
      return { label: 'Coming Up', color: 'var(--color-neutral-400)', icon: '⏳' };
    case 'prep':
      return { label: 'Prepping', color: 'var(--color-warning)', icon: '🔪' };
    case 'cooking':
      return { label: 'Cooking', color: 'var(--color-error)', icon: '🔥' };
    case 'completed':
      return { label: 'Done!', color: 'var(--color-success)', icon: '✓' };
  }
}

/**
 * Get time until/since event
 */
export function getTimeDescription(targetTime: Date, currentTime: Date): string {
  const diff = targetTime.getTime() - currentTime.getTime();
  const minutes = Math.abs(Math.floor(diff / 60000));

  if (diff > 0) {
    // Future
    if (minutes === 0) return 'Starting now';
    if (minutes === 1) return 'Starts in 1 minute';
    if (minutes < 60) return `Starts in ${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `Starts in ${hours}h`;
    return `Starts in ${hours}h ${mins}m`;
  } else {
    // Past
    if (minutes === 0) return 'Just started';
    if (minutes === 1) return 'Started 1 minute ago';
    if (minutes < 60) return `Started ${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `Started ${hours}h ago`;
    return `Started ${hours}h ${mins}m ago`;
  }
}
