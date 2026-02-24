const expenseCategories = {
  fuel: 'Transport',
  petrol: 'Transport',
  rent: 'Office',
  ad: 'Marketing',
  facebook: 'Marketing',
  salary: 'Payroll'
};

export const autoCategorizeExpense = (note = '') => {
  const text = note.toLowerCase();
  const match = Object.keys(expenseCategories).find((keyword) => text.includes(keyword));
  return match ? expenseCategories[match] : 'General';
};

export const summarizeBusiness = (metrics) => {
  if (metrics.profit < 0) return 'You are currently running at a loss. Cut variable costs and focus on faster collections.';
  if (metrics.netMargin < 15) return 'Your margin is low. Review pricing and reduce discount leakage.';
  return 'Healthy growth trend. Maintain collection speed and plan inventory better.';
};
