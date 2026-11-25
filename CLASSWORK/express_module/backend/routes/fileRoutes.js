import { Router } from 'express';
import {
  search,
  listAll,
  getStats,
  downloadFile,
  previewFile,
  healthCheck
} from '../controllers/fileController.js';

const router = Router();

// Search endpoint with filters
router.get('/search', search);

// List all files
router.get('/files', listAll);

// Aggregate statistics
router.get('/stats', getStats);
router.get('/files/stats', getStats);

// Download file
router.get('/download', downloadFile);
router.get('/files/download', downloadFile);

// Preview file
router.get('/preview', previewFile);
router.get('/files/preview', previewFile);

// Health check
router.get('/health', healthCheck);

export default router;
