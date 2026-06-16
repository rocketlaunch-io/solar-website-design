'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  icon: string
}

const stats: Stat[] = [
  { value: 142, suffix: '%', prefix: '+', label: 'Avg. lead growth in 90 days', icon: 'trending_up' },
  { value: 340, suffix: '%', prefix: '+', label: 'Higher form completion rate', icon: 'dynamic_form' },
  { value: 0.8, suffix: 's', decimals: 1, label: 'Average page load (LCP)', icon: 'speed' },
  { value: 500, suffix: '+', label: 'Solar pros trust Spark', icon: 'groups' },
]

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(stat.value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, stat.value])

  const display = stat.decimals ? value.toFixed(stat.decimals) : Math.round(value).toLocaleString()

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
      </div>
      <p className="font-heading text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
        {stat.prefix}{display}{stat.suffix}
      </p>
      <p className="text-sm text-white/60 mt-2 leading-snug max-w-[14ch]">{stat.label}</p>
    </div>
  )
}

export function StatsBand() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="px-4 md:px-12 py-12">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto bg-edge-navy rounded-3xl px-6 py-12 md:py-14 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-secondary/10 blur-3xl rounded-full" aria-hidden />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 relative z-10 divide-x-0 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
