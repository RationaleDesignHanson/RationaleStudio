/**
 * What is done, what is not, and what to do next.
 *
 * The nav was seven labels and no state. Nothing told you a section was
 * finished, nothing told you one was empty, and nothing told you which to open
 * first — so the only way to find out what a section wanted was to open it and
 * read. That is progressive disclosure doing the opposite of its job: it hides
 * the cost of a choice AND the fact that a choice is outstanding.
 *
 * Progressive disclosure is a good answer to "too much on screen at once". It is
 * a bad answer to "I do not know what this wants from me", because the answer to
 * that has to be VISIBLE while the thing itself is hidden. So each section
 * carries a one-line status, and the whole thing carries a next action.
 *
 * The rules are deliberately blunt: something is done when a real decision has
 * been recorded, not when a default happens to be valid. That is what `isSet`
 * is for — eleven fields carry meaningful defaults, so testing the value would
 * report every untouched section as complete.
 */

import type { LineConfig } from './lineState';
import type { Sku } from './line';

export type State = 'done' | 'ready' | 'blocked';

export interface Status {
  id: string;
  state: State;
  /** Shown next to the label. Three words where possible. */
  note: string;
}

export function readiness(
  config: LineConfig,
  skus: Sku[],
  isSet: (k: keyof LineConfig) => boolean,
): Status[] {
  const hasArtwork = !!config.mark || !!config.customGraphic;
  const hasPalette = config.palette.length > 0;
  const named = isSet('wordmark') && config.wordmark.trim().length > 0;
  const scale = config.strategy === 'scale';

  return [
    {
      id: '01',
      state: isSet('strategy') && named ? 'done' : 'ready',
      note: !isSet('strategy') ? 'pick a business' : !named ? 'name it' : config.wordmark.trim(),
    },
    {
      id: '02',
      state: hasArtwork ? 'done' : 'ready',
      note: hasArtwork
        ? config.customGraphic
          ? 'graphic kept'
          : 'mark chosen'
        : scale
          ? 'make a place graphic'
          : 'pick a mark',
    },
    {
      id: '03',
      state: hasPalette ? 'done' : 'ready',
      note: hasPalette
        ? `${config.palette.length} ${config.palette.length === 1 ? 'colour' : 'colours'}`
        : 'pick colours',
    },
    {
      id: '04',
      // Placement is judgement, not a gate — it has a sane default and there is
      // nothing to decide until there is artwork to place.
      state: hasArtwork ? 'done' : 'blocked',
      note: hasArtwork ? 'placed' : 'needs artwork',
    },
    {
      // Choosing the aesthetic is free and it is a real decision, so it is done
      // when it has been made rather than when it has been visited.
      id: '05',
      state: isSet('direction') ? 'done' : 'ready',
      note: isSet('direction') ? 'chosen' : 'pick a direction',
    },
    {
      id: '06',
      state: skus.length > 0 ? 'done' : hasPalette ? 'ready' : 'blocked',
      note:
        skus.length > 0
          ? `${skus.length} ${skus.length === 1 ? 'style' : 'styles'}`
          : hasPalette
            ? 'tick some styles'
            : 'needs colours',
    },
    {
      // The end. Ready once there is a line to shoot and cost; never "done",
      // because it is an output rather than a decision.
      id: '07',
      state: skus.length > 0 && hasArtwork ? 'ready' : 'blocked',
      note: skus.length === 0 ? 'needs styles' : !hasArtwork ? 'needs artwork' : 'shoot and cost it',
    },
  ];
}

/**
 * The single next thing worth doing, from WHERE YOU ARE.
 *
 * Two rules, and the second one was missing.
 *
 * It must be actionable: telling someone to go and do 06 when 06 is waiting on
 * 03 is worse than saying nothing, because they will open it and find a message
 * telling them to leave.
 *
 * And it must be AHEAD. This returned the first ready section in the list
 * regardless of where you were standing, so working on the costs it would say
 * "Next: pick a business" — pointing back at 01, past everything you had
 * already done. A next action that goes backwards is not a next action; it is a
 * nag, and it makes the sequence feel arbitrary.
 *
 * Something outstanding behind you is still worth surfacing, but it is a
 * different sentence, so it comes back tagged and the caller words it
 * differently.
 */
export function nextAction(
  statuses: Status[],
  currentId?: string,
): (Status & { behind?: boolean }) | null {
  const actionable = statuses.filter((s) => s.state === 'ready' && s.id !== '07');
  if (actionable.length === 0) return null;
  if (!currentId) return actionable[0];

  const ahead = actionable.find((s) => s.id > currentId);
  if (ahead) return ahead;

  const behind = actionable.find((s) => s.id < currentId);
  return behind ? { ...behind, behind: true } : null;
}
