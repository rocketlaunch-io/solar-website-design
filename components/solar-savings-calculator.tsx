'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { geocodeAddress, getSolarInsights, SolarInsights } from '@/lib/google-solar';
import { 
  Check, Sparkles, MapPin, Phone, Mail, Sliders, 
  Calendar, MessageSquare, Leaf, CheckCircle, RefreshCw,
  X, TrendingUp, Award, DollarSign, Coins, Download, 
  Smartphone
} from 'lucide-react';
import { SparkLogo } from '@/components/spark-logo';

// Pre-configured US addresses for local testing and autocomplete fallback
const MOCK_ADDRESSES = [
  {
    address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
    street: "1600 Amphitheatre Pkwy",
    city: "Mountain View",
    state: "CA",
    zipCode: "94043"
  },
  {
    address: "111 8th Ave, New York, NY 10011",
    street: "111 8th Ave",
    city: "New York",
    state: "NY",
    zipCode: "10011"
  },
  {
    address: "100 Congress Ave, Austin, TX 78701",
    street: "100 Congress Ave",
    city: "Austin",
    state: "TX",
    zipCode: "78701"
  },
  {
    address: "601 Union St, Seattle, WA 98101",
    street: "601 Union St",
    city: "Seattle",
    state: "WA",
    zipCode: "98101"
  },
  {
    address: "1111 Lincoln Rd, Miami, FL 33139",
    street: "1111 Lincoln Rd",
    city: "Miami",
    state: "FL",
    zipCode: "33139"
  },
  {
    address: "1700 Lincoln St, Denver, CO 80203",
    street: "1700 Lincoln St",
    city: "Denver",
    state: "CO",
    zipCode: "80203"
  }
];

const PROPOSAL_LOADER_STEPS = [
  "Resolving geographic coordinates & solar insolation data...",
  "Analyzing roof slope angles & shadow patterns...",
  "Calculating optimal panel layouts & system capacity...",
  "Compiling Cash vs Loan vs Lease ROI amortization schedules...",
  "Generating secure PDF document & dispatching digital alerts..."
];

