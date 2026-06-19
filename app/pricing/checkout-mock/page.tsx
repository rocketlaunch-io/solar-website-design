'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, CreditCard, Shield, Info, ArrowLeft } from 'lucide-react'
import { SparkLogo } from '@/components/spark-logo'

function MockCheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planParam = searchParams.get('plan') || 'Business'
  const plan = planParam === 'Scale' ? 'Scale' : 'Business'

  // Plan Details
  const planDetails =
    plan === 'Scale'
      ? {
          monthly: 10000,
          setup: 10000,
          perLead: 15,
          description:
            'Spark AI, local programmatic SEO engine, conversational voice agents.',
        }
      : {
          monthly: 5000,
          setup: 5000,
          perLead: 20,
          description:
            'Edge Architecture custom core edge, CRM Salesforce bridge, Quote Wizard.',
        }

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card')

  // Form States (Card)
  const [email, setEmail] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242')
  const [cardExpiry, setCardExpiry] = useState('12/28')
  const [cardCvc, setCardCvc] = useState('321')

  // Form States (ACH)
  const [bankName, setBankName] = useState('')
  const [accountName, setAccountName] = useState('')
  const [routingNumber, setRoutingNumber] = useState('111000025') // Stripe test routing number
  const [accountNumber, setAccountNumber] = useState('000123456789')

  // Promo Code States
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0) // 0 to 1
  const [promoError, setPromoError] = useState('')
  const [showPromoInput, setShowPromoInput] = useState(false)

  // Payment States
  const [paymentStep, setPaymentStep] = useState(0) // 0: Idle, 1..5: Simulation steps
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    'Initializing mock transaction...',
    paymentMethod === 'ach'
      ? 'Connecting via Stripe Financial Connections mock...'
      : 'Contacting Stripe mock credit gateway...',
    'Verifying balance and tokenizing security signatures...',
    'Creating recurring subscription with 30-day trial...',
    paymentMethod === 'ach'
      ? 'Authorizing ACH direct debit mandate...'
      : 'Deploying your custom Spark edge infrastructure...',
  ]

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPaymentStep(1)
  }

  const handleApplyPromo = (e: React.MouseEvent) => {
    e.preventDefault()
    setPromoError('')
    const code = promoInput.trim().toUpperCase()

    if (code === 'WELCOME50') {
      setPromoDiscount(0.5)
      setAppliedPromo('WELCOME50')
      setPromoInput('')
    } else if (code === 'SPARKFREE') {
      setPromoDiscount(1)
      setAppliedPromo('SPARKFREE')
      setPromoInput('')
    } else {
      setPromoError('No such promotion code found in sandbox registry.')
    }
  }

  const handleRemovePromo = (e: React.MouseEvent) => {
    e.preventDefault()
    setPromoDiscount(0)
    setAppliedPromo('')
    setPromoError('')
  }

  useEffect(() => {
    if (paymentStep > 0 && paymentStep <= steps.length) {
      const timer = setTimeout(() => {
        setPaymentStep((prev) => prev + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (paymentStep > steps.length) {
      const timer = setTimeout(() => {
        const promoQS = appliedPromo ? `&promo=${appliedPromo}` : ''
        router.push(
          `/pricing/success?plan=${plan}&mock=true&method=${paymentMethod}${promoQS}`
        )
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [paymentStep, plan, router, steps.length, paymentMethod, appliedPromo])

  // Recalculated due-today amount based on setup fee minus promo discounts
  const setupDiscountAmount = planDetails.setup * promoDiscount
  const totalDueToday = planDetails.setup - setupDiscountAmount

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      {/* Checkout Steps Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass-panel border border-outline-variant/30 rounded-3xl p-8 space-y-6 shadow-2xl bg-card">
            {paymentStep <= steps.length ? (
              <>
                <div className="flex justify-center relative">
                  <div className="h-16 w-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                  <span
                    className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent text-2xl font-bold animate-pulse"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground">
                  Processing Sandbox Order
                </h3>

                <div className="space-y-3 pt-2">
                  {steps.map((stepText, idx) => {
                    const stepNum = idx + 1
                    const isDone = paymentStep > stepNum
                    const isActive = paymentStep === stepNum
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-left"
                      >
                        {isDone ? (
                          <span
                            className="material-symbols-outlined text-energy-emerald text-lg font-bold"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        ) : isActive ? (
                          <Loader2 className="h-4.5 w-4.5 animate-spin text-accent" />
                        ) : (
                          <div className="h-4.5 w-4.5 rounded-full border-2 border-muted-foreground/35 flex items-center justify-center text-[10px] font-bold text-muted-foreground/50">
                            {stepNum}
                          </div>
                        )}
                        <span
                          className={`text-sm ${isActive ? 'text-foreground font-semibold' : isDone ? 'text-muted-foreground/80' : 'text-muted-foreground/40'}`}
                        >
                          {stepText}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-energy-emerald/10 border-2 border-energy-emerald flex items-center justify-center text-energy-emerald">
                    <span
                      className="material-symbols-outlined text-3xl font-black"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Order Succeeded
                </h3>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your Spark Workspace Dashboard...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tiers
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 bg-solar-amber/10 border border-solar-amber/30 rounded-full px-4.5 py-1.5 w-fit shadow-sm">
          <span
            className="material-symbols-outlined text-solar-amber text-sm animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-solar-amber-bright">
            Developer Local Sandbox
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-extrabold text-foreground">
            Complete Your Spark Registration
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Stripe credentials are not loaded in{' '}
            <code className="bg-surface-container-high py-0.5 px-1.5 rounded text-accent text-xs font-mono">
              .env.local
            </code>
            . Experience the sandbox checkout simulator with trials, promo codes, and ACH transfers.
          </p>
        </div>

        {/* Warning card */}
        <div className="glass-panel border border-outline-variant/30 rounded-2xl p-5 flex items-start gap-4 bg-surface-container-low/40">
          <span className="material-symbols-outlined text-accent text-2xl mt-0.5">
            info
          </span>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">
              Sandbox coupon codes active
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Try code <code className="bg-surface-container-high px-1 text-accent rounded font-mono">WELCOME50</code> for 50% off the core setup cost, or{' '}
              <code className="bg-surface-container-high px-1 text-accent rounded font-mono">SPARKFREE</code> for 100% off.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSimulatePayment}
          className="space-y-5 bg-card border border-border/85 rounded-3xl p-6 md:p-8 shadow-sm"
        >
          {/* Payment Method Selector Tab */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1 rounded-xl border border-border/60">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <CreditCard className="h-3.5 w-3.5" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('ach')}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'ach'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="material-symbols-outlined text-sm">account_balance</span>
                ACH Bank Transfer
              </button>
            </div>
          </div>

          <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3 pt-2">
            {paymentMethod === 'ach' ? (
              <>
                <span className="material-symbols-outlined text-accent">account_balance</span>
                Bank Routing &amp; Account Mandate
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 text-accent" />
                Credit Card Details
              </>
            )}
          </h3>

          <div className="space-y-4">
            {/* Common Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Business Email
              </label>
              <input
                type="email"
                required
                placeholder="name@solarcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
              />
            </div>

            {paymentMethod === 'card' ? (
              // Credit Card Form Fields
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required={paymentMethod === 'card'}
                    placeholder="Jane Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all font-mono"
                    />
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xl">
                      credit_card
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-center font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'card'}
                      placeholder="123"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all text-center font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // ACH Bank Transfer Form Fields
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'ach'}
                      placeholder="Chase Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'ach'}
                      placeholder="Jane Doe Corp"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'ach'}
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      placeholder="Routing (9 Digits)"
                      maxLength={9}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Account Number
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'ach'}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all font-mono"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground/80 leading-normal bg-muted/30 p-3.5 rounded-xl border border-border">
                  By clicking below, you authorize Spark to debit your account for the core setup fee immediately, and authorize future platform fees according to the subscription schedule.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-solar-amber-bright text-secondary-foreground py-4 rounded-xl text-base font-bold shadow-lg shadow-secondary/15 hover:shadow-xl hover:shadow-secondary/25 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              Simulate Sandbox {paymentMethod === 'ach' ? 'ACH Debit' : 'Payment'} (${totalDueToday.toLocaleString()})
            </button>
            <p className="text-center text-[10px] tracking-wide text-muted-foreground mt-3 uppercase font-semibold flex items-center justify-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-energy-emerald" />
              Fully isolated sandbox environment
            </p>
          </div>
        </form>
      </div>

      {/* Right Column - Plan Summary */}
      <div className="lg:col-span-5 lg:pl-4 space-y-6">
        <div className="bg-gradient-to-b from-card via-card to-accent/5 border border-border/80 rounded-3xl p-6 md:p-8 shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className="font-heading text-lg font-bold text-foreground pb-4 border-b border-border/60">
            Subscription Summary
          </h3>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-accent uppercase tracking-widest">
              Spark Solar Ecosystem
            </div>
            <h4 className="font-heading text-2xl font-extrabold text-foreground">
              {plan} Plan
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {planDetails.description}
            </p>
          </div>

          {/* Pricing Details Breakdown */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-sm border-b border-dashed border-border pb-2.5">
              <span className="text-muted-foreground flex items-center gap-1.5">
                Platform Subscription (1st Month Free)
                <span className="relative group/tooltip inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-[10px] rounded-lg py-1.5 px-2.5 border border-border w-44 z-50 text-center font-normal leading-normal shadow-md">
                    First 30 days are 100% free. Regular billing is monthly.
                  </div>
                </span>
              </span>
              <div className="text-right">
                <span className="font-bold text-foreground line-through text-xs text-muted-foreground mr-1.5">
                  ${planDetails.monthly.toLocaleString()}
                </span>
                <span className="font-bold text-energy-emerald bg-energy-emerald/10 border border-energy-emerald/20 px-2 py-0.5 rounded text-xs uppercase font-semibold">
                  $0.00
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-dashed border-border pb-2.5">
              <span className="text-muted-foreground flex items-center gap-1.5">
                Core Setup Fee
                <span className="relative group/tooltip inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-[10px] rounded-lg py-1.5 px-2.5 border border-border w-44 z-50 text-center font-normal leading-normal shadow-md">
                    One-time setup fee due today.
                  </div>
                </span>
              </span>
              <span className="font-bold text-foreground">
                ${planDetails.setup.toLocaleString()} (One-time)
              </span>
            </div>

            {/* Promo Code Discount */}
            {promoDiscount > 0 && (
              <div className="flex justify-between items-center text-sm border-b border-dashed border-border pb-2.5 text-energy-emerald">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm font-bold animate-pulse">local_offer</span>
                  Setup Fee Discount ({appliedPromo})
                </span>
                <span className="font-bold font-mono">
                  -${(planDetails.setup * promoDiscount).toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-sm border-b border-dashed border-border pb-2.5">
              <span className="text-muted-foreground flex items-center gap-1.5">
                Verified Lead Fee
                <span className="relative group/tooltip inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-foreground" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-popover text-popover-foreground text-[10px] rounded-lg py-1.5 px-2.5 border border-border w-44 z-50 text-center font-normal leading-normal shadow-md">
                    Metered billing per verified lead starting after deployment.
                  </div>
                </span>
              </span>
              <span className="font-bold text-foreground">
                ${planDetails.perLead}/lead
              </span>
            </div>
          </div>

          {/* Promo code link/input */}
          <div className="pt-1 border-t border-border/60">
            {!appliedPromo ? (
              <div className="space-y-2">
                {!showPromoInput ? (
                  <button
                    type="button"
                    onClick={() => setShowPromoInput(true)}
                    className="text-xs font-bold text-accent hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">local_offer</span>
                    Have a promo code?
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME50"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-grow bg-background border border-border/80 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-primary text-primary-foreground text-xs font-extrabold px-3 py-2 rounded-xl hover:opacity-90 cursor-pointer uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[10px] text-destructive font-semibold mt-1">
                    {promoError}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between bg-energy-emerald/5 border border-energy-emerald/20 p-2.5 rounded-xl text-xs">
                <span className="text-energy-emerald font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] font-bold">local_offer</span>
                  Code <strong className="font-mono">{appliedPromo}</strong> Applied
                </span>
                <button
                  type="button"
                  onClick={handleRemovePromo}
                  className="text-muted-foreground hover:text-foreground text-[10px] font-bold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4.5 space-y-2">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Platform Trial recurring</span>
              <span className="text-energy-emerald font-semibold">$0.00 / 30 days</span>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>One-time subtotal due</span>
              <span>${planDetails.setup.toLocaleString()}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between items-center text-xs text-energy-emerald font-medium">
                <span>Setup coupon discount</span>
                <span>-${setupDiscountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="h-px bg-border my-1" />
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold text-foreground">
                Total Due Today
              </span>
              <div className="text-right">
                <span className="font-heading text-2xl font-black text-foreground font-mono">
                  ${totalDueToday.toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground block font-medium">
                  platform trial active
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground/80 leading-relaxed space-y-2.5 pt-2">
            <p className="flex gap-2">
              <span
                className="material-symbols-outlined text-energy-emerald text-base font-bold shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
              30-Day Platform Free Trial: Recurring base monthly fee begins at the end of the trial period.
            </p>
            <p className="flex gap-2">
              <span
                className="material-symbols-outlined text-energy-emerald text-base font-bold shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
              Refundable Guarantee: Zero payment for duplicate, invalid or
              TCPA-non-compliant lead events.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutMockPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border/80 bg-card/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
          <Link href="/">
            <SparkLogo />
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase border border-border rounded-full py-1 px-3.5 bg-muted/20">
            <span className="inline-block h-2 w-2 rounded-full bg-solar-amber animate-pulse" />
            Sandbox Gateway
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          }
        >
          <MockCheckoutContent />
        </Suspense>
      </main>

      <div className="border-t border-border/60 bg-card py-6 text-center text-xs text-muted-foreground">
        © 2026 Spark growth platform. For developer sandbox simulation purposes
        only.
      </div>
    </div>
  )
}
