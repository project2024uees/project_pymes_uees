const mongoose = require('mongoose');

const TokensSesionSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  tokenStatus: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('TokensSesion', TokensSesionSchema);
