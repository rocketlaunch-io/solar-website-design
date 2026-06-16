"use client"

import { useState } from "react"

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: "What does \"hour-based\" actually mean for my deliverables?",
    a: "Instead of buying a fixed list of deliverables, you fund a dedicated pool of production hours each month. We then deploy those hours against whatever creates the most ROI for you right now — more ads one month, a full video shoot the next. The average output shown per tier is illustrative of a typical month.",
  },
  {
    q: "Are all services really included on every tier?",
    a: "Yes. Strategy, paid media, SEO, design, video, CRM automation, email, social, and direct mail are accessible on Ignite, Accelerate, and Lightspeed alike. The tier only sets how much monthly capacity you have — never which services you can touch.",
  },
  {
    q: "How quickly can we get started?",
    a: "Onboarding takes 72 hours. You meet your dedicated account and creative leads, we sync into your CRM and ad accounts, and we present a custom 90-day blueprint before launching your first campaigns.",
  },
  {
    q: "Can I change tiers or focus later?",
    a: "Absolutely. You can scale your capacity up or down between tiers as your needs change, and you re-set your creative focus every month. There are no long-term lock-ins.",
  },
  {
    q: "What if I need more than Lightspeed offers?",
    a: "We build custom capacity plans for national operators who need more than 200 hours per month. Reach out and we'll scope a bespoke arrangement.",
  },
]

export function GrowFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto divide-y divide-outline-variant/30 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-semibold text-foreground">{item.q}</span>
              <span
                className={`material-symbols-outlined flex-shrink-0 text-secondary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                add
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
