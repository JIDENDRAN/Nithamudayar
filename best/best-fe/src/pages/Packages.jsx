import React, { useState, useEffect } from 'react';
import PackagesHero from '../components/PackagesHero';
import MobilePackagesHero from '../components/mobile/MobilePackagesHero';
import { Clock, Users, ArrowRight, Check, MapPin, Compass, Sparkles } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

export default function PackagesPage({ onOpenBooking }) {
  const [filter, setFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [dbPackages, setDbPackages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDbPackages(data);
        }
      })
      .catch(err => console.warn('Could not load packages from DB:', err));
  }, []);

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const defaultPackages = [
    {
      id: 'tamilnadu-tourism-places',
      city: 'Tamil Nadu Major Hubs',
      category: 'tamilnadu',
      tag: 'Complete Regional Circuit',
      title: 'Tamil Nadu Tourism Circuit',
      location: '10 Iconic Destinations across Tamil Nadu & Kerala',
      duration: '6 Days / 5 Nights',
      groupSize: '1 to 50 Passengers',
      image: '/images/destinations/thanjavur.jpg',
      price: '₹24,500',
      highlights: [
        'Trichy',
        'Thanjavur',
        'Kumbakonam',
        'Madurai',
        'Karaikudi',
        'Rameshwaram',
        'Kanyakumari',
        'Thiruvananthapuram',
        'Coimbatore',
        'Chennai',
      ],
      includes: 'Chauffeur Driven AC Sedan / SUV / Tempo, Fuel & Interstate Permits',
    },
    {
      id: 'arupadai-murugan-temple',
      city: 'Six Murugan Shrines',
      category: 'murugan',
      tag: 'Sacred Lord Murugan Abodes',
      title: 'Arupadai Murugan Temple Tour',
      location: 'Six Sacred Holy Abodes of Lord Murugan',
      duration: '4 Days / 3 Nights',
      groupSize: 'Devotees & Families',
      image: '/images/destinations/murugan.jpg',
      price: '₹14,800',
      highlights: [
        'Tiruchendur',
        'Palani',
        'Thiruparankundram',
        'Pazhamudhircholai',
        'Swamimalai',
        'Thiruthani',
      ],
      includes: 'Special Chauffeur for Temple Timing, Fuel, Toll & Driver Allowance',
    },
    {
      id: 'mountain-area-tourism',
      city: 'Western Ghats & Nilgiris',
      category: 'mountain',
      tag: 'Cool Climates & Wildlife Sanctuaries',
      title: 'Mountain Area Tourism Circuit',
      location: '7 Scenic Hill Stations & Forest Reserves',
      duration: '5 Days / 4 Nights',
      groupSize: 'Couples / Families / Corporate Groups',
      image: '/images/destinations/kodaikanal.jpg',
      price: '₹18,500',
      highlights: [
        'Kodaikanal',
        'Ooty',
        'Bandipur',
        'Valparai',
        'Munnar',
        'Thekkady',
        'Yercaud',
      ],
      includes: 'Certified Mountain Hairpin Chauffeur, Hill Permits & Clean AC Vehicle',
    },
    {
      id: 'back-water-places',
      city: 'Kerala Backwaters & Coast',
      category: 'backwater',
      tag: 'Houseboats, Forts & Oceanside Cliffs',
      title: 'Back Water Places Explorer',
      location: '8 Backwater, Lagoon & Coastal Destinations',
      duration: '4 Days / 3 Nights',
      groupSize: 'Honeymooners, Families & Groups',
      image: '/images/destinations/alleppey.jpg',
      price: '₹16,900',
      highlights: [
        'Alappuzha',
        'Fort Kochi',
        'Kumarakom',
        'Mararikulam',
        'Kovalam',
        'Varkala',
        'Jatayu',
        'Mangalam',
      ],
      includes: 'Luxury Chauffeur Service, Fuel, Toll & Driver Bata',
    },
    {
      id: 'airport-pickup-drop',
      city: 'Airports Across Tamil Nadu',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Airport Pickup and Drop Service',
      location: 'Chennai, Trichy, Madurai, Coimbatore Airports',
      duration: '24/7 On-Demand / Flight Schedule',
      groupSize: '1 to 50 Passengers',
      image: '/images/destinations/chennai.jpg',
      price: 'From ₹1,800',
      highlights: [
        'Airport pickup and drop',
        '24/7 flight schedule tracking & zero waiting charges',
        'Doorstep terminal greeting & luggage assistance',
        'Direct transfer to home, hotel, or business venue',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Chauffeur with Airport Placard, AC Cabin, Parking, Toll & Fuel',
    },
    {
      id: 'local-trip-sightseeing',
      city: 'Local City Circuits',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Local City Trip & Sightseeing',
      location: 'Trichy, Madurai, Thanjavur, Coimbatore, Chennai',
      duration: 'Flexible Hourly / Day Rental',
      groupSize: '1 to 50 Passengers',
      image: '/images/destinations/thanjavur.jpg',
      price: 'From ₹2,000',
      highlights: [
        'Local trip across major cities',
        'Temple darshans, heritage monuments & museum visits',
        'Shopping bazaars, artisan streets & culinary stops',
        'Flexible 4hr / 8hr / 12hr custom rental packages',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Experienced City Chauffeur, Fuel, AC Vehicle & Driver Bata',
    },
    {
      id: 'outstation-highway-trip',
      city: 'All South India',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Outstation Highway Trip',
      location: 'All South India Intercity Routes',
      duration: 'One-Way Drop & Round Trips',
      groupSize: '1 to 50 Passengers',
      image: '/images/destinations/rameswaram.jpg',
      price: 'From ₹3,500',
      highlights: [
        'Outstation Trip with verified highway chauffeurs',
        'Safe, reliable daytime and nighttime highway travel',
        'Round trip holiday charters & one-way intercity drops',
        'Complimentary luggage carrier & hygienic cabins',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Commercial Interstate Tourist Permit, Fuel, Toll & Driver Allowance',
    },
    {
      id: 'corporation-trip-charters',
      city: 'Corporate Hubs',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Corporation & Corporate Delegate Trip',
      location: 'Tech Parks, Hotels & Convention Centers',
      duration: 'Business Hours / Executive Charters',
      groupSize: 'Delegates & Corporate Groups',
      image: '/images/destinations/chennai.jpg',
      price: 'From ₹3,200',
      highlights: [
        'Corporation trip & business delegation transit',
        'VIP guest pickup, hotel transfers & corporate summits',
        'GST compliant billing & corporate contract rentals',
        'Well-groomed chauffeurs with English/Tamil proficiency',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Executive Class Chauffeur, Clean Sanitized Vehicle, Toll & Parking',
    },
    {
      id: 'family-holiday-trip',
      city: 'Family Destinations',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Family Holiday & Pilgrimage Trip',
      location: 'Tamil Nadu & Kerala Family Destinations',
      duration: 'Multi-Day Customized Holidays',
      groupSize: 'Families & Groups',
      image: '/images/destinations/murugan.jpg',
      price: 'From ₹4,500',
      highlights: [
        'Family trip tailored for parents, kids & senior citizens',
        'Frequent restful halts & clean highway restaurant stops',
        'Ample boot space for multiple luggage bags & strollers',
        'Sacred temple circuits & relaxing scenic holiday tours',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Patient Family-Friendly Chauffeur, AC Vehicle, Fuel & Interstate Permits',
    },
    {
      id: 'honeymoon-romantic-trip',
      city: 'Hill Stations & Coastal Belts',
      category: 'services',
      tag: 'All Luxury Cars Available',
      title: 'Honeymoon Special Romantic Trip',
      location: 'Ooty, Kodaikanal, Munnar, Alleppey, Kovalam',
      duration: '3 to 5 Days Romantic Tour',
      groupSize: 'Couples / Honeymooners',
      image: '/images/destinations/kodaikanal.jpg',
      price: 'From ₹6,500',
      highlights: [
        'Honeymoon trip with private, premium decorated cab',
        'Scenic mist-filled mountain drives & lake halts',
        'Romantic sunset viewpoints & private Kerala houseboats',
        'Discreet, respectful chauffeur respecting couple privacy',
        'All luxury cars available: Sedan, SUV, Crysta, Tempo & Urbania',
      ],
      includes: 'Decorated AC Car Option, Hill Hairpin Chauffeur, Fuel & Permits',
    },
    {
      id: 'all-travel-services',
      city: 'South India Service',
      category: 'services',
      tag: '24/7 Dedicated Chauffeur Fleet',
      title: 'All Travel Services & Chauffeur Charters',
      location: 'Tamil Nadu & South India Hubs',
      duration: '24/7 Available on Demand',
      groupSize: '1 to 50+ Passengers',
      image: '/images/destinations/chennai.jpg',
      price: 'From ₹2,500',
      highlights: [
        'Airport pickup and drop',
        'Local trip',
        'Outstation Trip',
        'Corporation trip',
        'Family trip',
        'Honeymoon trip (All luxury cars available)',
      ],
      includes: 'Commercial Tourist Permit, 100% On-Time Guarantee & Clean Vehicles',
    },
    {
      id: 'thanjavur-royal-heritage',
      city: 'Thanjavur & Delta',
      category: 'delta',
      tag: 'Chola UNESCO & Palace Arts',
      title: 'Chola Royal Heritage & Cauvery Delta Trail',
      location: 'Thanjavur, Kumbakonam & Trichy',
      duration: '3 Days / 2 Nights',
      groupSize: 'Families / Heritage Travelers',
      image: '/images/destinations/kumbakonam.jpg',
      price: 'From ₹8,900',
      highlights: [
        'Brihadisvara UNESCO Monument with evening courtyard breeze',
        'Maratha Royal Palace complex & Saraswathi Mahal ancient manuscript library',
        'Swamimalai lost-wax bronze casting & Thirubuvanam pure silk handlooms',
        'Trichy Rockfort & historic Kallanai 2nd-century water diversion marvel',
      ],
      includes: 'Dedicated AC Vehicle, Chauffeur Allowance, Fuel & Toll',
    },
    {
      id: 'southern-pilgrimage',
      city: 'Madurai & Sea Belt',
      category: 'pilgrimage',
      tag: 'Ancient Architecture & Ocean Confluence',
      title: 'Madurai Meenakshi, Rameshwaram & Kanyakumari',
      location: 'Southern Tamil Nadu',
      duration: '3 Days / 2 Nights',
      groupSize: 'All Group Sizes',
      image: '/images/destinations/rameswaram.jpg',
      price: 'From ₹9,800',
      highlights: [
        'Madurai Meenakshi Amman Temple & Thirumalai Nayakkar Palace',
        'Iconic Pamban Sea Bridge & Ramanathaswamy 1,000-pillar corridor',
        'Dhanushkodi ghost town & Arichal Munai land’s end ocean view',
        'Vivekananda Rock Memorial & Kanyakumari Triveni Sangam ocean sunset',
      ],
      includes: 'AC Vehicle, Experienced Temple Chauffeur, Driver Bata & Fuel',
    },
  ];

  const formattedDbPackages = dbPackages.map((item) => {
    let cat = 'tamilnadu';
    const nameLower = (item.name || '').toLowerCase();
    const placesLower = (item.places || '').toLowerCase();
    if (nameLower.includes('murugan') || placesLower.includes('palani') || placesLower.includes('tiruchendur')) {
      cat = 'murugan';
    } else if (nameLower.includes('mountain') || nameLower.includes('hill') || placesLower.includes('kodaikanal') || placesLower.includes('ooty') || placesLower.includes('munnar')) {
      cat = 'mountain';
    } else if (nameLower.includes('backwater') || placesLower.includes('alappuzha') || placesLower.includes('kochi') || placesLower.includes('varkala')) {
      cat = 'backwater';
    } else if (
      nameLower.includes('service') ||
      nameLower.includes('airport') ||
      nameLower.includes('local') ||
      nameLower.includes('outstation') ||
      nameLower.includes('corporation') ||
      nameLower.includes('family holiday') ||
      nameLower.includes('family trip') ||
      nameLower.includes('honeymoon') ||
      placesLower.includes('airport') ||
      placesLower.includes('luxury car')
    ) {
      cat = 'services';
    } else if (nameLower.includes('chola') || placesLower.includes('thanjavur') || placesLower.includes('kumbakonam')) {
      cat = 'delta';
    } else if (nameLower.includes('rameswaram') || placesLower.includes('kanyakumari') || placesLower.includes('pilgrimage')) {
      cat = 'pilgrimage';
    }

    const highlightsList = item.places
      ? item.places.split(/[,•\n]+/).map(s => s.trim()).filter(Boolean)
      : [];

    return {
      id: item.id,
      city: item.location || 'South India',
      category: cat,
      tag: item.location || 'Tour Circuit',
      title: item.name,
      location: item.location || 'Tamil Nadu',
      duration: item.duration || 'Flexible',
      groupSize: 'All Group Sizes',
      image: item.image ? (item.image.startsWith('/uploads/') ? `${API_BASE_URL}${item.image}` : item.image) : '/images/destinations/thanjavur.jpg',
      price: item.price,
      highlights: highlightsList.length > 0 ? highlightsList : [item.places],
      includes: 'AC Vehicle, Certified Chauffeur, Fuel, Toll & Driver Allowance',
      rawPlaces: item.places
    };
  });

  // Always show live packages from DB, fallback if DB fetch is pending/offline
  const packages = formattedDbPackages.length > 0 ? formattedDbPackages : defaultPackages;

  const filterTabs = [
    { id: 'all', label: `All Circuits & Tours (${packages.length})` },
    { id: 'tamilnadu', label: 'Tamil Nadu Tourism' },
    { id: 'murugan', label: 'Arupadai Murugan Temple' },
    { id: 'mountain', label: 'Mountain Area Tourism' },
    { id: 'backwater', label: 'Back Water Places' },
    { id: 'services', label: 'All Travel Services' },
    { id: 'delta', label: 'Chola & Delta Heritage' },
    { id: 'pilgrimage', label: 'Madurai & Rameshwaram' },
  ];

  const filtered = filter === 'all' 
    ? packages 
    : packages.filter((p) => p.category === filter);

  return (
    <div className="pb-16 md:pb-0">
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobilePackagesHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) with Tamil Nadu 3D Map */}
      <div className="hidden md:block">
        <PackagesHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Filter Tabs & Listing */}
      <section className="py-10 sm:py-16 px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Introduction */}
          <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-4 sm:pb-5 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Customized Holiday & Pilgrimage Circuits
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                Explore South India Tour Packages
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Explore curated circuits covering major heritage sites, temples, hill stations, and coastal destinations across Tamil Nadu and South India with dedicated AC vehicle and verified chauffeur.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-dark bg-white border border-brand-gold/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-2xs shrink-0 whitespace-nowrap">
              <Sparkles className="w-4 h-4 text-brand-gold-dark shrink-0" />
              <span>Customizable Itineraries • Verified Chauffeurs</span>
            </div>
          </div>

          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="flex items-center flex-nowrap overflow-x-auto no-scrollbar sm:flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-10 pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'btn-gold shadow-md'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:border-brand-gold-dark hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Animated Tour Packages Grid with Full-Card Click 3D Flip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => toggleFlip(pkg.id)}
                className="flip-card-perspective min-h-[520px] sm:min-h-[550px] cursor-pointer group"
              >
                <div
                  className={`flip-card-inner rounded-2xl shadow-md transition-all duration-700 ${
                    flippedCards[pkg.id] ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="flip-card-front bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div>
                      {/* Image Thumbnail with Overlay Badges */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="badge-gold text-[10px] sm:text-xs">
                            {pkg.city}
                          </span>
                          <span className="bg-white/90 backdrop-blur-xs text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Tap for Itinerary ↺
                          </span>
                        </div>

                        {/* Bottom Tag & Place Details on Image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] font-semibold text-brand-gold-light uppercase tracking-wider block truncate">
                              {pkg.tag}
                            </span>
                            <span className="text-xs sm:text-sm font-bold truncate block">
                              {pkg.location}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-bold text-[#FCF6BA] bg-black/75 border border-brand-gold/40 px-2.5 py-1 rounded-lg backdrop-blur-xs block shadow-sm">
                              {pkg.highlights.length} Places Covered
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-4 sm:p-5 space-y-3">
                        <h3 className="text-sm sm:text-base font-bold font-heading text-neutral-900 group-hover:text-brand-gold-dark transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>

                        {/* Key Specs Row */}
                        <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1 border-t border-neutral-100">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                            {pkg.duration}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-brand-gold-dark" />
                            {pkg.groupSize}
                          </span>
                        </div>

                        {/* All Covered Places Visible on Front */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-brand-gold-dark" />
                              Covered Destinations ({pkg.highlights.length}):
                            </span>
                            <span className="text-[10px] text-brand-gold-dark font-bold bg-brand-gold/10 px-2.5 py-0.5 rounded-full">
                              Place Details
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {pkg.highlights.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center text-[11px] font-medium bg-neutral-100/90 hover:bg-brand-gold/15 text-neutral-800 border border-neutral-200/80 px-2 py-0.5 rounded-md transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-1.5 shrink-0"></span>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking({ title: pkg.title, packageType: pkg.title, city: pkg.city });
                        }}
                        className="flex-1 btn-gold py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow active:scale-95 transition-all"
                      >
                        <span>Book Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(pkg.id);
                        }}
                        className="py-2.5 px-3.5 rounded-xl border border-neutral-300 hover:border-brand-gold hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                      >
                        <span>Itinerary ↺</span>
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE (Detailed Itinerary) */}
                  <div 
                    className="flip-card-back !bg-[#241815] border-2 border-brand-gold/50 text-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl"
                    style={{ backgroundColor: '#241815', color: '#ffffff' }}
                  >
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 mb-4">
                        <div>
                          <span className="text-[11px] font-extrabold text-[#D4AF37] uppercase tracking-wider block">
                            Circuit Details
                          </span>
                          <h4 className="text-base sm:text-lg font-black font-heading text-white line-clamp-1 mt-0.5">
                            {pkg.title}
                          </h4>
                        </div>
                        <span className="text-xs text-neutral-200 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full shrink-0 font-semibold cursor-pointer transition-colors">
                          ↺ Flip Back
                        </span>
                      </div>

                      {/* Complete Covered Places List */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-[#FCF6BA] uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-brand-gold" />
                            <span>Places Covered ({pkg.highlights.length}):</span>
                          </span>
                          <span className="text-[11px] font-bold text-[#241815] bg-[#D4AF37] px-2.5 py-0.5 rounded-full shadow-sm font-heading">
                            {pkg.duration}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-white max-h-52 overflow-y-auto pr-1">
                          {pkg.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2.5 bg-[#31201b] hover:bg-[#3d2822] p-2 rounded-lg border border-brand-gold/30 hover:border-brand-gold/60 transition-colors">
                              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FCF6BA] to-[#BF953F] text-[#241815] font-black text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                                {i + 1}
                              </span>
                              <span className="text-white font-bold text-xs sm:text-sm leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Package Inclusions */}
                      <div className="bg-[#18110f] border border-brand-gold/35 rounded-xl p-3 text-xs">
                        <span className="text-[#D4AF37] font-bold block mb-1">Package Inclusions:</span>
                        <p className="text-neutral-200 leading-relaxed text-[11px]">{pkg.includes}</p>
                      </div>
                    </div>

                    {/* Book Now Button on Back of Card */}
                    <div className="pt-4 border-t border-brand-gold/30 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent flip when clicking button
                          onOpenBooking({ title: pkg.title, packageType: pkg.title, city: pkg.city });
                        }}
                        className="w-full btn-gold py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-98 transition-all"
                      >
                        <span>Reserve This Circuit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
