const mongoose = require('mongoose');

const movimientosInventarioSchema = new mongoose.Schema({
  movementId: { type: String },
  date: { type: String },
  type: { type: String },  // Tipo de movimiento (e.g., entrada, salida, ajuste)
  //contador: { type: Number, default: 0 },
  // Información del producto
  Product: {
    productSKU: { type: String },  // SKU del producto
    productName: { type: String },  // Nombre del producto
    productCategory: { type: String },  // Categoría del producto
  },
  quantity_d: { type: Number, default: 0 },  // Cantidad destino
  quantity_h: { type: Number, default: 0 },  // Cantidad origen
  unitOfMeasure: { type: String },  // Unidad de medida
  reason: { type: String },  // Razón del movimiento
  documentMaterial: { type: String },  // Documento o material asociado
  supplierOrClient: { type: String },  // Proveedor o Cliente

  // Información del almacén
  warehouseOrigin: {
    warehouseId: { type: String },  // ID del almacén
    warehouseName: { type: String },  // Nombre del almacén
  },
  // Información del movimiento
  responsibleUser: { type: String },  // Usuario responsable
  unitCost: { type: Number, default:0 },  // Costo unitario
  totalCost: { type: Number, default:0 },  // Costo total
  totalQTY: { type: Number, default:0 },  // Cantidad total
  VentaUSD: { type: Number, default: 0 },  // Venta en USD (si aplica)
  VentaQTY: { type: Number, default: 0 },  // Cantidad vendida (si aplica)
  movementStatus: { type: String },  // Estado del movimiento (e.g., completado, pendiente)

});

//, { timestamps: true }

module.exports = mongoose.model('MovimientosInventario', movimientosInventarioSchema);
