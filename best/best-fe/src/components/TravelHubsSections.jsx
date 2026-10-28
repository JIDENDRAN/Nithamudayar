import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Car,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const travelHubsCategories = [
  {
    id: 'mountain-tourism',
    number: '01',
    title: 'Mountain Area Tourism',
    subtitle: 'Chilly Hill Station Escapes & Misty Western Ghats',
    route: 'Ooty • Kodaikanal • Munnar • Valparai • Thekkady',
    desc: 'Experience breathtaking hill station panoramas, rolling Nilgiri tea estates, mist-covered valleys, and cool pine forests with expert mountain-road chauffeurs.',
    fleet: 'Toyota Innova Crysta • Force Urbania • 4x4 SUVs',
    badge: 'Hill Stations & Tea Valleys',
    places: [
      { name: 'Ooty', image: '/images/destinations/ooty.jpg', tagline: 'Queen of Hill Stations • 2,240 m' },
      { name: 'Kodaikanal', image: '/images/destinations/kodaikanal.jpg', tagline: 'Princess of Hill Stations • 2,133 m' },
      { name: 'Munnar', image: '/images/destinations/munnar.jpg', tagline: 'Emerald Tea Paradise • 1,600 m' }
    ]
  },
  {
    id: 'tamilnadu-heritage',
    number: '02',
    title: 'Tamil Nadu Heritage Circuit',
    subtitle: 'UNESCO World Heritage & Living Dravidian Temples',
    route: 'Trichy • Thanjavur • Madurai • Rameshwaram',
    desc: 'Journey through 2,000 years of glorious Tamil architectural genius, soaring monolithic granite temple towers (Vimana), sculpted corridors, and legendary sacred sea bridges.',
    fleet: 'Innova Crysta • Force Urbania • Tempo Traveller',
    badge: 'UNESCO Heritage & Ancient Temples',
    places: [
      { name: 'Thanjavur', image: '/images/destinations/thanjavur.jpg', tagline: 'Brihadisvara Periya Kovil • Chola Capital' },
      { name: 'Madurai', image: '/images/destinations/madurai.jpg', tagline: 'Meenakshi Amman Temple • 14 Gopurams' },
      { name: 'Rameshwaram', image: '/images/destinations/rameswaram.jpg', tagline: 'Pamban Sea Bridge • 22 Holy Theerthams' }
    ]
  },
  {
    id: 'murugan-circuit',
    number: '03',
    title: 'Arupadai Murugan Temple Tour',
    subtitle: 'Six Divine Abodes of Lord Murugan (Arupadai Veedu)',
    route: 'Tiruchendur • Palani • Thiruparankundram • Swamimalai',
    desc: 'A deeply sacred devotional pilgrimage covering the six holy battle grounds and abodes of Lord Murugan with comfortable halts, early morning darshan timings, and child/elder friendly driving.',
    fleet: 'Force Urbania (12/17 Seater) • Innova Crysta • AC Sedans',
    badge: 'Divine Pilgrimage Circuit',
    places: [
      { name: 'Tiruchendur', image: '/images/destinations/murugan.jpg', tagline: 'Seaside Coastal Shrine • 2nd Abode' },
      { name: 'Palani', image: '/images/destinations/kodaikanal.jpg', tagline: 'Dhandayuthapani Swamy Hill • 3rd Abode' },
      { name: 'Swamimalai', image: '/images/destinations/kumbakonam.jpg', tagline: 'Gnana Upadesham • 4th Abode' }
    ]
  },
  {
    id: 'backwater-coastal',
    number: '04',
    title: 'Backwater & Coastal Tourism',
    subtitle: 'Palm Lagoons, Luxury Houseboats & Ocean Confluence',
    route: 'Alappuzha • Kumarakom • Kanyakumari • Fort Kochi',
    desc: 'Unwind along shimmering backwater canals on deluxe houseboats, witness sunset over the Arabian Sea, and stand at the tip of the Indian subcontinent where three oceans unite.',
    fleet: 'Sedan (Dzire/Etios) • SUV (Ertiga) • Innova Crysta',
    badge: 'Houseboats & Coastal Escapes',
    places: [
      { name: 'Alappuzha (Alleppey)', image: '/images/destinations/alleppey.jpg', tagline: 'Venice of the East • Deluxe Houseboats' },
      { name: 'Kumarakom', image: '/images/destinations/backwater.jpg', tagline: 'Tranquil Lake Lagoons & Bird Sanctuary' },
      { name: 'Kanyakumari', image: '/images/destinations/kanyakumari.jpg', tagline: 'Confluence of 3 Oceans • Sunset Point' }
    ]
  },
  {
    id: 'cauvery-delta',
    number: '05',
    title: 'Cauvery Delta & Chola Trail',
    subtitle: 'Navagraha Shrines, Kallanai Dam & Silk Weaving Villages',
    route: 'Kumbakonam • Gangaikonda Cholapuram • Thanjavur • Trichy',
    desc: 'Explore the fertile river Kaveri cradle, home to 9 planetary Navagraha parihara temples, ancient Chola stone masonry, and centuries-old handloom silk weaving traditions.',
    fleet: 'Innova Crysta • Force Urbania • Tempo Traveller',
    badge: 'Navagraha & Chola Architecture',
    places: [
      { name: 'Kumbakonam', image: '/images/destinations/kumbakonam.jpg', tagline: 'The Temple Town & 9 Navagraha Shrines' },
      { name: 'Trichy', image: '/images/destinations/trichy.jpg', tagline: '2nd-Century Kallanai Dam & Rockfort' },
      { name: 'Thanjavur Chola Marvels', image: '/images/destinations/thanjavur.jpg', tagline: 'Living Chola Temples & Bronze Arts' }
    ]
  },
  {
    id: 'airport-corporate',
    number: '06',
    title: 'Airport & Corporate',
    subtitle: '24/7 Interstate Express Chauffeur Transfers & VIP Delegations',
    route: 'Chennai • Trichy • Madurai • Coimbatore Terminals',
    desc: 'Reliable doorstep-to-terminal airport pickup and drops across all major South Indian international airports, corporate delegate conveyance, and intercity business tours with official GST billing.',
    fleet: 'Force Urbania • Innova Crysta • Executive Sedans',
    badge: '24/7 Flight Schedule Transfers',
    places: [
      { name: 'Chennai', image: '/images/destinations/chennai.jpg', tagline: 'Gateway of South India • T1/T2 Airport' },
      { name: 'Coimbatore', image: '/images/destinations/coimbatore.jpg', tagline: 'Manchester of South India • Industrial Hub' },
      { name: 'Trichy & Madurai', image: '/images/destinations/trichy.jpg', tagline: 'International Air Terminals & Transit' }
    ]
  }
];

