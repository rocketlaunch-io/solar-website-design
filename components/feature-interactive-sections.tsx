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
