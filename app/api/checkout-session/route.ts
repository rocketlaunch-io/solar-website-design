import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    const { planName } = await request.json()

    if (!planName || (planName !== 'Business' && planName !== 'Scale')) {
      return NextResponse.json(
        { error: 'Invalid plan name. Must be Business or Scale.' },
        { status: 400 }
      )
    }

    // Determine host and protocol dynamically from headers
    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const appUrl = `${protocol}://${host}`

    // Check for Stripe environment variables
    const secretKey = process.env.STRIPE_SECRET_KEY
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    let monthlyPriceId = ''
    let setupPriceId = ''
    let leadPriceId = ''

    if (planName === 'Business') {
      monthlyPriceId = process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || ''
      setupPriceId = process.env.STRIPE_BUSINESS_SETUP_PRICE_ID || ''
      leadPriceId = process.env.STRIPE_BUSINESS_LEAD_PRICE_ID || ''
    } else {
      monthlyPriceId = process.env.STRIPE_SCALE_MONTHLY_PRICE_ID || ''
      setupPriceId = process.env.STRIPE_SCALE_SETUP_PRICE_ID || ''
      leadPriceId = process.env.STRIPE_SCALE_LEAD_PRICE_ID || ''
    }

    // Run in mock mode if keys or prices are missing
    const isMock =
      !secretKey || !publishableKey || !monthlyPriceId || !setupPriceId

    if (isMock) {
      console.log(
        `[Stripe Integration] Missing credentials or price IDs. Falling back to Mock checkout for plan: ${planName}`
      )
      return NextResponse.json({
        mock: true,
        url: `/pricing/checkout-mock?plan=${planName}`,
      })
    }

    // Initialize Stripe server SDK lazily
    const stripe = getStripeServer()

    // Build line items for real Stripe checkout
    // Both monthly subscription fee and setup fee are included
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price: monthlyPriceId,
        quantity: 1,
      },
      {
        price: setupPriceId,
        quantity: 1,
      },
    ]

    // Include the metered per-lead price if configured
    if (leadPriceId) {
      lineItems.push({
        price: leadPriceId,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'us_bank_account'],
      line_items: lineItems,
      subscription_data: {
        trial_period_days: 30,
      },
      allow_promotion_codes: true,
      success_url: `${appUrl}/pricing/success?plan=${planName}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing/cancel?plan=${planName}`,
      metadata: {
        planName,
      },
    })

    return NextResponse.json({ mock: false, url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
