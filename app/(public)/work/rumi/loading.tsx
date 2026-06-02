import { CaseStudyLoadingSkeleton } from '@/components/case-study/CaseStudyLoadingSkeleton';

export default function RumiLoading() {
  return (
    <CaseStudyLoadingSkeleton
      project="rumi"
      era="now"
      title="Rumi"
      subtitle="Design engine for an AI media companion startup. 2024 · Head of Design."
      meta="2024"
    />
  );
}
