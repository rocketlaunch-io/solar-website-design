export interface LeadInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  zipCode: string
  roofType?: string
  monthlyBill?: number
  primaryGoal?: string
  tcpaConsent: boolean
  tcpaConsentAt?: string  // ISO timestamp
  tcpaIpAddress?: string
}

export interface VerificationResult {
  passed: boolean
  score: number  // 0-100
  checks: {
    formatValid: boolean
    tcpaConsent: boolean
    addressValid: boolean
    isDuplicate: boolean
  }
  rejectionReason?: string
}

export interface DeduplicationContext {
  customerId: string
  email: string
}

export function validateFormat(data: LeadInput): boolean {
  // Required fields
  if (
    !data.firstName?.trim() ||
    !data.lastName?.trim() ||
    !data.email?.trim() ||
    !data.phone?.trim() ||
    !data.zipCode?.trim()
  ) {
    return false
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return false
  }

  // Phone validation (strip non-digits, must have at least 10 digits)
  const cleanPhone = data.phone.replace(/\D/g, '')
  if (cleanPhone.length < 10) {
    return false
  }

  return true
}

export function validateTcpaConsent(data: LeadInput): boolean {
  if (!data.tcpaConsent) {
    return false
  }

  if (!data.tcpaConsentAt) {
    return false
  }

  // Simple date validation
  const timestamp = Date.parse(data.tcpaConsentAt)
  if (isNaN(timestamp)) {
    return false
  }

  return true
}

export function validateAddress(data: LeadInput): boolean {
  // MVP: validates ZIP code is 5 digits
  if (!data.zipCode) {
    return false
  }

  const cleanZip = data.zipCode.trim()
  const zipRegex = /^\d{5}$/
  if (!zipRegex.test(cleanZip)) {
    return false
  }

  return true
}

export function checkDuplicate(ctx: DeduplicationContext, existingEmails: string[]): boolean {
  // Case-insensitive check
  const checkEmail = ctx.email.trim().toLowerCase()
  return existingEmails.some(email => email.trim().toLowerCase() === checkEmail)
}

export function verifyLead(data: LeadInput, existingEmailsForCustomer: string[]): VerificationResult {
  const checks = {
    formatValid: false,
    tcpaConsent: false,
    addressValid: false,
    isDuplicate: false,
  }

  // 1. Format Check
  checks.formatValid = validateFormat(data)

  // 2. TCPA Check
  checks.tcpaConsent = validateTcpaConsent(data)

  // 3. Address Check
  checks.addressValid = validateAddress(data)

  // 4. Duplicate Check
  const isDup = checkDuplicate({ customerId: '', email: data.email }, existingEmailsForCustomer)
  checks.isDuplicate = isDup

  // Calculate score
  // Each pass check adds 25 points. Deduplication adds 25 if it is NOT a duplicate (isDuplicate === false)
  let score = 0
  if (checks.formatValid) score += 25
  if (checks.tcpaConsent) score += 25
  if (checks.addressValid) score += 25
  if (!checks.isDuplicate) score += 25

  // TCPA is strictly mandatory
  if (!checks.tcpaConsent) {
    return {
      passed: false,
      score,
      checks,
      rejectionReason: 'Missing or invalid TCPA compliance consent.',
    }
  }

  // Format validation is strictly mandatory
  if (!checks.formatValid) {
    return {
      passed: false,
      score,
      checks,
      rejectionReason: 'Invalid lead formatting (email structure or phone digits insufficient).',
    }
  }

  // Reject duplicates
  if (checks.isDuplicate) {
    return {
      passed: false,
      score,
      checks,
      rejectionReason: 'Duplicate lead submitted for this customer within 30 days.',
    }
  }

  // Score threshold check (must be >= 75)
  if (score < 75) {
    return {
      passed: false,
      score,
      checks,
      rejectionReason: `Lead validation score too low: ${score}/100. Address validation or format check failed.`,
    }
  }

  return {
    passed: true,
    score,
    checks,
  }
}
