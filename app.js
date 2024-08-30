/*const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/miapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Rutas
app.use('/api/categories', categoryRoutes);

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor iniciado en http://localhost:${port}`));
*/