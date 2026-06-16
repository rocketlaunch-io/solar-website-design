import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PlatformFeatureLayout } from "@/components/platform-feature-layout"
import { FeatureHeroDemo } from "@/components/feature-hero-demos"
import { platformFeaturesData } from "@/lib/platform-features"
import { SolarSavingsCalculator } from "@/components/solar-savings-calculator"
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

  if (slug === "solar-savings-calculator") {
    return (
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />
        <main className="pt-24 flex-grow px-4 md:px-12 max-w-[1400px] mx-auto w-full pb-24">
          <div className="text-center py-10 max-w-4xl mx-auto px-6">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">AI Powered Savings</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-4">Solar Savings Calculator</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Instantly map your roof&apos;s solar potential, estimate utility bill offset, and simulate your 25-year financial returns using Google Solar satellite data.</p>
          </div>
          <SolarSavingsCalculator />
        </main>
        <Footer />
      </div>
    )
  }

  const capabilityIcons = ["check_circle", "verified", "speed", "insights", "auto_awesome", "hub"]
  const capabilities = feature.detailedBenefits.map((b, i) => ({
    icon: capabilityIcons[i % capabilityIcons.length],
    title: b,
    description: "Included as a core part of the Spark " + feature.title + " module.",
  }))

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
