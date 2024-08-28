const mongoose = require('mongoose');

const RolesOpcionesMenuSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  menuOptionId: { type: String, required: true }
});

module.exports = mongoose.model('RolesOpcionesMenu', RolesOpcionesMenuSchema);
