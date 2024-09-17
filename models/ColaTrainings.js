const mongoose = require('mongoose');

// Definir el esquema y el modelo para la colección "colaTraining"
const colatrainingSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ColaTraining', colatrainingSchema);


