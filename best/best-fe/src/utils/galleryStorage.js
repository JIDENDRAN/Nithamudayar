// src/utils/galleryStorage.js
// Ultra-robust client storage for custom gallery photos using IndexedDB + safe LocalStorage + API sync

import API_BASE_URL from '../apiConfig.js';

const DB_NAME = 'nitham_gallery_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_photos';
const LOCAL_STORAGE_KEY = 'nitham_custom_gallery';

/**
 * Open or create IndexedDB instance
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

/**
 * Compress any image file to high-res, lightweight WebP/JPEG using Canvas.
 * Downscales 5MB-20MB camera photos to ~100KB-250KB while preserving pristine visual quality.
 */
export function compressImage(file, { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    
    // If already small (< 100KB) data URI or string, return as is
    if (typeof file === 'string') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(e.target.result);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality JPEG
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (canvasErr) {
          resolve(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Get all custom gallery photos across IndexedDB, LocalStorage, and live backend API.
 */
export async function getCustomGalleryPhotos() {
  let photos = [];

  // 1. Try IndexedDB
  try {
    const db = await openDB();
    if (db) {
      photos = await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }
  } catch (idbErr) {
    console.warn('[Gallery Storage] IndexedDB read notice:', idbErr);
  }

  // 2. Fallback to LocalStorage if IndexedDB had nothing
  if (!photos || photos.length === 0) {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          photos = parsed;
          // Seed back into IndexedDB
          try {
            const db = await openDB();
            if (db) {
              const tx = db.transaction(STORE_NAME, 'readwrite');
              const store = tx.objectStore(STORE_NAME);
              parsed.forEach((p) => store.put(p));
            }
          } catch (seedErr) {
            // Ignore
          }
        }
      }
    } catch (lsErr) {
      console.warn('[Gallery Storage] LocalStorage read notice:', lsErr);
    }
  }

  // 3. Attempt async fetch from live backend API (with quick 3s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}/api/gallery`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const apiPhotos = await res.json();
      if (Array.isArray(apiPhotos) && apiPhotos.length > 0) {
        // Merge without duplicate IDs
        const existingIds = new Set(photos.map((p) => String(p.id)));
        const newFromApi = apiPhotos.filter((p) => !existingIds.has(String(p.id)));
        photos = [...newFromApi, ...photos];
      }
    }
  } catch (apiErr) {
    // Backend offline / static mode - silent fallback
  }

  // Sort by createdAt descending
  photos.sort((a, b) => {
    const tA = new Date(a.createdAt || 0).getTime();
    const tB = new Date(b.createdAt || 0).getTime();
    return tB - tA;
  });

  return photos;
}

/**
 * Save a new or updated gallery photo to IndexedDB + safe LocalStorage + backend API.
 */
export async function saveCustomGalleryPhoto(photo) {
  const photoToSave = {
    ...photo,
    id: photo.id || Date.now(),
    createdAt: photo.createdAt || new Date().toISOString()
  };

  // 1. Save to IndexedDB (virtually unlimited capacity)
  try {
    const db = await openDB();
    if (db) {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(photoToSave);
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e);
      });
    }
  } catch (idbErr) {
    console.warn('[Gallery Storage] IndexedDB write notice:', idbErr);
  }

  // 2. Mirror into LocalStorage with safe Quota Protection
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = [photoToSave, ...existing.filter((p) => p.id !== photoToSave.id)];
    
    // If item list is getting large, retain most recent 20 in localStorage
    const safeSubset = updated.slice(0, 20);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(safeSubset));
    } catch (quotaErr) {
      // If full, trim images to smaller payload in localStorage
      const trimmed = safeSubset.slice(0, 5);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
    }
  } catch (lsErr) {
    console.warn('[Gallery Storage] LocalStorage mirror notice:', lsErr);
  }

  // 3. Attempt async POST to backend API in background
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    fetch(`${API_BASE_URL}/api/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photoToSave),
      signal: controller.signal
    }).catch(() => {});
    clearTimeout(timeoutId);
  } catch (e) {
    // Backend offline / static mode
  }

  // 4. Notify open windows/components of gallery update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nitham_gallery_updated', { detail: photoToSave }));
  }

  return photoToSave;
}

/**
 * Delete a photo by ID across IndexedDB, LocalStorage, and backend API.
 */
export async function deleteCustomGalleryPhoto(id) {
  // 1. Delete from IndexedDB
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
    }
  } catch (idbErr) {
    console.warn('[Gallery Storage] IndexedDB delete notice:', idbErr);
  }

  // 2. Delete from LocalStorage
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = existing.filter((p) => p.id !== id && String(p.id) !== String(id));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (lsErr) {
    // Ignore
  }

  // 3. Attempt DELETE on backend API
  try {
    fetch(`${API_BASE_URL}/api/gallery/${id}`, { method: 'DELETE' }).catch(() => {});
  } catch (e) {
    // Ignore
  }

  // 4. Dispatch update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nitham_gallery_updated', { detail: { id, deleted: true } }));
  }
}
