import dynamic from 'next/dynamic';

// Slide deck is heavy (diagrams, ASCII grid, dynamic imports of its own).
const SanitaryWasteDeck = dynamic(() =>
  import('@/components/sanitary-waste-system/SanitaryWasteDeck'),
);

export default function NimbusDeckPage() {
  return <SanitaryWasteDeck />;
}
