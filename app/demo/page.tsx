'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Cal from '@calcom/embed-react'

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-24 flex-grow">
        {/* Header Section */}
        <section className="py-12 px-4 md:px-16 max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full w-fit border border-surface-container-highest mx-auto mb-6">
            <span
              className="material-symbols-outlined text-secondary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="text-xs font-semibold text-foreground tracking-wide">Live Walkthrough</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Schedule a Live Demo
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
            Select a convenient time slot below for a 1-on-1 walkthrough of the Spark Website architecture, CRM integrations, and SEO lead engine.
          </p>
        </section>

        {/* Calendar Embed Section */}
        <section className="pb-24 px-4 md:px-16 max-w-[1000px] mx-auto">
          <div className="bg-white rounded-3xl border border-outline-variant/60 shadow-2xl p-4 sm:p-6 overflow-hidden min-h-[700px]">
            <Cal
              calLink="rocketlaunch/free-strategy-call"
              style={{ width: '100%', height: '100%', minHeight: '650px', overflow: 'scroll' }}
              config={{ layout: 'month_view' }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
