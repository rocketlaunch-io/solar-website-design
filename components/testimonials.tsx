const testimonials = [
  {
    quote:
      'Within 60 days our qualified leads more than doubled. The quote wizard does the filtering for us—my crew only talks to people ready to buy.',
    name: 'Marcus Webb',
    role: 'Owner, Sunline Solar',
    location: 'Phoenix, AZ',
    metric: '+118%',
    metricLabel: 'Qualified leads',
  },
  {
    quote:
      'The site loads instantly and ranks. We went from page three to the top of local search in a quarter. It paid for itself almost immediately.',
    name: 'Elena Rodriguez',
    role: 'Marketing Director, Bright Path Energy',
    location: 'Austin, TX',
    metric: 'Top 3',
    metricLabel: 'Local search rank',
  },
  {
    quote:
      'Leads land in our CRM before the homeowner closes the tab. The handoff is seamless and the attribution data is a game-changer for our ad spend.',
    name: 'David Chen',
    role: 'VP Growth, Helios Brands',
    location: 'Denver, CO',
    metric: '<200ms',
    metricLabel: 'CRM sync time',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 md:px-12 bg-surface-container-lowest border-y border-outline-variant/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Proven Results</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight mt-2 mb-3 text-balance">
            Solar Pros Are Scaling With Spark
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From single-crew installers to national brands, here&apos;s what high performance looks like in practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col bg-surface rounded-2xl border border-outline-variant/40 p-7 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex text-secondary mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-baseline gap-2 mt-6 mb-5 pb-5 border-b border-outline-variant/30">
                <span className="font-heading text-3xl font-extrabold text-energy-emerald font-mono">{t.metric}</span>
                <span className="text-xs text-muted-foreground">{t.metricLabel}</span>
              </div>

              <figcaption className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-primary text-sm">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
