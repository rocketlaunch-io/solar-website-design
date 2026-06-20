"use client"

import { useState } from "react"

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 items-center bg-surface-container-low rounded-3xl p-6 md:p-10 border border-outline-variant/30">
      {/* Steps List */}
      <div className="flex flex-col gap-3">
        {steps.map((item, idx) => (
          <button
            key={item.step}
            onClick={() => setActiveStep(idx)}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
              idx === activeStep
                ? "bg-surface-container-lowest border-secondary shadow-md scale-[1.02]"
                : "bg-transparent border-transparent hover:bg-surface-container-lowest/50"
            }`}
          >
            <span className={`font-heading font-black text-xl leading-none px-2.5 py-1.5 rounded-lg ${
              idx === activeStep ? "bg-secondary text-secondary-foreground" : "bg-primary/5 text-primary"
            }`}>
              {item.step}
            </span>
            <div className="min-w-0">
              <h3 className={`font-heading font-bold text-base md:text-lg leading-tight transition-colors ${
                idx === activeStep ? "text-foreground" : "text-foreground/80"
              }`}>
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {item.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Active Step Panel */}
      <div className="relative rounded-2xl bg-edge-navy p-8 text-white min-h-[220px] flex flex-col justify-center overflow-hidden border border-white/5 shadow-inner">
        {/* ambient glow background */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
              Phase {steps[activeStep].step}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-energy-emerald animate-pulse" />
            <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">Active Stream</span>
          </div>

          <h4 className="font-heading text-2xl font-bold text-white tracking-tight">
            {steps[activeStep].title}
          </h4>

          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen 
                ? "bg-surface-container-low border-secondary/50 shadow-sm" 
                : "bg-surface-container-lowest border-outline-variant/40 hover:border-outline-variant"
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
            >
              <span className="font-heading font-bold text-foreground text-sm md:text-base leading-snug">
                {faq.question}
              </span>
              <span className={`material-symbols-outlined text-xl text-secondary transition-transform duration-300 shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}>
                keyboard_arrow_down
              </span>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-40 border-t border-outline-variant/20" : "max-h-0"
            }`}>
              <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DigitalCardSpotlight() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success" | "portal">("idle")
  const [activeTab, setActiveTab] = useState<"field" | "contact" | "attrib" | "bill">("field")

  const handleStartScan = () => {
    setScanState("scanning")
    setTimeout(() => {
      setScanState("success")
    }, 1500)
  }

  const handleReset = () => {
    setScanState("idle")
  }

  const tabsInfo = {
    field: {
      title: "In-Field Scanning",
      icon: "qr_code_scanner",
      desc: "Reps pull up their business card on their mobile home screen with one tap. Homeowners scan the high-contrast QR code with their default camera app in seconds.",
    },
    contact: {
      title: "Instant vCard Sync",
      icon: "contact_phone",
      desc: "One click on 'Add to Contacts' automatically packs and downloads Marcus's VCF contact card, saving his direct line and portal link directly into the customer's phone book.",
    },
    attrib: {
      title: "100% Lead Attribution",
      icon: "link",
      desc: "The QR code embeds rep-specific UTM variables. Every page visit, utility bill upload, and lead submission from that scan is 100% attributed to the rep in the CRM.",
    },
    bill: {
      title: "Utility Bill Capture",
      icon: "upload_file",
      desc: "Once redirected to the rep's co-branded portal, homeowners can immediately drag and drop a copy of their utility bill for a customized proposal.",
    },
  }

  return (
    <section className="py-16 px-4 md:px-12 bg-surface-container-low/50 border-t border-outline-variant/30 mb-16 relative overflow-hidden">
      {/* Style element for scanner animation */}
      <style>{`
        @keyframes scan-line-move {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line-move 2s infinite linear;
        }
      `}</style>

      {/* ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/20">
            Spotlight Feature
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mt-4 mb-4">
            Digital Solar Business Card
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Equip your reps with an interactive, scan-to-save solar card. Replace paper cards with a high-converting digital gateway that binds leads to reps instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
          {/* Left Column: Feature Tabs & Explanations */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Built for High-Velocity Field Sales
            </h3>
            
            <div className="flex flex-col gap-3">
              {(Object.keys(tabsInfo) as Array<keyof typeof tabsInfo>).map((key) => {
                const info = tabsInfo[key]
                const isActive = activeTab === key
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                      isActive
                        ? "bg-surface border-secondary shadow-md scale-[1.01]"
                        : "bg-surface-container-lowest/60 border-transparent hover:border-outline-variant/30 hover:bg-surface-container-lowest"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-secondary text-secondary-foreground" : "bg-primary/5 text-primary"
                    }`}>
                      <span className="material-symbols-outlined text-xl">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {info.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Interactive Scanning Mockup */}
          <div className="bg-edge-navy border border-white/5 rounded-3xl p-6 md:p-8 text-white min-h-[460px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Header / Simulator status */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-energy-emerald animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Attribution Simulator</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-[10px] text-secondary hover:text-solar-amber-bright flex items-center gap-1 font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">replay</span>
                Reset
              </button>
            </div>

            {/* Main Interactive Screen Area */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 py-4">
              
              {/* Phone 1: Rep's Card Screen */}
              <div className="w-[180px] h-[320px] rounded-[24px] bg-[#0c1424] border-4 border-white/10 p-3 flex flex-col justify-between relative shadow-lg overflow-hidden shrink-0">
                {/* Speaker/Camera bar */}
                <div className="w-16 h-4 bg-white/10 rounded-full mx-auto -mt-2 mb-2 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>

                <div className="text-center flex-1 flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[7px] uppercase font-black text-secondary tracking-widest">Digital Card</span>
                    <h5 className="text-[11px] font-bold mt-0.5 leading-none">Marcus Thompson</h5>
                    <p className="text-[7px] text-white/50">Senior Solar Advisor</p>
                  </div>

                  {/* QR Code Container */}
                  <div className="relative my-2 mx-auto bg-white p-1.5 rounded-lg border border-white/5 shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#0c1424]" aria-hidden="true">
                      <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                      <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />
                      <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                      <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                      <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />
                      <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                      <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />
                      <rect x="35" y="35" width="30" height="30" fill="currentColor" rx="4" />
                      <rect x="40" y="40" width="20" height="20" fill="white" rx="2" />
                      <svg x="43" y="43.8" width="14" height="12.4" viewBox="0 0 192 170" className="text-secondary fill-current animate-pulse" aria-hidden="true">
                        <path d="M57.024,0l-3.04,0c-4.297,0 -8.268,2.295 -10.424,6.024l-41.935,72.538c-2.169,3.751 -2.169,8.38 0,12.131l40.546,70.139l-1.582,-32.281c-0.014,-0.294 0.063,-0.584 0.194,-0.848c0.9,-1.81 0.841,-3.964 -0.18,-5.73l-21.589,-37.345l33.196,-57.423l17.865,30.087l-14.207,24.689c-1.076,1.87 -1.076,4.174 0,6.045l14.429,25.075l-24.307,40.937l0.16,0.095l-3.978,6.699l1.388,2.4c2.156,3.729 6.127,6.024 10.424,6.024l83.892,0c4.297,0 8.268,-2.295 10.424,-6.024l40.199,-69.537l-27.536,17.893c-0.243,0.158 -0.527,0.237 -0.817,0.259c-1.976,0.146 -3.765,1.26 -4.768,2.995l-20.973,36.28l-65.644,0l17.5,-29.473l27.652,0c2.153,0 4.142,-1.152 5.218,-3.023l14.347,-24.931l55.021,0l1.736,-3.002c2.168,-3.751 2.168,-8.38 0,-12.131l-41.934,-72.538c-2.156,-3.729 -6.127,-6.024 -10.424,-6.024l-80.852,0l29.792,14.97c0.257,0.129 0.468,0.333 0.632,0.57c1.12,1.618 2.965,2.594 4.947,2.594l42.01,0l33.198,57.427l-34.558,0l-13.914,-24.179c-1.076,-1.871 -3.065,-3.023 -5.218,-3.023l-28.103,0l-24.292,-40.911l-0.053,0.032l-4.441,-7.48Z" />
                      </svg>

                    </svg>
                    
                    {/* Scanner line animation overlays */}
                    {scanState === "scanning" && (
                      <div className="absolute left-0 right-0 h-0.5 bg-energy-emerald shadow-lg shadow-energy-emerald/80 animate-scan-line" />
                    )}
                  </div>

                  <div className="bg-white/5 rounded-md p-1.5 text-left text-[8px] leading-tight">
                    <p className="text-white/60">Phone: (602) 555-0199</p>
                    <p className="text-white/60 mt-0.5">Email: marcus.t@spark.dealer</p>
                  </div>
                </div>

                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-2" />
              </div>

              {/* Arrow Indicator in between */}
              <div className="hidden md:flex flex-col items-center gap-1 text-secondary animate-pulse shrink-0">
                <span className="material-symbols-outlined text-2xl rotate-90 md:rotate-0">qr_code_scanner</span>
                <span className="text-[8px] uppercase tracking-wider font-bold font-mono">Scan Flow</span>
              </div>

              {/* Phone 2: Homeowner's Scan Experience */}
              <div className="w-[180px] h-[320px] rounded-[24px] bg-[#0c1424] border-4 border-white/10 p-3 flex flex-col justify-between relative shadow-lg overflow-hidden shrink-0">
                {/* Speaker/Camera bar */}
                <div className="w-16 h-4 bg-white/10 rounded-full mx-auto -mt-2 mb-2 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>

                {/* Switchable Homeowner Screens based on scanState */}
                <div className="flex-grow flex flex-col justify-between items-center text-center py-2 h-full">
                  {scanState === "idle" && (
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <span className="text-[7px] text-white/50 uppercase tracking-wider block">Homeowner Camera</span>
                      <div className="my-auto flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-white/40">
                          <span className="material-symbols-outlined text-xl">photo_camera</span>
                        </div>
                        <p className="text-[9px] text-white/70 px-2 leading-relaxed">
                          Position camera over the rep's QR code.
                        </p>
                        <button
                          type="button"
                          onClick={handleStartScan}
                          className="bg-secondary text-secondary-foreground text-[9px] font-bold px-3 py-1.5 rounded-lg hover:bg-solar-amber-bright transition-colors shadow cursor-pointer"
                        >
                          Simulate Scan
                        </button>
                      </div>
                      <div className="text-[7px] text-white/30">Default Camera App</div>
                    </div>
                  )}

                  {scanState === "scanning" && (
                    <div className="flex-grow flex flex-col justify-center items-center w-full">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary relative">
                        <span className="material-symbols-outlined text-xl animate-spin">qr_code_scanner</span>
                      </div>
                      <p className="text-[9px] text-white/80 mt-3 font-mono">
                        Analyzing QR Code...
                      </p>
                    </div>
                  )}

                  {scanState === "success" && (
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <span className="text-[7px] text-white/50 uppercase tracking-wider block">Lock Screen Alert</span>
                      
                      {/* Interactive slide-down push notification */}
                      <button
                        type="button"
                        onClick={() => setScanState("portal")}
                        className="my-auto mx-1 p-2.5 rounded-xl bg-white text-edge-navy text-left shadow-lg border border-white/20 hover:scale-[1.02] transition-transform text-balance focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 192 170" className="w-3.5 h-3.5 text-secondary fill-current shrink-0" aria-hidden="true">
                            <path d="M57.024,0l-3.04,0c-4.297,0 -8.268,2.295 -10.424,6.024l-41.935,72.538c-2.169,3.751 -2.169,8.38 0,12.131l40.546,70.139l-1.582,-32.281c-0.014,-0.294 0.063,-0.584 0.194,-0.848c0.9,-1.81 0.841,-3.964 -0.18,-5.73l-21.589,-37.345l33.196,-57.423l17.865,30.087l-14.207,24.689c-1.076,1.87 -1.076,4.174 0,6.045l14.429,25.075l-24.307,40.937l0.16,0.095l-3.978,6.699l1.388,2.4c2.156,3.729 6.127,6.024 10.424,6.024l83.892,0c4.297,0 8.268,-2.295 10.424,-6.024l40.199,-69.537l-27.536,17.893c-0.243,0.158 -0.527,0.237 -0.817,0.259c-1.976,0.146 -3.765,1.26 -4.768,2.995l-20.973,36.28l-65.644,0l17.5,-29.473l27.652,0c2.153,0 4.142,-1.152 5.218,-3.023l14.347,-24.931l55.021,0l1.736,-3.002c2.168,-3.751 2.168,-8.38 0,-12.131l-41.934,-72.538c-2.156,-3.729 -6.127,-6.024 -10.424,-6.024l-80.852,0l29.792,14.97c0.257,0.129 0.468,0.333 0.632,0.57c1.12,1.618 2.965,2.594 4.947,2.594l42.01,0l33.198,57.427l-34.558,0l-13.914,-24.179c-1.076,-1.871 -3.065,-3.023 -5.218,-3.023l-28.103,0l-24.292,-40.911l-0.053,0.032l-4.441,-7.48Z" />
                          </svg>
                          <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-wider leading-none">Spark Link</span>
                        </div>
                        <h6 className="text-[9px] font-extrabold text-foreground mt-1.5 leading-none">
                          spark.dealer/rep/marcus-t
                        </h6>
                        <p className="text-[8px] text-muted-foreground mt-1 leading-normal">
                          Rep portal loaded. Tap to view Marcus's co-branded landing page.
                        </p>
                        <div className="mt-2 text-right text-[7px] font-bold text-secondary flex items-center justify-end gap-0.5">
                          <span>Open Portal</span>
                          <span className="material-symbols-outlined text-[8px]">arrow_forward</span>
                        </div>
                      </button>

                      <p className="text-[8px] text-secondary animate-pulse">
                        Click notification to open portal
                      </p>
                    </div>
                  )}

                  {scanState === "portal" && (
                    <div className="flex-grow flex flex-col justify-between w-full text-left bg-surface text-foreground rounded-lg p-2.5 overflow-y-auto scrollbar-none h-[180px]">
                      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5 mb-2">
                        <span className="text-[7px] font-bold text-secondary font-mono">Welcome Portal</span>
                        <span className="text-[7px] text-energy-emerald bg-energy-emerald/10 border border-energy-emerald/30 px-1 rounded font-bold">
                          Attributed
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mb-2 bg-surface-container-low p-1.5 rounded border border-outline-variant/30">
                        <div className="w-5 h-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-[7px]">
                          MT
                        </div>
                        <div>
                          <p className="text-[8px] font-bold leading-none text-foreground">Marcus Thompson</p>
                          <p className="text-[6px] text-muted-foreground">Your Assigned Advisor</p>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-1.5 justify-center py-1">
                        <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant/20">
                          <h6 className="text-[8px] font-bold leading-tight text-foreground">Request Design</h6>
                          <p className="text-[6px] text-muted-foreground mt-0.5">Submit details for a co-branded solar roof preview.</p>
                          <div className="mt-1.5 flex gap-1">
                            <div className="flex-1 h-3 rounded bg-surface-container border border-outline-variant/30" />
                            <div className="w-6 h-3 rounded bg-secondary" />
                          </div>
                        </div>

                        <div className="bg-secondary/5 border border-secondary/20 p-2 rounded">
                          <h6 className="text-[8px] font-bold leading-tight text-secondary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[9px]">upload_file</span>
                            Fast-Track Upload
                          </h6>
                          <p className="text-[6px] text-muted-foreground mt-0.5">Drop your Scottsdale utility bill PDF to calculate offsets.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full bg-edge-navy hover:bg-edge-navy/90 text-white text-[8px] font-bold py-1.5 rounded text-center transition-all mt-1 cursor-pointer"
                      >
                        Scan Another Card
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-2" />
              </div>

            </div>

            {/* Bottom notification */}
            <div className="border-t border-white/10 pt-3 mt-4 text-center flex items-center justify-center gap-1.5 text-[9px] text-white/55">
              <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
              Attribution variable (utm_source=door-qr) binds to the homeowner's session.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

