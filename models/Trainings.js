const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    productSKU: {
        type: String,
        required: true
    },
    mae: {
        type: Number,
        required: true
    },
    rmse: {
        type: Number,
        required: true
    },
    rs: {
        type: mongoose.Schema.Types.Mixed
    },
    duration: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    fecha_quiebre: {
        type: String,
        required: true
    },
    prediccion: {
        type: Number,
        required: true
    },
    incertidumbre: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
});

const Trainings = mongoose.model('Training', trainingSchema);

module.exports = Trainings;