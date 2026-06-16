"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { solutions } from "@/lib/solutions"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { HeroVisualFrame } from "@/components/hero-visual-frame"

const order = ["dealer", "installer", "solar-brands", "solar-companies"]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 border-b border-outline-variant/20 bg-surface-container-low/30">
          <WebGLShader />
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="material-symbols-outlined text-accent text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Spark Solar Solutions</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight text-balance">
                One Platform. <span className="text-secondary">Built for Your Scale.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Whether you&apos;re a single-crew installer or a national brand, Spark&apos;s architecture adapts to solve your specific growth bottlenecks.
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
                  href="/"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-surface-container transition-all duration-300 border border-outline-variant/50"
                >
                  Back to Home
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground ml-1">4.9/5 rating</span>
                </div>
                <div className="h-4 w-px bg-outline-variant/50" />
                <span className="text-sm text-muted-foreground">Tailored for 4 major business models</span>
              </div>
            </div>

            {/* Interactive Style Visual */}
            <HeroVisualFrame
              imageSrc="/images/modern-solar-home.png"
              altText="Spark Solutions Audience Visual Showcase"
              badgeText="Optimized"
              statsTitle="Deals Managed"
              statsValue="4,200 deals"
              toastIcon="apps"
              toastTitle="Workflows Configured"
              toastBody="Lead routing customized for local dealers"
              performanceLabel="Scale Factor"
              performanceValue="Unlimited"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {order.map((slug) => {
              const s = solutions[slug]
              return (
                <Link
                  key={slug}
                  href={`/solutions/${slug}`}
                  className="group rounded-2xl border border-border bg-card p-8 transition hover:border-accent hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{s.subtitle}</p>
                  <h2 className="mt-2 font-sans text-2xl font-bold text-foreground">{s.audience}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.heroDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition group-hover:gap-3">
                    Explore Features
                    <span className="material-symbols-outlined text-base text-accent">arrow_forward</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
