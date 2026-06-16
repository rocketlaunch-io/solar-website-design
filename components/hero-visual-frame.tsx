'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroVisualFrameProps {
  imageSrc: string
  altText: string
  badgeText?: string
  statsTitle?: string
  statsValue?: string
  toastIcon?: string
  toastTitle?: string
  toastBody?: string
  performanceLabel?: string
  performanceValue?: string
}

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
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value)
}

export function HeroVisualFrame({
  imageSrc,
  altText,
  badgeText = 'Live',
  statsTitle,
  statsValue,
  toastIcon = 'verified',
  toastTitle,
  toastBody,
  performanceLabel = 'LCP Speed',
  performanceValue = '0.8s',
}: HeroVisualFrameProps) {
  // Simple animations for stats if numeric
  const numericStats = statsValue ? parseFloat(statsValue.replace(/[^0-9.]/g, '')) : null
  const animatedStats = numericStats ? useCountUp(numericStats, 1600) : null
  const displayStats = animatedStats && statsValue
    ? statsValue.replace(numericStats.toString(), animatedStats.toLocaleString())
    : statsValue

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-6 bg-secondary/10 blur-3xl rounded-full -z-10" aria-hidden />

      {/* Main Image Container */}
      <div className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-2xl relative bg-surface-container">
        <Image
          src={imageSrc}
          alt={altText}
          width={720}
          height={560}
          className="w-full h-[320px] md:h-[380px] object-cover"
          priority
        />

        {/* Live performance bar overlaid on image bottom */}
        <div className="absolute inset-x-3 bottom-3 glass-panel rounded-xl px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{performanceLabel}</p>
            <p className="font-heading text-lg font-bold text-energy-emerald font-mono leading-none mt-0.5">
              {performanceValue}
            </p>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">Optimization</p>
            <p className="font-heading text-lg font-bold text-foreground font-mono leading-none mt-0.5">
              React 19 Edge
            </p>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-energy-emerald opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-energy-emerald" />
            </span>
            <span className="text-xs font-medium text-foreground">{badgeText}</span>
          </div>
        </div>
      </div>

      {/* Floating Stats Card (Top Right) */}
      {statsTitle && statsValue && (
        <div className="absolute -top-4 -right-2 sm:-right-5 glass-panel rounded-xl p-4 shadow-lg w-44 animate-in fade-in slide-in-from-top-2 duration-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{statsTitle}</p>
          </div>
          <p className="font-heading text-xl font-bold text-foreground font-mono">{displayStats}</p>
          <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full w-[84%] bg-secondary rounded-full" />
          </div>
        </div>
      )}

      {/* Floating Toast Card (Bottom Left) */}
      {toastTitle && (
        <div className="absolute -bottom-5 -left-2 sm:-left-5 glass-panel rounded-xl p-3.5 shadow-lg w-56 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-energy-emerald/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-energy-emerald text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{toastIcon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{toastTitle}</p>
              {toastBody && (
                <p className="text-[0.7rem] text-muted-foreground leading-normal mt-0.5">{toastBody}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
