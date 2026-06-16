import Link from 'next/link'

const steps = [
  {
    num: '01',
    icon: 'design_services',
    title: 'Design & Build',
    desc: 'We architect a custom React site tuned to your brand—no templates, no plugins. Built for speed from the first line of code.',
  },
  {
    num: '02',
    icon: 'rocket_launch',
    title: 'Deploy to the Edge',
    desc: 'Your site ships to 300+ global edge nodes. Homeowners get sub-second loads served from the closest location.',
  },
  {
    num: '03',
    icon: 'bolt',
    title: 'Capture & Qualify',
    desc: 'The Multi-Step Quote Wizard engages visitors with value first, then verifies and scores each lead automatically.',
  },
  {
    num: '04',
    icon: 'sync_alt',
    title: 'Sync & Scale',
    desc: 'Validated leads hit your CRM in under 200ms with full attribution—so your team only ever works hot prospects.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-12 max-w-[1400px] mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-sm font-semibold text-secondary uppercase tracking-wider">From Launch to Lead Flow</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2 mb-3 text-balance">
          How Spark Works
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          A complete growth ecosystem deployed in weeks—not months. Every stage is engineered to compound your results.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Connecting line on large screens */}
        <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent" aria-hidden />

        {steps.map((step) => (
          <div key={step.num} className="relative">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-14 h-14 rounded-2xl bg-edge-navy flex items-center justify-center shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-secondary text-2xl">{step.icon}</span>
              </div>
              <span className="font-heading text-4xl font-extrabold text-outline-variant/40 font-mono">{step.num}</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/platform"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          See the full platform
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
