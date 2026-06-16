import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | Spark Website",
  description:
    "ROI-focused, performance-based pricing for a high-performance solar growth platform. Pay a flat platform fee plus a fee per verified lead. No long-term contracts.",
}

const plans = [
  {
    name: "Foundation",
    architecture: "Custom 5-Page React Architecture",
    audience: "Perfect for single-market dealers and installers.",
    monthly: "$1,000",
    perLead: "$20",
    setup: "$5,000 (One-time)",
    popular: false,
    cta: "Deploy Foundation",
    ctaNote: "Launch a world-class brand in under 7 days.",
    featureHeading: "All Core Features",
    features: [
      "Interactive Multi-Step Lead Capture Forms",
      "Interactive Solar Savings Calculators",
      "AI Search Optimization (Next-Gen SEO)",
      "Seamless CRM Bridge",
      "White-Glove Integration Service",
      "HyperFast Edge Hosting",
      "Core Web Vitals Guarantee",
      "SSL & Security Suite",
      "Weekly Data Backups",
      "Ready for the Spark Solar Ecosystem",
    ],
  },
  {
    name: "Velocity",
    architecture: "10-Page Growth System",
    audience: "Perfect for high-growth dealers and installers.",
    monthly: "$5,000",
    perLead: "$15",
    setup: "$10,000 (One-time)",
    popular: true,
    cta: "Ignite Velocity",
    ctaNote: "Includes Advanced Spark AI features.",
    featureHeading: "All Foundation Features, plus",
    features: [
      "Spark AI Lead Scoring",
      "Spark Data Warehouse Access",
      "Advanced Lead Verification",
      "Priority Growth Support",
    ],
  },
  {
    name: "Enterprise Scale",
    architecture: "Unlimited React Architecture",
    audience: "Perfect for multi-state dealers and installers.",
    monthly: "Custom",
    perLead: "$10",
    setup: "Starts at $20,000 (One-time)",
    popular: false,
    cta: "Contact for Enterprise",
    ctaNote: "Custom integrations & dedicated SLA.",
    featureHeading: "All Velocity Features, plus",
    features: [
      "Full Ecosystem Integration",
      "Multi-State SEO Engine",
      "Custom API Development",
      "Dedicated Growth Engineer",
      "24/7 Critical Response Team",
      "Custom SLA",
    ],
  },
]

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
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-edge-navy-deep to-primary py-20 md:py-32">
          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-solar-amber/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-energy-emerald/15 rounded-full blur-3xl -z-10" />
          
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-solar-amber-bright uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm animate-pulse">payments</span>
                Performance-First Pricing
              </span>
              <h1 className="text-balance font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Simple Plans. <span className="bg-gradient-to-r from-solar-amber-bright to-energy-emerald bg-clip-text text-transparent">Exponential Growth.</span>
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
                Deploy a world-class solar digital ecosystem. Pay a predictable platform fee plus performance fees tied strictly to high-quality, verified leads. No long-term contracts.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                  <span className="material-symbols-outlined text-base text-energy-emerald">check_circle</span>
                  No Long-Term Contracts
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                  <span className="material-symbols-outlined text-base text-energy-emerald">security</span>
                  30-Day Risk-Free Trial
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-6 relative">
              {/* Image Frame with premium mockup styling */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 p-2 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/0 pointer-events-none" />
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/5 text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="text-[10px] font-mono ml-4 tracking-wider text-slate-400/75">spark-growth-platform.io</div>
                </div>
                <Image
                  src="/images/pricing-hero.png"
                  alt="Spark Solar growth investment and pricing ROI analytics dashboard mockup"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-b-xl"
                  priority
                />
              </div>
              {/* Outer decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-solar-amber/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-energy-emerald/20 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">Scale Your Revenue</span>
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              The Architecture of Scale
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Predictable baseline pricing engineered to align with your sales volume. As your volume scales, your per-lead costs decrease.
            </p>
          </div>

          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular 
                    ? "border-accent bg-gradient-to-b from-card to-accent/5 shadow-xl ring-2 ring-accent/20 lg:-mt-4 lg:mb-4" 
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

                <div className="mt-6 border-t border-border/80 pt-6 space-y-3">
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
                </div>

                <div className="mt-6 rounded-2xl bg-muted/60 p-4 border border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-accent">verified</span>
                    <p className="text-xs font-bold text-foreground">Pay-For-Performance Guarantee</p>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    Zero payment for invalid details, bots, or out-of-market submissions. Checked via 4-Point Lead Verification.
                  </p>
                </div>

                <div className="mt-5 text-xs text-muted-foreground flex items-center justify-between">
                  <span className="font-medium text-foreground">Onboarding &amp; Setup:</span>
                  <span className="font-semibold text-foreground">{plan.setup}</span>
                </div>

                <div className="mt-6 border-t border-border/80 pt-6 flex-grow">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    {plan.featureHeading}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="material-symbols-outlined mt-0.5 text-base text-energy-emerald">
                          check_circle
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/contact"
                    className={`block rounded-xl py-3.5 text-center text-sm font-bold tracking-wide transition-all duration-200 ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/95 shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/20"
                        : "border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <p className="mt-3 text-center text-[10px] tracking-wide text-muted-foreground">{plan.ctaNote}</p>
                </div>
              </div>
            ))}
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
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">Optional Extensions</span>
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Supercharge Your Infrastructure
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
