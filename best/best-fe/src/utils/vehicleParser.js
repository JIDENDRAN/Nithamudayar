import { getVehicleImage } from './imageImports.js';

/**
 * Parses raw vehicle records from PostgreSQL / SQLite / API into a standardized,
 * complete vehicle object ready for VehicleDetailCard and vehicle catalog display.
 */
export function parseVehicleFromDb(c) {
  if (!c) return null;

  const desc = c.desc || '';
  const name = c.name || 'Vehicle';
  const nameLower = name.toLowerCase();

  // Smart defaults based on category
  let defaultCategory = 'Comfort Sedan';
  let defaultSeater = '4 Seater';
  let defaultOutstationRate = '₹14/km';
  let defaultMinDistance = 'Above 250 kms';
  let defaultDriverCharge = 'Rs. 400 / day';
  let defaultBaseRent = 'Rs. 2200';
  let defaultDayPerKm = 'Rs. 14/km';
  let defaultLuggage = '2 Large Bags';
  let defaultLuggageMobile = '2 Bags';

  if (nameLower.includes('urbania')) {
    defaultCategory = 'Luxury Van';
    defaultSeater = '12-17 Seater';
    defaultOutstationRate = '₹33/km';
    defaultMinDistance = 'Above 300 kms';
    defaultDriverCharge = 'Rs. 900 / day';
    defaultBaseRent = 'Rs. 7500';
    defaultDayPerKm = 'Rs. 28/km';
    defaultLuggage = 'Dedicated Rear Luggage Hold';
    defaultLuggageMobile = 'Hold Cargo';
  } else if (nameLower.includes('tempo') || nameLower.includes('traveller')) {
    defaultCategory = 'Mini Coach';
    defaultSeater = '12-17 Seater';
    defaultOutstationRate = '₹25/km';
    defaultMinDistance = 'Above 300 kms';
    defaultDriverCharge = 'Rs. 700 / day';
    defaultBaseRent = 'Rs. 5500';
    defaultDayPerKm = 'Rs. 22/km';
    defaultLuggage = '10 Large Bags + Roof Carrier';
    defaultLuggageMobile = '10 Bags';
  } else if (nameLower.includes('crysta') || (nameLower.includes('innova') && !nameLower.includes('ertiga') && !nameLower.includes('carens'))) {
    defaultCategory = 'Premium SUV';
    defaultSeater = '7 Seater';
    defaultOutstationRate = '₹22/km';
    defaultMinDistance = 'Above 300 kms';
    defaultDriverCharge = 'Rs. 600 / day';
    defaultBaseRent = 'Rs. 3200';
    defaultDayPerKm = 'Rs. 18/km';
    defaultLuggage = '4 Large Bags';
    defaultLuggageMobile = '4 Bags';
  } else if (nameLower.includes('suv') || nameLower.includes('ertiga') || nameLower.includes('carens')) {
    defaultCategory = 'Family SUV';
    defaultSeater = '6 Seater';
    defaultOutstationRate = '₹19/km';
    defaultMinDistance = 'Above 300 kms';
    defaultDriverCharge = 'Rs. 600 / day';
    defaultBaseRent = 'Rs. 2700';
    defaultDayPerKm = 'Rs. 15/km';
    defaultLuggage = '3 Large Bags + Carrier';
    defaultLuggageMobile = '3 Bags';
  }

  // Parse structured sections from DB desc
  let outstationRateRaw = '';
  let outstationMinKmRaw = '';
  let outstationDriverRaw = '';
  let dayBaseRentRaw = '';
  let dayPerKmRaw = '';
  let dayDriverRaw = '';

  const lines = desc.split('\n');
  let currentSection = '';
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.includes('[Outstation Plan]')) currentSection = 'outstation';
    else if (trimmed.includes('[Day Rental Plan]')) currentSection = 'day';
    else if (trimmed.includes(':')) {
      const [k, ...vParts] = trimmed.split(':');
      const key = k.trim().toLowerCase();
      const val = vParts.join(':').trim();
      if (currentSection === 'outstation') {
        if (key === 'rate') outstationRateRaw = val;
        else if (key === 'min distance') outstationMinKmRaw = val;
        else if (key === 'driver charge') outstationDriverRaw = val;
      } else if (currentSection === 'day') {
        if (key === 'base rent') dayBaseRentRaw = val;
        else if (key === 'per km charge') dayPerKmRaw = val;
        else if (key === 'driver charge') dayDriverRaw = val;
      }
    }
  });

  // Legacy regex fallbacks if structured section was not present
  if (!outstationDriverRaw) {
    const bataMatch = desc.match(/bata[:\s]*₹?\s*(\d+)/i);
    if (bataMatch) outstationDriverRaw = bataMatch[1];
  }
  if (!outstationMinKmRaw) {
    const minMatch = desc.match(/minimum[:\s]*(\d+)\s*km/i);
    if (minMatch) outstationMinKmRaw = minMatch[1];
  }

  // Formatters with clean unit standardization
  const formatPriceRate = (raw, fallback) => {
    if (!raw || !raw.trim()) return fallback;
    const clean = raw.trim();
    if (clean.includes('/km') || clean.includes('/ km')) {
      return clean.replace('/ km', '/km').replace('Rs.', '₹').replace('Rs', '₹');
    }
    const numMatch = clean.match(/(\d+)/);
    return numMatch ? `₹${numMatch[1]}/km` : fallback;
  };

  const formatDistance = (raw, fallback) => {
    if (!raw || !raw.trim()) return fallback;
    const clean = raw.trim();
    if (clean.toLowerCase().startsWith('above')) return clean;
    const numMatch = clean.match(/(\d+)/);
    return numMatch ? `Above ${numMatch[1]} kms` : fallback;
  };

  const formatCharge = (raw, fallback) => {
    if (!raw || !raw.trim()) return fallback;
    const clean = raw.trim();
    if (clean.toLowerCase().includes('/ day') || clean.toLowerCase().includes('/day')) {
      return clean.replace('₹', 'Rs. ').replace('/day', ' / day');
    }
    const numMatch = clean.match(/(\d+)/);
    return numMatch ? `Rs. ${numMatch[1]} / day` : fallback;
  };

  const formatBase = (raw, fallback) => {
    if (!raw || !raw.trim()) return fallback;
    const clean = raw.trim();
    if (clean.toLowerCase().startsWith('rs.')) return clean.split('/')[0].trim();
    const numMatch = clean.match(/(\d+)/);
    return numMatch ? `Rs. ${numMatch[1]}` : fallback;
  };

  const formatPerKmVal = (raw, fallback) => {
    if (!raw || !raw.trim()) return fallback;
    const clean = raw.trim();
    if (clean.toLowerCase().includes('/km') || clean.toLowerCase().includes('/ km')) {
      return clean.replace('/ km', '/km').replace('₹', 'Rs. ');
    }
    const numMatch = clean.match(/(\d+)/);
    return numMatch ? `Rs. ${numMatch[1]}/km` : fallback;
  };

  // Parse seater label cleanly
  let seaterLabel = defaultSeater;
  if (c.seats) {
    const s = c.seats.trim();
    if (s.toLowerCase().includes('seater')) {
      seaterLabel = s;
    } else if (s.includes('+')) {
      const p = s.match(/(\d+)\s*\+\s*(\d+)/);
      seaterLabel = p ? `${p[1]} Seater` : s;
    } else if (s.includes('/')) {
      const digits = s.match(/\d+/g);
      if (digits && digits.length >= 2) {
        seaterLabel = `${digits[0]}-${digits[digits.length - 1]} Seater`;
      } else {
        seaterLabel = s;
      }
    } else {
      const num = s.match(/(\d+)/);
      seaterLabel = num ? `${num[1]} Seater` : defaultSeater;
    }
  }

  const outstationRate = formatPriceRate(outstationRateRaw || c.price, defaultOutstationRate);
  const minDistance = formatDistance(outstationMinKmRaw, defaultMinDistance);
  const driverCharge = formatCharge(outstationDriverRaw, defaultDriverCharge);
  const dayBaseRent = formatBase(dayBaseRentRaw, defaultBaseRent);
  const dayPerKm = formatPerKmVal(dayPerKmRaw, defaultDayPerKm);
  const dayDriverCharge = formatCharge(dayDriverRaw || outstationDriverRaw, defaultDriverCharge);
  const startingFrom = outstationRate;

  // Resolve vehicle image safely
  const image = getVehicleImage(c.image);

  return {
    id: c.id,
    name: c.name,
    category: defaultCategory,
    seaterLabel,
    seatsMobile: seaterLabel,
    seats: c.seats || seaterLabel,
    ac: c.ac || 'AC',
    luggage: defaultLuggage,
    luggageMobile: defaultLuggageMobile,
    image,
    rate: outstationRate,
    outstationRate,
    minDistance,
    driverCharge,
    dayBaseRent,
    dayPerKm,
    dayDriverCharge,
    startingFrom,
    specs: desc ? desc.split(/[|\n]+/).map(s => s.trim()).filter(Boolean) : ['Well-maintained commercial vehicle', 'Chauffeur driven'],
    idealFor: c.desc || 'Chauffeur Driven Travel'
  };
}

