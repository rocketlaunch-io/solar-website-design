"use client"

import { useState, useEffect, useRef } from "react"

/* ============================================================
   Enhanced, hero-scale versions of the platform feature demos.
   Larger, more animated, more complex than the modal demos.
   ============================================================ */

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb)
  useEffect(() => {
    saved.current = cb
  }, [cb])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

function HeroShell({
  label,
  children,
  accent = "energy",
}: {
  label: string
  children: React.ReactNode
  accent?: "energy" | "amber"
}) {
  return (
    <div className="relative rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-2xl shadow-edge-navy/10 overflow-hidden">
      {/* glow */}
      <div className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
      <div className="relative flex items-center justify-between px-5 py-3 border-b border-outline-variant/40 bg-surface-container">
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{label}</span>
        <span className={`flex items-center gap-1.5 text-[10px] font-medium ${accent === "amber" ? "text-secondary" : "text-energy-emerald"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${accent === "amber" ? "bg-secondary" : "bg-energy-emerald"} animate-pulse`} />
          Live
        </span>
      </div>
      <div className="relative p-5 md:p-6">{children}</div>
    </div>
  )
}

/* ---------- 1. Spark AI — auto-cycling lead scoring with radar ---------- */

const HERO_LEADS = [
  { name: "Marcus T.", city: "Phoenix, AZ", score: 94, bill: "$280/mo", roof: "South-facing", intent: 96, value: 88, fit: 92, status: "Hot" },
  { name: "Dana R.", city: "Austin, TX", score: 71, bill: "$190/mo", roof: "East-facing", intent: 74, value: 68, fit: 70, status: "Warm" },
  { name: "Priya S.", city: "Denver, CO", score: 88, bill: "$240/mo", roof: "South-facing", intent: 90, value: 84, fit: 86, status: "Hot" },
  { name: "Cold Lead", city: "Unknown", score: 23, bill: "$60/mo", roof: "Shaded", intent: 20, value: 28, fit: 18, status: "Reject" },
]

