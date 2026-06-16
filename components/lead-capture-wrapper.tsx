'use client'

import React, { useEffect } from 'react'
import { LeadModalProvider, useLeadModal } from '../lib/lead-modal-context'
import { LeadModal } from './lead-modal'

function LeadModalClickInterceptor({ children }: { children: React.ReactNode }) {
  const { openModal } = useLeadModal()

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor) {
        const href = anchor.getAttribute('href')
        // Intercept any link pointing to "/contact" or "contact"
        if (href === '/contact' || href === 'contact') {
          e.preventDefault()
          openModal()
        }
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [openModal])

  return (
    <>
      {children}
      <LeadModal />
    </>
  )
}

export function LeadCaptureWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      <LeadModalClickInterceptor>{children}</LeadModalClickInterceptor>
    </LeadModalProvider>
  )
}
