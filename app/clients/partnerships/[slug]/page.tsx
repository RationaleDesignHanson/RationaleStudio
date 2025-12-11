/**
 * Service Kit Detail Page - Window Shrine Design
 *
 * Dynamic route for individual service kit details.
 * Shows full kit information, process, deliverables, pricing, and related case study.
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { serviceKits, getKitBySlug } from '@/lib/content/kits';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui/ButtonHierarchy';
import type { Metadata } from 'next';

interface KitPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return serviceKits.map((kit) => ({
    slug: kit.slug,
  }));
}

export async function generateMetadata({ params }: KitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const kit = getKitBySlug(slug);

  if (!kit) {
    return {
      title: 'Kit Not Found — Rationale',
    };
  }

  return {
    title: `${kit.name} — Rationale`,
    description: kit.description,
  };
}

export default async function KitDetailPage({ params }: KitPageProps) {
  const { slug } = await params;
  const kit = getKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  // Get related kits (exclude current kit)
  const relatedKits = serviceKits.filter(k => k.slug !== slug).slice(0, 3);

  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl lg:text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"> {kit.name} </h1> <p className="text-xl sm:text-2xl text-terminal-gold font-medium mb-4"> {kit.tagline} </p> <p className="text-lg text-gray-300 max-w-3xl"> {kit.description} </p> </div> </section> {/* Overview - Pricing, Duration, Perfect For */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-6xl mx-auto"> <div className="grid lg:grid-cols-3 gap-6"> {/* Pricing */} <OS8Window
              title="Investment"
              variant="body"
              animateIn={false}
            > <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">{kit.pricing}</div> <p className="text-sm text-gray-300">Fixed price engagement</p> </OS8Window> {/* Duration */} <OS8Window
              title="Timeline"
              variant="body"
              animateIn={false}
            > <div className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-terminal-gold mb-2">{kit.duration}</div> <p className="text-sm text-gray-300">Start to delivery</p> </OS8Window> {/* Format */} <OS8Window
              title="Format"
              variant="body"
              animateIn={false}
            > <div className="text-xl sm:text-2xl font-bold text-terminal-gold mb-2">Remote + Async</div> <p className="text-sm text-gray-300">Flexible collaboration</p> </OS8Window> </div> </div> </section> {/* What You Get */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center"> What You Get </h2> <div className="grid md:grid-cols-2 gap-4"> {kit.whatYouGet.map((item, index) => ( <div
                key={index}
                className="flex gap-3 p-4 rounded-lg border border-gray-700 bg-black/40"
              > <div className="flex-shrink-0 w-6 h-6 rounded-full bg-terminal-gold/10 flex items-center justify-center"> <span className="text-terminal-gold text-sm font-bold">→</span> </div> <p className="text-sm sm:text-base text-gray-300">{item}</p> </div> ))} </div> </div> </section> {/* Deliverables */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center"> Deliverables </h2> <div className="space-y-4"> {kit.deliverables.map((deliverable, index) => ( <div
                key={index}
                className="flex gap-3 p-6 rounded-lg border border-gray-700 bg-black/40"
              > <div className="flex-shrink-0 w-8 h-8 rounded bg-terminal-gold/10 flex items-center justify-center"> <span className="text-terminal-gold font-bold">{index + 1}</span> </div> <p className="text-sm sm:text-base text-gray-300 leading-relaxed"> {deliverable} </p> </div> ))} </div> </div> </section> {/* Process (if available) */}
      {kit.process && kit.process.length > 0 && ( <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center"> Our Process </h2> <div className="space-y-8"> {kit.process.map((step, index) => ( <div key={index} className="relative"> {/* Connecting Line (except for last item) */}
                  {index < kit.process!.length - 1 && ( <div className="absolute left-8 top-full h-8 w-0.5 bg-terminal-gold/30 z-0" /> )} <div className="relative flex gap-6"> {/* Step Number */} <div className="flex-shrink-0 w-16 h-16 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold text-xl shadow-lg"> {index + 1} </div> {/* Step Content */} <div className="flex-1 pt-2"> <p className="text-base sm:text-lg text-gray-300 leading-relaxed"> {step} </p> </div> </div> </div> ))} </div> </div> </section> )}

      {/* ICP Targeting - Ideal For / Not Ideal For */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center"> Is This Kit Right For You? </h2> <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"> {/* Ideal For */}
            {kit.idealFor && kit.idealFor.length > 0 && ( <div> <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"> <span className="text-green-400 text-xl">→</span> This kit is ideal for: </h3> <div className="space-y-3"> {kit.idealFor.map((item, index) => ( <div
                      key={index}
                      className="flex gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5"
                    > <span className="text-green-400 text-lg flex-shrink-0">→</span> <p className="text-sm text-gray-300">{item}</p> </div> ))} </div> </div> )}

            {/* Not Ideal For */}
            {kit.notIdealFor && kit.notIdealFor.length > 0 && ( <div> <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"> <span className="text-amber-400 text-xl"></span> This kit is not ideal for: </h3> <div className="space-y-3"> {kit.notIdealFor.map((item, index) => ( <div
                      key={index}
                      className="flex gap-3 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5"
                    > <span className="text-amber-400 text-lg flex-shrink-0">→</span> <p className="text-sm text-gray-400">{item}</p> </div> ))} </div> </div> )}

            {/* Fallback to old "Perfect For" if ICP targeting not available */}
            {(!kit.idealFor || kit.idealFor.length === 0) && kit.perfectFor && ( <div className="md:col-span-2 max-w-3xl mx-auto"> <h3 className="text-lg font-bold text-white mb-4 text-center"> Perfect For </h3> <div className="space-y-3"> {kit.perfectFor.map((item, index) => ( <div
                      key={index}
                      className="flex gap-3 p-4 rounded-lg border border-gray-700 bg-black/40"
                    > <span className="text-terminal-gold text-xl">→</span> <p className="text-sm sm:text-base text-gray-300">{item}</p> </div> ))} </div> </div> )} </div> </div> </section> {/* Case Study (if available) */}
      {kit.caseStudy && ( <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center"> Example: {kit.caseStudy.title} </h2> <OS8Window
              title={kit.caseStudy.title}
              variant="body"
              animateIn={false}
            > <p className="text-base sm:text-lg text-gray-300 mb-6"> {kit.caseStudy.description} </p> <div className="p-6 rounded-lg bg-terminal-gold/5 border border-terminal-gold/20 mb-6"> <h4 className="text-sm font-semibold uppercase tracking-wide text-terminal-gold mb-2"> Outcome </h4> <p className="text-sm sm:text-base text-white leading-relaxed"> {kit.caseStudy.outcome} </p> </div> {kit.caseStudy.link && ( <Link
                  href={kit.caseStudy.link}
                  className="inline-block px-4 sm:px-6 md:px-8 py-3 text-base font-medium text-black bg-terminal-gold rounded-lg hover:bg-terminal-gold/90 transition-colors text-center"
                > View full case study </Link> )} </OS8Window> </div> </section> )}

      {/* Related Kits */}
      {relatedKits.length > 0 && ( <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            /> </div> <div className="relative z-10 max-w-6xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center"> Other Kits You Might Consider </h2> <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"> Not sure this is the right fit? Here are other ways we can help: </p> <div className="grid md:grid-cols-3 gap-6"> {relatedKits.map((relatedKit) => ( <Link
                  key={relatedKit.slug}
                  href={`/services/${relatedKit.slug}`}
                  className="group"
                > <OS8Window
                    title={relatedKit.name}
                    variant="body"
                    animateIn={false}
                    className="hover:scale-[1.02] transition-transform h-full"
                  > <p className="text-sm text-terminal-gold font-medium mb-3"> {relatedKit.tagline} </p> <p className="text-xs text-gray-400 mb-4 line-clamp-3"> {relatedKit.description} </p> <div className="flex items-center justify-between text-xs text-gray-400"> <span>{relatedKit.duration}</span> <span className="text-terminal-gold group-hover:translate-x-1 transition-transform">→</span> </div> </OS8Window> </Link> ))} </div> <div className="text-center mt-8"> <ButtonSecondary href="/partnerships" size="lg"> View all kits </ButtonSecondary> </div> </div> </section> )}

      {/* CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Ready to get started?"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-terminal-gold leading-relaxed text-center"> Let's talk about your project. We'll walk through the details and make sure this kit is the right fit. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <ButtonPrimary href="/contact" size="lg"> Start a conversation </ButtonPrimary> <ButtonSecondary href="/partnerships" size="lg"> View all kits </ButtonSecondary> </div> </div> </OS8Window> </div> </section> </main> );
}
