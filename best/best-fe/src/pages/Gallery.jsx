import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Car, 
  Users, 
  Compass, 
  LayoutGrid, 
  Columns3, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';

const PLACES_ITEMS = [
  {
    id: 'places-1',
    category: 'places',
    title: 'Alagar Kovil Temple Gopuram',
    location: 'Madurai Hills',
    badge: 'Ancient Temple',
    desc: 'Towering sculptured gopuram of Lord Vishnu Alagar Kovil temple nestled against holy green hills.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.13 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-2',
    category: 'places',
    title: 'Illuminated Temple Night Arch',
    location: 'Tamil Nadu',
    badge: 'Temple Festival',
    desc: 'Grand decorative festival archway illuminated with celebratory lighting at evening pooja.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.15 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-3',
    category: 'places',
    title: 'Pine Woods & Forest Trail',
    location: 'Kodaikanal',
    badge: 'Nature Trail',
    desc: 'Lush green pine woods and eucalyptus trees along scenic hill station nature trails.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM (2).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'places-4',
    category: 'places',
    title: 'Temple Courtyard & Mandapam',
    location: 'Pilgrimage Circuit',
    badge: 'Heritage Shrine',
    desc: 'Sacred stone mandapam and spacious courtyard leading to the inner sanctum.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.21 PM (1).jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-5',
    category: 'places',
    title: 'Ancient Stone Pillar Gopuram',
    location: 'Dravidian Heritage',
    badge: 'Stone Architecture',
    desc: 'Majestic centuries-old Dravidian granite pillars and carved temple gopuram tower.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.21 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-6',
    category: 'places',
    title: 'Misty Western Ghats Hills',
    location: 'Kodaikanal / Vagamon',
    badge: 'Hill Station',
    desc: 'Endless rolling misty ridges and velvet green mountains along the cool mountain pass.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.25 PM (1).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'places-7',
    category: 'places',
    title: 'Rolling Green Mountain Ridge',
    location: 'Misty Valley',
    badge: 'Panoramic View',
    desc: 'Serene mountain slopes with soft drifting clouds and fresh mountain breezes.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.25 PM.jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'places-8',
    category: 'places',
    title: 'Sacred Pilgrimage Temple',
    location: 'Tamil Nadu',
    badge: 'Holy Darshan',
    desc: 'Auspicious temple complex where devotees gather for sacred blessings and darshan.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.26 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-9',
    category: 'places',
    title: 'Om Muruga Sacred Shrine',
    location: 'Murugan Circuit',
    badge: 'Divine Blessing',
    desc: 'Vibrant illuminated Om Muruga sacred altar radiating divine spiritual devotion.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.27 PM (1).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'places-10',
    category: 'places',
    title: 'Towering Lord Murugan Statue',
    location: 'Arupadai Veedu',
    badge: 'Iconic Landmark',
    desc: 'Magnificent monumental statue of Lord Murugan holding his divine golden Vel.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.27 PM (2).jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-11',
    category: 'places',
    title: 'Golden Temple Dwajasthambam',
    location: 'Tamil Nadu Temple',
    badge: 'Sacred Flagstaff',
    desc: 'Gleaming golden flag mast standing tall within the consecrated temple sanctum.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.27 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'places-12',
    category: 'places',
    title: 'Grand Historic Gopuram Tower',
    location: 'South India',
    badge: 'Chola Architecture',
    desc: 'Soaring stone multi-tier gopuram showcasing living Tamil temple architecture.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM (2).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-13',
    category: 'places',
    title: 'Eco Heritage Resort Courtyard',
    location: 'Kerala / Tamil Nadu',
    badge: 'Scenic Stay',
    desc: 'Traditional heritage cottages and palm gardens for relaxing outstation halts.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.30 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-14',
    category: 'places',
    title: 'Traditional Temple Street',
    location: 'Pilgrim Town',
    badge: 'Local Heritage',
    desc: 'Charming village street leading directly to the sacred temple gopuram.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.31 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-15',
    category: 'places',
    title: 'Adiyogi Shiva Monument',
    location: 'Coimbatore',
    badge: 'Spiritual Wonder',
    desc: 'The world-famous 112-foot consecrated bust of Adiyogi Shiva at the foothills of Velliangiri.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.32 PM (2).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-16',
    category: 'places',
    title: 'Heritage Bazaar Walkway',
    location: 'Temple Street',
    badge: 'Culture & Shopping',
    desc: 'Vibrant heritage market stalls selling traditional handicrafts, garlands, and sacred souvenirs.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.32 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-17',
    category: 'places',
    title: 'Adiyogi Consecrated Vista',
    location: 'Isha Foundation',
    badge: 'Guinness Record',
    desc: 'Sweeping vista of Adiyogi Shiva set against the dramatic Western Ghats mountain backdrop.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.33 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-18',
    category: 'places',
    title: 'Hill Forest Welcome Gateway',
    location: 'Mountain Pass',
    badge: 'Eco Tourism',
    desc: 'Rustic wooden entrance gate marking the start of hill station forest reserves.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.34 PM.jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'places-19',
    category: 'places',
    title: 'Scenic Mountain Highway',
    location: 'Western Ghats',
    badge: 'Road Trip',
    desc: 'Smooth ghat road cutting through misty forests with thrilling hairpin bends.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.35 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-20',
    category: 'places',
    title: 'Historic Stone Gateway',
    location: 'Heritage Fort',
    badge: 'Ancient Gate',
    desc: 'Arched stone portal reflecting ancient royal architecture and scenic vistas.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.36 PM (1).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-21',
    category: 'places',
    title: 'Rural Countryside Drive',
    location: 'Tamil Nadu Roads',
    badge: 'Village Tour',
    desc: 'Peaceful rural road flanked by green paddy fields, coconut palms, and blue skies.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.36 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-22',
    category: 'places',
    title: 'Illuminated Dam at Sunset',
    location: 'Grand Anicut / Dam',
    badge: 'Evening View',
    desc: 'Spectacular water dam illuminated with colorful tricolor lights at twilight.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.37 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'places-23',
    category: 'places',
    title: 'Green Canopy Tree Gateway',
    location: 'Forest Highway',
    badge: 'Nature Drive',
    desc: 'Shaded highway framed by majestic arching banyan and neem trees.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.37 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-24',
    category: 'places',
    title: 'Mountain Lake Vista',
    location: 'Hill Station Lake',
    badge: 'Cool Waters',
    desc: 'Tranquil hill station lake waters reflecting blue skies and forested mountains.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM (1).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-25',
    category: 'places',
    title: 'Royal Palace Illuminated Gateway',
    location: 'Heritage Palace',
    badge: 'Night Splendor',
    desc: 'Breathtaking royal palace gates glowing in brilliant golden nighttime lights.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM (2).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'places-26',
    category: 'places',
    title: 'Breezy Tree-Lined Highway',
    location: 'Outstation Route',
    badge: 'Highway Travel',
    desc: 'Scenic expressway for smooth, fast, and safe outstation journeys across South India.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'places-27',
    category: 'places',
    title: 'Kerala Backwaters & Houseboat',
    location: 'Alappuzha',
    badge: 'Backwater Escape',
    desc: 'Serene palm-fringed backwaters and luxury traditional houseboats.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'places-28',
    category: 'places',
    title: 'Forest Canopy Eco Resort',
    location: 'Thekkady / Periyar',
    badge: 'Nature Resort',
    desc: 'Boutique eco cottages set amidst lush cardamom plantations and serene Western Ghats greenery.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.37 PM.jpeg',
    aspect: 'aspect-[16/9]'
  }
];

