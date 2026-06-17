import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = client ? imageUrlBuilder(client) : null

export function urlForImage(source: any) {
  if (!builder || !source) {
    return ''
  }
  return builder.image(source).url()
}
