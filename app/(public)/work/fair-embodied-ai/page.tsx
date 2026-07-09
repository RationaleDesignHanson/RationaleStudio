/**
 * FAIR Embodied AI — case study formatted as work-row chapters,
 * LEADER era styling. Robotics-forward: Motivo + SIRo are the
 * headline projects, foregrounded over the surrounding strategy work.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { caseStudySchemas } from '@/lib/seo/case-studies';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function FAIREmbodiedAIPage() {
  return (
    <ProjectScope project="fair">
      <MultipleStructuredData dataBlocks={caseStudySchemas('fair-embodied-ai')} />
      <main
        className="era-meta min-h-screen"
        style={{
          backgroundColor: 'var(--era-bg)',
          color: 'var(--era-ink-body)',
        }}
      >
        {/* HERO */}
        <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-7 border-b-2" style={{ borderColor: 'var(--accent)' }}>
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to work
            </Link>

            <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>04</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · LEADER</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2023 — 2025</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  FAIR Embodied AI
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Leading design across Meta&rsquo;s embodied-AI research &mdash; humanoid models and socially intelligent robots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE WORK */}
        <ChapterRow
          index="01"
          kicker="EMBODIED AI · 2023 — 2025"
          title="Designing for agents that move through the world"
        >
          <p>
            Embodied AI builds agents that don&rsquo;t just talk &mdash; they move, look, reach, navigate, and act. At <strong className="text-[var(--era-ink)]">FAIR</strong> (Meta&rsquo;s research org), I led design across teams building the layer that turns research models into systems people can use &mdash; on <strong className="text-[var(--era-ink)]">glasses, headsets, and robotics</strong>.
          </p>
          <p>
            The two headline projects are <strong className="text-[var(--era-ink)]">Motivo</strong> and <strong className="text-[var(--era-ink)]">SIRo</strong>. Motivo is the model that gives a humanoid character a usable repertoire of motion. SIRo gives a robot enough social intelligence to share a room with a person.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            I love robots. The whole point of this stretch of work was to make them a little more useful and a lot less weird.
          </p>
          <div className="mt-6">
            <Figure figNumber="FIG. 01" caption="Ray-Ban Meta + Activity Detection · Body and Hand Pose · Object Pose Estimation · the surface where research becomes consumer features">
              <Image src="/images/work/fair-embodied-ai/decks/ray-ban-meta-hero.jpg" alt="FAIR · Ray-Ban Meta + body/hand/object pose" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — MOTIVO */}
        <ChapterRow
          index="02"
          kicker="MOTIVO · BEHAVIORAL FOUNDATION MODEL"
          title="A motion vocabulary for humanoids"
        >
          <p>
            Most large models can describe the world. Few can <em>act</em> in it. Motivo is a behavioral foundation model for humanoid control &mdash; trained on a wide library of motion data so a digital character &mdash; eventually a physical one &mdash; can be prompted to walk, sit, reach, dodge, balance, recover from a stumble. Without per-task training. Without scripted animation.
          </p>
          <p>
            The design work sat between research and the people who would use it: multimodal prompts (gesture, motion, reward inputs), interaction patterns that don&rsquo;t exist yet, visualizers and review tools so a non-PhD could sanity-check the model. The team needed product-grade UX before there was a product.
          </p>
          <p>
            What it&rsquo;s for: avatars in social VR that move like people, not mannequins; humanoid simulation for training data; eventually, the motion layer that lets a real robot do real chores. The interesting part isn&rsquo;t the demo &mdash; it&rsquo;s the substrate.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-5">
            <Link
              href="/work/decks/motivo-case-study"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border-2 transition-colors"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Read the Motivo case study · 15 pages, gated <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://metamotivo.metademolab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display italic text-base md:text-lg text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
            >
              Public demo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — SIRO */}
        <ChapterRow
          index="03"
          kicker="SIRO · SOCIALLY INTELLIGENT ROBOTS"
          title="Robots that share a room"
        >
          <p>
            Most robots fail not because they can&rsquo;t do a task, but because they can&rsquo;t share a room. They walk through a doorway you&rsquo;re standing in. They reach for an object you&rsquo;re holding. They don&rsquo;t notice a child or a pet or a person carrying something heavy. SIRo (Socially Intelligent Robots) is the long arc of getting machines past that ceiling.
          </p>
          <p>
            The design work covered three loops: <strong className="text-[var(--era-ink)]">perception</strong> (the robot&rsquo;s sense of where humans are and what they&rsquo;re doing), <strong className="text-[var(--era-ink)]">intent</strong> (what it&rsquo;s about to do, communicated before it does it), and <strong className="text-[var(--era-ink)]">handoff</strong> (when the human takes over, when the robot offers help, when neither). Designing those loops means designing for moments of mutual surprise &mdash; what happens when robot and person disagree, and how the robot backs off gracefully?
          </p>
          <p>
            Public work covered home-assistance scenarios: setting a table, fetching a tool, holding a door, navigating a hallway where toys, children, and laundry baskets are in motion. The point isn&rsquo;t a demo of the perfect day. It&rsquo;s a robot that doesn&rsquo;t make the messy day worse.
          </p>
          <div className="mt-6">
            <Figure figNumber="FIG. 02" caption="PARTNR · the SIRo demonstration system. Built and led the AI Robotics Design team across simulation and real-world settings.">
              <Image src="/images/work/fair-embodied-ai/siro-partnr.jpg" alt="FAIR · Socially Intelligent AI Robots · PARTNR" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-4">
            <a
              href="https://ai.meta.com/research/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display italic text-base md:text-lg text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
            >
              SIRo · Meta AI Research
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ChapterRow>

        {/* CHAPTER 04 — TEAMS I LED */}
        <ChapterRow
          index="04"
          kicker="TEAMS · MULTIDISCIPLINARY"
          title="The teams I led"
        >
          <p>
            Built and led <strong className="text-[var(--era-ink)]">four teams</strong> across the embodied-AI surface area, each pairing design with a partner research org. The work moved between research lab and product surface, sometimes weekly.
          </p>
          <div className="mt-4 space-y-3">
            {[
              ['Motivo · Design + UXR', 'Visualizers, motion-prompt UX, review tooling, and the eval surfaces researchers used to sanity-check the model. Designed before the product existed.'],
              ['SIRo · Design + UXR', 'Perception/intent/handoff loops for socially intelligent robots in home settings. Field study coordination + interaction prototyping with the robotics team.'],
              ['Agent prototyping', 'Multimodal prompt systems (gesture, motion, reward) and interaction patterns that weren’t yet conventions. UX for research outputs while the research was still moving.'],
              ['Strategy + pipelines', 'Coordinated model-development pipelines across research orgs so agentic experiences could ship into product surfaces (glasses, headsets, robotics) without bottlenecking on hand-off.'],
            ].map(([name, desc]) => (
              <div key={name} className="border-t border-[var(--era-hairline)] pt-3">
                <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>{name}</p>
                <p className="text-sm md:text-base text-[var(--era-ink-body)]">{desc}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — WHY IT MATTERS */}
        <ChapterRow
          index="05"
          kicker="THESIS · WHY IT MATTERS"
          title="Why embodied"
        >
          <p>
            Today&rsquo;s AI is in a cave. It&rsquo;s trained on images, text, audio, video &mdash; flat data, with no body, no consequences, no reward function tied to physical reality. An agent that drops a glass and watches it shatter learns something a chatbot never can. Embodiment isn&rsquo;t a moral upgrade to current AI. It&rsquo;s an architectural requirement.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2 flex-wrap text-sm">
              <a
                href="https://metamotivo.metademolab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                Meta Motivo demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://ai.meta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                Meta AI Research <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                04 / 09 &middot; END OF CHAPTER
              </p>
              <Link
                href="/work/orion"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors"
              >
                Continue &rarr; Orion <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}
