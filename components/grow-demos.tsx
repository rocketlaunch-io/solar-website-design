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

/* ---------- 1. Content Design — headline A/B generator ---------- */

const HEADLINES = [
  { text: "Cut Your Power Bill to $0 This Year", ctr: 9.4 },
  { text: "Phoenix Homeowners Are Going Solar — Here's Why", ctr: 7.1 },
  { text: "See Your Solar Savings in 60 Seconds", ctr: 11.2 },
  { text: "The 2026 Solar Incentive Ends Soon", ctr: 8.5 },
]

function ContentDesignDemo() {
  const [idx, setIdx] = useState(0)
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    setTimeout(() => {
      setIdx((i) => (i + 1) % HEADLINES.length)
      setGenerating(false)
    }, 600)
  }

  const h = HEADLINES[idx]
  return (
    <DemoShell label="Headline Generator">
      <div className="rounded-lg bg-surface-container p-4 mb-3 min-h-[72px] flex items-center">
        <p className={`font-heading text-lg font-bold text-foreground transition-opacity duration-200 ${generating ? "opacity-30" : "opacity-100"}`}>
          {generating ? "Generating high-conversion copy…" : `"${h.text}"`}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Predicted CTR</span>
          <span className="font-mono text-sm font-bold text-energy-emerald">{generating ? "—" : `${h.ctr}%`}</span>
        </div>
        <button
          onClick={generate}
          className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-solar-amber-bright transition-colors"
        >
          <span className="material-symbols-outlined text-sm">autorenew</span>
          Generate Variant
        </button>
      </div>
    </DemoShell>
  )
}

/* ---------- 2. Paid & Digital Advertising — spend optimizer ---------- */

function PaidAdsDemo() {
  const [optimized, setOptimized] = useState(false)
  const wasted = optimized ? 12 : 42
  const conv = optimized ? 5.1 : 3.7
  const cpl = optimized ? 18 : 31
  return (
    <DemoShell label="AI Spend Optimizer">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Wasted Spend", val: `${wasted}%`, good: optimized, down: true },
          { label: "Conversion", val: `${conv}%`, good: optimized, down: false },
          { label: "Cost / Lead", val: `$${cpl}`, good: optimized, down: true },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-surface-container p-3 text-center">
            <p className="text-[10px] uppercase text-muted-foreground mb-1">{m.label}</p>
            <p className={`font-mono text-lg font-bold transition-colors ${m.good ? "text-energy-emerald" : "text-foreground"}`}>{m.val}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setOptimized((v) => !v)}
        className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-3 py-2.5 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">{optimized ? "restart_alt" : "bolt"}</span>
        {optimized ? "Reset Campaign" : "Run AI Optimization"}
      </button>
    </DemoShell>
  )
}

/* ---------- 3. Multi-Platform Advertising — channel toggles ---------- */

const CHANNELS = [
  { name: "Google Search", icon: "search", reach: 38 },
  { name: "Meta / Facebook", icon: "thumb_up", reach: 31 },
  { name: "YouTube", icon: "play_circle", reach: 19 },
  { name: "Instagram", icon: "photo_camera", reach: 12 },
]

