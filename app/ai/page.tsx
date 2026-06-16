import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Lead Engine | Spark Website",
  description:
    "Spark's psychology-backed AI lead engine qualifies solar buyers with a Multi-Step Quote Wizard and syncs verified leads to your CRM in under 200ms.",
}

const capabilities = [
  {
    icon: "psychology",
    title: "Psychology-Backed Qualification",
    description:
      "The Multi-Step Quote Wizard engages visitors with value-first questions, building commitment before ever asking for contact details.",
  },
  {
    icon: "account_tree",
    title: "Conditional Logic",
    description:
      "Real-time branching adapts each question to the visitor's roof type, ownership, and intent—so every lead arrives pre-qualified.",
  },
  {
    icon: "bolt",
    title: "Sub-200ms CRM Sync",
    description:
      "Verified leads are pushed to your CRM in under 200ms with full attribution, ready for instant follow-up.",
  },
  {
    icon: "insights",
    title: "Intent Scoring",
    description:
      "Spark scores every interaction so your sales team knows exactly which leads to call first.",
  },
]

const steps = [
  { step: "01", title: "Engage", text: "A friction-free wizard opens with a low-commitment, high-value question." },
  { step: "02", title: "Qualify", text: "Conditional logic adapts to each answer, filtering out tire-kickers." },
  { step: "03", title: "Convert", text: "Contact details are requested only after intent is established." },
  { step: "04", title: "Sync", text: "The verified lead lands in your CRM in under 200ms with full context." },
]

export default function AIPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-accent">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              Smart Lead Engine
            </span>
            <h1 className="mt-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Turn Traffic into Verified Leads.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Generic contact forms kill conversion. Spark&apos;s lead engine uses a psychology-backed Multi-Step Quote
              Wizard to engage users with value first—then hands verified data to your CRM in under 200ms.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Launch Your Spark
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
              <div className="bg-background px-4 py-6">
                <p className="font-sans text-3xl font-bold text-accent">+340%</p>
                <p className="mt-1 text-xs text-muted-foreground">Completion vs. static forms</p>
              </div>
              <div className="bg-background px-4 py-6">
                <p className="font-sans text-3xl font-bold text-accent">&lt;200ms</p>
                <p className="mt-1 text-xs text-muted-foreground">Lead-to-CRM time</p>
              </div>
              <div className="bg-background px-4 py-6">
                <p className="font-sans text-3xl font-bold text-accent">100%</p>
                <p className="mt-1 text-xs text-muted-foreground">Verified, scored leads</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center font-sans text-3xl font-bold tracking-tight text-foreground">
            Built to capture intent
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-center font-sans text-3xl font-bold tracking-tight text-foreground">
              How the engine works
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {steps.map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-background p-6">
                  <span className="font-sans text-2xl font-bold text-accent">{s.step}</span>
                  <h3 className="mt-3 font-sans text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Stop collecting clicks. Start collecting customers.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Launch Your Spark
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
