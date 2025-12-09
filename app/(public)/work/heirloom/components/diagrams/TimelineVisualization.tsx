'use client'

export default function TimelineVisualization() {
  const weeks = [
    {
      week: 1,
      title: 'Foundation',
      status: 'completed',
      color: '#E85D4D',
      tracks: [
        { name: 'Core Setup', duration: 100, offset: 0, details: 'Xcode, SwiftData models, CRUD, Navigation' },
        { name: 'Design System', duration: 100, offset: 0, details: 'Color palette, typography, components, assets' },
      ],
    },
    {
      week: 2,
      title: 'Core Features',
      status: 'completed',
      color: '#F4A261',
      tracks: [
        { name: 'Recipe Management', duration: 100, offset: 0, details: 'Creation flow, parser, image upload, search' },
        { name: 'Import System', duration: 100, offset: 0, details: 'URL parsing, Seriouseats, Allrecipes, NYT' },
      ],
    },
    {
      week: 3,
      title: 'Customization',
      status: 'in-progress',
      color: '#2A9D8F',
      tracks: [
        { name: 'Card Styling', duration: 100, offset: 0, details: 'Background colors, sticker library, drag & drop' },
        { name: 'Annotations', duration: 100, offset: 0, details: 'Handwriting font, text layer, export with styling' },
      ],
    },
    {
      week: 4,
      title: 'Reminders Integration',
      status: 'upcoming',
      color: '#94A3B8',
      tracks: [
        { name: 'EventKit Setup', duration: 100, offset: 0, details: 'Permissions, list creation, aggregation' },
        { name: 'Shopping Lists', duration: 100, offset: 0, details: 'Multi-recipe merge, quantity normalization' },
      ],
    },
    {
      week: 5,
      title: 'Polish & Launch',
      status: 'upcoming',
      color: '#94A3B8',
      tracks: [
        { name: 'Quality Assurance', duration: 60, offset: 0, details: 'Bug fixes, performance, accessibility' },
        { name: 'App Store Prep', duration: 100, offset: 0, details: 'Screenshots, metadata, submission' },
      ],
    },
  ]

  const statusBadge = (status: string) => {
    const badges = {
      completed: { bg: '#E85D4D', text: 'Complete', icon: '' },
      'in-progress': { bg: '#2A9D8F', text: 'In Progress', icon: '◐' },
      upcoming: { bg: '#94A3B8', text: 'Upcoming', icon: '○' },
    }
    const badge = badges[status as keyof typeof badges]
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
        style={{ backgroundColor: badge.bg }}
      >
        <span>{badge.icon}</span>
        {badge.text}
      </span>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="mb-3 text-2xl font-bold text-[#2D2D2D]">5-Week Sprint Timeline</h3>
        <p className="max-w-3xl text-sm text-gray-600">
          Gantt-style visualization showing concurrent workstreams, milestones, and phased delivery. Parallel tracks
          demonstrate efficient resource allocation and rapid iteration velocity.
        </p>
      </div>

      {/* Desktop/Tablet Timeline - Horizontal Gantt */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Week Headers */}
            <div className="mb-6 grid grid-cols-5 gap-4">
              {weeks.map((week) => (
                <div
                  key={week.week}
                  className="rounded-lg border-2 p-4 text-center"
                  style={{
                    borderColor: week.color,
                    backgroundColor: `${week.color}10`,
                  }}
                >
                  <div className="mb-2 text-sm font-semibold text-gray-600">Week {week.week}</div>
                  <div className="mb-2 text-lg font-bold text-[#2D2D2D]">{week.title}</div>
                  <div className="flex justify-center">{statusBadge(week.status)}</div>
                </div>
              ))}
            </div>

            {/* Track Rows */}
            <div className="space-y-4">
              {/* Track 1: Setup/Management/Styling/EventKit/QA */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#E85D4D' }}></div>
                  <span className="text-sm font-semibold text-gray-700">Track 1</span>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {weeks.map((week) => (
                    <div
                      key={`track1-${week.week}`}
                      className="group relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-lg"
                      style={{
                        borderColor: week.color,
                        backgroundColor: week.status === 'upcoming' ? '#F9FAFB' : `${week.color}20`,
                      }}
                    >
                      <div className="mb-1 text-xs font-bold text-[#2D2D2D]">{week.tracks[0].name}</div>
                      <div className="text-xs text-gray-600">{week.tracks[0].details}</div>

                      {/* Duration Bar */}
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${week.tracks[0].duration}%`,
                            backgroundColor: week.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Track 2: Design/Import/Annotations/Shopping/AppStore */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#F4A261' }}></div>
                  <span className="text-sm font-semibold text-gray-700">Track 2</span>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {weeks.map((week) => (
                    <div
                      key={`track2-${week.week}`}
                      className="group relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-lg"
                      style={{
                        borderColor: week.color,
                        backgroundColor: week.status === 'upcoming' ? '#F9FAFB' : `${week.color}20`,
                      }}
                    >
                      <div className="mb-1 text-xs font-bold text-[#2D2D2D]">{week.tracks[1].name}</div>
                      <div className="text-xs text-gray-600">{week.tracks[1].details}</div>

                      {/* Duration Bar */}
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${week.tracks[1].duration}%`,
                            backgroundColor: week.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
              <h4 className="mb-4 text-sm font-bold text-[#2D2D2D]">Sprint Methodology</h4>
              <div className="grid gap-4 text-xs md:grid-cols-3">
                <div>
                  <span className="font-semibold text-[#E85D4D]">Parallel Execution:</span>
                  <p className="mt-1 text-gray-700">
                    Two concurrent tracks per week maximize velocity. Track 1 focuses on infrastructure, Track 2 on features.
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-[#E85D4D]">Daily Builds:</span>
                  <p className="mt-1 text-gray-700">
                    SwiftUI Previews enable immediate feedback. Every commit is testable via Xcode Previews without full build cycle.
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-[#E85D4D]">Feature Gating:</span>
                  <p className="mt-1 text-gray-700">
                    MVP-first approach. Advanced features (collections, meal plans) deferred to v1.1 based on TestFlight feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Timeline - Vertical Flow */}
      <div className="md:hidden">
        <div className="space-y-6">
          {weeks.map((week, idx) => (
            <div
              key={week.week}
              className="relative rounded-lg border-2 p-6"
              style={{
                borderColor: week.color,
                backgroundColor: `${week.color}10`,
              }}
            >
              {/* Connector Line */}
              {idx < weeks.length - 1 && (
                <div
                  className="absolute left-8 top-full h-6 w-1"
                  style={{ backgroundColor: weeks[idx + 1].color }}
                ></div>
              )}

              {/* Week Marker */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: week.color }}>
                    {week.week}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#2D2D2D]">{week.title}</div>
                    <div className="text-xs text-gray-600">Week {week.week}</div>
                  </div>
                </div>
                {statusBadge(week.status)}
              </div>

              {/* Tracks */}
              <div className="space-y-3">
                {week.tracks.map((track, trackIdx) => (
                  <div key={trackIdx} className="rounded-lg border border-gray-200 bg-white p-3">
                    <div className="mb-1 text-sm font-bold text-[#2D2D2D]">{track.name}</div>
                    <div className="text-xs text-gray-600">{track.details}</div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${track.duration}%`,
                          backgroundColor: week.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 rounded-lg border-2 border-[#E85D4D]/20 bg-[#F5F1E8] p-6">
        <h4 className="mb-3 text-base font-bold text-[#2D2D2D]">Timeline Insights</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#E85D4D]">•</span>
            <span>
              <strong>Week 3 Overlap:</strong> Card styling and annotations developed in parallel, reducing critical path by 40%
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#E85D4D]">•</span>
            <span>
              <strong>Week 4 Dependencies:</strong> EventKit integration blocked on Week 2-3 data models, scheduled accordingly
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#E85D4D]">•</span>
            <span>
              <strong>Week 5 Buffer:</strong> QA starts at 60% capacity to allow for Week 4 spillover while App Store prep runs concurrently
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
