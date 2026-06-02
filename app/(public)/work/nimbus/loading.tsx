import { CaseStudyLoadingSkeleton } from '@/components/case-study/CaseStudyLoadingSkeleton';

export default function NimbusLoading() {
  return (
    <CaseStudyLoadingSkeleton
      project="nimbus"
      era="now"
      title="Nimbus"
      subtitle="Sanitary-waste system venture. Hardware + software, household source-separation. In concept-prototype."
      meta="Concepts · in flight"
    />
  );
}
