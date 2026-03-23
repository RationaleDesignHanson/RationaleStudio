import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeirloomNav from './components/HeirloomNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Lazy load heavy sections for better performance
const HeroSection = dynamic(() => import('./components/HeroSection'), {
  loading: () => <div className="min-h-screen bg-[var(--heirloom-pitch-brown)]" />
});

const ProblemSection = dynamic(() => import('./components/ProblemSection'));
const SolutionSection = dynamic(() => import('./components/SolutionSection'));
const DemoSection = dynamic(() => import('./components/DemoSection'));
const FormatsSection = dynamic(() => import('./components/FormatsSection'));
const FeaturesSection = dynamic(() => import('./components/FeaturesSection'));
const DifferentiatorsSection = dynamic(() => import('./components/DifferentiatorsSection'));
const MarketSection = dynamic(() => import('./components/MarketSection'));
const CompetitiveSection = dynamic(() => import('./components/CompetitiveSection'));
const BusinessSection = dynamic(() => import('./components/BusinessSection'));
const AISection = dynamic(() => import('./components/AISection'));
const DataOpportunitiesSection = dynamic(() => import('./components/DataOpportunitiesSection'));
const TeamSection = dynamic(() => import('./components/TeamSection'));
const CTASection = dynamic(() => import('./components/CTASection'));

export const metadata: Metadata = {
  title: 'Heirloom Pitch - Recipes Worth Passing Down',
  description: 'The universal save button for food on the internet. Heirloom is the easiest way to save recipes from anywhere — especially video.',
  keywords: ['heirloom', 'recipe app', 'pitch', 'investors', 'beta testers'],
  openGraph: {
    title: 'Heirloom Pitch - Recipes Worth Passing Down',
    description: 'The universal save button for food on the internet.',
    type: 'website',
  }
};

export default function HeirloomPitchPage() {
  return (
    <div className="min-h-screen bg-[var(--heirloom-pitch-cream)] scroll-smooth">
      <HeirloomNav />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <FormatsSection />
        <FeaturesSection />
        <DifferentiatorsSection />
        <MarketSection />
        <CompetitiveSection />
        <BusinessSection />
        <AISection />
        <DataOpportunitiesSection />
        <TeamSection />
        <CTASection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
