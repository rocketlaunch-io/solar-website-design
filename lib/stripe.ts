import Stripe from 'stripe'
import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js'

// Lazy server-side Stripe SDK initialization
let stripeInstance: Stripe | null = null

export const getStripeServer = (): Stripe => {
  if (!stripeInstance) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeSecretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is missing from environment variables.'
      )
    }
    stripeInstance = new Stripe(stripeSecretKey, {
      // Using a stable API version
      // @ts-ignore
      apiVersion: '2023-10-16',
      appInfo: {
        name: 'Spark Solar Website',
        version: '0.1.0',
      },
    })
  }
  return stripeInstance
}

// Client-side Stripe.js helper
let stripePromise: Promise<StripeClient | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    )
  }
  return stripePromise
}
