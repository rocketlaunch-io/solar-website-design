import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { GrowDemo } from "@/components/grow-demos"
import { growServicesData } from "@/lib/grow-services"
import { ProcessFlow, FaqAccordion } from "@/components/feature-interactive-sections"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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
    description: "Delivered as a core part of the Spark Grow " + service.title + " department.",
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
              <Link href="/grow" className="hover:text-secondary transition-colors">Spark Grow</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-foreground">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span
                      className="material-symbols-outlined text-secondary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {service.icon}
                    </span>
                  </div>
                  <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-secondary/10 px-3.5 py-1.5 rounded-full">
                    {service.tagline}
                  </span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight text-balance mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {service.fullDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                  >
                    Claim Your Free Growth Audit
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <Link
                    href="/grow"
                    className="inline-flex items-center gap-2 text-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:text-secondary transition-colors duration-300"
                  >
                    All Services
                  </Link>
                </div>
              </div>

              <div className="relative">
                <GrowDemo slug={service.slug} />
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
                  {service.roiMetric.value}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white/55 mt-2">
                  {service.roiMetric.label}
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
                  {service.benefit}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Capabilities */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 mb-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              What&apos;s Included
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

        {/* How It Works (Process Flow) */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Department Workflow</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
              Our Process
            </h2>
          </div>
          <ProcessFlow steps={service.process} />
        </section>

        {/* Detailed Specs & FAQs Section */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-start mb-16">
          {/* Tech Specs */}
          <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              Service Specs
            </h3>
            <div className="flex flex-col">
              {service.specs.map((spec, i) => (
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
            <FaqAccordion faqs={service.faqs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Ready to Add {service.title} to Your Team?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Get a world-class creative department working on your growth by this time next week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Claim Your Free Growth Audit
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/grow"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/15"
                >
                  Explore More Services
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
