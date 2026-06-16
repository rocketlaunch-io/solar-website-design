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
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      
      {/* Calculator Main Section */}
      <div className={`${tourMode ? 'xl:col-span-8' : 'xl:col-span-12'} w-full transition-all duration-300`}>
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
      </div>

      {/* Tour Side panel Insights */}
      {tourMode && (
        <div className="xl:col-span-4 w-full sticky top-28 animate-in slide-in-from-right-6 duration-350">
          <CalculatorTourGuide
            step={step}
            setStep={setStep}
            onSimulateStep={handleSimulateStep}
            tourMode={tourMode}
            setTourMode={setTourMode}
          />
        </div>
      )}

      {/* Sticky float button if tourMode is closed to quickly open it back */}
      {!tourMode && (
        <button
          onClick={() => setTourMode(true)}
          className="fixed bottom-8 right-8 z-40 bg-[#ffb300] hover:bg-[#ffc23d] text-[#112240] font-black text-xs px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 border border-white/10"
        >
          <span>Show Tour Guide</span>
        </button>
      )}

    </div>
  );
}
