import { groq } from 'next-sanity'

// Get all posts ordered by publication date
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    mainImage,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      description
    }
  }
`

// Get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    mainImage,
    body,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      description
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] {
    title,
    description
  }
`
