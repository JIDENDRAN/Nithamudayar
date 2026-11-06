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
  Waves,
  LayoutGrid,
  Columns3,
  Eye,
  Sparkles
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
  const [collageLayout, setCollageLayout] = useState('collage'); // 'collage' | 'grid'

  // Comprehensive 30+ item gallery with varied aspect ratios for an authentic photo collage
  const galleryItems = [
    // ─── Arupadai Murugan Temples ─────────────────────────────────────
    {
      id: 'murugan-1',
      title: 'Thiruparankundram Murugan Temple',
      location: 'Madurai',
      category: 'temple',
      image: '/images/destinations/thiruparankundram.jpg',
      aspect: 'aspect-[3/4]', // Tall rock cave temple
      badge: '1st Sacred Abode',
      desc: 'First divine abode of Lord Murugan carved into ancient monolithic rock, celebrating the divine wedding.'
    },
    {
      id: 'murugan-2',
      title: 'Tiruchendur Murugan Temple',
      location: 'Tuticorin Coast',
      category: 'temple',
      image: '/images/destinations/tiruchendur.jpg',
      aspect: 'aspect-[4/5]', // Tall seaside gopuram
      badge: '2nd Sacred Abode',
      desc: 'Second sacred abode situated majestically along the crashing turquoise waves of the Bay of Bengal.'
    },
    {
      id: 'murugan-3',
      title: 'Palani Dhandayuthapani Swamy',
      location: 'Dindigul',
      category: 'temple',
      image: '/images/destinations/palani.jpg',
      aspect: 'aspect-[16/10]', // Wide panoramic hill temple
      badge: '3rd Sacred Abode',
      desc: 'Third sacred abode atop the Sivagiri hill, famous for sacred Panchamirtham and spiritual grace.'
    },
    {
      id: 'murugan-4',
      title: 'Swamimalai Murugan Temple',
      location: 'Kumbakonam',
      category: 'temple',
      image: '/images/destinations/swamimalai.jpg',
      aspect: 'aspect-[4/3]',
      badge: '4th Sacred Abode',
      desc: 'Fourth abode where Lord Murugan expounded the sacred Pranava Mantra Om to his father Lord Shiva.'
    },
    {
      id: 'murugan-5',
      title: 'Thiruthani Subramanya Swamy',
      location: 'Thiruvallur',
      category: 'temple',
      image: '/images/destinations/thiruthani.jpg',
      aspect: 'aspect-[3/4]', // 365 steps hill
      badge: '5th Sacred Abode',
      desc: 'Fifth sacred abode atop Tanikasalam hill approached by 365 steps representing days of the year.'
    },
    {
      id: 'murugan-6',
      title: 'Pazhamudircholai Murugan Temple',
      location: 'Alagar Hills, Madurai',
      category: 'temple',
      image: '/images/destinations/pazhamudircholai.jpg',
      aspect: 'aspect-[4/3]',
      badge: '6th Sacred Abode',
      desc: 'Sixth and final abode nestled amidst fragrant forest groves and natural springs in Solaimalai.'
    },

    // ─── Cauvery Delta & Chola Architecture ───────────────────────────
    {
      id: 'delta-1',
      title: 'Brihadeeswarar Big Temple',
      location: 'Thanjavur',
      category: 'heritage',
      image: '/images/destinations/thanjavur.jpg',
      aspect: 'aspect-[4/5]', // Towering Vimana
      badge: 'UNESCO Chola Monument',
      desc: 'Thousand-year-old UNESCO monument featuring an 80-tonne monolithic granite Vimana dome.'
    },
    {
      id: 'delta-2',
      title: 'Kumbakonam Mahamaham & Navagraha',
      location: 'Kumbakonam',
      category: 'temple',
      image: '/images/destinations/kumbakonam.jpg',
      aspect: 'aspect-[16/10]', // Wide sacred tank
      badge: 'Temple Capital',
      desc: 'The vibrant temple town hub for all 9 planetary Navagraha parihara sthalams and sacred tank.'
    },
    {
      id: 'delta-3',
      title: 'Kallanai Grand Anicut Dam',
      location: 'Trichy',
      category: 'heritage',
      image: '/images/destinations/trichy.jpg',
      aspect: 'aspect-[16/9]', // Sweeping dam panorama
      badge: '2nd Century AD Marvel',
      desc: 'Built by King Karikala Chola in the 2nd century AD, one of the oldest working water-diversion dams in the world.'
    },

    // ─── Tamil Nadu Heritage Circuit ──────────────────────────────────
    {
      id: 'heritage-1',
      title: 'Meenakshi Amman Temple',
      location: 'Madurai',
      category: 'heritage',
      image: '/images/destinations/madurai.jpg',
      aspect: 'aspect-[3/4]', // Soaring 14 Gopurams
      badge: 'Dravidian Architecture',
      desc: 'Iconic Dravidian marvel featuring thousands of vibrant stucco sculptures and sacred Lotus Tank.'
    },
    {
      id: 'heritage-2',
      title: 'Ramanathaswamy Temple & Pamban Bridge',
      location: 'Rameshwaram',
      category: 'temple',
      image: '/images/destinations/rameswaram.jpg',
      aspect: 'aspect-[16/10]', // Wide sea bridge
      badge: 'Sacred Island Sea',
      desc: 'Sacred coastal island Jyotirlinga shrine featuring the world’s longest sculpted sandstone corridor.'
    },
    {
      id: 'heritage-3',
      title: 'Vivekananda Rock Memorial',
      location: 'Kanyakumari',
      category: 'coastal',
      image: '/images/destinations/kanyakumari.jpg',
      aspect: 'aspect-[4/3]',
      badge: '3 Oceans Confluence',
      desc: 'India’s southernmost tip where the Arabian Sea, Bay of Bengal, and Indian Ocean meet.'
    },

    // ─── Mountain & Hill Stations ─────────────────────────────────────
    {
      id: 'hill-1',
      title: 'Ooty Nilgiri Tea Hills',
      location: 'Ooty (2,240 m)',
      category: 'hills',
      image: '/images/destinations/ooty.jpg',
      aspect: 'aspect-[16/10]', // Rolling tea mountains
      badge: 'Queen of Hill Stations',
      desc: 'The Queen of Hill Stations with rolling botanical gardens, pine forests, and cool mountain breezes.'
    },
    {
      id: 'hill-2',
      title: 'Kodaikanal Lake & Pillar Rocks',
      location: 'Kodaikanal (2,133 m)',
      category: 'hills',
      image: '/images/destinations/kodaikanal.jpg',
      aspect: 'aspect-[3/4]', // Towering pillar rocks
      badge: 'Princess of Hill Stations',
      desc: 'The Princess of Hill Stations with star-shaped lake, misty viewpoints, and eucalyptus woods.'
    },
    {
      id: 'hill-3',
      title: 'Munnar Emerald Tea Valleys',
      location: 'Munnar (1,600 m)',
      category: 'hills',
      image: '/images/destinations/munnar.jpg',
      aspect: 'aspect-[16/9]', // Wide green valley
      badge: 'Western Ghats Paradise',
      desc: 'Sprawling carpet of lush green tea plantations, misty mountain peaks, and cool waterfalls.'
    },
    {
      id: 'hill-4',
      title: 'Wayanad Banasura Sagar Dam',
      location: 'Wayanad, Western Ghats',
      category: 'hills',
      image: '/images/destinations/wayanad.jpg',
      aspect: 'aspect-[4/3]',
      badge: 'Rainforest Hills',
      desc: 'Asia’s second-largest earthen dam nestled amidst pristine rainforest valleys and spice plantations.'
    },

    // ─── Coastal & Backwaters ─────────────────────────────────────────
    {
      id: 'coastal-1',
      title: 'Alappuzha Deluxe Houseboats',
      location: 'Alleppey, Kerala',
      category: 'coastal',
      image: '/images/destinations/alleppey.jpg',
      aspect: 'aspect-[16/10]', // Houseboat cruising
      badge: 'Venice of the East',
      desc: 'Tranquil palm-fringed backwater lagoons and luxury houseboats through the Venice of the East.'
    },
    {
      id: 'coastal-2',
      title: 'Kumarakom & Vembanad Lake',
      location: 'Kumarakom',
      category: 'coastal',
      image: '/images/destinations/kumarakom.jpg',
      aspect: 'aspect-[4/3]',
      badge: 'Serene Lagoons',
      desc: 'Serene mangrove waterways, migratory bird sanctuary, and tranquil backwater retreats.'
    },
    {
      id: 'coastal-3',
      title: 'Varkala Red Geo-Cliffs',
      location: 'Varkala',
      category: 'coastal',
      image: '/images/destinations/varkala.jpg',
      aspect: 'aspect-[3/4]', // High cliffs
      badge: 'Arabian Sea Cliffs',
      desc: 'Unique geological red laterite cliffs towering over the golden sands of Papanasam Beach.'
    },
    {
      id: 'coastal-4',
      title: 'Thiruvananthapuram Padmanabhaswamy',
      location: 'Trivandrum',
      category: 'temple',
      image: '/images/destinations/trivandrum.jpg',
      aspect: 'aspect-[4/5]',
      badge: 'Travancore Royal Sthalam',
      desc: 'Historic Travancore royal capital home to the sacred Lord Anantha Padmanabhaswamy Temple.'
    },

    // ─── Airport & Corporate Hubs ─────────────────────────────────────
    {
      id: 'airport-1',
      title: 'Chennai International Airport (MAA)',
      location: 'Chennai Terminal',
      category: 'corporate',
      image: '/images/destinations/chennai-airport.jpg',
      aspect: 'aspect-[16/10]',
      badge: '24/7 Airport Cab',
      desc: '24/7 dedicated door-to-terminal airport pickup, drop, and corporate delegations.'
    },
    {
      id: 'airport-2',
      title: 'Coimbatore Airport & Industrial Hub',
      location: 'Coimbatore (CJB)',
      category: 'corporate',
      image: '/images/destinations/coimbatore-airport.jpg',
      aspect: 'aspect-[4/3]',
      badge: 'Western TN Gateway',
      desc: 'Fast express chauffeur transfers connecting Western Tamil Nadu industrial hubs.'
    },
    {
      id: 'airport-3',
      title: 'Trichy International Airport (TRZ)',
      location: 'Trichy Airport',
      category: 'corporate',
      image: '/images/destinations/trichy-airport.jpg',
      aspect: 'aspect-[16/10]',
      badge: 'Cauvery Delta Gateway',
      desc: 'Primary international air travel connection for Thanjavur and the entire Cauvery Delta.'
    },
    {
      id: 'airport-4',
      title: 'Madurai Airport Terminal (IXM)',
      location: 'Madurai Airport',
      category: 'corporate',
      image: '/images/destinations/madurai-airport.jpg',
      aspect: 'aspect-[4/3]',
      badge: 'South TN Terminal',
      desc: 'Convenient terminal connectivity for Southern Tamil Nadu business and temple visitors.'
    },

    // ─── Historic Palaces & Landmarks ─────────────────────────────────
    {
      id: 'heritage-4',
      title: 'Thirumalai Nayakkar Mahal',
      location: 'Madurai',
      category: 'heritage',
      image: imgThirumalai,
      aspect: 'aspect-[4/3]',
      badge: '17th-Century Palace',
      desc: 'A magnificent 17th-century palace showcasing grand Indo-Saracenic columns and domes.'
    },
    {
      id: 'temple-alagar',
      title: 'Alagar Kovil Vishnu Temple',
      location: 'Madurai',
      category: 'temple',
      image: imgAlagar,
      aspect: 'aspect-[3/4]',
      badge: 'Foot of Alagar Hills',
      desc: 'A historic temple dedicated to Lord Vishnu, nestled at the foot of scenic Alagar Hills.'
    },

    // ─── Commercial Fleet ─────────────────────────────────────────────
    {
      id: 'fleet-innova',
      title: 'Toyota Innova Crysta Luxury Fleet',
      location: 'Commercial Fleet',
      category: 'vehicles',
      image: '/images/vehicles/innova.png',
      aspect: 'aspect-[16/10]',
      badge: 'Captain Reclining Seats',
      desc: 'The gold standard in corporate and family long-distance touring with captain seating.'
    },
    {
      id: 'fleet-urbania',
      title: 'Force Urbania Luxury Van',
      location: 'Executive Fleet',
      category: 'vehicles',
      image: '/images/vehicles/urbania.png',
      aspect: 'aspect-[16/10]',
      badge: '12 / 17 Seater Executive',
      desc: 'European styling, panoramic windows, and armchairs for VIP delegations and big families.'
    },

    // ─── Customer Diaries ─────────────────────────────────────────────
    {
      id: 'customer-diaries',
      title: 'Happy Pilgrims & Tourists',
      location: 'Customer Diaries',
      category: 'customers',
      image: imgCustomers,
      aspect: 'aspect-[4/3]',
      badge: 'Verified Travel Diaries',
      desc: 'Creating golden memories and providing safe journeys for families and travelers worldwide.'
    }
  ];

  // Filtering logic
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Categories definition
  const filters = [
    { id: 'all', name: 'All Photos', icon: <Image className="w-4 h-4" /> },
    { id: 'temple', name: 'Temples & Murugan Abodes', icon: <Compass className="w-4 h-4" /> },
    { id: 'heritage', name: 'Chola & Living Heritage', icon: <Building className="w-4 h-4" /> },
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
    <div className="bg-[#FAF8F5] min-h-screen pb-20 select-none">
      
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <div className="relative h-[48vh] lg:h-[56vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-palani-car.jpg" 
            alt="Nithamudayar Tours & Travels Pvt Ltd Photo Collage Gallery" 
            className="w-full h-full object-cover object-[position:75%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b203d]/90 via-[#1b203d]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b203d] to-transparent" />
          {/* Accent Glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-[#FCF6BA] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Memories & Destinations Collage</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white tracking-wide uppercase drop-shadow-md">
            South India Sightseeing Collage
          </h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-base text-neutral-200 max-w-2xl mx-auto font-light leading-relaxed">
            An authentic photographic collection covering all 24 sacred temple abodes, Chola UNESCO marvels, misty tea valleys, and palm backwaters.
          </p>
        </div>
      </div>

      {/* ─── 2. COLLAGE CONTROLS & PHOTO WALL ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Controls Bar: Category Pills + Collage/Grid Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-300 pb-6 mb-8">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 scroll-smooth flex-nowrap sm:flex-wrap">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-[#1b203d] text-[#FCF6BA] shadow-md scale-[1.02] border border-brand-gold/40' 
                      : 'bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/90'
                  }`}
                >
                  {filter.icon}
                  <span>{filter.name}</span>
                  {filter.id === 'all' && (
                    <span className="text-[10px] opacity-70">({galleryItems.length})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Layout Mode Pill */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-neutral-200/90 shadow-2xs shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setCollageLayout('collage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                collageLayout === 'collage'
                  ? 'bg-[#1b203d] text-[#FCF6BA] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Collage Wall</span>
            </button>
            <button
              type="button"
              onClick={() => setCollageLayout('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                collageLayout === 'grid'
                  ? 'bg-[#1b203d] text-[#FCF6BA] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>

        </div>

        {/* ─── 3. PHOTO COLLAGE WALL (Masonry / Asymmetrical Snapshot Layout) ─── */}
        {collageLayout === 'collage' ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 [column-fill:_balance]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="break-inside-avoid mb-4 sm:mb-6 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                {/* Photo with natural varied aspect ratio */}
                <div className={`relative w-full overflow-hidden bg-neutral-900 ${item.aspect || 'aspect-[4/3]'}`}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  
                  {/* Subtle artistic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 opacity-80 group-hover:opacity-65 transition-opacity" />

                  {/* Top Collage Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-[#FCF6BA] border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {item.badge || item.location}
                    </span>

                    <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 inset-x-3 z-10 text-white">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-0.5">
                      {item.location}
                    </span>
                    <h3 className="text-base sm:text-lg font-black font-heading text-white drop-shadow-md group-hover:text-[#FCF6BA] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-200 line-clamp-2 mt-1 leading-snug opacity-90">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Alternate Standard Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col border border-neutral-200/90"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-[#FCF6BA] border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.location}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="text-base font-bold font-heading text-white drop-shadow-md group-hover:text-brand-gold transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-brand-gold-dark">
                    <span>View photo</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 mt-6">
            <Image className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-800">No photos found in this category</h3>
            <p className="text-xs text-neutral-500 mt-1">Try selecting another sightseeing category from the filters above.</p>
          </div>
        )}

      </div>

      {/* ─── 4. FULL-SCREEN LIGHTBOX MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
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
              <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl max-h-[75vh] flex items-center justify-center">
                <img 
                  src={filteredItems[selectedImageIndex]?.image} 
                  alt={filteredItems[selectedImageIndex]?.title} 
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption & Details */}
              <div className="w-full mt-4 text-center px-4">
                <div className="inline-block px-3 py-1 bg-brand-gold/20 text-[#FCF6BA] rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-brand-gold/40">
                  {filteredItems[selectedImageIndex]?.location} • {filteredItems[selectedImageIndex]?.badge || 'Sightseeing'}
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
