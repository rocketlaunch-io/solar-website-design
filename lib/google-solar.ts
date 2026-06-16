/**
 * Helper client for Google Geocoding and Google Solar APIs
 * Handles address parsing, coordinates resolution, and rooftop solar insights.
 * Includes high-fidelity mock fallbacks for safe local testing and builds.
 */

export interface SolarInsights {
  address: string;
  lat: number;
  lng: number;
  maxPanelsCount: number;
  panelCapacityWatts: number;
  carbonOffsetFactorKgPerMwh: number;
  roofAreaSqFt: number;
  annualProductionKWh: number;
  estimatedSystemSizeKW: number;
  sunlightHoursPerYear: number;
  isMock: boolean;
}

/**
 * Resolves a text address into latitude and longitude coordinates
 */
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number; formattedAddress: string }> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_COPIED_API_KEY_HERE') {
    console.warn('Google Maps API key is missing. Falling back to mock geocoding.');
    return getMockCoordinates(address);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        formattedAddress: data.results[0].formatted_address,
      };
    } else {
      throw new Error(`Geocoding status: ${data.status}`);
    }
  } catch (error) {
    console.error('Geocoding API failed, using mock coordinate fallback:', error);
    return getMockCoordinates(address);
  }
}

/**
 * Retrieves solar insights from the Google Solar API buildingInsights endpoint
 */
export async function getSolarInsights(
  address: string,
  lat: number,
  lng: number
): Promise<SolarInsights> {
  const apiKey = process.env.GOOGLE_SOLAR_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_COPIED_API_KEY_HERE') {
    console.warn('Google Solar API key is missing. Using high-fidelity mock fallback.');
    return generateMockInsights(address, lat, lng);
  }

  try {
    // Call Google Solar API buildingInsights:findClosest endpoint
    const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${apiKey}`;
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    
    // Parse Google Solar response
    const maxPanelsCount = data.maxRooftopPanelsCount || data.solarPotential?.maxArrayPanelsCount || 24;
    const panelCapacityWatts = data.solarPotential?.panelCapacityWatts || 370;
    const carbonOffsetFactor = data.solarPotential?.carbonOffsetFactorKgPerMwh || 600;
    
    // Convert roof area from sq meters to sq feet (1 sq m = 10.7639 sq ft)
    const areaMeters2 = data.solarPotential?.wholeRoofStats?.areaMeters2 || 85;
    const roofAreaSqFt = Math.round(areaMeters2 * 10.7639);
    
    const estimatedSystemSizeKW = (maxPanelsCount * panelCapacityWatts) / 1000;
    
    // Extract annual production or calculate
    let annualProductionKWh = 0;
    if (data.solarPotential?.wholeRoofStats?.sunshineQuantiles) {
      // Sunshine hours can be inferred from the quantiles or average annual flux
      const quantiles = data.solarPotential.wholeRoofStats.sunshineQuantiles;
      const avgSunshineHours = quantiles.reduce((a: number, b: number) => a + b, 0) / quantiles.length;
      // Convert to estimated annual production
      annualProductionKWh = Math.round(estimatedSystemSizeKW * avgSunshineHours * 0.82);
    } else {
      // Default fallback math based on standard sunshine hours for latitude
      const sunshineMultiplier = Math.max(3.5, 6.0 - Math.abs(lat) / 15); // standard estimation
      annualProductionKWh = Math.round(estimatedSystemSizeKW * sunshineMultiplier * 365 * 0.82);
    }

    return {
      address,
      lat,
      lng,
      maxPanelsCount,
      panelCapacityWatts,
      carbonOffsetFactorKgPerMwh: carbonOffsetFactor,
      roofAreaSqFt,
      annualProductionKWh,
      estimatedSystemSizeKW: parseFloat(estimatedSystemSizeKW.toFixed(2)),
      sunlightHoursPerYear: Math.round(annualProductionKWh / (estimatedSystemSizeKW * 0.82)),
      isMock: false,
    };
  } catch (error) {
    console.error('Google Solar API failed. Falling back to high-fidelity mock insights:', error);
    return generateMockInsights(address, lat, lng);
  }
}

/**
 * Mock coordinates helper for geocoding
 */
function getMockCoordinates(address: string): { lat: number; lng: number; formattedAddress: string } {
  // Return different coordinates based on common US cities
  let lat = 37.7749; // San Francisco
  let lng = -122.4194;
  
  const lowerAddress = address.toLowerCase();
  if (lowerAddress.includes('ny') || lowerAddress.includes('new york')) {
    lat = 40.7128;
    lng = -74.0060;
  } else if (lowerAddress.includes('tx') || lowerAddress.includes('austin') || lowerAddress.includes('houston')) {
    lat = 30.2672;
    lng = -97.7431;
  } else if (lowerAddress.includes('az') || lowerAddress.includes('phoenix')) {
    lat = 33.4484;
    lng = -112.0740;
  } else if (lowerAddress.includes('wa') || lowerAddress.includes('seattle')) {
    lat = 47.6062;
    lng = -122.3321;
  } else if (lowerAddress.includes('fl') || lowerAddress.includes('miami') || lowerAddress.includes('orlando')) {
    lat = 28.5383;
    lng = -81.3792;
  } else if (lowerAddress.includes('co') || lowerAddress.includes('denver')) {
    lat = 39.7392;
    lng = -104.9903;
  }

  // Add a tiny bit of random jitter so successive lookups return slightly different values
  const jitterLat = (Math.random() - 0.5) * 0.01;
  const jitterLng = (Math.random() - 0.5) * 0.01;

  return {
    lat: lat + jitterLat,
    lng: lng + jitterLng,
    formattedAddress: address.trim() || '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
  };
}

/**
 * Mock data generator for Google Solar API insights
 */
function generateMockInsights(address: string, lat: number, lng: number): SolarInsights {
  // Generate panel counts based on address hash or random seed
  const charSum = address.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Custom panel counts between 18 and 42 based on address
  const maxPanelsCount = 18 + (charSum % 25); 
  const panelCapacityWatts = 375;
  const estimatedSystemSizeKW = (maxPanelsCount * panelCapacityWatts) / 1000;
  
  // Sunlight hours vary by latitude
  let peakSunlightHours = 4.2; // default New England / Washington
  if (lat < 33) {
    peakSunlightHours = 5.6; // Texas / Arizona / Florida
  } else if (lat < 38) {
    peakSunlightHours = 5.1; // California / South Carolina / Utah
  } else if (lat < 42) {
    peakSunlightHours = 4.6; // Colorado / North Carolina
  }

  const annualProductionKWh = Math.round(estimatedSystemSizeKW * peakSunlightHours * 365 * 0.82);
  const roofAreaSqFt = maxPanelsCount * 22; // approx 22 sq ft per panel + spacing
  const carbonOffsetFactor = 650; // kg CO2 per MWh

  return {
    address,
    lat,
    lng,
    maxPanelsCount,
    panelCapacityWatts,
    carbonOffsetFactorKgPerMwh: carbonOffsetFactor,
    roofAreaSqFt,
    annualProductionKWh,
    estimatedSystemSizeKW: parseFloat(estimatedSystemSizeKW.toFixed(2)),
    sunlightHoursPerYear: Math.round(peakSunlightHours * 365),
    isMock: true,
  };
}
