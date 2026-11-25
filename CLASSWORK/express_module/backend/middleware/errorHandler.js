/**
 * Centralized Error Handler Middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('[Error]', err.stack || err.message);

  const statusCode = err.status || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

/**
 * 404 Route Handler Middleware
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`
  });
}
