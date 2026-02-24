import Customer from '../models/Customer.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create({ ...req.body, business: req.businessId });
  res.status(201).json(customer);
});

export const listCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ business: req.businessId });
  res.json(customers);
});