const CLIENTS_ITEMS = [
  {
    id: 'clients-1',
    category: 'clients',
    title: 'Happy Family at Heritage Monument',
    location: 'Heritage Tour',
    badge: 'Family Vacation',
    desc: 'Cherished family holiday moments captured with our courteous chauffeur at historic temples.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.15 PM (1).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'clients-2',
    category: 'clients',
    title: 'Chauffeur with Cheerful Travelers',
    location: 'Pilgrimage Circuit',
    badge: 'Happy Client',
    desc: 'Warm smiles from happy clients enjoying comfortable doorstep outstation service.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.16 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-3',
    category: 'clients',
    title: 'Travelers Dining Moment',
    location: 'Authentic Restaurant',
    badge: 'Food & Travel',
    desc: 'Our travel guests enjoying traditional South Indian culinary delicacies on the tour.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.17 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-4',
    category: 'clients',
    title: 'Family Pilgrims at Temple',
    location: 'Temple Circuit',
    badge: 'Devotional Tour',
    desc: 'Peaceful devotional pilgrimage moments with family across renowned Tamil Nadu shrines.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.18 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-5',
    category: 'clients',
    title: 'Guests with Chauffeur at Hotel',
    location: 'Hotel Halt',
    badge: 'Doorstep Pickup',
    desc: 'Satisfied travelers arriving safely at their luxury hotel after a smooth day journey.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM (1).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'clients-6',
    category: 'clients',
    title: 'Family Group at Monument Entrance',
    location: 'Thanjavur / Madurai',
    badge: 'Group Tour',
    desc: 'Memorable group photo of travelers admiring the rich cultural architecture.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-7',
    category: 'clients',
    title: 'Young Explorers on Mountain Peak',
    location: 'Western Ghats Summit',
    badge: 'Adventure Trip',
    desc: 'Excited group of friends taking in sweeping valley views from high hill peaks.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.22 PM.jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'clients-8',
    category: 'clients',
    title: 'Tourists at Natural Waterfall Cave',
    location: 'Waterfall Trek',
    badge: 'Nature Excursion',
    desc: 'Cooling off and making unforgettable memories at gushing forest waterfalls.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.23 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-9',
    category: 'clients',
    title: 'Travelers on Mountain Viewpoint',
    location: 'Hill Station Safari',
    badge: 'Scenic Safari',
    desc: 'Guests soaking in panoramic vistas with our well-maintained hill safari vehicle.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.24 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-10',
    category: 'clients',
    title: 'Dedicated Chauffeur on Duty',
    location: 'On the Road',
    badge: 'Expert Driver',
    desc: 'Our polite, background-verified professional chauffeur ensuring a safe, punctual drive.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.34 PM (1).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'clients-11',
    category: 'clients',
    title: 'Munnar Hills Tour Diaries',
    location: 'Munnar Kerala',
    badge: 'Customer Review',
    desc: 'Client testimonial snapshot from a memorable luxury vacation tour to Munnar hills.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.26 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-12',
    category: 'clients',
    title: 'Munnar Queen of Hills Travelers',
    location: 'Munnar Tea Valleys',
    badge: 'Group Holiday',
    desc: 'Happy travelers exploring the rolling tea carpet valleys of Munnar.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.27 PM.jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'clients-13',
    category: 'clients',
    title: 'Pilgrims with Chauffeur & Cab',
    location: 'Pilgrim Site',
    badge: 'Divine Trip',
    desc: 'Smiling pilgrimage clients posing with their chauffeur and clean commercial sedan.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM (2).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'clients-14',
    category: 'clients',
    title: 'Blessed Pilgrims after Darshan',
    location: 'Temple Town',
    badge: 'Darshan Memory',
    desc: 'Devotees celebrating divine darshan with peaceful minds and happy hearts.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.48 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'clients-15',
    category: 'clients',
    title: 'Munnar Dream Vacation Memories',
    location: 'Tea Gardens',
    badge: 'Custom Package',
    desc: 'Unforgettable vacation diaries across emerald tea estates with personalized itineraries.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.49 PM (1).jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'clients-16',
    category: 'clients',
    title: 'Misty Mountain View with Guests',
    location: 'Hill Station',
    badge: 'Misty Vacation',
    desc: 'Refreshing mountain escape with lovely guests amidst cool Nilgiri hill breezes.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.49 PM.jpeg',
    aspect: 'aspect-[9/16]'
  }
];

