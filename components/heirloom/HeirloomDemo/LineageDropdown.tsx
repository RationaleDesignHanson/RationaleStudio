/**
 * LineageDropdown — chip + dropdown matching the iOS Heirloom lineage UX.
 *
 * Product reference:
 *   - LineageTimelineView header → "Family Tree" + stats summary
 *   - RecipeDiffView.userModificationsBlock → "What changed" sparkles header,
 *     one row per modification, icon + text in tinted pill (green for adds,
 *     red for removes, default green for edits).
 *   - Display preference (3-tier): summary → changeDescription → fieldChanged
 *
 * The demo's `FieldChange[]` is mapped into modification-shaped rows so the
 * dropdown reads like the real product.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChangeHistory, FieldChange } from './types';
import { GENERATIONS, COLORS } from './constants';

interface LineageDropdownProps {
  step: string;
  changes: ChangeHistory;
  generationCount: number;
  generationLabel: string;
}

type ChangeType =
  | 'title_changed'
  | 'ingredient_added'
  | 'ingredient_removed'
  | 'ingredient_modified'
  | 'instruction_added'
  | 'instruction_removed'
  | 'instruction_modified'
  | 'modified';

interface Modification {
  changeType: ChangeType;
  text: string; // pre-resolved per the 3-tier preference (summary → description → field)
}

interface GenerationRow {
  name: string;
  initials: string;
  year: string;
  status: 'origin' | 'active' | 'pending';
  modifications: Modification[];
}

const SUCCESS = '#2d5a27';
const DESTRUCTIVE = '#a83232';

function changeTypeFor(field: string, change: FieldChange): ChangeType {
  if (field === 'title') return 'title_changed';
  const isIngredient = field.startsWith('ingredient-');
  const isInstruction = field.startsWith('instruction-');
  const wasEmpty = !change.from || !change.from.trim();
  const isEmpty = !change.to || !change.to.trim();
  if (isIngredient) {
    if (wasEmpty) return 'ingredient_added';
    if (isEmpty) return 'ingredient_removed';
    return 'ingredient_modified';
  }
  if (isInstruction) {
    if (wasEmpty) return 'instruction_added';
    if (isEmpty) return 'instruction_removed';
    return 'instruction_modified';
  }
  return 'modified';
}

function summaryFor(type: ChangeType, change: FieldChange): string {
  switch (type) {
    case 'title_changed':
      return `Renamed to “${change.to}”`;
    case 'ingredient_added':
      return `Added ${change.to}`;
    case 'ingredient_removed':
      return `Removed ${change.from}`;
    case 'ingredient_modified':
      return `${change.from} → ${change.to}`;
    case 'instruction_added':
      return `Added step: ${change.to}`;
    case 'instruction_removed':
      return `Removed step: ${change.from}`;
    case 'instruction_modified':
      return `Updated step: ${change.to}`;
    default:
      return change.to || change.from || 'Modified';
  }
}

function isRemoval(type: ChangeType): boolean {
  return type === 'ingredient_removed' || type === 'instruction_removed';
}

// SF-Symbol-style inline glyph mapping. Pure SVG so no icon font needed.
function ChangeIcon({ type, color }: { type: ChangeType; color: string }) {
  const stroke = { stroke: color, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const size = 14;
  if (isRemoval(type)) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" {...stroke} fill={color} fillOpacity="0.15" />
        <path d="M5 8h6" {...stroke} />
      </svg>
    );
  }
  if (type === 'ingredient_added' || type === 'instruction_added') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" {...stroke} fill={color} fillOpacity="0.15" />
        <path d="M8 5v6M5 8h6" {...stroke} />
      </svg>
    );
  }
  if (type === 'title_changed') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" {...stroke} fill={color} fillOpacity="0.15" />
        <path d="M5 8.5l2 2 4-4" {...stroke} />
      </svg>
    );
  }
  // pencil.circle.fill — default for modified
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" {...stroke} fill={color} fillOpacity="0.15" />
      <path d="M6 10.5l1-2.5 3.5-3.5 1.5 1.5-3.5 3.5-2.5 1z" {...stroke} />
    </svg>
  );
}

// "Sparkles" header glyph — matches iOS `sparkles` symbol.
function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1l1.2 3.4L12.5 5.5l-3.3 1.2L8 10l-1.2-3.3L3.5 5.5 6.8 4.4 8 1zM12.5 9.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7zM3.5 10.5l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4L1.6 12.4l1.4-.5.5-1.4z"
        fill={SUCCESS}
      />
    </svg>
  );
}

function buildRows(
  changes: ChangeHistory,
  generationCount: number,
): GenerationRow[] {
  const flatten = (who: 'Mom' | 'You'): Modification[] => {
    const mods: Modification[] = [];
    for (const [field, fieldChanges] of Object.entries(changes)) {
      for (const c of fieldChanges) {
        if (c.by !== who) continue;
        const type = changeTypeFor(field, c);
        mods.push({ changeType: type, text: summaryFor(type, c) });
      }
    }
    return mods;
  };

  return [
    {
      ...GENERATIONS[0],
      status: 'origin',
      modifications: [],
    },
    {
      ...GENERATIONS[1],
      status: generationCount >= 2 ? 'active' : 'pending',
      modifications: flatten('Mom'),
    },
    {
      ...GENERATIONS[2],
      status: generationCount >= 3 ? 'active' : 'pending',
      modifications: flatten('You'),
    },
  ];
}

export function LineageDropdown({
  step,
  changes,
  generationCount,
  generationLabel,
}: LineageDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const rows = buildRows(changes, generationCount);
  const totalChanges = rows.reduce((acc, r) => acc + r.modifications.length, 0);
  const contributorCount = rows.filter((r) => r.status === 'active' || r.status === 'origin').length;

  // Mirrors LineageTree.stats.displaySummary tone.
  const summary =
    contributorCount === 1
      ? 'Original recipe'
      : `${contributorCount} contributors · ${totalChanges} ${totalChanges === 1 ? 'change' : 'changes'}`;

  const chipColor =
    generationCount === 1 ? COLORS.green : generationCount === 2 ? '#6b5b2d' : COLORS.primary;

  return (
    <div ref={ref} className="relative inline-block" style={{ pointerEvents: 'auto' }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="lineage-chip"
        aria-expanded={open}
        aria-label="View recipe lineage"
        style={{
          backgroundColor: chipColor,
          color: 'white',
          fontSize: 11,
          padding: '6px 10px 6px 14px',
          borderRadius: 20,
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span>{generationLabel}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transition: 'transform 180ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            opacity: 0.85,
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className="lineage-panel"
          role="dialog"
          aria-label="Family Tree"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 320,
            maxHeight: 420,
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #ece6dc',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(92,64,51,0.18)',
            zIndex: 50,
            padding: 0,
          }}
        >
          {/* Header — matches LineageTimelineView headerSection (slateMist bg) */}
          <div
            style={{
              padding: '12px 14px',
              background: '#eef0f3',
              borderBottom: '1px solid #ece6dc',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.primaryDarkest,
                fontFamily: '"Playfair Display", Georgia, serif',
              }}
            >
              Family Tree
            </div>
            <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 2 }}>{summary}</div>
          </div>

          {rows.map((row, i) => (
            <GenerationBlock key={row.name} row={row} isLast={i === rows.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function GenerationBlock({ row, isLast }: { row: GenerationRow; isLast: boolean }) {
  const isPending = row.status === 'pending';
  const dotColor = row.status === 'origin' ? COLORS.green : row.status === 'active' ? COLORS.primary : COLORS.grayLight;
  const dotInk = isPending ? COLORS.grayMid : 'white';

  return (
    <div
      style={{
        padding: '12px 14px',
        borderBottom: isLast ? 'none' : '1px solid #f3eee5',
        opacity: isPending ? 0.55 : 1,
      }}
    >
      {/* Generation header: avatar + name/year + role */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: row.modifications.length ? 10 : 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: dotColor,
            color: dotInk,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
            boxShadow: row.status === 'active' ? '0 2px 6px rgba(139,90,43,0.35)' : 'none',
          }}
        >
          {row.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primaryDarkest, lineHeight: 1.2 }}>{row.name}</div>
          <div style={{ fontSize: 11, color: COLORS.grayMid, fontFamily: 'monospace', lineHeight: 1.2, marginTop: 1 }}>
            {row.year}
          </div>
        </div>
        {row.status === 'origin' && (
          <span style={{ fontSize: 10, color: COLORS.grayText, fontStyle: 'italic' }}>original</span>
        )}
        {isPending && <span style={{ fontSize: 10, color: COLORS.grayMid }}>yet to come</span>}
      </div>

      {/* "What changed" block — mirrors RecipeDiffView.userModificationsBlock */}
      {row.modifications.length > 0 && (
        <div style={{ paddingLeft: 38 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <SparkleIcon />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: SUCCESS,
              }}
            >
              What changed
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {row.modifications.slice(0, 6).map((mod, idx) => {
              const color = isRemoval(mod.changeType) ? DESTRUCTIVE : SUCCESS;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '6px 8px',
                    borderRadius: 8,
                    background: `${color}1a`, // 10% opacity
                    border: `1px solid ${color}4d`, // 30% opacity
                    fontSize: 12,
                    color: COLORS.primaryDarkest,
                    lineHeight: 1.35,
                  }}
                >
                  <ChangeIcon type={mod.changeType} color={color} />
                  <span style={{ flex: 1, wordBreak: 'break-word' }}>{mod.text}</span>
                </div>
              );
            })}
            {row.modifications.length > 6 && (
              <div style={{ fontSize: 10, color: COLORS.grayMid, fontStyle: 'italic', paddingLeft: 22 }}>
                +{row.modifications.length - 6} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
