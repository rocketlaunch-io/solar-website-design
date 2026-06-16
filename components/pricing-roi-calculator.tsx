'use client'

import { useState } from 'react'

export function PricingRoiCalculator() {
  const [leads, setLeads] = useState(50)

  // Pricing Logic
  const isScale = leads >= 30
  const planName = isScale ? 'Scale' : 'Business'
  const platformFee = isScale ? 5000 : 1000
  const perLeadFee = isScale ? 15 : 20
  const monthlyLeadCost = leads * perLeadFee
  const totalCost = platformFee + monthlyLeadCost

  // ROI Projections (Based on industry averages)
  const closeRate = 0.10 // 10% average close rate
  const estInstalls = Math.max(1, Math.round(leads * closeRate))
  const averageDealProfit = 12000 // Industry average profit per residential install
  const projectedReturn = estInstalls * averageDealProfit
  const roiMultiplier = (projectedReturn / totalCost).toFixed(1)

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 bg-secondary/15 blur-3xl rounded-full -z-10" aria-hidden />

      {/* Main Container */}
      <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-md p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Interactive ROI Estimator</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-energy-emerald uppercase bg-energy-emerald/10 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
            ROI Engine Active
          </span>
        </div>

        {/* Lead Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label htmlFor="lead-range" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Monthly Lead Target
            </label>
            <span className="font-mono text-2xl font-black text-foreground">{leads} <span className="text-xs font-normal text-muted-foreground">leads/mo</span></span>
          </div>
          <input
            id="lead-range"
            type="range"
            min={10}
            max={300}
            step={5}
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full accent-secondary cursor-pointer"
            aria-label="Monthly Lead Target"
          />
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>10 Leads</span>
            <span>150 Leads</span>
            <span>300 Leads</span>
          </div>
        </div>

        {/* Plan Output */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container rounded-xl p-3 border border-outline-variant/20 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Recommended Plan</p>
            <p className="font-heading text-lg font-bold text-foreground flex items-center gap-1.5">
              {planName}
              <span className={`h-2 w-2 rounded-full ${isScale ? 'bg-accent' : 'bg-secondary'}`} />
            </p>
          </div>
          <div className="bg-surface-container rounded-xl p-3 border border-outline-variant/20 flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Monthly Cost</p>
            <p className="font-mono text-lg font-bold text-foreground">
              ${totalCost.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ROI Metrics Card */}
        <div className="bg-edge-navy text-white rounded-xl p-4 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-energy-emerald bg-energy-emerald/10 border border-energy-emerald/30 px-2 py-0.5 rounded-full uppercase">
              {roiMultiplier}x ROI
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-0.5">Projected Monthly Return</p>
            <p className="font-mono text-3xl font-black text-energy-emerald">${projectedReturn.toLocaleString()}</p>
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-xs text-white/70">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
              ~{estInstalls} Deals Closed/mo
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
              10% Close Rate
            </span>
          </div>
        </div>

        <p className="text-[10px] text-center text-muted-foreground italic leading-normal">
          Calculations are based on a conservative 10% lead-to-close rate and an industry standard profit of $12,000 per install.
        </p>
      </div>
    </div>
  )
}