function MultiPlatformDemo() {
  const [active, setActive] = useState<Record<string, boolean>>({ "Google Search": true, "Meta / Facebook": true })
  const total = CHANNELS.reduce((sum, c) => (active[c.name] ? sum + c.reach : sum), 0)
  return (
    <DemoShell label="Channel Reach Mixer">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {CHANNELS.map((c) => (
          <button
            key={c.name}
            onClick={() => setActive((a) => ({ ...a, [c.name]: !a[c.name] }))}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-all ${
              active[c.name]
                ? "bg-secondary/10 border-secondary/60 text-foreground"
                : "bg-surface-container border-outline-variant/40 text-muted-foreground"
            }`}
          >
            <span className="material-symbols-outlined text-base text-secondary">{c.icon}</span>
            {c.name}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-edge-navy p-3 text-center">
        <p className="text-[10px] uppercase text-white/50 mb-0.5">Combined Market Reach</p>
        <p className="font-mono text-2xl font-bold text-secondary">{total}%</p>
      </div>
    </DemoShell>
  )
}

/* ---------- 4. Digital Creative — variation factory ---------- */

function DigitalCreativeDemo() {
  const [count, setCount] = useState(3)
  const tiles = Array.from({ length: count })
  return (
    <DemoShell label="Creative Variation Factory">
      <div className="grid grid-cols-4 gap-2 mb-4 min-h-[88px]">
        {tiles.map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 border border-outline-variant/40 flex items-center justify-center animate-in fade-in zoom-in-95 duration-300"
          >
            <span className="material-symbols-outlined text-secondary text-lg">image</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{count} ad variations ready</span>
        <button
          onClick={() => setCount((c) => (c >= 8 ? 3 : c + 1))}
          className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-solar-amber-bright transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Generate More
        </button>
      </div>
    </DemoShell>
  )
}

/* ---------- 5. Email Automation — flow builder ---------- */

const EMAIL_STEPS = [
  { day: "Day 0", subject: "Your solar savings estimate is ready", open: 64 },
  { day: "Day 2", subject: "Still thinking it over? See real installs", open: 48 },
  { day: "Day 5", subject: "The 2026 incentive deadline is near", open: 41 },
  { day: "Day 9", subject: "Lock in your rate before prices rise", open: 38 },
]

function EmailAutomationDemo() {
  const [step, setStep] = useState(0)
  useInterval(() => setStep((s) => (s + 1) % (EMAIL_STEPS.length + 1)), 1600)
  return (
    <DemoShell label="Nurture Flow Builder">
      <div className="flex flex-col gap-2">
        {EMAIL_STEPS.map((e, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-500 ${
              i < step ? "bg-energy-emerald/10 border-energy-emerald/40" : "bg-surface-container border-outline-variant/40 opacity-50"
            }`}
          >
            <span className={`material-symbols-outlined text-base ${i < step ? "text-energy-emerald" : "text-muted-foreground"}`}>
              {i < step ? "mark_email_read" : "schedule"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase text-muted-foreground">{e.day}</p>
              <p className="text-xs font-medium text-foreground truncate">{e.subject}</p>
            </div>
            <span className="font-mono text-xs text-secondary">{i < step ? `${e.open}%` : "—"}</span>
          </div>
        ))}
      </div>
    </DemoShell>
  )
}

/* ---------- 6. CRO — A/B test bars ---------- */

