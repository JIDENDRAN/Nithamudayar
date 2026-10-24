import fs from 'fs';
import path from 'path';
import pg from 'pg';
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';

const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

const pool = new Pool({
  connectionString,
  ssl: isLocalhost ? false : { rejectUnauthorized: false }
});

// Test connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

function convertQuery(sql, params = []) {
  let index = 1;
  const formattedSql = sql.replace(/\?/g, () => `$${index++}`);
  return {
    formattedSql,
    pgParams: params
  };
}

export const db = {
  query: (text, params) => pool.query(text, params),
  
  get: async (text, params) => {
    const { formattedSql, pgParams } = convertQuery(text, params);
    const res = await pool.query(formattedSql, pgParams);
    return res.rows[0] || null;
  },
  
  all: async (text, params) => {
    const { formattedSql, pgParams } = convertQuery(text, params);
    const res = await pool.query(formattedSql, pgParams);
    return res.rows;
  },
  
  run: async (text, params) => {
    const { formattedSql, pgParams } = convertQuery(text, params);
    let sqlToRun = formattedSql;
    let isInsert = sqlToRun.trim().toUpperCase().startsWith('INSERT');
    if (isInsert && !sqlToRun.toUpperCase().includes('RETURNING')) {
      sqlToRun += ' RETURNING id';
    }
    const res = await pool.query(sqlToRun, pgParams);
    let lastID = null;
    if (isInsert && res.rows[0]) {
      lastID = res.rows[0].id || null;
    }
    return {
      lastID,
      changes: res.rowCount
    };
  },
  
  exec: async (text) => {
    return pool.query(text);
  }
};

export async function initDatabase() {
  // Verify the connection works
  await pool.query('SELECT NOW()');

  // Create tables using Postgres-compliant statements
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      password TEXT NOT NULL,
      qr_code TEXT
    );

    CREATE TABLE IF NOT EXISTS whatsapp_auth_state (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      "fromLocation" TEXT NOT NULL,
      "toLocation" TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      vehicle TEXT,
      "packageType" TEXT,
      status TEXT DEFAULT 'Pending',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      seats TEXT NOT NULL,
      ac TEXT NOT NULL,
      price TEXT NOT NULL,
      "desc" TEXT NOT NULL,
      image TEXT NOT NULL,
      "bgImage" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      duration TEXT NOT NULL,
      places TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL,
      rating TEXT DEFAULT '5.0',
      "reviewCount" TEXT DEFAULT '100+',
      location TEXT
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS uploaded_files (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      mime_type TEXT NOT NULL,
      data BYTEA NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrate existing local upload files to Neon DB if not present
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        if (fs.statSync(filePath).isFile()) {
          const existing = await pool.query('SELECT id FROM uploaded_files WHERE filename = $1', [file]);
          if (existing.rows.length === 0) {
            const fileBuffer = fs.readFileSync(filePath);
            const ext = path.extname(file).toLowerCase();
            let mimeType = 'image/jpeg';
            if (ext === '.png') mimeType = 'image/png';
            else if (ext === '.webp') mimeType = 'image/webp';
            else if (ext === '.svg') mimeType = 'image/svg+xml';
            
            await pool.query(
              'INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)',
              [file, mimeType, fileBuffer]
            );
            console.log(`Migrated local image to Neon DB: ${file}`);
          }
        }
      }
    }
  } catch (migErr) {
    console.error('Warning: Error during local images migration to Neon DB:', migErr);
  }

  // Seed default admin settings
  await pool.query("UPDATE admin_settings SET name = 'admin' WHERE name = 'Superadmin'");
  await pool.query("UPDATE admin_settings SET phone = '9894116405', whatsapp = '9894116405' WHERE id = (SELECT MIN(id) FROM admin_settings)");
  
  const adminCountRes = await pool.query('SELECT COUNT(*) as count FROM admin_settings');
  const adminCount = parseInt(adminCountRes.rows[0].count, 10);
  if (adminCount === 0) {
    await pool.query(
      'INSERT INTO admin_settings (name, phone, whatsapp, password) VALUES ($1, $2, $3, $4)',
      ['admin', '9894116405', '9894116405', 'admin123']
    );
    console.log('Seeded default admin settings.');
  }

  // Seed default premium cars matching Nithamudayar fleet
  const carsCountRes = await pool.query('SELECT COUNT(*) as count FROM cars');
  const carsCount = parseInt(carsCountRes.rows[0].count, 10);
  if (carsCount === 0) {
    const defaultCars = [
      {
        name: 'Sedan (Dzire / Etios)',
        seats: '4 + 1 Passengers',
        ac: 'Climate Control AC',
        price: '₹14 / km',
        desc: 'Driver Bata: ₹400 / day | Minimum 250 km / day | Night halt extra (after 10 PM). Clean & comfortable sedan for small families.',
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
        desc: 'Driver Bata: ₹600 / day | Minimum 350 km / day | Night halt extra. Premium captain seats, rear charging ports, and superior highway suspension.',
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
        desc: 'Driver Bata: Included in Quote | Minimum: By Itinerary. Air suspension chassis, LED audio system, and huge luggage bay for marriages & corporate tours.',
        image: '/images/vehicles/bus.png',
        bgImage: '/images/backgrounds/fleet-bg.jpg'
      }
    ];

    for (const car of defaultCars) {
      await pool.query(
        'INSERT INTO cars (name, seats, ac, price, "desc", image, "bgImage") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [car.name, car.seats, car.ac, car.price, car.desc, car.image, car.bgImage]
      );
    }
    console.log('Seeded default vehicles.');
  }

  // Seed default tour packages
  // Ensure we add the new columns if they don't exist
  try {
    await pool.query("ALTER TABLE packages ADD COLUMN IF NOT EXISTS rating TEXT DEFAULT '5.0'");
    await pool.query("ALTER TABLE packages ADD COLUMN IF NOT EXISTS \"reviewCount\" TEXT DEFAULT '100+'");
    await pool.query("ALTER TABLE packages ADD COLUMN IF NOT EXISTS location TEXT");
  } catch(e) {}

  const packagesCountRes = await pool.query('SELECT COUNT(*) as count FROM packages');
  const packagesCount = parseInt(packagesCountRes.rows[0].count, 10);
  if (packagesCount === 0) {
    const defaultPackages = [
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

    for (const pkg of defaultPackages) {
      await pool.query(
        'INSERT INTO packages (name, duration, places, price, image, rating, "reviewCount", location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [pkg.name, pkg.duration, pkg.places, pkg.price, pkg.image, pkg.rating, pkg.reviewCount, pkg.location]
      );
    }
    console.log('Seeded default tour packages.');
  }

  return db;
}
