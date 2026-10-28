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
  Play,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const travelHubsData = [
  {
    id: 'mountain-tourism',
    title: 'Mountain Area Tourism',
    subtitle: 'Chilly Hill Station Escapes & Misty Valleys',
    route: 'Ooty • Kodaikanal • Munnar • Valparai • Thekkady',
    desc: 'Breathtaking Western Ghats panoramas, lush rolling tea plantations, cool misty climate, and serene mountain lakes. Chauffeur-driven luxury travel with expert ghat-road drivers.',
    vehicles: 'Toyota Innova Crysta • Force Urbania • 4x4 SUVs',
    accentColor: 'from-emerald-900 via-[#1e3a2f] to-[#12221b]',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    places: [
      {
        name: 'Ooty',
        state: 'Tamil Nadu',
        tagline: 'Queen of Hill Stations',
        image: '/images/destinations/ooty.jpg',
        attractions: 'Botanical Gardens • Pykara Waterfalls • Nilgiri Mountain Railway • Doddabetta Peak',
        highlight: '2,240 m Altitude • Rolling Tea Hills',
        desc: 'Escape into the cool Nilgiri mist, explore sprawling aromatic tea estates, ride the UNESCO toy train, and boat on pristine Pykara lake.'
      },
      {
        name: 'Kodaikanal',
        state: 'Tamil Nadu',
        tagline: 'Princess of Hill Stations',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Star-Shaped Kodai Lake • Pillar Rocks • Coakers Walk • Pine Forests • Silver Cascade',
        highlight: '2,133 m Altitude • Forest Lakes',
        desc: 'A romantic haven of misty cliffs, century-old pine forest walking trails, boating on the scenic star-shaped lake, and panoramic viewpoint halts.'
      },
      {
        name: 'Munnar',
        state: 'Kerala',
        tagline: 'Emerald Tea Paradise',
        image: '/images/destinations/munnar.jpg',
        attractions: 'Anamudi Peak • Mattupetty Dam • Eravikulam National Park • Tea Museum • Attukal Falls',
        highlight: '1,600 m Altitude • Cloud Mist Valleys',
        desc: 'Unending expanse of emerald-green tea valleys, winding scenic mist roads, wildlife sanctuaries, and cascading gushing mountain waterfalls.'
      }
    ]
  },
  {
    id: 'tamilnadu-heritage',
    title: 'Tamil Nadu Heritage Circuit',
    subtitle: 'UNESCO World Monuments & Great Living Dravidian Temples',
    route: 'Trichy • Thanjavur • Madurai • Rameshwaram',
    desc: 'Journey through 2,000 years of glorious Tamil architectural genius, soaring granite temple towers (Vimana), sculpted corridors, and legendary sacred sea bridges.',
    vehicles: 'Innova Crysta • Force Urbania • Tempo Traveller',
    accentColor: 'from-[#342521] via-[#44322d] to-[#241815]',
    badgeBg: 'bg-amber-500/20 text-[#FCF6BA] border-amber-500/40',
    places: [
      {
        name: 'Thanjavur',
        state: 'Tamil Nadu',
        tagline: 'Chola Capital & Great Living Temples',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Brihadisvara Periya Kovil • Maratha Royal Palace • Saraswathi Mahal Library • Art Gallery',
        highlight: 'UNESCO World Heritage • 1000+ Yrs Vimana',
        desc: 'Behold the architectural wonder of Raja Raja Cholas 216-foot monolithic granite tower, giant Nandi, and priceless bronze casting galleries.'
      },
      {
        name: 'Madurai',
        state: 'Tamil Nadu',
        tagline: 'Ancient Temple & Jasmine City',
        image: '/images/destinations/madurai.jpg',
        attractions: 'Meenakshi Amman Temple • Thirumalai Nayakkar Palace • Gandhi Museum • Teppakulam Lake',
        highlight: '2,500+ Yrs Living History',
        desc: 'The vibrant cultural heart of Tamil Nadu with 14 colorfully sculpted Gopurams, the thousand-pillar hall, and bustling heritage temple bazaars.'
      },
      {
        name: 'Rameshwaram',
        state: 'Tamil Nadu',
        tagline: 'Sacred Island of Lord Shiva',
        image: '/images/destinations/rameswaram.jpg',
        attractions: 'Pamban Sea Bridge • Ramanathaswamy 22 Holy Theerthams • Dhanushkodi Ghost Town',
        highlight: 'Char Dham Pilgrimage • Pamban Bridge',
        desc: 'Cross the majestic sea bridge over the turquoise ocean to purify in 22 sacred temple wells and stand at Dhanushkodi where two seas merge.'
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
    accentColor: 'from-[#4a2e12] via-[#35200c] to-[#241508]',
    badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-500/40',
    places: [
      {
        name: 'Tiruchendur',
        state: 'Tamil Nadu',
        tagline: 'Seaside Coastal Shrine (2nd Abode)',
        image: '/images/destinations/murugan.jpg',
        attractions: 'Lord Subramanya Sea Shore Temple • Holy Nazhikinaru Spring • Beach Promenade',
        highlight: 'Seafront Temple • Soorasamharam Holy Spot',
        desc: 'The only seashore abode of Lord Murugan, with cool ocean breezes, temple darshan, and the miraculous sweet freshwater well on the beach.'
      },
      {
        name: 'Palani',
        state: 'Tamil Nadu',
        tagline: 'Dhandayuthapani Hill (3rd Abode)',
        image: '/images/destinations/kodaikanal.jpg',
        attractions: 'Sivagiri Hilltop Temple • Winch & Ropeway Car • Divine Panchamirtham Prasad',
        highlight: 'Hilltop Shrine • Navabashanam Idol',
        desc: 'Ascend the holy Palani hill via modern rope car or steps to worship Lord Murugan as an ascetic recluse with world-famous Panchamirtham.'
      },
      {
        name: 'Swamimalai & Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'Gnana Upadesham (4th Abode)',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: '60 Granite Steps (Tamil Years) • Son teaching Father Lord Shiva • Chola Architecture',
        highlight: 'Guru Shrine • 60 Sacred Steps',
        desc: 'Built on a hillock with 60 steps representing the 60 Tamil cycle years, where child Murugan expounded the secrets of the Pranava Mantra Om.'
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
    accentColor: 'from-[#0e2a38] via-[#123648] to-[#0a1e28]',
    badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40',
    places: [
      {
        name: 'Alappuzha (Alleppey)',
        state: 'Kerala',
        tagline: 'Venice of the East',
        image: '/images/destinations/alleppey.jpg',
        attractions: 'Kettuvallam Houseboat Cruise • Punnamada Lake • Vembanad Canal Village Network',
        highlight: 'Traditional Luxury Houseboats',
        desc: 'Glide past swaying coconut groves, rustic village shorelines, and paddy fields on an air-conditioned luxury wooden houseboat with fresh local cuisine.'
      },
      {
        name: 'Kumarakom Backwaters',
        state: 'Kerala',
        tagline: 'Bird Sanctuary & Lake Retreat',
        image: '/images/destinations/backwater.jpg',
        attractions: 'Vembanad Lake Sanctuary • Lotus Lagoons • Ayurvedic Spa & Heritage Resorts',
        highlight: 'Tranquil Lake Lagoons',
        desc: 'A serene archipelago on Vembanad Lake offering bird watching, traditional shikara boat cruises, village canoeing, and peaceful water retreats.'
      },
      {
        name: 'Kanyakumari',
        state: 'Tamil Nadu',
        tagline: 'Lands End & Triveni Sangam',
        image: '/images/destinations/kanyakumari.jpg',
        attractions: 'Vivekananda Rock Memorial • 133ft Thiruvalluvar Statue • Sunrise & Sunset Point',
        highlight: 'Confluence of 3 Oceans',
        desc: 'The southernmost tip of mainland India where the Indian Ocean, Arabian Sea, and Bay of Bengal unite under stunning sunrises and sunsets.'
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
    accentColor: 'from-[#2e2617] via-[#3a301d] to-[#1f190f]',
    badgeBg: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/40',
    places: [
      {
        name: 'Kumbakonam',
        state: 'Tamil Nadu',
        tagline: 'The Temple Town & Navagraha Hub',
        image: '/images/destinations/kumbakonam.jpg',
        attractions: 'Adi Kumbeswarar • Mahamaham Tank • 9 Navagraha Planetary Shrines Around City',
        highlight: '9 Navagraha Parihara Circuit',
        desc: 'The hub for all nine planetary Navagraha temples (Suryanar, Thingaloor, Vaitheeswaran, Thirunallar, etc.) with experienced pilgrimage drivers.'
      },
      {
        name: 'Trichy Kaveri Basin',
        state: 'Tamil Nadu',
        tagline: 'Grand Anicut & Rockfort Summit',
        image: '/images/destinations/trichy.jpg',
        attractions: '2nd Century Kallanai Dam • Monolithic Rockfort • Srirangam Ranganathaswamy Temple',
        highlight: 'Karikala Chola 2nd-Century Dam',
        desc: 'Marvel at the ancient Kallanai dam still irrigating the delta after 1,800 years, climb the 83m monolithic Rockfort, and visit 156-acre Srirangam.'
      },
      {
        name: 'Living Chola Marvels',
        state: 'Tamil Nadu',
        tagline: 'Heritage & Bronze Arts',
        image: '/images/destinations/thanjavur.jpg',
        attractions: 'Gangaikonda Cholapuram • Airavatesvara Temple Darasuram • Royal Art Plate Weavers',
        highlight: 'UNESCO Triad of Chola Temples',
        desc: 'Explore intricate stone chariot carvings, acoustic musical steps at Darasuram, and royal Thanjavur silk and art plate workshops.'
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
    accentColor: 'from-[#1b2230] via-[#242e42] to-[#141a24]',
    badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-500/40',
    places: [
      {
        name: 'Chennai Metropolis',
        state: 'Tamil Nadu',
        tagline: 'International Gateway of South India',
        image: '/images/destinations/chennai.jpg',
        attractions: 'Chennai Airport T1/T2 • OMR IT Expressway • Marina Coastline • Mahabalipuram',
        highlight: '24/7 Flight Tracking & VIP Pickup',
        desc: 'Punctual flight transfers with real-time arrival tracking, executive meet-and-greet, and smooth intercity drops across Tamil Nadu.'
      },
      {
        name: 'Coimbatore Industrial Hub',
        state: 'Tamil Nadu',
        tagline: 'Manchester of South India',
        image: '/images/destinations/coimbatore.jpg',
        attractions: 'Coimbatore Airport • Adiyogi Shiva Statue • Nilgiri Foothills • Tirupur Industrial Tour',
        highlight: 'Textile & Tech Gateway',
        desc: 'Corporate delegate fleet management, business visits to industrial belts, and scenic transit to nearby Ooty and Valparai hill resorts.'
      },
      {
        name: 'Trichy & Madurai Terminals',
        state: 'Tamil Nadu',
        tagline: 'Central Tamil Nadu Air Terminals',
        image: '/images/destinations/trichy.jpg',
        attractions: 'International Flight Transfers • Highway Outstation Express • Round-Trip Drops',
        highlight: 'Direct Highway Transit',
        desc: 'Seamless connections for overseas pilgrims and families arriving at Trichy and Madurai airports bound for delta and southern temple towns.'
      }
    ]
  }
];

export default function TravelHubsCarousel({ onOpenBooking }) {
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 4000; // 4 seconds per image slide
  const INTERVAL_STEP = 50;

  const currentHub = travelHubsData[activeHubIndex];
  const currentPlace = currentHub.places[activeImageIndex];

  // Auto-slide effect for images inside the active category
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        clearInterval(interval);
        // Slide to next image in this category
        setActiveImageIndex(prevImg => {
          if (prevImg + 1 < currentHub.places.length) {
            return prevImg + 1;
          } else {
            // After cycling all 3 images in this category, smoothly advance to the next hub!
            setActiveHubIndex(prevHub => (prevHub + 1) % travelHubsData.length);
            return 0;
          }
        });
      }
    }, INTERVAL_STEP);

    return () => clearInterval(interval);
  }, [activeHubIndex, activeImageIndex, isPaused, currentHub.places.length]);

  // When changing hub, reset image index to 0
  const handleSelectHub = (hubIdx) => {
    setActiveHubIndex(hubIdx);
    setActiveImageIndex(0);
    setProgress(0);
  };

  // Next / Prev Image Slide
  const handlePrevImage = () => {
    setProgress(0);
    setActiveImageIndex(prev => (prev - 1 + currentHub.places.length) % currentHub.places.length);
  };

  const handleNextImage = () => {
    setProgress(0);
    setActiveImageIndex(prev => (prev + 1) % currentHub.places.length);
  };

  // Next / Prev Hub
  const handlePrevHub = () => {
    setProgress(0);
    setActiveHubIndex(prev => (prev - 1 + travelHubsData.length) % travelHubsData.length);
    setActiveImageIndex(0);
  };

  const handleNextHub = () => {
    setProgress(0);
    setActiveHubIndex(prev => (prev + 1) % travelHubsData.length);
    setActiveImageIndex(0);
  };

  const handleBookCurrent = () => {
    if (onOpenBooking) {
      onOpenBooking({
        destinationCity: `${currentPlace.name} (${currentHub.title})`,
        pickupCity: 'Thanjavur'
      });
    }
  };

  return (
    <section 
      className="py-12 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">

        {/* 1. SECTION TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-neutral-200 pb-4 sm:pb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-espresso mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark shrink-0 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a5d14]">
                6 Key Travel Hubs • Auto-Slide Destination Showcase
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-neutral-900 tracking-tight">
              Key Travel Hubs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              Showing the 6 travel hubs one by one. Images inside each category auto-slide with full destination details and side-by-side previews.
            </p>
          </div>

          {/* Autoplay Pause/Play & Hub Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
              aria-label={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-100 text-neutral-800 flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-300 shadow-sm"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />}
              <span className="hidden sm:inline font-bold">{isPaused ? 'Resume Auto-Slide' : 'Pause'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevHub}
                title="Previous Hub"
                aria-label="Previous Hub"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-300 hover:border-brand-gold hover:bg-[#241815] hover:text-white text-neutral-800 flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextHub}
                title="Next Hub"
                aria-label="Next Hub"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-300 hover:border-brand-gold hover:bg-[#241815] hover:text-white text-neutral-800 flex items-center justify-center shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. THE 6 HUBS SELECTOR TABS (ONE-BY-ONE SWITCHER) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar snap-x">
          {travelHubsData.map((hub, idx) => {
            const isSelected = idx === activeHubIndex;
            return (
              <button
                key={hub.id}
                onClick={() => handleSelectHub(idx)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 snap-start flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#241815] text-[#FCF6BA] border-brand-gold shadow-lg scale-102 z-10'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200'
                }`}
              >
                <Compass className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                <span>{hub.title}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. ACTIVE HUB SPOTLIGHT CONTAINER */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden">
          
          {/* Top Gold Shimmer Progress Bar */}
          <div className="h-1.5 bg-neutral-200 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-gold via-[#F3C64F] to-brand-gold transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 4. MAIN SLIDING SHOWCASE FOR ACTIVE HUB CATEGORY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
            
            {/* Left 7 Columns: Big Sliding Image Stage */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] lg:min-h-[520px] bg-neutral-900 overflow-hidden group">
              <img
                key={currentPlace.name}
                src={currentPlace.image}
                alt={currentPlace.name}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20"></div>

              {/* Top Floating Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {currentHub.title}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-gold text-[#241815] text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Slide {activeImageIndex + 1} of {currentHub.places.length}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FCF6BA] text-xs font-bold border border-white/20">
                  {currentPlace.highlight}
                </span>
              </div>

              {/* Bottom Image Headline & Description */}
              <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 text-white z-10 space-y-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#FCF6BA] tracking-wide block uppercase">
                  {currentPlace.state} • {currentPlace.tagline}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black font-heading text-white drop-shadow-md">
                  {currentPlace.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 max-w-xl leading-relaxed drop-shadow">
                  {currentPlace.desc}
                </p>
              </div>

              {/* Manual Left/Right Slide Arrows inside Image */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                title="Previous Image in this Category"
                aria-label="Previous Image in this Category"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                title="Next Image in this Category"
                aria-label="Next Image in this Category"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right 5 Columns: Category Details & Active Itinerary */}
            <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between bg-white space-y-6">
              
              {/* Category Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                    Category {activeHubIndex + 1} of {travelHubsData.length}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-heading text-neutral-900 leading-tight">
                    {currentHub.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-600 flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                    <span>{currentHub.route}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-l-2 border-brand-gold pl-3 py-1">
                  {currentHub.desc}
                </p>

                {/* Active Place Attractions List */}
                <div className="bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      Now Sliding: {currentPlace.name}
                    </span>
                    <span className="text-[11px] font-bold text-brand-gold-dark bg-brand-gold/10 px-2 py-0.5 rounded-full">
                      {currentPlace.highlight}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-neutral-700">
                    <p className="font-semibold text-neutral-900">Key Sights & Halts:</p>
                    <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                      {currentPlace.attractions}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-2 text-xs text-neutral-500">
                    <Car className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                    <span className="truncate"><strong>Fleet:</strong> {currentHub.vehicles}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleBookCurrent}
                  className="w-full btn-gold py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <span>Book Cab for {currentPlace.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to="/destinations"
                    className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors border border-neutral-200"
                  >
                    View All Destinations
                  </Link>
                  <Link
                    to="/packages"
                    className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold bg-[#241815] hover:bg-[#342521] text-[#FCF6BA] transition-colors border border-brand-gold/30"
                  >
                    Explore Packages
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* 5. SIDE-BY-SIDE DETAILED IMAGES ROW (e.g. OOTY, KODAIKANAL, MUNNAR SIDE BY SIDE) */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold-dark block">
                  Detailed Images of this Category
                </span>
                <p className="text-xs sm:text-sm font-bold text-neutral-800">
                  Side by Side: {currentHub.places.map(p => p.name).join(' • ')} (Click any to slide immediately)
                </p>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto pt-1 sm:pt-0">
                {currentHub.places.map((place, pIdx) => (
                  <button
                    key={place.name}
                    onClick={() => { setActiveImageIndex(pIdx); setProgress(0); }}
                    aria-label={`Slide to ${place.name}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      pIdx === activeImageIndex
                        ? 'w-7 bg-brand-gold'
                        : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 3 Images Side by Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {currentHub.places.map((place, pIdx) => {
                const isActive = pIdx === activeImageIndex;
                return (
                  <div
                    key={place.name}
                    onClick={() => { setActiveImageIndex(pIdx); setProgress(0); }}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-white flex flex-row sm:flex-col ${
                      isActive
                        ? 'border-brand-gold ring-4 ring-brand-gold/20 shadow-lg -translate-y-1'
                        : 'border-neutral-200 hover:border-neutral-300 hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-32 sm:w-full h-24 sm:h-36 overflow-hidden bg-neutral-900 shrink-0">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {isActive && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-gold text-[#241815] text-[9px] font-black uppercase tracking-wider shadow">
                          Now Sliding
                        </div>
                      )}

                      <div className="absolute bottom-1.5 left-2 right-2 text-white hidden sm:block">
                        <span className="text-[10px] text-[#FCF6BA] font-semibold block leading-tight">
                          {place.tagline}
                        </span>
                        <h5 className="text-sm font-bold font-heading text-white">
                          {place.name}
                        </h5>
                      </div>
                    </div>

                    {/* Mobile text beside image / Desktop card info */}
                    <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
                      <div className="sm:hidden mb-1">
                        <span className="text-[9px] text-brand-gold-dark font-semibold block uppercase">
                          {place.tagline}
                        </span>
                        <h5 className="text-sm font-bold text-neutral-900">
                          {place.name}
                        </h5>
                      </div>

                      <p className="text-[11px] text-neutral-500 line-clamp-1 sm:line-clamp-2">
                        {place.attractions}
                      </p>

                      <div className="flex items-center justify-between pt-1 sm:pt-2 text-[10px] sm:text-[11px] font-bold text-brand-gold-dark">
                        <span>{place.highlight}</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. BOTTOM HUB FOOTER */}
          <div className="px-5 py-3.5 sm:px-8 bg-neutral-100/80 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900">
                Hub {activeHubIndex + 1} of {travelHubsData.length}:
              </span>
              <span className="font-semibold text-neutral-800">
                {currentHub.title}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500">
                {currentHub.places.map(p => p.name).join(' • ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevHub}
                className="text-xs font-semibold text-neutral-700 hover:text-brand-gold-dark flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous Hub
              </button>
              <span className="text-neutral-300">|</span>
              <button
                onClick={handleNextHub}
                className="text-xs font-semibold text-neutral-700 hover:text-brand-gold-dark flex items-center gap-1 cursor-pointer"
              >
                Next Hub <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
