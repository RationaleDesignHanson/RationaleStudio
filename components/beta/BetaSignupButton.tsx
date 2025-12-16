'use client'

import { useState } from 'react'
import { BetaSignupModal } from './BetaSignupModal'

interface BetaSignupButtonProps {
  appName: 'zero' | 'heirloom'
  source?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

export function BetaSignupButton({
  appName,
  source,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: BetaSignupButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const appColor = appName === 'zero' ? 'var(--color-terminal-gold)' : 'var(--color-heirloom-coral)'
  const defaultLabel = `Join ${appName === 'zero' ? 'Zero' : 'Heirloom'} Beta`

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: appColor,
          color: appName === 'zero' ? '#000' : '#fff',
        }
      case 'secondary':
        return {
          backgroundColor: `${appColor}20`,
          color: appColor,
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: appColor,
          border: `2px solid ${appColor}`,
        }
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          rounded-lg font-semibold transition-all
          hover:opacity-90 hover:scale-105 active:scale-95
          ${sizeClasses[size]}
          ${className}
        `}
        style={getVariantStyles()}
      >
        {children || defaultLabel}
      </button>

      <BetaSignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appName={appName}
        source={source}
      />
    </>
  )
}
