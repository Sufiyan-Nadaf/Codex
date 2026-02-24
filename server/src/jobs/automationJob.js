import cron from 'node-cron';
import Business from '../models/Business.js';
import { overdueInvoicesForReminder, runAutomationForEvent } from '../services/automationService.js';

export const startAutomationJobs = () => {
  cron.schedule('0 10 * * *', async () => {
    const businesses = await Business.find({ 'featureToggles.automation': true }).select('_id');
    for (const business of businesses) {
      const overdue = await overdueInvoicesForReminder(business._id, 7);
      if (overdue.length) {
        await runAutomationForEvent(business._id, 'invoice_overdue', { overdueCount: overdue.length });
      }
    }
  });
};
