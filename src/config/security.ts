import { config } from 'dotenv';
config();

export const securityConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || (() => {
      throw new Error('JWT_SECRET must be defined in environment variables');
    })(),
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: 'HS256' as const
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000,
    message: 'Too many requests from this IP, please try again later.'
  },

  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? process.env.ALLOWED_ORIGINS?.split(',') || []
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10)
  },

  bruteForce: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 15 * 60 * 1000 // 15 minutes
  },

  validation: {
    maxPayloadSize: '10mb',
    maxFieldSize: '1mb'
  }
};

// Validar configuración crítica
const validateConfig = () => {
  const requiredEnvVars = ['JWT_SECRET'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // Validar que JWT_SECRET sea lo suficientemente fuerte
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('WARNING: JWT_SECRET should be at least 32 characters long for security');
  }
};

validateConfig();
