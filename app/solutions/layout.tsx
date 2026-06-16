import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions | Spark Website",
  description:
    "Spark's architecture adapts to your role in solar—dealers, installers, brands, and full-service companies all grow on one platform.",
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
