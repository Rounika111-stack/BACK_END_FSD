import fs from 'fs';
import path from 'path';
import {
  searchFiles,
  getAllFiles,
  getDirectoryStats,
  validateSafePath,
  categorizeFile
} from '../services/fileService.js';
import { FILES_DIR } from '../config/env.js';

/**
 * Controller to handle file search
 */
export async function search(req, res, next) {
  try {
    const {
      q = '',
      category = 'all',
      ext = 'all',
      folder = 'all',
      sortBy = 'relevance',
      sortOrder = 'asc'
    } = req.query;

    const results = await searchFiles({
      query: q,
      category,
      extension: ext,
      folder,
      sortBy,
      sortOrder
    });

    res.json({
      success: true,
      count: results.length,
      query: q,
      category,
      extension: ext,
      folder,
      sortBy,
      sortOrder,
      results
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to list all files
 */
export async function listAll(req, res, next) {
  try {
    const files = await getAllFiles();
    res.json({
      success: true,
      count: files.length,
      files
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to get summary stats
 */
export async function getStats(req, res, next) {
  try {
    const stats = await getDirectoryStats();
    res.json({
      success: true,
      stats
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller for file download
 */
export async function downloadFile(req, res, next) {
  try {
    const relativePath = req.query.path;
    if (!relativePath) {
      return res.status(400).json({ success: false, message: 'File path query parameter is required.' });
    }

    const safeFilePath = validateSafePath(relativePath);

    if (!fs.existsSync(safeFilePath)) {
      return res.status(404).json({ success: false, message: 'Requested file was not found on disk.' });
    }

    const stat = await fs.promises.stat(safeFilePath);
    if (!stat.isFile()) {
      return res.status(400).json({ success: false, message: 'Requested path is not a file.' });
    }

    const filename = path.basename(safeFilePath);
    res.download(safeFilePath, filename);
  } catch (err) {
    if (err.message.includes('Access denied')) {
      return res.status(403).json({ success: false, message: err.message });
    }
    next(err);
  }
}

/**
 * Controller for file inline preview
 */
export async function previewFile(req, res, next) {
  try {
    const relativePath = req.query.path;
    if (!relativePath) {
      return res.status(400).json({ success: false, message: 'File path query parameter is required.' });
    }

    const safeFilePath = validateSafePath(relativePath);

    if (!fs.existsSync(safeFilePath)) {
      return res.status(404).json({ success: false, message: 'Requested file was not found on disk.' });
    }

    const stat = await fs.promises.stat(safeFilePath);
    if (!stat.isFile()) {
      return res.status(400).json({ success: false, message: 'Requested path is not a file.' });
    }

    const filename = path.basename(safeFilePath);
    const ext = path.extname(filename).slice(1).toLowerCase();

    // Set inline header
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    
    // Express sendFile handles MIME types properly
    res.sendFile(safeFilePath);
  } catch (err) {
    if (err.message.includes('Access denied')) {
      return res.status(403).json({ success: false, message: err.message });
    }
    next(err);
  }
}

/**
 * Health check controller
 */
export function healthCheck(req, res) {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    filesDirectory: FILES_DIR
  });
}
