import { RequestHandler } from 'express';
import { BadRequestError } from '../errors/BadRequestError';

/**
 * Middleware para sanitizar entrada de datos
 * Previene ataques XSS y SQL injection básicos
 */
export const sanitizeInput: RequestHandler = (req, res, next) => {
  // Sanitizar strings para prevenir XSS
  const sanitizeString = (str: string): string => {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  // Sanitizar objeto recursivamente
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }

    if (obj !== null && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }

    return obj;
  };

  // Sanitizar body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitizar query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  next();
};

/**
 * Middleware para validar que no haya SQL injection patterns
 */
export const preventSQLInjection: RequestHandler = (req, res, next) => {
  const sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
    /(--|\/\*|\*\/)/g,
    /(\b(WAITFOR|DELAY)\b)/gi,
    /(\b(xp_|sp_)\w+)/gi
  ];

  const checkForSQLInjection = (value: string): boolean => {
    return sqlInjectionPatterns.some(pattern => pattern.test(value));
  };

  const validateObject = (obj: any): void => {
    if (typeof obj === 'string' && checkForSQLInjection(obj)) {
      throw new BadRequestError('Invalid input detected');
    }

    if (Array.isArray(obj)) {
      obj.forEach(validateObject);
    }

    if (obj !== null && typeof obj === 'object') {
      Object.values(obj).forEach(validateObject);
    }
  };

  try {
    if (req.body) {
      validateObject(req.body);
    }

    if (req.query) {
      validateObject(req.query);
    }

    if (req.params) {
      validateObject(req.params);
    }

    next();
  } catch (error) {
    next(error);
  }
};
