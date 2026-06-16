import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Resources() {
    const articles = [
    {
      title: "Why Core Web Vitals Decide Your Solar Lead Volume",
      category: "Performance",
      description: "How a sub-second, edge-delivered site converts more solar shoppers and what page speed really costs slow installers.",
      gradient: "from-primary/20 to-surface-container-high"
    },
    {
      title: "Engineering the Multi-Step Quote Wizard",
      category: "Conversion",
      description: "The psychology behind value-first qualification and why it lifts solar lead completion by over 340% versus static forms.",
      gradient: "from-surface-container-high to-secondary/30"
    },
    {
      title: "Winning the AI Search Era for Solar",
      category: "SEO",
      description: "How AI-first SEO architecture and programmatic local pages put solar brands in front of high-intent buyers first.",
      gradient: "from-secondary/30 to-surface-container"
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
                library_books
              </span>
              <span className="text-xs font-semibold text-primary tracking-wide">Industry Insights</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Knowledge</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed">
              Expert perspectives on performance, conversion, and SEO to help solar pros grow with a high-performance platform.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 sm:py-24 px-4 md:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.title}
                  className="group overflow-hidden rounded-xl glass-panel transition-all hover:-translate-y-1 duration-300"
                >
                  <div className={`h-48 bg-gradient-to-br ${article.gradient}`} />
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {article.category}
                    </span>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-foreground text-balance">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>
                    <Link 
                      href="#" 
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 group"
                    >
                      Read More
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16 rounded-xl glass-panel p-8 sm:p-12 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                Stay Ahead of the Curve
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join solar operators who get our curated newsletter on performance, conversion, and AI-era SEO strategy.
              </p>
              <form className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-sm rounded-lg border border-outline-variant/30 bg-surface-container px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
