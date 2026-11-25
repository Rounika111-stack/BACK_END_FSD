import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = Number(process.env.PORT || 5001);
const allowedOrigin = process.env.CLIENT_URL || process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Security Headers
app.use(helmet());

// CORS configuration supporting single origin or wildcard in development
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (origin === allowedOrigin || origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in local dev
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// Body parsing with safe size limit
app.use(express.json({ limit: '10kb' }));

// Basic rate limiting for contact endpoint (5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 'rate_limited',
    message: 'Too many contact requests from this IP. Please try again after 15 minutes or email directly.',
  },
});

app.use('/api/contact', contactLimiter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'rounika-portfolio-api',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Contact route
app.use('/api/contact', contactRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((error, _req, res, _next) => {
  console.error('Unhandled server error:', error);
  res.status(500).json({
    status: 'error',
    message: 'An unexpected server error occurred.',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = PORT === 5000 ? 5001 : PORT + 1;
    console.warn(`[Server] Port ${PORT} is in use. Attempting fallback to port ${fallbackPort}...`);
    app.listen(fallbackPort, () => {
      console.log(`Portfolio API running at http://localhost:${fallbackPort}`);
    });
  } else {
    throw err;
  }
});

export default app;