// Single Hub Section with Auto-Swipe Image and Desktop-Only Content
function HubSectionItem({ hub, onOpenBooking, isReversed }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentPlace = hub.places[activeIdx];

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % hub.places.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, hub.places.length]);

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + hub.places.length) % hub.places.length);
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % hub.places.length);
  };

  const handleBook = (placeName) => {
    if (onOpenBooking) {
      onOpenBooking({
        destinationCity: `${placeName || currentPlace.name} (${hub.title})`,
        pickupCity: 'Thanjavur'
      });
    }
  };

  return (
    <div 
      className="bg-white rounded-3xl border border-neutral-200/90 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Gold Shimmer Line */}
      <div className="h-1.5 bg-gradient-to-r from-brand-espresso via-brand-gold to-brand-espresso"></div>

      {/* Content + Swipe Image Grid (Desktop 2-Col, Mobile 1-Col) */}
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        
        {/* DESKTOP-ONLY CONTENT COLUMN (Hidden on Mobile) */}
        <div className={`hidden md:flex md:col-span-5 p-6 lg:p-8 flex-col justify-between space-y-4 bg-white ${isReversed ? 'md:order-2 border-l border-neutral-100' : 'md:order-1 border-r border-neutral-100'}`}>
          <div className="space-y-3.5">
            
            {/* Category Number & Badge */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#241815] text-[#FCF6BA] font-black text-xs flex items-center justify-center shadow-sm">
                {hub.number}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                {hub.badge}
              </span>
            </div>

            {/* Title & Route */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold font-heading text-neutral-900 leading-tight">
                {hub.title}
              </h3>
              <p className="text-xs lg:text-sm font-semibold text-neutral-600 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                <span>{hub.route}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-xs lg:text-sm text-neutral-600 leading-relaxed border-l-2 border-brand-gold pl-3 py-0.5">
              {hub.desc}
            </p>

            {/* Recommended Fleet */}
            <div className="flex items-center gap-2 text-xs text-neutral-600 pt-1">
              <Car className="w-4 h-4 text-brand-gold-dark shrink-0" />
              <span><strong className="text-neutral-900">Fleet:</strong> {hub.fleet}</span>
            </div>

            {/* Active Place Tag & Slide Indicator */}
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900">
                Viewing: <span className="text-brand-gold-dark font-extrabold">{currentPlace.name}</span>
              </span>
              <span className="text-[11px] font-semibold text-neutral-500">
                {activeIdx + 1} of {hub.places.length}
              </span>
            </div>

          </div>

          {/* Desktop Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={() => handleBook(currentPlace.name)}
              className="flex-1 btn-gold py-2.5 rounded-xl text-xs lg:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span>Book Cab for {currentPlace.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/destinations"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors border border-neutral-200"
            >
              Details
            </Link>
          </div>
        </div>

        {/* SWIPE IMAGE COLUMN (Full Width on Mobile, 7 Cols on Desktop) */}
        <div className={`col-span-1 md:col-span-7 relative ${isReversed ? 'md:order-1' : 'md:order-2'} p-3 sm:p-4 bg-neutral-900 flex flex-col justify-center`}>
          
          {/* Mobile Header: Visible ONLY on mobile so the section title is clear */}
          <div className="md:hidden flex items-center justify-between pb-2 text-white">
            <h4 className="text-lg font-bold font-heading flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span>{hub.title}</span>
            </h4>
            <span className="text-xs text-brand-gold font-semibold">
              {activeIdx + 1}/{hub.places.length}
            </span>
          </div>

          {/* The Swipe Image Card (Only this image is shown, no thumbnails below) */}
          <div 
            onClick={() => handleBook(currentPlace.name)}
            className="relative h-72 sm:h-80 md:h-96 lg:h-[420px] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
          >
            <img
              key={currentPlace.name}
              src={currentPlace.image}
              alt={currentPlace.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20"></div>

            {/* Top Slide Badge */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FCF6BA] text-[11px] font-bold border border-white/20">
                {currentPlace.tagline}
              </span>

              {/* Dots for current category */}
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                {hub.places.map((place, idx) => (
                  <span
                    key={place.name}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIdx ? 'w-5 bg-brand-gold' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Caption: Pure Place Name + Book CTA */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-3 z-10">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-brand-gold uppercase tracking-wider block mb-0.5 md:hidden">
                  {hub.title}
                </span>
                <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white drop-shadow-md group-hover:text-gold-shine transition-colors">
                  {currentPlace.name}
                </h4>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleBook(currentPlace.name); }}
                className="btn-gold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <span>Book Cab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Manual Slide Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              title="Previous Destination"
              aria-label="Previous Destination"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              title="Next Destination"
              aria-label="Next Destination"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function TravelHubsSections({ onOpenBooking }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Master Section Header */}
        <div className="text-center sm:text-left border-b border-neutral-200 pb-4 sm:pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-espresso mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a5d14]">
              Explore South India
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 tracking-tight">
            Key Travel Hubs
          </h2>
        </div>

        {/* 6 Sections One by One */}
        <div className="space-y-8 sm:space-y-10">
          {travelHubsCategories.map((hub, idx) => (
            <HubSectionItem 
              key={hub.id} 
              hub={hub} 
              onOpenBooking={onOpenBooking} 
              isReversed={idx % 2 === 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
