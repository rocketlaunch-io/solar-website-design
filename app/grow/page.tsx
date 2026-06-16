"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { growServicesData, type GrowService } from "@/lib/grow-services"
import { GrowDemo } from "@/components/grow-demos"
import { GrowSavingsCalculator } from "@/components/grow-savings-calculator"
import { GrowFocusAllocator } from "@/components/grow-focus-allocator"
import { GrowFaq } from "@/components/grow-faq"

export default function GrowPage() {
  const [selectedService, setSelectedService] = useState<GrowService | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 md:py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-edge-navy text-white rounded-full px-4 py-1.5 mb-6">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
              <span className="text-sm font-medium">Full-Stack Creative &amp; Growth Department</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight text-balance mb-6">
              Meet Spark Grow: Your{" "}
              <span className="text-secondary">In-House Team.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Stop hiring freelancers and juggling agencies. Spark Grow provides a fully managed, in-house creative experience for solar dealerships—a full-stack team of industry experts for a fraction of the cost of a single senior hire.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
              >
                Get Started with Spark Grow
                <span className="material-symbols-outlined text-lg">bolt</span>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-surface-container transition-colors duration-300 border border-outline-variant/50"
              >
                Explore The Services
              </a>
            </div>
          </div>
        </section>

        {/* Difference Band */}
        <section className="py-16 px-4 md:px-12 bg-edge-navy">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Your Creative Engine</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-balance mb-4">Not just a service. A Full-Stack Team.</h2>
              <p className="text-white/60 leading-relaxed">
                Spark Grow is your dedicated, in-house creative department—industry experts who handle every aspect of your brand&apos;s growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "task_alt", title: "Fully Managed", body: "From briefing to execution, our team handles the heavy lifting so you can focus on sales." },
                { icon: "solar_power", title: "Solar-Centric", body: "We only work with solar. We know what homeowners want and how to communicate value." },
                { icon: "trending_up", title: "Scalable Creative", body: "As your dealership grows, Spark Grow scales with you—more assets, deeper strategy." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <span className="material-symbols-outlined text-secondary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Spark Grow Difference - In-House vs Spark */}
        <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">The Spark Grow Difference</h2>
            <p className="text-muted-foreground leading-relaxed">Why leading solar companies are switching from traditional agencies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-5">The Burden of In-House</h3>
              <ul className="space-y-3">
                {[
                  "Recruiting, training, and managing staff",
                  "Paying for expensive software and tools",
                  "Disconnected creative and sales efforts",
                  "High overhead and long-term contracts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-muted-foreground/60 text-lg mt-0.5">cancel</span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-secondary/40 bg-secondary/5 p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                The Spark Grow Advantage
              </h3>
              <ul className="space-y-3">
                {[
                  "Instant access to a seasoned solar creative team",
                  "All professional tools and licenses included",
                  "Strategy and creative aligned for maximum ROI",
                  "One flat monthly fee with total transparency",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-energy-emerald text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Old Way vs Spark Way comparison table */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">The &ldquo;Old Way&rdquo; vs. The Spark Way</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-outline-variant/40">
              <div className="grid grid-cols-3 bg-edge-navy text-white text-sm font-semibold">
                <div className="p-4 md:p-5">Comparison</div>
                <div className="p-4 md:p-5 border-l border-white/10">The Old Way</div>
                <div className="p-4 md:p-5 border-l border-white/10 text-secondary">The Spark Way</div>
              </div>
              {[
                { label: "Agency Structure", old: "Multiple non-communicating agencies", spark: "One integrated team and strategy" },
                { label: "Budget Efficiency", old: "Wasted budget on ads", spark: "AI-optimized campaigns to maximize ROI" },
                { label: "Brand Identity", old: "Inconsistent branding", spark: "Consistent, professional branding everywhere" },
                { label: "Support", old: "Slow response times", spark: "Dedicated, fully managed support team" },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low"}`}>
                  <div className="p-4 md:p-5 font-medium text-foreground">{row.label}</div>
                  <div className="p-4 md:p-5 border-l border-outline-variant/30 flex items-start gap-2 text-muted-foreground">
                    <span className="material-symbols-outlined text-muted-foreground/50 text-lg flex-shrink-0">cancel</span>
                    {row.old}
                  </div>
                  <div className="p-4 md:p-5 border-l border-outline-variant/30 flex items-start gap-2 text-foreground">
                    <span className="material-symbols-outlined text-energy-emerald text-lg flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {row.spark}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Reality Check */}
        <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">The Numbers</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">The ROI Reality Check</h2>
            <p className="text-muted-foreground leading-relaxed">Most dealerships assume hiring in-house is more cost-effective. The math tells a different story.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-5">The In-House Cost Breakdown</h3>
              <ul className="divide-y divide-outline-variant/30">
                {[
                  { role: "Creative Director / Strategist", cost: "$144,000" },
                  { role: "Senior Graphic Designer", cost: "$90,000" },
                  { role: "Media Buyer (Ad Manager)", cost: "$102,000" },
                  { role: "Copywriter & SEO Specialist", cost: "$84,000" },
                  { role: "Software Stack (Adobe, CRM, AI)", cost: "$12,000" },
                ].map((item) => (
                  <li key={item.role} className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">{item.role}</span>
                    <span className="font-mono text-sm font-semibold text-foreground">{item.cost}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t-2 border-outline-variant/50 pt-4">
                <span className="text-sm font-bold text-foreground">Total Annual Investment</span>
                <span className="font-heading text-xl font-bold text-foreground">$432,000</span>
              </div>
            </div>
            <div className="rounded-2xl bg-edge-navy p-8">
              <h3 className="font-heading text-lg font-bold text-white mb-5">The Spark Grow Advantage</h3>
              <ul className="divide-y divide-white/10">
                {[
                  { label: "Spark Grow (Launch)", value: "$60,000/yr" },
                  { label: "Management Overhead", value: "Zero (Fully Managed)" },
                  { label: "Ramp-Up Time", value: "72 Hours" },
                  { label: "Scalability", value: "Instant" },
                  { label: "Industry Expertise", value: "100% Solar-Centric" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center justify-between py-3">
                    <span className="text-sm text-white/60">{item.label}</span>
                    <span className="font-mono text-sm font-semibold text-white">{item.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-energy-emerald/30 bg-energy-emerald/10 p-5 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">The Bottom Line</p>
                <p className="font-heading text-3xl font-bold text-energy-emerald mt-1">$372,000+ Savings/Year</p>
                <p className="text-sm text-white/60 mt-2">Reinvest directly into ad spend or fleet expansion.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/5 p-5">
            <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">The Opportunity Cost:</span> Every month spent searching for the &ldquo;perfect&rdquo; in-house hire is a month of lost leads and stagnant branding. Spark Grow gives you a world-class creative department by this time next week.
            </p>
          </div>
        </section>

        {/* Savings Calculator */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Exponential Capacity</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">Scale Without the Growing Pains</h2>
              <p className="text-muted-foreground leading-relaxed">
                Adding Spark Grow is like unlocking an instant, professional creative department. Drag the roles you&apos;d need to hire and watch your savings stack up.
              </p>
            </div>
            <GrowSavingsCalculator />
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Core Service Offerings</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">Everything to Dominate Your Local Solar Market</h2>
              <p className="text-muted-foreground leading-relaxed">
                Select a service to explore its unique interactive experience and see exactly what your in-house team delivers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {growServicesData.map((service) => (
                <button
                  key={service.slug}
                  onClick={() => setSelectedService(service)}
                  className="group relative p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-xl text-left"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-all duration-300">
                    <span
                      className="material-symbols-outlined text-primary text-3xl group-hover:text-secondary transition-colors"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {service.icon}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{service.tagline}</span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 mt-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors">
                    <span className="text-sm font-medium">Explore service</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 72-Hour Timeline */}
        <section className="py-16 px-4 md:px-12 bg-edge-navy">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-balance mb-4">Your Path to Growth</h2>
              <p className="text-white/60 leading-relaxed">What happens after you sign up?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { phase: "Hour 0-24", title: "The Strategy Kickoff", body: "Meet your dedicated Account Manager and Creative Lead to align on goals and target territories." },
                { phase: "Hour 24-48", title: "Asset & Access Sync", body: "We plug into your CRM and ad accounts, auditing current assets for immediate optimization." },
                { phase: "Hour 48-72", title: "The 90-Day Blueprint", body: "We present your custom growth roadmap and immediately begin launching your first creative campaigns." },
              ].map((item, i) => (
                <div key={item.phase} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-sm">{i + 1}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{item.phase}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <blockquote className="mt-12 max-w-3xl mx-auto text-center">
              <p className="font-heading text-xl md:text-2xl font-medium text-white text-balance leading-relaxed">
                &ldquo;Before Spark Grow, our marketing was scattered. Now, we have a unified creative strategy and a team that feels like they&apos;re in the office with us. It&apos;s the most efficient way to scale a solar business.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-white/50">— Managing Director, Solar Enterprise</footer>
            </blockquote>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="py-16 px-4 md:px-12 scroll-mt-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Membership</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">One All-Inclusive Model. Three Capacity Tiers.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every tier unlocks the <span className="font-semibold text-foreground">full spectrum</span>{" "}of Spark Grow services. You don&apos;t pay more to access video, automation, or strategy &mdash; you simply choose how much monthly capacity you need. Hours are bespoke and re-allocated each month to match your current focus.
              </p>
            </div>

            {/* All-inclusive banner */}
            <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-energy-emerald/30 bg-energy-emerald/5 px-6 py-4 text-center sm:text-left">
              <span className="material-symbols-outlined text-energy-emerald text-2xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>all_inclusive</span>
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">All services included on every tier:</span> Strategy, Paid Media, SEO, Creative Design, Video Production, CRM Automation, Email Nurturing, Social & Direct Mail. The tier sets your capacity &mdash; not your access.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {[
                {
                  name: "IGNITE",
                  desc: "A complete creative department for established dealerships building consistent momentum.",
                  price: "$5,000",
                  hours: "Up to 40 hrs / month",
                  cadence: "Monthly Strategy Calls",
                  audience: "Established Dealerships",
                  popular: false,
                  output: [
                    "4–6 high-conversion ad creatives",
                    "8–12 social media posts per month",
                    "1 short-form video / motion piece",
                    "Always-on paid media management",
                    "SEO optimization & content refresh",
                    "Email nurture sequence build",
                    "Monthly performance reporting",
                  ],
                },
                {
                  name: "ACCELERATE",
                  desc: "Expanded capacity for businesses aggressively capturing new market share.",
                  price: "$10,000",
                  hours: "Up to 90 hrs / month",
                  cadence: "Bi-Monthly Strategy Calls",
                  audience: "Rapidly Scaling Businesses",
                  popular: true,
                  output: [
                    "10–14 high-conversion ad creatives",
                    "16–24 social media posts per month",
                    "2–3 produced videos + motion graphics",
                    "Full CRM & email automation builds",
                    "CRO & multi-platform funnel optimization",
                    "Behavior-based segmentation campaigns",
                    "Landing page design & A/B testing",
                    "Printed sales decks & door flyers",
                  ],
                },
                {
                  name: "LIGHTSPEED",
                  desc: "Maximum capacity and priority access for national-scale solar enterprises.",
                  price: "$20,000",
                  hours: "Up to 200 hrs / month",
                  cadence: "Weekly Executive Review",
                  audience: "National Solar Enterprises",
                  popular: false,
                  output: [
                    "Priority high-volume creative pipeline",
                    "Full-scale video production crew",
                    "Dedicated Creative Director",
                    "On-demand creative studio access",
                    "Priority custom national campaigns",
                    "Advanced AI process automation",
                    "Market-dominance growth strategy",
                  ],
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    tier.popular ? "border-secondary shadow-xl bg-surface-container-lowest lg:-mt-4 lg:mb-4" : "border-outline-variant/40 bg-surface-container-lowest"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-bold text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1 border-t border-outline-variant/30 pt-5">
                    <span className="font-heading text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>

                  {/* Capacity + cadence */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
                      <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                      <span className="text-sm font-semibold text-foreground">{tier.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="material-symbols-outlined text-muted-foreground text-base">groups</span>
                      <span className="text-sm text-muted-foreground">{tier.cadence}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">{tier.audience}</p>

                  {/* Average output */}
                  <div className="mt-5 border-t border-outline-variant/30 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average Monthly Output</p>
                    <ul className="mt-4 flex-grow space-y-3">
                      {tier.output.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                          <span className="material-symbols-outlined mt-0.5 text-base text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground/80">
                    Output is illustrative. Your hours are re-allocated each month to whatever drives the most ROI for your current focus.
                  </p>

                  <Link
                    href="/contact"
                    className={`mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition ${
                      tier.popular
                        ? "bg-secondary text-secondary-foreground hover:bg-solar-amber-bright"
                        : "border border-outline-variant/50 text-foreground hover:bg-surface-container"
                    }`}
                  >
                    Select {tier.name}
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Need something beyond Lightspeed?{" "}
              <Link href="/contact" className="font-semibold text-secondary hover:underline">Talk to us about a custom capacity plan.</Link>
            </p>
          </div>
        </section>

        {/* The Output Engine */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">The Output Engine</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">Your Budget, Maximized for Output.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unlike traditional agencies that nickel-and-dime for every revision, Spark Grow operates on a dynamic hour-pool model.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
                  <h3 className="font-heading font-bold text-foreground mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>all_inclusive</span>
                    Total Spectrum Execution
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">We don&apos;t have set deliverable counts. We aim to produce the maximum amount of high-impact creative, strategy, and automation possible within your monthly budget.</p>
                </div>
                <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
                  <h3 className="font-heading font-bold text-foreground mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
                    Agile Priority Management
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Each month, we align on your immediate goals. Need more video? We pivot. Need CRM automation? We re-allocate. Your output always matches your friction points.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-edge-navy p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-energy-emerald">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-energy-emerald opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-energy-emerald" />
                  </span>
                  Production Active
                </span>
                <div className="text-right">
                  <p className="font-heading text-2xl font-bold text-solar-amber-bright">4.2x</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Efficiency Gain</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["4K Drone Ads", "CRM Automations", "Video Testimonials", "Sales Deck Design", "SEO Optimization", "Ad Copy Variations", "Motion Graphics", "Direct Mail"].map((tag) => (
                  <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-solar-amber/30 bg-solar-amber/10 p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-solar-amber-bright" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
                <p className="text-sm font-semibold text-white">Production Active: <span className="text-solar-amber-bright">4K Drone Ads</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Allocator */}
        <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Bespoke By Design</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">Your Hours, Pointed at Your Priority</h2>
            <p className="text-muted-foreground leading-relaxed">
              No two months look the same. Spark Grow flexes your capacity toward whatever your business needs most&mdash;try it below.
            </p>
          </div>
          <GrowFocusAllocator />
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">Everything You Need to Know</h2>
              <p className="text-muted-foreground leading-relaxed">How the all-inclusive, hour-based model works in practice.</p>
            </div>
            <GrowFaq />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  Stop Managing Agencies. Start Scaling.
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Get a full-service, solar-centric creative department at your fingertips. We only onboard a limited number of partners per quarter.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Claim Your Free Growth Audit
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <p className="text-sm text-white/40 mt-4">Now Booking — Q3 2026</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        {selectedService && (
          <DialogContent onClose={() => setSelectedService(null)} className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-4 mb-2">
                <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-secondary text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {selectedService.icon}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{selectedService.tagline}</span>
                  <DialogTitle className="text-2xl mt-0.5 mb-1">{selectedService.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedService.shortDescription}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Unique Interactive Demo */}
            <GrowDemo slug={selectedService.slug} />

            {/* Full Description */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                What It Does
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {selectedService.fullDescription}
              </p>
            </div>

            {/* Key Benefit */}
            <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30">
              <h4 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                Why It Matters
              </h4>
              <p className="text-muted-foreground leading-relaxed">{selectedService.benefit}</p>
            </div>

            {/* Detailed Benefits */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
                What You Get
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.detailedBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-energy-emerald text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-muted-foreground text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/grow/${selectedService.slug}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                View Full Page
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors"
              >
                Get Started
              </Link>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
