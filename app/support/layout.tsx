import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support | Spark Solar",
  description:
    "Get onboarding, billing, platform, lead-routing, and technical support for the Spark Solar growth platform.",
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
