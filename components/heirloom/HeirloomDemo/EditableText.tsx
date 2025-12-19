/**
 * EditableText Component
 *
 * Displays editable recipe fields with change attribution badges
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { EditableTextProps } from './types';

export function EditableText({
  field,
  value,
  style,
  multiline = false,
  showHint = false,
  isEditing,
  onStartEdit,
  onEndEdit,
  onChange,
  fieldChanges,
  latestChange,
  isEditable,
}: EditableTextProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasChanges = fieldChanges.length > 0;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        type={multiline ? undefined : 'text'}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        onBlur={onEndEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !multiline) {
            onEndEdit();
          }
        }}
        style={{
          ...style,
          backgroundColor: '#fffef5',
          border: '1px solid #c9a66b',
          borderRadius: '4px',
          padding: '4px 8px',
          margin: '-4px -8px',
          width: 'calc(100% + 16px)',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
          outline: 'none',
          resize: multiline ? 'vertical' : 'none',
          minHeight: multiline ? '60px' : 'auto',
        }}
      />
    );
  }

  const classes = [
    isEditable ? 'editable-text' : '',
    isEditable && showHint && !hasChanges ? 'editable-hint' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const getBadgeClass = () => {
    if (fieldChanges.length > 1) return 'multiple';
    if (latestChange?.by === 'Mom') return 'mom';
    if (latestChange?.by === 'You') return 'you';
    return 'mom';
  };

  const getBadgeText = () => {
    if (fieldChanges.length > 1) {
      const editors = [...new Set(fieldChanges.map((c) => c.by))];
      return editors.join(' + ');
    }
    return `${latestChange?.by} '${latestChange?.year?.slice(-2)}`;
  };

  return (
    <span className="change-attribution" style={{ position: 'relative' }}>
      <span
        onClick={() => isEditable && onStartEdit(field)}
        className={`${classes} ${hasChanges ? 'changed-text' : ''}`}
        style={{
          ...style,
          cursor: isEditable ? 'text' : 'default',
        }}
        title={isEditable && !hasChanges ? 'Click to edit' : undefined}
      >
        {value || (isEditable ? 'Click to add...' : '')}
      </span>
      {hasChanges && (
        <span
          className={`change-badge ${getBadgeClass()}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {getBadgeText()}
          {showTooltip && (
            <span className="change-tooltip">
              {fieldChanges.length === 1 ? (
                `Was: "${fieldChanges[0].from}"`
              ) : (
                <div>
                  {fieldChanges.map((c, i) => (
                    <div key={i}>
                      {c.by}: {c.from} → {c.to}
                    </div>
                  ))}
                </div>
              )}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
