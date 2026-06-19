import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WebGLShader } from "@/components/ui/web-gl-shader"

export const metadata: Metadata = {
  title: "Support | Spark Solar",
  description:
    "Get onboarding, billing, platform, lead-routing, and technical support for the Spark Solar growth platform.",
}

const supportChannels = [
  {
    icon: "rocket_launch",
    title: "Launch Desk",
    description:
      "For onboarding, site launch, DNS, tracking setup, and go-live coordination.",
    response: "Same business day",
    href: "/contact",
  },
  {
    icon: "hub",
    title: "Platform Support",
    description:
      "Get help with Spark AI, quote flows, CRM routing, analytics, and integrations.",
    response: "Priority queue",
    href: "/contact",
  },
  {
    icon: "receipt_long",
    title: "Billing & Plans",
    description:
      "Questions about invoices, metered verified leads, plan changes, or payment methods.",
    response: "Within 1 business day",
    href: "/contact",
  },
]

const helpPaths = [
  {
    icon: "dynamic_form",
    title: "Lead engine",
    details: "Quote wizard behavior, TCPA consent, duplicate checks, and verified lead rules.",
  },
  {
    icon: "sync_alt",
    title: "CRM routing",
    details: "Field mapping, ownership rules, routing failures, webhook payloads, and retry logic.",
  },
  {
    icon: "monitoring",
    title: "Analytics",
    details: "Attribution, conversion events, campaign performance, and funnel reporting.",
  },
  {
    icon: "support_agent",
    title: "Voice agents",
    details: "Agent handoff, booking links, qualification scripts, call routing, and transcripts.",
  },
]

const launchChecklist = [
  "DNS and edge deployment verified",
  "Lead forms connected to CRM",
  "Calendar and voice agent handoff tested",
  "Billing meter and verified lead rules reviewed",
]

const faqs = [
  {
    question: "What is the fastest way to get support?",
    answer:
      "Use the support request form and choose the channel that matches your issue. Launch and revenue-blocking issues are routed ahead of general requests.",
  },
  {
    question: "How do verified lead billing questions work?",
    answer:
      "Send us the lead ID, customer email, or invoice reference. We can review the verification checks, meter event, billing timestamp, and any rejection reason.",
  },
  {
    question: "Can you help connect a new CRM?",
    answer:
      "Yes. Send the CRM name, target pipeline, required fields, and any API documentation you have. We will confirm whether it fits the standard connector path or needs custom integration work.",
  },
  {
    question: "Do you provide launch support for new markets?",
    answer:
      "Yes. We can help configure new service areas, localized landing pages, campaign tracking, lead routing, and reporting for each new solar market.",
  },
]

export default function Support() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-outline-variant/20 bg-surface-container-low/30 py-12 md:py-20">
          <WebGLShader />
          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 md:px-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col gap-6">
              <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance md:text-5xl lg:text-[3.5rem]">
                Support for every stage of <span className="text-secondary">solar growth.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Get help launching, routing leads, managing billing, and keeping the Spark Solar platform moving with your sales team.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-base font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-solar-amber-bright"
                >
                  Open Support Request
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-7 py-3.5 text-base font-semibold text-foreground transition-all duration-300 hover:bg-surface-container"
                >
                  Book a Walkthrough
                </Link>
              </div>

              <div className="grid max-w-xl grid-cols-2 gap-3 pt-3 sm:grid-cols-3">
                {[
                  ["Support status", "Online"],
                  ["Launch desk", "Mon-Fri"],
                  ["Priority issues", "Escalated"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest/80 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-outline-variant/30 bg-edge-navy shadow-2xl shadow-primary/15">
              <Image
                src="/images/solar-residential.png"
                alt="Solar support operations dashboard"
                fill
                priority
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-edge-navy via-edge-navy/88 to-primary/70" />

              <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-solar-amber-bright">Command Center</p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-white">Launch Readiness</h2>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-solar-amber text-edge-navy shadow-lg shadow-solar-amber/20">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </span>
                </div>

                <div className="grid gap-3">
                  {launchChecklist.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-md"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-energy-emerald text-edge-navy text-xs font-black">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold">{item}</span>
                      <span className="material-symbols-outlined ml-auto text-energy-emerald" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xs text-white/60">Avg. first response</p>
                    <p className="mt-1 font-heading text-2xl font-black text-white">2.4h</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-xs text-white/60">Platform uptime</p>
                    <p className="mt-1 font-heading text-2xl font-black text-white">99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-outline-variant/20 bg-surface-container-lowest px-4 py-16 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">Choose your support path</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Route your request to the team that can move fastest: launch, platform, or billing.
                </p>
              </div>
              <Link href="/contact" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-primary hover:text-secondary">
                Contact support
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {supportChannels.map((channel) => (
                <Link
                  key={channel.title}
                  href={channel.href}
                  className="group rounded-2xl border border-outline-variant/35 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-secondary/15 group-hover:text-secondary">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {channel.icon}
                      </span>
                    </span>
                    <span className="rounded-full border border-outline-variant/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {channel.response}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{channel.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors group-hover:text-secondary">
                    Start request
                    <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">Common help areas</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Spark support is organized around the operational systems solar teams use every day. Bring IDs, screenshots, target URLs, and CRM examples when possible so we can move quickly.
              </p>
              <div className="mt-8 rounded-2xl border border-solar-amber/30 bg-solar-amber/10 p-5">
                <p className="text-sm font-bold text-foreground">For urgent lead-routing issues</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Include the lead timestamp, customer email, destination CRM, and expected sales owner in your support request.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {helpPaths.map((path) => (
                <div key={path.title} className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {path.icon}
                    </span>
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{path.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/20 bg-surface-container-lowest px-4 py-16 md:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">Support FAQ</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Fast answers for the questions we hear most often from solar operators.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-outline-variant/35 bg-surface p-1 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-foreground">
                    {faq.question}
                    <span className="material-symbols-outlined text-muted-foreground transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl bg-edge-navy p-8 text-white shadow-2xl shadow-primary/10 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-tight">Need an engineer to look at it?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                  Share what is happening, where it is happening, and what changed. We will route it to the right Spark team and follow up with next steps.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3.5 text-sm font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-colors hover:bg-solar-amber-bright"
              >
                Create Ticket
                <span className="material-symbols-outlined text-base">bolt</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
