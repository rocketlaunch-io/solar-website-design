import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPostBySlug, getPosts } from "@/lib/sanity/client"
import { urlForImage } from "@/lib/sanity/image"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60 // Revalidate cache every minute

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get image URL (dynamic Sanity URL or local fallback)
  const getImageUrl = (sourceImage: any, localFallback: string) => {
    if (sourceImage) {
      const url = urlForImage(sourceImage)
      if (url) return url
    }
    return localFallback
  }

  // Fetch all posts to recommend related articles (excluding the current one)
  const allPosts = await getPosts()
  const currentCategory = post.categories[0]?.title
  const relatedPosts = allPosts
    .filter((p) => p.slug.current !== post.slug.current && p.categories.some((c) => c.title === currentCategory))
    .slice(0, 3)

  // Custom components for rendering Portable Text (Sanity rich text blocks)
  const portableTextComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mt-10 mb-4 tracking-tight leading-tight">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mt-10 mb-4 pb-2 border-b border-outline-variant/30 tracking-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 tracking-tight">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 font-sans">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-solar-amber bg-surface-container-low/70 px-6 py-4 rounded-r-xl italic my-8 text-foreground font-medium shadow-inner">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 text-muted-foreground text-base md:text-lg flex flex-col gap-2.5">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 text-muted-foreground text-base md:text-lg flex flex-col gap-2.5">
          {children}
        </ol>
      ),
    },
    listItem: {
      normal: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
      em: ({ children }) => <em className="italic text-foreground">{children}</em>,
      code: ({ children }) => (
        <code className="bg-surface-container-high text-primary px-1.5 py-0.5 rounded font-mono text-sm font-semibold">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http") ? "_blank" : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-primary hover:text-solar-amber underline decoration-solar-amber/40 transition-colors font-semibold"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({ value }) => (
        <div className="relative my-10 aspect-video overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm">
          <Image
            src={urlForImage(value)}
            alt={value.alt || "Article illustration"}
            fill
            className="object-cover"
          />
          {value.alt && (
            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-4 py-2 text-xs text-white text-center">
              {value.alt}
            </div>
          )}
        </div>
      ),
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      <main className="pt-20 flex-grow">
        {/* Article Cover Banner */}
        <section className="relative overflow-hidden py-16 md:py-24 border-b border-outline-variant/10 bg-gradient-to-b from-edge-navy to-edge-navy-deep text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-solar-amber/10 via-transparent to-transparent opacity-60" />
          <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-10 flex flex-col gap-6">
            
            {/* Back to Resources and Category */}
            <div className="flex items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Insights
              </Link>
              <span className="text-slate-600">/</span>
              <span className="bg-solar-amber/15 border border-solar-amber/30 text-solar-amber px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {currentCategory}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={post.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-white">{post.author.name}</span>
              </div>
              <div className="h-3.5 w-px bg-slate-700" />
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="h-3.5 w-px bg-slate-700" />
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reader Layout */}
        <section className="py-12 md:py-20 max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Author Card (Sticky) */}
            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
              <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 bg-white/80 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-outline-variant">
                    <Image
                      src={post.author.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100"}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground leading-none">{post.author.name}</h3>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">Author</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>

                <hr className="border-outline-variant/20" />

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Share this Article</span>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-high text-foreground py-2 rounded-lg text-xs font-semibold border border-outline-variant/30 transition-colors">
                      Copy Link
                    </button>
                    <button className="flex-1 bg-surface-container hover:bg-surface-container-high text-foreground py-2 rounded-lg text-xs font-semibold border border-outline-variant/30 transition-colors">
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-solar-amber transition-colors px-2"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back to All Articles
              </Link>
            </aside>

            {/* Right Column: Article Rich Body Text */}
            <article className="lg:col-span-8 flex flex-col">
              {/* Featured main image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm mb-10">
                <Image
                  src={getImageUrl(post.mainImage, post.mainImageLocal)}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Render Portable Text Body */}
              <div className="prose max-w-none">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            </article>

          </div>
        </section>

        {/* Related articles recommendations */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-24 border-t border-outline-variant/20 bg-surface-container-low/30">
            <div className="max-w-[1400px] mx-auto px-4 md:px-12">
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-8 tracking-tight">
                More Insights on <span className="text-solar-amber">{currentCategory}</span>
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost._id}
                    className="group flex flex-col bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImageUrl(rPost.mainImage, rPost.mainImageLocal)}
                        alt={rPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow gap-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                        <span>{rPost.readingTime}</span>
                        <span>•</span>
                        <span>
                          {new Date(rPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/resources/${rPost.slug.current}`}>
                          {rPost.title}
                        </Link>
                      </h3>

                      <Link
                        href={`/resources/${rPost.slug.current}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-solar-amber transition-colors mt-2"
                      >
                        Read Post
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
