import dynamic from 'next/dynamic';

const NimbusContent = dynamic(() =>
  import('./NimbusContent').then((m) => m.NimbusContent),
);

export default function NimbusPage() {
  return <NimbusContent />;
}
