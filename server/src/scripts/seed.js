import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Business from '../models/Business.js';
import Customer from '../models/Customer.js';
import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';
import AutomationRule from '../models/AutomationRule.js';

await connectDB();
await Promise.all([
  User.deleteMany({}),
  Business.deleteMany({}),
  Customer.deleteMany({}),
  Invoice.deleteMany({}),
  Expense.deleteMany({}),
  AutomationRule.deleteMany({})
]);

const owner = await User.create({
  name: 'Demo Owner',
  email: 'demo@gstsaas.com',
  passwordHash: await bcrypt.hash('Demo@1234', 10),
  memberships: []
});

const business = await Business.create({ name: 'Demo Traders', owner: owner._id, gstin: '27ABCDE1234F1Z5' });
owner.memberships.push({ business: business._id, role: 'owner' });
await owner.save();

const customer = await Customer.create({ business: business._id, name: 'Riya Enterprises', gstin: '29AAAAA0000A1Z5' });
await Invoice.create({
  business: business._id,
  customer: customer._id,
  invoiceNumber: 'INV-1001',
  items: [{ description: 'Consulting', qty: 1, unitPrice: 10000, gstRate: 18 }],
  subtotal: 10000,
  cgst: 900,
  sgst: 900,
  igst: 0,
  total: 11800,
  paidAmount: 5000,
  status: 'partial'
});

await Expense.create({ business: business._id, category: 'Marketing', amount: 2000, note: 'Meta ads' });
await AutomationRule.create({
  business: business._id,
  name: 'Overdue Reminder',
  trigger: 'invoice_overdue',
  action: 'whatsapp_reminder',
  condition: { days: 7 }
});

console.log('Seeded demo account: demo@gstsaas.com / Demo@1234');
process.exit(0);
