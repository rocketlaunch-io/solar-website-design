"use client"

import { useMemo, useState } from "react"

// Roles a dealership would hire in-house to match Spark Grow's output.
const ROLES = [
  { id: "creative-director", label: "Creative Director", cost: 120000 },
  { id: "graphic-designer", label: "Graphic Designer", cost: 75000 },
  { id: "media-buyer", label: "Media Buyer", cost: 85000 },
  { id: "copywriter", label: "Copywriter", cost: 70000 },
]

// Spark Grow Launch plan annual cost and the overhead/tech multiplier applied
// to a fully in-house team (software stack, benefits, management tax).
const OVERHEAD_MULTIPLIER = 1.2
const SPARK_ANNUAL = 60000
const REVENUE_PER_LEAD = 95 // illustrative ad cost-per-lead used for the reinvestment line

export function GrowSavingsCalculator() {
  const [selected, setSelected] = useState<string[]>(ROLES.map((r) => r.id))

  const { inHouse, savings, leads } = useMemo(() => {
    const base = ROLES.filter((r) => selected.includes(r.id)).reduce((sum, r) => sum + r.cost, 0)
    const inHouse = Math.round(base * OVERHEAD_MULTIPLIER)
    const savings = Math.max(0, inHouse - SPARK_ANNUAL)
    const leads = Math.round(savings / REVENUE_PER_LEAD)
    return { inHouse, savings, leads }
  }, [selected])

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Role selection */}
      <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-6 md:p-8">
        <span className="text-secondary font-semibold text-xs uppercase tracking-wider mb-1 block">
          Enhanced // Stunning Fidelity
        </span>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Calculate Your Savings</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Select the roles you would need to hire in-house to match our output:
        </p>

        <div className="space-y-3">
          {ROLES.map((role) => {
            const active = selected.includes(role.id)
            return (
              <button
                key={role.id}
                onClick={() => toggle(role.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                  active
                    ? "border-secondary/60 bg-secondary/10"
                    : "border-outline-variant/40 bg-surface-container-low hover:border-outline-variant"
                }`}
                aria-pressed={active}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                      active ? "border-secondary bg-secondary text-secondary-foreground" : "border-outline-variant"
                    }`}
                  >
                    {active && (
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-medium text-foreground">{role.label}</span>
                </span>
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  ${role.cost.toLocaleString()}/yr
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl bg-edge-navy p-6 md:p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-white/50">In-House Cost</p>
            <p className="mt-1 font-heading text-2xl font-bold text-white">${inHouse.toLocaleString()}</p>
            <p className="mt-1 text-[11px] text-white/40">+20% overhead &amp; tech stack included</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium text-white/50">Spark Grow Cost</p>
            <p className="mt-1 font-heading text-2xl font-bold text-solar-amber-bright">
              ${SPARK_ANNUAL.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-white/40">Launch Plan (Annual)</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-energy-emerald/30 bg-energy-emerald/10 p-5">
          <p className="text-xs font-medium text-white/60">Total Annual Savings</p>
          <p className="mt-1 font-heading text-4xl font-bold text-energy-emerald">${savings.toLocaleString()}</p>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            That&apos;s enough to fund an additional{" "}
            <span className="font-semibold text-white">{leads.toLocaleString()} leads</span> or add 3-4 door knockers to
            your team.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3">
          {[
            { icon: "schedule", title: "Recruitment Friction", body: "42 days to fill a creative role. Spark Grow starts in 72 hours." },
            { icon: "manage_accounts", title: "Management Tax", body: "Managing a 4-person team takes ~10 hrs/week. We manage ourselves." },
            { icon: "group_off", title: "Employee Churn", body: "When a designer leaves, momentum stops. We provide 100% continuity." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
              <span className="material-symbols-outlined text-solar-amber-bright text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
