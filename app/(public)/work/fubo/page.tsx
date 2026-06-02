import dynamic from 'next/dynamic';

const FuboContent = dynamic(() =>
  import('./FuboContent').then((m) => m.FuboContent),
);

export default function FuboPage() {
  return <FuboContent />;
}
