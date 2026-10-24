import 'dotenv/config';
import { db } from './db.js';

async function update5Cars() {
  console.log('--- Updating DB with strictly ONLY the 5 requested vehicles ---');

  await db.run('DELETE FROM cars');

  const cars = [
    {
      name: 'Sedan (Dzire / Etios)',
      seats: '4+1 Passengers',
      ac: 'Climate Control AC',
      price: '₹14 / km',
      desc: 'Driver Bata: ₹400 / day | Minimum 250 km / day | Fuel & Toll transparent billing. Clean AC sedan for airport, local, and outstation trips.',
      image: '/images/vehicles/sedan.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'SUV (Ertiga / Carens)',
      seats: '6+1 Passengers',
      ac: 'Dual AC',
      price: '₹19 / km',
      desc: 'Driver Bata: ₹500 / day | Minimum 300 km / day | Rooftop luggage carrier. Comfortable family vehicle with dual AC.',
      image: '/images/vehicles/suv.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Toyota Innova Crysta',
      seats: '6+1 / 7+1 Passengers',
      ac: 'Dual Zone Climate AC',
      price: '₹22 / km',
      desc: 'Driver Bata: ₹600 / day | Minimum 350 km / day | Captain luxury seating. Premium touring vehicle for family vacations and pilgrimages.',
      image: '/images/vehicles/innova.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Force Tempo Traveller',
      seats: '12 / 14 / 17 Passengers',
      ac: 'Individual Overhead AC',
      price: '₹25 / km',
      desc: 'Driver Bata: ₹700 / day | Minimum 300 km / day | Pushback luxury seats & high roof. Group travel specialist for temple & holiday circuits.',
      image: '/images/vehicles/tempo.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    },
    {
      name: 'Force Urbania Luxury Van',
      seats: '12 / 17 Passengers',
      ac: 'Panoramic Climate Control',
      price: '₹33 / km',
      desc: 'Driver Bata: ₹800 / day | Minimum 300 km / day | Reclining executive armrests & panoramic windows. Ultra-luxury European touring van.',
      image: '/images/vehicles/urbania.png',
      bgImage: '/images/backgrounds/fleet-bg.jpg'
    }
  ];

  for (const c of cars) {
    await db.run(
      'INSERT INTO cars (name, seats, ac, price, "desc", image, "bgImage") VALUES (?, ?, ?, ?, ?, ?, ?)',
      [c.name, c.seats, c.ac, c.price, c.desc, c.image, c.bgImage]
    );
    console.log(`Saved vehicle: ${c.name} - ${c.price}`);
  }

  console.log('--- Successfully updated DB with exactly 5 vehicles! ---');
  process.exit(0);
}

update5Cars().catch(err => {
  console.error('Error updating cars:', err);
  process.exit(1);
});
