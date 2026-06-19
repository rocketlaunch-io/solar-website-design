import { getStripeServer } from './stripe'

/**
 * Report a verified lead as a Stripe Billing Meter Event.
 * Uses the modern stripe.billing.meterEvents.create API (Stripe 2024/2025 standard).
 * 
 * @param stripeCustomerId Stripe customer ID to bill
 * @param leadId Lead ID (used as event identifier for idempotency)
 * @param value The value of the event (defaults to 1 verified lead)
 * @returns Stripe event identifier or null on error
 */
export async function reportVerifiedLead(
  stripeCustomerId: string,
  leadId: string,
  value: number = 1
): Promise<string | null> {
  try {
    // Fallback to mock behavior if Stripe secret key is not configured
    if (!process.env.STRIPE_SECRET_KEY) {
      const mockEventId = `mock_evt_${Math.random().toString(36).substring(2, 11)}`
      console.log(`[Stripe Billing MOCK] Simulating lead billing event. Customer: ${stripeCustomerId}, Lead: ${leadId}, Event ID: ${mockEventId}`)
      return mockEventId
    }

    const stripe = getStripeServer()

    // Send the meter event to Stripe
    const event = await stripe.billing.meterEvents.create({
      event_name: 'verified_lead',
      payload: {
        stripe_customer_id: stripeCustomerId,
        value: value.toString(),
      },
      // Using leadId as the event identifier ensures Stripe handles this idempotently
      // and won't double-charge if the event is reported multiple times.
      identifier: `lead_${leadId}`,
    })

    console.log(`[Stripe Meter Event] Successfully reported verified lead. Event identifier: ${event.identifier}`)
    return event.identifier
  } catch (error: any) {
    console.error('[Stripe Meter Event ERROR] Failed to report verified lead usage to Stripe:', error)
    return null
  }
}

/**
 * Fetch usage summaries for a specific customer from the Stripe Billing Meter.
 * 
 * @param stripeCustomerId Stripe customer ID
 * @param meterId The Stripe Billing Meter ID (falls back to process.env.STRIPE_LEAD_METER_ID)
 */
export async function getCustomerUsageSummary(
  stripeCustomerId: string,
  meterId?: string
): Promise<{ totalLeads: number; periodStart: string; periodEnd: string } | null> {
  try {
    // Fallback to mock behavior if Stripe secret key is not configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log(`[Stripe Billing MOCK] Simulating usage summary for customer: ${stripeCustomerId}`)
      return {
        totalLeads: 14,
        periodStart: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
        periodEnd: new Date().toISOString(),
      }
    }

    const stripe = getStripeServer()
    const targetMeterId = meterId || process.env.STRIPE_LEAD_METER_ID

    if (!targetMeterId) {
      console.warn('[Stripe Usage Warning] STRIPE_LEAD_METER_ID env variable is not configured.')
      return null
    }

    // List event summaries for the given customer on this meter
    const summaries = await stripe.billing.meters.listEventSummaries(targetMeterId, {
      customer: stripeCustomerId,
      limit: 10,
    })

    // Sum up the values from summaries
    let total = 0
    let periodStart = new Date().toISOString()
    let periodEnd = new Date().toISOString()

    if (summaries.data.length > 0) {
      total = summaries.data.reduce((acc, curr) => acc + (parseFloat(curr.aggregated_value) || 0), 0)
      
      // Get min and max timestamps
      const startTimes = summaries.data.map(s => s.start_time)
      const endTimes = summaries.data.map(s => s.end_time)
      periodStart = new Date(Math.min(...startTimes) * 1000).toISOString()
      periodEnd = new Date(Math.max(...endTimes) * 1000).toISOString()
    }

    return {
      totalLeads: total,
      periodStart,
      periodEnd,
    }
  } catch (error: any) {
    console.error('[Stripe Usage ERROR] Failed to get customer usage summary:', error)
    return null
  }
}
