const mongoose = require('mongoose');

const MovimientosInventarioSchema = new mongoose.Schema({
  movementId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitOfMeasure: {
    unitId: { type: String, required: true },
    name: { type: String, required: true }
  },
  reason: { type: String, required: true },
  associatedDocument: { type: String },
  supplierOrClient: {
    supplierId: { type: String },
    name: { type: String }
  },
  warehouseOrigin: {
    warehouseId: { type: String },
    name: { type: String }
  },
  warehouseDestination: {
    warehouseId: { type: String },
    name: { type: String }
  },
  responsibleUser: {
    userId: { type: String },
    name: { type: String }
  },
  unitCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  movementStatus: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('MovimientosInventario', MovimientosInventarioSchema);
