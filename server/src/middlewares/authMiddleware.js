import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, env.accessSecret);
    const user = await User.findById(decoded.sub).select('-passwordHash -refreshTokens');
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    req.businessId = req.headers['x-business-id'];
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  const membership = req.user.memberships.find((m) => String(m.business) === String(req.businessId));
  if (!membership || !roles.includes(membership.role)) {
    return res.status(403).json({ message: 'Insufficient role permission' });
  }
  next();
};
