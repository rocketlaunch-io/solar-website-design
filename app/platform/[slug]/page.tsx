import { notFound } from "next/navigation"
import type { Metadata } from "next"
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

  return (
    <PlatformFeatureLayout
      icon={feature.icon}
      title={feature.title}
      tagline={feature.tagline}
      description={feature.fullDescription}
      features={capabilities}
      heroVisual={<FeatureHeroDemo slug={feature.slug} />}
    >
      {slug === "solar-savings-calculator" && (
        <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto border-t border-outline-variant/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              Interactive Feature Tour
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
