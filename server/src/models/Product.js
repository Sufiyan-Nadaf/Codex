import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', index: true, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  hsnSacCode: String,
  unitPrice: { type: Number, required: true },
  stockQty: { type: Number, default: 0 },
  gstRate: { type: Number, default: 18 },
  priceHistory: [{ price: Number, changedAt: { type: Date, default: Date.now } }]
}, { timestamps: true });

productSchema.index({ business: 1, sku: 1 }, { unique: true });

export default mongoose.model('Product', productSchema);
