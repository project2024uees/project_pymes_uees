const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Producto = require('../models/Productos');  // Importamos el modelo de productos
const Usuario = require('../models/Usuarios');
const Permiso = require('../models/Permisos');
//const Movimientos = require('../models/MovimientosInventario');
const Movimientos = require('../models/Movimientos');

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

// Crear un nuevo usuario
router.post('/createUser', async (req, res) => {
    const newUser = req.body;
    try {
        // Generar hash de la contraseña (puedes usar bcrypt o cualquier otra librería)
        //newUser.password = await bcrypt.hash(newUser.password, 10);

        const usuario = new Usuario(newUser);
        await usuario.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        // console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
});


// Ruta para obtener el kardex filtrado
router.post('/kardex', async (req, res) => {
    const { sku, name } = req.body;

    try {
        const query = {};
        if (sku) query['Product.productSKU'] = { $regex: sku, $options: 'i' }; // Búsqueda por SKU
        //if (name) query['Product.productName'] = { $regex: name, $options: 'i' }; // Búsqueda por nombre
        console.log(query)
        const movimientos = await Movimientos.find(query).sort({ date: -1 }); // Ordenar por fecha

        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el kardex' });
    }
});


/*
router.post('/kardex2', async (req, res) => {
    try {
        // Consulta para obtener los primeros 10 documentos con solo los campos especificados
        const movimientos = await Movimientos.find()
            .limit(10)
            //.sort({ date: -1 }) // Ordenar por fecha descendente
            //.select('movementId') // Seleccionar solo estos campos
            .lean(); // Devolver objetos JSON puros
        console.log(movimientos)
        // Verificar si hay movimientos encontrados
        if (!movimientos || movimientos.length === 0) {
            console.log('No se encontraron movimientos');
            return res.status(404).json({ message: 'No se encontraron movimientos' });
        }

        console.log(movimientos);
        res.json(movimientos);
    } catch (error) {
        console.error('Error al obtener el kardex:', error);
        res.status(500).json({ error: 'Error al obtener el kardex' });
    }
});*/


module.exports = router;












module.exports = router;


