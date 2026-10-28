import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Car, 
  Compass,
  Pause,
  Play
} from 'lucide-react';

export const travelHubsData = [
  {
    id: 'mountain-tourism',
    title: 'Mountain Area Tourism',
    subtitle: 'Chilly Hill Station Escapes & Misty Valleys',
    route: 'Ooty • Kodaikanal • Munnar • Valparai • Thekkady',
    desc: 'Breathtaking Western Ghats panoramas, lush rolling tea plantations, cool misty climate, and serene mountain lakes. Chauffeur-driven luxury travel with expert ghat-road drivers.',
    vehicles: 'Toyota Innova Crysta • Force Urbania • 4x4 SUVs',
    places: [
      {
        name: 'Ooty',
        state: 'Tamil Nadu',
        tagline: 'Queen of Hill Stations',
        image: '/images/destinations/ooty.jpg',
        attractions: 'Botanical Gardens • Pykara Waterfalls • Nilgiri Tea Hills',
        altitude: '2,240 m Altitude'
      },
      {
        name: 'Kodaikanal',
        state: 'Tamil Nadu',
        tagline: 'Princess of Hill Stations',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Kodai Lake • Pillar Rocks • Coakers Walk • Pine Forests',
        altitude: '2,133 m Altitude'
      },
      {
        name: 'Munnar',
        state: 'Kerala',
        tagline: 'Emerald Tea Paradise',
        image: '/images/destinations/munnar.jpg',
        attractions: 'Anamudi Peak • Mattupetty Dam • Eravikulam Sanctuary',
        altitude: '1,600 m Altitude'
      }
    ]
  },
  {
    id: 'tamilnadu-heritage',
    title: 'Tamil Nadu Heritage Circuit',
    subtitle: 'UNESCO Monuments & Living Chola Dravidian Temples',
    route: 'Trichy • Thanjavur • Madurai • Rameshwaram',
    desc: 'Journey through 2,000 years of glorious Tamil architecture, soaring granite temple towers (Vimana), sculpted corridors, and legendary sacred sea bridges.',
    vehicles: 'Innova Crysta • Force Urbania • Tempo Traveller',
    places: [
      {
        name: 'Thanjavur',
        state: 'Tamil Nadu',
        tagline: 'Chola Capital & Great Living Temples',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Brihadisvara Periya Kovil • Maratha Royal Palace • Art Gallery',
        altitude: 'UNESCO World Heritage'
      },
      {
        name: 'Madurai',
        state: 'Tamil Nadu',
        tagline: 'Ancient Temple & Jasmine City',
        image: '/images/destinations/madurai.jpg',
        attractions: 'Meenakshi Amman Temple • Thirumalai Nayakkar Palace • Teppakulam',
        altitude: '2,500+ Yrs History'
      },
      {
        name: 'Rameshwaram',
        state: 'Tamil Nadu',
        tagline: 'Sacred Island of Lord Shiva',
        image: '/images/destinations/rameswaram.jpg',
        attractions: 'Pamban Sea Bridge • Ramanathaswamy 22 Theerthams • Dhanushkodi',
        altitude: 'Gulf of Mannar'
      }
    ]
  },
  {
    id: 'murugan-circuit',
    title: 'Arupadai Murugan Temple Tour',
    subtitle: 'Six Divine Abodes of Lord Murugan (Arupadai Veedu)',
    route: 'Tiruchendur • Palani • Thiruparankundram • Swamimalai',
    desc: 'A deeply sacred devotional pilgrimage covering the six holy battle grounds and abodes of Lord Murugan with comfortable halts, early morning darshan timings, and child/elder friendly driving.',
    vehicles: 'Force Urbania (12/17 Seater) • Innova Crysta • AC Sedans',
    places: [
      {
        name: 'Tiruchendur',
        state: 'Tamil Nadu',
        tagline: 'Seaside Coastal Shrine (2nd Abode)',
        image: '/images/destinations/murugan.jpg',
        attractions: 'Lord Subramanya Sea Shore Temple • Holy Nazhikinaru Well',
        altitude: 'Bay of Bengal'
      },
      {
        name: 'Palani',
        state: 'Tamil Nadu',
        tagline: 'Dhandayuthapani Hill (3rd Abode)',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Sivagiri Hilltop Temple • Winch & Ropeway • Divine Panchamirtham',
        altitude: 'Sacred Hilltop'
      },
      {
        name: 'Swamimalai & Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'Gnana Upadesham (4th Abode)',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: '60 Granite Steps (Tamil Years) • Son teaching Father Lord Shiva',
        altitude: 'Cauvery Riverbed'
      }
    ]
  },
  {
    id: 'backwater-coastal',
    title: 'Backwater & Coastal Tourism',
    subtitle: 'Palm Lagoons, Houseboats & Ocean Confluence',
    route: 'Alappuzha • Kumarakom • Kanyakumari • Fort Kochi',
    desc: 'Unwind along shimmering backwater canals on deluxe houseboats, witness sunset over the Arabian Sea, and stand at the tip of the Indian subcontinent where three oceans unite.',
    vehicles: 'Sedan (Dzire/Etios) • SUV (Ertiga) • Innova Crysta',
    places: [
      {
        name: 'Alappuzha (Alleppey)',
        state: 'Kerala',
        tagline: 'Venice of the East',
        image: '/images/destinations/alleppey.jpg',
        attractions: 'Kettuvallam Houseboat Cruise • Punnamada Lake • Vembanad Canals',
        altitude: 'Backwater Network'
      },
      {
        name: 'Kumarakom Backwaters',
        state: 'Kerala',
        tagline: 'Bird Sanctuary & Lake Retreat',
        image: '/images/destinations/backwater.jpg',
        attractions: 'Vembanad Lake • Lotus Lagoons • Ayurvedic Spa Centers',
        altitude: 'Lagoon Serenity'
      },
      {
        name: 'Kanyakumari',
        state: 'Tamil Nadu',
        tagline: 'Lands End & Triveni Sangam',
        image: '/images/destinations/kanyakumari.jpg',
        attractions: 'Vivekananda Rock Memorial • 133ft Thiruvalluvar • Sunrise & Sunset',
        altitude: 'Triveni Confluence'
      }
    ]
  },
  {
    id: 'cauvery-delta',
    title: 'Cauvery Delta & Chola Trail',
    subtitle: 'Navagraha Shrines, Kallanai Dam & Temple Architecture',
    route: 'Kumbakonam • Gangaikonda Cholapuram • Thanjavur • Trichy',
    desc: 'Explore the fertile river Kaveri cradle, home to 9 planetary Navagraha parihara temples, ancient Chola stone masonry, and centuries-old handloom silk weaving traditions.',
    vehicles: 'Innova Crysta • Force Urbania • Tempo Traveller',
    places: [
      {
        name: 'Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'The Temple Town & Navagraha Hub',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: 'Adi Kumbeswarar • Mahamaham Tank • 9 Navagraha Shrines',
        altitude: 'Delta Heart'
      },
      {
        name: 'Trichy Kaveri Basin',
        state: 'Tamil Nadu',
        tagline: 'Grand Anicut & Rockfort Summit',
        image: '/images/destinations/trichy.jpg',
        attractions: '2nd Century Kallanai Dam • Monolithic Rockfort • Srirangam Ranganathar',
        altitude: 'Kaveri River'
      },
      {
        name: 'Thanjavur & Chola Temples',
        state: 'Tamil Nadu',
        tagline: 'Living Heritage & Bronze Arts',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Airavatesvara Temple • Chola Bronzes & Thanjavur Art Plates',
        altitude: 'Chola Capital'
      }
    ]
  },
  {
    id: 'airport-corporate',
    title: 'Airport & Corporate Trip',
    subtitle: '24/7 Interstate Express Chauffeur Transfers',
    route: 'Chennai • Trichy • Madurai • Coimbatore Terminals',
    desc: 'Reliable doorstep-to-terminal airport pickup and drops across all major South Indian international airports, corporate delegate conveyance, and intercity business tours with official GST billing.',
    vehicles: 'Force Urbania • Innova Crysta • Executive Sedans',
    places: [
      {
        name: 'Chennai Metropolis',
        state: 'Tamil Nadu',
        tagline: 'International Gateway of South India',
        image: '/images/destinations/chennai.jpg',
        attractions: 'Chennai Airport T1/T2 • OMR IT Expressway • Marina Coastline',
        altitude: 'Metro Hub'
      },
      {
        name: 'Coimbatore Industrial Hub',
        state: 'Tamil Nadu',
        tagline: 'Manchester of South India',
        image: '/images/destinations/coimbatore.jpg',
        attractions: 'Coimbatore Airport • Adiyogi Shiva Statue • Nilgiri Foothills',
        altitude: 'Western Gateway'
      },
      {
        name: 'Trichy & Madurai Terminals',
        state: 'Tamil Nadu',
        tagline: 'Central Tamil Nadu Air Terminals',
        image: '/images/destinations/trichy.jpg',
        attractions: 'International Flight Transfers • Highway Outstation Express',
        altitude: 'Transit Junction'
      }
    ]
  }
];

