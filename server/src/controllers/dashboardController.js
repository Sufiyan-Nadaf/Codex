import { asyncHandler } from '../utils/asyncHandler.js';
import { getDashboardMetrics } from '../services/analyticsService.js';
import { summarizeBusiness } from '../services/aiService.js';

export const dashboard = asyncHandler(async (req, res) => {
  const metrics = await getDashboardMetrics(req.businessId);
  const aiSummary = summarizeBusiness(metrics);
  res.json({ metrics, aiSummary });
});
