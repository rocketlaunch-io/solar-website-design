import type { PlatformFeature } from "./platform-features"

export const archivedPlatformFeaturesData: PlatformFeature[] = [
  {
    slug: "spark-crm",
    icon: "contacts",
    title: "Spark CRM",
    tagline: "Zero Latency",
    shortDescription: "Instant lead ingestion and AI qualification workflows.",
    fullDescription:
      "Spark CRM provides instant lead ingestion and AI qualification workflows that filter tire-kickers from buyers. The website and your project management live in the same ecosystem, eliminating the data silos that leak leads and slow down your team.",
    benefit:
      "Native integrations sync leads and project data instantly. Your canvassers and reps manage leads directly from the field with a mobile-first hub.",
    detailedBenefits: [
      "Instant lead ingestion",
      "AI qualification workflows",
      "Mobile-first CRM hub for field reps",
      "Unified website + project data",
      "Bi-directional sync across modules",
    ],
    roiMetric: {
      value: "4.8",
      label: "App Store User Rating",
    },
    process: [
      { step: "01", title: "Unified Entry", description: "Consolidates website, chat, and phone leads in one pipeline." },
      { step: "02", title: "Workflow Rules", description: "Routes leads dynamically using customizable triggers." },
      { step: "03", title: "Field Updates", description: "Enables door-knocking logs and photo uploads from the field." },
      { step: "04", title: "Schedule Mapping", description: "Coordinates rep availability and schedules automatically." },
    ],
    specs: [
      { label: "Client Native", value: "React Native iOS/Android apps" },
      { label: "Offline Syncing", value: "Automatic local storage synchronization" },
      { label: "Auth Protocols", value: "Role-Based Access Control + SSO" },
      { label: "Custom Dashboards", value: "Drag-and-drop widget builder" },
    ],
    faqs: [
      { question: "Can we migrate our current leads database?", answer: "Yes, Spark CRM offers CSV and API import tools for easy data migration." },
      { question: "Does it support offline field canvassing?", answer: "Yes, field reps can log knocks offline, and data will sync once online." },
    ],
  },
]
