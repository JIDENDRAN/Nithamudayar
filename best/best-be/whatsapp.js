import makeWASocket, {
  DisconnectReason,
  Browsers,
  fetchLatestWaWebVersion,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcodeTerminal from 'qrcode-terminal';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

let sock = null;
let isConnected = false;
let database = null;
let reconnectTimeout = null;
let latestQrCode = null;

const authDir = path.join(process.cwd(), 'whatsapp_auth');

/**
 * Restores auth credentials and keys from PostgreSQL database into the local authDir.
 * Ensures session persists across server restarts even on ephemeral cloud hosting (e.g. Render).
 */
async function restoreAuthFromDB(db) {
  try {
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Only restore if local creds don't exist
    const localCredsExist = fs.existsSync(path.join(authDir, 'creds.json'));
    if (!localCredsExist) {
      const rows = await db.all('SELECT id, value FROM whatsapp_auth_state');
      if (rows && rows.length > 0) {
        console.log(`[WhatsApp Auth] Restoring ${rows.length} session files from database...`);
        for (const row of rows) {
          const filePath = path.join(authDir, row.id);
          fs.writeFileSync(filePath, row.value, 'utf-8');
        }
        console.log('[WhatsApp Auth] Session files successfully restored from database.');
      }
    }
  } catch (err) {
    console.error('[WhatsApp Auth] Error restoring auth from database:', err.message);
  }
}

/**
 * Synchronizes local session files from authDir into PostgreSQL database for persistent storage.
 */
async function syncAuthToDB(db) {
  try {
    if (!fs.existsSync(authDir)) return;
    const files = fs.readdirSync(authDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(authDir, file), 'utf-8');
        await db.run(
          'INSERT INTO whatsapp_auth_state (id, value) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET value = excluded.value',
          [file, content]
        ).catch(() => {});
      }
    }
  } catch (err) {
    // Non-blocking background sync error
  }
}

export async function connectToWhatsApp(db) {
  if (db) {
    database = db;
  }

  if (!database) {
    console.error('[WhatsApp Bot] Database instance not provided to connectToWhatsApp.');
    return;
  }

  // Clear any pending reconnect
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  // Cleanly close prior socket if active
  if (sock) {
    try {
      sock.ev.removeAllListeners('connection.update');
      sock.ev.removeAllListeners('creds.update');
      sock.end(new Error('Reconnecting'));
    } catch (err) {
      // Ignore
    }
    sock = null;
  }

  try {
    // 1. Restore persistent session files from database if needed
    await restoreAuthFromDB(database);

    // 2. Fetch latest active WhatsApp Web protocol version to prevent 405/428 connection failures
    const { version } = await fetchLatestWaWebVersion().catch(() => ({
      version: [2, 3000, 1056359382]
    }));
    console.log(`[WhatsApp Bot] Initializing client with WhatsApp Web v${version.join('.')}`);

    // 3. Multi-file auth state (official Baileys engine)
    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    sock = makeWASocket({
      version,
      auth: state,
      browser: Browsers.ubuntu('Chrome'),
      logger: pino({ level: 'error' }),
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000
    });

    sock.ev.on('creds.update', async () => {
      await saveCreds();
      syncAuthToDB(database);
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log('\n==================================================================');
        console.log('SCAN QR CODE BELOW TO CONNECT THE ADMIN WHATSAPP NOTIFICATION BOT:');
        console.log('==================================================================\n');
        qrcodeTerminal.generate(qr, { small: true });
        console.log('\n==================================================================\n');

        try {
          // Generate high-resolution self-contained Base64 Data URL for instant browser display
          const dataUrl = await QRCode.toDataURL(qr, { margin: 2, scale: 6 });
          latestQrCode = dataUrl;

          // Save QR Data URL into admin_settings table so frontend fetches it immediately
          await database.run(
            'UPDATE admin_settings SET qr_code = ? WHERE id = (SELECT MIN(id) FROM admin_settings)',
            [dataUrl]
          );
        } catch (qrErr) {
          console.error('[WhatsApp Bot] Error converting QR to Data URL:', qrErr);
          latestQrCode = qr;
        }
      }

      if (connection === 'close') {
        isConnected = false;
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        console.log(`[WhatsApp Bot] Connection closed (status: ${statusCode}). Reconnecting: ${shouldReconnect}`);

        if (shouldReconnect) {
          reconnectTimeout = setTimeout(() => connectToWhatsApp(database), 5000);
        } else {
          // User explicitly logged out from phone
          console.log('[WhatsApp Bot] Session logged out. Resetting local and database credentials.');
          latestQrCode = null;
          await database.run('DELETE FROM whatsapp_auth_state').catch(() => {});
          await database.run('UPDATE admin_settings SET qr_code = NULL').catch(() => {});
          if (fs.existsSync(authDir)) {
            fs.rmSync(authDir, { recursive: true, force: true });
          }
        }
      } else if (connection === 'open') {
        console.log('====================================================');
        console.log('✅ WHATSAPP NOTIFICATION BOT CONNECTED SUCCESSFULLY!');
        console.log('====================================================');
        isConnected = true;
        latestQrCode = null;
        await database.run('UPDATE admin_settings SET qr_code = NULL').catch(() => {});
        syncAuthToDB(database);
      }
    });

  } catch (err) {
    console.error('[WhatsApp Bot] Failed to initialize WhatsApp client:', err);
    reconnectTimeout = setTimeout(() => connectToWhatsApp(database), 8000);
  }
}

export async function sendWhatsAppNotification(toPhone, message) {
  if (!sock || !isConnected) {
    console.log('\n⚠️ WhatsApp notification not dispatched. WhatsApp bot is not active or authenticated yet.');
    console.log('Notification Content:\n', message, '\n');
    return false;
  }

  try {
    let cleanPhone = toPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    const jid = `${cleanPhone}@s.whatsapp.net`;

    const [result] = await sock.onWhatsApp(jid);
    if (!result || !result.exists) {
      console.error(`[WhatsApp Error] Number ${cleanPhone} is NOT registered on WhatsApp.`);
      return false;
    }

    await sock.sendMessage(jid, { text: message });
    console.log(`[WhatsApp Success] Notification dispatched to admin JID: ${jid}`);
    return true;
  } catch (err) {
    console.error('[WhatsApp Bot] Error dispatching WhatsApp notification:', err);
    return false;
  }
}

export function getWhatsAppStatus() {
  return {
    isConnected,
    qrCode: latestQrCode
  };
}

export async function disconnectWhatsApp() {
  if (sock) {
    try {
      await sock.logout();
    } catch (err) {
      // Ignore
    }
  }
  if (database) {
    await database.run('DELETE FROM whatsapp_auth_state').catch(() => {});
    await database.run('UPDATE admin_settings SET qr_code = NULL').catch(() => {});
  }
  if (fs.existsSync(authDir)) {
    fs.rmSync(authDir, { recursive: true, force: true });
  }
  latestQrCode = null;
  isConnected = false;
  sock = null;
}
