import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { FeatureHeroDemo } from "@/components/feature-hero-demos"
import { platformFeaturesData } from "@/lib/platform-features"
import { CalculatorTourWrapper } from "@/components/calculator-tour-wrapper"
import { ProcessFlow, FaqAccordion, DigitalCardSpotlight } from "@/components/feature-interactive-sections"
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

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-24 flex-grow w-full pb-16">
        {/* Breadcrumb & Hero */}
        <section className="relative px-4 md:px-12 max-w-[1400px] mx-auto mb-16 overflow-hidden">
          {/* ambient backdrop */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" aria-hidden="true" />
          
          <div className="relative">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/platform" className="hover:text-secondary transition-colors">Platform</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-foreground">{feature.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span
                      className="material-symbols-outlined text-secondary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-secondary/10 px-3.5 py-1.5 rounded-full">
                    {feature.tagline}
                  </span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight text-balance mb-4">
                  {feature.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {feature.fullDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                  >
                    Get Started
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-2 text-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:text-secondary transition-colors duration-300"
                  >
                    All Features
                  </Link>
                </div>
              </div>

              <div className="relative">
                <FeatureHeroDemo slug={feature.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* High-Impact ROI Banner */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="relative rounded-3xl bg-edge-navy p-8 md:p-12 text-white border border-white/5 overflow-hidden shadow-2xl shadow-primary/10">
            {/* ambient glow */}
            <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
            <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 items-center">
              {/* Stat Column */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                <span className="font-heading text-6xl md:text-7xl font-black bg-gradient-to-r from-secondary to-solar-amber-bright bg-clip-text text-transparent leading-none tracking-tight">
                  {feature.roiMetric.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/55 mt-2">
                  {feature.roiMetric.label}
                </span>
              </div>

              {/* Value Statement Column */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-secondary mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Key Business Impact</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                  How this drives value for your dealership
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  {feature.benefit}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 mb-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Key Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-surface border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-all duration-300 border border-outline-variant/30">
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

        {/* Spotlight Section (Conditional for Rep Pages) */}
        {slug === "rep-pages" && <DigitalCardSpotlight />}

        {/* How It Works (Process Flow) */}
        {slug !== "solar-savings-calculator" && (
          <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-16">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Operational Flow</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
                How It Works
              </h2>
            </div>
            <ProcessFlow steps={feature.process} />
          </section>
        )}

        {/* Calculator Interactive Guided Tour */}
        {slug === "solar-savings-calculator" && (
          <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto border-b border-outline-variant/30 mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                Interactive Guided Tour
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-4">
                Explore the Homeowner Experience
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Take an interactive guided tour of the Solar Savings Calculator to see how it scans properties, models utility offsets, and maximizes lead generation value.
              </p>
            </div>
            <CalculatorTourWrapper />
          </section>
        )}

        {/* Detailed Specs & FAQs Section */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-start mb-16">
          {/* Tech Specs */}
          <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              Technical Specs
            </h3>
            <div className="flex flex-col">
              {feature.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-outline-variant/30 text-sm last:border-b-0">
                  <span className="text-muted-foreground font-semibold">{spec.label}</span>
                  <span className="text-foreground font-bold font-mono text-right pl-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>help_center</span>
              Frequently Asked Questions
            </h3>
            <FaqAccordion faqs={feature.faqs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                See how {feature.title} can transform your solar business today.
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
