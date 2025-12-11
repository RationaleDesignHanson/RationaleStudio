/**
 * Team Dashboard
 *
 * Internal operations overview for team members
 */

import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { teamContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Dashboard | Rationale',
  description: 'Internal operations dashboard for Rationale team',
};

export default function TeamDashboardPage() {
  const { dashboard } = teamContent;

  return ( <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Welcome Section */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800"> <div className="max-w-7xl mx-auto"> <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-4"> {dashboard.welcome.title} </h1> <p className="text-xl text-purple-400 mb-4">{dashboard.welcome.subtitle}</p> <p className="text-base text-gray-300 max-w-3xl">{dashboard.welcome.description}</p> </div> </section> {/* Quick Stats */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800"> <div className="max-w-7xl mx-auto"> <h2 className="text-2xl font-bold text-white mb-8">System Overview</h2> <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {dashboard.quickStats.map((stat, idx) => ( <div
                key={idx}
                className="p-6 bg-gray-900/70 border border-gray-800 rounded-lg hover:border-purple-400/30 transition-colors"
              > <div className="text-3xl mb-3">{stat.icon}</div> <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div> <div className="text-sm font-semibold text-white mb-1">{stat.label}</div> <div className="text-xs text-gray-400">{stat.subtext}</div> {stat.trend && ( <div className="text-xs text-gray-500 mt-2"> <TrendingUp className="w-3 h-3 inline mr-1" /> {stat.trend} </div> )} </div> ))} </div> </div> </section> {/* Active Projects */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800"> <div className="max-w-7xl mx-auto"> <div className="flex items-center justify-between mb-8"> <h2 className="text-2xl font-bold text-white">Active Projects</h2> <Link
              href="/team/projects"
              className="text-sm text-purple-400 hover:text-purple-400/80 transition-colors font-medium flex items-center gap-2"
            > View All Projects <ArrowRight className="w-4 h-4" /> </Link> </div> <div className="space-y-6"> {dashboard.activeProjects.map((project, idx) => ( <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-purple-400/50 transition-colors"
              > <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4"> <div className="flex-1"> <div className="flex items-center gap-3 mb-2"> <h3 className="text-xl font-bold text-white">{project.name}</h3> <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.priority === 'high'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}> {project.priority} priority </span> </div> <p className="text-sm text-gray-400 mb-2">{project.status}</p> </div> {/* Progress Bar */} <div className="w-full lg:w-48"> <div className="flex items-center justify-between mb-1"> <span className="text-xs text-gray-400">Progress</span> <span className="text-xs font-semibold text-purple-400">{project.progress}%</span> </div> <div className="w-full bg-gray-800 rounded-full h-2"> <div
                        className="bg-purple-400 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      /> </div> </div> </div> <div className="grid md:grid-cols-3 gap-4 text-sm"> <div> <p className="text-xs font-semibold text-purple-400 mb-1">Owner</p> <p className="text-white">{project.owner}</p> </div> <div> <p className="text-xs font-semibold text-purple-400 mb-1">Next Milestone</p> <p className="text-white">{project.nextMilestone}</p> </div> <div> <p className="text-xs font-semibold text-purple-400 mb-1">Due Date</p> <p className="text-white">{project.dueDate}</p> </div> </div> <div className="mt-4 pt-4 border-t border-gray-800"> <p className="text-xs font-semibold text-purple-400 mb-2">Team</p> <div className="flex flex-wrap gap-2"> {project.team.map((member, midx) => ( <span
                        key={midx}
                        className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300"
                      > {member} </span> ))} </div> </div> </div> ))} </div> </div> </section> {/* Recent Activity */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800"> <div className="max-w-7xl mx-auto"> <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2> <div className="space-y-3"> {dashboard.recentActivity.map((activity, idx) => ( <div
                key={idx}
                className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg flex items-start gap-4"
              > <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'milestone'
                    ? 'bg-purple-500/20 border border-purple-500/40'
                    : activity.type === 'security'
                    ? 'bg-red-500/20 border border-red-500/40'
                    : 'bg-blue-500/20 border border-blue-500/40'
                }`}> {activity.type === 'milestone' ? '' : activity.type === 'security' ? '' : ''} </div> <div className="flex-1"> <p className="text-sm text-white mb-1">{activity.action}</p> <div className="flex items-center gap-3 text-xs text-gray-400"> <span>{activity.user}</span> <span>•</span> <span>{activity.date}</span> </div> </div> </div> ))} </div> </div> </section> {/* Quick Links */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8"> <div className="max-w-7xl mx-auto"> <h2 className="text-2xl font-bold text-white mb-8">Quick Access</h2> <div className="grid md:grid-cols-3 gap-6"> <Link
              href="/team/projects"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-purple-400/50 transition-colors group"
            > <div className="text-3xl mb-4"></div> <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"> Project Tracking </h3> <p className="text-sm text-gray-300 mb-4"> View detailed project status, milestones, and team assignments </p> <span className="text-sm text-purple-400 font-medium">View Projects →</span> </Link> <Link
              href="/team/docs"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-purple-400/50 transition-colors group"
            > <div className="text-3xl mb-4"></div> <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"> Documentation </h3> <p className="text-sm text-gray-300 mb-4"> Access playbooks, processes, and technical documentation </p> <span className="text-sm text-purple-400 font-medium">Browse Docs →</span> </Link> <Link
              href="/team/admin"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-purple-400/50 transition-colors group"
            > <div className="text-3xl mb-4">️</div> <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"> Admin Tools </h3> <p className="text-sm text-gray-300 mb-4"> Manage users, roles, and system settings </p> <span className="text-sm text-purple-400 font-medium">Open Admin →</span> </Link> </div> </div> </section> {/* System Alerts (if any) */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8"> <div className="max-w-7xl mx-auto"> <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-4"> <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" /> <div> <h3 className="text-lg font-semibold text-white mb-2">Action Required</h3> <p className="text-sm text-gray-300 mb-4"> Firebase Admin SDK needs configuration before deploying protected routes to production. </p> <Link
                href="/team/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-lg transition-colors border border-yellow-500/40"
              > Configure Now <ArrowRight className="w-4 h-4" /> </Link> </div> </div> </div> </section> </div> );
}
