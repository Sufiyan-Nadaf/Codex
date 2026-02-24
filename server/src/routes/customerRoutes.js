import { Router } from 'express';
import { createCustomer, listCustomers } from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', listCustomers);
router.post('/', createCustomer);

export default router;
