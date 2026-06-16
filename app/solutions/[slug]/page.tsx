import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SparkLeadForm } from "@/components/spark-lead-form"
import { solutions, solutionSlugs } from "@/lib/solutions"

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = solutions[slug]
  if (!solution) return { title: "Solution Not Found | Spark Website" }
  return {
    title: `${solution.audience} | Spark Website`,
    description: solution.heroDescription,
  }
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = solutions[slug]
  if (!solution) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-accent">
                <span className="material-symbols-outlined text-sm">bolt</span>
                {solution.eyebrow}
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">{solution.subtitle}</p>
              <h1 className="mt-3 text-balance font-sans text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {solution.title}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {solution.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  Get Started
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
                >
                  Explore the Platform
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-2 shadow-sm">
              <SparkLeadForm />
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-none bg-border sm:grid-cols-3">
            {solution.outcomes.map((o) => (
              <div key={o.label} className="bg-background px-6 py-10 text-center">
                <p className="font-sans text-4xl font-bold text-accent">{o.stat}</p>
                <p className="mt-2 text-sm text-muted-foreground">{o.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center font-sans text-3xl font-bold tracking-tight text-foreground">
            From Friction to Flow
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            We replaced the bottlenecks that cost {solution.audience.toLowerCase()} revenue.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {solution.painPoints.map((p) => (
              <div key={p.problem} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                  <span className="material-symbols-outlined text-base">close</span>
                  The Problem
                </div>
                <p className="mt-2 text-foreground">{p.problem}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">
                  <span className="material-symbols-outlined text-base">check</span>
                  The Spark Fix
                </div>
                <p className="mt-2 text-muted-foreground">{p.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-6 md:grid-cols-3">
              {solution.features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3 className="mt-4 font-sans text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="material-symbols-outlined text-4xl text-accent">format_quote</span>
          <blockquote className="mt-4 text-balance font-sans text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
            {solution.testimonial.quote}
          </blockquote>
          <p className="mt-6 font-semibold text-foreground">{solution.testimonial.author}</p>
          <p className="text-sm text-muted-foreground">{solution.testimonial.role}</p>
        </section>

        {/* CTA */}
        <section className="bg-primary">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              {solution.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">{solution.ctaDescription}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Get Started
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
