require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {

    const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;
    // Conectar a MongoDB usando la URI construida
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('Error al conectar a MongoDB:', err));
}

module.exports = connectDB;