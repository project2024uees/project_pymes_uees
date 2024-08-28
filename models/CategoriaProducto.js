const mongoose = require('mongoose');

const CategoriaProductoSchema = new mongoose.Schema({
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('CategoriaProducto', CategoriaProductoSchema);
