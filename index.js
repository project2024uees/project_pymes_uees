require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Asegúrate de que esta línea esté presente
const app = express();

app.use(express.json()); // Para manejar JSON en las requests

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Construir la URI completa utilizando las variables de entorno
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb-uees-vcore.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

// Conectar a MongoDB usando la URI construida
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Configurar una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

// Configurar una ruta de ejemplo (opcional)
// Puedes eliminarla si solo deseas servir el HTML
app.get('/api', (req, res) => {
    res.send('¡Hola desde la API!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
