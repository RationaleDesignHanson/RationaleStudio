/**
 * Checkpoint Timeline Diagram
 * Timeline with risk decay curve
 * Bloomberg-style decision tree per InformationDesignAgent specs
 */

'use client';

import { useState } from 'react';

interface Checkpoint {
  week: number;
  title: string;
  riskLevel: number; // 0-100
  exitCost: string;
  activities: string[];
  yourTime: string;
}

export default function CheckpointTimelineDiagram() {
  const [hoveredCheckpoint, setHoveredCheckpoint] = useState<number | null>(null);

  const checkpoints: Checkpoint[] = [
    {
      week: 1,
      title: 'Core Hypothesis Defined',
      riskLevel: 100,
      exitCost: 'minimal',
      activities: ['Align on problem statement', 'Define success metrics', 'Sketch prototype 1-2'],
      yourTime: '3 hrs'
    },
    {
      week: 2,
      title: 'Prototypes 1-3 Tested',
      riskLevel: 50,
      exitCost: 'low',
      activities: ['User testing sessions', 'Core interaction validated', 'Information architecture tested'],
      yourTime: '6 hrs'
    },
    {
      week: 3,
      title: 'Architecture Locked',
      riskLevel: 25,
      exitCost: 'controlled',
      activities: ['Edge cases validated', 'Technical architecture approved', 'Production roadmap set'],
      yourTime: '6 hrs'
    },
  ];

  const svgWidth = 800;
  const svgHeight = 300;
  const padding = 60;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;

  // Calculate positions for checkpoints
  const getCheckpointX = (week: number) => {
    return padding + (chartWidth / 4) * (week - 1);
  };

  const getRiskY = (riskLevel: number) => {
    return padding + chartHeight * (1 - riskLevel / 100);
  };

  // Generate risk curve path
  const generateRiskCurve = () => {
    const points = checkpoints.map(cp => ({
      x: getCheckpointX(cp.week),
      y: getRiskY(cp.riskLevel)
    }));

    // Add final point at week 4 with 0 risk
    points.push({
      x: padding + chartWidth,
      y: getRiskY(0)
    });

    // Create smooth curve using quadratic bezier
    let path = `M ${padding} ${getRiskY(100)}`;

    for (let i = 0; i < points.length; i++) {
      if (i === 0) {
        path += ` L ${points[i].x} ${points[i].y}`;
      } else {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const midX = (prevPoint.x + currentPoint.x) / 2;
        path += ` Q ${prevPoint.x} ${currentPoint.y}, ${midX} ${currentPoint.y}`;
        path += ` Q ${currentPoint.x} ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
      }
    }

    return path;
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-2">De-Risk Checkpoints</h2>
        <p className="text-sm text-gray-400">
          Clear exit points reduce commitment risk
        </p>
      </div>

      {/* SVG Timeline */}
      <div className="mb-8 overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
          {/* Y-axis labels */}
          <text x={padding - 40} y={padding} className="text-xs fill-gray-500" textAnchor="end">100%</text>
          <text x={padding - 40} y={padding + chartHeight / 4} className="text-xs fill-gray-500" textAnchor="end">75%</text>
          <text x={padding - 40} y={padding + chartHeight / 2} className="text-xs fill-gray-500" textAnchor="end">50%</text>
          <text x={padding - 40} y={padding + 3 * chartHeight / 4} className="text-xs fill-gray-500" textAnchor="end">25%</text>
          <text x={padding - 40} y={padding + chartHeight} className="text-xs fill-gray-500" textAnchor="end">0%</text>
          <text x={padding - 50} y={padding - 20} className="text-xs fill-gray-400" textAnchor="middle">Risk</text>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + chartHeight * fraction}
              x2={padding + chartWidth}
              y2={padding + chartHeight * fraction}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.3"
            />
          ))}

          {/* Risk decay curve */}
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4444" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          <path
            d={generateRiskCurve()}
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth="3"
          />

          {/* Checkpoints */}
          {checkpoints.map((checkpoint, idx) => {
            const x = getCheckpointX(checkpoint.week);
            const y = getRiskY(checkpoint.riskLevel);
            const isHovered = hoveredCheckpoint === idx;

            return (
              <g key={idx}>
                {/* Vertical line to x-axis */}
                <line
                  x1={x}
                  y1={y}
                  x2={x}
                  y2={padding + chartHeight}
                  stroke="#6B7280"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Diamond checkpoint */}
                <path
                  d={`M ${x} ${y - 8} L ${x + 8} ${y} L ${x} ${y + 8} L ${x - 8} ${y} Z`}
                  fill={isHovered ? '#FFA500' : '#FFD700'}
                  stroke={isHovered ? '#FFD700' : '#FFF'}
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredCheckpoint(idx)}
                  onMouseLeave={() => setHoveredCheckpoint(null)}
                />

                {/* Week label */}
                <text
                  x={x}
                  y={padding + chartHeight + 20}
                  className="text-xs fill-gray-400"
                  textAnchor="middle"
                >
                  Week {checkpoint.week}
                </text>

                {/* Checkpoint title */}
                <text
                  x={x}
                  y={y - 20}
                  className="text-xs font-medium"
                  fill={isHovered ? '#FFD700' : '#9CA3AF'}
                  textAnchor="middle"
                >
                  {checkpoint.title.split(' ').map((word, i) => (
                    <tspan key={i} x={x} dy={i === 0 ? 0 : 12}>
                      {word}
                    </tspan>
                  ))}
                </text>

                {/* Exit cost badge */}
                <g transform={`translate(${x}, ${y + 25})`}>
                  <rect
                    x="-25"
                    y="0"
                    width="50"
                    height="16"
                    fill="#FF4444"
                    opacity="0.2"
                    rx="4"
                  />
                  <text
                    x="0"
                    y="11"
                    className="text-[9px] font-medium fill-[#FF4444]"
                    textAnchor="middle"
                  >
                    Exit: {checkpoint.exitCost}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Production phase */}
          <text
            x={padding + chartWidth}
            y={padding + chartHeight + 20}
            className="text-xs fill-gray-400"
            textAnchor="middle"
          >
            Week 4+
          </text>
          <text
            x={padding + chartWidth}
            y={getRiskY(0) - 10}
            className="text-xs font-medium fill-[#00FF94]"
            textAnchor="middle"
          >
            Production
          </text>
        </svg>
      </div>

      {/* Checkpoint details */}
      {hoveredCheckpoint !== null && (
        <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-bold text-white mb-1">
                Week {checkpoints[hoveredCheckpoint].week}: {checkpoints[hoveredCheckpoint].title}
              </div>
              <div className="text-xs text-gray-400">
                Your time investment: {checkpoints[hoveredCheckpoint].yourTime}
              </div>
            </div>
            <div className="text-xs font-medium text-[#FF4444]">
              {checkpoints[hoveredCheckpoint].exitCost} to exit
            </div>
          </div>
          <div className="space-y-1">
            {checkpoints[hoveredCheckpoint].activities.map((activity, idx) => (
              <div key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                <span className="text-[#FFD700]">→</span>
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Your investment summary */}
      <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="text-xs font-medium text-gray-400 mb-3">YOUR TIME INVESTMENT</div>
        <div className="grid grid-cols-3 gap-4">
          {checkpoints.map((cp, idx) => (
            <div key={idx}>
              <div className="text-xs text-gray-500 mb-1">Week {cp.week}</div>
              <div className="text-sm font-bold text-[#00FF94]">{cp.yourTime}</div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-[#00FF94]"
                  style={{ width: `${(parseInt(cp.yourTime) / 6) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
          Total: <span className="font-bold text-white">15 hours</span> across 3 weeks
        </div>
      </div>

      {/* Comparison */}
      <div className="pt-6 border-t border-gray-700">
        <div className="text-xs font-medium text-gray-400 mb-4">COMMITMENT COMPARISON</div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Traditional Approach</span>
              <span className="text-xs text-[#FF4444]">High risk</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF4444]" style={{ width: '100%' }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">No checkpoints until Month 4</div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Rationale Approach</span>
              <span className="text-xs text-[#FFD700]">Controlled risk</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD700]" style={{ width: '25%' }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">3 checkpoints in 3 weeks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
