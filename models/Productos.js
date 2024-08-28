const mongoose = require('mongoose');

const ProductosSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: {
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String }
  },
  brand: { type: String },
  origin: { type: String },
  unitOfMeasurePurchase: {
    unitId: { type: String, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    conversionFactor: { type: Number, required: true }
  },
  unitOfMeasureSale: {
    unitId: { type: String, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    conversionFactor: { type: Number, required: true }
  },
  pricePurchase: { type: Number, required: true },
  priceSale: { type: Number, required: true },
  inventoryQuantity: { type: Number, required: true },
  reorderPoint: { type: Number },
  averageWeightedCost: { type: Number },
  lastMovementDate: { type: Date },
  productStatus: { type: String, required: true },
  productImage: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Productos', ProductosSchema);
