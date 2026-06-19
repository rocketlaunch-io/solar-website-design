"use client"

import React, { useEffect, useState } from "react"
import { SparkLogo } from "./spark-logo"

interface SupportRequestModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCategory?: string
}

export function SupportRequestModal({
  isOpen,
  onClose,
  defaultCategory = "Platform Support",
}: SupportRequestModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState(defaultCategory)
  const [priority, setPriority] = useState("Medium")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setIsSuccess(false)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setPriority("Medium")
      setCategory(defaultCategory)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, defaultCategory])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const labelClasses = "text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground"
  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-white text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 font-semibold transition-all text-sm"
  const selectClasses = "w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-white text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 font-semibold transition-all text-sm cursor-pointer"
  const textareaClasses = "w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-white text-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 font-semibold transition-all text-sm resize-none"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-edge-navy-deep/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full bg-surface border border-outline-variant/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-4xl h-[620px] md:h-[580px] animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Left Side: Premium Dark Value Panel (Desktop Only) */}
        <div className="relative hidden md:flex md:w-5/12 bg-gradient-to-br from-[#112240] to-[#0a192f] p-8 flex-col justify-between text-white overflow-hidden select-none">
          {/* Subtle Grid / Light Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-10">
            {/* SparkLogo */}
            <SparkLogo monochrome textClassName="text-white" />

            {/* Support Value Props */}
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-heading font-extrabold tracking-tight leading-snug">
                Elite Platform Support
              </h3>
              <p className="text-white/70 text-xs leading-relaxed max-w-xs">
                Our specialized engineering and operations queues ensure your solar platform runs at peak performance 24/7.
              </p>
              
              {/* Bullet Points */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { title: "Priority Routing Desk", desc: "DNS, launch, and routing support" },
                  { title: "Billing & Metering", desc: "Questions about invoices and lead counts" },
                  { title: "24/7 Platform Uptime", desc: "Active edge infrastructure monitoring" },
                  { title: "Direct API & CRM Handoff", desc: "Webhook queues and integration testing" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-medium">
                    <span className="material-symbols-outlined text-energy-emerald text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <div>
                      <span className="block text-white font-bold">{item.title}</span>
                      <span className="block text-[10px] text-white/50">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Footer */}
            <div className="border-t border-white/10 pt-4 flex items-center gap-2 text-[10px] text-white/50 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
              99.9% Uptime SLA Guaranteed
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form Container */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full bg-white select-text overflow-y-auto w-full md:w-7/12">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center my-auto text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-energy-emerald/10 border-2 border-energy-emerald flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-energy-emerald text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Ticket Submitted!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
                We have received your ticket under the <strong className="text-foreground">{category}</strong> queue. A support engineer will follow up shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 my-auto">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                  Submit Support Ticket
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Route your issue directly to the correct team.
                </p>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Aurelius"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@spark.solar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Routing Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Queue / Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={selectClasses}
                  >
                    <option value="Launch Desk">Launch Desk Support</option>
                    <option value="Platform Support">Platform Support</option>
                    <option value="Billing & Plans">Billing & Plans</option>
                    <option value="Engineering Ticket">Engineering Ticket</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClasses}>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={selectClasses}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Ticket Subject */}
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CRM Bridge Webhook routing failing"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClasses}
                />
              </div>

              {/* Issue Description */}
              <div className="flex flex-col gap-1.5">
                <label className={labelClasses}>Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide details about what you need assistance with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={textareaClasses}
                />
              </div>

              {/* CTA */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-outline-variant/60 rounded-xl text-sm font-semibold hover:bg-surface-container-high transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-secondary-foreground px-6 py-2 rounded-xl text-sm font-semibold hover:bg-solar-amber-bright transition-colors shadow-md shadow-secondary/20 inline-flex items-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-secondary-foreground" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Create Ticket
                      <span className="material-symbols-outlined text-base">bolt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
