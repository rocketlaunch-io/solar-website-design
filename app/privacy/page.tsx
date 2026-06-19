"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FaqAccordion } from "@/components/feature-interactive-sections"

// Preference type
interface PrivacySetting {
  id: string
  title: string
  description: string
  enabled: boolean
  required?: boolean
}

export default function PrivacyPage() {
  // Client-side mock privacy settings
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "essential",
      title: "Essential Core Storage",
      description: "Required for lead routing, portal sessions, and savings calculator storage. Cannot be disabled.",
      enabled: true,
      required: true
    },
    {
      id: "analytics",
      title: "Anonymous Telemetry & Speed Logs",
      description: "Collects aggregate load speeds and feature interaction heatmaps to optimize edge compute performance.",
      enabled: true
    },
    {
      id: "auto-purge",
      title: "Automatic Lead Deletion",
      description: "Prune homeowner contact files and solar proposals from edge databases 90 days after lead handoff.",
      enabled: false
    },
    {
      id: "marketing",
      title: "Third-Party Cookie Shield",
      description: "Block ad-network retargeting scripts and third-party tracking pixels globally.",
      enabled: true
    }
  ])

  const [notif, setNotif] = useState<string | null>(null)

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(s => {
        if (s.id === id && !s.required) {
          const newVal = !s.enabled
          // trigger mock notification
          setNotif(`Privacy Preference Updated: ${s.title} is now ${newVal ? "Enabled" : "Disabled"}`)
          setTimeout(() => setNotif(null), 3000)
          return { ...s, enabled: newVal }
        }
        return s
      })
    )
  }

  const detailedPolicies = [
    {
      question: "1. Information We Collect",
      answer: "We collect information you explicitly provide when utilizing our solar savings calculators or submitting lead captures. This includes name, email, phone number, monthly electric utility costs, and solar design preferences. We also capture anonymous connection parameters such as edge latency and screen sizes to improve calculator interfaces."
    },
    {
      question: "2. How We Use Your Data",
      answer: "Your information is used exclusively to evaluate solar installation savings, route qualified proposals to selected dealer networks, and personalize portal features. We do not use homeowner details for general marketing, nor do we combine your CRM records with third-party databases."
    },
    {
      question: "3. Third-Party Sharing Rules",
      answer: "Spark Solar maintains a zero-sharing policy with third-party ad brokers. Your homeowner leads are securely transferred directly to your designated CRM system (via encrypted CRM Bridge webhooks) and are never sold, rented, or distributed to outside networks."
    },
    {
      question: "4. Homeowner Consent & Deletion Rights",
      answer: "In compliance with CCPA and GDPR, homeowners retain full sovereignty over their records. You or your clients can request a full export of collected data or request permanent deletion of specific records at any time by contacting our compliance desk."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-24 flex-grow w-full pb-16">
        {/* Hero Section & Interactive Split */}
        <section className="relative px-4 md:px-12 max-w-[1400px] mx-auto mb-16 overflow-hidden">
          {/* Ambient decorative elements */}
          <div className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]" aria-hidden="true" />

          <div className="relative pt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
            {/* Title Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="material-symbols-outlined text-sm">shield</span>
                Data Sovereignty Guard
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight text-balance mb-6">
                Privacy Policy & <br />
                <span className="bg-gradient-to-r from-secondary to-solar-amber-bright bg-clip-text text-transparent">
                  Data Sovereignty
                </span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                We believe that solar dealers and homeowners should have complete authority over their data. Learn how we secure, process, and delete information across our Edge platform.
              </p>
              <p className="text-sm text-muted-foreground/75 italic">
                Last updated: June 19, 2026
              </p>
            </div>

            {/* Interactive Preference Card */}
            <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-solar-amber-bright" />
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">tune</span>
                  Local Privacy Dashboard
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mock simulator</span>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                {settings.map(s => (
                  <div
                    key={s.id}
                    className="flex justify-between items-start gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-outline-variant/60 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        {s.title}
                        {s.required && (
                          <span className="text-[9px] uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-bold">
                            Required
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{s.description}</p>
                    </div>

                    <button
                      onClick={() => toggleSetting(s.id)}
                      disabled={s.required}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        s.enabled ? "bg-energy-emerald" : "bg-outline-variant"
                      } ${s.required ? "opacity-50 cursor-not-allowed" : ""}`}
                      aria-label={`Toggle ${s.title}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          s.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Toast / Notification */}
              <div className="min-h-[32px] flex items-center justify-center">
                {notif ? (
                  <p className="text-xs font-semibold text-energy-emerald bg-energy-emerald/10 border border-energy-emerald/30 px-3 py-1.5 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {notif}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground/60">
                    Settings above simulate user privacy choices on local browser cookie storage.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 mb-16">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Our Core Privacy Commitments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "database",
                  title: "100% Data Sovereignty",
                  description: "Your dealer lead pipelines and calculator submissions belong strictly to you. We never utilize your data to train public models."
                },
                {
                  icon: "no_accounts",
                  title: "Zero Third-Party Sales",
                  description: "We do not sell, rent, or lease homeowner contact cards. Data transfers run solely to your authorized CRM endpoint."
                },
                {
                  icon: "cookie",
                  title: "Consent-Driven Design",
                  description: "Features respect user permissions by default. Homeowners explicitly opt-in before their energy figures are analyzed."
                },
                {
                  icon: "encrypted",
                  title: "Edge Storage Security",
                  description: "Stored data is tokenized and distributed globally across protected cloud clusters utilizing AES-256 standards."
                }
              ].map((p, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-surface border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-all duration-300 border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors">
                      {p.icon}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Policy Text Accordion */}
        <section className="px-4 md:px-12 max-w-[900px] mx-auto mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Formal Documentation</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">
              Privacy & Data Handling Clauses
            </h2>
          </div>
          <FaqAccordion faqs={detailedPolicies} />
        </section>

        {/* IT Compliance Request CTA */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">lock_open</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Request a Compliance Audit
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8">
                Need details on GDPR/CCPA coverage, custom data-retention schedules, or a signed Data Processing Agreement (DPA)? Get in touch with our IT team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Contact Privacy Officer
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/15"
                >
                  Open Support Ticket
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
