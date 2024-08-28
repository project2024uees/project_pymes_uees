const mongoose = require('mongoose');

const UsuariosRolesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  roleId: { type: String, required: true }
});

module.exports = mongoose.model('UsuariosRoles', UsuariosRolesSchema);
