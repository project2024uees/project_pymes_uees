const mongoose = require('mongoose');

const OpcionesMenuSchema = new mongoose.Schema({
  menuOptionId: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  parentMenuOptionId: { type: String, default: null },
  order: { type: Number, required: true },
  icon: { type: String },
  menuOptionStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model('OpcionesMenu', OpcionesMenuSchema);
