const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movimientoSchema = new Schema({
    movementId: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        default: 'Ninguna'
    },
    Product: {
        productSKU: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productCategory: String
    },
    quantity_d: {
        type: Number,
        default: 0
    },
    quantity_h: {
        type: Number,
        default: 0
    },
    unitOfMeasure: String,
    reason: String,
    documentMaterial: String,
    supplierOrClient: String,
    warehouseOrigin: {
        warehouseId: String,
        name: String
    },
    responsibleUser: String,
    unitCost: Number,
    totalCost: Number,
    totalQTY: Number,
    VentaUSD: {
        type: Number,
        default: 0
    },
    VentaQTY: {
        type: Number,
        default: 0
    },
    movementStatus: {
        type: String,
        default: 'Completado'
    },
    contador: Number
}, {
    timestamps: true
});

// Índices
movimientoSchema.index({ movementId: 1 }, { unique: true });
movimientoSchema.index({ date: 1 });
movimientoSchema.index({ 'Product.productSKU': 1 });

const Movimientos = mongoose.model('Movimiento', movimientoSchema, 'movimientos');

module.exports = Movimientos;