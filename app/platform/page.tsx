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
import { platformFeaturesData, type PlatformFeature } from "@/lib/platform-features"
import { FeatureDemo } from "@/components/feature-demos"

export default function PlatformPage() {
  const [selectedFeature, setSelectedFeature] = useState<PlatformFeature | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 md:py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-edge-navy text-white rounded-full px-4 py-1.5 mb-6">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              <span className="text-sm font-medium">The Spark Ecosystem</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight text-balance mb-6">
              A Unified Operating System for{" "}
              <span className="text-secondary">Solar Growth.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              A high-performance growth ecosystem pre-integrated with high-conversion frameworks, authority SEO, and elite lead-capture tools. Select a module to explore deeper.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
              >
                Launch Your Spark
                <span className="material-symbols-outlined text-lg">bolt</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-surface-container transition-colors duration-300 border border-outline-variant/50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeaturesData.map((feature) => (
                <button
                  key={feature.slug}
                  onClick={() => setSelectedFeature(feature)}
                  className="group relative p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-xl text-left"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-all duration-300">
                    <span
                      className="material-symbols-outlined text-primary text-3xl group-hover:text-secondary transition-colors"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{feature.tagline}</span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 mt-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a free strategy call and see how these modules work together for your solar company.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Book Your Solar Strategy Call
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Feature Detail Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        {selectedFeature && (
          <DialogContent onClose={() => setSelectedFeature(null)} className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-4 mb-2">
                <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-secondary text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {selectedFeature.icon}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{selectedFeature.tagline}</span>
                  <DialogTitle className="text-2xl mt-0.5 mb-1">{selectedFeature.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedFeature.shortDescription}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Unique Interactive Demo */}
            <FeatureDemo slug={selectedFeature.slug} />

            {/* Full Description */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                What It Does
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {selectedFeature.fullDescription}
              </p>
            </div>

            {/* Key Benefit */}
            <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30">
              <h4 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                Why It Matters
              </h4>
              <p className="text-muted-foreground leading-relaxed">{selectedFeature.benefit}</p>
            </div>

            {/* Detailed Benefits */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
                What You Get
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedFeature.detailedBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-energy-emerald text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-muted-foreground text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/platform/${selectedFeature.slug}`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                View Full Page
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors"
              >
                Launch Your Spark
              </Link>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
