import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { FILES_DIR, BACKEND_DIR } from '../config/env.js';

// MIME Types Mapping
const MIME_TYPES = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  txt: 'text/plain',
  md: 'text/markdown',
  rtf: 'application/rtf',
  json: 'application/json',
  csv: 'text/csv',
  xml: 'application/xml',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ppt: 'application/vnd.ms-powerpoint',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4'
};

/**
 * Format bytes to readable format (KB, MB, GB)
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Determine file category
 */
export function categorizeFile(ext, name = '', folder = '') {
  const lowerExt = ext.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerFolder = folder.toLowerCase();

  if (lowerName.includes('cert') || lowerFolder.includes('cert')) {
    return 'certificate';
  }
  if (['pdf', 'docx', 'doc', 'txt', 'rtf', 'odt', 'pages', 'md'].includes(lowerExt)) {
    return 'document';
  }
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'bmp', 'tiff'].includes(lowerExt)) {
    return 'image';
  }
  if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp', 'sql'].includes(lowerExt)) {
    return 'code';
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(lowerExt)) {
    return 'archive';
  }
  if (['xlsx', 'xls', 'csv'].includes(lowerExt)) {
    return 'spreadsheet';
  }
  if (['pptx', 'ppt', 'key'].includes(lowerExt)) {
    return 'presentation';
  }
  return 'other';
}

/**
 * Validates and safely resolves a relative path within the designated FILES_DIR.
 * Prevents Directory Traversal attacks (e.g. ../, null bytes, absolute paths outside root).
 */
export function validateSafePath(relativePath = '') {
  // Strip null bytes
  if (relativePath.indexOf('\0') !== -1) {
    throw new Error('Access denied: Malicious path containing null bytes.');
  }

  // Normalize and resolve canonical path
  const sanitized = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const absolutePath = path.resolve(FILES_DIR, sanitized);
  const normalizedRoot = path.resolve(FILES_DIR);

  // Path must be within or equal to the designated files directory
  if (absolutePath !== normalizedRoot && !absolutePath.startsWith(normalizedRoot + path.sep)) {
    throw new Error('Access denied: Path traversal attempted outside designated files directory.');
  }

  return absolutePath;
}

/**
 * Automatically syncs certificates from backend/files if present
 */
export async function syncExistingCertificates() {
  try {
    const oldFilesDir = path.resolve(BACKEND_DIR, 'files');
    if (fs.existsSync(oldFilesDir) && oldFilesDir !== FILES_DIR) {
      const targetCertDir = path.resolve(FILES_DIR, 'certificates');
      if (!fs.existsSync(targetCertDir)) {
        await fsp.mkdir(targetCertDir, { recursive: true });
      }

      const files = await fsp.readdir(oldFilesDir);
      for (const file of files) {
        const src = path.join(oldFilesDir, file);
        const stat = await fsp.stat(src);
        if (stat.isFile()) {
          const destInCert = path.join(targetCertDir, file);
          const destInRoot = path.join(FILES_DIR, file);
          if (!fs.existsSync(destInCert)) {
            await fsp.copyFile(src, destInCert);
          }
          if (!fs.existsSync(destInRoot)) {
            await fsp.copyFile(src, destInRoot);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Sync] Non-critical warning syncing certificates:', err.message);
  }
}

/**
 * Recursively scans directory and returns all file descriptors
 */
export async function getAllFiles(dir = FILES_DIR, base = FILES_DIR) {
  let results = [];

  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip hidden files and special directories
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(base, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, base);
        results = results.concat(subFiles);
      } else if (entry.isFile()) {
        try {
          const stats = await fsp.stat(fullPath);
          const extWithDot = path.extname(entry.name);
          const ext = extWithDot.startsWith('.') ? extWithDot.slice(1).toLowerCase() : '';
          const folder = path.dirname(relativePath) === '.' ? 'Root' : path.dirname(relativePath);
          const category = categorizeFile(ext, entry.name, folder);
          const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

          results.push({
            id: Buffer.from(relativePath).toString('base64'),
            name: entry.name,
            relativePath,
            folder,
            extension: ext,
            size: stats.size,
            formattedSize: formatBytes(stats.size),
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
            category,
            mimeType,
            previewUrl: `/api/files/preview?path=${encodeURIComponent(relativePath)}`,
            downloadUrl: `/api/files/download?path=${encodeURIComponent(relativePath)}`
          });
        } catch (statErr) {
          console.warn(`[Scan] Error stating file ${fullPath}:`, statErr.message);
        }
      }
    }
  } catch (err) {
    console.error(`[Scan] Error reading directory ${dir}:`, err.message);
  }

  return results;
}

