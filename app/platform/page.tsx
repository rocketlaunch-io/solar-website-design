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
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { HeroVisualFrame } from "@/components/hero-visual-frame"

export default function PlatformPage() {
  const [selectedFeature, setSelectedFeature] = useState<PlatformFeature | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-12 md:py-20 border-b border-outline-variant/20 bg-surface-container-low/30">
          <WebGLShader />
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="material-symbols-outlined text-accent text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">The Spark Ecosystem</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight text-balance">
                A Unified Operating System for <span className="text-secondary">Solar Growth.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                A high-performance growth ecosystem pre-integrated with high-conversion frameworks, authority SEO, and elite lead-capture tools. Select a module below to explore deeper.
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
                <span className="text-sm text-muted-foreground">12 pre-integrated modules</span>
              </div>
            </div>

            {/* Interactive Style Visual */}
            <HeroVisualFrame
              imageSrc="/images/solar-hero.png"
              altText="Unified Solar Operating System Diagram Showcase"
              badgeText="Connected"
              statsTitle="Modules Active"
              statsValue="12 Modules"
              toastIcon="hub"
              toastTitle="Ecosystem Synced"
              toastBody="All core modules deployed on edge nodes"
              performanceLabel="Ecosystem Sync"
              performanceValue="Sub-200ms"
            />
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
                  Book a free live demo and see how these modules work together for your solar company.
                </p>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Schedule a Demo
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
                Get Started
              </Link>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
