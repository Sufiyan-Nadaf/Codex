import Business from '../models/Business.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getBusinesses = asyncHandler(async (req, res) => {
  const ids = req.user.memberships.map((m) => m.business);
  const businesses = await Business.find({ _id: { $in: ids } });
  res.json(businesses);
});

export const createBusiness = asyncHandler(async (req, res) => {
  const business = await Business.create({ ...req.body, owner: req.user._id });
  req.user.memberships.push({ business: business._id, role: 'owner' });
  await req.user.save();
  res.status(201).json(business);
});
