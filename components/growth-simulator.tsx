"use client"

import { useMemo, useState } from "react"

// Per-tier economics used to recommend a plan and project ROI.
const TIERS = [
  { name: "Foundation", monthly: 5000, perLead: 20, max: 40 },
  { name: "Velocity", monthly: 10000, perLead: 15, max: 150 },
  { name: "Enterprise", monthly: 10000, perLead: 10, max: 400 },
]

// Average revenue an installer earns per closed install, and a conservative
// close rate on verified leads. Used purely for an illustrative projection.
const REVENUE_PER_INSTALL = 9000
const CLOSE_RATE = 0.11

export function GrowthSimulator() {
  const [leads, setLeads] = useState(73)

  const projection = useMemo(() => {
    const tier =
      leads <= TIERS[0].max ? TIERS[0] : leads <= TIERS[1].max ? TIERS[1] : TIERS[2]

    const leadCost = leads * tier.perLead
    const totalCost = tier.monthly + leadCost
    const installs = leads * CLOSE_RATE
    const revenue = installs * REVENUE_PER_INSTALL
    const roi = totalCost > 0 ? revenue / totalCost : 0

    return {
      tierName: tier.name,
      revenue: Math.round(revenue),
      roi: Math.max(1, Math.round(roi)),
      totalCost,
    }
  }, [leads])

  return (
    <div className="glass-panel-dark rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-energy-emerald">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-energy-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-energy-emerald" />
          </span>
          Live Projection
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Growth Simulator</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium text-white/50">Projected Monthly Revenue</p>
          <p className="mt-1 font-heading text-3xl font-bold text-white">
            ${projection.revenue.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-medium text-white/50">Return on Investment</p>
          <p className="mt-1 font-heading text-3xl font-bold text-solar-amber-bright">{projection.roi}x</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="lead-volume" className="font-medium text-white/70">
            Lead Volume
          </label>
          <span className="font-mono font-semibold text-white">{leads} / mo</span>
        </div>
        <input
          id="lead-volume"
          type="range"
          min={10}
          max={300}
          value={leads}
          onChange={(e) => setLeads(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-solar-amber"
          aria-label="Adjust monthly lead volume"
        />
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-solar-amber/30 bg-solar-amber/10 p-3">
        <span className="material-symbols-outlined text-solar-amber-bright" style={{ fontVariationSettings: "'FILL' 1" }}>
          recommend
        </span>
        <p className="text-sm font-semibold text-white">
          Recommended: <span className="text-solar-amber-bright">{projection.tierName} Plan</span>
        </p>
      </div>
    </div>
  )
}
