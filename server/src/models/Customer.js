import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', index: true, required: true },
  name: { type: String, required: true },
  gstin: String,
  phone: String,
  email: String,
  address: String,
  outstandingBalance: { type: Number, default: 0 }
}, { timestamps: true });

customerSchema.index({ business: 1, name: 1 });

export default mongoose.model('Customer', customerSchema);
