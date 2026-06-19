import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { PricingRoiCalculator } from "@/components/pricing-roi-calculator"
import { PricingCtaButton } from "@/components/pricing-cta-button"

export const metadata: Metadata = {
  title: "Pricing | Spark Website",
  description:
    "ROI-focused, performance-based pricing for a high-performance solar growth platform. Pay a flat platform fee plus a fee per verified lead. No long-term contracts.",
}

const standardPlans = [
  {
    name: "Business",
    architecture: "React 19 Custom Edge Core",
    audience: "Perfect for single-market dealers and installers seeking elite performance.",
    monthly: "$5,000",
    perLead: "$20",
    setup: "$5,000 (One-time)",
    cta: "Deploy Business",
    ctaNote: "Launch a world-class brand in under 7 days.",
    featureHeading: "Core Platform Features",
    features: [
      "Edge Architecture (Sub-second React 19 Core)",
      "Bespoke Design (Conversion-First UI)",
      "Lead Gen Engine (Multi-Step Quote Wizard)",
      "Solar Calculator (Interactive Savings Widget)",
      "CRM Bridge (Salesforce & HubSpot integration)",
      "AI-First SEO (AI Search Agent Optimization)",
    ],
  },
  {
    name: "Scale",
    architecture: "Full Growth Stack Ecosystem",
    audience: "Perfect for high-growth dealers seeking automated scale.",
    monthly: "$10,000",
    perLead: "$15",
    setup: "$10,000 (One-time)",
    popular: true,
    cta: "Ignite Scale",
    ctaNote: "Includes Advanced Spark AI features.",
    featureHeading: "All Business Features, plus",
    features: [
      "Spark AI (Lead Scoring & Property Data Enrichment)",
      "Spark CRM (Lead Ingestion & Scoring Workflows)",
      "Local SEO Engine (Programmatic Geo City Pages)",
      "Performance Analytics (Full-Funnel Attribution)",
      "Voice Agents (24/7 Qualifying AI Callers)",
      "Spark API (Universal Connectivity & Integrations)",
    ],
  },
]

const enterprisePlan = {
  name: "Enterprise Scale",
  architecture: "Unlimited React Architecture",
  audience: "Perfect for multi-state dealers and installers.",
  monthly: "Custom",
  perLead: "$10",
  setup: "Starts at $20,000 (One-time)",
  cta: "Contact for Enterprise",
  ctaNote: "Custom integrations & dedicated SLA.",
  featureHeading: "All Scale Features, plus",
  features: [
    "Full Ecosystem Integration",
    "Multi-State SEO Engine",
    "Custom API Development",
    "Dedicated Growth Engineer",
    "24/7 Critical Response Team",
    "Custom SLA",
  ],
}

const verificationSteps = [
  { 
    id: "01", 
    label: "Address Match", 
    icon: "home_pin",
    desc: "Cross-referenced with property records, parcel boundaries, and LIDAR roof imagery." 
  },
  { 
    id: "02", 
    label: "TCPA Consent", 
    icon: "verified_user",
    desc: "Active digital consent signature with time-stamped visual audit trail for compliance." 
  },
  { 
    id: "03", 
    label: "Utility Bill", 
    icon: "receipt_long",
    desc: "Verified upload or billing integration proving actual energy consumption and usage." 
  },
  { 
    id: "04", 
    label: "Unique (No Dupes)", 
    icon: "fingerprint",
    desc: "Exclusive property mapping ensuring the lead is never sold twice or distributed elsewhere." 
  },
]

