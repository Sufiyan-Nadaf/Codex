import { Router } from 'express';
import { createExpense, listExpenses } from '../controllers/expenseController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', listExpenses);
router.post('/', createExpense);

export default router;
