'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/** Smoothly animates a number from 0 to `target` once mounted. */
function useCountUp(target: number, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value)
}

const leadFeed = [
  { name: 'Maria G.', city: 'Phoenix, AZ', amount: '$48,200' },
  { name: 'James T.', city: 'Austin, TX', amount: '$39,750' },
  { name: 'Priya K.', city: 'Denver, CO', amount: '$52,100' },
  { name: 'Devon R.', city: 'Tampa, FL', amount: '$44,600' },
]

export function HeroShowcase() {
  const growth = useCountUp(142)
  const lcp = useCountUp(0.8, 1600, 1)
  const leads = useCountUp(1284)

  const [feedIndex, setFeedIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFeedIndex((i) => (i + 1) % leadFeed.length), 2600)
    return () => clearInterval(id)
  }, [])

  const lead = leadFeed[feedIndex]

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 bg-secondary/10 blur-3xl rounded-full -z-10" aria-hidden />

      {/* Main image */}
      <div className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-2xl">
        <Image
          src="/images/solar-hero.png"
          alt="Premium residential home with solar panels at golden hour"
          width={720}
          height={560}
          className="w-full h-auto object-cover"
          priority
        />

        {/* Live performance bar overlaid on image bottom */}
        <div className="absolute inset-x-3 bottom-3 glass-panel rounded-xl px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">Projected Growth</p>
            <p className="font-heading text-xl font-bold text-energy-emerald font-mono leading-none mt-0.5">
              +{growth}%
            </p>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">LCP Load</p>
            <p className="font-heading text-xl font-bold text-foreground font-mono leading-none mt-0.5">
              {lcp}s
            </p>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-energy-emerald opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-energy-emerald" />
            </span>
            <span className="text-xs font-medium text-foreground">Live</span>
          </div>
        </div>
      </div>

      {/* Floating: leads captured counter */}
      <div className="absolute -top-4 -right-2 sm:-right-5 glass-panel rounded-xl p-4 shadow-lg w-44 animate-in fade-in slide-in-from-top-2 duration-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">Leads This Month</p>
        </div>
        <p className="font-heading text-2xl font-bold text-foreground font-mono">{Number(leads).toLocaleString()}</p>
        <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-secondary rounded-full" />
        </div>
      </div>

      {/* Floating: cycling verified-lead toast */}
      <div className="absolute -bottom-5 -left-2 sm:-left-5 glass-panel rounded-xl p-3.5 shadow-lg w-56">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-energy-emerald/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-energy-emerald text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          </div>
          <div key={feedIndex} className="min-w-0 animate-in fade-in slide-in-from-bottom-1 duration-500">
            <p className="text-xs font-semibold text-foreground truncate">
              New verified lead{' '}
              <span className="text-muted-foreground font-normal">· {lead.city}</span>
            </p>
            <p className="text-[0.7rem] text-muted-foreground">
              {lead.name} · Est. <span className="text-energy-emerald font-mono font-medium">{lead.amount}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
