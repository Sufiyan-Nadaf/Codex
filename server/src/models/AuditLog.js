import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', index: true },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetType: String,
  targetId: String,
  metadata: Object
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);
