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
  CheckCircle2,
  Pause,
  Play
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
      {
        name: 'Ooty',
        state: 'Tamil Nadu',
        tagline: 'Queen of Hill Stations',
        image: '/images/destinations/ooty.jpg',
        attractions: 'Botanical Gardens • Pykara Waterfalls • Nilgiri Tea Hills • Toy Train',
        highlight: '2,240 m Altitude'
      },
      {
        name: 'Kodaikanal',
        state: 'Tamil Nadu',
        tagline: 'Princess of Hill Stations',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Star-Shaped Kodai Lake • Pillar Rocks • Coakers Walk • Pine Forests',
        highlight: '2,133 m Altitude'
      },
      {
        name: 'Munnar',
        state: 'Kerala',
        tagline: 'Emerald Tea Paradise',
        image: '/images/destinations/munnar.jpg',
        attractions: 'Anamudi Peak • Mattupetty Dam • Eravikulam National Park • Tea Valleys',
        highlight: '1,600 m Altitude'
      }
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
      {
        name: 'Thanjavur',
        state: 'Tamil Nadu',
        tagline: 'Chola Capital & Great Living Temples',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Brihadisvara Periya Kovil • Maratha Royal Palace • Bronze Gallery',
        highlight: '1000+ Yrs Chola Vimana'
      },
      {
        name: 'Madurai',
        state: 'Tamil Nadu',
        tagline: 'Ancient Temple & Jasmine City',
        image: '/images/destinations/madurai.jpg',
        attractions: 'Meenakshi Amman Temple • Hall of 1000 Pillars • Thirumalai Nayakkar',
        highlight: '14 Sculpted Gopurams'
      },
      {
        name: 'Rameshwaram',
        state: 'Tamil Nadu',
        tagline: 'Sacred Island of Lord Shiva',
        image: '/images/destinations/rameswaram.jpg',
        attractions: 'Pamban Sea Bridge • 22 Sacred Holy Theerthams • Dhanushkodi Beach',
        highlight: 'Pamban Sea Bridge'
      }
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
      {
        name: 'Tiruchendur',
        state: 'Tamil Nadu',
        tagline: 'Seaside Coastal Shrine (2nd Abode)',
        image: '/images/destinations/murugan.jpg',
        attractions: 'Lord Subramanya Sea Shore Temple • Holy Nazhikinaru Well • Seafront',
        highlight: 'Seashore Battle Shrine'
      },
      {
        name: 'Palani',
        state: 'Tamil Nadu',
        tagline: 'Dhandayuthapani Hill (3rd Abode)',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Sivagiri Hilltop Temple • Winch & Ropeway • Divine Panchamirtham',
        highlight: 'Holy Hill Abode'
      },
      {
        name: 'Swamimalai & Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'Gnana Upadesham (4th Abode)',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: '60 Granite Steps (Tamil Cycle) • Son expounding Om to Lord Shiva',
        highlight: '60 Sacred Steps'
      }
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
      {
        name: 'Alappuzha (Alleppey)',
        state: 'Kerala',
        tagline: 'Venice of the East',
        image: '/images/destinations/alleppey.jpg',
        attractions: 'Kettuvallam Deluxe Houseboat Cruise • Punnamada Lake • Canal Villages',
        highlight: 'Backwater Houseboats'
      },
      {
        name: 'Kumarakom Backwaters',
        state: 'Kerala',
        tagline: 'Bird Sanctuary & Lake Retreat',
        image: '/images/destinations/backwater.jpg',
        attractions: 'Vembanad Lake • Lotus Lagoons • Ayurvedic Spa & Heritage Resorts',
        highlight: 'Tranquil Lake Lagoons'
      },
      {
        name: 'Kanyakumari',
        state: 'Tamil Nadu',
        tagline: 'Lands End & Triveni Sangam',
        image: '/images/destinations/kanyakumari.jpg',
        attractions: 'Vivekananda Rock Memorial • 133ft Thiruvalluvar • Sunrise & Sunset',
        highlight: 'Confluence of 3 Oceans'
      }
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
      {
        name: 'Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'The Temple Town & Navagraha Hub',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: 'Adi Kumbeswarar • Mahamaham Tank • 9 Navagraha Planetary Shrines',
        highlight: '9 Navagraha Parihara Circuit'
      },
      {
        name: 'Trichy Kaveri Basin',
        state: 'Tamil Nadu',
        tagline: 'Grand Anicut & Rockfort Summit',
        image: '/images/destinations/trichy.jpg',
        attractions: '2nd-Century Kallanai Dam • Monolithic Rockfort • Srirangam Temple',
        highlight: '1,800+ Yrs Active Dam'
      },
      {
        name: 'Living Chola Marvels',
        state: 'Tamil Nadu',
        tagline: 'Heritage & Bronze Arts',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Airavatesvara Temple Darasuram • Royal Art Plate Weavers & Bronzes',
        highlight: 'UNESCO Chola Triad'
      }
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
      {
        name: 'Chennai Metropolis',
        state: 'Tamil Nadu',
        tagline: 'International Gateway of South India',
        image: '/images/destinations/chennai.jpg',
        attractions: 'Chennai Airport T1/T2 • OMR IT Expressway • Marina Coastline',
        highlight: '24/7 Flight Tracking & VIP Pickup'
      },
      {
        name: 'Coimbatore Industrial Hub',
        state: 'Tamil Nadu',
        tagline: 'Manchester of South India',
        image: '/images/destinations/coimbatore.jpg',
        attractions: 'Coimbatore Airport • Adiyogi Shiva Statue • Western Ghats Foothills',
        highlight: 'Textile & Tech Gateway'
      },
      {
        name: 'Trichy & Madurai Terminals',
        state: 'Tamil Nadu',
        tagline: 'Central Tamil Nadu Air Terminals',
        image: '/images/destinations/trichy.jpg',
        attractions: 'International Flight Transfers • Highway Outstation Express',
        highlight: 'Direct Highway Transit'
      }
    ]
  }
];

