import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import VoiceAgentSimulator from "@/components/voice-agent-simulator"
import { FaqAccordion } from "@/components/feature-interactive-sections"

export const metadata: Metadata = {
  title: "AI Voice Agents | Spark Website",
  description:
    "Deploy hyper-realistic AI voice agents that qualify residential solar leads, handle utility net-metering objections, and schedule appointments on your calendar 24/7.",
}

const detailedCapabilities = [
  {
    icon: "speed",
    title: "Sub-500ms Vocal Latency",
    description: "Built on ElevenLabs Conversational WebRTC, our agents respond with natural breathing pauses, eliminating awkward voicebot delays."
  },
  {
    icon: "account_tree",
    title: "Objection Script Guardrails",
    description: "Answers tough utility questions about net metering, roof shading, cash vs. loan, and the 30% federal tax credit with perfect script fidelity."
  },
  {
    icon: "calendar_today",
    title: "Direct Calendar Handoff",
    description: "Integrates natively with Cal.com and HubSpot to book homeowners directly onto your reps' schedules during the live conversation."
  },
  {
    icon: "sync_alt",
    title: "Instant CRM Injection",
    description: "Every call triggers an automated post-call summary, intent classification score, and complete text transcript synced to your CRM in real time."
  },
  {
    icon: "public",
    title: "Multilingual Competency",
    description: "Natively speaks English, Spanish, and over 20 other languages with authentic local accent models matching your sales territories."
  },
  {
    icon: "phone_forwarded",
    title: "Live Rep Hot Transfer",
    description: "If a homeowner requests a human, the agent performs a warm transfer to your office line or active sales representative instantly."
  }
]

const processTimeline = [
  {
    step: "01",
    phase: "Lead Capture & Dispatch",
    description: "Homeowner submits a form on your site or an ad. Spark CRM Bridge processes inputs and dispatches the outbound voice caller in under 5 seconds."
  },
  {
    step: "02",
    phase: "Context & Shading Check",
    description: "The AI agent initiates the call in a warm, human voice. It references the homeowner's local utility rates and Google Solar satellite data."
  },
  {
    step: "03",
    phase: "Interactive Qualification",
    description: "The agent answers questions about pricing, shade patterns, and monthly savings, filtering out non-owners and unqualified leads."
  },
  {
    step: "04",
    phase: "Booking & Pipeline Sync",
    description: "Once qualified, the agent locks in a time slot on your rep's calendar and sends a text confirmation. Call logs are pushed directly into Salesforce/HubSpot."
  }
]

const technicalSpecs = [
  { label: "Voice API Framework", value: "ElevenLabs Conversational API + WebRTC" },
  { label: "Transcription Engine", value: "Whisper v3 (High-Fidelity Audio-to-Text)" },
  { label: "Objection Handling Scripting", value: "Custom Prompting + Vector Database Overlays" },
  { label: "Simultaneous Call Capacity", value: "Up to 100 concurrent streams per territory" },
  { label: "CRM Sync Time", value: "< 2.5 seconds post-call completion" },
  { label: "Live Handoff Support", value: "SIP trunk routing and call forwarding enabled" },
]

const faqs = [
  {
    question: "Do the voice agents really sound like actual humans?",
    answer: "Yes. Using advanced speech synthesis and neural vocal modeling, the agents mimic realistic human cadence, including breath pauses, slight hesitation, and vocal inflections. In testing, over 90% of homeowners did not realize they were speaking with an AI agent during the qualification phase."
  },
  {
    question: "How long does it take to deploy a custom voice agent?",
    answer: "Standard solar qualification scripts can be configured and live in under 48 hours. If you require deep custom API integrations, specific custom voice cloning, or highly specialized local utility objection databases, deployment typically takes 5 to 7 business days."
  },
  {
    question: "What happens if a customer asks a question the AI doesn't know?",
    answer: "Our agents operate within strict guardrails. If a homeowner asks a question outside the model's knowledge base, the agent politely handles the limitation (e.g., 'That is a great engineering question, let me get our Arizona specialist Marcus on the line to explain that') and initiates a hot transfer to your reps or office line."
  },
  {
    question: "Is call recording compliant with local laws?",
    answer: "Absolutely. Spark's Voice Agent module features automatic call disclosure consent compliance. Before qualifying homeowners, the agent states that the call is recorded for quality, or you can configure localized single-party consent rules based on state-by-step regulations."
  }
]

