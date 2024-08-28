const express = require('express');
const router = express.Router();
const Producto = require('../models/Productos');  // Importamos el modelo de productos

router.post('/newProduct', async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        await newProducto.save();
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ======================
// Endpoint: GET /api/list_productos
// Descripción: Lista todos los productos con los campos necesarios
// ======================
router.get('/listProduct', async (req, res) => {
    try {
        // Seleccionar solo los campos necesarios
        const products = await Producto.find({}, 'productId sku name category.brand category.name brand').exec();
        res.json(products);
    } catch (error) {
        console.error('Error listando productos:', error);
        res.status(500).json({ error: 'Error listando productos' });
    }
});













module.exports = router;


