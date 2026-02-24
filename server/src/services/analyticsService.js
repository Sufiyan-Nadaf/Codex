import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';

export const getDashboardMetrics = async (businessId) => {
  const [invoices, expenses] = await Promise.all([
    Invoice.find({ business: businessId }),
    Expense.find({ business: businessId })
  ]);

  const revenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const collected = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const expenseTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const profit = collected - expenseTotal;
  const healthScore = Math.max(20, Math.min(100, Math.round((profit / Math.max(collected, 1)) * 100 + 60)));

  return {
    revenue,
    collected,
    expenseTotal,
    profit,
    netMargin: collected ? (profit / collected) * 100 : 0,
    healthScore
  };
};
