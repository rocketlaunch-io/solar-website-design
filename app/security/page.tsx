"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FaqAccordion } from "@/components/feature-interactive-sections"

// Security Console Tab interface
interface ConsoleTab {
  id: string
  title: string
  icon: string
  header: string
  description: string
  logs: { status: "success" | "info" | "warning"; text: string }[]
  metrics: { label: string; value: string }[]
}

const CONSOLE_TABS: ConsoleTab[] = [
  {
    id: "network",
    title: "Network & WAF",
    icon: "lan",
    header: "Edge Shield & Global DDoS Protection",
    description: "Every request to the Spark network is filtered at the edge. Our Web Application Firewall (WAF) mitigates malicious traffic, SQL injections, and DDoS threats before they ever touch your core solar databases.",
    logs: [
      { status: "info", text: "Initializing Edge Shield WAF rulesets..." },
      { status: "success", text: "OWASP Core Rule Set v3.3 actively parsing traffic" },
      { status: "success", text: "Global DDoS mitigation active across 180+ Edge nodes" },
      { status: "info", text: "IP rate limits enforced: 250 req/min threshold" },
      { status: "success", text: "Threat detection index: 0.00% anomaly rate" },
    ],
    metrics: [
      { label: "Mitigation Time", value: "< 10ms" },
      { label: "Edge Shield Latency", value: "14ms" },
      { label: "Blocked Threats (24h)", value: "100%" },
    ]
  },
  {
    id: "encryption",
    title: "Data Encryption",
    icon: "lock",
    header: "Bank-Grade Encryption Protocols",
    description: "Whether in transit across mobile sales networks or at rest in our distributed cloud data stores, all dealer and homeowner data is encrypted using industry-standard cryptography.",
    logs: [
      { status: "info", text: "Verifying TLS connection protocol..." },
      { status: "success", text: "TLS 1.3 Handshake established (Cipher: AES_256_GCM)" },
      { status: "success", text: "Sector-level storage encrypted with AES-256 keys" },
      { status: "info", text: "Rotating KMS cryptographic keys..." },
      { status: "success", text: "Database SSL/TLS client-certificate validation passed" },
    ],
    metrics: [
      { label: "Transit Cipher", value: "TLS 1.3" },
      { label: "Storage Standard", value: "AES-256" },
      { label: "Key Rotation", value: "90 Days" },
    ]
  },
  {
    id: "access",
    title: "Identity & IAM",
    icon: "admin_panel_settings",
    header: "Role-Based Access & Single Sign-On",
    description: "Govern exactly who gets access to lead metrics, proposal models, and CRM configurations. Enable Single Sign-On (SSO) and Multi-Factor Authentication (MFA) to lock down rep logins.",
    logs: [
      { status: "info", text: "Scanning IAM user roles..." },
      { status: "success", text: "MFA enforcement enabled for all administrative handles" },
      { status: "success", text: "SAML 2.0 / OIDC IdP connection verified" },
      { status: "info", text: "Generating JWT session tokens (RS256 signature)..." },
      { status: "success", text: "Access control audit log recorded to secure compliance vault" },
    ],
    metrics: [
      { label: "SSO Protocols", value: "SAML / OIDC" },
      { label: "Token Algorithm", value: "RS256" },
      { label: "Audit Log SLA", value: "Real-time" },
    ]
  },
  {
    id: "compliance",
    title: "Compliance & Audits",
    icon: "verified_user",
    header: "Certified Compliance & Penetration Testing",
    description: "Our systems and hosting physical infrastructure are verified by independent auditors. We undergo regular vulnerability testing and security posture audits to guarantee compliance.",
    logs: [
      { status: "info", text: "Loading system compliance profiles..." },
      { status: "success", text: "Physical hosting infrastructure: SOC 2 Type II certified" },
      { status: "success", text: "GDPR & CCPA client privacy rules verified in database schemas" },
      { status: "info", text: "Running static code analysis (SAST)..." },
      { status: "success", text: "Penetration testing: Clean record (June 2026 Audit)" },
    ],
    metrics: [
      { label: "SOC 2 Type II", value: "Compliant" },
      { label: "Penetration Frequency", value: "Bi-annual" },
      { label: "Vulnerability Scan", value: "Continuous" },
    ]
  }
]

