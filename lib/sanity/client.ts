import { createClient } from 'next-sanity'
import { mockPosts, Post } from './mockData'
import { postsQuery, postBySlugQuery } from './queries'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2026-06-16'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

export async function getPosts(): Promise<Post[]> {
  if (!client) {
    return mockPosts
  }
  try {
    const posts = await client.fetch<Post[]>(postsQuery)
    if (!posts || posts.length === 0) {
      return mockPosts
    }
    return posts
  } catch (error) {
    console.warn('Failed to fetch posts from Sanity, falling back to mock posts:', error)
    return mockPosts
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!client) {
    return mockPosts.find(p => p.slug.current === slug) || null
  }
  try {
    const post = await client.fetch<Post | null>(postBySlugQuery, { slug })
    if (!post) {
      return mockPosts.find(p => p.slug.current === slug) || null
    }
    return post
  } catch (error) {
    console.warn(`Failed to fetch post by slug "${slug}" from Sanity, falling back to mock:`, error)
    return mockPosts.find(p => p.slug.current === slug) || null
  }
}