const CARS_ITEMS = [
  {
    id: 'cars-1',
    category: 'cars',
    title: 'Toyota Innova Crysta on Coastal Bridge',
    location: 'Pamban / Sea Link',
    badge: 'Premium SUV (7+1)',
    desc: 'Spacious Toyota Innova Crysta parked on the scenic sea bridge during an outstation trip.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.15 PM (2).jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'cars-2',
    category: 'cars',
    title: 'Commercial Swift Dzire with Chauffeur',
    location: 'Doorstep Dispatch',
    badge: 'Sedan (4+1)',
    desc: 'Neatly uniformed driver alongside a pristine white Swift Dzire ready for outstation pickup.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM (1).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'cars-3',
    category: 'cars',
    title: 'Toyota Innova Crysta Outstation Express',
    location: 'Highway Expressway',
    badge: 'Executive SUV',
    desc: 'Luxury Innova Crysta cruising comfortably on express highways for long-distance journeys.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM.jpeg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 'cars-4',
    category: 'cars',
    title: 'Touring Fleet & Sightseeing Plaza',
    location: 'Sightseeing Base',
    badge: 'Fleet Transit',
    desc: 'Our commercial fleet parked at the tour assembly plaza ready for city and temple tours.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.32 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'cars-5',
    category: 'cars',
    title: 'White Sedan Parked on Beach Sands',
    location: 'Coastal Destination',
    badge: 'Comfort Sedan',
    desc: 'Clean, air-conditioned commercial sedan resting by the breezy coastline.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.27 PM (1).jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'cars-6',
    category: 'cars',
    title: 'Commercial Sedan Fleet by the Sea',
    location: 'Beach Tour',
    badge: 'AC Sedan',
    desc: 'Side-profile of our spotless white Dzire commercial sedan along sunny golden sands.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.28 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'cars-7',
    category: 'cars',
    title: 'Polished Commercial Cab Beach View',
    location: 'Coastal Highway',
    badge: 'Clean & Sanitized',
    desc: 'Rear three-quarter view showing impeccable paint and well-maintained commercial yellow-board taxi.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.28 PM.jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'cars-8',
    category: 'cars',
    title: 'Dzire Sedan Front Grille & Foglamps',
    location: 'Fleet Base',
    badge: '24/7 Ready',
    desc: 'Front look showcasing pristine headlights, chrome accents, and clean commercial registration.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM.jpeg',
    aspect: 'aspect-[9/16]'
  },
  {
    id: 'cars-9',
    category: 'cars',
    title: 'Swift Dzire at Heritage Resort Porch',
    location: 'Luxury Hotel Entry',
    badge: 'VIP Chauffeur',
    desc: 'Pristine white commercial cab parked under the majestic portico of a 5-star heritage resort.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.31 PM.jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'cars-10',
    category: 'cars',
    title: 'Sedan Fleet in Resort Driveway',
    location: 'Holiday Resort',
    badge: 'Outstation Tour',
    desc: 'Executive sedan awaiting guests at private holiday resort gardens.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.32 PM.jpeg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'cars-11',
    category: 'cars',
    title: 'Swift Dzire on Mountain Viewpoint',
    location: 'Hill Station Pass',
    badge: 'Hill Drive Specialist',
    desc: 'High-ground clearance sedan conquering ghat roads and scenic viewpoints with ease.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.48 PM.jpeg',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'cars-12',
    category: 'cars',
    title: 'Commercial Sedan at Forest Canopy Resort',
    location: 'Thekkady / Periyar',
    badge: 'Night Dispatch',
    desc: 'Spotless Swift Dzire tourist taxi with yellow commercial registration parked at luxury wildlife resort.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.37 PM (1).jpeg',
    aspect: 'aspect-[16/9]'
  }
];

