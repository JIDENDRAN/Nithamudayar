import React, { useState } from 'react';
import DestinationsHero from '../components/DestinationsHero';
import MobileDestinationsHero from '../components/mobile/MobileDestinationsHero';
import { MapPin, ArrowRight, Compass, Sparkles, LayoutGrid, Layers } from 'lucide-react';

export default function DestinationsPage({ onOpenBooking }) {
  const [activeCity, setActiveCity] = useState('Thanjavur');
  const [viewMode, setViewMode] = useState('accordion');
  const destinations = [
    {
      city: 'Thanjavur',
      subtitle: 'Imperial Maratha Palace & Chola UNESCO Arts',
      image: '/images/destinations/thanjavur.jpg',
      tag: 'Palace Arts & Bronze Masters',
      description: 'The cultural heartbeat of the Chola empire, famed for the royal Maratha Palace complex, ancient palm-leaf manuscripts at Saraswathi Mahal, handcrafted Tanjore art plates, and the monumental Brihadisvara temple.',
      attractions: [
        'Thanjavur Maratha Palace & Royal Durbar Hall',
        'Historic Saraswathi Mahal Ancient Library',
        'Bronze Casting & Tanjore Painting Artisan Quarter',
        'Brihadisvara UNESCO World Heritage Monument',
      ],
      connectivity: '55 km from Trichy Airport • Broad gauge railway junction',
      bestTime: 'October to March',
      recommendedVehicle: 'Innova Crysta or AC Sedan',
    },
    {
      city: 'Kumbakonam',
      subtitle: 'Cauvery Delta Artisans, Silk & Sacred Tanks',
      image: '/images/destinations/kumbakonam.jpg',
      tag: 'Silk Looms & Bronze Masters',
      description: 'A serene delta town nestled between the Cauvery and Arasalar rivers, renowned for Swamimalai lost-wax bronze sculptors, pure silk handloom weavers in Thirubuvanam, and rich degree filter coffee.',
      attractions: [
        'Swamimalai GI-Tagged Bronze Casting Ateliers',
        'Thirubuvanam Pure Silk Saree Handloom Weavers',
        'Historic 6.2-Acre Mahamaham Sacred Tank',
        'Dharasuram Airavatesvara Sculptural Wonder',
      ],
      connectivity: '40 km from Thanjavur • 90 km from Trichy Airport',
      bestTime: 'November to February',
      recommendedVehicle: 'Force Tempo Traveller or Innova Crysta',
    },
    {
      city: 'Trichy (Tiruchirappalli)',
      subtitle: 'Kaveri Riverway, 2nd-Century Kallanai & Rockfort Summit',
      image: '/images/destinations/trichy.jpg',
      tag: 'Ancient Engineering & River Panorama',
      description: 'A vibrant Kaveri river hub defined by the world-famous Kallanai Dam (Grand Anicut, built in the 2nd century AD), the 83-meter monolithic Rockfort summit with 360° river views, and Asia’s largest tropical butterfly park.',
      attractions: [
        'Historic Kallanai Dam (2nd Century AD Engineering Marvel)',
        'Uchchi Pillayar 83m Rockfort Panoramic Summit',
        'Asia’s Largest Tropical Butterfly Park & Mukkombu Picnic Gardens',
        'Srirangam Island Promenade & Authentic Kaveri Feast',
      ],
      connectivity: 'International Airport with direct flights • Major Southern Railway junction',
      bestTime: 'October to March',
      recommendedVehicle: 'AC Sedan or Innova Crysta',
    },
    {
      city: 'Madurai',
      subtitle: 'Culinary Capital, Royal Courts & Night Bazaars',
      image: '/images/destinations/madurai.jpg',
      tag: 'Food Capital & Night Bazaars',
      description: 'The ancient "Sleepless City" (Thoonga Nagaram) renowned for its late-night culinary street culture, the magnificent Indo-Saracenic Thirumalai Nayakkar Mahal, vibrant jasmine flower bazaars, and lotus-city heritage.',
      attractions: [
        'Thirumalai Nayakkar Palace Courtyard & Sound-Light Show',
        'Famous Food Crawl (Jigarthanda, Bun Parotta, Kari Dosa)',
        'Madurai Malli (Jasmine Flower) & Banana Bazaars',
        'Historic Meenakshi Amman Architecture & Gandhi Museum',
      ],
      connectivity: 'Madurai Airport • 135 km from Trichy • Direct gateway to Rameswaram',
      bestTime: 'October to March',
      recommendedVehicle: 'Innova Crysta or Luxury Coach Bus',
    },
    {
      city: 'Coimbatore',
      subtitle: 'Western Ghats, Sweet Waters & Tea Valleys',
      image: '/images/destinations/coimbatore.jpg',
      tag: 'Misty Valleys & Sweet Waterfalls',
      description: 'A picturesque gateway to the Western Ghats home to the famous Siruvani Waterfalls (world’s second sweetest drinking water), the 40-hairpin climb to misty Valparai tea plantations, and the iconic 112-foot Adiyogi statue.',
      attractions: [
        'Siruvani Waterfalls & Scenic Forest Reservoir',
        'Valparai 40-Hairpin Scenic Mountain Tea Trails',
        'Isha Yoga Center & 112-Foot Adiyogi Statue',
        'Anamalai Tiger Reserve Foothills & Scenic Viewpoints',
      ],
      connectivity: 'Coimbatore International Airport • Excellent 4-lane highway network',
      bestTime: 'September to March',
      recommendedVehicle: 'AC Sedan, Innova Crysta, or Tempo Traveller',
    },
    {
      city: 'Chennai',
      subtitle: 'Coromandel Coast, UNESCO Monoliths & Marine Heritage',
      image: '/images/destinations/chennai.jpg',
      tag: 'Coastal Drive & Living Heritage',
      description: 'The coastal metropolis along the Bay of Bengal, featuring the world’s second longest urban beach (Marina Beach), 7th-century coastal rock reliefs at Mahabalipuram, and colonial heritage at Fort St. George.',
      attractions: [
        'Marina Beach Sunrise Promenade & Coastal Breeze',
        'Mahabalipuram UNESCO Monolith Shore Reliefs & Pancha Rathas',
        'Historic Fort St. George & St. Mary’s Church (1644)',
        'DakshinaChitra Living Heritage Museum of South India',
      ],
      connectivity: 'Chennai International Airport • Central & Egmore Railway Stations',
      bestTime: 'November to February',
      recommendedVehicle: 'AC Sedan, Innova Crysta, or Luxury Bus Charter',
    },
    {
      city: 'Arupadai Murugan Temple Circuit',
      subtitle: 'Six Holy Abodes of Lord Murugan Across Tamil Nadu',
      image: '/images/destinations/murugan.jpg',
      tag: 'Sacred Pilgrimage Circuit',
      description: 'The six sacred holy shrines of Lord Murugan representing spiritual milestones across Tamil Nadu, from sea shores to sacred mountain peaks.',
      attractions: [
        'Tiruchendur: Lord Murugan Seashore Temple (Jayanthipuram)',
        'Palani: Sacred Dhandayuthapani Swamy hill shrine',
        'Thiruparankundram & Pazhamudhircholai: Holy rock caves & jungle springs',
        'Swamimalai & Thiruthani: Father-Guru wisdom temple & peace hill shrine',
      ],
      connectivity: 'Curated 4-day private circuit with flexible temple darshan halts',
      bestTime: 'Year-Round (Panguni Uthiram & Thai Poosam specials)',
      recommendedVehicle: 'Innova Crysta, Tempo Traveller, or AC Sedan',
    },
    {
      city: 'Mountain Area Tourism',
      subtitle: 'Western Ghats, Nilgiris & Shevaroy Hill Stations',
      image: '/images/destinations/kodaikanal.jpg',
      tag: 'Cool Climates & Wildlife Safaris',
      description: 'Breathtaking hill retreats across South India featuring mist-covered tea plantations, cascading waterfalls, lakes, and famous national parks.',
      attractions: [
        'Kodaikanal: Star lake, Silver Cascade falls & Coaker’s Walk',
        'Ooty & Bandipur: Nilgiri mountain tea gardens, Botanical garden & wildlife safari',
        'Valparai & Munnar: 40-hairpin tea trails, Mattupetty dam & misty cloud hills',
        'Thekkady & Yercaud: Periyar spice plantations & Shevaroy hill viewpoints',
      ],
      connectivity: 'Scenic mountain highways with certified hairpin bend chauffeurs',
      bestTime: 'September to May',
      recommendedVehicle: 'Toyota Innova Crysta or Force Tempo Traveller',
    },
    {
      city: 'Backwater Places & Coast',
      subtitle: 'Tranquil Lagoons, Houseboats, Coastal Forts & Red Cliffs',
      image: '/images/destinations/alleppey.jpg',
      tag: 'Houseboats & Coastal Lagoons',
      description: 'Explore the serene tropical waterways, private houseboats, ancient Portuguese forts, and coastal cliffs across the Arabian Sea coastline.',
      attractions: [
        'Alappuzha & Kumarakom: Serene backwater canals & luxury houseboat cruises',
        'Fort Kochi & Mararikulam: Historic Chinese fishing nets & golden beaches',
        'Kovalam & Varkala: Spectacular red coastal cliffs, light house & watersports',
        'Jatayu Earth Center & Mangalam: World’s largest bird sculpture & mangrove backwaters',
      ],
      connectivity: 'Cochin / Trivandrum Airport connectivity • Direct highway transfers',
      bestTime: 'September to March',
      recommendedVehicle: 'AC Sedan, Innova Crysta, or Force Urbania Luxury',
    },
    {
      city: 'Rameshwaram & Kanyakumari',
      subtitle: 'Ocean Confluence, Pamban Bridge & Land’s End',
      image: '/images/destinations/rameswaram.jpg',
      tag: 'Ocean Confluence & Sacred Sea Shrines',
      description: 'Journey across the famous Pamban sea bridge to the sacred island of Rameshwaram, Dhanushkodi ghost town, and onward to the ocean sunset at Kanyakumari.',
      attractions: [
        'Iconic Pamban Sea Bridge & Ramanathaswamy 1,000-Pillar Corridor',
        'Dhanushkodi Ghost Town & Arichal Munai Land’s End Ocean View',
        'Vivekananda Rock Memorial & Thiruvalluvar Monument',
        'Kanyakumari Triveni Sangam 3-Ocean Confluence Sunrise & Sunset',
      ],
      connectivity: 'Well-connected coastal highway from Madurai (170 km)',
      bestTime: 'October to March',
      recommendedVehicle: 'Toyota Innova Crysta or Force Tempo Traveller',
    },
  ];

  return (
    <div className="pb-16 md:pb-0">
      {/* 1. Dedicated Mobile Hero View (< 768px) */}
      <div className="block md:hidden">
        <MobileDestinationsHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 2. Dedicated Desktop Hero View (>= 768px) */}
      <div className="hidden md:block">
        <DestinationsHero onOpenBooking={onOpenBooking} />
      </div>

      {/* 3. Destination Profiles - Powered by Uiverse.io joe-watson-sbf Expanding Cards */}
      <section id="destination-profiles" className="py-10 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-5 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-dark block mb-1">
                Primary Operating Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-neutral-900">
                Unique Character of Each Region
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Hover over or tap any destination card to expand regional highlights, signature landmarks, and travel routes.
              </p>
            </div>

            {/* View Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-neutral-200/80 p-1 rounded-lg shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('accordion')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'accordion'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span>Expanding Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-brand-gold-dark" />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* Primary View: Uiverse.io by joe-watson-sbf Expanding Cards */}
          {viewMode === 'accordion' ? (
            <div className="uiverse-destination-container">
              {destinations.map((dest, idx) => {
                const isSelected = activeCity === dest.city;
                return (
                  <div
                    key={dest.city}
                    onMouseEnter={() => setActiveCity(dest.city)}
                    onClick={() => setActiveCity(dest.city)}
                    className={`uiverse-destination-item ${isSelected ? 'is-expanded' : ''}`}
                  >
                    {/* Background Destination Photo */}
                    <img
                      src={dest.image}
                      alt={dest.city}
                      className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ${
                        isSelected ? 'scale-105' : 'scale-100'
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Glass Overlay: Highly visible & clear when collapsed; darker when expanded so details are legible */}
                    <div 
                      className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
                        isSelected 
                          ? 'bg-black/65' 
                          : 'bg-black/10'
                      }`}
                    ></div>

                    {/* Vertical Rotated Text Label (Exact Uiverse joe-watson-sbf spec: transform: rotate(-90deg)) */}
                    <span className="collapsed-label">
                      {dest.city}
                    </span>

                    {/* Expanded Profile Content (Revealed on hover / active) */}
                    <div className="expanded-content text-white">
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="bg-brand-gold/20 text-brand-gold text-[11px] font-bold px-3 py-1 rounded-full border border-brand-gold/40 shadow-sm">
                            {dest.tag}
                          </span>
                          <span className="text-xs text-neutral-400 font-mono font-bold">
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-xl sm:text-3xl font-extrabold font-heading text-white">
                          {dest.city}
                        </h3>
                        <p className="text-xs font-semibold text-brand-gold mt-0.5">
                          {dest.subtitle}
                        </p>

                        <p className="text-xs text-neutral-300 leading-relaxed mt-2 sm:mt-2.5">
                          {dest.description}
                        </p>

                        {/* Signature Landmarks */}
                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1.5 sm:mb-2">
                            Signature Landmarks & Heritage
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs text-neutral-200">
                            {dest.attractions.map((att, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className="text-brand-gold font-bold text-xs select-none">›</span>
                                <span>{att}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Best Season & Vehicles */}
                        <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-neutral-400">
                          <span><strong className="text-neutral-200">Best Time:</strong> {dest.bestTime}</span>
                          <span><strong className="text-neutral-200">Ideal Fleet:</strong> {dest.recommendedVehicle.split(',')[0]}</span>
                        </div>
                      </div>

                      {/* Direct Booking CTA */}
                      <div className="pt-3 sm:pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking({ destinationCity: dest.city });
                          }}
                          className="btn-gold px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-md group/btn w-full sm:w-auto"
                        >
                          <span>Plan Journey to {dest.city}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Alternate Standard Grid View: Neat, Simple & Elegant */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {destinations.map((dest) => (
                <div
                  key={dest.city}
                  className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group active:scale-[0.98]"
                >
                  <div className="shimmer-line"></div>

                  <div>
                    {/* Clean Image Container with Ken Burns Zoom */}
                    <div className="relative h-36 sm:h-52 w-full overflow-hidden bg-neutral-900">
                      <img
                        src={dest.image}
                        alt={dest.city}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Subtle Vignette Gradient for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none"></div>

                      {/* Category Tag Top Left */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#241815]/90 backdrop-blur-md text-brand-gold text-[8px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-brand-gold/30 shadow-sm">
                        {dest.tag}
                      </div>

                      {/* City Name Bottom Left */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-3 sm:left-3.5 sm:right-3.5 text-white">
                        <h3 className="text-base sm:text-xl font-extrabold font-heading text-white drop-shadow-md">
                          {dest.city}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] font-medium text-brand-gold">
                          {dest.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 sm:p-5 space-y-2 sm:space-y-3.5">
                      <p className="text-[11px] sm:text-xs text-neutral-600 leading-snug sm:leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Clean Landmark Chips */}
                      <div className="space-y-1 sm:space-y-1.5 pt-1 border-t border-neutral-100">
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          Key Highlights
                        </span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {dest.attractions.slice(0, 2).map((att, idx) => (
                            <span 
                              key={idx} 
                              className="text-[9px] sm:text-[11px] bg-neutral-100/90 text-neutral-700 px-1.5 sm:px-2.5 py-0.5 rounded-md border border-neutral-200/80"
                            >
                              {att.split('(')[0].trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Season & Fleet Summary */}
                      <div className="pt-1.5 sm:pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-neutral-500 gap-1.5 sm:gap-2">
                        <span>
                          <strong className="text-neutral-700 font-semibold">Season:</strong> {dest.bestTime}
                        </span>
                        <span>
                          <strong className="text-neutral-700 font-semibold">Fleet:</strong> {dest.recommendedVehicle.split(',')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean Bottom Booking CTA */}
                  <div className="p-3 sm:p-5 pt-0">
                    <button
                      onClick={() => onOpenBooking({ destinationCity: dest.city })}
                      className="w-full btn-gold py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-md transition-all group/btn"
                    >
                      <span>Plan {dest.city}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. Custom Route Callout - Modern Animated Route Pathway (No photo background) */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#241815] via-[#1c1210] to-[#2e1d18] border border-brand-gold/30 p-5 sm:p-12 overflow-hidden shadow-2xl group hover:border-brand-gold/60 transition-all duration-500">
            
            {/* 1. Ambient Golden Radial Glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-gold/15 rounded-full blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* 2. Animated SVG Golden Route Network Graphic in the background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 sm:opacity-45">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#AA771C" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                {/* Circuit Path 1 */}
                <path d="M 50,150 Q 250,50 500,160 T 950,140" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="2" />
                <path d="M 50,150 Q 250,50 500,160 T 950,140" fill="none" stroke="url(#routeGradient)" strokeWidth="2.5" strokeDasharray="12 16" className="animate-route-flow" />
                
                {/* Circuit Path 2 */}
                <path d="M 100,240 Q 400,280 650,180 T 980,80" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1.5" />
                <path d="M 100,240 Q 400,280 650,180 T 980,80" fill="none" stroke="url(#routeGradient)" strokeWidth="2" strokeDasharray="10 14" className="animate-route-flow" style={{ animationDuration: '3.5s' }} />

                {/* Clean Static Waypoint Nodes (Zero Blinking) */}
                <circle cx="250" cy="98" r="3.5" fill="#D4AF37" />
                <circle cx="500" cy="160" r="3.5" fill="#D4AF37" />
                <circle cx="780" cy="148" r="3.5" fill="#D4AF37" />
              </svg>
            </div>

            {/* 3. Top Shimmer Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-75"></div>

            {/* 4. Foreground Content */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              
              <div className="space-y-3.5 max-w-2xl">
                {/* Status Pill with Static Icon */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[11px] font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  <span>Custom Routes & Inter-District Charters</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white leading-tight">
                  Have Another Route in Mind?
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                  We operate across all 38 districts of Tamil Nadu, Pondicherry, and South India. Design your bespoke multi-city circuit with transparent fixed tariffs.
                </p>

                {/* Waypoint Route Highlights without colored dots */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-neutral-300">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                    Any Pickup Hub
                  </span>
                  <span className="text-brand-gold font-bold">→</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                    Custom Waypoints
                  </span>
                  <span className="text-brand-gold font-bold">→</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white">
                    Any Destination
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                <button
                  onClick={() => onOpenBooking()}
                  className="btn-gold px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-xl hover:shadow-brand-gold/30 group/btn"
                >
                  <span>Custom Route Enquiry</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>

                <a
                  href="tel:+919894116405"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-brand-gold/40 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>24/7 Travel Desk: +91 98941 16405</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
