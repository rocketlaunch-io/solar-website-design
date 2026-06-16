import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GrowthSimulator } from "@/components/growth-simulator"
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
  { id: "01", label: "Address Match", icon: "home_pin" },
  { id: "02", label: "TCPA Consent", icon: "verified_user" },
  { id: "03", label: "Utility Bill", icon: "receipt_long" },
  { id: "04", label: "Unique (No Dupes)", icon: "fingerprint" },
]

const addOns = [
  {
    badge: "24/7 Availability",
    icon: "call",
    title: "Spark AI Voice Agents",
    description:
      "Automated voice intelligence for lead qualification and scheduling. Handles inbound calls, outbound nurture, and objection handling with human-like latency.",
    tag: "Voice Activity",
  },
  {
    badge: "Programmatic Scale",
    icon: "travel_explore",
    title: "Solar SEO Lead Engine",
    description:
      "Proprietary programmatic SEO framework built to dominate high-intent solar search terms in your local market. Generates hundreds of geo-targeted landing pages automatically.",
    tag: "#1 Rank",
  },
]

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main>
        {/* Hero + Growth Simulator */}
        <section className="border-b border-border bg-primary">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-solar-amber-bright">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                ROI-Focused Investment
              </span>
              <h1 className="mt-6 text-balance font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
                Simple Pricing. Exponential Growth.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
                Choose the architecture that fits your stage. Upgrade instantly as you dominate new markets. No hidden
                fees, just pure performance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
                  <span className="material-symbols-outlined text-base text-energy-emerald">check_circle</span>
                  No Long-Term Contracts
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80">
                  <span className="material-symbols-outlined text-base text-energy-emerald">shield</span>
                  30-Day Money-Back Guarantee
                </span>
              </div>
            </div>
            <GrowthSimulator />
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Scale Your Revenue</span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The Architecture of Scale
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Simple, transparent pricing designed to align with your growth. As you verify more leads, your cost per
              acquisition drops.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
                  plan.popular ? "border-accent shadow-lg lg:-mt-4 lg:mb-4" : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">{plan.architecture}</p>

                <div className="mt-5 border-t border-border pt-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-foreground">{plan.monthly}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    + {plan.perLead} <span className="font-normal text-muted-foreground">/ Verified Lead</span>
                  </p>
                </div>

                <div className="mt-5 rounded-lg bg-muted p-4">
                  <p className="text-xs font-semibold text-foreground">Pay for Performance</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    We verify every lead through our Spark protocol. You only pay for real homeowners.
                  </p>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Setup &amp; Onboarding:</span> {plan.setup}
                </p>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {plan.featureHeading}
                  </p>
                  <ul className="mt-4 flex-grow space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="material-symbols-outlined mt-0.5 text-base text-energy-emerald">
                          check_circle
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`block rounded-lg py-3 text-center text-sm font-semibold transition ${
                      plan.popular
                        ? "bg-accent text-accent-foreground hover:opacity-90"
                        : "border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">{plan.ctaNote}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Lead Protocol */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">The Spark Promise</span>
              <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                What is a &ldquo;Verified Lead&rdquo;?
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Unlike aggregators who sell reused data, Spark leads are generated exclusively on your branded site. We
                automatically validate every submission in real-time. You only pay the performance fee when a lead
                passes our 4-point protocol.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {verificationSteps.map((step) => (
                <div key={step.id} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="material-symbols-outlined text-xl">{step.icon}</span>
                    </span>
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      Validation {step.id}
                    </span>
                  </div>
                  <p className="mt-4 font-heading text-base font-semibold text-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Platform Add-ons */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Global Platform Add-ons</span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Supercharge Your Architecture
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Bolt on enterprise-grade modules to any plan and accelerate your growth engine.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {addOns.map((addon) => (
              <div key={addon.title} className="flex flex-col rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-2xl">{addon.icon}</span>
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {addon.badge}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">{addon.title}</h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">{addon.description}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                  <span className="material-symbols-outlined text-base text-energy-emerald">bolt</span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    {addon.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="bg-primary">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-solar-amber-bright">
              Need Custom Architecture?
            </span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Scale Without Limits.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/70">
              For multi-state organizations with complex API integration needs (Salesforce, Netsuite), we offer bespoke
              system packages.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Contact Enterprise Sales
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-white/10"
              >
                Schedule a Demo
              </Link>
            </div>
            <p className="mt-6 text-xs text-primary-foreground/50">
              Dedicated Account Manager • Priority Support • Custom SLAs
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
