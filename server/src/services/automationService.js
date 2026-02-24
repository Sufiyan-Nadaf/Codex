import AutomationRule from '../models/AutomationRule.js';
import Invoice from '../models/Invoice.js';

export const runAutomationForEvent = async (businessId, trigger, context = {}) => {
  const rules = await AutomationRule.find({ business: businessId, trigger, isActive: true });

  const executions = await Promise.all(rules.map(async (rule) => {
    rule.lastExecutedAt = new Date();
    await rule.save();
    return { rule: rule.name, action: rule.action, context };
  }));

  return executions;
};

export const overdueInvoicesForReminder = async (businessId, days = 7) => {
  const threshold = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return Invoice.find({
    business: businessId,
    status: { $in: ['unpaid', 'partial', 'overdue'] },
    invoiceDate: { $lte: threshold }
  }).populate('customer');
};
