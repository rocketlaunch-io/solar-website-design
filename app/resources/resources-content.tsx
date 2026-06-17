'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Post } from "@/lib/sanity/mockData"
import { urlForImage } from "@/lib/sanity/image"

interface ResourcesContentProps {
  initialPosts: Post[]
}

export function ResourcesContent({ initialPosts }: ResourcesContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "SEO", "Conversion", "Sales", "Performance"]

  // Get image URL (dynamic Sanity URL or local fallback)
  const getImageUrl = (post: Post) => {
    if (post.mainImage) {
      const url = urlForImage(post.mainImage)
      if (url) return url
    }
    return post.mainImageLocal
  }

  // Filter posts based on category and search query
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.categories.some((cat) => cat.title.toLowerCase() === selectedCategory.toLowerCase())

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categories.some((cat) => cat.title.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // Set the first article as the featured article
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : []

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20 flex-grow">
        {/* Top Header Banner */}
        <section className="relative overflow-hidden py-16 md:py-24 border-b border-outline-variant/20 bg-gradient-to-b from-edge-navy to-edge-navy-deep text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar-amber/20 via-transparent to-transparent opacity-60" />
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-solar-amber/15 border border-solar-amber/30 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="material-symbols-outlined text-solar-amber text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>library_books</span>
                <span className="text-xs font-bold uppercase tracking-wider text-solar-amber">Spark Articles & Insights</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight">
                Curated <span className="text-solar-amber">Knowledge</span> for Solar Installers
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Expert tactics on SEO, conversion design, sales psychology, and high-performance engineering to build a $100M residential solar brand.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-solar-amber">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white ml-1">4.9/5 Rating</span>
                </div>
                <div className="h-4 w-px bg-slate-700" />
                <span className="text-sm">Trusted by 1,850+ solar dealers</span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel-dark p-6 rounded-xl border border-white/5 shadow-inner hover:border-solar-amber/30 transition-all duration-300">
                <span className="material-symbols-outlined text-solar-amber text-3xl mb-3">trending_up</span>
                <h3 className="text-2xl font-bold text-white">340%</h3>
                <p className="text-xs text-slate-400 mt-1">Average Conversion Lift in quote wizards.</p>
              </div>
              <div className="glass-panel-dark p-6 rounded-xl border border-white/5 shadow-inner hover:border-energy-emerald/30 transition-all duration-300">
                <span className="material-symbols-outlined text-energy-emerald text-3xl mb-3">speed</span>
                <h3 className="text-2xl font-bold text-white">&lt;1.5s</h3>
                <p className="text-xs text-slate-400 mt-1">LCP Target speed for edge solar pages.</p>
              </div>
              <div className="glass-panel-dark p-6 rounded-xl border border-white/5 shadow-inner hover:border-solar-amber/30 transition-all duration-300">
                <span className="material-symbols-outlined text-solar-amber text-3xl mb-3">map</span>
                <h3 className="text-2xl font-bold text-white">#1</h3>
                <p className="text-xs text-slate-400 mt-1">Local map rankings for targeted zip codes.</p>
              </div>
              <div className="glass-panel-dark p-6 rounded-xl border border-white/5 shadow-inner hover:border-energy-emerald/30 transition-all duration-300">
                <span className="material-symbols-outlined text-energy-emerald text-3xl mb-3">payments</span>
                <h3 className="text-2xl font-bold text-white">-66%</h3>
                <p className="text-xs text-slate-400 mt-1">Reduction in residential lead cost metrics.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Filter and Search Bar section */}
        <section className="py-8 bg-surface-container-low/50 sticky top-20 z-20 backdrop-blur-md border-b border-outline-variant/10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-6 justify-between items-center">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                      : "bg-surface-container-lowest text-muted-foreground hover:bg-surface-container hover:text-foreground border border-outline-variant/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xl">search</span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 md:py-20 max-w-[1400px] mx-auto px-4 md:px-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/60">
              <span className="material-symbols-outlined text-5xl text-muted-foreground mb-4">search_off</span>
              <h3 className="text-xl font-bold text-foreground">No articles found</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                We couldn't find any articles matching your filters. Try resetting search or checking another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-primary/95 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              
              {/* Featured Post Card (only displayed if search/category matches) */}
              {featuredPost && selectedCategory === "All" && searchQuery === "" && (
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                  <div className="lg:col-span-7 relative h-[300px] md:h-[450px] overflow-hidden">
                    <Image
                      src={getImageUrl(featuredPost)}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-solar-amber text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                        Featured Insight
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 md:p-10 flex flex-col gap-5">
                    <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                      <span className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full font-bold uppercase">
                        {featuredPost.categories[0]?.title}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.readingTime}</span>
                      <span>•</span>
                      <span>
                        {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground leading-tight hover:text-primary transition-colors">
                      <Link href={`/resources/${featuredPost.slug.current}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <hr className="border-outline-variant/30" />

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-outline-variant">
                          <Image
                            src={featuredPost.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground leading-none">{featuredPost.author.name}</h4>
                          <span className="text-xs text-muted-foreground">Author</span>
                        </div>
                      </div>

                      <Link
                        href={`/resources/${featuredPost.slug.current}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-solar-amber transition-colors group/btn"
                      >
                        Read Post
                        <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of articles */}
              <div>
                {selectedCategory === "All" && searchQuery === "" && (
                  <h3 className="text-xl font-bold text-foreground mb-8">Recent Insights</h3>
                )}
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {(selectedCategory === "All" && searchQuery === "" ? regularPosts : filteredPosts).map((post) => (
                    <article
                      key={post._id}
                      className="group flex flex-col bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={getImageUrl(post)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                            {post.categories[0]?.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow gap-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                          <span>{post.readingTime}</span>
                          <span>•</span>
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <h3 className="font-heading text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          <Link href={`/resources/${post.slug.current}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>

                        <hr className="border-outline-variant/30 mt-2" />

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-outline-variant">
                              <Image
                                src={post.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs font-bold text-foreground">{post.author.name}</span>
                          </div>

                          <Link
                            href={`/resources/${post.slug.current}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-solar-amber transition-colors group/smbtn"
                          >
                            Read
                            <span className="material-symbols-outlined text-base group-hover/smbtn:translate-x-0.5 transition-transform">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          )}
        </section>

        {/* Newsletter Call to Action */}
        <section className="py-16 md:py-24 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <div className="glass-panel max-w-4xl mx-auto rounded-3xl p-8 md:p-16 text-center flex flex-col gap-6 items-center shadow-lg border border-outline-variant/40 bg-white/70 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 h-40 w-40 bg-solar-amber/5 rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-energy-emerald/5 rounded-full filter blur-3xl" />

              <span className="material-symbols-outlined text-4xl text-solar-amber">mail_outline</span>
              
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Get Spark Insights Delivered Weekly
              </h2>
              
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
                Join residential solar operators who get our high-value newsletter on CRO testing, local map SEO hacks, interest-rate sales strategies, and speed engineering.
              </p>
              
              <form className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  required
                  className="flex-grow px-4 py-3 rounded-lg border border-outline-variant/40 bg-white text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-7 py-3 rounded-lg font-bold text-sm hover:bg-primary-foreground hover:bg-slate-900 transition-colors shadow-md shadow-primary/20"
                >
                  Subscribe
                </button>
              </form>
              <span className="text-xs text-muted-foreground">Zero spam. Unsubscribe with a single click at any time.</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
