import { RequestHandler } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware para logging de eventos de seguridad
 */
export const securityLogger: RequestHandler = (req, res, next) => {
  const startTime = Date.now();

  // Log de request
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    userId: req.user?.id || 'anonymous'
  });

  // Override del método end para capturar response
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: any, cb?: any) {
    const duration = Date.now() - startTime;

    // Log de response
    logger.info(`Response ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      ip: req.ip,
      userId: req.user?.id || 'anonymous'
    });

    // Log de eventos sospechosos
    if (res.statusCode >= 400) {
      logger.warn(`Suspicious activity detected`, {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        body: req.body,
        params: req.params,
        query: req.query
      });
    }

    return originalEnd(chunk, encoding, cb);
  };

  next();
};

/**
 * Middleware para detectar múltiples intentos fallidos
 */
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();

export const bruteForceProtection: RequestHandler = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxAttempts = 5;

  const attempts = failedAttempts.get(ip);

  if (attempts && attempts.count >= maxAttempts) {
    if (now - attempts.lastAttempt < windowMs) {
      logger.warn(`Brute force attack detected from IP: ${ip}`, {
        ip,
        attempts: attempts.count,
        path: req.path,
        userAgent: req.get('User-Agent')
      });

      res.status(429).json({
        status: 'error',
        message: 'Too many failed attempts. Please try again later.'
      });
      return;
    } else {
      // Reset counter after window expires
      failedAttempts.delete(ip);
    }
  }

  // Override del método end para capturar respuestas de error
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: any, cb?: any) {
    if (res.statusCode === 401 || res.statusCode === 403) {
      const current = failedAttempts.get(ip) || { count: 0, lastAttempt: 0 };
      failedAttempts.set(ip, {
        count: current.count + 1,
        lastAttempt: now
      });
    }

    return originalEnd(chunk, encoding, cb);
  };

  next();
};
