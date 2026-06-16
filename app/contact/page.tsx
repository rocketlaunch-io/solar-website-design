'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

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
                handshake
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide">Begin Partnership</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {"Let's Architect Your "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
              Have questions about our platform? Ready to scale your solar business? We are here to guide you through every step.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24 px-4 md:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="glass-panel rounded-xl p-8 sm:p-10">
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and our team will respond within one business day.
                </p>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold text-foreground">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your operation name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us about your vision and how we can help..."
                      required
                    />
                  </div>
                  
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Schedule Call Section */}
              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-accent/20 border border-primary/20 p-8 sm:p-10">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                  </div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground">
                    Schedule Your Consultation
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Book a complimentary 30-minute consultation with our team. We will understand your vision, 
                    answer your questions, and demonstrate how Spark can power your solar growth.
                  </p>
                  <Link 
                    href="https://cal.com/rocketlaunch/free-strategy-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group"
                  >
                    Schedule Consultation
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
                        hello@sparkwebsite.com
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
