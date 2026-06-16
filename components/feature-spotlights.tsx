'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/* 1. Interactive Multi-Step Quote Wizard                              */
/* ------------------------------------------------------------------ */
function QuoteWizardDemo() {
  const steps = [
    { q: 'What is your average monthly electric bill?', opts: ['$80–$150', '$150–$250', '$250+'] },
    { q: 'What type of roof do you have?', opts: ['Asphalt Shingle', 'Metal', 'Tile'] },
    { q: 'When are you looking to install?', opts: ['ASAP', '1–3 months', 'Just exploring'] },
  ]
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const done = step >= steps.length

  const choose = (i: number) => {
    setSelected(i)
    setTimeout(() => {
      setStep((s) => s + 1)
      setSelected(null)
    }, 320)
  }

  const reset = () => {
    setStep(0)
    setSelected(null)
  }

  const pct = Math.min((step / steps.length) * 100, 100)

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {done ? 'Lead Qualified' : `Step ${step + 1} of ${steps.length}`}
        </span>
        <span className="font-mono text-xs text-secondary font-semibold">{Math.round(done ? 100 : pct)}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${done ? 100 : pct}%` }}
        />
      </div>

      {done ? (
        <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-14 h-14 rounded-full bg-energy-emerald/15 flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-energy-emerald text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
          </div>
          <p className="font-heading text-lg font-bold text-foreground">Pushed to your CRM</p>
          <p className="text-sm text-muted-foreground mb-4">Verified in 184ms · full attribution</p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:gap-2.5 transition-all"
          >
            <span className="material-symbols-outlined text-base">replay</span>
            Run it again
          </button>
        </div>
      ) : (
        <div key={step} className="animate-in fade-in slide-in-from-right-3 duration-300">
          <p className="font-heading text-base font-bold text-foreground mb-4 leading-snug">{steps[step].q}</p>
          <div className="flex flex-col gap-2.5">
            {steps[step].opts.map((opt, i) => (
              <button
                key={opt}
                onClick={() => choose(i)}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selected === i
                    ? 'border-secondary bg-secondary/10 text-foreground'
                    : 'border-outline-variant/50 text-foreground/80 hover:border-secondary/60 hover:bg-surface-container'
                }`}
              >
                {opt}
                <span
                  className={`material-symbols-outlined text-lg transition-opacity ${
                    selected === i ? 'text-secondary opacity-100' : 'opacity-30'
                  }`}
                >
                  {selected === i ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Live CRM Sync Visualizer                                         */
/* ------------------------------------------------------------------ */
function CrmSyncDemo() {
  const [syncing, setSyncing] = useState(false)
  const [synced, setSynced] = useState(false)
  const [ms, setMs] = useState(0)
  const crms = ['Salesforce', 'HubSpot', 'Zoho', 'Pipedrive']
  const [crm, setCrm] = useState(0)

  const runSync = () => {
    if (syncing) return
    setSynced(false)
    setSyncing(true)
    const target = 120 + Math.floor(Math.random() * 90)
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1)
      setMs(Math.round(target * p))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setSyncing(false)
        setSynced(true)
      }
    }
    raf = requestAnimationFrame(tick)
  }

  return (
    <div className="bg-edge-navy rounded-2xl p-6 shadow-lg w-full text-white relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-secondary/10 blur-3xl rounded-full" aria-hidden />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>sync_alt</span>
            <span className="font-heading text-sm font-bold">Lead Relay</span>
          </div>
          <div className="flex gap-1.5">
            {crms.map((c, i) => (
              <button
                key={c}
                onClick={() => setCrm(i)}
                className={`text-[0.7rem] px-2 py-1 rounded-md transition-colors ${
                  crm === i ? 'bg-secondary text-secondary-foreground font-semibold' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Flow diagram */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white">person</span>
            </div>
            <span className="text-[0.65rem] text-white/60">Lead</span>
          </div>

          <div className="flex-1 relative h-0.5 bg-white/15 rounded-full mx-1">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px] shadow-secondary ${
                syncing ? 'animate-[flow_0.9s_ease-in-out_infinite]' : 'opacity-0'
              }`}
              style={{ left: 0 }}
            />
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${synced ? 'bg-energy-emerald/20' : 'bg-white/10'}`}>
              <span className={`material-symbols-outlined transition-colors ${synced ? 'text-energy-emerald' : 'text-white'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {synced ? 'check_circle' : 'database'}
              </span>
            </div>
            <span className="text-[0.65rem] text-white/60">{crms[crm]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-white/50">Sync Latency</p>
            <p className="font-heading text-2xl font-bold font-mono">
              <span className={synced ? 'text-energy-emerald' : 'text-white'}>{ms}</span>
              <span className="text-sm text-white/60">ms</span>
            </p>
          </div>
          <button
            onClick={runSync}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors disabled:opacity-60"
          >
            <span className={`material-symbols-outlined text-base ${syncing ? 'animate-spin' : ''}`}>
              {syncing ? 'progress_activity' : 'bolt'}
            </span>
            {syncing ? 'Syncing…' : 'Send Test Lead'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Interactive Lighthouse Speed Gauge                               */
/* ------------------------------------------------------------------ */
function SpeedGaugeDemo() {
  const [score, setScore] = useState(0)
  const [testing, setTesting] = useState(false)
  const radius = 54
  const circ = 2 * Math.PI * radius

  const runTest = () => {
    if (testing) return
    setTesting(true)
    setScore(0)
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setScore(Math.round(100 * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTesting(false)
    }
    raf = requestAnimationFrame(tick)
  }

  // auto-run once on mount
  useEffect(() => {
    runTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const offset = circ - (score / 100) * circ

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 shadow-lg w-full">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5 text-center">
        Lighthouse Performance
      </p>
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="currentColor" strokeWidth="9" className="text-surface-container" />
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              className="text-energy-emerald transition-[stroke-dashoffset] duration-100"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-4xl font-extrabold text-foreground font-mono">{score}</span>
            <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { k: 'LCP', v: '0.8s' },
          { k: 'CLS', v: '0.00' },
          { k: 'TTFB', v: '12ms' },
        ].map((m) => (
          <div key={m.k} className="bg-surface-container rounded-lg py-2 text-center">
            <p className="text-[0.6rem] uppercase tracking-wide text-muted-foreground">{m.k}</p>
            <p className="font-mono text-sm font-bold text-energy-emerald">{m.v}</p>
          </div>
        ))}
      </div>
      <button
        onClick={runTest}
        disabled={testing}
        className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        <span className={`material-symbols-outlined text-base ${testing ? 'animate-spin' : ''}`}>
          {testing ? 'progress_activity' : 'speed'}
        </span>
        {testing ? 'Running audit…' : 'Re-run Speed Test'}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4. AI SEO Rank Tracker                                              */
/* ------------------------------------------------------------------ */
function SeoRankDemo() {
  const keywords = [
    { term: 'solar installer near me', rank: 1, vol: '14k' },
    { term: 'best solar panels 2025', rank: 2, vol: '9.1k' },
    { term: 'solar financing options', rank: 1, vol: '6.3k' },
    { term: 'home battery backup', rank: 3, vol: '4.8k' },
  ]
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true)
          ob.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 shadow-lg w-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>query_stats</span>
          <span className="font-heading text-sm font-bold text-foreground">Keyword Rankings</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-energy-emerald">
          <span className="material-symbols-outlined text-sm">arrow_upward</span>
          Trending up
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {keywords.map((k, i) => {
          // position 1 = 100% bar, lower ranks shorter
          const width = active ? 100 - (k.rank - 1) * 18 : 4
          return (
            <div key={k.term}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate pr-2">{k.term}</span>
                <span className="text-xs text-muted-foreground shrink-0 font-mono">{k.vol}/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${width}%`, transitionDelay: `${i * 120}ms` }}
                  />
                </div>
                <span
                  className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono ${
                    k.rank === 1 ? 'bg-energy-emerald/15 text-energy-emerald' : 'bg-surface-container text-foreground/70'
                  }`}
                >
                  #{k.rank}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section wrapper - zig-zag feature rows                              */
/* ------------------------------------------------------------------ */
const features = [
  {
    eyebrow: 'Conversion Engine',
    title: 'A Quote Wizard That Qualifies While You Sleep',
    desc: 'Generic contact forms leak revenue. Spark\u2019s psychology-backed Multi-Step Quote Wizard engages homeowners with value first, lifting completion rates by 340% and handing your sales team pre-qualified, ready-to-close leads.',
    points: ['Cognitive-load reduction', 'Real-time conditional logic', 'Instant lead scoring'],
    icon: 'dynamic_form',
    keyBenefit: '+340% form completion vs. static contact forms',
    whatYouGet: ['Gamified multi-step quote wizard', 'Automatic lead scoring & qualification', 'Pre-qualified leads routed to your closers'],
    href: '/platform/lead-engine',
    demo: <QuoteWizardDemo />,
  },
  {
    eyebrow: 'Frictionless Handoff',
    title: 'Verified Leads in Your CRM in Under 200ms',
    desc: 'No more copy-pasting from your inbox. The moment a homeowner qualifies, Spark validates and relays the lead straight into your CRM with full attribution\u2014before they\u2019ve even closed the tab.',
    points: ['Native CRM integrations', 'Sub-200ms relay latency', 'Full source attribution'],
    icon: 'sync_alt',
    keyBenefit: 'Respond first, every time \u2014 70% of sales go to the fastest vendor',
    whatYouGet: ['Native Salesforce & HubSpot sync', 'Auto-responder SMS/email with booking link', 'Full source attribution on every lead'],
    href: '/platform/crm-bridge',
    demo: <CrmSyncDemo />,
  },
  {
    eyebrow: 'Edge Performance',
    title: 'Perfect Scores Google Actually Rewards',
    desc: 'Speed is a ranking factor and a conversion multiplier. Every Spark site is a compiled React app served from 300+ edge nodes, engineered to hit green Core Web Vitals on every device.',
    points: ['100/100 Lighthouse target', '0.8s average load (LCP)', '300+ global edge nodes'],
    icon: 'speed',
    keyBenefit: 'Higher Google rankings and fewer bounced visitors',
    whatYouGet: ['100/100 Core Web Vitals target', '0.8s LCP served from 300+ edge nodes', 'Enterprise-grade SSL & security suite'],
    href: '/platform/edge-architecture',
    demo: <SpeedGaugeDemo />,
  },
  {
    eyebrow: 'AI-First SEO',
    title: 'Own the Map Pack and the AI Answers',
    desc: 'Spark ships with programmatic local landing pages and structured data built for the AI search era\u2014so when homeowners (or their AI assistants) search for solar, your brand is the answer.',
    points: ['Programmatic local pages', 'Schema & structured data', 'AI-answer optimization'],
    icon: 'query_stats',
    keyBenefit: 'Become the "Source of Truth" AI agents cite first',
    whatYouGet: ['Programmatic local landing pages', 'Structured JSON-LD for AI knowledge graphs', 'Hyper-local search & map pack dominance'],
    href: '/platform/ai-seo',
    demo: <SeoRankDemo />,
  },
]

export function FeatureSpotlights() {
  return (
    <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">A Complete Growth Ecosystem</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2 mb-3 text-balance">
          Every Feature, Engineered to Convert
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Spark isn&apos;t a template with plugins bolted on. It&apos;s a unified system where each component is built to turn solar traffic into booked installs. Interact with each one below.
        </p>
      </div>

      <div className="flex flex-col gap-20 lg:gap-24">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Copy */}
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
              </div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{f.eyebrow}</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-2 mb-4 text-balance">
                {f.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">{f.desc}</p>

              {/* Key benefit callout */}
              <div className="flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/5 p-4 mb-6 max-w-lg">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-0.5">Key Benefit</p>
                  <p className="text-sm font-semibold text-foreground leading-snug">{f.keyBenefit}</p>
                </div>
              </div>

              {/* What you get */}
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What You Get</p>
              <ul className="flex flex-col gap-2.5 mb-7">
                {f.whatYouGet.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm font-medium text-foreground/90">
                    <span className="material-symbols-outlined text-energy-emerald text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* CTA to feature page */}
              <Link
                href={f.href}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:gap-3"
              >
                Explore {f.eyebrow}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Interactive demo */}
            <div className={`flex justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="w-full max-w-md">{f.demo}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
