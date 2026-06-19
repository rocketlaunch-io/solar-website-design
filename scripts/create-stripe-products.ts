import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'

// Simple .env / .env.local loader for CLI execution
const envLocalPath = path.resolve(process.cwd(), '.env.local')
const envPath = path.resolve(process.cwd(), '.env')
const loadEnv = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8')
    content.split('\n').forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=')
        if (idx > 0) {
          const key = trimmed.substring(0, idx).trim()
          const value = trimmed
            .substring(idx + 1)
            .trim()
            .replace(/^['"]|['"]$/g, '')
          process.env[key] = value
        }
      }
    })
  }
}
loadEnv(envPath)
loadEnv(envLocalPath)

const secretKey = process.env.STRIPE_SECRET_KEY
if (!secretKey) {
  console.error(
    'ERROR: STRIPE_SECRET_KEY is not defined in your environment (check .env.local).'
  )
  process.exit(1)
}

const stripe = new Stripe(secretKey, {
  // @ts-ignore
  apiVersion: '2023-10-16',
})

async function main() {
  console.log('Connecting to Stripe and fetching existing products...')

  // 1. Get or create Billing Meter for Verified Leads
  console.log('Checking for verified_lead billing meter...')
  const meters = await stripe.billing.meters.list({ limit: 100 })
  let leadMeter = meters.data.find((m) => m.event_name === 'verified_lead')
  if (!leadMeter) {
    console.log('Creating verified_lead billing meter...')
    leadMeter = await stripe.billing.meters.create({
      display_name: 'Verified Leads',
      event_name: 'verified_lead',
      customer_mapping: {
        type: 'by_id',
        event_payload_key: 'stripe_customer_id',
      },
      default_aggregation: {
        formula: 'sum',
      },
    })
  }
  console.log(`Billing Meter: ${leadMeter.display_name} (${leadMeter.id})`)

  // Find or create Business Plan
  let businessProduct: Stripe.Product
  const products = await stripe.products.list({ limit: 100 })

  const existingBusiness = products.data.find(
    (p) => p.name === 'Spark Business Plan'
  )
  if (existingBusiness) {
    console.log('Found existing Spark Business Plan product.')
    businessProduct = existingBusiness
  } else {
    console.log('Creating Spark Business Plan product...')
    businessProduct = await stripe.products.create({
      name: 'Spark Business Plan',
      description:
        'Edge Architecture (Sub-second React 19 Core), Bespoke Design, Lead Gen Engine, Solar Calculator, CRM Bridge, AI-First SEO',
      metadata: {
        tier: 'business',
      },
    })
  }

  // Get or create prices for Business
  const businessPrices = await stripe.prices.list({
    product: businessProduct.id,
  })

  let businessMonthlyPrice = businessPrices.data.find(
    (p) =>
      p.recurring?.interval === 'month' &&
      p.recurring?.usage_type === 'licensed'
  )
  if (!businessMonthlyPrice) {
    console.log('Creating Business Monthly Price ($1,000/mo)...')
    businessMonthlyPrice = await stripe.prices.create({
      product: businessProduct.id,
      currency: 'usd',
      unit_amount: 100000, // $1000.00
      recurring: {
        interval: 'month',
        usage_type: 'licensed',
      },
    })
  }

  let businessSetupPrice = businessPrices.data.find(
    (p) => p.type === 'one_time' && p.unit_amount === 500000
  )
  if (!businessSetupPrice) {
    console.log('Creating Business Setup Fee Price ($5,000)...')
    businessSetupPrice = await stripe.prices.create({
      product: businessProduct.id,
      currency: 'usd',
      unit_amount: 500000, // $5000.00
    })
  }

  let businessLeadPrice = businessPrices.data.find(
    (p) =>
      p.recurring?.interval === 'month' &&
      p.recurring?.usage_type === 'metered' &&
      p.recurring?.meter === leadMeter!.id
  )
  if (!businessLeadPrice) {
    console.log('Creating Business Per-Lead Metered Price ($20/lead)...')
    businessLeadPrice = await stripe.prices.create({
      product: businessProduct.id,
      currency: 'usd',
      unit_amount: 2000, // $20.00
      recurring: {
        interval: 'month',
        usage_type: 'metered',
        meter: leadMeter.id,
      },
    })
  }

  // Find or create Scale Plan
  let scaleProduct: Stripe.Product
  const existingScale = products.data.find((p) => p.name === 'Spark Scale Plan')
  if (existingScale) {
    console.log('Found existing Spark Scale Plan product.')
    scaleProduct = existingScale
  } else {
    console.log('Creating Spark Scale Plan product...')
    scaleProduct = await stripe.products.create({
      name: 'Spark Scale Plan',
      description:
        'All Business Features, plus Spark AI, Spark CRM, Local SEO Engine, Performance Analytics, Voice Agents, Spark API',
      metadata: {
        tier: 'scale',
      },
    })
  }

  // Get or create prices for Scale
  const scalePrices = await stripe.prices.list({ product: scaleProduct.id })

  let scaleMonthlyPrice = scalePrices.data.find(
    (p) =>
      p.recurring?.interval === 'month' &&
      p.recurring?.usage_type === 'licensed'
  )
  if (!scaleMonthlyPrice) {
    console.log('Creating Scale Monthly Price ($5,000/mo)...')
    scaleMonthlyPrice = await stripe.prices.create({
      product: scaleProduct.id,
      currency: 'usd',
      unit_amount: 500000, // $5000.00
      recurring: {
        interval: 'month',
        usage_type: 'licensed',
      },
    })
  }

  let scaleSetupPrice = scalePrices.data.find(
    (p) => p.type === 'one_time' && p.unit_amount === 1000000
  )
  if (!scaleSetupPrice) {
    console.log('Creating Scale Setup Fee Price ($10,000)...')
    scaleSetupPrice = await stripe.prices.create({
      product: scaleProduct.id,
      currency: 'usd',
      unit_amount: 1000000, // $10000.00
    })
  }

  let scaleLeadPrice = scalePrices.data.find(
    (p) =>
      p.recurring?.interval === 'month' &&
      p.recurring?.usage_type === 'metered' &&
      p.recurring?.meter === leadMeter!.id
  )
  if (!scaleLeadPrice) {
    console.log('Creating Scale Per-Lead Metered Price ($15/lead)...')
    scaleLeadPrice = await stripe.prices.create({
      product: scaleProduct.id,
      currency: 'usd',
      unit_amount: 1500, // $15.00
      recurring: {
        interval: 'month',
        usage_type: 'metered',
        meter: leadMeter.id,
      },
    })
  }

  console.log('\n==================================================')
  console.log('STRIPE SEEDING COMPLETED SUCCESSFULLY!')
  console.log('==================================================\n')
  console.log('Copy the following Price/Meter IDs into your .env.local file:\n')
  console.log(`STRIPE_LEAD_METER_ID=${leadMeter.id}\n`)
  console.log(`STRIPE_BUSINESS_MONTHLY_PRICE_ID=${businessMonthlyPrice.id}`)
  console.log(`STRIPE_BUSINESS_SETUP_PRICE_ID=${businessSetupPrice.id}`)
  console.log(`STRIPE_BUSINESS_LEAD_PRICE_ID=${businessLeadPrice.id}\n`)
  console.log(`STRIPE_SCALE_MONTHLY_PRICE_ID=${scaleMonthlyPrice.id}`)
  console.log(`STRIPE_SCALE_SETUP_PRICE_ID=${scaleSetupPrice.id}`)
  console.log(`STRIPE_SCALE_LEAD_PRICE_ID=${scaleLeadPrice.id}\n`)
}

main().catch((err) => {
  console.error('Error seeding Stripe products:', err)
  process.exit(1)
})
