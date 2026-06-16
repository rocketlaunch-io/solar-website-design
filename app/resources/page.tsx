"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { HeroVisualFrame } from "@/components/hero-visual-frame"

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
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 border-b border-outline-variant/20 bg-surface-container-low/30">
          <WebGLShader />
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="material-symbols-outlined text-accent text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>library_books</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Industry Insights</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] tracking-tight text-balance">
                Curated <span className="text-secondary">Knowledge.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Expert perspectives on performance, conversion, and SEO to help solar pros grow with a high-performance platform.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#articles"
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-solar-amber-bright transition-all duration-300 shadow-lg shadow-secondary/30 hover:-translate-y-0.5"
                >
                  Read Articles
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-surface-container transition-all duration-300 border border-outline-variant/50"
                >
                  Back to Home
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground ml-1">4.9/5 rating</span>
                </div>
                <div className="h-4 w-px bg-outline-variant/50" />
                <span className="text-sm text-muted-foreground">Updated weekly</span>
              </div>
            </div>

            {/* Interactive Style Visual */}
            <HeroVisualFrame
              imageSrc="/images/solar-hero.png"
              altText="Curated Knowledge Insights Showcase"
              badgeText="New Articles"
              statsTitle="Articles Read"
              statsValue="1,850 reads"
              toastIcon="library_books"
              toastTitle="Insights Updated"
              toastBody="New case studies on solar CRO published"
              performanceLabel="Content Library"
              performanceValue="Updated"
            />
          </div>
        </section>

        {/* Articles Grid */}
        <section id="articles" className="py-16 sm:py-24 px-4 md:px-16">
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
              <form className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" onSubmit={(e) => e.preventDefault()}>
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
