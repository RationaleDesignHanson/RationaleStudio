import dynamic from 'next/dynamic';

const RumiContent = dynamic(() =>
  import('./RumiContent').then((m) => m.RumiContent),
);

export default function RumiPage() {
  return <RumiContent />;
}
