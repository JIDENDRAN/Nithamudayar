import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Car,
  ArrowRight,
  Eye,
  X,
  Compass,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const travelHubsCategories = [
  {
    id: 'cauvery-delta',
    number: '01',
    title: 'Cauvery Delta & Chola Trail',
    shortTitle: 'Cauvery Delta',
    subtitle: 'Navagraha Shrines, Kallanai Dam & Silk Weaving Villages',
    route: 'Kumbakonam • Gangaikonda Cholapuram • Thanjavur • Trichy',
    desc: 'Explore the fertile river Kaveri cradle, home to 9 planetary Navagraha parihara temples, ancient Chola stone masonry, and centuries-old handloom silk weaving traditions.',
    fleet: 'Innova Crysta • Force Urbania • Tempo Traveller',
    badge: 'Navagraha & Chola Architecture',
    places: [
      { name: 'Kumbakonam', image: '/images/destinations/kumbakonam.jpg', tagline: 'The Temple Town & 9 Navagraha Shrines', highlight: 'Mahamaham Tank & Chola Temples' },
      { name: 'Trichy', image: '/images/destinations/trichy.jpg', tagline: '2nd-Century Kallanai Dam & Rockfort', highlight: 'Grand Anicut & Srirangam' },
      { name: 'Thanjavur Chola Marvels', image: '/images/destinations/thanjavur.jpg', tagline: 'Living Chola Temples & Bronze Arts', highlight: 'Brihadeeswarar Big Temple' }
    ]
  },
  {
    id: 'tamilnadu-heritage',
    number: '02',
    title: 'Tamil Nadu Heritage Circuit',
    shortTitle: 'TN Heritage',
    subtitle: 'UNESCO World Heritage & Living Dravidian Temples',
    route: 'Trichy • Madurai • Rameshwaram • Kanyakumari',
    desc: 'Journey through 2,000 years of glorious Tamil architectural genius, soaring monolithic granite temple towers (Vimana), sculpted corridors, and legendary sacred sea bridges down to the ocean confluence.',
    fleet: 'Innova Crysta • Force Urbania • Tempo Traveller',
    badge: 'UNESCO Heritage & Ancient Temples',
    places: [
      { name: 'Madurai', image: '/images/destinations/madurai.jpg', tagline: 'Meenakshi Amman Temple • 14 Gopurams', highlight: 'Ancient Temple City' },
      { name: 'Rameshwaram', image: '/images/destinations/rameswaram.jpg', tagline: 'Pamban Sea Bridge • 22 Holy Theerthams', highlight: 'Sacred Island Pilgrimage' },
      { name: 'Kanyakumari', image: '/images/destinations/kanyakumari.jpg', tagline: 'Vivekananda Rock • 3 Oceans Confluence', highlight: 'Land’s End Sunrise & Sunset' }
    ]
  },
  {
    id: 'murugan-circuit',
    number: '03',
    title: 'Arupadai Murugan Temple Tour',
    shortTitle: 'Arupadai Murugan',
    subtitle: 'All Six Sacred Abodes of Lord Murugan (Arupadai Veedu)',
    route: 'Thiruparankundram • Tiruchendur • Palani • Swamimalai • Thiruthani • Pazhamudircholai',
    desc: 'A deeply sacred devotional pilgrimage covering all six holy battle grounds and divine abodes of Lord Murugan with comfortable halts, early morning darshan timings, and child/elder friendly driving.',
    fleet: 'Force Urbania (12/17 Seater) • Innova Crysta • AC Sedans',
    badge: 'Divine Pilgrimage Circuit',
    places: [
      { name: 'Thiruparankundram', image: '/images/destinations/thiruparankundram.jpg', tagline: 'Cave Temple & Divine Wedding • 1st Abode', highlight: '1st Sacred Abode' },
      { name: 'Tiruchendur', image: '/images/destinations/tiruchendur.jpg', tagline: 'Seaside Coastal Shrine & Victory • 2nd Abode', highlight: '2nd Sacred Abode' },
      { name: 'Palani', image: '/images/destinations/palani.jpg', tagline: 'Dhandayuthapani Swamy Hill • 3rd Abode', highlight: '3rd Sacred Abode' },
      { name: 'Swamimalai', image: '/images/destinations/swamimalai.jpg', tagline: 'Gnana Upadesham & Guru Sthalam • 4th Abode', highlight: '4th Sacred Abode' },
      { name: 'Thiruthani', image: '/images/destinations/thiruthani.jpg', tagline: 'Tanikasalam Hill & 365 Steps • 5th Abode', highlight: '5th Sacred Abode' },
      { name: 'Pazhamudircholai', image: '/images/destinations/pazhamudircholai.jpg', tagline: 'Solaimalai Forest & Fruition • 6th Abode', highlight: '6th Sacred Abode' }
    ]
  },
  {
    id: 'backwater-coastal',
    number: '04',
    title: 'Backwater & Coastal Tourism',
    shortTitle: 'Coastal & Backwater',
    subtitle: 'Palm Lagoons, Luxury Houseboats & Royal Arabian Coast',
    route: 'Alappuzha • Kumarakom • Varkala • Thiruvananthapuram • Fort Kochi',
    desc: 'Unwind along shimmering backwater canals on deluxe houseboats, witness sunset over the red geological cliffs of Varkala, and explore Travancore royal heritage in Thiruvananthapuram.',
    fleet: 'Sedan (Dzire/Etios) • SUV (Ertiga) • Innova Crysta',
    badge: 'Houseboats & Coastal Escapes',
    places: [
      { name: 'Alappuzha (Alleppey)', image: '/images/destinations/alleppey.jpg', tagline: 'Venice of the East • Deluxe Houseboats', highlight: 'Backwater Houseboats' },
      { name: 'Kumarakom', image: '/images/destinations/kumarakom.jpg', tagline: 'Tranquil Lake Lagoons & Bird Sanctuary', highlight: 'Vembanad Lake Sanctuary' },
      { name: 'Varkala', image: '/images/destinations/varkala.jpg', tagline: 'Dramatic Red Cliffs & Papanasam Beach', highlight: 'Arabian Sea Geo-Cliffs' },
      { name: 'Thiruvananthapuram', image: '/images/destinations/trivandrum.jpg', tagline: 'Padmanabhaswamy Temple & Kovalam Coast', highlight: 'Anantha Padmanabha Swamy' }
    ]
  },
  {
    id: 'mountain-tourism',
    number: '05',
    title: 'Mountain Area Tourism',
    shortTitle: 'Mountain & Hills',
    subtitle: 'Chilly Hill Station Escapes & Misty Western Ghats',
    route: 'Ooty • Kodaikanal • Munnar • Wayanad • Valparai • Thekkady',
    desc: 'Experience breathtaking hill station panoramas, rolling Nilgiri tea estates, mist-covered valleys, ancient rainforest caves, and cool pine forests with expert mountain-road chauffeurs.',
    fleet: 'Toyota Innova Crysta • Force Urbania • 4x4 SUVs',
    badge: 'Hill Stations & Tea Valleys',
    places: [
      { name: 'Ooty', image: '/images/destinations/ooty.jpg', tagline: 'Queen of Hill Stations • 2,240 m', highlight: 'Nilgiri Mountain Views' },
      { name: 'Kodaikanal', image: '/images/destinations/kodaikanal.jpg', tagline: 'Princess of Hill Stations • 2,133 m', highlight: 'Pillar Rocks & Pine Forests' },
      { name: 'Munnar', image: '/images/destinations/munnar.jpg', tagline: 'Emerald Tea Paradise • 1,600 m', highlight: 'Endless Tea Gardens' },
      { name: 'Wayanad', image: '/images/destinations/wayanad.jpg', tagline: 'Misty Rainforests, Spice Hills & Caves', highlight: 'Banasura Sagar Dam & Hills' }
    ]
  },
  {
    id: 'airport-corporate',
    number: '06',
    title: 'Airport & Corporate',
    shortTitle: 'Airport & Corporate',
    subtitle: '24/7 Interstate Express Chauffeur Transfers & VIP Delegations',
    route: 'Chennai • Trichy • Madurai • Coimbatore Terminals',
    desc: 'Reliable doorstep-to-terminal airport pickup and drops across all major South Indian international airports, corporate delegate conveyance, and intercity business tours with official GST billing.',
    fleet: 'Force Urbania • Innova Crysta • Executive Sedans',
    badge: '24/7 Flight Schedule Transfers',
    places: [
      { name: 'Chennai Airport & Corporate', image: '/images/destinations/chennai-airport.jpg', tagline: 'Gateway of South India • T1/T2 Airport', highlight: '24/7 Terminal Pickup' },
      { name: 'Coimbatore Airport & Corporate', image: '/images/destinations/coimbatore-airport.jpg', tagline: 'Manchester of South India • Industrial Hub', highlight: 'Intercity Executive Transit' },
      { name: 'Trichy Airport & Corporate', image: '/images/destinations/trichy-airport.jpg', tagline: 'International Air Terminal • Delta Express', highlight: 'Direct Flight Transfers' },
      { name: 'Madurai Airport & Corporate', image: '/images/destinations/madurai-airport.jpg', tagline: 'Southern Commercial & Air Gateway', highlight: 'VIP Corporate Delegations' }
    ]
  }
];

