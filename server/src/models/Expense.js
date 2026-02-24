import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  note: String,
  date: { type: Date, default: Date.now },
  autoCategorized: { type: Boolean, default: false }
}, { timestamps: true });

expenseSchema.index({ business: 1, category: 1, date: -1 });

export default mongoose.model('Expense', expenseSchema);
