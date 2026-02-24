import { body } from 'express-validator';

export const createInvoiceValidation = [
  body('customer').notEmpty(),
  body('invoiceNumber').notEmpty(),
  body('items').isArray({ min: 1 })
];
