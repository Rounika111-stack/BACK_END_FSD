import express from 'express';
import cors from 'cors';
import { PORT, CORS_ORIGIN, FILES_DIR } from './config/env.js';
import fileRoutes from './routes/fileRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { syncExistingCertificates } from './services/fileService.js';

const app = express();

// Middleware
app.use(cors({
  origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronize any certificates found in legacy backend/files directory
syncExistingCertificates();

// Welcome API route
app.get('/', (req, res) => {
  res.json({
    name: 'MERN File Search Engine API',
    version: '1.0.0',
    endpoints: {
      search: '/api/search?q={query}&category={category}&ext={ext}',
      listAll: '/api/files',
      stats: '/api/files/stats',
      download: '/api/files/download?path={relativePath}',
      preview: '/api/files/preview?path={relativePath}',
      health: '/api/health'
    },
    filesDirectory: FILES_DIR
  });
});

// API Routes
app.use('/api', fileRoutes);

// Catch 404
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`\n==========================================`);
  console.log(`🚀 File Search API Server running on port ${PORT}`);
  console.log(`📁 Search Directory: ${FILES_DIR}`);
  console.log(`🌐 API Ready at http://localhost:${PORT}/api/search`);
  console.log(`==========================================\n`);
});

export default app;
