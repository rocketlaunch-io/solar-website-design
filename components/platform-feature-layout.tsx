"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface PlatformFeatureLayoutProps {
  icon: string
  title: string
  tagline: string
  description: string
  features: FeatureItem[]
  heroVisual?: React.ReactNode
  children?: React.ReactNode
}

export function PlatformFeatureLayout({
  icon,
  title,
  tagline,
  description,
  features,
  heroVisual,
  children,
}: PlatformFeatureLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 md:py-20 px-4 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
          {/* ambient backdrop */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-[1400px] mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/platform" className="hover:text-secondary transition-colors">Platform</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-foreground">{title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-secondary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icon}
                    </span>
                  </div>
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{tagline}</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight text-balance mb-4">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                  >
                    Get Started
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-2 text-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:text-secondary transition-colors duration-300"
                  >
                    All Features
                  </Link>
                </div>
              </div>

              {heroVisual && (
                <div className="relative">{heroVisual}</div>
              )}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Key Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-all duration-300">
                    <span
                      className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom content slot */}
        {children}

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  See how {title} can transform your solar business today.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                  >
                    Get Started
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/15"
                  >
                    Explore More Features
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
