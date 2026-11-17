// api/upload.js
// Vercel Serverless Function to store image binary directly in Neon PostgreSQL (uploaded_files table)

import { pool } from './db.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let buffer = null;
    let mimeType = 'image/jpeg';
    let filename = `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;

    // Case 1: JSON payload with base64 data URI
    if (req.body && req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:')) {
      const match = req.body.image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        buffer = Buffer.from(match[2], 'base64');
        const ext = mimeType === 'image/png' ? '.png' : mimeType === 'image/webp' ? '.webp' : '.jpg';
        filename = `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      }
    }

    // Case 2: Raw binary or string buffer
    if (!buffer && Buffer.isBuffer(req.body)) {
      buffer = req.body;
      mimeType = req.headers['content-type'] || 'image/jpeg';
    }

    if (!buffer) {
      return res.status(400).json({ error: 'No image buffer or base64 data provided' });
    }

    // Insert binary BYTEA into Neon DB
    await pool.query(
      'INSERT INTO uploaded_files (filename, mime_type, data) VALUES ($1, $2, $3)',
      [filename, mimeType, buffer]
    );

    const filePath = `/api/uploads?filename=${encodeURIComponent(filename)}`;

    return res.status(200).json({
      success: true,
      filePath,
      filename,
      size: buffer.length,
      mimeType,
      message: 'Image binary successfully stored inside Neon PostgreSQL database'
    });
  } catch (error) {
    console.error('[API Upload Error]:', error);
    return res.status(500).json({ error: 'Failed to upload image into database: ' + error.message });
  }
}
