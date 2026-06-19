import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyLead, LeadInput } from '@/lib/lead-verification'
import { reportVerifiedLead } from '@/lib/stripe-billing'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerId,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      roofType,
      monthlyBill,
      primaryGoal,
      tcpaConsent,
      tcpaConsentAt,
      sourceUrl,
    } = body

    // 1. Basic request validation
    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing customerId. Leads must belong to a registered customer.' },
        { status: 400 }
      )
    }

    if (!firstName || !lastName || !email || !phone || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required lead fields (firstName, lastName, email, phone, zipCode).' },
        { status: 400 }
      )
    }

    // 2. Lookup customer to make sure they exist
    let customer = await prisma.customer.findUnique({
      where: { id: customerId },
    })

    // Auto-create default/demo customer to ensure smooth execution out-of-the-box
    if (!customer && (customerId === 'platform-owner' || customerId === 'default' || customerId === 'mock-customer' || customerId === 'test')) {
      customer = await prisma.customer.create({
        data: {
          id: customerId,
          stripeCustomerId: `cus_mock_${customerId}`,
          companyName: customerId === 'platform-owner' ? 'Spark Solar Platform' : 'Default Spark Dealer',
          email: 'dealer@sparksolar.com',
          planTier: 'business',
          status: 'active',
        },
      })
      console.log(`[Lead API] Auto-seeded default customer record for ID: ${customerId}`)
    }

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found. Invalid customerId.' },
        { status: 404 }
      )
    }

    // 3. Get existing lead emails for this customer in the last 30 days for deduplication check
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentLeads = await prisma.lead.findMany({
      where: {
        customerId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        email: true,
      },
    })
    const existingEmails = recentLeads.map((l) => l.email)

    // Capture metadata from headers
    const ipAddress = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    // Build the lead input object
    const leadInput: LeadInput = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      roofType,
      monthlyBill: monthlyBill ? parseFloat(monthlyBill) : undefined,
      primaryGoal,
      tcpaConsent: !!tcpaConsent,
      tcpaConsentAt: tcpaConsentAt || new Date().toISOString(),
      tcpaIpAddress: ipAddress,
    }

    // 4. Run verification pipeline
    const verificationResult = verifyLead(leadInput, existingEmails)

    // 5. Create lead record in the database
    let lead = await prisma.lead.create({
      data: {
        customerId,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        roofType,
        monthlyBill: monthlyBill ? parseFloat(monthlyBill) : null,
        primaryGoal,
        status: verificationResult.passed ? 'verified' : 'rejected',
        verificationScore: verificationResult.score,
        formatValid: verificationResult.checks.formatValid,
        tcpaConsent: verificationResult.checks.tcpaConsent,
        tcpaConsentAt: verificationResult.checks.tcpaConsent ? new Date(leadInput.tcpaConsentAt!) : null,
        tcpaIpAddress: ipAddress,
        addressValid: verificationResult.checks.addressValid,
        isDuplicate: verificationResult.checks.isDuplicate,
        rejectionReason: verificationResult.rejectionReason || null,
        sourceUrl,
        userAgent,
        ipAddress,
      },
    })

    // 6. Report to Stripe Billing Meter if verified
    if (verificationResult.passed && customer.stripeCustomerId) {
      console.log(`[Lead API] Reporting verified lead ${lead.id} to Stripe Customer ${customer.stripeCustomerId}...`)
      
      const meterEventId = await reportVerifiedLead(
        customer.stripeCustomerId,
        lead.id
      )

      if (meterEventId) {
        // Update lead record with Stripe references
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: {
            meterEventId,
            billedAt: new Date(),
          },
        })
      }
    }

    // Return verification result alongside lead details
    return NextResponse.json(
      {
        success: verificationResult.passed,
        message: verificationResult.passed
          ? 'Lead verification succeeded.'
          : `Lead verification failed: ${verificationResult.rejectionReason}`,
        lead: {
          id: lead.id,
          status: lead.status,
          verificationScore: lead.verificationScore,
          rejectionReason: lead.rejectionReason,
          billedAt: lead.billedAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('[Lead API Error] Failed to ingest lead. Stack trace:', error.stack || error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
