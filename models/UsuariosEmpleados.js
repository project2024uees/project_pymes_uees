const mongoose = require('mongoose');

const UsuariosEmpleadosSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('UsuariosEmpleados', UsuariosEmpleadosSchema);
