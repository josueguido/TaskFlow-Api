import { config } from 'dotenv';
import { Algorithm, SignOptions } from 'jsonwebtoken';
config();

const JWT_SECRET = process.env.JWT_SECRET
  ?? (() => { throw new Error('JWT_SECRET must be defined'); })();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
  ?? (() => { throw new Error('JWT_REFRESH_SECRET must be defined'); })();

const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m') as SignOptions['expiresIn'];
const JWT_REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export const securityConfig = {
  jwt: {
     secret: JWT_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
    expiresIn: JWT_EXPIRES_IN,
    refreshExpiresIn: JWT_REFRESH_EXPIRES_IN,
    algorithm: 'HS256' as Algorithm,
    issuer: 'taskflow-api',
    audience: 'taskflow-users'
  },

  rateLimit: {
    general: {
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests, please try again later',
    },
    // Rate limiting para autenticación
    auth: {
      windowMs: 15 * 60 * 1000,
      max: 5,
      message: 'Too many login attempts, please try again later',
      skipSuccessfulRequests: true
    },
    register: {
      windowMs: 60 * 60 * 1000, // 1 hora
      max: 3, // máximo 3 registros por hora
      message: 'Too many registrations, please try again later'
    }
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization'
    ]
  },

  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    maxLength: 72
  },

  bruteForce: {
    freeRetries: 2,
    minWait: 5 * 60 * 1000,
    maxWait: 15 * 60 * 1000,
    failuresBeforeBrute: 5,
    maxHits: 10,
    lifetime: 24 * 60 * 60
  },

  validation: {
    password: {
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },
    email: {
      maxLength: 320, // RFC 5321 limit
      allowedDomains: process.env.ALLOWED_EMAIL_DOMAINS?.split(',') || []
    },
    username: {
      minLength: 3,
      maxLength: 30,
      allowedPattern: /^[a-zA-Z0-9_-]+$/
    }
  },

  session: {
    name: 'taskflow.sid',
    secret: process.env.SESSION_SECRET || JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      sameSite: 'strict' as const
    }
  },

  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false
  },

  // Configuración de logs de seguridad
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logFailedAuth: true,
    logSuccessfulAuth: false,
    logRateLimitHits: true,
    maxLogSize: '10m',
    maxFiles: '14d'
  }
};

// Exportaciones individuales para compatibilidad
export {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
};

// Validación de configuración
const validateConfig = () => {
  // Validar JWT secrets
  if (JWT_SECRET.length < 32) {
    console.warn('⚠️ JWT_SECRET debería tener al menos 32 caracteres');
  }

  if (JWT_REFRESH_SECRET.length < 32) {
    console.warn('⚠️ JWT_REFRESH_SECRET debería tener al menos 32 caracteres');
  }

  if (JWT_SECRET === JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET y JWT_REFRESH_SECRET deben ser diferentes');
  }

  // Validar salt rounds
  if (securityConfig.bcrypt.saltRounds < 10) {
    console.warn('⚠️ Se recomienda usar al menos 12 salt rounds para bcrypt');
  }

  // Validar CORS en producción
  if (process.env.NODE_ENV === 'production' &&
      securityConfig.cors.origin.includes('http://localhost:3000')) {
    console.warn('⚠️ CORS incluye localhost en producción');
  }

  console.log('Configuración de seguridad validada correctamente');
};

validateConfig();

export default securityConfig;
