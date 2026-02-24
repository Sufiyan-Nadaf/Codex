import { Router } from 'express';
import { login, refresh, register } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js';
import { loginValidation, registerValidation } from '../validations/authValidation.js';
import { validate } from '../validations/validate.js';

const router = Router();
router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/refresh', refresh);

export default router;
