import { Router } from 'express';
import { createBusiness, getBusinesses } from '../controllers/businessController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', getBusinesses);
router.post('/', createBusiness);

export default router;
