import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  role: { type: String, enum: ['admin', 'owner', 'staff'], default: 'staff' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  mobile: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  memberships: [membershipSchema],
  refreshTokens: [{ type: String }],
  failedLoginCount: { type: Number, default: 0 },
  lockUntil: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
