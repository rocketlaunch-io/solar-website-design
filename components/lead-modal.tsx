'use client'

import React, { useEffect } from 'react'
import { useLeadModal } from '../lib/lead-modal-context'
import { SparkLeadWizard } from './spark-lead-wizard'
import { SparkLogo } from './spark-logo'

export function LeadModal() {
  const { isOpen, closeModal } = useLeadModal()

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-edge-navy-deep/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={closeModal}
    >
      {/* Modal Card */}
      <div
        className="relative max-w-4xl w-full bg-surface border border-outline-variant/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[620px] md:h-[580px] animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Left Side: Premium Dark Value Panel (Desktop Only) */}
        <div className="relative hidden md:flex md:w-5/12 bg-gradient-to-br from-[#112240] to-[#0a192f] p-8 flex-col justify-between text-white overflow-hidden select-none">
          {/* Subtle Grid / Light Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-10">
            {/* SparkLogo */}
            <SparkLogo monochrome textClassName="text-white" />

            {/* Core Value Props */}
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-heading font-extrabold tracking-tight leading-snug">
                Scale Your Solar Operations
              </h3>
              <p className="text-white/70 text-xs leading-relaxed max-w-xs">
                Empower your sales force and streamline your pipeline with high-conversion React architecture.
              </p>
              
              {/* Bullet Points */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { title: "10x Speed Improvement", desc: "React 19 Edge Engine" },
                  { title: "CRM Bridge Integration", desc: "Sync leads in under 200ms" },
                  { title: "Dynamic Solar API Widgets", desc: "Automated roof calculations" },
                  { title: "Local Programmatic SEO", desc: "Dominate geo search terms" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-medium">
                    <span className="material-symbols-outlined text-energy-emerald text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <span className="block text-white font-bold">{item.title}</span>
                      <span className="block text-[10px] text-white/50">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Footer */}
            <div className="border-t border-white/10 pt-4 flex items-center gap-2 text-[10px] text-white/50 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
              99.9% Platform Uptime Guaranteed
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Wizard Form */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full bg-white select-text overflow-y-auto">
          <SparkLeadWizard theme="light" onClose={closeModal} />
        </div>
      </div>
    </div>
  )
}