const addOns = [
  {
    badge: "AI Native Qualification",
    icon: "forum",
    title: "Spark AI Voice Agents",
    description:
      "Deploy custom outbound/inbound conversational voice AI agents that qualify leads, answer home utility questions, and book sales appointments directly on calendar links with sub-second latency.",
    tag: "Voice Integration",
    pricing: "Custom Usage-Based"
  },
  {
    badge: "Local Domination",
    icon: "insights",
    title: "Programmatic SEO Engines",
    description:
      "Dominate localized search intent across thousands of cities and ZIP codes. Automatically generates lightning-fast landing page variations optimized for high search engine visibility.",
    tag: "Organic Growth",
    pricing: "$1,500/mo base"
  },
]

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 border-b border-outline-variant/20 bg-surface-container-low/30">
          <WebGLShader />
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="material-symbols-outlined text-accent text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Performance-First Pricing</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight text-balance">
                Simple Plans. <span className="text-secondary">Exponential Growth.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Deploy a world-class solar digital ecosystem. Pay a predictable platform fee plus performance fees tied strictly to high-quality, verified leads. No long-term contracts.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="#plans"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-all duration-300 shadow-lg shadow-secondary/30 hover:-translate-y-0.5"
                >
                  View Tiers
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-surface-container transition-all duration-300 border border-outline-variant/50"
                >
                  Talk to an Engineer
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground ml-1">4.9/5 close-rate rating</span>
                </div>
                <div className="h-4 w-px bg-outline-variant/50" />
                <span className="text-sm text-muted-foreground">Trusted by 500+ installers</span>
              </div>
            </div>

            {/* Interactive ROI Calculator */}
            <PricingRoiCalculator />
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">Scale Your Revenue</span>
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Flexible Plans Engineered to Scale
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Predictable baseline pricing engineered to align with your sales volume. As your volume scales, your per-lead costs decrease.
            </p>
          </div>

          {/* 2 Tiers Standard Grid */}
          <div className="mt-16 grid items-stretch gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {standardPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border-2 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular 
                    ? "border-accent bg-gradient-to-b from-card via-card to-accent/5 shadow-xl ring-4 ring-accent/10" 
                    : "border-border bg-card shadow-sm hover:border-muted-foreground/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-accent-foreground shadow-md animate-pulse">
                    Most Popular
                  </span>
                )}

                <div className="space-y-1">
                  <h3 className="font-heading text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent/90">{plan.architecture}</p>
                </div>
                
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground min-h-[40px]">{plan.audience}</p>

                <div className="mt-6 border-t border-border/80 pt-6 space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-5xl font-black text-foreground tracking-tight">{plan.monthly}</span>
                    <span className="text-sm font-medium text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-energy-emerald" />
                    <p className="text-sm font-semibold text-foreground">
                      + {plan.perLead} <span className="font-normal text-muted-foreground">per Verified Lead</span>
                    </p>
                  </div>
                  
                  {/* Onboarding & Setup Tooltip */}
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                    <span>One-time setup fee applies</span>
                    <div className="relative group/tooltip inline-flex cursor-help">
                      <span className="material-symbols-outlined text-[15px] text-muted-foreground/60 hover:text-foreground transition-colors">info</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-xs rounded-xl py-2 px-3.5 shadow-xl border border-border w-52 z-50 text-center font-normal leading-normal">
                        <span className="font-bold text-foreground">Setup &amp; Onboarding</span>
                        <div className="mt-1 text-accent font-semibold">{plan.setup}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/80 pt-6 flex-grow">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    {plan.featureHeading}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((f) => {
                      const match = f.match(/^(.*?)\s*\((.*?)\)$/)
                      if (match) {
                        const name = match[1]
                        const desc = match[2]
                        return (
                          <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                            <span className="material-symbols-outlined mt-0.5 text-base text-energy-emerald">
                              check_circle
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <span>{name}</span>
                              <div className="relative group/tooltip inline-flex cursor-help">
                                <span className="material-symbols-outlined text-[14px] text-muted-foreground/60 hover:text-foreground transition-colors">info</span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-xs rounded-xl py-2 px-3.5 shadow-xl border border-border w-52 z-50 text-center font-normal leading-normal">
                                  <span className="text-foreground leading-normal">{desc}</span>
                                </div>
                              </div>
                            </span>
                          </li>
                        )
                      }
                      return (
                        <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="material-symbols-outlined mt-0.5 text-base text-energy-emerald">
                            check_circle
                          </span>
                          <span>{f}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <PricingCtaButton
                    planName={plan.name as 'Business' | 'Scale'}
                    className={
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/95 shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/20 rounded-xl py-3.5 text-center text-sm font-bold tracking-wide"
                        : "border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground rounded-xl py-3.5 text-center text-sm font-bold tracking-wide"
                    }
                  >
                    {plan.cta}
                  </PricingCtaButton>
                  <p className="mt-3 text-center text-[10px] tracking-wide text-muted-foreground">{plan.ctaNote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Lower Tier Grid: Guarantee & Enterprise */}
          <div className="mt-12 grid items-stretch gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Pay-For-Performance Guarantee Card */}
            <div className="flex flex-col rounded-3xl border border-border bg-gradient-to-br from-card via-card to-energy-emerald/5 p-8 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-energy-emerald/10 text-energy-emerald">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-energy-emerald">Performance Assured</span>
              </div>
              
              <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">Pay-For-Performance Guarantee</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-grow">
                Zero payment for invalid details, bots, spam, or out-of-market submissions. We verify every single lead in real-time through our proprietary 4-point protocol. You only pay for real, qualified homeowners who pass the checks.
              </p>
              
              <div className="mt-6 border-t border-border pt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-energy-emerald">check</span>
                  Real-time validation
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-energy-emerald">check</span>
                  Zero waste ad-spend
                </span>
              </div>
            </div>

            {/* Enterprise Scale Card */}
            <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">{enterprisePlan.architecture}</span>
                <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Bespoke Pack
                </span>
              </div>
              
              <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">{enterprisePlan.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{enterprisePlan.audience}</p>
              
              <div className="mt-5 border-t border-border pt-5 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-bold text-foreground">Custom</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
                <p className="text-xs font-semibold text-foreground">
                  + {enterprisePlan.perLead} <span className="font-normal text-muted-foreground">per Verified Lead</span>
                </p>
                
                {/* Enterprise Tooltip */}
                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span>Setup setup costs apply</span>
                  <div className="relative group/tooltip inline-flex cursor-help">
                    <span className="material-symbols-outlined text-[13px] text-muted-foreground/60 hover:text-foreground">info</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-xs rounded-xl py-2 px-3 shadow-lg border border-border w-52 z-50 text-center font-normal leading-normal">
                      <span className="font-bold text-foreground">Setup &amp; Onboarding</span>
                      <div className="mt-1 text-accent font-semibold">{enterprisePlan.setup}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-6 flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  {enterprisePlan.featureHeading}
                </p>
                <ul className="mt-3 space-y-2">
                  {enterprisePlan.features.slice(0, 3).map((f) => {
                    const match = f.match(/^(.*?)\s*\((.*?)\)$/)
                    if (match) {
                      const name = match[1]
                      const desc = match[2]
                      return (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-foreground">
                          <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
                          <span className="inline-flex items-center gap-1.5">
                            <span>{name}</span>
                            <div className="relative group/tooltip inline-flex cursor-help">
                              <span className="material-symbols-outlined text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors">info</span>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-xs rounded-xl py-2 px-3 shadow-xl border border-border w-52 z-50 text-center font-normal leading-normal">
                                <span className="text-foreground leading-normal">{desc}</span>
                              </div>
                            </div>
                          </span>
                        </li>
                      )
                    }
                    return (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-foreground">
                        <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
                        <span>{f}</span>
                      </li>
                    )
                  })}
                  <li className="text-xs text-muted-foreground italic pl-6">And more custom platform integrations...</li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/contact"
                  className="block rounded-xl py-3 text-center text-sm font-bold border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                >
                  {enterprisePlan.cta}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-solar-amber/30 bg-edge-navy text-white shadow-2xl shadow-primary/10">
            <div className="grid gap-8 p-8 md:grid-cols-[1.15fr_0.85fr] md:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-solar-amber text-edge-navy">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-solar-amber-bright">
                    Startup & Early-Stage Program
                  </p>
                </div>

                <h3 className="mt-5 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                  Spark Solar Accelerator Program
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Early-stage solar teams can apply for discounted access to the entire Spark platform, including the website engine, lead systems, AI tooling, CRM workflows, analytics, and launch support.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {["Full platform access", "Discounted partner rate", "Application required"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80">
                      <span className="material-symbols-outlined text-sm text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/45">Best Fit</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    New and growing solar companies with a defined market, active sales motion, and the ambition to scale without rebuilding their digital foundation later.
                  </p>
                </div>

                <Link
                  href="/accelerator"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3.5 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all duration-200 hover:bg-solar-amber-bright hover:-translate-y-0.5"
                >
                  Apply to the Program
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Lead Protocol */}
        <section className="border-y border-border bg-gradient-to-b from-card to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="mx-auto max-w-5xl px-6 py-24 relative z-10">
            <div className="mx-auto max-w-2xl text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">The Spark Guarantee</span>
              <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                What is a &ldquo;Verified Lead&rdquo;?
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Aggregators sell recycled, multi-distributed contacts. Spark leads are generated exclusively on your private branded architecture. You pay the performance fee only when a lead clears our 4-point protocol.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {verificationSteps.map((step) => (
                <div key={step.id} className="relative group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-muted-foreground/60 group-hover:text-accent transition-colors duration-300">
                      Step {step.id}
                    </span>
                  </div>
                  <h4 className="mt-6 font-heading text-lg font-bold text-foreground">{step.label}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Platform Add-ons */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">Optional Add-Ons</span>
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Supercharge Your Growth Platform
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Integrate performance modules seamlessly into your core architecture to scale conversion rates and search authority.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {addOns.map((addon) => (
              <div key={addon.title} className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <span className="material-symbols-outlined text-2xl">{addon.icon}</span>
                  </span>
                  <span className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {addon.badge}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">{addon.title}</h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">{addon.description}</p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-energy-emerald">bolt</span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                      {addon.tag}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-accent bg-accent/5 px-2.5 py-1 rounded-lg">{addon.pricing}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="relative overflow-hidden bg-primary py-24 text-center">
          {/* Subtle overlay decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,rgba(255,143,0,0.12),transparent)]" />
          
          <div className="mx-auto max-w-4xl px-6 relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-solar-amber/20 bg-solar-amber/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-solar-amber-bright">
              <span className="material-symbols-outlined text-sm">lan</span>
              Bespoke Solutions
            </span>
            <h2 className="text-balance font-heading text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
              Scale Without Infrastructure Limits
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              For multi-state enterprises requiring complex integrations (Salesforce, HubSpot, custom ERPs), high-volume lead pipelines, and enterprise-grade uptime commitments.
            </p>
            
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/15 transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Consult Our Growth Engineers
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Schedule a Demo Platform Tour
              </Link>
            </div>
            
            <div className="pt-8 flex justify-center gap-8 text-[11px] font-medium tracking-wider text-primary-foreground/50 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
                Dedicated SLA Agreements
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
                Custom Integrations
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-energy-emerald">check_circle</span>
                24/7 Dedicated Support
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
