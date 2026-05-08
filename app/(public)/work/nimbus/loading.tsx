import { UnlockGateSkeleton } from '@/components/unlock/UnlockGateSkeleton';

export default function NimbusLoading() {
  return (
    <UnlockGateSkeleton
      project="nimbus"
      era="now"
      title="Nimbus"
      subtitle="Sanitary-waste system venture. Hardware + software, household source-separation. In concept-prototype."
      meta="Concepts · in flight"
    />
  );
}
