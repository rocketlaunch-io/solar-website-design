import type { Metadata, Viewport } from 'next'
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Spark Studio',
}

export const viewport: Viewport = {
  ...studioViewport,
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#112240] text-white">
      {children}
    </div>
  )
}
