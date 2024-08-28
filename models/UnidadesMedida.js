const mongoose = require('mongoose');

const UnidadesMedidaSchema = new mongoose.Schema({
  unitId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  type: { type: String, required: true },
  conversionFactor: { type: Number, required: true },
  description: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('UnidadesMedida', UnidadesMedidaSchema);
