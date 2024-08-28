require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(express.json()); // Para manejar JSON en las requests

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

connectDB(); // Conectar a la base de datos

// Configurar una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Inicio de app');
});

app.use('/api', userRoutes); // Usar rutas de usuarios












// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});