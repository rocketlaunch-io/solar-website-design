import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Comparison | Spark Website",
  description:
    "See how Spark's high-performance solar growth platform outperforms WordPress, page builders, and DIY template sites on speed, conversion, and SEO.",
}

const columns = [
  { key: "spark", label: "Spark", sub: "React + Edge", highlight: true },
  { key: "wordpress", label: "WordPress", sub: "Plugins & themes", highlight: false },
  { key: "diy", label: "DIY Builder", sub: "Wix / Squarespace", highlight: false },
]

type Cell = boolean | string

const rows: { feature: string; values: Record<string, Cell> }[] = [
  {
    feature: "100/100 Core Web Vitals",
    values: { spark: true, wordpress: "Plugin-dependent", diy: false },
  },
  {
    feature: "Global edge delivery",
    values: { spark: true, wordpress: "Add-on CDN", diy: false },
  },
  {
    feature: "Psychology-backed quote wizard",
    values: { spark: true, wordpress: false, diy: false },
  },
  {
    feature: "Sub-200ms CRM sync",
    values: { spark: true, wordpress: "Manual / Zapier", diy: false },
  },
  {
    feature: "AI-first SEO architecture",
    values: { spark: true, wordpress: "Plugin-dependent", diy: "Limited" },
  },
  {
    feature: "Programmatic local SEO pages",
    values: { spark: true, wordpress: "Custom dev", diy: false },
  },
  {
    feature: "Full-funnel attribution",
    values: { spark: true, wordpress: "Add-on", diy: false },
  },
  {
    feature: "No plugin maintenance or security patching",
    values: { spark: true, wordpress: false, diy: true },
  },
  {
    feature: "Bespoke, conversion-first design",
    values: { spark: true, wordpress: "Theme-limited", diy: "Template-limited" },
  },
]

const benchmarks = [
  { metric: "Page load", spark: "0.4s", others: "3–6s", icon: "speed" },
  { metric: "Lead completion", spark: "+340%", others: "Baseline", icon: "trending_up" },
  { metric: "Lead-to-CRM", spark: "<200ms", others: "Minutes", icon: "bolt" },
  { metric: "Lighthouse score", spark: "100", others: "40–70", icon: "verified" },
]

function CellContent({ value, highlight }: { value: Cell; highlight: boolean }) {
  if (value === true) {
    return (
      <span
        className={`material-symbols-outlined text-xl ${highlight ? "text-energy-emerald" : "text-energy-emerald"}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
        aria-label="Included"
      >
        check_circle
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="material-symbols-outlined text-xl text-outline" aria-label="Not included">
        cancel
      </span>
    )
  }
  return <span className="text-xs text-muted-foreground">{value}</span>
}

export default function Comparison() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="px-4 md:px-16 max-w-[1200px] mx-auto py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full w-fit border border-surface-container-highest mx-auto mb-6">
            <span
              className="material-symbols-outlined text-secondary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              balance
            </span>
            <span className="text-xs font-semibold text-primary tracking-wide">Spark vs. The Rest</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            A platform, not a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-solar-amber-bright">
              template
            </span>
            .
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            WordPress and DIY builders ship slow, plugin-heavy sites that leak leads. Spark is engineered on React and
            the edge to win the speed, conversion, and SEO race for solar.
          </p>
        </section>

        {/* Benchmarks */}
        <section className="px-4 md:px-16 max-w-[1200px] mx-auto pb-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benchmarks.map((b) => (
              <div key={b.metric} className="rounded-xl glass-panel p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {b.icon}
                  </span>
                </div>
                <p className="mt-4 font-heading text-3xl font-bold text-foreground">{b.spark}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{b.metric}</p>
                <p className="mt-1 text-xs text-muted-foreground">Others: {b.others}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-4 md:px-16 max-w-[1200px] mx-auto py-12 sm:py-16">
          <div className="overflow-x-auto rounded-xl border border-outline-variant/40 bg-surface-container-lowest">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant/40">
                  <th className="p-5 text-sm font-semibold text-muted-foreground">Capability</th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`p-5 text-center ${col.highlight ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      <span className="block font-heading text-base font-bold">{col.label}</span>
                      <span
                        className={`block text-xs font-normal ${
                          col.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {col.sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-outline-variant/30 last:border-0 ${
                      i % 2 === 1 ? "bg-surface-container-low/50" : ""
                    }`}
                  >
                    <td className="p-5 text-sm font-medium text-foreground">{row.feature}</td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-5 text-center ${col.highlight ? "bg-secondary/5" : ""}`}
                      >
                        <span className="flex items-center justify-center">
                          <CellContent value={row.values[col.key]} highlight={col.highlight} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-edge-navy-deep">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Stop maintaining a website. Start running a growth engine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              See exactly how Spark would outperform your current site on a free Solar Strategy Call.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-solar-amber-bright"
            >
              Launch Your Spark
              <span className="material-symbols-outlined text-base">bolt</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
