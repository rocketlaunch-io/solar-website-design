'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface LeadModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined)

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const context = useContext(LeadModalContext)
  if (!context) {
    throw new Error('useLeadModal must be used within a LeadModalProvider')
  }
  return context
}
