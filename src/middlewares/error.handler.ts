import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/AppError';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error for debugging
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Database/PostgreSQL errors
  if (err.name === 'DatabaseError' || err.message.includes('relation')) {
    return res.status(500).json({
      status: 'error',
      message: 'Database operation failed',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication failed',
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: err.message
    });
  }

  // Default error response
  return res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
