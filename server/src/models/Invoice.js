import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  description: String,
  qty: Number,
  unitPrice: Number,
  gstRate: Number,
  discount: { type: Number, default: 0 }
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  amount: Number,
  mode: { type: String, enum: ['upi', 'cash', 'bank'] },
  paidAt: { type: Date, default: Date.now }
}, { _id: false });

const invoiceSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, default: Date.now },
  dueDate: Date,
  invoiceType: { type: String, enum: ['gst', 'non-gst'], default: 'gst' },
  items: [invoiceItemSchema],
  subtotal: Number,
  cgst: Number,
  sgst: Number,
  igst: Number,
  total: Number,
  paidAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['paid', 'unpaid', 'overdue', 'partial'], default: 'unpaid' },
  payments: [paymentSchema],
  currency: { type: String, default: 'INR' }
}, { timestamps: true });

invoiceSchema.index({ business: 1, invoiceNumber: 1 }, { unique: true });
invoiceSchema.index({ business: 1, status: 1 });

export default mongoose.model('Invoice', invoiceSchema);
