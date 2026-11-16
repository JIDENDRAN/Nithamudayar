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
  Eye,
  CheckCircle2,
  ShieldCheck
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
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-2',
    category: 'places',
    title: 'Illuminated Temple Night Arch',
    location: 'Tamil Nadu',
    badge: 'Temple Festival',
    desc: 'Grand decorative festival archway illuminated with celebratory lighting at evening pooja.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.15 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-3',
    category: 'places',
    title: 'Pine Woods & Forest Trail',
    location: 'Kodaikanal',
    badge: 'Nature Trail',
    desc: 'Lush green pine woods and eucalyptus trees along scenic hill station nature trails.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM (2).jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-4',
    category: 'places',
    title: 'Temple Courtyard & Mandapam',
    location: 'Pilgrimage Circuit',
    badge: 'Heritage Shrine',
    desc: 'Sacred stone mandapam and spacious courtyard leading to the inner sanctum.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.21 PM (1).jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-5',
    category: 'places',
    title: 'Ancient Stone Pillar Gopuram',
    location: 'Dravidian Heritage',
    badge: 'Stone Architecture',
    desc: 'Majestic centuries-old Dravidian granite pillars and carved temple gopuram tower.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.21 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-6',
    category: 'places',
    title: 'Rolling Green Mountain Ridge',
    location: 'Misty Valley',
    badge: 'Panoramic View',
    desc: 'Serene mountain slopes with soft drifting clouds and fresh mountain breezes.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.25 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-7',
    category: 'places',
    title: 'Sacred Pilgrimage Temple',
    location: 'Tamil Nadu',
    badge: 'Holy Darshan',
    desc: 'Auspicious temple complex where devotees gather for sacred blessings and darshan.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.26 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-8',
    category: 'places',
    title: 'Towering Lord Murugan Statue',
    location: 'Arupadai Veedu',
    badge: 'Iconic Landmark',
    desc: 'Magnificent monumental statue of Lord Murugan holding his divine golden Vel.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.27 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-9',
    category: 'places',
    title: 'Golden Temple Dwajasthambam',
    location: 'Tamil Nadu Temple',
    badge: 'Sacred Flagstaff',
    desc: 'Gleaming golden flag mast standing tall within the consecrated temple sanctum.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.27 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-10',
    category: 'places',
    title: 'Grand Historic Gopuram Tower',
    location: 'South India',
    badge: 'Chola Architecture',
    desc: 'Soaring stone multi-tier gopuram showcasing living Tamil temple architecture.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM (2).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-11',
    category: 'places',
    title: 'Eco Heritage Resort Courtyard',
    location: 'Kerala / Tamil Nadu',
    badge: 'Scenic Stay',
    desc: 'Traditional heritage cottages and palm gardens for relaxing outstation halts.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.30 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-12',
    category: 'places',
    title: 'Traditional Temple Street',
    location: 'Pilgrim Town',
    badge: 'Local Heritage',
    desc: 'Charming village street leading directly to the sacred temple gopuram.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.31 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-13',
    category: 'places',
    title: 'Adiyogi Shiva Monument',
    location: 'Coimbatore',
    badge: 'Spiritual Wonder',
    desc: 'The world-famous 112-foot consecrated bust of Adiyogi Shiva at the foothills of Velliangiri.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.32 PM (2).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-14',
    category: 'places',
    title: 'Hill Forest Welcome Gateway',
    location: 'Mountain Pass',
    badge: 'Eco Tourism',
    desc: 'Rustic wooden entrance gate marking the start of hill station forest reserves.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.34 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-15',
    category: 'places',
    title: 'Scenic Mountain Highway',
    location: 'Western Ghats',
    badge: 'Road Trip',
    desc: 'Smooth ghat road cutting through misty forests with thrilling hairpin bends.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.35 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-16',
    category: 'places',
    title: 'Historic Stone Gateway',
    location: 'Heritage Fort',
    badge: 'Ancient Gate',
    desc: 'Arched stone portal reflecting ancient royal architecture and scenic vistas.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.36 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-17',
    category: 'places',
    title: 'Rural Countryside Drive',
    location: 'Tamil Nadu Roads',
    badge: 'Village Tour',
    desc: 'Peaceful rural road flanked by green paddy fields, coconut palms, and blue skies.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.36 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-18',
    category: 'places',
    title: 'Illuminated Dam at Sunset',
    location: 'Grand Anicut / Dam',
    badge: 'Evening View',
    desc: 'Spectacular water dam illuminated with colorful tricolor lights at twilight.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.37 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-19',
    category: 'places',
    title: 'Mountain Lake Vista',
    location: 'Hill Station Lake',
    badge: 'Cool Waters',
    desc: 'Tranquil hill station lake waters reflecting blue skies and forested mountains.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-20',
    category: 'places',
    title: 'Royal Palace Illuminated Gateway',
    location: 'Heritage Palace',
    badge: 'Night Splendor',
    desc: 'Breathtaking royal palace gates glowing in brilliant golden nighttime lights.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-21',
    category: 'places',
    title: 'Breezy Tree-Lined Highway',
    location: 'Outstation Route',
    badge: 'Highway Travel',
    desc: 'Scenic expressway for smooth, fast, and safe outstation journeys across South India.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.38 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-22',
    category: 'places',
    title: 'Kerala Backwaters & Houseboat',
    location: 'Alappuzha',
    badge: 'Backwater Escape',
    desc: 'Serene palm-fringed backwaters and luxury traditional houseboats.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-23',
    category: 'places',
    title: 'Forest Canopy Eco Resort',
    location: 'Thekkady / Periyar',
    badge: 'Nature Resort',
    desc: 'Boutique eco cottages set amidst lush cardamom plantations and serene Western Ghats greenery.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.37 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-24',
    category: 'places',
    title: 'Illuminated Temple Rajagopuram',
    location: 'Tamil Nadu Pilgrimage',
    badge: 'Temple Darshan',
    desc: 'Majestic illuminated temple entrance gopuram glowing vibrantly during sacred evening pooja.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.36 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-25',
    category: 'places',
    title: 'Palani Hill Temple Foothills',
    location: 'Pilgrim Foothills',
    badge: 'Sacred Foothills',
    desc: 'Scenic bustling temple street framed by sacred green hillsides and towering Dravidian gopurams.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.36 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-26',
    category: 'places',
    title: 'Heritage Resort Wooden Grand Courtyard',
    location: 'Kerala Architecture',
    badge: 'Resort Stay',
    desc: 'Opulent teakwood pillars, brass lamps, and crystal chandelier in traditional heritage retreat.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.43 PM (2).jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'places-27',
    category: 'places',
    title: 'Heritage Street & Resort Walkway',
    location: 'Temple Town',
    badge: 'Scenic Walkway',
    desc: 'Serene cobblestone path and traditional tiled roofs in a scenic heritage destination.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.49 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-28',
    category: 'places',
    title: 'Panoramic Sunny Beach & Coastal Shore',
    location: 'Kovalam / Varkala',
    badge: 'Beach Vista',
    desc: 'Sweeping view of golden coastline, fishing boats, and gentle rolling waves under sunny skies.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.49 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-29',
    category: 'places',
    title: 'Majestic Lord Shiva Statue with Trishul',
    location: 'Pilgrimage Landmark',
    badge: 'Spiritual Landmark',
    desc: 'Towering stone statue of Lord Shiva with sacred Trishul overlooking visiting devotees.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.50 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-30',
    category: 'places',
    title: 'Illuminated Suspension Bridge at Night',
    location: 'Engineering Marvel',
    badge: 'Night Landmark',
    desc: 'Dazzling nighttime vista of multi-colored LED illuminated bridge towers and steel spans.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.14 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-31',
    category: 'places',
    title: 'Rolling Hill Ridge & Viewpoint',
    location: 'Nilgiris / Vagamon',
    badge: 'Scenic Summit',
    desc: 'Panoramic emerald hill ridge crowded with cheerful tourists admiring valley vistas.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.27 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-32',
    category: 'places',
    title: 'Glass Bridge Skywalk Experience',
    location: 'Wayanad / Vagamon',
    badge: 'Adventure Skywalk',
    desc: 'Thrill-seeking tourists walking along the transparent glass skywalk overlooking valleys.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.27 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-33',
    category: 'places',
    title: 'Mysore Palace Illuminated Grand Vista',
    location: 'Mysuru Royal Heritage',
    badge: 'Royal Palace',
    desc: 'Magnificent frontal night view of Mysore Palace illuminated with nearly 100,000 golden incandescent bulbs.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.28 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-34',
    category: 'places',
    title: 'Mysore Palace Durbar Night Illumination',
    location: 'Heritage Splendor',
    badge: 'Palace Architecture',
    desc: 'Stunning angle of the royal palace façade shimmering against the clear night sky.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.28 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-35',
    category: 'places',
    title: 'Illuminated Royal Palace Panorama',
    location: 'Heritage Tourism',
    badge: 'Architectural Wonder',
    desc: 'Splendid panoramic perspective of the historic palace lit up in radiant golden lights.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.28 PM (3).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-36',
    category: 'places',
    title: 'Golden Gopuram Temple Sanctuary',
    location: 'Chamundi Hills / Mysuru',
    badge: 'Sacred Gopuram',
    desc: 'Intricately carved golden-toned gopuram tower under vibrant afternoon skies.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.28 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-37',
    category: 'places',
    title: 'Ancient Deepasthambam Stone Lamp Pillar',
    location: 'Heritage Temple',
    badge: 'Sacred Heritage',
    desc: 'Historic multistorey stone lamp tower standing solemnly in the consecrated temple courtyard.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.30 PM (2).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-38',
    category: 'places',
    title: 'Kerala Folklore Museum Thevara Kochi',
    location: 'Kochi Heritage',
    badge: 'Cultural Heritage',
    desc: 'Signage and entrance of the renowned Kerala Folklore Museum celebrating authentic art and folklore.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.31 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-39',
    category: 'places',
    title: 'Amber Dale Luxury Resort Munnar',
    location: 'Munnar Tea Hills',
    badge: 'Luxury Resort',
    desc: 'Lush green entrance gate to Amber Dale resort nestled amidst Munnar rolling tea mist.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.32 PM (2).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-40',
    category: 'places',
    title: 'Landscaped Resort Driveway & Flower Gardens',
    location: 'Hill Station Retreat',
    badge: 'Resort Scenery',
    desc: 'Picturesque winding driveway flanked by flowering shrubbery and quaint hill station cottages.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.35 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-41',
    category: 'places',
    title: 'Sterling Ooty Fern Hill Resort',
    location: 'Ooty Fern Hill',
    badge: 'Hill Resort',
    desc: 'Signage of the iconic Sterling Fern Hill resort surrounded by pine trees and cool Nilgiri air.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.36 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-42',
    category: 'places',
    title: 'Gem Park Ooty Night Panorama',
    location: 'Ooty Hill Station',
    badge: 'Night Illuminations',
    desc: 'Vibrant illuminated night façade and neon crest of Gem Park luxury hotel in Ooty.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.36 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-43',
    category: 'places',
    title: 'Panoramic View of Ooty Valley Town',
    location: 'Ooty Nilgiris',
    badge: 'Valley Panorama',
    desc: 'Spectacular overview of colorful hillside houses and rolling mountains in the Nilgiris.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.36 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'places-44',
    category: 'places',
    title: 'St. Philomena Cathedral Gothic Architecture',
    location: 'Mysuru Heritage',
    badge: 'Heritage Cathedral',
    desc: 'Towering twin Gothic spires and ornate facade of historic St. Philomena Cathedral.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.38 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'places-45',
    category: 'places',
    title: 'Sacred Hill Temple Pilgrimage Steps',
    location: 'Hilltop Shrine',
    badge: 'Pilgrim Steps',
    desc: 'Stone steps ascending towards the holy hilltop shrine amidst lush hillside vegetation.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.38 PM (2).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'places-46',
    category: 'places',
    title: 'Historic Stone Temple Gopuram & Sanctum',
    location: 'Tamil Nadu Pilgrimage',
    badge: 'Temple Circuit',
    desc: 'Spacious stone-paved temple courtyard leading to the majestic sculpted gopuram.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.38 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
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
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-2',
    category: 'clients',
    title: 'Chauffeur with Cheerful Travelers',
    location: 'Pilgrimage Circuit',
    badge: 'Happy Client',
    desc: 'Warm smiles from happy clients enjoying comfortable doorstep outstation service.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.16 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-3',
    category: 'clients',
    title: 'Travelers Dining Moment',
    location: 'Authentic Restaurant',
    badge: 'Food & Travel',
    desc: 'Our travel guests enjoying traditional South Indian culinary delicacies on the tour.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.17 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-4',
    category: 'clients',
    title: 'Family Pilgrims at Temple',
    location: 'Temple Circuit',
    badge: 'Devotional Tour',
    desc: 'Peaceful devotional pilgrimage moments with family across renowned Tamil Nadu shrines.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.18 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-5',
    category: 'clients',
    title: 'Guests with Chauffeur at Hotel',
    location: 'Hotel Halt',
    badge: 'Doorstep Pickup',
    desc: 'Satisfied travelers arriving safely at their luxury hotel after a smooth day journey.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM (1).jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-6',
    category: 'clients',
    title: 'Family Group at Monument Entrance',
    location: 'Thanjavur / Madurai',
    badge: 'Group Tour',
    desc: 'Memorable group photo of travelers admiring the rich cultural architecture.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.19 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-7',
    category: 'clients',
    title: 'Young Explorers on Mountain Peak',
    location: 'Western Ghats Summit',
    badge: 'Adventure Trip',
    desc: 'Excited group of friends taking in sweeping valley views from high hill peaks.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.22 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-8',
    category: 'clients',
    title: 'Tourists at Natural Waterfall Cave',
    location: 'Waterfall Trek',
    badge: 'Nature Excursion',
    desc: 'Cooling off and making unforgettable memories at gushing forest waterfalls.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.23 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-9',
    category: 'clients',
    title: 'Travelers on Mountain Viewpoint',
    location: 'Hill Station Safari',
    badge: 'Scenic Safari',
    desc: 'Guests soaking in panoramic vistas with our well-maintained hill safari vehicle.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.24 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-10',
    category: 'clients',
    title: 'Dedicated Chauffeur on Duty',
    location: 'On the Road',
    badge: 'Expert Driver',
    desc: 'Our polite, background-verified professional chauffeur ensuring a safe, punctual drive.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.34 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-11',
    category: 'clients',
    title: 'Munnar Hills Tour Diaries',
    location: 'Munnar Kerala',
    badge: 'Customer Review',
    desc: 'Client testimonial snapshot from a memorable luxury vacation tour to Munnar hills.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.26 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-12',
    category: 'clients',
    title: 'Munnar Queen of Hills Travelers',
    location: 'Munnar Tea Valleys',
    badge: 'Group Holiday',
    desc: 'Happy travelers exploring the rolling tea carpet valleys of Munnar.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.27 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-13',
    category: 'clients',
    title: 'Pilgrims with Chauffeur & Cab',
    location: 'Pilgrim Site',
    badge: 'Divine Trip',
    desc: 'Smiling pilgrimage clients posing with their professional chauffeur and premium sedan.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-14',
    category: 'clients',
    title: 'Misty Mountain View with Guests',
    location: 'Hill Station',
    badge: 'Misty Vacation',
    desc: 'Refreshing mountain escape with lovely guests amidst cool Nilgiri hill breezes.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.49 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-15',
    category: 'clients',
    title: 'Traveler Couple Coastal Excursion',
    location: 'Dhanushkodi Coast',
    badge: 'Couple Tour',
    desc: 'Happy couple enjoying sea breezes along the scenic coastal drive with our courteous chauffeur.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.35 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-16',
    category: 'clients',
    title: 'Pune Client Testimonial Letter',
    location: 'Guest Review (Pune)',
    badge: 'Verified Review',
    desc: 'Heartfelt handwritten recommendation from Pune travelers praising safe driving, helpful guidance, and warm hospitality.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.36 PM (2).jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-17',
    category: 'clients',
    title: 'Guest at Mountain Summit Viewpoint',
    location: 'Western Ghats',
    badge: 'Scenic Escape',
    desc: 'Travel guest taking in panoramic drifting mist and refreshing mountain breezes at the hill station summit.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.39 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-18',
    category: 'clients',
    title: 'Chauffeur & Guest at Temple Gateway',
    location: 'Temple Darshan',
    badge: 'Happy Client',
    desc: 'Friendly chauffeur posing with satisfied client outside the sacred temple complex after pooja.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.40 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-19',
    category: 'clients',
    title: 'Family Pilgrimage at Historic Gopuram',
    location: 'Tamil Nadu Temple',
    badge: 'Family Tour',
    desc: 'Family travelers and smiling chauffeur sharing a blessed moment outside the grand temple gopuram.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.40 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-20',
    category: 'clients',
    title: 'Family Arrival at Trichy International Airport',
    location: 'Trichy Airport',
    badge: 'Airport Pickup',
    desc: 'Punctual airport pickup reception for family arriving at Trichy International Airport terminal.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.41 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-21',
    category: 'clients',
    title: 'Family Group Holiday at Hill Resort',
    location: 'Ooty / Kodaikanal',
    badge: 'Group Tour',
    desc: 'Delighted large family holiday group posing together outside their hill cottage stay with our Innova Crysta.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.41 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-22',
    category: 'clients',
    title: 'Happy Travelers with Chauffeur at Hotel',
    location: 'Doorstep Travel',
    badge: 'Family Holiday',
    desc: 'Warm farewell selfie with travelers at luxury hotel portico before city transfer.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.41 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-23',
    category: 'clients',
    title: 'Chauffeur with Vacationing Couple',
    location: 'Outstation Holiday',
    badge: 'Happy Travelers',
    desc: 'Couple travelers sharing a warm photo with our polite, courteous chauffeur during outstation tour.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.42 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-24',
    category: 'clients',
    title: 'Devotees with Sacred Tilak after Darshan',
    location: 'Temple Circuit',
    badge: 'Pilgrim Smiles',
    desc: 'Peaceful devotees with sacred tilak enjoying a blessed temple tour journey across Tamil Nadu shrines.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.42 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'clients-25',
    category: 'clients',
    title: 'Family Travelers Darshan Day',
    location: 'Madurai / Rameswaram',
    badge: 'Family Pilgrimage',
    desc: 'Courteous chauffeur with happy family clients on a sacred temple pilgrimage itinerary.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.43 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-26',
    category: 'clients',
    title: 'Pilgrim Family at Temple Complex',
    location: 'Spiritual Journey',
    badge: 'Temple Visit',
    desc: 'Devoted family members walking in traditional attire within spacious temple grounds.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.49 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-27',
    category: 'clients',
    title: 'Holiday Travelers at Festive Promenade',
    location: 'City Tour',
    badge: 'Holiday Cheer',
    desc: 'Guests enjoying city sightseeing and festive seasonal decorations during evening tour.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.50 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-28',
    category: 'clients',
    title: 'Pilgrim Group in Traditional Veshti',
    location: 'Sacred Yatra',
    badge: 'Devotee Group',
    desc: 'Devotees in pristine traditional veshti posing next to Toyota Innova cab after pooja.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.50 PM (2).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-29',
    category: 'clients',
    title: 'Winter Hill Holiday with Chauffeur',
    location: 'Ooty / Kodaikanal',
    badge: 'Misty Hills',
    desc: 'Guests bundled in winter beanies enjoying chilly mountain mist with our driver.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.14 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-30',
    category: 'clients',
    title: 'Traveler Couple at Historic Monument',
    location: 'Kanyakumari / Heritage',
    badge: 'Sightseeing',
    desc: 'Happy travelers posing by grand stone monument under bright sunny coastal skies.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.27 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-31',
    category: 'clients',
    title: 'Chauffeur with Family on Sightseeing Halt',
    location: 'Holiday Road Trip',
    badge: 'Family Memory',
    desc: 'Cheerful family selfie with our courteous chauffeur during a scenic outstation halt.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.29 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-32',
    category: 'clients',
    title: 'Travelers Exploring Pine Forest Grove',
    location: 'Kodaikanal / Ooty',
    badge: 'Forest Excursion',
    desc: 'Travel guests enjoying peaceful walks amidst towering pine trees with our chauffeur.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.29 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-33',
    category: 'clients',
    title: 'Travelers on Scenic River Boating Safari',
    location: 'Kerala Waters / Periyar',
    badge: 'Boating Adventure',
    desc: 'Excited travelers wearing safety jackets enjoying a breezy speedboat tour across calm backwaters.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.31 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-34',
    category: 'clients',
    title: 'Friends Road Trip with Chauffeur',
    location: 'Outstation Holiday',
    badge: 'Travel Pals',
    desc: 'Friendly road trip moments with guests standing beside their outstation tour vehicle.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.32 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-35',
    category: 'clients',
    title: 'Solo Traveler in Scenic Valley Meadow',
    location: 'Tamil Nadu Countryside',
    badge: 'Relaxed Tour',
    desc: 'Travel guest pausing for a relaxing breath of fresh air in rural mountain fields.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.32 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-36',
    category: 'clients',
    title: 'Family Vacationers at Mountain Resort',
    location: 'Ooty / Kodaikanal',
    badge: 'Family Leisure',
    desc: 'Happy family with smiling children enjoying manicured lawns and fresh hill station air.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.33 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'clients-37',
    category: 'clients',
    title: 'Family Sightseeing with Friendly Chauffeur',
    location: 'Sightseeing Tour',
    badge: 'Customer Satisfaction',
    desc: 'Travelers enjoying personalized sightseeing guided by our experienced local chauffeur.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.33 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'clients-38',
    category: 'clients',
    title: 'Guest at Heritage Hill Cottage',
    location: 'Nilgiri Bungalow',
    badge: 'Hill Retreat',
    desc: 'Traveler relaxing outside charming white colonial cottage surrounded by mountain flowers.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.35 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'clients-39',
    category: 'clients',
    title: 'Chauffeur with Pilgrim Group',
    location: 'Temple Circuit',
    badge: 'Pilgrim Friends',
    desc: 'Courteous chauffeur sharing a cheerful moment with traveling devotees at temple grounds.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.39 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
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
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'cars-2',
    category: 'cars',
    title: 'Swift Dzire with Chauffeur',
    location: 'Doorstep Dispatch',
    badge: 'Sedan (4+1)',
    desc: 'Neatly uniformed driver alongside a pristine white Swift Dzire ready for outstation pickup.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-3',
    category: 'cars',
    title: 'Toyota Innova Crysta Outstation Express',
    location: 'Highway Expressway',
    badge: 'Executive SUV',
    desc: 'Luxury Innova Crysta cruising comfortably on express highways for long-distance journeys.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.29 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-4',
    category: 'cars',
    title: 'Touring Fleet & Sightseeing Plaza',
    location: 'Sightseeing Base',
    badge: 'Fleet Transit',
    desc: 'Our luxury fleet parked at the tour assembly plaza ready for city and temple tours.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 10.41.32 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-5',
    category: 'cars',
    title: 'White Sedan Parked on Beach Sands',
    location: 'Coastal Destination',
    badge: 'Comfort Sedan',
    desc: 'Clean, air-conditioned sedan resting by the breezy coastline.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.27 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-6',
    category: 'cars',
    title: 'Pristine Swift Dzire Beach View',
    location: 'Coastal Highway',
    badge: 'Clean & Sanitized',
    desc: 'Rear three-quarter view showing impeccable white paint and well-maintained touring cab.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.28 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-7',
    category: 'cars',
    title: 'Dzire Sedan Front Grille & Foglamps',
    location: 'Fleet Base',
    badge: '24/7 Ready',
    desc: 'Front look showcasing pristine headlights, chrome accents, and spotless bumper detailing.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.30 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-8',
    category: 'cars',
    title: 'Swift Dzire at Heritage Resort Porch',
    location: 'Luxury Hotel Entry',
    badge: 'VIP Chauffeur',
    desc: 'Pristine white executive cab parked under the majestic portico of a 5-star heritage resort.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.31 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'cars-9',
    category: 'cars',
    title: 'Sedan Fleet in Resort Driveway',
    location: 'Holiday Resort',
    badge: 'Outstation Tour',
    desc: 'Executive sedan awaiting guests at private holiday resort gardens.',
    image: '/gallery/WhatsApp Image 2026-10-23 at 9.33.32 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-10',
    category: 'cars',
    title: 'Swift Dzire on Mountain Viewpoint',
    location: 'Hill Station Pass',
    badge: 'Hill Drive Specialist',
    desc: 'High-ground clearance sedan conquering ghat roads and scenic viewpoints with ease.',
    image: '/gallery/WhatsApp Image 2026-11-11 at 1.21.48 PM.jpeg',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'cars-11',
    category: 'cars',
    title: 'Swift Dzire at Forest Canopy Resort',
    location: 'Thekkady / Periyar',
    badge: 'Night Dispatch',
    desc: 'Spotless Swift Dzire tourist cab parked comfortably at a luxury forest and wildlife resort.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.37 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-12',
    category: 'cars',
    title: 'White Swift Dzire on Highway Flyover',
    location: 'Express Highway',
    badge: 'Sedan (4+1)',
    desc: 'Spotless Swift Dzire parked along the highway corridor for comfortable outstation transit.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.38 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-13',
    category: 'cars',
    title: 'Swift Dzire Sedan in Coconut Palms',
    location: 'Tamil Nadu Countryside',
    badge: 'Sedan Fleet',
    desc: 'Well-maintained air-conditioned Swift Dzire parked gracefully under lush coconut groves.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.43 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-14',
    category: 'cars',
    title: 'Swift Dzire Coastal Drive',
    location: 'Dhanushkodi / Sea Coast',
    badge: 'Coastal Fleet',
    desc: 'Pristine Swift Dzire sedan resting along breathtaking turquoise coastal waters.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.48 PM (1).jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  },
  {
    id: 'cars-15',
    category: 'cars',
    title: 'Executive Cab at Temple Festival Plaza',
    location: 'Pilgrim Hub',
    badge: 'On-Time Dispatch',
    desc: 'Comfortable air-conditioned cab staged conveniently at temple entrance for passenger pickup.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.39.48 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2'
  },
  {
    id: 'cars-16',
    category: 'cars',
    title: 'Swift Dzire Sedan with Chauffeur',
    location: 'Hotel Portico Dispatch',
    badge: 'Executive Sedan',
    desc: 'Spotless white touring sedan with professional chauffeur outside hotel.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.30 PM (1).jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-17',
    category: 'cars',
    title: 'Chauffeur with Touring Sedan in Hill Pass',
    location: 'Western Ghats',
    badge: 'Hill Station Fleet',
    desc: 'Reliable high-comfort touring vehicle ready for mountain ascents and hill stations.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.30 PM.jpeg',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'cars-18',
    category: 'cars',
    title: 'Toyota Innova Crysta with Travelers & Driver',
    location: 'Premium Outstation',
    badge: 'Innova Crysta (7+1)',
    desc: 'Spacious Toyota Innova Crysta SUV parked at hotel entrance ready for outstation highway tour.',
    image: '/gallery/WhatsApp Image 2026-11-12 at 11.48.37 PM.jpeg',
    span: 'col-span-1 sm:col-span-2 row-span-1'
  }
];

