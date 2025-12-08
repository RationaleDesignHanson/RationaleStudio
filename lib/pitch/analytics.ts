/**
 * Automated Pitch Analytics
 *
 * Track and analyze pitch performance metrics
 * Provide insights for optimization
 */

export interface PitchMetrics {
  id: string;
  company: string;
  vertical: string;
  template: string;
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  repliedAt?: Date;
  meetingScheduledAt?: Date;
  outcome?: 'qualified' | 'not-interested' | 'wrong-timing' | 'closed-won' | 'closed-lost';
  score: number;
}

export interface AnalyticsReport {
  period: 'week' | 'month' | 'quarter';
  totalPitches: number;
  metrics: {
    openRate: number;
    clickRate: number;
    replyRate: number;
    meetingRate: number;
    qualificationRate: number;
  };
  byVertical: Record<string, {
    count: number;
    openRate: number;
    replyRate: number;
    avgScore: number;
  }>;
  byTemplate: Record<string, {
    count: number;
    openRate: number;
    replyRate: number;
  }>;
  topPerformers: PitchMetrics[];
  insights: string[];
}

/**
 * Calculate metrics from pitch data
 */
export function calculateMetrics(pitches: PitchMetrics[]): AnalyticsReport['metrics'] {
  const total = pitches.length;

  if (total === 0) {
    return {
      openRate: 0,
      clickRate: 0,
      replyRate: 0,
      meetingRate: 0,
      qualificationRate: 0
    };
  }

  return {
    openRate: (pitches.filter(p => p.openedAt).length / total) * 100,
    clickRate: (pitches.filter(p => p.clickedAt).length / total) * 100,
    replyRate: (pitches.filter(p => p.repliedAt).length / total) * 100,
    meetingRate: (pitches.filter(p => p.meetingScheduledAt).length / total) * 100,
    qualificationRate: (pitches.filter(p => p.outcome === 'qualified' || p.outcome === 'closed-won').length / total) * 100
  };
}

/**
 * Analyze performance by vertical
 */
export function analyzeByVertical(pitches: PitchMetrics[]): Record<string, {
  count: number;
  openRate: number;
  replyRate: number;
  avgScore: number;
}> {
  const verticals: Record<string, PitchMetrics[]> = {};

  pitches.forEach(pitch => {
    if (!verticals[pitch.vertical]) {
      verticals[pitch.vertical] = [];
    }
    verticals[pitch.vertical].push(pitch);
  });

  const result: Record<string, any> = {};

  for (const [vertical, vPitches] of Object.entries(verticals)) {
    result[vertical] = {
      count: vPitches.length,
      openRate: (vPitches.filter(p => p.openedAt).length / vPitches.length) * 100,
      replyRate: (vPitches.filter(p => p.repliedAt).length / vPitches.length) * 100,
      avgScore: vPitches.reduce((sum, p) => sum + p.score, 0) / vPitches.length
    };
  }

  return result;
}

/**
 * Analyze performance by template
 */
export function analyzeByTemplate(pitches: PitchMetrics[]): Record<string, {
  count: number;
  openRate: number;
  replyRate: number;
}> {
  const templates: Record<string, PitchMetrics[]> = {};

  pitches.forEach(pitch => {
    if (!templates[pitch.template]) {
      templates[pitch.template] = [];
    }
    templates[pitch.template].push(pitch);
  });

  const result: Record<string, any> = {};

  for (const [template, tPitches] of Object.entries(templates)) {
    result[template] = {
      count: tPitches.length,
      openRate: (tPitches.filter(p => p.openedAt).length / tPitches.length) * 100,
      replyRate: (tPitches.filter(p => p.repliedAt).length / tPitches.length) * 100
    };
  }

  return result;
}

/**
 * Generate insights from pitch data
 */
