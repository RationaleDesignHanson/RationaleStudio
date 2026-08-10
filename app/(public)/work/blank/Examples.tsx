/**
 * What this can make.
 *
 * The tool never said it was an image generator. It opened on a name field and a
 * budget, and the generative half — six registers, free-text artwork, reference
 * upload — was behind disclosures with names like "or artwork that has nothing
 * to do with the name". Someone arriving cold had no way to know the range was
 * character, photoreal, diagram, signage and anything they could describe.
 *
 * So: the range, stated, as one click each. These are starting points rather
 * than presets — clicking one fills the field and you change it, which is how
 * anyone actually uses a prompt.
 *
 * NO IMAGES HERE ON PURPOSE. A gallery of examples would need eight renders
 * committed as assets, and they would be the only pictures in the tool that were
 * not of your line. A list of what it can do, that puts words in the box, costs
 * nothing and gets you to your own image faster.
 */

'use client';

const EXAMPLES: { kind: string; prompt: string }[] = [
  { kind: 'A character', prompt: 'a deadpan mascot with too many teeth, drawn flat and simple' },
  { kind: 'Photoreal', prompt: 'a photographic close-up of a cracked roadside reflector, hard flash' },
  { kind: 'A diagram', prompt: 'an exploded technical diagram of a sandwich, drawn like a parts catalogue' },
  { kind: 'Type as image', prompt: 'a single oversized numeral, distressed like a screen-printed jersey' },
  { kind: 'A crest', prompt: 'a mock heraldic crest built from a traffic cone, a seagull and a coffee cup' },
  { kind: 'Something silly', prompt: 'a very serious flaming skull, but the flames are little hearts' },
];

export function Examples({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="mb-5">
      <p
        className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mb-2"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        It makes images — try one
      </p>
      <div className="flex flex-wrap gap-1.5">
        {EXAMPLES.map((e) => (
          <button
            key={e.kind}
            onClick={() => onPick(e.prompt)}
            title={e.prompt}
            className="tap px-2 py-1 text-[12px] sm:text-[11px] font-mono border transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)', minHeight: 0 }}
          >
            {e.kind}
          </button>
        ))}
      </div>
    </div>
  );
}
