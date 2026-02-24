import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Business from '../models/Business.js';
import { signAccessToken, signRefreshToken } from '../utils/token.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const MAX_FAILED = 5;

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, businessName } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, memberships: [] });
  const business = await Business.create({
    name: businessName,
    owner: user._id,
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  });

  user.memberships.push({ business: business._id, role: 'owner' });
  await user.save();

  const accessToken = signAccessToken({ sub: user._id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user._id });
  user.refreshTokens.push(refreshToken);
  await user.save();

  res.status(201).json({ user, business, tokens: { accessToken, refreshToken } });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  if (user.lockUntil && user.lockUntil > new Date()) {
    return res.status(423).json({ message: 'Account locked temporarily due to failed attempts' });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    user.failedLoginCount += 1;
    if (user.failedLoginCount >= MAX_FAILED) {
      user.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
      user.failedLoginCount = 0;
    }
    await user.save();
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.failedLoginCount = 0;
  user.lockUntil = undefined;
  const accessToken = signAccessToken({ sub: user._id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user._id });
  user.refreshTokens.push(refreshToken);
  await user.save();

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      memberships: user.memberships
    },
    tokens: { accessToken, refreshToken }
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  const decoded = jwt.verify(refreshToken, env.refreshSecret);
  const user = await User.findById(decoded.sub);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const accessToken = signAccessToken({ sub: user._id, email: user.email });
  res.json({ accessToken });
});