export default function VoiceAgentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-24 flex-grow w-full pb-16">
        {/* Breadcrumb & Hero */}
        <section className="relative px-4 md:px-12 max-w-[1400px] mx-auto mb-16 overflow-hidden">
          {/* Ambient background glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
          
          <div className="relative">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/platform" className="hover:text-secondary transition-colors">Platform</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-foreground">Voice Agents</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-edge-navy flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg">
                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      support_agent
                    </span>
                  </div>
                  <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/20">
                    24/7 Sales Force
                  </span>
                </div>
                
                <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-foreground leading-[1.15] tracking-tight text-balance mb-6">
                  Your 24/7 AI <span className="text-secondary">Sales & Support Agent.</span>
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                  Deploy hyper-realistic AI callers that qualify residential solar leads, resolve complex utility net-metering objections, and book consultation appointments directly into your sales calendars.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                  >
                    Deploy Your Agent
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <a
                    href="#simulator"
                    className="inline-flex items-center gap-2 bg-surface-container-low text-foreground px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors duration-300 border border-outline-variant/40"
                  >
                    Try the Simulator
                  </a>
                </div>

                {/* Micro Stats Row */}
                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-outline-variant/30 pt-8 max-w-md">
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">0s</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Response Delay</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">100+</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Concurrent Calls</p>
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">&lt;500ms</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Vocal Latency</p>
                  </div>
                </div>
              </div>

              {/* Call Simulator Section */}
              <div id="simulator" className="relative scroll-mt-28">
                <VoiceAgentSimulator />
              </div>
            </div>
          </div>
        </section>

        {/* High-Impact ROI Banner */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="relative rounded-3xl bg-edge-navy p-8 md:p-12 text-white border border-white/5 overflow-hidden shadow-2xl shadow-primary/10">
            {/* ambient glow */}
            <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
            <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 items-center">
              {/* Stat Column */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                <span className="font-heading text-6xl md:text-7xl font-black bg-gradient-to-r from-secondary to-solar-amber-bright bg-clip-text text-transparent leading-none tracking-tight">
                  10x
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/55 mt-2">
                  Speed-to-Lead Multiplier
                </span>
              </div>

              {/* Value Statement Column */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-secondary mb-3">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_objects</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Key Business Impact</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                  Eliminate lead decay and capture sales on autopilot
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  A lead that waits 5 minutes to receive a call cools off by over 10x. By dispatching a conversational AI voice caller within 5 seconds of form submission—day or night—Spark guarantees you contact homeowners first, securing the appointment before your competitors even wake up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Capabilities Grid */}
        <section className="py-20 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30 mb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Product Features</span>
              <h2 className="font-heading text-3xl font-bold text-foreground mt-2">
                Engineered for Residential Solar Operations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detailedCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-surface border border-outline-variant/40 hover:border-secondary/60 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-all duration-300 border border-outline-variant/30">
                    <span
                      className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary transition-colors"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {cap.icon}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works (Timeline Process Flow) */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Step-by-Step Flow</span>
            <h2 className="font-heading text-3xl font-bold text-foreground mt-2">
              How the Agent Orchestrates Leads
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              From the instant a prospect clicks submit to booking the appointment on your reps' calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processTimeline.map((item, idx) => (
              <div key={idx} className="relative rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 flex flex-col justify-between">
                <div>
                  <span className="font-heading text-3xl font-black text-secondary/30">{item.step}</span>
                  <h4 className="font-heading text-lg font-bold text-foreground mt-3 mb-2">{item.phase}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
                <div className="border-t border-outline-variant/30 mt-6 pt-4 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
                  <span>Phase {item.step}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Showcase & Live widget notice */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-20">
          <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-low/40 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                Live Demonstration
              </span>
              <h3 className="font-heading text-2xl font-bold text-foreground mt-4 mb-4">
                Want to speak with the agent live right now?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                We have deployed the active voice agent on a WebRTC channel. Look at the bottom-right corner of your screen: tap the floating microphone button to start a real voice call directly in your browser.
              </p>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 text-xs">
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-sm">settings_voice</span>
                  Microphone access required
                </p>
                <p className="text-muted-foreground mt-1 leading-normal">
                  The voice widget uses standard audio permissions to stream WebRTC bytes to ElevenLabs. Speak naturally, answer its qualification script, or test its tax credit objections.
                </p>
              </div>
            </div>
            <div className="relative min-h-[320px] rounded-2xl overflow-hidden border border-outline-variant/30 bg-edge-navy">
              <Image
                src="/public/images/solar-residential.png"
                alt="AI Voice Agent Control Panel Mockup"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-edge-navy via-edge-navy/95 to-slate-900" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                <h4 className="font-heading text-lg font-bold flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  Agent Live Status: Ready
                </h4>
                <div className="space-y-2 text-xs font-mono text-white/70">
                  <p className="text-secondary">&gt; Connecting to Scottsdale Utility Rates db...</p>
                  <p className="text-green-400">&gt; WebRTC Voice Tunnel Ready (agent_8001k25b)</p>
                  <p>&gt; Audio format: Opus mono (24kHz)</p>
                  <p>&gt; Custom clone: "Adam" (Warm conversational tone)</p>
                </div>
                <div className="mt-8 p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] leading-relaxed">
                  <p className="text-white font-semibold">Prompt guidelines:</p>
                  <p className="text-white/50 mt-0.5">Simply ask: "I'm busy, how much does solar cost?" or try telling the agent you rent the home and see it explain the landlord approval guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs & FAQ Table */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-start mb-20">
          {/* Tech Specs */}
          <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
              Technical Specs
            </h3>
            <div className="flex flex-col">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-outline-variant/30 text-xs last:border-b-0">
                  <span className="text-muted-foreground font-semibold">{spec.label}</span>
                  <span className="text-foreground font-bold font-mono text-right pl-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>help_center</span>
              Frequently Asked Questions
            </h3>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-12 max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl bg-edge-navy p-12 md:p-16 overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
                Deploy Your AI Qualifier Today.
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Never lose a lead to slow response times. Let Spark AI handle phone qualifications while your elite sales team closes deals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-colors duration-300 shadow-lg shadow-secondary/30"
                >
                  Get Started
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/15"
                >
                  Explore Other Modules
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
