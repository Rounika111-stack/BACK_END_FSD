import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');

// Attempt to load .env file if it exists
const envPath = path.join(backendDir, '.env');
if (fs.existsSync(envPath)) {
  try {
    if (typeof process.loadEnvFile === 'function') {
      process.loadEnvFile(envPath);
    } else {
      // Manual simple parser fallback
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...rest] = trimmed.split('=');
          const value = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      });
    }
  } catch (err) {
    console.warn('[Env] Failed to load .env file:', err.message);
  }
}

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Resolve Files Directory
const configuredFilesDir = process.env.FILE_DIRECTORY || '../files';
let resolvedFilesDir = path.resolve(backendDir, configuredFilesDir);

// Robust fallback: if configured path does not exist, check fallback locations
if (!fs.existsSync(resolvedFilesDir)) {
  const alternativePath = path.resolve(backendDir, './files');
  if (fs.existsSync(alternativePath)) {
    console.log(`[Config] '../files' not found, falling back to './files' at ${alternativePath}`);
    resolvedFilesDir = alternativePath;
  } else {
    // Automatically create directory if missing so server runs without errors
    try {
      fs.mkdirSync(resolvedFilesDir, { recursive: true });
      console.log(`[Config] Created missing files directory at ${resolvedFilesDir}`);
    } catch (e) {
      console.error('[Config] Could not create files directory:', e.message);
    }
  }
}

export const FILES_DIR = resolvedFilesDir;
export const BACKEND_DIR = backendDir;

console.log(`[Config] Environment loaded:`);
console.log(`  - PORT: ${PORT}`);
console.log(`  - FILES_DIR: ${FILES_DIR}`);