const ALL_ITEMS = [...PLACES_ITEMS, ...CLIENTS_ITEMS, ...CARS_ITEMS];

export default function Gallery() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'places' | 'clients' | 'cars'
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'collage'
  const [selectedItem, setSelectedItem] = useState(null);

  const currentPool = activeTab === 'all' 
    ? ALL_ITEMS 
    : activeTab === 'places' 
      ? PLACES_ITEMS 
      : activeTab === 'clients' 
        ? CLIENTS_ITEMS 
        : CARS_ITEMS;

  const currentIndex = selectedItem ? currentPool.findIndex(i => i.id === selectedItem.id) : -1;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedItem(currentPool[currentIndex - 1]);
    } else {
      setSelectedItem(currentPool[currentPool.length - 1]);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < currentPool.length - 1) {
      setSelectedItem(currentPool[currentIndex + 1]);
    } else {
      setSelectedItem(currentPool[0]);
    }
  };

  const handleWhatsAppBooking = (item) => {
    const text = `Hello Nithamudayar Tours & Travels,
I am inquiring about booking a trip related to this photo:
📍 ${item.title} (${item.location})
Category: ${item.category.toUpperCase()}

Please share vehicle options and tariff package details.`;
    window.open(`https://wa.me/919894116405?text=${encodeURIComponent(text)}`, '_blank');
  };

  const renderCard = (item) => (
    <div
      key={item.id}
      onClick={() => setSelectedItem(item)}
      className="group relative overflow-hidden rounded-2xl bg-[#0B1138] border border-white/10 shadow-lg hover:shadow-2xl hover:border-brand-gold/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div className={`relative w-full ${layoutMode === 'collage' ? item.aspect : 'aspect-[4/3]'} overflow-hidden bg-neutral-900`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1138] via-transparent to-black/20 opacity-80 group-hover:opacity-95 transition-opacity" />

        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#10194E]/90 text-brand-gold border border-brand-gold/40 shadow-sm backdrop-blur-sm">
            {item.badge}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Eye className="w-4 h-4 text-brand-gold" />
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#10194E]/80 to-[#0B1138]">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-brand-gold font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold font-heading text-white line-clamp-1 group-hover:text-brand-gold transition-colors">
            {item.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-300 line-clamp-2 mt-1 leading-snug">
            {item.desc}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-brand-gold">
          <span className="uppercase tracking-wider text-[10px] text-white/70">Click to View</span>
          <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#FCF6BA]">
            Enquire <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative pt-24 pb-14 bg-[#10194E] text-white overflow-hidden border-b border-neutral-200">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1138]/90 via-[#10194E] to-[#10194E] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B1138] border border-brand-gold/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-xs font-bold tracking-widest text-[#FCF6BA] uppercase">
              Real Travel Memoirs & Commercial Fleet
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight drop-shadow-md">
            <span>Visual Photo </span>
            <span className="text-[#E8C148]">Gallery</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed drop-shadow">
            Explore authentic photographs from our journeys across Tamil Nadu & Kerala — categorized into iconic destinations, happy travelers, and our spotless commercial taxi fleet.
          </p>

          {/* Tab Filter Navigation */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-brand-gold text-neutral-950 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              All Photos ({ALL_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveTab('places')}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-brand-gold text-neutral-950 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Compass className="w-4 h-4" />
              1. Places ({PLACES_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-brand-gold text-neutral-950 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Users className="w-4 h-4" />
              2. Clients ({CLIENTS_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'cars'
                  ? 'bg-brand-gold text-neutral-950 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Car className="w-4 h-4" />
              3. Cars ({CARS_ITEMS.length})
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. CONTROLS BAR ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-3 flex items-center justify-between">
          <div className="text-xs sm:text-sm font-semibold text-neutral-700">
            Showing <span className="text-[#10194E] font-bold">{currentPool.length} photos</span> in{' '}
            <span className="text-brand-gold font-bold uppercase">
              {activeTab === 'all' ? 'All Sections' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
            <button
              onClick={() => setLayoutMode('grid')}
              title="Uniform Grid View"
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                layoutMode === 'grid'
                  ? 'bg-white text-[#10194E] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setLayoutMode('collage')}
              title="Masonry / Collage View"
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                layoutMode === 'collage'
                  ? 'bg-white text-[#10194E] shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span className="hidden sm:inline">Collage</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. MAIN GALLERY BODY ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-12 space-y-12">

        {/* Section 1: Places */}
        {(activeTab === 'all' || activeTab === 'places') && (
          <section id="places-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-brand-gold/30 pb-3">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Section 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-[#10194E]">
                  Places & Sacred Destinations ({PLACES_ITEMS.length})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Temples, hill viewpoints, water dams, coastal drives & monuments
              </p>
            </div>

            <div className={
              layoutMode === 'collage'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            }>
              {PLACES_ITEMS.map(renderCard)}
            </div>
          </section>
        )}

        {/* Section 2: Clients */}
        {(activeTab === 'all' || activeTab === 'clients') && (
          <section id="clients-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-brand-gold/30 pb-3">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Section 2</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-[#10194E]">
                  Clients & Traveler Diaries ({CLIENTS_ITEMS.length})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Smiling families, pilgrim groups, waterfalls, Munnar holidays & chauffeur moments
              </p>
            </div>

            <div className={
              layoutMode === 'collage'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            }>
              {CLIENTS_ITEMS.map(renderCard)}
            </div>
          </section>
        )}

        {/* Section 3: Cars */}
        {(activeTab === 'all' || activeTab === 'cars') && (
          <section id="cars-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-brand-gold/30 pb-3">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  <Car className="w-3.5 h-3.5" />
                  <span>Section 3</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-heading text-[#10194E]">
                  Cars & Commercial Fleet ({CARS_ITEMS.length})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-0">
                Pristine Swift Dzire sedans, Toyota Innova Crysta SUVs & resort porch arrivals
              </p>
            </div>

            <div className={
              layoutMode === 'collage'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            }>
              {CARS_ITEMS.map(renderCard)}
            </div>
          </section>
        )}

      </div>

      {/* ─── 4. LIGHTBOX MODAL ─────────────────────────────────────────── */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between text-white z-10 max-w-5xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-gold text-neutral-950">
                {selectedItem.badge}
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300">
                {selectedItem.location}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-semibold">
                {currentIndex + 1} of {currentPool.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo with Prev / Next */}
          <div 
            className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="max-h-[72vh] sm:max-h-[76vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Card with WhatsApp Booking */}
          <div 
            className="bg-[#10194E]/95 border border-brand-gold/40 rounded-2xl p-3.5 sm:p-5 max-w-3xl mx-auto w-full z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-bold font-heading text-white">
                {selectedItem.title}
              </h4>
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {selectedItem.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleWhatsAppBooking(selectedItem)}
              className="btn-gold px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all text-neutral-950"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Cab for This Photo</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