export default function TravelHubsCarousel({ onOpenBooking }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const AUTOPLAY_DURATION = 6000; // 6 seconds per hub
  const INTERVAL_STEP = 50;

  const currentHub = travelHubsData[activeIndex];

  // Auto-swipe timer logic
  useEffect(() => {
    if (isPaused) {
      clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTOPLAY_DURATION) {
        clearInterval(progressIntervalRef.current);
        setActiveIndex(prev => (prev + 1) % travelHubsData.length);
      }
    }, INTERVAL_STEP);

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, isPaused]);

  const handlePrev = () => {
    setProgress(0);
    setActiveIndex(prev => (prev - 1 + travelHubsData.length) % travelHubsData.length);
  };

  const handleNext = () => {
    setProgress(0);
    setActiveIndex(prev => (prev + 1) % travelHubsData.length);
  };

  const handleSelectHub = (idx) => {
    setProgress(0);
    setActiveIndex(idx);
  };

  const handleBookHub = (placeName) => {
    if (onOpenBooking) {
      onOpenBooking({
        destinationCity: `${placeName || currentHub.title} (${currentHub.title})`,
        pickupCity: 'Thanjavur'
      });
    }
  };

  return (
    <section 
      className="py-12 sm:py-20 px-4 sm:px-10 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FDFBF7] border-t border-neutral-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-neutral-200 pb-4 sm:pb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-espresso mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a5d14]">
                Interactive Tour Destination Spotlight
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900 tracking-tight">
              Key Travel Hubs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
              Explore South India's premier tourist circuits one by one with detailed destinations showcased side by side.
            </p>
          </div>

          {/* Autoplay & Direction Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Play Auto-swipe" : "Pause Auto-swipe"}
              aria-label={isPaused ? "Play Auto-swipe" : "Pause Auto-swipe"}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />}
              <span className="hidden sm:inline">{isPaused ? 'Resume Auto-Swipe' : 'Pause'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                title="Previous Destination Hub"
                aria-label="Previous Destination Hub"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-300 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-neutral-800 flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                title="Next Destination Hub"
                aria-label="Next Destination Hub"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-300 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-neutral-800 flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* HUB SELECTOR PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar snap-x">
          {travelHubsData.map((hub, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={hub.id}
                onClick={() => handleSelectHub(idx)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 snap-start flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#241815] text-[#FCF6BA] border-brand-gold shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                <span>{hub.title}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                )}
                {/* Micro progress line inside active tab */}
                {isSelected && !isPaused && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-gold transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ACTIVE HUB SPOTLIGHT CONTAINER */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden relative">
          
          {/* Top Gold Ambient Accent Line */}
          <div className="h-1.5 bg-gradient-to-r from-brand-espresso via-brand-gold to-brand-espresso"></div>

          {/* HUB INFO HEADER BANNER */}
          <div className="p-5 sm:p-8 bg-gradient-to-r from-[#241815] via-[#342521] to-[#241815] text-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-gold/25 border border-brand-gold/40 text-[#FCF6BA] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    Hub {activeIndex + 1} of {travelHubsData.length}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-gold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {currentHub.route}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold font-heading text-white tracking-tight flex items-center gap-2">
                  <span>{currentHub.title}</span>
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                  {currentHub.desc}
                </p>

                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-400 pt-1">
                  <Car className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span><strong className="text-white">Recommended Fleet:</strong> {currentHub.vehicles}</span>
                </div>
              </div>

              {/* Action Buttons for this Hub */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                <button
                  onClick={() => handleBookHub(currentHub.title)}
                  className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Book Ride for This Circuit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/destinations"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* DETAILED SIDE-BY-SIDE IMAGES SECTION */}
          <div className="p-4 sm:p-8 bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                  Detailed Circuit Highlights
                </span>
                <h4 className="text-sm sm:text-lg font-bold font-heading text-neutral-900">
                  Featured Destinations Shown Side by Side
                </h4>
              </div>
              <span className="text-xs font-semibold text-neutral-500 hidden sm:inline">
                Hover to pause • Click to book ride
              </span>
            </div>

            {/* 3 Detailed Images Side by Side Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {currentHub.places.map((place, pIdx) => (
                <div
                  key={place.name}
                  onClick={() => handleBookHub(place.name)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Container with Zoom */}
                  <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                        {place.state}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#241815] text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {place.altitude}
                      </span>
                    </div>

                    {/* In-Image Typography */}
                    <div className="absolute bottom-3 inset-x-3 text-white z-10 space-y-1">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#FCF6BA] block tracking-wide">
                        {place.tagline}
                      </span>
                      <h5 className="text-xl sm:text-2xl font-black font-heading text-white drop-shadow group-hover:text-gold-shine transition-colors">
                        {place.name}
                      </h5>
                    </div>
                  </div>

                  {/* Card Bottom Meta & Attractions */}
                  <div className="p-3.5 sm:p-4 bg-white space-y-2 border-t border-neutral-100">
                    <div className="flex items-start gap-1.5 text-xs text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed">
                        <strong className="text-neutral-900 font-semibold">Iconic Attractions:</strong> {place.attractions}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-gold-dark group-hover:underline">
                        Book Taxi to {place.name}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-brand-gold group-hover:text-white text-neutral-700 flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM STEPPER & PROGRESS FOOTER */}
          <div className="px-5 py-3.5 sm:px-8 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-800">
                {activeIndex + 1} / {travelHubsData.length}
              </span>
              <span>—</span>
              <span className="truncate max-w-[200px] sm:max-w-none">
                {currentHub.title} ({currentHub.places.map(p => p.name).join(' • ')})
              </span>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {travelHubsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectHub(idx)}
                  aria-label={`Go to Hub ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-7 bg-brand-gold'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