// Single Section Card Component with Independent Auto-Slide Carousel
function SingleHubSection({ hub, onOpenBooking, isReversed }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentPlace = hub.places[activeImageIdx];

  // Auto-slide every 3.8 seconds for this specific hub
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveImageIdx(prev => (prev + 1) % hub.places.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, hub.places.length]);

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
      className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Gold Shimmer Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-brand-espresso via-brand-gold to-brand-espresso"></div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* INFO COLUMN (5 Columns on Desktop) */}
        <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="space-y-3">
            
            {/* Header Badge */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#241815] text-[#FCF6BA] font-black text-xs flex items-center justify-center shadow-sm">
                {hub.number}
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                {hub.badge}
              </span>
            </div>

            {/* Title & Route */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900 leading-tight">
                {hub.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                <span>{hub.route}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-l-2 border-brand-gold pl-3 py-0.5">
              {hub.desc}
            </p>

            {/* Recommended Fleet */}
            <div className="flex items-center gap-2 text-xs text-neutral-600 pt-1">
              <Car className="w-4 h-4 text-brand-gold-dark shrink-0" />
              <span><strong className="text-neutral-900">Recommended Fleet:</strong> {hub.fleet}</span>
            </div>

            {/* Currently Sliding Highlight Box */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-neutral-200/80 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 flex items-center gap-1">
                  <span>Now Sliding:</span> 
                  <span className="text-brand-gold-dark font-extrabold">{currentPlace.name}</span>
                </span>
                <span className="text-[10px] font-semibold text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200">
                  {currentPlace.highlight}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 line-clamp-1">
                {currentPlace.attractions}
              </p>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <button
              onClick={() => handleBook(currentPlace.name)}
              className="flex-1 btn-gold py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span>Book Cab for {currentPlace.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/destinations"
              className="px-4 py-2.5 sm:py-3 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors border border-neutral-200"
            >
              Details
            </Link>
          </div>
        </div>

        {/* SLIDING IMAGES COLUMN (7 Columns on Desktop) */}
        <div className={`lg:col-span-7 bg-neutral-950 p-3 sm:p-5 flex flex-col justify-between ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          
          {/* Main Large Sliding Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden bg-neutral-900 group">
            <img
              key={currentPlace.name}
              src={currentPlace.image}
              alt={currentPlace.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>

            {/* Top Badge: Place Name & Slide Counter */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                {currentPlace.state} • {currentPlace.tagline}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-brand-gold text-[#241815] text-[10px] font-black uppercase tracking-wider shadow">
                Slide {activeImageIdx + 1} of {hub.places.length}
              </span>
            </div>

            {/* Bottom Caption on Image */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 text-white z-10 space-y-1">
              <h4 className="text-xl sm:text-2xl font-black font-heading text-white drop-shadow">
                {currentPlace.name}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-200 line-clamp-1 leading-relaxed drop-shadow">
                {currentPlace.attractions}
              </p>
            </div>

            {/* Manual Slide Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIdx(prev => (prev - 1 + hub.places.length) % hub.places.length);
              }}
              title="Previous Destination Image"
              aria-label="Previous Destination Image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIdx(prev => (prev + 1) % hub.places.length);
              }}
              title="Next Destination Image"
              aria-label="Next Destination Image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* SIDE BY SIDE DETAILED THUMBNAILS ROW (e.g. OOTY • KODAIKANAL • MUNNAR SIDE BY SIDE) */}
          <div className="pt-3">
            <div className="flex items-center justify-between pb-1.5 text-[10px] sm:text-xs text-neutral-400">
              <span>Detailed Destination Images (Side by Side):</span>
              <span className="text-[#FCF6BA] font-bold">Auto-Sliding • Click any to view</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {hub.places.map((place, pIdx) => {
                const isActive = pIdx === activeImageIdx;
                return (
                  <div
                    key={place.name}
                    onClick={() => setActiveImageIdx(pIdx)}
                    className={`group/thumb relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-neutral-900 ${
                      isActive
                        ? 'border-brand-gold ring-2 ring-brand-gold/30 shadow-md scale-102'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="relative h-16 sm:h-20 w-full overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {isActive && (
                        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                      )}

                      <div className="absolute bottom-1 inset-x-1.5 text-white">
                        <span className="text-[10px] sm:text-xs font-bold font-heading truncate block leading-tight">
                          {place.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function TravelHubsSections({ onOpenBooking }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        
        {/* MASTER SECTION TITLE */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-200 pb-4 sm:pb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-espresso mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a5d14]">
                Explore All 6 Regional Tourist Hubs
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 tracking-tight">
              Key Travel Hubs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
              Divided into 6 distinct regional categories. Each section independently auto-slides through detailed destination images with high-resolution photography.
            </p>
          </div>

          <Link
            to="/destinations"
            className="text-xs sm:text-sm font-bold text-brand-gold-dark hover:text-brand-espresso flex items-center gap-1.5 transition-colors"
          >
            <span>View All Destination Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* THE 6 INDEPENDENT SECTIONS ONE BY ONE */}
        <div className="space-y-8 sm:space-y-12">
          {travelHubsCategories.map((hub, idx) => (
            <SingleHubSection 
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
