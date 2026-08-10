/**
 * What the nav says about itself.
 *
 * The rule that matters: something is DONE when a real decision was recorded,
 * never when a default happens to be valid. Eleven config fields carry
 * meaningful defaults, so testing the value instead of `isSet` would report a
 * fresh, untouched tool as finished.
 */

import { describe, it, expect } from 'vitest';
import { readiness, nextAction } from '@/lib/blank/readiness';
import { LINE_DEFAULTS, type LineConfig } from '@/lib/blank/lineState';
import type { Sku } from '@/lib/blank/line';

const cfg = (over: Partial<LineConfig> = {}): LineConfig => ({ ...LINE_DEFAULTS, ...over });
const none = () => false;
const all = () => true;
const sku = (): Sku => ({
  garment: 'tee',
  tier: 'graphic',
  units: 50,
  colours: ['bone'],
  graphic: null,
});

describe('readiness', () => {
  it('reports nothing done on a fresh tool, despite every default being valid', () => {
    const s = readiness(cfg(), [], none);
    expect(s.filter((x) => x.state === 'done')).toHaveLength(0);
  });

  it('does not call the name done just because BLANK is the default', () => {
    // The value is truthy out of the box; only isSet can tell them apart.
    expect(readiness(cfg(), [], none)[0].state).not.toBe('done');
    expect(readiness(cfg(), [], all)[0].state).toBe('done');
  });

  it('blocks what genuinely cannot be done yet', () => {
    const s = readiness(cfg(), [], none);
    const by = (id: string) => s.find((x) => x.id === id)!;
    expect(by('04').state).toBe('blocked'); // no artwork to place
    expect(by('05').state).toBe('blocked');
    expect(by('06').state).toBe('blocked'); // no colours to spec
    expect(by('07').state).toBe('blocked');
  });

  it('unblocks as the real decisions land', () => {
    const withArt = readiness(cfg({ mark: 'roundel' }), [], none);
    expect(withArt.find((x) => x.id === '04')!.state).toBe('done');

    const withColour = readiness(cfg({ mark: 'roundel', palette: ['bone'] }), [], none);
    expect(withColour.find((x) => x.id === '06')!.state).toBe('ready');

    const specced = readiness(cfg({ mark: 'roundel', palette: ['bone'] }), [sku()], none);
    expect(specced.find((x) => x.id === '06')!.state).toBe('done');
    expect(specced.find((x) => x.id === '07')!.state).toBe('ready');
  });

  it('counts a kept graphic as artwork, not only a mark', () => {
    const s = readiness(cfg({ customGraphic: 'https://x/y.jpg' }), [], none);
    expect(s.find((x) => x.id === '02')!.state).toBe('done');
    expect(s.find((x) => x.id === '04')!.state).toBe('done');
  });
});

describe('nextAction', () => {
  it('never sends you somewhere blocked', () => {
    const n = nextAction(readiness(cfg(), [], none));
    expect(n).not.toBeNull();
    expect(n!.state).toBe('ready');
  });

  it('never proposes the one that spends money', () => {
    // 05 is optional and paid; it must never be the suggested next step.
    const n = nextAction(readiness(cfg({ mark: 'roundel', palette: ['bone'] }), [sku()], all));
    expect(n?.id).not.toBe('05');
  });

  it('goes quiet once everything actionable is done', () => {
    const done = readiness(cfg({ mark: 'roundel', palette: ['bone'] }), [sku()], all);
    const n = nextAction(done);
    expect(n === null || n.id === '07').toBe(true);
  });
});
