import { Router } from 'express';
import { createInvoice, listInvoices, recordPayment } from '../controllers/invoiceController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';
import { createInvoiceValidation } from '../validations/invoiceValidation.js';
import { validate } from '../validations/validate.js';

const router = Router();
router.use(protect);
router.get('/', listInvoices);
router.post('/', requireRole('owner', 'admin', 'staff'), createInvoiceValidation, validate, createInvoice);
router.post('/:id/payments', requireRole('owner', 'admin'), recordPayment);

export default router;