export default function TravelHubsSections({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewPlace, setPreviewPlace] = useState(null);

  // Flatten all 24 sightseeing places with their parent hub metadata
  const allSightseeingPlaces = useMemo(() => {
    const list = [];
    travelHubsCategories.forEach(hub => {
      hub.places.forEach(p => {
        list.push({
          ...p,
          hubId: hub.id,
          hubNumber: hub.number,
          hubTitle: hub.title,
          hubShortTitle: hub.shortTitle,
          hubBadge: hub.badge,
          hubFleet: hub.fleet,
          hubRoute: hub.route,
          hubDesc: hub.desc
        });
      });
    });
    return list;
  }, []);

  // Filtered list
  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') return allSightseeingPlaces;
    return allSightseeingPlaces.filter(p => p.hubId === activeCategory);
  }, [activeCategory, allSightseeingPlaces]);

  // Current active hub object (if single category selected)
  const currentHub = useMemo(() => {
    if (activeCategory === 'all') return null;
    return travelHubsCategories.find(h => h.id === activeCategory);
  }, [activeCategory]);

  const handleBookPlace = (place) => {
    if (onOpenBooking) {
      onOpenBooking({
        destinationCity: `${place.name} (${place.hubTitle || 'Sightseeing Tour'})`,
        pickupCity: 'Thanjavur'
      });
    }
  };

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-10 bg-[#FAF8F5] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">

        {/* ─── Header: Sightseeing Gallery Section ──────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-5 sm:pb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-espresso mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8a5d14]">
                Sightseeing Gallery & Destination Circuits
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-neutral-900 tracking-tight">
              South India Sightseeing
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl">
              Explore 24 hand-picked pilgrimage abodes, Chola architectural marvels, tranquil backwaters, and misty hill stations with door-to-door chauffeur cabs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="btn-gold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>View Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ─── Category Filter Tabs ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 scroll-smooth flex-nowrap sm:flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1b203d] text-[#FCF6BA] shadow-md scale-[1.02]'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
            }`}
          >
            All Sightseeing ({allSightseeingPlaces.length})
          </button>

          {travelHubsCategories.map(hub => (
            <button
              key={hub.id}
              onClick={() => setActiveCategory(hub.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === hub.id
                  ? 'bg-[#1b203d] text-[#FCF6BA] shadow-md scale-[1.02]'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              <span className="w-4 h-4 rounded text-[10px] font-mono flex items-center justify-center bg-brand-gold/20 text-neutral-800">
                {hub.number}
              </span>
              <span>{hub.shortTitle}</span>
              <span className="text-[10px] opacity-70">({hub.places.length})</span>
            </button>
          ))}
        </div>

        {/* ─── Active Circuit Context Banner (Shown when a hub is selected) ── */}
        {currentHub && (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#1b203d] text-[#FCF6BA] font-bold text-xs flex items-center justify-center">
                  {currentHub.number}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold-dark bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                  {currentHub.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 font-heading">
                {currentHub.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {currentHub.desc}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-600">
                <span className="flex items-center gap-1 font-semibold text-neutral-800">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span>Route: {currentHub.route}</span>
                </span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-brand-gold-dark" />
                  <span><strong>Fleet:</strong> {currentHub.fleet}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking && onOpenBooking({ destinationCity: currentHub.title })}
              className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap self-start md:self-center cursor-pointer"
            >
              <span>Book Circuit Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── SIGHTSEEING GALLERY GRID (All 24 Destination Sightseeing Cards) ─ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredPlaces.map((place, idx) => (
            <div
              key={place.name + idx}
              className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Sightseeing Image with Zoom & Badges */}
              <div
                onClick={() => setPreviewPlace(place)}
                className="relative h-56 sm:h-64 w-full bg-neutral-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FCF6BA] text-[10px] font-bold border border-white/20 uppercase tracking-wide">
                    {place.highlight || place.hubShortTitle}
                  </span>

                  <button
                    type="button"
                    title="View high-resolution photo"
                    className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Image Overlay: Place Name */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-0.5">
                    {place.hubShortTitle}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-heading text-white drop-shadow-md group-hover:text-[#FCF6BA] transition-colors leading-tight">
                    {place.name}
                  </h4>
                </div>
              </div>

              {/* Card Footer: Tagline & Instant Booking Action */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3.5 bg-white">
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {place.tagline}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate max-w-[120px]">
                    {place.hubFleet?.split('•')[0]?.trim() || 'AC Cab'}
                  </span>

                  <button
                    onClick={() => handleBookPlace(place)}
                    className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm hover:scale-[1.03] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Cab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Direct Concierge Desk Assistance ───────────────────────────── */}
        <div className="bg-[#1b203d] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg border border-brand-gold/30">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
              Want a Custom Multi-City Sightseeing Itinerary?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300">
              Our travel specialists configure seamless temple darshan halts, hill station routes, and coastal packages tailored to your schedule.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919789397894"
              className="btn-gold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 97893 97894</span>
            </a>
          </div>
        </div>

      </div>

      {/* ─── High-Definition Lightbox Modal for Sightseeing Photos ────────── */}
      {previewPlace && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setPreviewPlace(null)}
        >
          <div
            className="bg-[#1b203d] border border-brand-gold/30 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewPlace(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-72 sm:h-96 md:h-[420px] w-full bg-black">
              <img
                src={previewPlace.image}
                alt={previewPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b203d] via-transparent to-black/30"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/30">
                  {previewPlace.hubTitle}
                </span>
                <span className="text-xs text-neutral-300">
                  {previewPlace.highlight}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  {previewPlace.name}
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  {previewPlace.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-neutral-300">
                  <span><strong>Recommended Fleet:</strong> {previewPlace.hubFleet}</span>
                </div>

                <button
                  onClick={() => {
                    handleBookPlace(previewPlace);
                    setPreviewPlace(null);
                  }}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Book Sightseeing Cab for {previewPlace.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
