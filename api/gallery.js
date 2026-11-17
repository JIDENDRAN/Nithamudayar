// api/gallery.js
// Vercel Serverless Function to manage Gallery Images directly in Neon PostgreSQL Database

import { pool } from './db.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch all gallery images stored inside Neon PostgreSQL
  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT id, title, category, location, badge, "desc", image, span, "createdAt" FROM gallery_images ORDER BY "createdAt" DESC, id DESC'
      );
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('[API Gallery GET Error]:', error);
      return res.status(500).json({ error: 'Failed to fetch gallery images from database' });
    }
  }

  // POST: Insert new image directly into Neon PostgreSQL database
  if (req.method === 'POST') {
    try {
      const { title, category, location, badge, desc, image, span } = req.body || {};
      if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      const safeTitle = (title && title.trim()) || 'Tour Highlight - TamilNadu';
      const safeCat = category || 'places';
      const safeLoc = (location && location.trim()) || 'TamilNadu';
      const safeBadge = (badge && badge.trim()) || 'Featured Photo';
      const safeDesc = (desc && desc.trim()) || '';
      const safeSpan = span || 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2';

      const insertResult = await pool.query(
        'INSERT INTO gallery_images (title, category, location, badge, "desc", image, span) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, "createdAt"',
        [safeTitle, safeCat, safeLoc, safeBadge, safeDesc, image, safeSpan]
      );

      const inserted = insertResult.rows[0];

      return res.status(201).json({
        id: inserted.id,
        title: safeTitle,
        category: safeCat,
        location: safeLoc,
        badge: safeBadge,
        desc: safeDesc,
        image,
        span: safeSpan,
        createdAt: inserted.createdAt,
        message: 'Image stored successfully inside Neon PostgreSQL database'
      });
    } catch (error) {
      console.error('[API Gallery POST Error]:', error);
      return res.status(500).json({ error: 'Failed to store image in database: ' + error.message });
    }
  }

  // DELETE: Remove image from database
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ error: 'Photo ID is required for deletion' });
      }

      await pool.query('DELETE FROM gallery_images WHERE id = $1', [id]);
      return res.status(200).json({ success: true, message: 'Photo deleted from database' });
    } catch (error) {
      console.error('[API Gallery DELETE Error]:', error);
      return res.status(500).json({ error: 'Failed to delete photo from database' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

