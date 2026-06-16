'use client';

import React from 'react';
import { Sparkles, ArrowRight, RotateCcw, X, HelpCircle, Play } from 'lucide-react';

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
  tip: string;
}

const HOMEOWNER_TOUR_STEPS: Record<number, TourStepContent> = {
  1: {
    title: "1. Locate Your Roof",
    hook: "Enter your home address. We will scan your rooftop satellite profile to calculate your exact sun exposure.",
    tip: "Tip: Autocomplete will automatically map coordinates to run shading analysis."
  },
  2: {
    title: "2. Monthly Utility Offset",
    hook: "Select your average monthly electric bill. This determines the panel size needed to eliminate your utility bills.",
    tip: "Tip: Higher bills require more panels. You can customize the exact count later."
  },
  3: {
    title: "3. Secure Your Report",
    hook: "Enter your contact details. We will generate your custom 25-year financial report and send it directly to your inbox.",
    tip: "Tip: Select SMS & Email to receive automated simulation alerts."
  },
  4: {
    title: "4. Interactive Rooftop Design",
    hook: "Click panels on the roof to add or remove solar coverage. Swap between Loan, Cash, or Lease structures to compare yields.",
    tip: "Tip: Payback periods and lifetime cash returns update live in the chart below."
  },
  5: {
    title: "5. Review With Advisor",
    hook: "Select a time slot to review your satellite snapshot with a local clean energy expert.",
    tip: "Tip: Booking coordinates are automatically locked in for your representative."
  }
};

export function CalculatorTourGuide({
  step,
  setStep,
  onSimulateStep,
  tourMode,
  setTourMode
}: TourGuideProps) {
  const currentTour = HOMEOWNER_TOUR_STEPS[step] || HOMEOWNER_TOUR_STEPS[1];

  if (!tourMode) return null;

  return (
    <div className="bg-[#112240] text-white rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-4 font-sans select-none relative animate-in zoom-in-95 duration-200">
      
      {/* Close/Collapse button */}
      <button
        onClick={() => setTourMode(false)}
        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
        title="Collapse Guide"
      >
        <X className="w-4.5 h-4.5" />
      </button>

      {/* Title */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 pr-6">
        <HelpCircle className="w-4.5 h-4.5 text-[#ffb300]" />
        <div>
          <h3 className="font-heading font-black text-xs uppercase tracking-wider">Calculator Guide</h3>
          <p className="text-[9px] text-white/50">Stepped walkthrough & simulation</p>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 text-left">
        <span className="text-[8px] font-extrabold uppercase text-[#10b981] tracking-widest">Active Step</span>
        <h4 className="font-extrabold text-sm text-white">{currentTour.title}</h4>
        <p className="text-xs text-white/70 leading-relaxed mt-1">{currentTour.hook}</p>
      </div>

      {/* Helpful Tip */}
      <div className="bg-[#0a192f] border border-white/5 rounded-xl p-3 flex gap-2.5 text-[11px] leading-relaxed text-emerald-300">
        <Sparkles className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase text-[8px] tracking-wider text-[#10b981] block mb-0.5">Quick Tip</span>
          {currentTour.tip}
        </div>
      </div>

      {/* Bullet Steps indicators */}
      <div className="flex justify-center gap-1.5 py-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              step === s ? 'bg-[#ffb300] w-3' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Simulated advancement controls */}
      <div className="flex items-center gap-2 border-t border-white/10 pt-3">
        {step < 5 ? (
          <button
            onClick={() => onSimulateStep(step + 1)}
            className="w-full bg-[#ffb300] hover:bg-[#ffc23d] text-[#112240] font-extrabold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Simulate Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onSimulateStep(1)}
            className="w-full bg-white/10 hover:bg-white/15 text-white font-extrabold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Demo</span>
          </button>
        )}
      </div>

    </div>
  );
}