/**
 * Searches and filters files according to query, categories, extensions, folders, and sort options.
 */
export async function searchFiles({
  query = '',
  category = 'all',
  extension = 'all',
  folder = 'all',
  sortBy = 'relevance',
  sortOrder = 'asc'
} = {}) {
  const allFiles = await getAllFiles();
  const trimmedQuery = query.trim().toLowerCase();

  let filtered = allFiles.filter((file) => {
    const lowerName = file.name.toLowerCase();
    const lowerRelPath = file.relativePath.toLowerCase();
    const lowerFolder = file.folder.toLowerCase();
    const lowerExt = file.extension.toLowerCase();

    // 1. Text Query Filter
    if (trimmedQuery) {
      // Check if query is looking for an extension (e.g. ".pdf" or "pdf")
      const isExtSearch = trimmedQuery.startsWith('.') ? trimmedQuery.slice(1) === lowerExt : false;
      const exactMatch = lowerName === trimmedQuery;
      const partialMatch = lowerName.includes(trimmedQuery) || lowerRelPath.includes(trimmedQuery);

      // Multi-keyword token search: split by space, hyphens or underscores
      const tokens = trimmedQuery.split(/[\s\-_]+/).filter(Boolean);
      const allTokensMatch = tokens.length > 0 && tokens.every((token) =>
        lowerName.includes(token) || lowerFolder.includes(token) || lowerExt === token
      );

      if (!isExtSearch && !exactMatch && !partialMatch && !allTokensMatch) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== 'all' && file.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 3. Extension Filter
    if (extension && extension !== 'all') {
      const cleanExt = extension.startsWith('.') ? extension.slice(1).toLowerCase() : extension.toLowerCase();
      if (lowerExt !== cleanExt) {
        return false;
      }
    }

    // 4. Folder Filter
    if (folder && folder !== 'all' && lowerFolder !== folder.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Calculate relevance score for sorting
  if (trimmedQuery) {
    filtered = filtered.map((file) => {
      const lowerName = file.name.toLowerCase();
      let score = 0;
      if (lowerName === trimmedQuery) score += 100;
      else if (lowerName.startsWith(trimmedQuery)) score += 50;
      else if (lowerName.includes(trimmedQuery)) score += 25;
      if (file.relativePath.toLowerCase().includes(trimmedQuery)) score += 10;
      return { ...file, _score: score };
    });
  }

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'relevance':
        if (trimmedQuery) {
          comparison = (b._score || 0) - (a._score || 0);
          if (comparison !== 0) return comparison;
        }
        comparison = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'date':
      case 'modified':
        comparison = new Date(b.modifiedAt) - new Date(a.modifiedAt);
        break;
      case 'extension':
        comparison = a.extension.localeCompare(b.extension);
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return filtered;
}

/**
 * Aggregate summary stats of the files directory
 */
export async function getDirectoryStats() {
  const allFiles = await getAllFiles();
  const totalFiles = allFiles.length;
  const totalSizeBytes = allFiles.reduce((acc, f) => acc + f.size, 0);

  const categories = {};
  const extensions = {};
  const folders = new Set();

  allFiles.forEach((f) => {
    categories[f.category] = (categories[f.category] || 0) + 1;
    extensions[f.extension || 'none'] = (extensions[f.extension || 'none'] || 0) + 1;
    folders.add(f.folder);
  });

  return {
    totalFiles,
    totalSizeBytes,
    totalFormattedSize: formatBytes(totalSizeBytes),
    categories,
    extensions,
    folders: Array.from(folders).sort(),
    baseDirectory: FILES_DIR
  };
}
