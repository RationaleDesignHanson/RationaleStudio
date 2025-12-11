/**
 * Team Projects Page
 *
 * Detailed project tracking with milestones, team assignments, and metrics
 */

import Link from 'next/link';
import { ExternalLink, Github, Figma } from 'lucide-react';
import { teamContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Team Portal | Rationale',
  description: 'Active project tracking and management for Rationale ventures',
};

export default function TeamProjectsPage() {
  const { projects } = teamContent;

  return ( <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero Section */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800"> <div className="max-w-7xl mx-auto"> <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-4"> {projects.hero.title} </h1> <p className="text-xl text-purple-400 mb-4">{projects.hero.subtitle}</p> <p className="text-base text-gray-300 max-w-3xl">{projects.hero.description}</p> </div> </section> {/* Projects List */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8"> <div className="max-w-7xl mx-auto space-y-12"> {projects.projects.map((project, idx) => ( <div
              key={project.id}
              className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg"
            > {/* Project Header */} <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-800"> <div> <div className="flex items-center gap-3 mb-2"> <h2 className="text-2xl font-bold text-white">{project.name}</h2> <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30"> {project.stage} </span> </div> <p className="text-base text-gray-400 mb-2">{project.tagline}</p> <p className="text-sm text-purple-400 font-medium">{project.status}</p> </div> {/* Progress Circle */} <div className="flex flex-col items-center"> <div className="relative w-24 h-24"> <svg className="w-24 h-24 transform -rotate-90"> <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-800"
                      /> <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - project.progress / 100)}`}
                        className="text-purple-400"
                        strokeLinecap="round"
                      /> </svg> <div className="absolute inset-0 flex items-center justify-center"> <span className="text-xl font-bold text-purple-400">{project.progress}%</span> </div> </div> <p className="text-xs text-gray-400 mt-2">Overall Progress</p> </div> </div> {/* Team Info */} <div className="mb-6"> <h3 className="text-sm font-bold text-purple-400 mb-3">Team</h3> <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"> {project.team.roles.map((member, midx) => ( <div
                      key={midx}
                      className="p-3 bg-gray-900/70 border border-gray-800 rounded"
                    > <p className="text-xs font-semibold text-purple-400 mb-1">{member.role}</p> <p className="text-sm text-white">{member.name}</p> <p className="text-xs text-gray-500 mt-1">{member.type}</p> </div> ))} </div> </div> {/* Timeline */} <div className="mb-6"> <h3 className="text-sm font-bold text-purple-400 mb-3">Timeline</h3> <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {Object.entries(project.timeline).map(([key, value], tidx) => ( <div key={tidx} className="p-3 bg-gray-900/70 border border-gray-800 rounded"> <p className="text-xs font-semibold text-purple-400 mb-1"> {key.replace(/([A-Z])/g, ' $1').trim()} </p> <p className="text-sm text-white">{value as string}</p> </div> ))} </div> </div> {/* Milestones */} <div className="mb-6"> <h3 className="text-sm font-bold text-purple-400 mb-3">Milestones</h3> <div className="space-y-2"> {project.milestones.map((milestone, midx) => ( <div
                      key={midx}
                      className="flex items-center gap-3 p-3 bg-gray-900/70 border border-gray-800 rounded"
                    > <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          milestone.status === 'completed'
                            ? 'bg-green-400'
                            : milestone.status === 'in-progress'
                            ? 'bg-blue-400'
                            : 'bg-gray-600'
                        }`}
                      /> <div className="flex-1"> <p className="text-sm text-white">{milestone.name}</p> </div> <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          milestone.status === 'completed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : milestone.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                        }`}
                      > {milestone.status} </span> <span className="text-xs text-gray-500 w-24 text-right">{milestone.date}</span> </div> ))} </div> </div> {/* Metrics */} <div className="mb-6"> <h3 className="text-sm font-bold text-purple-400 mb-3">Key Metrics</h3> <div className="grid md:grid-cols-2 gap-4"> {Object.entries(project.metrics).map(([key, value], midx) => ( <div key={midx} className="p-3 bg-gray-900/70 border border-gray-800 rounded"> <p className="text-xs font-semibold text-purple-400 mb-1"> {key.replace(/([A-Z])/g, ' $1').trim()} </p> <p className="text-sm text-white">{value as string}</p> </div> ))} </div> </div> {/* Next Steps */} <div className="mb-6"> <h3 className="text-sm font-bold text-purple-400 mb-3">Next Steps</h3> <ul className="space-y-2"> {project.nextSteps.map((step, sidx) => ( <li key={sidx} className="flex items-start gap-2 text-sm text-gray-300"> <span className="text-purple-400 mt-1">→</span> <span>{step}</span> </li> ))} </ul> </div> {/* Links */} <div className="pt-6 border-t border-gray-800"> <h3 className="text-sm font-bold text-purple-400 mb-3">Project Links</h3> <div className="flex flex-wrap gap-3"> {project.links.github && ( <Link
                      href={project.links.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-800 rounded hover:border-purple-400/50 transition-colors text-sm text-gray-300"
                    > <Github className="w-4 h-4" /> <span>GitHub</span> <ExternalLink className="w-3 h-3" /> </Link> )}
                  {project.links.figma && ( <Link
                      href={project.links.figma}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-800 rounded hover:border-purple-400/50 transition-colors text-sm text-gray-300"
                    > <Figma className="w-4 h-4" /> <span>Figma</span> <ExternalLink className="w-3 h-3" /> </Link> )}
                  {project.links.notion && ( <Link
                      href={project.links.notion}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-800 rounded hover:border-purple-400/50 transition-colors text-sm text-gray-300"
                    > <span></span> <span>Notion</span> <ExternalLink className="w-3 h-3" /> </Link> )}
                  {project.links.linear && ( <Link
                      href={project.links.linear}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-800 rounded hover:border-purple-400/50 transition-colors text-sm text-gray-300"
                    > <span>◇</span> <span>Linear</span> <ExternalLink className="w-3 h-3" /> </Link> )}
                  {project.links.blueprint && ( <Link
                      href={project.links.blueprint}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 border border-gray-800 rounded hover:border-purple-400/50 transition-colors text-sm text-gray-300"
                    > <span></span> <span>Blueprint</span> <ExternalLink className="w-3 h-3" /> </Link> )} </div> </div> </div> ))} </div> </section> {/* Status Legend */} <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t border-gray-800"> <div className="max-w-7xl mx-auto"> <h2 className="text-xl font-bold text-white mb-6">Milestone Status Legend</h2> <div className="grid md:grid-cols-4 gap-4"> {Object.entries(projects.statusLegend).map(([status, info]) => ( <div
                key={status}
                className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
              > <div className="flex items-center gap-2 mb-2"> <div
                    className={`w-3 h-3 rounded-full ${
                      info.color === 'green'
                        ? 'bg-green-400'
                        : info.color === 'blue'
                        ? 'bg-blue-400'
                        : info.color === 'red'
                        ? 'bg-red-400'
                        : 'bg-gray-600'
                    }`}
                  /> <span className="text-sm font-semibold text-white capitalize">{status}</span> </div> <p className="text-xs text-gray-400">{info.description}</p> </div> ))} </div> </div> </section> </div> );
}
