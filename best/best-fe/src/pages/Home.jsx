import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MobileHero from '../components/mobile/MobileHero';
import QuickBookingBar from '../components/QuickBookingBar';
import TravelHubsSections from '../components/TravelHubsSections';
import { ArrowRight, Shield, Award, Clock, Users, ChevronLeft, ChevronRight, Sparkles, MapPin, Plane, Navigation, Briefcase, Heart, Check, Car, Wind, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import { parseVehicleFromDb } from '../utils/vehicleParser';
import { getVehicleImage } from '../utils/imageImports';

export default function HomePage({ onOpenBooking }) {
  const [dbCars, setDbCars] = useState([]);
  const [dbPackages, setDbPackages] = useState([]);

  const packagesScrollRef = useRef(null);
  const [isPackagesPaused, setIsPackagesPaused] = useState(false);

  const fleetScrollRef = useRef(null);
  const [isFleetPaused, setIsFleetPaused] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDbCars(data);
      })
      .catch(() => { });

    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDbPackages(data);
      })
      .catch(() => { });
  }, []);

  // Auto-scroll for Featured Tour Packages (side-by-side)
  useEffect(() => {
    if (isPackagesPaused) return;
    const interval = setInterval(() => {
      const el = packagesScrollRef.current;
      if (!el) return;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.querySelector('.snap-start')?.offsetWidth || 300;
        el.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isPackagesPaused]);

  // Auto-scroll for Fleet & Tariffs (side-by-side)
  useEffect(() => {
    if (isFleetPaused) return;
    const interval = setInterval(() => {
      const el = fleetScrollRef.current;
      if (!el) return;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.querySelector('.snap-start')?.offsetWidth || 300;
        el.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isFleetPaused]);

  const scrollPackages = (direction) => {
    const el = packagesScrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.snap-start')?.offsetWidth || 300;
    el.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) : (cardWidth + 16),
      behavior: 'smooth'
    });
  };

  const scrollFleet = (direction) => {
    const el = fleetScrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.snap-start')?.offsetWidth || 300;
    el.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) : (cardWidth + 16),
      behavior: 'smooth'
    });
  };

  const defaultFeaturedFleet = [
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
      idealFor: 'VIP delegations, weddings & luxury groups',
    },
  ];

  const featuredFleet = (dbCars.length > 0
    ? [...dbCars].sort((a, b) => {
      // Feature Innova Crysta first to match showcase design, then by ID
      const aInnova = (a.name || '').toLowerCase().includes('innova');
      const bInnova = (b.name || '').toLowerCase().includes('innova');
      if (aInnova && !bInnova) return -1;
      if (!aInnova && bInnova) return 1;
      return (a.id || 0) - (b.id || 0);
    }).map(c => parseVehicleFromDb(c)).filter(Boolean)
    : defaultFeaturedFleet
  );

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

  const resolvePackageImage = (img, name = '') => {
    if (!img) {
      const n = (name || '').toLowerCase();
      if (n.includes('murugan') || n.includes('palani') || n.includes('tiruchendur')) return '/images/destinations/murugan.jpg';
      if (n.includes('mountain') || n.includes('hill') || n.includes('kodaikanal') || n.includes('ooty') || n.includes('kerala')) return '/images/destinations/kodaikanal.jpg';
      if (n.includes('backwater') || n.includes('alleppey') || n.includes('alappuzha')) return '/images/destinations/alleppey.jpg';
      if (n.includes('chola') || n.includes('thanjavur') || n.includes('kumbakonam') || n.includes('navagraha')) return '/images/destinations/kumbakonam.jpg';
      if (n.includes('rameswaram') || n.includes('pandya') || n.includes('madurai')) return '/images/destinations/rameswaram.jpg';
      if (n.includes('airport') || n.includes('corporate') || n.includes('chennai')) return '/images/destinations/chennai.jpg';
      return '/images/destinations/thanjavur.jpg';
    }
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
      return img;
    }
    if (img.startsWith('/uploads/')) {
      return `${API_BASE_URL}${img}`;
    }
    if (img.startsWith('uploads/')) {
      return `${API_BASE_URL}/${img}`;
    }
    if (img.startsWith('/images/')) {
      return img;
    }
    if (img.startsWith('images/')) {
      return `/${img}`;
    }
    return img;
  };

  const featuredPackages = dbPackages.length > 0
    ? dbPackages.slice(0, 8).map(pkg => ({
      ...pkg,
      image: resolvePackageImage(pkg.image, pkg.name)
    }))
    : defaultFeaturedPackages;

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

      {/* 6. Live Tour Packages from Database - Side-by-Side Auto-Scrolling Showcase */}
      <section className="py-12 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 border-b border-neutral-300 pb-4 sm:pb-6 gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Popular Pilgrimage & Holiday Circuits
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900">
                Featured Tour Packages
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Left / Right Auto-Scroll Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollPackages('left')}
                  aria-label="Previous Package"
                  className="w-9 h-9 rounded-full bg-white border border-neutral-300 hover:border-brand-gold text-neutral-700 hover:text-brand-gold flex items-center justify-center shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollPackages('right')}
                  aria-label="Next Package"
                  className="w-9 h-9 rounded-full bg-white border border-neutral-300 hover:border-brand-gold text-neutral-700 hover:text-brand-gold flex items-center justify-center shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link
                to="/packages"
                className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1.5 transition-colors pl-3 border-l border-neutral-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Side by side horizontal auto-scroll container */}
          <div
            ref={packagesScrollRef}
            onMouseEnter={() => setIsPackagesPaused(true)}
            onMouseLeave={() => setIsPackagesPaused(false)}
            onTouchStart={() => setIsPackagesPaused(true)}
            onTouchEnd={() => setIsPackagesPaused(false)}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-[270px] sm:w-[310px] md:w-[330px] shrink-0 snap-start bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={resolvePackageImage(pkg.image, pkg.name)}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = resolvePackageImage('', pkg.name);
                      }}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                    <div className="absolute bottom-2 sm:bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                      <span className="text-[11px] font-bold truncate pr-2">{pkg.location || 'South India'}</span>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-[#FCF6BA] bg-black/75 border border-brand-gold/40 px-2 py-0.5 rounded backdrop-blur-xs block shadow-xs">
                          {pkg.places ? pkg.places.split(/[,•\n]+/).filter(Boolean).length : 5} Places
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                      <span>{pkg.duration}</span>
                    </div>

                    {/* All Covered Places visible on front */}
                    <div className="pt-2 border-t border-neutral-100">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-gold-dark" />
                        Covered Places:
                      </span>
                      <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-0.5">
                        {(pkg.places || '').split(/[,•\n]+/).slice(0, 4).map((place, idx) => (
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

                <div className="p-3.5 sm:p-4 pt-0 flex items-center gap-2">
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

          {/* Explore All Packages CTA Button */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore All Tour Packages & Circuits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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

      {/* 7. Fleet Showcase Section with Luxury Gradient & Side-by-Side Auto-Scroll */}
      <section className="relative py-14 sm:py-24 px-4 sm:px-10 bg-gradient-to-b from-[#0f1426] via-[#1b203d] to-[#0b0e1a] text-white overflow-hidden">
        {/* Golden ambient radial light aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 border-b border-brand-gold/25 pb-4 sm:pb-6 gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">
                Commercial Vehicles
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Our Fleet & Tariffs
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Left / Right Auto-Scroll Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollFleet('left')}
                  aria-label="Previous Vehicle"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-brand-gold/40 text-brand-gold hover:text-white flex items-center justify-center shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFleet('right')}
                  aria-label="Next Vehicle"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-brand-gold/40 text-brand-gold hover:text-white flex items-center justify-center shadow-xs cursor-pointer transition-all active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link
                to="/vehicles"
                className="text-xs sm:text-sm font-bold text-brand-gold hover:text-white flex items-center gap-1.5 transition-colors group pl-3 border-l border-brand-gold/30"
              >
                <span>View Full Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Side by side horizontal auto-scroll container for Fleet */}
          <div
            ref={fleetScrollRef}
            onMouseEnter={() => setIsFleetPaused(true)}
            onMouseLeave={() => setIsFleetPaused(false)}
            onTouchStart={() => setIsFleetPaused(true)}
            onTouchEnd={() => setIsFleetPaused(false)}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredFleet.map((vehicle) => {
              const seater = vehicle.seaterLabel || vehicle.seatsMobile || (vehicle.seats ? vehicle.seats.split(' ')[0] + ' Seater' : '7 Seater');
              const startingRate = vehicle.startingFrom || vehicle.outstationRate || vehicle.rate || '₹14/km';
              const image = getVehicleImage(vehicle.image) || '/images/vehicles/innova.png';

              return (
                <div
                  key={vehicle.id}
                  className="w-[270px] sm:w-[310px] md:w-[330px] shrink-0 snap-start bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-brand-gold/60 transition-all duration-300 group"
                >
                  <div>
                    {/* Top Row: Seater & Category Pill */}
                    <div className="flex items-center justify-between mb-1.5 gap-1">
                      <span className="text-[11px] font-bold text-[#b38328] uppercase tracking-wider shrink-0">
                        {seater}
                      </span>
                      <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase border border-neutral-200/80 truncate">
                        {vehicle.category || 'Tourist Cab'}
                      </span>
                    </div>

                    {/* Vehicle Title */}
                    <h3 className="text-base sm:text-lg font-black font-heading text-neutral-900 tracking-tight group-hover:text-brand-gold-dark transition-colors truncate">
                      {vehicle.name}
                    </h3>

                    {/* Centered Vehicle Image Container */}
                    <div className="h-36 sm:h-40 w-full flex items-center justify-center p-2 relative my-3 bg-[#F5EFEB]/70 rounded-2xl overflow-hidden">
                      <img
                        src={image}
                        alt={vehicle.name}
                        className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Concise Specs Row */}
                    <div className="flex items-center justify-center gap-3 text-xs font-semibold text-neutral-600 py-1 border-b border-neutral-100">
                      <div className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{seater}</span>
                      </div>
                      <span className="text-neutral-300">•</span>
                      <div className="inline-flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-neutral-400" />
                        <span>AC</span>
                      </div>
                      <span className="text-neutral-300">•</span>
                      <div className="inline-flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Luggage</span>
                      </div>
                    </div>

                    {/* Rate preview */}
                    <div className="mt-3.5 flex items-baseline justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        Starting From
                      </span>
                      <span className="text-xl font-black text-neutral-950 font-heading">
                        {startingRate}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Book Cab + Explore Details */}
                  <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center gap-2">
                    <button
                      onClick={() => onOpenBooking(vehicle)}
                      className="flex-1 btn-gold py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95 transition-all whitespace-nowrap"
                    >
                      <span>Book Cab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to="/vehicles"
                      className="py-2 px-3 rounded-xl border border-neutral-300 hover:border-brand-gold hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Explore Button to go to Vehicles page */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 btn-gold px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore All Vehicles, Tariffs & Outstation Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
              className="w-full sm:w-auto bg-[#1b203d] text-white hover:bg-[#252c54] py-3 px-8 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 border border-brand-gold/30"
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
