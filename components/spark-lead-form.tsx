'use client'

import { useState } from 'react'

const roofOptions = [
  { id: 'shingle', label: 'Shingle', icon: 'roofing' },
  { id: 'tile', label: 'Tile', icon: 'grid_view' },
  { id: 'metal', label: 'Metal', icon: 'layers' },
  { id: 'flat', label: 'Flat', icon: 'crop_square' },
]

const goalOptions = [
  { id: 'savings', label: 'Max Savings', icon: 'savings' },
  { id: 'green', label: 'Go Green', icon: 'eco' },
  { id: 'backup', label: 'Backup Power', icon: 'battery_charging_full' },
]

/**
 * A multi-step quote wizard styled like the Spark Form in the hero/lead-gen sections.
 */
export function SparkLeadForm() {
  const [step, setStep] = useState(0)
  const [roof, setRoof] = useState<string | null>(null)
  const [bill, setBill] = useState(180)
  const [goal, setGoal] = useState<string | null>(null)

  const savings = Math.round(bill * 12 * 25 * 0.8)

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xl overflow-hidden w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/30">
        <span className="font-heading font-bold text-foreground">Spark Form</span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= step ? 'w-6 bg-secondary' : 'w-3 bg-outline-variant/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 min-h-[280px] flex flex-col">
        {step === 0 && (
          <div className="flex-1">
            <p className="font-heading text-lg font-semibold text-foreground mb-4">What type of roof do you have?</p>
            <div className="grid grid-cols-2 gap-3">
              {roofOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRoof(opt.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    roof === opt.id
                      ? 'border-secondary bg-secondary/10'
                      : 'border-outline-variant/40 hover:border-secondary/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{opt.icon}</span>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex-1">
            <p className="font-heading text-lg font-semibold text-foreground mb-2">What is your monthly electric bill?</p>
            <p className="font-heading text-3xl font-bold text-secondary mb-6">${bill}</p>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full accent-secondary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$50</span>
              <span>$275</span>
              <span>$500+</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1">
            <p className="font-heading text-lg font-semibold text-foreground mb-4">What is your primary goal?</p>
            <div className="space-y-2">
              {goalOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${
                    goal === opt.id
                      ? 'border-secondary bg-secondary/10'
                      : 'border-outline-variant/40 hover:border-secondary/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{opt.icon}</span>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-energy-emerald/15 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-energy-emerald text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <p className="font-heading text-lg font-semibold text-foreground mb-1">Quote Ready!</p>
            <p className="text-sm text-muted-foreground mb-4">Estimated 25-year savings</p>
            <p className="font-heading text-4xl font-bold text-secondary mb-1 font-mono">${savings.toLocaleString()}</p>
            <span className="text-xs text-energy-emerald flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-sm">cloud_done</span>
              Synced to CRM in 42ms
            </span>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-5">
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {step === 2 ? 'Get My Quote' : 'Next Step'}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(0)
                setRoof(null)
                setGoal(null)
                setBill(180)
              }}
              className="w-full bg-surface-container-high text-foreground py-3 rounded-xl text-sm font-semibold hover:bg-surface-container-highest transition-colors"
            >
              Calculate Another
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
