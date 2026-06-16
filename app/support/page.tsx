import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Support() {
  const helpTopics = [
    {
      icon: "rocket_launch",
      title: "Launching your site",
      description: "Learn how to customize your Spark site, configure pages, and go live on the edge."
    },
    {
      icon: "dynamic_form",
      title: "Lead engine setup",
      description: "Configure the Multi-Step Quote Wizard, conditional logic, and intent scoring."
    },
    {
      icon: "sync_alt",
      title: "CRM integration",
      description: "Connect your CRM, map fields, and verify sub-200ms lead syncing."
    },
    {
      icon: "monitoring",
      title: "Analytics and attribution",
      description: "Track full-funnel performance and understand where your best leads come from."
    },
    {
      icon: "settings",
      title: "Account settings",
      description: "Update your profile, manage team access, and configure notifications."
    }
  ]

  const faqs = [
    {
      question: "How long does it take to launch my site?",
      answer: "Most Spark sites go live within 1 to 2 weeks. Our team handles the React architecture, edge deployment, and lead engine setup so you can focus on selling. For enterprise builds we provide a detailed timeline during your strategy call."
    },
    {
      question: "Can I migrate my existing leads and content?",
      answer: "Yes. We import existing leads, contacts, and content from most platforms including spreadsheets, WordPress, and other CRMs. We handle the migration securely so nothing is lost in the transition."
    },
    {
      question: "Do you integrate with my CRM?",
      answer: "We integrate with all major solar CRMs and sync verified leads in under 200ms with full attribution. If you use a system we do not currently support, let us know and we will architect a connection via the Spark API."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption for all data and follow strict security protocols. Your lead and customer information is never shared or sold, and you retain full ownership of your data."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support with premium response times. Growth plans and above receive priority support, and Enterprise plans include a dedicated growth strategist."
    }
  ]

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
                support_agent
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide">Concierge Support</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">assist</span> you?
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions or reach out to our concierge team.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full rounded-xl border border-outline-variant/30 bg-surface-container py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Topics */}
        <section className="py-16 sm:py-24 px-4 md:px-16">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
              Popular Help Topics
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {helpTopics.map((topic) => (
                <button
                  key={topic.title}
                  className="group flex items-start gap-4 rounded-xl glass-panel p-6 text-left transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{topic.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 px-4 md:px-16 bg-surface-container-lowest border-y border-outline-variant/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl glass-panel"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
                    {faq.question}
                    <span className="material-symbols-outlined text-muted-foreground transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support CTA */}
        <section className="py-16 sm:py-20 px-4 md:px-16">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Still need assistance?
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground mb-8">
              Our concierge team is here to ensure your success. Reach out and we will respond promptly.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/20 group"
            >
              Contact Concierge
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
