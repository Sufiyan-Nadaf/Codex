import Expense from '../models/Expense.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { autoCategorizeExpense } from '../services/aiService.js';

export const createExpense = asyncHandler(async (req, res) => {
  const { amount, note } = req.body;
  const category = req.body.category || autoCategorizeExpense(note);
  const expense = await Expense.create({
    ...req.body,
    amount,
    category,
    autoCategorized: !req.body.category,
    business: req.businessId
  });
  res.status(201).json(expense);
});

export const listExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ business: req.businessId }).sort({ date: -1 });
  res.json(expenses);
});
