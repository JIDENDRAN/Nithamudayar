import React, { useState, useEffect } from 'react';
import FleetHero from '../components/FleetHero';
import MobileFleetHero from '../components/mobile/MobileFleetHero';
import VehicleDetailCard from '../components/VehicleDetailCard';
import { Users, Briefcase, Wind, CheckCircle2, ArrowRight, Car, ShieldCheck, Check, LayoutGrid, Table } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import { parseVehicleFromDb } from '../utils/vehicleParser';

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
    { id: 'all', label: 'All Fleet Models' },
    { id: 'Comfort Sedan', label: 'Sedans' },
    { id: 'Family SUV', label: 'SUVs' },
    { id: 'Premium SUV', label: 'Innova Crysta' },
    { id: 'Mini Coach', label: 'Tempo Traveller' },
    { id: 'Luxury Van', label: 'Force Urbania' },
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

  // Dynamically map fleet models directly from DB records
  const formattedDbFleet = dbCars.map(c => parseVehicleFromDb(c)).filter(Boolean);

  const fleet = formattedDbFleet.length > 0 ? formattedDbFleet : defaultFleet;

  // Build dynamic tariffs list directly from DB records
  const dynamicTariffs = dbCars.map((c) => {
    const parsed = parseVehicleFromDb(c);
    return {
      vehicle: `${c.name} (${parsed.seaterLabel})`,
      perKm: parsed.outstationRate,
      minKm: parsed.minDistance,
      driverBata: parsed.driverCharge,
      nightCharge: '₹400 (after 10 PM)'
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${fleetFilter === tab.id
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



    </div>
  );
}
