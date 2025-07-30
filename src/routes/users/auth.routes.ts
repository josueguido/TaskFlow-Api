import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { securityConfig } from '../../config/security';
import * as authController from '../../controllers/users/auth.controller';

const router = Router();

// Rate limiting específico para auth
const authLimiter = rateLimit(securityConfig.rateLimit.auth);
const registerLimiter = rateLimit(securityConfig.rateLimit.register);

router.post('/register', authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
