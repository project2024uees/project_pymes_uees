const mongoose = require('mongoose');

const RolesPermisosSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  permissionId: { type: String, required: true }
});

module.exports = mongoose.model('RolesPermisos', RolesPermisosSchema);