function CroDemo() {
  const [variant, setVariant] = useState<"a" | "b">("a")
  const a = 3.2
  const b = 5.8
  return (
    <DemoShell label="A/B Test Lab">
      <div className="flex flex-col gap-3 mb-4">
        {[
          { key: "a", label: "Variant A (Control)", rate: a },
          { key: "b", label: "Variant B (Spark)", rate: b },
        ].map((v) => (
          <button
            key={v.key}
            onClick={() => setVariant(v.key as "a" | "b")}
            className={`text-left rounded-lg p-3 border transition-all ${
              variant === v.key ? "border-secondary/60 bg-secondary/5" : "border-outline-variant/40 bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-foreground">{v.label}</span>
              <span className="font-mono text-xs font-bold text-foreground">{v.rate}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${v.key === "b" ? "bg-energy-emerald" : "bg-muted-foreground"}`}
                style={{ width: `${(v.rate / 6) * 100}%` }}
              />
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-energy-emerald font-semibold">
        Variant B wins: +{Math.round(((b - a) / a) * 100)}% conversion lift
      </p>
    </DemoShell>
  )
}

/* ---------- 7. Analytics & Reporting — LTV predictor ---------- */

function AnalyticsReportingDemo() {
  const [months, setMonths] = useState(36)
  const monthly = 142
  const ltv = Math.round(monthly * months * 0.92)
  return (
    <DemoShell label="Lifetime Value Predictor">
      <div className="text-center mb-4">
        <p className="text-[10px] uppercase text-muted-foreground mb-1">Predicted Customer LTV</p>
        <p className="font-mono text-3xl font-bold text-secondary">${ltv.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground whitespace-nowrap">{months} mo</span>
        <input
          type="range"
          min={12}
          max={120}
          step={6}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="flex-1 accent-secondary"
          aria-label="Customer retention months"
        />
      </div>
      <p className="text-center text-[11px] text-muted-foreground mt-2">Drag to model retention horizon</p>
    </DemoShell>
  )
}

/* ---------- 8. Creative Services — asset switcher ---------- */

const ASSETS = [
  { name: "Door Hanger", icon: "door_front", color: "from-secondary/20" },
  { name: "Sales Flyer", icon: "description", color: "from-primary/20" },
  { name: "Direct Mail", icon: "mail", color: "from-energy-emerald/20" },
  { name: "Social Ad", icon: "ad_units", color: "from-secondary/20" },
]

function CreativeServicesDemo() {
  const [idx, setIdx] = useState(0)
  const a = ASSETS[idx]
  return (
    <DemoShell label="Asset Studio">
      <div className="flex items-center gap-4">
        <div className={`w-24 h-32 rounded-lg bg-gradient-to-b ${a.color} to-surface-container border border-outline-variant/40 flex items-center justify-center flex-shrink-0`}>
          <span className="material-symbols-outlined text-secondary text-4xl">{a.icon}</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase text-muted-foreground mb-0.5">Now Previewing</p>
          <p className="font-heading text-lg font-bold text-foreground mb-3">{a.name}</p>
          <div className="flex flex-wrap gap-1.5">
            {ASSETS.map((asset, i) => (
              <button
                key={asset.name}
                onClick={() => setIdx(i)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  i === idx ? "bg-secondary text-secondary-foreground" : "bg-surface-container text-muted-foreground hover:text-foreground"
                }`}
              >
                {asset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  )
}

/* ---------- 9. Social Media — engagement ticker ---------- */

function SocialMediaDemo() {
  const [likes, setLikes] = useState(128)
  const [liked, setLiked] = useState(false)
  return (
    <DemoShell label="Live Engagement">
      <div className="rounded-lg bg-surface-container overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary text-3xl">solar_power</span>
        </div>
        <div className="p-3">
          <p className="text-xs font-medium text-foreground mb-2">New 12kW install in Scottsdale ☀️</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setLiked((l) => !l)
                setLikes((n) => (liked ? n - 1 : n + 1))
              }}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? "text-destructive" : "text-muted-foreground"}`}
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
              {likes}
            </button>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="material-symbols-outlined text-base">chat_bubble</span>24
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="material-symbols-outlined text-base">share</span>18
            </span>
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-muted-foreground mt-2">Tap to engage — social proof in action</p>
    </DemoShell>
  )
}

/* ---------- 10. Advanced AI — automation pipeline ---------- */

const AI_TASKS = ["Analyzing audience", "Generating creative", "Writing ad copy", "Optimizing bids", "Publishing campaign"]

function AdvancedAiDemo() {
  const [active, setActive] = useState(0)
  useInterval(() => setActive((a) => (a + 1) % (AI_TASKS.length + 1)), 1100)
  return (
    <DemoShell label="Spark AI Pipeline">
      <div className="flex flex-col gap-2">
        {AI_TASKS.map((t, i) => {
          const done = i < active
          const running = i === active
          return (
            <div key={t} className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-base ${done ? "text-energy-emerald" : running ? "text-secondary animate-spin" : "text-muted-foreground"}`}
              >
                {done ? "check_circle" : running ? "progress_activity" : "radio_button_unchecked"}
              </span>
              <span className={`text-xs ${done || running ? "text-foreground font-medium" : "text-muted-foreground"}`}>{t}</span>
            </div>
          )
        })}
      </div>
    </DemoShell>
  )
}

/* ---------- 11. Video Production — timeline scrubber ---------- */

function VideoProductionDemo() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  useInterval(
    () => setProgress((p) => (p >= 100 ? 0 : p + 2)),
    playing ? 60 : null
  )
  const scenes = ["Drone intro", "Install b-roll", "Testimonial", "CTA"]
  const activeScene = Math.min(Math.floor(progress / 25), 3)
  return (
    <DemoShell label="Video Timeline">
      <div className="rounded-lg bg-edge-navy aspect-video flex items-center justify-center mb-3 relative overflow-hidden">
        <span className="material-symbols-outlined text-secondary text-4xl">{playing ? "movie" : "play_circle"}</span>
        <span className="absolute bottom-2 left-3 text-[11px] text-white/70 font-medium">{scenes[activeScene]}</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="material-symbols-outlined text-secondary text-2xl"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "pause_circle" : "play_circle"}
        </button>
        <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
          <div className="h-full bg-secondary rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {scenes.map((s, i) => (
          <span key={s} className={`text-[9px] text-center ${i === activeScene ? "text-secondary font-semibold" : "text-muted-foreground"}`}>{s}</span>
        ))}
      </div>
    </DemoShell>
  )
}

/* ---------- 12. Sales Enablement — interactive deck ---------- */

const SLIDES = [
  { title: "The Problem", body: "Rising utility rates are draining homeowner budgets." },
  { title: "Your Savings", body: "$48,200 saved over 25 years with solar." },
  { title: "The System", body: "Premium panels, 25-year warranty, $0 down." },
  { title: "Next Steps", body: "Lock in 2026 incentives before they expire." },
]

function SalesEnablementDemo() {
  const [slide, setSlide] = useState(0)
  const s = SLIDES[slide]
  return (
    <DemoShell label="Interactive Pitch Deck">
      <div className="rounded-lg bg-edge-navy p-5 mb-3 min-h-[112px]">
        <p className="text-[10px] uppercase text-secondary font-semibold mb-1">Slide {slide + 1} / {SLIDES.length}</p>
        <p className="font-heading text-lg font-bold text-white mb-1.5">{s.title}</p>
        <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSlide((n) => Math.max(0, n - 1))}
          disabled={slide === 0}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground disabled:opacity-40 hover:text-foreground transition-colors"
        >
          <span className="material-symbols-outlined text-base">chevron_left</span>Prev
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === slide ? "bg-secondary" : "bg-outline-variant"}`} />
          ))}
        </div>
        <button
          onClick={() => setSlide((n) => Math.min(SLIDES.length - 1, n + 1))}
          disabled={slide === SLIDES.length - 1}
          className="inline-flex items-center gap-1 text-xs font-medium text-secondary disabled:opacity-40 hover:text-solar-amber-bright transition-colors"
        >
          Next<span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>
    </DemoShell>
  )
}

/* ---------- dispatcher ---------- */

export function GrowDemo({ slug }: { slug: string }) {
  switch (slug) {
    case "content-design":
      return <ContentDesignDemo />
    case "paid-digital-advertising":
      return <PaidAdsDemo />
    case "multi-platform-advertising":
      return <MultiPlatformDemo />
    case "digital-creative":
      return <DigitalCreativeDemo />
    case "email-automation":
      return <EmailAutomationDemo />
    case "cro":
      return <CroDemo />
    case "analytics-reporting":
      return <AnalyticsReportingDemo />
    case "creative-services":
      return <CreativeServicesDemo />
    case "social-media":
      return <SocialMediaDemo />
    case "advanced-ai":
      return <AdvancedAiDemo />
    case "video-production":
      return <VideoProductionDemo />
    case "sales-enablement":
      return <SalesEnablementDemo />
    default:
      return null
  }
}
