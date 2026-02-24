import { body } from 'express-validator';

export const registerValidation = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('businessName').notEmpty()
];

export const loginValidation = [
  body('email').isEmail(),
  body('password').notEmpty()
];
