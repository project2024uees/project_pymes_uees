const mongoose = require('mongoose');

const PermisosSchema = new mongoose.Schema({
  permissionId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  permissionStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model('Permisos', PermisosSchema);
