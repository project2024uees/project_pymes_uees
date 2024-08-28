const mongoose = require('mongoose');

const ProveedoresSchema = new mongoose.Schema({
  supplierId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String },
  primaryContact: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  country: { type: String },
  paymentTerms: { type: String },
  currency: { type: String },
  taxIdentificationNumber: { type: String },
  preferredPaymentMethod: { type: String },
  deliveryLeadTime: { type: String },
  supplierRating: { type: String },
  returnPolicy: { type: String },
  offeredDiscounts: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Proveedores', ProveedoresSchema);
