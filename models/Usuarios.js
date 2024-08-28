const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  userStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastAccessDate: { type: Date },
  roles: [{
    roleId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String }
  }],
  notes: { type: String }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