const ALL_ITEMS = [...PLACES_ITEMS, ...CLIENTS_ITEMS, ...CARS_ITEMS];

export default function GalleryPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'places' | 'clients' | 'cars'
  const [viewMode, setViewMode] = useState('collage'); // 'collage' (varied sizes) | 'grid' (uniform)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [activeItemsList, setActiveItemsList] = useState(ALL_ITEMS);
  const [failedImages, setFailedImages] = useState(new Set());

  // Filter out any image that fails to load
  const isImageValid = (item) => !failedImages.has(item.id);

  const validPlaces = PLACES_ITEMS.filter(isImageValid);
  const validClients = CLIENTS_ITEMS.filter(isImageValid);
  const validCars = CARS_ITEMS.filter(isImageValid);
  const validAll = ALL_ITEMS.filter(isImageValid);

  const handleImageError = (id) => {
    setFailedImages((prev) => new Set(prev).add(id));
  };

  const handleOpenLightbox = (item, list) => {
    const validList = list.filter(isImageValid);
    const idx = validList.findIndex((i) => i.id === item.id);
    setActiveItemsList(validList);
    setSelectedItemIndex(idx !== -1 ? idx : 0);
  };

  const selectedItem = selectedItemIndex !== null && activeItemsList[selectedItemIndex] 
    ? activeItemsList[selectedItemIndex] 
    : null;

  const handleWhatsAppBooking = (item) => {
    const message = `Hello Nithamudayar Tours & Travels Pvt Ltd,
I saw this photo in your Gallery:
📸 *${item.title}*
📍 *Location / Context:* ${item.location}
🏷️ *Category:* ${item.category.toUpperCase()}

I would like to enquire about a tour package / taxi service for this. Please share details!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919894116405?text=${encoded}`, '_blank');
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (selectedItemIndex !== null && activeItemsList.length > 0) {
      setSelectedItemIndex((selectedItemIndex + 1) % activeItemsList.length);
    }
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (selectedItemIndex !== null && activeItemsList.length > 0) {
      setSelectedItemIndex((selectedItemIndex - 1 + activeItemsList.length) % activeItemsList.length);
    }
  };

  // Render individual card for varied-size collage
  const renderCollageCard = (item, list) => {
    const isHero = item.span.includes('row-span-2') && item.span.includes('col-span-2');
    const isTall = item.span.includes('row-span-2') && !item.span.includes('col-span-2');
    const isWide = item.span.includes('col-span-2') && !item.span.includes('row-span-2');

    return (
      <div
        key={item.id}
        onClick={() => handleOpenLightbox(item, list)}
        className={`${item.span} group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-gold/30 shadow-lg hover:shadow-2xl hover:border-brand-gold/90 transition-all duration-500 cursor-pointer bg-[#10194E] flex flex-col justify-end min-h-[220px] sm:min-h-[260px] md:min-h-[290px]`}
      >
        {/* Full Cover Image */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={() => handleImageError(item.id)}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1138] via-[#10194E]/60 to-black/20 opacity-90 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#10194E]/90 text-brand-gold border border-brand-gold/40 shadow-md backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            {item.badge}
          </span>

          <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            <Eye className="w-4 h-4 text-brand-gold" />
          </span>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-10 p-3.5 sm:p-5 flex flex-col justify-end text-white">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#FCF6BA] font-semibold mb-1 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <h3 className={`font-bold font-heading text-white line-clamp-1 group-hover:text-brand-gold transition-colors drop-shadow ${
            isHero ? 'text-base sm:text-xl lg:text-2xl' : isWide ? 'text-sm sm:text-lg' : 'text-xs sm:text-base'
          }`}>
            {item.title}
          </h3>

          <p className={`text-neutral-200 mt-1 leading-snug drop-shadow text-xs sm:text-sm ${
            isHero ? 'line-clamp-3' : isTall ? 'line-clamp-3' : 'line-clamp-2'
          }`}>
            {item.desc}
          </p>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-brand-gold">
            <span className="uppercase tracking-wider text-[10px] text-neutral-300 font-medium">Click to Enlarge</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-[#FCF6BA]">
              Enquire Cab <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render individual card for uniform grid
  const renderGridCard = (item, list) => (
    <div
      key={item.id}
      onClick={() => handleOpenLightbox(item, list)}
      className="group relative bg-[#10194E] rounded-2xl overflow-hidden border border-brand-gold/30 shadow-md hover:shadow-2xl hover:border-brand-gold/80 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden bg-neutral-900 h-56 sm:h-64">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={() => handleImageError(item.id)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10194E] via-transparent to-black/30 pointer-events-none" />

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
              100% Real Travel Memoirs & Touring Fleet
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight drop-shadow-md">
            <span>Dynamic Visual </span>
            <span className="text-[#E8C148]">Photo Collage</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed drop-shadow">
            Experience our journeys across South India through an artistic mosaic collage — divided into 3 vibrant sections: iconic heritage places, happy travelers, and our spotless touring fleet.
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
              All 3 Sections ({validAll.length})
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
              1. Places ({validPlaces.length})
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
              2. Clients ({validClients.length})
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
              3. Cars ({validCars.length})
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1 bg-[#0B1138]/80 p-1 rounded-xl border border-brand-gold/30">
              <button
                onClick={() => setViewMode('collage')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'collage'
                    ? 'bg-brand-gold text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>Dynamic Collage</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-brand-gold text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Uniform Grid</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. MAIN GALLERY CONTENT WITH 3 SECTIONS ───────────────────── */}
      <div className="py-10 sm:py-16 px-4 sm:px-10 max-w-7xl mx-auto space-y-16 sm:space-y-24">

        {/* ═════════ SECTION 1: PLACES ═════════ */}
        {(activeTab === 'all' || activeTab === 'places') && (
          <section id="places-section" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-300">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-gold-dark mb-1">
                  <Compass className="w-4 h-4 text-brand-gold-dark" />
                  <span>Section 1</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900">
                  Places & Sacred Destinations <span className="text-brand-gold-dark">({validPlaces.length})</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                  Ancient temple gopurams, mist-covered mountain passes, water dams, royal palaces, and scenic heritage resorts across Tamil Nadu & Kerala.
                </p>
              </div>
              <span className="text-xs font-semibold text-neutral-500 bg-neutral-200/70 px-3 py-1 rounded-full self-start sm:self-auto">
                {viewMode === 'collage' ? 'Varied Mosaic Collage' : 'Uniform Grid'}
              </span>
            </div>

            {viewMode === 'collage' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[280px] gap-4 sm:gap-6 grid-flow-dense">
                {validPlaces.map((item) => renderCollageCard(item, validPlaces))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {validPlaces.map((item) => renderGridCard(item, validPlaces))}
              </div>
            )}
          </section>
        )}

        {/* ═════════ SECTION 2: CLIENTS ═════════ */}
        {(activeTab === 'all' || activeTab === 'clients') && (
          <section id="clients-section" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-300">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-gold-dark mb-1">
                  <Users className="w-4 h-4 text-brand-gold-dark" />
                  <span>Section 2</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900">
                  Clients & Traveler Memoirs <span className="text-brand-gold-dark">({validClients.length})</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                  Smiling families, devotee pilgrim groups with sacred tilak, mountain explorers, verified handwritten letters, airport receptions, and lake boat rides.
                </p>
              </div>
              <span className="text-xs font-semibold text-neutral-500 bg-neutral-200/70 px-3 py-1 rounded-full self-start sm:self-auto">
                {viewMode === 'collage' ? 'Varied Mosaic Collage' : 'Uniform Grid'}
              </span>
            </div>

            {viewMode === 'collage' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[280px] gap-4 sm:gap-6 grid-flow-dense">
                {validClients.map((item) => renderCollageCard(item, validClients))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {validClients.map((item) => renderGridCard(item, validClients))}
              </div>
            )}
          </section>
        )}

        {/* ═════════ SECTION 3: CARS ═════════ */}
        {(activeTab === 'all' || activeTab === 'cars') && (
          <section id="cars-section" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-300">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-gold-dark mb-1">
                  <Car className="w-4 h-4 text-brand-gold-dark" />
                  <span>Section 3</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-neutral-900">
                  Touring Fleet & Cabs <span className="text-brand-gold-dark">({validCars.length})</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl flex items-center gap-2 flex-wrap">
                  <span>Pristine Swift Dzires & Toyota Innova Crystas photographed in active service.</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    100% Verified Clean & Maintained Fleet
                  </span>
                </p>
              </div>
              <span className="text-xs font-semibold text-neutral-500 bg-neutral-200/70 px-3 py-1 rounded-full self-start sm:self-auto">
                {viewMode === 'collage' ? 'Varied Mosaic Collage' : 'Uniform Grid'}
              </span>
            </div>

            {viewMode === 'collage' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[280px] gap-4 sm:gap-6 grid-flow-dense">
                {validCars.map((item) => renderCollageCard(item, validCars))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {validCars.map((item) => renderGridCard(item, validCars))}
              </div>
            )}
          </section>
        )}

      </div>

      {/* ─── 3. LIGHTBOX MODAL ─────────────────────────────────────────── */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setSelectedItemIndex(null)}
        >
          {/* Top Bar with Title and Close Button */}
          <div 
            className="flex items-center justify-between max-w-5xl mx-auto w-full z-10 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-neutral-950">
                {selectedItem.badge}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400">
                {selectedItemIndex + 1} of {activeItemsList.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedItemIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container with Navigation Arrows */}
          <div 
            className="relative flex-1 flex items-center justify-center my-2 max-w-5xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-neutral-950 flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:border-brand-gold shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-h-[68vh] sm:max-h-[72vh] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[68vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-1 sm:right-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-neutral-950 flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:border-brand-gold shadow-lg"
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
