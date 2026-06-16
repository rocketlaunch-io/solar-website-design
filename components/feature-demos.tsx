"use client"

import { useState, useEffect, useRef } from "react"

/* ---------- shared helpers ---------- */

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

function DemoShell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6 rounded-xl border border-outline-variant/40 bg-surface-container-lowest overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-outline-variant/40 bg-surface-container">
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">{label}</span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-energy-emerald">
          <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
          Interactive
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

/* ---------- 1. Spark AI — lead scoring ---------- */

const SAMPLE_LEADS = [
  { name: "Marcus T.", city: "Phoenix, AZ", score: 94, bill: "$280/mo", roof: "South-facing", intent: 96, value: 88, fit: 92 },
  { name: "Dana R.", city: "Austin, TX", score: 71, bill: "$190/mo", roof: "East-facing", intent: 74, value: 68, fit: 70 },
  { name: "Priya S.", city: "Denver, CO", score: 88, bill: "$240/mo", roof: "South-facing", intent: 90, value: 84, fit: 86 },
  { name: "Cold Lead", city: "Unknown", score: 23, bill: "$60/mo", roof: "Shaded", intent: 20, value: 28, fit: 18 },
]

function SparkAIDemo() {
  const [idx, setIdx] = useState(0)
  const [display, setDisplay] = useState(0)
  const lead = SAMPLE_LEADS[idx]

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const from = display
    const animate = (t: number) => {
      const p = Math.min((t - start) / 700, 1)
      setDisplay(Math.round(from + (lead.score - from) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const color = lead.score >= 80 ? "text-energy-emerald" : lead.score >= 50 ? "text-secondary" : "text-destructive"
  const ring = lead.score >= 80 ? "#10b981" : lead.score >= 50 ? "#f59e0b" : "#ef4444"

  return (
    <DemoShell label="Live Lead Scoring">
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-container-high" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke={ring} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={264} strokeDashoffset={264 - (264 * display) / 100}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-mono text-2xl font-bold ${color}`}>{display}</span>
            <span className="text-[9px] text-muted-foreground uppercase">Score</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">{lead.name}</p>
          <p className="text-xs text-muted-foreground mb-2">{lead.city} · {lead.bill} · {lead.roof}</p>
          {[
            { l: "Intent", v: lead.intent },
            { l: "Value", v: lead.value },
            { l: "Fit", v: lead.fit },
          ].map((m) => (
            <div key={m.l} className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-muted-foreground w-10">{m.l}</span>
              <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-secondary transition-all duration-700" style={{ width: `${m.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIdx((i) => (i + 1) % SAMPLE_LEADS.length)}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-edge-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-edge-navy/90 transition-colors"
      >
        <span className="material-symbols-outlined text-base">bolt</span>
        Score Next Lead
      </button>
    </DemoShell>
  )
}

/* ---------- 2. Edge Architecture — latency ping ---------- */

const EDGE_REGIONS = [
  { id: "us-west", label: "US West", ms: 9 },
  { id: "us-east", label: "US East", ms: 12 },
  { id: "eu", label: "Europe", ms: 14 },
  { id: "asia", label: "Asia", ms: 18 },
]

function EdgeDemo() {
  const [active, setActive] = useState("us-east")
  const [pinging, setPinging] = useState(false)
  const region = EDGE_REGIONS.find((r) => r.id === active)!

  const ping = (id: string) => {
    setActive(id)
    setPinging(true)
    setTimeout(() => setPinging(false), 600)
  }

  return (
    <DemoShell label="Edge Latency Test">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {EDGE_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => ping(r.id)}
            className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              active === r.id
                ? "bg-secondary text-secondary-foreground"
                : "bg-surface-container text-muted-foreground hover:bg-surface-container-high"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-edge-navy p-4 text-center relative overflow-hidden">
        {pinging && <div className="absolute inset-0 bg-secondary/20 animate-pulse" />}
        <p className="relative text-[10px] uppercase tracking-wide text-white/50 mb-1">TTFB from {region.label}</p>
        <p className="relative font-mono text-3xl font-bold text-energy-emerald">
          {pinging ? "···" : `${region.ms}ms`}
        </p>
        <div className="relative mt-3 flex items-center justify-center gap-1.5">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              style={{ opacity: pinging ? 0.3 : 1, transition: `opacity 0.3s ${i * 0.05}s` }}
            />
          ))}
        </div>
        <p className="relative text-[10px] text-white/40 mt-2">Served from 1 of 300+ global nodes</p>
      </div>
    </DemoShell>
  )
}

/* ---------- 3. Solar Calculator — savings slider ---------- */

function CalculatorDemo() {
  const [bill, setBill] = useState(220)
  const monthly = Math.round(bill * 0.82)
  const yearly = monthly * 12
  const twentyYear = yearly * 20

  return (
    <DemoShell label="Savings Estimator">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Monthly electric bill</span>
        <span className="font-mono text-lg font-bold text-foreground">${bill}</span>
      </div>
      <input
        type="range" min={80} max={500} step={10} value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className="w-full accent-secondary mb-4 cursor-pointer"
        aria-label="Monthly electric bill"
      />
      <div className="grid grid-cols-3 gap-2">
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
      <p className="text-[10px] text-muted-foreground mt-3 text-center">Estimated savings · adjust the slider to see projections update live</p>
    </DemoShell>
  )
}

/* ---------- 4. Lead Engine — completion comparison ---------- */

function LeadEngineDemo() {
  const [mode, setMode] = useState<"static" | "spark">("spark")
  const target = mode === "spark" ? 87 : 19
  const [pct, setPct] = useState(target)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const from = pct
    const animate = (t: number) => {
      const p = Math.min((t - start) / 600, 1)
      setPct(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return (
    <DemoShell label="Form Completion Rate">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setMode("static")}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${mode === "static" ? "bg-edge-navy text-white" : "bg-surface-container text-muted-foreground"}`}
        >
          Static Form
        </button>
        <button
          onClick={() => setMode("spark")}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${mode === "spark" ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground"}`}
        >
          Spark Wizard
        </button>
      </div>
      <div className="relative h-32 flex items-end gap-4 justify-center">
        <div className="flex flex-col items-center justify-end h-full w-24">
          <span className="font-mono text-2xl font-bold text-foreground mb-1">{pct}%</span>
          <div className="w-full bg-surface-container-high rounded-t-lg overflow-hidden flex items-end" style={{ height: "80%" }}>
            <div
              className={`w-full rounded-t-lg transition-all duration-300 ${mode === "spark" ? "bg-secondary" : "bg-edge-navy"}`}
              style={{ height: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-center text-sm mt-3">
        {mode === "spark" ? (
          <span className="text-energy-emerald font-semibold">+340% completion vs. static forms</span>
        ) : (
          <span className="text-muted-foreground">Long forms cause fatigue and drop-off</span>
        )}
      </p>
    </DemoShell>
  )
}

/* ---------- 5. AI-First SEO — AI answer reveal ---------- */

const AI_QUESTIONS = [
  "Best solar installer near me?",
  "Who offers the best solar warranty?",
  "Top-rated solar company in my area?",
]

function AISeoDemo() {
  const [q, setQ] = useState(0)
  const [typed, setTyped] = useState("")
  const answer = `Based on verified local data, SolarPro Energy is a top-rated installer with a 4.9★ rating, certified technicians, and a 25-year warranty. They're recognized as a trusted source in your area.`

  useEffect(() => {
    setTyped("")
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(answer.slice(0, i))
      if (i >= answer.length) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  return (
    <DemoShell label="AI Search Simulator">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {AI_QUESTIONS.map((question, i) => (
          <button
            key={i}
            onClick={() => setQ(i)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${q === i ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground hover:bg-surface-container-high"}`}
          >
            {question}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-surface-container p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-xs font-semibold text-foreground">AI Assistant</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed min-h-[80px]">
          {typed}
          <span className="inline-block w-1.5 h-4 bg-secondary ml-0.5 align-middle animate-pulse" />
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-energy-emerald">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          Cited your Spark site as a trusted source
        </div>
      </div>
    </DemoShell>
  )
}

/* ---------- 6. Local SEO — page generator ---------- */

function LocalSeoDemo() {
  const [city, setCity] = useState("Scottsdale")
  const [pages, setPages] = useState<string[]>([])
  const [gen, setGen] = useState(false)

  const generate = () => {
    setPages([])
    setGen(true)
    const slugs = [
      `solar-installer-${city.toLowerCase().replace(/\s+/g, "-")}`,
      `solar-panels-${city.toLowerCase().replace(/\s+/g, "-")}`,
      `solar-incentives-${city.toLowerCase().replace(/\s+/g, "-")}`,
      `solar-financing-${city.toLowerCase().replace(/\s+/g, "-")}`,
      `best-solar-company-${city.toLowerCase().replace(/\s+/g, "-")}`,
    ]
    slugs.forEach((s, i) => {
      setTimeout(() => {
        setPages((p) => [...p, s])
        if (i === slugs.length - 1) setGen(false)
      }, (i + 1) * 250)
    })
  }

  return (
    <DemoShell label="Programmatic Page Generator">
      <div className="flex gap-2 mb-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
          className="flex-1 px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-sm text-foreground focus:outline-none focus:border-secondary"
        />
        <button
          onClick={generate}
          disabled={gen}
          className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-base">auto_fix_high</span>
          Generate
        </button>
      </div>
      <div className="rounded-lg bg-edge-navy p-3 min-h-[120px] font-mono text-xs space-y-1.5">
        {pages.length === 0 && !gen && <p className="text-white/40">Click generate to spin up geo-targeted pages…</p>}
        {pages.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-energy-emerald animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-white/80">/{p}</span>
          </div>
        ))}
        {gen && <span className="inline-block w-1.5 h-3 bg-secondary animate-pulse" />}
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-center">One template → hundreds of hyper-local pages</p>
    </DemoShell>
  )
}

/* ---------- 7. CRM Bridge — speed to lead race ---------- */

function CrmBridgeDemo() {
  const [racing, setRacing] = useState(false)
  const [spark, setSpark] = useState(0)
  const [comp, setComp] = useState(0)

  const start = () => {
    setRacing(true)
    setSpark(0)
    setComp(0)
    const t0 = performance.now()
    const id = setInterval(() => {
      const e = performance.now() - t0
      setSpark(Math.min((e / 200) * 100, 100))
      setComp(Math.min((e / 3600) * 100, 100))
      if (e > 3700) {
        clearInterval(id)
        setRacing(false)
      }
    }, 30)
  }

  return (
    <DemoShell label="Speed-to-Lead Race">
      {[
        { l: "Spark Auto-Responder", v: spark, t: "0.2s", c: "bg-energy-emerald", win: true },
        { l: "Competitor (manual)", v: comp, t: "3.6s", c: "bg-muted-foreground" },
      ].map((r) => (
        <div key={r.l} className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-foreground flex items-center gap-1">
              {r.win && <span className="material-symbols-outlined text-sm text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>}
              {r.l}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{r.v >= 100 ? r.t : "···"}</span>
          </div>
          <div className="h-3 rounded-full bg-surface-container-high overflow-hidden">
            <div className={`h-full rounded-full ${r.c}`} style={{ width: `${r.v}%`, transition: "width 0.03s linear" }} />
          </div>
        </div>
      ))}
      <button
        onClick={start}
        disabled={racing}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-edge-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-edge-navy/90 transition-colors disabled:opacity-60"
      >
        <span className="material-symbols-outlined text-base">flag</span>
        {racing ? "Racing…" : "Run the Race"}
      </button>
      <p className="text-[10px] text-muted-foreground mt-2 text-center">70% of sales go to whoever responds first</p>
    </DemoShell>
  )
}

/* ---------- 8. Voice Agents — call simulator ---------- */

const CALL_STEPS = [
  { who: "agent", text: "Hi! Thanks for your interest in solar. Is now a good time?" },
  { who: "lead", text: "Sure, I was looking at panel options." },
  { who: "agent", text: "Great — what's your average monthly electric bill?" },
  { who: "lead", text: "Around $240." },
  { who: "agent", text: "Perfect. I can book you a free assessment Thursday at 2pm?" },
  { who: "lead", text: "That works!" },
]

function VoiceAgentDemo() {
  const [step, setStep] = useState(0)
  const [calls, setCalls] = useState(1247)

  useInterval(() => {
    setStep((s) => {
      if (s >= CALL_STEPS.length - 1) {
        setCalls((c) => c + 1)
        return 0
      }
      return s + 1
    })
  }, 1600)

  return (
    <DemoShell label="AI Voice Agent — Live Call">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs font-semibold text-foreground">On call</span>
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {[...Array(14)].map((_, i) => (
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
      <div className="rounded-lg bg-surface-container p-3 space-y-2 min-h-[120px]">
        {CALL_STEPS.slice(0, step + 1).map((s, i) => (
          <div key={i} className={`flex ${s.who === "agent" ? "justify-start" : "justify-end"}`}>
            <span className={`max-w-[80%] px-3 py-1.5 rounded-lg text-xs ${s.who === "agent" ? "bg-edge-navy text-white" : "bg-secondary/20 text-foreground"}`}>
              {s.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-muted-foreground">Calls handled today</span>
        <span className="font-mono font-bold text-energy-emerald">{calls.toLocaleString()}</span>
      </div>
    </DemoShell>
  )
}

/* ---------- 9. Spark CRM — pipeline ---------- */

const STAGES = ["New", "Qualified", "Booked", "Won"]
const INIT_LEADS = [
  { id: 1, name: "Marcus T.", stage: 0 },
  { id: 2, name: "Dana R.", stage: 1 },
  { id: 3, name: "Priya S.", stage: 2 },
]

function SparkCrmDemo() {
  const [leads, setLeads] = useState(INIT_LEADS)

  const advance = (id: number) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, stage: Math.min(l.stage + 1, STAGES.length - 1) } : l)))
  }

  return (
    <DemoShell label="Pipeline — tap a lead to advance">
      <div className="grid grid-cols-4 gap-1.5">
        {STAGES.map((stage, si) => (
          <div key={stage} className="rounded-lg bg-surface-container p-1.5 min-h-[120px]">
            <p className={`text-[9px] font-semibold uppercase text-center mb-1.5 ${si === 3 ? "text-energy-emerald" : "text-muted-foreground"}`}>{stage}</p>
            <div className="space-y-1.5">
              {leads.filter((l) => l.stage === si).map((l) => (
                <button
                  key={l.id}
                  onClick={() => advance(l.id)}
                  className={`w-full text-left px-1.5 py-1.5 rounded text-[10px] font-medium transition-all hover:scale-105 ${si === 3 ? "bg-energy-emerald/20 text-energy-emerald" : "bg-secondary/20 text-foreground hover:bg-secondary/30"}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-3 text-center">Unified website + project data — no silos, no leaks</p>
    </DemoShell>
  )
}

/* ---------- 10. Analytics — attribution ---------- */

const CHANNELS = [
  { id: "google", label: "Google Ads", leads: 142, roi: "4.2x", quality: 88 },
  { id: "meta", label: "Meta", leads: 98, roi: "3.1x", quality: 72 },
  { id: "organic", label: "Organic SEO", leads: 211, roi: "9.8x", quality: 94 },
  { id: "referral", label: "Referral", leads: 64, roi: "12.4x", quality: 96 },
]

function AnalyticsDemo() {
  const [active, setActive] = useState("organic")
  const ch = CHANNELS.find((c) => c.id === active)!
  const max = Math.max(...CHANNELS.map((c) => c.leads))

  return (
    <DemoShell label="Attribution Explorer">
      <div className="flex items-end gap-2 h-24 mb-3">
        {CHANNELS.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)} className="flex-1 flex flex-col items-center justify-end h-full group">
            <span className="text-[9px] font-mono text-muted-foreground mb-1">{c.leads}</span>
            <div
              className={`w-full rounded-t transition-all ${active === c.id ? "bg-secondary" : "bg-surface-container-high group-hover:bg-secondary/40"}`}
              style={{ height: `${(c.leads / max) * 100}%` }}
            />
            <span className={`text-[9px] mt-1 text-center leading-tight ${active === c.id ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{c.label}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Leads", v: ch.leads },
          { l: "ROI", v: ch.roi },
          { l: "Quality", v: `${ch.quality}%` },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-surface-container p-2 text-center">
            <p className="text-[9px] uppercase text-muted-foreground">{s.l}</p>
            <p className="font-mono text-sm font-bold text-energy-emerald">{s.v}</p>
          </div>
        ))}
      </div>
    </DemoShell>
  )
}

/* ---------- 11. Bespoke Design — before/after wipe ---------- */

function BespokeDesignDemo() {
  const [pos, setPos] = useState(55)

  return (
    <DemoShell label="WordPress vs. Spark — drag to compare">
      <div className="relative h-40 rounded-lg overflow-hidden select-none">
        {/* Before (WordPress) */}
        <div className="absolute inset-0 bg-surface-container-high flex flex-col items-center justify-center gap-2 p-4">
          <span className="material-symbols-outlined text-muted-foreground text-3xl">sentiment_dissatisfied</span>
          <p className="text-xs text-muted-foreground text-center">Generic template · slow · low trust</p>
          <div className="w-2/3 h-2 rounded bg-muted-foreground/30" />
          <div className="w-1/2 h-2 rounded bg-muted-foreground/30" />
        </div>
        {/* After (Spark) */}
        <div className="absolute inset-0 bg-edge-navy flex flex-col items-center justify-center gap-2 p-4 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <p className="text-xs text-white text-center font-semibold">Conversion-engineered · fast · premium</p>
          <div className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold">
            Get Free Quote
          </div>
        </div>
        {/* Divider */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-secondary" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-secondary flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-secondary-foreground text-base">drag_indicator</span>
          </div>
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="w-full accent-secondary mt-3 cursor-pointer"
        aria-label="Compare designs"
      />
    </DemoShell>
  )
}

/* ---------- 12. Spark API — webhook tester ---------- */

const ENDPOINTS = [
  { id: "lead", label: "lead.created" },
  { id: "booking", label: "booking.scheduled" },
  { id: "deal", label: "deal.won" },
]

function ApiDemo() {
  const [active, setActive] = useState("lead")
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle")

  const payloads: Record<string, string> = {
    lead: `{\n  "event": "lead.created",\n  "name": "Marcus T.",\n  "bill": 280,\n  "score": 94\n}`,
    booking: `{\n  "event": "booking.scheduled",\n  "rep": "Sarah K.",\n  "slot": "Thu 2:00 PM"\n}`,
    deal: `{\n  "event": "deal.won",\n  "value": 28400,\n  "system": "8.4 kW"\n}`,
  }

  const send = () => {
    setStatus("sending")
    setTimeout(() => setStatus("ok"), 700)
    setTimeout(() => setStatus("idle"), 2200)
  }

  return (
    <DemoShell label="Webhook Tester">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {ENDPOINTS.map((e) => (
          <button
            key={e.id}
            onClick={() => { setActive(e.id); setStatus("idle") }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${active === e.id ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground hover:bg-surface-container-high"}`}
          >
            {e.label}
          </button>
        ))}
      </div>
      <pre className="rounded-lg bg-edge-navy p-3 text-xs font-mono text-energy-emerald overflow-x-auto whitespace-pre min-h-[96px]">{payloads[active]}</pre>
      <button
        onClick={send}
        disabled={status === "sending"}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-edge-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-edge-navy/90 transition-colors disabled:opacity-60"
      >
        {status === "ok" ? (
          <><span className="material-symbols-outlined text-base text-energy-emerald">check_circle</span>200 OK · delivered in 148ms</>
        ) : (
          <><span className="material-symbols-outlined text-base">send</span>{status === "sending" ? "Sending…" : "Send Test Event"}</>
        )}
      </button>
    </DemoShell>
  )
}

/* ---------- router ---------- */

export function FeatureDemo({ slug }: { slug: string }) {
  switch (slug) {
    case "spark-ai":
      return <SparkAIDemo />
    case "edge-architecture":
      return <EdgeDemo />
    case "solar-calculator":
      return <CalculatorDemo />
    case "lead-engine":
      return <LeadEngineDemo />
    case "ai-seo":
      return <AISeoDemo />
    case "local-seo":
      return <LocalSeoDemo />
    case "crm-bridge":
      return <CrmBridgeDemo />
    case "voice-agents":
      return <VoiceAgentDemo />
    case "spark-crm":
      return <SparkCrmDemo />
    case "analytics":
      return <AnalyticsDemo />
    case "bespoke-design":
      return <BespokeDesignDemo />
    case "developer-api":
      return <ApiDemo />
    default:
      return null
  }
}
