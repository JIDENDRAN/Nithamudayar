import 'dotenv/config';
import { db } from './db.js';

async function updatePackages() {
  console.log('--- Updating Tour Packages with Fixed Package Amounts (No KM) ---');

  await db.run('DELETE FROM packages');

  const pkgs = [
    {
      name: 'Tamil Nadu Tourism Circuit',
      duration: '6 Days / 5 Nights',
      price: '₹24,500',
      places: 'Trichy, Thanjavur, Kumbakonam, Madurai, Karaikudi, Rameshwaram, Kanyakumari, Thiruvananthapuram, Coimbatore, Chennai',
      location: '10 Iconic Destinations across Tamil Nadu & Kerala',
      image: '/images/destinations/thanjavur.jpg',
      rating: '5.0',
      reviewCount: '350+'
    },
    {
      name: 'Arupadai Murugan Temple Tour',
      duration: '4 Days / 3 Nights',
      price: '₹14,800',
      places: 'Tiruchendur, Palani, Thiruparankundram, Pazhamudhircholai, Swamimalai, Thiruthani',
      location: 'Six Sacred Holy Abodes of Lord Murugan',
      image: '/images/destinations/murugan.jpg',
      rating: '5.0',
      reviewCount: '420+'
    },
    {
      name: 'Mountain Area Tourism Circuit',
      duration: '5 Days / 4 Nights',
      price: '₹18,500',
      places: 'Kodaikanal, Ooty, Bandipur, Valparai, Munnar, Thekkady, Yercaud',
      location: '7 Scenic Hill Stations & Forest Reserves',
      image: '/images/destinations/kodaikanal.jpg',
      rating: '5.0',
      reviewCount: '380+'
    },
    {
      name: 'Back Water Places Explorer',
      duration: '4 Days / 3 Nights',
      price: '₹16,900',
      places: 'Alappuzha, Fort Kochi, Kumarakom, Mararikulam, Kovalam, Varkala, Jatayu, Mangalam',
      location: '8 Backwater, Lagoon & Coastal Destinations',
      image: '/images/destinations/alleppey.jpg',
      rating: '4.9',
      reviewCount: '290+'
    },
    {
      name: 'All Travel Services & Chauffeur Charters',
      duration: '24/7 Available on Demand',
      price: 'From ₹2,500',
      places: 'Airport pickup and drop, Local trip, Outstation Trip, Corporation trip, Family trip, Honeymoon trip (All luxury cars available)',
      location: 'Tamil Nadu & South India Hubs',
      image: '/images/destinations/chennai.jpg',
      rating: '5.0',
      reviewCount: '500+'
    },
    {
      name: 'Chola Heritage & Cauvery Delta Trail',
      duration: '3 Days / 2 Nights',
      price: '₹8,900',
      places: 'Thanjavur Brihadisvara Temple, Maratha Palace, Kumbakonam Navagraha Temples, Swamimalai Bronze Casting, Trichy Rockfort',
      location: 'Thanjavur, Kumbakonam & Trichy',
      image: '/images/destinations/kumbakonam.jpg',
      rating: '5.0',
      reviewCount: '240+'
    },
    {
      name: 'Southern Pilgrimage & Ocean Confluence',
      duration: '3 Days / 2 Nights',
      price: '₹9,800',
      places: 'Madurai Meenakshi Temple, Pamban Sea Bridge, Ramanathaswamy Temple, Dhanushkodi, Vivekananda Rock, Kanyakumari Sunset',
      location: 'Madurai, Rameshwaram & Kanyakumari',
      image: '/images/destinations/rameswaram.jpg',
      rating: '5.0',
      reviewCount: '310+'
    }
  ];

  for (const p of pkgs) {
    await db.run(
      'INSERT INTO packages (name, duration, price, places, location, image, rating, "reviewCount") VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [p.name, p.duration, p.price, p.places, p.location, p.image, p.rating, p.reviewCount]
    );
    console.log(`Saved package: ${p.name} - ${p.price}`);
  }

  console.log('--- Successfully updated all packages with fixed amounts in DB! ---');
  process.exit(0);
}

updatePackages().catch(err => {
  console.error('Error updating packages:', err);
  process.exit(1);
});
