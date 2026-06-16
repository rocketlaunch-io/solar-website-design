import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { GrowServiceLayout } from "@/components/grow-service-layout"
import { growServicesData } from "@/lib/grow-services"

export function generateStaticParams() {
  return growServicesData.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = growServicesData.find((s) => s.slug === slug)
  if (!service) return { title: "Spark Grow | Spark Website" }
  return {
    title: `${service.title} | Spark Grow`,
    description: service.fullDescription,
  }
}

export default async function GrowServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = growServicesData.find((s) => s.slug === slug)

  if (!service) notFound()

  const capabilityIcons = ["check_circle", "verified", "speed", "insights", "auto_awesome", "hub"]
  const capabilities = service.detailedBenefits.map((b, i) => ({
    icon: capabilityIcons[i % capabilityIcons.length],
    title: b,
    description: "Delivered by your dedicated Spark Grow " + service.title + " team.",
  }))

  return (
    <GrowServiceLayout
      icon={service.icon}
      title={service.title}
      tagline={service.tagline}
      description={service.fullDescription}
      features={capabilities}
    >
      <section className="py-16 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="rounded-3xl bg-edge-navy p-10 md:p-14 text-white">
          <div className="max-w-3xl">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-balance">Why It Matters</h2>
            <p className="text-lg text-white/70 leading-relaxed">{service.benefit}</p>
          </div>
        </div>
      </section>
    </GrowServiceLayout>
  )
}
