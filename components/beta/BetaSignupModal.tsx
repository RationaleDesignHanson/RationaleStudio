'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BetaSignupModalProps {
  isOpen: boolean
  onClose: () => void
  appName: 'zero' | 'heirloom'
  source?: string
}

export function BetaSignupModal({ isOpen, onClose, appName, source }: BetaSignupModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const appDisplayName = appName === 'zero' ? 'Zero' : 'Heirloom'
  const appColor = appName === 'zero' ? '#FFD700' : '#E85D4D'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/beta/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          appName,
          source: source || 'work_page',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setStatus('idle')
    setErrorMessage('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {status === 'success' ? (
                // Success state
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${appColor}20` }}
                  >
                    <svg className="w-8 h-8" style={{ color: appColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Thanks for Your Interest!</h2>
                  <p className="mb-6 text-gray-600">
                    We'll send you a TestFlight invitation soon. Check your email in the next few days!
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full rounded-lg px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: appColor }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                // Form state
                <>
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      Join {appDisplayName} Beta
                    </h2>
                    <p className="text-gray-600">
                      Enter your email to receive a TestFlight invitation and get early access.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500"
                        style={{ '--tw-ring-color': appColor } as React.CSSProperties}
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full rounded-lg px-6 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: appColor }}
                    >
                      {isLoading ? 'Sending...' : 'Get Beta Access'}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    By signing up, you'll receive TestFlight instructions via email. No spam, ever.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
