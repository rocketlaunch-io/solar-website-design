import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import Stripe from 'stripe'

// Prisma 7 and Next.js Route Handlers require standard Node.js runtime for raw request parsing
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const stripe = getStripeServer()
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    console.error('[Stripe Webhook ERROR] Missing signature or webhook secret configuration.')
    return NextResponse.json({ error: 'Webhook Secret or Signature is missing.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const rawBody = await request.text()
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err: any) {
    console.error(`[Stripe Webhook ERROR] Signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  console.log(`[Stripe Webhook] Received event type: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const stripeCustomerId = session.customer as string
        const subscriptionId = session.subscription as string
        const planTier = (session.metadata?.planName || 'Business').toLowerCase()
        const email = session.customer_details?.email || 'unknown@sparkdealer.com'
        const companyName = session.customer_details?.name || session.customer_details?.company || 'Spark Dealer'

        console.log(`[Stripe Webhook] Handling checkout.session.completed for customer: ${email}, plan: ${planTier}`)

        // 1. Fetch the subscription items if present to find the metered price item
        let subscriptionItemId: string | null = null
        if (subscriptionId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId)
            const meteredItem = sub.items.data.find(
              (item) => item.price.recurring?.usage_type === 'metered'
            )
            if (meteredItem) {
              subscriptionItemId = meteredItem.id
              console.log(`[Stripe Webhook] Found metered subscription item: ${subscriptionItemId}`)
            }
          } catch (subErr) {
            console.error('[Stripe Webhook] Error fetching subscription details:', subErr)
          }
        }

        // 2. Create or update the Customer record in the database
        const dbCustomer = await prisma.customer.upsert({
          where: { stripeCustomerId },
          update: {
            email,
            companyName,
            planTier,
            subscriptionId,
            subscriptionItemId,
            status: 'active',
          },
          create: {
            stripeCustomerId,
            email,
            companyName,
            planTier,
            subscriptionId,
            subscriptionItemId,
            status: 'active',
          },
        })

        console.log(`[Stripe Webhook] DB Customer created/updated with ID: ${dbCustomer.id}`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string
        const stripeStatus = subscription.status

        // Map Stripe status to simplified database status
        // active -> active
        // past_due, unpaid, suspended -> paused
        // canceled, incomplete, incomplete_expired -> cancelled
        let simplifiedStatus = 'active'
        if (['past_due', 'unpaid'].includes(stripeStatus)) {
          simplifiedStatus = 'paused'
        } else if (['canceled', 'incomplete_expired'].includes(stripeStatus)) {
          simplifiedStatus = 'cancelled'
        }

        console.log(`[Stripe Webhook] Handling customer.subscription.updated. Status: ${stripeStatus} -> mapped to DB: ${simplifiedStatus}`)

        await prisma.customer.updateMany({
          where: { stripeCustomerId },
          data: {
            status: simplifiedStatus,
            subscriptionId: subscription.id,
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string

        console.log(`[Stripe Webhook] Handling customer.subscription.deleted. Marking customer as cancelled.`)

        await prisma.customer.updateMany({
          where: { stripeCustomerId },
          data: {
            status: 'cancelled',
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const stripeCustomerId = invoice.customer as string

        console.warn(`[Stripe Webhook WARNING] Invoice payment failed for customer ${stripeCustomerId}. Pausing lead usage.`)

        await prisma.customer.updateMany({
          where: { stripeCustomerId },
          data: {
            status: 'paused',
          },
        })
        break
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('[Stripe Webhook ERROR] Failed to process webhook event:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed. Internal server error.' },
      { status: 500 }
    )
  }
}
