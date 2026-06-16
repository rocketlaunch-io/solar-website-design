import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SparkLeadForm } from "@/components/spark-lead-form"
import { HeroShowcase } from "@/components/hero-showcase"
import { StatsBand } from "@/components/stats-band"
import { ProcessSection } from "@/components/process-section"
import { FeatureSpotlights } from "@/components/feature-spotlights"
import { Testimonials } from "@/components/testimonials"
import Link from "next/link"

const featuredIn = ["Forbes", "Bloomberg", "CNBC", "WSJ"]

const solutions = [
  {
    icon: "trending_up",
    title: "Solar Dealers",
    tag: "High-Velocity Sales",
    desc: "A high-converting, \"plug-and-play\" marketing website that qualifies leads automatically and drops them in your CRM.",
    href: "/solutions/dealer",
  },
  {
    icon: "engineering",
    title: "Solar Installers",
    tag: "Operational Clarity",
    desc: "A front-facing \"Customer Command Center\" that mirrors your back-end progress, reducing admin overhead.",
    href: "/solutions/installer",
  },
  {
    icon: "verified",
    title: "Solar Brands",
    tag: "Market Authority",
    desc: "An enterprise-grade web presence designed for high-end aesthetic, authority SEO, and national scale.",
    href: "/solutions/solar-brands",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-energy-emerald/10 border border-energy-emerald/30 rounded-full px-4 py-1.5 w-fit">
                <span className="material-symbols-outlined text-energy-emerald text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-sm font-semibold text-energy-emerald tracking-wide">2025 INCENTIVES ACTIVE</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.05] tracking-tight text-balance">
                The Presence of a{" "}
                <span className="text-secondary">$100M Brand.</span>
                {" "}The Power of a Growth Engine.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Stop building websites. Start automating growth. Spark Website is a high-performance platform built on React and Edge Cloud infrastructure to help you outperform the competition.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-all duration-300 shadow-lg shadow-secondary/30 hover:-translate-y-0.5"
                >
                  Get Started
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-surface-container transition-all duration-300 border border-outline-variant/50"
                >
                  Schedule a Demo
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground ml-1">4.9/5 Rating</span>
                </div>
                <div className="h-4 w-px bg-outline-variant/50" />
                <span className="text-sm text-muted-foreground">Trusted by 500+ installers</span>
              </div>
            </div>

            {/* Interactive hero showcase */}
            <HeroShowcase />
          </div>
        </section>

        {/* Featured in */}
        <section className="py-12 px-4 md:px-12 border-y border-outline-variant/30 bg-surface-container-lowest">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-6">Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
              {featuredIn.map((name) => (
                <span key={name} className="font-heading text-2xl font-bold text-foreground/40">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Animated stats band */}
        <StatsBand />

        {/* Architecture bento */}
        <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance mb-3">
              Built for Speed. Engineered for Scale.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most solar websites are slow, vulnerable templates. Spark is a custom-built React application deployed to the Edge—giving you a decisive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Big card */}
            <div className="lg:col-span-2 lg:row-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-energy-emerald/10 border border-energy-emerald/30 rounded-full px-3 py-1 mb-5">
                <span className="w-2 h-2 rounded-full bg-energy-emerald animate-pulse" />
                <span className="text-xs font-semibold text-energy-emerald">Production Ready</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">100/100 Core Web Vitals</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
                Google ranks based on speed (LCP) and stability (CLS). We engineer every Spark site to hit green scores.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">LCP (Load Time)</p>
                  <p className="font-heading text-3xl font-bold text-energy-emerald font-mono">0.8<span className="text-lg">s</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">TTFB (Latency)</p>
                  <p className="font-heading text-3xl font-bold text-energy-emerald font-mono">12<span className="text-lg">ms</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CLS (Stability)</p>
                  <p className="font-heading text-3xl font-bold text-energy-emerald font-mono">0.00</p>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[10rem] text-outline-variant/20" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            </div>

            {/* Edge network */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6">
              <span className="material-symbols-outlined text-secondary text-2xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">Global Edge Network</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your site is replicated across 300+ global edge nodes. Served from the server closest to the homeowner.
              </p>
            </div>

            {/* React core (dark) */}
            <div className="bg-edge-navy rounded-2xl p-6 text-white relative overflow-hidden">
              <span className="material-symbols-outlined text-secondary text-2xl mb-3">code</span>
              <h3 className="font-heading text-lg font-bold text-white mb-1.5">Modern React 19 Core</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                No plugins. No bloat. Pure, compiled JavaScript.
              </p>
              <div className="space-y-1.5 font-mono text-xs">
                <p className="text-energy-emerald flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">check</span> System optimized</p>
                <p className="text-energy-emerald flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">check</span> Zero latency</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Spark works */}
        <ProcessSection />

        {/* Interactive feature spotlights */}
        <FeatureSpotlights />

        {/* Solutions */}
        <section className="py-20 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Tailored For Your Business Model</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2 mb-3">
                Spark Solar Solutions
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a single-crew installer or a national brand, Spark&apos;s architecture adapts to solve your specific growth bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {solutions.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-7 hover:border-secondary/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">{s.tag}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Explore Features
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Gen Engine (dark navy w/ form) */}
        <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="bg-edge-navy rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden relative">
            <div className="text-white relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-5">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="text-xs font-semibold text-white">Smart Lead Engine</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight text-balance">
                Turn Traffic into Verified Leads.
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                Generic contact forms kill conversion rates. Spark&apos;s lead engine uses a psychology-backed Multi-Step Quote Wizard to engage users with value first. Frictionless handoff pushes validated data to your CRM in under 200ms.
              </p>
              <ul className="space-y-3">
                {["Cognitive Load Reduction", "Real-time Conditional Logic", "+340% Completion Rate vs. Static Forms"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center lg:justify-end relative z-10">
              <SparkLeadForm />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Final CTA */}
        <section className="py-20 px-4 md:px-12 bg-surface-container-lowest border-t border-outline-variant/30">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Ready for High-Performance Growth?</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2 mb-4 text-balance">
              Automate Your Solar Growth.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ditch the manual work. Deploy a high-performance ecosystem that handles your marketing, qualifies your leads, and scales your business on autopilot.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-all duration-300 shadow-lg shadow-secondary/30 hover:-translate-y-0.5"
              >
                Get Started
                <span className="material-symbols-outlined text-lg">bolt</span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-surface-container text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-surface-container-high transition-all duration-300 border border-outline-variant/50"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
