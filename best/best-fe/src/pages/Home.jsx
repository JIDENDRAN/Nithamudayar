import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MobileHero from '../components/mobile/MobileHero';
import QuickBookingBar from '../components/QuickBookingBar';
import TravelHubsSections from '../components/TravelHubsSections';
import { ArrowRight, Shield, Award, Clock, Users, CheckCircle2, ChevronRight, Sparkles, MapPin, Plane, Navigation, Briefcase, Heart, Check, Car } from 'lucide-react';
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
      name: 'Sedan (Dzire / Etios)',
      category: 'Comfort Sedan (4+1)',
      image: '/images/vehicles/sedan.png',
      rate: '₹14 / km',
      desc: 'Driver Bata: ₹400 / day | Min 250 km | Economical city & outstation travel.',
    },
    {
      name: 'SUV (Ertiga / Carens)',
      category: 'Family SUV (6+1)',
      image: '/images/vehicles/suv.png',
      rate: '₹19 / km',
      desc: 'Driver Bata: ₹500 / day | Min 300 km | Extra cabin room & luggage carrier.',
    },
    {
      name: 'Toyota Innova Crysta',
      category: 'Premium SUV (6+1 / 7+1)',
      image: '/images/vehicles/innova.png',
      rate: '₹22 / km',
      desc: 'Driver Bata: ₹600 / day | Min 350 km | Captain seats for family pilgrimages.',
    },
    {
      name: 'Force Tempo Traveller',
      category: 'Mini Coach (12/14/17 Seater)',
      image: '/images/vehicles/tempo.png',
      rate: '₹25 / km',
      desc: 'Driver Bata: ₹700 / day | Min 300 km | Pushback luxury seats & high roof.',
    },
    {
      name: 'Force Urbania Luxury Van',
      category: 'Ultra-Luxury (12/17 Seater)',
      image: '/images/vehicles/urbania.png',
      rate: '₹33 / km',
      desc: 'Driver Bata: ₹800 / day | Min 300 km | Individual armrests & panoramic windows.',
    },
  ];

  const featuredFleet = (dbCars.length > 0 ? dbCars : defaultFeaturedFleet).map(c => {
    let img = c.image || '/images/vehicles/sedan.png';
    if (img.startsWith('/uploads/')) {
      img = `${API_BASE_URL}${img}`;
    }
    return {
      name: c.name,
      category: c.seats || 'Chauffeur Driven',
      image: img,
      rate: c.price,
      desc: c.desc
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
      title: 'Airport pickup and drop',
      category: '24/7 Flight Schedule Service',
      price: 'From ₹1,800',
      icon: Plane,
      desc: 'On-time doorstep and terminal transfers for Chennai, Trichy, Madurai & Coimbatore airports with real-time flight tracking.',
      features: [
        'Live flight arrival tracking',
        'Zero waiting charges on flight delays',
        'Terminal meet & greet with placard',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/chennai.jpg'
    },
    {
      id: 'local',
      title: 'Local trip',
      category: 'Hourly & Full Day City Rental',
      price: 'From ₹2,000',
      icon: MapPin,
      desc: 'Flexible 4-hour, 8-hour, and full-day city rental for temple darshans, family functions, shopping, and business visits.',
      features: [
        'Flexible 4hr / 8hr / 12hr packages',
        'Experienced local city chauffeur',
        'Temple darshans & shopping crawls',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/thanjavur.jpg'
    },
    {
      id: 'outstation',
      title: 'Outstation Trip',
      category: 'Intercity Round & One-Way',
      price: 'From ₹3,500',
      icon: Navigation,
      desc: 'Safe and comfortable intercity round-trips and one-way drops across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.',
      features: [
        'Verified interstate highway chauffeurs',
        'Round trip vacations & one-way drops',
        'Complimentary roof luggage carrier',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/rameswaram.jpg'
    },
    {
      id: 'corporation',
      title: 'Corporation trip',
      category: 'Business & Corporate Delegations',
      price: 'From ₹3,200',
      icon: Briefcase,
      desc: 'Executive chauffeur transit for business summits, corporate delegates, VIP airport reception, and company conventions.',
      features: [
        'GST compliant official corporate billing',
        'VIP executive class chauffeur transit',
        'Punctual client & delegate pickups',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/chennai.jpg'
    },
    {
      id: 'family',
      title: 'Family trip',
      category: 'Multi-Day Holidays & Pilgrimages',
      price: 'From ₹4,500',
      icon: Users,
      desc: 'Spacious, air-conditioned multi-generation family travel with child and elder-friendly halts and huge luggage carriers.',
      features: [
        'Spacious 4, 7, 12 & 18 seater cabins',
        'Elder-friendly smooth highway driving',
        'Extra luggage capacity for family bags',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/murugan.jpg'
    },
    {
      id: 'honeymoon',
      title: 'Honeymoon trip',
      category: 'Romantic Scenic Retreats',
      price: 'From ₹6,500',
      icon: Heart,
      desc: 'Romantic hill station and coastal tours to Ooty, Kodaikanal, Munnar, and Alleppey with premium decorated private cabs.',
      features: [
        'Premium decorated private AC cab option',
        'Certified misty hill hairpin chauffeur',
        'Discreet, courteous & respectful service',
        'All luxury car available',
      ],
      tag: 'All Luxury Car Available',
      image: '/images/destinations/kodaikanal.jpg'
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

      {/* 6.5 Dedicated Travel Services & Charters Section: What We Do (2 Columns) */}
      <section className="py-12 sm:py-20 px-4 sm:px-10 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-neutral-200 pb-4 sm:pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-gold-dark">
                  Specialized Travel Services
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900">
                What We Do
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Dedicated chauffeur services and tailored travel solutions across Tamil Nadu and South India for every trip requirement.
              </p>
            </div>
            <Link
              to="/packages"
              className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-brand-gold-dark flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Explore All Circuits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services Grid (Strictly 2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {travelServices.map((service) => {
              const IconComp = service.icon || Car;
              return (
                <div
                  key={service.id}
                  className="bg-[#FAF8F5] border border-neutral-200/90 rounded-2xl p-5 sm:p-7 hover:border-brand-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Category + Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white border border-brand-gold/30 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-brand-gold/10 transition-transform shrink-0">
                          <IconComp className="w-5 h-5 text-brand-gold-dark" />
                        </div>
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark block">
                            {service.category}
                          </span>
                          <h3 className="text-base sm:text-xl font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex text-[10px] font-bold text-neutral-600 bg-white border border-neutral-200 px-2.5 py-1 rounded-full shrink-0 shadow-2xs">
                        All Luxury Cars
                      </span>
                    </div>

                    {/* What We Do Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* What We Do: Features Checklist in 2 Columns */}
                    <div className="pt-3 border-t border-neutral-200/70">
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-2.5">
                        What We Do:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-neutral-200/50">
                            <Check className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 mt-0.5" />
                            <span className="font-medium text-[11px] sm:text-xs leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-neutral-200/70">
                    <button
                      onClick={() => onOpenBooking({ title: service.title, packageType: service.title })}
                      className="w-full btn-gold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-98 transition-all"
                    >
                      <span>Book {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredFleet.map((vehicle, idx) => (
              <div
                key={idx}
                className="fleet-showroom-card group flex flex-col justify-between"
              >
                <div className="fleet-shimmer"></div>

                <div>
                  <div className="fleet-stage relative h-48 sm:h-56 w-full flex flex-col items-center justify-center p-4 border-b border-white/10">
                    <div className="absolute inset-0 bg-radial from-brand-gold/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="relative z-10 w-full h-32 sm:h-40 flex items-center justify-center">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-contain fleet-car-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/3 h-2.5 bg-black/80 rounded-full blur-xs mx-auto -mt-1 fleet-ground-shadow pointer-events-none"></div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                      {vehicle.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-brand-gold transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {vehicle.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0 border-t border-white/10 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">
                      Outstation Rate
                    </span>
                    <span className="text-base font-extrabold text-brand-gold font-mono">
                      {vehicle.rate}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking({ vehicle: vehicle.name })}
                    className="btn-gold py-1.5 px-3.5 rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-sm"
                  >
                    Book Now
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
