import mongoose from 'mongoose';

const automationRuleSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true, index: true },
  name: String,
  trigger: { type: String, enum: ['invoice_created', 'invoice_overdue', 'low_stock', 'month_end'] },
  action: { type: String, enum: ['whatsapp_reminder', 'email_summary', 'send_invoice_pdf', 'low_stock_alert'] },
  condition: { type: Object, default: {} },
  isActive: { type: Boolean, default: true },
  lastExecutedAt: Date
}, { timestamps: true });

export default mongoose.model('AutomationRule', automationRuleSchema);
