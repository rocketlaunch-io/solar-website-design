import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { solutions } from "@/lib/solutions"

export const metadata: Metadata = {
  title: "Solutions | Spark Website",
  description:
    "Spark's architecture adapts to your role in solar—dealers, installers, brands, and full-service companies all grow on one platform.",
}

const order = ["dealer", "installer", "solar-brands", "solar-companies"]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-accent">
              <span className="material-symbols-outlined text-sm">apps</span>
              Spark Solar Solutions
            </span>
            <h1 className="mt-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              One platform. Built for your place in solar.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Whether you&apos;re a single-crew installer or a national brand, Spark&apos;s architecture adapts to solve
              your specific growth bottlenecks.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {order.map((slug) => {
              const s = solutions[slug]
              return (
                <Link
                  key={slug}
                  href={`/solutions/${slug}`}
                  className="group rounded-2xl border border-border bg-card p-8 transition hover:border-accent hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{s.subtitle}</p>
                  <h2 className="mt-2 font-sans text-2xl font-bold text-foreground">{s.audience}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.heroDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition group-hover:gap-3">
                    Explore Features
                    <span className="material-symbols-outlined text-base text-accent">arrow_forward</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
