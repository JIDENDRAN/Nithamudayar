import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MobileHero from '../components/mobile/MobileHero';
import QuickBookingBar from '../components/QuickBookingBar';
import TravelHubsSections from '../components/TravelHubsSections';
import { ArrowRight, Shield, Award, Clock, Users, CheckCircle2, ChevronRight, Sparkles, MapPin, Plane, Navigation, Briefcase, Heart, Check, Car, Wind, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function HomePage({ onOpenBooking }) {
  const [dbCars, setDbCars] = useState([]);
  const [dbPackages, setDbPackages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDbCars(data);
      })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDbPackages(data);
      })
      .catch(() => {});
  }, []);

  const defaultFeaturedFleet = [
    {
      id: 'sedan-dzire',
      name: 'Sedan (Dzire / Etios)',
      category: 'Comfort Sedan (4+1)',
      image: '/images/vehicles/sedan.png',
      seats: '4 + 1 Passengers',
      luggage: '2 Large Bags',
      ac: 'Climate Control AC',
      rate: '₹14 / km',
      minKm: '250 km / day',
      driverBata: '₹400 / day',
      idealFor: 'Couples, small families & executive travel',
      specs: [
        'Silent cabin with smooth suspension',
        'Economical city & outstation travel',
      ],
    },
    {
      id: 'suv-ertiga',
      name: 'SUV (Ertiga / Carens)',
      category: 'Family SUV (6+1)',
      image: '/images/vehicles/suv.png',
      seats: '6 + 1 Passengers',
      luggage: '3 Large Bags + Carrier',
      ac: 'Dual AC Vents',
      rate: '₹19 / km',
      minKm: '300 km / day',
      driverBata: '₹500 / day',
      idealFor: 'Families & long-distance outstation travel',
      specs: [
        'Rooftop carrier for family luggage',
        'Flexible 3rd row comfortable seating',
      ],
    },
    {
      id: 'innova-crysta',
      name: 'Toyota Innova Crysta',
      category: 'Premium SUV (6+1 / 7+1)',
      image: '/images/vehicles/innova.png',
      seats: '6 + 1 / 7 + 1 Passengers',
      luggage: '4 Large Bags',
      ac: 'Dual Zone Climate AC',
      rate: '₹22 / km',
      minKm: '350 km / day',
      driverBata: '₹600 / day',
      idealFor: 'Family temple circuits & luxury journeys',
      specs: [
        'Reclining plush captain seats',
        'High highway stability & safety',
      ],
    },
    {
      id: 'tempo-traveller',
      name: 'Force Tempo Traveller',
      category: 'Mini Coach (12/14/17 Seater)',
      image: '/images/vehicles/tempo.png',
      seats: '12 / 14 / 17 Passengers',
      luggage: '10 Bags + Roof Carrier',
      ac: 'Individual Overhead AC',
      rate: '₹25 / km',
      minKm: '300 km / day',
      driverBata: '₹700 / day',
      idealFor: 'Navagraha temple groups & family events',
      specs: [
        '2x1 executive pushback luxury seats',
        'LED lighting, audio system & high roof',
      ],
    },
    {
      id: 'force-urbania',
      name: 'Force Urbania Luxury Van',
      category: 'Ultra-Luxury (12/17 Seater)',
      image: '/images/vehicles/urbania.png',
      seats: '12 / 17 Luxury Passengers',
      luggage: 'Dedicated Rear Hold',
      ac: 'Panoramic Climate Control',
      rate: '₹33 / km',
      minKm: '300 km / day',
      driverBata: '₹800 / day',
      idealFor: 'VIP delegations, weddings & luxury groups',
      specs: [
        'European styling with reclining armchairs',
        'Panoramic picture windows & soft cabin',
      ],
    },
  ];

  const featuredFleet = (dbCars.length > 0 ? dbCars : defaultFeaturedFleet).map(c => {
    let img = c.image || '/images/vehicles/sedan.png';
    if (img.startsWith('/uploads/')) {
      img = `${API_BASE_URL}${img}`;
    }
    const desc = c.desc || '';
    const bataMatch = desc.match(/bata[:\s]*₹?\s*(\d+)/i);
    const minKmMatch = desc.match(/minimum[:\s]*(\d+)\s*km/i);
    const specsList = c.specs || (c.desc ? c.desc.split(/[|\n]+/).map(s => s.trim()).filter(Boolean) : ['Commercial tourist permit', 'Verified highway chauffeur']);

    return {
      id: c.id || c.name,
      name: c.name,
      category: c.category || c.seats || 'Chauffeur Driven',
      image: img,
      rate: c.rate || c.price || '₹14 / km',
      seats: c.seats || '4 + 1 Passengers',
      luggage: c.luggage || '2 Large Bags',
      ac: c.ac || 'Climate Control AC',
      minKm: c.minKm || (minKmMatch ? `${minKmMatch[1]} km / day` : '300 km / day'),
      driverBata: c.driverBata || (bataMatch ? `₹${bataMatch[1]} / day` : 'Standard Bata'),
      idealFor: c.idealFor || (c.desc ? c.desc.split('|')[0].trim() : 'Chauffeur Driven Travel'),
      specs: specsList.slice(0, 2),
    };
  });

  const defaultFeaturedPackages = [
    {
      id: 1,
      name: 'Tamil Nadu Tourism Circuit',
      duration: '6 Days / 5 Nights',
      price: '₹24,500',
      places: 'Trichy, Thanjavur, Kumbakonam, Madurai, Karaikudi, Rameshwaram, Kanyakumari, Thiruvananthapuram, Coimbatore, Chennai',
      location: '10 Iconic Destinations across Tamil Nadu & Kerala',
      image: '/images/destinations/thanjavur.jpg'
    },
    {
      id: 2,
      name: 'Arupadai Murugan Temple Tour',
      duration: '4 Days / 3 Nights',
      price: '₹14,800',
      places: 'Tiruchendur, Palani, Thiruparankundram, Pazhamudhircholai, Swamimalai, Thiruthani',
      location: 'Six Sacred Holy Abodes of Lord Murugan',
      image: '/images/destinations/murugan.jpg'
    },
    {
      id: 3,
      name: 'Mountain Area Tourism Circuit',
      duration: '5 Days / 4 Nights',
      price: '₹18,500',
      places: 'Kodaikanal, Ooty, Bandipur, Valparai, Munnar, Thekkady, Yercaud',
      location: '7 Scenic Hill Stations & Forest Reserves',
      image: '/images/destinations/kodaikanal.jpg'
    },
    {
      id: 4,
      name: 'Back Water Places Explorer',
      duration: '4 Days / 3 Nights',
      price: '₹16,900',
      places: 'Alappuzha, Fort Kochi, Kumarakom, Mararikulam, Kovalam, Varkala, Jatayu, Mangalam',
      location: '8 Backwater, Lagoon & Coastal Destinations',
      image: '/images/destinations/alleppey.jpg'
    }
  ];

  const featuredPackages = dbPackages.length > 0 ? dbPackages.slice(0, 4) : defaultFeaturedPackages;

  const destinations = [
    { city: 'Tamil Nadu Heritage Circuit', image: '/images/destinations/thanjavur.jpg', tag: 'Trichy • Thanjavur • Madurai • Rameshwaram' },
    { city: 'Arupadai Murugan Temple Tour', image: '/images/destinations/murugan.jpg', tag: 'Tiruchendur • Palani • Swamimalai • Thiruthani' },
    { city: 'Mountain Area Tourism', image: '/images/destinations/kodaikanal.jpg', tag: 'Ooty • Kodaikanal • Munnar • Valparai • Thekkady' },
    { city: 'Backwater Places', image: '/images/destinations/alleppey.jpg', tag: 'Alappuzha • Fort Kochi • Kumarakom • Varkala' },
    { city: 'Airport & Corporate Trip', image: '/images/destinations/chennai.jpg', tag: '24/7 Chauffeur Transfer Across South India' },
    { city: 'Cauvery Delta & Chola Trail', image: '/images/destinations/kumbakonam.jpg', tag: 'UNESCO Temples & Silk Weaving Villages' },
  ];

  const travelServices = [
    {
      id: 'airport',
      title: 'Airport Pickup & Drop',
      subtitle: '24/7 Airport Transfers',
      icon: Plane,
    },
    {
      id: 'local',
      title: 'Local City Trip',
      subtitle: 'Hourly & Day Rentals',
      icon: MapPin,
    },
    {
      id: 'outstation',
      title: 'Outstation Trip',
      subtitle: 'Round & One-Way Trips',
      icon: Navigation,
    },
    {
      id: 'corporation',
      title: 'Corporation Trip',
      subtitle: 'Corporate Delegations',
      icon: Briefcase,
    },
    {
      id: 'family',
      title: 'Family Trip',
      subtitle: 'Holidays & Pilgrimages',
      icon: Users,
    },
    {
      id: 'honeymoon',
      title: 'Honeymoon Trip',
      subtitle: 'Romantic Scenic Tours',
      icon: Heart,
    }
  ];

  return (
    <div className="pb-16 md:pb-0">
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobileHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) with fitted panoramic background */}
      <div className="hidden md:block">
        <Hero onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Quick Booking Tariff Bar (Directly below hero section) */}
      <QuickBookingBar onOpenBooking={onOpenBooking} />

      {/* 4. Core Pillars / Why Choose Us */}
      <section className="py-12 sm:py-16 px-4 sm:px-10 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="glow-border-card group cursor-default transition-all duration-300 active:scale-95 hover:-translate-y-1">
              <div className="glow-border-card-inner !p-3.5 sm:!p-6 flex flex-col justify-between">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold-dark mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                <div>
                  <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 mb-1 group-hover:text-brand-gold-dark transition-colors">
                    Sanitized Fleet
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                    Regular mechanical servicing, AC checks, and clean interior cabins before every dispatch.
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-border-card group cursor-default transition-all duration-300 active:scale-95 hover:-translate-y-1">
              <div className="glow-border-card-inner !p-3.5 sm:!p-6 flex flex-col justify-between">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold-dark mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                <div>
                  <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 mb-1 group-hover:text-brand-gold-dark transition-colors">
                    Chauffeur Experts
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                    Licensed drivers with extensive familiarity of temple darshan timings and bypass routes.
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-border-card group cursor-default transition-all duration-300 active:scale-95 hover:-translate-y-1">
              <div className="glow-border-card-inner !p-3.5 sm:!p-6 flex flex-col justify-between">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold-dark mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                <div>
                  <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 mb-1 group-hover:text-brand-gold-dark transition-colors">
                    Punctual Pickups
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                    Guaranteed on-time arrivals for railway station, airport, and residence pickups.
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-border-card group cursor-default transition-all duration-300 active:scale-95 hover:-translate-y-1">
              <div className="glow-border-card-inner !p-3.5 sm:!p-6 flex flex-col justify-between">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-brand-gold-dark mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                <div>
                  <h3 className="text-xs sm:text-base font-bold font-heading text-neutral-900 mb-1 group-hover:text-brand-gold-dark transition-colors">
                    Clear Billing
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                    Honest per-kilometer tariffs, standard driver bata, and upfront toll clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Primary Destinations: Six Dedicated Travel Hub Sections with Independent Image Auto-Sliders */}
      <TravelHubsSections onOpenBooking={onOpenBooking} />

      {/* 6. Live Tour Packages from Database Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-neutral-300 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Popular Pilgrimage & Holiday Circuits
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900">
                Featured Tour Packages
              </h2>
            </div>
            <Link
              to="/packages"
              className="mt-3 sm:mt-0 text-xs sm:text-sm font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1.5 transition-colors"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={pkg.image || '/images/destinations/thanjavur.jpg'}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                      <span className="text-[11px] font-bold truncate pr-2">{pkg.location || 'South India'}</span>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-[#FCF6BA] bg-black/75 border border-brand-gold/40 px-2.5 py-0.5 rounded backdrop-blur-xs block shadow-xs">
                          {pkg.places ? pkg.places.split(/[,•\n]+/).filter(Boolean).length : 5} Places
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <h3 className="text-sm sm:text-base font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                      <span>{pkg.duration}</span>
                    </div>

                    {/* All Covered Places visible on front */}
                    <div className="pt-1 border-t border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-gold-dark" />
                        Covered Places:
                      </span>
                      <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-0.5">
                        {(pkg.places || '').split(/[,•\n]+/).map((place, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-[10px] font-medium bg-neutral-100 hover:bg-brand-gold/15 text-neutral-800 border border-neutral-200/80 px-1.5 py-0.5 rounded transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-brand-gold mr-1 shrink-0"></span>
                            {place.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBooking({ title: pkg.name, packageType: pkg.name })}
                    className="flex-1 btn-gold py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95 transition-all"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    to="/packages"
                    className="py-2 px-2.5 rounded-xl border border-neutral-300 hover:border-brand-gold hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Itinerary</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 Dedicated Travel Services: What We Do (Mobile: 2 Columns, Desktop: Single Row) */}
      <section className="py-10 sm:py-16 px-4 sm:px-10 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-gold-dark">
                  Specialized Travel Services
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                What We Do
              </h2>
            </div>
            <Link
              to="/packages"
              className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Explore All Circuits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services Grid: Mobile 2 Columns (grid-cols-2), Desktop Single Row (lg:grid-cols-6) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {travelServices.map((service) => {
              const IconComp = service.icon || Car;
              return (
                <div
                  key={service.id}
                  onClick={() => onOpenBooking({ title: service.title, packageType: service.title })}
                  className="bg-[#FAF8F5] border border-neutral-200/90 hover:border-brand-gold/70 rounded-2xl p-3.5 sm:p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-center items-center group cursor-pointer"
                >
                  {/* Icon badge */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-brand-gold/30 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all mb-2.5 shrink-0">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold-dark" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex-1 flex flex-col justify-center my-1 w-full">
                    <h3 className="text-xs sm:text-sm font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors line-clamp-2 leading-tight">
                      {service.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium mt-1 block truncate">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Book Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking({ title: service.title, packageType: service.title });
                    }}
                    className="w-full btn-gold py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-95 transition-all mt-2.5"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Fleet Showcase Section with Luxury Gradient & Showcase Animations */}
      <section className="relative py-14 sm:py-24 px-4 sm:px-10 bg-gradient-to-b from-[#18100e] via-[#281a16] to-[#140c0a] text-white overflow-hidden">
        {/* Golden ambient radial light aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-14 border-b border-brand-gold/25 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">
                Commercial Vehicles
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Our Fleet & Tariffs
              </h2>
            </div>
            <Link
              to="/vehicles"
              className="mt-3 sm:mt-0 text-xs sm:text-sm font-bold text-brand-gold hover:text-white flex items-center gap-1.5 transition-colors group"
            >
              <span>View Full Fleet & Tariffs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Fleet Grid: 2 Columns on Desktop, Single Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {featuredFleet.map((vehicle, idx) => (
              <div
                key={vehicle.id || idx}
                className="fleet-showroom-card group flex flex-col justify-between bg-[#201512] border border-brand-gold/30 rounded-2xl overflow-hidden hover:border-brand-gold/70 hover:shadow-2xl transition-all duration-300"
              >
                <div className="fleet-shimmer"></div>

                <div>
                  {/* Fitted Stage with Vehicle Image & Badges */}
                  <div className="fleet-stage relative h-48 sm:h-56 w-full flex flex-col items-center justify-center p-4 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#2a1b17] to-[#180e0c]">
                    <div className="absolute inset-0 bg-radial from-brand-gold/25 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="relative z-10 w-full h-32 sm:h-40 flex items-center justify-center">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-contain fleet-car-image group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/3 h-2.5 bg-black/80 rounded-full blur-xs mx-auto -mt-1 fleet-ground-shadow pointer-events-none"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 bg-[#1b100e]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-brand-gold border border-brand-gold/40 shadow-sm">
                      {vehicle.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold text-neutral-950 text-xs sm:text-sm font-black font-heading px-3 py-1 rounded-lg shadow-md">
                      {vehicle.rate}
                    </div>
                  </div>

                  {/* Clean Vehicle Details: Required Info Only */}
                  <div className="p-4 sm:p-5 space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-brand-gold transition-colors">
                          {vehicle.name}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded-full shrink-0">
                          AC Commercial
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                        {vehicle.idealFor}
                      </p>
                    </div>

                    {/* 1. KEY SPECS: 3 Clean Stat Boxes */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#180f0d] border border-white/10 rounded-xl p-2 text-center">
                        <Users className="w-3.5 h-3.5 text-brand-gold mx-auto mb-1" />
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Capacity</span>
                        <span className="text-[11px] sm:text-xs font-bold text-white block truncate">
                          {vehicle.seatsMobile || (vehicle.seats.includes('+') ? vehicle.seats.split(' ')[0] + ' ' + vehicle.seats.split(' ')[1] : vehicle.seats.split(' ')[0] + ' Seats')}
                        </span>
                      </div>

                      <div className="bg-[#180f0d] border border-white/10 rounded-xl p-2 text-center">
                        <Briefcase className="w-3.5 h-3.5 text-brand-gold mx-auto mb-1" />
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Luggage</span>
                        <span className="text-[11px] sm:text-xs font-bold text-white block truncate">
                          {vehicle.luggageMobile || (vehicle.luggage.includes('Bag') ? vehicle.luggage.split('Bag')[0].trim() + ' Bags' : 'Luggage Space')}
                        </span>
                      </div>

                      <div className="bg-[#180f0d] border border-white/10 rounded-xl p-2 text-center">
                        <Wind className="w-3.5 h-3.5 text-brand-gold mx-auto mb-1" />
                        <span className="text-[9px] uppercase font-bold text-neutral-400 block">Climate</span>
                        <span className="text-[11px] sm:text-xs font-bold text-white block truncate">
                          {vehicle.acMobile || (vehicle.ac.includes('Dual') ? 'Dual AC' : vehicle.ac.includes('Panoramic') ? 'Panoramic AC' : 'Climate AC')}
                        </span>
                      </div>
                    </div>

                    {/* 2. TRANSPARENT TARIFF STRIP */}
                    <div className="bg-[#180f0d] border border-brand-gold/25 rounded-xl p-2.5">
                      <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
                        <div className="px-1">
                          <span className="text-[9px] uppercase font-bold text-neutral-400 block">Outstation</span>
                          <span className="text-xs sm:text-sm font-extrabold text-brand-gold font-mono block">
                            {vehicle.rate.replace(' / km', '/km')}
                          </span>
                        </div>
                        <div className="px-1">
                          <span className="text-[9px] uppercase font-bold text-neutral-400 block">Min Distance</span>
                          <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                            {vehicle.minKm.split('/')[0].trim()}
                          </span>
                        </div>
                        <div className="px-1">
                          <span className="text-[9px] uppercase font-bold text-neutral-400 block">Driver Bata</span>
                          <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                            {vehicle.driverBata.replace(' / day', '/d')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Booking Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => onOpenBooking(vehicle)}
                    className="w-full btn-gold py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-98 transition-all"
                  >
                    <span>Book {vehicle.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom Booking Callout Banner */}
      <section className="py-14 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-brand-gold/10 border border-brand-gold/30 p-6 sm:p-12 text-center space-y-4 sm:space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark">
            Direct Concierge Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900">
            Planning a Pilgrimage, Family Trip, or Outstation Tour?
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Speak directly with our travel operations team. We customize door-to-door temple circuits, airport transfers, and group charters across Tamil Nadu.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto btn-gold py-3 px-8 rounded-xl text-sm font-bold shadow-md cursor-pointer active:scale-95 transition-all"
            >
              Book Chauffeur Online
            </button>
            <a
              href="https://wa.me/919894116405?text=Hello%2C%20I%20would%20like%20to%20plan%20a%20tour%20with%20Nithamudayar%20Travels"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#241815] text-white hover:bg-[#342521] py-3 px-8 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 border border-brand-gold/30"
            >
              <span>Instant WhatsApp Quote</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
