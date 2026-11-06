import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Heart, 
  Mountain, 
  Compass, 
  Building, 
  Map, 
  Car, 
  Smile,
  Plane,
  Waves
} from 'lucide-react';

// Static imports of the 8 original gallery photos
import imgMeenakshi from '../assets/gallery/51714.png';
import imgAlagar from '../assets/gallery/51887.jpg.jpeg';
import imgThirumalai from '../assets/gallery/51893.jpg.jpeg';
import imgRameswaram from '../assets/gallery/51904.png';
import imgKodaikanal from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.12 PM.jpeg';
import imgOoty from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.14 PM.jpeg';
import imgKanyakumari from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.16 PM.jpeg';
import imgCustomers from '../assets/gallery/WhatsApp Image 2026-05-29 at 4.14.18 PM.jpeg';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Comprehensive 30+ item gallery with all 24 South India sightseeing spots + customer diaries
  const galleryItems = [
    // ─── Arupadai Murugan Temples ─────────────────────────────────────
    {
      id: 'murugan-1',
      title: 'Thiruparankundram Murugan Temple',
      location: 'Madurai',
      category: 'temple',
      image: '/images/destinations/thiruparankundram.jpg',
      desc: 'First divine abode of Lord Murugan carved into ancient monolithic rock, celebrating the divine wedding.'
    },
    {
      id: 'murugan-2',
      title: 'Tiruchendur Murugan Temple',
      location: 'Tuticorin Coast',
      category: 'temple',
      image: '/images/destinations/tiruchendur.jpg',
      desc: 'Second sacred abode situated majestically along the crashing turquoise waves of the Bay of Bengal.'
    },
    {
      id: 'murugan-3',
      title: 'Palani Dhandayuthapani Swamy',
      location: 'Dindigul',
      category: 'temple',
      image: '/images/destinations/palani.jpg',
      desc: 'Third sacred abode atop the Sivagiri hill, famous for sacred Panchamirtham and spiritual grace.'
    },
    {
      id: 'murugan-4',
      title: 'Swamimalai Murugan Temple',
      location: 'Kumbakonam',
      category: 'temple',
      image: '/images/destinations/swamimalai.jpg',
      desc: 'Fourth abode where Lord Murugan expounded the sacred Pranava Mantra Om to his father Lord Shiva.'
    },
    {
      id: 'murugan-5',
      title: 'Thiruthani Subramanya Swamy',
      location: 'Thiruvallur',
      category: 'temple',
      image: '/images/destinations/thiruthani.jpg',
      desc: 'Fifth sacred abode atop Tanikasalam hill approached by 365 steps representing days of the year.'
    },
    {
      id: 'murugan-6',
      title: 'Pazhamudircholai Murugan Temple',
      location: 'Alagar Hills, Madurai',
      category: 'temple',
      image: '/images/destinations/pazhamudircholai.jpg',
      desc: 'Sixth and final abode nestled amidst fragrant forest groves and natural springs in Solaimalai.'
    },

    // ─── Cauvery Delta & Chola Architecture ───────────────────────────
    {
      id: 'delta-1',
      title: 'Brihadeeswarar Big Temple',
      location: 'Thanjavur',
      category: 'heritage',
      image: '/images/destinations/thanjavur.jpg',
      desc: 'Thousand-year-old UNESCO monument featuring an 80-tonne monolithic granite Vimana dome.'
    },
    {
      id: 'delta-2',
      title: 'Kumbakonam Mahamaham & Navagraha',
      location: 'Kumbakonam',
      category: 'temple',
      image: '/images/destinations/kumbakonam.jpg',
      desc: 'The vibrant temple town hub for all 9 planetary Navagraha parihara sthalams and sacred tank.'
    },
    {
      id: 'delta-3',
      title: 'Kallanai Grand Anicut Dam',
      location: 'Trichy',
      category: 'heritage',
      image: '/images/destinations/trichy.jpg',
      desc: 'Built by King Karikala Chola in the 2nd century AD, one of the oldest working water-diversion dams in the world.'
    },

    // ─── Tamil Nadu Heritage Circuit ──────────────────────────────────
    {
      id: 'heritage-1',
      title: 'Meenakshi Amman Temple & 14 Gopurams',
      location: 'Madurai',
      category: 'heritage',
      image: '/images/destinations/madurai.jpg',
      desc: 'Iconic Dravidian marvel featuring thousands of vibrant stucco sculptures and sacred Lotus Tank.'
    },
    {
      id: 'heritage-2',
      title: 'Ramanathaswamy Temple & Pamban Bridge',
      location: 'Rameshwaram',
      category: 'temple',
      image: '/images/destinations/rameswaram.jpg',
      desc: 'Sacred coastal island Jyotirlinga shrine featuring the world’s longest sculpted sandstone corridor.'
    },
    {
      id: 'heritage-3',
      title: 'Vivekananda Rock & 3 Oceans Confluence',
      location: 'Kanyakumari',
      category: 'coastal',
      image: '/images/destinations/kanyakumari.jpg',
      desc: 'India’s southernmost tip where the Arabian Sea, Bay of Bengal, and Indian Ocean meet.'
    },

    // ─── Mountain & Hill Stations ─────────────────────────────────────
    {
      id: 'hill-1',
      title: 'Ooty Nilgiri Tea Hills',
      location: 'Ooty (2,240 m)',
      category: 'hills',
      image: '/images/destinations/ooty.jpg',
      desc: 'The Queen of Hill Stations with rolling botanical gardens, pine forests, and cool mountain breezes.'
    },
    {
      id: 'hill-2',
      title: 'Kodaikanal Lake & Pillar Rocks',
      location: 'Kodaikanal (2,133 m)',
      category: 'hills',
      image: '/images/destinations/kodaikanal.jpg',
      desc: 'The Princess of Hill Stations with star-shaped lake, misty viewpoints, and eucalyptus woods.'
    },
    {
      id: 'hill-3',
      title: 'Munnar Emerald Tea Valley',
      location: 'Munnar (1,600 m)',
      category: 'hills',
      image: '/images/destinations/munnar.jpg',
      desc: 'Sprawling carpet of lush green tea plantations, misty mountain peaks, and cool waterfalls.'
    },
    {
      id: 'hill-4',
      title: 'Wayanad Banasura Sagar Dam & Hills',
      location: 'Wayanad, Western Ghats',
      category: 'hills',
      image: '/images/destinations/wayanad.jpg',
      desc: 'Asia’s second-largest earthen dam nestled amidst pristine rainforest valleys and spice plantations.'
    },

    // ─── Coastal & Backwaters ─────────────────────────────────────────
    {
      id: 'coastal-1',
      title: 'Alappuzha (Alleppey) Deluxe Houseboats',
      location: 'Alleppey, Kerala',
      category: 'coastal',
      image: '/images/destinations/alleppey.jpg',
      desc: 'Tranquil palm-fringed backwater lagoons and luxury houseboats through the Venice of the East.'
    },
    {
      id: 'coastal-2',
      title: 'Kumarakom & Vembanad Lake',
      location: 'Kumarakom',
      category: 'coastal',
      image: '/images/destinations/kumarakom.jpg',
      desc: 'Serene mangrove waterways, migratory bird sanctuary, and tranquil backwater retreats.'
    },
    {
      id: 'coastal-3',
      title: 'Varkala Cliff & Arabian Sea Coast',
      location: 'Varkala',
      category: 'coastal',
      image: '/images/destinations/varkala.jpg',
      desc: 'Unique geological red laterite cliffs towering over the golden sands of Papanasam Beach.'
    },
    {
      id: 'coastal-4',
      title: 'Thiruvananthapuram & Padmanabhaswamy',
      location: 'Trivandrum',
      category: 'temple',
      image: '/images/destinations/trivandrum.jpg',
      desc: 'Historic Travancore royal capital home to the sacred Lord Anantha Padmanabhaswamy Temple.'
    },

    // ─── Airport & Corporate Hubs ─────────────────────────────────────
    {
      id: 'airport-1',
      title: 'Chennai International Airport (MAA)',
      location: 'Chennai Gateway',
      category: 'corporate',
      image: '/images/destinations/chennai-airport.jpg',
      desc: '24/7 dedicated door-to-terminal airport pickup, drop, and corporate delegations.'
    },
    {
      id: 'airport-2',
      title: 'Coimbatore Airport & Industrial Corridor',
      location: 'Coimbatore (CJB)',
      category: 'corporate',
      image: '/images/destinations/coimbatore-airport.jpg',
      desc: 'Fast express chauffeur transfers connecting Western Tamil Nadu industrial hubs.'
    },
    {
      id: 'airport-3',
      title: 'Tiruchirappalli International Airport (TRZ)',
      location: 'Trichy Airport',
      category: 'corporate',
      image: '/images/destinations/trichy-airport.jpg',
      desc: 'Primary international air travel connection for Thanjavur and the entire Cauvery Delta.'
    },
    {
      id: 'airport-4',
      title: 'Madurai Airport (IXM)',
      location: 'Madurai Airport',
      category: 'corporate',
      image: '/images/destinations/madurai-airport.jpg',
      desc: 'Convenient terminal connectivity for Southern Tamil Nadu business and temple visitors.'
    },

    // ─── Heritage Palaces & Historic Sights ───────────────────────────
    {
      id: 'heritage-4',
      title: 'Thirumalai Nayakkar Mahal',
      location: 'Madurai',
      category: 'heritage',
      image: imgThirumalai,
      desc: 'A magnificent 17th-century palace showcasing grand Indo-Saracenic columns and domes.'
    },
    {
      id: 'temple-alagar',
      title: 'Alagar Kovil Temple',
      location: 'Madurai',
      category: 'temple',
      image: imgAlagar,
      desc: 'A historic temple dedicated to Lord Vishnu, nestled at the foot of scenic Alagar Hills.'
    },

    // ─── Commercial Fleet ─────────────────────────────────────────────
    {
      id: 'fleet-innova',
      title: 'Toyota Innova Crysta Luxury Fleet',
      location: 'Commercial Fleet',
      category: 'vehicles',
      image: '/images/vehicles/innova.png',
      desc: 'The gold standard in corporate and family long-distance touring with captain seating.'
    },
    {
      id: 'fleet-urbania',
      title: 'Force Urbania Luxury Group Van',
      location: 'Executive Fleet',
      category: 'vehicles',
      image: '/images/vehicles/urbania.png',
      desc: 'European styling, panoramic windows, and armchairs for VIP delegations and big families.'
    },

    // ─── Customer Diaries ─────────────────────────────────────────────
    {
      id: 'customer-diaries',
      title: 'Happy Pilgrims & Tourists',
      location: 'Customer Diaries',
      category: 'customers',
      image: imgCustomers,
      desc: 'Creating golden memories and providing safe journeys for families and travelers worldwide.'
    }
  ];

  // Filtering logic
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Categories definition
  const filters = [
    { id: 'all', name: 'All Sightseeing', icon: <Image className="w-4 h-4" /> },
    { id: 'temple', name: 'Temples & Pilgrimage', icon: <Compass className="w-4 h-4" /> },
    { id: 'heritage', name: 'Chola & Heritage', icon: <Building className="w-4 h-4" /> },
    { id: 'hills', name: 'Hill Stations', icon: <Mountain className="w-4 h-4" /> },
    { id: 'coastal', name: 'Coastal & Backwaters', icon: <Waves className="w-4 h-4" /> },
    { id: 'corporate', name: 'Airports & Corporate', icon: <Plane className="w-4 h-4" /> },
    { id: 'vehicles', name: 'Our Fleet', icon: <Car className="w-4 h-4" /> },
    { id: 'customers', name: 'Customer Diaries', icon: <Smile className="w-4 h-4" /> }
  ];

  // Lightbox handlers
  const handleOpenLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 overflow-hidden select-none">
      {/* 1. HERO SECTION */}
      <div className="relative h-[48vh] lg:h-[56vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-palani-car.jpg" 
            alt="Nithamudayar Tours & Travels Pvt Ltd Sightseeing Gallery" 
            className="w-full h-full object-cover object-[position:75%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b203d]/90 via-[#1b203d]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b203d] to-transparent" />
          {/* Accent Glows */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6">
          <motion.p 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm text-brand-gold font-bold uppercase tracking-widest mb-1.5"
          >
            Nithamudayar Tours & Travels Pvt Ltd
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black text-white tracking-wide uppercase drop-shadow-md"
          >
            South India Sightseeing Gallery
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-brand-gold mx-auto my-3"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-base text-neutral-200 max-w-xl mx-auto font-light leading-relaxed"
          >
            Experience all 24 iconic pilgrimage temples, Chola UNESCO marvels, misty hill stations, and palm backwaters.
          </motion.p>
        </div>
      </div>

      {/* 2. GALLERY CONTROLS & GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-[#1b203d] text-[#FCF6BA] shadow-md scale-105 border border-brand-gold/30' 
                    : 'bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200 shadow-2xs'
                }`}
              >
                {filter.icon}
                <span>{filter.name}</span>
                {filter.id === 'all' && (
                  <span className="text-[11px] opacity-70">({galleryItems.length})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onClick={() => handleOpenLightbox(index)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col border border-neutral-200/90"
              >
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-[#FCF6BA] border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.location}
                    </span>
                  </div>

                  {/* View Icon Badge */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                      <Image className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Title overlay at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-base sm:text-lg font-bold font-heading text-white drop-shadow-md group-hover:text-brand-gold transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content description */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-brand-gold-dark">
                    <span>Click to view photo</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 mt-6">
            <Image className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-800">No photos found</h3>
            <p className="text-xs text-neutral-500 mt-1">Try selecting another sightseeing category.</p>
          </div>
        )}
      </div>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden sm:block cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden sm:block cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/50 shadow-2xl max-h-[75vh] flex items-center justify-center">
                <img 
                  src={filteredItems[selectedImageIndex]?.image} 
                  alt={filteredItems[selectedImageIndex]?.title} 
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption & Details */}
              <div className="w-full mt-4 text-center px-4">
                <div className="inline-block px-3 py-1 bg-brand-gold/20 text-[#FCF6BA] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-brand-gold/40">
                  {filteredItems[selectedImageIndex]?.location}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  {filteredItems[selectedImageIndex]?.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl mx-auto leading-relaxed">
                  {filteredItems[selectedImageIndex]?.desc}
                </p>
                <p className="text-[11px] text-neutral-400 mt-2 font-mono">
                  {selectedImageIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
