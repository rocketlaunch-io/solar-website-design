import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PlatformFeatureLayout } from "@/components/platform-feature-layout"
import { FeatureHeroDemo } from "@/components/feature-hero-demos"
import { platformFeaturesData } from "@/lib/platform-features"
import { CalculatorTourWrapper } from "@/components/calculator-tour-wrapper"
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
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
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
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {feature.fullDescription}
              </p>
              <div className="mt-6 flex gap-4">
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

            {/* Generated Image similar to sign in page background */}
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/40 shadow-2xl aspect-[16/10] md:aspect-[16/9]">
              <Image
                src="/images/calculator-solar-home.png"
                alt="Premium modern luxury home with integrated rooftop solar panels"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Key Capabilities */}
          <section className="py-16 px-6 bg-surface-container-lowest border-y border-outline-variant/30 mt-16">
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
          <section className="py-16 px-6 max-w-[1400px] mx-auto">
            <div className="rounded-3xl bg-edge-navy p-10 md:p-14 text-white">
              <div className="max-w-3xl">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-balance">Why It Matters</h2>
                <p className="text-lg text-white/70 leading-relaxed">{feature.benefit}</p>
              </div>
            </div>
          </section>

          {/* Interactive Guided Tour Walkthrough */}
          <section className="py-16 px-6 max-w-[1400px] mx-auto border-t border-outline-variant/30">
            <div className="text-center max-w-3xl mx-auto mb-16">
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

          {/* CTA Section */}
          <section className="py-12 px-6 max-w-[1400px] mx-auto">
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
