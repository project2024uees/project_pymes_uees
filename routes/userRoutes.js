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

// Lista todos los productos con los campos necesarios
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


// Obtener un producto por su ID
router.get('/findProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Producto.findOne({ productId }).exec();
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({ error: 'Error obteniendo producto' });
    }
});

// Actualizar un producto por su ID
router.put('/updateProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Producto.findOneAndUpdate(
            { productId },
            updatedProductData,
            { new: true } // Devuelve el producto actualizado
        );

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error actualizando producto' });
    }
});










module.exports = router;


