// api/uploads.js
// Vercel Serverless Function to stream image binary stored in Neon PostgreSQL (uploaded_files table)

import { pool } from './db.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = req.query.filename || (req.url && req.url.split('/').pop().split('?')[0]);
    if (!filename) {
      return res.status(400).send('Filename required');
    }

    const result = await pool.query(
      'SELECT mime_type, data FROM uploaded_files WHERE filename = $1',
      [filename]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).send('Image not found in database');
    }

    const file = result.rows[0];
    res.setHeader('Content-Type', file.mime_type || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.send(file.data);
  } catch (error) {
    console.error('[API Uploads Serve Error]:', error);
    return res.status(500).send('Error retrieving image from database');
  }
}

