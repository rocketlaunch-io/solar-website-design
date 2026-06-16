'use client';

import React, { useState } from 'react';
import { SolarSavingsCalculator } from '@/components/solar-savings-calculator';
import { CalculatorTourGuide } from '@/components/calculator-tour-guide';
import { SolarInsights } from '@/lib/google-solar';

export function CalculatorTourWrapper() {
  const [step, setStep] = useState(1);
  const [addressInput, setAddressInput] = useState('');
  const [solarInsights, setSolarInsights] = useState<SolarInsights | null>(null);
  const [customPanelCount, setCustomPanelCount] = useState<number>(0);
  const [tourMode, setTourMode] = useState(true);

  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    billRange: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    prefChannel: 'both',
  });

  const handleSimulateStep = (targetStep: number) => {
    if (targetStep === 1) {
      setAddressInput('');
      setSolarInsights(null);
      setCustomPanelCount(0);
      setFormData({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        billRange: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        prefChannel: 'both',
      });
      setStep(1);
    } else if (targetStep === 2) {
      setAddressInput('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
      setSolarInsights({
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        lat: 37.422,
        lng: -122.084,
        maxPanelsCount: 32,
        panelCapacityWatts: 375,
        carbonOffsetFactorKgPerMwh: 650,
        roofAreaSqFt: 704,
        annualProductionKWh: 11800,
        estimatedSystemSizeKW: 12.0,
        sunlightHoursPerYear: 1825,
        isMock: true,
      });
      setCustomPanelCount(32);
      setStep(2);
    } else if (targetStep === 3) {
      setAddressInput('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
      setSolarInsights({
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        lat: 37.422,
        lng: -122.084,
        maxPanelsCount: 32,
        panelCapacityWatts: 375,
        carbonOffsetFactorKgPerMwh: 650,
        roofAreaSqFt: 704,
        annualProductionKWh: 11800,
        estimatedSystemSizeKW: 12.0,
        sunlightHoursPerYear: 1825,
        isMock: true,
      });
      setCustomPanelCount(32);
      setFormData(prev => ({
        ...prev,
        billRange: '$201 - $300',
      }));
      setStep(3);
    } else if (targetStep === 4) {
      setAddressInput('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
      setSolarInsights({
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        lat: 37.422,
        lng: -122.084,
        maxPanelsCount: 32,
        panelCapacityWatts: 375,
        carbonOffsetFactorKgPerMwh: 650,
        roofAreaSqFt: 704,
        annualProductionKWh: 11800,
        estimatedSystemSizeKW: 12.0,
        sunlightHoursPerYear: 1825,
        isMock: true,
      });
      setCustomPanelCount(26);
      setFormData({
        streetAddress: '1600 Amphitheatre Pkwy',
        city: 'Mountain View',
        state: 'CA',
        zipCode: '94043',
        billRange: '$201 - $300',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@solarwebsitedesign.com',
        phone: '(555) 555-2025',
        prefChannel: 'both',
      });
      setStep(4);
    } else if (targetStep === 5) {
      setAddressInput('1600 Amphitheatre Pkwy, Mountain View, CA 94043');
      setSolarInsights({
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        lat: 37.422,
        lng: -122.084,
        maxPanelsCount: 32,
        panelCapacityWatts: 375,
        carbonOffsetFactorKgPerMwh: 650,
        roofAreaSqFt: 704,
        annualProductionKWh: 11800,
        estimatedSystemSizeKW: 12.0,
        sunlightHoursPerYear: 1825,
        isMock: true,
      });
      setCustomPanelCount(26);
      setFormData({
        streetAddress: '1600 Amphitheatre Pkwy',
        city: 'Mountain View',
        state: 'CA',
        zipCode: '94043',
        billRange: '$201 - $300',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@solarwebsitedesign.com',
        phone: '(555) 555-2025',
        prefChannel: 'both',
      });
      setStep(5);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full">
      
      {/* Main Calculator Component */}
      <SolarSavingsCalculator
        step={step}
        setStep={setStep}
        addressInput={addressInput}
        setAddressInput={setAddressInput}
        solarInsights={solarInsights}
        setSolarInsights={setSolarInsights}
        customPanelCount={customPanelCount}
        setCustomPanelCount={setCustomPanelCount}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Floating Overlay Tour Guide for Desktop */}
      {tourMode ? (
        <div className="absolute top-0 -right-86 hidden xl:block w-80 z-40">
          <CalculatorTourGuide
            step={step}
            setStep={setStep}
            onSimulateStep={handleSimulateStep}
            tourMode={tourMode}
            setTourMode={setTourMode}
          />
        </div>
      ) : (
        /* Floating Show Guide Pill when collapsed */
        <button
          onClick={() => setTourMode(true)}
          className="absolute -top-3.5 -right-3.5 z-45 bg-[#ffb300] hover:bg-[#ffc23d] text-[#112240] font-black text-[11px] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 border border-white/20 select-none animate-in fade-in"
        >
          <span>💡 Guide</span>
        </button>
      )}

      {/* Mobile/Tablet Tour Guide (Renders below the calculator card on smaller screens) */}
      {tourMode && (
        <div className="mt-6 xl:hidden w-full">
          <CalculatorTourGuide
            step={step}
            setStep={setStep}
            onSimulateStep={handleSimulateStep}
            tourMode={tourMode}
            setTourMode={setTourMode}
          />
        </div>
      )}

      {/* Mobile/Tablet Collapsed Guide Button */}
      {!tourMode && (
        <div className="xl:hidden flex justify-center mt-4 animate-in fade-in">
          <button
            onClick={() => setTourMode(true)}
            className="bg-[#ffb300] hover:bg-[#ffc23d] text-[#112240] font-extrabold text-xs px-4 py-2 rounded-full shadow border border-white/25 cursor-pointer flex items-center gap-1.5"
          >
            <span>💡 Show Guide</span>
          </button>
        </div>
      )}

    </div>
  );
}
