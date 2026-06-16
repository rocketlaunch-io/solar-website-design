import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PlatformFeatureLayout } from "@/components/platform-feature-layout"
import { FeatureHeroDemo } from "@/components/feature-hero-demos"
import { platformFeaturesData } from "@/lib/platform-features"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function generateStaticParams() {
  return platformFeaturesData.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const feature = platformFeaturesData.find((f) => f.slug === slug)
  if (!feature) return { title: "Platform | Spark Website" }
  return {
    title: `${feature.title} | Spark Website`,
    description: feature.fullDescription,
  }
}

export default async function PlatformFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = platformFeaturesData.find((f) => f.slug === slug)

  if (!feature) notFound()

  const capabilityIcons = ["check_circle", "verified", "speed", "insights", "auto_awesome", "hub"]
  const capabilities = feature.detailedBenefits.map((b, i) => ({
    icon: capabilityIcons[i % capabilityIcons.length],
    title: b,
    description: "Included as a core part of the Spark " + feature.title + " module.",
  }))

  if (slug === "solar-savings-calculator") {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="pt-24 flex-grow w-full pb-24">
          {/* Hero Header */}
          <div className="text-center py-10 max-w-4xl mx-auto px-6">
            <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/platform" className="hover:text-secondary transition-colors">Platform</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-foreground">{feature.title}</span>
            </nav>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              {feature.tagline}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-4">
              {feature.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {feature.fullDescription}
            </p>
            <div className="mt-6 flex justify-center gap-4">
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

          {/* Calculator Demo Showcase (The generated image + mockup) */}
          <section className="py-6 px-6 max-w-5xl mx-auto">
            <div className="relative rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9]">
              {/* Background Image of Modern Solar Home */}
              <Image
                src="/images/calculator-solar-home.png"
                alt="Premium modern luxury home with rooftop solar panels"
                fill
                priority
                className="object-cover opacity-90 scale-105 transition-transform duration-700"
              />
              {/* Dark/Blur Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-edge-navy-deep/90 via-edge-navy-deep/60 to-transparent z-10" />

              {/* Overlaid UI Mockup */}
              <div className="absolute inset-0 z-20 flex items-center justify-start p-6 md:p-12">
                <div className="w-full max-w-lg glass-panel-dark rounded-2xl border border-white/10 p-6 backdrop-blur-md text-white shadow-xl space-y-4">
                  {/* Header of Mockup Card */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Rooftop Savings Calculator</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-energy-emerald uppercase bg-energy-emerald/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
                      AI Model Active
                    </span>
                  </div>

                  {/* Simulated Address Lookup */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Address Analyzed</label>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200">
                      <span className="material-symbols-outlined text-sm text-slate-400">location_on</span>
                      <span>1280 Sunset Blvd, Los Angeles, CA</span>
                    </div>
                  </div>

                  {/* Solar Specs Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">Est. 20-Yr Savings</p>
                      <p className="font-mono text-xl font-bold text-energy-emerald">$24,800</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">Utility Offset</p>
                      <p className="font-mono text-xl font-bold text-secondary">82% Savings</p>
                    </div>
                  </div>

                  {/* Simulated Roof Panel Layout graphic */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Panel Array Setup</span>
                      <span className="font-mono text-[11px] text-secondary">24 Panels (8.4 kW)</span>
                    </div>
                    {/* Visual simulated panel icons grid */}
                    <div className="grid grid-cols-8 gap-1 pt-1">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="h-5 rounded bg-secondary/20 border border-secondary/40 flex items-center justify-center text-[8px] font-mono text-secondary-foreground">
                          ▤
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action button mock */}
                  <div className="pt-2">
                    <div className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-xl text-center text-xs font-bold shadow-md shadow-secondary/10 hover:shadow-lg transition-all duration-300">
                      Design Your Rooftop Array
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Capabilities */}
          <section className="py-16 px-6 bg-surface-container-lowest border-y border-outline-variant/30 mt-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Key Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="group p-6 rounded-2xl bg-surface border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-all duration-300">
                      <span
                        className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cap.icon}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="py-16 px-6 max-w-5xl mx-auto">
            <div className="rounded-3xl bg-edge-navy p-10 md:p-14 text-white">
              <div className="max-w-3xl">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-balance">Why It Matters</h2>
                <p className="text-lg text-white/70 leading-relaxed">{feature.benefit}</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 px-6 max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  See how the {feature.title} can transform your solar business today.
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
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <PlatformFeatureLayout
      icon={feature.icon}
      title={feature.title}
      tagline={feature.tagline}
      description={feature.fullDescription}
      features={capabilities}
      heroVisual={<FeatureHeroDemo slug={feature.slug} />}
    >
      <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="rounded-3xl bg-edge-navy p-10 md:p-14 text-white">
          <div className="max-w-3xl">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-balance">Why It Matters</h2>
            <p className="text-lg text-white/70 leading-relaxed">{feature.benefit}</p>
          </div>
        </div>
      </section>
    </PlatformFeatureLayout>
  )
}
