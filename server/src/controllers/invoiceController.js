import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';
import AuditLog from '../models/AuditLog.js';
import { calculateInvoiceTotals } from '../utils/gst.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { runAutomationForEvent } from '../services/automationService.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const { items, invoiceType = 'gst', customer, ...rest } = req.body;
  const totals = calculateInvoiceTotals(items, true);

  const invoice = await Invoice.create({
    ...rest,
    items,
    customer,
    invoiceType,
    business: req.businessId,
    ...totals
  });

  await AuditLog.create({
    business: req.businessId,
    actor: req.user._id,
    action: 'invoice.create',
    targetType: 'Invoice',
    targetId: String(invoice._id)
  });

  await runAutomationForEvent(req.businessId, 'invoice_created', { invoiceId: invoice._id });

  res.status(201).json(invoice);
});

export const listInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ business: req.businessId }).populate('customer').sort({ createdAt: -1 });
  res.json(invoices);
});

export const recordPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, mode } = req.body;

  const invoice = await Invoice.findOne({ _id: id, business: req.businessId });
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

  invoice.paidAmount += amount;
  invoice.payments.push({ amount, mode });

  if (invoice.paidAmount >= invoice.total) {
    invoice.status = 'paid';
  } else {
    invoice.status = 'partial';
  }

  await invoice.save();
  await Customer.findByIdAndUpdate(invoice.customer, { $inc: { outstandingBalance: -amount } });

  res.json(invoice);
});
