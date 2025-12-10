'use client';

/**
 * Mobile-optimized RevenueRampDiagram
 * 4-milestone revenue progression shown as stacked cards
 */
export default function RevenueRampDiagramMobile() {
  const milestones = [
    {
      month: 3,
      customers: 5,
      arr: '$30K',
      label: 'MVP Launch + Pilots',
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-500',
    },
    {
      month: 6,
      customers: 30,
      arr: '$180K',
      label: 'Early Adopters',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500',
    },
    {
      month: 9,
      customers: 50,
      arr: '$300K',
      label: 'Product-Market Fit',
      color: 'from-red-500 to-pink-500',
      borderColor: 'border-red-500',
    },
    {
      month: 12,
      customers: 60,
      arr: '$361K',
      label: 'Growth Phase',
      color: 'from-pink-500 to-purple-500',
      borderColor: 'border-pink-500',
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          12-Month Revenue Ramp
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Path to $361K ARR in Year 1
        </p>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.month}
            className={`bg-gradient-to-r ${milestone.color}/20 border-2 ${milestone.borderColor}/50 rounded-lg p-5 relative`}
          >
            {/* Month Badge */}
            <div className={`absolute -top-3 left-4 bg-gradient-to-r ${milestone.color} px-3 py-1 rounded-full`}>
              <span className="text-white font-bold text-xs">Month {milestone.month}</span>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="text-white font-bold text-sm">{milestone.label}</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{milestone.customers} customers</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent">
                    {milestone.arr}
                  </div>
                  <div className="text-xs text-gray-500">ARR</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${milestone.color}`}
                  style={{width: `${(index + 1) * 25}%`}}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
        <h4 className="text-purple-400 font-bold text-sm mb-2 text-center">
          Conservative Growth Trajectory
        </h4>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="text-center">
            <div className="text-purple-400 font-bold text-2xl font-mono">12x</div>
            <div className="text-xs text-gray-500">Customer Growth</div>
            <div className="text-xs text-gray-600 mt-1">5 → 60 customers</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold text-2xl font-mono">12x</div>
            <div className="text-xs text-gray-500">ARR Growth</div>
            <div className="text-xs text-gray-600 mt-1">$30K → $361K</div>
          </div>
        </div>
      </div>
    </div>
  );
}
