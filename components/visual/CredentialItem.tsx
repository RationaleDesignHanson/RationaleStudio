/**
 * CredentialItem Component
 *
 * Displays a single credential with consistent styling and visual balance
 * Used in credentials bar for equal visual weight across all items
 */

import React from 'react';

interface CredentialItemProps {
  icon: string;
  text: string;
  accentColor?: string;
  className?: string;
}

export function CredentialItem({
  icon,
  text,
  accentColor = '#FFD700',
  className = ''
}: CredentialItemProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="flex-shrink-0"
        style={{ color: accentColor }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-sm sm:text-base text-gray-400">
        {text}
      </span>
    </div>
  );
}

interface CredentialsBarProps {
  items: Array<{
    icon: string;
    text: string;
  }>;
  accentColor?: string;
  className?: string;
}

export function CredentialsBar({
  items,
  accentColor = '#FFD700',
  className = ''
}: CredentialsBarProps) {
  return (
    <ul
      role="list"
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <li>
            <CredentialItem
              icon={item.icon}
              text={item.text}
              accentColor={accentColor}
            />
          </li>
          {index < items.length - 1 && (
            <li
              className="hidden sm:block text-gray-700"
              aria-hidden="true"
            >
              •
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}