const SECURITY_FAQS = [
  {
    question: "Where is Spark Solar's infrastructure hosted?",
    answer: "Our systems are deployed across Vercel's global edge network and AWS secure cloud infrastructure. Dynamic traffic routes dynamically through local edge nodes, guaranteeing that your application loads within milliseconds while benefiting from built-in edge-level security filters."
  },
  {
    question: "How is homeowner and lead data encrypted?",
    answer: "All data sent to our servers is encrypted in transit using TLS 1.3 (with fallback options to TLS 1.2) and encrypted at rest in our databases using AES-256 keys managed by KMS. Password hashes are salted and hashed using bcrypt to prevent offline credential attacks."
  },
  {
    question: "Are your platforms and partner databases SOC 2 compliant?",
    answer: "Yes, our hosting platforms and primary database systems are hosted on SOC 2 Type II certified data centers. We implement strict internal access rules, automated logging, and regular code scans to ensure security boundaries are maintained."
  },
  {
    question: "Does Spark store payment or billing information?",
    answer: "No. We process all payments and subscription bills through Stripe, a PCI-DSS Level 1 compliant payment provider. Spark Solar does not store or process raw credit card numbers on our infrastructure."
  },
  {
    question: "Can we configure Single Sign-On (SSO) for our sales reps?",
    answer: "Yes. Our Enterprise tier offers full integration with identity providers (IdPs) supporting SAML 2.0 and OIDC, including Okta, Azure AD, and Google Workspace, to streamline rep onboarding and enforce strict password rules."
  }
]

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<string>("network")
  const currentTab = CONSOLE_TABS.find((t) => t.id === activeTab) || CONSOLE_TABS[0]

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-24 flex-grow w-full pb-16">
        {/* Hero Section */}
        <section className="relative px-4 md:px-12 max-w-[1400px] mx-auto mb-16 overflow-hidden">
          {/* Ambient Security Glow */}
          <div className="pointer-events-none absolute top-12 left-1/3 -translate-x-1/2 w-96 h-96 rounded-full bg-energy-emerald/10 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-12 right-12 w-80 h-80 rounded-full bg-secondary/5 blur-[80px]" aria-hidden="true" />

          <div className="relative pt-8 pb-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-energy-emerald/10 border border-energy-emerald/30 text-energy-emerald text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-energy-emerald animate-pulse" />
              Active Edge Defense Status: Secured
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-foreground leading-tight tracking-tight text-balance mb-6">
              Enterprise-Grade <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-solar-amber-bright bg-clip-text text-transparent">
                Solar Tech Security
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              Protecting homeowner data, sales contracts, and proposal pipelines with zero-trust architecture, bank-grade encryption, and real-time edge mitigation.
            </p>
          </div>
        </section>

        {/* Interactive Security Console */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-xl overflow-hidden relative">
            
            {/* Ambient console highlights */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-energy-emerald/5 blur-3xl pointer-events-none" />

            {/* Sidebar Controls */}
            <div className="flex flex-col gap-2.5 z-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 mb-2">Security Console</h3>
              {CONSOLE_TABS.map((tab) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3.5 px-4 py-4 rounded-xl text-sm font-semibold transition-all text-left border ${
                      isActive
                        ? "bg-edge-navy text-white border-white/5 shadow-md"
                        : "bg-surface-container-low border-transparent text-muted-foreground hover:bg-surface-container-lowest hover:text-foreground"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl ${isActive ? "text-secondary" : "text-muted-foreground"}`}>
                      {tab.icon}
                    </span>
                    {tab.title}
                  </button>
                )
              })}
            </div>

            {/* Live Monitor Panel */}
            <div className="flex flex-col rounded-2xl bg-edge-navy border border-white/5 p-6 md:p-8 text-white min-h-[420px] justify-between shadow-2xl z-10 relative">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive/80" />
                  <span className="w-3 h-3 rounded-full bg-warning/80" />
                  <span className="w-3 h-3 rounded-full bg-success/80" />
                  <span className="text-xs text-white/40 font-mono ml-2">secure-edge-console // {currentTab.title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-energy-emerald font-semibold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
                  ONLINE
                </div>
              </div>

              {/* Console Body */}
              <div className="flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h4 className="font-heading text-xl md:text-2xl font-bold mb-3 tracking-tight text-white">
                    {currentTab.header}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-3xl">
                    {currentTab.description}
                  </p>
                </div>

                {/* Console Logs */}
                <div className="bg-black/45 rounded-xl p-4 font-mono text-[11px] md:text-xs leading-relaxed border border-white/5 space-y-2 mb-6">
                  {currentTab.logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-white/30 shrink-0">[{new Date().toLocaleDateString()} {16 + index}:00:00]</span>
                      {log.status === "success" && <span className="text-energy-emerald font-bold shrink-0">[OK]</span>}
                      {log.status === "info" && <span className="text-secondary font-bold shrink-0">[INFO]</span>}
                      {log.status === "warning" && <span className="text-warning font-bold shrink-0">[WARN]</span>}
                      <span className="text-white/80">{log.text}</span>
                    </div>
                  ))}
                </div>

                {/* Grid metrics */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {currentTab.metrics.map((m) => (
                    <div key={m.label} className="text-center md:text-left">
                      <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">{m.label}</p>
                      <p className="font-mono text-base md:text-lg font-bold text-secondary">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="py-16 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 mb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Zero-Trust Framework</span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mt-2">
                Pillars of the Spark Trust Model
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "verified_user",
                  title: "SOC 2 Verified Hosting",
                  desc: "All dynamic systems are hosted on AWS and Vercel data centers with top-tier physical security, disaster recovery, and perimeter controls."
                },
                {
                  icon: "swap_horiz",
                  title: "Encrypted Pipelines",
                  desc: "From rep tablets in the field to core databases, lead transactions run over TLS 1.3 connections and stay secured at rest with AES-256."
                },
                {
                  icon: "fingerprint",
                  title: "SSO & Identity Guards",
                  desc: "Enforce multi-factor authorization, centralize rep user directories, and assign granular role clearances to control access scopes."
                },
                {
                  icon: "policy",
                  title: "Privacy Compliance",
                  desc: "Spark Solar is strictly aligned with CCPA and GDPR data handling requirements, ensuring homeowner consent is respected natively."
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
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Stats Band */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="rounded-3xl bg-edge-navy py-10 px-6 md:px-12 text-white border border-white/5 relative overflow-hidden shadow-xl">
            <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divider-y sm:divider-y-0 sm:divider-x divider-white/10">
              {[
                { val: "99.99%", label: "Uptime Commitment" },
                { val: "< 15ms", label: "Global Edge Latency" },
                { val: "24/7", label: "System Posture Monitoring" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-heading text-4xl md:text-5xl font-black text-secondary leading-none tracking-tight">
                    {stat.val}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 mt-2">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security FAQs */}
        <section className="px-4 md:px-12 max-w-[900px] mx-auto mb-20">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-secondary">security</span>
            Security & Trust FAQs
          </h2>
          <FaqAccordion faqs={SECURITY_FAQS} />
        </section>

        {/* Vulnerability Reporting CTA */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">gavel</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Found a Vulnerability?
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8">
                We believe in responsible security research and disclosure. If you discover an issue in our ecosystem, please notify our response desk directly.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Report a Security Flaw
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/15"
                >
                  Ask our IT Desk
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
