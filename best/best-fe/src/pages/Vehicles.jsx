import React, { useState, useEffect } from 'react';
import FleetHero from '../components/FleetHero';
import MobileFleetHero from '../components/mobile/MobileFleetHero';
import VehicleDetailCard from '../components/VehicleDetailCard';
import { Users, Briefcase, Wind, CheckCircle2, ArrowRight, Car, ShieldCheck, Check, LayoutGrid, Table } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function FleetPage({ onOpenBooking }) {
  const [fleetFilter, setFleetFilter] = useState('all');
  const [tariffMobileMode, setTariffMobileMode] = useState('cards');
  const [dbCars, setDbCars] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDbCars(data);
        }
      })
      .catch(err => console.warn('Could not load vehicles from DB:', err));
  }, []);

  const fleetFilterTabs = [
    { id: 'all', label: 'All Fleet Models (5)' },
    { id: 'Comfort Sedan', label: 'Sedans (₹14/km)' },
    { id: 'Family SUV', label: 'SUVs (₹19/km)' },
    { id: 'Premium SUV', label: 'Innova Crysta (₹22/km)' },
    { id: 'Mini Coach', label: 'Tempo Traveller (₹25/km)' },
    { id: 'Luxury Van', label: 'Force Urbania (₹33/km)' },
  ];

  const fleetTypes = [
    {
      title: 'Comfort Sedans',
      model: 'Swift Dzire / Etios',
      capacity: '4 Passengers (₹14/km)',
      bestFor: 'Couples & small families | Min 250 km',
    },
    {
      title: 'Family SUVs',
      model: 'Ertiga / Carens',
      capacity: '6 Passengers (₹19/km)',
      bestFor: 'Spacious luggage & family trips | Min 300 km',
    },
    {
      title: 'Premium SUVs',
      model: 'Toyota Innova Crysta',
      capacity: '6 to 7 Passengers (₹22/km)',
      bestFor: 'Captain seats & long pilgrimages | Min 350 km',
    },
    {
      title: 'Tempo & Urbania',
      model: 'Traveller (₹25/km) / Urbania (₹33/km)',
      capacity: '12 to 17 Passengers',
      bestFor: 'Extended families, groups & corporate tours',
    },
  ];

  const defaultFleet = [
    {
      id: 'innova-crysta',
      name: 'Innova Crysta',
      category: 'Premium SUV',
      image: '/images/vehicles/innova.png',
      seats: '7 Passengers',
      seatsMobile: '7 Seater',
      seaterLabel: '7 Seater',
      luggage: '4 Large Bags',
      luggageMobile: '4 Bags',
      ac: 'Dual Zone Climate AC',
      rate: '₹20/km',
      outstationRate: '₹20/km',
      minDistance: 'Above 300 kms',
      driverCharge: 'Rs. 300 / day',
      dayBaseRent: 'Rs. 2500',
      dayPerKm: 'Rs. 16/km',
      dayDriverCharge: 'Rs. 300 / day',
      startingFrom: '₹20/km',
      specs: [
        'Minimum 300 km / day',
        'Driver Charge: Rs. 300 / day',
        'Captain luxury reclining seats',
        'Dual AC & smooth highway ride'
      ],
      idealFor: 'Executive travel, family pilgrimages & luxury tours',
    },
    {
      id: 'sedan-dzire',
      name: 'Swift Dzire / Etios',
      category: 'Comfort Sedan',
      image: '/images/vehicles/sedan.png',
      seats: '4 + 1 Passengers',
      seatsMobile: '4 Seater',
      seaterLabel: '4 Seater',
      luggage: '2 Large Bags',
      luggageMobile: '2 Bags',
      ac: 'Climate Control AC',
      rate: '₹14/km',
      outstationRate: '₹14/km',
      minDistance: 'Above 250 kms',
      driverCharge: 'Rs. 300 / day',
      dayBaseRent: 'Rs. 2200',
      dayPerKm: 'Rs. 14/km',
      dayDriverCharge: 'Rs. 300 / day',
      startingFrom: '₹14/km',
      specs: [
        'Minimum 250 km / day',
        'Driver Charge: Rs. 300 / day',
        'Quiet cabin & efficient ride',
        'Ideal for couples & local trips'
      ],
      idealFor: 'Couples, small families & executive travel',
    },
    {
      id: 'suv-ertiga',
      name: 'Maruti Ertiga / Carens',
      category: 'Family SUV',
      image: '/images/vehicles/suv.png',
      seats: '6 + 1 Passengers',
      seatsMobile: '6 Seater',
      seaterLabel: '6 Seater',
      luggage: '3 Large Bags + Carrier',
      luggageMobile: '3 Bags',
      ac: 'Dual AC',
      rate: '₹19/km',
      outstationRate: '₹19/km',
      minDistance: 'Above 300 kms',
      driverCharge: 'Rs. 350 / day',
      dayBaseRent: 'Rs. 2800',
      dayPerKm: 'Rs. 16/km',
      dayDriverCharge: 'Rs. 350 / day',
      startingFrom: '₹19/km',
      specs: [
        'Minimum 300 km / day',
        'Driver Charge: Rs. 350 / day',
        'Flexible 3rd row seating & carrier',
        'Spacious legroom for families'
      ],
      idealFor: 'Families & long-distance outstation travel',
    },
    {
      id: 'tempo-traveller',
      name: 'Force Tempo Traveller',
      category: 'Mini Coach',
      image: '/images/vehicles/tempo.png',
      seats: '12 / 17 Passengers',
      seatsMobile: '12-17 Seater',
      seaterLabel: '12-17 Seater',
      luggage: '10 Large Bags + Roof Carrier',
      luggageMobile: '10 Bags',
      ac: 'Individual Overhead AC Vents',
      rate: '₹25/km',
      outstationRate: '₹25/km',
      minDistance: 'Above 300 kms',
      driverCharge: 'Rs. 500 / day',
      dayBaseRent: 'Rs. 5500',
      dayPerKm: 'Rs. 22/km',
      dayDriverCharge: 'Rs. 500 / day',
      startingFrom: '₹25/km',
      specs: [
        'Minimum 300 km / day',
        'Driver Charge: Rs. 500 / day',
        '2x1 executive pushback seats',
        'Sound system & luggage carrier'
      ],
      idealFor: 'Navagraha temple groups & family events',
    },
    {
      id: 'force-urbania',
      name: 'Force Urbania Luxury Van',
      category: 'Luxury Van',
      image: '/images/vehicles/urbania.png',
      seats: '12 / 17 Luxury Passengers',
      seatsMobile: '12-17 Seater',
      seaterLabel: '12-17 Seater',
      luggage: 'Dedicated Rear Luggage Hold',
      luggageMobile: 'Hold Cargo',
      ac: 'Panoramic Climate Control',
      rate: '₹33/km',
      outstationRate: '₹33/km',
      minDistance: 'Above 300 kms',
      driverCharge: 'Rs. 600 / day',
      dayBaseRent: 'Rs. 7500',
      dayPerKm: 'Rs. 28/km',
      dayDriverCharge: 'Rs. 600 / day',
      startingFrom: '₹33/km',
      specs: [
        'Minimum 300 km / day',
        'Driver Charge: Rs. 600 / day',
        'European styling & luxury armchairs',
        'Panoramic windows & ambient cabin'
      ],
      idealFor: 'VIP delegations, weddings & luxury groups',
    },
  ];

  // Dynamically map fleet models from DB
  // Dynamically map fleet models from DB
  const formattedDbFleet = dbCars.map((c) => {
    let cat = 'Comfort Sedan';
    const nameLower = (c.name || '').toLowerCase();
    let seater = '4 Seater';
    let minKm = 'Above 300 kms';
    let outstationRate = c.price ? c.price.replace('/ km', '/km') : '₹20/km';
    let baseRent = 'Rs. 2500';
    let perKm = 'Rs. 16/km';
    let drvCharge = 'Rs. 300 / day';

    if (nameLower.includes('innova') || nameLower.includes('crysta')) {
      cat = 'Premium SUV';
      seater = '7 Seater';
      minKm = 'Above 300 kms';
      baseRent = 'Rs. 2500';
      perKm = 'Rs. 16/km';
      drvCharge = 'Rs. 300 / day';
    } else if (nameLower.includes('suv') || nameLower.includes('ertiga') || nameLower.includes('carens')) {
      cat = 'Family SUV';
      seater = '6 Seater';
      minKm = 'Above 300 kms';
      baseRent = 'Rs. 2800';
      perKm = 'Rs. 16/km';
      drvCharge = 'Rs. 350 / day';
    } else if (nameLower.includes('urbania')) {
      cat = 'Luxury Van';
      seater = '12-17 Seater';
      minKm = 'Above 300 kms';
      baseRent = 'Rs. 7500';
      perKm = 'Rs. 28/km';
      drvCharge = 'Rs. 600 / day';
    } else if (nameLower.includes('tempo') || nameLower.includes('traveller')) {
      cat = 'Mini Coach';
      seater = '12-17 Seater';
      minKm = 'Above 300 kms';
      baseRent = 'Rs. 5500';
      perKm = 'Rs. 22/km';
      drvCharge = 'Rs. 500 / day';
    } else if (nameLower.includes('bus') || nameLower.includes('coach')) {
      cat = 'Bus Charter';
      seater = '36-49 Seater';
      minKm = 'By Itinerary';
      baseRent = 'Custom Quote';
      perKm = 'Custom Quote';
      drvCharge = 'Included';
    } else {
      seater = c.seats ? c.seats.split(' ')[0] + ' Seater' : '4 Seater';
      minKm = 'Above 250 kms';
      baseRent = 'Rs. 2200';
      perKm = 'Rs. 14/km';
      drvCharge = 'Rs. 300 / day';
    }

    const desc = c.desc || '';
    const bataMatch = desc.match(/bata[:\s]*₹?\s*(\d+)/i);
    const minKmMatch = desc.match(/minimum[:\s]*(\d+)\s*km/i);
    if (bataMatch) drvCharge = 'Rs. ' + bataMatch[1] + ' / day';
    if (minKmMatch) minKm = 'Above ' + minKmMatch[1] + ' kms';

    return {
      id: c.id,
      name: c.name,
      category: cat,
      image: c.image ? (c.image.startsWith('/uploads/') ? `${API_BASE_URL}${c.image}` : c.image) : '/images/vehicles/sedan.png',
      seats: c.seats || seater,
      seatsMobile: seater,
      seaterLabel: seater,
      luggage: '2-4 Large Bags',
      luggageMobile: 'Luggage Space',
      ac: c.ac || 'AC',
      rate: c.price,
      outstationRate: outstationRate,
      minDistance: minKm,
      driverCharge: drvCharge,
      dayBaseRent: baseRent,
      dayPerKm: perKm,
      dayDriverCharge: drvCharge,
      startingFrom: outstationRate,
      specs: desc ? desc.split(/[|\n]+/).map(s => s.trim()).filter(Boolean) : ['Well-maintained commercial vehicle', 'Chauffeur driven'],
      idealFor: c.desc || 'Chauffeur Driven Travel',
    };
  });

  const fleet = formattedDbFleet.length > 0 ? formattedDbFleet : defaultFleet;

  // Build dynamic tariffs list directly from DB records
  const dynamicTariffs = dbCars.map((c) => {
    const desc = c.desc || '';
    const bataMatch = desc.match(/bata[:\s]*₹?\s*(\d+)/i);
    const minKmMatch = desc.match(/minimum[:\s]*(\d+)\s*km/i);
    const nightMatch = desc.match(/night\s*halt[:\s]*₹?\s*(\d+)/i);

    return {
      vehicle: c.name,
      perKm: c.price,
      minKm: minKmMatch ? `${minKmMatch[1]} km / day` : (c.price.includes('Custom') ? 'By Itinerary' : '300 km / day'),
      driverBata: bataMatch ? `₹${bataMatch[1]} / day` : (c.price.includes('Custom') ? 'Included in Quote' : 'Standard Bata'),
      nightCharge: nightMatch ? `₹${nightMatch[1]} (after 10 PM)` : (c.price.includes('Custom') ? 'Included in Quote' : '₹400 (after 10 PM)')
    };
  });

  const defaultTariffs = [
    { vehicle: 'Sedan (Dzire / Etios) (4+1)', perKm: '₹14 / km', minKm: '250 km / day', driverBata: '₹400 / day', nightCharge: '₹300 (after 10 PM)' },
    { vehicle: 'SUV (Ertiga / Carens) (6+1)', perKm: '₹19 / km', minKm: '300 km / day', driverBata: '₹500 / day', nightCharge: '₹400 (after 10 PM)' },
    { vehicle: 'Toyota Innova Crysta (6+1 / 7+1)', perKm: '₹22 / km', minKm: '350 km / day', driverBata: '₹600 / day', nightCharge: '₹400 (after 10 PM)' },
    { vehicle: 'Force Tempo Traveller (12/17)', perKm: '₹25 / km', minKm: '300 km / day', driverBata: '₹700 / day', nightCharge: '₹500 (after 10 PM)' },
    { vehicle: 'Force Urbania Luxury (12/17)', perKm: '₹33 / km', minKm: '300 km / day', driverBata: '₹800 / day', nightCharge: '₹500 (after 10 PM)' },
  ];

  const tariffs = dynamicTariffs.length > 0 ? dynamicTariffs : defaultTariffs;

  return (
    <div className="pb-16 md:pb-0">
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobileFleetHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) with landscape fleet background */}
      <div className="hidden md:block">
        <FleetHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Quick Fleet Categories */}
      <section className="py-10 sm:py-16 px-4 sm:px-10 bg-[#FAF8F5] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 border-b border-neutral-300 pb-4 sm:pb-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Well-Maintained Vehicles • All Luxury Car Available
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                Ready for Every Group & Route
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-neutral-600 max-w-md">
              Available 24/7 for Airport pickup and drop, Local trip, Outstation Trip, Corporation trip, Family trip, and Honeymoon trip.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {fleetTypes.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200 rounded-xl p-3 sm:p-5 flex flex-col justify-between hover:shadow-md hover:border-brand-gold-dark/50 transition-all duration-300 active:scale-95 group"
              >
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-xs font-bold text-brand-gold-dark bg-brand-gold/10 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                      {item.capacity}
                    </span>
                    <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-brand-gold-dark transition-colors shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors truncate whitespace-nowrap">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-neutral-700 truncate whitespace-nowrap">
                    {item.model}
                  </p>
                  <p className="text-[9px] sm:text-xs text-neutral-500 leading-snug sm:leading-relaxed truncate whitespace-nowrap">
                    {item.bestFor}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-neutral-100">
                  <button
                    onClick={() => onOpenBooking({ vehicle: item.title })}
                    className="w-full btn-gold py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95 transition-all whitespace-nowrap"
                  >
                    <span>Check Availability</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Fleet Cards with Interactive Filter & Showroom Animations */}
      <section className="py-12 sm:py-20 px-4 sm:px-10 bg-[#1b203d] text-white relative overflow-hidden">
        {/* Ambient radial gold glow behind section */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-gold/20 pb-5 sm:pb-6 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">
                Commercial Fleet Overview
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white">
                Available Vehicles & Specifications
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                Every vehicle is mechanically inspected, AC-tested, and chauffeur-driven across Tamil Nadu and South India.
              </p>
            </div>

            {/* Quick trust badge */}
            <div className="flex items-center gap-2 text-xs text-brand-gold bg-[#1b203d] border border-brand-gold/30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="font-semibold text-neutral-200">100% Commercial Tourist Permits</span>
            </div>
          </div>

          {/* Category Filter Pills with Smooth Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 pt-1 pb-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap sm:flex-wrap">
            {fleetFilterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFleetFilter(tab.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  fleetFilter === tab.id
                    ? 'btn-gold shadow-md scale-[1.02]'
                    : 'bg-[#1b203d] border border-brand-gold/20 text-neutral-300 hover:border-brand-gold/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Vehicles Details Display Grid (Exact requested structure) */}
          <div className="space-y-6 sm:space-y-8">
            {(fleetFilter === 'all' ? fleet : fleet.filter(item => item.category === fleetFilter)).map((item) => (
              <VehicleDetailCard
                key={item.id}
                vehicle={item}
                onOpenBooking={onOpenBooking}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Tariff Schedule Table with Single-line Mobile & Desktop Alignment */}
      <section id="tariff-table" className="py-10 sm:py-20 px-3.5 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-8 pb-4 sm:pb-5 border-b border-neutral-300 gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Transparent Tariffs
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                Standard Tariff Schedule
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Transparent outstation per-km rates with verified drivers. Toll charges, parking fees, and interstate permits are billed as actuals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-dark bg-white border border-brand-gold/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-2xs shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-4 h-4 text-brand-gold-dark shrink-0" />
              <span>No Hidden Charges • Clear Allowances</span>
            </div>
          </div>

          {/* Mobile Display Mode Switcher (Cards vs Table) */}
          <div className="flex md:hidden items-center justify-between mb-3 px-1">
            <span className="text-[11px] text-neutral-500 font-semibold">Tariff View:</span>
            <div className="inline-flex p-0.5 bg-neutral-200/90 rounded-lg text-[11px] font-bold">
              <button
                onClick={() => setTariffMobileMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  tariffMobileMode === 'cards'
                    ? 'bg-[#1b203d] text-brand-gold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setTariffMobileMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  tariffMobileMode === 'table'
                    ? 'bg-[#1b203d] text-brand-gold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Table className="w-3 h-3" />
                <span>Table</span>
              </button>
            </div>
          </div>

          {/* 1. Dedicated Mobile-Optimized Tariff Cards (100% Single-Line Fit on Mobile) */}
          <div className={`md:hidden ${tariffMobileMode === 'cards' ? 'block' : 'hidden'} space-y-2.5 mb-6`}>
            {tariffs.map((t) => (
              <div 
                key={t.vehicle} 
                className="bg-white rounded-xl border border-brand-gold/35 p-3.5 shadow-sm space-y-2.5 transition-all"
              >
                {/* Row 1: Vehicle & Base Rate Single Line */}
                <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Car className="w-4 h-4 text-brand-gold-dark shrink-0" />
                    <span className="text-xs font-bold text-neutral-900 truncate whitespace-nowrap">{t.vehicle}</span>
                  </div>
                  <span className="bg-brand-gold/15 text-brand-gold-dark font-mono font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-brand-gold/30 shrink-0 whitespace-nowrap">
                    {t.perKm}
                  </span>
                </div>

                {/* Row 2: 3 Metrics in Single-Line Row */}
                <div className="grid grid-cols-3 gap-1.5 text-center bg-[#FAF8F5] rounded-lg p-2 border border-neutral-100 text-[11px]">
                  <div className="truncate overflow-hidden">
                    <span className="text-[9px] uppercase font-bold text-neutral-400 block whitespace-nowrap">Min Km</span>
                    <span className="font-semibold text-neutral-800 whitespace-nowrap text-[11px]">{t.minKm.split('/')[0].trim()}</span>
                  </div>
                  <div className="truncate overflow-hidden border-x border-neutral-200 px-1">
                    <span className="text-[9px] uppercase font-bold text-neutral-400 block whitespace-nowrap">Driver Bata</span>
                    <span className="font-semibold text-neutral-800 whitespace-nowrap text-[11px]">{t.driverBata.replace(' / day', '/d')}</span>
                  </div>
                  <div className="truncate overflow-hidden">
                    <span className="text-[9px] uppercase font-bold text-neutral-400 block whitespace-nowrap">Night Halt</span>
                    <span className="font-semibold text-neutral-800 whitespace-nowrap text-[11px]">{t.nightCharge.split('(')[0].trim()}</span>
                  </div>
                </div>

                {/* Row 3: Single Line Booking Button */}
                <button
                  onClick={() => onOpenBooking({ vehicle: t.vehicle })}
                  className="w-full btn-gold py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all whitespace-nowrap"
                >
                  <span>Book {t.vehicle.split('(')[0].trim()}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            ))}
          </div>

          {/* 2. Full Table Container (Always shown on desktop, toggleable on mobile with Single-Line Cells) */}
          <div className={`${tariffMobileMode === 'table' ? 'block' : 'hidden md:block'}`}>
            
            {/* Mobile Horizontal Swipe Indicator */}
            <div className="md:hidden flex items-center justify-between text-[11px] text-neutral-500 mb-2 px-1">
              <span>Swipe horizontally to view all columns</span>
              <span className="text-brand-gold-dark font-bold font-mono">⇄ Scroll</span>
            </div>

            <div className="p-[2px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-gold via-amber-200 to-brand-gold shadow-lg shadow-brand-gold/15">
              <div className="rounded-[calc(0.75rem-1px)] sm:rounded-[calc(1rem-1px)] overflow-hidden bg-white">
                
                <div className="overflow-x-auto no-scrollbar sm:scrollbar-thin">
                  <table className="w-full text-left border-collapse">
                    
                    {/* Rich Dark Header with Single-line fit */}
                    <thead>
                      <tr className="bg-gradient-to-r from-[#1b203d] via-[#1b203d] to-[#0f1426] text-white">
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-brand-gold border-r border-white/10 whitespace-nowrap">
                          Vehicle Category
                        </th>
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-brand-gold border-r border-white/10 whitespace-nowrap">
                          Base Tariff
                        </th>
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-neutral-200 border-r border-white/10 whitespace-nowrap">
                          Min Km / Day
                        </th>
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-neutral-200 border-r border-white/10 whitespace-nowrap">
                          Driver Bata
                        </th>
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-neutral-200 border-r border-white/10 whitespace-nowrap">
                          Night Halt
                        </th>
                        <th className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider text-brand-gold text-center whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>

                    {/* Body with Single-line fit for all data cells */}
                    <tbody className="divide-y divide-neutral-200 text-xs sm:text-sm">
                      {tariffs.map((t, idx) => (
                        <tr 
                          key={t.vehicle} 
                          className={`transition-colors duration-200 hover:bg-amber-50/70 ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]/80'
                          }`}
                        >
                          {/* Vehicle Category */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 font-bold text-neutral-900 border-r border-neutral-100 whitespace-nowrap">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                              <Car className="w-4 h-4 text-brand-gold-dark shrink-0" />
                              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{t.vehicle}</span>
                            </div>
                          </td>

                          {/* Base Tariff Badge */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 border-r border-neutral-100 whitespace-nowrap">
                            <span className="inline-block bg-brand-gold/15 text-brand-gold-dark font-extrabold font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-brand-gold/30 shadow-2xs whitespace-nowrap">
                              {t.perKm}
                            </span>
                          </td>

                          {/* Min Km */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 font-medium text-neutral-700 border-r border-neutral-100 whitespace-nowrap">
                            <span className="bg-neutral-100 text-neutral-800 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-xs font-semibold whitespace-nowrap">
                              {t.minKm}
                            </span>
                          </td>

                          {/* Driver Bata */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 font-semibold text-neutral-800 border-r border-neutral-100 whitespace-nowrap text-xs sm:text-sm">
                            {t.driverBata}
                          </td>

                          {/* Night Halt */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 text-neutral-600 border-r border-neutral-100 text-xs sm:text-sm whitespace-nowrap">
                            {t.nightCharge}
                          </td>

                          {/* Direct Booking CTA */}
                          <td className="py-3 px-3.5 sm:py-4 sm:px-5 text-center whitespace-nowrap">
                            <button
                              onClick={() => onOpenBooking({ vehicle: t.vehicle })}
                              className="btn-gold px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform whitespace-nowrap"
                            >
                              <span>Book</span>
                              <ArrowRight className="w-3 h-3 shrink-0" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                {/* Bottom Clarification Notice */}
                <div className="bg-[#FAF8F5] p-3 sm:p-4 border-t border-neutral-200 text-[11px] sm:text-xs text-neutral-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-brand-gold-dark font-bold font-mono">NOTE:</span>
                    <span>Garage-to-garage basis • 6:00 AM to 10:00 PM calendar day.</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-700 font-medium whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-brand-gold-dark" />
                      <span>No Hidden Fees</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-brand-gold-dark" />
                      <span>GST Bill on Request</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
