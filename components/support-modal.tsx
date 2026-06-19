"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

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

  // Reset category when modal is opened with a new defaultCategory
  useEffect(() => {
    if (isOpen) {
      setCategory(defaultCategory)
      setIsSuccess(false)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setPriority("Medium")
    }
  }, [isOpen, defaultCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              support_agent
            </span>
            Submit Support Ticket
          </DialogTitle>
          <DialogDescription>
            Choose the appropriate queue to route your issue directly to our team.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
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
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-foreground">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Aurelius"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-foreground">Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marcus@spark.solar"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
            </div>

            {/* Routing Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-foreground">Queue / Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                >
                  <option value="Launch Desk">Launch Desk Support</option>
                  <option value="Platform Support">Platform Support</option>
                  <option value="Billing & Plans">Billing & Plans</option>
                  <option value="Engineering Ticket">Engineering Ticket</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-foreground">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Ticket Subject */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-foreground">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. CRM Bridge Webhook routing failing"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            {/* Issue Description */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-foreground">Description</label>
              <textarea
                required
                rows={4}
                placeholder="Provide details about what you need assistance with, including any lead IDs or error messages."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>

            {/* CTA */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-outline-variant/60 rounded-lg text-sm font-semibold hover:bg-surface-container-high transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg text-sm font-semibold hover:bg-solar-amber-bright transition-colors shadow-md shadow-secondary/20 inline-flex items-center gap-2 disabled:opacity-75"
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
      </DialogContent>
    </Dialog>
  )
}
