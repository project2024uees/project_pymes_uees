const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  roleStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  permissions: [{
    permissionId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String }
  }],
  menuOptions: [{
    menuOptionId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true }
  }],
  notes: { type: String }
});

module.exports = mongoose.model('Roles', RolesSchema);
