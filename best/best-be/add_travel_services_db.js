import 'dotenv/config';
import { db } from './db.js';

async function addServices() {
  console.log('--- Adding Travel Services to DB ---');

  const services = [
    {
      name: 'Airport Pickup and Drop Service',
      duration: '24/7 On-Demand / Flight Schedule',
      price: 'From ₹1,800',
      places: 'Airport pickup and drop, Flight tracking, Doorstep terminal pickup, Luggage assistance, 24/7 on-time guarantee (All luxury car available)',
      location: 'Chennai, Trichy, Madurai, Coimbatore Airports',
      image: '/images/destinations/chennai.jpg',
      rating: '5.0',
      reviewCount: '490+'
    },
    {
      name: 'Local City Trip & Sightseeing',
      duration: 'Flexible Hourly / Day Rental',
      price: 'From ₹2,000',
      places: 'Local trip, City temple darshan, Heritage monuments, Shopping bazaars, Dining crawl, Flexible hourly packages (All luxury car available)',
      location: 'Trichy, Madurai, Thanjavur, Coimbatore, Chennai',
      image: '/images/destinations/thanjavur.jpg',
      rating: '5.0',
      reviewCount: '380+'
    },
    {
      name: 'Outstation Highway Trip',
      duration: 'One-Way Drop & Round Trips',
      price: 'From ₹3,500',
      places: 'Outstation Trip, Intercity highway charters, Round trip vacations, Verified highway chauffeurs, Safe night driving (All luxury car available)',
      location: 'All South India Intercity Routes',
      image: '/images/destinations/rameswaram.jpg',
      rating: '5.0',
      reviewCount: '520+'
    },
    {
      name: 'Corporation & Corporate Delegate Trip',
      duration: 'Business Hours / Executive Charters',
      price: 'From ₹3,200',
      places: 'Corporation trip, Executive delegate transit, Business summits, VIP guest transfers, GST billing & monthly billing contracts (All luxury car available)',
      location: 'Tech Parks, Hotels & Convention Centers',
      image: '/images/destinations/chennai.jpg',
      rating: '5.0',
      reviewCount: '260+'
    },
    {
      name: 'Family Holiday & Pilgrimage Trip',
      duration: 'Multi-Day Customized Holidays',
      price: 'From ₹4,500',
      places: 'Family trip, Spacious AC cabin, Child and senior citizen friendly halts, Huge luggage boot space, Sacred temple darshans (All luxury car available)',
      location: 'Tamil Nadu & Kerala Family Destinations',
      image: '/images/destinations/murugan.jpg',
      rating: '5.0',
      reviewCount: '440+'
    },
    {
      name: 'Honeymoon Special Romantic Trip',
      duration: '3 to 5 Days Romantic Tour',
      price: 'From ₹6,500',
      places: 'Honeymoon trip, Misty hill resort drives, Private Kerala houseboats, Romantic sunset viewpoints, Courteous & discreet chauffeurs (All luxury car available)',
      location: 'Ooty, Kodaikanal, Munnar, Alleppey, Kovalam',
      image: '/images/destinations/kodaikanal.jpg',
      rating: '5.0',
      reviewCount: '310+'
    }
  ];

  for (const s of services) {
    // Check if service already exists
    const existing = await db.get('SELECT id FROM packages WHERE name = ?', [s.name]);
    if (existing) {
      await db.run(
        'UPDATE packages SET duration = ?, price = ?, places = ?, location = ?, image = ?, rating = ?, "reviewCount" = ? WHERE id = ?',
        [s.duration, s.price, s.places, s.location, s.image, s.rating, s.reviewCount, existing.id]
      );
      console.log(`Updated existing service in DB: ${s.name}`);
    } else {
      await db.run(
        'INSERT INTO packages (name, duration, price, places, location, image, rating, "reviewCount") VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [s.name, s.duration, s.price, s.places, s.location, s.image, s.rating, s.reviewCount]
      );
      console.log(`Inserted new service into DB: ${s.name}`);
    }
  }

  console.log('--- Successfully saved all travel services into Neon PostgreSQL DB! ---');
  process.exit(0);
}

addServices().catch(err => {
  console.error('Error adding services:', err);
  process.exit(1);
});