function SparkAIHero() {
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState(0)
  const lead = HERO_LEADS[idx]

  useInterval(() => setIdx((i) => (i + 1) % HERO_LEADS.length), 3200)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const from = display
    const animate = (t: number) => {
      const p = Math.min((t - start) / 800, 1)
      setDisplay(Math.round(from + (lead.score - from) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const ring = lead.score >= 80 ? "#10b981" : lead.score >= 50 ? "#f59e0b" : "#ef4444"
  const color = lead.score >= 80 ? "text-energy-emerald" : lead.score >= 50 ? "text-secondary" : "text-destructive"

  return (
    <HeroShell label="Live Lead Scoring Engine">
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="7" className="text-surface-container-high" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke={ring} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={264} strokeDashoffset={264 - (264 * display) / 100}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-mono text-3xl font-bold ${color}`}>{display}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wide">AI Score</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground text-lg">{lead.name}</p>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${lead.score >= 80 ? "bg-energy-emerald/15 text-energy-emerald" : lead.score >= 50 ? "bg-secondary/15 text-secondary" : "bg-destructive/15 text-destructive"}`}>
              {lead.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{lead.city} · {lead.bill} · {lead.roof}</p>
          {[
            { l: "Intent", v: lead.intent },
            { l: "Value", v: lead.value },
            { l: "Fit", v: lead.fit },
          ].map((m) => (
            <div key={m.l} className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-muted-foreground w-10">{m.l}</span>
              <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-secondary transition-all duration-700" style={{ width: `${m.v}%` }} />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground w-7 text-right">{m.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-1.5">
        {HERO_LEADS.map((l, i) => (
          <div
            key={l.name}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "bg-secondary" : "bg-surface-container-high"}`}
          />
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">Auto-scoring inbound leads in real time — routing hot buyers to your closers</p>
    </HeroShell>
  )
}

/* ---------- 2. Edge Architecture — animated global node map ---------- */

const HERO_REGIONS = [
  { id: "us-west", label: "US West", ms: 9, x: 16, y: 42 },
  { id: "us-east", label: "US East", ms: 12, x: 30, y: 40 },
  { id: "eu", label: "Europe", ms: 14, x: 52, y: 34 },
  { id: "asia", label: "Asia", ms: 18, x: 78, y: 48 },
  { id: "sa", label: "S. America", ms: 21, x: 34, y: 70 },
  { id: "au", label: "Australia", ms: 24, x: 84, y: 74 },
]

function EdgeHero() {
  const [active, setActive] = useState(0)
  const [pinging, setPinging] = useState(false)
  const region = HERO_REGIONS[active]

  useInterval(() => {
    setPinging(true)
    setTimeout(() => setPinging(false), 700)
    setActive((a) => (a + 1) % HERO_REGIONS.length)
  }, 2600)

  return (
    <HeroShell label="Global Edge Network">
      <div className="relative rounded-xl bg-edge-navy p-4 overflow-hidden">
        {/* node map */}
        <div className="relative h-44 w-full">
          {HERO_REGIONS.map((r, i) => (
            <div key={r.id} className="absolute" style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%,-50%)" }}>
              {i === active && (
                <span className="absolute inset-0 -m-1 rounded-full bg-secondary/40 animate-ping" style={{ width: 16, height: 16 }} />
              )}
              <span className={`block rounded-full transition-all duration-500 ${i === active ? "bg-secondary w-3 h-3" : "bg-white/30 w-2 h-2"}`} />
              {i === active && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono text-energy-emerald">
                  {pinging ? "···" : `${r.ms}ms`}
                </span>
              )}
            </div>
          ))}
          {/* connecting lines to center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {HERO_REGIONS.map((r, i) => (
              <line
                key={r.id}
                x1={`${r.x}%`} y1={`${r.y}%`} x2="50%" y2="50%"
                stroke={i === active ? "#f59e0b" : "rgba(255,255,255,0.08)"}
                strokeWidth={i === active ? 1.5 : 1}
                strokeDasharray="3 3"
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary-foreground" style={{ fontSize: 12 }}>bolt</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { l: "TTFB", v: pinging ? "···" : `${region.ms}ms` },
          { l: "LCP", v: "0.8s" },
          { l: "Uptime", v: "99.99%" },
        ].map((s, i) => (
          <div key={s.l} className={`rounded-lg p-3 text-center ${i === 0 ? "bg-energy-emerald/15 border border-energy-emerald/30" : "bg-surface-container"}`}>
            <p className="text-[9px] uppercase tracking-wide text-muted-foreground mb-0.5">{s.l}</p>
            <p className={`font-mono text-base font-bold ${i === 0 ? "text-energy-emerald" : "text-foreground"}`}>{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">Serving from {region.label} · 1 of 300+ global nodes</p>
    </HeroShell>
  )
}

/* ---------- 3. Solar Calculator — savings slider + animated bars ---------- */

function CalculatorHero() {
  const [bill, setBill] = useState(220)
  const monthly = Math.round(bill * 0.82)
  const yearly = monthly * 12
  const twentyYear = yearly * 20
  const offset = Math.round((twentyYear / 1000) * 0.42)

  return (
    <HeroShell label="Instant Savings Estimator" accent="amber">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Monthly electric bill</span>
        <span className="font-mono text-2xl font-bold text-foreground">${bill}</span>
      </div>
      <input
        type="range" min={80} max={500} step={10} value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className="w-full accent-secondary mb-5 cursor-pointer"
        aria-label="Monthly electric bill"
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { l: "Monthly", v: `$${monthly}` },
          { l: "Yearly", v: `$${yearly.toLocaleString()}` },
          { l: "20-Year", v: `$${twentyYear.toLocaleString()}` },
        ].map((s, i) => (
          <div key={s.l} className={`rounded-lg p-3 text-center ${i === 2 ? "bg-energy-emerald/15 border border-energy-emerald/30" : "bg-surface-container"}`}>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">{s.l}</p>
            <p className={`font-mono text-base font-bold ${i === 2 ? "text-energy-emerald" : "text-foreground"}`}>{s.v}</p>
          </div>
        ))}
      </div>
      {/* animated comparison bars */}
      <div className="rounded-xl bg-edge-navy p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/60">Grid cost (20yr)</span>
          <span className="font-mono text-xs text-white/80">${(twentyYear * 1.6).toLocaleString()}</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-3">
          <div className="h-full rounded-full bg-destructive/70 transition-all duration-500" style={{ width: "100%" }} />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-white/60">With Spark Solar</span>
          <span className="font-mono text-xs text-energy-emerald">${(twentyYear * 0.6).toLocaleString()}</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-energy-emerald transition-all duration-500" style={{ width: "38%" }} />
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">~{offset} trees worth of CO₂ offset · adjust to see live projections</p>
    </HeroShell>
  )
}

/* ---------- 4. Lead Engine — animated multi-step wizard ---------- */

const WIZARD_STEPS = [
  { q: "Do you own your home?", opts: ["Yes", "No"], pick: 0 },
  { q: "Average monthly bill?", opts: ["<$150", "$150–300", "$300+"], pick: 1 },
  { q: "Roof direction?", opts: ["South", "East/West", "Not sure"], pick: 0 },
  { q: "When to start?", opts: ["ASAP", "1–3 mo", "Browsing"], pick: 0 },
]

function LeadEngineHero() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const done = step >= WIZARD_STEPS.length

  useInterval(() => {
    if (done) {
      setStep(0)
      setPicked(null)
      return
    }
    if (picked === null) {
      setPicked(WIZARD_STEPS[step].pick)
    } else {
      setStep((s) => s + 1)
      setPicked(null)
    }
  }, 1100)

  const progress = Math.round((step / WIZARD_STEPS.length) * 100)

  return (
    <HeroShell label="Smart Quote Wizard" accent="amber">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium text-muted-foreground">{done ? "Complete" : `Step ${step + 1} of ${WIZARD_STEPS.length}`}</span>
        <span className="font-mono text-[11px] text-secondary">{done ? 100 : progress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-container-high overflow-hidden mb-5">
        <div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: `${done ? 100 : progress}%` }} />
      </div>

      <div className="min-h-[170px] flex flex-col justify-center">
        {done ? (
          <div className="text-center animate-in fade-in zoom-in-95 duration-500">
            <span className="material-symbols-outlined text-energy-emerald text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <p className="font-heading text-xl font-bold text-foreground">You qualify!</p>
            <p className="text-sm text-muted-foreground mt-1">Est. savings <span className="font-mono font-bold text-energy-emerald">$24,800</span> over 20 years</p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-energy-emerald">
              <span className="material-symbols-outlined text-sm">sync_alt</span>
              Synced to CRM in 148ms
            </div>
          </div>
        ) : (
          <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="font-heading text-lg font-bold text-foreground mb-4">{WIZARD_STEPS[step].q}</p>
            <div className="space-y-2">
              {WIZARD_STEPS[step].opts.map((opt, i) => (
                <div
                  key={opt}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                    picked === i
                      ? "border-secondary bg-secondary/10 text-foreground"
                      : "border-outline-variant/40 bg-surface-container text-muted-foreground"
                  }`}
                >
                  {opt}
                  {picked === i && (
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground mt-4 text-center">One question at a time → <span className="text-energy-emerald font-semibold">+340% completion</span></p>
    </HeroShell>
  )
}

/* ---------- 5. AI-First SEO — auto-typing AI answer ---------- */

const HERO_QUESTIONS = [
  "Best solar installer near me?",
  "Who offers the best solar warranty?",
  "Top-rated solar company in my area?",
]

function AISeoHero() {
  const [q, setQ] = useState(0)
  const [typed, setTyped] = useState("")
  const [phase, setPhase] = useState<"typing" | "hold">("typing")
  const answer = `Based on verified local data, SolarPro Energy is a top-rated installer with a 4.9★ rating, certified technicians, and a 25-year warranty — recognized as a trusted source in your area.`

  useEffect(() => {
    setTyped("")
    setPhase("typing")
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(answer.slice(0, i))
      if (i >= answer.length) {
        clearInterval(id)
        setPhase("hold")
      }
    }, 22)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  useEffect(() => {
    if (phase !== "hold") return
    const t = setTimeout(() => setQ((x) => (x + 1) % HERO_QUESTIONS.length), 2600)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <HeroShell label="AI Search Simulator">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {HERO_QUESTIONS.map((question, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 ${q === i ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground"}`}
          >
            {question}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-surface-container p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </span>
          <span className="text-sm font-semibold text-foreground">AI Assistant</span>
          {phase === "typing" && (
            <span className="ml-auto flex gap-1">
              {[0, 1, 2].map((d) => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed min-h-[96px]">
          {typed}
          {phase === "typing" && <span className="inline-block w-1.5 h-4 bg-secondary ml-0.5 align-middle animate-pulse" />}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-energy-emerald border-t border-outline-variant/30 pt-3">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          Cited your Spark site as a trusted source
        </div>
      </div>
    </HeroShell>
  )
}

/* ---------- 6. Local SEO — auto page generator ---------- */

const HERO_CITIES = ["Scottsdale", "Mesa", "Tempe", "Chandler", "Gilbert"]

function LocalSeoHero() {
  const [cityIdx, setCityIdx] = useState(0)
  const [pages, setPages] = useState<string[]>([])
  const [count, setCount] = useState(312)
  const city = HERO_CITIES[cityIdx]

  useEffect(() => {
    setPages([])
    const slugs = [
      `solar-installer-${city.toLowerCase()}`,
      `solar-panels-${city.toLowerCase()}`,
      `solar-incentives-${city.toLowerCase()}`,
      `best-solar-company-${city.toLowerCase()}`,
    ]
    const timers = slugs.map((s, i) =>
      setTimeout(() => {
        setPages((p) => [...p, s])
        setCount((c) => c + 1)
      }, (i + 1) * 450),
    )
    const next = setTimeout(() => setCityIdx((c) => (c + 1) % HERO_CITIES.length), 3000)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(next)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityIdx])

  return (
    <HeroShell label="Programmatic Page Generator" accent="amber">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_city</span>
          <span className="text-sm font-semibold text-foreground">Generating: {city}, AZ</span>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-bold text-energy-emerald">{count}</p>
          <p className="text-[9px] uppercase tracking-wide text-muted-foreground">Live pages</p>
        </div>
      </div>
      <div className="rounded-xl bg-edge-navy p-4 min-h-[160px] font-mono text-xs space-y-2">
        {pages.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-energy-emerald animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-white/80">/{p}</span>
            <span className="ml-auto text-[9px] text-white/30">ranked #1–3</span>
          </div>
        ))}
        {pages.length < 4 && <span className="inline-block w-1.5 h-3 bg-secondary animate-pulse" />}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">One template → hundreds of hyper-local pages</p>
    </HeroShell>
  )
}

/* ---------- 7. CRM Bridge — auto speed-to-lead race ---------- */

function CrmBridgeHero() {
  const [spark, setSpark] = useState(0)
  const [comp, setComp] = useState(0)

  useEffect(() => {
    let id: ReturnType<typeof setInterval>
    const run = () => {
      setSpark(0)
      setComp(0)
      const t0 = performance.now()
      id = setInterval(() => {
        const e = performance.now() - t0
        setSpark(Math.min((e / 200) * 100, 100))
        setComp(Math.min((e / 3600) * 100, 100))
        if (e > 4200) clearInterval(id)
      }, 30)
    }
    run()
    const loop = setInterval(run, 5200)
    return () => {
      clearInterval(id)
      clearInterval(loop)
    }
  }, [])

  return (
    <HeroShell label="Speed-to-Lead Race">
      {[
        { l: "Spark Auto-Responder", v: spark, t: "0.2s", c: "bg-energy-emerald", win: true },
        { l: "Competitor (manual)", v: comp, t: "3.6s", c: "bg-muted-foreground" },
      ].map((r) => (
        <div key={r.l} className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
              {r.win && <span className="material-symbols-outlined text-base text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>}
              {r.l}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{r.v >= 100 ? r.t : "···"}</span>
          </div>
          <div className="h-4 rounded-full bg-surface-container-high overflow-hidden">
            <div className={`h-full rounded-full ${r.c} flex items-center justify-end pr-2`} style={{ width: `${r.v}%`, transition: "width 0.03s linear" }}>
              {r.win && r.v > 30 && <span className="material-symbols-outlined text-white" style={{ fontSize: 12 }}>sms</span>}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 rounded-xl bg-edge-navy p-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-energy-emerald text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        <div>
          <p className="text-sm font-semibold text-white">Instant SMS + calendar link fired</p>
          <p className="text-[11px] text-white/50">70% of sales go to whoever responds first</p>
        </div>
      </div>
    </HeroShell>
  )
}

/* ---------- 8. Voice Agents — animated live call ---------- */

const HERO_CALL = [
  { who: "agent", text: "Hi! Thanks for your interest in solar. Is now a good time?" },
  { who: "lead", text: "Sure, I was looking at panel options." },
  { who: "agent", text: "Great — what's your average monthly electric bill?" },
  { who: "lead", text: "Around $240." },
  { who: "agent", text: "Perfect. I can book a free assessment Thursday at 2pm?" },
  { who: "lead", text: "That works!" },
]

function VoiceAgentHero() {
  const [step, setStep] = useState(0)
  const [calls, setCalls] = useState(1247)

  useInterval(() => {
    setStep((s) => {
      if (s >= HERO_CALL.length - 1) {
        setCalls((c) => c + 1)
        return 0
      }
      return s + 1
    })
  }, 1500)

  return (
    <HeroShell label="AI Voice Agent — Live Call">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-semibold text-foreground">On call</span>
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-secondary"
              style={{
                height: `${20 + Math.abs(Math.sin((step + i) * 1.1)) * 80}%`,
                transition: "height 0.3s",
              }}
            />
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-surface-container p-4 space-y-2.5 min-h-[170px]">
        {HERO_CALL.slice(0, step + 1).map((s, i) => (
          <div key={i} className={`flex ${s.who === "agent" ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <span className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs ${s.who === "agent" ? "bg-edge-navy text-white rounded-tl-sm" : "bg-secondary/20 text-foreground rounded-tr-sm"}`}>
              {s.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs">
        <span className="text-muted-foreground">Calls handled today</span>
        <span className="font-mono font-bold text-energy-emerald text-base">{calls.toLocaleString()}</span>
      </div>
    </HeroShell>
  )
}

/* ---------- 9. Spark CRM — auto-advancing pipeline ---------- */

const HERO_STAGES = ["New", "Qualified", "Booked", "Won"]
const HERO_CRM_INIT = [
  { id: 1, name: "Marcus T.", stage: 0 },
  { id: 2, name: "Dana R.", stage: 1 },
  { id: 3, name: "Priya S.", stage: 2 },
  { id: 4, name: "Leo M.", stage: 0 },
]

function SparkCrmHero() {
  const [leads, setLeads] = useState(HERO_CRM_INIT)

  useInterval(() => {
    setLeads((ls) => {
      const movable = ls.filter((l) => l.stage < HERO_STAGES.length - 1)
      if (movable.length === 0) return HERO_CRM_INIT
      const pick = movable[Math.floor(Math.random() * movable.length)]
      return ls.map((l) => (l.id === pick.id ? { ...l, stage: l.stage + 1 } : l))
    })
  }, 1300)

  return (
    <HeroShell label="Live Sales Pipeline">
      <div className="grid grid-cols-4 gap-2">
        {HERO_STAGES.map((stage, si) => (
          <div key={stage} className="rounded-xl bg-surface-container p-2 min-h-[160px]">
            <p className={`text-[9px] font-semibold uppercase text-center mb-2 ${si === 3 ? "text-energy-emerald" : "text-muted-foreground"}`}>{stage}</p>
            <div className="space-y-1.5">
              {leads.filter((l) => l.stage === si).map((l) => (
                <div
                  key={l.id}
                  className={`w-full px-2 py-2 rounded-lg text-[10px] font-medium transition-all duration-500 animate-in fade-in zoom-in-95 ${si === 3 ? "bg-energy-emerald/20 text-energy-emerald" : "bg-secondary/20 text-foreground"}`}
                >
                  {l.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">Unified website + project data — no silos, no leaks</p>
    </HeroShell>
  )
}

/* ---------- 10. Analytics — animated attribution ---------- */

const HERO_CHANNELS = [
  { id: "google", label: "Google", leads: 142, roi: "4.2x", quality: 88 },
  { id: "meta", label: "Meta", leads: 98, roi: "3.1x", quality: 72 },
  { id: "organic", label: "Organic", leads: 211, roi: "9.8x", quality: 94 },
  { id: "referral", label: "Referral", leads: 64, roi: "12.4x", quality: 96 },
]

function AnalyticsHero() {
  const [active, setActive] = useState(2)
  const ch = HERO_CHANNELS[active]
  const max = Math.max(...HERO_CHANNELS.map((c) => c.leads))

  useInterval(() => setActive((a) => (a + 1) % HERO_CHANNELS.length), 2400)

  return (
    <HeroShell label="Full-Funnel Attribution">
      <div className="flex items-end gap-3 h-32 mb-4">
        {HERO_CHANNELS.map((c, i) => (
          <div key={c.id} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="text-[10px] font-mono text-muted-foreground mb-1">{c.leads}</span>
            <div
              className={`w-full rounded-t-lg transition-all duration-500 ${active === i ? "bg-secondary" : "bg-surface-container-high"}`}
              style={{ height: `${(c.leads / max) * 100}%` }}
            />
            <span className={`text-[10px] mt-1.5 text-center leading-tight ${active === i ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{c.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Leads", v: ch.leads },
          { l: "ROI", v: ch.roi },
          { l: "Quality", v: `${ch.quality}%` },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-surface-container p-2.5 text-center">
            <p className="text-[9px] uppercase text-muted-foreground">{s.l}</p>
            <p className="font-mono text-base font-bold text-energy-emerald">{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">Tracing every install back to its exact source</p>
    </HeroShell>
  )
}

/* ---------- 11. Bespoke Design — auto before/after wipe ---------- */

function BespokeDesignHero() {
  const [pos, setPos] = useState(55)
  const dir = useRef(1)

  useInterval(() => {
    setPos((p) => {
      let next = p + dir.current * 1.5
      if (next > 80) { next = 80; dir.current = -1 }
      if (next < 25) { next = 25; dir.current = 1 }
      return next
    })
  }, 40)

  return (
    <HeroShell label="WordPress vs. Spark">
      <div className="relative h-56 rounded-xl overflow-hidden select-none">
        <div className="absolute inset-0 bg-surface-container-high flex flex-col items-center justify-center gap-2 p-4">
          <span className="material-symbols-outlined text-muted-foreground text-4xl">sentiment_dissatisfied</span>
          <p className="text-xs text-muted-foreground text-center">Generic template · slow · low trust</p>
          <div className="w-2/3 h-2.5 rounded bg-muted-foreground/30" />
          <div className="w-1/2 h-2.5 rounded bg-muted-foreground/30" />
          <div className="w-1/3 h-2.5 rounded bg-muted-foreground/30" />
        </div>
        <div className="absolute inset-0 bg-edge-navy flex flex-col items-center justify-center gap-3 p-4 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <p className="text-xs text-white text-center font-semibold">Conversion-engineered · fast · premium</p>
          <div className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-xs font-semibold">
            Get Free Quote
          </div>
          <div className="flex items-center gap-1 text-secondary">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
          </div>
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-secondary" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-secondary-foreground text-base">drag_indicator</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">Same business — engineered for conversion</p>
    </HeroShell>
  )
}

/* ---------- 12. Spark API — auto webhook stream ---------- */

const HERO_ENDPOINTS = [
  { id: "lead", label: "lead.created", payload: `{\n  "event": "lead.created",\n  "name": "Marcus T.",\n  "bill": 280,\n  "score": 94\n}` },
  { id: "booking", label: "booking.scheduled", payload: `{\n  "event": "booking.scheduled",\n  "rep": "Sarah K.",\n  "slot": "Thu 2:00 PM"\n}` },
  { id: "deal", label: "deal.won", payload: `{\n  "event": "deal.won",\n  "value": 28400,\n  "system": "8.4 kW"\n}` },
]

function ApiHero() {
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState<"sending" | "ok">("sending")

  useEffect(() => {
    setStatus("sending")
    const ok = setTimeout(() => setStatus("ok"), 700)
    const next = setTimeout(() => setActive((a) => (a + 1) % HERO_ENDPOINTS.length), 2800)
    return () => {
      clearTimeout(ok)
      clearTimeout(next)
    }
  }, [active])

  const ep = HERO_ENDPOINTS[active]

  return (
    <HeroShell label="Live Webhook Stream">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {HERO_ENDPOINTS.map((e, i) => (
          <span
            key={e.id}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300 ${active === i ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground"}`}
          >
            {e.label}
          </span>
        ))}
      </div>
      <pre className="rounded-xl bg-edge-navy p-4 text-xs font-mono text-energy-emerald overflow-x-auto whitespace-pre min-h-[120px]">{ep.payload}</pre>
      <div className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-surface-container text-foreground px-4 py-3 rounded-lg text-sm font-semibold">
        {status === "ok" ? (
          <><span className="material-symbols-outlined text-base text-energy-emerald">check_circle</span>200 OK · delivered in 148ms</>
        ) : (
          <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span>Sending…</>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center">1,000+ integrations · event-driven architecture</p>
    </HeroShell>
  )
}

/* ---------- router ---------- */

export function FeatureHeroDemo({ slug }: { slug: string }) {
  switch (slug) {
    case "spark-ai":
      return <SparkAIHero />
    case "edge-architecture":
      return <EdgeHero />
    case "solar-savings-calculator":
      return <CalculatorHero />
    case "lead-engine":
      return <LeadEngineHero />
    case "ai-seo":
      return <AISeoHero />
    case "local-seo":
      return <LocalSeoHero />
    case "crm-bridge":
      return <CrmBridgeHero />
    case "voice-agents":
      return <VoiceAgentHero />
    case "spark-crm":
      return <SparkCrmHero />
    case "analytics":
      return <AnalyticsHero />
    case "bespoke-design":
      return <BespokeDesignHero />
    case "developer-api":
      return <ApiHero />
    default:
      return null
  }
}
