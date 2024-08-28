const mongoose = require('mongoose');

const UbicacionesAlmacenSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  maxCapacity: { type: Number, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('UbicacionesAlmacen', UbicacionesAlmacenSchema);
