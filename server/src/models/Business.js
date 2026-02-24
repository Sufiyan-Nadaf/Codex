import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  gstin: { type: String },
  phone: String,
  email: String,
  address: String,
  plan: { type: String, enum: ['free', 'growth', 'pro'], default: 'free' },
  trialEndsAt: Date,
  featureToggles: {
    automation: { type: Boolean, default: true },
    aiInsights: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: true }
  }
}, { timestamps: true });

businessSchema.index({ owner: 1, name: 1 });

export default mongoose.model('Business', businessSchema);
