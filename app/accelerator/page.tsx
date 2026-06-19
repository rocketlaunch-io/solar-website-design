import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { WebGLShader } from "@/components/ui/web-gl-shader"

export const metadata: Metadata = {
  title: "Spark Solar Accelerator Program | Spark Website",
  description:
    "A discounted application-based program for startup and early-stage solar companies that need the full Spark platform to launch, learn, and scale.",
}

const platformIncludes = [
  {
    icon: "bolt",
    title: "Launch-Ready Website Platform",
    body: "A high-performance solar website foundation with conversion-focused pages, speed-first architecture, and the core lead journey already mapped.",
  },
  {
    icon: "dynamic_form",
    title: "Lead Generation Engine",
    body: "Quote flows, intake logic, lead routing, and homeowner qualification patterns designed for early markets that need every inquiry to count.",
  },
  {
    icon: "psychology",
    title: "Spark AI Tooling",
    body: "AI-assisted qualification, content support, and automation pathways that help a small team operate with more leverage from day one.",
  },
  {
    icon: "sync_alt",
    title: "CRM & Analytics Foundation",
    body: "Lead handoff, pipeline visibility, reporting, and growth signals so founders can understand what is working before scaling spend.",
  },
]

const fitSignals = [
  "You are a startup or early-stage solar company with a live sales motion.",
  "You have a defined service territory and a serious plan to win it.",
  "You need the full Spark platform, but startup cash flow matters.",
  "You can commit to implementation, feedback, and active growth work.",
]

const selectionSteps = [
  {
    step: "01",
    title: "Apply",
    body: "Tell us about your market, current traction, team, and growth goals so we can understand the stage you are in.",
  },
  {
    step: "02",
    title: "Review",
    body: "We evaluate fit, urgency, service territory, and whether the Spark platform can create immediate leverage.",
  },
  {
    step: "03",
    title: "Accelerate",
    body: "Accepted teams receive discounted platform access, launch support, and a growth roadmap built around early-stage execution.",
  },
]

export default function AcceleratorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-outline-variant/20 bg-surface-container-low/30 pt-28 pb-16 md:pt-36 md:pb-24">
          <WebGLShader />
          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 md:px-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col gap-6">
              <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
                Spark Solar Accelerator Program
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Built for startup and early-stage solar companies ready to grow with the full Spark platform at a discounted partner rate. No public pricing, no stripped-down package, just the operating system you need to launch stronger.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact?program=accelerator"
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition-all duration-300 hover:bg-solar-amber-bright hover:-translate-y-0.5"
                >
                  Apply to the Accelerator
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <a
                  href="#included"
                  className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-7 py-3.5 text-base font-semibold text-foreground transition-all duration-300 hover:bg-surface-container"
                >
                  See what is included
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-secondary/15 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
                <Image
                  src="/images/pricing-solar-home.png"
                  alt="Solar home and growth platform visual for early-stage solar companies"
                  width={1200}
                  height={800}
                  priority
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-edge-navy/90 p-5 text-white shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-solar-amber-bright">Application Track</p>
                      <p className="mt-2 font-heading text-2xl font-bold">Full Platform Access</p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:px-12" id="included">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  The same platform, shaped for the startup stage.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  The Accelerator is not a lightweight starter kit. Accepted companies get access to the core Spark platform so their first serious growth system is the one they can keep scaling.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {platformIncludes.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-outline-variant/40 bg-card p-6 shadow-sm">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/30 bg-edge-navy px-4 py-20 text-white md:px-12">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
                Built for early-stage solar teams with real momentum.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65">
                We reserve Accelerator seats for companies where platform leverage can change the trajectory quickly. The program is selective because the support is hands-on.
              </p>
            </div>

            <div className="space-y-3">
              {fitSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="material-symbols-outlined mt-0.5 text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <p className="text-sm leading-relaxed text-white/80">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                How selection works
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The application process is designed to confirm fit quickly and make sure every accepted team has a clear path to launch.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {selectionSteps.map((item) => (
                <div key={item.step} className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-7">
                  <p className="font-mono text-sm font-bold text-secondary">{item.step}</p>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 md:px-12">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-14">
            <h2 className="mx-auto max-w-3xl font-heading text-3xl font-extrabold tracking-tight md:text-5xl">
              Apply for discounted platform access.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
              Tell us where you are now and where you are trying to go. If the program is a fit, we will map the fastest path to launch your Spark growth system.
            </p>
            <Link
              href="/contact?program=accelerator"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all duration-200 hover:bg-solar-amber-bright hover:-translate-y-0.5"
            >
              Apply to the Accelerator
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