export function generateInsights(pitches: PitchMetrics[]): string[] {
  const insights: string[] = [];
  const metrics = calculateMetrics(pitches);
  const byVertical = analyzeByVertical(pitches);
  const byTemplate = analyzeByTemplate(pitches);

  // Open rate insights
  if (metrics.openRate < 30) {
    insights.push(`Open rate (${metrics.openRate.toFixed(1)}%) is below benchmark. Consider testing new subject lines.`);
  } else if (metrics.openRate > 50) {
    insights.push(`Strong open rate (${metrics.openRate.toFixed(1)}%). Current subject line strategy is working.`);
  }

  // Reply rate insights
  if (metrics.replyRate < 5) {
    insights.push(`Reply rate (${metrics.replyRate.toFixed(1)}%) is low. Review pitch messaging and value proposition.`);
  } else if (metrics.replyRate > 15) {
    insights.push(`Excellent reply rate (${metrics.replyRate.toFixed(1)}%). Message resonance is strong.`);
  }

  // Vertical performance
  const verticalEntries = Object.entries(byVertical);
  if (verticalEntries.length > 1) {
    const topVertical = verticalEntries.reduce((a, b) =>
      a[1].replyRate > b[1].replyRate ? a : b
    );
    insights.push(`${topVertical[0]} performs best (${topVertical[1].replyRate.toFixed(1)}% reply rate). Consider focusing more outreach here.`);
  }

  // Template performance
  const templateEntries = Object.entries(byTemplate);
  if (templateEntries.length > 1) {
    const topTemplate = templateEntries.reduce((a, b) =>
      a[1].replyRate > b[1].replyRate ? a : b
    );
    insights.push(`"${topTemplate[0]}" template has highest reply rate (${topTemplate[1].replyRate.toFixed(1)}%). Use as baseline for other templates.`);
  }

  // Meeting conversion
  if (metrics.replyRate > 0) {
    const meetingConversion = (metrics.meetingRate / metrics.replyRate) * 100;
    if (meetingConversion < 30) {
      insights.push(`Only ${meetingConversion.toFixed(1)}% of replies convert to meetings. Improve call-to-action or qualification criteria.`);
    }
  }

  // Score correlation
  const qualifiedPitches = pitches.filter(p => p.outcome === 'qualified' || p.outcome === 'closed-won');
  if (qualifiedPitches.length > 0) {
    const avgQualifiedScore = qualifiedPitches.reduce((sum, p) => sum + p.score, 0) / qualifiedPitches.length;
    const avgAllScore = pitches.reduce((sum, p) => sum + p.score, 0) / pitches.length;

    if (avgQualifiedScore > avgAllScore + 10) {
      insights.push(`Qualified leads have ${avgQualifiedScore.toFixed(0)} avg score vs ${avgAllScore.toFixed(0)} overall. Prioritize higher-scored leads.`);
    }
  }

  return insights;
}

/**
 * Generate comprehensive analytics report
 */
export function generateAnalyticsReport(
  pitches: PitchMetrics[],
  period: 'week' | 'month' | 'quarter'
): AnalyticsReport {
  // Sort pitches by score descending
  const topPerformers = [...pitches]
    .filter(p => p.outcome === 'qualified' || p.outcome === 'closed-won')
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    period,
    totalPitches: pitches.length,
    metrics: calculateMetrics(pitches),
    byVertical: analyzeByVertical(pitches),
    byTemplate: analyzeByTemplate(pitches),
    topPerformers,
    insights: generateInsights(pitches)
  };
}

/**
 * Benchmark comparison
 */
export const industryBenchmarks = {
  openRate: {
    low: 20,
    average: 35,
    good: 50,
    excellent: 65
  },
  replyRate: {
    low: 3,
    average: 8,
    good: 15,
    excellent: 25
  },
  meetingRate: {
    low: 1,
    average: 3,
    good: 7,
    excellent: 12
  }
};

/**
 * Compare metrics against benchmarks
 */
export function compareToBenchmarks(metrics: AnalyticsReport['metrics']): Record<string, 'below' | 'average' | 'good' | 'excellent'> {
  const compare = (value: number, benchmarks: { low: number; average: number; good: number; excellent: number }): 'below' | 'average' | 'good' | 'excellent' => {
    if (value >= benchmarks.excellent) return 'excellent';
    if (value >= benchmarks.good) return 'good';
    if (value >= benchmarks.average) return 'average';
    return 'below';
  };

  return {
    openRate: compare(metrics.openRate, industryBenchmarks.openRate),
    replyRate: compare(metrics.replyRate, industryBenchmarks.replyRate),
    meetingRate: compare(metrics.meetingRate, industryBenchmarks.meetingRate)
  };
}
