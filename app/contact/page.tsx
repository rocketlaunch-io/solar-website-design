'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SparkLeadWizard } from "@/components/spark-lead-wizard"

export default function Contact() {
  const [isAcceleratorApplication, setIsAcceleratorApplication] = useState(false)

  useEffect(() => {
    setIsAcceleratorApplication(new URLSearchParams(window.location.search).get("program") === "accelerator")
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 md:px-16 max-w-[1200px] mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-full w-fit border border-surface-container-highest mx-auto mb-6">
              <span 
                className="material-symbols-outlined text-primary text-sm" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isAcceleratorApplication ? "rocket_launch" : "handshake"}
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide">
                {isAcceleratorApplication ? "Accelerator Application" : "Begin Partnership"}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {isAcceleratorApplication ? (
                <>
                  Apply to the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Accelerator</span>
                </>
              ) : (
                <>
                  {"Let's Architect Your "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future</span>
                </>
              )}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
              {isAcceleratorApplication
                ? "Tell us about your solar company, market, traction, and growth goals. We use this application to evaluate fit for discounted Spark platform access."
                : "Have questions about our platform? Ready to scale your solar business? We are here to guide you through every step."}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24 px-4 md:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Interactive B2B Lead Wizard */}
              <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-xl border border-outline-variant/40 flex flex-col justify-between min-h-[520px]">
                <SparkLeadWizard theme="light" />
              </div>

              {/* Schedule Call Section */}
              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-accent/20 border border-primary/20 p-8 sm:p-10">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                  </div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    {isAcceleratorApplication ? "Prefer to Talk First?" : "Schedule Your Demo"}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {isAcceleratorApplication
                      ? "If you want to discuss fit before applying, book a short walkthrough with our team and we will help determine whether the Accelerator is the right path."
                      : "Book a complimentary 1-on-1 walkthrough with our engineers. We will show you how Spark Website’s high-performance edge platform can multiply your conversion rate."}
                  </p>
                  <Link 
                    href="/demo"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group"
                  >
                    Schedule a Demo
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>

                {/* Quick Contact Options */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl glass-panel p-6">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">mail</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Email Us
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        hello@solarwebsitedesign.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl glass-panel p-6">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">forum</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Live Concierge
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Available Monday to Friday, 9am to 6pm EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