export function SolarSavingsCalculator() {
  const [step, setStep] = useState(1);
  const [addressInput, setAddressInput] = useState('');
  
  // Custom Autocomplete Fallback states
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<typeof MOCK_ADDRESSES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Form lead details
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
    prefChannel: 'both', // 'email' | 'sms' | 'both'
  });

  // Google Solar insights state
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [solarInsights, setSolarInsights] = useState<SolarInsights | null>(null);
  
  // Interactive panel count override
  const [customPanelCount, setCustomPanelCount] = useState<number>(0);
  
  // Financial Model Selection
  const [financialTab, setFinancialTab] = useState<'cash' | 'loan' | 'ppa'>('loan');

  // Proposal Generation Loading State
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [proposalGenStep, setProposalGenStep] = useState(0);

  // In-App Simulator Modals
  const [activeSimulator, setActiveSimulator] = useState<'email' | 'sms' | null>(null);

  // ROI Chart hover state
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Active roof segment for panel rendering (South vs West)
  const [activeRoofSegment, setActiveRoofSegment] = useState<'south' | 'west'>('south');

  // Google Places Autocomplete reference
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const [isAutocompleteLoaded, setIsAutocompleteLoaded] = useState(() => {
    return typeof window !== 'undefined' && !!window.google?.maps?.places;
  });

  // Load Google Maps Autocomplete script
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (window.google?.maps?.places) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn("Google Maps API Key missing. Using simulated autocomplete list.");
      return;
    }

    const scriptId = "google-maps-places-solar-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => setIsAutocompleteLoaded(true);
    script.addEventListener("load", handleLoad);

    return () => {
      if (script) {
        script.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  // Bind Autocomplete to input
  useEffect(() => {
    if (!isAutocompleteLoaded || !autocompleteInputRef.current || !window.google?.maps?.places || step !== 1) {
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["address_components", "formatted_address"],
      }
    );

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let streetNum = "";
      let route = "";
      let city = "";
      let state = "";
      let zipCode = "";

      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number":
            streetNum = component.long_name;
            break;
          case "route":
            route = component.long_name;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "administrative_area_level_1":
            state = component.short_name;
            break;
          case "postal_code":
            zipCode = component.long_name;
            break;
        }
      }

      const streetAddress = `${streetNum} ${route}`.trim();
      setAddressInput(place.formatted_address || `${streetAddress}, ${city}, ${state} ${zipCode}`);
      setFormData(prev => ({
        ...prev,
        streetAddress: streetAddress || place.formatted_address || "",
        city: city || prev.city,
        state: state || prev.state,
        zipCode: zipCode || prev.zipCode,
      }));
    });

    return () => {
      if (window.google?.maps?.event && listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [isAutocompleteLoaded, step]);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Autocomplete fallback suggestions filtering
  const handleAddressChange = (val: string) => {
    setAddressInput(val);
    if (!isAutocompleteLoaded) {
      if (!val.trim()) {
        setAutocompleteSuggestions(MOCK_ADDRESSES);
      } else {
        const filtered = MOCK_ADDRESSES.filter(item => 
          item.address.toLowerCase().includes(val.toLowerCase())
        );
        setAutocompleteSuggestions(filtered);
      }
    }
  };

  const handleSelectMockSuggestion = (sug: typeof MOCK_ADDRESSES[number]) => {
    setAddressInput(sug.address);
    setFormData(prev => ({
      ...prev,
      streetAddress: sug.street,
      city: sug.city,
      state: sug.state,
      zipCode: sug.zipCode,
    }));
    setShowSuggestions(false);
  };

  // Step 1 Submission: Geocoding & Solar API Lookup
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = addressInput.trim() || `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
    if (!fullAddress) return;

    setLoading(true);
    setLoadingMessage("Locating address coordinates...");

    try {
      // Step 1: Geocode Address
      const coords = await geocodeAddress(fullAddress);
      
      setLoadingMessage("Accessing Google Solar rooftop satellite database...");
      await new Promise(resolve => setTimeout(resolve, 800));

      setLoadingMessage("Analyzing roof shading patterns & solar insolation...");
      // Step 2: Fetch Building Insights
      const insights = await getSolarInsights(coords.formattedAddress, coords.lat, coords.lng);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSolarInsights(insights);
      setCustomPanelCount(insights.maxPanelsCount);
      
      // Update form details with geocoded ones
      const stateMap: Record<string, string> = {
        'CA': 'California', 'TX': 'Texas', 'WA': 'Washington', 'AZ': 'Arizona',
        'CO': 'Colorado', 'FL': 'Florida', 'UT': 'Utah', 'NC': 'North Carolina',
        'SC': 'South Carolina', 'MA': 'New England', 'NY': 'New York'
      };
      
      // Try to extract state code
      const stateMatch = coords.formattedAddress.match(/\b([A-Z]{2})\b/);
      let detectedState = formData.state;
      if (stateMatch && stateMap[stateMatch[1]]) {
        detectedState = stateMatch[1];
      }

      setFormData(prev => ({
        ...prev,
        streetAddress: coords.formattedAddress.split(',')[0] || prev.streetAddress,
        city: coords.formattedAddress.split(',')[1]?.trim() || prev.city,
        state: detectedState || prev.state,
      }));

      setLoading(false);
      handleNextStep(); // proceed to Step 2: Bill range
    } catch (err) {
      console.error(err);
      setLoading(false);
      // Failover safely to mock coordinate-based proceed
      const mockInsights = await getSolarInsights(fullAddress, 37.7749, -122.4194);
      setSolarInsights(mockInsights);
      setCustomPanelCount(mockInsights.maxPanelsCount);
      handleNextStep();
    }
  };

  // Step 3 Submission: Trigger proposal generation simulator
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingProposal(true);
    setProposalGenStep(0);

    const interval = setInterval(() => {
      setProposalGenStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGeneratingProposal(false);
            setStep(4);
          }, 800);
          return 5;
        }
        return prev + 1;
      });
    }, 750);
  };

  // Calculations for Proposal (Step 4)
  const getCalculatedProposal = () => {
    if (!solarInsights) return null;

    // Fetch electricity rate based on state (in $/kWh)
    const electricityRates: Record<string, number> = {
      'CA': 0.28, 'TX': 0.14, 'WA': 0.11, 'AZ': 0.15, 'CO': 0.14,
      'FL': 0.15, 'UT': 0.12, 'NC': 0.13, 'SC': 0.13, 'MA': 0.26, 'NY': 0.23
    };
    const rate = electricityRates[formData.state] || 0.18; // default rate per kWh

    // Map monthly bill range to average bill value
    const billValues: Record<string, number> = {
      'Under $100': 80,
      '$101 - $150': 125,
      '$151 - $200': 175,
      '$201 - $300': 250,
      'Over $300': 350
    };
    const avgBill = billValues[formData.billRange] || 200;

    // System capacity calculations based on custom panel slider
    const currentPanels = customPanelCount || solarInsights.maxPanelsCount;
    const systemSizeKW = (currentPanels * solarInsights.panelCapacityWatts) / 1000;
    
    // Proportional annual energy output
    const scalingFactor = currentPanels / solarInsights.maxPanelsCount;
    const annualProductionKWh = Math.round(solarInsights.annualProductionKWh * scalingFactor);
    
    // Monthly utility savings ($)
    const monthlyProdKWh = annualProductionKWh / 12;
    const monthlySavings = Math.round(Math.min(avgBill, monthlyProdKWh * rate));
    const offsetPercentage = Math.min(100, Math.round((monthlySavings / avgBill) * 100));

    // Environmental metrics
    // Carbon offset factor in kg CO2 per MWh. 1 kg = 0.001 metric ton
    const annualCarbonOffsetTons = parseFloat(((annualProductionKWh / 1000) * (solarInsights.carbonOffsetFactorKgPerMwh / 1000)).toFixed(2));
    const treesPlantedEquivalent = Math.round(annualCarbonOffsetTons * 16.5); // ~16.5 trees offset 1 ton CO2 annually

    // Detail Financing calculations
    // Cash Purchase Cost (estimating $3.20/W)
    const grossCostCash = Math.round(systemSizeKW * 1000 * 3.20);
    const taxCreditCash = Math.round(grossCostCash * 0.30);
    const netCostCash = grossCostCash - taxCreditCash;
    const paybackYearsCash = parseFloat((netCostCash / (monthlySavings * 12)).toFixed(1));

    // Solar Loan ($0 down, 25yr fixed at ~5.99%)
    // Monthly payment factor is approx 0.00643 of net loan amount
    const monthlyLoanPayment = Math.round(netCostCash * 0.00643);
    const netMonthlyLoanSaving = monthlySavings - monthlyLoanPayment;

    // PPA / Solar Lease ($0 down, buy power per kWh)
    // Buy PPA electricity at a lower rate, e.g. 14c/kWh vs Grid Rate
    const ppaKwhRate = Math.min(rate - 0.05, 0.14); // guarantee discount
    const ppaFirstYearMonthly = Math.round((annualProductionKWh / 12) * ppaKwhRate);
    const netMonthlyPPAGain = monthlySavings - ppaFirstYearMonthly;

    const lifetimeSavings = monthlySavings * 12 * 25;

    return {
      rate,
      avgBill,
      systemSizeKW: parseFloat(systemSizeKW.toFixed(2)),
      panelsCount: currentPanels,
      annualProductionKWh,
      monthlySavings,
      offsetPercentage,
      annualCarbonOffsetTons,
      treesPlantedEquivalent,
      lifetimeSavings,
      // Financial Options
      grossCostCash,
      taxCreditCash,
      netCostCash,
      paybackYearsCash,
      monthlyLoanPayment,
      netMonthlyLoanSaving,
      ppaKwhRate,
      ppaFirstYearMonthly,
      netMonthlyPPAGain
    };
  };

  const proposal = getCalculatedProposal();

  // 25-Year Cumulative Chart calculations
  const getCumulativeData = () => {
    if (!proposal) return [];
    const data: { year: number; utility: number; solar: number }[] = [];
    
    let cumulativeUtility = 0;
    let cumulativeSolar = 0;
    
    let currentUtilityMonthly = proposal.avgBill;
    
    if (financialTab === 'cash') {
      cumulativeSolar = proposal.netCostCash; // cash is paid upfront
    } else {
      cumulativeSolar = 0; // loan/ppa are $0 down
    }
    
    data.push({ year: 0, utility: 0, solar: cumulativeSolar });
    
    for (let year = 1; year <= 25; year++) {
      // Grid utility cost increases by 4.5% inflation per year
      const annualUtility = currentUtilityMonthly * 12;
      cumulativeUtility += annualUtility;
      currentUtilityMonthly *= 1.045; // grid rate inflation
      
      // Calculate remaining utility bill after solar offset
      const remainingUtilityMonthly = currentUtilityMonthly * (1 - proposal.offsetPercentage / 100);
      let annualSolarCost = remainingUtilityMonthly * 12;
      
      if (financialTab === 'cash') {
        // No solar financing payments, just remaining utility
      } else if (financialTab === 'loan') {
        // Solar loan payment stays fixed for 25 years
        annualSolarCost += proposal.monthlyLoanPayment * 12;
      } else if (financialTab === 'ppa') {
        // PPA payment increases by 2.5% inflation per year
        const ppaMonthly = proposal.ppaFirstYearMonthly * Math.pow(1.025, year - 1);
        annualSolarCost += ppaMonthly * 12;
      }
      
      cumulativeSolar += annualSolarCost;
      data.push({
        year,
        utility: Math.round(cumulativeUtility),
        solar: Math.round(cumulativeSolar)
      });
    }
    
    return data;
  };

  const cumulativeData = getCumulativeData();
  const maxChartValue = cumulativeData.length > 0 ? Math.ceil(Math.max(...cumulativeData.map(d => Math.max(d.utility, d.solar))) / 10000) * 10000 : 100000;

  // Bilinear interpolation for placing panels flat on isometric roof drawing
  const interpolatePoints = (
    u: number, 
    v: number, 
    p0: [number, number], 
    p1: [number, number], 
    p2: [number, number], 
    p3: [number, number]
  ): [number, number] => {
    const x = (1 - u) * (1 - v) * p0[0] + u * (1 - v) * p1[0] + u * v * p2[0] + (1 - u) * v * p3[0];
    const y = (1 - u) * (1 - v) * p0[1] + u * (1 - v) * p1[1] + u * v * p2[1] + (1 - u) * v * p3[1];
    return [x, y];
  };

  // Dynamic scheduler cal.com Url mapping
  const getCalComUrl = () => {
    const encodedName = encodeURIComponent(`${formData.firstName} ${formData.lastName}`.trim());
    const encodedEmail = encodeURIComponent(formData.email);
    const encodedPhone = encodeURIComponent(formData.phone);
    
    return `https://cal.com/rocketlaunch/free-strategy-call?name=${encodedName}&email=${encodedEmail}&phone=${encodedPhone}`;
  };

  // Rendering isometric SVG layout based on panels
  const renderInteractiveRoof = () => {
    if (!solarInsights) return null;

    const totalSlots = solarInsights.maxPanelsCount;
    // Compute balanced grid dimensions
    const cols = Math.min(8, Math.ceil(Math.sqrt(totalSlots * 1.5)));
    const rows = Math.ceil(totalSlots / cols);

    // Gabled Roof Facet points inside 400x240 box
    const p0: [number, number] = [80, 40];   // Top-Left
    const p1: [number, number] = [320, 25];  // Top-Right
    const p2: [number, number] = [360, 190]; // Bottom-Right
    const p3: [number, number] = [40, 215];  // Bottom-Left

    const treeCenter = [60, 200];

    const panels = [];
    for (let idx = 0; idx < totalSlots; idx++) {
      const r = Math.floor(idx / cols);
      const c = idx % cols;

      const padU = 0.04;
      const padV = 0.04;

      const u0 = (c + padU) / cols;
      const v0 = (r + padV) / rows;
      const u1 = (c + 1 - padU) / cols;
      const v1 = (r + 1 - padV) / rows;

      const tl = interpolatePoints(u0, v0, p0, p1, p2, p3);
      const tr = interpolatePoints(u1, v0, p0, p1, p2, p3);
      const br = interpolatePoints(u1, v1, p0, p1, p2, p3);
      const bl = interpolatePoints(u0, v1, p0, p1, p2, p3);

      const pointsString = `${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`;
      const isActive = idx < customPanelCount;

      panels.push(
        <polygon
          key={idx}
          points={pointsString}
          onClick={() => {
            if (isActive) {
              setCustomPanelCount(idx);
            } else {
              setCustomPanelCount(idx + 1);
            }
          }}
          className={`cursor-pointer transition-all duration-300 ${
            isActive
              ? 'fill-[url(#activeSolarGrad)] stroke-[#10b981] stroke-[1.5] filter drop-shadow-[0_0_4px_rgba(16,185,129,0.3)] hover:brightness-110'
              : 'fill-white/5 stroke-white/20 stroke-[1] stroke-dasharray-[3,3] hover:fill-white/10 hover:stroke-white/40'
          }`}
        >
          <title>{isActive ? `Panel ${idx + 1} (Active)` : `Click to place Panel ${idx + 1}`}</title>
        </polygon>
      );
    }

    return (
      <div className="relative w-full aspect-[5/3] bg-[#0a192f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-2 flex flex-col justify-between">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-0.5 text-[10px] font-bold text-white/70">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            Rooftop Grid Mapping
          </span>
          <span className="text-[8px] font-medium text-white/40">
            {activeRoofSegment === 'south' ? 'South Facade • Peak Insolation (94%)' : 'West Facade • Moderate Insolation (83%)'}
          </span>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="activeSolarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="35%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="sunSunshine" cx="50%" cy="10%" r="60%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.18)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
            </radialGradient>
            <radialGradient id="treeShadow" cx="15%" cy="85%" r="35%">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 0.6)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </radialGradient>
          </defs>

          <path d="M 0,40 L 400,40 M 0,80 L 400,80 M 0,120 L 400,120 M 0,160 L 400,160 M 0,200 L 400,200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <path d="M 80,0 L 80,240 M 160,0 L 160,240 M 240,0 L 240,240 M 320,0 L 320,240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          <polygon points="40,15 360,15 360,225 40,225" fill="url(#sunSunshine)" />
          <circle cx={treeCenter[0]} cy={treeCenter[1]} r="50" fill="url(#treeShadow)" />
        </svg>

        <div className="w-full h-full flex items-center justify-center p-3 relative z-10">
          <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="80,40 320,25 360,190 40,215"
              fill="#112240"
              stroke="#233554"
              strokeWidth="3.5"
            />
            <polygon
              points="40,215 360,190 370,198 30,225"
              fill="#061224"
            />
            <line x1="80" y1="40" x2="320" y2="25" stroke="#334d77" strokeWidth="2.5" />

            {panels}

            <path 
              d="M 10,240 C 20,210 35,190 55,180 C 70,175 80,185 85,175 C 90,160 80,150 95,140 C 105,145 110,160 115,150 C 120,135 105,120 120,110 C 130,115 135,130 140,125 C 150,110 140,95 155,85"
              fill="none" 
              stroke="rgba(0,0,0,0.35)" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <path 
              d="M 10,240 C 30,220 50,210 70,200" 
              fill="none" 
              stroke="rgba(0,0,0,0.35)" 
              strokeWidth="10" 
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-3 right-3 text-[8px] text-white/50 uppercase tracking-widest font-bold">
          Click panels to design layout
        </div>
      </div>
    );
  };

  // Rendering Interactive ROI chart using SVG
  const renderROIChart = () => {
    if (cumulativeData.length === 0) return null;

    const width = 480;
    const height = 180;
    const paddingLeft = 55;
    const paddingRight = 15;
    const paddingTop = 15;
    const paddingBottom = 25;

    const plotWidth = width - paddingLeft - paddingRight;
    const plotHeight = height - paddingTop - paddingBottom;

    const getCoordinatesString = (field: 'utility' | 'solar') => {
      return cumulativeData.map(d => {
        const x = paddingLeft + (d.year / 25) * plotWidth;
        const y = paddingTop + plotHeight - (d[field] / maxChartValue) * plotHeight;
        return `${x},${y}`;
      }).join(' ');
    };

    const utilityPoints = getCoordinatesString('utility');
    const solarPoints = getCoordinatesString('solar');

    const getAreaPathString = (field: 'utility' | 'solar') => {
      const linePoints = cumulativeData.map(d => {
        const x = paddingLeft + (d.year / 25) * plotWidth;
        const y = paddingTop + plotHeight - (d[field] / maxChartValue) * plotHeight;
        return `L ${x} ${y}`;
      });
      const startX = paddingLeft;
      const startY = paddingTop + plotHeight;
      const endX = paddingLeft + plotWidth;
      const endY = paddingTop + plotHeight;
      return `M ${startX} ${startY} ${linePoints.join(' ')} L ${endX} ${endY} Z`;
    };

    const solarAreaPath = getAreaPathString('solar');
    const utilityAreaPath = getAreaPathString('utility');

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const relativeX = mouseX - paddingLeft;
      const pct = relativeX / plotWidth;
      const year = Math.max(0, Math.min(25, Math.round(pct * 25)));
      setHoveredYear(year);
    };

    const handleMouseLeave = () => {
      setHoveredYear(null);
    };

    const yGridValues = [0.25, 0.5, 0.75, 1];

    return (
      <div className="bg-white border border-[#D2DAD6] rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-extrabold uppercase text-[#ff8f00] tracking-wider">25-YEAR INVESTMENT TIMELINE</span>
            <h4 className="font-extrabold text-sm text-[#112240]">Cumulative Net Spending Comparison</h4>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-rose-500 rounded-full border border-rose-500" />
              <span className="text-[#4A5854]">Utility Grid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-emerald-500 rounded-full border border-emerald-500" />
              <span className="text-[#4A5854] capitalize">{financialTab} Solar</span>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden select-none">
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full h-auto cursor-crosshair overflow-visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="utilityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="solarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {yGridValues.map((val, idx) => {
              const yVal = maxChartValue * val;
              const y = paddingTop + plotHeight - val * plotHeight;
              return (
                <g key={idx}>
                  <line 
                    x1={paddingLeft} 
                    y1={y} 
                    x2={width - paddingRight} 
                    y2={y} 
                    stroke="#E2E8F0" 
                    strokeWidth="1" 
                    strokeDasharray="4,4" 
                  />
                  <text 
                    x={paddingLeft - 8} 
                    y={y + 3.5} 
                    className="text-[9px] font-bold fill-[#4A5854] text-right"
                    textAnchor="end"
                  >
                    ${Math.round(yVal / 1000)}k
                  </text>
                </g>
              );
            })}

            {[0, 5, 10, 15, 20, 25].map((year, idx) => {
              const x = paddingLeft + (year / 25) * plotWidth;
              return (
                <g key={idx}>
                  <line 
                    x1={x} 
                    y1={paddingTop} 
                    x2={x} 
                    y2={paddingTop + plotHeight} 
                    stroke="#E2E8F0" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={x} 
                    y={paddingTop + plotHeight + 14} 
                    className="text-[9px] font-bold fill-[#4A5854] text-center"
                    textAnchor="middle"
                  >
                    Yr {year}
                  </text>
                </g>
              );
            })}

            <path d={utilityAreaPath} fill="url(#utilityGrad)" />
            <path d={solarAreaPath} fill="url(#solarGrad)" />

            <polyline 
              points={utilityPoints} 
              fill="none" 
              stroke="#f43f5e" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline 
              points={solarPoints} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {hoveredYear !== null && (
              <g>
                <line 
                  x1={paddingLeft + (hoveredYear / 25) * plotWidth} 
                  y1={paddingTop} 
                  x2={paddingLeft + (hoveredYear / 25) * plotWidth} 
                  y2={paddingTop + plotHeight} 
                  stroke="#475569" 
                  strokeWidth="1.5" 
                  strokeDasharray="2,2" 
                />

                <circle 
                  cx={paddingLeft + (hoveredYear / 25) * plotWidth} 
                  cy={paddingTop + plotHeight - (cumulativeData[hoveredYear].utility / maxChartValue) * plotHeight} 
                  r="5" 
                  fill="#f43f5e" 
                  stroke="white" 
                  strokeWidth="1.5" 
                />

                <circle 
                  cx={paddingLeft + (hoveredYear / 25) * plotWidth} 
                  cy={paddingTop + plotHeight - (cumulativeData[hoveredYear].solar / maxChartValue) * plotHeight} 
                  r="5" 
                  fill="#10b981" 
                  stroke="white" 
                  strokeWidth="1.5" 
                />
              </g>
            )}
          </svg>

          {hoveredYear !== null && (
            <div 
              className="absolute top-2 bg-[#112240] border border-white/10 rounded-xl p-3 shadow-2xl flex flex-col gap-1 text-[10px] text-white z-20 pointer-events-none min-w-[130px]"
              style={{
                left: `${Math.min(width - 150, Math.max(60, paddingLeft + (hoveredYear / 25) * plotWidth - 65))}px`
              }}
            >
              <div className="font-extrabold text-white border-b border-white/10 pb-1 flex justify-between">
                <span>Timeline Year {hoveredYear}</span>
                {financialTab === 'cash' && proposal && hoveredYear >= proposal.paybackYearsCash && (
                  <span className="text-emerald-400 font-black">★ ROI</span>
                )}
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-white/60">Utility Grid:</span>
                <span className="font-bold text-rose-400">${cumulativeData[hoveredYear].utility.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-white/60">Solar Total:</span>
                <span className="font-bold text-emerald-400">${cumulativeData[hoveredYear].solar.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-white/10 pt-1 mt-1 flex justify-between font-extrabold text-[11px]">
                {cumulativeData[hoveredYear].utility > cumulativeData[hoveredYear].solar ? (
                  <>
                    <span className="text-[#34d399]">Net Savings:</span>
                    <span className="text-[#34d399] font-black">${(cumulativeData[hoveredYear].utility - cumulativeData[hoveredYear].solar).toLocaleString()}</span>
                  </>
                ) : (
                  <>
                    <span className="text-white/60">Net Investment:</span>
                    <span className="text-rose-300">${(cumulativeData[hoveredYear].solar - cumulativeData[hoveredYear].utility).toLocaleString()}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row bg-[#F4F8F6] overflow-hidden rounded-3xl border border-[#D2DAD6] shadow-xl relative text-[#112240] font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spinner-pulse-1 {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.35); opacity: 0.65; }
        }
        @keyframes spinner-pulse-2 {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.18); opacity: 0.85; }
        }
        .animate-spinner-pulse-1 {
          animation: spinner-pulse-1 2s infinite ease-in-out;
        }
        .animate-spinner-pulse-2 {
          animation: spinner-pulse-2 2.2s infinite ease-in-out;
        }
      `}} />
      
      {/* LEFT COLUMN: Visual Brand Panel */}
      <div 
        className="relative lg:w-5/12 flex flex-col justify-between p-8 md:p-12 text-white bg-cover bg-center overflow-hidden shrink-0"
        style={{ backgroundImage: "url('/images/pricing-solar-home.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a30]/95 via-[#112240]/90 to-[#10b981]/75 z-0" />
        
        <div className="relative z-10 flex flex-col h-full justify-between gap-10">
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center gap-2 group">
            <SparkLogo monochrome hoverColorize iconClassName="w-6 h-6" />
          </Link>

          {/* Marketing Copy */}
          <div className="flex flex-col gap-5 mt-6 lg:mt-12">
            <span className="bg-[#10b981]/20 border border-[#10b981]/30 text-emerald-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider w-fit">
              AI Powered Solar Savings Calculator
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Instantly map your roof solar potential.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              We leverage Spark AI and Solar Satellite data to model your roof angle, shadow patterns, and system production capacity in seconds.
            </p>
            
            {/* Core Features */}
            <div className="flex flex-col gap-3.5 mt-2">
              {[
                "Rooftop satellite panel mapping simulation",
                "Real-time electric bill offset estimation",
                "Instant PDF proposal sent via Email & SMS",
                "Direct scheduling with local clean energy advisors"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 text-xs font-bold border border-white/20">
                    ✓
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings Info */}
          <div className="border-t border-white/10 pt-5 flex items-center gap-4 text-xs text-white/70 mt-6">
            <div>
              <p className="font-semibold text-white text-sm">★★★★★</p>
              <p>Rated 4.8/5 by homeowners</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-semibold text-white text-sm">Powered by Spark AI</p>
              <p>Official Google Solar API Integration</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form / Proposal steps */}
      <div className={`flex-grow flex items-center justify-center p-6 md:p-10 relative bg-white ${step === 4 ? 'overflow-y-auto' : ''}`}>
        
        {/* Wizard Form Wrapper Card */}
        <div className={`w-full flex flex-col gap-6 text-[#112240] ${step === 4 ? 'max-w-5xl' : 'max-w-xl'}`}>
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/95 rounded-r-3xl z-50 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff8f00]/20 animate-spinner-pulse-1" />
                <div className="absolute inset-3 rounded-full border-4 border-[#ff8f00]/40 animate-spinner-pulse-2" />
                <SparkLogo iconClassName="w-10 h-10 text-[#ff8f00]" textClassName="hidden" />
              </div>
              <h3 className="font-bold text-lg text-[#112240] mt-2">Retrieving Satellite Modeling</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed animate-pulse">
                {loadingMessage}
              </p>
            </div>
          )}

          {/* Proposal Generation Loading Overlay */}
          {isGeneratingProposal && (
            <div className="absolute inset-0 bg-white/98 rounded-r-3xl z-50 flex flex-col items-center justify-center p-8 text-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff8f00]/20 animate-spinner-pulse-1" />
                <div className="absolute inset-3 rounded-full border-4 border-[#ff8f00]/40 animate-spinner-pulse-2" />
                <SparkLogo iconClassName="w-10 h-10 text-[#ff8f00]" textClassName="hidden" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl text-[#112240]">Generating Personalized Proposal</h3>
                <p className="text-xs text-muted-foreground max-w-xs">Spark AI Engine modeling cumulative yields...</p>
              </div>

              {/* Step Checklist */}
              <div className="w-full max-w-sm flex flex-col gap-2.5 mt-4 text-left bg-[#F4F8F6] p-5 rounded-2xl border border-[#D2DAD6]/50">
                {PROPOSAL_LOADER_STEPS.map((stepDesc: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    {proposalGenStep > idx ? (
                      <CheckCircle className="w-4.5 h-4.5 text-[#10b981] shrink-0" />
                    ) : proposalGenStep === idx ? (
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-[#112240] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-[#D2DAD6] shrink-0" />
                    )}
                    <span className={`font-semibold transition-colors duration-300 ${proposalGenStep >= idx ? 'text-[#112240]' : 'text-[#4A5854]/40'}`}>
                      {stepDesc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Step Bar */}
          {step < 4 && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span>Step {step} of 3</span>
                <span>{Math.round(((step - 1) / 2) * 100)}% Complete</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#D2DAD6]/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#112240] to-[#10b981] rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Address Input */}
          {step === 1 && (
            <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4 text-left">
              <h2 className="text-2xl font-bold tracking-tight text-[#112240]">Let&apos;s map your solar potential</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter your home address. We will geocode your coordinates and retrieve satellite metrics for your roof structure.
              </p>
              
              <div className="flex flex-col gap-1.5 mt-2 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase text-[#112240]">Home Address</label>
                  {isAutocompleteLoaded ? (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-[#10b981] bg-emerald-50 border border-[#10b981]/10">
                      Autocomplete Active
                    </span>
                  ) : (
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-amber-600 bg-amber-50 border border-amber-500/20">
                      Simulated Autocomplete
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  ref={autocompleteInputRef}
                  value={addressInput}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => {
                    if (!isAutocompleteLoaded) {
                      setShowSuggestions(true);
                      handleAddressChange(addressInput);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  placeholder="Enter street address, city, state, zip"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2DAD6] bg-white text-[#112240] focus:outline-none focus:border-[#112240] focus:ring-2 focus:ring-[#112240]/15 font-semibold text-sm transition-all"
                  required
                />

                {!isAutocompleteLoaded && showSuggestions && autocompleteSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white border border-[#D2DAD6] rounded-xl mt-1.5 overflow-hidden shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {autocompleteSuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectMockSuggestion(sug)}
                        className="w-full text-left px-4 py-3 text-xs text-[#112240] hover:bg-[#F4F8F6] border-b border-[#D2DAD6]/30 last:border-b-0 transition-colors font-semibold cursor-pointer"
                      >
                        {sug.address}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!addressInput.trim()}
                className="w-full bg-gradient-to-r from-[#112240] to-[#10b981] hover:opacity-95 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed mt-4 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Analyze Rooftop</span>
                <span>&rarr;</span>
              </button>
            </form>
          )}

          {/* STEP 2: Average Monthly Bill */}
          {step === 2 && (
            <div className="flex flex-col gap-4 text-left">
              <h2 className="text-2xl font-bold tracking-tight text-[#112240]">What is your average electric bill?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This calibrates your annual energy usage (kWh) to model a system size that eliminates your monthly utility bill.
              </p>
              <div className="grid grid-cols-1 gap-2.5 mt-2">
                {['Under $100', '$101 - $150', '$151 - $200', '$201 - $300', 'Over $300'].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, billRange: range }));
                      handleNextStep();
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      formData.billRange === range
                        ? 'bg-gradient-to-r from-[#112240] to-[#10b981] text-white border-[#112240] shadow-md scale-[1.01]'
                        : 'bg-white text-[#112240] border-[#D2DAD6] hover:border-[#112240] hover:bg-[#F4F8F6]/40'
                    }`}
                  >
                    <span>{range}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.billRange === range ? 'border-white bg-white text-[#112240]' : 'border-[#D2DAD6]'
                    }`}>
                      {formData.billRange === range && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#112240]" />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <button onClick={handlePrevStep} className="text-muted-foreground text-xs hover:underline mt-4 self-center font-semibold cursor-pointer">
                &larr; Go Back
              </button>
            </div>
          )}

          {/* STEP 3: Contact & Message Preferences */}
          {step === 3 && (
            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4 text-left">
              <h2 className="text-2xl font-bold tracking-tight text-[#112240]">Who should we send the report to?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provide your contact details below to receive a secure PDF copy of your customized solar savings report.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#112240]">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. John"
                    className="w-full px-4 py-3 rounded-xl border border-[#D2DAD6] bg-white text-[#112240] focus:outline-none focus:border-[#112240] text-sm font-semibold"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase text-[#112240]">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Doe"
                    className="w-full px-4 py-3 rounded-xl border border-[#D2DAD6] bg-white text-[#112240] focus:outline-none focus:border-[#112240] text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-[#112240]">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john.doe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2DAD6] bg-white text-[#112240] focus:outline-none focus:border-[#112240] text-sm font-semibold"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-[#112240]">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. (555) 555-5555"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2DAD6] bg-white text-[#112240] focus:outline-none focus:border-[#112240] text-sm font-semibold"
                  required={formData.prefChannel !== 'email'}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold uppercase text-[#112240]">Send Proposal Via</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'email', label: 'Email Only', icon: Mail },
                    { id: 'sms', label: 'SMS Only', icon: Phone },
                    { id: 'both', label: 'Email & SMS', icon: MessageSquare }
                  ].map((chan) => {
                    const Icon = chan.icon;
                    return (
                      <button
                        type="button"
                        key={chan.id}
                        onClick={() => setFormData({ ...formData, prefChannel: chan.id })}
                        className={`py-3 px-2 rounded-xl border text-center font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          formData.prefChannel === chan.id
                            ? 'bg-gradient-to-r from-[#112240] to-[#10b981] text-white border-[#112240] shadow-sm'
                            : 'bg-white text-[#112240] border-[#D2DAD6] hover:bg-[#F4F8F6]/40'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{chan.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[9px] text-muted-foreground leading-relaxed opacity-85 mt-2">
                By submitting, you consent to receive autodialed promotional calls and text messages from Spark AI at the entered phone number. Consent not required for purchase.
              </p>

              <div className="flex justify-between items-center mt-4 border-t border-[#D2DAD6]/30 pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="text-muted-foreground text-xs hover:underline font-semibold cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#112240] to-[#10b981] hover:opacity-95 text-white font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md cursor-pointer"
                >
                  Generate savings estimate report
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: AI Solar Interactive Snapshot Proposal Dashboard */}
          {step === 4 && solarInsights && proposal && (
            <div className="flex flex-col gap-6 text-left w-full animate-in fade-in duration-500">
              
              {/* Proposal Header Banner */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-[#D2DAD6] pb-5 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <SparkLogo className="w-24 md:w-28 h-auto text-[#112240]" textClassName="text-[#112240]" />
                    <span className="hidden sm:inline h-4 w-px bg-[#D2DAD6]" />
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase text-[#10b981] tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>Spark AI Satellite Analysis</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#112240]">Interactive Solar Proposal</h2>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                    <span>{solarInsights.address}</span>
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {(formData.prefChannel === 'email' || formData.prefChannel === 'both') && (
                    <button 
                      type="button"
                      onClick={() => setActiveSimulator('email')}
                      className="bg-[#10b981]/10 border border-[#10b981]/30 hover:bg-[#10b981]/20 text-[#10b981] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Simulator</span>
                    </button>
                  )}
                  {(formData.prefChannel === 'sms' || formData.prefChannel === 'both') && (
                    <button 
                      type="button"
                      onClick={() => setActiveSimulator('sms')}
                      className="bg-[#10b981]/10 border border-[#10b981]/30 hover:bg-[#10b981]/20 text-[#10b981] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>SMS Simulator</span>
                    </button>
                  )}
                  <button 
                    type="button"
                    onClick={() => window.print()}
                    className="border border-[#D2DAD6] hover:bg-[#F4F8F6] text-[#112240] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer bg-white"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Main proposal layout: 2-Columns grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Rooftop simulation and ROI chart */}
                <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-xs font-extrabold uppercase text-muted-foreground">
                      <span>Rooftop Panel Layout simulation</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveRoofSegment('south');
                            setCustomPanelCount(solarInsights.maxPanelsCount);
                          }}
                          className={`px-2 py-0.5 rounded border transition-all cursor-pointer text-[10px] ${
                            activeRoofSegment === 'south'
                              ? 'bg-[#112240] text-white border-[#112240]'
                              : 'bg-white border-[#D2DAD6] hover:border-[#112240]'
                          }`}
                        >
                          South Slope
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveRoofSegment('west');
                            setCustomPanelCount(Math.max(4, Math.round(solarInsights.maxPanelsCount * 0.6)));
                          }}
                          className={`px-2 py-0.5 rounded border transition-all cursor-pointer text-[10px] ${
                            activeRoofSegment === 'west'
                              ? 'bg-[#112240] text-white border-[#112240]'
                              : 'bg-white border-[#D2DAD6] hover:border-[#112240]'
                          }`}
                        >
                          West Slope
                        </button>
                      </div>
                    </div>
                    
                    {renderInteractiveRoof()}
                  </div>

                  {/* Panel Count Customization Slider */}
                  <div className="bg-[#F4F8F6] border border-[#D2DAD6] p-5 rounded-2xl flex flex-col gap-3.5 shadow-sm">
                    <div className="flex justify-between items-center text-xs font-extrabold text-[#112240]">
                      <span className="flex items-center gap-1.5 uppercase">
                        <Sliders className="w-4 h-4 text-[#112240]" />
                        <span>Adjust System Size</span>
                      </span>
                      <span className="bg-[#112240] text-white px-2.5 py-1 rounded-full text-xs font-black">
                        {proposal.panelsCount} / {solarInsights.maxPanelsCount} Panels
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min={4}
                      max={solarInsights.maxPanelsCount}
                      value={proposal.panelsCount}
                      onChange={(e) => setCustomPanelCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#D2DAD6] rounded-lg appearance-none cursor-pointer accent-[#112240]"
                    />
                    
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <span>Min Coverage (4 panels)</span>
                      <span>Rooftop Limit ({solarInsights.maxPanelsCount} panels)</span>
                    </div>
                  </div>

                  {renderROIChart()}
                </div>

                {/* Right side: Detailed Calculator Metrics & Financing Tabs */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                  
                  {/* Performance stats summary */}
                  <div className="bg-[#112240]/5 border border-[#112240]/10 rounded-2xl p-5 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 border-r border-[#D2DAD6] pr-2">
                      <span className="text-[10px] font-extrabold text-muted-foreground uppercase">Simulated capacity</span>
                      <span className="text-xl font-black text-[#112240]">{proposal.systemSizeKW} kW</span>
                      <span className="text-[9px] text-muted-foreground font-medium leading-none">Fit up to {solarInsights.maxPanelsCount} panels</span>
                    </div>
                    <div className="flex flex-col gap-1 pl-2">
                      <span className="text-[10px] font-extrabold text-muted-foreground uppercase">Annual Generation</span>
                      <span className="text-xl font-black text-[#112240]">{proposal.annualProductionKWh.toLocaleString()} kWh</span>
                      <span className="text-[9px] text-muted-foreground font-medium leading-none">{solarInsights.sunlightHoursPerYear} peak hours/yr</span>
                    </div>
                  </div>

                  {/* Financial Options Tab bar */}
                  <div className="flex flex-col gap-4 border border-[#D2DAD6] rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex flex-col gap-1 border-b border-[#D2DAD6] pb-3">
                      <span className="text-[9px] font-extrabold uppercase text-[#ff8f00] tracking-wider">FINANCING OPTIONS</span>
                      <h4 className="font-extrabold text-sm text-[#112240]">Select Financing Structure</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-[#F4F8F6] p-1 rounded-xl">
                      {(
                        [
                          { id: 'loan', label: 'Solar Loan', icon: Coins },
                          { id: 'cash', label: 'Cash Buy', icon: DollarSign },
                          { id: 'ppa', label: 'PPA Lease', icon: Award }
                        ] as const
                      ).map((tab) => {
                        const Icon = tab.icon;
                        const isSelected = financialTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setFinancialTab(tab.id)}
                            className={`py-2 px-1 text-center font-bold text-xs rounded-lg flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#112240] shadow-sm font-black'
                                : 'text-muted-foreground hover:text-[#112240]'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#ff8f00]' : ''}`} />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed Tab Outputs */}
                    {financialTab === 'cash' && (
                      <div className="flex flex-col gap-4.5 pt-2 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Gross System Cost:</span>
                          <span className="text-sm font-bold text-[#112240]">${proposal.grossCostCash.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">30% Federal ITC Tax Credit:</span>
                          <span className="text-sm font-bold text-emerald-600">-${proposal.taxCreditCash.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-black">Net Cash Investment:</span>
                          <span className="text-base font-black text-[#112240]">${proposal.netCostCash.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Payback / ROI Period:</span>
                          <span className="text-sm font-extrabold text-[#112240] flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{proposal.paybackYearsCash} Years</span>
                          </span>
                        </div>
                        
                        <div className="bg-[#112240] text-white p-4.5 rounded-xl flex flex-col gap-1 text-xs">
                          <span className="font-extrabold uppercase text-emerald-400 text-[10px] tracking-wider">Cash Savings Breakdown</span>
                          <p className="leading-relaxed font-medium">
                            Payback in <strong>{proposal.paybackYearsCash} years</strong>. After break-even, you generate 100% free power, saving <strong>${(proposal.monthlySavings * 12 * 25 - proposal.netCostCash).toLocaleString()}</strong> in net cash returns over 25 years.
                          </p>
                        </div>
                      </div>
                    )}

                    {financialTab === 'loan' && (
                      <div className="flex flex-col gap-4.5 pt-2 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Down Payment:</span>
                          <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">$0 Down</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Est. Monthly Loan Payment:</span>
                          <span className="text-sm font-bold text-rose-500">-${proposal.monthlyLoanPayment}/mo</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Average Monthly Bill Savings:</span>
                          <span className="text-sm font-bold text-emerald-600">+${proposal.monthlySavings}/mo</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-black">Net Cashflow Gains:</span>
                          <span className="text-base font-black text-emerald-600">+${proposal.netMonthlyLoanSaving}/mo</span>
                        </div>
                        
                        <div className="bg-[#112240] text-white p-4.5 rounded-xl flex flex-col gap-1 text-xs">
                          <span className="font-extrabold uppercase text-emerald-400 text-[10px] tracking-wider">Zero Down Loan Savings</span>
                          <p className="leading-relaxed font-medium">
                            Immediately swap your utility bill for a lower solar loan payment, generating <strong>+${proposal.netMonthlyLoanSaving}/mo</strong> in pocket savings starting day one.
                          </p>
                        </div>
                      </div>
                    )}

                    {financialTab === 'ppa' && (
                      <div className="flex flex-col gap-4.5 pt-2 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Installation Down Payment:</span>
                          <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">$0 Down</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">Simulated Solar PPA Rate:</span>
                          <span className="text-sm font-bold text-[#112240]">{(proposal.ppaKwhRate * 100).toFixed(1)}¢ per kWh</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-bold">First Year PPA Payment:</span>
                          <span className="text-sm font-bold text-rose-500">-${proposal.ppaFirstYearMonthly}/mo</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-[#D2DAD6]/50 pb-2">
                          <span className="text-xs text-muted-foreground font-black">Immediate Monthly Savings:</span>
                          <span className="text-base font-black text-emerald-600">+${proposal.netMonthlyPPAGain}/mo</span>
                        </div>
                        
                        <div className="bg-[#112240] text-white p-4.5 rounded-xl flex flex-col gap-1 text-xs">
                          <span className="font-extrabold uppercase text-emerald-400 text-[10px] tracking-wider">Power Purchase Savings</span>
                          <p className="leading-relaxed font-medium">
                            No loan debt, no maintenance. Simply buy power from the panels on your roof at a fixed rate that is locked in below grid inflation.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Environmental Impact card */}
                  <div className="bg-emerald-50 border border-emerald-200/50 p-5 rounded-2xl flex items-center gap-4 text-xs shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-extrabold text-[#112240] text-sm">Carbon Offset Impact</h4>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        Saves <strong>{proposal.annualCarbonOffsetTons} metric tons</strong> of CO2 per year, equivalent to planting <strong>{proposal.treesPlantedEquivalent} trees</strong> annually.
                      </p>
                    </div>
                  </div>

                  {/* Call to action & Schedule buttons */}
                  <div className="flex flex-col gap-3 mt-2">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-gradient-to-r from-[#112240] to-[#10b981] hover:opacity-95 text-white font-extrabold py-4 rounded-xl transition-all text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Consultation</span>
                      <span>&rarr;</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomPanelCount(0);
                        setAddressInput('');
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
                      }}
                      className="text-xs text-muted-foreground font-bold self-center hover:underline inline-flex items-center gap-1 border border-[#D2DAD6] px-4 py-2 rounded-full cursor-pointer bg-white"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Analyze New Address
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* STEP 5: Consultation Scheduling (cal.com) */}
          {step === 5 && (
            <div className="flex flex-col gap-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 text-[#10b981] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              
              <div className="flex flex-col gap-1.5 max-w-sm mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-[#112240]">Book Your Solar Session</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Select a convenient time slot below with a Spark advisor to review your satellite snapshot.
                </p>
              </div>

              {/* cal.com Embed Iframe */}
              <div className="w-full border border-[#D2DAD6]/60 rounded-2xl overflow-hidden bg-[#F4F8F6]/20 shadow-sm relative h-[450px]">
                <iframe
                  src={getCalComUrl()}
                  className="w-full h-full border-0"
                  title="Cal.com Consultation Scheduler"
                />
              </div>

              <div className="flex flex-col gap-2.5 border-t border-[#D2DAD6]/30 pt-4">
                <a
                  href={getCalComUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#112240] hover:underline"
                >
                  Trouble scheduling? Open Cal.com in a new tab &rarr;
                </a>
                
                <Link
                  href="/"
                  className="w-full bg-[#112240] hover:bg-[#10b981] text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow text-center block"
                >
                  Complete & Return Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MOCK EMAIL SIMULATOR DIALOG */}
      {activeSimulator === 'email' && proposal && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          <div className="bg-[#112240] border border-white/10 rounded-2xl shadow-2xl max-w-3xl w-full text-left overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Window Topbar */}
            <div className="bg-[#0a192f] px-4 py-3 border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
              </div>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">Mail Desktop Simulator</span>
              <button 
                type="button"
                onClick={() => setActiveSimulator(null)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Metadata */}
            <div className="bg-[#112240] p-5 border-b border-white/5 flex flex-col gap-2.5 text-xs text-white/80 shrink-0">
              <div className="flex">
                <span className="font-bold text-white/40 w-16">From:</span>
                <span className="font-bold text-[#10b981]">Spark AI Proposals &lt;advisor@sparkwebsite.com&gt;</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-bold text-white/40 w-16">To:</span>
                <span className="font-bold text-white">{formData.firstName} {formData.lastName} &lt;{formData.email}&gt;</span>
              </div>
              <div className="flex">
                <span className="font-bold text-white/40 w-16">Subject:</span>
                <span className="font-bold text-white">Your Custom Rooftop Solar Proposal - {formData.streetAddress}</span>
              </div>
            </div>

            {/* Email Render Scrollable Body */}
            <div className="bg-white p-8 overflow-y-auto text-[#112240]">
              <div className="max-w-xl mx-auto flex flex-col gap-6 font-sans">
                
                {/* Logo and header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <SparkLogo className="w-24 h-auto text-[#112240]" textClassName="text-[#112240]" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">Proposal ID: #P25-{formData.zipCode}</span>
                </div>

                {/* Greeting */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-[#112240]">Hi {formData.firstName},</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We have compiled the Google Solar satellite data for your home at <strong>{formData.streetAddress}</strong>. Based on your average monthly utility spending, we designed an optimized rooftop layout:
                  </p>
                </div>

                {/* Highlights Table */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 grid grid-cols-2 gap-4 text-left">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Designed System Capacity</span>
                    <span className="text-lg font-extrabold text-[#112240]">{proposal.systemSizeKW} kW ({proposal.panelsCount} Panels)</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Annual Production Yield</span>
                    <span className="text-lg font-extrabold text-[#112240]">{proposal.annualProductionKWh.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Est. Monthly Savings</span>
                    <span className="text-lg font-extrabold text-[#10b981]">${proposal.monthlySavings} / mo</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">25-Year Lifetime Savings</span>
                    <span className="text-lg font-extrabold text-[#10b981]">${proposal.lifetimeSavings.toLocaleString()}</span>
                  </div>
                </div>

                {/* Env block */}
                <div className="border border-emerald-100 bg-emerald-50/50 p-4 rounded-xl flex items-center gap-3.5 text-xs text-left">
                  <Leaf className="w-6 h-6 text-[#10b981] shrink-0" />
                  <p className="text-slate-600 leading-relaxed font-medium">
                    This solar array prevents <strong>{proposal.annualCarbonOffsetTons} tons</strong> of carbon emissions per year, equivalent to planting <strong>{proposal.treesPlantedEquivalent} trees</strong> annually!
                  </p>
                </div>

                {/* CTA scheduler */}
                <div className="flex flex-col gap-3 text-center pt-2">
                  <a
                    href={getCalComUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#112240] hover:bg-[#10b981] text-white font-extrabold text-sm py-4 px-6 rounded-xl transition-all shadow-md"
                  >
                    Click to review & book consultation slot
                  </a>
                  <span className="text-[10px] text-slate-400">
                    If you have questions, please reach out to us at advisor@sparkwebsite.com.
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-5 text-center text-[10px] text-slate-400 flex flex-col gap-1">
                  <p className="font-extrabold text-slate-500">Spark AI Website Solutions</p>
                  <p>100 Tech Way, Suite 400 • Austin, TX 78701</p>
                  <p>You received this email because you generated a proposal on our website.</p>
                </div>

              </div>
            </div>

            {/* Modal footer */}
            <div className="bg-[#0a192f] p-4 flex justify-end shrink-0 border-t border-white/5">
              <button 
                type="button"
                onClick={() => setActiveSimulator(null)}
                className="bg-[#112240] hover:bg-[#10b981] text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MOCK SMS SIMULATOR DIALOG */}
      {activeSimulator === 'sms' && proposal && (
        <div className="fixed inset-0 z-50 bg-[#0a192f]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          
          {/* Smartphone device Mockup */}
          <div className="bg-[#1e1e1e] border-4 border-[#333333] rounded-[40px] shadow-2xl p-3.5 max-w-[340px] w-full relative aspect-[9/18] flex flex-col">
            
            {/* Speaker and Camera notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span className="w-12 h-1 bg-slate-900 rounded-full" />
            </div>

            {/* Screen container */}
            <div className="bg-black flex-grow rounded-[32px] overflow-hidden flex flex-col text-white font-sans relative pt-8 pb-3 select-none">
              
              {/* iOS Chat Header */}
              <div className="bg-[#121212] border-b border-white/5 py-3 px-4 flex items-center gap-3 shrink-0 relative">
                <button 
                  type="button"
                  onClick={() => setActiveSimulator(null)}
                  className="text-xs text-blue-500 font-medium absolute left-4 hover:underline cursor-pointer"
                >
                  Close
                </button>
                <div className="mx-auto flex flex-col items-center gap-0.5 mt-2">
                  <div className="w-7 h-7 rounded-full bg-[#333] flex items-center justify-center text-[10px] font-black text-emerald-400">
                    SP
                  </div>
                  <span className="text-[9px] font-bold text-white/50">Spark AI</span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3.5 text-xs text-left">
                <span className="text-[8px] text-white/30 text-center uppercase tracking-widest font-extrabold w-full block mt-2">
                  Today 11:24 AM
                </span>

                <div className="max-w-[85%] bg-[#26262a] rounded-2xl py-2.5 px-3.5 text-white/90 self-start leading-relaxed shadow-sm font-medium">
                  Hi {formData.firstName}! ☀️ This is your Spark Advisor. We just mapped your roof satellite data for {formData.streetAddress}.
                </div>

                <div className="max-w-[85%] bg-[#26262a] rounded-2xl py-2.5 px-3.5 text-white/90 self-start leading-relaxed shadow-sm font-medium flex flex-col gap-1.5">
                  <div>Here is your Spark AI satellite snapshot:</div>
                  <div className="bg-black/25 p-2 rounded-lg border border-white/5 text-[10px] font-semibold flex flex-col gap-0.5">
                    <p>📐 Capacity: {proposal.systemSizeKW} kW</p>
                    <p>⚡ Yield: {proposal.annualProductionKWh.toLocaleString()} kWh</p>
                    <p>💵 Savings: ${proposal.monthlySavings}/mo</p>
                    <p>🌳 CO2 Offset: {proposal.annualCarbonOffsetTons} tons/yr</p>
                  </div>
                  <div>Interactive layout: <span className="text-blue-400 underline">sparkwebsite.com/p/{formData.zipCode}</span></div>
                </div>

                <div className="max-w-[85%] bg-[#26262a] rounded-2xl py-2.5 px-3.5 text-white/90 self-start leading-relaxed shadow-sm font-medium">
                  Click here to schedule a consultation: <span className="text-blue-400 underline">cal.com/rocketlaunch/strategy-call</span>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="px-3.5 py-2.5 border-t border-white/5 bg-[#121212] flex items-center gap-2 shrink-0">
                <div className="flex-grow bg-[#222] border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-white/40 font-semibold">
                  iMessage
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                  ↑
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
