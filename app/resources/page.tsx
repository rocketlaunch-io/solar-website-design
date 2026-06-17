import { getPosts } from "@/lib/sanity/client"
import { ResourcesContent } from "./resources-content"

export const revalidate = 60 // Revalidate cache every minute

export default async function ResourcesPage() {
  const posts = await getPosts()

  return <ResourcesContent initialPosts={posts} />
}
