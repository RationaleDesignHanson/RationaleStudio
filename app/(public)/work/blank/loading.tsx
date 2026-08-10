import { UnlockGateSkeleton } from '@/components/unlock/UnlockGateSkeleton';

export default function BlankLoading() {
  return (
    <UnlockGateSkeleton
      project="blank"
      era="now"
      title="Blank"
      subtitle="A streetwear line planned end-to-end by an image pipeline and an agent fleet."
      meta="Concepts · in flight"
    />
  );
}
