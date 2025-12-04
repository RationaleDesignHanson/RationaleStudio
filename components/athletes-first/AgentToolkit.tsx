"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Mail,
  Phone,
  Video,
  Briefcase,
  Target,
  Bell,
  X,
} from "lucide-react";

type View = "pipeline" | "clients" | "tasks" | "insights";

interface AgentToolkitProps {
  showHeader?: boolean;
}

export default function AgentToolkit({ showHeader = true }: AgentToolkitProps = {}) {
  const [activeView, setActiveView] = useState<View>("pipeline");
  const [pipelinePage, setPipelinePage] = useState(0);
  const itemsPerPage = 2;
  const [selectedProspect, setSelectedProspect] = useState<typeof recruitingPipeline[0] | null>(null);
  const [selectedClient, setSelectedClient] = useState<typeof activeClients[0] | null>(null);

  const views = [
    { id: "pipeline" as View, label: "Recruiting Pipeline", shortLabel: "Pipeline", icon: Users },
    { id: "clients" as View, label: "Active Clients", shortLabel: "Clients", icon: Briefcase },
    { id: "tasks" as View, label: "Tasks & Briefs", shortLabel: "Tasks", icon: CheckCircle2 },
    { id: "insights" as View, label: "Insights", shortLabel: "Insights", icon: TrendingUp },
  ];

  const recruitingPipeline = [
    {
      name: "Marcus Thompson",
      position: "QB",
      school: "Mater Dei HS",
      status: "Hot",
      stage: "Meeting Scheduled",
      nextAction: "In-home visit - Thu 3pm",
      priority: "high",
    },
    {
      name: "Kai Rodriguez",
      position: "WR",
      school: "St. John Bosco",
      status: "Warm",
      stage: "Initial Contact",
      nextAction: "Follow-up video call",
      priority: "medium",
    },
    {
      name: "DeAndre Jackson",
      position: "OL",
      school: "IMG Academy",
      status: "Hot",
      stage: "Decision Phase",
      nextAction: "Contract presentation - Tomorrow",
      priority: "high",
    },
    {
      name: "Tyler Chen",
      position: "DB",
      school: "Bishop Gorman",
      status: "Cold",
      stage: "Research",
      nextAction: "Send RecruitAI intro",
      priority: "low",
    },
  ];

  const activeClients = [
    {
      name: "Jordan Matthews",
      sport: "Football",
      contract: "Rookie Deal",
      deals: 5,
      urgent: "Nike campaign due Fri",
    },
    {
      name: "Sarah Chen",
      sport: "Basketball",
      contract: "2nd Year",
      deals: 8,
      urgent: "Gatorade photoshoot tomorrow",
    },
    {
      name: "Andre Williams",
      sport: "Football",
      contract: "Extension Talks",
      deals: 12,
      urgent: "Contract review needed",
    },
  ];

  const tasks = [
    {
      client: "Jordan Matthews",
      task: "Review Nike contract addendum",
      due: "Today 5pm",
      status: "urgent",
    },
    {
      client: "Marcus Thompson",
      task: "Prepare in-home presentation",
      due: "Tomorrow",
      status: "high",
    },
    {
      client: "Sarah Chen",
      task: "Coordinate travel to LA",
      due: "This week",
      status: "normal",
    },
    {
      client: "All Prospects",
      task: "Weekly recruiting report",
      due: "Friday",
      status: "normal",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {showHeader && (
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/20 rounded-lg p-3 mb-3">
              <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
                The Agent's Command Center
              </div>
              <div className="text-xs md:text-sm text-white/60 leading-snug">
                Everything you need to recruit, manage, and grow—in one place
              </div>
            </div>
          )}

          {/* View Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto mb-8 md:mb-12"
          >
            <div className="flex flex-nowrap items-center justify-start md:justify-center gap-3 md:gap-4 pb-2 min-w-min">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-4 rounded-xl border-2 transition-all flex-shrink-0 ${
                      activeView === view.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 border-white shadow-xl"
                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-semibold text-xs md:text-base md:hidden">{view.shortLabel}</span>
                    <span className="font-semibold text-xs md:text-base hidden md:inline">{view.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10"
          >
            {/* Recruiting Pipeline View */}
            {activeView === "pipeline" && (
              <div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Recruiting Pipeline</h3>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button className="flex items-center gap-1.5 md:gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors">
                      <Search className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">Search</span>
                    </button>
                    <button className="flex items-center gap-1.5 md:gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors">
                      <Filter className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">Filter</span>
                    </button>
                  </div>
                </div>

                {/* Desktop: Show all */}
                <div className="hidden md:block space-y-4">
                  {recruitingPipeline.map((prospect, index) => (
                    <motion.div
                      key={prospect.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4 gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg lg:text-xl font-bold">{prospect.name}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                prospect.priority === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : prospect.priority === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {prospect.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {prospect.position} • {prospect.school}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors">
                            <Video className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{prospect.stage}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{prospect.nextAction}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedProspect(prospect)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all text-sm font-semibold"
                        >
                          View Profile
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile: Paginated view */}
                <div className="md:hidden">
                  <div className="space-y-3">
                    {recruitingPipeline
                      .slice(pipelinePage * itemsPerPage, (pipelinePage + 1) * itemsPerPage)
                      .map((prospect, index) => (
                        <motion.div
                          key={prospect.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/30 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-3 gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col gap-2 mb-2">
                                <h4 className="text-base font-bold">{prospect.name}</h4>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-semibold inline-block w-fit ${
                                    prospect.priority === "high"
                                      ? "bg-red-500/20 text-red-400"
                                      : prospect.priority === "medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-gray-500/20 text-gray-400"
                                  }`}
                                >
                                  {prospect.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">
                                {prospect.position} • {prospect.school}
                              </p>
                            </div>
                            <div className="flex gap-1.5">
                              <button className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                                <Mail className="w-3 h-3" />
                              </button>
                              <button className="p-1.5 bg-green-500/20 text-green-400 rounded-lg">
                                <Phone className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 mb-3">
                            <div className="flex items-center gap-1.5 text-xs">
                              <Target className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300">{prospect.stage}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                              <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300">{prospect.nextAction}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedProspect(prospect)}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                          >
                            View Profile
                          </button>
                        </motion.div>
                      ))}
                  </div>

                  {/* Pagination Controls */}
                  {recruitingPipeline.length > itemsPerPage && (
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <button
                        onClick={() => setPipelinePage(Math.max(0, pipelinePage - 1))}
                        disabled={pipelinePage === 0}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        ← Prev
                      </button>
                      <span className="text-sm text-gray-400">
                        {pipelinePage + 1} / {Math.ceil(recruitingPipeline.length / itemsPerPage)}
                      </span>
                      <button
                        onClick={() => setPipelinePage(Math.min(Math.ceil(recruitingPipeline.length / itemsPerPage) - 1, pipelinePage + 1))}
                        disabled={pipelinePage >= Math.ceil(recruitingPipeline.length / itemsPerPage) - 1}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Active Clients View */}
            {activeView === "clients" && (
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Active Clients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {activeClients.map((client, index) => (
                    <motion.div
                      key={client.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                    >
                      <h4 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{client.name}</h4>
                      <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">{client.sport}</p>

                      <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                        <div className="flex items-center justify-between text-xs md:text-sm">
                          <span className="text-gray-400">Contract</span>
                          <span className="font-semibold">{client.contract}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs md:text-sm">
                          <span className="text-gray-400">Active Deals</span>
                          <span className="font-semibold">{client.deals}</span>
                        </div>
                      </div>

                      {client.urgent && (
                        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-2.5 md:p-3 mb-3 md:mb-4">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs md:text-sm text-orange-300">
                              {client.urgent}
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedClient(client)}
                        className="w-full bg-white/10 hover:bg-white/20 text-white py-1.5 md:py-2 rounded-lg transition-colors font-semibold text-xs md:text-sm"
                      >
                        Open Client Room
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks View */}
            {activeView === "tasks" && (
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Tasks & Briefs</h3>
                <div className="space-y-3 md:space-y-4">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-xl p-4 md:p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            task.status === "urgent"
                              ? "bg-red-500/20"
                              : task.status === "high"
                              ? "bg-yellow-500/20"
                              : "bg-blue-500/20"
                          }`}
                        >
                          <FileText
                            className={`w-5 h-5 md:w-6 md:h-6 ${
                              task.status === "urgent"
                                ? "text-red-400"
                                : task.status === "high"
                                ? "text-yellow-400"
                                : "text-blue-400"
                            }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold mb-1 text-sm md:text-base">{task.task}</h4>
                          <p className="text-xs md:text-sm text-gray-400">
                            {task.client} • Due: {task.due}
                          </p>
                        </div>
                      </div>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-xs md:text-sm w-full sm:w-auto">
                        Complete
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights View */}
            {activeView === "insights" && (
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      metric: "Recruiting Conversions",
                      value: "32%",
                      change: "+8% vs last quarter",
                      trend: "up",
                    },
                    {
                      metric: "Avg Response Time",
                      value: "2.4 hrs",
                      change: "-45min vs last quarter",
                      trend: "up",
                    },
                    {
                      metric: "Active Pipeline",
                      value: "18",
                      change: "+3 this month",
                      trend: "up",
                    },
                    {
                      metric: "Client Satisfaction",
                      value: "9.2/10",
                      change: "+0.4 vs last quarter",
                      trend: "up",
                    },
                  ].map((insight, index) => (
                    <motion.div
                      key={insight.metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                    >
                      <p className="text-xs md:text-sm text-gray-400 mb-2">{insight.metric}</p>
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">{insight.value}</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400" />
                        <span className="text-xs md:text-sm text-green-400">
                          {insight.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Weekly Brief */}
                <div className="mt-6 md:mt-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <Bell className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2 text-sm md:text-base">
                        This Week's Automated Brief
                      </h4>
                      <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                        <li>
                          • 3 hot prospects ready for in-home visits
                        </li>
                        <li>
                          • 2 contract extensions need review this week
                        </li>
                        <li>
                          • 5 brand campaigns in flight, all on schedule
                        </li>
                        <li>
                          • Jordan Matthews trending up (+12K followers this
                          week)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Bottom Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: Clock,
                title: "Save 10+ Hours Per Week",
                description:
                  "Automated briefs, unified dashboards, and AI-drafted outreach",
              },
              {
                icon: Target,
                title: "Higher Close Rates",
                description:
                  "Never miss a follow-up. See everything at a glance.",
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Decisions",
                description:
                  "Performance insights show what's working and what's not",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm md:text-base text-gray-400 px-2">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Final Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-16 text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl md:rounded-3xl p-6 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Better Operations → Higher Close Rates
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              The Agent Toolkit turns chaos into clarity—so you spend less time
              searching and more time winning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Prospect Profile Modal */}
      {selectedProspect && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProspect(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProspect.name}</h3>
                <p className="text-gray-400">
                  {selectedProspect.position} • {selectedProspect.school}
                </p>
              </div>
              <button
                onClick={() => setSelectedProspect(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${
                  selectedProspect.priority === "high"
                    ? "bg-red-500/20 text-red-400"
                    : selectedProspect.priority === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {selectedProspect.status} Prospect
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Stage</div>
                <div className="text-white font-bold">{selectedProspect.stage}</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Priority</div>
                <div className="text-white font-bold capitalize">{selectedProspect.priority}</div>
              </div>
            </div>

            {/* Next Action */}
            <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">Next Action</div>
                  <div className="text-white font-semibold">{selectedProspect.nextAction}</div>
                </div>
              </div>
            </div>

            {/* Mock Activity Timeline */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                  <div>
                    <div className="text-white">RecruitAI intro sent</div>
                    <div className="text-gray-400 text-xs">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                  <div>
                    <div className="text-white">Phone call - 15 mins</div>
                    <div className="text-gray-400 text-xs">5 days ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <div className="text-white">Initial contact made</div>
                    <div className="text-gray-400 text-xs">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center gap-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
                <span className="text-xs font-semibold">Email</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-xs font-semibold">Call</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
                <span className="text-xs font-semibold">Meet</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Client Room Modal */}
      {selectedClient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedClient(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedClient.name}</h3>
                <p className="text-gray-400">{selectedClient.sport}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Contract</div>
                <div className="text-white font-bold">{selectedClient.contract}</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Active Deals</div>
                <div className="text-cyan-400 font-bold text-2xl">{selectedClient.deals}</div>
              </div>
            </div>

            {/* Urgent Item */}
            {selectedClient.urgent && (
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-orange-400 mb-1 font-semibold">Urgent</div>
                    <div className="text-white">{selectedClient.urgent}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Mock Active Deals */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Active Campaigns</h4>
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">Nike Regional Campaign</div>
                    <div className="text-green-400 text-sm">Active</div>
                  </div>
                  <div className="text-gray-400 text-sm">$150K • Ends Dec 2025</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">Gatorade Social Series</div>
                    <div className="text-yellow-400 text-sm">In Review</div>
                  </div>
                  <div className="text-gray-400 text-sm">$85K • Starts Feb 2025</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">EA Sports Partnership</div>
                    <div className="text-green-400 text-sm">Active</div>
                  </div>
                  <div className="text-gray-400 text-sm">$200K • Multi-year</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-semibold">
                <FileText className="w-5 h-5" />
                <span>View Contracts</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold">
                <MessageSquare className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
