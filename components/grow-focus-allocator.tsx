"use client"

import { useState } from "react"

type Focus = {
  id: string
  label: string
  icon: string
  blurb: string
}

const FOCI: Focus[] = [
  { id: "ads", label: "Paid Media", icon: "ads_click", blurb: "Heavy ad creative production, A/B testing, and aggressive budget scaling across Meta & Google." },
  { id: "video", label: "Video & Motion", icon: "movie", blurb: "4K drone shoots, testimonial edits, and motion-graphic explainers for high-trust storytelling." },
  { id: "automation", label: "CRM Automation", icon: "automation", blurb: "Lead routing, nurture sequences, and AI-driven follow-ups that close gaps in your funnel." },
  { id: "brand", label: "Brand & Design", icon: "palette", blurb: "Sales decks, door flyers, and a cohesive visual identity across every touchpoint." },
  { id: "seo", label: "SEO & Content", icon: "search", blurb: "Local search domination, content refreshes, and authority-building landing pages." },
]

export function GrowFocusAllocator() {
  const [active, setActive] = useState<string>("ads")
  // illustrative monthly hour split that shifts emphasis to the active focus
  const allocation: Record<string, number> = FOCI.reduce((acc, f) => {
    acc[f.id] = f.id === active ? 45 : 55 / (FOCI.length - 1)
    return acc
  }, {} as Record<string, number>)

  const activeFocus = FOCI.find((f) => f.id === active)!

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Controls */}
      <div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Your monthly hours are never locked. Pick this month&apos;s priority and watch the team re-weight effort toward what moves the needle for you right now.
        </p>
        <div className="flex flex-wrap gap-2">
          {FOCI.map((f) => {
            const isActive = f.id === active
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-outline-variant/50 text-foreground hover:bg-surface-container"
                }`}
                aria-pressed={isActive}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {f.icon}
                </span>
                {f.label}
              </button>
            )
          })}
        </div>
        <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/5 p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{activeFocus.icon}</span>
            <h3 className="font-heading font-bold text-foreground">{activeFocus.label} Focus</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{activeFocus.blurb}</p>
        </div>
      </div>

      {/* Visualized allocation bars */}
      <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">This Month&apos;s Hour Allocation</p>
          <span className="text-xs font-semibold text-secondary">Re-balanced live</span>
        </div>
        <div className="space-y-4">
          {FOCI.map((f) => {
            const pct = Math.round(allocation[f.id])
            const isActive = f.id === active
            return (
              <div key={f.id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className={`flex items-center gap-2 ${isActive ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    <span className="material-symbols-outlined text-base">{f.icon}</span>
                    {f.label}
                  </span>
                  <span className={`font-mono ${isActive ? "text-secondary font-semibold" : "text-muted-foreground"}`}>{pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${isActive ? "bg-secondary" : "bg-outline-variant"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
