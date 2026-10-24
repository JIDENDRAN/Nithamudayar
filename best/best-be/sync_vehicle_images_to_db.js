import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { db } from './db.js';

async function syncImages() {
  console.log('--- Syncing Vehicle Images to DB uploaded_files ---');

  const files = [
    { name: 'sedan.png', localPath: '../best-fe/public/images/vehicles/sedan.png', mime: 'image/png' },
    { name: 'suv.png', localPath: '../best-fe/public/images/vehicles/suv.png', mime: 'image/png' },
    { name: 'innova.png', localPath: '../best-fe/public/images/vehicles/innova.png', mime: 'image/png' },
    { name: 'tempo.png', localPath: '../best-fe/public/images/vehicles/tempo.png', mime: 'image/png' },
    { name: 'urbania.png', localPath: '../best-fe/public/images/vehicles/urbania.png', mime: 'image/png' },
  ];

  for (const f of files) {
    if (fs.existsSync(f.localPath)) {
      const buffer = fs.readFileSync(f.localPath);
      const existing = await db.query('SELECT id FROM uploaded_files WHERE filename = $1', [f.name]);
      if (existing.rows.length > 0) {
        await db.query('UPDATE uploaded_files SET data = $1, mime_type = $2 WHERE filename = $3', [buffer, f.mime, f.name]);
        console.log(`Updated ${f.name} in DB (${buffer.length} bytes)`);
      } else {
        await db.query('INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)', [f.name, f.mime, buffer]);
        console.log(`Inserted ${f.name} in DB (${buffer.length} bytes)`);
      }
    } else {
      console.warn(`File not found: ${f.localPath}`);
    }
  }

  console.log('--- Vehicle images synced directly to DB! ---');
  process.exit(0);
}

syncImages().catch(err => {
  console.error(err);
  process.exit(1);
});
