'use client';

import React from 'react';
import { Sparkles, ArrowRight, RotateCcw, ShieldCheck, Database, Play } from 'lucide-react';

export interface TourGuideProps {
  step: number;
  setStep: (step: number) => void;
  onSimulateStep: (targetStep: number) => void;
  tourMode: boolean;
  setTourMode: (mode: boolean) => void;
}

interface TourStepContent {
  title: string;
  hook: string;
  psychology: string;
  crmPayload: string;
}

const TOUR_STEPS: Record<number, TourStepContent> = {
  1: {
    title: "1. Address Geocoding Hook",
    hook: "Captures geographic rooftop location instantly. Homeowners enter their street address to see dynamic visual progress rather than a blank contact sheet.",
    psychology: "Replaces standard high-friction 'Contact Us' forms with immediate roof-mapping visual, increasing conversion interest by 65%.",
    crmPayload: `{
  "event": "address_submitted",
  "timestamp": "2026-06-16T16:06:25Z",
  "address": "1600 Amphitheatre Pkwy, CA",
  "solarAPI": {
    "status": "success",
    "lat": 37.422,
    "lng": -122.084,
    "maxArrayPanels": 32,
    "panelCapacityWatts": 375,
    "sunlightHoursYear": 1825
  }
}`
  },
  2: {
    title: "2. Monthly Utility Offset",
    hook: "Calibrates average homeowner electricity spending. Zeroes in on grid consumption patterns to determine size recommendations.",
    psychology: "Allows the consumer to choose value segments. Keeps inputs bite-sized rather than demanding detailed utility bills upfront.",
    crmPayload: `{
  "event": "bill_calibrated",
  "selectedRange": "$201 - $300",
  "inferredAnnualUsageKWh": 14200,
  "recommendedSystemSizeKW": 9.4,
  "annualProductionOffsetKWh": 11800
}`
  },
  3: {
    title: "3. Qualified Lead Handoff",
    hook: "Requires contact information to compile the custom PDF savings report. Gathers email, phone, and channel preferences.",
    psychology: "Leverages the consistency principle: since users already committed their address and bill, they are 300% more likely to enter details to unlock the report.",
    crmPayload: `{
  "event": "lead_qualified",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@solarwebsitedesign.com",
  "phone": "+15555552025",
  "prefChannel": "both",
  "marketingConsent": true,
  "routeLatencyMs": 142
}`
  },
  4: {
    title: "4. Interactive Rooftop Design",
    hook: "Renders isometric rooftop panel design panel, timeline chart, and loan/cash/PPA structures based on live calculations.",
    psychology: "Installs a sense of ownership. Homeowners play with panels, design layout, and choose finance models, lifting closing rates by 40%.",
    crmPayload: `{
  "event": "proposal_customized",
  "customPanelCount": 26,
  "activeFinanceModel": "loan",
  "estimatedMonthlySavings": 220,
  "estimated25YrSavings": 66000,
  "environmentalOffsetMetricTons": 6.8
}`
  },
  5: {
    title: "5. Direct Calendar Booking",
    hook: "Loads appointment scheduler (Cal.com) pre-populated with lead parameters (name, email, phone) to secure follow-up reviews.",
    psychology: "Secures appointments when buying intent is at its peak, reducing lead churn and skipping separate verification processes.",
    crmPayload: `{
  "event": "appointment_booked",
  "scheduler": "cal.com",
  "status": "confirmed",
  "consultationType": "Google Solar Review",
  "meetingLink": "cal.com/meeting/strategy-call"
}`
  }
};

export function CalculatorTourGuide({
  step,
  setStep,
  onSimulateStep,
  tourMode,
  setTourMode
}: TourGuideProps) {
  const currentTour = TOUR_STEPS[step] || TOUR_STEPS[1];

  return (
    <div className="bg-[#112240] text-white rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col gap-6 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#ffb300]" />
          <div>
            <h3 className="font-heading font-black text-sm uppercase tracking-wider">Dealer Insights</h3>
            <p className="text-[10px] text-white/50">Guided B2B Tour Module</p>
          </div>
        </div>

        {/* Tour Toggle */}
        <button
          onClick={() => setTourMode(!tourMode)}
          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
            tourMode 
              ? 'bg-[#ffb300] text-[#112240] shadow'
              : 'bg-white/10 text-white/60 hover:bg-white/15'
          }`}
        >
          {tourMode ? 'Tour Active' : 'Enable Tour'}
        </button>
      </div>

      {tourMode ? (
        <div className="flex flex-col gap-5 text-left animate-in fade-in duration-300">
          
          {/* Step Description */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-extrabold uppercase text-[#10b981] tracking-widest">Active Calculator Stage</span>
            <h4 className="font-extrabold text-base text-white">{currentTour.title}</h4>
            <p className="text-xs text-white/70 leading-relaxed mt-1">{currentTour.hook}</p>
          </div>

          {/* Psychology Callout */}
          <div className="bg-[#0a192f] border border-white/5 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-emerald-300">
            <Sparkles className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase text-[9px] tracking-wider text-[#10b981] block mb-1">Conversion Psychology</span>
              {currentTour.psychology}
            </div>
          </div>

          {/* CRM Payload box */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-extrabold uppercase text-white/50 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              CRM Data Payload (Sub-200ms)
            </span>
            <div className="bg-[#0a192f] rounded-2xl p-4 border border-white/10 font-mono text-[10px] text-emerald-400/90 overflow-x-auto max-h-[170px] select-text">
              <pre>{currentTour.crmPayload}</pre>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 mt-2">
            <span className="text-[9px] font-extrabold uppercase text-white/50 tracking-wider">Simulation Sandbox</span>
            <div className="flex items-center gap-2">
              {step < 5 ? (
                <button
                  onClick={() => onSimulateStep(step + 1)}
                  className="flex-grow bg-[#ffb300] hover:bg-[#ffc23d] text-[#112240] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onSimulateStep(1)}
                  className="flex-grow bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Simulation</span>
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="py-12 text-center text-white/40 text-xs flex flex-col items-center gap-3 animate-in fade-in duration-300">
          <Database className="w-10 h-10 stroke-[1.5] text-white/20" />
          <p className="max-w-[200px] leading-relaxed">Turn on Tour Mode to see conversions data and CRM payloads.</p>
          <button
            onClick={() => setTourMode(true)}
            className="mt-2 bg-[#ffb300]/10 border border-[#ffb300]/30 hover:bg-[#ffb300]/20 text-[#ffb300] font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
          >
            Start Guided Tour
          </button>
        </div>
      )}

    </div>
  );
}
