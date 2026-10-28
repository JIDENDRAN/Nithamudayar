import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export const travelHubsCategories = [
  {
    id: 'mountain-tourism',
    title: 'Mountain Area Tourism',
    places: [
      { name: 'Ooty', image: '/images/destinations/ooty.jpg' },
      { name: 'Kodaikanal', image: '/images/destinations/kodaikanal.jpg' },
      { name: 'Munnar', image: '/images/destinations/munnar.jpg' }
    ]
  },
  {
    id: 'tamilnadu-heritage',
    title: 'Tamil Nadu Heritage Circuit',
    places: [
      { name: 'Thanjavur', image: '/images/destinations/thanjavur.jpg' },
      { name: 'Madurai', image: '/images/destinations/madurai.jpg' },
      { name: 'Rameshwaram', image: '/images/destinations/rameswaram.jpg' }
    ]
  },
  {
    id: 'murugan-circuit',
    title: 'Arupadai Murugan Temple Tour',
    places: [
      { name: 'Tiruchendur', image: '/images/destinations/murugan.jpg' },
      { name: 'Palani', image: '/images/destinations/kodaikanal.jpg' },
      { name: 'Swamimalai', image: '/images/destinations/kumbakonam.jpg' }
    ]
  },
  {
    id: 'backwater-coastal',
    title: 'Backwater & Coastal Tourism',
    places: [
      { name: 'Alappuzha (Alleppey)', image: '/images/destinations/alleppey.jpg' },
      { name: 'Kumarakom', image: '/images/destinations/backwater.jpg' },
      { name: 'Kanyakumari', image: '/images/destinations/kanyakumari.jpg' }
    ]
  },
  {
    id: 'cauvery-delta',
    title: 'Cauvery Delta & Chola Trail',
    places: [
      { name: 'Kumbakonam', image: '/images/destinations/kumbakonam.jpg' },
      { name: 'Trichy', image: '/images/destinations/trichy.jpg' },
      { name: 'Thanjavur Chola Marvels', image: '/images/destinations/thanjavur.jpg' }
    ]
  },
  {
    id: 'airport-corporate',
    title: 'Airport & Corporate',
    places: [
      { name: 'Chennai', image: '/images/destinations/chennai.jpg' },
      { name: 'Coimbatore', image: '/images/destinations/coimbatore.jpg' },
      { name: 'Trichy & Madurai', image: '/images/destinations/trichy.jpg' }
    ]
  }
];

// Single Hub Section: Minimal, Clean, Image + Place Name Only with Independent Auto-Slide
function HubSlideItem({ hub, onOpenBooking }) {
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
      className="bg-white rounded-3xl border border-neutral-200 shadow-lg p-4 sm:p-7 space-y-4 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. Header: Section Title & Slide Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-neutral-900 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-gold shrink-0"></span>
          <span>{hub.title}</span>
        </h3>

        {/* Slide Controls & Dots */}
        <div className="flex items-center gap-2">
          {/* Indicator dots */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {hub.places.map((place, idx) => (
              <button
                key={place.name}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Slide to ${place.name}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIdx ? 'w-6 bg-brand-gold' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            title="Previous Image"
            aria-label="Previous Image"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-[#241815] hover:text-white text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            title="Next Image"
            aria-label="Next Image"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-[#241815] hover:text-white text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Large Sliding Image: Pure Image + Place Name */}
      <div 
        onClick={() => handleBook(currentPlace.name)}
        className="relative h-64 sm:h-80 md:h-96 lg:h-[440px] w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-md group cursor-pointer"
      >
        <img
          key={currentPlace.name}
          src={currentPlace.image}
          alt={currentPlace.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Vignette at the Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

        {/* Place Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-[#FCF6BA] uppercase tracking-wider block mb-0.5">
              {hub.title}
            </span>
            <h4 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white drop-shadow-lg group-hover:text-gold-shine transition-colors">
              {currentPlace.name}
            </h4>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleBook(currentPlace.name); }}
            className="btn-gold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>Book Taxi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Side-by-Side Images with Place Name (e.g. Ooty, Kodaikanal, Munnar side by side) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
        {hub.places.map((place, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={place.name}
              onClick={() => setActiveIdx(idx)}
              className={`group/card relative h-20 sm:h-28 md:h-36 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-neutral-900 ${
                isActive
                  ? 'border-brand-gold ring-2 ring-brand-gold/30 shadow-md scale-[1.02]'
                  : 'border-transparent opacity-75 hover:opacity-100 hover:shadow'
              }`}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

              {isActive && (
                <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
              )}

              {/* Just Place Name */}
              <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3">
                <span className="text-xs sm:text-base font-extrabold font-heading text-white drop-shadow block truncate">
                  {place.name}
                </span>
              </div>
            </div>
          );
        })}
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
          {travelHubsCategories.map(hub => (
            <HubSlideItem 
              key={hub.id} 
              hub={hub} 
              onOpenBooking={onOpenBooking} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
