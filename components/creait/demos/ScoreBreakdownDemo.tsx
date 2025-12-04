'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { H3, BodyMD, LabelSM, DataLG } from '@/components/creait/typography';

const SCORE_COMPONENTS = [
  {
    name: 'Timing Signals',
    value: 35,
    description: 'Lease expiry + debt maturity = perfect timing',
    color: CRE_COLORS.score.critical,
  },
  {
    name: 'Relationship Strength',
    value: 25,
    description: 'Warm introduction from mutual contact',
    color: CRE_COLORS.primary,
  },
  {
    name: 'Property Fit',
    value: 20,
    description: 'Matches your expertise (Office, $50M+)',
    color: CRE_COLORS.secondary,
  },
  {
    name: 'Market Activity',
    value: 12,
    description: 'High transaction volume in submarket',
    color: CRE_COLORS.accent,
  },
  {
    name: 'Data Confidence',
    value: 8,
    description: 'High-quality data from multiple sources',
    color: CRE_COLORS.score.medium,
  },
];

const HISTORICAL_SCORES = [
  { date: 'Jan 15', score: 45 },
  { date: 'Feb 1', score: 52 },
  { date: 'Feb 15', score: 58 },
  { date: 'Mar 1', score: 65 },
  { date: 'Mar 15', score: 78 },
  { date: 'Apr 1', score: 85 },
  { date: 'Apr 15', score: 92 },
];

/**
 * ScoreBreakdownDemo - Visual breakdown of opportunity score
 *
 * Shows:
 * - Pie chart of score components
 * - Historical score trend
 * - Component descriptions
 */
export default function ScoreBreakdownDemo() {
  const totalScore = SCORE_COMPONENTS.reduce((sum, component) => sum + component.value, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <DataLG color={CRE_COLORS.score.critical} className="mb-2">
          {totalScore}
        </DataLG>
        <H3 className="mb-2">Overall Opportunity Score</H3>
        <BodyMD color={CRE_COLORS.text.secondary}>
          Gateway Office Tower - Pacific Real Estate Group
        </BodyMD>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Pie Chart */}
        <div>
          <H3 className="mb-4">Score Composition</H3>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={SCORE_COMPONENTS}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {SCORE_COMPONENTS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-6 space-y-3">
              {SCORE_COMPONENTS.map((component, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-4 h-4 rounded-full mt-1"
                    style={{ backgroundColor: component.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <LabelSM style={{ color: component.color }}>
                        {component.name}
                      </LabelSM>
                      <LabelSM style={{ color: component.color }}>
                        {component.value}%
                      </LabelSM>
                    </div>
                    <BodyMD color={CRE_COLORS.text.muted} className="text-xs">
                      {component.description}
                    </BodyMD>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Historical Trend */}
        <div>
          <H3 className="mb-4">Score Trend (90 Days)</H3>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={HISTORICAL_SCORES}>
                <XAxis
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.3)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="rgba(255, 255, 255, 0.3)"
                  style={{ fontSize: '12px' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="score" fill={CRE_COLORS.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Trend Analysis */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-2xl">📈</span>
                <div>
                  <LabelSM color={CRE_COLORS.success}>UPWARD TREND</LabelSM>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm mt-1">
                    Score increased 47 points in 90 days
                  </BodyMD>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                <span className="text-2xl">⏰</span>
                <div>
                  <LabelSM color={CRE_COLORS.primary}>KEY EVENT</LabelSM>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm mt-1">
                    Lease expiry detected on Mar 15 (+15 points)
                  </BodyMD>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <span className="text-2xl">🤝</span>
                <div>
                  <LabelSM color={CRE_COLORS.secondary}>NEW RELATIONSHIP</LabelSM>
                  <BodyMD color={CRE_COLORS.text.secondary} className="text-sm mt-1">
                    Warm intro from John Smith on Apr 1 (+7 points)
                  </BodyMD>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Score Matters */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-sky-500/20">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <H3 className="mb-3">Why This Score is High</H3>
            <BodyMD color={CRE_COLORS.text.secondary} className="mb-3">
              This opportunity ranks in the <strong>top 5%</strong> of your pipeline because:
            </BodyMD>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <BodyMD color={CRE_COLORS.text.secondary}>
                  <strong>Perfect timing:</strong> Lease expires in 90 days AND debt matures in 6
                  months
                </BodyMD>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <BodyMD color={CRE_COLORS.text.secondary}>
                  <strong>Warm relationship:</strong> Mutual contact John Smith can make intro
                </BodyMD>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <BodyMD color={CRE_COLORS.text.secondary}>
                  <strong>Your expertise:</strong> Matches your focus (Office, $50M+ deals)
                </BodyMD>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
