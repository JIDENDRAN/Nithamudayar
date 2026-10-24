import 'dotenv/config';
import { db } from './db.js';

async function seedUserData() {
  console.log('--- Seeding Updated User Details into Neon DB ---');

  // 1. CARS / FLEET
  const carsData = [
    {
      name: 'Sedan (Dzire / Etios)',
      seats: '4 + 1 Passengers',
      ac: 'Climate Control AC',
      price: '₹14 / km',
      desc: 'Driver Bata: ₹400 / day | Minimum 250 km / day | Night halt extra (after 10 PM). Clean & comfortable sedan for small families and city-outstation travel.',
      image: '/images/vehicles/sedan.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'SUV (Ertiga / Carens)',
      seats: '6 + 1 Passengers',
      ac: 'Dual AC',
      price: '₹19 / km',
      desc: 'Driver Bata: ₹500 / day | Minimum 300 km / day | Night halt extra. Spacious family ride with ample boot space and rooftop luggage carrier.',
      image: '/images/vehicles/innova.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Toyota Innova Crysta',
      seats: '6 + 1 / 7 + 1 Passengers',
      ac: 'Dual Zone Climate AC',
      price: '₹22 / km',
      desc: 'Driver Bata: ₹600 / day | Minimum 350 km / day | Night halt extra. Premium captain seats, rear charging ports, and superior highway suspension for long tours.',
      image: '/images/vehicles/innova.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Force Tempo Traveller',
      seats: '12 / 14 / 17 Passengers',
      ac: 'Individual Overhead AC',
      price: '₹25 / km',
      desc: 'Driver Bata: ₹700 / day | Minimum 300 km / day | Night halt extra. Luxury pushback seats, wide aisle, high roof, and dedicated rear luggage carrier.',
      image: '/images/vehicles/tempo.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Force Urbania Luxury Van',
      seats: '12 / 17 Luxury Passengers',
      ac: 'Panoramic Climate Control',
      price: '₹33 / km',
      desc: 'Driver Bata: ₹800 / day | Minimum 300 km / day | Night halt extra. Next-generation European styling, reclining individual armrest seats, and panoramic touring windows.',
      image: '/images/vehicles/tempo.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Luxury Coach Tourist Bus',
      seats: '36 / 49 Passengers',
      ac: 'High-Capacity Climate AC',
      price: 'Custom Tariff',
      desc: 'Driver Bata: Included in Quote | Minimum: By Itinerary. Air suspension chassis, LED audio system, and huge luggage bay for marriages, college & corporate tours.',
      image: '/images/vehicles/bus.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    }
  ];

  // Clear existing cars and re-insert
  await db.run('DELETE FROM cars');
  for (const car of carsData) {
    await db.run(
      'INSERT INTO cars (name, seats, ac, price, "desc", image, "bgImage") VALUES (?, ?, ?, ?, ?, ?, ?)',
      [car.name, car.seats, car.ac, car.price, car.desc, car.image, car.bgImage]
    );
    console.log(`Inserted car: ${car.name} (${car.price})`);
  }

  // 2. TOUR PACKAGES & TOURISM PLACES
  const packagesData = [
    {
      name: 'Tamil Nadu Heritage & Tourism Circuit',
      duration: '6 Days / 5 Nights',
      places: 'Trichy, Thanjavur, Kumbakonam, Madurai, Karaikudi, Rameshwaram, Kanyakumari, Thiruvananthapuram, Coimbatore, Chennai',
      price: '₹14/km (Sedan) | ₹19/km (SUV)',
      rating: '5.0',
      reviewCount: '350+',
      location: 'Tamil Nadu & Kerala Confluence',
      image: '/images/destinations/thanjavur.jpg'
    },
    {
      name: 'Arupadai Veedu Murugan Temple Circuit',
      duration: '4 Days / 3 Nights',
      places: 'Tiruchendur, Palani, Thiruparankundram, Pazhamudhircholai, Swamimalai, Thiruthani',
      price: 'From ₹14,800',
      rating: '5.0',
      reviewCount: '420+',
      location: 'Six Sacred Abodes of Lord Murugan',
      image: '/images/destinations/murugan.jpg'
    },
    {
      name: 'Mountain Area Tourism (Hill Stations & Wildlife)',
      duration: '5 Days / 4 Nights',
      places: 'Kodaikanal, Ooty, Bandipur, Valparai, Munnar, Thekkady, Yercaud',
      price: 'From ₹18,500',
      rating: '5.0',
      reviewCount: '380+',
      location: 'Western Ghats, Nilgiris & Shevaroys',
      image: '/images/destinations/kodaikanal.jpg'
    },
    {
      name: 'Backwater Places & Coastal Explorer',
      duration: '4 Days / 3 Nights',
      places: 'Alappuzha, Fort Kochi, Kumarakom, Mararikulam, Kovalam, Varkala, Jatayu Earth Center, Mangalam / Munroe Island',
      price: 'From ₹16,900',
      rating: '4.9',
      reviewCount: '290+',
      location: 'Kerala Backwaters & Coastal Belt',
      image: '/images/destinations/alleppey.jpg'
    },
    {
      name: 'All Travel Services & Chauffeur Charters',
      duration: '24/7 Available On Demand',
      places: 'Airport pickup and drop, Local trip, Outstation Trip, Corporation / Corporate trip, Family trip, Honeymoon trip (All luxury cars available: Sedan ₹14/km, SUV ₹19/km, Crysta ₹22/km, Tempo ₹25/km, Urbania ₹33/km)',
      price: 'Custom Tariff / ₹14 - ₹33 per km',
      rating: '5.0',
      reviewCount: '500+',
      location: 'Tamil Nadu & South India',
      image: '/images/destinations/chennai.jpg'
    },
    {
      name: 'Chola Royal Heritage & Cauvery Delta Trail',
      duration: '3 Days / 2 Nights',
      places: 'Thanjavur Brihadisvara Temple, Maratha Palace, Kumbakonam Navagraha Temples, Swamimalai Bronze Casting & Trichy Rockfort',
      price: 'From ₹8,900',
      rating: '5.0',
      reviewCount: '240+',
      location: 'Thanjavur, Kumbakonam & Trichy',
      image: '/images/destinations/kumbakonam.jpg'
    },
    {
      name: 'Southern Pilgrimage: Madurai, Rameshwaram & Kanyakumari',
      duration: '3 Days / 2 Nights',
      places: 'Madurai Meenakshi Temple, Pamban Sea Bridge, Ramanathaswamy Temple, Dhanushkodi, Vivekananda Rock & Kanyakumari Sunset',
      price: 'From ₹9,800',
      rating: '5.0',
      reviewCount: '310+',
      location: 'Southern Tamil Nadu',
      image: '/images/destinations/rameswaram.jpg'
    }
  ];

  // Clear existing packages and re-insert
  await db.run('DELETE FROM packages');
  for (const pkg of packagesData) {
    await db.run(
      'INSERT INTO packages (name, duration, places, price, rating, "reviewCount", location, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [pkg.name, pkg.duration, pkg.places, pkg.price, pkg.rating, pkg.reviewCount, pkg.location, pkg.image]
    );
    console.log(`Inserted package: ${pkg.name} (${pkg.price})`);
  }

  console.log('--- Successfully seeded all details into Neon PostgreSQL Database! ---');
  process.exit(0);
}

seedUserData().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
