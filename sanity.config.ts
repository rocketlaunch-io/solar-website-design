import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mock-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'spark_studio',
  title: 'Spark Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
