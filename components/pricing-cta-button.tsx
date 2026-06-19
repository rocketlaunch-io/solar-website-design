'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface PricingCtaButtonProps {
  planName: 'Business' | 'Scale'
  className?: string
  children: React.ReactNode
}

export function PricingCtaButton({
  planName,
  className = '',
  children,
}: PricingCtaButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planName }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to initiate checkout.')
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received.')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>Starting checkout...</span>
          </>
        ) : (
          children
        )}
      </button>

      {error && (
        <p className="text-destructive text-xs font-semibold text-center mt-1.5 bg-destructive/10 py-1.5 px-3 rounded-lg border border-destructive/20">
          {error}
        </p>
      )}
    </div>
  )
}
